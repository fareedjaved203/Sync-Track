import { useEffect, useState } from "react";
import { Drawer } from "antd";
import { IoNotifications } from "react-icons/io5";
import { getNotificationApi } from "../../api/notifications/notificationsApi";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Notifications = ({ channel }) => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [notifications, setNotifications] = useState([]);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const showNotifications = async () => {
      console.log(user.data.user.email);
      const data = await getNotificationApi(user.data.user.email);
      console.log(data);
      const reversedData = [...data?.data?.data].reverse();
      setNotifications(reversedData);
    };
    showNotifications();
  }, [channel, id]);
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
            {notifications?.map((item) => (
              <div
                className="flex items-center justify-between bg-gray-100 p-3 rounded-lg"
                key={item?._id}
              >
                <div>
                  <h3 className="text-lg font-semibold">{item?.type}</h3>
                  <p className="text-gray-600">{item?.description}</p>
                </div>
                {/* <span className="text-gray-400">Yesterday</span> */}
              </div>
            ))}
          </div>
        </div>
      </Drawer>
    </>
  );
};
export default Notifications;
