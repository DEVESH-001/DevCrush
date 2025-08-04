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
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data));
      return navigate("/feed");
    } catch (error) {
      setError(error?.response?.data || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async () => {
    setIsLoading(true);
    setError("");
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
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (error) {
      setError(error?.response?.data || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex justify-center items-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 hover-lift">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">👩🏻‍💻</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {isLoginForm ? "Welcome Back" : "Join devTinder"}
            </h2>
            <p className="text-gray-600">
              {isLoginForm
                ? "Sign in to continue your journey"
                : "Create your developer profile"}
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {!isLoginForm && (
              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <input
                    type="text"
                    className="input input-bordered w-full bg-white/50 backdrop-blur-sm border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
                    placeholder="First name"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <input
                    type="text"
                    className="input input-bordered w-full bg-white/50 backdrop-blur-sm border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
                    placeholder="Last name"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="form-control">
              <input
                type="email"
                className="input input-bordered w-full bg-white/50 backdrop-blur-sm border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
                placeholder="Email address"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </div>

            <div className="form-control">
              <input
                type="password"
                className="input input-bordered w-full bg-white/50 backdrop-blur-sm border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <div className="alert alert-error bg-red-50 border-red-200 text-red-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <button
              className="btn w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-none text-white font-semibold py-3 rounded-xl btn-modern shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:text-white"
              onClick={isLoginForm ? handleLogin : handleSignup}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : isLoginForm ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </button>
          </div>

          {/* Toggle Form */}
          <div className="text-center mt-8">
            <p className="text-gray-600">
              {isLoginForm ? "New to devTinder?" : "Already have an account?"}
            </p>
            <Link
              onClick={() => {
                setIsLoginForm(!isLoginForm);
                setError("");
              }}
              className="text-purple-600 hover:text-purple-800 font-semibold cursor-pointer transition-colors duration-300"
            >
              {isLoginForm ? "Create an account" : "Sign in instead"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
