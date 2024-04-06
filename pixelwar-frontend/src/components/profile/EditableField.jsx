import { Placeholder, CardGroup, CardText, Input } from "reactstrap";

function EditableField({
  isEditing,
  value,
  inputType,
  inputName,
  title,
  loading = true,
}) {
  return (
    <CardGroup className="my-2 d-flex flex-column">
      <div style={{ fontWeight: "bold" }}>
        <Placeholder animation={loading ? null : "wave"}>{title}</Placeholder>
      </div>
      {isEditing ? (
        <Input
          type={inputType}
          defaultValue={value}
          name={inputName}
          id={inputName}
          disabled={loading}
          required
        />
      ) : (
        <CardText>
          <Placeholder animation={loading ? null : "wave"}>{value}</Placeholder>
        </CardText>
      )}
    </CardGroup>
  );
}

export default EditableField;
