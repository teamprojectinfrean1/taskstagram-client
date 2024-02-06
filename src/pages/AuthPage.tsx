import "./AuthPage.css";
import LogoAndName from "../components/LogoAndName";
import LoginForm from "../components/auth/LoginForm";
import SignupForm from "../components/auth/SignupForm";
import FindEmailForm from "../components/auth/FindEmailForm";
import FindPasswordForm from "../components/auth/FindPasswordForm";
import SignupSuccess from "../components/auth/SignupSuccess";
import { Box } from "@mui/material";

interface ProysType {
  formType: string;
}

const AuthPage = (props: ProysType) => {
  let formComponent;

  switch (props.formType) {
    case "login":
      formComponent = <LoginForm />;
      break;
    case "signup":
      formComponent = <SignupForm />;
      break;
    case "find-email":
      formComponent = <FindEmailForm />;
      break;
    case "find-password":
      formComponent = <FindPasswordForm />;
      break;
    case "signup-success":
      formComponent = <SignupSuccess />;
      break;

    default:
      formComponent = <LoginForm />;
  }

  return (
    <>
      <Box className="auth-bgcolor">
        <Box className="base-layout">
          {props.formType === "signup" ? (
            <Box sx={{ display: "flex", justifyContent:"center"}}>
              <Box className="signup-form-size" boxShadow={10}>
                {formComponent}
              </Box>
            </Box>
          ) : (
            <>
              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                <LogoAndName />
                <Box className="form-size" boxShadow={10}>
                  {formComponent}
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default AuthPage;
