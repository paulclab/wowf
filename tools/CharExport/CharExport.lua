-- === 1. UI Popup Window ===
local f = CreateFrame("Frame", "CharExportFrame", UIParent)
f:SetSize(640, 520)
f:SetPoint("CENTER")
f:SetFrameStrata("DIALOG")
f:SetMovable(true)
f:EnableMouse(true)
f:RegisterForDrag("LeftButton")
f:SetScript("OnDragStart", f.StartMoving)
f:SetScript("OnDragStop", f.StopMovingOrSizing)
f:Hide()

local bg = f:CreateTexture(nil, "BACKGROUND")
bg:SetAllPoints()
bg:SetColorTexture(0.05, 0.07, 0.13, 0.95)

local title = f:CreateFontString(nil, "OVERLAY", "GameFontNormal")
title:SetPoint("TOPLEFT", 14, -10)
title:SetText("CharExport v2.2 (/ce 캐릭터+시세 · /ce ah 경매장시세전용 · Ctrl+C 복사 후 ESC)")

local close = CreateFrame("Button", nil, f, "UIPanelCloseButton")
close:SetPoint("TOPRIGHT", -4, -4)

local sf = CreateFrame("ScrollFrame", "CharExportScroll", f, "UIPanelScrollFrameTemplate")
sf:SetPoint("TOPLEFT", 14, -34)
sf:SetPoint("BOTTOMRIGHT", -32, 14)

local eb = CreateFrame("EditBox", nil, sf)
eb:SetMultiLine(true)
eb:SetFontObject("GameFontHighlightSmall")
eb:SetSize(580, 440)
eb:SetAutoFocus(false)
eb:SetScript("OnEscapePressed", function() f:Hide() end)
sf:SetScrollChild(eb)

-- === 2. Helpers ===
local SLOTS = {
  {1,"머리"},{2,"목"},{3,"어깨"},{15,"망토"},{5,"가슴"},
  {9,"손목"},{10,"손"},{6,"허리"},{7,"다리"},{8,"발"},
  {11,"손가락1"},{12,"손가락2"},{13,"장신구1"},{14,"장신구2"},
  {16,"주장비"},{17,"보조장비"},{18,"원거리"}
}

local function SpellNameByID(id)
  if not id then return nil end
  if C_Spell and C_Spell.GetSpellName then
    local ok, n = pcall(C_Spell.GetSpellName, id)
    if ok and type(n) == "string" and n ~= "" then return n end
  end
  if GetSpellInfo then
    local ok, n = pcall(GetSpellInfo, id)
    if ok and type(n) == "string" and n ~= "" then return n end
  end
  return nil
end

-- === 3. Talents (1.60.1 C_Traits + Spent Nodes) ===
local function GetTalentsDetailed()
  if not (C_ClassTalents and C_ClassTalents.GetActiveConfigID and C_Traits and C_Traits.GetConfigInfo) then
    return "?", {}
  end
  local ok, c = pcall(C_ClassTalents.GetActiveConfigID)
  if not ok or type(c) ~= "number" then return "?", {} end
  local ok2, info = pcall(C_Traits.GetConfigInfo, c)
  local tid = ok2 and type(info) == "table" and info.treeIDs and info.treeIDs[1]
  if type(tid) ~= "number" then return "?", {} end

  local groups = C_Traits.GetGroupDisplayInfoByTreeID and C_Traits.GetGroupDisplayInfoByTreeID(tid) or {}
  local ids, gOrder, gSpent, gNodes = {}, {}, {}, {}
  for i, g in ipairs(groups) do
    ids[i] = g.groupID
    gOrder[g.groupID] = i
    gNodes[i] = {}
  end
  local spent = (C_Traits.GetGroupCurrencyInfo and C_Traits.GetGroupCurrencyInfo(c, ids)) or {}
  local summary = {}
  for i, g in ipairs(groups) do
    local pts = 0
    for _, s in ipairs(spent) do
      if type(s) == "table" and s.traitNodeGroupID == g.groupID and s.currencyInfos and s.currencyInfos[1] then
        pts = s.currencyInfos[1].spent or 0
      end
    end
    gSpent[i] = pts
    summary[#summary + 1] = pts
  end

  local nodes = C_Traits.GetTreeNodes and C_Traits.GetTreeNodes(tid) or {}
  for _, nid in ipairs(nodes) do
    local okN, ni = pcall(C_Traits.GetNodeInfo, c, nid)
    if okN and type(ni) == "table" then
      local r = tonumber(ni.activeRank) or tonumber(ni.ranksPurchased) or 0
      if r > 0 then
        local eid = (ni.activeEntry and ni.activeEntry.entryID) or (ni.entryIDs and ni.entryIDs[1])
        local okE, entry = eid and pcall(C_Traits.GetEntryInfo, c, eid)
        local okD, def = (okE and type(entry) == "table" and entry.definitionID) and pcall(C_Traits.GetDefinitionInfo, entry.definitionID)
        local nName = (okD and type(def) == "table" and ((def.overrideName ~= "" and def.overrideName) or SpellNameByID(def.spellID))) or ("특성#" .. nid)
        local maxR = ni.maxRanks or r
        local gIdx = 1
        if type(ni.groupIDs) == "table" then
          for _, gid in ipairs(ni.groupIDs) do
            if gOrder[gid] then gIdx = gOrder[gid]; break end
          end
        end
        local list = gNodes[gIdx] or gNodes[1]
        if list then
          list[#list + 1] = { y = ni.posY or 0, x = ni.posX or 0, txt = format("%s(%d/%d)", nName, r, maxR) }
        end
      end
    end
  end

  local lines = {}
  for i, g in ipairs(groups) do
    local list = gNodes[i]
    if list and #list > 0 then
      table.sort(list, function(a, b) return (a.y ~= b.y) and (a.y < b.y) or (a.x < b.x) end)
      local names = {}
      for _, v in ipairs(list) do names[#names + 1] = v.txt end
      local gLabel = (type(g.title) == "string" and g.title ~= "" and g.title) or (type(g.name) == "string" and g.name ~= "" and g.name) or ("트리" .. i)
      lines[#lines + 1] = format("[%s %dpt] %s", gLabel, gSpent[i] or 0, table.concat(names, ", "))
    end
  end
  return table.concat(summary, "/"), lines
end

-- === 5. Buffs & Weapon Temp Enchants ===
local function GetBuffsText()
  local res = {}
  local now = GetTime()
  for i = 1, 40 do
    local name, count, exp, sid
    if C_UnitAuras and C_UnitAuras.GetBuffDataByIndex then
      local a = C_UnitAuras.GetBuffDataByIndex("player", i)
      if not a then break end
      name, count, exp, sid = a.name, a.applications, a.expirationTime, a.spellId
    elseif UnitBuff then
      local n, _, c, _, _, e, _, _, _, id = UnitBuff("player", i)
      if not n then break end
      name, count, exp, sid = n, c, e, id
    else
      break
    end
    local extra = {}
    if count and count > 1 then extra[#extra + 1] = "x" .. count end
    if exp and exp > 0 then
      local rem = math.max(0, math.floor(exp - now))
      extra[#extra + 1] = (rem >= 60) and (math.floor(rem / 60) .. "m") or (rem .. "s")
    end
    if sid then extra[#extra + 1] = "id:" .. sid end
    res[#res + 1] = name .. (#extra > 0 and (" (" .. table.concat(extra, ",") .. ")") or "")
  end
  if GetWeaponEnchantInfo then
    local hasMH, mhExp, _, mhID, hasOH, ohExp, _, ohID = GetWeaponEnchantInfo()
    if hasMH then res[#res + 1] = format("주무기 임시부여 (%dm, ID:%s)", math.floor((mhExp or 0) / 60000), tostring(mhID or "?")) end
    if hasOH then res[#res + 1] = format("보조무기 임시부여 (%dm, ID:%s)", math.floor((ohExp or 0) / 60000), tostring(ohID or "?")) end
  end
  return #res > 0 and table.concat(res, ", ") or "(활성 버프 없음)"
end

-- === 6. Gear Enchants / Kits / Oils via Tooltip ===
local function GetSlotModText(slot)
  if not (C_TooltipInfo and C_TooltipInfo.GetInventoryItem) then return nil end
  local ok, tip = pcall(C_TooltipInfo.GetInventoryItem, "player", slot)
  if not (ok and type(tip) == "table" and type(tip.lines) == "table") then return nil end
  local mods = {}
  for _, line in ipairs(tip.lines) do
    local txt = line.leftText
    if type(txt) == "string" and txt ~= "" then
      local direct = txt:match("^마법부여:%s*(.+)") or txt:match("^Enchanted:%s*(.+)")
      if direct then
        mods[#mods + 1] = direct
      elseif line.leftColor then
        local c = line.leftColor
        if c.r < 0.25 and c.g > 0.8 and c.b < 0.25 then
          if not (txt:find("^착용 효과") or txt:find("^사용 효과") or txt:find("^세트") or txt:find("^Equip:") or txt:find("^Use:") or txt:find("^Set:") or txt:find("^방어도") or txt:find("^내구도") or txt:find("^요구") or txt:find("^아이템 레벨")) then
            mods[#mods + 1] = txt
          end
        end
      end
    end
  end
  return #mods > 0 and table.concat(mods, " / ") or nil
end

-- === 7. Learned Spells (Grouped by Tab & Compacted Ranks) ===
local function GetLearnedSpellsLines()
  local getNumTabs = GetNumSpellTabs or (C_SpellBook and C_SpellBook.GetNumSpellBookSkillLines)
  local getTabInfo = GetSpellTabInfo or (C_SpellBook and function(idx)
    local s = C_SpellBook.GetSpellBookSkillLineInfo(idx)
    if s then return s.name, s.iconID, s.itemIndexOffset, s.numSpellBookItems, s.isGuild, s.offSpecID end
  end)
  local bank = (Enum and Enum.SpellBookSpellBank and Enum.SpellBookSpellBank.Player) or "spell"
  local getSpellName = GetSpellBookItemName or (C_SpellBook and C_SpellBook.GetSpellBookItemName)
  if not (getNumTabs and getTabInfo and getSpellName) then return { "스킬북 API 미지원" } end

  local lines = {}
  local numTabs = getNumTabs() or 0
  for t = 1, numTabs do
    local tName, _, offset, count, isGuild = getTabInfo(t)
    if tName and not isGuild and (count or 0) > 0 then
      local order, byName = {}, {}
      for i = (offset or 0) + 1, (offset or 0) + count do
        local ok, sName, sSub = pcall(getSpellName, i, bank)
        if ok and type(sName) == "string" and sName ~= "" then
          if not byName[sName] then
            order[#order + 1] = sName
            byName[sName] = {}
          end
          if type(sSub) == "string" and sSub ~= "" then
            byName[sName][#byName[sName] + 1] = sSub
          end
        end
      end
      local items = {}
      for _, sName in ipairs(order) do
        local subs = byName[sName]
        if #subs > 1 then
          items[#items + 1] = sName .. "(" .. subs[#subs] .. " 등 " .. #subs .. "등급)"
        elseif #subs == 1 then
          items[#items + 1] = sName .. "(" .. subs[1] .. ")"
        else
          items[#items + 1] = sName
        end
      end
      lines[#lines + 1] = "[" .. tName .. "] " .. table.concat(items, ", ")
    end
  end
  return lines
end

-- === 7. Profession Skill Ranks (Compact 1-Line) ===
local function GetProfessionsSummary()
  local found = {}
  if GetProfessions and GetProfessionInfo then
    for i = 1, 6 do
      local idx = select(i, GetProfessions())
      if idx then
        local name, _, rank, maxRank = GetProfessionInfo(idx)
        if name then
          found[#found + 1] = format("%s %d/%d", name, rank or 0, maxRank or 0)
        end
      end
    end
  elseif GetNumSkillLines and GetSkillLineInfo then
    local sec = ""
    for i = 1, (GetNumSkillLines() or 0) do
      local n, h, _, r, _, _, mx = GetSkillLineInfo(i)
      if h then
        sec = n
      elseif n and r and r > 0 and (sec == TRADE_SKILLS or sec == SECONDARY_SKILLS or sec == "전문 기술" or sec == "보조 기술" or sec == "Professions" or sec == "Secondary Skills") then
        found[#found + 1] = format("%s %d/%d", n, r, mx or 0)
      end
    end
  end
  return #found > 0 and table.concat(found, ", ") or nil
end

-- === 8. Auctionator Market & Bag Price Integration ===
local WATCH_MATS = {
  {10940, "이상한 가루"},
  {11083, "영혼 가루"},
  {11137, "환상 가루"},
  {10938, "하급 마법의 정수"},
  {10939, "상급 마법의 정수"},
  {10998, "하급 신비의 정수"},
  {11082, "상급 신비의 정수"},
  {11134, "하급 황천의 정수"},
  {11135, "상급 황천의 정수"},
  {10978, "하급 눈부신 조각"},
  {11084, "상급 눈부신 조각"},
  {20744, "최하급 마술사 오일"},
  {20746, "하급 마술사 오일"},
  {2318,  "얇은 가죽"},
  {2319,  "일반 가죽"},
  {4234,  "질긴 가죽"},
  {4304,  "두꺼운 가죽"},
  {2589,  "리넨 옷감"},
  {2592,  "양모 옷감"},
  {4306,  "비단 옷감"},
  {4338,  "마법 옷감"},
}

local function FormatCopper(copper)
  if type(copper) ~= "number" then return "-" end
  copper = math.floor(copper + 0.5)
  if copper < 0 then copper = 0 end
  local g = math.floor(copper / 10000)
  local s = math.floor((copper % 10000) / 100)
  local c = copper % 100
  if g > 0 then return format("%dg %ds %dc", g, s, c) end
  if s > 0 then return format("%ds %dc", s, c) end
  return format("%dc", c)
end

local function ItemNameByID(id, fallback)
  if C_Item and C_Item.GetItemNameByID then
    local ok, n = pcall(C_Item.GetItemNameByID, id)
    if ok and type(n) == "string" and n ~= "" then return n end
  end
  if GetItemInfo then
    local ok, n = pcall(GetItemInfo, id)
    if ok and type(n) == "string" and n ~= "" then return n end
  end
  return fallback or ("아이템#" .. tostring(id))
end

local function HasAuctionatorAPI()
  return Auctionator and Auctionator.API and Auctionator.API.v1
    and Auctionator.API.v1.GetAuctionPriceByItemID ~= nil
end

local function QueryItemPrices(itemID, itemLink)
  local api = Auctionator.API.v1
  local ah, age, de, vendor
  if itemLink and api.GetAuctionPriceByItemLink then
    local ok, v = pcall(api.GetAuctionPriceByItemLink, "CharExport", itemLink)
    if ok and type(v) == "number" then ah = v end
  end
  if not ah and itemID and api.GetAuctionPriceByItemID then
    local ok, v = pcall(api.GetAuctionPriceByItemID, "CharExport", itemID)
    if ok and type(v) == "number" then ah = v end
  end
  if itemLink and api.GetAuctionAgeByItemLink then
    local ok, v = pcall(api.GetAuctionAgeByItemLink, "CharExport", itemLink)
    if ok and type(v) == "number" then age = v end
  elseif itemID and api.GetAuctionAgeByItemID then
    local ok, v = pcall(api.GetAuctionAgeByItemID, "CharExport", itemID)
    if ok and type(v) == "number" then age = v end
  end
  if itemLink and api.GetDisenchantPriceByItemLink then
    local ok, v = pcall(api.GetDisenchantPriceByItemLink, "CharExport", itemLink)
    if ok and type(v) == "number" and v > 0 then de = v end
  elseif itemID and api.GetDisenchantPriceByItemID then
    local ok, v = pcall(api.GetDisenchantPriceByItemID, "CharExport", itemID)
    if ok and type(v) == "number" and v > 0 then de = v end
  end
  if itemID and api.GetVendorPriceByItemID then
    local ok, v = pcall(api.GetVendorPriceByItemID, "CharExport", itemID)
    if ok and type(v) == "number" and v > 0 then vendor = v end
  end
  return ah, age, de, vendor
end

local function CollectBagItems()
  local byKey, order = {}, {}
  local maxBag = NUM_BAG_SLOTS or 4
  for bag = 0, maxBag do
    local numSlots = (C_Container and C_Container.GetContainerNumSlots and C_Container.GetContainerNumSlots(bag))
      or (GetContainerNumSlots and GetContainerNumSlots(bag)) or 0
    for slot = 1, numSlots do
      local info = C_Container and C_Container.GetContainerItemInfo and C_Container.GetContainerItemInfo(bag, slot)
      local link = (info and info.hyperlink) or (GetContainerItemLink and GetContainerItemLink(bag, slot))
      if link then
        local id = (info and info.itemID) or tonumber(link:match("item:(%d+)"))
        local count = (info and info.stackCount) or 1
        local isBound = info and info.isBound
        local name = (info and info.itemName) or link:match("%[(.-)%]") or ItemNameByID(id)
        local key = (isBound and "B:" or "T:") .. tostring(id or name)
        if not byKey[key] then
          byKey[key] = { id = id, link = link, name = name, count = 0, isBound = isBound }
          order[#order + 1] = byKey[key]
        end
        byKey[key].count = byKey[key].count + count
      end
    end
  end
  return order
end

local function AppendAuctionatorLines(out, detailed)
  if not HasAuctionatorAPI() then
    out[#out + 1] = "(Auctionator 애드온이 비활성 상태이거나 아직 로드되지 않았습니다.)"
    return
  end

  local bagItems = CollectBagItems()
  local pricedBagCount = 0
  local totalBagAH = 0
  out[#out + 1] = "[가방 보유 아이템 시세]"
  for _, it in ipairs(bagItems) do
    local ah, age, de, vendor = QueryItemPrices(it.id, it.link)
    if not it.isBound and (ah or de or (detailed and vendor)) then
      pricedBagCount = pricedBagCount + 1
      local parts = {}
      if ah then
        local tot = ah * it.count
        totalBagAH = totalBagAH + tot
        if it.count > 1 then
          parts[#parts + 1] = format("개당 %s (합계 %s)", FormatCopper(ah), FormatCopper(tot))
        else
          parts[#parts + 1] = "경매가 " .. FormatCopper(ah)
        end
        if age ~= nil then parts[#parts + 1] = (age == 0 and "오늘" or (age .. "일전")) end
      elseif detailed then
        parts[#parts + 1] = "경매가 미스캔"
      end
      if de then parts[#parts + 1] = "추출기댓값 " .. FormatCopper(de) end
      if detailed and vendor then parts[#parts + 1] = "상점 " .. FormatCopper(vendor) end
      out[#out + 1] = format("- %s x%d | %s", it.name, it.count, table.concat(parts, " | "))
    elseif it.isBound and detailed and de then
      pricedBagCount = pricedBagCount + 1
      out[#out + 1] = format("- %s x%d (귀속) | 추출기댓값 %s", it.name, it.count, FormatCopper(de))
    end
  end
  if pricedBagCount == 0 then
    out[#out + 1] = "(가방에 Auctionator 시세가 기록된 거래 아이템 없음 — 경매장에서 '전체 스캔' 실행 필요)"
  elseif totalBagAH > 0 then
    out[#out + 1] = "=> 가방 거래 아이템 경매가 총합(추정): " .. FormatCopper(totalBagAH)
  end

  out[#out + 1] = ""
  out[#out + 1] = "[마부·가죽·옷감·오일 핵심 시세]"
  local matShown = 0
  for _, m in ipairs(WATCH_MATS) do
    local id, fallback = m[1], m[2]
    local ah, age = QueryItemPrices(id, nil)
    local label = ItemNameByID(id, fallback)
    if ah then
      matShown = matShown + 1
      local ageTxt = age ~= nil and (age == 0 and "오늘" or (age .. "일전")) or "-"
      out[#out + 1] = format("- %s (ID:%d): %s (%s)", label, id, FormatCopper(ah), ageTxt)
    elseif detailed then
      matShown = matShown + 1
      out[#out + 1] = format("- %s (ID:%d): 미스캔", label, id)
    end
  end
  if matShown == 0 then
    out[#out + 1] = "(기록된 재료 시세 없음 — 경매장 열어서 Auctionator '전체 스캔' 후 다시 시도)"
  end
end

-- === 9. Slash Commands /ce, /ce ah, /cea ===
SLASH_CHAREXPORT1 = "/ce"
SLASH_CHAREXPORT2 = "/charexport"
SLASH_CHAREXPORTAH1 = "/cea"

local function OpenMarketOnly()
  local out = {}
  out[#out + 1] = format("=== 경매장·가방 시세 스냅샷 (%s) ===", date("%Y-%m-%d %H:%M"))
  out[#out + 1] = format("캐릭터: %s (Lv.%d) | 소지금: %s",
    UnitName("player") or "?", UnitLevel("player") or 0, FormatCopper(GetMoney and GetMoney() or 0))
  out[#out + 1] = ""
  AppendAuctionatorLines(out, true)
  eb:SetText(table.concat(out, "\n"))
  f:Show()
  eb:SetFocus()
  eb:HighlightText()
end

SlashCmdList["CHAREXPORTAH"] = OpenMarketOnly

SlashCmdList["CHAREXPORT"] = function(msg)
  local arg = type(msg) == "string" and msg:lower():gsub("^%s*(.-)%s*$", "%1") or ""
  if arg == "ah" or arg == "price" or arg == "market" or arg == "시세" then
    OpenMarketOnly()
    return
  end

  local p = "player"
  local okT, talSum, talLines = pcall(GetTalentsDetailed)
  if not okT then talSum, talLines = "ERR", {} end
  local _, armor = UnitArmor(p)
  local _, sta = UnitStat(p, 3)
  local _, intel = UnitStat(p, 4)
  local _, spi = UnitStat(p, 5)
  local haste = (UnitSpellHaste and UnitSpellHaste(p)) or (GetHaste and GetHaste()) or 0

  local out = {}
  out[#out+1] = format("=== 캐릭터 스냅샷 (%s) ===", date("%Y-%m-%d %H:%M"))
  out[#out+1] = format("이름: %s | Lv.%d | 특성합계: %s", UnitName(p) or "?", UnitLevel(p) or 0, tostring(talSum))
  out[#out+1] = format("HP: %d | MP: %d | 방어도: %d", UnitHealthMax(p) or 0, UnitPowerMax(p, 0) or 0, armor or 0)
  out[#out+1] = format("체력: %d | 지능: %d | 정신력: %d", sta or 0, intel or 0, spi or 0)
  out[#out+1] = format("일반 주문력: %d | 비전 주문력: %d | 치명타: %.2f%% | 가속: %.2f%%",
    GetSpellBonusDamage(3) or 0, GetSpellBonusDamage(7) or 0, GetSpellCritChance(7) or 0, haste)
  local okPr, profSummary = pcall(GetProfessionsSummary)
  if okPr and type(profSummary) == "string" and profSummary ~= "" then
    out[#out+1] = "전문기술: " .. profSummary
  end

  out[#out+1] = ""
  out[#out+1] = "=== 1. 현재 활성 버프 (계산 보정용) ==="
  local okB, bTxt = pcall(GetBuffsText)
  out[#out+1] = okB and bTxt or ("버프 오류: " .. tostring(bTxt))

  out[#out+1] = ""
  out[#out+1] = "=== 2. 투자된 특성 세부 내역 ==="
  if #talLines > 0 then
    for _, l in ipairs(talLines) do out[#out+1] = l end
  else
    out[#out+1] = "(특성 세부 정보 없음)"
  end

  out[#out+1] = ""
  out[#out+1] = "=== 3. 착용 장비 & 마부·방어구 키트 ==="
  for _, s in ipairs(SLOTS) do
    local link = GetInventoryItemLink(p, s[1])
    if link then
      local name = link:match("%[(.-)%]") or link
      local id, ench = link:match("item:(%d+):(%d*)")
      local okM, mod = pcall(GetSlotModText, s[1])
      mod = okM and mod or nil
      local modStr = mod and (" | 부여: [" .. mod .. "]") or ((ench and ench ~= "" and ench ~= "0") and (" | 부여ID:" .. ench) or "")
      out[#out+1] = s[2] .. ": " .. name .. " (ID:" .. (id or "?") .. ")" .. modStr
    else
      out[#out+1] = s[2] .. ": (빈 슬롯)"
    end
  end

  out[#out+1] = ""
  out[#out+1] = "=== 4. 배운 스킬 & 등급 ==="
  local okS, sLines = pcall(GetLearnedSpellsLines)
  if okS and type(sLines) == "table" then
    for _, l in ipairs(sLines) do out[#out+1] = l end
  end

  out[#out+1] = ""
  out[#out+1] = "=== 5. 가방 & 주요 재료 시세 (Auctionator) ==="
  local okA, errA = pcall(AppendAuctionatorLines, out, false)
  if not okA then
    out[#out+1] = "시세 조회 오류: " .. tostring(errA)
  end

  eb:SetText(table.concat(out, "\n"))
  f:Show()
  eb:SetFocus()
  eb:HighlightText()
end
