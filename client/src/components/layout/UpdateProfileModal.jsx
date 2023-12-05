import { useState } from "react";
import { Modal, message } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { updateProfileApi } from "../../api/user/userApi";

const schema = Yup.object().shape({
  name: Yup.string()
    .min(4, "Name must be at least 4 characters")
    .required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});
const UpdateProfileModal = ({ user }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);

  const showModal = () => {
    setOpen(true);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("avatar", avatar);
    updateProfileApi(formData)
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
    messageApi.success("Profile Updated Successfully!");
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
        Update Profile
      </button>
      <Modal
        title="Update Profile"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okButtonProps={{ style: { background: "#4F9E5E", color: "white" } }} // Change background and text color of OK button
        cancelButtonProps={{ style: { background: "#CF4433", color: "white" } }} // Change background and text color of Cancel button
      >
        <Formik
          initialValues={{ name: user?.name, email: user?.email }}
          validationSchema={schema}
          onSubmit={handleOk}
        >
          <Form>
            <div>
              <label htmlFor="image" className="block mb-2">
                Image
              </label>
              <div className="flex items-center">
                <label htmlFor="image" className="cursor-pointer mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <span>{image ? image.name : "Choose file"}</span>
              </div>
              {image && (
                <div className="mt-2">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Selected Image"
                    className="w-32 h-32 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setImage(null)}
                    className="block mt-2 text-red-500"
                  >
                    Remove Image
                  </button>
                </div>
              )}
              <ErrorMessage name="image" className="text-red-500" />
            </div>
            <div>
              <label htmlFor="name">Name</label>
              <Field
                type="text"
                id="name"
                name="name"
                value={name}
                className="w-full border border-gray-300 rounded py-2 px-3"
                onChange={(e) => setName(e.target.value)}
              />
              <ErrorMessage name="name" className="text-red-500" />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                id="email"
                name="email"
                value={email}
                className="w-full border border-gray-300 rounded py-2 px-3"
                onChange={(e) => setEmail(e.target.value)}
              />
              <ErrorMessage name="email" className="text-red-500" />
            </div>
          </Form>
        </Formik>
      </Modal>
    </>
  );
};
export default UpdateProfileModal;
