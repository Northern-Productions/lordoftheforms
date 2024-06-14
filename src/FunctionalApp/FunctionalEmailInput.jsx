export const FunctionalEmailInput = ({
  emailInputState,
  setEmailInputState,
}) => {
  return (
    <div className="input-wrap">
      <label>{"Email"}:</label>
      <input
        type="email"
        placeholder="bilbo-baggins@adventurehobbits.net"
        value={emailInputState}
        onChange={(e) => {
          setEmailInputState(e.target.value);
        }}
      />
    </div>
  );
};
