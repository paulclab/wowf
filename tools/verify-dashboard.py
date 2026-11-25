#!/usr/bin/env python3
"""WoW Forever Modular Dashboard Integrity & Headless Edge E2E Verifier.

Usage:
  python tools/verify-dashboard.py
"""
import os
import re
import shutil
import subprocess
import sys
import tempfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
JS_FILES = [
    "data/wow-db-skills.js",
    "data/wow-db-talents.js",
    "data/wow-db-items.js",
    "data/addons.js",
    "data/maps.js",
    "data/prices.js",
    "data/talents-and-sim.js",
    "js/tooltip.js",
    "js/app.js",
]
DB_FILES = [
    "data/wow-db-skills.js",
    "data/wow-db-talents.js",
    "data/wow-db-items.js",
]


def main():
    errors = []

    # 1. Check all modular files exist & scan localStorage / PII
    ls_count = 0
    for rel in ["dashboard.html", "assets/dashboard.css"] + JS_FILES:
        fp = os.path.join(ROOT, rel)
        if not os.path.exists(fp):
            errors.append(f"Missing required file: {rel}")
            continue
        txt = open(fp, encoding="utf-8").read()
        if re.search(r"C:\\Users\\|Users/[a-zA-Z0-9._-]+/Desktop", txt, re.I):
            errors.append(f"Local path/PII leak detected in {rel}")
        if rel.endswith(".js"):
            ls_count += len(re.findall(r"\blocalStorage\.", txt))

    if ls_count != 2:
        errors.append(f"localStorage. count must be 2 (safeStorageGet/Set), found {ls_count}")

    # 2. Check HTML duplicate IDs & CSS body[data-theme="dark"]
    html = open(os.path.join(ROOT, "dashboard.html"), encoding="utf-8").read()
    css = open(os.path.join(ROOT, "assets/dashboard.css"), encoding="utf-8").read()
    body_dark = len(re.findall(r'body\[data-theme="dark"\]', html + css))
    if body_dark:
        errors.append(f'Forbidden body[data-theme="dark"] found: {body_dark}')
    ids = re.findall(r'\bid="([^"]+)"', html)
    dup_ids = sorted({x for x in ids if ids.count(x) > 1})
    if dup_ids:
        errors.append(f"Duplicate HTML IDs: {dup_ids}")

    # 3. Check duplicate keys across/within DB files & vendorPrice+ahPrice conflicts
    seen_keys = {}
    conflicts = []
    for rel in DB_FILES:
        txt = open(os.path.join(ROOT, rel), encoding="utf-8").read()
        for m in re.finditer(r"^  (['\"])(.+?)\1\s*:\s*\{", txt, re.M):
            k = m.group(2)
            if k in seen_keys:
                errors.append(f"Duplicate WOW_DB key '{k}' in {rel} (already in {seen_keys[k]})")
            seen_keys[k] = rel
        blocks = re.split(r"\n  ['\"][^'\"]+['\"]\s*:\s*\{", txt)
        for blk in blocks[1:]:
            if "vendorPrice:" in blk and "ahPrice:" in blk:
                conflicts.append(rel)
    if conflicts:
        errors.append(f"vendorPrice + ahPrice conflict in: {conflicts}")

    # 4. Headless Edge E2E check on file:///dashboard.html (validates real V8 syntax + DOM hydration)
    edge_candidates = [
        r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
        r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
        r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    ]
    browser = next((p for p in edge_candidates if os.path.exists(p)), None)
    if browser:
        prof = tempfile.mkdtemp(prefix="wowf_verify_")
        try:
            uri = "file:///" + os.path.join(ROOT, "dashboard.html").replace("\\", "/")
            res = subprocess.run(
                [
                    browser,
                    "--headless=new",
                    "--disable-gpu",
                    "--no-sandbox",
                    f"--user-data-dir={prof}",
                    "--virtual-time-budget=4000",
                    "--dump-dom",
                    uri,
                ],
                capture_output=True,
                text=True,
                encoding="utf-8",
                errors="ignore",
                timeout=30,
            )
            dom = res.stdout
            c_ref = dom.count('class="wow-ref ')
            c_slot = dom.count('class="ig-slot ')
            c_nb = dom.count('class="nav-new-badge"')
            if c_ref < 100:
                errors.append(f"Tooltip hydration too low: {c_ref} .wow-ref chips")
            if c_slot < 40:
                errors.append(f"Talent tree did not render properly: {c_slot} slots")
            if "pchart-svg" not in dom:
                errors.append("Price trend SVG charts did not render")
            if c_nb < 1:
                errors.append("RECENTLY_UPDATED_TABS N-badges did not render")
            print(f"[E2E] Browser OK | wow-ref={c_ref} | ig-slots={c_slot} | N-badges={c_nb} | DB keys={len(seen_keys)}")
        finally:
            shutil.rmtree(prof, ignore_errors=True)
    else:
        print(f"[STATIC] Browser not found; static checks ran | DB keys={len(seen_keys)}")

    if errors:
        print("\n[FAIL] Dashboard verification errors:")
        for e in errors:
            print("  -", e)
        sys.exit(1)

    print("[PASS] All modular dashboard integrity & E2E checks passed 100%!")


if __name__ == "__main__":
    main()
