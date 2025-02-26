import React from "react";
import StyledButton from "../ui/StyledButton";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <StyledButton onClick={() => (window.location.href = "/dashboard")} name={"Login"} variant="primary"/>
 
    </div>
  );
};

export default LoginPage;
