import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  //authRouter.post("/login"
  const handleLogin = async () => {
    //making api call to our backend
    try {
      // eslint-disable-next-line no-unused-vars
      const res = await axios.post(
        "http://localhost:4000/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
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
