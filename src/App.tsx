import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import MVP from './components/MVP';
import PersonalSurvey from './components/PersonalSurvey';
import { supabase } from './services/supabase';
import { Session } from '@supabase/supabase-js';


function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const {data: { session }} = await supabase.auth.getSession();
        setSession(session);
      } catch (error) {
        console.log("error checking session")
      }
    };
    console.log(session);
    checkSession();
  }, []);

  const isAuthenticated = session?.user !== null;

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<LoginPage />}
          />
          <Route
            path="/landing"
            element={isAuthenticated ? <LandingPage/> : <Navigate to ='/' />}
          />
          <Route
            path="/mvp" 
            element={<MVP />} 
          />
          <Route 
            path="/signup" 
            element={<PersonalSurvey />} 
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
