import React from 'react';
import { Modal, Button, Card, Tag, Space, Tooltip } from 'antd';
import 'antd/dist/antd.css';
import '../index.css';

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
      <div class="resource-box">
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
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <p style={{ margin: '0' }}>
                &nbsp;
                <strong>{resource.name}</strong>
              </p>
            </div>
          }
          centered
          visible={this.state.modalVisible}
          onCancel={() => this.setModalVisible(false)}
          footer={[
            <Tooltip title="Click here for additional information">
              <Button key="info" href={'/resources/' + resource.id}>
                More Information
              </Button>
            </Tooltip>,
          ]}
          width={600}
        >
          <p style={{ marginBottom: '5px' }}>
            <strong style={{ marginRight: '10px' }}>Organization: </strong>{' '}
            {resource.org}
          </p>
          <p style={{ marginBottom: '5px' }}>
            <strong style={{ marginRight: '10px' }}>Description: </strong>{' '}
            {resource.desc}
          </p>
          <p style={{ marginBottom: '5px' }}>
            <strong style={{ marginRight: '10px' }}>Download Link: </strong>{' '}
            <a href={resource.link} target="_blank" rel="noopener noreferrer">
              {resource.link}
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
}

export default ResourceCard;
