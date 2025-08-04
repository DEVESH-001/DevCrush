/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (error) {
      setError("Failed to fetch connections. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-purple-600 mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your connections...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">⚠️</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Oops!</h2>
          <p className="text-gray-600 text-lg mb-8">{error}</p>
          <button
            onClick={fetchConnections}
            className="btn bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-none text-white font-semibold px-8 py-3 rounded-full"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!connections || connections.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">🤝</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            No Connections Yet
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Start swiping on profiles to make your first connections!
          </p>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <h3 className="font-semibold text-gray-800 mb-3">Get started:</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• Browse the feed</p>
              <p>• Like profiles you're interested in</p>
              <p>• Wait for them to like you back</p>
              <p>• Start connecting!</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Your Connections
          </h1>
          <p className="text-gray-600 text-lg">
            {connections.length} developer{connections.length !== 1 ? "s" : ""}{" "}
            you've connected with
          </p>
        </div>

        {/* Connections Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6">
            {connections.map((connection, idx) => {
              const {
                firstname,
                lastname,
                photoUrl,
                age,
                gender,
                about,
                skills,
              } = connection;
              const skillsArray = Array.isArray(skills)
                ? skills
                : skills?.split(",") || [];

              return (
                <div
                  key={idx}
                  className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg hover-lift p-6 border border-gray-100"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both`,
                  }}
                >
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    {/* Profile Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={photoUrl || "https://via.placeholder.com/96"}
                        alt={`${firstname} ${lastname}`}
                        className="h-24 w-24 object-cover rounded-full ring-4 ring-purple-100 hover:ring-purple-200 transition-all duration-300"
                      />
                    </div>

                    {/* Profile Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                        <h3 className="text-2xl font-bold text-gray-800">
                          {firstname} {lastname}
                        </h3>
                        <div className="flex items-center gap-3 mt-2 sm:mt-0">
                          {age && (
                            <span className="badge badge-outline badge-lg text-purple-600 border-purple-200">
                              {age} years
                            </span>
                          )}
                          {gender && (
                            <span className="badge badge-outline badge-lg text-blue-600 border-blue-200 capitalize">
                              {gender}
                            </span>
                          )}
                        </div>
                      </div>

                      {about && (
                        <p className="text-gray-700 text-sm leading-relaxed mb-4">
                          {about}
                        </p>
                      )}

                      {skillsArray.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold text-gray-600 mb-2">
                            Skills
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {skillsArray.map((skill, skillIdx) => (
                              <span
                                key={skillIdx}
                                className="badge badge-sm bg-purple-100 text-purple-700 border-purple-200 px-3 py-2"
                              >
                                {skill.trim()}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2">
                      <button className="btn btn-sm bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-none text-white rounded-full px-6 hover:text-white">
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
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                        Message
                      </button>
                      <button className="btn btn-sm btn-outline border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-800 hover:border-gray-400 rounded-full px-6">
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
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connections;
