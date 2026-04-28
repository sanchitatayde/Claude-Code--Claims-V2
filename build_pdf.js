const fs = require('fs');
const PdfPrinter = require('pdfmake');

// ---------- Fonts: use pdfmake's built-in Roboto via its vfs_fonts when available,
//                   else fall back to standard PDF fonts (Helvetica) which don't need files.
// Standard PDF fonts work without external font files.
const fonts = {
  Helvetica: {
    normal: 'Helvetica',
    bold: 'Helvetica-Bold',
    italics: 'Helvetica-Oblique',
    bolditalics: 'Helvetica-BoldOblique'
  },
  Courier: {
    normal: 'Courier',
    bold: 'Courier-Bold',
    italics: 'Courier-Oblique',
    bolditalics: 'Courier-BoldOblique'
  }
};

const printer = new PdfPrinter(fonts);

// ---------- Palette ----------
const C_HEADER_FILL = '#2E5A88';
const C_HEADER_TEXT = '#FFFFFF';
const C_ALT_ROW     = '#F7F9FC';
const C_SECTION     = '#EEF4FA';
const C_M           = '#D4EDDA';
const C_O           = '#FFF3CD';
const C_NA          = '#F0F0F0';
const C_VC          = '#E6E0F4';
const C_CODE_BG     = '#F5F5F5';

// ---------- Data (matches the .docx build) ----------
const docs = [
  ["D01","Claim Form","Claim","Insurer's claim intimation form filled & signed by insured.","Insured (on insurer template)"],
  ["D02","Claim Discharge Voucher (CDV)","Claim","Insured's final acknowledgement of claim settlement, addressed to insurer; DSP collects and forwards.","Insured (on insurer template)"],
  ["D03","Insurance Policy Copy (Schedule)","Policy","Policy schedule / Certificate of Insurance showing coverage, IDV, validity.","Insurer core system / Insured"],
  ["D04","Aadhaar","Identity","UIDAI-issued identity document; stored masked per DPDPA.","Insured (UIDAI-issued)"],
  ["D05","PAN","Identity","Income-tax PAN for KYC and TDS purposes.","Insured (Income Tax Dept-issued)"],
  ["D06","Driving License (DL)","Driver","RTO-issued licence of the driver at time of loss; validates driving authority.","Insured / Driver (RTO-issued)"],
  ["D07","Vehicle Registration Certificate (RC)","Vehicle","RTO-issued ownership proof for the vehicle; establishes insurable interest.","Insured (RTO-issued)"],
  ["D08","PUC Certificate","Vehicle","Emission (Pollution-Under-Control) compliance certificate valid on Date of Loss.","Insured (PUC centre-issued)"],
  ["D09","Road Tax / Tax Token","Vehicle","Proof of road-tax payment for the vehicle.","Insured (State RTO-issued)"],
  ["D10","Fitness Certificate","Vehicle","Roadworthiness certificate mandatory for commercial vehicles.","Insured (RTO-issued)"],
  ["D11","Permit challan (Goods / Taxi / Route)","Vehicle","State transport permit authorising commercial vehicle use; type depends on vehicle class.","Insured (RTO / State Transport-issued)"],
  ["D12","Trip Sheet / Waybill / Load Challan","Vehicle","Commercial-vehicle activity log at Date of Loss (load manifest for goods, trip sheet for taxi).","Operator / Insured"],
  ["D13","Form 28","Vehicle","RTO No-Objection Certificate used for inter-state transfer or RC transfer to insurer (post-TL / theft).","Insured (RTO form)"],
  ["D14","Form 29","Vehicle","Notice of Transfer of Ownership signed by the transferor (insured).","Insured (RTO form)"],
  ["D15","Form 30","Vehicle","Application for Transfer of Ownership signed by the transferee (insurer).","Insured + Insurer (RTO form)"],
  ["D16","Form 35","Vehicle","Notice of termination of hypothecation — releases the financier's lien post-settlement.","Insured + Financier (RTO form)"],
  ["D17","Cancelled Cheque / Bank Statement","Finance","Bank account proof for payout crediting by the insurer.","Insured (bank-issued)"],
  ["D18","Financier NOC / Consent Letter","Finance","No-objection / consent from hypothecation holder permitting claim settlement.","Financier (Bank / NBFC)"],
  ["D19","Loan Outstanding Statement","Finance","Current loan principal + interest outstanding; drives payout split between financier and insured.","Financier (Bank / NBFC)"],
  ["D20","FIR / Police Report / GD","Legal","Police record of the incident — FIR for major events, General Diary for minor.","Police (obtained by insured)"],
  ["D21","Final Police Report (Untraced Report)","Legal","Police certificate issued after investigation stating the vehicle could not be traced.","Police (obtained by insured)"],
  ["D22","Damage Estimate Report","Repair","Workshop's itemised repair quote (parts, labour, paint, consumables, GST).","Workshop / Garage"],
  ["D23","Invoice","Repair","Workshop's GST-compliant final tax invoice post-repair.","Workshop / Garage"],
  ["D24","Repair Bills (Towing / Crane / Parking)","Repair","Auxiliary bills for towing, crane lift, and storage / parking charges incurred.","Service providers (via insured)"]
];

// [acc_OD, acc_TP, acc_NP, acc_AoG, theft_full, theft_acc, theft_rec, total_loss]
const labels = [
  ["M","M","M","M","M","M","M","M"],                         // D01
  ["M","M","M","M","M","M","M","M"],                         // D02
  ["M","M","M","M","M","M","M","M"],                         // D03
  ["O*","O*","O*","O*","M","O*","M","M"],                    // D04
  ["O*","O*","O*","O*","M","O*","M","M"],                    // D05
  ["M","M","M","M","O","O","M","M"],                         // D06
  ["M","M","M","M","M","M","M","M"],                         // D07
  ["M","M","M","M","O","M","M","M"],                         // D08
  ["O","O","O","O","M","O","O","M"],                         // D09
  ["vc","vc","vc","vc","vc","vc","vc","vc"],                 // D10
  ["vc","vc","vc","vc","vc","vc","vc","vc"],                 // D11
  ["vc","vc","vc","vc","vc","vc","vc","vc"],                 // D12
  ["NA","NA","NA","NA","M","NA","NA","M"],                   // D13
  ["NA","NA","NA","NA","M","NA","NA","M"],                   // D14
  ["NA","NA","NA","NA","M","NA","NA","M"],                   // D15
  ["NA","NA","NA","NA","O‡","NA","NA","O‡"],                 // D16
  ["O†","O†","O†","O†","M","O†","O†","M"],                   // D17
  ["O‡","O‡","O‡","O‡","O‡","O‡","O‡","O‡"],                 // D18
  ["NA","NA","NA","NA","O‡","NA","NA","O‡"],                 // D19
  ["O","M","O","O","M","M","M","M"],                         // D20
  ["NA","NA","NA","NA","M","NA","NA","NA"],                  // D21
  ["M","M#","M","M","NA","M","M","M"],                       // D22
  ["M","M#","M","M","NA","M","M","NA"],                      // D23
  ["O","O","O","O","NA","O","O","O"]                         // D24
];

function labelColor(raw) {
  const core = (raw || '').replace(/[^A-Za-z]/g, '').toUpperCase();
  if (core === 'M')  return C_M;
  if (core === 'O')  return C_O;
  if (core === 'NA') return C_NA;
  if (core === 'VC') return C_VC;
  return null;
}

// Build a cell for a labelled matrix cell
function labCell(value) {
  return {
    text: value,
    alignment: 'center',
    bold: true,
    fillColor: labelColor(value) || undefined
  };
}

function headerRow(cols) {
  return cols.map(t => ({ text: t, bold: true, color: C_HEADER_TEXT, fillColor: C_HEADER_FILL, alignment: 'left' }));
}

function bandedRow(rowIdx, cells) {
  const alt = rowIdx % 2 === 1;
  return cells.map(c => {
    // don't override label-specific fills
    if (c && typeof c === 'object' && c.fillColor) return c;
    if (alt) {
      if (typeof c === 'string') return { text: c, fillColor: C_ALT_ROW };
      return Object.assign({}, c, { fillColor: c.fillColor || C_ALT_ROW });
    }
    return c;
  });
}

// ---------- Table builders ----------
function masterRefTable() {
  const widths = [32, 120, 60, 'auto', 130];
  const body = [ headerRow(['#','Document','Category','Description','Probable Source']) ];
  docs.forEach(([id, title, cat, desc, src], i) => {
    body.push(bandedRow(i, [
      { text: id, bold: true, alignment: 'center' },
      { text: title, bold: true },
      cat,
      desc,
      src
    ]));
  });
  return { table: { headerRows: 1, widths, body, dontBreakRows: true, keepWithHeaderRows: 1 }, layout: tableLayout(), fontSize: 8, margin: [0, 0, 0, 12] };
}

function parametersTable() {
  const widths = [100, 80, '*'];
  const body = [ headerRow(['Parameter','Role','Values']) ];
  const rows = [
    ['Survey Type', 'Main category', 'Accident · Theft · Total Loss'],
    ['Subtype of survey', 'Sub-parameter', 'Accident → Own Damage / Third-Party / Natural Peril / Act of God.  Theft → Full / Accessory / Recovered.  Total Loss → none.'],
    ['Vehicle Class', 'Sub-parameter', 'Private · Commercial-goods · Commercial-taxi']
  ];
  rows.forEach((r, i) => body.push(bandedRow(i, [{ text: r[0], bold: true }, r[1], r[2]])));
  return { table: { headerRows: 1, widths, body }, layout: tableLayout(), fontSize: 9, margin: [0, 0, 0, 12] };
}

function vehicleClassTable() {
  const widths = ['*', 90, 130, 170];
  const body = [ headerRow(['Document','Private','Commercial – Goods','Commercial – Taxi']) ];
  const data = [
    ['D10 – Fitness Certificate', 'NA', 'M', 'M'],
    ['D11 – Permit challan',      'NA', 'M (Goods permit)', 'M (Taxi / Contract-carriage permit)'],
    ['D12 – Trip Sheet / Waybill / Load Challan', 'NA', 'M (Waybill / Load Challan)', 'M (Trip Sheet)'],
    ['D09 – Road Tax / Tax Token', 'O (per subtype default)', 'M', 'M']
  ];
  data.forEach((r, i) => {
    body.push(bandedRow(i, [
      { text: r[0], bold: true },
      labCell(r[1]),
      { text: r[2], alignment: 'center' },
      { text: r[3], alignment: 'center' }
    ]));
  });
  return { table: { headerRows: 1, widths, body }, layout: tableLayout(), fontSize: 9, margin: [0, 0, 0, 12] };
}

function accidentTable() {
  const widths = [30, 170, 55, 55, 55, 55];
  const body = [ headerRow(['#','Document','Own Damage','Third-Party','Natural Peril','Act of God']) ];
  docs.forEach(([id, title], i) => {
    const lab = labels[i];
    body.push(bandedRow(i, [
      { text: id, bold: true, alignment: 'center' },
      title,
      labCell(lab[0]), labCell(lab[1]), labCell(lab[2]), labCell(lab[3])
    ]));
  });
  return { table: { headerRows: 1, widths, body, dontBreakRows: true, keepWithHeaderRows: 1 }, layout: tableLayout(), fontSize: 8, margin: [0, 0, 0, 12] };
}

function theftTable() {
  const widths = [30, '*', 70, 85, 80];
  const body = [ headerRow(['#','Document','Full Theft','Accessory Theft','Recovered Theft']) ];
  docs.forEach(([id, title], i) => {
    const lab = labels[i];
    body.push(bandedRow(i, [
      { text: id, bold: true, alignment: 'center' },
      title,
      labCell(lab[4]), labCell(lab[5]), labCell(lab[6])
    ]));
  });
  return { table: { headerRows: 1, widths, body, dontBreakRows: true, keepWithHeaderRows: 1 }, layout: tableLayout(), fontSize: 9, margin: [0, 0, 0, 12] };
}

function totalLossTable() {
  const widths = [30, '*', 85];
  const body = [ headerRow(['#','Document','Total Loss']) ];
  docs.forEach(([id, title], i) => {
    const lab = labels[i];
    body.push(bandedRow(i, [
      { text: id, bold: true, alignment: 'center' },
      title,
      labCell(lab[7])
    ]));
  });
  return { table: { headerRows: 1, widths, body, dontBreakRows: true, keepWithHeaderRows: 1 }, layout: tableLayout(), fontSize: 9, margin: [0, 0, 0, 12] };
}

function tableLayout() {
  return {
    hLineWidth: () => 0.5,
    vLineWidth: () => 0.5,
    hLineColor: () => '#B0B0B0',
    vLineColor: () => '#B0B0B0',
    paddingTop:    () => 4,
    paddingBottom: () => 4,
    paddingLeft:   () => 6,
    paddingRight:  () => 6
  };
}

// ---------- Document definition ----------
const docDef = {
  pageSize: 'LETTER',
  pageOrientation: 'landscape',
  pageMargins: [40, 50, 40, 45],
  defaultStyle: { font: 'Helvetica', fontSize: 10, lineHeight: 1.25 },
  footer: (current, total) => ({
    text: `${current} / ${total}`,
    alignment: 'center', fontSize: 8, color: '#888888', margin: [0, 10, 0, 0]
  }),
  styles: {
    h1: { fontSize: 18, bold: true, color: '#2E5A88', margin: [0, 18, 0, 10] },
    h2: { fontSize: 13, bold: true, color: '#2E5A88', margin: [0, 14, 0, 6] },
    title: { fontSize: 22, bold: true, color: '#2E5A88' },
    subtitle: { fontSize: 11, italics: true, color: '#555555', margin: [0, 2, 0, 12] },
    note: { italics: true, fontSize: 9, color: '#666666', margin: [0, 4, 0, 8] }
  },
  content: [
    { text: 'Claims V2 — Document Collection Matrix', style: 'title' },
    { text: 'Survey-type driven configuration for DSP-side claim investigation & settlement recommendation', style: 'subtitle' },

    { text: '1. Overview', style: 'h1' },
    { text: 'This document defines the document-collection matrix for the Claims V2 product. The primary user is the Distribution Service Partner (DSP) who investigates and recommends settlement across multiple insurers. The DSP does not disburse payments; it submits the investigation report, evidence pack, recommendation, and computed payables to the insurer, and earns a per-claim commission.', margin: [0, 0, 0, 6] },
    { text: 'The matrix is organised by Survey Type (top-level category). Within each survey type, two sub-parameters control the Mandatory / Optional label for each document: the subtype of the survey and the vehicle class. Additional sub-threshold conditions (e.g., hypothecation, KYC threshold, settlement mode) are handled as inline rules in code — they are not insurer-facing config levers.', margin: [0, 0, 0, 10] },

    { text: '2. Parameters', style: 'h1' },
    parametersTable(),

    { text: '3. Legend', style: 'h1' },
    { ul: [
        { text: [{ text: 'M', bold: true }, ' = Mandatory — always required in this cell.'] },
        { text: [{ text: 'O', bold: true }, ' = Optional — not a blocker; may be promoted to M by an inline rule (see Section 5).'] },
        { text: [{ text: 'NA', bold: true }, ' = Not Applicable — never requested in this cell.'] },
        { text: [{ text: 'vc', bold: true }, ' = Vehicle-class-driven — resolved via the Vehicle Class rule (Section 4).'] },
        'Footnote markers on labels (*, †, ‡, #) indicate an inline-rule condition that can promote Optional to Mandatory at runtime (see Section 5).'
      ], margin: [0, 0, 0, 10] },

    { text: '4. Vehicle Class rule', style: 'h1' },
    { text: 'The following documents are vehicle-class-driven. They are marked "vc" in the survey-type tables and resolve per the table below across all survey types and subtypes.', margin: [0, 0, 0, 6] },
    vehicleClassTable(),
    { text: 'All other documents are vehicle-class-agnostic.', style: 'note' },

    { text: '5. Inline-rule footnote keys', style: 'h1' },
    { text: 'These rules are evaluated at runtime from claim data. They can flip an Optional label to Mandatory. They are not insurer-facing config parameters, but each promotion must emit a reason code into the audit log.', margin: [0, 0, 0, 6] },
    { ul: [
        { text: [{ text: '*', bold: true }, ' — Claim payable ≥ insurer\'s KYC threshold → D04 (Aadhaar), D05 (PAN) promote to M.'] },
        { text: [{ text: '†', bold: true }, ' — Settlement mode = Reimbursement → D17 (Cancelled Cheque / Bank Statement) promotes to M.'] },
        { text: [{ text: '‡', bold: true }, ' — RC shows hypothecation → D16 (Form 35), D18 (Financier NOC), D19 (Loan Outstanding Statement) promote to M.'] },
        { text: [{ text: '#', bold: true }, ' — Pure Third-Party claim with no damage to insured\'s own vehicle → D22 (Damage Estimate), D23 (Invoice) become NA.'] }
      ], margin: [0, 0, 0, 10] },

    { text: '6. Master document reference', style: 'h1', pageBreak: 'before' },
    { text: 'Descriptions, categories and probable sources for all 24 documents. Referenced by document code (D01–D24) in the survey-type tables.', margin: [0, 0, 0, 6] },
    masterRefTable(),

    { text: '7. Survey Type 1 — Accident', style: 'h1', pageBreak: 'before' },
    { text: 'Partial-loss claims where the vehicle is damaged but repairable. Labels below are for vehicle class = Private by default; vehicle-class-driven docs are marked "vc" and resolve per Section 4.', margin: [0, 0, 0, 6] },
    accidentTable(),
    { text: 'Key subtype flips: FIR / Police Report / GD (D20) is Mandatory for Third-Party, Optional elsewhere. Natural Peril and Act of God share the same document signature in this matrix.', style: 'note' },

    { text: '8. Survey Type 2 — Theft', style: 'h1', pageBreak: 'before' },
    { text: 'Theft-related claims split by whether the whole vehicle is lost, only accessories, or the vehicle has been recovered.', margin: [0, 0, 0, 6] },
    theftTable(),
    { text: 'Full Theft is the only subtype that triggers the RC-transfer forms (D13–D15) and the Untraced Report (D21). Accessory Theft and Recovered Theft behave like small Own-Damage claims layered on top of a mandatory FIR.', style: 'note' },

    { text: '9. Survey Type 3 — Total Loss', style: 'h1', pageBreak: 'before' },
    { text: 'Constructive Total Loss — repair cost ≥ ~75% of IDV; vehicle written off and settled at IDV less salvage. No subtypes.', margin: [0, 0, 0, 6] },
    totalLossTable(),
    { text: 'Damage Estimate (D22) is Mandatory because it evidences the 75%-of-IDV trigger for CTL. Invoice (D23) is NA because the vehicle is not repaired. RC-transfer forms (D13–D15) are Mandatory because the RC transfers to the insurer for salvage disposal.', style: 'note' },

    { text: '10. Configuration shape', style: 'h1', pageBreak: 'before' },
    { text: 'The schema below shows how each document requirement is represented in the rules engine. The insurer-facing config surface per document is (4 + 3 + 1) = 8 survey-type × subtype cells, plus 3 vehicle-class cells on the four vehicle-class-driven docs. Threshold values (KYC, financier-NOC amount) live in InsurerConfig. Every runtime O → M promotion must emit a reason code into the audit log.', margin: [0, 0, 0, 6] },
    {
      table: {
        widths: ['*'],
        body: [[{
          text:
`DocumentRequirement {
  docCode,                              // D01..D24
  title, description, source, category, // static
  labelBySurveyTypeAndSubtype: {
    ACCIDENT:   { OD, TP, NATURAL_PERIL, ACT_OF_GOD },
    THEFT:      { FULL, ACCESSORY, RECOVERED },
    TOTAL_LOSS: <single label>
  },
  vehicleClassRule?: {                  // only on D09, D10, D11, D12
    PRIVATE, COMMERCIAL_GOODS, COMMERCIAL_TAXI
  },
  inlineRule?                           // O -> M at runtime: KYC / reimbursement / hypothecation / pure-TP
}`,
          font: 'Courier',
          fontSize: 9,
          fillColor: C_CODE_BG
        }]]
      },
      layout: { hLineWidth: () => 0, vLineWidth: () => 0, paddingTop: () => 6, paddingBottom: () => 6, paddingLeft: () => 10, paddingRight: () => 10 },
      margin: [0, 0, 0, 12]
    },

    { text: 'Threshold values (KYC band, financier-NOC amount, subtype-specific overrides) must be verified against the current IRDAI master directions and each insurer\'s claims manual before coding defaults.', style: 'note', margin: [0, 12, 0, 0] }
  ]
};

// ---------- Render ----------
const pdfDoc = printer.createPdfKitDocument(docDef);
const out = "/Users/sanchitatayde/Claude Code- Claims V2/Claims_V2_Document_Collection_Matrix.pdf";
const writeStream = fs.createWriteStream(out);
pdfDoc.pipe(writeStream);
pdfDoc.end();
writeStream.on('finish', () => {
  const size = fs.statSync(out).size;
  console.log('Wrote: ' + out + ' (' + size + ' bytes)');
});
