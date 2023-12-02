import { useEffect } from "react";
import { Link } from "react-router-dom";
import { SiSaltproject } from "react-icons/si";
import { FaUserCircle } from "react-icons/fa";
import { logoutUserApi } from "../../api/user/userApi";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails } from "../../redux/slices/userSlice";
import { useCookies } from "react-cookie";

const Navbar = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["cookieName"]);
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);
  const handleLogout = () => {
    logoutUserApi();
    removeCookie("token");
  };

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, [dispatch]);
  return (
    <nav
      className="border-gray-200 dark:bg-gray-900"
      style={{ backgroundColor: "#161d40" }}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        <Link
          to="https://flowbite.com/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <SiSaltproject
            style={{ fontSize: "30px", color: "white", marginLeft: "20px" }}
          />
          <span className="self-center text-1xl font-semibold whitespace-nowrap text-white">
            Sync Track
          </span>
        </Link>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative">
          <button
            type="button"
            className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            aria-expanded="false"
            onClick={() => {
              document
                .getElementById("user-dropdown")
                .classList.toggle("hidden");
            }}
          >
            <span className="sr-only">Open user menu</span>
            <FaUserCircle style={{ fontSize: "30px", color: "white" }} />
          </button>
          {/* <!-- Dropdown menu --> */}
          <div
            className="absolute right-0 z-50 hidden mt-2 py-2 w-48 bg-white rounded-lg shadow-lg dark:bg-gray-700"
            id="user-dropdown"
            style={{ top: "2.5rem" }}
          >
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 dark:text-white">
                {user.data?.user?.name}
              </span>
              <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                {user.data?.user?.email}
              </span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              <li>
                <Link
                  to="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Whiteboard Collaboration
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Profile
                </Link>
              </li>

              <li>
                <Link
                  to="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/signin"
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-300 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
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
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search icon</span>
              </div>
              <input
                type="text"
                id="search-navbar"
                className="block w-full md:w-[200%] p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
              />
            </div>
          </div>
          <div
            className="items-center justify-between w-full md:flex md:w-auto md:order-1"
            id="navbar-search"
          >
            <div className="relative mt-3 md:hidden">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="search-navbar"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
