import basicProfileImage from "@/assets/basicProfileImage.png";
import { Button, Typography, Avatar } from "@mui/material";
import { useRef, useState, useEffect, ChangeEvent } from "react";
import { useMutation, useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { userInfoState } from "@/stores/userStore";
import { changeProfileImage } from "@/apis/user/changeUserInfoImage";


const ChangeProfileImage = () => {
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

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const memberId = userInfo.memberId;

  const { data, refetch } = useQuery(
    "changeProfileImage",
    () => changeProfileImage({ profileImage, memberId }),
    {
      cacheTime: 0,
      enabled: false,
      onSuccess: (data) => {
        setUserInfo({...userInfo, profileImage: data})
      }
    }
  );

  useEffect(() => {
    if (profileImage) {
      refetch();
    }
  }, [profileImage]);

  return (
    <>
      <Avatar
        src={userInfo.profileImage ? userInfo.profileImage : basicProfileImage}
        sx={{
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
          width: "150px",
        }}
        onClick={handleClick}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            fontFamily: "Outfit",
            fontSize: "11px",
          }}
        >
          Upload Photo +
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
