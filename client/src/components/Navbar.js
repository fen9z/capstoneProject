import { Link } from 'react-router-dom';
const Navber = () => {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>staples</h1>
        </Link>
        <nav>
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">signup</Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navber;
