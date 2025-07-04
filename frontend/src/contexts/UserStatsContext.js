import React, { createContext, useContext } from 'react';
import { useUserStats } from '../hooks/useUserStats';

const UserStatsContext = createContext(undefined);

/**
 * UserStatsProvider component
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export const UserStatsProvider = ({ children }) => {
  const userStatsHook = useUserStats();

  return (
    <UserStatsContext.Provider value={userStatsHook}>
      {children}
    </UserStatsContext.Provider>
  );
};

/**
 * Hook to use user stats context
 * @returns {Object} User stats context value
 */
export const useUserStatsContext = () => {
  const context = useContext(UserStatsContext);
  if (context === undefined) {
    throw new Error('useUserStatsContext must be used within a UserStatsProvider');
  }
  return context;
};

export default UserStatsContext;
