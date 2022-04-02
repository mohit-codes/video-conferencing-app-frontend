import { GrClose } from 'react-icons/gr';
import { FiMessageSquare, FiUsers } from 'react-icons/fi';
import { useState } from 'react';
import { Participants } from './Participants';
import { Chat } from './Chat';
import { useSidePanelStyles } from './MeetingDetailsSidePanel.styles';

export const MeetingDetailsSidePanel = () => {
  const classes = useSidePanelStyles();
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className={classes.outer}>
      <div className={classes.heading}>
        <span> Meeting Details</span>
        <GrClose role='button' aria-label='close' onClick={() => {}} />
      </div>
      <div className={classes.tabs}>
        <button
          className={selectedTab === 0 ? classes.focusedTab : classes.blurTab}
          onClick={() => setSelectedTab(0)}
        >
          <FiUsers aria-label='participants' size='20' />
        </button>
        <button
          className={selectedTab === 1 ? classes.focusedTab : classes.blurTab}
          onClick={() => setSelectedTab(1)}
        >
          <FiMessageSquare aria-label='chats' size='20' />
        </button>
      </div>
      <div>{selectedTab === 0 ? <Participants /> : <Chat />}</div>
    </div>
  );
};
