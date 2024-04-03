import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { MdDelete } from "react-icons/md";
import {
  deleteAnnouncementsApi,
  getAllAnnouncementsApi,
  postAnnouncementApi,
} from "../api/announcement/announcementApi";
import { useSelector } from "react-redux";

const Announcements = ({ channel }) => {
  const user = useSelector((state) => state.user);
  const [announcement, setAnnouncement] = useState("");
  const [announce, setAnnounce] = useState([]);
  const [update, isUpdate] = useState(false);
  const [projectManager, setProjectManager] = useState(false);

  const handleChange = (value) => {
    setAnnouncement(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("description", announcement);
    formData.append("project", channel?._id);
    formData.append("user", user.data?.user?.email);
    const data = await postAnnouncementApi(formData);
    if (data) {
      isUpdate(!update);
    }
    setAnnouncement("");
  };
  useEffect(() => {
    if (user.data?.user?._id == channel?.creator) {
      setProjectManager(true);
    }
    [channel];
  });

  useEffect(() => {
    const getAnnouncements = async () => {
      const data = await getAllAnnouncementsApi(channel?._id);
      console.log(data);
      setAnnounce(data?.data?.data);
    };
    getAnnouncements();
  }, [update, channel]);

  const removeData = async (id) => {
    await deleteAnnouncementsApi(id);
    isUpdate(!update);
  };

  return (
    <div className="p-1 pt-0">
      <h2 className="text-xl font-semibold mb-4">Recent Announcements</h2>
      <div className="space-y-4">
        {announce.map((item) => (
          <div
            className="flex items-center justify-between bg-gray-600 p-3 rounded-lg"
            key={item?._id}
          >
            <div>
              <div
                className="text-white"
                dangerouslySetInnerHTML={{ __html: item?.description }}
              />
            </div>
            {projectManager && (
              <>
                <span className="text-gray-400 cursor-pointer">
                  <MdDelete
                    className="w-8 h-8"
                    onClick={() => removeData(item?._id)}
                  />
                </span>
              </>
            )}
          </div>
        ))}
      </div>

      {projectManager && (
        <>
          <div className="mt-4">
            <div className="bg-gray-100 p-4 rounded-lg">
              <label className="block text-lg font-semibold mb-2">
                Add Announcement
              </label>
              <div className="quill-container bg-white border border-gray-300 rounded-lg">
                <ReactQuill
                  value={announcement}
                  onChange={handleChange}
                  className="quill-editor"
                />
              </div>
              <button
                className="mt-4 px-4 py-2 text-white rounded-lg bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                onClick={handleSubmit}
              >
                Post
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Announcements;
