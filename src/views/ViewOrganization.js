import React, { useRef } from 'react';
import {
  Layout,
  Content,
  Descriptions,
  Button,
  PageHeader,
  Collapse,
  Tag,
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

const { Panel } = Collapse;
const props = {
  name: 'Montreal AI Ethics Institute',
  shortName: 'MAEI',
  country: 'Canada',
  city: 'Montreal',
  logoURL:
    'https://cdn.substack.com/image/fetch/w_170,c_limit,f_auto,q_auto:best,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F3fcac70c-a37c-4152-a109-f702c6375c31_256x256.png',
  websiteURL: 'https://montrealethics.ai/',
  users: ['Alice', 'Bob', 'Charlie'],
  type: ['Civil Society'],
  resources: [
    {
      key: '1',
      name: 'Living Dictionary',
      uploadDate: 'n/a',
      topics: ['Other topic'],
      path: ['Curious Path'],
      type: ['Education Tool'],
      link: 'https://montrealethics.ai/dictionary/',
      keywords: [],
    },
    {
      key: '2',
      name: 'Response to COVI Contact Tracing App',
      desc:
        "A white paper on COVI, a contact tracing app, on the extent which diversity is considered on the app, assumptions surrounding users', and unanswered questions surrounding transparency, accountability, and security",
      uploadDate: 'n/a',
      topics: ['Health'],
      path: ['Explorer Path'],
      type: ['Research'],
      link:
        'https://montrealethics.ai/wp-content/uploads/2020/06/MAIEI-Official-COVI-Response.docx.pdf',
      keywords: [],
    },
  ],
  desc: 'Do we want a description?',
};

export default function ViewOrganization() {
  let topRef = useRef(null);
  let fileRef = useRef(null);
  let detailRef = useRef(null);
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
              >
                <Descriptions column={1}>
                  <Descriptions.Item label="Organization Name">
                    {props.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Other Names">
                    {props.shortName}
                  </Descriptions.Item>
                  <Descriptions.Item label="Website Link">
                    {props.websiteURL}
                  </Descriptions.Item>
                  <Descriptions.Item label="Organization Type">
                    {props.type.join(', ')}
                  </Descriptions.Item>
                  <Descriptions.Item label="Country">
                    {props.country}
                  </Descriptions.Item>
                  <Descriptions.Item label="City">
                    {props.city}
                  </Descriptions.Item>
                </Descriptions>
              </Panel>
            </Collapse>
          </div>
          <div ref={fileRef}>
            <ResourceTable
              resources={props.resources}
              admin={false}
              edit={false}
            />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
