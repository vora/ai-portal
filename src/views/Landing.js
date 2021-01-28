import React, { useState, useEffect, useRef } from 'react';
import { Layout, Content, Search, Row, Col, Card, Button } from '../ant';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import LoginButton from '../components/LoginButton';
import Banner from '../components/Banner';
import FAQ from '../components/Faq';
import { notification, BackTop } from 'antd';
import { useAppEnv } from './../env';
import {
  RightCircleOutlined,
  QuestionCircleOutlined,
  UpCircleOutlined,
  DownCircleOutlined,
} from '@ant-design/icons';

function Landing() {
  let faqRef = useRef(null);
  let { api } = useAppEnv();
  let [featured, setFeatured] = useState([]);
  let history = useHistory();
  let [query, setQuery] = React.useState('');
  useEffect(() => {
    api.get('/api/resources/all/featured').then(setFeatured);
  }, [api]);
  console.log(featured);
  return (
    <Layout style={{ backgroundColor: '#fff' }}>
      <Banner
        message="Welcome to the Community Portal Beta!"
        secondary="Learn more"
        link="/faq"
      />
      <div style={{ position: 'absolute', top: '60px', right: '20px' }}>
        <LoginButton />
      </div>
      <Content style={{ padding: '0 50px' }}>
        <BackTop>
          <UpCircleOutlined style={{ fontSize: '3em', color: '#1890ff' }} />
        </BackTop>
        <Row justify="center" style={{ marginTop: '7rem' }}>
          <Col span={12} style={{ textAlign: 'center' }}>
            <a href="/">
              <img alt="logo" src="/demo/aiglobal-other.png" width={'180px'} />
            </a>
            <h1 style={{ fontSize: '2rem', marginTop: '5px' }}>
              Responsible AI Community Portal Beta
            </h1>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Search
                placeholder="Search for featured resources including datasets, toolkits, and more"
                enterButton
                size="large"
                onChange={(e) => setQuery(e.target.value)}
                onSearch={() => history.push('/resources?q=' + query)}
                style={{
                  marginBottom: '5px',
                }}
              />
              <a style={{ fontSize: '1.2em' }} href="/resources?q=">
                Explore the resources&nbsp;
                <RightCircleOutlined />
              </a>
            </div>
          </Col>
        </Row>
        <Row justify="center" style={{ marginTop: '4rem', marginBottom: '0' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <p
              style={{
                fontSize: '2.5em',
                fontWeight: 'bold',
                color: 'black',
                marginBottom: '0',
              }}
            >
              Looking for resources?{' '}
              <span style={{ color: '#1890ff' }}>
                You came to the right place.
              </span>
            </p>
          </div>
        </Row>
        <Row justify="center">
          <Col span={14}>
            <p style={{ fontSize: '1.4em', textAlign: 'center' }}>
              On the Community Portal, you can find{' '}
              <strong>selected research, datasets, toolkits, and more</strong>{' '}
              to help you learn more about <strong>Responsible AI</strong> and
              apply it in you work. Start <a href="/resources?q=">searching</a>{' '}
              or <a href="/resources/create">upload</a>&nbsp;your own resources!
            </p>
          </Col>
        </Row>
        <Row justify="center">
          <a
            style={{ color: 'gray', fontSize: '1.3em', fontWeight: 'bolder' }}
            href="/faq"
          >
            Unsure of where to start? Click to learn more{' '}
            <RightCircleOutlined />
          </a>
        </Row>
        <Row justify="center" style={{ marginTop: '2rem' }}>
          <DownCircleOutlined
            style={{ fontSize: '3em', color: '#1890ff', opacity: '0.6' }}
            onClick={() =>
              faqRef.current.scrollIntoView({
                behavior: 'smooth',
              })
            }
          />
        </Row>
        <Row justify="center" style={{ marginTop: '9rem' }}>
          <div
            ref={faqRef}
            style={{ display: 'flex', justifyContent: 'flex-start' }}
          >
            <p
              style={{
                fontSize: '2em',
                fontWeight: 'bold',
                color: 'black',
                marginTop: '2rem',
              }}
            >
              Frequently Asked Questions
            </p>
          </div>
        </Row>
        <Row justify="center">
          <Col span={14} style={{ textAlign: 'center' }}>
            <FAQ abridged={true} />
          </Col>
        </Row>
        <Row
          justify="center"
          style={{ marginTop: '10px', marginBottom: '4rem' }}
        >
          <a style={{ fontSize: '1.2em' }} href="/faq">
            <QuestionCircleOutlined />
            &nbsp;Learn more
          </a>
        </Row>
        <Row justify="center" style={{ marginTop: '10rem' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <p style={{ fontSize: '2em', fontWeight: 'bold', color: 'black' }}>
              Recommended Resources
            </p>
          </div>
        </Row>
        <Row justify="center" gutter={[24, 16]}>
          {featured.map((feat) => (
            <Col span={4}>
              <FeatureCard feature={feat} />
            </Col>
          ))}
        </Row>
        <Row
          justify="center"
          style={{ marginTop: '10px', marginBottom: '4rem' }}
        >
          <a style={{ fontSize: '1.2em' }} href="/resources?q=">
            Explore&nbsp;
            <RightCircleOutlined />
          </a>
        </Row>
        <FirstTime />
      </Content>
      <Footer />
    </Layout>
  );
}

function FirstTime() {
  let [hasVisited, setVisited] = useState(
    localStorage.getItem('raiportal:visited')
  );
  let setLSHasVisited = () => {
    localStorage.setItem('raiportal:visited', true);
    setVisited(true);
  };
  let history = useHistory();

  useEffect(() => {
    setLSHasVisited();
  });

  const message = (
    <p style={{ fontWeight: 'bold', marginBottom: '0' }}>First Time?</p>
  );
  const description = (
    <>
      <p style={{ marginBottom: '10px' }}>
        Learn more by the Responsible AI Portal
      </p>
      <Button
        type="primary"
        size="small"
        onClick={() => {
          setLSHasVisited();
          history.push('/faq');
        }}
      >
        Explore
      </Button>
    </>
  );

  const openNotification = () => {
    setVisited(true);
    notification.info({
      key: 'first',
      message,
      placement: 'bottomRight',
      duration: 0,
      description,
      hoverable: true,
    });
  };

  return <>{!hasVisited && openNotification()}</>;
}

function FeatureCard({ feature }) {
  return (
    <Card
      onClick={() =>
        window.open(
          '/resources/' + feature._id,
          '_blank',
          'noopener noreferrer'
        )
      }
      hoverable
      style={{
        height: '100%',
        margin: 'auto',
        borderWidth: '5px',
        borderRadius: '10px',
      }}
      cover={
        <img
          alt="alt"
          src={feature.logoURL}
          style={{ height: '50%', objectFit: 'cover' }}
        />
      }
    >
      <Card.Meta title={feature.name} description={feature.desc} />
    </Card>
  );
}

export default Landing;
