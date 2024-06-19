import theme from "@/theme/theme";
import { useNavigate } from "react-router-dom";
import { Box, Container, Typography, Button } from "@mui/material";

const GettingStartedPage = () => {
  const navigate = useNavigate();

  return (
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
        <Typography variant="h6" fontWeight="bold">
          아직 프로젝트가 없습니다. 새로운 프로젝트를 생성하여 시작하세요!
        </Typography>
        <Typography >
          프로젝트는 모든 작업의 중심이
          되며, 여기에서 태스크와 이슈를 관리할 수 있습니다.
        </Typography>
      </Box>
      <Button
        variant="contained"
        sx={{ mt: 2, backgroundColor: `${theme.palette.secondary.main}` }}
        onClick={() => {
          navigate("/project", { state: { type: "new" } });
        }}
      >
        첫 번째 프로젝트 시작하기
      </Button>
    </Container>
  );
};

export default GettingStartedPage;
