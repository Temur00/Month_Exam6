import React from "react";
import { Link, NavLink } from "react-router-dom";

const Header = ({ user }) => {
  return (
    <div>
      <div className="header">
        <div className="products">
          <p className="pro-text">Products</p>
          <div className="links d-flex gap-1">
            <Link className="link-to-link" to="/">
              Main
            </Link>
            <p>/</p>
            <Link className="link-to-link " to="/">
              Goods
            </Link>
          </div>
        </div>
        {user ? (
          <Link to="/profile">{user.name}</Link>
        ) : (
          <div className="btn-wide">
            <NavLink to="/login">
              <img src="logout.png" alt="logout" />
              Loguot
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
