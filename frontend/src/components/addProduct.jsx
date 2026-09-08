import React from "react";
import { Form, Input, InputNumber, Button, Typography, message } from "antd";
import axios from 'axios';


export default function AddProductForm({ onAdd }) {
  const [form] = Form.useForm();
  const { Title } = Typography;

  const onFinish = async (values) => {
    try {
      await axios.post("http://localhost:3001/api/items", values);
      message.success("Product added successfully!");
      form.resetFields();
      if (onAdd) onAdd();
    } catch (err) {
      message.error("Adding product failed.")
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Title>Add Product</Title>
      <Form className="flex flex-col min-w-[35vw] gap-[30px]" form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter product name" }]}
          onFinish={onFinish}
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
