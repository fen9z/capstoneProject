import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// pages
import Home from './pages/Home';
import Hold from './pages/Hold';
import Booking from './pages/Booking';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminPanel from './pages/admin/AdminPanel';
import Navbar from './components/Navbar';
import Product from './pages/Product';

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="/Hold"
              element={user ? <Hold /> : <Navigate to="/login" />}
            />
            <Route
              path="/Booking"
              element={user ? <Booking /> : <Navigate to="/login" />}
            />
            <Route
              path="/Chat"
              element={user ? <Chat /> : <Navigate to="/login" />}
            />
            <Route
              path="/Product/*"
              element={user ? <Product /> : <Navigate to="/login" />}
            />
            {/* Add admin panel route */}
            {/* add admin default redirect Route */}
            <Route
              path="/admin"
              element={
                user && user.isAdmin ? (
                  <Navigate to="/admin/users" replace />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/admin/*"
              element={
                user && user.isAdmin ? <AdminPanel /> : <Navigate to="/" />
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
