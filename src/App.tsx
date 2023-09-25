import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div>
      <h1>Speed Dating App</h1>
        {/* <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a> */}
        {/* <a href="https://react.dev" target="_blank">
        </a> */}
          <img src="../images/exacalidraw.png" className="logo" alt="Excali diagram drawing" />
      </div>
      <div className="card">
        {/* <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p> */}
        <a rel="stylesheet" href="https://excalidraw.com/#json=8PE0U9KuKveDcR-_TCkfI,y0evdrK57JE8g_eJkwchBA"><h1>Excalidraw Link</h1></a>
      </div>
      {/* <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App
