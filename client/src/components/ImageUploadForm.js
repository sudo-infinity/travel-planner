import React, {  useState } from 'react';

const ImageUploadForm = ({tripId}) => {

  const handleImageChange = async(event) => {
    const files = event.target.files;
    const imagesArray = Array.from(files);


    const formData = new FormData();
        for (let i = 0; i < imagesArray?.length; i++) {
          formData.append('images', imagesArray[i]);
        }
    
        try {
          const response = await fetch(`http://localhost:1337/api/trips/upload?trip_id=${tripId}`, {
            method: 'POST',
            body: formData
          });
    
          if (response.ok) {
            const data = await response.json();
            window.location.reload();
            console.log('Images uploaded. Image URLs:', data.imageUrls);
          } else {
            console.error('Error uploading images.');
          }
        } catch (error) {
          console.error('Error:', error);
        }
  };

  const handleImageUpload =  () => {
    document.getElementById("fileInput").click()   
  };

  
 
  return (
    <div className="m-3">
      <label className="mx-3">Add more images: </label>
      <input type="file" hidden id="fileInput" onChange={handleImageChange} />
      <button className="btn btn-outline-primary" onClick={handleImageUpload}>Upload File</button>
    </div>
  );
};

export default ImageUploadForm;