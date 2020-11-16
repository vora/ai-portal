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
import ResourceTable from '../components/ResourceTable';
import API from '../api';

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

function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}

function Dashboard({ users }) {
  return (
    <Card id="overview" style={{ marginBottom: '20px' }}>
      <h1 style={{ fontSize: '2em', fontWeight: 'bold' }}>
        Administration Overview &nbsp;
        <Tooltip
          title={
            <p style={{ textAlign: 'center', marginBottom: '0' }}>
              Overview of resources pending approval and number of active user
              accounts
            </p>
          }
          placement="right"
        >
          <QuestionCircleTwoTone style={{ fontSize: '0.8em' }} />
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

function Users({ users }) {
  console.log(users);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'User Role',
      key: 'role',
      dataIndex: 'role',
      sorter: (a, b) => a.role.localeCompare(b.role),
      sortDirections: ['descend', 'ascend'],
      render: (role) => {
        return (
          <Tag
            style={{ color: 'white', fontWeight: 'bold' }}
            color={'#097AE8'}
            key={role}
          >
            {role.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a href="/">Delete</a> | <a href="/">Change Role</a>
        </Space>
      ),
    },
  ];
  return (
    <Card id="users">
      <h1 style={{ fontSize: '2em', fontWeight: 'bold' }}>
        Manage Users &nbsp;
        <Tooltip
          title={
            <p style={{ textAlign: 'center', marginBottom: '0' }}>
              List of active users and their Portal roles that can be edited by
              you
            </p>
          }
          placement="right"
        >
          <QuestionCircleTwoTone style={{ fontSize: '0.8em' }} />{' '}
        </Tooltip>
      </h1>
      <Tooltip title="Search for a user" placement="right">
        <Search
          style={{ width: '50%', marginBottom: '20px' }}
          placeholder="Anakin Skywalker"
          enterButton
          onSearch={console.log}
        />
      </Tooltip>

      <Table
        columns={columns}
        dataSource={users}
        onChange={onChange}
        pagination={{ pageSize: 10 }}
        scroll={{ y: 240 }}
      />
    </Card>
  );
}

function Admin() {
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
            <Breadcrumb.Item>Administration</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col span={4}>
          <LoginButton />
        </Col>
      </Row>
      <Layout>
        <Sidebar
          mod={false}
          headings={['Overview', 'Pending Resources', 'Manage Users']}
        />
        <Content
          style={{
            padding: '24px 24px 24px',
            marginTop: '10px',
          }}
          offsetTop={100}
        >
          {users && <Dashboard users={users} />}
          <ResourceTable resources={resourcesData} admin={true} edit={true} />
          {users && <Users users={users} />}
        </Content>
      </Layout>
      <Footer />
    </Layout>
  );
}

export default Admin;
