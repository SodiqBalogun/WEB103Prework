import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ContentCreator from "../Components/ContentCreator.jsx";
import { supabase } from '../client';

const ViewCreator = () => {
    const { id } = useParams();
    const [creator, setCreator] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

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

    const deleteCreator = async () => {
        if (confirm("Are you sure you want to delete this creator? This action cannot be undone.")) {
            const { error } = await supabase
                .from('creators')
                .delete()
                .eq('id', id);
            if (error) console.error("Error updating creator:", error);
            else {
                alert("Creator deleted successfully.");
                navigate("/");
            }
        } else {
            alert("Creator deletion cancelled.");
        }
    };

    return (
        <div className="CreatorInfo">
            <h1> Creator: {creator.name}</h1>
            <h2> Description: {creator.description} </h2>
            <a href={creator.url} target="_blank"> <h2> URL: {creator.url} </h2> </a>
            <img src={creator.imageURL ?? ''} alt="Creator Image" height="230px"/>

            <div className="CreatorWidgets">
                <Link to={`/edit/${creator.id}`}> <button> Edit Creator </button> </Link> 
                <button onClick={deleteCreator}> Delete Creator </button>
            </div>
        </div>
    );
};

export default ViewCreator;