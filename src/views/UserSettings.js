import React, { useEffect, useRef, useState } from 'react';
import {
  Layout,
  Content,
  Search,
  Row,
  Col,
  Card,
  Space,
  Tag,
  Table,
  Button,
  Tooltip,
  notification,
  Breadcrumb,
  Menu,
} from '../ant';

import {
  QuestionCircleTwoTone,
  ExclamationCircleTwoTone,
  AreaChartOutlined,
  TeamOutlined,
  FileProtectOutlined,
} from '@ant-design/icons';
import Footer from '../components/Footer';
import LoginButton from '../components/LoginButton';
import Sidebar from '../components/Sidebar';
import ResourceTable from '../components/ResourceTable';
import ManageUserModal from './../components/ManageUserModal';
import { useAppEnv } from './../env';
import { useHistory } from 'react-router';

function Dashboard({ user }) {
  let { api } = useAppEnv();
  let [showEditModal, setShowEditModal] = useState(null);
  let resetPassword = async () => {
    await api.post('/api/auth/reset/password');
    notification.info({ message: 'Password reset email sent.' });
  };
  return (
    <Card id="overview" style={{ marginBottom: '20px' }}>
      <ManageUserModal
        user={user}
        modalVisible={showEditModal}
        setModalVisible={(v) => setShowEditModal(v)}
      />
      <h1 style={{ fontSize: '2em', fontWeight: 'bold' }}>
        User Overview &nbsp;
        <Tooltip title="View your profile information" placement="right">
          <QuestionCircleTwoTone style={{ fontSize: '0.8em' }} />{' '}
        </Tooltip>
      </h1>
      <Row>
        <Col span={8}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <h3>
              <strong>Username: &nbsp;</strong>
              <span id="username" style={{ fontWeight: 'normal' }}>
                {user.username}
              </span>
            </h3>
            <h3>
              <strong>Name: &nbsp;</strong>
              <span id="name" style={{ fontWeight: 'normal' }}>
                {user.name}
              </span>
            </h3>
            <h3>
              <strong>Email: &nbsp;</strong>
              <span id="email" style={{ fontWeight: 'normal' }}>
                {user.email}
              </span>
            </h3>
            <hr />
            <Space>
              <Tooltip title="Edit your profile information" placement="bottom">
                <Button type="primary" onClick={() => setShowEditModal(true)}>
                  Edit Information
                </Button>
              </Tooltip>
              <Tooltip title="Change your current password" placement="bottom">
                <Button href="#" onClick={resetPassword}>
                  Change Password
                </Button>
              </Tooltip>
              {!user.emailVerified && (
                <Tooltip title="Verify your account email" placement="bottom">
                  <Button danger href="#">
                    <ExclamationCircleTwoTone twoToneColor="red" /> Verify Email
                  </Button>
                </Tooltip>
              )}
            </Space>
          </div>
        </Col>
        <Col span={10}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: '100%',
              marginLeft: '40px',
            }}
          >
            <h3>
              <strong>Role:</strong>{' '}
              <span id="role" style={{ fontWeight: 'normal' }}>
                {user.role}
              </span>
            </h3>
          </div>
        </Col>
      </Row>
    </Card>
  );
}

function Organizations({ orgs }) {
  const columns = [
    {
      title: 'Organization',
      dataIndex: 'organization',
      key: 'organization',
      sorter: (a, b) => a.organization.localeCompare(b.organization),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      sorter: (a, b) => a.type.localeCompare(b.type),
      sortDirections: ['descend', 'ascend'],
      render: (type) => {
        return (
          <Tag
            style={{ color: 'white', fontWeight: 'bold' }}
            color={'#097AE8'}
            key={type}
          >
            {type.toUpperCase()}
          </Tag>
        );
      },
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
            color={'red'}
            key={role}
          >
            {role.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Total Members',
      dataIndex: 'members',
      key: 'members',
      sorter: (a, b) => a.members.localeCompare(b.members),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => <a href="/">Leave</a>,
    },
  ];
  return (
    <Card id="users" style={{ marginBottom: '20px' }}>
      <h1 style={{ fontSize: '2em', fontWeight: 'bold' }}>
        Manage Organizations &nbsp;
        <Tooltip
          title={
            <p style={{ textAlign: 'center', marginBottom: '0' }}>
              View your existing organization memberships and leave if you
              choose
            </p>
          }
          placement="right"
        >
          <QuestionCircleTwoTone style={{ fontSize: '0.8em' }} />{' '}
        </Tooltip>
      </h1>
      <Tooltip title="Search for an organization" placement="right">
        <Search
          style={{ width: '50%', marginBottom: '20px' }}
          placeholder="The Galactic Empire"
          enterButton
          onSearch={console.log}
        />
      </Tooltip>
      <Table
        columns={columns}
        dataSource={orgs}
        onChange={console.log}
        pagination={{ pageSize: 10 }}
        scroll={{ y: 240 }}
      />
    </Card>
  );
}

function UserSettings() {
  let { api, user, userID } = useAppEnv();
  let history = useHistory();
  useEffect(() => {
    if (user === null) {
      history.push('/');
    }
  }, [user, history]);

  let dashRef = useRef(null),
    resourceRef = useRef(null),
    orgRef = useRef(null);

  let [resources, setResources] = useState([]);
  let [orgs, setOrgs] = useState([]);

  useEffect(() => {
    if (userID) {
      api
        .get('/api/users/' + userID + '/resources')
        .then((resources) => setResources(resources));
      api
        .get('/api/users/' + userID + '/organizations')
        .then((orgs) => setOrgs(orgs));
    }
  }, [api, userID]);
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
            <Breadcrumb.Item>Settings</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col span={12}></Col>
        <Col span={4}>
          <LoginButton />
        </Col>
      </Row>
      <Layout>
        <Sidebar
          headings={['User Overview', 'Uploaded Resources', 'Organizations']}
          icons={[
            <AreaChartOutlined />,
            <FileProtectOutlined />,
            <TeamOutlined />,
          ]}
          refs={[dashRef, resourceRef, orgRef]}
        />
        <Content
          style={{
            padding: '24px 24px 24px',
            marginTop: '10px',
          }}
          offsetTop={100}
        >
          {user && (
            <div ref={dashRef}>
              <Dashboard user={user} />
            </div>
          )}
          {user && (
            <div ref={resourceRef}>
              <ResourceTable edit={true} admin={false} resources={resources} />
            </div>
          )}
          {user && (
            <div ref={orgRef}>
              <Organizations organizations={orgs} />
            </div>
          )}
        </Content>
      </Layout>
      <Footer />
    </Layout>
  );
}

export default UserSettings;
