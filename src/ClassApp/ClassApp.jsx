import { Component } from "react";
import { ClassForm } from "./ClassForm";
import { ProfileInformation } from "../ProfileInformation";

export class ClassApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
    };
  }

  setUserData = (value) => {
    this.setState({ userData: value });
  };

  render() {
    return (
      <>
        <h2>Class</h2>
        <ProfileInformation userData={this.state.userData} />
        <ClassForm setUserData={this.setUserData} />
      </>
    );
  }
}
