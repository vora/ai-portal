import React, { useState, useEffect } from 'react';
import {
  Layout,
  Content,
  Search,
  Row,
  Col,
  Card,
  Breadcrumb,
  Space,
  Tag,
  Table,
  Statistic,
  Tooltip,
} from '../ant';

import { QuestionCircleTwoTone } from '@ant-design/icons';
import Footer from '../components/Footer';
import LoginButton from '../components/LoginButton';
import Sidebar from '../components/Sidebar';
import API from '../api';

// resource columns
const resourcesColumns = [
  {
    title: 'Resource Name',
    dataIndex: 'resourceName',
    key: 'resourceName',
    sorter: (a, b) => a.resourceName.localeCompare(b.resourceName),
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Description',
    dataIndex: 'description',
  },
  {
    title: 'Upload Date',
    dataIndex: 'date',
    sorter: (a, b) => {
      let aDate = new Date(a.date);
      let bDate = new Date(b.date);
      return aDate.getTime() - bDate.getTime();
    },
  },
  {
    title: 'Topic',
    key: 'topic',
    dataIndex: 'topic',
    sorter: (a, b) => a.topic.localeCompare(b.topic),
    sortDirections: ['descend', 'ascend'],
    render: (topic) => {
      return (
        <Tag
          style={{
            color: 'white',
            fontWeight: 'bold',
          }}
          color={'#42D3D4'}
          key={topic}
        >
          {topic.toUpperCase()}
        </Tag>
      );
    },
  },
  {
    title: 'Path',
    key: 'path',
    dataIndex: 'path',
    sorter: (a, b) => a.path.localeCompare(b.path),
    sortDirections: ['descend', 'ascend'],
    render: (path) => {
      return (
        <Tag
          style={{
            color: 'white',
            fontWeight: 'bold',
          }}
          color={'#097AE8'}
          key={path}
        >
          {path.toUpperCase()}
        </Tag>
      );
    },
  },
  {
    title: 'Type',
    key: 'type',
    dataIndex: 'type',
    sorter: (a, b) => a.type.localeCompare(b.type),
    sortDirections: ['descend', 'ascend'],
    render: (type) => {
      return (
        <Tag
          style={{
            color: 'white',
            fontWeight: 'bold',
          }}
          color={'#00CDFF'}
          key={type}
        >
          {type.toUpperCase()}
        </Tag>
      );
    },
  },
  {
    title: 'Keywords',
    key: 'keywords',
    dataIndex: 'keywords',
    render: (keywords) => (
      <>
        {keywords.map((keyword) => {
          return (
            <Tag
              style={{
                color: 'white',
                fontWeight: 'bold',
                marginBottom: '2px',
              }}
              color={'#009B72'}
              key={keyword}
            >
              {keyword.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Link',
    key: 'link',
    dataIndex: 'link',
    render: (
      link // create clickable link to new tab
    ) => (
      <a href={link} rel="noopener noreferrer" target="_blank">
        {link}
      </a>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a href="/">Accept</a> | <a href="/">Edit</a> | <a href="/">Reject</a>
      </Space>
    ),
  },
];

const resourcesData = [
  {
    key: '1',
    resourceName: 'IBM AI Fairness 360',
    description:
      ' Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
    date: '2015-03-25',
    topic: 'Banking',
    path: 'Designer',
    type: 'Research',
    link: 'https://aif360.mybluemix.net/',
    keywords: ['NLP', 'CV'],
  },
  {
    key: '2',
    resourceName: 'IBM AI Fairness 360',
    description:
      ' Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
    date: '2015-03-25',
    topic: 'Finance',
    path: 'Developer',
    type: 'Podcast',
    link: 'https://aif360.mybluemix.net/',
    keywords: ['Data Analytics', 'IPA'],
  },
  {
    key: '3',
    resourceName: 'IBM AI Fairness 360',
    description:
      ' Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
    date: '2015-03-25',
    topic: 'Banking',
    path: 'Designer',
    type: 'Research',
    link: 'https://aif360.mybluemix.net/',
    keywords: ['NLP'],
  },
];

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows
    );
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};

function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}

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

function Resources() {
  return (
    <Card id="resources" style={{ marginBottom: '20px' }}>
      <h1 style={{ fontSize: '2em', fontWeight: 'bold' }}>
        Pending Resources &nbsp;
        <Tooltip
          title={
            <p style={{ textAlign: 'center', marginBottom: '0' }}>
              List of submitted resources pending administrator or moderator
              approval
            </p>
          }
          placement="right"
        >
          <QuestionCircleTwoTone style={{ fontSize: '0.8em' }} />{' '}
        </Tooltip>
      </h1>
      <Tooltip title={'Search for a resource'} placement="right">
        <Search
          style={{ width: '50%', marginBottom: '20px' }}
          placeholder="Responsible AI Design Assistant"
          enterButton
          onSearch={console.log}
        />
      </Tooltip>
      <Table
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        columns={resourcesColumns}
        dataSource={resourcesData}
        onChange={onChange}
        pagination={{ pageSize: 10 }}
        scroll={{ y: 240 }}
      />
    </Card>
  );
}

function Mod() {
  let [users, setUsers] = useState([]);
  useEffect(() => {
    API.get('/api/users/').then(setUsers);
  }, []);
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
        <Sidebar mod={true} headings={['Overview', 'Pending Resources']} />
        <Content
          style={{
            padding: '24px 24px 24px',
            marginTop: '10px',
          }}
          offsetTop={100}
        >
          {users && <Dashboard users={users} />}
          <Resources />
        </Content>
      </Layout>
      <Footer />
    </Layout>
  );
}

export default Mod;
