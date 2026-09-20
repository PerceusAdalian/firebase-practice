import './App.css';
import { auth } from './firebase/init';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import React from 'react';

function App() {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const register = () =>
    createUserWithEmailAndPassword(auth, 'test@example.com', 'password123')
      .catch((error) => console.error('Error registering user:', error));

  const signIn = () =>
    signInWithEmailAndPassword(auth, 'test@example.com', 'password123')
      .catch((error) => console.error('Error signing in user:', error));

  const logout = () =>
    signOut(auth)
      .catch((error) => console.error('Error signing out user:', error));

  if (loading) return <p>Loading...</p>;

  return (
    <div className="App">
      <p>{user ? `Signed in as ${user.email}` : 'Not signed in'}</p>
      <button onClick={register}>Register</button>
      <button onClick={signIn}>Sign In</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default App;