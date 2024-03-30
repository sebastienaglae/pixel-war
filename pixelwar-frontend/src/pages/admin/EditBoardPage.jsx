import React, { useState, useEffect } from "react";
import PixelBoardForm from "@components/admin/PixelBoardForm";

function EditBoardPage({ boardId }) {
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const loadedData = {
      title: "Titre Existant",
      size: "64",
      delay: "5",
      creationDate: new Date(),
      endDate: new Date(),
      mode: "no-overwrite",
    };

    setInitialData(loadedData);
  }, [boardId]);

  const handleSubmit = (formData) => {
    console.log("Mise à jour avec :", formData);
  };

  return (
    <div>
      <h2>Éditer PixelBoard</h2>
      {initialData && (
        <PixelBoardForm initialData={initialData} onSubmit={handleSubmit} />
      )}
    </div>
  );
}

export default EditBoardPage;
