import React, { useRef } from 'react';
import {
  Layout,
  Content,
  Descriptions,
  Button,
  Sider,
  Menu,
  Affix,
  PageHeader,
  Collapse,
  Table,
  Tag,
} from '../ant';
import {
  FileDoneOutlined,
  SearchOutlined,
  EditOutlined,
  FolderOpenOutlined,
} from '@ant-design/icons';
import FormHeader from '../components/FormHeader';

const { Panel } = Collapse;
const props = {
  name: 'Living Dictionary',
  desc:
    'An interactive dictionary of technical computer science and social science terms in plain language',
  type: ['Education Tool'],
  path: ['Explorer Path'],
  avatarIcon:
    'https://cdn.substack.com/image/fetch/w_170,c_limit,f_auto,q_auto:best,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F3fcac70c-a37c-4152-a109-f702c6375c31_256x256.png',
  aiSystemsType: [],
  uploadDate: '',
  creationDate: '',
  modifiedDate: '',
  licenseName: '',
  technical: '',
  trustIndexCategories: ['Explainability & Interpretability'],
  fundedBy: '',
  creator: '',
  dataDictLink: '',
  sensitiveData: '',
  qualityReview: '',
  ethicsReview: '',
  usage: '',
  isConfidential: '',
  offensiveContent: '',
  numInstances: '',
  instances: [],
  label: '',
  rawData: '',
  distribution: '',
  personalInfoRemoved: '',
  privacyProcedure: '',
  individualsIdentified: '',
  noiseDescription: ' ',
  externalRestrictions: '',
  files: [
    {
      name: 'Dictionary',
      link: 'https://montrealethics.ai/dictionary/',
      type: 'URL',
    },
    { name: 'Click me', link: 'www.google.com', type: 'URL' },
  ],
  topics: ['Other topic'],
  organizations: ['Montreal AI Ethics Institute'],
};

function FileTable(props) {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Link',
      dataIndex: 'link',
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

function SideBar(props) {
  return (
    <Affix offsetTop={60}>
      <Sider width={250}>
        <Menu
          mode="inline"
          theme="light"
          defaultOpenKeys={['overview']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.Item
            key="overview"
            icon={<FileDoneOutlined />}
            style={{ marginTop: '30px' }}
            onClick={() => {
              props.topRef.current.scrollIntoView();
            }}
          >
            Overview
          </Menu.Item>

          <Menu.Item
            key="details"
            icon={<SearchOutlined />}
            onClick={() => {
              props.detailRef.current.scrollIntoView();
            }}
          >
            Details
          </Menu.Item>
          <Menu.Item
            key="files"
            icon={<FolderOpenOutlined />}
            onClick={() => {
              props.fileRef.current.scrollIntoView();
            }}
          >
            Files
          </Menu.Item>
        </Menu>
      </Sider>
    </Affix>
  );
}

export default function ViewResource() {
  let topRef = useRef(null);
  let fileRef = useRef(null);
  let detailRef = useRef(null);
  let children = [];
  for (let i = 0; i < props.topics.length; i++) {
    children.push(<Tag color="blue"> {props.topics[i]}</Tag>);
  }

  return (
    <Layout style={{ height: `${window.innerHeight}px`, overflow: 'hidden' }}>
      <FormHeader />
      <Layout>
        <SideBar topRef={topRef} fileRef={fileRef} detailRef={detailRef} />
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
              subTitle={props.organizations.join(', ')}
              tags={children}
              avatar={{ src: props.avatarIcon }}
              extra={[
                <Button icon={<EditOutlined />} key="3" shape="round">
                  Edit Resource
                </Button>,
              ]}
            >
              {props.desc}
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
                  <Descriptions.Item label="Resource Type/Format">
                    {props.type.join(', ')}
                  </Descriptions.Item>
                  <Descriptions.Item label="Resource Path">
                    {props.path.join(', ')}
                  </Descriptions.Item>
                  <Descriptions.Item label="Responsible AI Trust Index Categories">
                    {props.trustIndexCategories.join(', ')}
                  </Descriptions.Item>
                  <Descriptions.Item label="AI Systems Type">
                    {props.aiSystemsType.join(', ')}
                  </Descriptions.Item>
                </Descriptions>
              </Panel>

              <Panel header="More Details" key="2">
                <Descriptions column={1}>
                  <Descriptions.Item label="Creation Date"></Descriptions.Item>
                  <Descriptions.Item label="Modified Date"></Descriptions.Item>
                  <Descriptions.Item label="Upload Date"></Descriptions.Item>
                  <Descriptions.Item label="Technical"></Descriptions.Item>
                  <Descriptions.Item label="Creator"></Descriptions.Item>
                  <Descriptions.Item label="Funded By"></Descriptions.Item>
                </Descriptions>
              </Panel>
            </Collapse>
          </div>
          <div ref={fileRef}>
            <FileTable data={props.files}></FileTable>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
