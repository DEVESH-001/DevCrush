import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      localStorage.removeItem("user");
      return navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="navbar bg-white/90 backdrop-blur-lg shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="flex-1">
        <Link
          to={user ? "/feed" : "/login"}
          className="btn btn-ghost text-xl font-bold hover:bg-transparent"
        >
          <span className="text-2xl mr-2">👩🏻‍💻</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300">
            devTinder
          </span>
        </Link>
      </div>

      <div className="flex gap-4 items-center">
        {user && (
          <>
            {/* Navigation Links */}
            <div className="hidden md:flex gap-2">
              <Link
                to="/feed"
                className={`btn btn-sm rounded-full font-medium transition-all duration-200 ${
                  isActive("/feed")
                    ? "bg-purple-600 text-white hover:bg-purple-700"
                    : "bg-gray-100 text-gray-700 hover:bg-purple-100 hover:text-purple-700"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                Feed
              </Link>
              <Link
                to="/connections"
                className={`btn btn-sm rounded-full font-medium transition-all duration-200 ${
                  isActive("/connections")
                    ? "bg-purple-600 text-white hover:bg-purple-700"
                    : "bg-gray-100 text-gray-700 hover:bg-purple-100 hover:text-purple-700"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Connections
              </Link>
              <Link
                to="/requests"
                className={`btn btn-sm rounded-full font-medium transition-all duration-200 ${
                  isActive("/requests")
                    ? "bg-purple-600 text-white hover:bg-purple-700"
                    : "bg-gray-100 text-gray-700 hover:bg-purple-100 hover:text-purple-700"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 00-15 0v5h5l-5 5-5-5h5V7a9.5 9.5 0 0119 0v10z"
                  />
                </svg>
                Requests
              </Link>
            </div>

            {/* User Profile Dropdown */}
            <div className="dropdown dropdown-end">
              <div className="flex items-center gap-3">
                <span className="hidden sm:block text-sm font-medium text-gray-800">
                  Hi, {user.firstname}!
                </span>
                <label
                  tabIndex={0}
                  className="btn btn-ghost btn-circle avatar hover:bg-purple-50 transition-all duration-300"
                >
                  <div className="w-10 rounded-full ring-2 ring-purple-200 hover:ring-purple-400 transition-all duration-300">
                    <img
                      alt="user avatar"
                      src={user.photoUrl || "https://via.placeholder.com/40"}
                      className="rounded-full object-cover"
                    />
                  </div>
                </label>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[50] p-3 shadow-xl bg-white rounded-2xl w-56 border border-gray-100"
              >
                <li className="mb-2">
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-300">
                    <img
                      src={user.photoUrl || "https://via.placeholder.com/32"}
                      alt="avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-sm">
                        {user.firstname} {user.lastname}
                      </p>
                      <p className="text-xs text-gray-500">{user.emailId}</p>
                    </div>
                  </div>
                </li>
                <div className="divider my-2"></div>
                <li>
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 p-3 rounded-lg text-gray-800 hover:bg-purple-100 hover:text-purple-800 transition-colors duration-200 font-medium"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Profile Settings
                  </Link>
                </li>
                <li className="md:hidden">
                  <Link
                    to="/feed"
                    className="flex items-center gap-3 p-3 rounded-lg text-gray-800 hover:bg-purple-100 hover:text-purple-800 transition-colors duration-200 font-medium"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    Feed
                  </Link>
                </li>
                <li className="md:hidden">
                  <Link
                    to="/connections"
                    className="flex items-center gap-3 p-3 rounded-lg text-gray-800 hover:bg-purple-100 hover:text-purple-800 transition-colors duration-200 font-medium"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    Connections
                  </Link>
                </li>
                <li className="md:hidden">
                  <Link
                    to="/requests"
                    className="flex items-center gap-3 p-3 rounded-lg text-gray-800 hover:bg-purple-100 hover:text-purple-800 transition-colors duration-200 font-medium"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 00-15 0v5h5l-5 5-5-5h5V7a9.5 9.5 0 0119 0v10z"
                      />
                    </svg>
                    Requests
                  </Link>
                </li>
                <div className="divider my-2"></div>
                <li>
                  <a
                    onClick={handleLogout}
                    className="flex items-center gap-3 p-3 rounded-lg text-gray-800 hover:bg-red-100 hover:text-red-800 transition-colors duration-200 cursor-pointer font-medium"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Sign Out
                  </a>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
