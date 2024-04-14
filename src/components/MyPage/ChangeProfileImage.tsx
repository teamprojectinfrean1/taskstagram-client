import basicProfileImage from "@/assets/basicProfileImage.png";
import {
  Button,
  OutlinedInput,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import styled from "@emotion/styled";
import { useRef, useState, useEffect, ChangeEvent } from "react";
import { useQuery } from "react-query";
import { changeProfileImage } from "@/apis/user";

const ChangeProfileImage = () => {
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    overflow: "hidden",
    position: "absolute",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const [profileImage, setProfileImage] = useState<File | null>(null);

  const acceptFileType = ["image/png", "image/jpg", "image/jpeg"];

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      const imageType = selectedFile.type;
      if (acceptFileType.includes(imageType)) {
        setProfileImage(selectedFile);
      } else {
        alert("이미지 파일의 형식은 .png, .jpg, .jpeg만 가능합니다.");
      }
    }
  };

  const { data, refetch } = useQuery(
    "ChangeProfileImage",
    () => changeProfileImage(profileImage),
    {
      enabled: false,
      cacheTime: 0,
    }
  );

  useEffect(() => {
    if (profileImage) {
      refetch();
    }
  }, [profileImage]);

  return (
    <>
      <img
        src={basicProfileImage}
        alt=""
        style={{
          backgroundColor: "#B2B4B8",
          borderRadius: "50%",
          width: "80px",
          height: "80px",
        }}
      />
      <Button
        sx={{
          backgroundColor: "#F0EFFA",
          borderRadius: "30px",
          height: "40px",
          width: "150px"
        }}
        onClick={handleClick}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            fontFamily: "Outfit",
            color: "#1F1F1F",
            fontSize: '11px'
          }}
        >
          Upload Photo  +
        </Typography>
        <input
          accept="image/png, image/jpeg, image/jpg"
          type="file"
          ref={fileInputRef}
          style={{
            overflow: "hidden",
            position: "absolute",
            clip: "rect(0 0 0 0)",
          }}
          onChange={(e) => {
            handleFileChange(e);
          }}
        />
      </Button>
    </>
  );
};

export default ChangeProfileImage;
