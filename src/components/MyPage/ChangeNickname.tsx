import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Typography, Box, Button } from "@mui/material";
import NicknameInput from "../auth/NicknameInput";
import { useState } from "react";
import theme from "@/theme/theme";

const ChangeNickname = () => {
  const [nickname, setNickname] = useState("");

  return (
    <>
      {/* <Box
        boxShadow={10}
        sx={{
          height: "90%",
          backgroundColor: "white",
          minWidth: "600px",
          borderRadius: "7px",
        }}
      > */}
        <Link to="/mypage">
          <ArrowBackIcon
            fontSize="large"
            sx={{ m: 3, color: "#5F6368", position: "absolute" }}
          />
        </Link>
        <Box className="base-layout" sx={{ mt: 5 }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            닉네임 변경
          </Typography>
        </Box>
        <Box
          className="base-layout"
          sx={{
            border: "1px solid #F0F0F0",
            minHeight: "70%",
            borderRadius: "7px",
            mt: 2,
          }}
        >
          <Box sx={{ width: "90%", margin: "auto" }}>
            <Box sx={{ my: 7, textAlign: "center" }}>
              <Typography variant="h6">일정타그램에서 사용할</Typography>
              <Typography variant="h6">새로운 이름을 입력해주세요.</Typography>
            </Box>
            <NicknameInput nickname={nickname} setNickname={setNickname} />
            <Button
              variant="contained"
              size="large"
              fullWidth
              sx={{
                bgcolor: `${theme.palette.secondary.main}`,
                borderRadius: "7px",
                mt: 5,
              }}
              // onClick={}
            >
              변경
            </Button>
          </Box>
        </Box>
      {/* </Box> */}
    </>
  );
};

export default ChangeNickname;
