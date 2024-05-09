import { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { Select } from "antd";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { addUserApi } from "../api/channel/channelApi";
import { postNotificationApi } from "../api/notifications/notificationsApi";

const AddUser = ({ channelId = "", userEmail = "" }) => {
  let { id } = useParams();
  const [modalVisible, setModalVisible] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const user = useSelector((state) => state.user);

  const { Option } = Select;

  const info = () => {
    messageApi.success("Invite Sent!");
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      role: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values.email);
      handleOk(values);
    },
  });

  const handleOk = async (values) => {
    setConfirmLoading(true);
    try {
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("role", values.role);
      let data;
      if (channelId) {
        data = await addUserApi(channelId, formData);
      } else {
        data = await addUserApi(id, formData);
      }
      if (data?.data?.success) {
        info();
        const formData = new FormData();
        formData.append("type", "information");
        formData.append(
          "description",
          `You have a new invitation, please check your email`
        );
        formData.append("sender", user.data.user.email);
        formData.append("receiver", values.email);
        const notification = await postNotificationApi(formData);
        console.log(notification);
      } else {
        messageApi.error(data?.response?.data?.message);
      }
    } catch (error) {
      messageApi.error(error?.response?.data?.message);
    }
    setConfirmLoading(false);
    setModalVisible(false);
  };

  return (
    <>
      {contextHolder}
      <Button
        style={{ backgroundColor: "green", color: "white" }}
        onClick={() => setModalVisible(true)}
      >
        Add User
      </Button>
      <Modal
        title="Channel Invitation"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        confirmLoading={confirmLoading}
        onOk={formik.handleSubmit}
      >
        <Form onFinish={formik.handleSubmit}>
          <Form.Item
            label="Email"
            name="email"
            help={formik.touched.email && formik.errors.email}
            initialValue={userEmail}
            validateStatus={
              formik.touched.email && formik.errors.email ? "error" : ""
            }
          >
            <Input type="email" {...formik.getFieldProps("email")} />
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            help={formik.touched.role && formik.errors.role}
            validateStatus={
              formik.touched.role && formik.errors.role ? "error" : ""
            }
          >
            <Select
              placeholder="Select a role"
              onChange={(value) => formik.setFieldValue("role", value)}
              value={formik.values.role}
            >
              <Option value="tester">Tester</Option>
              <Option value="developer">Developer</Option>
              <Option value="team_lead">Team Lead</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ backgroundColor: "#2E2E2E", color: "white" }}
            >
              Send
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddUser;
