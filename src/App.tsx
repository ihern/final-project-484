import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ClientDashboard from './components/ClientDashboard';
import ClientProfile from './components/ClientProfile';
import Login from './components/Login';
import MVP from './components/MVP';
import Signup from './components/Signup';
import AdminDashboard from './components/AdminDashboard';
import EventDetails from './components/EventDetails';
import { supabase } from './services/supabase';
import { Session } from '@supabase/supabase-js';


const App = () => {
  const [session, setSession] = useState<Session | null>(null);

  const checkSession = async () => {
    try {
      const {data: { session }} = await supabase.auth.getSession();
      setSession(session);
    } catch (error) {
      console.log("error checking session")
    }
    console.log('Session: ', session)
  };

  useEffect(() => {
    checkSession();
  }, []);

  const isAuthenticated = session?.user !== null;

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Login />}
          />
          <Route
            path="/client/dashboard"
            element={isAuthenticated ? <ClientDashboard/> : <Navigate to ='/' />}
          />
          <Route
            path="/client/profile/:userID"
            element={isAuthenticated ? <ClientProfile/> : <Navigate to ='/' />}
            />
          <Route
            path="/mvp" 
            element={<MVP />} 
          />
          <Route 
            path="/signup" 
            element={<Signup />} 
          />
          <Route 
            path="/admin/dashboard" 
            element={isAuthenticated ? <AdminDashboard/> : <Navigate to = '/' />}
          />
          <Route
            path="/event/:eventId"
            element={isAuthenticated ? <EventDetails/> : <Navigate to = '/' />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
