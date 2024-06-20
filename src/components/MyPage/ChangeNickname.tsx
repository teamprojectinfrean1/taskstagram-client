import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Typography, Box, Button } from "@mui/material";
import NicknameInput from "../Auth/NicknameInput";
import { useEffect, useState } from "react";
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

  const mutateChangeNickname = useMutation(
    ({ type, value, memberId }: ChangeUserInfoRequest) =>
      changeUserInfo({ type, value, memberId })
  );

  useEffect(() => {
    if (mutateChangeNickname.data) {
      setUserInfo({ ...userInfo, nickname: mutateChangeNickname.data });
      navigate("/mypage/change/success", {
        state: "닉네임",
      });
    }
  }, [mutateChangeNickname.data]);

  return (
    <>
      <Box
        boxShadow={2}
        sx={{
          py: 5,
          backgroundColor: `${theme.palette.background.paper}`,
          width: "70%",
          minWidth: "35rem",
          m: "auto",
          borderRadius: "7px",
          height: "40rem",
        }}
      >
        <Link to="/mypage">
          <ArrowBackIcon
            fontSize="large"
            sx={{ ml: 3, color: "#5F6368", position: "absolute" }}
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
          sx={{
            mt: 6,
            mx: "auto",
            py: 10,
            backgroundColor: "white",
            borderRadius: "7px",
            border: `1px solid ${theme.palette.text.primary}`,
            width: "60%",
            minWidth: "30rem",
            height: "70%",
          }}
        >
          <Box sx={{ width: "90%", margin: "auto" }}>
            <Box sx={{ my: 1, textAlign: "center" }}>
              <Typography variant="h6">일정타그램에서 사용할</Typography>
              <Typography variant="h6">새로운 이름을 입력해주세요.</Typography>
            </Box>

            <Box sx={{ mt: 5 }}>
              <NicknameInput
                nickname={nickname}
                setNickname={setNickname}
                isNicknameDuplicate={isNicknameDuplicate}
                setIsNicknameDuplicate={(value) =>
                  setIsNicknameDuplicate(value)
                }
              />
              <Button
                variant="contained"
                size="large"
                fullWidth
                sx={{
                  bgcolor: `${theme.palette.secondary.main}`,
                  borderRadius: "7px",
                  mt: 6,
                }}
                disabled={!isNicknameDuplicate}
                onClick={() =>
                  mutateChangeNickname.mutate({
                    type: "nickname",
                    value: nickname,
                    memberId,
                  })
                }
              >
                변경
              </Button>
            </Box>
          </Box>
          <ErrorHandling
            error={mutateChangeNickname.error}
            isLoading={mutateChangeNickname.isLoading}
            feature="닉네임 변경"
          />
        </Box>
      </Box>
    </>
  );
};

export default ChangeNickname;
