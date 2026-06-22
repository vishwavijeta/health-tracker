import { useMemo, useState } from 'react'
import { Button, Col, Row, Segmented, Statistic, Card, App as AntApp } from 'antd'
import { HeartFilled, PlusOutlined } from '@ant-design/icons'
import {
  bloodTests as initialTests,
  dates as initialDates,
  getStatus,
} from './data/healthData'
import SummaryCards from './components/SummaryCards'
import TrendChart from './components/TrendChart'
import ReadingsTable from './components/ReadingsTable'
import AddReadingModal from './components/AddReadingModal'

const MAX_HISTORY = 5

export default function App() {
  const { message } = AntApp.useApp()
  const [tests, setTests] = useState(initialTests)
  const [dates, setDates] = useState(initialDates)
  const [modalOpen, setModalOpen] = useState(false)
  const [groupFilter, setGroupFilter] = useState('All')

  const groups = useMemo(
    () => ['All', ...Array.from(new Set(initialTests.map((t) => t.group)))],
    []
  )

  const visibleTests = useMemo(
    () => (groupFilter === 'All' ? tests : tests.filter((t) => t.group === groupFilter)),
    [tests, groupFilter]
  )

  // Health snapshot: how many of the latest readings sit in / out of range.
  const snapshot = useMemo(() => {
    let normal = 0
    let flagged = 0
    tests.forEach((t) => {
      const latest = t.readings[t.readings.length - 1]
      getStatus(latest, t.min, t.max) === 'normal' ? normal++ : flagged++
    })
    return { normal, flagged, total: tests.length }
  }, [tests])

  const handleAddReading = ({ date, readings }) => {
    setDates((prev) => [...prev, date].slice(-MAX_HISTORY))
    setTests((prev) =>
      prev.map((t) => ({
        ...t,
        readings: [...t.readings, readings[t.key]].slice(-MAX_HISTORY),
      }))
    )
    setModalOpen(false)
    message.success('New reading added — charts updated')
  }

  return (
    <>
      <header className="app-header">
        <div>
          <h1>
            <HeartFilled style={{ marginRight: 8 }} />
            Health Tracker
          </h1>
          <p>Blood test results &amp; trends · last {MAX_HISTORY} readings</p>
        </div>
        <Button
          type="primary"
          ghost
          icon={<PlusOutlined />}
          onClick={() => setModalOpen(true)}
          style={{ borderColor: '#fff', color: '#fff' }}
        >
          Add Reading
        </Button>
      </header>

      <div className="app-body">
        {/* Top-line health snapshot */}
        <Row gutter={[16, 16]} style={{ marginBottom: 8 }}>
          <Col xs={24} sm={8}>
            <Card size="small">
              <Statistic title="Tests Tracked" value={snapshot.total} />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card size="small">
              <Statistic
                title="In Range"
                value={snapshot.normal}
                valueStyle={{ color: '#16a34a' }}
                suffix={`/ ${snapshot.total}`}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card size="small">
              <Statistic
                title="Needs Attention"
                value={snapshot.flagged}
                valueStyle={{ color: snapshot.flagged ? '#dc2626' : '#16a34a' }}
              />
            </Card>
          </Col>
        </Row>

        <div className="section-title">Latest Results</div>
        <SummaryCards tests={visibleTests} />

        <div className="section-title">Trends</div>
        <Segmented
          options={groups}
          value={groupFilter}
          onChange={setGroupFilter}
          style={{ marginBottom: 16 }}
        />
        <Row gutter={[16, 16]}>
          {visibleTests.map((t) => (
            <Col key={t.key} xs={24} md={12} lg={8}>
              <TrendChart test={t} dates={dates} />
            </Col>
          ))}
        </Row>

        <div className="section-title">All Readings</div>
        <ReadingsTable tests={visibleTests} dates={dates} />
      </div>

      <AddReadingModal
        open={modalOpen}
        tests={tests}
        onCancel={() => setModalOpen(false)}
        onSubmit={handleAddReading}
      />
    </>
  )
}
