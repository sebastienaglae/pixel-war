import { useState } from "react";
import PixelBoardForm from "@components/admin/PixelBoardForm";

function CreateBoardPage() {
  const [error, setError] = useState("");
  const handleSubmit = (formData) => {
    console.log("Création avec :", formData);
    setError("Une erreur s'est produite");
  };

  return (
    <div className='mt-5'>
      <h2 className='text-center mb-5'>Créer un nouveau tableau</h2>
      <PixelBoardForm initialData={{}} onSubmit={handleSubmit} error={error} />
    </div>
  );
}

export default CreateBoardPage;
