import React, { useState, useEffect, useRef } from 'react';
import {
  Layout,
  Content,
  Row,
  Col,
  Card,
  Tag,
  Table,
  Statistic,
  Tooltip,
  Button,
} from '../ant';
import {
  QuestionCircleTwoTone,
  AreaChartOutlined,
  TeamOutlined,
  FileProtectOutlined,
  OrderedListOutlined,
} from '@ant-design/icons';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import FormHeader from '../components/FormHeader';
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
        mode="admin"
      />
    </Card>
  );
}

function ManageTopicsTable({ topics }) {
  let { api, refresh } = useAppEnv();
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'Name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Description',
      dataIndex: 'desc',
      key: 'desc',
      sorter: (a, b) => a.desc.localeCompare(b.desc),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Manage',
      key: 'action',
      render: (text, topic) => (
        <Button
          onClick={() => {
            api.del(`/api/topics/${topic._id}`).then(() => refresh());
          }}
        >
          Remove
        </Button>
      ),
    },
  ];
  return (
    <Card id="users">
      <h1 style={{ fontSize: '2em', fontWeight: 'bold' }}>
        Manage Topics &nbsp;
        <Tooltip
          title={
            <p style={{ textAlign: 'center', marginBottom: '0' }}>
              List of active topics that can be removed
            </p>
          }
          placement="right"
        >
          <QuestionCircleTwoTone style={{ fontSize: '0.8em' }} />{' '}
        </Tooltip>
      </h1>
      <Table
        columns={columns}
        dataSource={topics}
        onChange={console.log}
        pagination={{ pageSize: 10 }}
        scroll={{ y: 240 }}
      />
      <Button href="/topics/create">Add a new Topic</Button>
    </Card>
  );
}

function Admin() {
  let { api, user } = useAppEnv();
  let [users, setUsers] = useState([]);
  let [pendingResources, setPendingResources] = useState([]);
  let [topics, setTopics] = useState([]);
  let history = useHistory();
  useEffect(() => {
    if (user === null || (user && user.role !== 'admin')) {
      history.push('/');
    }
  }, [user, history]);

  useEffect(() => {
    api.get('/api/users').then(setUsers);
    api.get('/api/topics').then(setTopics);
    api.get('/api/resources/all/pendingReview').then(setPendingResources);
  }, [api]);

  let dashRef = useRef(null),
    resourceRef = useRef(null),
    userRef = useRef(null),
    topicRef = useRef(null);

  return (
    <Layout style={{ backgroundColor: '#fff' }}>
      <FormHeader />
      <Layout>
        <Sidebar
          headings={[
            'Overview',
            'Pending Resources',
            'Manage Users',
            'Manage Topics',
          ]}
          icons={[
            <AreaChartOutlined />,
            <FileProtectOutlined />,
            <TeamOutlined />,
            <OrderedListOutlined />,
          ]}
          refs={[dashRef, resourceRef, userRef, topicRef]}
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
          <div ref={topicRef}>
            <ManageTopicsTable topics={topics} />
          </div>
        </Content>
      </Layout>
      <Footer />
    </Layout>
  );
}

export default Admin;
