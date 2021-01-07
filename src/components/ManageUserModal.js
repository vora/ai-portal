import React from 'react';
import { Modal, Select } from '../ant';
import { useAppEnv } from './../env';

export default function ManageUserModal({
  user,
  modalVisible,
  setModalVisible,
}) {
  let { api, enums, refresh } = useAppEnv();
  return (
    <Modal
      title={user ? `${user.name} (${user.username})` : 'Loading...'}
      centered
      visible={modalVisible}
      onCancel={() => setModalVisible(false)}
      footer={[]}
      width={600}
    >
      {user && (
        <>
          <Select
            showSearch
            defaultValue={user?.role}
            style={{ width: '100%' }}
            onChange={(newRole) => {
              api
                .put(`/api/users/${user._id}`, { role: newRole })
                .then(() => refresh());
            }}
          >
            {enums?.USER_ROLES.map((role) => (
              <Select.Option value={role}>{role}</Select.Option>
            ))}
          </Select>
        </>
      )}
    </Modal>
  );
}
