import { BsPlusSquare } from 'react-icons/bs';
import { OrganizationCard } from '../OrganizationCard';
import { useOrgStyles } from './Organizations.styles';

export const Organizations = () => {
  const classes = useOrgStyles();
  const organizations = [
    {
      admin: 123,
      id: 1,
      members: [
        {
          email: 'ronny@gmail.com',
          id: 1,
          name: 'ronny'
        },
        {
          email: 'mohit@gmail.com',
          id: 2,
          name: 'mohit'
        },
        {
          email: 'ashu@gmail.com',
          id: 3,
          name: 'ashu'
        },
        {
          email: 'swapnil@gmail.com',
          id: 123,
          name: 'swapnil'
        }
      ],
      orgName: 'Org1'
    },
    {
      admin: 1234,
      id: 2,
      members: [
        {
          email: 'ronny@gmail.com',
          id: 1234,
          name: 'ronny'
        },
        {
          email: 'mohit@gmail.com',
          id: 2,
          name: 'mohit'
        },
        {
          email: 'ashu@gmail.com',
          id: 3,
          name: 'ashu'
        },
        {
          email: 'swapnil@gmail.com',
          id: 4,
          name: 'swapnil'
        }
      ],
      orgName: 'Org2'
    }
  ];
  return (
    <div className={classes.horizontalList}>
      <div className={classes.newOrganization}>
        <BsPlusSquare aria-label='new organization' size='4rem' />
      </div>
      {organizations.map((organization) => (
        <OrganizationCard org={organization} key={organization.id} />
      ))}
    </div>
  );
};
