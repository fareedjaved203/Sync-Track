import React, { useState, useEffect } from "react";
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
import { useSelector } from "react-redux";
import { IoIosAddCircle } from "react-icons/io";
import AddChannelModal from "../channel/AddChannelModal";
import {
  deleteChannelApi,
  myChannelsApi,
  updateChannelApi,
} from "../../api/channel/channelApi";
import { MdDelete } from "react-icons/md";
import { MdEditDocument } from "react-icons/md";

const { Header, Sider, Content } = Layout;

const Structure = ({ children }) => {
  const navigate = useNavigate();
  const [channels, setChannels] = useState([]);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const getChannels = async () => {
      const data = await myChannelsApi();
      console.log(data);
      setChannels([...data.data?.channels]);
    };
    getChannels();
  }, []);

  const removeChannel = async (id) => {
    const data = await deleteChannelApi(id);
    console.log(data);
  };

  const updateChannel = async (id, channel) => {
    const data = await updateChannelApi(id, channel);
    console.log(data);
  };

  function getItem(label, key, icon, children, onClick, Icon1, Icon2) {
    return {
      key,
      icon,
      children,
      label,
      onClick: onClick || (() => {}),
      Icon1,
      Icon2,
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
    getItem(
      "Channels",
      "sub2",
      <ProjectOutlined />,
      channels.flatMap((channel, index) => {
        return channel.users
          .filter((val) => val.user == user.data?.user?._id)
          .map(() => {
            return getItem(
              channel.channel,
              `channel-${index}`,
              <span>
                <span>
                  <MdDelete onClick={() => removeChannel(channel?._id)} />
                </span>
                <span>
                  <MdEditDocument />,
                </span>
              </span>,

              null,
              () => {
                navigate(`/channel/${channel._id}`);
              }
            );
          });
      })
    ),
  ];

  const createChannel = [
    getItem(
      <AddChannelModal />,
      "4",
      <IoIosAddCircle style={{ fontSize: "20px" }} />
    ),
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
            style={{
              height: "70%",
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
          <Menu
            mode="inline"
            style={{
              height: "30%",
              backgroundColor: "#2E2E30",
              color: "white",
              transition: "background-color 0.3s, color 0.3s",
              "&:active": {
                backgroundColor: "black",
                color: "white",
              },
              marginTop: "40px",
            }}
            items={createChannel}
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
