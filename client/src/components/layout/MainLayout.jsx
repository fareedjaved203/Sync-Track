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
import { Layout, Menu, Button, theme, Dropdown } from "antd";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoIosAddCircle } from "react-icons/io";
import { HiDotsHorizontal } from "react-icons/hi";
import AddChannelModal from "../channel/AddChannelModal";
import { IoMdNotificationsOutline } from "react-icons/io";

import {
  deleteChannelApi,
  myChannelsApi,
  updateChannelApi,
} from "../../api/channel/channelApi";
import { MdDelete } from "react-icons/md";
import { MdEditDocument } from "react-icons/md";
import UpdateChannelModal from "../channel/UpdateChannelModal";
import DropDown from "./DropDown";

const { Header, Sider, Content } = Layout;

const Structure = ({ children, showDrawer }) => {
  const navigate = useNavigate();
  const [channels, setChannels] = useState([]);
  const [change, setChange] = useState(false);
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const getChannels = async () => {
      const data = await myChannelsApi();
      console.log(data);
      setChannels([...data.data?.channels]);
    };
    getChannels();
  }, [change]);

  const removeChannel = async (id) => {
    const data = await deleteChannelApi(id);
    setChange(!change);
    console.log(data);
  };

  const updateChannel = async (id, channel) => {
    const data = await updateChannelApi(id, channel);
    console.log(data);
  };

  const showDropDown = () => {
    setIsDropDownVisible(!isDropDownVisible);
  };

  function getItem(label, key, icon, children, onClick, Icon1, Icon2) {
    const menu = (
      <Menu>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.alipay.com/"
          >
            1st menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.taobao.com/"
          >
            2nd menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.tmall.com/"
          >
            3rd menu item
          </a>
        </Menu.Item>
      </Menu>
    );

    return {
      key,
      icon,
      children,
      label,
      onClick: onClick || (() => {}),
      Icon1:
        Icon1 ||
        (() => (
          <Dropdown overlay={menu}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              <HiDotsHorizontal />
            </a>
          </Dropdown>
        )),
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
    getItem("Video Conference", "3", <VideoCameraOutlined />, null, () => {
      navigate(`/video/${Date.now()}`);
    }),
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
              <>
                {user?.data?.user?._id == channel?.creator && (
                  <>
                    <>
                      <MdDelete
                        style={{
                          fontSize: "20px",
                          color: "#EB3A0E",
                        }}
                        onClick={() => removeChannel(channel?._id)}
                      />
                    </>
                    <>
                      <UpdateChannelModal
                        channel={channel}
                        change={change}
                        setChange={setChange}
                      />
                    </>
                  </>
                )}
              </>,
              null,
              () => {
                navigate(`/channel/${channel._id}`);
              },
              null,
              null
            );
          });
      })
    ),
  ];

  const createChannel = [
    getItem(
      <AddChannelModal change={change} setChange={setChange} />,
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
      <Navbar showDrawer={showDrawer} />
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
            className="my-menu"
            style={{
              height: "70%",
              backgroundColor: "#2E2E30",
              color: "white",
              transition: "background-color 0.3s, color 0.3s",
              "&:active": {
                backgroundColor: "black",
                color: "white",
              },
              "&:hover": {
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
              marginTop: "25px",
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Structure;
