import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal, Select } from '../ant';
import { useAppEnv } from './../env';

export default function ManageOrganizationModal({
  organization,
  modalVisible,
  setModalVisible,
}) {
  let [editedOrganization, setEditedOrganization] = useState(
    JSON.parse(JSON.stringify(organization))
  );
  useEffect(() => {
    setEditedOrganization(JSON.parse(JSON.stringify(organization)));
  }, [organization]);

  let { api, enums, refresh, user } = useAppEnv();

  let unsavedEdit =
    JSON.stringify(organization) !== JSON.stringify(editedOrganization);
  let saveChanges = () => {
    api
      .put(`/api/organizations/${organization._id}`, {
        name: editedOrganization.name,
        shortName: editedOrganization.shortName,
        city: editedOrganization.city,
        country: editedOrganization.country,
        type: editedOrganization.type,
        logoURL: editedOrganization.logoURL,
        members: editedOrganization.members,
      })
      .then(() => refresh());
  };
  let fakeUsers = [
    { username: 'Alice', _id: '...' },
    { username: 'Bob', _id: '...' },
  ];
  return (
    <Modal
      title={organization ? `${organization.name}` : 'Loading...'}
      centered
      visible={modalVisible}
      onCancel={() => setModalVisible(false)}
      footer={[]}
      width={600}
    >
      {organization && editedOrganization && user?.role === 'admin' && (
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
          <Form.Item label="Name">
            <Input
              placeholder="Name"
              value={editedOrganization.name}
              onChange={(e) =>
                setEditedOrganization({
                  ...editedOrganization,
                  name: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item label="Short Name">
            <Input
              placeholder="Short Name"
              value={editedOrganization.shortName}
              onChange={(e) =>
                setEditedOrganization({
                  ...editedOrganization,
                  shortName: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item label="City">
            <Input
              placeholder="City"
              value={editedOrganization.city}
              onChange={(e) =>
                setEditedOrganization({
                  ...editedOrganization,
                  city: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item label="Country">
            <Input
              placeholder="Country"
              value={editedOrganization.country}
              onChange={(e) =>
                setEditedOrganization({
                  ...editedOrganization,
                  country: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item label="Type">
            <Select
              showSearch
              defaultValue={editedOrganization.type}
              style={{ width: '100%' }}
              mode="multiple"
              onChange={(newTypes) => {
                setEditedOrganization({
                  ...editedOrganization,
                  type: newTypes,
                });
              }}
            >
              {enums?.ORG_TYPES.map((category) => (
                <Select.Option value={category}>{category}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Logo URL">
            <Input
              placeholder="Logo URL"
              value={editedOrganization.logoURL}
              onChange={(e) =>
                setEditedOrganization({
                  ...editedOrganization,
                  logoURL: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item label="Members">
            <Select
              showSearch
              defaultValue={editedOrganization.members}
              style={{ width: '100%' }}
              mode="multiple"
              onChange={(newMem) => {
                setEditedOrganization({
                  ...editedOrganization,
                  members: newMem,
                });
              }}
            >
              {fakeUsers?.map((user) => (
                <Select.Option value={user._id}>{user.username}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Button
            type="primary"
            style={{ marginTop: '10px' }}
            disabled={!unsavedEdit}
            onClick={saveChanges}
          >
            Apply Changes
          </Button>
        </Form>
      )}
      {(!user || user.role !== 'admin') && (
        <>
          <p>
            You do not have sufficient permissions to edit this organization.
          </p>
        </>
      )}
    </Modal>
  );
}
