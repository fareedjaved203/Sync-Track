import { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { forgotPasswordApi } from "../api/user/userApi";

const AddUser = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const info = () => {
    messageApi.success("Invite Sent!");
  };

  const error = () => {
    messageApi.error("Email Not Found");
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
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
      const data = await forgotPasswordApi(values.email);
      if (data) {
        info();
      } else {
        error();
      }
    } catch (error) {
      console.log(error);
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
        onOk={formik.handleSubmit} // Call formik's submit function on OK
      >
        <Form onFinish={formik.handleSubmit}>
          <Form.Item
            label="Email"
            name="email"
            help={formik.touched.email && formik.errors.email}
            validateStatus={
              formik.touched.email && formik.errors.email ? "error" : ""
            }
          >
            <Input type="email" {...formik.getFieldProps("email")} />
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
