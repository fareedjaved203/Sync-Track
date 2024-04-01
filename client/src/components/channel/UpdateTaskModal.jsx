import { useState, useEffect } from "react";
import { Modal, Form, Input, Button, message, Select } from "antd";
import { useSelector } from "react-redux";
import { getAllUsersApi } from "../../api/user/userApi";
import { updateTaskApi } from "../../api/task/taskApi";
import { postNotificationApi } from "../../api/notifications/notificationsApi";

const UpdateTaskModal = ({ channel, change, setChange, task }) => {
  const { Option } = Select;
  const [modalVisible, setModalVisible] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [projectManager, setProjectManager] = useState(false);

  const priorities = ["high", "medium", "low"];
  const statusListManager = ["pending", "completed", "accepted", "revision"];
  const statusList = ["pending", "completed"];

  const info = () => {
    messageApi.success("Task Updated Successfully");
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
  }, [channel]);

  useEffect(() => {
    if (user.data.user._id == channel?.creator) {
      setProjectManager(true);
    }
  }, [channel]);

  const onFinish = async (values) => {
    console.log(values);
    const channelData = new FormData();
    if (projectManager) {
      channelData.append("name", values.name);
      channelData.append("description", values.description);
      channelData.append("priority", values.priority);
      channelData.append("feedback", values.feedback);
      channelData.append("assigned_to", values.assigned_to);
    }
    channelData.append("status", values.status);
    try {
      const data = await updateTaskApi(task?._id, channelData);
      console.log(data);
      if (data?.data?.success) {
        info();
        setChange(!change);
        const formData = new FormData();
        formData.append("type", "improvement");
        formData.append(
          "description",
          `Task ${values.name} Updated in ${channel?.name}`
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
          {projectManager ? (
            <>
              <Form.Item
                name="name"
                rules={[{ required: true, message: "Please enter task name" }]}
                initialValue={task?.name}
              >
                <Input placeholder="Task Name" />
              </Form.Item>

              <Form.Item
                name="description"
                rules={[
                  { required: true, message: "Please enter task description" },
                ]}
                initialValue={task?.description}
              >
                <Input placeholder="Task description" />
              </Form.Item>

              <Form.Item
                name="priority"
                rules={[
                  { required: true, message: "Please select task priority" },
                ]}
                initialValue={task?.priority}
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
                initialValue={task?.assigned_to}
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
                name="feedback"
                rules={[
                  { required: true, message: "Please enter task feedback" },
                ]}
                initialValue={task?.feedback}
              >
                <Input placeholder="Task feedback" />
              </Form.Item>

              <Form.Item
                name="status"
                rules={[
                  { required: true, message: "Please select task status" },
                ]}
                initialValue={task?.status}
              >
                <Select placeholder="Select a status">
                  {statusListManager.map((status) => (
                    <Option key={status} value={status}>
                      {status}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </>
          ) : (
            <>
              <Form.Item
                name="status"
                rules={[
                  { required: true, message: "Please select task status" },
                ]}
                initialValue={task?.status}
              >
                <Select placeholder="Select a status">
                  {statusList.map((status) => (
                    <Option key={status} value={status}>
                      {status}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </>
          )}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ backgroundColor: "#2E2E2E", color: "white" }}
            >
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateTaskModal;
