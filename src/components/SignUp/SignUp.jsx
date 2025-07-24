import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../firebase';

const auth = getAuth(app)

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior (page reload)
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Email:', email);
    // Clear the form fields after submission (optional)
    setUsername('');
    setPassword('');
    setEmail('');
  };

  const createUser = () => {
    createUserWithEmailAndPassword(auth, email, username, password).then(() => alert('Success!'));
  }
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px', maxWidth: '300px', margin: '50px auto' }}>
      <h2 className='m-2 p-2 flex items-center justify-center'>Sign In</h2>
      <form onSubmit={handleSubmit}>
      <div>
          <label htmlFor="username">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', margin: '5px 0', border: '2px solid black' }}
          />
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', margin: '5px 0', border: '2px solid black' }}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', margin: '5px 0', border: '2px solid black' }}
          />
        </div>
        <button onClick={createUser} type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Sign In
        </button>
      </form>
    </div>
  );
}

export default SignUp;