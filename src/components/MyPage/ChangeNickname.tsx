import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Typography, Box, Button } from "@mui/material";
import NicknameInput from "../Auth/NicknameInput";
import { useState } from "react";
import theme from "@/theme/theme";
import { useMutation } from "react-query";
import { changeUserInfo } from "@/apis/user/changeUserInfo";
import { useRecoilState } from "recoil";
import { userInfoState } from "@/stores/userStore";
import ErrorHandling from "../ErrorHandling";
import { ChangeUserInfoRequest } from "@/apis/user/changeUserInfo";

const ChangeNickname = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const memberId = userInfo.memberId;

  const [nickname, setNickname] = useState("");
  const [isNicknameDuplicate, setIsNicknameDuplicate] = useState(false);

  const changeNicknameMutation = useMutation(
    ({ type, value, memberId }: ChangeUserInfoRequest) =>
      changeUserInfo({ type, value, memberId }),
    {
      onSuccess: (data) => {
        console.log(data);
        setUserInfo({ ...userInfo, nickname: data });
        navigate("/mypage/change/success", {
          state: "닉네임",
        });
      },
    }
  );

  return (
    <>
      <Box
        boxShadow={10}
        sx={{
          height: "90%",
          backgroundColor: "white",
          minWidth: "37rem",
          borderRadius: "7px",
        }}
      >
        <Link to="/mypage">
          <ArrowBackIcon
            fontSize="large"
            sx={{ m: 3, color: "#5F6368", position: "absolute" }}
          />
        </Link>
        <Box sx={{ mt: 5 }}>
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
            height: "70%",
            borderRadius: "7px",
            mt: 6,
          }}
        >
          <Box sx={{ width: "90%", margin: "auto" }}>
            <Box sx={{ my: 7, textAlign: "center" }}>
              <Typography variant="h6">일정타그램에서 사용할</Typography>
              <Typography variant="h6">새로운 이름을 입력해주세요.</Typography>
            </Box>
            <NicknameInput
              nickname={nickname}
              setNickname={setNickname}
              isNicknameDuplicate={isNicknameDuplicate}
              setIsNicknameDuplicate={(value) => setIsNicknameDuplicate(value)}
            />
            <Button
              variant="contained"
              size="large"
              fullWidth
              sx={{
                bgcolor: `${theme.palette.secondary.main}`,
                borderRadius: "7px",
                mt: 5,
              }}
              disabled={!isNicknameDuplicate}
              onClick={() =>
                changeNicknameMutation.mutate({
                  type: "nickname",
                  value: nickname,
                  memberId,
                })
              }
            >
              변경
            </Button>
          </Box>
          <ErrorHandling
            error={changeNicknameMutation.error}
            isLoading={changeNicknameMutation.isLoading}
            feature="닉네임 변경"
          />
        </Box>
      </Box>
    </>
  );
};

export default ChangeNickname;
