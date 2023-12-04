import { useEffect } from 'react';
import '../style/home.css';
// import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

// components
// import WorkoutDetails from '../components/WorkoutDetails';
// import WorkoutForm from '../components/WorkoutForm';
import Card from '../components/card';
import SearchBar from '../components/SearchBar';

const Home = () => {
  // const { workouts, dispatch } = useWorkoutsContext();

  useEffect(() => {
    // const fetchWorkouts = async () => {
    //   const response = await fetch('/api/workouts');
    //   const json = await response.json();
    //   if (response.ok) {
    //     // dispatch({ type: 'SET_WORKOUTS', payload: json });
    //   }
    // };
    // fetchWorkouts();
  }, []);

  return (
    <div>
      {/* <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails workout={workout} key={workout._id} />
          ))}
      </div>
      <WorkoutForm /> */}
      <SearchBar />
      <div className="home">
        <Card card={'Hold'} />
        <Card card={'Booking'} />
        <Card card={'Chat'} />
      </div>
    </div>
  );
};

export default Home;
