import { Card, Tag } from 'antd'
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceArea,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend
} from 'recharts'
import { getStatus, statusMeta, formatRange, shortDate } from '../data/healthData'

export default function TrendChart({ test, dates }) {
  const data = test.readings.map((value, i) => ({
    date: shortDate(dates[i]),
    value,
  }))

  const latest = test.readings[test.readings.length - 1]
  const status = getStatus(latest, test.min, test.max)
  const meta = statusMeta[status]

  // Build a Y domain with a little padding around values + reference band.
  const candidates = [
    ...test.readings,
    ...(test.min != null ? [test.min] : []),
    ...(test.max != null ? [test.max] : []),
  ]
  const lo = Math.min(...candidates)
  const hi = Math.max(...candidates)
  const pad = (hi - lo) * 0.15 || 1
  const domain = [Math.floor(lo - pad), Math.ceil(hi + pad)]

  return (
    <Card
      size="small"
      className="chart-card"
      title={
        <span>
          {test.name}{' '}
          <span style={{ color: '#9ca3af', fontWeight: 400 }}>({test.unit})</span>
        </span>
      }
      extra={<Tag color={meta.color}>{meta.label}</Tag>}
    >
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data} margin={{ top: 6, right: 12, bottom: 0, left: -18 }}>
          <CartesianGrid strokeDasharray="3 3" 
          stroke="#eef2f1" 
          />
          {/* Healthy reference band */}
          {(test.min != null || test.max != null) && (
            <ReferenceArea
              y1={test.min != null ? test.min : domain[0]}
              y2={test.max != null ? test.max : domain[1]}
              fill="#0d9488"
              fillOpacity={0.08}
            />
          )}
          <XAxis dataKey="date" tick={{ fontSize: 11 }} />
          <YAxis domain={domain} tick={{ fontSize: 11 }} width={40} />
          <Tooltip
            formatter={(v) => [`${v} ${test.unit}`, 'Reading']}
            labelStyle={{ fontSize: 12 }}
          />
           <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#0d9488"
            strokeWidth={2.5}
            dot={{ r: 4, fill: '#0d9488' }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
      <div style={{ fontSize: 12, color: '#6b7280', textAlign: 'center' }}>
        Healthy range: {formatRange(test.min, test.max)} {test.unit}
      </div>
    </Card>
  )
}
