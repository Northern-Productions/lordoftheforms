import { Component } from "react";

export class ClassEmailInput extends Component {
  render() {
    return (
      <div className="input-wrap">
        <label>{"Email"}:</label>
        <input
          type="email"
          placeholder="bilbo-baggins@adventurehobbits.net"
          value={this.props.emailInputState}
          onChange={(e) => this.props.setEmailInputState(e.target.value)}
        />
      </div>
    );
  }
}
