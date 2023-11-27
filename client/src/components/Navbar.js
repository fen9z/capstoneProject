import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import "../style/navbar.css"

const Navber = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="container nav" >
        <Link to="/">
          <h1 style={{color:"white"}}>staples</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span style={{marginRight:"10px", color:"white"}}>{user.email}</span>
              <button style={{border:'1px solid #c00',color:"#c00"}} onClick={handleClick}>log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navber;
