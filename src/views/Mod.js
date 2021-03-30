import React, { useState, useEffect, useRef } from 'react';
import { Layout, Content, Row, Col, Card, Statistic, Tooltip } from '../ant';

import {
  QuestionCircleTwoTone,
  AreaChartOutlined,
  FileProtectOutlined,
} from '@ant-design/icons';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import Sidebar from '../components/Sidebar';
import ResourceTable from '../components/ResourceTable';
import { useAppEnv } from './../env';
import { useHistory } from 'react-router';

function Dashboard({ users, pendingResources }) {
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

function Mod() {
  let { api, user } = useAppEnv();
  let [users, setUsers] = useState([]);
  let [pendingResources, setPendingResources] = useState([]);
  let history = useHistory();

  useEffect(() => {
    if (user === null || (user && user.role !== 'mod')) {
      history.push('/');
    }
  }, [user, history]);
  useEffect(() => {
    api.get('/api/users').then(setUsers);
    api.get('/api/resources/all/pendingReview').then(setPendingResources);
  }, [api]);
  let dashRef = useRef(null);
  let resourceRef = useRef(null);

  return (
    <Layout style={{ backgroundColor: '#fff' }}>
      <NavBar />
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
              <Dashboard pendingResources={pendingResources} users={users} />
            </div>
          )}
          <div ref={resourceRef}>
            <ResourceTable
              resources={pendingResources}
              admin={true}
              edit={true}
            />
          </div>
        </Content>
      </Layout>
      <Footer />
    </Layout>
  );
}

export default Mod;
