import React from 'react';
import {
  Input,
  Select,
  Row,
  Col,
  Radio,
  Checkbox,
  Switch
} from "antd";
import CheckboxGroup from 'antd/lib/checkbox/Group';
import TextArea from 'antd/lib/input/TextArea';
import RadioGroup from 'antd/lib/radio/group';

const { Option } = Select;

export const getFieldItem = (field) => {
  switch (field.type) {
    case 'select':
      return getSelectField(field);
    case 'text':
      return getTextField(field);
    case 'textarea':
      return getTextAreaField(field);
    case 'checkbox':
      return getCheckBoxField(field);
    case 'radio':
      return getRadioField(field);
    case 'switch':
      return getSwitchField(field);
      case 'password':
        return getPasswordInputField(field);
    case 'input':
    default:
      return getInputField(field);
  }
};

const getInputField = (field) => (
  <Input placeholder={field.placeholder || `请输入${field.label}`} />
);

const getPasswordInputField = (field) => (
  <Input.Password placeholder={field.placeholder || `请输入${field.label}`}/>
)

const getSelectField = field => (
  <Select placeholder={field.placeholder || `点击选择${field.label}`}>
    {field.options.map(option => (
      <Option key={option.label} value={option.value}>
        {option.label}
      </Option>
    ))}
  </Select>
)

const getTextField = field => (
  <span>{field.value}</span>
);

const getTextAreaField = field => (
  <TextArea rows={4} placeholder={field.placeholder} />
);

const getCheckBoxField = field => (
  <CheckboxGroup style={{ width: '100%' }}>
    <Row>
      {field.options.map(option => (
        <Col span={8} key={option.value} style={{ padding: '10px 0' }}>
          <Checkbox value={option.value}>{option.label}</Checkbox>
        </Col>))}
    </Row>
  </CheckboxGroup>
);

const getRadioField = field => (
  <RadioGroup>
    {field.options.map(option => (
      <Radio key={option.value} value={option.value}>{option.label}</Radio>
    ))}
  </RadioGroup>
);

const getSwitchField = field => (
  <Switch defaultChecked checkedChildren='启用' unCheckedChildren='禁用' />
)