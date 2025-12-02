import { useEffect, useState } from 'react';
import { supabase } from '../client';
import { useParams, Link, useNavigate } from 'react-router-dom';

const EditCreators = () => {
  const { id } = useParams();
  const [originalName, setOriginalName] = useState('');
  const [originalURL, setOriginalURL] = useState('');
  const [originalDescription, setOriginalDescription] = useState('');
  const [originalImageURL, setOriginalImageURL] = useState('');

  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');
  const navigate = useNavigate();
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
                      setOriginalName(null);
                      setOriginalURL(null);
                      setOriginalDescription(null);
                      setOriginalImageURL(null);
                  } else {
                      setOriginalName(data.name);
                      setOriginalURL(data.url);
                      setOriginalDescription(data.description);
                      setOriginalImageURL(data.imageURL);
                  }
              } catch (err) {
                  console.error('Unexpected error fetching creator:', err);
                  setOriginalName(null);
                  setOriginalURL(null);
                  setOriginalDescription(null);
                  setOriginalImageURL(null);
              } finally {
                  setLoading(false);
              }
          };
  
          fetchCreator();
      }, [id]);

  if (loading) return <div>Loading creator...</div>;

  const updateCreator = async () => {
         // Validate required fields
        if (!name || !url || !description) {
        alert('Please provide a Name, URL, and Description for the creator.');
        return;
        }
        
        const { error } = await supabase
            .from('creators')
            .update({ name, url, description, imageURL })
            .eq('id', id);

        if (error) console.error("Error updating creator:", error);
        else {
            alert("Creator updated successfully!");
            navigate(`/view/${id}`);
        }
    };

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
    <div className="EditCreator">
        <h1> Editing Creator: {originalName} </h1>

        <h2> Current Values </h2>
        <p> Name: {originalName} </p>
        <p> URL: {originalURL} </p>
        <p> Description: {originalDescription} </p>
        <img src={originalImageURL} />

        <form> 
          <label for="cName"> Creator Name: </label> <br/>
          <input type="text" id="cName" name="cName" onChange={(e) => setName(e.target.value)} /> <br/>

          <label for="cURL"> Creator URL: </label> <br/>
          <input type="text" id="cURL" name="cURL" onChange={(e) => setUrl(e.target.value)} /> <br/>

          <label for="cDesc"> Creator Description: </label> <br/>
          <textarea id="cDesc" name="cDesc" rows="5" onChange={(e) => setDescription(e.target.value)} /> <br/>

          <label for="cImgURL"> Creator Image URL: </label> <br/>
          <input type="text" id="cImgURL" name="cImgURL" onChange={(e) => setImageURL(e.target.value)} /> <br/>
        </form>
        
        <div className="editCreatorButtons">
            <button onClick={updateCreator}> Update Creator </button>
            <button onClick={deleteCreator}> Delete Creator </button>
        </div>

    </div>
  )
}

export default EditCreators;