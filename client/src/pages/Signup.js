import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';
// import axios from 'axios';
import '../style/styles.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const { signup, isLoading, error } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(email, password);
    await signup(email, password, firstName, lastName, address, postalCode);

    // same time signup user to chatengine server
    // await axios
    //   .post('/api/user/signupChatEngine', {
    //     username: email,
    //     secret: email,
    //     email,
    //     first_name: firstName,
    //     last_name: lastName,
    //   })
    //   .catch((e) => console.log(JSON.stringify(e.response.data)));
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3 style={{ color: '#c00', textAlign: 'center' }}>Sign Up</h3>

      <label>Email address:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <label>firstName:</label>
      <input
        type="text"
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
      />

      <label>lastName:</label>
      <input
        type="text"
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
      />

      <label>Address:</label>
      <input
        type="text"
        onChange={(e) => setAddress(e.target.value)}
        value={address}
      />

      <label>PostalCode:</label>
      <input
        type="text"
        onChange={(e) => setPostalCode(e.target.value)}
        value={postalCode}
      />

      <button className="mt-2 btns" disabled={isLoading}>
        Sign up
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
