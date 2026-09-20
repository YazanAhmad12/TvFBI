export interface Office {
  id: string;
  officeCode: string;
  officeName: string;
  branch: string;
  floor?: string;
  building?: string;
  city: string;
  isActive: boolean;
  employeeId?: string;
  employee?: Employee;
  assets?: Asset[];
  audits?: InventoryAudit[];
  _count?: {
    assets: number;
  };
}

export interface Employee {
  id: string;
  fullName: string;
  employeeNumber: string;
  role: string;
  department: string;
  avatarUrl?: string;
  email?: string;
  phone?: string;
}

export interface AssetCategory {
  id: string;
  name: string;
  nameAr: string;
  description?: string;
  icon?: string;
  assets?: Asset[];
}

export type AssetSubCategory =
  | "EXECUTIVE_DESK"
  | "HYDRAULIC_CHAIR"
  | "VISITOR_SEATING"
  | "FILING_CABINET"
  | "MAIL_SORTING_TABLE"
  | "SERVICE_COUNTER"
  | "HEAVY_SAFE"
  | "DESKTOP_PC"
  | "LAPTOP_DOCK"
  | "POSTAL_SCALE"
  | "BARCODE_SCANNER"
  | "THERMAL_PRINTER"
  | "POS_TERMINAL"
  | "UPS_UNIT"
  | "QUEUE_SCREEN"
  | "SPLIT_AC"
  | "FIRE_EXTINGUISHER"
  | "WATER_COOLER"
  | "COFFEE_MACHINE";

export type AssetCondition = "GOOD" | "UNDER_MAINTENANCE" | "SCRAPPED" | "RESERVED";

export type AssetDisplayGroup = "FURNITURE" | "POSTAL_IT" | "GENERAL";

export interface Asset {
  id: string;
  serialNumber: string;
  assetTag: string;
  qrCode: string;
  itemName: string;
  itemNameAr: string;
  specifications?: Record<string, string>;
  condition: AssetCondition;
  acquisitionDate: string;
  warrantyExpiry?: string;
  purchasePrice?: number;
  currentValue?: number;
  subCategory: AssetSubCategory;
  notes?: string;
  isActive: boolean;
  officeId: string;
  office?: Office;
  categoryId: string;
  category?: AssetCategory;
  employeeId?: string;
  employee?: Employee;
}

export type AuditStatus = "SCHEDULED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";

export interface InventoryAudit {
  id: string;
  sessionCode: string;
  title: string;
  status: AuditStatus;
  scheduledDate: string;
  startedAt?: string;
  completedAt?: string;
  notes?: string;
  varianceCount: number;
  totalItems: number;
  createdBy: string;
  officeId: string;
  office?: Office;
  items?: AuditItem[];
}

export interface AuditItem {
  id: string;
  expectedQty: number;
  countedQty: number;
  variance: number;
  condition?: AssetCondition;
  notes?: string;
  isVerified: boolean;
  auditId: string;
  assetId: string;
  asset?: Asset;
}

export type TransferStatus =
  | "DRAFT"
  | "PENDING_APPROVAL"
  | "APPROVED"
  | "TRANSFERRED"
  | "REJECTED"
  | "CANCELLED";

export interface AssetTransfer {
  id: string;
  transferCode: string;
  status: TransferStatus;
  requestDate: string;
  approvedDate?: string;
  completedDate?: string;
  reason: string;
  notes?: string;
  approvedBy?: string;
  fromOfficeId: string;
  fromOffice?: Office;
  toOfficeId: string;
  toOffice?: Office;
  fromEmployeeId?: string;
  fromEmployee?: Employee;
  toEmployeeId?: string;
  toEmployee?: Employee;
  assets?: TransferAsset[];
}

export interface TransferAsset {
  id: string;
  condition: AssetCondition;
  notes?: string;
  transferId: string;
  assetId: string;
  asset?: Asset;
}

export interface DashboardStats {
  totalAssets: number;
  totalAssetValue: number;
  totalOffices: number;
  totalEmployees: number;
  goodCondition: number;
  underMaintenance: number;
  scrapped: number;
  activeAudits: number;
  pendingTransfers: number;
  recentTransfers: AssetTransfer[];
}

export interface OfficeFloorData {
  officeCode: string;
  officeName: string;
  employeeName: string;
  assetCount: number;
  conditionBreakdown: {
    good: number;
    underMaintenance: number;
    scrapped: number;
  };
}

export type TransferEvent =
  | { type: "SUBMIT"; transferId: string }
  | { type: "APPROVE"; transferId: string; approvedBy: string }
  | { type: "REJECT"; transferId: string; reason: string }
  | { type: "COMPLETE"; transferId: string }
  | { type: "CANCEL"; transferId: string };
