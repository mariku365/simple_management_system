import React from "react";
import { Card, Statistic, Row, Col } from "antd";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function StockSummary() {
  // Sample data for pie chart
  const data = [
    { name: "Laptops", value: 10 },
    { name: "Mouse", value: 50 },
    { name: "Keyboard", value: 30 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <div>
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Card>
            <Statistic title="Total Products" value={120} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Total Quantity" value={560} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Low Stock Items" value={8} />
          </Card>
        </Col>
      </Row>

      <Card title="Stock Distribution">
            <div style={{ display: "flex", justifyContent: "center" }}>
                <PieChart width={600} height={400}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={150}   // bigger radius
                    fill="#8884d8"
                    dataKey="value"
                    label
                >
                    {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
                </PieChart>
            </div>
        </Card>
    </div>
  );
}
