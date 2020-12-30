import React, { useState, useEffect } from 'react';
import { Layout, Content, Row, Col, Spin } from '../ant';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import Footer from '../components/Footer';
import { queryParamsFromProps } from '../util';
import { useAppEnv } from './../env';

export default function Verify(props) {
  let { api } = useAppEnv();
  let { username, token } = queryParamsFromProps(props);
  let [status, setStatus] = useState('Loading...');
  let [success, setSuccess] = useState(false);
  let [loading, setLoading] = useState(true);
  useEffect(() => {
    api.post('/api/auth/verify/email', { username, token }).then((res) => {
      if (res.verified) {
        setStatus('Verified!');
        setSuccess(true);
        setTimeout(() => (window.location = '/'), 5000);
      } else {
        setSuccess(false);
        setStatus('Looks like something went wrong. Try again.');
      }
      setLoading(false);
    });
  }, [api, username, token]);
  return (
    <Layout style={{ height: `${window.innerHeight}px`, overflow: 'hidden' }}>
      <Content
        style={{
          padding: '0 50px',
        }}
      >
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
            {loading ? (
              <Spin />
            ) : (
              <>
                <div>
                  <div style={{ marginBottom: '20px' }}>
                    {success ? (
                      <CheckCircleTwoTone
                        style={{ fontSize: '160px' }}
                        twoToneColor="#00adee"
                      />
                    ) : (
                      <CloseCircleTwoTone
                        style={{ fontSize: '160px' }}
                        twoToneColor="#00adee"
                      />
                    )}
                  </div>
                  <b>{status}</b>
                </div>
              </>
            )}
            <div></div>
          </Col>
        </Row>
      </Content>
      <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
        <Footer />
      </div>
    </Layout>
  );
}
