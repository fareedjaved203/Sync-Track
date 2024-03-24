import { useState } from "react";
import { Modal, Form, Input, Button, message, DatePicker } from "antd";
import moment from "moment";
import { updateTimelineApi } from "../../api/timeline/timelineApi";

const UpdateTimelineModal = ({ channel, isUpdated, update, id }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const info = () => {
    messageApi.success("Timeline Added Successfully");
  };

  const onFinish = async (values) => {
    const startDate = values.startDate.format();
    const endDate = values.endDate.format();
    const channelData = new FormData();
    channelData.append("title", values.title);
    channelData.append("description", values.description);
    channelData.append("startDate", startDate);
    channelData.append("endDate", endDate);
    channelData.append("project", id);
    try {
      const data = await updateTimelineApi(channel?._id, channelData);
      console.log(data);
      if (data?.data?.success) {
        isUpdated(!update);
        info();
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
        title="Channel Name"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        confirmLoading={confirmLoading}
      >
        <Form onFinish={onFinish}>
          <Form.Item
            name="title"
            rules={[{ required: true, message: "Please enter project title" }]}
            initialValue={channel?.title}
          >
            <Input placeholder="Project title" />
          </Form.Item>

          <Form.Item
            name="description"
            rules={[
              { required: true, message: "Please enter project description" },
            ]}
            initialValue={channel?.description}
          >
            <Input placeholder="Project description" />
          </Form.Item>

          <Form.Item
            name="startDate"
            rules={[{ required: true, message: "Please select start date" }]}
            initialValue={moment(channel?.startDate)}
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
            initialValue={moment(channel?.endDate)}
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

export default UpdateTimelineModal;
