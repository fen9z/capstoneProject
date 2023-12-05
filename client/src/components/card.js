import { Link } from 'react-router-dom';
import book from '../Asset/boook.jpg';
import hold from '../Asset/hold.jpg';
import chat from '../Asset/chat.jpg';

import '../style/styles.css';
const Card = ({ card }) => {
  return (
    <Link to={'/' + card}>
      <div className="card">
        {card === 'Booking' && (
          <img src={book} alt="book" style={{ width: '100%', height: '60%' }} />
        )}
        {card === 'Hold' && (
          <img src={hold} alt="hold" style={{ width: '100%', height: '60%' }} />
        )}
        {card === 'Chat' && (
          <img src={chat} alt="hold" style={{ width: '100%', height: '60%' }} />
        )}
        <button type="button" className=" mt-2 btns">
          {card}
        </button>
        {/* <h1>{card}</h1> */}
      </div>
    </Link>
  );
};

export default Card;
