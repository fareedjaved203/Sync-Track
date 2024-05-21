import { useState, useEffect } from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllUsersApi } from "../api/user/userApi";
import { Tag } from "antd";
import { CheckCircleOutlined, MenuOutlined } from "@ant-design/icons";
import { fetchChatHistoryApi } from "../api/chat/chatApi";
import { Button, Drawer, notification } from "antd";
import MainLayout from "../components/layout/MainLayout";

const server = "http://localhost:3000";
const connectionOptions = {
  "force new connection": true,
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"],
  withCredentials: true,
};

const socket = io(server, connectionOptions);

const Chat = () => {
  const user = useSelector((state) => state.user);

  const [api, contextHolder] = notification.useNotification();

  const UserAvatar = ({ url, alt }) => (
    <img
      src={url}
      alt={alt}
      className="w-8 h-8 rounded-full object-cover mr-2"
    />
  );

  const UserName = ({ name }) => (
    <span className="font-bold text-gray-700">{name}</span>
  );

  const openNotification = (placement, message, sender) => {
    api.info({
      description: (
        <div className="flex items-center rounded-md ">
          <UserAvatar url={sender?.avatar?.url} alt={sender?.name} />
          <div className="flex flex-col">
            <UserName name={sender?.name} />
            <span className="text-sm text-gray-500">{message?.message}</span>
          </div>
        </div>
      ),
      placement,
    });
  };

  const [sender, setSender] = useState(user?.data?.user?._id);
  const [allUsers, setAllUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [displayUserInfo, setDisplayUserInfo] = useState([]);
  const [activeUser, setActiveUser] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [onlineStatus, setOnlineStatus] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    socket.emit("online-users", user?.data?.user?.name);
    setOnlineStatus(!onlineStatus);
    setSender(user?.data?.user?._id);
  }, []);

  useEffect(() => {
    socket.on("online-users-updated", (users) => {
      const uniqueUsernames = new Set(users.map((user) => user.username));
      const usernamesArray = Array.from(uniqueUsernames);
      setOnlineUsers(usernamesArray);
    });
  }, [onlineStatus]);

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const activeUserStatus = (receiver) => {
    setActiveUser(receiver);
    setDisplayUserInfo(receiver);
    getUserDetails(sender, receiver?._id);
  };

  const getUserDetails = async (sender, receiver) => {
    const data = await fetchChatHistoryApi(sender, receiver);
    setChatHistory(data?.data?.chatHistory);
  };

  useEffect(() => {
    getAllUsersApi().then((data) => {
      const store = data?.data?.users;
      if (Array.isArray(store)) {
        const filteredUsers = store.filter((user) => user.role !== "admin");
        setAllUsers([...filteredUsers]);
        setFilteredItems([...filteredUsers]);
      }
    });
  }, []);

  useEffect(() => {
    socket.on("user-online-to-chat", user);

    socket.on("message", (message) => {
      setChatHistory((messages) => {
        message.content = message.message;
        return [...messages, message];
      });
    });

    socket.on("notification", (message) => {
      if (message?.receiver === user?.data.user?._id) {
        if (allUsers) {
          const sender = allUsers.find((u) => u._id === message.sender);
          console.log(sender);
          openNotification("bottomRight", message, sender);
        }
      }
    });
  }, [allUsers]);

  const updateChatHistory = (message) => {
    setChatHistory((chatHistory) => [...chatHistory, message]);
  };

  const handleSubmit = () => {
    if (message) {
      socket.emit("sendMessage", { message, sender, receiver: activeUser._id });
      setMessage("");
      updateChatHistory(message);
    }
  };

  const sendMessage = (event) => {
    setMessage(event.target.value);
  };

  const handleItemClick = (item) => {
    setSearchQuery(item.email);
    setFilteredItems([item]);
    setShowDropdown(false);
    setSearchQuery("");
    activeUserStatus(item);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filtered = allUsers?.filter((item) =>
      item.email.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(filtered);
    setShowDropdown(!!query);
  };

  return (
    <>
      <MainLayout showDrawer={showDrawer}>
        {contextHolder}
        <div className="flex h-full w-full antialiased text-gray-800">
          <div className="flex flex-row h-full w-full overflow-x-hidden">
            <Drawer
              title="Sync Track"
              placement="left"
              onClose={onClose}
              open={open}
              width={300}
            >
              <div className="flex flex-col w-64 bg-white flex-shrink-0">
                <div className="relative z-50 w-[250px] bg-white left-0">
                  {displayUserInfo?.avatar && (
                    <>
                      <div className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
                        <div className="h-20 w-20 rounded-full border">
                          <img
                            src={displayUserInfo?.avatar?.url}
                            alt="Avatar"
                            className="h-full w-full"
                          />
                        </div>
                        <Link to={`/profile/${displayUserInfo?.email}`}>
                          <div className="text-sm font-semibold mt-2 text-center">
                            {displayUserInfo?.name}
                          </div>

                          <div className="text-xs text-gray-500 m-1">
                            {displayUserInfo?.email}
                          </div>
                        </Link>

                        {onlineUsers.includes(displayUserInfo?.name) ? (
                          <>
                            <Tag color="green" icon={<CheckCircleOutlined />}>
                              Online
                            </Tag>
                          </>
                        ) : (
                          <>
                            <Tag color="red" icon={<CheckCircleOutlined />}>
                              Offline
                            </Tag>
                          </>
                        )}
                      </div>
                    </>
                  )}
                  <div className="flex mt-2">
                    <div className="relative block">
                      <div className="relative">
                        <input
                          type="text"
                          className="w-[255px] px-4 py-2 rounded-lg border border-2 border-gray-700 focus:outline-none focus:border-blue-500"
                          placeholder="search user..."
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
                                      <img
                                        src={user.avatar.url}
                                        alt={user.name}
                                        className="w-8 h-8 rounded-full mr-2"
                                      />
                                      <div>
                                        <div className="font-semibold">
                                          {user.name}
                                        </div>
                                        <div className="text-gray-600">
                                          {user.email}
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-64 bg-white flex-shrink-0">
                <div className="flex flex-col mt-8 mt-72 bg-white">
                  <div className="flex flex-row items-center justify-between text-xs bg-white p-1">
                    <span className="font-bold">Users</span>
                    <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
                      {allUsers.length}
                    </span>
                  </div>
                  <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
                    <ul>
                      {allUsers &&
                        allUsers?.map((user) => (
                          <li
                            key={user._id}
                            onClick={() => activeUserStatus(user)}
                          >
                            <button
                              className={`flex flex-row items-center w-full rounded-xl p-2 ${
                                activeUser?._id === user._id
                                  ? "bg-gray-300"
                                  : "hover:bg-gray-100"
                              }`}
                            >
                              <div
                                className={`h-10 w-10 rounded-full border-3 ${
                                  onlineUsers.includes(user?.name)
                                    ? "border-green-500"
                                    : "border-red-500"
                                } overflow-hidden`}
                              >
                                <img
                                  src={user?.avatar?.url}
                                  alt="Avatar"
                                  className="h-full w-full"
                                />
                              </div>
                              <div className="ml-2 text-sm font-semibold">
                                {user?.name}
                              </div>
                            </button>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Drawer>
            <div className="flex flex-col flex-auto h-full">
              <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl h-full">
                {displayUserInfo?.avatar?.url && (
                  <div className="flex items-center w-full bg-gray-50 p-2 mb-2">
                    <img
                      src={displayUserInfo?.avatar?.url}
                      className="mr-2 rounded-full w-10 h-10"
                    />
                    <h1 className="text-lg pr-2">{displayUserInfo?.name}</h1>
                    {onlineUsers.includes(displayUserInfo?.name) ? (
                      <>
                        <Tag color="green" icon={<CheckCircleOutlined />}>
                          Online
                        </Tag>
                      </>
                    ) : (
                      <>
                        <Tag color="red" icon={<CheckCircleOutlined />}>
                          Offline
                        </Tag>
                      </>
                    )}
                  </div>
                )}

                <div className="flex flex-col h-[70%] overflow-x-auto">
                  <div className="flex flex-col h-full">
                    <div className="grid grid-cols-12 gap-y-1">
                      {(() => {
                        const displayedMessages = new Set();
                        return chatHistory?.map((message, index) => {
                          if (displayedMessages.has(message?.content)) {
                            return null;
                          }
                          displayedMessages.add(message?.content);

                          if (message?.sender === activeUser?._id) {
                            return (
                              <div
                                key={index}
                                className="col-start-1 col-end-8 p-1 rounded-lg"
                              >
                                <div className="flex flex-row items-center">
                                  <div className="relative ml-3 text-sm bg-gray-800 text-white py-2 px-4 shadow-sm rounded-xl">
                                    <div>{message?.content}</div>
                                    {message.createdAt && (
                                      <p className="text-white text-xs my-2">
                                        {new Date(
                                          message?.createdAt
                                        ).toLocaleTimeString(undefined, {
                                          hour: "2-digit",
                                          minute: "2-digit",
                                          hour12: true,
                                        })}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          } else if (message?.sender === sender) {
                            return (
                              <div
                                key={index}
                                className="col-start-6 col-end-13 p-1 rounded-lg flex flex-col items-end sm:items-end"
                              >
                                <div className="flex items-center justify-start flex-row-reverse">
                                  <div className="relative mr-3 text-sm bg-gray-600 text-white py-2 px-4 shadow rounded-xl">
                                    <div>{message?.content}</div>
                                    {message.createdAt && (
                                      <p className="text-white text-xs my-2">
                                        {new Date(
                                          message?.createdAt
                                        ).toLocaleTimeString(undefined, {
                                          hour: "2-digit",
                                          minute: "2-digit",
                                          hour12: true,
                                        })}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        });
                      })()}
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center h-10 rounded-xl bg-white w-full mt-4">
                  <div className="flex-grow ml-4 ">
                    <div className="relative w-full">
                      <input
                        type="text"
                        className={`flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10 ${"sm:max-w-full"}`}
                        value={message}
                        placeholder="Your message"
                        onChange={(event) => sendMessage(event)}
                      />
                    </div>
                  </div>
                  <div className="ml-4">
                    <button
                      className="flex items-center justify-center mr-2 sm:mr-10 bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-2 flex-shrink-0"
                      onClick={handleSubmit}
                      style={{ backgroundColor: "#2E2E2E" }}
                    >
                      <span className={"hidden sm:flex"}>Send</span>
                      <span className="ml-2">
                        <svg
                          className="w-4 h-4 transform rotate-45 -mt-px"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          ></path>
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Chat;
