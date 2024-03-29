import React from "react";
import PixelBoardForm from "@components/common/PixelBoardForm";

function CreateBoardPage() {
  const handleSubmit = (formData) => {
    console.log("Création avec :", formData);
  };

  return (
    <div>
      <h2>Créer un PixelBoard</h2>
      <PixelBoardForm initialData={{}} onSubmit={handleSubmit} />
    </div>
  );
}

export default CreateBoardPage;
