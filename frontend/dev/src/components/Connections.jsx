/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice"; // Redux action to update connections in store

const Connections = () => {
  const dispatch = useDispatch(); // Allows dispatching Redux actions

  // Get the connections from Redux store
  const connections = useSelector((store) => store.connections);

  const [loading, setLoading] = useState(true); // Local loading state for showing loading indicator

  // Function to fetch user connections from the server
  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true, // Allows sending cookies for authentication
      });
      // Dispatch the fetched data to Redux store
      dispatch(addConnections(res.data.data));
    } catch (error) {
      alert("Failed to fetch connections. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (loading) {
    return <h1 className="text-center mt-10">Loading connections...</h1>;
  }

  if (!connections || connections.length === 0) {
    return <h1 className="text-center mt-10">No connections found</h1>;
  }

  return (
    <div className="grid text-center my-10">
      {/* Section Title */}
      <h1 className="text-lg sm:text-md lg:text-4xl font-bold mb-6">
        Connections
      </h1>

      <div className="text-lg space-y-6">
        {connections.map((connection, idx) => {
          const { firstname, lastname, photoUrl, age, gender, about, skills } = connection;

          return (
            <div
              key={idx}
              className="m-4 p-4 border rounded-xl border-gray-500 flex flex-col md:flex-row items-start gap-6">
              <img
                src={photoUrl}
                alt={`${firstname} ${lastname}`}
                className="h-24 w-24 object-cover rounded-full"/>
                
              <div className="text-left">
                <h4 className="font-semibold text-xl">
                  {firstname} {lastname}
                </h4>
                <p>Age: {age ? age : "N/A"}</p>
                <p>Gender: {gender}</p>
                <p className="mt-2 italic text-gray-700">{about}</p>
                {/* Skills section (works for both string or array of skills) */}
                <p className="mt-1 text-sm text-purple-700">
                  Skills: {Array.isArray(skills) ? skills.join(", ") : skills}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
