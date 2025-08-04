import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../../utils/feedSlice";
import { useState } from "react";

const UserCard = ({ user }) => {
  const { _id, firstname, lastname, photoUrl, age, gender, about, skills } =
    user;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleSendRequest = async (status, userId) => {
    setIsLoading(true);
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.error("Error sending request:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const skillsArray = Array.isArray(skills) ? skills : skills?.split(",") || [];

  return (
    <div className="flex justify-center p-4">
      <div className="card bg-white w-full max-w-sm shadow-2xl hover-lift rounded-3xl overflow-hidden border border-gray-100">
        {/* Image Section */}
        <figure className="relative h-80 overflow-hidden">
          <img
            src={photoUrl || "https://via.placeholder.com/400x400"}
            alt={`${firstname} ${lastname}`}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </figure>

        {/* Content Section */}
        <div className="card-body p-6">
          {/* Name and Age */}
          <div className="flex items-center justify-between mb-3">
            <h2 className="card-title text-2xl font-bold text-gray-800">
              {firstname} {lastname}
            </h2>
            {age && (
              <span className="badge badge-outline badge-lg text-purple-600 border-purple-200">
                {age}
              </span>
            )}
          </div>

          {/* Gender */}
          {gender && (
            <div className="flex items-center gap-2 mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-500"
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
              <span className="text-gray-600 capitalize">{gender}</span>
            </div>
          )}

          {/* About */}
          {about && (
            <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
              {about}
            </p>
          )}

          {/* Skills */}
          {skillsArray.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-600 mb-2">
                Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {skillsArray.slice(0, 4).map((skill, index) => (
                  <span
                    key={index}
                    className="badge badge-sm bg-purple-100 text-purple-700 border-purple-200 px-3 py-2"
                  >
                    {skill.trim()}
                  </span>
                ))}
                {skillsArray.length > 4 && (
                  <span className="badge badge-sm bg-gray-100 text-gray-600 border-gray-200 px-3 py-2">
                    +{skillsArray.length - 4} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="card-actions justify-center gap-4 mt-6">
            <button
              className="btn bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 border-none text-white font-semibold px-8 py-3 rounded-full btn-modern shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              onClick={() => handleSendRequest("ignored", _id)}
              disabled={isLoading}
            >
              {isLoading ? (
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
                  Pass
                </>
              )}
            </button>

            <button
              className="btn bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 border-none text-white font-semibold px-8 py-3 rounded-full btn-modern shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              onClick={() => handleSendRequest("interested", _id)}
              disabled={isLoading}
            >
              {isLoading ? (
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
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  Like
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
