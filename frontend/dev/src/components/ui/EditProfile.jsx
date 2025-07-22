import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstname, setfirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const [about, setAbout] = useState(user.about);
  const [skills, setSkills] = useState(user.skills);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstname: firstname,
          lastname: lastname,
          gender,
          age: Number(age),
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
      }, 2000);
    } catch (error) {
      setError(error?.response?.data || "Failed to update profile");
    }
  };

  return (
    <div className="flex justify-center my-10 gap-20">
      <div className="flex justify-center items-center mx-10 py-2">
        <div className="card bg-base-300 w-96 shadow-sm">
          <div className="card-body">
            <h2 className="card-title">Edit Profile</h2>
            {/* input */}
            <div>
              <label className="input">
                <input
                  type="text"
                  className="grow"
                  placeholder="firstname"
                  value={firstname}
                  onChange={(e) => setfirstname(e.target.value)}
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
              <label className="input mt-6">
                <input
                  type="url"
                  className="grow"
                  placeholder="PhotoUrl"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </label>
              <label className="input mt-6">
                <input
                  type="text"
                  className="grow"
                  placeholder="About"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </label>
              <label className="input mt-6">
                <input
                  type="text"
                  className="grow"
                  placeholder="Skills"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />
              </label>
              <label className="input mt-6">
                <input
                  type="number"
                  className="grow"
                  placeholder="Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>
              <label className="input mt-6">
                <input
                  type="text"
                  className="grow"
                  placeholder="Gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </label>
            </div>
            <p className="text-red-500">{error}</p>
            {/* updating the profile */}
            <div className="card-actions justify-center mt-2">
              <button
                className="btn btn-primary"
                // onClick={async () => {
                //   await saveProfile();
                //   setShowToast(true);

                //   setTimeout(() => {
                //     setShowToast(false);
                //   }, 2000);
                // }}
                onClick={saveProfile}
              >
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* preview Card */}

      <UserCard
        user={{
          firstname,
          lastname,
          age,
          gender,
          about,
          skills,
          photoUrl,
        }}
      />
      {/* toast */}
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile Updated Successfully</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
