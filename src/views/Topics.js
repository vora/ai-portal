import React, { useRef } from 'react';
import { Layout, Row, Content, Col } from '../ant';
import Footer from '../components/Footer';
import FAQ from '../components/Faq';
import { BackTop } from 'antd';
import { UpCircleOutlined } from '@ant-design/icons';
import NavBar from '../components/NavBar';

function Topics() {
  let faqRef = useRef(null);
  return (
    <Layout>
      <NavBar />
      <Content style={{ padding: '0 50px', backgroundColor: 'white' }}>
        <BackTop>
          <UpCircleOutlined style={{ fontSize: '3em', color: '#1890ff' }} />
        </BackTop>
        <Row
          justify="center"
          style={{ marginTop: '4rem', textAlign: 'center' }}
        >
          <Col span={15}>
            <h1 style={{ fontSize: '2em', fontWeight: 'bold' }}>
              About the Responsible AI Community Portal
            </h1>
            <p
              style={{
                marginBottom: '15px',
                fontSize: '1.4em',
                textAlign: 'start',
              }}
            >
              The Responsible AI Community Portal is a{' '}
              <strong>
                selected repository of reports, standards, models, government
                policies, datasets, and open-source software
              </strong>{' '}
              designed to support Responsible AI development. If you'd like to
              learn more, watch the demo below or explore our{' '}
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  faqRef.current.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                FAQ
              </a>
              .
            </p>
            <p style={{ fontWeight: 'bold', fontSize: '1.4em' }}>
              Video Demonstration
            </p>
            <iframe
              title="Demo"
              width="640"
              height="385"
              src="https://www.youtube.com/embed/Nucvst3tC90"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </Col>
        </Row>
        <Row justify="center" style={{ marginTop: '2rem' }}>
          <div ref={faqRef}>
            <h1
              style={{
                fontSize: '1.5em',
                fontWeight: 'bold',
                marginTop: '6rem',
              }}
            >
              Frequently Asked Questions
            </h1>
          </div>
        </Row>
        <Row justify="center" style={{ marginTop: '0.2rem' }}>
          <Col span={15}>
            <FAQ />
          </Col>
        </Row>
      </Content>

      <Footer />
    </Layout>
  );
}

export default Topics;
