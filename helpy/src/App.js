import React, { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import { supabase } from './SupabaseClient';
import Sidebar from './Sidebar';

function App() {
  const [view, setView] = useState('SignUp'); // default to 'SignUp'
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error(error);
      } else {
        setSession(data.session);
        if (data.session) {
          setView('Home');
        }
      }
      setLoading(false); // Set loading to false after session check
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setView(session ? 'Home' : 'Login');
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setView('Login'); // Redirect to login page after logout
  };

  if (loading) {
    return <div>Loading...</div>; // Render a loading indicator
  }

  return (
    <div className="container-fluid secondary min-vh-100">
      <div className="row">
        <div className="col-2 bg-white vh-100">
          {session && <Sidebar handleLogout={handleLogout} />} {/* Pass handleLogout as prop */}
        </div>
        <div className="col">
          {view === 'Home' && session && <Home />}
          {view === 'Login' && <Login setView={setView} />}
          {view === 'SignUp' && <SignUp setView={setView} />}
        </div>
      </div>
      {session && (
        <div className="dropdown position-fixed" style={{ right: 10, top: 10 }}>
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            User Options
          </button>
          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
            <li><a className="dropdown-item" href="#">Profile</a></li>
            <li><a className="dropdown-item" href="#">Settings</a></li>
            <li>
              <a className='list-group-item py-2' onClick={handleLogout} style={{ cursor: 'pointer' }}>
                <i className='bi bi-power fs-5 me-3'></i>
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
