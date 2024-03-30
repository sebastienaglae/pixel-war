import React from "react";
import PixelBoardForm from "@components/common/PixelBoardForm";

function CreateBoardPage() {
  const handleSubmit = (formData) => {
    console.log("Création avec :", formData);
  };

  return (
    <div className="mt-5">
      <h2 className='text-center mb-5'>Créer un nouveau tableau</h2>
      <PixelBoardForm initialData={{}} onSubmit={handleSubmit} />
    </div>
  );
}

export default CreateBoardPage;
