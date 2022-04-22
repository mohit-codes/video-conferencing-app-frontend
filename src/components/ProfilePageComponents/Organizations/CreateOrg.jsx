/* eslint-disable func-names */
import { useEffect, useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { nanoid } from 'nanoid';
import { Card, Col, Container, Row } from '../../Layout';
import { InputField } from '../../FormComponents';
import { Button } from '../../Button';
import { createOrg } from '../../../utils/actionHelpers';
import { useOrg } from '../../../contexts';

export const CreateOrg = ({ classes }) => {
  const [formValues, setFormValues] = useState({ members: [], name: '' });
  const [emails, setEmails] = useState([]);
  const [memberEmail, setMemberEmail] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const { setOrganizations } = useOrg();

  const addOrg = async () => {
    if (formValues.name.trim().length > 0) {
      const { error, organization } = await createOrg(formValues);
      if (error) {
        setErrMsg(error.message);
      } else {
        console.log(error, organization);
        setOrganizations((prev) => [...prev, organization]);
      }
      setEmails([]);
      setFormValues({ members: [], name: '' });
    } else {
      setErrMsg('Empty Fields');
    }
  };

  const addMember = (e) => {
    e.preventDefault();
    if (e.key === 'Enter') {
      setEmails((prev) => [...prev, { email: memberEmail, id: nanoid() }]);
      setFormValues(function (prevState) {
        return { ...prevState, members: [...formValues.members, memberEmail] };
      });
      setMemberEmail('');
    }
  };

  const removeMember = ({ email, id }) => {
    setEmails((prev) => prev.filter((member) => member.id !== id));
    setFormValues(function (prevState) {
      return { ...prevState, members: formValues.members.filter((member) => member !== email) };
    });
  };

  useEffect(
    () => () => {
      setErrMsg('');
    },
    []
  );

  return (
    <>
      <Row className={classes.formHead}>Enter Organization details</Row>
      <Row className={classes.error}>
        <p className={classes.errorPara}>{errMsg}</p>
      </Row>
      <div className={classes.form}>
        <InputField
          changeCallback={(e) =>
            setFormValues(function (prev) {
              return { ...prev, name: e.target.value };
            })
          }
          value={formValues.name}
          name='organization name'
          placeholder='Enter name'
          type='email'
          label='Organization Name'
        />
        <InputField
          changeCallback={(e) => setMemberEmail(e.target.value)}
          value={memberEmail}
          name='Add Member'
          placeholder='Enter email'
          type='email'
          label='Add Members'
          onKeyUp={(e) => addMember(e)}
        />
        <div>
          {emails.map((member) => (
            <p key={member.id} className={classes.member}>
              <span>{member.email}</span>
              <button>
                <FiTrash2 color='red' size='20' onClick={() => removeMember(member)} />
              </button>
            </p>
          ))}
        </div>
        <Button onClick={addOrg} margin='1rem 0'>
          Create
        </Button>
      </div>
    </>
  );
};
