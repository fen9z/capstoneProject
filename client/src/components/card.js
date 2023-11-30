import { Link } from 'react-router-dom';
import book from '../Asset/boook.jpg';
import '../style/styles.css';
const Card = ({ card }) => {
  return (
    <Link to={'/' + card}>
      <div className="card">
        <img src={book} alt="book" style={{ width: '100%', height: '60%' }} />
        <button type="button" className=" mt-2 btns">
          {card}
        </button>
        {/* <h1>{card}</h1> */}
      </div>
    </Link>
  );
};

export default Card;
