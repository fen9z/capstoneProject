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

    const response = await fetch('/api/hold/cancel/' + workout._id, {
      method: 'PATCH',
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
      key={workout._id}
      className="d-flex justify-content-between"
      style={{ border: '1px solid grey', padding: '10px', margin: '10px' }}
    >
      <div
        className="md-10"
        style={{
          fontFamily: 'Poppins',
        }}
      >
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
        {workout.isCancelled && (
          <>
            <i className="fa-solid fa-ban" style={{ color: '#ca0000' }}></i>
            <p
              style={{
                color: '#ca0000',
                fontWeight: 'bold',
              }}
            >
              Cancelled
              {workout.whoCancelled.email &&
              workout.whoCancelled.email === user.email
                ? ' by yourself'
                : ' by Staff'}
              {' at ' + new Date(workout.cancelTime).toLocaleString()}
            </p>
            {workout.messageToUser ? (
              <p style={{ color: '#ca0000' }}>
                <i
                  className="fa-solid fa-message"
                  style={{ marginRight: '5px' }}
                ></i>
                {workout.messageToUser}
              </p>
            ) : (
              ''
            )}
            <i className="fa-solid fa-ban" style={{ color: '#ca0000' }}></i>
          </>
        )}
      </div>
      <div className="d-flex flex-column align-items-center">
        {workout.productId.image && (
          <img
            src={workout.productId.image}
            alt={workout.productId.name}
            style={{ maxWidth: '150px', maxHeight: '150pxpx' }}
          />
        )}
        {workout.isCancelled && (
          <p style={{ color: '#ca0000' }}>
            <i className="fa-solid fa-ban"></i>
            Hold Cancelled
            <i className="fa-solid fa-ban"></i>
          </p>
        )}
        <Button
          hidden={workout.isCancelled}
          disabled={workout.isCancelled}
          variant={'warning'}
          className="mt-2"
          onClick={handleClick}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default WorkoutDetails;
