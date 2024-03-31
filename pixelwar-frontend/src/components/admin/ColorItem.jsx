/* eslint-disable react/prop-types */
import { Input, Button } from "reactstrap";
import { FaTrash } from "react-icons/fa";

function ColorItem({ id, onColorChange }) {
  return (
    <div className='d-flex flex-row align-items-center'>
      <p className='m-2'>#{id}</p>
      <Input
        type='color'
        className='p-0 m-2'
        onChange={(e) => onColorChange(id, e.target.value)}
      />
      <Button color='danger'>
        <FaTrash />
      </Button>
    </div>
  );
}

export default ColorItem;
