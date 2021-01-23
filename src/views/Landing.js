import React, { useState, useEffect } from 'react';
import {
  Layout,
  Content,
  Search,
  Row,
  Col,
  Card,
  Tooltip,
  Space,
  Tag,
  Modal,
  Button,
} from '../ant';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import LoginButton from '../components/LoginButton';
import { notification } from 'antd';
import { DatabaseTwoTone, QuestionCircleOutlined } from '@ant-design/icons';

let TEMP_FRONTEND_ITEMS = [
  {
    name: 'AI Design Assistant',
    logoURL: '/demo/aiglobal.png',
    description:
      'A unified assessment to assure the responsible design, development and deployment of AI',
  },
  {
    name: 'Fawkes',
    logoURL: '/demo/fawkes-logo.png',
    description:
      'A software that gives individuals the ability to limit how their own images can be used to track them',
  },
  {
    name: 'Data Nutrition Project',
    logoURL: '/demo/nutrition-logo.png',
    description: 'A nutrition label for datasets',
  },
];

let TEMP_TAGS = [
  {
    name: 'banking',
    color: '#42D3D4',
    type: 'topic',
  },
  {
    name: 'health',
    color: '#42D3D4',
    type: 'topic',
  },
  {
    name: 'education',
    color: '#42D3D4',
    type: 'topic',
  },
  {
    name: 'explorer',
    color: '#097AE8',
    type: 'path',
  },
  {
    name: 'developer',
    color: '#097AE8',
    type: 'path',
  },
  {
    name: 'designer',
    color: '#097AE8',
    type: 'path',
  },
  {
    name: 'algorithm',
    color: '#00CDFF',
    type: 'type',
  },
  {
    name: 'library',
    color: '#00CDFF',
    type: 'type',
  },
  {
    name: 'toolkit',
    color: '#00CDFF',
    type: 'type',
  },
];

function Landing() {
  let history = useHistory();
  let [query, setQuery] = React.useState('');
  return (
    <Layout style={{ backgroundColor: '#fff' }}>
      <a href="/" style={{ position: 'fixed' }}>
        <img alt="logo" src="/logo.png" width={'160px'} />
      </a>
      <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
        <LoginButton />
      </div>
      <Content style={{ padding: '0 50px' }}>
        <Row justify="center" style={{ marginTop: '4rem' }}>
          <Col span={12} style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '2rem' }}>
              Responsible AI Community Portal
            </h1>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <Tooltip
                placement="bottom"
                title="Search for relevant resources here"
              >
                <Search
                  placeholder="Responsible AI Design Assistant"
                  enterButton
                  size="large"
                  onChange={(e) => setQuery(e.target.value)}
                  onSearch={() => {
                    window.gtag('event', 'search_bar_query', {
                      event_label: query,
                      event_category: 'search',
                    });
                    history.push('/resources?q=' + query);
                  }}
                  style={{ marginBottom: '5px' }}
                />
              </Tooltip>
              <a style={{ fontSize: '1.2em' }} href="/faq">
                <QuestionCircleOutlined /> Learn More About the Portal
              </a>
            </div>
          </Col>
        </Row>
        <Row justify="center" style={{ marginTop: '20px' }}>
          <Col>
            <Space style={{ width: '100%' }}>
              <div
                style={{
                  borderRight: '1px solid #cdcdcd',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <p style={{ marginBottom: '5px', fontWeight: 'bold' }}>
                  Filter by Topics
                </p>
                <Space>
                  {TEMP_TAGS.slice(0, 3).map((tag) => (
                    <Tag
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '0.9em',
                        padding: '5px',
                      }}
                      color={tag.color}
                      key={tag.name}
                    >
                      <a
                        href="/"
                        onClick={(e) => {
                          e.preventDefault();
                          history.push('/resources?q=' + tag.name);
                        }}
                      >
                        {tag.name.toUpperCase()}
                      </a>
                    </Tag>
                  ))}
                </Space>
              </div>
              <div
                style={{
                  borderRight: '1px solid #cdcdcd',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <p style={{ marginBottom: '5px', fontWeight: 'bold' }}>
                  Filter by Path
                </p>
                <Space>
                  {TEMP_TAGS.slice(3, 6).map((tag) => (
                    <Tag
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '0.9em',
                        padding: '5px',
                      }}
                      color={tag.color}
                      key={tag.name}
                    >
                      <a
                        href="/"
                        onClick={(e) => {
                          e.preventDefault();
                          history.push('/resources?q=' + tag.name);
                        }}
                      >
                        {tag.name.toUpperCase()}
                      </a>
                    </Tag>
                  ))}
                </Space>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <p style={{ marginBottom: '5px', fontWeight: 'bold' }}>
                  Filter by Type
                </p>
                <Space>
                  {TEMP_TAGS.slice(6, TEMP_TAGS.length).map((tag) => (
                    <Tag
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '0.9em',
                        padding: '5px',
                      }}
                      color={tag.color}
                      key={tag.name}
                    >
                      <a
                        href="/"
                        onClick={(e) => {
                          e.preventDefault();
                          history.push('/resources?q=' + tag.name);
                        }}
                      >
                        {tag.name.toUpperCase()}
                      </a>
                    </Tag>
                  ))}
                </Space>
              </div>
            </Space>
          </Col>
        </Row>
        <Row justify="center" style={{ marginTop: '4rem' }} gutter={[24, 16]}>
          {TEMP_FRONTEND_ITEMS.map((feat) => (
            <Col span={4}>
              <FeatureCard feature={feat} />
            </Col>
          ))}
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

  useEffect(() => {
    setLSHasVisited();
  });

  const [isModalVisible, setModalVisible] = useState(false);
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
          setModalVisible(true);
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

  return (
    <>
      {!hasVisited && openNotification()}
      <Modal
        title={
          <p style={{ marginBottom: '0', fontSize: '1.2em' }}>
            <DatabaseTwoTone /> Welcome to the Portal!
          </p>
        }
        visible={isModalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[<Button onClick={() => setModalVisible(false)}>Close</Button>]}
        centered
        width={700}
      >
        <p style={{ fontWeight: 'bold', marginBottom: '2px' }}>
          What is the Responsible AI Community Portal?
        </p>
        <p style={{ marginBottom: '15px' }}>
          The Responsible AI Community Portal is a curated repository of
          reports, standards, models, government policies, datasets, and
          open-source software designed to support Responsible AI development.
          If you'd like to learn more, watch the demo below or{' '}
          <a href="/faq">click here for our FAQ</a>.
        </p>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <p style={{ fontWeight: 'bold' }}>Video Demonstration</p>
          <iframe
            title="ex"
            width="560"
            height="315"
            src="https://www.youtube.com/embed/eaEMSKzqGAg"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </Modal>
    </>
  );
}

function FeatureCard({ feature }) {
  return (
    <Card
      onClick={() =>
        window.open('https://google.com', '_blank', 'noopener noreferrer')
      }
      hoverable
      style={{
        height: '100%',
        margin: 'auto',
      }}
      cover={
        <img
          alt="alt"
          src={feature.logoURL}
          style={{ height: '100%', width: '100%', objectFit: 'cover' }}
        />
      }
    >
      <Card.Meta title={feature.name} description={feature.description} />
    </Card>
  );
}

export default Landing;
