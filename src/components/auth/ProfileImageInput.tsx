import { Box, Button, Typography, Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState, useRef } from "react";
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
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    overflow: "hidden",
    position: "absolute",
  });

  const acceptFileType = ["image/png", "image/jpg", "image/jpeg"];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const imageType = selectedFile.type;
      if (acceptFileType.includes(imageType)) {
        setProfileImage(selectedFile);
        const previewUrl = URL.createObjectURL(selectedFile);
        setPreviewImage(previewUrl);
      } else {
        alert("이미지 파일의 형식은 .png, .jpg, .jpeg만 가능합니다.");
      }
    }
  };

  return (
    <>
      <Typography variant="h5" fontWeight="bold">
        프로필 설정
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 3,
        }}
      >
        <Button
          component="label"
          sx={{
            borderRadius: "50%",
          }}
        >
          <Avatar
            src={previewImage ? previewImage : basicProfileImage}
            sx={{
              width: "120px",
              height: "120px",
            }}
          />
          <VisuallyHiddenInput
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={(e) => {
              handleFileChange(e);
            }}
            ref={fileInputRef}
          />
        </Button>
        <Button
          sx={{
            backgroundColor: "#F0EFFA",
            fontSize: "13px",
          }}
          onClick={() => fileInputRef.current?.click()}
        >
          이미지 등록
        </Button>
      </Box>
    </>
  );
};

export default ProfileImageInput;
