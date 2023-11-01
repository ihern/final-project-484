import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import MVP from './components/MVP';
import PersonalSurvey from './components/PersonalSurvey';
// import { supabase } from './services/supabase';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/landing" element={ <LandingPage />} />
          <Route path="/" element={ <LoginPage />} />
          <Route path="/mvp" element={ <MVP />} />
          <Route path="/signup" element={ <PersonalSurvey />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;