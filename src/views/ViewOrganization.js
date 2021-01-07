import React, { useRef, useState, useEffect } from 'react';
import {
  Layout,
  Content,
  Descriptions,
  Button,
  PageHeader,
  Collapse,
  Spin,
} from '../ant';
import {
  FileDoneOutlined,
  SearchOutlined,
  EditOutlined,
  FolderOpenOutlined,
} from '@ant-design/icons';
import FormHeader from '../components/FormHeader';
import ResourceTable from '../components/ResourceTable';
import Sidebar from '../components/Sidebar';
import { useParams } from 'react-router-dom';
import { useAppEnv } from './../env';

const { Panel } = Collapse;

export default function ViewOrganization() {
  let { api } = useAppEnv();
  let { orgId } = useParams();
  let [org, setOrg] = useState(null);
  let [orgRes, setOrgRes] = useState([]);
  let [loading, setLoading] = useState(true);
  let topRef = useRef(null);
  let fileRef = useRef(null);
  let detailRef = useRef(null);
<<<<<<< HEAD
  let children = [];
  for (let i = 0; i < props.type.length; i++) {
    children.push(<Tag color="blue"> {props.type[i]}</Tag>);
  }

  return (
    <Layout style={{ height: `${window.innerHeight}px`, overflow: 'hidden' }}>
      <FormHeader />
      <Layout>
        <Sidebar
          headings={['Overview', 'Details', 'Uploaded Resources']}
          icons={[
            <FileDoneOutlined />,
            <SearchOutlined />,
            <FolderOpenOutlined />,
          ]}
          refs={[topRef, detailRef, fileRef]}
        />
        <Content
          style={{
            padding: '24px 24px 24px',
          }}
        >
          <div ref={topRef}>
            <PageHeader
              title={props.name}
              onBack={() => window.history.back()}
              className="site-page-header"
              subTitle={props.shortName}
              tags={children}
              avatar={{ src: props.logoURL }}
              extra={[
                <Button icon={<EditOutlined />} key="3" shape="round">
                  Edit Organization
                </Button>,
              ]}
            ></PageHeader>
          </div>
          <div ref={detailRef}>
            <h1
              style={{ padding: '10px', fontSize: '2em', fontWeight: 'bold' }}
            >
              Details
            </h1>
            <Collapse defaultActiveKey={['1']}>
              <Panel
                header="Primary Details"
                key="1"
                showArrow={false}
                disabled={true}
=======
  useEffect(() => {
    api.get('/api/organizations/' + orgId).then((org) => {
      setOrg(org);
      setLoading(false);
    });
    api.get('/api/organizations/' + orgId + '/resources').then((resources) => {
      setOrgRes(resources);
    });
  }, [api, orgId]);
  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Spin size="large"></Spin>
      </div>
    );
  } else {
    return (
      <Layout style={{ height: `${window.innerHeight}px`, overflow: 'hidden' }}>
        <FormHeader />
        <Layout>
          <Sidebar
            headings={['Overview', 'Details', 'Uploaded Resources']}
            icons={[
              <FileDoneOutlined />,
              <SearchOutlined />,
              <FolderOpenOutlined />,
            ]}
            refs={[topRef, detailRef, fileRef]}
          />
          <Content
            style={{
              padding: '24px 24px 24px',
            }}
          >
            <div ref={topRef}>
              <PageHeader
                title={org.name}
                onBack={() => window.history.back()}
                className="site-page-header"
                subTitle={org.shortName}
                tags={[]}
                avatar={{ src: org.logoURL }}
                extra={[
                  <Button icon={<EditOutlined />} key="3" shape="round">
                    Edit Organization
                  </Button>,
                ]}
              ></PageHeader>
            </div>
            <div ref={detailRef}>
              <h1
                style={{ padding: '10px', fontSize: '2em', fontWeight: 'bold' }}
>>>>>>> 46510e1a1926db91446477aa930e6669ca7df890
              >
                Details
              </h1>
              <Collapse defaultActiveKey={['1']}>
                <Panel
                  header="Primary Details"
                  key="1"
                  showArrow={false}
                  disabled={true}
                >
                  <Descriptions column={1}>
                    <Descriptions.Item label="Organization Name">
                      {org.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Other Names">
                      {org.shortName}
                    </Descriptions.Item>
                    <Descriptions.Item label="Website Link">
                      {org.websiteURL}
                    </Descriptions.Item>
                    <Descriptions.Item label="Organization Type">
                      {org.type}
                    </Descriptions.Item>
                    <Descriptions.Item label="Country">
                      {org.country}
                    </Descriptions.Item>
                    <Descriptions.Item label="City">
                      {org.city}
                    </Descriptions.Item>
                  </Descriptions>
                </Panel>
              </Collapse>
            </div>
            <div ref={fileRef}>
              <ResourceTable resources={orgRes} admin={false} edit={false} />
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
