import React from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { useOrg } from '../../../contexts';
import { deleteOrg } from '../../../utils/actionHelpers';

export const DeleteOrg = ({ orgId }) => {
  const { setOrganizations } = useOrg();
  const deleteHandler = async () => {
    await deleteOrg({ orgId });
    setOrganizations((prev) => prev.filter((org) => org._id !== orgId));
  };

  return (
    <FiTrash2
      color='red'
      size='20'
      onClick={deleteHandler}
      aria-label='Delete Organization'
      style={{ marginLeft: '4rem' }}
    />
  );
};
