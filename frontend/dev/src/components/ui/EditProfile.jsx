import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstname, setFirstname] = useState(user.firstname || "");
  const [lastname, setLastname] = useState(user.lastname || "");
  const [about, setAbout] = useState(user.about || "");
  const [skills, setSkills] = useState(user.skills || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    setIsLoading(true);
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstname,
          lastname,
          gender,
          age: age ? Number(age) : undefined,
          skills,
          about,
          photoUrl,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      setError(error?.response?.data || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Edit Your Profile
          </h1>
          <p className="text-gray-600 text-lg">
            Update your information and see how it looks to others
          </p>
        </div>

        <div className="flex flex-col xl:flex-row justify-center gap-8 max-w-7xl mx-auto">
          {/* Edit Form */}
          <div className="flex-1 max-w-2xl">
            <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 hover-lift">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-purple-100 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Profile Information
                </h2>
              </div>

              <div className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold text-gray-700">
                        First Name
                      </span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered w-full bg-white/70 backdrop-blur-sm border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
                      placeholder="Enter your first name"
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold text-gray-700">
                        Last Name
                      </span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered w-full bg-white/70 backdrop-blur-sm border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
                      placeholder="Enter your last name"
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                    />
                  </div>
                </div>

                {/* Photo URL */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-gray-700">
                      Profile Photo URL
                    </span>
                  </label>
                  <input
                    type="url"
                    className="input input-bordered w-full bg-white/70 backdrop-blur-sm border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
                    placeholder="https://example.com/your-photo.jpg"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </div>

                {/* About */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-gray-700">
                      About Me
                    </span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered h-24 bg-white/70 backdrop-blur-sm border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 resize-none"
                    placeholder="Tell others about yourself, your interests, and what you're looking for..."
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  ></textarea>
                </div>

                {/* Skills */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-gray-700">
                      Skills
                    </span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full bg-white/70 backdrop-blur-sm border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
                    placeholder="JavaScript, React, Node.js, Python..."
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                  />
                  <label className="label">
                    <span className="label-text-alt text-gray-500">
                      Separate skills with commas
                    </span>
                  </label>
                </div>

                {/* Age and Gender */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold text-gray-700">
                        Age
                      </span>
                    </label>
                    <input
                      type="number"
                      className="input input-bordered w-full bg-white/70 backdrop-blur-sm border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
                      placeholder="25"
                      min="18"
                      max="100"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold text-gray-700">
                        Gender
                      </span>
                    </label>
                    <select
                      className="select select-bordered w-full bg-white/70 backdrop-blur-sm border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="non-binary">Non-binary</option>
                      <option value="prefer-not-to-say">
                        Prefer not to say
                      </option>
                    </select>
                  </div>
                </div>

                {/* Error Message */}
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

                {/* Save Button */}
                <button
                  className="btn w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-none text-white font-semibold py-3 rounded-xl btn-modern shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  onClick={saveProfile}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Updating Profile...
                    </>
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
                      Update Profile
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Preview Card */}
          <div className="flex-1 max-w-md">
            <div className="sticky top-24">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Live Preview
                </h3>
                <p className="text-gray-600">
                  See how your profile looks to others
                </p>
              </div>
              <UserCard
                user={{
                  _id: "preview",
                  firstname,
                  lastname,
                  age: age ? Number(age) : undefined,
                  gender,
                  about,
                  skills,
                  photoUrl,
                }}
              />
            </div>
          </div>
        </div>

        {/* Success Toast */}
        {showToast && (
          <div className="toast toast-top toast-center z-50">
            <div className="alert alert-success bg-green-50 border-green-200 text-green-700 shadow-lg">
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-semibold">
                Profile updated successfully!
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
