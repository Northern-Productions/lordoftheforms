import { useState } from "react";
import { ProfileInformation } from "../ProfileInformation";
import { FunctionalForm } from "./FunctionalForm";

export const FunctionalApp = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    phone: "",
  });

  const [validUserData, setValidUserData] = useState(false);

  return (
    <>
      <h2>Functional</h2>
      <ProfileInformation userData={userData} validUserData={validUserData} />
      <FunctionalForm
        setUserData={setUserData}
        setValidUserData={setValidUserData}
      />
    </>
  );
};
