import React, { useEffect } from 'react';
import {
  Layout,
  Content,
  Form,
  Row,
  Col,
  Button,
  Input,
  Typography,
  notification,
} from '../ant';
import Footer from '../components/Footer';
import { useHistory } from 'react-router';
import { useAppEnv } from './../env';
import FormHeader from '../components/FormHeader';
const { Title, Paragraph, Text } = Typography;

export default function Register() {
  let history = useHistory();
  let { api, user } = useAppEnv();
  useEffect(() => {
    if (user) {
      history.push('/');
    }
  });

  let onSubmit = async (formVal) => {
    let user = await api.post('/api/users', formVal);
    if (user.errors) {
      for (let msg of user.errors) {
        notification['error']({
          message: msg.msg,
        });
      }
      return;
    }
    window.gtag('event', 'account_create', {
      event_category: 'accout',
    });
    history.push('/login?username=' + user.username);
  };
  let onFail = (values) => {
    console.log(values);
    for (let err of values.errorFields) {
      notification['error']({
        message: err.errors[0],
      });
    }
  };
  return (
    <Layout style={{ height: `${window.innerHeight}px`, overflow: 'hidden' }}>
      <FormHeader />
      <Content
        style={{
          padding: '0 50px',
          backgroundImage:
            'radial-gradient(circle, rgba(0,166,156,1) 0%, rgba(0,173,238,1) 100%)',
        }}
      >
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
            <Form
              labelCol={{ span: 8 }}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onSubmit}
              onFinishFailed={onFail}
              wrapperCol={{ span: 14 }}
              style={{ minWidth: '600px' }}
            >
              <Typography>
                <Title style={{ minWidth: '500px' }}>User Registration</Title>
                <Paragraph>
                  You can create an account for the AI Global Portal! Members
                  can upload resources to the portal.
                  <Text strong>
                    {' '}
                    After creating your account, an email verfication will be
                    sent to you.
                  </Text>
                </Paragraph>
              </Typography>

              <Form.Item
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}
                style={{ justifyContent: 'center' }}
              >
                <Input placeholder="Name" />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'Please input your email!' },
                ]}
                style={{ justifyContent: 'center' }}
              >
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: 'Please input your username!' },
                ]}
                style={{ justifyContent: 'center' }}
              >
                <Input placeholder="Username" />
              </Form.Item>

              <Form.Item
                name="password"
                placeholder="Password"
                rules={[
                  { required: true, message: 'Please input your password!' },
                ]}
                style={{ justifyContent: 'center' }}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                rules={[
                  { required: true, message: 'Please confirm your password!' },
                ]}
                style={{ justifyContent: 'center' }}
              >
                <Input.Password placeholder="Confirm Password" />
              </Form.Item>

              <Form.Item style={{ justifyContent: 'center' }}>
                <Button type="primary" htmlType="submit" shape="round" block>
                  Create Account
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
