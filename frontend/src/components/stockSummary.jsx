import React, {useEffect, useState} from "react";
import { Card, Statistic, Row, Col, message } from "antd";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import axios from 'axios';


export default function StockSummary() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/items");
        setItems(res.data);
      } catch (err) {
        message.error("Failed to load stock summary")
      }
    };
    fetchItems();
  }, [])

  const totalProducts = items.length;
  const totalQuantity = items.reduce((sum, item) => + item.quantity, 0);
  const lowStockItems = items.filter((item) => item.quantity < 5).length;

  const data = items.map((item) => ({
    name: item.itemName,
    value: item.quantity,
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <div>
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Card>
            <Statistic title="Total Products" value={totalProducts} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Total Quantity" value={totalQuantity} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Low Stock Items" value={lowStockItems} />
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
