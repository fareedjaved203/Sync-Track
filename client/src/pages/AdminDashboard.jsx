import { useState, useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProjectOutlined,
  UserOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import Navbar from "../components/layout/Navbar";
import Dashboard from "../components/admin_dashboard/Dashboard";
import Users from "../components/admin_dashboard/Users";
import { getAllUsersApi } from "../api/user/userApi";

const { Sider, Content } = Layout;

const AdminDashboard = () => {
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
    getItem("Dashboard", "1", <DashboardOutlined />, null, () => {
      setShowUsers(false);
      setShowDashboard(true);
    }),
    getItem("Users", "2", <UserOutlined />, null, () => {
      setShowDashboard(false);
      setShowUsers(true);
    }),
    getItem("Projects", "3", <ProjectOutlined />),
  ];

  const [collapsed, setCollapsed] = useState(false);
  const [showDashboard, setShowDashboard] = useState(true);
  const [showUsers, setShowUsers] = useState(false);

  const [data, setData] = useState([]);

  useEffect(() => {
    getAllUsersApi().then((data) => {
      const store = data?.data?.users;
      if (Array.isArray(store)) {
        const filteredUsers = store.filter(
          (user) => user.email !== "admin@gmail.com"
        );
        setData(filteredUsers);
      }
    });
  }, []);

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
            defaultSelectedKeys={["1"]}
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
            className="p-4"
          >
            {showDashboard ? <Dashboard data={data} /> : null}
            {showUsers ? <Users data={data} /> : null}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default AdminDashboard;
