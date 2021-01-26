import React, { useState } from 'react';
import {
  Input,
  Form,
  DatePicker,
  Tooltip,
  InputNumber,
  Select,
  Space,
  Upload,
} from '../ant';

const { Option } = Select;
const { TextArea } = Input;

function FormQuestion(props) {
  const [uploadURL, switchUploadType] = useState(true);
  const handleUploadType = () => {
    switchUploadType((prev) => !prev);
  };
  const uploadTypes = (
    <Select
      defaultValue={uploadURL ? 'URL ' : 'FileUpload'}
      className="uploadTypes"
      onChange={handleUploadType}
      disabled //for now, just allow to upload URL
    >
      <Option value="URL">URL</Option>
      <Option value="FileUpload">File Upload</Option>
    </Select>
  );
  return (
    <Tooltip title={props.question.tip}>
      {props.question.type === 'type' && (
        <Form.Item
          name={props.question.val}
          label={props.question.string}
          rules={[{ required: props.question.required }]}
        >
          <Input placeholder={props.question.example_ans} />
        </Form.Item>
      )}
      {props.question.type === 'select' && (
        <Form.Item
          name={props.question.val}
          label={props.question.string}
          rules={[{ required: props.question.required }]}
        >
          <Select
            showSearch
            allowClear
            style={{ width: '100%' }}
            placeholder={props.question.example_ans}
          >
            {props.question.options.map((option) => (
              <Option value={option.name}>{option.label} </Option>
            ))}
          </Select>
        </Form.Item>
      )}
      {(props.question.type === 'multiple' ||
        props.question.type === 'tags') && (
        <Form.Item
          name={props.question.val}
          label={props.question.string}
          rules={[{ required: props.question.required }]}
        >
          <Select
            showSearch
            mode={props.question.type}
            allowClear
            style={{ width: '100%' }}
            placeholder={props.question.example_ans}
          >
            {props.question.options.map((option) => (
              <Option value={option.name}>{option.label} </Option>
            ))}
          </Select>
        </Form.Item>
      )}
      {props.question.type === 'text-area' && (
        <Form.Item
          name={props.question.val}
          label={props.question.string}
          rules={[{ required: props.question.required }]}
        >
          <TextArea rows={4} placeholder={props.question.example_ans} />
        </Form.Item>
      )}
      {props.question.type === 'date' && (
        <Form.Item
          name={props.question.val}
          label={props.question.string}
          rules={[{ required: props.question.required }]}
        >
          <DatePicker />
        </Form.Item>
      )}
      {props.question.type === 'linkFile' && !uploadURL && (
        <Form.Item
          name={props.question.val}
          label={props.question.string}
          rules={[{ required: props.question.required }]}
        >
          <Upload>
            <Input addonBefore={uploadTypes}></Input>
          </Upload>
        </Form.Item>
      )}
      {props.question.type === 'linkFile' && uploadURL && (
        <Form.Item
          name={props.question.val}
          label={props.question.string}
          rules={[{ required: props.question.required }]}
        >
          <Input addonBefore={uploadTypes}></Input>
        </Form.Item>
      )}
      {props.question.type === 'number' && (
        <Form.Item
          name={props.question.val}
          label={props.question.string}
          rules={[{ required: props.question.required }]}
        >
          <InputNumber />
        </Form.Item>
      )}
      {props.question.type === 'multiple-type' && (
        <Form.Item label={props.question.string}>
          <Space direction="vertical" size="middle">
            {props.question.options.map((option) => (
              <Form.Item name={option.name}>
                <Input
                  placeholder={option.label}
                  style={{ width: '600px', textAlign: 'left' }}
                />
              </Form.Item>
            ))}
          </Space>
        </Form.Item>
      )}
    </Tooltip>
  );
}

export default FormQuestion;
