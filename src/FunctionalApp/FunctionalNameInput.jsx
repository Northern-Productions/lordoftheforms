import { capitalize } from "../utils/transformations";

export const FunctionalNameInput = ({
  label,
  type,
  placeholder,
  value,
  setValue,
}) => {
  return (
    <div className="input-wrap">
      <label>{label}:</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          if (!/\d/.test(e.target.value)) {
            setValue(capitalize(e.target.value));
          }
        }}
      />
    </div>
  );
};
