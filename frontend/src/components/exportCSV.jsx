import React, { useEffect, useState } from "react";
import { Table, Button, message } from "antd";
import axios from 'axios';

export default function ExportCSV() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const fetchItems = async () => {
      try{
        const res = await axios.get("http://localhost:3001/api/items");
        setData(res.data);
      } catch (err) {
        message.error("Failed to load inventory to export.")
      }
    }
    fetchItems();
  }, [])

  const columns = [
    { title: "Product ID", dataIndex: "itemId", key: "id" },
    { title: "Name", dataIndex: "itemName", key: "name" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    { title: "Price", dataIndex: "price", key: "price" },
  ];

  const handleExport = () => {
    const headers = ["Product ID", "Name", "Quantity", "Price"];
    const rows = data.map(item => [item.itemId, item.itemName, item.quantity, item.price]);
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "inventory.csv";
    a.click();
  };

  return (
    <div>
      <h2>Export CSV Preview</h2>
      <Table columns={columns} dataSource={data} pagination={false} />
      <Button type="primary" onClick={handleExport} style={{ marginTop: 16 }}>
        Download CSV
      </Button>
    </div>
  );
}
