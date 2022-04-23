/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, InputField, NavBar } from '../../components';
import { useMeetInfo, useOrg } from '../../contexts';
import { useHomeStyles } from '../Home';
import { useNewMeetingStyles } from './NewMeeting.styles';
import { createMeet } from '../../utils/actionHelpers';
import { getMeetingType } from '../../utils/utility';

export const NewMeeting = () => {
  const { background } = useHomeStyles();
  const classes = useNewMeetingStyles();
  const [meetingType, setMeetingType] = useState(null);
  const [orgId, setOrgId] = useState(null);
  const [meetingTitle, setMeetingTitle] = useState('');
  const [errMsg, setErrMsg] = useState(null);
  const { organizations } = useOrg();
  const { setMeetTitle, setMeetingCode } = useMeetInfo();
  const navigate = useNavigate();

  const options = ['Open to All', 'Restricted', 'Organization'];

  const handleMeetingTypeRadio = (e) => {
    setMeetingType(e.target.id);
  };

  const handleOrganizationRadio = (e) => {
    setOrgId(e.target.id);
  };

  const newMeetingHandler = async () => {
    if (meetingTitle.trim().length < 1 || !meetingType) {
      setErrMsg('Empty Fields');
      return;
    }
    if (getMeetingType(meetingType) === 2 && !orgId) {
      setErrMsg('Select an organization');
      return;
    }
    const type = getMeetingType(meetingType);
    const { data, error } = await createMeet({ orgId, title: meetingTitle, type });
    if (error) {
      setErrMsg(error.message);
      return;
    } else {
      setMeetTitle(data.title);
      setMeetingCode(data.meetingCode);
      navigate(`/meet/${data.meetingCode}`);
    }
    setErrMsg('');
    setMeetingTitle('');
    setOrgId(null);
    setMeetingType(null);
  };

  return (
    <div>
      <NavBar />
      <div className={background}>
        <div className={classes.box}>
          <div className={classes.titleBox}>
            <p className={classes.errorPara}>{errMsg}</p>
            <p>Meeting Title</p>
            <InputField
              value={meetingTitle}
              changeCallback={(e) => setMeetingTitle(e.target.value)}
              name='title'
              placeholder=''
              type='text'
              width='20rem'
            />
          </div>
          <div className={classes.radioInputs} onClick={handleMeetingTypeRadio}>
            {options.map((name) => (
              <div key={name}>
                <input type='radio' name='meeting-type' id={name} />
                <label htmlFor={name}>{name}</label>
              </div>
            ))}
          </div>
          {meetingType === 'Organization' && (
            <div className={classes.orgList} onClick={handleOrganizationRadio}>
              <p>Organizations</p>
              {organizations.map((org) => (
                <div key={org._id} className={classes.org}>
                  <input type='radio' name='org' id={org._id} />
                  <label htmlFor={org.name}>{org.name}</label>
                </div>
              ))}
            </div>
          )}

          <div className={classes.btn}>
            <Button width='21.125rem' onClick={newMeetingHandler}>
              Start Meeting
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
