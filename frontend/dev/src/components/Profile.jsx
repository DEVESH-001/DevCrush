import { useSelector } from "react-redux";
import EditProfile from "./ui/EditProfile";

const Profile = () => {
  const user = useSelector((store) => store.user); // Get the user data from the Redux store, so that we can use it in the profile component and also pass it to the EditProfile component.
  return (
    user && (
      <div>
        <EditProfile user={user} />
      </div>
    )
  );
};

export default Profile;
