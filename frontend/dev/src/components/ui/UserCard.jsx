const UserCard = ({ user }) => {
  const { firstname, lastname, photoUrl, age, gender, about, skills } = user;
  console.log(user);

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
            <button className="btn btn-primary">Interested</button>
            <button className="btn bg-red-500">Ignore</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
