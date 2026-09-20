import React from "react";

export const Footer: React.FC = () => (
  <footer className="bg-royal-900 border-t border-royal-800 mt-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gold-500 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-white/80 font-bold">Jordan Post - Royal Mail Service</p>
            <p className="text-[10px] text-white/40 font-arabic">البريد الأردني - الخدمة البريدية الملكية</p>
          </div>
        </div>
        <div className="text-center md:text-right">
          <p className="text-[10px] text-white/30">
            Asset & Inventory Management System v1.0 &copy; {new Date().getFullYear()}
          </p>
          <p className="text-[10px] text-white/20 font-arabic">
            نظام جرد وموجودات البريد الأردني
          </p>
        </div>
      </div>
    </div>
  </footer>
);
