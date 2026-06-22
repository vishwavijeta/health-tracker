import { DatePicker, Form, InputNumber, Modal, Row, Col } from 'antd'

export default function AddReadingModal({ open, tests, onCancel, onSubmit }) {
  const [form] = Form.useForm()

  const handleOk = async () => {
    const values = await form.validateFields()
    const date = values.date.format('YYYY-MM-DD')
    const readings = {}
    tests.forEach((t) => {
      readings[t.key] = values[t.key]
    })
    onSubmit({ date, readings })
    form.resetFields()
  }

  return (
    <Modal
      title="Add New Test Reading"
      open={open}
      onOk={handleOk}
      onCancel={() => {
        form.resetFields()
        onCancel()
      }}
      okText="Add Reading"
      width={640}
      destroyOnClose
    >
      <Form form={form} layout="vertical" preserve={false}>
        <Form.Item
          name="date"
          label="Test Date"
          rules={[{ required: true, message: 'Pick a date' }]}
        >
          <DatePicker style={{ width: 240 }} format="DD MMM YYYY" />
        </Form.Item>
        <Row gutter={16}>
          {tests.map((t) => (
            <Col xs={24} sm={12} md={8} key={t.key}>
              <Form.Item
                name={t.key}
                label={`${t.name} (${t.unit})`}
                rules={[{ required: true, message: 'Required' }]}
              >
                <InputNumber style={{ width: '100%' }} step={0.1} />
              </Form.Item>
            </Col>
          ))}
        </Row>
      </Form>
    </Modal>
  )
}
