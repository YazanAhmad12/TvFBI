import React, { useState } from "react";
import { useDashboardStore } from "@/hooks/use-dashboard-store";
import { OFFICES } from "@/data/offices";
import { ALL_ASSETS } from "@/data";

export const OfficeGrid: React.FC = () => {
  const { searchQuery, setSearchQuery, openOfficeDetail } = useDashboardStore();
  const [searchField, setSearchField] = useState<"office" | "employee" | "barcode">("office");

  const filteredOffices = OFFICES.filter((office) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    switch (searchField) {
      case "office":
        return office.officeCode.toLowerCase().includes(q) || office.officeName.includes(searchQuery);
      case "employee":
        return office.employee?.fullName.includes(searchQuery) || office.employee?.employeeNumber.includes(searchQuery);
      case "barcode":
        return ALL_ASSETS.some(
          (a) => a.officeId === office.id && (a.qrCode.toLowerCase().includes(q) || a.assetTag.toLowerCase().includes(q))
        );
      default:
        return true;
    }
  });

  return (
    <section className="mb-8">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-1 h-6 bg-postal-500 rounded-full" />
        <div>
          <h2 className="text-lg font-bold text-royal-900">Office Directory</h2>
          <p className="text-xs text-slate-400 font-arabic">دليل المكاتب</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-card mb-5">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex bg-slate-100 rounded-lg p-1">
            {[
              { key: "office" as const, label: "Office", labelAr: "المكتب" },
              { key: "employee" as const, label: "Employee", labelAr: "الموظف" },
              { key: "barcode" as const, label: "Barcode", labelAr: "الباركود" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSearchField(tab.key)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  searchField === tab.key
                    ? "bg-postal-500 text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {tab.label}
                <span className="block text-[9px] font-arabic opacity-70">{tab.labelAr}</span>
              </button>
            ))}
          </div>

          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                searchField === "office"
                  ? "Search by office code or name..."
                  : searchField === "employee"
                  ? "Search by employee name or number..."
                  : "Scan or enter barcode / QR code..."
              }
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-royal-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-postal-500/30 focus:border-postal-400 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredOffices.map((office) => {
          const officeAssets = ALL_ASSETS.filter((a) => a.officeId === office.id && a.isActive);
          const good = officeAssets.filter((a) => a.condition === "GOOD").length;
          const maintenance = officeAssets.filter((a) => a.condition === "UNDER_MAINTENANCE").length;
          const scrapped = officeAssets.filter((a) => a.condition === "SCRAPPED").length;

          return (
            <button
              key={office.id}
              onClick={() => openOfficeDetail(office.id)}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-card hover:shadow-card-hover hover:border-postal-300 transition-all duration-300 text-left group animate-fade-in"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-postal-50 text-postal-700 text-xs font-mono font-bold">
                      {office.officeCode}
                    </span>
                    <span className={`w-2 h-2 rounded-full ${office.isActive ? "bg-green-400" : "bg-red-400"}`} />
                  </div>
                  <h3 className="text-sm font-semibold text-royal-900 mt-2 group-hover:text-postal-600 transition-colors">
                    {office.officeName}
                  </h3>
                  <p className="text-xs text-slate-400 font-arabic">{office.branch}</p>
                </div>
                <svg className="w-5 h-5 text-slate-300 group-hover:text-postal-500 transition-colors shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>

              {office.employee && (
                <div className="flex items-center gap-3 bg-slate-50 rounded-lg p-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-postal-100 flex items-center justify-center text-postal-700 text-sm font-bold shrink-0">
                    {office.employee.fullName.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-royal-900 truncate">{office.employee.fullName}</p>
                    <p className="text-[10px] text-slate-400">
                      #{office.employee.employeeNumber} - {office.employee.role}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 text-[10px]">
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <span className="text-slate-500">{good} Good</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span className="text-slate-500">{maintenance} Maint.</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  <span className="text-slate-500">{scrapped} Scrapped</span>
                </div>
                <span className="text-slate-300 mx-1">|</span>
                <span className="text-slate-500 font-medium">{officeAssets.length} Total</span>
              </div>
            </button>
          );
        })}
      </div>

      {filteredOffices.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
          <svg className="w-12 h-12 text-slate-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p className="text-sm text-slate-400">No offices found matching your search</p>
          <p className="text-xs text-slate-300 font-arabic">لم يتم العثور على مكاتب مطابقة</p>
        </div>
      )}
    </section>
  );
};
