import { Box, Button, Typography } from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import { styled } from "@mui/material/styles";

type ProfileImageInputProps = {
  profileImage: string;
  setProfileImage(profileImage: string): void;
};

const ProfileImageInput = ({
  profileImage,
  setProfileImage,
}: ProfileImageInputProps) => {
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    overflow: "hidden",
    position: "absolute",
  });

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          component="label"
          sx={{
            backgroundColor: "#B2B4B8",
            p: 3,
            borderRadius: "50%",
            mt: 3,
          }}
        >
          <FaceIcon sx={{ fontSize: "80px", color: "black" }} />
          <VisuallyHiddenInput type="file" />
        </Button>
      </Box>
      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold">
          프로필 설정
        </Typography>
      </Box>
    </>
  );
};

export default ProfileImageInput;
