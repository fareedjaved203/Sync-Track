import { useState, useEffect } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateChannelApi } from "../../api/channel/channelApi";
import { MdEditDocument } from "react-icons/md";

const UpdateProjectModal = ({ channel }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [confirmLoading, setConfirmLoading] = useState(false);
  console.log(channel);

  const onFinish = (values) => {
    console.log("Received values:", values);
    // Handle form submission here
  };

  return (
    <>
      {contextHolder}
      <button
        className="text-gray-700 hover:text-gray-900"
        onClick={() => setModalVisible(true)}
      >
        <MdEditDocument className="w-6 h-6" />{" "}
      </button>
      <Modal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        confirmLoading={confirmLoading}
      >
        <div>
          <Form name="project_form" onFinish={onFinish} layout="vertical">
            <h2 className="mb-2 text-lg font-bold">Project Name</h2>
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please enter project name" }]}
              initialValue={channel?.name}
            >
              <Input placeholder="Project Name" />
            </Form.Item>
            <h2 className="mb-2 text-lg font-bold">Project Description</h2>
            <Form.Item
              name="description"
              rules={[
                { required: true, message: "Please enter project description" },
              ]}
              initialValue={channel?.description}
            >
              <Input.TextArea placeholder="Project Description" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-gray-800 text-white"
              >
                Update
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default UpdateProjectModal;
