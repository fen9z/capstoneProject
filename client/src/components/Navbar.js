import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';

const Navber = () => {
  const { logout } = useLogout();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>staples</h1>
        </Link>
        <nav>
          <div>
            <button onClick={handleClick}>log out</button>
          </div>
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
