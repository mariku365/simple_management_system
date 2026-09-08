import React, { useState } from "react";
import { Table, Button } from "antd";

export default function InventoryTable() {
  // Sample data for demo
  const [data, setData] = useState([
    { key: 1, id: "P001", name: "Laptop", quantity: 10, price: 45000 },
    { key: 2, id: "P002", name: "Mouse", quantity: 50, price: 500 },
    { key: 3, id: "P003", name: "Keyboard", quantity: 30, price: 1200 },
    { key: 4, id: "P004", name: "Mouse", quantity: 50, price: 500 },
    { key: 5, id: "P005", name: "Keyboard", quantity: 30, price: 1200 },
    { key: 6, id: "P006", name: "Mouse", quantity: 50, price: 500 },
    { key: 7, id: "P007", name: "Keyboard", quantity: 30, price: 1200 },
    { key: 8, id: "P008", name: "Mouse", quantity: 50, price: 500 },
    { key: 9, id: "P009", name: "Keyboard", quantity: 30, price: 1200 },
    { key: 10, id: "P010", name: "Mouse", quantity: 50, price: 500 },
    { key: 11, id: "P011", name: "Keyboard", quantity: 30, price: 1200 },

  ]);

  const columns = [
    { title: "Product ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    { title: "Price", dataIndex: "price", key: "price" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-[8px]">
            <Button>
                Update
            </Button>
            <Button>
                Delete
            </Button>
        </div>
      ),
    },
  ];

  return <Table columns={columns} dataSource={data} />;
}
