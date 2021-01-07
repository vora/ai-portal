import React, { useState } from 'react';
import { Modal, Button, Card, Tag, Tooltip } from '../ant';

export default function OrganizationCard({ organization }) {
  let [modalVisible, setModalVisible] = useState(false);
  let tags = [organization.type];
  return (
    <div className="resource-box">
      <Card
        title={
          <button
            className="resource-button"
            onClick={() => setModalVisible(true)}
          >
            {organization.name}
          </button>
        }
        extra={tags.map((t) => (
          <Tag
            style={{
              color: 'white',
              fontWeight: 'bold',
            }}
            color={'#00CDFF'}
          >
            {t.toUpperCase()}
          </Tag>
        ))}
      >
        <Card.Meta description={organization.websiteURL} />
      </Card>
      <Modal
        title={
          <a
            href={'/organizations/' + organization._id}
            style={{ margin: '0' }}
          >
            &nbsp;
            <strong>{organization.name}</strong>
          </a>
        }
        centered
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Tooltip title="Click here for additional information">
            <Button key="info" href={'/organizations/' + organization._id}>
              More Information
            </Button>
          </Tooltip>,
        ]}
        width={600}
      >
        <p style={{ marginBottom: '5px' }}>
          <strong style={{ marginRight: '10px' }}>Link: </strong>{' '}
          <a
            href={organization.websiteURL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {organization.websiteURL}
          </a>
        </p>
      </Modal>
    </div>
  );
}
