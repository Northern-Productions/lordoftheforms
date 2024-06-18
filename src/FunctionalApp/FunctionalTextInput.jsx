import { ErrorMessage } from "../ErrorMessage";

export const FunctionalTextInput = ({
  inputProps,
  updateStateFunction,
  shouldErrorShowUp,
  errorMessageText,
}) => {
  const { id } = inputProps;
  return (
    <>
      <div className="input-wrap">
        <label htmlFor={id}>{id}:</label>
        <input
          type="text"
          {...inputProps}
          onChange={(e) => {
            updateStateFunction(e.target.value);
          }}
        />
      </div>
      <ErrorMessage message={errorMessageText} show={shouldErrorShowUp} />
    </>
  );
};

export default FunctionalTextInput;
