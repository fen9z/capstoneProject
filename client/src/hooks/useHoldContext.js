import { HoldsContext } from '../context/HoldContext';
import { useContext } from 'react';

export const useHoldContext = () => {
  const context = useContext(HoldsContext);
  if (!context) {
    throw Error('useHoldContext must be used inside in HoldContextProvider');
  }
  return context;
};
