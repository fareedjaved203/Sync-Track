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

const Structure = () => {
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
      setShowChat(true);
    }),
    getItem("Whiteboard", "2", <DesktopOutlined />, null, () => {
      navigate("/whiteboard");
    }),
    getItem("Video Conference", "3", <VideoCameraOutlined />),
    getItem("My Tasks", "sub1", <CheckCircleOutlined />, [
      getItem("Figma Design", "4"),
      getItem("Frontend", "5"),
      getItem("Backend", "6"),
    ]),
    getItem("My Projects", "sub2", <ProjectOutlined />, [
      getItem("Devsinc", "7"),
      getItem("Cowlar", "8"),
    ]),
    getItem("Project Ads", "9", <FileOutlined />),
  ];

  const [collapsed, setCollapsed] = useState(false);
  const [showChat, setShowChat] = useState(false);

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
              background: colorBgContainer,
            }}
            className="" // Override padding for large screens
          >
            {!showChat ? <WelcomeScreen /> : null}
            {showChat ? <Chat /> : null}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Structure;
