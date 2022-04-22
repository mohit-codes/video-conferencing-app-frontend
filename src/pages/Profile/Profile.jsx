import { FaRegUserCircle } from 'react-icons/fa';
import { Button, NavBar, Organizations } from '../../components';
import { useAuth } from '../../contexts/authContext';
import { useProfileStyles } from './Profile.styles';
import { updateUrl } from '../../utils/actionHelpers';

export const Profile = () => {
  const { outerContainer, heading, accountInfo, infoText, userAvatar } = useProfileStyles();
  const {
    state: { user },
    dispatch
  } = useAuth();

  const openWidget = (e) => {
    e.preventDefault();
    window.cloudinary
      .createUploadWidget(
        {
          cloudName: 'nova-socials-cloud',
          cropping: true,
          uploadPreset: 'ml_default'
        },
        async (error, result) => {
          if (result.info?.secure_url) {
            console.log(result.info.secure_url);
            dispatch({ payload: result.info.secure_url, type: 'UPDATE_PROFILE_IMG' });
            await updateUrl({ imageUrl: result.info.secure_url });
          }
        }
      )
      .open();
  };

  return (
    <div>
      <NavBar />
      <div className={outerContainer}>
        <div>
          <p className={heading}>Account Info</p>
          <div className={accountInfo}>
            <div>
              {user?.imageUrl ? (
                <img
                  src={user?.imageUrl}
                  alt='avatar'
                  loading='lazy'
                  referrerPolicy='no-referrer'
                  className={userAvatar}
                />
              ) : (
                <FaRegUserCircle size='6rem' aria-label='default avatar' />
              )}
            </div>
            <div className={infoText}>
              <p>{`Name - ${user?.name}`}</p>
              <p>{`Email - ${user?.email}`}</p>
            </div>
          </div>
          <Button width='11rem' onClick={openWidget}>
            Change Avatar
          </Button>
        </div>
        <div>
          <p className={heading}>Organizations</p>
          <Organizations />
        </div>
      </div>
    </div>
  );
};
