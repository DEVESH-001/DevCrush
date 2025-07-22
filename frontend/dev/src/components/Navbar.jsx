import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + "/logout",
        {}, // empty body for logout, used because we are not sending any data
        { withCredentials: true } // to include cookies in the request
      );
      // Clear user data from local storage or Redux store
      dispatch(removeUser()); // clear user state in Redux
      localStorage.removeItem("user"); // clear user data from local storage
      //window.location.href = "/"; // redirect to home page
      return navigate("/login");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost text-xl">
          👩🏻‍💻 devTinder
        </Link>
      </div>
      <div className="flex gap-2 items-center">
        {user && (
          <div className="dropdown dropdown-end">
            <span className="px-3 py-2 font-thin">
              Welcome, {user.firstName}
            </span>
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="user avatar" src={user.photoUrl} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[50] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to={"/profile"} className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
