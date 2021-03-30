import React from 'react';
import {
  Layout,
  Content,
  Button,
  Form,
  Col,
  Typography,
  Row,
  Input,
  notification,
} from '../ant';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import { useAppEnv } from './../env';
import { queryParamsFromProps } from '../util';

const { Title } = Typography;

function ResetPassword(props) {
  let { api } = useAppEnv();
  let { username, token } = queryParamsFromProps(props);
  let onSubmit = async (values) => {
    if (values['password'] !== values['confirm-password']) {
      notification.error({ message: 'Please retype. Passwords do not match' });
    }
    let resp = await api.post('/api/auth/reset/password', {
      username: username,
      token: token,
      password: values['password'],
    });
    if (resp.errors) {
      for (let error of resp.errors) {
        notification.error({
          message: error.msg,
        });
      }
      return;
    } else {
      window.location = '/login';
    }
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
      <Layout
        style={{ height: `${window.innerHeight - 120}px`, overflow: 'hidden' }}
      >
        <Content style={{ padding: '0 50px' }}>
          <Row justify="center" style={{ marginTop: '4rem' }}>
            <Col
              span={8}
              style={{
                textAlign: 'center',
                backgroundColor: '#fff',
                padding: '26px',
                minWidth: '700px',
              }}
            >
              <Typography>
                <Title style={{ minWidth: '500px' }}>Reset Password</Title>
              </Typography>
              <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onSubmit}
                onFinishFailed={onFail}
                style={{ minWidth: '600px' }}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 14 }}
              >
                <Form.Item name="username" justify="center">
                  <span>{username}</span>
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  justify="center"
                >
                  <Input.Password placeholder="New Password" />
                </Form.Item>
                <Form.Item
                  name="confirm-password"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  justify="center"
                >
                  <Input.Password placeholder="Confirm Password" />
                </Form.Item>
                <Form.Item justify="center">
                  <Button type="primary" htmlType="submit" shape="round">
                    Reset
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Content>
      </Layout>
      <Footer />
    </Layout>
  );
}

export default ResetPassword;
