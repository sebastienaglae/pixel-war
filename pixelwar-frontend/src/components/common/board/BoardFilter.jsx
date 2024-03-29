import React from "react";
import { Input } from "reactstrap";

function BoardFilter({ onChange }) {
    return (
      <Input
        type='text'
        placeholder='Filtrer les boards...'
        onChange={(e) => onChange(e.target.value)}
      />
    );
}

export default BoardFilter;
