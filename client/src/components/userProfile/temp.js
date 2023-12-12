import { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { forgotPasswordApi } from "../../api/user/userApi";
const App = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const [modalVisible, setModalVisible] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const info = () => {
    messageApi.info("Please Check Your Email");
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
    onSubmit: (values) => {
      console.log(values.email);
      handleOk(values);
    },
  });

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = async (values) => {
    setModalText("The modal will be closed after two seconds");
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
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal with async logic
      </Button>
      <Modal
        title="Title"
        open={open}
        onOk={formik.handleSubmit}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
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
export default App;
