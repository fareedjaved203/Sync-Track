import { useState } from "react";
import { Modal, Form, Input, Button, message, Rate } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  concludeTeamMemberApi,
  removeTeamMemberApi,
} from "../../api/team/teamApi";

const GiveFeedBackModal = ({
  generatePdf,
  userId,
  channelId,
  email,
  type = "conclude",
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    feedback: Yup.string().required("Feedback is mandatory"),
    rating: Yup.string().required("Feedback is mandatory"),
  });

  const formik = useFormik({
    initialValues: {
      feedback: "",
      rating: 0,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      handleOk(values);
    },
  });

  const handleOk = async (values) => {
    setConfirmLoading(true);
    try {
      console.log(values.rating);
      const formData = new FormData();
      formData.append("feedback", values.feedback);
      formData.append("email", email);
      formData.append("rating", values.rating);
      console.log(values.feedback);
      if (type == "conclude") {
        const data = await concludeTeamMemberApi(channelId, userId, formData);
        console.log(data);
      } else {
        const data = await removeTeamMemberApi(channelId, userId, formData);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
      messageApi.error(error);
    }
    setConfirmLoading(false);
    setModalVisible(false);
    generatePdf(type);
  };

  const pdf = () => {
    setModalVisible(true);
  };

  return (
    <>
      {contextHolder}
      {type == "conclude" ? (
        <button
          className="text-white py-1 px-2 rounded"
          style={{ backgroundColor: "green" }}
          onClick={pdf}
        >
          Conclude
        </button>
      ) : (
        <button
          className="text-white py-1 px-2 rounded"
          style={{ backgroundColor: "red" }}
          onClick={pdf}
        >
          Remove
        </button>
      )}

      <Modal
        title="Conclude User"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        confirmLoading={confirmLoading}
        onOk={formik.handleSubmit}
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
          <Form.Item
            label="Rating"
            name="rating"
            help={formik.touched.rating && formik.errors.rating}
            validateStatus={
              formik.touched.rating && formik.errors.rating ? "error" : ""
            }
          >
            <Rate
              value={formik.values.rating}
              onChange={(value) => formik.setFieldValue("rating", value)}
            />
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
