import { useHoldContext } from '../hooks/useHoldContext';
//date-fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useAuthContext } from '../hooks/useAuthContext';

const HoldDetails = ({ hold }) => {
  const { dispatch } = useHoldContext();
  const { user } = useAuthContext();
  const handleClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch('/api/hold/' + hold._id, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: 'DELETE_HOLD', payload: json });
    }
  };
  return (
    <div className="workout-details" style={{ border: '1px solid grey' }}>
      <h4 style={{ color: '#c00' }}>{hold.name}</h4>
      <p>
        <strong>Item Id: </strong>
        {hold.itemId}
      </p>
      <p>
        <strong>Category: </strong>
        {hold.category}
      </p>
      <p>
        <strong>StorePlace: </strong>
        {hold.storePlace}
      </p>
      <p>
        <strong>price: </strong>
        {hold.price}
      </p>
      <p>
        <strong>description: </strong>
        {hold.description}
      </p>
      <p>
        {formatDistanceToNow(new Date(hold.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        Cancel
      </span>
    </div>
  );
};

export default HoldDetails;
