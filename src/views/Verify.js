import React, { useState } from 'react';
import { Layout, Content, Row, Col, Switch } from '../ant';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import Footer from '../components/Footer';

export default function Verify() {
  let [check, setChecked] = useState(true);

  let toggleChecked = (checked) => {
    setChecked(checked);
  };

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
            <Switch
              defaultChecked
              onChange={toggleChecked}
              style={{ marginBottom: '20px' }}
            />
            <div>
              {check && (
                <div>
                  <div style={{ marginBottom: '20px' }}>
                    <CheckCircleTwoTone
                      style={{ fontSize: '160px' }}
                      twoToneColor="#00adee"
                    />
                  </div>
                  <b>Verified!</b>
                </div>
              )}
              {!check && (
                <div>
                  <div style={{ marginBottom: '20px' }}>
                    <CloseCircleTwoTone
                      style={{ fontSize: '160px' }}
                      twoToneColor="#00adee"
                    />
                  </div>
                  <b>Looks like something went wrong. Try again</b>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Content>
      <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
        <Footer />
      </div>
    </Layout>
  );
}
