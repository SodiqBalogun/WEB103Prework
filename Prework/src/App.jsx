import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { supabase } from './client.js';

import { BrowserRouter, Route, Routes, Link, useRoutes } from 'react-router-dom';
import AddCreator from "./pages/AddCreator.jsx";
import EditCreator from "./pages/EditCreator.jsx";
import ShowCreators from "./pages/ShowCreators.jsx";
import ViewCreator from "./pages/ViewCreator.jsx";

function App() {
  const [count, setCount] = useState(0);
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const { data, error } = await supabase.from('creators').select('*');
        if (error) {
          console.error('Error fetching creators:', error);
        } else {
          setCreators(data || []);
        }
      } catch (err) {
        console.error('Unexpected error fetching creators:', err);
      }
    };

    fetchCreators();
  }, []);

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
        <Route path="/view/:id" element={<ViewCreator />} />
      </Routes>
      
      </BrowserRouter>
    </div>
  )
}

export default App;
