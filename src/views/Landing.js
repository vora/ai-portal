import React from 'react';
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
} from '../ant';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import LoginButton from '../components/LoginButton';

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
            <Tooltip
              placement="bottom"
              title="Search for relevant resources here"
            >
              <Search
                placeholder="Responsible AI Design Assistant"
                enterButton
                size="large"
                onChange={(e) => setQuery(e.target.value)}
                onSearch={() => history.push('/resources?q=' + query)}
              />
            </Tooltip>
          </Col>
        </Row>
        <Row justify="center" style={{ marginTop: '20px' }}>
          <Col span={12}>
            <h3>Filters:</h3>
            <Space style={{ width: '100%' }}>
              <div>
                <p style={{ marginBottom: '5px', fontWeight: 'bold' }}>
                  Topics
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
              <div>
                <p style={{ marginBottom: '5px', fontWeight: 'bold' }}>Path</p>
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
              <div>
                <p style={{ marginBottom: '5px', fontWeight: 'bold' }}>Type</p>
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
        <Row justify="center" style={{ marginTop: '2rem' }} gutter={[24, 16]}>
          {TEMP_FRONTEND_ITEMS.map((feat) => (
            <Col span={4}>
              <FeatureCard feature={feat} />
            </Col>
          ))}
        </Row>
      </Content>
      <Footer />
    </Layout>
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
