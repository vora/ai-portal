import React from 'react';
import {
  Layout,
  Content,
  Search,
  Row,
  Col,
  Card,
  Breadcrumb,
  Menu,
  Affix,
  Sider,
  Space,
  Tag,
  Table,
  Statistic,
} from '../ant';

import {
  AreaChartOutlined,
  TeamOutlined,
  FileProtectOutlined,
} from '@ant-design/icons';
import Footer from '../components/Footer';
import LoginButton from '../components/LoginButton';

// convert string to color
var stringToColor = (str) => {
  var hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var color = '#';
  for (let i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xff;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
};

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
      let color = stringToColor(topic);
      return (
        <Tag
          style={{
            color: 'black',
            fontWeight: 'bold',
          }}
          color={color}
          key={topic}
        >
          {topic.toUpperCase()}
        </Tag>
      );
    },
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (tags) => (
      <>
        {tags.map((tag) => {
          let color = stringToColor(tag);
          return (
            <Tag
              style={{
                color: 'black',
                fontWeight: 'bold',
              }}
              color={color}
              key={tag}
            >
              {tag.toUpperCase()}
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
        <a href="/">Accept</a>
        <a href="/">Reject</a>
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
    topic: 'Finance',
    link: 'https://aif360.mybluemix.net/',
    tags: ['framework', 'toolkit'],
  },
  {
    key: '2',
    resourceName: 'IBM',
    description:
      ' Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
    date: '2015-03-25',
    topic: 'Banking',
    link: 'https://aif360.mybluemix.net/',
    tags: ['framework', 'toolkit'],
  },
  {
    key: '3',
    resourceName: 'IBM AI Fairness 360',
    description:
      ' Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
    date: '2015-03-28',
    topic: 'Retail',
    link: 'https://aif360.mybluemix.net/',
    tags: ['framework', 'toolkit'],
  },
];

// resource columns
const userColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    // -> will now order alphabetically
    sorter: (a, b) => a.name.localeCompare(b.name),
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Date Joined',
    dataIndex: 'date',
    sorter: (a, b) => {
      let aDate = new Date(a.date);
      let bDate = new Date(b.date);
      return aDate.getTime() - bDate.getTime();
    },
  },
  {
    title: 'User Type',
    key: 'type',
    dataIndex: 'type',
    sorter: (a, b) => a.type.localeCompare(b.type),
    sortDirections: ['descend', 'ascend'],
    render: (type) => {
      let color = stringToColor(type);
      return (
        <Tag
          style={{ color: 'white', fontWeight: 'bold' }}
          color={color}
          key={type}
        >
          {type.toUpperCase()}
        </Tag>
      );
    },
  },
  {
    title: 'Organizations',
    key: 'organizations',
    dataIndex: 'organizations',
    render: (organizations) => (
      <>
        {organizations.map((org) => {
          let color = stringToColor(org);
          return (
            <Tag
              style={{ color: 'white', fontWeight: 'bold' }}
              color={color}
              key={org}
            >
              {org}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'No. Uploaded Resources',
    dataIndex: 'uploaded',
    key: 'uploaded',
    sorter: (a, b) => parseInt(a, 10) - parseInt(b, 10),
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a href="/">Delete</a>
      </Space>
    ),
  },
];

const userData = [
  {
    key: '1',
    name: 'John Smith',
    date: '2015-03-25',
    type: 'Industry',
    organizations: ['IBM', 'University of Texas'],
    uploaded: '15',
  },
  {
    key: '2',
    name: 'Anakin Skywalker',
    date: '2019-03-25',
    type: 'Academia',
    organizations: ['University of Alberta'],
    uploaded: '3',
  },
  {
    key: '3',
    name: 'Ben Kenobi',
    date: '2012-03-25',
    type: 'Civil Society',
    organizations: ['Galactic Republic', 'Jedi Council', 'Star Wars'],
    uploaded: '0',
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

function Dashboard() {
  return (
    <Card id="overview" style={{ marginBottom: '20px' }}>
      <h1 style={{ fontSize: '2em', fontWeight: 'bold' }}>
        Administration Overview
      </h1>
      <Row gutter={16}>
        <Col span={4}>
          <Statistic title="Active Accounts" value={userData.length} />
        </Col>
        <Col span={4}>
          <Statistic title="Pending Resources" value={resourcesData.length} />
        </Col>
      </Row>
    </Card>
  );
}

function Resources() {
  return (
    <Card id="resources" style={{ marginBottom: '20px' }}>
      <h1 style={{ fontSize: '2em', fontWeight: 'bold' }}>Pending Resources</h1>

      <p>Existing requests to add resources to Portal.</p>
      <Search
        style={{ width: '50%', marginBottom: '20px' }}
        placeholder="Resource Search"
        enterButton
        onSearch={console.log}
      />

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

function Users() {
  return (
    <Card id="users">
      <h1 style={{ fontSize: '2em', fontWeight: 'bold' }}>Manage Users</h1>

      <p>
        Edit user privileges and accounts. View individual user information by
        selecting the relevant person.
      </p>
      <Search
        style={{ width: '50%', marginBottom: '20px' }}
        placeholder="User Search"
        enterButton
        onSearch={console.log}
      />

      <Table
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        columns={userColumns}
        dataSource={userData}
        onChange={onChange}
        pagination={{ pageSize: 10 }}
        scroll={{ y: 240 }}
      />
    </Card>
  );
}

function Sidebar() {
  return (
    <Affix offsetTop={60}>
      <Sider width={250}>
        <Menu
          mode="inline"
          theme="light"
          defaultOpenKeys={['users', 'resources']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.Item
            key="dashboard"
            icon={<AreaChartOutlined />}
            style={{ marginTop: '30px' }}
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              });
            }}
          >
            Overview
          </Menu.Item>
          <Menu.Item
            key="pending"
            icon={<FileProtectOutlined />}
            onClick={() => {
              window.scrollTo({
                top: 250,
                behavior: 'smooth',
              });
            }}
          >
            Pending Resources
          </Menu.Item>
          <Menu.Item
            key="users"
            icon={<TeamOutlined />}
            onClick={() => {
              window.scrollTo({
                top: 900,
                behavior: 'smooth',
              });
            }}
          >
            Users
          </Menu.Item>
        </Menu>
      </Sider>
    </Affix>
  );
}

function Admin() {
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
        <Sidebar />
        <Content
          style={{
            padding: '24px 24px 24px',
            marginTop: '10px',
          }}
          offsetTop={100}
        >
          <Dashboard />
          <Resources />
          <Users />
        </Content>
      </Layout>
      <Footer />
    </Layout>
  );
}

export default Admin;
