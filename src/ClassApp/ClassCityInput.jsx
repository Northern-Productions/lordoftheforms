import { Component } from "react";
import { capitalize } from "../utils/transformations";

export class ClassCityInput extends Component {
  render() {
    return (
      <div className="input-wrap">
        <label>{"City"}:</label>
        <input
          type="text"
          list="cities"
          placeholder="Hobbiton"
          value={this.props.cityInputState}
          onChange={(e) =>
            this.props.setCityInputState(capitalize(e.target.value))
          }
        />
      </div>
    );
  }
}
