import { useState, useEffect } from 'react';
import ContentCreator from "../Components/ContentCreator.jsx";
import { supabase } from '../client';

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
    <div>
      {creators.length === 0 ? (
        <p>No content creators in the database.</p>
      ) : (
        creators.map((c, idx) => (
          <ContentCreator
            key={c.id ?? c.name ?? idx}
            name={c.name}
            url={c.url}
            description={c.description}
            imageURL={c.image_url ?? c.imageURL ?? ''}
          />
        ))
      )}
    </div>
  );
};

export default ShowCreators;