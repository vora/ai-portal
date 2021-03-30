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
import MultiSelectField from '../components/FormMultiSelectField';
import FormField from '../components/FormField';
import NavBar from '../components/NavBar';
import { useHistory } from 'react-router';
import { useAppEnv } from './../env';

const { TextArea } = Input;

const { Title } = Typography;

export default function Feedback(props) {
  let history = useHistory();
  let { api } = useAppEnv();
  let onSubmit = async (values) => {
    await api.post('/api/feedback/submit', values);
    notification.info({ message: 'Sent!' });
    history.push('/resources');
  };
  let onFail = (values) => {
    for (let err of values.errorFields) {
      notification.error({
        message: err.errors[0],
      });
    }
  };

  return (
    <Layout>
      <NavBar />
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
      <Footer />
    </Layout>
  );
}
