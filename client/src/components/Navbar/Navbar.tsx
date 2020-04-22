import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const Navbar = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const logOutHandler = (e: any) => {
    e.preventDefault();
    auth.logout();
    history.push('/');
  };
  return (
    <nav>
      <div className="nav-wrapper blue darken-1">
        <span className="brand-logo">URL Shortener</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <NavLink to="/create">Create</NavLink>
          </li>
          <li>
            <NavLink to="/links">Links</NavLink>
          </li>
          <li>
            <a href="/" onClick={logOutHandler}>
              Log Out
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
