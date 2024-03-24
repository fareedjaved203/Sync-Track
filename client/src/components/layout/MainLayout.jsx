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

let searchItems = [];

const Structure = ({ children, showDrawer }) => {
  const navigate = useNavigate();
  const [channels, setChannels] = useState([]);
  const [change, setChange] = useState(false);
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState(searchItems);
  const [showDropdown, setShowDropdown] = useState(false);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const getChannels = async () => {
      const data = await myChannelsApi();
      console.log(data);
      setChannels([...data.data?.channels]);
      searchItems = [...data?.data?.channels];
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

  const handleItemClick = (item) => {
    setSearchQuery(item.channel);
    setFilteredItems([item]);
    setShowDropdown(false);
    navigate(`/channel/${item._id}`);
    setSearchQuery("");
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filtered = searchItems.filter((item) =>
      item.channel.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(filtered);
    setShowDropdown(!!query);
  };

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
          <div className="relative flex justify-content-center">
            <input
              type="text"
              className=" w-[90%] mt-2 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              placeholder="Search channel..."
              value={searchQuery}
              onChange={handleSearch}
            />
            {showDropdown && (
              <div className="absolute w-full top-10 left-0 bg-white border border-gray-300 rounded-lg shadow-lg mt-2 z-50">
                <ul className="py-1 w-100">
                  {Array.isArray(filteredItems) &&
                    filteredItems.map((user) => (
                      <li
                        key={user._id}
                        className="px-4 py-2 w-100 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleItemClick(user)}
                      >
                        <div className="flex items-center">
                          <div>
                            <div className="font-semibold">{user.channel}</div>
                            <div className="text-gray-600">{user.name}</div>
                          </div>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
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
              marginTop: "10px",
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
