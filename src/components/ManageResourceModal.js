import React, { useState, useEffect } from 'react';
import { Modal, Button, Input } from '../ant';
import { useAppEnv } from './../env';

export default function ManageResourceModal({
  resource,
  modalVisible,
  setModalVisible,
}) {
  let [editedResource, setEditedResource] = useState(
    JSON.parse(JSON.stringify(resource))
  );
  useEffect(() => {
    setEditedResource(JSON.parse(JSON.stringify(resource)));
  }, [resource]);
  let { api, refresh } = useAppEnv();
  let unsavedEdit = JSON.stringify(resource) !== JSON.stringify(editedResource);
  let saveChanges = () => {
    api
      .put(`/api/resources/${resource._id}`, editedResource)
      .then(() => refresh());
  };
  return (
    <Modal
      title={resource ? `${resource.name}` : 'Loading...'}
      centered
      visible={modalVisible}
      onCancel={() => setModalVisible(false)}
      footer={[]}
      width={600}
    >
      {resource && editedResource && (
        <>
          <Input
            placeholder="Name"
            value={editedResource.name}
            onChange={(e) =>
              setEditedResource({ ...editedResource, name: e.target.value })
            }
          />
          <Button
            type="primary"
            style={{ marginTop: '10px' }}
            disabled={!unsavedEdit}
            onClick={saveChanges}
          >
            Apply Changes
          </Button>
        </>
      )}
    </Modal>
  );
}
