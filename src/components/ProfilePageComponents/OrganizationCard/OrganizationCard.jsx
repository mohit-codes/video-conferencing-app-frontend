import { IoEllipsisVertical } from 'react-icons/io5';
import { GrAddCircle } from 'react-icons/gr';
import { FiTrash2 } from 'react-icons/fi';
import { useOrgStyles } from './OrganizationCard.styles';
import { Card } from '../../Layout';

export const OrganizationCard = ({ org }) => {
  const classes = useOrgStyles();
  return (
    <Card className={classes.card}>
      <div className={classes.title}>
        <span>{org.orgName}</span>
        <button>
          <IoEllipsisVertical size='20' />
        </button>
      </div>
      <div>
        <div className={classes.title}>
          <span>Members</span>
          <button>
            <GrAddCircle size='20' />
          </button>
        </div>
        <div className={classes.members}>
          {org.members.map((member) => (
            <p key={member.id} className={classes.member}>
              <span>{member.name}</span>
              {member.id === org.admin ? (
                'ADMIN'
              ) : (
                <button>
                  <FiTrash2 color='red' size='20' />
                </button>
              )}
            </p>
          ))}
        </div>
      </div>
    </Card>
  );
};
