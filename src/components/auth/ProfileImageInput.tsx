import { Box, Button, Typography, Avatar } from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import { styled } from "@mui/material/styles";
import React, { useEffect, useRef, useState } from "react";
import basicProfileImage from "@/assets/basicProfileImage.png";

type ProfileImageInputProps = {
  profileImage: File | null;
  setProfileImage(profileImage: File): void;
};

const ProfileImageInput = ({
  profileImage,
  setProfileImage,
}: ProfileImageInputProps) => {
  const [previewImage, setPreviewImage] = useState("");

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    overflow: "hidden",
    position: "absolute",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setProfileImage(selectedFile);
      const previewUrl = URL.createObjectURL(selectedFile);
      setPreviewImage(previewUrl);
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Button
          component="label"
          sx={{
            borderRadius: "50%",
          }}
        >
          <Avatar
            src={previewImage}
            alt={basicProfileImage}
            sx={{
              backgroundColor: "#B2B4B8",
              borderRadius: "50%",
              width: "120px",
              height: "120px",
            }}
          />
          <VisuallyHiddenInput
            type="file"
            onChange={(e) => {
              handleFileChange(e);
            }}
          />
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
