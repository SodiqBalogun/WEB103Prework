import { supabase } from '../client';
import { Link } from 'react-router-dom';

const AddCreators = () => {

  const addNewCreator = async (event) => {
    event.preventDefault();

    // Read values from the form fields
    const creatorName = (document.getElementById('cName')?.value || '').trim();
    const creatorURL = (document.getElementById('cURL')?.value || '').trim();
    const creatorDescription = (document.getElementById('cDesc')?.value || '').trim();
    const creatorImageUrl = (document.getElementById('cImgURL')?.value || '').trim();

    // Validate required fields
    if (!creatorName || !creatorURL || !creatorDescription) {
      alert('Please provide a Name, URL, and Description for the creator.');
      return;
    }

    // Map to the actual DB column names used in the supabase table
    const payload = {
      name: creatorName,
      url: creatorURL,
      description: creatorDescription,
      imageURL: creatorImageUrl
    };

    await supabase
        .from('creators')
        .insert(payload)
        .select();

    alert('New Creator added successfully');

    document.getElementById('cName').value = '';
    document.getElementById('cURL').value = '';
    document.getElementById('cDesc').value = '';
    document.getElementById('cImgURL').value = '';
  };


  return (
    <div>
        <h1> Adding a New Creator </h1>

        <form> 
          <label for="cName"> Creator Name </label> <br/>
          <input type="text" id="cName" name="cName" /> <br/>

          <label for="cURL"> Creator URL </label> <br/>
          <input type="text" id="cURL" name="cURL" /> <br/>

          <label for="cDesc"> Creator Description </label> <br/>
          <textarea id="cDesc" name="cDesc" rows="5" /> <br/>

          <label for="cImgURL"> Creator Image URL </label> <br/>
          <input type="text" id="cImgURL" name="cImgURL" /> <br/>
        </form>
        
        <button onClick={addNewCreator}> Add Creator </button>
    </div>
  )
}

export default AddCreators;