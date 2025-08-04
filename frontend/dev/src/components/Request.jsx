/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";
import { useEffect, useState } from "react";

const Request = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [processingIds, setProcessingIds] = useState(new Set());

  const reviewRequest = async (status, _id) => {
    setProcessingIds((prev) => new Set(prev).add(_id));
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (error) {
      console.error("Error reviewing request:", error);
    } finally {
      setProcessingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(_id);
        return newSet;
      });
    }
  };

  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.data));
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-purple-600 mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your requests...</p>
        </div>
      </div>
    );
  }

  if (!requests || requests.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">📬</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            No Requests Yet
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            When developers are interested in connecting with you, their
            requests will appear here.
          </p>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <h3 className="font-semibold text-gray-800 mb-3">
              Tips to get more requests:
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• Complete your profile</p>
              <p>• Add a great photo</p>
              <p>• List your skills</p>
              <p>• Be active on the platform</p>
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
            Connection Requests
          </h1>
          <p className="text-gray-600 text-lg">
            {requests.length} developer{requests.length !== 1 ? "s" : ""} want
            {requests.length === 1 ? "s" : ""} to connect with you
          </p>
        </div>

        {/* Requests Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6">
            {requests.map((request, idx) => {
              const {
                _id,
                firstname,
                lastname,
                age,
                photoUrl,
                gender,
                skills,
                about,
              } = request.fromUserId;

              const skillsArray = Array.isArray(skills)
                ? skills
                : skills?.split(",") || [];
              const isProcessing = processingIds.has(_id);

              return (
                <div
                  key={_id}
                  className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg hover-lift p-6 border border-gray-100"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both`,
                  }}
                >
                  <div className="flex flex-col lg:flex-row items-start gap-6">
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
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-600 mb-2">
                            Skills
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {skillsArray.slice(0, 6).map((skill, skillIdx) => (
                              <span
                                key={skillIdx}
                                className="badge badge-sm bg-purple-100 text-purple-700 border-purple-200 px-3 py-2"
                              >
                                {skill.trim()}
                              </span>
                            ))}
                            {skillsArray.length > 6 && (
                              <span className="badge badge-sm bg-gray-100 text-gray-600 border-gray-200 px-3 py-2">
                                +{skillsArray.length - 6} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                      <button
                        className="btn bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 border-none text-white font-semibold px-6 py-3 rounded-full btn-modern shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                        onClick={() => reviewRequest("accepted", _id)}
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                          <>
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
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            Accept
                          </>
                        )}
                      </button>

                      <button
                        className="btn bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 border-none text-white font-semibold px-6 py-3 rounded-full btn-modern shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                        onClick={() => reviewRequest("rejected", _id)}
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                          <>
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
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                            Decline
                          </>
                        )}
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

export default Request;
