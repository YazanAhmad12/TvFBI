import { create } from "zustand";
import type { Office, Asset, AssetTransfer, InventoryAudit, AssetDisplayGroup } from "@/types";
import { OFFICES } from "@/data/offices";
import { ALL_ASSETS, MOCK_AUDITS, MOCK_TRANSFERS } from "@/data";
import { searchAssets, getAssetsByOffice } from "@/lib/asset-lookup";

interface DashboardState {
  offices: Office[];
  assets: Asset[];
  audits: InventoryAudit[];
  transfers: AssetTransfer[];
  searchQuery: string;
  selectedOfficeId: string | null;
  selectedOfficeDetail: Office | null;
  officeAssets: Asset[];
  isDetailModalOpen: boolean;
  activeDisplayGroup: AssetDisplayGroup;

  setSearchQuery: (q: string) => void;
  selectOffice: (officeId: string) => void;
  openOfficeDetail: (officeId: string) => void;
  closeOfficeDetail: () => void;
  setActiveDisplayGroup: (group: AssetDisplayGroup) => void;
  getFilteredAssets: () => Asset[];
  getDashboardStats: () => {
    totalAssets: number;
    totalAssetValue: number;
    totalOffices: number;
    goodCondition: number;
    underMaintenance: number;
    scrapped: number;
    activeAudits: number;
    pendingTransfers: number;
    healthScore: number;
  };
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  offices: OFFICES,
  assets: ALL_ASSETS,
  audits: MOCK_AUDITS,
  transfers: MOCK_TRANSFERS,
  searchQuery: "",
  selectedOfficeId: null,
  selectedOfficeDetail: null,
  officeAssets: [],
  isDetailModalOpen: false,
  activeDisplayGroup: "FURNITURE",

  setSearchQuery: (q: string) => set({ searchQuery: q }),

  selectOffice: (officeId: string) => set({ selectedOfficeId: officeId }),

  openOfficeDetail: (officeId: string) => {
    const office = get().offices.find((o) => o.id === officeId) ?? null;
    const assets = officeId ? getAssetsByOffice(officeId) : [];
    set({ selectedOfficeDetail: office, officeAssets: assets, isDetailModalOpen: true });
  },

  closeOfficeDetail: () => set({ isDetailModalOpen: false, selectedOfficeDetail: null, officeAssets: [] }),

  setActiveDisplayGroup: (group: AssetDisplayGroup) => set({ activeDisplayGroup: group }),

  getFilteredAssets: () => {
    const { searchQuery, assets } = get();
    if (!searchQuery.trim()) return assets;
    return searchAssets(searchQuery);
  },

  getDashboardStats: () => {
    const { assets, offices, audits, transfers } = get();
    const totalValue = assets.reduce((sum, a) => sum + (a.purchasePrice ?? 0), 0);
    const good = assets.filter((a) => a.condition === "GOOD").length;
    const maintenance = assets.filter((a) => a.condition === "UNDER_MAINTENANCE").length;
    const scrapped = assets.filter((a) => a.condition === "SCRAPPED").length;
    const activeAudits = audits.filter((a) => a.status === "IN_PROGRESS" || a.status === "SCHEDULED").length;
    const pendingTransfers = transfers.filter((t) => t.status === "PENDING_APPROVAL").length;
    const healthScore = assets.length > 0 ? Math.round((good / assets.length) * 100) : 0;

    return {
      totalAssets: assets.length,
      totalAssetValue: totalValue,
      totalOffices: offices.length,
      goodCondition: good,
      underMaintenance: maintenance,
      scrapped,
      activeAudits,
      pendingTransfers,
      healthScore,
    };
  },
}));
