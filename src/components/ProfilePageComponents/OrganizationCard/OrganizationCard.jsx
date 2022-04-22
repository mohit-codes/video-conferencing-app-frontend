import { IoEllipsisVertical } from 'react-icons/io5';
import { GrAddCircle } from 'react-icons/gr';
import { useState } from 'react';
import { useOrgStyles } from './OrganizationCard.styles';
import { Card } from '../../Layout';
import { AddOrgModal } from '../../Modals';
import { AddMember } from './AddMember';
import { RemoveMember } from './RemoveMember';
import { DeleteOrg } from './DeleteOrg';

export const OrganizationCard = ({ org }) => {
  const classes = useOrgStyles();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <AddOrgModal isOpen={isModalOpen} close={closeModal} maxWidth='21.875rem'>
        <AddMember orgId={org._id} closeModal={closeModal} />
      </AddOrgModal>
      <Card className={classes.card}>
        <div className={classes.title}>
          <span>{org.name}</span>
          {showDeleteButton && <DeleteOrg orgId={org._id} />}
          <IoEllipsisVertical
            size='20'
            role='button'
            aria-label='menu'
            onClick={() => setShowDeleteButton((val) => !val)}
          />
        </div>
        <div>
          <div className={classes.title}>
            <span>Members</span>
            <button>
              <GrAddCircle size='20' onClick={() => setIsModalOpen(true)} />
            </button>
          </div>
          <div className={classes.members}>
            {org.members.map((member) => (
              <p key={member._id} className={classes.member}>
                <span>{member.name}</span>
                {member.id === org.admin ? (
                  'ADMIN'
                ) : (
                  <RemoveMember member={member} orgId={org._id} />
                )}
              </p>
            ))}
          </div>
        </div>
      </Card>
    </>
  );
};
