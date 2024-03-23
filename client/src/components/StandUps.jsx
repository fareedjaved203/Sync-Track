const StandUps = () => {
  return (
    <>
      <div className="bg-gray-100 p-6">
        <h2 className="text-lg font-bold mb-4">All StandUps</h2>
        <div className="flex flex-col space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">John Doe</h3>
            <p className="text-gray-700 text-sm mb-2">
              Posted on April 17, 2023
            </p>
            <p className="text-gray-700">
              This is a sample comment. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
          </div>
          <form className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-2">Add your standup</h3>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Name</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Comment
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="comment"
                rows="3"
                placeholder="Enter your comment"
              ></textarea>
            </div>
            <button
              className="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              style={{ backgroundColor: "#2E2E30" }}
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default StandUps;
