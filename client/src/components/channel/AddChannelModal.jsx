import { useState } from "react";
import { Modal, Form, Input, Button, message, DatePicker } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createChannelApi } from "../../api/channel/channelApi";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51PIqNl2MgcnDTdrwhZMornSg1DPdvOV3gOTDMDJXL1irIPvs4SnNxJwK2UICQTDoNrcsH92R8Sgak4tKb0nOs08U00AZrjp0n4"
);

const AddChannelModal = ({ change, setChange }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const info = () => {
    messageApi.success("Channel Created Successfully");
  };

  const error = () => {
    messageApi.error("Channel Name already exists");
  };

  const validationSchema = Yup.object().shape({
    channel: Yup.string().required("Name is required"),
    name: Yup.string().required("Project name is required"),
    description: Yup.string().required("Project description is required"),
  });

  const formik = useFormik({
    initialValues: {
      channel: "",
      name: "",
      description: "",
      startDate: "",
      endDate: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      handleOk(values);
    },
  });

  const handleOk = async (values) => {
    setConfirmLoading(true);
    try {
      const payment = localStorage.getItem("payment");
      if (!payment) {
        return messageApi.error("Please complete the payment");
      }
      const channelData = new FormData();
      for (const key in values) {
        channelData.append(key, values[key]);
      }
      const data = await createChannelApi(channelData);
      console.log(data);
      if (data) {
        info();
      } else {
        error();
      }
    } catch (error) {
      error();
    }
    setConfirmLoading(false);
    setModalVisible(false);
    setChange(!change);
  };

  return (
    <>
      {contextHolder}
      <a
        href="#"
        className="text-gray-700 text-sm hover:underline text-end mt-1"
        onClick={() => setModalVisible(true)}
      >
        Channel
      </a>
      <Modal
        title="Channel Name"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        confirmLoading={confirmLoading}
        onOk={formik.handleSubmit} // Call formik's submit function on OK
      >
        <Form onFinish={formik.handleSubmit}>
          <Form.Item
            name="channel"
            help={formik.touched.channel && formik.errors.channel}
            validateStatus={
              formik.touched.channel && formik.errors.channel ? "error" : ""
            }
          >
            <Input type="text" {...formik.getFieldProps("channel")} />
          </Form.Item>
          <h2>Project Description</h2>
          <Form.Item
            name="name"
            help={formik.touched.name && formik.errors.name}
            validateStatus={
              formik.touched.name && formik.errors.name ? "error" : ""
            }
          >
            <Input
              type="text"
              {...formik.getFieldProps("name")}
              placeholder="Project Name"
            />
          </Form.Item>
          <Form.Item
            name="description"
            help={formik.touched.description && formik.errors.description}
            validateStatus={
              formik.touched.description && formik.errors.description
                ? "error"
                : ""
            }
          >
            <Input
              type="text"
              {...formik.getFieldProps("description")}
              placeholder="Project Description"
            />
          </Form.Item>
          <Form.Item
            name="startDate"
            help={formik.touched.startDate && formik.errors.startDate}
            validateStatus={
              formik.touched.startDate && formik.errors.startDate ? "error" : ""
            }
          >
            <DatePicker
              {...formik.getFieldProps("startDate")}
              placeholder="Start Date"
              format="YYYY-MM-DD"
              onChange={(value) => {
                formik.setFieldValue(
                  "startDate",
                  value ? value.format("YYYY-MM-DD") : ""
                );
              }}
            />
          </Form.Item>
          <Form.Item
            name="endDate"
            help={formik.touched.endDate && formik.errors.endDate}
            validateStatus={
              formik.touched.endDate && formik.errors.endDate ? "error" : ""
            }
          >
            <DatePicker
              {...formik.getFieldProps("endDate")}
              placeholder="End Date"
              format="YYYY-MM-DD"
              onChange={(value) => {
                formik.setFieldValue(
                  "endDate",
                  value ? value.format("YYYY-MM-DD") : ""
                );
              }}
            />
          </Form.Item>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
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

export default AddChannelModal;
