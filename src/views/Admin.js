import React, { useState, useEffect, useRef } from 'react';
import {
  Layout,
  Content,
  Search,
  Row,
  Col,
  Card,
  Tag,
  Table,
  Statistic,
  Tooltip,
  Button,
  Breadcrumb,
  Menu,
} from '../ant';
import {
  QuestionCircleTwoTone,
  AreaChartOutlined,
  TeamOutlined,
  FileProtectOutlined,
} from '@ant-design/icons';
import Footer from '../components/Footer';
import LoginButton from '../components/LoginButton';
import Sidebar from '../components/Sidebar';
import ResourceTable from '../components/ResourceTable';
import { useAppEnv } from './../env';
import { useHistory } from 'react-router';
import ManageUserModal from './../components/ManageUserModal';

function Dashboard({ users, pendingResources }) {
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
          <Statistic
            title="Pending Resources"
            value={pendingResources.length}
          />
        </Col>
        <Col span={4}>
          <Statistic title="Accounts" value={users.length} />
        </Col>
      </Row>
    </Card>
  );
}

function ManageUsersTable({ users }) {
  let [manageUser, setManageUser] = useState(null);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
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
      title: 'Manage',
      key: 'action',
      render: (text, user) => (
        <Button onClick={() => setManageUser(user)}>Edit</Button>
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
        onChange={console.log}
        pagination={{ pageSize: 10 }}
        scroll={{ y: 240 }}
      />
      <ManageUserModal
        user={manageUser}
        modalVisible={manageUser != null}
        setModalVisible={() => setManageUser(null)}
      />
    </Card>
  );
}

function Admin() {
  let { api, user } = useAppEnv();
  let [users, setUsers] = useState([]);
  let [pendingResources, setPendingResources] = useState([]);
  let history = useHistory();
  useEffect(() => {
    if (user === null || (user && user.role !== 'admin')) {
      history.push('/');
    }
  }, [user, history]);

  useEffect(() => {
    api.get('/api/users').then(setUsers);
    api.get('/api/resources?pending=true').then(setPendingResources);
  }, [api]);

  let dashRef = useRef(null),
    resourceRef = useRef(null),
    userRef = useRef(null);

  const breadcrumb_menu = (
    <Menu>
      <Menu.Item>
        <a href="/resources">Resources</a>
      </Menu.Item>
      <Menu.Item>
        <a href="/organizations">Organizations</a>
      </Menu.Item>
      <Menu.Item>
        <a href="/feedback">Suggestions</a>
      </Menu.Item>
      <Menu.Item></Menu.Item>
    </Menu>
  );
  return (
    <Layout style={{ backgroundColor: '#fff' }}>
      <Row justify="start" align="middle">
        <Col span={3}>
          <a href="/" style={{ margin: '15px' }}>
            <img alt="logo" src="/logo.png" width={'160px'} />
          </a>
        </Col>
        <Col span={5}>
          <Breadcrumb
            style={{
              paddingTop: '40px',
              paddingLeft: '80px',
            }}
          >
            <Breadcrumb.Item>
              <a href="/" style={{ fontSize: '16px' }}>
                Home
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item
              style={{ fontSize: '16px' }}
              overlay={breadcrumb_menu}
            >
              Account
            </Breadcrumb.Item>
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col span={12}></Col>
        <Col span={4}>
          <LoginButton />
        </Col>
      </Row>
      <Layout>
        <Sidebar
          headings={['Overview', 'Pending Resources', 'Manage Users']}
          icons={[
            <AreaChartOutlined />,
            <FileProtectOutlined />,
            <TeamOutlined />,
          ]}
          refs={[dashRef, resourceRef, userRef]}
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
              <Dashboard users={users} pendingResources={pendingResources} />
            </div>
          )}
          <div ref={resourceRef}>
            <ResourceTable
              resources={pendingResources}
              admin={true}
              edit={true}
            />
          </div>
          <div ref={userRef}>{users && <ManageUsersTable users={users} />}</div>
        </Content>
      </Layout>
      <Footer />
    </Layout>
  );
}

export default Admin;
