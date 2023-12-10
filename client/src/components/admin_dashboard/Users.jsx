import { useEffect, useState } from "react";
import { Popconfirm, Space, Table, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteUserApi } from "../../api/user/userApi";
import UpdateRoleModal from "./UpdateRoleModal";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>
          <UpdateRoleModal record={record} />
        </a>
        <Popconfirm
          title="Are you sure you want to delete this user?"
          onConfirm={async () => {
            await deleteUserApi(record._id);
            message.success("User Deleted Successfully");
          }}
          okText="Yes"
          cancelText="No"
          okButtonProps={{ style: { backgroundColor: "red" } }}
        >
          <a>
            <DeleteOutlined style={{ fontSize: "20px" }} />
          </a>
        </Popconfirm>
      </Space>
    ),
  },
];
const AllUsers = ({ data }) => {
  const [bottom, setBottom] = useState("bottomRight");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState(data);
  const [showDropdown, setShowDropdown] = useState(false);
  const [users, setUsers] = useState([]);
  const [userCapture, setUserCapture] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    setUsers(data);
  }, [clicked]);

  const handleItemClick = (item) => {
    setSearchQuery(item.email);
    setFilteredItems([item]);
    setShowDropdown(false);
    const selectedUser = users.filter((user) => {
      return user.email === item.email;
    });
    console.log(selectedUser);
    setUsers(selectedUser);
    setUserCapture(!userCapture);
    setSearchQuery("");
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filtered = data?.filter((item) =>
      item.email.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(filtered);
    setShowDropdown(!!query);
  };

  const handleInputClick = () => {
    setClicked(!clicked);
  };

  return (
    <div>
      <div className="flex mt-2 w-100 mb-4">
        <div className="relative block">
          <div className="relative">
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-2 border-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="search user..."
              value={searchQuery}
              onChange={handleSearch}
              onClick={handleInputClick}
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
                            <div className="font-semibold">{user.name}</div>
                            <div className="text-gray-600">{user.email}</div>
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
      <Table
        key={Date.now()}
        columns={columns}
        pagination={{
          position: [bottom],
        }}
        dataSource={users}
      />
    </div>
  );
};
export default AllUsers;
