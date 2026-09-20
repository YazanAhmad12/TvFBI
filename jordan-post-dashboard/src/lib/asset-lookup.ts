import type { Asset, AssetCondition } from "@/types";
import { ALL_ASSETS } from "@/data";

export function lookupByQRCode(qrCode: string): Asset | undefined {
  return ALL_ASSETS.find((a) => a.qrCode === qrCode);
}

export function lookupByAssetTag(assetTag: string): Asset | undefined {
  return ALL_ASSETS.find((a) => a.assetTag === assetTag);
}

export function lookupBySerialNumber(serialNumber: string): Asset | undefined {
  return ALL_ASSETS.find((a) => a.serialNumber === serialNumber);
}

export function searchAssets(query: string): Asset[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return ALL_ASSETS.filter(
    (a) =>
      a.qrCode.toLowerCase().includes(q) ||
      a.assetTag.toLowerCase().includes(q) ||
      a.serialNumber.toLowerCase().includes(q) ||
      a.itemName.toLowerCase().includes(q) ||
      a.itemNameAr.includes(query.trim())
  );
}

export function getAssetsByOffice(officeId: string): Asset[] {
  return ALL_ASSETS.filter((a) => a.officeId === officeId && a.isActive);
}

export function getAssetsByCategory(categoryId: string): Asset[] {
  return ALL_ASSETS.filter((a) => a.categoryId === categoryId);
}

export function getAssetsByCondition(condition: AssetCondition): Asset[] {
  return ALL_ASSETS.filter((a) => a.condition === condition);
}

export function calculateDepreciation(purchasePrice: number, acquisitionDate: string, usefulLifeYears: number = 5): number {
  const acquired = new Date(acquisitionDate);
  const now = new Date();
  const yearsElapsed = (now.getTime() - acquired.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
  const annualDepreciation = purchasePrice / usefulLifeYears;
  const accumulated = annualDepreciation * Math.min(yearsElapsed, usefulLifeYears);
  return Math.max(0, purchasePrice - accumulated);
}

export function getAssetHealthScore(assets: Asset[]): number {
  if (assets.length === 0) return 0;
  const good = assets.filter((a) => a.condition === "GOOD").length;
  return Math.round((good / assets.length) * 100);
}
