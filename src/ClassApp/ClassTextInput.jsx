import { Component } from "react";
import { ErrorMessage } from "../ErrorMessage";

export class ClassTextInput extends Component {
  render() {
    const {
      inputProps,
      updateStateFunction,
      shouldErrorShowUp,
      errorMessageText,
    } = this.props;
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
  }
}
