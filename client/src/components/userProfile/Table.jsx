import { SearchOutlined } from "@ant-design/icons";
import React, { useRef, useState, useEffect } from "react";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, Table, Tag } from "antd";
import { useParams } from "react-router-dom";
import { getUserDetailsApi } from "../../api/user/userApi";

const UserTable = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const params = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getRatings = async () => {
      const ratings = await getUserDetailsApi(params?.user);

      const filteredData = ratings.data.user.channels.map((channel) => {
        return {
          id: channel._id,
          channel: channel.channel,
          project: channel.name,
          users: channel.users.filter((user) => {
            console.log(user);
            return user.user.email == params?.user;
          }),
        };
      });

      console.log(filteredData);

      const tableData = filteredData.map((data) => {
        return {
          id: data.id,
          channel: data.channel,
          project: data.project,
          role: data.users[0]?.role,
          status: data.users[0]?.status,
        };
      });

      console.log(tableData);
      setData(tableData);
    };
    getRatings();
  }, []);

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
  return (
    <>
      {data.length > 0 ? (
        <Table columns={columns} dataSource={data} />
      ) : (
        <div class="flex justify-center items-center w-full h-full">
          <div class="text-lg font-bold text-gray-700 p-4 rounded-lg">
            No Previous Record Available
          </div>
        </div>
      )}
    </>
  );
};
export default UserTable;
