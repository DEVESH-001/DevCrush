import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstname, lastname, photoUrl, age, gender, about, skills } =
    user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      //remove the card from feed, use dispatch
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.log("user card" + error);
    }
  };

  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
          <img src={photoUrl} alt="User_image" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstname + " " + lastname}</h2>
          <p>{about}</p>
          {age && gender && <p>{age + " " + ", " + gender}</p>}
          {skills && <p>{skills}</p>}
          <div className="card-actions justify-center my-4">
            <button
              className="btn btn-primary"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
            <button
              className="btn bg-red-500"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
