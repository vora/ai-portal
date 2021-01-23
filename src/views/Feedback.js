import React from 'react';
import {
  Layout,
  Content,
  Form,
  Row,
  Col,
  Button,
  Typography,
  Input,
  notification,
} from '../ant';
import Footer from '../components/Footer';
import FormHeader from '../components/FormHeader';
import MultiSelectField from '../components/FormMultiSelectField';
import FormField from '../components/FormField';
import { useAppEnv } from './../env';
const { TextArea } = Input;

const { Title } = Typography;

export default function Feedback(props) {
  let { api } = useAppEnv();
  let onSubmit = async (values) => {
    await api.post('/api/feedback/submit', values);
    notification.info({ message: 'Sent!' });
  };
  let onFail = (values) => {
    for (let err of values.errorFields) {
      notification.error({
        message: err.errors[0],
      });
    }
  };
  return (
    <Layout style={{ height: `${window.innerHeight}px`, overflow: 'scroll' }}>
      <FormHeader />
      <Content
        style={{
          padding: '0 50px',
        }}
      >
        <Row
          justify="center"
          style={{ marginTop: '4rem', marginBottom: '4rem' }}
        >
          <Col
            span={12}
            style={{
              textAlign: 'center',
              backgroundColor: '#fff',
              padding: '26px',
              minWidth: '700px',
            }}
          >
            <Typography>
              <Title style={{ minWidth: '500px' }}>Suggestions</Title>
            </Typography>
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onSubmit}
              onFinishFailed={onFail}
              style={{ minWidth: '600px' }}
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 13 }}
            >
              <MultiSelectField
                field="Suggestion Category"
                mode="multiple"
                options={[
                  'Uploading my resource',
                  'Suggesting a resource',
                  'Getting involved with AI Global',
                  'Recommending feedback on Portal',
                  'Other',
                ]}
                req={true}
              />

              <Form.Item
                name="Comments"
                label="Comments"
                rules={[
                  {
                    required: true,
                    message: 'Please add the comments',
                  },
                ]}
              >
                <TextArea rows={7}></TextArea>
              </Form.Item>
              <FormField field="Email" req={true} />
              <FormField field="Name" req={true} />
              <FormField
                field="Organization"
                text="Any AI related organizations that you are a part of"
                req={false}
              />

              <Form.Item justify="center">
                <Button type="primary" htmlType="submit" shape="round" block>
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
