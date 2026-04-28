const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, PageOrientation, LevelFormat, HeadingLevel, BorderStyle,
  WidthType, ShadingType, VerticalAlign
} = require('docx');

// ---------- Styling constants ----------
const HEADER_FILL = "2E5A88";
const HEADER_TEXT = "FFFFFF";
const ALT_ROW_FILL = "F7F9FC";
const SECTION_FILL = "EEF4FA";

const COLOR_M  = "D4EDDA";  // green-tinted (Mandatory)
const COLOR_O  = "FFF3CD";  // yellow-tinted (Optional)
const COLOR_NA = "F0F0F0";  // grey (Not Applicable)
const COLOR_VC = "E6E0F4";  // purple-tinted (vehicle-class-driven)

const border = { style: BorderStyle.SINGLE, size: 4, color: "B0B0B0" };
const borders = { top: border, bottom: border, left: border, right: border };

// Landscape US Letter dimensions
const CONTENT_WIDTH = 15840 - 1440 - 1440; // 12960 DXA

// ---------- Helpers ----------
function p(text, opts = {}) {
  const { bold, italics, size, alignment, color, spaceAfter, spaceBefore } = opts;
  return new Paragraph({
    alignment: alignment || AlignmentType.LEFT,
    spacing: { after: spaceAfter ?? 100, before: spaceBefore ?? 0 },
    children: [new TextRun({
      text, bold: !!bold, italics: !!italics,
      color: color || "000000", font: "Arial", size: size || 22
    })]
  });
}

function heading(text, level = HeadingLevel.HEADING_1) {
  return new Paragraph({
    heading: level,
    spacing: { before: 280, after: 160 },
    children: [new TextRun({ text, bold: true, font: "Arial" })]
  });
}

function headerCell(text, width) {
  return new TableCell({
    borders,
    width: { size: width, type: WidthType.DXA },
    shading: { fill: HEADER_FILL, type: ShadingType.CLEAR },
    margins: { top: 120, bottom: 120, left: 120, right: 120 },
    verticalAlign: VerticalAlign.CENTER,
    children: [new Paragraph({
      alignment: AlignmentType.LEFT,
      children: [new TextRun({ text, bold: true, color: HEADER_TEXT, font: "Arial", size: 20 })]
    })]
  });
}

function dataCell(text, width, opts = {}) {
  const { bold, fill, align, size } = opts;
  return new TableCell({
    borders,
    width: { size: width, type: WidthType.DXA },
    shading: fill ? { fill, type: ShadingType.CLEAR } : undefined,
    margins: { top: 70, bottom: 70, left: 110, right: 110 },
    verticalAlign: VerticalAlign.TOP,
    children: [new Paragraph({
      alignment: align || AlignmentType.LEFT,
      children: [new TextRun({ text: text ?? '', bold: !!bold, font: "Arial", size: size || 18 })]
    })]
  });
}

function labelCell(label, width) {
  let fill;
  const raw = (label || '').toString();
  // pick color by prefix
  const core = raw.replace(/[^A-Za-z]/g, '').toUpperCase();
  if (core === 'M')  fill = COLOR_M;
  else if (core === 'O') fill = COLOR_O;
  else if (core === 'NA') fill = COLOR_NA;
  else if (core === 'VC') fill = COLOR_VC;

  return new TableCell({
    borders,
    width: { size: width, type: WidthType.DXA },
    shading: fill ? { fill, type: ShadingType.CLEAR } : undefined,
    margins: { top: 70, bottom: 70, left: 110, right: 110 },
    verticalAlign: VerticalAlign.CENTER,
    children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: raw, bold: true, font: "Arial", size: 18 })]
    })]
  });
}

function sectionRow(text, totalWidth) {
  return new TableRow({
    children: [new TableCell({
      borders,
      width: { size: totalWidth, type: WidthType.DXA },
      shading: { fill: SECTION_FILL, type: ShadingType.CLEAR },
      margins: { top: 70, bottom: 70, left: 120, right: 120 },
      columnSpan: 99, // wide
      children: [new Paragraph({
        children: [new TextRun({ text, bold: true, italics: true, font: "Arial", size: 18, color: "2E5A88" })]
      })]
    })]
  });
}

// ---------- Content data ----------

// Master reference: 24 docs with description, source, category
const docs = [
  ["D01", "Claim Form", "Claim",
    "Insurer's claim intimation form filled & signed by insured.",
    "Insured (on insurer template)"],
  ["D02", "Claim Discharge Voucher (CDV)", "Claim",
    "Insured's final acknowledgement of claim settlement, addressed to insurer; DSP collects and forwards.",
    "Insured (on insurer template)"],
  ["D03", "Insurance Policy Copy (Schedule)", "Policy",
    "Policy schedule / Certificate of Insurance showing coverage, IDV, validity.",
    "Insurer core system / Insured"],
  ["D04", "Aadhaar", "Identity",
    "UIDAI-issued identity document; stored masked per DPDPA.",
    "Insured (UIDAI-issued)"],
  ["D05", "PAN", "Identity",
    "Income-tax PAN for KYC and TDS purposes.",
    "Insured (Income Tax Dept-issued)"],
  ["D06", "Driving License (DL)", "Driver",
    "RTO-issued licence of the driver at time of loss; validates driving authority.",
    "Insured / Driver (RTO-issued)"],
  ["D07", "Vehicle Registration Certificate (RC)", "Vehicle",
    "RTO-issued ownership proof for the vehicle; establishes insurable interest.",
    "Insured (RTO-issued)"],
  ["D08", "PUC Certificate", "Vehicle",
    "Emission (Pollution-Under-Control) compliance certificate valid on Date of Loss.",
    "Insured (PUC centre-issued)"],
  ["D09", "Road Tax / Tax Token", "Vehicle",
    "Proof of road-tax payment for the vehicle.",
    "Insured (State RTO-issued)"],
  ["D10", "Fitness Certificate", "Vehicle",
    "Roadworthiness certificate mandatory for commercial vehicles.",
    "Insured (RTO-issued)"],
  ["D11", "Permit challan (Goods / Taxi / Route)", "Vehicle",
    "State transport permit authorising commercial vehicle use; type depends on vehicle class.",
    "Insured (RTO / State Transport-issued)"],
  ["D12", "Trip Sheet / Waybill / Load Challan", "Vehicle",
    "Commercial-vehicle activity log at Date of Loss (load manifest for goods, trip sheet for taxi).",
    "Operator / Insured"],
  ["D13", "Form 28", "Vehicle",
    "RTO No-Objection Certificate used for inter-state transfer or RC transfer to insurer (post-TL / theft).",
    "Insured (RTO form)"],
  ["D14", "Form 29", "Vehicle",
    "Notice of Transfer of Ownership signed by the transferor (insured).",
    "Insured (RTO form)"],
  ["D15", "Form 30", "Vehicle",
    "Application for Transfer of Ownership signed by the transferee (insurer).",
    "Insured + Insurer (RTO form)"],
  ["D16", "Form 35", "Vehicle",
    "Notice of termination of hypothecation — releases the financier's lien post-settlement.",
    "Insured + Financier (RTO form)"],
  ["D17", "Cancelled Cheque / Bank Statement", "Finance",
    "Bank account proof for payout crediting by the insurer.",
    "Insured (bank-issued)"],
  ["D18", "Financier NOC / Consent Letter", "Finance",
    "No-objection / consent from hypothecation holder permitting claim settlement.",
    "Financier (Bank / NBFC)"],
  ["D19", "Loan Outstanding Statement", "Finance",
    "Current loan principal + interest outstanding; drives payout split between financier and insured.",
    "Financier (Bank / NBFC)"],
  ["D20", "FIR / Police Report / GD", "Legal",
    "Police record of the incident — FIR for major events, General Diary for minor.",
    "Police (obtained by insured)"],
  ["D21", "Final Police Report (Untraced Report)", "Legal",
    "Police certificate issued after investigation stating the vehicle could not be traced.",
    "Police (obtained by insured)"],
  ["D22", "Damage Estimate Report", "Repair",
    "Workshop's itemised repair quote (parts, labour, paint, consumables, GST).",
    "Workshop / Garage"],
  ["D23", "Invoice", "Repair",
    "Workshop's GST-compliant final tax invoice post-repair.",
    "Workshop / Garage"],
  ["D24", "Repair Bills (Towing / Crane / Parking)", "Repair",
    "Auxiliary bills for towing, crane lift, and storage / parking charges incurred.",
    "Service providers (via insured)"]
];

// Survey-wise labels. Index aligns with `docs` above.
// Each row: [accident_OD, accident_TP, accident_NP, accident_AoG, theft_full, theft_acc, theft_rec, total_loss]
const labels = [
  // D01 Claim Form
  ["M","M","M","M",   "M","M","M",   "M"],
  // D02 CDV
  ["M","M","M","M",   "M","M","M",   "M"],
  // D03 Policy Copy
  ["M","M","M","M",   "M","M","M",   "M"],
  // D04 Aadhaar
  ["O*","O*","O*","O*",   "M","O*","M",   "M"],
  // D05 PAN
  ["O*","O*","O*","O*",   "M","O*","M",   "M"],
  // D06 DL
  ["M","M","M","M",   "O","O","M",   "M"],
  // D07 RC
  ["M","M","M","M",   "M","M","M",   "M"],
  // D08 PUC
  ["M","M","M","M",   "O","M","M",   "M"],
  // D09 Road Tax
  ["O","O","O","O",   "M","O","O",   "M"],
  // D10 Fitness
  ["vc","vc","vc","vc",   "vc","vc","vc",   "vc"],
  // D11 Permit
  ["vc","vc","vc","vc",   "vc","vc","vc",   "vc"],
  // D12 Trip Sheet
  ["vc","vc","vc","vc",   "vc","vc","vc",   "vc"],
  // D13 Form 28
  ["NA","NA","NA","NA",   "M","NA","NA",   "M"],
  // D14 Form 29
  ["NA","NA","NA","NA",   "M","NA","NA",   "M"],
  // D15 Form 30
  ["NA","NA","NA","NA",   "M","NA","NA",   "M"],
  // D16 Form 35
  ["NA","NA","NA","NA",   "O‡","NA","NA",   "O‡"],
  // D17 Cancelled Cheque
  ["O†","O†","O†","O†",   "M","O†","O†",   "M"],
  // D18 Financier NOC
  ["O‡","O‡","O‡","O‡",   "O‡","O‡","O‡",   "O‡"],
  // D19 Loan Outstanding
  ["NA","NA","NA","NA",   "O‡","NA","NA",   "O‡"],
  // D20 FIR / GD
  ["O","M","O","O",   "M","M","M",   "M"],
  // D21 Untraced Report
  ["NA","NA","NA","NA",   "M","NA","NA",   "NA"],
  // D22 Damage Estimate
  ["M","M#","M","M",   "NA","M","M",   "M"],
  // D23 Invoice
  ["M","M#","M","M",   "NA","M","M",   "NA"],
  // D24 Repair Bills (aux)
  ["O","O","O","O",   "NA","O","O",   "O"]
];

// ---------- Build tables ----------

// Master doc reference table: # | Document | Category | Description | Source
function buildMasterRefTable() {
  const w = [700, 2600, 1300, 5360, 3000]; // sum 12960
  const header = new TableRow({
    tableHeader: true,
    children: [
      headerCell("#", w[0]),
      headerCell("Document", w[1]),
      headerCell("Category", w[2]),
      headerCell("Description", w[3]),
      headerCell("Probable Source", w[4])
    ]
  });

  const rows = [header];
  docs.forEach(([id, title, cat, desc, src], idx) => {
    const altFill = (idx % 2 === 1) ? ALT_ROW_FILL : undefined;
    rows.push(new TableRow({
      children: [
        dataCell(id, w[0], { bold: true, fill: altFill, align: AlignmentType.CENTER }),
        dataCell(title, w[1], { bold: true, fill: altFill }),
        dataCell(cat, w[2], { fill: altFill }),
        dataCell(desc, w[3], { fill: altFill }),
        dataCell(src, w[4], { fill: altFill })
      ]
    }));
  });

  return new Table({
    width: { size: CONTENT_WIDTH, type: WidthType.DXA },
    columnWidths: w,
    rows
  });
}

// Accident matrix: # | Document | OD | TP | NP | AoG
function buildAccidentTable() {
  const w = [700, 3860, 2100, 2100, 2100, 2100]; // sum 12960
  const header = new TableRow({
    tableHeader: true,
    children: [
      headerCell("#", w[0]),
      headerCell("Document", w[1]),
      headerCell("Own Damage", w[2]),
      headerCell("Third-Party", w[3]),
      headerCell("Natural Peril", w[4]),
      headerCell("Act of God", w[5])
    ]
  });
  const rows = [header];
  docs.forEach(([id, title], idx) => {
    const altFill = (idx % 2 === 1) ? ALT_ROW_FILL : undefined;
    const lab = labels[idx];
    rows.push(new TableRow({
      children: [
        dataCell(id, w[0], { bold: true, fill: altFill, align: AlignmentType.CENTER }),
        dataCell(title, w[1], { fill: altFill }),
        labelCell(lab[0], w[2]),
        labelCell(lab[1], w[3]),
        labelCell(lab[2], w[4]),
        labelCell(lab[3], w[5])
      ]
    }));
  });
  return new Table({
    width: { size: CONTENT_WIDTH, type: WidthType.DXA },
    columnWidths: w, rows
  });
}

// Theft matrix: # | Document | Full | Accessory | Recovered
function buildTheftTable() {
  const w = [700, 4860, 2467, 2467, 2466]; // sum 12960
  const header = new TableRow({
    tableHeader: true,
    children: [
      headerCell("#", w[0]),
      headerCell("Document", w[1]),
      headerCell("Full Theft", w[2]),
      headerCell("Accessory Theft", w[3]),
      headerCell("Recovered Theft", w[4])
    ]
  });
  const rows = [header];
  docs.forEach(([id, title], idx) => {
    const altFill = (idx % 2 === 1) ? ALT_ROW_FILL : undefined;
    const lab = labels[idx];
    rows.push(new TableRow({
      children: [
        dataCell(id, w[0], { bold: true, fill: altFill, align: AlignmentType.CENTER }),
        dataCell(title, w[1], { fill: altFill }),
        labelCell(lab[4], w[2]),
        labelCell(lab[5], w[3]),
        labelCell(lab[6], w[4])
      ]
    }));
  });
  return new Table({
    width: { size: CONTENT_WIDTH, type: WidthType.DXA },
    columnWidths: w, rows
  });
}

// Total Loss matrix: # | Document | Total Loss
function buildTotalLossTable() {
  const w = [700, 8260, 4000]; // sum 12960
  const header = new TableRow({
    tableHeader: true,
    children: [
      headerCell("#", w[0]),
      headerCell("Document", w[1]),
      headerCell("Total Loss", w[2])
    ]
  });
  const rows = [header];
  docs.forEach(([id, title], idx) => {
    const altFill = (idx % 2 === 1) ? ALT_ROW_FILL : undefined;
    const lab = labels[idx];
    rows.push(new TableRow({
      children: [
        dataCell(id, w[0], { bold: true, fill: altFill, align: AlignmentType.CENTER }),
        dataCell(title, w[1], { fill: altFill }),
        labelCell(lab[7], w[2])
      ]
    }));
  });
  return new Table({
    width: { size: CONTENT_WIDTH, type: WidthType.DXA },
    columnWidths: w, rows
  });
}

// Vehicle class rule table
function buildVehicleClassTable() {
  const w = [3960, 3000, 3000, 3000]; // sum 12960 (actually 12960)
  const wCorrected = [3960, 3000, 3000, 3000]; // 12960

  const header = new TableRow({
    tableHeader: true,
    children: [
      headerCell("Document", w[0]),
      headerCell("Private", w[1]),
      headerCell("Commercial – Goods", w[2]),
      headerCell("Commercial – Taxi", w[3])
    ]
  });
  const rows = [header];
  const data = [
    ["D10 – Fitness Certificate", "NA", "M", "M"],
    ["D11 – Permit challan",      "NA", "M (Goods permit)", "M (Taxi / Contract-carriage permit)"],
    ["D12 – Trip Sheet / Waybill / Load Challan", "NA", "M (Waybill / Load Challan)", "M (Trip Sheet)"],
    ["D09 – Road Tax / Tax Token", "O (per subtype default)", "M", "M"]
  ];
  data.forEach((r, idx) => {
    const altFill = (idx % 2 === 1) ? ALT_ROW_FILL : undefined;
    rows.push(new TableRow({
      children: [
        dataCell(r[0], w[0], { bold: true, fill: altFill }),
        labelCell(r[1], w[1]),
        dataCell(r[2], w[2], { fill: altFill, align: AlignmentType.CENTER }),
        dataCell(r[3], w[3], { fill: altFill, align: AlignmentType.CENTER })
      ]
    }));
  });

  return new Table({
    width: { size: CONTENT_WIDTH, type: WidthType.DXA },
    columnWidths: w, rows
  });
}

// Parameter overview table
function buildParameterTable() {
  const w = [3000, 2500, 7460]; // sum 12960
  const header = new TableRow({
    tableHeader: true,
    children: [
      headerCell("Parameter", w[0]),
      headerCell("Role", w[1]),
      headerCell("Values", w[2])
    ]
  });
  const data = [
    ["Survey Type", "Main category", "Accident · Theft · Total Loss"],
    ["Subtype of survey", "Sub-parameter", "Accident → Own Damage / Third-Party / Natural Peril / Act of God. Theft → Full / Accessory / Recovered. Total Loss → none."],
    ["Vehicle Class", "Sub-parameter", "Private · Commercial-goods · Commercial-taxi"]
  ];
  const rows = [header];
  data.forEach((r, idx) => {
    const altFill = (idx % 2 === 1) ? ALT_ROW_FILL : undefined;
    rows.push(new TableRow({
      children: [
        dataCell(r[0], w[0], { bold: true, fill: altFill }),
        dataCell(r[1], w[1], { fill: altFill }),
        dataCell(r[2], w[2], { fill: altFill })
      ]
    }));
  });
  return new Table({
    width: { size: CONTENT_WIDTH, type: WidthType.DXA },
    columnWidths: w, rows
  });
}

// ---------- Assemble document ----------

const bulletNumbering = {
  config: [{
    reference: "bullets",
    levels: [
      { level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } } }
    ]
  }]
};

function bullet(text) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { after: 80 },
    children: [new TextRun({ text, font: "Arial", size: 22 })]
  });
}

function codeBlock(text) {
  return new Paragraph({
    spacing: { before: 80, after: 160 },
    shading: { type: ShadingType.CLEAR, color: "auto", fill: "F5F5F5" },
    children: [new TextRun({ text, font: "Consolas", size: 18 })]
  });
}

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, font: "Arial", color: "2E5A88" },
        paragraph: { spacing: { before: 320, after: 200 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: "Arial", color: "2E5A88" },
        paragraph: { spacing: { before: 240, after: 140 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 22, bold: true, font: "Arial", color: "2E5A88" },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 2 } }
    ]
  },
  numbering: bulletNumbering,
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840, orientation: PageOrientation.LANDSCAPE },
        margin: { top: 1080, right: 1440, bottom: 1080, left: 1440 }
      }
    },
    children: [
      // --- Title ---
      new Paragraph({
        alignment: AlignmentType.LEFT,
        spacing: { after: 80 },
        children: [new TextRun({
          text: "Claims V2 — Document Collection Matrix",
          bold: true, font: "Arial", size: 40, color: "2E5A88"
        })]
      }),
      new Paragraph({
        alignment: AlignmentType.LEFT,
        spacing: { after: 200 },
        children: [new TextRun({
          text: "Survey-type driven configuration for DSP-side claim investigation & settlement recommendation",
          italics: true, font: "Arial", size: 22, color: "555555"
        })]
      }),

      // --- Overview ---
      heading("1. Overview"),
      p("This document defines the document-collection matrix for the Claims V2 product. The primary user is the Distribution Service Partner (DSP) who investigates and recommends settlement across multiple insurers. The DSP does not disburse payments; it submits the investigation report, evidence pack, recommendation, and computed payables to the insurer, and earns a per-claim commission."),
      p("The matrix is organised by Survey Type (top-level category). Within each survey type, two sub-parameters control the mandatory / optional label for each document: the subtype of the survey and the vehicle class. Additional sub-threshold conditions (e.g., hypothecation, KYC threshold, settlement mode) are handled as inline rules in code — they are not insurer-facing config levers."),

      // --- Parameters ---
      heading("2. Parameters"),
      buildParameterTable(),

      // --- Legend ---
      heading("3. Legend"),
      bullet("M = Mandatory — always required in this cell."),
      bullet("O = Optional — not a blocker; may be promoted to M by an inline rule (see Section 5)."),
      bullet("NA = Not Applicable — never requested in this cell."),
      bullet("vc = Vehicle-class-driven — resolved via the Vehicle Class rule (Section 4)."),
      bullet("Footnote markers on labels (*, †, ‡, #) indicate an inline-rule condition that can promote Optional to Mandatory at runtime (see Section 5)."),

      // --- Vehicle Class rule ---
      heading("4. Vehicle Class rule"),
      p("The following documents are vehicle-class-driven. They are marked “vc” in the survey-type tables and resolve per the table below across all survey types and subtypes."),
      buildVehicleClassTable(),
      p("All other documents are vehicle-class-agnostic.", { italics: true, spaceBefore: 100 }),

      // --- Inline rules ---
      heading("5. Inline-rule footnote keys"),
      p("These rules are evaluated at runtime from claim data. They can flip an Optional label to Mandatory. They are not insurer-facing config parameters, but each promotion must emit a reason code into the audit log."),
      bullet("* — Claim payable ≥ insurer's KYC threshold → D04 (Aadhaar), D05 (PAN) promote to M."),
      bullet("† — Settlement mode = Reimbursement → D17 (Cancelled Cheque / Bank Statement) promotes to M."),
      bullet("‡ — RC shows hypothecation → D16 (Form 35), D18 (Financier NOC), D19 (Loan Outstanding Statement) promote to M."),
      bullet("# — Pure Third-Party claim with no damage to insured's own vehicle → D22 (Damage Estimate), D23 (Invoice) become NA."),

      // --- Master reference ---
      heading("6. Master document reference"),
      p("Descriptions, categories and probable sources for all 24 documents. Referenced by document code (D01–D24) in the survey-type tables."),
      buildMasterRefTable(),

      // --- Survey Type 1: Accident ---
      heading("7. Survey Type 1 — Accident"),
      p("Partial-loss claims where the vehicle is damaged but repairable. Labels below are for vehicle class = Private by default; vehicle-class-driven docs are marked “vc” and resolve per Section 4."),
      buildAccidentTable(),
      p("Key subtype flips: FIR / Police Report / GD (D20) is Mandatory for Third-Party, Optional elsewhere. Natural Peril and Act of God share the same document signature in this matrix.",
        { italics: true, spaceBefore: 100 }),

      // --- Survey Type 2: Theft ---
      heading("8. Survey Type 2 — Theft"),
      p("Theft-related claims split by whether the whole vehicle is lost, only accessories, or the vehicle has been recovered."),
      buildTheftTable(),
      p("Full Theft is the only subtype that triggers the RC-transfer forms (D13–D15) and the Untraced Report (D21). Accessory Theft and Recovered Theft behave like small Own-Damage claims layered on top of a mandatory FIR.",
        { italics: true, spaceBefore: 100 }),

      // --- Survey Type 3: Total Loss ---
      heading("9. Survey Type 3 — Total Loss"),
      p("Constructive Total Loss — repair cost ≥ ~75% of IDV; vehicle written off and settled at IDV less salvage. No subtypes."),
      buildTotalLossTable(),
      p("Damage Estimate (D22) is Mandatory because it evidences the 75%-of-IDV trigger for CTL. Invoice (D23) is NA because the vehicle is not repaired. RC-transfer forms (D13–D15) are Mandatory because the RC transfers to the insurer for salvage disposal.",
        { italics: true, spaceBefore: 100 }),

      // --- Config shape ---
      heading("10. Configuration shape"),
      p("The schema below shows how each document requirement is represented in the rules engine. The insurer-facing config surface per document is (4 + 3 + 1) = 8 survey-type × subtype cells, plus 3 vehicle-class cells on the four vehicle-class-driven docs. Threshold values (KYC, financier-NOC amount) live in InsurerConfig. Every runtime O → M promotion must emit a reason code into the audit log."),
      codeBlock("DocumentRequirement {"),
      codeBlock("  docCode,                              // D01..D24"),
      codeBlock("  title, description, source, category, // static"),
      codeBlock("  labelBySurveyTypeAndSubtype: {"),
      codeBlock("    ACCIDENT:   { OD, TP, NATURAL_PERIL, ACT_OF_GOD },"),
      codeBlock("    THEFT:      { FULL, ACCESSORY, RECOVERED },"),
      codeBlock("    TOTAL_LOSS: <single label>"),
      codeBlock("  },"),
      codeBlock("  vehicleClassRule?: {                  // only on D09, D10, D11, D12"),
      codeBlock("    PRIVATE, COMMERCIAL_GOODS, COMMERCIAL_TAXI"),
      codeBlock("  },"),
      codeBlock("  inlineRule?                           // O → M at runtime: KYC / reimbursement / hypothecation / pure-TP"),
      codeBlock("}"),

      // --- Footer note ---
      new Paragraph({
        alignment: AlignmentType.LEFT,
        spacing: { before: 320 },
        children: [new TextRun({
          text: "Threshold values (KYC band, financier-NOC amount, subtype-specific overrides) must be verified against the current IRDAI master directions and each insurer's claims manual before coding defaults.",
          italics: true, font: "Arial", size: 18, color: "666666"
        })]
      })
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  const out = "/Users/sanchitatayde/Claude Code- Claims V2/Claims_V2_Document_Collection_Matrix.docx";
  fs.writeFileSync(out, buffer);
  console.log("Wrote: " + out + " (" + buffer.length + " bytes)");
});
