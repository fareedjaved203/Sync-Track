import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SiSaltproject } from "react-icons/si";
import { getAllUsersApi, logoutUserApi } from "../../api/user/userApi";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import Notifications from "./Notifications";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { onLogout } from "../../redux/slices/userSlice";

let searchItems = [];

const Navbar = ({ showDrawer, channel }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState(searchItems);
  const [showDropdown, setShowDropdown] = useState(false);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    getAllUsersApi().then((data) => {
      const store = data?.data?.users;
      if (Array.isArray(store)) {
        const filteredUsers = store.filter(
          (user) => user.email !== "admin@gmail.com"
        );
        searchItems = [...filteredUsers];
        console.log(searchItems);
      }
    });
  }, []);

  const handleItemClick = (item) => {
    setSearchQuery(item.email);
    setFilteredItems([item]);
    setShowDropdown(false);
    navigate(`/profile/${item.email}`);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filtered = searchItems.filter(
      (item) =>
        item.email.toLowerCase().includes(query.toLowerCase()) ||
        item.position.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(filtered);
    setShowDropdown(!!query);
  };

  const handleLogout = async () => {
    await logoutUserApi();
    dispatch(onLogout());
  };

  return (
    <nav
      className="border-gray-200 dark:bg-gray-900 z-10"
      style={{
        backgroundColor: "#2E2E30",
        position: "fixed",
        width: "100vw",
        top: 0,
      }}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        {user?.data?.user?.role === "admin" ? (
          <>
            <Link
              to="/admin/dashboard"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <SiSaltproject style={{ fontSize: "30px", color: "white" }} />
              <span className="self-center text-1xl font-semibold whitespace-nowrap text-white">
                Sync Track
              </span>
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <SiSaltproject style={{ fontSize: "30px", color: "white" }} />
              <span className="self-center text-1xl font-semibold whitespace-nowrap text-white">
                Sync Track
              </span>
            </Link>
          </>
        )}

        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative">
          <button
            type="dark"
            onClick={showDrawer}
            style={{
              color: "white",
              fontSize: "25px",
              paddingRight: "10px",
            }}
          >
            <IoChatbubbleEllipses />
          </button>
          <Notifications channel={channel} />

          <button
            type="button"
            className="flex text-sm bg-gray-800 rounded-full"
            id="user-menu-button"
            aria-expanded="false"
            onClick={() => {
              document
                .getElementById("user-dropdown")
                .classList.toggle("hidden");
            }}
          >
            <span className="sr-only">Open user menu</span>
            {/* <FaUserCircle style={{ fontSize: "30px", color: "white" }} /> */}
            <img
              src={user?.data?.user?.avatar?.url}
              alt={user?.name}
              className="w-8 h-8 rounded-full mr-2"
            />
          </button>
          {/* <!-- Dropdown menu --> */}
          <div
            className="absolute right-0 z-50 hidden mt-2 py-2 w-48 bg-white rounded-lg shadow-lg dark:bg-gray-700"
            id="user-dropdown"
            style={{ top: "2.5rem" }}
          >
            <div className="px-4 py-3">
              <span className="username block text-sm text-gray-900 dark:text-white">
                {user && user?.data?.user?.name}
              </span>
              <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                {user && user?.data?.user?.email}
              </span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              <li>
                <Link
                  to={`/profile/${user?.data?.user?.email}`}
                  className="dropdown block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Profile
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="dropdown block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/signin"
                  onClick={handleLogout}
                  className="dropdown block px-4 py-2 text-sm text-gray-700 hover:bg-red-300 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="flex items-center justify-center relative w-full md:flex md:w-auto md:order-1 md:left-[-160px]"
          id="navbar-user"
        >
          <div className="flex">
            <div className="relative hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  className="w-[200%] px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearch}
                />
                {showDropdown && (
                  <div className="absolute w-[200%] top-10 left-0 bg-white border border-gray-300 rounded-lg shadow-lg mt-2 z-50">
                    <ul className="py-1 w-100">
                      {Array.isArray(filteredItems) &&
                        filteredItems.map((user) => (
                          <li
                            key={user._id}
                            className="px-4 py-2 w-100 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleItemClick(user)}
                          >
                            <div className="flex items-center">
                              <img
                                src={user.avatar.url}
                                alt={user.name}
                                className="w-8 h-8 rounded-full mr-2"
                              />
                              <div>
                                <div className="font-semibold">{user.name}</div>
                                <div className="text-gray-600">
                                  {user.email}
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div
            className="items-center justify-between w-full md:flex md:w-auto md:order-1"
            id="navbar-search"
          >
            <div className="relative mt-3 md:hidden">
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearch}
                />
                {showDropdown && (
                  <div className="absolute w-full top-10 left-0 bg-white border border-gray-300 rounded-lg shadow-lg mt-2 z-50">
                    <ul className="py-1">
                      {Array.isArray(filteredItems) &&
                        filteredItems.map((user) => (
                          <li
                            key={user._id}
                            className="px-4 w-100 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleItemClick(user)}
                          >
                            <div className="flex items-center">
                              <img
                                src={user.avatar.url}
                                alt={user.name}
                                className="w-8 h-8 rounded-full mr-2"
                              />
                              <div>
                                <div className="font-semibold">{user.name}</div>
                                <div className="text-gray-600">
                                  {user.email}
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
