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
import { stringToColor } from './../util';

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
      resourceName: 'Living Dictionary',
      description:
        ' An interactive dictionary of technical computer science and social science terms in plain language',
      date: 'n/a',
      topics: ['Other topic'],
      link: 'https://montrealethics.ai/dictionary/',
      tags: ['education tool'],
    },
    {
      key: '2',
      resourceName: 'Response to COVI Contact Tracing App',
      description:
        "A white paper on COVI, a contact tracing app, on the extent which diversity is considered on the app, assumptions surrounding users', and unanswered questions surrounding transparency, accountability, and security",
      date: 'n/a',
      topics: ['Health'],
      link:
        'https://montrealethics.ai/wp-content/uploads/2020/06/MAIEI-Official-COVI-Response.docx.pdf',
      tags: ['research'],
    },
  ],
  desc: 'Do we want a description?',
};

function FileTable(props) {
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
      title: 'Topics',
      key: 'topics',
      dataIndex: 'topics',
      sorter: (a, b) => a.topic.localeCompare(b.topic),
      sortDirections: ['descend', 'ascend'],
      render: (topics) => (
        <>
          {topics.map((topic) => {
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
          })}
        </>
      ),
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
  ];

  return (
    <div>
      <h1 style={{ padding: '10px', fontSize: '2em', fontWeight: 'bold' }}>
        Resources
      </h1>
      <Table columns={resourcesColumns} dataSource={props.data} />
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
            key="resources"
            icon={<FolderOpenOutlined />}
            onClick={() => {
              props.fileRef.current.scrollIntoView();
            }}
          >
            Resources
          </Menu.Item>
        </Menu>
      </Sider>
    </Affix>
  );
}

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
              subTitle={props.shortName}
              tags={children}
              avatar={{ src: props.logoURL }}
              extra={[
                <Button icon={<EditOutlined />} key="3" shape="round">
                  Edit Organization
                </Button>,
              ]}
            >
              <h3> {props.desc} </h3>
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
            <FileTable data={props.resources}></FileTable>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
