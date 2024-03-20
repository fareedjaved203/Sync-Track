import React, { useState } from "react";
import { Button, Drawer } from "antd";
import { IoNotifications } from "react-icons/io5";

const Notifications = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <span onClick={showDrawer}>
        <IoNotifications
          style={{
            fontSize: "25px",
            color: "white",
            marginRight: "5px",
            cursor: "pointer",
          }}
        />
      </span>
      <Drawer title="Notifications" onClose={onClose} open={open}>
        <div className="p-1 pt-0">
          <h2 className="text-xl font-semibold mb-4">Recent Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
              <div>
                <h3 className="text-lg font-semibold">New Message</h3>
                <p className="text-gray-600">
                  You have received a new message from John Doe.
                </p>
              </div>
              <span className="text-gray-400">Just now</span>
            </div>
            <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
              <div>
                <h3 className="text-lg font-semibold">Reminder</h3>
                <p className="text-gray-600">
                  Your meeting with Jane Doe is scheduled for tomorrow.
                </p>
              </div>
              <span className="text-gray-400">Yesterday</span>
            </div>
            <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
              <div>
                <h3 className="text-lg font-semibold">New Comment</h3>
                <p className="text-gray-600">Someone commented on your post.</p>
              </div>
              <span className="text-gray-400">2 days ago</span>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};
export default Notifications;
