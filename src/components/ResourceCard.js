import React, { useState } from 'react';
import { Modal, Button, Card, Tag, Space, Tooltip } from '../ant';

<<<<<<< HEAD
class ResourceCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      resource: props.resource,
    };
  }

  setModalVisible(modalVisible) {
    this.setState({ modalVisible });
  }

  render() {
    let tags = this.props.resource.type;
    let resource = this.props.resource;
    return (
      <div className="resource-box">
        <Card
          title={
            <button
              className="resource-button"
              onClick={() => this.setModalVisible(true)}
            >
              {resource.name}
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
          <Card.Meta description={resource.desc} />
        </Card>
        <Modal
          title={
            <a href={'/resources/' + resource._id} style={{ margin: '0' }}>
              &nbsp;
              <strong>{resource.name}</strong>
            </a>
          }
          centered
          visible={this.state.modalVisible}
          onCancel={() => this.setModalVisible(false)}
          footer={[
            <Tooltip title="Click here for additional information">
              <Button key="info" href={'/resources/' + resource._id}>
                More Information
              </Button>
            </Tooltip>,
          ]}
          width={600}
        >
          <p style={{ marginBottom: '5px' }}>
            <strong style={{ marginRight: '10px' }}>Organizations: </strong>{' '}
            <Space>
              {resource.organizations.map((org) => (
                <span>org.name</span>
              ))}
            </Space>
          </p>
          <p style={{ marginBottom: '5px' }}>
            <strong style={{ marginRight: '10px' }}>Description: </strong>{' '}
            {resource.desc}
          </p>
          <p style={{ marginBottom: '5px' }}>
            <strong style={{ marginRight: '10px' }}>Download Link: </strong>{' '}
            <a href={resource.link} target="_blank" rel="noopener noreferrer">
              {resource.downloadURL}
            </a>
          </p>
          <p style={{ marginBottom: '5px' }}>
            <strong style={{ marginRight: '10px' }}>Keywords: </strong>
            <Space>
              {tags.map((t) => (
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
            </Space>
          </p>
        </Modal>
      </div>
    );
  }
=======
export default function ResourceCard({ resource }) {
  let [modalVisible, setModalVisible] = useState(false);
  let tags = resource.type;
  return (
    <div className="resource-box">
      <Card
        title={
          <button
            className="resource-button"
            onClick={() => setModalVisible(true)}
          >
            {resource.name}
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
        <Card.Meta description={resource.desc} />
      </Card>
      <Modal
        title={
          <a href={'/resources/' + resource._id} style={{ margin: '0' }}>
            &nbsp;
            <strong>{resource.name}</strong>
          </a>
        }
        centered
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Tooltip title="Click here for additional information">
            <Button key="info" href={'/resources/' + resource._id}>
              More Information
            </Button>
          </Tooltip>,
        ]}
        width={600}
      >
        <p style={{ marginBottom: '5px' }}>
          <strong style={{ marginRight: '10px' }}>Organizations: </strong>{' '}
          <Space>
            {resource.organizations.map((org) => (
              <span key={org.name}>{org.name}</span>
            ))}
          </Space>
        </p>
        <p style={{ marginBottom: '5px' }}>
          <strong style={{ marginRight: '10px' }}>Description: </strong>{' '}
          {resource.desc}
        </p>
        <p style={{ marginBottom: '5px' }}>
          <strong style={{ marginRight: '10px' }}>Download Link: </strong>{' '}
          <a href={resource.link} target="_blank" rel="noopener noreferrer">
            {resource.downloadURL}
          </a>
        </p>
        <p style={{ marginBottom: '5px' }}>
          <strong style={{ marginRight: '10px' }}>Keywords: </strong>
          <Space>
            {tags.map((t) => (
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
          </Space>
        </p>
      </Modal>
    </div>
  );
>>>>>>> 46510e1a1926db91446477aa930e6669ca7df890
}
