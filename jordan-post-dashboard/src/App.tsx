import React from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ExecutiveStats } from "./components/ExecutiveStats";
import { OfficeGrid } from "./components/OfficeGrid";
import { OfficeDetailModal } from "./components/OfficeDetailModal";

export const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <ExecutiveStats />
        <OfficeGrid />
      </main>

      <OfficeDetailModal />
      <Footer />
    </div>
  );
};
