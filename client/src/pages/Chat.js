import { useEffect } from 'react';
// import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

// components
// import WorkoutDetails from '../components/WorkoutDetails';
// import WorkoutForm from '../components/WorkoutForm';

const Chat = () => {
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
    <div className="chat">
      <h1>Chat</h1>
      <textarea rows={20}></textarea>
    </div>
  );
};

export default Chat;
