import React from 'react';
import { Search, Card, Space, Tag, Table, Tooltip } from '../ant';
import { QuestionCircleTwoTone } from '@ant-design/icons';

function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}

function ResourceTable({ resources, edit, admin }) {
  const resourcesColumns = [
    {
      title: 'Resource Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Description',
      dataIndex: 'desc',
    },
    {
      title: 'Upload Date',
      dataIndex: 'uploadDate',
      sorter: (a, b) => {
        let aDate = new Date(a.uploadDate);
        let bDate = new Date(b.uploadDate);
        return aDate.getTime() - bDate.getTime();
      },
    },
    {
      title: 'Topics',
      key: 'topics',
      dataIndex: 'topics',
      render: (topics) => (
        <>
          {topics.map((topic) => {
            return (
              <Tag
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  marginBottom: '2px',
                }}
                color={'#42D3D4'}
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
      title: 'Path',
      key: 'path',
      dataIndex: 'path',
      render: (path) => (
        <>
          {path.map((p) => {
            return (
              <Tag
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  marginBottom: '2px',
                }}
                color={'#097AE8'}
                key={p}
              >
                {p.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Type',
      key: 'type',
      dataIndex: 'type',
      render: (type) => (
        <>
          {type.map((t) => {
            return (
              <Tag
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  marginBottom: '2px',
                }}
                color={'#00CDFF'}
                key={t}
              >
                {t.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Keywords',
      key: 'keywords',
      dataIndex: 'keywords',
      render: (keywords) => (
        <>
          {keywords.map((keyword) => {
            return (
              <Tag
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  marginBottom: '2px',
                }}
                color={'#009B72'}
                key={keyword}
              >
                {keyword.toUpperCase()}
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
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a href="/">Edit</a> | <a href="/">Remove</a>
        </Space>
      ),
    },
  ];

  // remove last column if no privilege (regular user)
  if (!edit) {
    resourcesColumns.pop();
  } else if (admin) {
    resourcesColumns.pop();
    resourcesColumns.push({
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a href="/">Accept</a> | <a href="/">Edit</a> | <a href="/">Remove</a>
        </Space>
      ),
    });
  }

  let title = 'Uploaded Resources';
  if (admin) title = 'Pending Resources';
  return (
    <Card id="resources" style={{ marginBottom: '20px' }}>
      <h1 style={{ fontSize: '2em', fontWeight: 'bold' }}>
        {title} &nbsp;
        <Tooltip
          title={
            <p style={{ textAlign: 'center', marginBottom: '0' }}>
              View the resources you've added and edit them if necessary
            </p>
          }
          placement="right"
        >
          <QuestionCircleTwoTone style={{ fontSize: '0.8em' }} />{' '}
        </Tooltip>
      </h1>
      <Tooltip title="Search for a resource" placement="right">
        <Search
          style={{ width: '50%', marginBottom: '20px' }}
          placeholder="Responsible AI Design Assistant"
          enterButton
          onSearch={console.log}
        />
      </Tooltip>
      <Table
        columns={resourcesColumns}
        dataSource={resources}
        onChange={onChange}
        pagination={{ pageSize: 10 }}
        scroll={{ y: 240 }}
      />
    </Card>
  );
}

export default ResourceTable;
