import { Link } from 'react-router-dom';
const Card = ({ card }) => {
  return (
    <Link to={'/' + card}>
      <div className="card">
        <h1>{card}</h1>
      </div>
    </Link>
  );
};

export default Card;
