import { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { Select } from "antd";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { addUserApi } from "../api/channel/channelApi";
import { postNotificationApi } from "../api/notifications/notificationsApi";
import { saveChatApi } from "../api/chat/chatApi";
import { getUserDetailsApi } from "../api/user/userApi";

const AddUser = ({ channelId = "", userEmail = "" }) => {
  let { id } = useParams();
  const [modalVisible, setModalVisible] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [confirmLoading, setConfirmLoading] = useState(false);
  // const [note, setNote] = useState("");
  const [loading, isLoading] = useState(false);
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
      note: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values.email);
      handleOk(values);
    },
  });

  const handleOk = async (values) => {
    setConfirmLoading(true);
    isLoading(true);
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
          `You have a new project invitation, please check your email`
        );
        formData.append("sender", user.data.user.email);
        formData.append("receiver", values.email);
        const notification = await postNotificationApi(formData);

        if (values.note) {
          const chatAlert = new FormData();
          chatAlert.append("type", "information");
          chatAlert.append(
            "description",
            `${user.data.user.email} wants to talk about a project! Check you Inbox`
          );
          chatAlert.append("sender", user.data.user.email);
          chatAlert.append("receiver", values.email);
          const chatNotification = await postNotificationApi(chatAlert);

          const saveChat = new FormData();
          saveChat.append("message", values.note);
          const receiver = await getUserDetailsApi(values.email);

          const chatResponse = await saveChatApi(
            saveChat,
            user.data.user._id,
            receiver.data.user._id
          );
          isLoading(false);
        }
      } else {
        messageApi.error(data?.response?.data?.message);
      }
    } catch (error) {
      messageApi.error(error?.response?.data?.message);
    }
    setConfirmLoading(false);
    isLoading(false);
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
          <Form.Item
            label="Note"
            name="note"
            help={formik.touched.note && formik.errors.note}
            validateStatus={
              formik.touched.note && formik.errors.note ? "error" : ""
            }
          >
            <Input
              type="text"
              {...formik.getFieldProps("note")}
              placeholder="Hey, I want to discuss our project!"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ backgroundColor: "#2E2E2E", color: "white" }}
              loading={loading}
            >
              {loading ? "Sending..." : "Send"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddUser;
