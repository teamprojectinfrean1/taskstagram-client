import "./AuthMain.css";
import LogoAndName from "../components/auth/common/LogoAndName";
import LoginForm from "../components/auth/component/LoginForm";
import SignupForm from "../components/auth/component/SignupForm";
import FindEmailForm from "../components/auth/component/FindEmail";
import FindPasswordForm from "../components/auth/component/FindPasswordForm";
import { Box } from "@mui/material";

interface ProysType {
  formType: string;
}

const AuthMain = (props: ProysType) => {
  let formComponent;

  switch (props.formType) {
    case "login":
      formComponent = <LoginForm />;
      break;
    case "signup":
      formComponent = <SignupForm />;
      break;
    case "find-username":
      formComponent = <FindEmailForm />;
      break;
    case "find-password":
      formComponent = <FindPasswordForm />;
      break;
    default:
      formComponent = <LoginForm />;
  }

  return (
    <>
      <div className="auth-bgcolor">
        <div className="base-layout">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <LogoAndName />
            <Box
              className="base-login-layout form-size"
              boxShadow={10}
            >
              {formComponent}
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthMain;
