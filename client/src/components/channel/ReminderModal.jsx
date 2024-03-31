import { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { createAndUpdateMilestoneApi } from "../../api/milestone/milestoneApi";

const ReminderModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const info = () => {
    messageApi.success("Task Added Successfully");
  };

  // const onFinish = async (values) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("type", "reminder");
  //     formData.append(
  //       "description",
  //       `Task ${values.name} Updated in ${channel?.name}`
  //     );
  //     formData.append("project", channel?.name);
  //     formData.append("sender", user.data.user.email);
  //     formData.append("receiver", values.assigned_to);
  //     const notification = await postNotificationApi(formData);
  //     console.log(data);
  //     if (data?.data?.success) {
  //       info();
  //     } else {
  //       messageApi.error(data.response?.data?.message);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     messageApi.error(error.response?.data?.message);
  //   }
  //   setConfirmLoading(false);
  //   setModalVisible(false);
  // };

  return (
    <>
      {contextHolder}
      <button
        type="button"
        className="mt-2 bg-red-600 inline-block rounded p-3 py-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]"
        data-twe-ripple-init
        data-twe-ripple-color="light"
        onClick={() => setModalVisible(true)}
      >
        Set Reminder
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
            name="description"
            rules={[
              { required: true, message: "Please enter task description" },
            ]}
          >
            <Input placeholder="Task description" />
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

export default ReminderModal;
