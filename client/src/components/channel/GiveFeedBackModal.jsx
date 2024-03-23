import { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { Select } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";

const GiveFeedBackModal = ({ generatePdf }) => {
  let { id } = useParams();
  const [modalVisible, setModalVisible] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { Option } = Select;

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
    // try {
    //   const formData = new FormData();
    //   formData.append("email", values.email);
    //   formData.append("role", values.role);
    //   const data = await addUserApi(id, formData);
    //   if (!data.error) {
    //     info();
    //   } else {
    //     messageApi.error(data.error);
    //   }
    //   console.log(data);
    // } catch (error) {
    //   console.log(error);
    //   messageApi.error(data?.error);
    // }
    setConfirmLoading(false);
    setModalVisible(false);
    generatePdf();
  };

  const pdf = () => {
    setModalVisible(true);
  };

  return (
    <>
      {contextHolder}
      <button
        className="text-white py-1 px-2 rounded"
        style={{ backgroundColor: "green" }}
        onClick={pdf}
      >
        Conclude
      </button>
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

export default GiveFeedBackModal;
