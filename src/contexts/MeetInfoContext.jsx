/* eslint-disable sort-keys-fix/sort-keys-fix */
/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useContext, useState } from 'react';

export const MeetInfoContext = createContext();

export const MeetInfoProvider = ({ children }) => {
  const [meetTitle, setMeetTitle] = useState('');
  const [meetingCode, setMeetingCode] = useState('');

  return (
    <MeetInfoContext.Provider value={{ meetTitle, setMeetTitle, meetingCode, setMeetingCode }}>
      {children}
    </MeetInfoContext.Provider>
  );
};

export const useMeetInfo = () => useContext(MeetInfoContext);
