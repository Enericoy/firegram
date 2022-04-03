import React, { useState } from 'react';
import ProgressBar from './ProgressBar';


// upload a file, check the file is selected and 
const UploadForm = () => {
    //file state
    const[file,setFile]= useState(null);

    //array of allowed file types
    const types =['image/png', 'image/jpeg'];

    //error state
    const[error, setError]=useState(null);

    const changeHandler = (e) => {
        let selected = e.target.files[0];
        //console.log(selected);

        //check if an image has been selected and if it is the right file type from the set above
        if (selected && types.includes(selected.type)){
            setFile(selected);
            setError('');
            //console.log(file);
        } else {
            setFile(null);
            setError('Please select and image file (png or jpeg)');
            
        }
    }
  return (
    <form>
        <input type='file' onChange={changeHandler} />
        <div className='output'>
            {error && <div className='error'>{error}</div>}
            {file && <div>{file.name}</div>} 
            {file && <ProgressBar file={file} setFile={setFile}/>}
        </div>
    </form>
  )
}

export default UploadForm
