import React, { useEffect, useState } from 'react';
import {
  Layout,
  Content,
  Form,
  Row,
  Col,
  Button,
  Input,
  Checkbox,
  notification,
  Typography,
} from '../ant';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Footer from '../components/Footer';
import { useAppEnv } from './../env';
import { useHistory } from 'react-router';
import { queryParamsFromProps } from '../util';
import FormHeader from '../components/FormHeader';

const { Title } = Typography;

export default function Login(props) {
  let { user } = useAppEnv();
  let history = useHistory();
  // Control login fields vs forget password (overriden by oauth flow)
  let [showLogin, setShowLogin] = useState(true);
  let { username, flow, ...oauthParams } = queryParamsFromProps(props);
  useEffect(() => {
    if (username) {
      notification.info({
        message: `Login as ${username} and verify your account by visiting the url sent to your email.`,
      });
    }
  }, [username]);
  let inOAuth = !!oauthParams.client_id;
  useEffect(() => {
    if (user && !inOAuth) {
      // already logged in?
      history.push('/');
    }
  }, [user, inOAuth, history]);
  let redirect = inOAuth
    ? `/auth?flow=post&${Object.keys(oauthParams)
        .map((k) => k + '=' + oauthParams[k])
        .join('&')}`
    : '/resources';
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
          {inOAuth && user ? (
            <OAuthConfirmView oauthParams={oauthParams} />
          ) : showLogin ? (
            <LoginView
              {...props}
              redirect={redirect}
              setShowLogin={setShowLogin}
            />
          ) : (
            <LoginForgetView {...props} setShowLogin={setShowLogin} />
          )}
        </Row>
      </Content>
      <Footer />
    </Layout>
  );
}

function OAuthConfirmView({ oauthParams }) {
  let [oauthInfo, setOAuthInfo] = useState(null);
  let { api } = useAppEnv();
  let history = useHistory();
  useEffect(() => {
    if (oauthParams.client_id) {
      api.get(`/api/oauth/clients/${oauthParams.client_id}`).then(setOAuthInfo);
    }
  }, [api, oauthParams.client_id]);
  let allow = () => {
    api.post('/api/oauth/authcode', oauthParams).then(console.log);
  };
  return (
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
        <Title style={{ minWidth: '500px' }}>{oauthInfo?.name}</Title>
        <span>Allow {oauthInfo?.name} to access your AI Global account?</span>
        <br />
        <div style={{ marginTop: '10px' }}>
          <Button type="danger" onClick={() => history.push('/')}>
            Deny
          </Button>
          <Button
            style={{ marginLeft: '10px' }}
            type="primary"
            onClick={() => allow()}
          >
            Allow
          </Button>
        </div>
      </Typography>
    </Col>
  );
}

function LoginView({ setShowLogin, redirect }) {
  let { setUser, setKey, api } = useAppEnv();
  let history = useHistory();
  let onSubmit = async (values) => {
    let result = await api.post('/api/auth/login', values);
    if (result.errors) {
      for (let error of result.errors) {
        notification.error({
          message: error.msg,
        });
      }
      return;
    }
    window.gtag('event', 'login_success', {
      event_category: 'accout',
    });
    setUser(result.user);
    setKey('token', result.token);
    history.push(redirect);
  };
  let onFail = (values) => {
    for (let err of values.errorFields) {
      notification.error({
        message: err.errors[0],
      });
    }
  };
  return (
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
        <Title style={{ minWidth: '500px' }}>Login</Title>
      </Typography>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onSubmit}
        onFinishFailed={onFail}
        style={{ minWidth: '600px' }}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" shape="round" block>
            Log In
          </Button>
        </Form.Item>
        <p>
          <a onClick={() => setShowLogin(false)} href="/register">
            Create account
          </a>
        </p>
        <p>
          <a onClick={() => setShowLogin(false)} href="#!">
            Forgot login?
          </a>
        </p>
      </Form>
    </Col>
  );
}

function LoginForgetView(props) {
  let { api } = useAppEnv();
  let onSubmit = async ({ username }) => {
    let result = await api.post('/api/auth/reset/password', { username });
    if (result.errors) {
      for (let error of result.errors) {
        notification.error({
          message: error.msg,
        });
      }
      return;
    } else {
      notification.info({
        message: 'Email sent!',
      });
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
        <Title style={{ minWidth: '500px' }}>Reset Login</Title>
      </Typography>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onSubmit}
        onFinishFailed={onFail}
        style={{ minWidth: '600px' }}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" shape="round" block>
            Send Reset Email
          </Button>
        </Form.Item>
        <p>
          <a onClick={() => props.setShowLogin(true)} href="#!">
            Login
          </a>
        </p>
      </Form>
    </Col>
  );
}
