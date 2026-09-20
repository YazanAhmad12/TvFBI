import React from "react";
import { useDashboardStore } from "@/hooks/use-dashboard-store";

const StatCard: React.FC<{
  title: string;
  titleAr: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: { value: number; positive: boolean };
  accentClass: string;
}> = ({ title, titleAr, value, subtitle, icon, trend, accentClass }) => (
  <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-card hover:shadow-card-hover transition-all duration-300 animate-fade-in">
    <div className="flex items-start justify-between">
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{title}</p>
        <p className="text-[10px] font-arabic text-slate-400 mt-0.5">{titleAr}</p>
        <p className="text-2xl font-bold text-royal-900 mt-2 tabular-nums">{value}</p>
        {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
        {trend && (
          <div className={`flex items-center mt-2 text-xs font-medium ${trend.positive ? "text-green-600" : "text-red-500"}`}>
            <span>{trend.positive ? "\u2191" : "\u2193"} {Math.abs(trend.value)}%</span>
            <span className="text-slate-400 ml-1">vs last quarter</span>
          </div>
        )}
      </div>
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${accentClass}`}>
        {icon}
      </div>
    </div>
  </div>
);

const HealthBar: React.FC<{ score: number }> = ({ score }) => (
  <div className="mt-3">
    <div className="flex justify-between items-center mb-1">
      <span className="text-xs text-slate-500">Asset Health Score</span>
      <span className={`text-xs font-bold ${score >= 80 ? "text-green-600" : score >= 50 ? "text-amber-500" : "text-red-500"}`}>
        {score}%
      </span>
    </div>
    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-700 ${score >= 80 ? "bg-green-500" : score >= 50 ? "bg-amber-400" : "bg-red-500"}`}
        style={{ width: `${score}%` }}
      />
    </div>
  </div>
);

export const ExecutiveStats: React.FC = () => {
  const stats = useDashboardStore((s) => s.getDashboardStats());

  return (
    <section className="mb-8">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-1 h-6 bg-gold-500 rounded-full" />
        <div>
          <h2 className="text-lg font-bold text-royal-900">Executive Dashboard</h2>
          <p className="text-xs text-slate-400 font-arabic">لوحة التحكم التنفيذية</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Assets"
          titleAr="إجمالي الأصول"
          value={stats.totalAssets}
          subtitle={`Across ${stats.totalOffices} offices`}
          icon={
            <svg className="w-6 h-6 text-postal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          }
          accentClass="bg-postal-50"
          trend={{ value: 12, positive: true }}
        />

        <StatCard
          title="Asset Value (JOD)"
          titleAr="قيمة الأصول (دينار)"
          value={`JOD ${stats.totalAssetValue.toLocaleString("en-US", { minimumFractionDigits: 0 })}`}
          subtitle="Total acquisition cost"
          icon={
            <svg className="w-6 h-6 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          accentClass="bg-gold-50"
          trend={{ value: 8, positive: true }}
        />

        <StatCard
          title="Active Audits"
          titleAr="عمليات الجرد النشطة"
          value={stats.activeAudits}
          subtitle={`${stats.pendingTransfers} transfers pending`}
          icon={
            <svg className="w-6 h-6 text-royal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          }
          accentClass="bg-royal-50"
        />

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-card hover:shadow-card-hover transition-all duration-300 animate-fade-in">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Asset Health</p>
          <p className="text-[10px] font-arabic text-slate-400 mt-0.5">حالة الأصول</p>
          <HealthBar score={stats.healthScore} />
          <div className="flex gap-4 mt-3">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-[10px] text-slate-500">Good: {stats.goodCondition}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-[10px] text-slate-500">Maint: {stats.underMaintenance}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-[10px] text-slate-500">Scrapped: {stats.scrapped}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
