import React, { useState, useEffect, useRef } from 'react';
import {
  Layout,
  Content,
  Row,
  Col,
  Card,
  Breadcrumb,
  Statistic,
  Tooltip,
} from '../ant';

import {
  QuestionCircleTwoTone,
  AreaChartOutlined,
  FileProtectOutlined,
} from '@ant-design/icons';
import Footer from '../components/Footer';
import LoginButton from '../components/LoginButton';
import Sidebar from '../components/Sidebar';
import ResourceTable from '../components/ResourceTable';
import API from '../api';

const resourcesData = [
  {
    key: '1',
    name: 'IBM AI Fairness 360',
    desc:
      ' Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
    uploadDate: '2015-03-25',
    topics: ['Banking'],
    path: ['Designer'],
    type: ['Research'],
    link: 'https://aif360.mybluemix.net/',
    keywords: ['NLP', 'CV'],
  },
  {
    key: '2',
    name: 'IBM AI Fairness 360',
    desc:
      ' Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
    uploadDate: '2015-03-25',
    topics: ['Finance'],
    path: ['Developer'],
    type: ['Podcast'],
    link: 'https://aif360.mybluemix.net/',
    keywords: ['Data Analytics', 'IPA'],
  },
  {
    key: '3',
    name: 'IBM AI Fairness 360',
    desc:
      ' Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
    uploadDate: '2015-03-25',
    topics: ['Banking', 'Other'],
    path: ['Designer'],
    type: ['Research'],
    link: 'https://aif360.mybluemix.net/',
    keywords: ['NLP'],
  },
];

function Dashboard({ users }) {
  return (
    <Card id="overview" style={{ marginBottom: '20px' }}>
      <h1 style={{ fontSize: '2em', fontWeight: 'bold' }}>
        Moderator Overview &nbsp;
        <Tooltip
          title={
            <p style={{ textAlign: 'center', marginBottom: '0' }}>
              Overview of resources pending approval from administrator or
              moderators
            </p>
          }
          placement="right"
        >
          <QuestionCircleTwoTone style={{ fontSize: '0.8em' }} />{' '}
        </Tooltip>
      </h1>
      <Row gutter={16}>
        <Col span={4}>
          <Statistic title="Pending Resources" value={resourcesData.length} />
        </Col>
        <Col span={4}>
          <Statistic title="Accounts" value={users.length} />
        </Col>
      </Row>
    </Card>
  );
}

function Mod() {
  let [users, setUsers] = useState([]);
  useEffect(() => {
    API.get('/api/users/').then(setUsers);
  }, []);
  let dashRef = useRef(null),
    resourceRef = useRef(null);
  return (
    <Layout style={{ backgroundColor: '#fff' }}>
      <Row justify="start" align="middle">
        <Col span={3}>
          <a href="/" style={{ margin: '15px' }}>
            <img alt="logo" src="/logo.png" width={'160px'} />
          </a>
        </Col>
        <Col span={17}>
          <Breadcrumb style={{ marginLeft: '20px' }}>
            <Breadcrumb.Item>
              <a href="/">Home</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="/">User Name</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Moderator</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col span={4}>
          <LoginButton />
        </Col>
      </Row>
      <Layout>
        <Sidebar
          headings={['Overview', 'Pending Resources']}
          icons={[<AreaChartOutlined />, <FileProtectOutlined />]}
          refs={[dashRef, resourceRef]}
        />
        <Content
          style={{
            padding: '24px 24px 24px',
            marginTop: '10px',
          }}
          offsetTop={100}
        >
          {users && (
            <div ref={dashRef}>
              <Dashboard users={users} />
            </div>
          )}
          <div ref={resourceRef}>
            <ResourceTable resources={resourcesData} admin={true} edit={true} />
          </div>
        </Content>
      </Layout>
      <Footer />
    </Layout>
  );
}

export default Mod;
