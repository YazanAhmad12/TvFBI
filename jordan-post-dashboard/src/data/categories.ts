import type { AssetCategory } from "@/types";

export const ASSET_CATEGORIES: AssetCategory[] = [
  {
    id: "cat-001",
    name: "Office Furniture",
    nameAr: "الأثاث الإداري",
    description: "Executive desks, hydraulic chairs, visitor seating, filing cabinets, mail sorting tables, service counters, safes",
    icon: "chair-office",
  },
  {
    id: "cat-002",
    name: "Postal & IT Hardware",
    nameAr: "الأجهزة والتقنيات البريدية",
    description: "Desktop PCs, laptops, postal scales, barcode scanners, thermal printers, POS terminals, UPS units, queue screens",
    icon: "cpu",
  },
  {
    id: "cat-003",
    name: "General Amenities",
    nameAr: "المستلزمات العامة",
    description: "Split AC units, fire extinguishers, water coolers, coffee machines",
    icon: "home",
  },
];

export const SUB_CATEGORY_LABELS: Record<string, { en: string; ar: string }> = {
  EXECUTIVE_DESK: { en: "Executive Desk", ar: "مكتب تنفيذي" },
  HYDRAULIC_CHAIR: { en: "Hydraulic Chair", ar: "كرسي هيدروليكي" },
  VISITOR_SEATING: { en: "Visitor Seating", ar: "مقاعد الزوار" },
  FILING_CABINET: { en: "Filing Cabinet", ar: "خزانة ملفات" },
  MAIL_SORTING_TABLE: { en: "Mail Sorting Table", ar: "طاولة فرز البريد" },
  SERVICE_COUNTER: { en: "Service Counter", ar: "كاونتر الخدمة" },
  HEAVY_SAFE: { en: "Heavy Safe", ar: "خزانة حديدية" },
  DESKTOP_PC: { en: "Desktop PC", ar: "كمبيوتر مكتبي" },
  LAPTOP_DOCK: { en: "Laptop & Dock", ar: "حاسوب محمول" },
  POSTAL_SCALE: { en: "Postal Scale", ar: "ميزان بريدي" },
  BARCODE_SCANNER: { en: "Barcode Scanner", ar: "ماسح باركود" },
  THERMAL_PRINTER: { en: "Thermal Printer", ar: "طابعة حرارية" },
  POS_TERMINAL: { en: "POS Terminal", ar: "جهاز نقاط بيع" },
  UPS_UNIT: { en: "UPS Unit", ar: "وحدة طاقة احتياطية" },
  QUEUE_SCREEN: { en: "Queue Screen", ar: "شاشة إدارة الطوابير" },
  SPLIT_AC: { en: "Split AC", ar: "مكيف سبليت" },
  FIRE_EXTINGUISHER: { en: "Fire Extinguisher", ar: "طفاية حريق" },
  WATER_COOLER: { en: "Water Cooler", ar: "مبرد مياه" },
  COFFEE_MACHINE: { en: "Coffee Machine", ar: "ماكينة قهوة" },
};
