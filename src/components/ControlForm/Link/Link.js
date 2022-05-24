import React from "react";

const Link = ({ content, onClick }) => {
  return (
    <p className="link" onClick={onClick}>
      {content}
    </p>
  );
};

export default Link;
