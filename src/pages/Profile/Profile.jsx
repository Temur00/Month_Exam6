import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Profile = ({ user, setUser }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    setUser(null);
    localStorage.setItem("user", JSON.stringify(null));
    navigate("/login");
  };

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="text-center">
      <h1 className="text-center mt-3"> Welcome {user.name}</h1>
      <h1 className="text-center">Username: {user.username}</h1>
      <button
        className="btn mt-5 w-25 text-center btn-outline-dark"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
