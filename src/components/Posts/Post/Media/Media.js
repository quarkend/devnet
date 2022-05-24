import React from "react";

const Media = ({ mediaURL }) => {
  return (
    <div className="media">
      {<img src={mediaURL} alt="myPicture" className="media__img" />}
    </div>
  );
};

export default Media;
