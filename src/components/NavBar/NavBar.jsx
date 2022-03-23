import React, { useState } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { HiOutlineChevronDown } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useNavBarStyles } from './NavBar.styles';
import { literals } from '../../utils/constants';
import { useAuth } from '../../hooks';

export const NavBar = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const classes = useNavBarStyles();
  return (
    <nav className={classes.nav}>
      <p className={classes.logo}>{literals.NAME}</p>
      <button
        aria-labelledby='open menu button'
        className={classes.popUpButton}
        onClick={() => setShowPopUp((val) => !val)}
      >
        <FaRegUserCircle size='1.2rem' />
        <p>{user ? user.name : 'User'}</p>
        <HiOutlineChevronDown size='1.2rem' />
      </button>
      {showPopUp && (
        <div className={classes.popUp}>
          <button onClick={() => navigate('/profile')}>Profile</button>
          <div className={classes.line} />
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </nav>
  );
};
