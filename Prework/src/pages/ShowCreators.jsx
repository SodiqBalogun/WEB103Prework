import { useState, useEffect } from 'react';
import ContentCreator from "../Components/ContentCreator.jsx";
import { supabase } from '../client';
import { BrowserRouter, Route, Routes, Link, useRoutes } from 'react-router-dom';

const ShowCreators = () => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreators = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.from('creators').select('*');
        if (error) {
          console.error('Error fetching creators:', error);
          setCreators([]);
        } else {
          setCreators(data || []);
        }
      } catch (err) {
        console.error('Unexpected error fetching creators:', err);
        setCreators([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCreators();
  }, []);

  if (loading) {
    return <div>Loading creators...</div>;
  }

  return (
    <div className="creatorverseMain">
      <h1> Welcome To Creatorverse! </h1>
      {creators.length === 0 ? (
        <p>No content creators in the database.</p>
      ) : (
        creators.map((c) => (
          <div key={c.id ?? c.name} className="creator-card" >
            <Link to={`/view/${c.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ContentCreator
                id={c.id}
                name={c.name}
                url={c.url}
                description={c.description}
                imageURL={c.image_url ?? c.imageURL ?? ''}
              />
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default ShowCreators;