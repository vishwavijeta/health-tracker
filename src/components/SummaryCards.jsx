import { Card, Col, Row, Statistic, Tag, Tooltip } from 'antd'
import { ArrowDownOutlined, ArrowUpOutlined, MinusOutlined } from '@ant-design/icons'
import { getStatus, statusMeta, formatRange } from '../data/healthData'

function trendIcon(delta) {
  if (delta > 0) return <ArrowUpOutlined />
  if (delta < 0) return <ArrowDownOutlined />
  return <MinusOutlined />
}

export default function SummaryCards({ tests }) {
  return (
    <Row gutter={[16, 16]}>
      {tests.map((t) => {
        const latest = t.readings[t.readings.length - 1]
        const prev = t.readings[t.readings.length - 2]
        const delta = prev != null ? +(latest - prev).toFixed(2) : 0
        const status = getStatus(latest, t.min, t.max)
        const meta = statusMeta[status]

        return (
          <Col key={t.key} xs={24} sm={12} md={8} lg={6}>
            <Card size="small" hoverable>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 4,
                }}
              >
                <span style={{ fontWeight: 600 }}>{t.name}</span>
                <Tag color={meta.color}>{meta.label}</Tag>
              </div>
              <Statistic
                value={latest}
                suffix={<span style={{ fontSize: 13 }}>{t.unit}</span>}
                valueStyle={{ fontSize: 26 }}
              />
              <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>
                <Tooltip title="Change vs previous reading">
                  <span
                    style={{
                      color:
                        delta === 0 ? '#9ca3af' : delta > 0 ? '#dc2626' : '#16a34a',
                      marginRight: 8,
                    }}
                  >
                    {trendIcon(delta)} {delta > 0 ? '+' : ''}
                    {delta}
                  </span>
                </Tooltip>
                Ref: {formatRange(t.min, t.max)} {t.unit}
              </div>
            </Card>
          </Col>
        )
      })}
    </Row>
  )
}
