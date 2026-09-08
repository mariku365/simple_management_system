import React, { useState } from 'react';
import { Button, Form, Input, Typography, message } from 'antd';
import axios from 'axios';

export default function LoginForm() {
  const [form] = Form.useForm();
  const { Title } = Typography;
  const [ loading, setLoading ] = useState(false);


  const onFinish = async (values) => {
    setLoading(true);
    try{
      const res = await axios.post("http://localhost:3001/api/login", values);

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);

        message.success(res.data.message)
        window.location.href = "/dashboard";
      } else {
        message.error(res.data.message || "Login failed");
      }
    } catch (err) {
      message.error(err.response?.data?.message || "Server Error");
    } finally {
      setLoading(false);
    }
       
  };

  return (
    <div className="flex flex-col text-[#438BE3] justify-center lg:min-w-[450px] max-w-[500px] bg-black mx-[30px] min-h-screen flex-grow bg-white text-left gap-[30px] ">
        <div>
            <div >
            <Title
                level={1}
                style={{ fontFamily: "kedebideri-black , sans-serif", marginBottom: 0, fontSize: "60px", color: "#004098", }}
            >
                Product
            </Title>

        </div>
        <div>
            <Title
                level={1}
                style={{ fontFamily: "kedebideri-black , sans-serif", marginBottom: 0, fontSize: "60px", color: "#004098",  }}
            >
                Inventory
            </Title>
        </div>
        </div>
        
        <div>
            <p className="text-lg"><strong>Sign in to continue</strong></p>
        </div>
        <div>
            <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          className=""
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please enter your username" }]}
        >
          <Input placeholder="Enter username" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password placeholder="Enter password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Login
          </Button>
        </Form.Item>
      </Form>
        </div>
      
    </div>
  );
}
