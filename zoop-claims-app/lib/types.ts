export interface User {
  name: string;
  initials: string;
  phone: string;
}

export type ClaimStatusChip =
  | "In Survey"
  | "Under Repair"
  | "Under Settlement"
  | "Closed";

/** Status used for filter chips + status pills in My Claims */
export type ClaimStatusKey =
  | "REGISTERED"
  | "UNDER INVESTIGATION"
  | "UNDER SETTLEMENT"
  | "REPUDIATED"
  | "CLOSED";

export interface ClaimSummary {
  id: string;                // ZP-CLM-2026-04-1842
  shortId: string;           // CLM-2026-04-1842
  vehicle: string;           // Hyundai Verna Lxi
  regNumber: string;         // MH-56-M-7854
  insurer: string;           // HDFC Ergo
  status: ClaimStatusKey;
  statusNote: string;
  statusNoteTone: "success" | "danger" | "neutral";
  dateLabel: string;
}

/** Dashboard's active-claim card carries extra fields (carousel + stage progress) */
export interface ActiveClaim extends ClaimSummary {
  carousel: {
    statusChip: ClaimStatusChip;
    stageIndex: number;      // 0..3
    stageLabel: string;
    actionNeeded?: { title: string; dueHrs: number };
  };
}

export interface Task {
  id: string;
  title: string;
  claimVehicle: string;
  claimShortId: string;
  icon: "doc" | "photo";
  dueLabel?: string;
}

export interface Notification {
  id: string;
  icon: "photo" | "doc" | "check";
  title: string;
  meta: string;
  read: boolean;
}

/* ============================================================
   Claim-detail (status-specific page) building blocks
   ============================================================ */

export type SubItemIconKind = "spark" | "doc" | "photo" | "check";

export interface TimelineSubItem {
  icon: SubItemIconKind;
  label: string;
  date?: string;
}

export interface TimelineStep {
  label: string;
  date?: string;
  state: "completed" | "current" | "upcoming";
  subItems?: TimelineSubItem[];
}

export interface ReportFile {
  name: string;
  format: "PDF";
  size: string;                   // "1.2 MB"
  variant?: "estimate" | "invoice" | "settlement";
}

/** Open-task card used on REGISTERED / INVESTIGATION detail pages */
export interface OpenTask {
  id: string;
  title: string;
  meta: string;                   // "Pending · 23 April · 14:00" or "Photo was blurry · retake in good light"
  variant: "action" | "neutral";  // 'action' = yellow tinted highlight card
  trailing?: "upload" | "badge";  // small upload arrow vs a badge
  badge?: string;                 // e.g. "2d ago" — only used when trailing="badge"
  icon: "doc" | "photo";
}

/** Single-line task-status item (the pending/submitted list on REGISTERED detail) */
export interface TaskStatusItem {
  id: string;
  title: string;
  meta: string;
  state: "pending" | "submitted";
}
