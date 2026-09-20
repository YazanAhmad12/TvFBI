import React, { useState } from "react";

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-royal-900 via-royal-800 to-postal-700 sticky top-0 z-40">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold-500 flex items-center justify-center shadow-glow-gold">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-sm font-bold text-white tracking-wide">Jordan Post</h1>
                <p className="text-[10px] text-postal-200 font-arabic">البريد الأردني</p>
              </div>
            </div>
            <div className="hidden md:block h-8 w-px bg-white/20" />
            <div className="hidden md:block">
              <p className="text-xs text-white/80 font-medium">Asset & Inventory Management</p>
              <p className="text-[10px] text-white/40 font-arabic">نظام جرد وموجودات</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {[
              { label: "Dashboard", labelAr: "لوحة التحكم", active: true },
              { label: "Assets", labelAr: "الأصول" },
              { label: "Audits", labelAr: "الجرد" },
              { label: "Transfers", labelAr: "التحويلات" },
            ].map((item) => (
              <button
                key={item.label}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  item.active
                    ? "bg-white/15 text-white"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.label}
                <span className="block text-[8px] font-arabic opacity-60">{item.labelAr}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button className="relative p-2 text-white/60 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-gold-500 rounded-full" />
            </button>
            <div className="hidden sm:block w-8 h-8 rounded-full bg-postal-500 flex items-center justify-center text-white text-xs font-bold cursor-pointer">
              A
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white/60 hover:text-white"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
