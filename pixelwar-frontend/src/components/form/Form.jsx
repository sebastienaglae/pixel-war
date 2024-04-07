import { useState } from "react";
import axios from "axios";

const Form = (props) => {
  const { apiUrl } = props;
  const BACKEND_URL = apiUrl;
  const [formData, setFormData] = useState({
    name: "untitled",
    width: 3,
    height: 3,
    author: "unknown",
    overwrite: true,
    reinsert_delay: 0,
    duration: 30,
    creation_date: new Date().toISOString(),
  });

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      // TODO: update field author
      await axios.post(BACKEND_URL + "/create-pixelboard", formData);
    } catch (error) {
      console.error("Error creating pixel board: ", error);
    }
  };

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  return (
    <div>
      <h2>Create Pixel Board</h2>
      <form onSubmit={handleCreate}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <br />
        <label>Nb Pixels Width:</label>
        <input
          type="number"
          name="width"
          min={3}
          max={100}
          value={formData.width}
          onChange={handleChange}
          required
        />
        <br />
        <label>Nb Pixels Height:</label>
        <input
          type="number"
          name="height"
          min={3}
          max={100}
          value={formData.height}
          onChange={handleChange}
          required
        />
        <br />
        <label>Overwrite Concurrent Pixel:</label>
        <input
          type="checkbox"
          name="overwrite"
          checked={formData.overwrite}
          onChange={handleChange}
        />
        <br />
        <label>Reinsert Delay:</label>
        <input
          type="number"
          name="reinsert_delay"
          value={formData.reinsert_delay}
          onChange={handleChange}
          required
        />
        <br />
        <label>Duration:</label>
        <input
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          required
        />
        <br />

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default Form;
