import { Input, Button } from "reactstrap";
import { FaTrash } from "react-icons/fa";

function ColorItem({ id, onColorChange, value, onDelete }) {
  return (
    <div className='d-flex flex-row align-items-center'>
      <p className='m-2'>#{id}</p>
      <Input
        type='color'
        className='p-0 m-2'
        onChange={(e) => onColorChange(id, e.target.value)}
        value={value}
      />
      <Button color='danger' onClick={() => onDelete(id)}>
        <FaTrash />
      </Button>
    </div>
  );
}

export default ColorItem;
