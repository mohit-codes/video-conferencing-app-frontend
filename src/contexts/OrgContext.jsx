/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getUserOrganizations } from '../utils/actionHelpers';

export const OrgContext = createContext();

export const OrgProvider = ({ children }) => {
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    (async () => {
      const { data, error } = await getUserOrganizations();
      if (error) {
        alert(error);
      } else {
        setOrganizations(data);
      }
    })();
  }, []);

  return (
    <OrgContext.Provider value={{ organizations, setOrganizations }}>
      {children}
    </OrgContext.Provider>
  );
};

export const useOrg = () => useContext(OrgContext);
