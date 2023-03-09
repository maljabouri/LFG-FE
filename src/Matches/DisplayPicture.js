import React from 'react';

function DisplayPicture({ imageUrl }) {
  return (
    <img src={imageUrl} alt="Profile Picture" />
  );
}

export default DisplayPicture;
