import type { Asset, InventoryAudit, AssetTransfer } from "@/types";
import { ASSETS_FURNITURE } from "./assets-furniture";
import { ASSETS_POSTAL_IT } from "./assets-postal-it";
import { ASSETS_AMENITIES } from "./assets-amenities";

export const ALL_ASSETS: Asset[] = [...ASSETS_FURNITURE, ...ASSETS_POSTAL_IT, ...ASSETS_AMENITIES];

export const MOCK_AUDITS: InventoryAudit[] = [
  {
    id: "aud-001",
    sessionCode: "AUD-2024-Q4-001",
    title: "الجرد الربعي الرابع - المقر الرئيسي 2024",
    status: "IN_PROGRESS",
    scheduledDate: "2024-12-01",
    startedAt: "2024-12-01T08:00:00Z",
    notes: "Quarterly audit for HQ offices, Phase 2 - Floor 3",
    varianceCount: 1,
    totalItems: 23,
    createdBy: "system-admin",
    officeId: "off-001",
  },
  {
    id: "aud-002",
    sessionCode: "AUD-2025-Q1-003",
    title: "الجرد الربعي الأول - فرع إربد 2025",
    status: "SCHEDULED",
    scheduledDate: "2025-03-15",
    notes: "Scheduled quarterly audit for Irbid branch",
    varianceCount: 0,
    totalItems: 18,
    createdBy: "system-admin",
    officeId: "off-004",
  },
  {
    id: "aud-003",
    sessionCode: "AUD-2024-Q3-007",
    title: "الجرد الربعي الثالث - المقر الرئيسي 2024",
    status: "COMPLETED",
    scheduledDate: "2024-09-01",
    startedAt: "2024-09-01T08:00:00Z",
    completedAt: "2024-09-03T16:30:00Z",
    varianceCount: 0,
    totalItems: 19,
    createdBy: "system-admin",
    officeId: "off-001",
  },
];

export const MOCK_TRANSFERS: AssetTransfer[] = [
  {
    id: "trf-001",
    transferCode: "TRF-2024-0089",
    status: "PENDING_APPROVAL",
    requestDate: "2024-11-28T10:30:00Z",
    reason: "Redistribution of postal scale to balance workload across offices",
    notes: "Backup scale needed due to maintenance of primary unit in AMN-HQ-302",
    fromOfficeId: "off-001",
    toOfficeId: "off-003",
    fromEmployeeId: "emp-001",
    toEmployeeId: "emp-003",
    assets: [
      {
        id: "ta-001",
        condition: "GOOD",
        transferId: "trf-001",
        assetId: "ast-011",
      },
    ],
  },
  {
    id: "trf-002",
    transferCode: "TRF-2024-0091",
    status: "APPROVED",
    requestDate: "2024-11-25T14:00:00Z",
    approvedDate: "2024-11-26T09:00:00Z",
    reason: "New office setup - furniture allocation for Zerqa branch expansion",
    notes: "Approved by Director of Operations",
    approvedBy: "Admin Director",
    fromOfficeId: "off-001",
    toOfficeId: "off-006",
    fromEmployeeId: "emp-001",
    toEmployeeId: "emp-006",
    assets: [
      {
        id: "ta-002",
        condition: "GOOD",
        transferId: "trf-002",
        assetId: "ast-003",
      },
      {
        id: "ta-003",
        condition: "GOOD",
        transferId: "trf-002",
        assetId: "ast-020",
      },
    ],
  },
  {
    id: "trf-003",
    transferCode: "TRF-2024-0095",
    status: "TRANSFERRED",
    requestDate: "2024-11-20T08:00:00Z",
    approvedDate: "2024-11-21T10:00:00Z",
    completedDate: "2024-11-22T14:00:00Z",
    reason: "IT equipment upgrade - old PCs transferred to training center",
    approvedBy: "IT Director",
    fromOfficeId: "off-001",
    toOfficeId: "off-002",
    fromEmployeeId: "emp-001",
    assets: [
      {
        id: "ta-004",
        condition: "GOOD",
        transferId: "trf-003",
        assetId: "ast-008",
      },
    ],
  },
];
