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
import NavBar from '../components/NavBar';
import ResourceTable from '../components/ResourceTable';
import Sidebar from '../components/Sidebar';
import { useParams } from 'react-router-dom';
import { useAppEnv } from './../env';
import ManageOrganizationModal from './../components/ManageOrganizationModal';

const { Panel } = Collapse;

export default function ViewOrganization() {
  let { api, user } = useAppEnv();
  let { orgId } = useParams();
  let [org, setOrg] = useState(null);
  let [orgRes, setOrgRes] = useState([]);
  let [showModal, setShowModal] = useState(false);
  let [loading, setLoading] = useState(true);
  let topRef = useRef(null);
  let fileRef = useRef(null);
  let detailRef = useRef(null);
  let canEdit = ['mod', 'admin'].includes(user?.role);
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
        <ManageOrganizationModal
          organization={org}
          modalVisible={showModal}
          setModalVisible={(v) => setShowModal(v)}
        />
        <NavBar />
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
                extra={
                  canEdit
                    ? [
                        <Button
                          icon={<EditOutlined />}
                          key="3"
                          shape="round"
                          onClick={() => setShowModal(true)}
                        >
                          Edit Organization
                        </Button>,
                      ]
                    : []
                }
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
                      {org.type.join(', ')}
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
