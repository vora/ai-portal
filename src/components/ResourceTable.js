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
      title: 'Topic',
      key: 'topic',
      dataIndex: 'topic',
      sorter: (a, b) => a.topic.localeCompare(b.topic),
      sortDirections: ['descend', 'ascend'],
      render: (topic) => {
        return (
          <Tag
            style={{
              color: 'white',
              fontWeight: 'bold',
            }}
            color={'#42D3D4'}
            key={topic}
          >
            {topic.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Path',
      key: 'path',
      dataIndex: 'path',
      sorter: (a, b) => a.path.localeCompare(b.path),
      sortDirections: ['descend', 'ascend'],
      render: (path) => {
        return (
          <Tag
            style={{
              color: 'white',
              fontWeight: 'bold',
            }}
            color={'#097AE8'}
            key={path}
          >
            {path.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Type',
      key: 'type',
      dataIndex: 'type',
      sorter: (a, b) => a.type.localeCompare(b.type),
      sortDirections: ['descend', 'ascend'],
      render: (type) => {
        return (
          <Tag
            style={{
              color: 'white',
              fontWeight: 'bold',
            }}
            color={'#00CDFF'}
            key={type}
          >
            {type.toUpperCase()}
          </Tag>
        );
      },
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
