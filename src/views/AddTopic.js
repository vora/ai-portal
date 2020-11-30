import React from 'react';
import {
  Layout,
  Content,
  Button,
  Input,
  Form,
  Col,
  Typography,
  Tooltip,
  Row,
} from '../ant';
import Footer from '../components/Footer';
import FormField from '../components/FormField';
import FormHeader from '../components/FormHeader';

const { TextArea } = Input;
const { Title } = Typography;
// let example = { name: '', desc: '' };

function AddTopic() {
  let onSubmit = async (values) => {};
  let onFail = (values) => {};
  return (
    <Layout style={{ height: `${window.innerHeight}px`, overflow: 'hidden' }}>
      <FormHeader />
      <Content style={{ padding: '0 50px' }}>
        <Row justify="center" style={{ marginTop: '4rem' }}>
          <Col
            span={10}
            style={{
              textAlign: 'center',
              backgroundColor: '#fff',
              padding: '26px',
              minWidth: '700px',
            }}
          >
            <Typography>
              <Title style={{ minWidth: '500px' }}>Add a Topic</Title>
            </Typography>
            <Form
              labelCol={{ span: 3 }}
              wrapperCol={{ span: 10 }}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onSubmit}
              onFinishFailed={onFail}
              style={{ minWidth: '1000px', overflow: 'auto' }}
            >
              <FormField field="Topic Name" text="..." req="true" />
              <Tooltip title="A brief description about the topic">
                <Form.Item
                  name="Description"
                  label="Description"
                  rules={[
                    {
                      required: true,
                      message: 'Please add the description',
                    },
                  ]}
                >
                  <TextArea rows={4}></TextArea>
                </Form.Item>
              </Tooltip>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  shape="round"
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Content>
      <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
        <Footer />
      </div>
    </Layout>
  );
}

export default AddTopic;
