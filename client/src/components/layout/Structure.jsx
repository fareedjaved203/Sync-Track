import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CheckCircleOutlined,
  MessageOutlined,
  ProjectOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import Navbar from "./Navbar";

const { Header, Sider, Content } = Layout;

const items2 = [CheckCircleOutlined, MessageOutlined, ProjectOutlined].map(
  (icon, index) => {
    const key = String(index + 1);
    let label = "";
    let children = [];

    if (index === 0) {
      label = "My Tasks";
    } else if (index === 1) {
      label = "Inbox";
    } else if (index === 2) {
      label = "My Projects";
      children = new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      });
    }

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: label,
      children: children,
    };
  }
);

const Structure = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Navbar />
      <Layout className="h-screen w-screen">
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{ borderTop: "1px solid grey" }}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{
              height: "100%",
            }}
            items={items2}
          />
        </Sider>
        <Layout>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              width: 40,
              height: 40,
            }}
          />
          <Content
            style={{
              margin: "2px 8px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Structure;
