import type {
  ActiveClaim,
  ClaimSummary,
  Notification,
  OpenTask,
  ReportFile,
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
