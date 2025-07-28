import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  //now we need a hook useDispatch to dispatch actions to the store, so we can add data to the store
  const dispatch = useDispatch();
  //authRouter.post("/login"
  const handleLogin = async () => {
    //making api call to our backend
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true, // this will allow us to send cookies with the request
        }
      );
      dispatch(addUser(res.data));
      return navigate("/feed");
      //dispatching the action to add user data to the store, basically we are adding the user data to the redux store, so that we can access it in any component, this will help us manage the user state more effectively as we can access it from any component without passing it down as props
    } catch (error) {
      setError(error?.response?.data || "Login failed");
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstname,
          lastname,
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res.data);

      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (error) {
      setError(error?.response?.data || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center py-40">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">{isLoginForm ? "Log In" : "Sign Up"}</h2>
          {/* input */}
          <div>
            {!isLoginForm && (
              <>
                <label className="input">
                  <input
                    type="text"
                    className="grow"
                    placeholder="Firstname"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </label>
                <label className="input mt-6">
                  <input
                    type="text"
                    className="grow"
                    placeholder="Lastname"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </label>
              </>
            )}
            <label className="input mt-6">
              <input
                type="email"
                className="grow"
                placeholder="Email"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>
            <label className="input mt-6">
              <input
                type="password"
                className="grow"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-end mt-2">
            <button
              className="btn btn-primary"
              onClick={isLoginForm ? handleLogin : handleSignup}
            >
              {isLoginForm ? "Log In" : "Sign Up"}
            </button>
          </div>
          <Link
            onClick={() => {
              setIsLoginForm(!isLoginForm);
            }}
            className="text-center mt-2 cursor-pointer hover:text-blue-500"
          >
            {isLoginForm
              ? "Don't have an account?"
              : "Already have an account?"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
