import { BsPlusSquare } from 'react-icons/bs';
import { useState } from 'react';
import { OrganizationCard } from '../OrganizationCard';
import { useOrgStyles } from './Organizations.styles';
import { AddOrgModal } from '../..';
import { Col, Row } from '../../Layout';
import { CreateOrg } from './CreateOrg';
import { useOrg } from '../../../contexts';

export const Organizations = () => {
  const classes = useOrgStyles();
  const { organizations } = useOrg();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <AddOrgModal isOpen={isModalOpen} close={closeModal} maxWidth='21.875rem'>
        <CreateOrg classes={classes} />
      </AddOrgModal>
      <Row>
        <Col xs={12} sm={6} md={4} lg={3}>
          <div className={classes.newOrganization}>
            <BsPlusSquare
              aria-label='new organization'
              size='4rem'
              onClick={() => setIsModalOpen(true)}
            />
          </div>
        </Col>
        {organizations.map((organization) => (
          <Col xs={12} sm={6} md={4} lg={3} key={organization._id} className={classes.mblock10}>
            <OrganizationCard org={organization} />
          </Col>
        ))}
      </Row>
    </>
  );
};
