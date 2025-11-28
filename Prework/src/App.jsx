import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

import { BrowserRouter, Route, Routes, Link, useRoutes } from 'react-router-dom';
import AddCreator from "./pages/AddCreator.jsx";
import EditCreator from "./pages/EditCreator.jsx";
import ShowCreators from "./pages/ShowCreators.jsx";
import ViewCreators from "./pages/ViewCreators.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <BrowserRouter>

      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR. Yes, I just changed it.
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <Routes>
        <Route path="/" element={<ShowCreators />} />
        <Route path="/add" element={<AddCreator />} />
        <Route path="/edit/:id" element={<EditCreator />} />
        <Route path="/view/:id" element={<ViewCreators />} />
      </Routes>

      </BrowserRouter>
    </div>
  )
}

export default App;
