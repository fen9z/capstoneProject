import { useEffect } from 'react';
import '../style/home.css';
// import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

// components
// import WorkoutDetails from '../components/WorkoutDetails';
// import WorkoutForm from '../components/WorkoutForm';
import Card from '../components/card';

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

      <div className="search">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search  Store"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <div className="input-group-append">
            <button className="btn btn-danger" type="button">
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="home">
        <Card card={'Hold'} />
        <Card card={'Booking'} />
        <Card card={'Chat'} />
      </div>
    </div>
  );
};

export default Home;
