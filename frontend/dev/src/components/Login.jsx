import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
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
      console.log(res.data);
      //dispatching the action to add user data to the store, basically we are adding the user data to the redux store, so that we can access it in any component, this will help us manage the user state more effectively as we can access it from any component without passing it down as props
      dispatch(addUser(res.data));
      return navigate("/feed");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center py-40">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Log In</h2>
          {/* input */}
          <div>
            <span>EmailId: {emailId}</span>
            <label className="input">
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
          <div className="card-actions justify-end mt-2">
            <button className="btn btn-primary" onClick={handleLogin}>
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
