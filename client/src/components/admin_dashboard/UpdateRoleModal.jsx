import React, { useState } from "react";
import { Modal, Form, Select, message } from "antd";
import { BookOutlined } from "@ant-design/icons";
import { updateUserApi } from "../../api/user/userApi";

const { Option } = Select;

const UpdateRoleModal = ({ record }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [role, setRole] = useState(record?.role);

  const handleOk = async () => {
    record.role = role;
    await updateUserApi(record?._id, record);
    setIsModalVisible(false);
    message.success("User Role Changed Successfully");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <a onClick={() => setIsModalVisible(true)}>
        <BookOutlined style={{ fontSize: "20px" }} />
      </a>
      <Modal
        title="Update User Role"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ style: { backgroundColor: "green" } }}
      >
        <Form layout="vertical">
          <Form.Item label="Role">
            <Select
              value={role}
              onChange={(value) => setRole(value)}
              style={{ width: "100%" }}
              defaultValue={role} // Set the current role as the default value
            >
              <Option value="user">User</Option>
              <Option value="admin">Admin</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateRoleModal;
