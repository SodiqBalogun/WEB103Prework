import { useState, useEffect } from 'react';
import ContentCreator from "../Components/ContentCreator.jsx";
import { supabase } from '../client';
import { BrowserRouter, Route, Routes, Link, useRoutes } from 'react-router-dom';
import downArrow from "../assets/downArrow.png";

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
      <h1> Welcome To Creatorverse! </h1> <br/>
      <h2> Here, you can add your favorite creators from various platforms. </h2> <br/> <br/> <br/> <br/> <br/>
      <h2 className="hook"> Below are all the creators currently added: </h2> <br/> <br/>
      <img src={downArrow} alt="down arrow" className="downArrow" width="250" /> <br/>
      <div className="creatorList">
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
                  description={c.description.length >= 150 ?
                     c.description.substring(0, 150) + '...' : 
                     c.description}
                  imageURL={c.imageURL != '' ? c.imageURL : 'https://pngimg.com/d/question_mark_PNG53.png'}
                />
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ShowCreators;