import React, { useState, useEffect } from "react";
import { Modal, Button, message, DatePicker } from "antd";
import { MdEditDocument } from "react-icons/md";

const ShowTaskDetailsModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = async () => {
    setModalVisible(false);
  };

  return (
    <>
      {contextHolder}
      <button
        type="button"
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-info-600 transition duration-300 ease-in-out"
        onClick={() => setModalVisible(true)}
      >
        More Details
      </button>
      <Modal
        title="Task Details"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button
            key="submit"
            type="primary"
            loading={confirmLoading}
            onClick={handleOk}
          >
            Update
          </Button>,
        ]}
      >
        <div className="mb-4">
          <p className="text-lg font-semibold mb-1">Project Name:</p>
          <p className="text-gray-800">Sample Project</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-semibold mb-1">Task Name:</p>
          <p className="text-gray-800">Sample Task</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-semibold mb-1">Detailed Description:</p>
          <p className="text-gray-800">
            This is a sample description for the task.
          </p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-semibold mb-1">Status:</p>
          <p className="text-green-600 font-semibold">Completed</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-semibold mb-1">Assigned To:</p>
          <p className="text-blue-600">John Doe</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-semibold mb-1">Start Date:</p>
          <p className="text-gray-800">2023-01-01</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-semibold mb-1">End Date:</p>
          <p className="text-gray-800">2023-01-15</p>
        </div>
      </Modal>
    </>
  );
};

export default ShowTaskDetailsModal;
