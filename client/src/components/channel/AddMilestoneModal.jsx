import { useState } from "react";
import { Modal, Form, Input, Button, message, DatePicker } from "antd";
import { updateChannelApi } from "../../api/channel/channelApi";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { createAndUpdateTimelineApi } from "../../api/timeline/timelineApi";
import { createAndUpdateMilestoneApi } from "../../api/milestone/milestoneApi";

const AddMilestoneModal = ({ channel, isUpdated, update }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [confirmLoading, setConfirmLoading] = useState(false);
  console.log(channel);

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
    channelData.append("project", channel?._id);
    try {
      const data = await createAndUpdateMilestoneApi(channelData);
      console.log(data);
      if (data?.data?.success) {
        info();
        isUpdated(!update);
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
          >
            <Input placeholder="Project title" />
          </Form.Item>

          <Form.Item
            name="description"
            rules={[
              { required: true, message: "Please enter project description" },
            ]}
          >
            <Input placeholder="Project description" />
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

export default AddMilestoneModal;
