import { WorkoutsContext } from '../context/WorkoutContext';
import { useContext } from 'react';

export const useWorkoutsContext = () => {
  const context = useContext(WorkoutsContext);
  if (!context) {
    throw Error(
      'useWrokoutsContext must be used inside in WorkoutsContextProvider'
    );
  }
  return context;
};
