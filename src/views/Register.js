import React from 'react';
import { Layout, Content, Form, Row, Col, Button, Input } from '../ant';
import Footer from '../components/Footer';
import API from '../api';
import { useAppEnv } from './../env';
import { useHistory } from 'react-router';

export default function Register() {
  let history = useHistory();
  let onSubmit = async (formVal) => {
    let user = await API.post('/api/users', formVal);
    if (user.errors) {
      // TODO: Handle server side failure
      alert(JSON.stringify(user.errors));
      return;
    }
    history.push('/login?username=' + user.username);
  };
  let onFail = (values) => {
    // TODO: Handle client side failure
  };
  return (
    <Layout style={{ height: `${window.innerHeight}px`, overflow: 'hidden' }}>
      <a href="/">
        <img
          style={{ float: 'left', marginRight: '40px' }}
          src="/logo.png"
          width={'160px'}
        />
      </a>
      <Content style={{ padding: '0 50px' }}>
        <Row justify="center" style={{ marginTop: '4rem' }}>
          <Col
            span={10}
            style={{
              textAlign: 'center',
              backgroundColor: '#fff',
              padding: '26px',
            }}
          >
            <Form
              labelCol={{ span: 8 }}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onSubmit}
              onFinishFailed={onFail}
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Please input your email!' },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: 'Please input your username!' },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: 'Please input your password!' },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                rules={[
                  { required: true, message: 'Please confirm your password!' },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
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
