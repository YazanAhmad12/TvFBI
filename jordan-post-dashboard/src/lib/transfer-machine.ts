import type { TransferStatus, TransferEvent } from "@/types";

type TransferState = {
  status: TransferStatus;
  error?: string;
};

const VALID_TRANSITIONS: Record<TransferStatus, TransferStatus[]> = {
  DRAFT: ["PENDING_APPROVAL", "CANCELLED"],
  PENDING_APPROVAL: ["APPROVED", "REJECTED", "CANCELLED"],
  APPROVED: ["TRANSFERRED", "CANCELLED"],
  TRANSFERRED: [],
  REJECTED: [],
  CANCELLED: [],
};

export function canTransition(currentStatus: TransferStatus, targetStatus: TransferStatus): boolean {
  return VALID_TRANSITIONS[currentStatus]?.includes(targetStatus) ?? false;
}

export function transitionTransfer(state: TransferState, event: TransferEvent): TransferState {
  const { status } = state;

  switch (event.type) {
    case "SUBMIT": {
      if (!canTransition(status, "PENDING_APPROVAL")) {
        return { status, error: `Cannot submit transfer in "${status}" state` };
      }
      return { status: "PENDING_APPROVAL" };
    }

    case "APPROVE": {
      if (!canTransition(status, "APPROVED")) {
        return { status, error: `Cannot approve transfer in "${status}" state` };
      }
      return { status: "APPROVED" };
    }

    case "REJECT": {
      if (!canTransition(status, "REJECTED")) {
        return { status, error: `Cannot reject transfer in "${status}" state` };
      }
      return { status: "REJECTED" };
    }

    case "COMPLETE": {
      if (!canTransition(status, "TRANSFERRED")) {
        return { status, error: `Cannot complete transfer in "${status}" state` };
      }
      return { status: "TRANSFERRED" };
    }

    case "CANCEL": {
      if (!canTransition(status, "CANCELLED")) {
        return { status, error: `Cannot cancel transfer in "${status}" state` };
      }
      return { status: "CANCELLED" };
    }

    default:
      return { status, error: "Unknown event type" };
  }
}

export function getTransferStatusDisplay(status: TransferStatus): {
  label: string;
  labelAr: string;
  color: string;
  bgColor: string;
} {
  const displayMap: Record<TransferStatus, { label: string; labelAr: string; color: string; bgColor: string }> = {
    DRAFT: { label: "Draft", labelAr: "مسودة", color: "text-slate-600", bgColor: "bg-slate-100" },
    PENDING_APPROVAL: { label: "Pending Approval", labelAr: "بانتظار الاعتماد", color: "text-amber-600", bgColor: "bg-amber-100" },
    APPROVED: { label: "Approved", labelAr: "معتمد", color: "text-blue-600", bgColor: "bg-blue-100" },
    TRANSFERRED: { label: "Transferred", labelAr: "تم التحويل", color: "text-green-600", bgColor: "bg-green-100" },
    REJECTED: { label: "Rejected", labelAr: "مرفوض", color: "text-red-600", bgColor: "bg-red-100" },
    CANCELLED: { label: "Cancelled", labelAr: "ملغي", color: "text-gray-500", bgColor: "bg-gray-100" },
  };
  return displayMap[status];
}

export function generateTransferCode(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 9999)
    .toString()
    .padStart(4, "0");
  return `TRF-${year}-${random}`;
}
