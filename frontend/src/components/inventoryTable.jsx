import React, { useState, useEffect } from "react";
import { Table, Button, Form, Modal, Input, message } from "antd";
import axios from 'axios'

export default function InventoryTable() {
  const [data, setData] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const [editRecord, setEditRecord] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState(null);
  const [countdown, setCountdown] = useState(5);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [form] = Form.useForm();
  
  useEffect(() => {
    fetchItems();
  }, [])


  const fetchItems = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/items`)
      setData(res.data);
    } catch (err) {
      message.error("Failed to load inventory")
    }
  };

  const showUpdateModal = (record) => {
    setEditRecord(record);
    form.setFieldsValue(record);
    setVisibleModal(true);
  }

  const updateItem = async () => {
    try {
      const values = await form.validateFields();
      await axios.put(`http://localhost:3001/api/items/${editRecord.itemId}`, values)
      message.success("Item updated successfully");
      setVisibleModal(false);
      setEditRecord(null);
      fetchItems();
    } catch (err) {
      message.error("Failed to update item")
    };
  };

  const showDeleteModal = (record) => {
    setDeleteRecord(record);
    setCountdown(5);
    setIsConfirmed(false);
    setDeleteModalVisible(true);
  };

  const deleteCountdown = () => {
    setIsConfirmed(true)
    let timer = 5;
    const interval = setInterval(() => {
      timer -= 1;
      setCountdown(timer);

      if (timer === 0) {
        clearInterval(interval);
        deleteItem(deleteRecord.itemId);
      }
    }, 1000)
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/items/${id}`);
      message.success("Successfully deleted item");
      setDeleteModalVisible(false);
      setDeleteRecord(null);
      fetchItems();
    } catch (err) {
      message.error("Failed to delete item")
    }
  };
  const columns = [
    { title: "Product ID", dataIndex: "itemId", key: "id" },
    { title: "Name", dataIndex: "itemName", key: "name" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    { title: "Price", dataIndex: "price", key: "price" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-[8px]">
            <Button type="primary" onClick={() => showUpdateModal(record)}>
                Update
            </Button>
            <Button danger onClick={() => showDeleteModal(record)}>
                Delete
            </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={data} rowKey="itemId"/>;

      <Modal
          title="Update Item"
          open={visibleModal}
          onOk={updateItem}
          onCancel={() => setVisibleModal(false)}
        >
          <Form form={form} layout="vertical">
            <Form.Item name="itemName" label="Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="quantity" label="Quantity" rules={[{ required: true }]}>
              <Input type="number" />
            </Form.Item>
            <Form.Item name="price" label="Price" rules={[{ required: true }]}>
              <Input type="number" />
            </Form.Item>
          </Form>
        </Modal>

        <Modal
        title="Confirm Delete"
        open={deleteModalVisible}
        onOk={deleteCountdown}
        onCancel={() => setDeleteModalVisible(false)}
        okText={isConfirmed ? `Deleting in ${countdown}s` : "Confirm Delete"}
        cancelText="Cancel"
        cancelButtonProps={{disabled: isConfirmed}}
      >
        <p>
          Are you sure you want to delete{" "}
          <strong>{deleteRecord?.itemName}</strong>?  
          This action will execute after 5 seconds.
        </p>
      </Modal>
    </div>
    
  )
}
