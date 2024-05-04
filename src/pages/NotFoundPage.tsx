import theme from "@/theme/theme";
import { useNavigate } from "react-router-dom";
import { Box, Container, Typography, Button } from "@mui/material";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundColor: `${theme.palette.background.paper}`,
        height: "100%",
      }}
    >
      <Container sx={{ pt: 2 }}>
        <Box display="flex">
          <Typography
            variant="h3"
            sx={{ fontFamily: "Pattaya", color: "#173665" }}
          >
            tasks
          </Typography>
          <Typography
            variant="h3"
            sx={{ fontFamily: "Pattaya", color: "#3C4043" }}
          >
            tagram
          </Typography>
        </Box>
        <Box sx={{ mt: 5 }}>
          <Typography fontWeight="bold">죄송합니다.</Typography>
          <Typography fontWeight="bold">
            요청하신 페이지를 찾을 수 없습니다.
          </Typography>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Typography variant="body2">
            방문하시려는 페이지의 주소가 잘못 입력되었거나,
          </Typography>
          <Typography variant="body2">
            페이지의 주소가 변경 혹은 삭제되어 페이지를 찾을 수 없습니다.
          </Typography>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Typography variant="body2">
            메인페이지로 이동하려면, 아래 버튼을 클릭해주세요.
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 2, backgroundColor: `${theme.palette.secondary.main}` }}
            onClick={() => {
              navigate("/");
            }}
          >
            메인페이지로 돌아가기
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default NotFoundPage;
