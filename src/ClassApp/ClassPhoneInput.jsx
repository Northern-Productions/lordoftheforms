import { Component, createRef } from "react";
import { ErrorMessage } from "../ErrorMessage";

export class ClassPhoneInput extends Component {
  constructor(props) {
    super(props);
    this.input1 = createRef();
    this.input2 = createRef();
    this.input3 = createRef();
    this.input4 = createRef();
  }

  phoneInputHandler = (index) => (e) => {
    const newState = this.props.phoneInputState.map(
      (phoneInput, phoneInputIndex) =>
        index === phoneInputIndex ? e.target.value : phoneInput
    );
    this.props.setPhoneInputState(newState);
  };

  handleInput = (e, nextInput) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) {
      e.target.value = value.slice(0, -1);
    } else if (value.length >= e.target.maxLength && nextInput) {
      nextInput.current.focus();
    }
  };

  handleBackspace = (e, prevInput) => {
    if (
      e.target.value.length === 0 &&
      (e.key === "Backspace" || e.key === "Delete") &&
      prevInput
    ) {
      prevInput.current.focus();
    }
  };

  render() {
    const { shouldErrorShowUp, errorMessageText } = this.props;
    return (
      <>
        <div className="input-wrap">
          <label htmlFor="phone">Phone:</label>
          <div id="phone-input-wrap">
            <input
              ref={this.input1}
              type="tel"
              maxLength={2}
              onKeyDown={(e) => this.handleBackspace(e, null)}
              onInput={(e) => this.handleInput(e, this.input2)}
              value={this.props.phoneInputState[0]}
              onChange={this.phoneInputHandler(0)}
              id="phone-input-1"
              placeholder="55"
            />
            -
            <input
              ref={this.input2}
              type="tel"
              maxLength={2}
              onKeyDown={(e) => this.handleBackspace(e, this.input1)}
              onInput={(e) => this.handleInput(e, this.input3)}
              value={this.props.phoneInputState[1]}
              onChange={this.phoneInputHandler(1)}
              id="phone-input-2"
              placeholder="55"
            />
            -
            <input
              ref={this.input3}
              type="tel"
              maxLength={2}
              onKeyDown={(e) => this.handleBackspace(e, this.input2)}
              onInput={(e) => this.handleInput(e, this.input4)}
              value={this.props.phoneInputState[2]}
              onChange={this.phoneInputHandler(2)}
              id="phone-input-3"
              placeholder="55"
            />
            -
            <input
              ref={this.input4}
              type="tel"
              maxLength={1}
              onKeyDown={(e) => this.handleBackspace(e, this.input3)}
              onInput={(e) => this.handleInput(e, null)}
              value={this.props.phoneInputState[3]}
              onChange={this.phoneInputHandler(3)}
              id="phone-input-4"
              placeholder="5"
            />
          </div>
        </div>

        <ErrorMessage message={errorMessageText} show={shouldErrorShowUp} />
      </>
    );
  }
}
