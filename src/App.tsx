import { useEffect } from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import MVP from './components/MVP';
import PersonalSurvey from './components/PersonalSurvey';
import { supabase } from './services/supabase';

function App() {

  useEffect(() => {
    window.addEventListener('popstate', () => {
      if (window.location.pathname === '/' && !supabase.auth.getUser()) {
        window.history.pushState({}, '', '/');
      }
    });
  }, []);

  return (
    <>
      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={<LoginPage />}
          />
          <Route
            path="/landing"
            element={<LandingPage />}
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
      </HashRouter>
    </>
  );
}

export default App;
