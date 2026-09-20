import React from "react";
import type { Asset, AssetDisplayGroup } from "@/types";
import { SUB_CATEGORY_LABELS } from "@/data/categories";

interface AssetBreakdownProps {
  assets: Asset[];
  activeGroup: AssetDisplayGroup;
  onGroupChange: (group: AssetDisplayGroup) => void;
}

const GROUPS: { key: AssetDisplayGroup; label: string; labelAr: string; icon: string }[] = [
  { key: "FURNITURE", label: "Office Furniture", labelAr: "الأثاث الإداري", icon: "🪑" },
  { key: "POSTAL_IT", label: "Postal & IT Hardware", labelAr: "الأجهزة والتقنيات البريدية", icon: "💻" },
  { key: "GENERAL", label: "General Amenities", labelAr: "المستلزمات العامة", icon: "🏠" },
];

const FURNITURE_SUBS = ["EXECUTIVE_DESK", "HYDRAULIC_CHAIR", "VISITOR_SEATING", "FILING_CABINET", "MAIL_SORTING_TABLE", "SERVICE_COUNTER", "HEAVY_SAFE"];
const POSTAL_IT_SUBS = ["DESKTOP_PC", "LAPTOP_DOCK", "POSTAL_SCALE", "BARCODE_SCANNER", "THERMAL_PRINTER", "POS_TERMINAL", "UPS_UNIT", "QUEUE_SCREEN"];
const GENERAL_SUBS = ["SPLIT_AC", "FIRE_EXTINGUISHER", "WATER_COOLER", "COFFEE_MACHINE"];

function filterByGroup(assets: Asset[], group: AssetDisplayGroup): Asset[] {
  switch (group) {
    case "FURNITURE":
      return assets.filter((a) => FURNITURE_SUBS.includes(a.subCategory));
    case "POSTAL_IT":
      return assets.filter((a) => POSTAL_IT_SUBS.includes(a.subCategory));
    case "GENERAL":
      return assets.filter((a) => GENERAL_SUBS.includes(a.subCategory));
  }
}

const conditionConfig: Record<string, { label: string; labelAr: string; dot: string; bg: string }> = {
  GOOD: { label: "Good", labelAr: "جيد", dot: "bg-green-500", bg: "bg-green-50 text-green-700" },
  UNDER_MAINTENANCE: { label: "Under Maintenance", labelAr: "صيانة", dot: "bg-amber-400", bg: "bg-amber-50 text-amber-700" },
  SCRAPPED: { label: "Scrapped", labelAr: "مهمل", dot: "bg-red-500", bg: "bg-red-50 text-red-700" },
  RESERVED: { label: "Reserved", labelAr: "محجوز", dot: "bg-blue-500", bg: "bg-blue-50 text-blue-700" },
};

const AssetCard: React.FC<{ asset: Asset }> = ({ asset }) => {
  const condition = conditionConfig[asset.condition] ?? conditionConfig.GOOD;
  const subLabel = SUB_CATEGORY_LABELS[asset.subCategory];

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 hover:border-postal-300 hover:shadow-card-hover transition-all duration-200">
      <div className="flex items-start justify-between mb-2">
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-royal-50 text-royal-700">
          {asset.assetTag}
        </span>
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${condition.bg}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${condition.dot}`} />
          {condition.labelAr}
        </span>
      </div>

      <h4 className="text-sm font-semibold text-royal-900 mt-2 leading-tight">{asset.itemName}</h4>
      <p className="text-xs text-slate-400 font-arabic mt-0.5">{asset.itemNameAr}</p>

      {subLabel && (
        <p className="text-[10px] text-postal-500 font-medium mt-1.5 bg-postal-50 inline-block px-1.5 py-0.5 rounded">
          {subLabel.ar}
        </p>
      )}

      <div className="mt-3 space-y-1">
        <div className="flex justify-between text-[10px]">
          <span className="text-slate-400">Serial</span>
          <span className="text-slate-600 font-mono">{asset.serialNumber}</span>
        </div>
        {asset.purchasePrice && (
          <div className="flex justify-between text-[10px]">
            <span className="text-slate-400">Price (JOD)</span>
            <span className="text-royal-900 font-bold">{asset.purchasePrice.toFixed(2)}</span>
          </div>
        )}
      </div>

      {asset.specifications && (
        <div className="mt-3 pt-3 border-t border-slate-100">
          <p className="text-[10px] text-slate-400 mb-1.5">Specifications / المواصفات</p>
          <div className="grid grid-cols-1 gap-1">
            {Object.entries(asset.specifications).map(([key, val]) => (
              <div key={key} className="flex justify-between text-[10px]">
                <span className="text-slate-400 capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                <span className="text-slate-600">{val}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const AssetBreakdown: React.FC<AssetBreakdownProps> = ({ assets, activeGroup, onGroupChange }) => {
  const filtered = filterByGroup(assets, activeGroup);

  return (
    <div>
      <div className="flex gap-2 mb-5 flex-wrap">
        {GROUPS.map((g) => {
          const count = filterByGroup(assets, g.key).length;
          return (
            <button
              key={g.key}
              onClick={() => onGroupChange(g.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium transition-all ${
                activeGroup === g.key
                  ? "bg-postal-500 text-white shadow-glow-postal"
                  : "bg-white border border-slate-200 text-slate-600 hover:border-postal-300 hover:text-postal-600"
              }`}
            >
              <span className="text-base">{g.icon}</span>
              <span>{g.label}</span>
              <span className="text-[10px] font-arabic opacity-70">{g.labelAr}</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${activeGroup === g.key ? "bg-white/20" : "bg-slate-100"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.map((asset) => (
          <AssetCard key={asset.id} asset={asset} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-8 bg-slate-50 rounded-lg">
          <p className="text-sm text-slate-400">No assets in this category</p>
          <p className="text-xs text-slate-300 font-arabic">لا توجد أصول في هذه الفئة</p>
        </div>
      )}
    </div>
  );
};
