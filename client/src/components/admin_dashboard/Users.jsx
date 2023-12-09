import React, { useState, useEffect } from "react";
import { Popconfirm, Space, Table, message } from "antd";
import { BookOutlined, DeleteOutlined } from "@ant-design/icons";
import { deleteUserApi, getAllUsersApi } from "../../api/user/userApi";
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

  return (
    <div>
      <Table
        columns={columns}
        pagination={{
          position: [bottom],
        }}
        dataSource={data}
      />
    </div>
  );
};
export default AllUsers;
