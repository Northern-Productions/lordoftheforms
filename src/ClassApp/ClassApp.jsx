import { Component } from "react";
import { ClassForm } from "./ClassForm";
import { ProfileInformation } from "../ProfileInformation";

export class ClassApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {
        firstName: "",
        lastName: "",
        email: "",
        city: "",
        phone: "",
        validUserData: false,
      },
    };
  }

  setUserData = (value) => {
    this.setState({ userData: value });
  };

  setValidUserData = (value) => {
    this.setState({ validUserData: value });
  };

  render() {
    return (
      <>
        <h2>Class</h2>
        <ProfileInformation
          userData={this.state.userData}
          validUserData={this.state.validUserData}
        />
        <ClassForm
          setUserData={this.setUserData}
          setValidUserData={this.setValidUserData}
        />
      </>
    );
  }
}

// Make the user data appear in the ProfileInformation component
