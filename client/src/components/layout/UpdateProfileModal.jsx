import { useState } from "react";
import { Modal, message } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { updateProfileApi } from "../../api/user/userApi";
import validator from "validator";

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const UpdateProfileModal = ({ user }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [description, setDescription] = useState(user?.description);
  const [degree, setDegree] = useState(user?.degree);
  const [university, setUniversity] = useState(user?.university);

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
    formData.append("description", description);
    formData.append("degree", degree);
    formData.append("university", university);
    console.log(university);
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
              {name.length < 4 && (
                <div style={{ color: "red" }}>
                  {" "}
                  Name must be minimum 4 characters{" "}
                </div>
              )}
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
              {!validator.isEmail(email) && (
                <div style={{ color: "red" }}>Provide Valid Email</div>
              )}
            </div>

            <div>
              <label htmlFor="description">Description</label>
              <Field
                as="textarea"
                id="description"
                name="description"
                value={description}
                className="w-full border border-gray-300 rounded py-2 px-3"
                onChange={(e) => setDescription(e.target.value)}
              />
              {description?.length < 10 && (
                <div style={{ color: "red" }}>
                  Description must be minimum 10 characters
                </div>
              )}
            </div>
            <div>
              <label htmlFor="university">University</label>
              <Field
                type="text"
                id="university"
                name="university"
                value={university}
                className="w-full border border-gray-300 rounded py-2 px-3"
                onChange={(e) => setUniversity(e.target.value)}
              />
              {university?.length < 4 && (
                <div style={{ color: "red" }}>
                  University must be minimum 4 characters
                </div>
              )}
            </div>

            <div>
              <label htmlFor="degree">Degree</label>
              <Field
                type="text"
                id="degree"
                name="degree"
                value={degree}
                className="w-full border border-gray-300 rounded py-2 px-3"
                onChange={(e) => setDegree(e.target.value)}
              />
              {degree?.length < 2 && (
                <div style={{ color: "red" }}>
                  Degree must be minimum 2 characters
                </div>
              )}
            </div>
          </Form>
        </Formik>
      </Modal>
    </>
  );
};
export default UpdateProfileModal;
