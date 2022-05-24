import React from "react";
import EditProfilModal from "../components/EditProfilModal/EditProfilModal";
import NewsFeed from "./NewsFeed";
import "./EditProfil.css";
const EditProfil = () => {
  return (
    <div className="container__global">
      <EditProfilModal />
      <div className="newsfeed">
        <NewsFeed transparent />
      </div>
    </div>
  );
};

export default EditProfil;
