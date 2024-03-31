import { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { Select } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { concludeTeamMemberApi } from "../../api/team/teamApi";

const GiveFeedBackModal = ({ generatePdf, userId, channelId, email }) => {
  let { id } = useParams();
  const [modalVisible, setModalVisible] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { Option } = Select;

  const validationSchema = Yup.object().shape({
    feedback: Yup.string().required("Feedback is mandatory"),
  });

  const formik = useFormik({
    initialValues: {
      feedback: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      handleOk(values);
    },
  });

  const handleOk = async (values) => {
    setConfirmLoading(true);
    try {
      const formData = new FormData();
      formData.append("feedback", values.feedback);
      formData.append("email", email);
      console.log(values.feedback);
      const data = await concludeTeamMemberApi(channelId, userId, formData);
      console.log(data);
    } catch (error) {
      console.log(error);
      messageApi.error(error);
    }
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
            label="feedback"
            name="feedback"
            help={formik.touched.feedback && formik.errors.feedback}
            validateStatus={
              formik.touched.feedback && formik.errors.feedback ? "error" : ""
            }
          >
            <Input type="text" {...formik.getFieldProps("feedback")} />
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
