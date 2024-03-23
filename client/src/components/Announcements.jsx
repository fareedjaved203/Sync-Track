const Announcements = () => {
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
          <span className="text-gray-400">Just now</span>
        </div>
      </div>

      <form className="mt-4">
        <div className="bg-gray-100 p-3 rounded-lg">
          <label className="block text-lg font-semibold mb-2">
            Add Announcement
          </label>
          <input
            type="text"
            id="announcement"
            name="announcement"
            className="w-full px-4 py-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            placeholder="Enter your announcement here..."
          />
          <button
            type="submit"
            className="mt-4 px-4 py-2 text-white rounded-lg focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            style={{ backgroundColor: "#2E2E30" }}
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default Announcements;
