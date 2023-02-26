import React, { useState } from "react";
import axios from "axios";

function ImageUploader({ currentImage, onImageChange }) {
  const [fileInput, setFileInput] = useState(null);
  
  const handleFileInputChange = (event) => {
    setFileInput(event.target.files[0]);
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append("image", fileInput);
    
    try {
      const response = await axios.post("/upload-image", formData);
      const newImageURL = response.data.url;
      onImageChange(newImageURL);
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileInputChange} />
      <button type="submit">Upload</button>
    </form>
  );
}

export default ImageUploader;
