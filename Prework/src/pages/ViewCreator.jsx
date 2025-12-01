import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ContentCreator from "../Components/ContentCreator.jsx";
import { supabase } from '../client';

const ViewCreator = () => {
    const { id } = useParams();
    const [creator, setCreator] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const fetchCreator = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from('creators')
                    .select('*')
                    .eq('id', id)
                    .single();

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
        <div className="CreatorInfo">
            <Link to="/"> HOME </Link>
            <h1> Creator: {creator.name}</h1>
            <h2> Description: {creator.description} </h2>
            <a href={creator.url} target="_blank"> <h2> URL: {creator.url} </h2> </a>
            <img src={creator.imageURL ?? ''} alt="Creator Image" height="230px"/>

            <div className="CreatorWidgets">
                 <Link to={`/edit/${creator.id}`}> <button> Edit Creator </button> </Link> 
                <button> Delete Creator </button>
            </div>
        </div>
    );
};

export default ViewCreator;