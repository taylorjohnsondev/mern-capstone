import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import GalleryUpload from "../components/GalleryUploader";
const Gallery = () => {
  let params = useParams();
  const [user, setUser] = useState([]);
  const [photos, setPhotos] = useState([]);
  const savedUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    async function fetchUser() {
      const response = await axios.get(
        `http://localhost:3001/photographers/${params.uid}`
      );
      setUser(response.data);
      setPhotos(response.data.photos);
    }
    fetchUser();
  }, [params.uid, photos]);

  return (
    <>
      {savedUser && savedUser.uid === params.uid ? (
        <>
          <div className="gallery-upload-card">
            <div className="gallery-title-upload">
              <h2>Hello @{user.username}!</h2>
              <h4>Want to add photos to your gallery?</h4>
              <GalleryUpload />
            </div>
          </div>
          <div className="gallery-section">
            <div className="row">
              {photos &&
                photos.map((photo, index) => (
                  <div className="col-lg-4 mb-4 mb-lg-0" key={index}>
                    <img src={photo} alt="" />
                  </div>
                ))}
            </div>
          </div>
        </>
      ) : (
        <div className="gallery-section">
          <h2>@{user.username}'s Gallery</h2>
          <div className="gallery-photo-container">
            {photos &&
              photos.map((photo, index) => (
                <div className="gallery-photo-item" key={index}>
                  <img src={photo} alt="" />
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
