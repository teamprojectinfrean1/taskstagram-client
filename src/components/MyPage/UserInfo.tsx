import { Box, Button } from "@mui/material";
import UserInfoForm from "./UserInfoForm";
import PasswordForm from "./PasswordForm";
import PermissionForm from "./PermissionForm";

const UserInfo = () => {
  return (
    <Box sx={{ p: 5, height: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <img src="favicon.ico"></img>
        <Button>Upload Photo +</Button>
      </Box>
      <UserInfoForm />
      <PasswordForm />
      <PermissionForm />
    </Box>
  );
};

export default UserInfo;
