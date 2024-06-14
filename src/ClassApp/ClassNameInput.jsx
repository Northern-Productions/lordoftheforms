import { Component } from "react";
import { capitalize } from "../utils/transformations";

export class ClassNameInput extends Component {
  render() {
    return (
      <div className="input-wrap">
        <label>{this.props.label}:</label>
        <input
          type={this.props.type}
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={(e) => {
            if (!/\d/.test(e.target.value)) {
              this.props.setValue(capitalize(e.target.value));
            }
          }}
        />
      </div>
    );
  }
}
