import React from 'react';
import { Form, Tooltip, Input } from '../ant';

function FormField(props) {
  return (
    <Tooltip title={props.text}>
      <Form.Item
        name={props.field}
        label={props.field}
        rules={[
          { required: props.req, message: 'Please add the ' + props.field },
        ]}
      >
        <Input />
      </Form.Item>
    </Tooltip>
  );
}

export default FormField;
