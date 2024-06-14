import { useRef } from "react";

export const FunctionalPhoneInput = ({
  phoneInputState,
  setPhoneInputState,
}) => {
  const input1 = useRef(null);
  const input2 = useRef(null);
  const input3 = useRef(null);
  const input4 = useRef(null);

  const phoneInputHandler = (index) => (e) => {
    const newState = phoneInputState.map((phoneInput, phoneInputIndex) =>
      index === phoneInputIndex ? e.target.value : phoneInput
    );
    setPhoneInputState(newState);
  };

  const handleInput = (e, nextInput) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) {
      e.target.value = value.slice(0, -1);
    } else if (value.length >= e.target.maxLength && nextInput) {
      nextInput.current.focus();
    }
  };

  const handleBackspace = (e, prevInput) => {
    if (
      e.target.value.length === 0 &&
      (e.key === "Backspace" || e.key === "Delete") &&
      prevInput
    ) {
      prevInput.current.focus();
    }
  };

  return (
    <div className="input-wrap">
      <label htmlFor="phone">Phone:</label>
      <div id="phone-input-wrap">
        <input
          ref={input1}
          type="tel"
          maxLength={2}
          onKeyDown={(e) => handleBackspace(e, null)}
          onInput={(e) => handleInput(e, input2)}
          value={phoneInputState[0]}
          onChange={phoneInputHandler(0)}
          id="phone-input-1"
          placeholder="55"
        />
        -
        <input
          ref={input2}
          type="tel"
          maxLength={2}
          onKeyDown={(e) => handleBackspace(e, input1)}
          onInput={(e) => handleInput(e, input3)}
          value={phoneInputState[1]}
          onChange={phoneInputHandler(1)}
          id="phone-input-2"
          placeholder="55"
        />
        -
        <input
          ref={input3}
          type="tel"
          maxLength={2}
          onKeyDown={(e) => handleBackspace(e, input2)}
          onInput={(e) => handleInput(e, input4)}
          value={phoneInputState[2]}
          onChange={phoneInputHandler(2)}
          id="phone-input-3"
          placeholder="55"
        />
        -
        <input
          ref={input4}
          type="tel"
          maxLength={1}
          onKeyDown={(e) => handleBackspace(e, input3)}
          onInput={(e) => handleInput(e, null)}
          value={phoneInputState[3]}
          onChange={phoneInputHandler(3)}
          id="phone-input-4"
          placeholder="5"
        />
      </div>
    </div>
  );
};
