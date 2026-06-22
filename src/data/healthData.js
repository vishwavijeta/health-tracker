// The 5 most recent test dates (oldest -> newest). Today is Jun 2026.
export const dates = [
  '2026-02-20',
  '2026-03-20',
  '2026-04-20',
  '2026-05-20',
  '2026-06-20',
]

// Each blood-test parameter carries its reference range and the last 5 readings,
// index-aligned with the `dates` array above.
// `min`/`max` may be null when a parameter only has a one-sided healthy range
// (e.g. cholesterol is "lower is better", HDL is "higher is better").
export const bloodTests = [
  {
    key: 'hemoglobin',
    name: 'Hemoglobin',
    group: 'Complete Blood Count',
    unit: 'g/dL',
    min: 13.5,
    max: 17.5,
    readings: [13.1, 13.6, 14.2, 14.0, 14.6],
  },
  {
    key: 'wbc',
    name: 'WBC Count',
    group: 'Complete Blood Count',
    unit: '10³/µL',
    min: 4.0,
    max: 11.0,
    readings: [9.8, 10.4, 8.9, 7.6, 7.1],
  },
  {
    key: 'platelets',
    name: 'Platelets',
    group: 'Complete Blood Count',
    unit: '10³/µL',
    min: 150,
    max: 400,
    readings: [210, 198, 225, 240, 232],
  },
  {
    key: 'glucose',
    name: 'Fasting Glucose',
    group: 'Metabolic',
    unit: 'mg/dL',
    min: 70,
    max: 99,
    readings: [108, 104, 99, 95, 92],
  },
  {
    key: 'hba1c',
    name: 'HbA1c',
    group: 'Metabolic',
    unit: '%',
    min: null,
    max: 5.7,
    readings: [6.3, 6.1, 5.9, 5.7, 5.6],
  },
  {
    key: 'cholesterol',
    name: 'Total Cholesterol',
    group: 'Lipid Profile',
    unit: 'mg/dL',
    min: null,
    max: 200,
    readings: [224, 215, 208, 196, 189],
  },
  {
    key: 'hdl',
    name: 'HDL ("good")',
    group: 'Lipid Profile',
    unit: 'mg/dL',
    min: 40,
    max: null,
    readings: [38, 41, 44, 46, 49],
  },
  {
    key: 'ldl',
    name: 'LDL ("bad")',
    group: 'Lipid Profile',
    unit: 'mg/dL',
    min: null,
    max: 100,
    readings: [142, 132, 121, 110, 101],
  },
  {
    key: 'triglycerides',
    name: 'Triglycerides',
    group: 'Lipid Profile',
    unit: 'mg/dL',
    min: null,
    max: 150,
    readings: [188, 171, 160, 148, 139],
  },
  {
    key: 'creatinine',
    name: 'Creatinine',
    group: 'Kidney',
    unit: 'mg/dL',
    min: 0.7,
    max: 1.3,
    readings: [1.0, 1.1, 1.0, 0.9, 1.0],
  },
  {
    key: 'vitaminD',
    name: 'Vitamin D',
    group: 'Vitamins',
    unit: 'ng/mL',
    min: 30,
    max: 100,
    readings: [18, 22, 27, 31, 36],
  },
  {
    key: 'tsh',
    name: 'TSH (Thyroid)',
    group: 'Hormones',
    unit: 'mIU/L',
    min: 0.4,
    max: 4.0,
    readings: [3.1, 2.8, 2.5, 2.2, 2.0],
  },
]

// Classify a single value against its reference range.
export function getStatus(value, min, max) {
  if (value == null || Number.isNaN(value)) return 'unknown'
  if (min != null && value < min) return 'low'
  if (max != null && value > max) return 'high'
  return 'normal'
}

export const statusMeta = {
  normal: { color: 'green', label: 'Normal' },
  low: { color: 'gold', label: 'Low' },
  high: { color: 'red', label: 'High' },
  unknown: { color: 'default', label: '—' },
}

// Human-readable reference range, e.g. "13.5 – 17.5", "< 200", "> 40".
export function formatRange(min, max) {
  if (min != null && max != null) return `${min} – ${max}`
  if (max != null) return `< ${max}`
  if (min != null) return `> ${min}`
  return '—'
}

export function shortDate(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-GB', { month: 'short', year: '2-digit' })
}
