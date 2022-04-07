import { BsPlusSquare } from 'react-icons/bs';
import { useState } from 'react';
import { OrganizationCard } from '../OrganizationCard';
import { useOrgStyles } from './Organizations.styles';
import { AddOrgModal } from '../..';
import { Card, Col, Container, Row } from '../../Layout';
import { InputField } from '../../FormComponents';

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
    },
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
    }
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  /** members = [{email: 'abc@xyz.com', email: 'pqr@ijk.com'}]
   */
  const [formValues, setFormValues] = useState({ members: [], orgName: '' });
  const [errMsg, setErrMsg] = useState('');
  const addOrg = () => {};
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <AddOrgModal isOpen={isModalOpen} close={closeModal} maxWidth='350px'>
        <Container>
          <Row center className={classes.formHead}>
            Enter Organization details
          </Row>
          <Row className={classes.error} center>
            <p className={classes.errorPara}>{errMsg}</p>
          </Row>
          <form className={classes.form} onSubmit={addOrg}>
            <InputField
              changeCallback={() => {}}
              value={formValues.orgName}
              name='email'
              placeholder='Enter your email'
              type='email'
              width='20rem'
              label='Email'
            />
          </form>
        </Container>
      </AddOrgModal>
      <Row>
        <Col xs={12} sm={6} md={4} lg={3}>
          <div className={classes.newOrganization}>
            <BsPlusSquare aria-label='new organization' size='4rem' onClick={closeModal} />
          </div>
        </Col>
        {organizations.map((organization) => (
          <Col xs={12} sm={6} md={4} lg={3} key={organization.id} className={classes.mblock10}>
            <OrganizationCard org={organization} />
          </Col>
        ))}
      </Row>
    </>
  );
};
