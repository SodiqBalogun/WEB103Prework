import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../client';
import ContentCreator from "../Components/ContentCreator.jsx";

const ViewCreators = () => {
  const { id } = useParams();
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchCreator = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.from('creators').select('*').eq('id', id).single();
        if (error) {
          console.error('Error fetching creator:', error);
          setCreator(null);
        } else {
          setCreator(data);
        }
      } catch (err) {
        console.error('Unexpected error fetching creator:', err);
        setCreator(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCreator();
  }, [id]);

  if (loading) return <div>Loading creator...</div>;
  if (!creator) return (
    <div>
      <p>Creator not found.</p>
      <Link to="/">Back</Link>
    </div>
  );

  return (
    <div>
      <Link to="/">← Back</Link>
      <ContentCreator
        name={creator.name}
        url={creator.url}
        description={creator.description}
        imageURL={creator.image_url ?? creator.imageURL ?? ''}
      />
    </div>
  );
};

export default ViewCreators;
