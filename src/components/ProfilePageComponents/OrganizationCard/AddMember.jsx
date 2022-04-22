import React, { useEffect, useState } from 'react';
import { Button } from '../../Button';
import { InputField } from '../../FormComponents';
import { Row } from '../../Layout';
import { useOrgStyles } from '../Organizations/Organizations.styles';
import { addMember } from '../../../utils/actionHelpers';
import { useOrg } from '../../../contexts';

export const AddMember = ({ orgId, closeModal }) => {
  const [email, setEmail] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const { formHead, error, errorPara } = useOrgStyles();
  const { setOrganizations } = useOrg();

  const addMemberToOrg = async () => {
    if (email.trim().length > 0) {
      const { data, error } = await addMember({ email, orgId });
      if (error) {
        setErrMsg(error.message);
      } else if (!data?.success) {
        setErrMsg(data?.error);
      } else {
        setOrganizations((prev) =>
          prev.map((org) =>
            org._id === orgId ? { ...org, members: [...org.members, data?.user] } : org
          )
        );
        setEmail('');
        setErrMsg('');
        closeModal();
      }
    } else {
      setErrMsg('empty fields');
    }
  };

  useEffect(() => {
    setEmail('');
    setErrMsg('');
  }, []);

  return (
    <>
      <Row className={formHead}>Enter Organization details</Row>
      <Row className={error}>
        <p className={errorPara}>{errMsg}</p>
      </Row>
      <InputField
        changeCallback={(e) => setEmail(e.target.value)}
        value={email}
        name='Add Member'
        placeholder='Enter email'
        type='email'
        label='Add Members'
      />
      <Button margin='1rem 0' onClick={() => addMemberToOrg()}>
        Add
      </Button>
    </>
  );
};
