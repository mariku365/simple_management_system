import React from "react";
import { Form, Input, InputNumber, Button, Typography } from "antd";

export default function AddProductForm({ onAdd }) {
  const [form] = Form.useForm();
  const { Title } = Typography;

  const onFinish = (values) => {
    onAdd(values); // pass new product back to parent
    form.resetFields();
  };

  return (
    <div className="flex flex-col items-center">
      <Title>Add Product</Title>
      <Form className="flex flex-col min-w-[35vw] gap-[30px]" form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter product name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[{ required: true, message: "Please enter quantity" }]}
        >
          <InputNumber min={1} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please enter price" }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Add Product
          </Button>
        </Form.Item>
      </Form>
    </div>
    
  );
}
