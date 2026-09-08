import React, { useState } from 'react';
import AddProductForm from '../components/addProduct';
import InventoryTable from '../components/inventoryTable'
import StockSummary from '../components/stockSummary';
import ExportCSV from '../components/exportCSV';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Button } from 'antd';
import logo from "../assets/logo.png";

const { Header, Content, Sider } = Layout;

export default function Dashboard() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Track which header item is selected
  const [activeHeader, setActiveHeader] = useState("Inventory");
  const [activeSider, setActiveSider] = useState("view");
  // Header items
  const headerItems = [
    { key: "Inventory", label: "Inventory" },
    { key: "Reports", label: "Reports" },
  ];

  // Sider items for Inventory
  const inventorySiderItems = [
    {
      key: "view",
      icon: <LaptopOutlined />,
      label: "View Inventory",
    },
    {
      key: "add",
      icon: <NotificationOutlined />,
      label: "Add Product",
    },
  ];

  // Sider items for Reports
  const reportsSiderItems = [
    {
      key: "stock",
      icon: <LaptopOutlined />,
      label: "Stock Summary",
    },
    {
      key: "export",
      icon: <UserOutlined />,
      label: "Export CSV",
    },
  ];

  return (
    <Layout className="min-h-screen">
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <img src={logo} alt="Logo" style={{ height: 40, marginRight: 16 }} />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['Inventory']}
          items={headerItems}
          style={{ flex: 1, minWidth: 0 }}
          onClick={(e) => {
            setActiveHeader(e.key)

            if (e.key === "Inventory"){
              setActiveSider("view");
            } else {
              setActiveSider("stock");
            };
          }}
        />
        <div>
          <Button>Logout</Button>
        </div>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            selectedKeys={[activeSider]}
            style={{ height: '100%', borderInlineEnd: 0 }}
            items={activeHeader === "Inventory" ? inventorySiderItems : reportsSiderItems}
            onClick={(e) => setActiveSider(e.key)}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb
            items={[{ title: 'Home' }, { title: activeHeader }, { title: 'App' }]}
            style={{ margin: '16px 0' }}
          />
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
            
          >
            {activeHeader === "Inventory" && activeSider === "view" && <InventoryTable/>}
            {activeHeader === "Inventory" && activeSider === "add" && (
              <AddProductForm onAdd={(newProduct) => console.log("Added:", newProduct)} />
            )}
            {activeHeader === "Reports" && activeSider === "stock" && <StockSummary />}
            {activeHeader === "Reports" && activeSider === "export" && (
              <ExportCSV data={[
                { key: 1, id: "P001", name: "Laptop", quantity: 10, price: 45000 },
                { key: 2, id: "P002", name: "Mouse", quantity: 50, price: 500 },
                { key: 3, id: "P003", name: "Keyboard", quantity: 30, price: 1200 },
              ]} />
            )}
            </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
