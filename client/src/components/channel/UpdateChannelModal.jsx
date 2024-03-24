import { useState, useEffect } from "react";
import { Modal, Form, Input, Button, message, DatePicker } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateChannelApi } from "../../api/channel/channelApi";
import { MdEditDocument } from "react-icons/md";

const UpdateChannelModal = ({ channel, change, setChange }) => {
  console.log(channel);
  const [modalVisible, setModalVisible] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const info = () => {
    messageApi.success("Channel Updated Successfully");
  };

  const error = () => {
    messageApi.error("Channel Name already exists");
  };

  const onFinish = async (values) => {
    const channelData = new FormData();
    channelData.append("channel", values.channel);
    try {
      const data = await updateChannelApi(channel?._id, channelData);
      console.log(data);
      if (data?.data?.success) {
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
    setChange(!change);
  };

  return (
    <>
      {contextHolder}
      <span
        href="#"
        className="text-gray-700 text-sm hover:underline text-end mt-1"
        onClick={() => setModalVisible(true)}
      >
        <MdEditDocument style={{ fontSize: "20px", color: "D3B313" }} />
      </span>
      <Modal
        title="Channel Name"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        confirmLoading={confirmLoading}
      >
        <Form onFinish={onFinish}>
          <Form.Item
            name="channel"
            rules={[
              { required: true, message: "Please enter project channel" },
            ]}
            initialValue={channel?.channel}
          >
            <Input placeholder="Project Channel" />
          </Form.Item>

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

export default UpdateChannelModal;
