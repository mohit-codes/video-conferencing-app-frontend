/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import { Button, NavBar } from '../../components';
import { useHomeStyles } from '../Home';
import { useNewMeetingStyles } from './NewMeeting.styles';

export const NewMeeting = () => {
  const { background } = useHomeStyles();
  const classes = useNewMeetingStyles();
  const [meetingType, setMeetingType] = useState(null);
  const [organization, setOrganization] = useState(null);

  const organizations = [
    { id: 1, name: 'iot-801' },
    { id: 12, name: 'iot-802' },
    { id: 3, name: 'iot-803' },
    { id: 4, name: 'iot-804' },
    { id: 5, name: 'iot-805' }
  ];

  const options = ['Open to All', 'Restricted', 'Organization'];

  const handleMeetingTypeRadio = (e) => {
    setMeetingType(e.target.id);
  };

  const handleOrganizationRadio = (e) => {
    setOrganization(e.target.id);
  };
  console.log(meetingType, organization);
  return (
    <div>
      <NavBar />
      <div className={background}>
        <div className={classes.box}>
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
                <div key={org.id} className={classes.org}>
                  <input type='radio' name='org' id={org.name} />
                  <label htmlFor={org.name}>{org.name}</label>
                </div>
              ))}
            </div>
          )}
          <div className={classes.btn}>
            <Button width='21.125rem'>Start Meeting</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
