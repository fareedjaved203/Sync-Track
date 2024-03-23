import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { MdDelete } from "react-icons/md";

const Announcements = () => {
  const [announcement, setAnnouncement] = useState("");

  const handleChange = (value) => {
    setAnnouncement(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle submission logic here
    console.log("Announcement:", announcement);
    // Clear the input after submission if needed
    setAnnouncement("");
  };

  return (
    <div className="p-1 pt-0">
      <h2 className="text-xl font-semibold mb-4">Recent Announcements</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
          <div>
            <h3 className="text-lg font-semibold">New Message</h3>
            <p className="text-gray-600">
              You have received a new message from John Doe.
            </p>
          </div>
          <span className="text-gray-400 cursor-pointer">
            <MdDelete className="w-8 h-8" />
          </span>
        </div>
      </div>

      <form className="mt-4" onSubmit={handleSubmit}>
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
            type="submit"
            className="mt-4 px-4 py-2 text-white rounded-lg bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default Announcements;
