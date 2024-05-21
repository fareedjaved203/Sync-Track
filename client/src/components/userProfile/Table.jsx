import { SearchOutlined } from "@ant-design/icons";
import React, { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, Table, Tag } from "antd";
const data = [
  {
    key: "1",
    channel: "TMUC",
    project: "E-commerce",
    role: "Tester",
    status: "working",
  },
  {
    key: "2",
    channel: "Expo Channel",
    project: "Expo Project",
    role: "Developer",
    status: "approved",
  },
  {
    key: "3",
    channel: "Three Ways",
    project: "AirShift Project",
    role: "Developer",
    status: "approved",
  },
  {
    key: "4",
    channel: "TKR",
    project: "Property App",
    role: "Team Lead",
    status: "disapproved",
  },
  {
    key: "5",
    channel: "NEECA",
    project: "Power Project",
    role: "Developer",
    status: "approved",
  },
];
const UserTable = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "Channel",
      dataIndex: "channel",
      key: "channel",
      width: "30%",
      ...getColumnSearchProps("channel"),
    },
    {
      title: "Project",
      dataIndex: "project",
      key: "project",
      width: "20%",
      ...getColumnSearchProps("project"),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      ...getColumnSearchProps("role"),
      sorter: (a, b) => a.role.length - b.role.length,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => {
        let color;
        switch (text) {
          case "approved":
            color = "green";
            break;
          case "disapproved":
            color = "red";
            break;
          case "working":
            color = "blue";
            break;
          default:
            color = "gray";
        }
        return <Tag color={color}>{text}</Tag>;
      },
    },
  ];
  return <Table columns={columns} dataSource={data} />;
};
export default UserTable;
