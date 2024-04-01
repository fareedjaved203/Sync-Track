import { useState, useEffect } from "react";
import { Modal, Form, Input, Button, message, DatePicker, Select } from "antd";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import { createAndUpdateMilestoneApi } from "../../api/milestone/milestoneApi";
import { getAllUsersApi } from "../../api/user/userApi";
import { postTaskApi } from "../../api/task/taskApi";
import { postNotificationApi } from "../../api/notifications/notificationsApi";

const AddTaskModal = ({ channel, change, setChange }) => {
  const { Option } = Select;
  const [modalVisible, setModalVisible] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);

  const priorities = ["high", "medium", "low"];

  const info = () => {
    messageApi.success("Task Added Successfully");
  };

  useEffect(() => {
    getAllUsersApi().then((data) => {
      const store = data?.data?.users;
      if (Array.isArray(store)) {
        let filteredUsers = store.filter(
          (user) => user.email !== "admin@gmail.com"
        );
        filteredUsers = filteredUsers.filter((user) => {
          return channel?.users?.some((addedUser) => {
            return addedUser?.user == user?._id;
          });
        });
        const searchItems = [...filteredUsers];
        setUsers(searchItems);
      }
    });
  }, []);

  const onFinish = async (values) => {
    console.log(values);
    const startDate = values.startDate.format();
    const endDate = values.endDate.format();
    const channelData = new FormData();
    channelData.append("name", values.name);
    channelData.append("description", values.description);
    channelData.append("startDate", startDate);
    channelData.append("endDate", endDate);
    channelData.append("priority", values.priority);
    channelData.append("project", channel?._id);
    channelData.append("assigned_to", values.assigned_to);
    channelData.append("assigned_by", user?.data?.user?._id);
    try {
      const data = await postTaskApi(channelData);
      console.log(data);
      if (data?.data?.success) {
        info();
        setChange(!change);
        const formData = new FormData();
        formData.append("type", "reminder");
        formData.append(
          "description",
          `New Task ${values.name} Added in ${channel?.name}`
        );
        formData.append("project", channel?.name);
        formData.append("sender", user.data.user.email);
        formData.append("receiver", values.assigned_to);
        const notification = await postNotificationApi(formData);
        console.log(notification);
      } else {
        messageApi.error(data.response?.data?.message);
      }
    } catch (error) {
      console.log(error);
      messageApi.error(error.response?.data?.message);
    }
    setConfirmLoading(false);
    setModalVisible(false);
  };

  return (
    <>
      {contextHolder}
      <button type="button" onClick={() => setModalVisible(true)}>
        <MdOutlineAddCircleOutline className="w-10 h-10" />
      </button>
      <Modal
        title="Task"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        confirmLoading={confirmLoading}
      >
        <Form onFinish={onFinish}>
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please enter task name" }]}
          >
            <Input placeholder="Task Name" />
          </Form.Item>

          <Form.Item
            name="description"
            rules={[
              { required: true, message: "Please enter task description" },
            ]}
          >
            <Input placeholder="Task description" />
          </Form.Item>

          <Form.Item
            name="priority"
            rules={[{ required: true, message: "Please select task priority" }]}
          >
            <Select placeholder="Select a priority">
              {priorities.map((priority) => (
                <Option key={priority} value={priority}>
                  {priority}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="assigned_to"
            rules={[{ required: true, message: "Please select a user" }]}
          >
            <Select placeholder="Select a user">
              {users.map((user) => (
                <Option key={user?._id} value={user?.email}>
                  {user?.email}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="startDate"
            rules={[{ required: true, message: "Please select start date" }]}
          >
            <DatePicker
              placeholder="Start Date"
              showTime
              format="YYYY-MM-DD HH:mm:ss"
            />
          </Form.Item>

          <Form.Item
            name="endDate"
            rules={[{ required: true, message: "Please select end date" }]}
          >
            <DatePicker
              placeholder="End Date"
              showTime
              format="YYYY-MM-DD HH:mm:ss"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ backgroundColor: "#2E2E2E", color: "white" }}
            >
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddTaskModal;
