import React, { useState } from 'react';
import { Card, Button, Tag, Table, Tooltip } from '../ant';
import { QuestionCircleTwoTone } from '@ant-design/icons';
import ManageResourceModal from './ManageResourceModal';

function ResourceTable({ resources, edit, admin }) {
  let [manageResource, setManageResource] = useState(null);
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
      title: 'Manage',
      key: 'action',
      render: (text, resource) => (
        <Button onClick={() => setManageResource(resource)}>Edit</Button>
      ),
    },
  ];

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
      <Table
        columns={resourcesColumns}
        dataSource={resources}
        onChange={console.log}
        pagination={{ pageSize: 10 }}
        scroll={{ y: 240 }}
      />
      <ManageResourceModal
        resource={manageResource}
        modalVisible={manageResource != null}
        setModalVisible={() => setManageResource(null)}
      />
    </Card>
  );
}

export default ResourceTable;
