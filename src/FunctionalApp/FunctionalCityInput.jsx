import { capitalize } from "../utils/transformations";

export const FunctionalCityInput = ({ cityInputState, setCityInputState }) => {
  return (
    <div className="input-wrap">
      <label>{"City"}:</label>
      <input
        type="text"
        list="cities"
        placeholder="Hobbiton"
        value={cityInputState}
        onChange={(e) => {
          setCityInputState(capitalize(e.target.value));
        }}
      />
    </div>
  );
};
