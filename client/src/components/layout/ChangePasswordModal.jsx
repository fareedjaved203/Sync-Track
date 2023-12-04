import { useState } from "react";
import { Modal, message } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const schema = Yup.object().shape({
  password: Yup.string().required("Old Password is required"),
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .notOneOf(
      [Yup.ref("oldPassword")],
      "Old and new password cannot be the same"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

const ChangePasswordModal = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      info();
    }, 2000);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const [messageApi, contextHolder] = message.useMessage();
  const info = () => {
    messageApi.success("Password Updated Successfully!");
  };
  return (
    <>
      {contextHolder}
      <button
        className="w-40 btn-style mb-2 sm:mb-0 rounded p-1"
        style={{
          backgroundColor: "#2E2E30",
          color: "white",
          fontSize: "15px",
        }}
        onClick={showModal}
      >
        Change Password
      </button>
      <Modal
        title="Change Password"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okButtonProps={{ style: { background: "#4F9E5E", color: "white" } }} // Change background and text color of OK button
        cancelButtonProps={{ style: { background: "#CF4433", color: "white" } }} // Change background and text color of Cancel button
      >
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={schema}
          onSubmit={handleOk}
        >
          <Form>
            <div>
              <label htmlFor="password">Old Password</label>
              <Field
                type="password"
                id="password"
                name="password"
                className="w-full border border-gray-300 rounded py-2 px-3"
              />
              <ErrorMessage
                name="password"
                className="text-red-500 text-xs italic"
              />
            </div>
            <div>
              <label htmlFor="password">New Password</label>
              <Field
                type="password"
                id="newPassword"
                name="newPassword"
                className="w-full border border-gray-300 rounded py-2 px-3"
              />
              <ErrorMessage
                name="newPassword"
                className="text-red-500 text-xs italic"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 font-bold mb-2"
              >
                Confirm Password
              </label>
              <Field
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="w-full border border-gray-300 rounded py-2 px-3"
              />
              <ErrorMessage
                name="confirmPassword"
                className="text-red-500 text-xs italic block"
              />
            </div>
          </Form>
        </Formik>
      </Modal>
    </>
  );
};
export default ChangePasswordModal;
