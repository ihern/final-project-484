// import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginPage from './components/LoginPage';
import MVP from './components/MVP';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <LoginPage />} />
          <Route path="/mvp" element={ <MVP />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
;