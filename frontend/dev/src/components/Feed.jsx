import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect, useState } from "react";
import UserCard from "./ui/UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const getFeed = async () => {
    try {
      if (feed) {
        setIsLoading(false);
        return;
      }
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (error) {
      console.error("Error in getting the feed", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-purple-600 mb-4"></div>
          <p className="text-gray-600 text-lg">
            Finding amazing developers for you...
          </p>
        </div>
      </div>
    );
  }

  if (!feed || feed.length <= 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">🎉</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            You're all caught up!
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            No more profiles to show right now. Check back later for new
            developers to connect with!
          </p>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <h3 className="font-semibold text-gray-800 mb-3">What's next?</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• Check your connections</p>
              <p>• Review pending requests</p>
              <p>• Update your profile</p>
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
            Discover Developers
          </h1>
          <p className="text-gray-600 text-lg">
            Swipe through amazing developers and find your next connection
          </p>
        </div>

        {/* Feed Cards */}
        <div className="max-w-2xl mx-auto">
          {feed.map((user, index) => (
            <div
              key={user._id}
              className="mb-8"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
              }}
            >
              <UserCard user={user} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feed;
