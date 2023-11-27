import { useEffect } from 'react';

const Chats = () => {
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
      <h1>Chats</h1>
    </div>
  );
};

export default Chats;
