import React from "react";
import { Table, Button } from "antd";

export default function ExportCSV({ data }) {
  const columns = [
    { title: "Product ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    { title: "Price", dataIndex: "price", key: "price" },
  ];

  const handleExport = () => {
    const headers = ["Product ID", "Name", "Quantity", "Price"];
    const rows = data.map(item => [item.id, item.name, item.quantity, item.price]);
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
