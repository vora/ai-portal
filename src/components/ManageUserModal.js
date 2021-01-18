import React, { useState, useEffect } from 'react';
import { Button, Input, Form, Modal, Select } from '../ant';
import { useAppEnv } from './../env';

export default function ManageUserModal({
  user,
  modalVisible,
  setModalVisible,
}) {
  let [editedUser, setEditedUser] = useState(JSON.parse(JSON.stringify(user)));
  useEffect(() => {
    setEditedUser(JSON.parse(JSON.stringify(user)));
  }, [user]);
  let { api, enums, refresh } = useAppEnv();

  let [organizations, setOrganizations] = useState([]);
  useEffect(() => {
    api
      .get('/api/organizations')
      .then((organizations) => setOrganizations(organizations));
  }, [api]);
  let unsavedEdit = JSON.stringify(user) !== JSON.stringify(editedUser);

  let saveChanges = () => {
    api
      .put(`/api/users/${user._id}`, {
        name: editedUser?.name,
        username: editedUser?.username,
        email: editedUser?.email,
        role: editedUser?.role,
        organizations: editedUser?.organizations,
      })
      .then(() => refresh());
  };
  return (
    <Modal
      title={user ? `${user.name} (${user.username})` : 'Loading...'}
      centered
      visible={modalVisible}
      onCancel={() => setModalVisible(false)}
      footer={[]}
      width={600}
    >
      {user && editedUser && (
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
          <Form.Item label="Name">
            <Input
              placeholder="Name"
              value={editedUser.name}
              onChange={(e) =>
                setEditedUser({ ...editedUser, name: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Username">
            <Input
              placeholder="Username"
              value={editedUser.username}
              onChange={(e) =>
                setEditedUser({ ...editedUser, username: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Email">
            <Input
              placeholder="Email"
              value={editedUser.email}
              onChange={(e) =>
                setEditedUser({ ...editedUser, email: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Organizations">
            <Select
              showSearch
              defaultValue={user?.organizations}
              style={{ width: '100%' }}
              mode="tags"
              onChange={(newOrgs) => {
                setEditedUser({ ...editedUser, organizations: newOrgs });
              }}
            >
              {organizations.map((org) => (
                <Select.Option value={org._id}>{org.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="User Role">
            <Select
              showSearch
              defaultValue={user?.role}
              style={{ width: '100%' }}
              onChange={(newRole) => {
                setEditedUser({ ...editedUser, role: newRole });
              }}
            >
              {enums?.USER_ROLES.map((role) => (
                <Select.Option value={role}>{role}</Select.Option>
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
    </Modal>
  );
}
