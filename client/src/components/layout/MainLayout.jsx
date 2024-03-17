import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DesktopOutlined,
  FileOutlined,
  VideoCameraOutlined,
  MessageOutlined,
  ProjectOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import Chat from "../../pages/Chat";
import WelcomeScreen from "./WelcomeScreen";

const { Header, Sider, Content } = Layout;

const Structure = ({ children }) => {
  const navigate = useNavigate();

  function getItem(label, key, icon, children, onClick) {
    return {
      key,
      icon,
      children,
      label,
      onClick: onClick || (() => {}),
    };
  }

  const items = [
    getItem("Inbox", "1", <MessageOutlined />, null, () => {
      navigate("/chat");
    }),
    getItem("Whiteboard", "2", <DesktopOutlined />, null, () => {
      navigate("/whiteboard");
    }),
    getItem("Video Conference", "3", <VideoCameraOutlined />),
    getItem("My Projects", "sub2", <ProjectOutlined />, [
      getItem("Devsinc", "7", null, null, () => {
        navigate("/channel");
      }),
      getItem("Cowlar", "8"),
    ]),
    // getItem("Project Ads", "9", <FileOutlined />),
  ];

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
          style={{
            borderTop: "1px solid grey",
            position: "fixed",
            height: "100vh",
            marginTop: "58px",
            backgroundColor: "#2E2E30",
          }}
        >
          <div className="demo-logo-vertical" />
          <Menu
            mode="inline"
            // defaultSelectedKeys={["1"]}
            // defaultOpenKeys={["sub1"]}
            style={{
              height: "100%",
              backgroundColor: "#2E2E30",
              color: "white",
              transition: "background-color 0.3s, color 0.3s",
              "&:active": {
                backgroundColor: "black",
                color: "white",
              },
              marginTop: "10px",
            }}
            items={items}
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
              minHeight: 280,
              background: "white",
              marginLeft: "200px",
              marginTop: "30px",
            }}
            className="" // Override padding for large screens
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Structure;
