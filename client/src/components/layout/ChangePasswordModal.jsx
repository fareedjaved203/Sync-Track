import { useState } from "react";
import { Modal, message } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { updatePasswordApi } from "../../api/user/userApi";

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

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMistmatch, setPasswordMismatch] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    if (newPassword !== confirmPassword) {
      setPasswordMismatch(true);
      return;
    }
    setConfirmLoading(true);

    const myForm = new FormData();

    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);
    updatePasswordApi(myForm)
      .then(() => {
        setOpen(false);
        setConfirmLoading(false);
        info();
      })
      .catch((error) => {
        console.log(error);
      });
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
              <label htmlFor="password">New Password</label>
              <Field
                type="password"
                id="newPassword"
                name="newPassword"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border border-gray-300 rounded py-2 px-3"
              />
              {newPassword.length < 8 && (
                <>
                  <div style={{ color: "red" }}>
                    Password must be minimum 8 characters
                  </div>
                </>
              )}
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
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-300 rounded py-2 px-3"
              />
              {passwordMistmatch && (
                <>
                  <div style={{ color: "red" }}>Passwords do not match</div>
                </>
              )}
            </div>
          </Form>
        </Formik>
      </Modal>
    </>
  );
};
export default ChangePasswordModal;
