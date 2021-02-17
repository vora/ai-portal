import React, { useRef, useEffect, useState } from 'react';
import {
  Layout,
  Content,
  Descriptions,
  Button,
  PageHeader,
  Collapse,
  Table,
  Tag,
  Spin,
} from '../ant';
import {
  FileDoneOutlined,
  SearchOutlined,
  EditOutlined,
  FolderOpenOutlined,
} from '@ant-design/icons';
import FormHeader from '../components/FormHeader';
import Sidebar from '../components/Sidebar';
import { useParams } from 'react-router-dom';
import { useAppEnv } from './../env';
import ManageResourceModal from './../components/ManageResourceModal';

const { Panel } = Collapse;

function FileTable(props) {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Link',
      dataIndex: 'url',
      key: 'link',
      render: (text) => <a href={text}>{text}</a>,
    },
  ];
  return (
    <div>
      <h1 style={{ padding: '10px', fontSize: '2em', fontWeight: 'bold' }}>
        Files
      </h1>
      <Table columns={columns} dataSource={props.data} />
    </div>
  );
}

export default function ViewResource() {
  let [resource, setResource] = useState(null);
  let [loading, setLoading] = useState(true);
  let [showModal, setShowModal] = useState(false);
  let { api, user } = useAppEnv();
  let { resId } = useParams();
  useEffect(() => {
    let fetchResource = async () => {
      let resource = await api.get('/api/resources/' + resId);
      setResource(resource);
      setLoading(false);
      window.gtag('event', 'resource_page_view_v2', {
        event_label: resource._name,
        event_category: 'view_resource',
      });
    };
    fetchResource();
  }, [api, resId, resource]);
  let topRef = useRef(null);
  let fileRef = useRef(null);
  let detailRef = useRef(null);
  let canEdit =
    resource?.user?._id === user?._id || ['mod', 'admin'].includes(user?.role);
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
        <ManageResourceModal
          resource={resource}
          modalVisible={showModal}
          setModalVisible={(v) => setShowModal(v)}
        />
        <FormHeader />
        <Layout>
          <Sidebar
            headings={['Overview', 'Details', 'Files']}
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
                title={resource.name}
                onBack={() => window.history.back()}
                className="site-page-header"
                subTitle={resource.organizations.map((o) => o.name).join(', ')}
                tags={resource.topics.map((t) => {
                  return (
                    <Tag
                      color={'#00CDFF'}
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                        marginBottom: '2px',
                      }}
                    >
                      {' '}
                      {t.name}
                    </Tag>
                  );
                })}
                extra={
                  canEdit
                    ? [
                        <Button
                          icon={<EditOutlined />}
                          key="3"
                          shape="round"
                          onClick={() => setShowModal(true)}
                        >
                          Edit Resource
                        </Button>,
                      ]
                    : []
                }
              >
                {resource.desc}
              </PageHeader>
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
                    <Descriptions.Item label="Download URL">
                      <a href={resource.downloadURL}>{resource.downloadURL} </a>
                    </Descriptions.Item>
                    <Descriptions.Item label="Organizations">
                      {resource.organizations.map((org, index) => {
                        let orgText =
                          index < resource.organizations.length - 1
                            ? org.name + ', '
                            : org.name;
                        return <a href={org.websiteURL}>{orgText}</a>;
                      })}
                    </Descriptions.Item>
                    {resource.creator !== '' && (
                      <Descriptions.Item label="Creator">
                        {resource.creator}
                      </Descriptions.Item>
                    )}
                    <Descriptions.Item label="Resource Type/Format">
                      {resource.type.join(', ')}
                    </Descriptions.Item>
                    <Descriptions.Item label="Role(s)">
                      {resource.path.join(', ')}
                    </Descriptions.Item>
                    <Descriptions.Item label="Responsible AI Trust Index Categories">
                      {resource.trustIndexCategories.join(', ')}
                    </Descriptions.Item>
                    <Descriptions.Item label="AI Systems Type">
                      <text>Not available yet</text>
                    </Descriptions.Item>
                    {resource.keywords?.length > 0 && (
                      <Descriptions.Item label="Keywords">
                        {resource.keywords.join(', ')}
                      </Descriptions.Item>
                    )}
                    {resource.creationDate && (
                      <Descriptions.Item label="Creation Date">
                        {resource.creationDate}
                      </Descriptions.Item>
                    )}
                    {resource.modifiedDate && (
                      <Descriptions.Item label="Modified Date">
                        {resource.modifiedDate}
                      </Descriptions.Item>
                    )}
                    <Descriptions.Item label="Upload Date">
                      {resource.uploadDate}
                    </Descriptions.Item>
                    <Descriptions.Item label="Funded By">
                      {resource.fundedBy}
                    </Descriptions.Item>
                  </Descriptions>
                </Panel>

                {resource.type.includes('Dataset') && (
                  <Panel header="Dataset Details" key="2">
                    <Descriptions column={1}>
                      {resource.dataDictLink && (
                        <Descriptions.Item label="Data Dictionary">
                          {resource.dataDictLink}
                        </Descriptions.Item>
                      )}
                      {resource.noiseDescription && (
                        <Descriptions.Item label="Noise Description">
                          {resource.noiseDescription}
                        </Descriptions.Item>
                      )}
                      {resource.missingInfo && (
                        <Descriptions.Item label="Missing Info">
                          {resource.missingInfo}
                        </Descriptions.Item>
                      )}
                      {resource.isConfidential && (
                        <Descriptions.Item label="Is a confidential dateset">
                          {resource.isConfidential}
                        </Descriptions.Item>
                      )}
                      {resource.offensiveContent && (
                        <Descriptions.Item label="Contain offensive content">
                          {resource.offensiveContent}
                        </Descriptions.Item>
                      )}
                      {resource.personalInfoRemoved && (
                        <Descriptions.Item label="Personal Info was removed">
                          {resource.personalInfoRemoved}
                        </Descriptions.Item>
                      )}
                      {resource.privacyProcedure && (
                        <Descriptions.Item label="Privacy Procedure">
                          {resource.privacyProcedure}
                        </Descriptions.Item>
                      )}
                    </Descriptions>
                  </Panel>
                )}
              </Collapse>
            </div>
            {resource.files.length !== 0 && (
              <div ref={fileRef}>
                <FileTable data={resource.files}></FileTable>
              </div>
            )}
          </Content>
        </Layout>
      </Layout>
    );
  }
}
