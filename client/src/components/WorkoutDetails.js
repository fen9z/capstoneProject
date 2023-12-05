import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
//date-fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useAuthContext } from '../hooks/useAuthContext';
import { Button } from 'react-bootstrap';

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const handleClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch('/api/hold/' + workout._id, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: json });
    }
  };
  return (
    <div
      className="d-flex justify-content-between"
      style={{ border: '1px solid grey', padding: '10px', margin: '10px' }}
    >
      <div className="md-10">
        <h4 className="mb-1" style={{ color: '#c00' }}>
          {workout.productId.name}
        </h4>
        <p>
          <strong>Item Id: </strong>
          {workout.productId.itemId}
        </p>
        <p>
          <strong>Category: </strong>
          {workout.productId.category}
        </p>
        <p>
          <strong>StorePlace: </strong>
          {workout.productId.storePlace}
        </p>
        <p>
          <strong>price: </strong>
          {workout.productId.price}
        </p>
        <p>
          <strong>description: </strong>
          {workout.productId.description}
        </p>

        <p>
          <strong>when hold it: </strong>
          {formatDistanceToNow(new Date(workout.createdAt), {
            addSuffix: true,
          })}
        </p>
        <p>
          <a href={workout.productId.realUrl}>View details</a>
        </p>
      </div>
      <div className="d-flex flex-column align-items-center">
        {workout.productId.image && (
          <img
            src={workout.productId.image}
            alt={workout.productId.name}
            style={{ maxWidth: '150px', maxHeight: '150pxpx' }}
          />
        )}
        <Button variant="warning" className="mt-2" onClick={handleClick}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default WorkoutDetails;
