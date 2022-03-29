import React, { useState } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { HiOutlineChevronDown } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { resetAuth } from '../../utils/actions';
import { literals } from '../../utils/constants';
import { useNavBarStyles } from './NavBar.styles';

export const NavBar = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const {
    state: { user },
    dispatch
  } = useAuth();
  const navigate = useNavigate();
  const classes = useNavBarStyles();

  const logout = () => {
    localStorage.clear();
    dispatch(resetAuth());
    navigate('/');
  };

  const firstName = user?.name?.split(' ')[0];
  return (
    <nav className={classes.nav}>
      <p className={classes.logo}>{literals.NAME}</p>
      <button
        aria-labelledby='open menu button'
        className={classes.popUpButton}
        onClick={() => setShowPopUp((val) => !val)}
      >
        {user?.imageUrl ? (
          <img
            src={user?.imageUrl}
            alt='avatar'
            loading='lazy'
            referrerpolicy='no-referrer'
            className={classes.userAvatar}
          />
        ) : (
          <FaRegUserCircle size='1.2rem' />
        )}
        <p>{firstName}</p>
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
