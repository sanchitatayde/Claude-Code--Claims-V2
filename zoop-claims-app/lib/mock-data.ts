import type {
  ActiveClaim,
  ClaimSummary,
  HelpCategory,
  HelpClaimContext,
  IssueResponse,
  IssueSummary,
  Notification,
  OpenTask,
  QuickRead,
  ReportFile,
  SupportCase,
  Task,
  TaskStatusItem,
  TimelineStep,
  User,
} from "./types";

export const MOCK_USER: User = {
  name: "Sanchita Tayde",
  initials: "S",
  phone: "+91 98213 44210",
};

/** Dashboard active claims (carousel) */
export const ACTIVE_CLAIMS: ActiveClaim[] = [
  {
    id: "ZP-CLM-2026-04-1842",
    shortId: "CLM-2026-04-1842",
    vehicle: "Hyundai Verna Lxi",
    regNumber: "MH-44-H-5475",
    insurer: "HDFC Ergo",
    status: "UNDER INVESTIGATION",
    statusNote: "Under assessment",
    statusNoteTone: "neutral",
    dateLabel: "Today",
    carousel: {
      statusChip: "In Survey",
      stageIndex: 1,
      stageLabel: "Under assessment",
      actionNeeded: { title: "Re-upload front bumper photo", dueHrs: 4 },
    },
  },
  {
    id: "ZP-CLM-2026-04-2017",
    shortId: "CLM-2026-04-2017",
    vehicle: "Maruti Swift Vxi",
    regNumber: "MH-32-H-4389",
    insurer: "ICICI Lombard",
    status: "UNDER SETTLEMENT",
    statusNote: "Repair in progress at MGF Motors",
    statusNoteTone: "success",
    dateLabel: "Today",
    carousel: {
      statusChip: "Under Repair",
      stageIndex: 2,
      stageLabel: "Estimate Approved · Repair in progress",
    },
  },
];

/** Full claims list (My Claims) — 5 cards across all states */
export const ALL_CLAIMS: ClaimSummary[] = [
  {
    id: "ZP-CLM-2026-04-1842",
    shortId: "CLM-2026-04-1842",
    vehicle: "Hyundai Verna Lxi",
    regNumber: "MH-56-M-7854",
    insurer: "HDFC Ergo",
    status: "REGISTERED",
    statusNote: "Documents requested",
    statusNoteTone: "success",
    dateLabel: "6 days ago",
  },
  {
    id: "ZP-CLM-2026-04-1843",
    shortId: "CLM-2026-04-1843",
    vehicle: "Hyundai Verna Lxi",
    regNumber: "MH-12-A-4421",
    insurer: "ICICI Lombard",
    status: "UNDER INVESTIGATION",
    statusNote: "₹18,400 estimated",
    statusNoteTone: "success",
    dateLabel: "6 days ago",
  },
  {
    id: "ZP-CLM-2026-04-1844",
    shortId: "CLM-2026-04-1844",
    vehicle: "Mahindra Scorpio S5",
    regNumber: "MH-56-M-7854",
    insurer: "HDFC Ergo",
    status: "REPUDIATED",
    statusNote: "DL not valid at date of loss",
    statusNoteTone: "danger",
    dateLabel: "6 days ago",
  },
  {
    id: "ZP-CLM-2025-12-0921",
    shortId: "CLM-2025-12-0921",
    vehicle: "Mahindra Scorpio S5",
    regNumber: "MH-56-M-7854",
    insurer: "HDFC Ergo",
    status: "CLOSED",
    statusNote: "Claim Settled",
    statusNoteTone: "success",
    dateLabel: "20 Apr 2024",
  },
  {
    id: "ZP-CLM-2026-04-2017",
    shortId: "CLM-2026-04-2017",
    vehicle: "Maruti Swift Vxi",
    regNumber: "MH-32-H-4389",
    insurer: "ICICI Lombard",
    status: "UNDER SETTLEMENT",
    statusNote: "₹38,420 approved",
    statusNoteTone: "success",
    dateLabel: "Today",
  },
];

/** Look up a claim by shortId. Falls back to the first claim so taps from
 *  anywhere always land on a populated page during prototype work. */
export function getClaimByShortId(shortId: string): ClaimSummary {
  return (
    ALL_CLAIMS.find((c) => c.shortId === shortId) ??
    ACTIVE_CLAIMS.find((c) => c.shortId === shortId) ??
    ALL_CLAIMS[0]
  );
}

export const TASKS: Task[] = [
  {
    id: "t-1",
    title: "Upload Driving License",
    claimVehicle: "Hyundai Verna Lxi",
    claimShortId: "CLM-2026-04-1842",
    icon: "doc",
    dueLabel: "due 2 days",
  },
  {
    id: "t-2",
    title: "Reupload front bumper",
    claimVehicle: "Hyundai Verna Lxi",
    claimShortId: "CLM-2026-04-1842",
    icon: "photo",
  },
];

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: "n-1",
    icon: "photo",
    title: "Garage uploaded 6 inspection photos",
    meta: "2h ago · Hyundai Verna Lxi",
    read: false,
  },
  {
    id: "n-2",
    icon: "doc",
    title: "Estimate received · ₹35,200",
    meta: "4h ago · Hyundai Verna Lxi",
    read: false,
  },
  {
    id: "n-3",
    icon: "check",
    title: "Handler approved estimate",
    meta: "Yesterday · Hyundai Verna Lxi",
    read: true,
  },
];

/* ============================================================
   Status-specific detail content (per claim status)
   Each factory takes the source ClaimSummary so the content
   reflects the card the user came from where it makes sense.
   ============================================================ */

/** REGISTERED — claim registered, documents being collected */
export function getRegisteredDetail(_: ClaimSummary) {
  const openTasks: OpenTask[] = [
    {
      id: "rt-1",
      title: "Re-Upload Claim Form",
      meta: "Pending · 23 April · 14:00",
      variant: "action",
      icon: "doc",
    },
    {
      id: "rt-2",
      title: "Upload Vehicle Photos",
      meta: "Pending · 23 April · 14:00",
      variant: "neutral",
      trailing: "upload",
      icon: "photo",
    },
    {
      id: "rt-3",
      title: "Self Inspection requested",
      meta: "Pending · 23 April · 14:00",
      variant: "neutral",
      trailing: "upload",
      icon: "photo",
    },
  ];

  const taskStatusItems: TaskStatusItem[] = [
    { id: "ts-1", title: "PAN Card", meta: "Pending · 23 April · 14:00", state: "pending" },
    { id: "ts-2", title: "Aadhaar Card", meta: "Pending · 23 April · 14:00", state: "pending" },
    { id: "ts-3", title: "Policy copy", meta: "submitted · 23 April · 14:00", state: "submitted" },
    { id: "ts-4", title: "PAN Card", meta: "submitted · 23 April · 14:00", state: "submitted" },
    { id: "ts-5", title: "Claim form", meta: "submitted · 23 April · 14:00", state: "submitted" },
    { id: "ts-6", title: "Driving Licence", meta: "submitted · 23 April · 14:00", state: "submitted" },
  ];

  const timeline: TimelineStep[] = [
    { label: "Registered", date: "22 Feb, 11:00 AM", state: "completed" },
    {
      label: "Under investigation",
      date: "22 Feb, 11:00 AM",
      state: "current",
      subItems: [
        { icon: "doc", label: "Documents uploaded", date: "26 Feb, 11:00 AM" },
        {
          icon: "photo",
          label: "Self Inspection requested",
          date: "Last updated 26 Feb, 11:00 AM",
        },
        { icon: "doc", label: "Documents evaluated" },
        { icon: "photo", label: "Damage Photos evaluated" },
      ],
    },
    { label: "Under Settlement", date: "~3-5 days", state: "upcoming" },
    { label: "Closed", state: "upcoming" },
  ];

  return { openTasks, taskStatusItems, timeline };
}

/** UNDER INVESTIGATION — surveyor scheduled, a few open tasks */
export function getInvestigationDetail(_: ClaimSummary) {
  const surveyor = {
    timestamp: "2 hours ago · 12 May, 1:42 PM",
    title: "A Surveyor visit has been scheduled on your claim",
    body: "K. Sharma will visit Mahindra Service Center on 26 Feb between 10 am – 12 pm to inspect the vehicle.",
  };

  const openTasks: OpenTask[] = [
    {
      id: "it-1",
      title: "Upload DL",
      meta: "Photo was blurry · retake in good light",
      variant: "action",
      trailing: "badge",
      badge: "2d ago",
      icon: "doc",
    },
    {
      id: "it-2",
      title: "Upload FIR",
      meta: "FIR needed for commercial accidents",
      variant: "neutral",
      icon: "doc",
    },
  ];

  const timeline: TimelineStep[] = [
    { label: "Registered", date: "22 Feb, 11:00 AM", state: "completed" },
    {
      label: "Under investigation",
      date: "22 Feb, 11:00 AM",
      state: "current",
      subItems: [
        { icon: "check", label: "Documents uploaded", date: "26 Feb, 11:00 AM" },
        {
          icon: "spark",
          label: "Survey conducted",
          date: "Last updated 26 Feb, 11:00 AM",
        },
        { icon: "doc", label: "Documents evaluated" },
        { icon: "photo", label: "Damage Photos evaluated" },
      ],
    },
    { label: "Under Settlement", date: "~3-5 days", state: "upcoming" },
    { label: "Closed", state: "upcoming" },
  ];

  return { surveyor, openTasks, timeline };
}

/** UNDER SETTLEMENT — estimate approved, repair ongoing */
export function getSettlementDetail(_: ClaimSummary) {
  const approvedAmount = 47800;
  const youPay = 2500;

  const ongoingRepair = {
    timestamp: "2 hours ago · 12 May, 1:42 PM",
    title: "Ongoing Repair",
    body: "Check Uploaded photos by garage for more info",
    cta: "View Photos",
  };

  const reports: ReportFile[] = [
    { name: "Estimate", format: "PDF", size: "1.2 MB", variant: "estimate" },
  ];

  const timeline: TimelineStep[] = [
    { label: "Registered", date: "22 Feb, 11:00 AM", state: "completed" },
    { label: "Under investigation", date: "24 Feb, 11:00 AM", state: "completed" },
    {
      label: "Under Settlement",
      date: "Last updated 22 Feb, 11:00 AM",
      state: "current",
      subItems: [
        { icon: "spark", label: "Repair ongoing", date: "Last updated 26 Feb, 11:00 AM" },
        {
          icon: "spark",
          label: "Repair photos uploaded",
          date: "Last updated 26 Feb, 11:00 AM",
        },
        { icon: "doc", label: "Invoice uploaded" },
        { icon: "photo", label: "Repair evaluated" },
        { icon: "photo", label: "Discharge approved" },
      ],
    },
    { label: "Closed", state: "upcoming" },
  ];

  return { approvedAmount, youPay, ongoingRepair, reports, timeline };
}

/** CLOSED — settled and closed */
export function getClosedDetail(_: ClaimSummary) {
  const approvedAmount = 47800;
  const youPay = 2500;
  const settledOn = "28 Feb 2026";
  const closedIn = "16 days";

  const reports: ReportFile[] = [
    { name: "Estimate", format: "PDF", size: "1.2 MB", variant: "estimate" },
    { name: "Final invoice", format: "PDF", size: "720 KB", variant: "invoice" },
    { name: "Settlement Report", format: "PDF", size: "410 KB", variant: "settlement" },
  ];

  const timeline: TimelineStep[] = [
    { label: "Registered", date: "22 Feb, 11:00 AM", state: "completed" },
    { label: "Under investigation", date: "24 Feb, 11:00 AM", state: "completed" },
    { label: "Settlement approved", date: "24 Feb, 11:00 AM", state: "completed" },
    { label: "Closed", date: "24 Feb, 11:00 AM", state: "completed" },
  ];

  return { approvedAmount, youPay, settledOn, closedIn, reports, timeline };
}

/** REPUDIATED — claim rejected (no screenshot provided yet; minimal fallback) */
export function getRepudiatedDetail(c: ClaimSummary) {
  return {
    reason: c.statusNote,
    timeline: [
      { label: "Registered", date: "22 Feb, 11:00 AM", state: "completed" as const },
      { label: "Under investigation", date: "24 Feb, 11:00 AM", state: "completed" as const },
      { label: "Repudiated", date: "26 Feb, 11:00 AM", state: "completed" as const },
    ] satisfies TimelineStep[],
  };
}

/** Single shared docs & photos block */
export const DOCS_AND_PHOTOS = {
  thumbnails: 4 as const,
  overflowCount: 5,
  labels: ["Damage", "Damage", "Damage", "+5"] as const,
};

/* ============================================================
   HELP / SUPPORT flow
   ============================================================ */

export const SUPPORT_CASES: SupportCase[] = [
  // Open
  {
    id: "SUP-2394",
    claimShortId: "CL-04722",
    title: "Insurer queried the estimate",
    state: "open",
    unreadCount: 1,
    dateLabel: "2:00 PM",
  },
  {
    id: "SUP-2394",
    claimShortId: "CL-04722",
    title: "Payout is delayed",
    state: "open",
    unreadCount: 2,
    dateLabel: "Yesterday",
  },
  // Resolved (3 visible + more behind "See all")
  {
    id: "SUP-2388",
    claimShortId: "CL-04701",
    title: "Surveyor rescheduled the visit",
    state: "resolved",
    dateLabel: "resolved 21 May",
  },
  {
    id: "SUP-2375",
    claimShortId: "CL-04634",
    title: "Document upload was failing",
    state: "resolved",
    dateLabel: "resolved 18 May",
  },
  {
    id: "SUP-2369",
    claimShortId: "CL-04612",
    title: "Bank details updated",
    state: "resolved",
    dateLabel: "resolved 15 May",
  },
];

export const SUPPORT_TOTALS = {
  all: 20,
  open: 2,
  resolved: 18,
};

export const HELP_CATEGORIES: HelpCategory[] = [
  { key: "specific-claim",  title: "A specific claim", sub: "Pick a claim to start",       icon: "claim"    },
  { key: "finance",         title: "Finance",          sub: "ETA, deductions, bank",       icon: "rupee"    },
  { key: "estimates",       title: "Estimates",        sub: "query, supplementary",        icon: "estimate" },
  { key: "surveyor",        title: "Surveyor",         sub: "Visit, video, reschedule",    icon: "surveyor" },
  { key: "documents",       title: "Documents",        sub: "Upload, rejected, missing",   icon: "doc"      },
  { key: "bank-profile",    title: "Bank & profile",   sub: "account, KYC",                icon: "bank"     },
];

export const QUICK_READS: QuickRead[] = [
  { id: "qr-1", title: "How cashless payout works",         minutes: 3 },
  { id: "qr-2", title: "What to do if an estimate is queried", minutes: 2 },
  { id: "qr-3", title: "Updating garage bank details",      minutes: 1 },
];

/** Default claim context used by the help flow when the user hasn't picked one
 *  yet, or when the source claim isn't in ALL_CLAIMS. Mirrors the screenshots. */
export const DEFAULT_HELP_CLAIM: HelpClaimContext = {
  shortId: "CL-04788",
  vehicle: "Hyundai Verna",
  insurer: "ICICI Lombard",
  insurerCode: "ICICI",
  stage: "Repair & completion",
};

export function getHelpClaim(shortId?: string | null): HelpClaimContext {
  if (!shortId) return DEFAULT_HELP_CLAIM;
  const c = ALL_CLAIMS.find((x) => x.shortId === shortId);
  if (!c) return { ...DEFAULT_HELP_CLAIM, shortId };
  return {
    shortId: c.shortId,
    vehicle: c.vehicle.replace(/\s+Lxi$|\s+Vxi$/i, ""),
    insurer: c.insurer,
    insurerCode: c.insurer === "HDFC Ergo" ? "HDFC" : "ICICI",
    stage: stageFromStatus(c.status),
  };
}

function stageFromStatus(s: ClaimSummary["status"]): string {
  switch (s) {
    case "REGISTERED": return "Documents collection";
    case "UNDER INVESTIGATION": return "Investigation";
    case "UNDER SETTLEMENT": return "Repair & completion";
    case "CLOSED": return "Closed";
    case "REPUDIATED": return "Repudiated";
  }
}

/** Issue picker — Screen 4 content */
export const ISSUE_LIST: IssueSummary[] = [
  // Featured / most relevant
  {
    id: "tax-invoice-rejected",
    title: "Tax invoice was rejected",
    sub: "Insurer or DSP returned the invoice for…",
    actionNeeded: true,
    group: "featured",
  },
  {
    id: "repair-taking-longer",
    title: "Repair is taking longer than expected",
    sub: "Update the customer / extend ETA",
    group: "featured",
  },
  {
    id: "dispute-repair-quality",
    title: "Customer dispute on repair quality",
    sub: "Open a complaint thread with the insurer",
    group: "featured",
  },
  // Payments & payouts
  { id: "payout-delayed",           title: "Payout is delayed",                       group: "payments"  },
  { id: "payout-less-than-expected",title: "Payout amount is less than expected",     group: "payments"  },
  { id: "wrong-bank-account",       title: "Wrong bank account / want to update",     group: "payments"  },
  // Estimates
  { id: "estimate-queried-insurer", title: "Estimate was queried by insurer",         group: "estimates" },
  { id: "supplementary-estimate",   title: "I want to add a supplementary estimate",  group: "estimates" },
];

/** Issue response bodies. 'payout-delayed' has the full content from the
 *  reference screen; the rest get a sensible placeholder so taps don't dead-end. */
export const ISSUE_RESPONSES: Record<string, IssueResponse> = {
  "payout-delayed": {
    id: "payout-delayed",
    title: "Payout is delayed",
    summary:
      "Your payout for {claim} is in the insurer's approval queue. Approved amount ₹14,800 was sent to {insurer} on 23 May. Expected payout to your bank in 24–48 hours.",
    steps: [
      { label: "Invoice verified by DSP",            date: "22 May, 4:12 PM",  state: "completed" },
      { label: "Approval letter issued by insurer",  date: "23 May, 10:48 AM", state: "completed" },
      { label: "Payment instruction sent to insurer bank", date: "Today, 9:15 AM", state: "current" },
      { label: "Funds expected in your account",     date: "ETA tomorrow, 6 PM", state: "upcoming" },
    ],
    confirms: [
      "Bank A/C XXXX-3491 confirmed on file",
      "{insurer} typically pays in 1–2 working days",
      "Today is 28 May — within expected window",
    ],
  },
  "tax-invoice-rejected": {
    id: "tax-invoice-rejected",
    title: "Tax invoice was rejected",
    summary:
      "The tax invoice for {claim} was returned. Common reasons: GST number mismatch, missing line items, or wrong final amount. Re-upload a corrected invoice to resume the payout.",
    steps: [
      { label: "Invoice received from garage", date: "22 May, 11:10 AM", state: "completed" },
      { label: "Returned by {insurer}",        date: "23 May, 9:42 AM",  state: "current"   },
      { label: "Re-upload corrected invoice",  state: "upcoming" },
      { label: "Insurer re-review",            state: "upcoming" },
    ],
    confirms: [
      "Upload limit: 5 MB · PDF only",
      "Re-uploads usually process in 1 working day",
    ],
  },
  "repair-taking-longer": {
    id: "repair-taking-longer",
    title: "Repair is taking longer than expected",
    summary:
      "Repairs sometimes extend due to parts availability or scope changes. Coordinate with the garage to extend the ETA and notify the customer.",
    steps: [
      { label: "Original ETA",            date: "26 May", state: "completed" },
      { label: "Today",                   date: "28 May", state: "current"   },
      { label: "Updated ETA (proposed)",  date: "31 May", state: "upcoming"  },
    ],
    confirms: ["Customer SMS template available in this issue thread."],
  },
  "dispute-repair-quality": {
    id: "dispute-repair-quality",
    title: "Customer dispute on repair quality",
    summary:
      "Open a complaint thread with the insurer. The DSP team will moderate; the insurer's complaints officer is the final authority.",
    steps: [
      { label: "Customer raised concern", state: "current" },
      { label: "DSP review",              state: "upcoming" },
      { label: "Insurer review",          state: "upcoming" },
      { label: "Resolution",              state: "upcoming" },
    ],
  },
  "payout-less-than-expected": {
    id: "payout-less-than-expected",
    title: "Payout amount is less than expected",
    summary:
      "Insurers apply depreciation and policy-specific deductions. Check the settlement note attached to {claim} for a line-by-line breakdown.",
    steps: [
      { label: "Settlement note available", state: "completed" },
      { label: "Raise a query if items look wrong", state: "current" },
    ],
  },
  "wrong-bank-account": {
    id: "wrong-bank-account",
    title: "Wrong bank account / want to update",
    summary:
      "Bank account changes require a fresh cancelled cheque + KYC re-verification. The team will reach out within 1 working day.",
    steps: [
      { label: "Upload cancelled cheque",  state: "current" },
      { label: "KYC re-verification",      state: "upcoming" },
      { label: "Bank account updated",     state: "upcoming" },
    ],
  },
  "estimate-queried-insurer": {
    id: "estimate-queried-insurer",
    title: "Estimate was queried by insurer",
    summary:
      "The insurer has asked for clarification on one or more line items. Respond from this thread; the DSP team can help frame the reply.",
    steps: [
      { label: "Query received from {insurer}", state: "current" },
      { label: "Garage / DSP reply",            state: "upcoming" },
      { label: "Insurer decision",              state: "upcoming" },
    ],
  },
  "supplementary-estimate": {
    id: "supplementary-estimate",
    title: "Add a supplementary estimate",
    summary:
      "Supplementary estimates are added when hidden damage is found during repair. Submit the new estimate + photos; the insurer reviews within 24 hours.",
    steps: [
      { label: "Upload supplementary estimate", state: "current" },
      { label: "Insurer review",                state: "upcoming" },
    ],
  },
};

export function getIssueResponse(id: string, ctx: HelpClaimContext): IssueResponse | null {
  const raw = ISSUE_RESPONSES[id];
  if (!raw) return null;
  const fill = (s: string) => s.replace("{claim}", ctx.shortId).replace("{insurer}", ctx.insurer);
  return {
    ...raw,
    summary: fill(raw.summary),
    steps: raw.steps.map((st) => ({ ...st, label: fill(st.label) })),
    confirms: raw.confirms?.map(fill),
  };
}
