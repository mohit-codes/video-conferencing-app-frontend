/* eslint-disable sort-keys-fix/sort-keys-fix */
import { createUseStyles } from 'react-jss';

export const useOrgStyles = createUseStyles((theme) => ({
  horizontalList: {
    display: 'flex',
    overflowX: 'auto',
    padding: '0.9rem 0.1rem',
    width: '100%'
  },
  formHead: {
    fontSize: '1.5rem',
    fontWeight: '600'
  },
  mblock10: {
    marginBlock: '10px'
  },

  newOrganization: {
    '&>svg': {
      backgroundColor: ' transparent',
      border: 'none',
      boxShadow: '0 4px 15px 3px rgb(0 0 0 / 25%)',
      cursor: 'pointer',
      outline: 'none',
      padding: '0'
    },

    alignItems: 'center',
    display: 'flex',
    height: '18rem',
    justifyContent: 'center'
  },
  member: {
    display: 'flex',
    fontSize: '.875rem',
    fontWeight: '500',
    justifyContent: 'space-between',
    margin: '.625rem 0'
  },
  errorPara: {
    color: 'red'
  }
}));
