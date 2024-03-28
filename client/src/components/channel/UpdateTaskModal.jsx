import { useState } from "react";
import { Modal, Form, Input, Button, message, DatePicker, Select } from "antd";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { createAndUpdateMilestoneApi } from "../../api/milestone/milestoneApi";

const UpdateTaskModal = ({ channel, change, setChange }) => {
  const { Option } = Select;
  const [modalVisible, setModalVisible] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [confirmLoading, setConfirmLoading] = useState(false);
  console.log(channel);

  const priorities = ["High", "Medium", "Low"];
  const statuses = ["pending", "completed", "accepted"];
  const users = ["User1", "User2", "User3"];

  const info = () => {
    messageApi.success("Task Added Successfully");
  };

  const onFinish = async (values) => {
    const startDate = values.startDate.format();
    const endDate = values.endDate.format();
    const channelData = new FormData();
    channelData.append("name", values.name);
    channelData.append("description", values.description);
    channelData.append("startDate", startDate);
    channelData.append("endDate", endDate);
    channelData.append("project", channel?._id);
    try {
      const data = await createAndUpdateMilestoneApi(channelData);
      console.log(data);
      if (data?.data?.success) {
        info();
        setChange(!change);
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
      <button
        type="button"
        className="timeline-update-btn inline-block rounded p-3 py-1 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]"
        data-twe-ripple-init
        data-twe-ripple-color="light"
        onClick={() => setModalVisible(true)}
      >
        Update
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
            name="status"
            rules={[{ required: true, message: "Please select task status" }]}
          >
            <Select placeholder="Select a status">
              {statuses.map((status) => (
                <Option key={status} value={status}>
                  {status}
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
                <Option key={user} value={user}>
                  {user}
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

export default UpdateTaskModal;
