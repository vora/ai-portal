import React, { useState, useEffect } from 'react';
import { Button, DatePicker, Form, Input, Modal, Select } from '../ant';
import { useAppEnv } from './../env';
import moment from 'moment';
import FileUpload from './FilesUpload';
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

  let { api, enums, refresh } = useAppEnv();
  let [topics, setTopics] = useState([]);
  let [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    api.get('/api/topics').then((topics) => setTopics(topics));
    api
      .get('/api/organizations')
      .then((organizations) => setOrganizations(organizations));
  }, [api]);

  let unsavedEdit = JSON.stringify(resource) !== JSON.stringify(editedResource);
  let saveChanges = () => {
    api
      .put(`/api/resources/${resource._id}`, {
        name: editedResource.name,
        desc: editedResource.desc,
        type: editedResource.type,
        topics: editedResource.topics,
        path: editedResource.path,
        downloadURL: editedResource.downloadURL,
        modifiedDate: editedResource.modifiedDate,
        trustIndexCategories: editedResource.trustIndexCategories,
        keywords: editedResource.keywords,
        organizations: editedResource.organizations,
        files: editedResource.files,
        creator: editedResource.creator,
        reviewsRemaining: editedResource.reviewsRemaining,
      })
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
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
          <Form.Item label="Name">
            <Input
              placeholder="Name"
              value={editedResource.name}
              onChange={(e) =>
                setEditedResource({ ...editedResource, name: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Description">
            <Input.TextArea
              rows={3}
              placeholder="Description"
              value={editedResource.desc}
              onChange={(e) =>
                setEditedResource({ ...editedResource, desc: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Types">
            <Select
              showSearch
              defaultValue={editedResource.type}
              style={{ width: '100%' }}
              mode="multiple"
              onChange={(newTypes) => {
                setEditedResource({ ...editedResource, type: newTypes });
              }}
            >
              {enums?.RESOURCE_TYPES.map((type) => (
                <Select.Option value={type}>{type}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Topics">
            <Select
              showSearch
              defaultValue={editedResource.topics.map((topic) => topic._id)}
              style={{ width: '100%' }}
              mode="multiple"
              onChange={(newTopics) => {
                setEditedResource({
                  ...editedResource,
                  topics: newTopics.map((topicId) => {
                    return topics.find((o) => o._id === topicId);
                  }),
                });
              }}
            >
              {topics.map((topic) => (
                <Select.Option value={topic._id}>{topic.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Organizations">
            <Select
              showSearch
              defaultValue={editedResource?.organizations.map((org) => org._id)}
              style={{ width: '100%' }}
              mode="tags"
              onChange={(newOrgs) => {
                setEditedResource({
                  ...editedResource,
                  organizations: newOrgs.map((orgId) => {
                    return organizations.find((o) => o._id === orgId);
                  }),
                });
              }}
            >
              {organizations.map((org) => (
                <Select.Option value={org._id}>{org.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Trust Index">
            <Select
              showSearch
              defaultValue={editedResource.trustIndexCategories}
              style={{ width: '100%' }}
              mode="multiple"
              onChange={(newCategories) => {
                setEditedResource({
                  ...editedResource,
                  trustIndexCategories: newCategories,
                });
              }}
            >
              {enums?.TRUST_INDEX_CATEGORIES.map((category) => (
                <Select.Option value={category}>{category}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Paths">
            <Select
              showSearch
              defaultValue={editedResource.path}
              style={{ width: '100%' }}
              mode="multiple"
              onChange={(newPaths) => {
                setEditedResource({ ...editedResource, path: newPaths });
              }}
            >
              {enums?.RESOURCE_PATHS.map((path) => (
                <Select.Option value={path}>{path}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Download URL">
            <Input
              placeholder="Download URL"
              value={editedResource.downloadURL}
              onChange={(e) =>
                setEditedResource({
                  ...editedResource,
                  downloadURL: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item label="Files">
            <FileUpload
              files={editedResource.files}
              setFiles={(files) =>
                setEditedResource({ ...editedResource, files: files })
              }
            />
          </Form.Item>
          <Form.Item label="Keywords">
            <Select
              showSearch
              defaultValue={editedResource.keywords}
              style={{ width: '100%' }}
              mode="tags"
              onChange={(newKeywords) => {
                setEditedResource({ ...editedResource, keywords: newKeywords });
              }}
            >
              {resource?.keywords.map((word) => (
                <Select.Option value={word}>{word}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Modified Date">
            <DatePicker
              defaultValue={
                editedResource.modifiedDate
                  ? moment(editedResource.modifiedDate)
                  : null
              }
              onChange={(date) =>
                setEditedResource({
                  ...editedResource,
                  modifiedDate: date,
                })
              }
            />
          </Form.Item>
          <Form.Item label="Creator">
            <Input
              placeholder="Creator"
              value={editedResource.creator}
              onChange={(e) =>
                setEditedResource({
                  ...editedResource,
                  creator: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item label="Remaining Approvals">
            <Select
              showSearch
              defaultValue={editedResource.reviewsRemaining}
              style={{ width: '100%' }}
              mode="multiple"
              onChange={(newReviews) => {
                setEditedResource({
                  ...editedResource,
                  reviewsRemaining: newReviews,
                });
              }}
            >
              {enums?.REVIEW_TYPES.map((category) => (
                <Select.Option value={category}>{category}</Select.Option>
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
