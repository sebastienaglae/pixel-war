import React from "react";
import { Input } from "reactstrap";

function BoardSorter({ onChange }) {
  return (
    <Input type='select' onChange={(e) => onChange(e.target.value)}>
      <option value='date'>Date</option>
      <option value='title'>Titre</option>
    </Input>
  );
}

export default BoardSorter;
