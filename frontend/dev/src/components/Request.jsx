/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestSlice";
import { useEffect } from "react";
import UserCard from "./ui/UserCard";

const Request = () => {
  const requests = useSelector((store) => store.requests); //useSelector is used to access the Redux store state, specifically the requests state managed by requestSlice
  const dispatch = useDispatch();
  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.data)); //dispatch is used to send the action to the Redux store, which will update the state with the new request data
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (!requests) return;
  if (requests.length === 0) return <h6>No request found</h6>;

  return (
    <div>
      {requests.map((request, index) => {
        const { firstname, lastname, age, photoUrl, gender, skills, about } =
          request.fromUserId;
        return (
          <div
            key={index}
            className="m-4 p-4 border rounded-xl border-gray-500 flex flex-col md:flex-row items-start gap-6"
          >
            <img
              src={photoUrl}
              alt={`${firstname} ${lastname}`}
              className="h-24 w-24 object-cover rounded-full"
            />
            <div className="text-left">
              <h4 className="font-semibold text-xl">
                {firstname} {lastname}
              </h4>
              <p>Age: {age ? age : "N/A"}</p>
              <p>Gender: {gender}</p>
              <p className="mt-2 italic text-gray-700">{about}</p>
              <p className="mt-1 text-sm text-purple-700">
                Skills: {Array.isArray(skills) ? skills.join(", ") : skills}
              </p>
            </div>
            <div className="cursor-pointer gap-4 font-bold">
              <button className="bg-blue-600 p-2 m-2">Accept</button>
              <button className="bg-red-600 p-2 m-2">Reject</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Request;
