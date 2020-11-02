import React from 'react';
import { Form, Select, Tooltip } from '../ant';
const { Option } = Select;

function MultiSelectField(props) {
  let children = [];
  for (let i = 0; i < props.options.length; i++) {
    children.push(
      <Option value={props.options[i].toLowerCase()}>{props.options[i]}</Option>
    );
  }
  return (
    <Tooltip title={props.text}>
      <Form.Item
        label={props.field}
        name={props.field}
        rules={[
          { required: props.req, message: 'Please add the ' + props.field },
        ]}
      >
        <Select
          showSearch
          mode={props.mode}
          allowClear
          style={{ width: '100%' }}
        >
          {children}
        </Select>
      </Form.Item>
    </Tooltip>
  );
}

export default MultiSelectField;
