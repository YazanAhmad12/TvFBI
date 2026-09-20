import React from "react";
import { useDashboardStore } from "@/hooks/use-dashboard-store";
import { AssetBreakdown } from "./AssetBreakdown";

export const OfficeDetailModal: React.FC = () => {
  const { isDetailModalOpen, selectedOfficeDetail, officeAssets, closeOfficeDetail, activeDisplayGroup, setActiveDisplayGroup } =
    useDashboardStore();

  if (!isDetailModalOpen || !selectedOfficeDetail) return null;

  const office = selectedOfficeDetail;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 pb-8 overflow-y-auto">
      <div className="fixed inset-0 bg-royal-900/60 backdrop-blur-sm animate-fade-in" onClick={closeOfficeDetail} />

      <div className="relative bg-white rounded-2xl shadow-modal w-full max-w-5xl mx-4 animate-slide-up">
        <div className="bg-gradient-to-r from-royal-900 via-royal-800 to-postal-700 rounded-t-2xl p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-gold-500/20 text-gold-300 text-xs font-mono font-bold">
                    {office.officeCode}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-white/10 text-white/70 text-[10px]">
                    {officeAssets.length} assets
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white mt-1.5">{office.officeName}</h2>
                <p className="text-sm text-white/60 font-arabic">{office.branch}</p>
              </div>
            </div>
            <button
              onClick={closeOfficeDetail}
              className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {office.employee && (
            <div className="mt-4 flex items-center gap-3 bg-white/10 rounded-lg p-3">
              <div className="w-10 h-10 rounded-full bg-postal-500 flex items-center justify-center text-white font-bold text-sm">
                {office.employee.fullName.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium text-white">{office.employee.fullName}</p>
                <p className="text-[11px] text-white/50">
                  #{office.employee.employeeNumber} - {office.employee.role} - {office.employee.department}
                </p>
              </div>
              {office.employee.email && (
                <a
                  href={`mailto:${office.employee.email}`}
                  className="ml-auto text-xs text-postal-300 hover:text-postal-200 transition-colors"
                >
                  {office.employee.email}
                </a>
              )}
            </div>
          )}
        </div>

        <div className="p-6">
          <AssetBreakdown assets={officeAssets} activeGroup={activeDisplayGroup} onGroupChange={setActiveDisplayGroup} />
        </div>

        <div className="border-t border-slate-100 px-6 py-4 flex items-center justify-between">
          <div className="flex gap-4 text-[10px] text-slate-400">
            <span>Location: {office.building}, {office.floor}</span>
            <span>City: {office.city}</span>
          </div>
          <button className="px-4 py-2 bg-postal-500 text-white text-xs font-medium rounded-lg hover:bg-postal-600 transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Export Audit Report
          </button>
        </div>
      </div>
    </div>
  );
};
