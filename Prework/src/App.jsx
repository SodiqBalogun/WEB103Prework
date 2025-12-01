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
        <Link to="/add"> GO TO ADD </Link>

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
