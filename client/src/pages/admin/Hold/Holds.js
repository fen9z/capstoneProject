import { useEffect } from 'react';

const Holds = () => {
  // const { workouts, dispatch } = useWorkoutsContext();

  useEffect(() => {
    // const fetchWorkouts = async () => {
    //   const response = await fetch('/api/workouts');
    //   const json = await response.json();
    //   if (response.ok) {
    //     dispatch({ type: 'SET_WORKOUTS', payload: json });
    //   }
    // };
    // fetchWorkouts();
  }, []);

  return (
    <div className="users">
      <h1>Holds</h1>
    </div>
  );
};

export default Holds;
