import { Table, Tag } from 'antd'
import {
  getStatus,
  statusMeta,
  formatRange,
  shortDate,
} from '../data/healthData'

export default function ReadingsTable({ tests, dates }) {
  const columns = [
    {
      title: 'Test',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      width: 170,
      render: (name, row) => (
        <div>
          <div style={{ fontWeight: 600 }}>{name}</div>
          <div style={{ fontSize: 11, color: '#9ca3af' }}>{row.group}</div>
        </div>
      ),
    },
    {
      title: 'Reference',
      key: 'reference',
      width: 120,
      render: (_, row) => (
        <span style={{ fontSize: 12, color: '#6b7280' }}>
          {formatRange(row.min, row.max)} {row.unit}
        </span>
      ),
    },
    ...dates.map((d, i) => ({
      title: shortDate(d),
      key: d,
      align: 'center',
      render: (_, row) => {
        const value = row.readings[i]
        const isLatest = i === dates.length - 1
        const status = getStatus(value, row.min, row.max)
        const meta = statusMeta[status]
        return (
          <span
            style={{
              fontWeight: isLatest ? 700 : 400,
              color: status === 'normal' ? '#1f2937' : meta.color === 'red' ? '#dc2626' : '#ca8a04',
            }}
          >
            {value}
          </span>
        )
      },
    })),
    {
      title: 'Latest Status',
      key: 'status',
      fixed: 'right',
      width: 120,
      render: (_, row) => {
        const latest = row.readings[row.readings.length - 1]
        const meta = statusMeta[getStatus(latest, row.min, row.max)]
        return <Tag color={meta.color}>{meta.label}</Tag>
      },
    },
  ]

  return (
    <Table
      rowKey="key"
      size="small"
      columns={columns}
      dataSource={tests}
      pagination={false}
      scroll={{ x: 900 }}
    />
  )
}
