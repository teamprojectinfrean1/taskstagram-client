import theme from "@/theme/theme";
import { Box, Typography } from "@mui/material";

type ErrorHandlingProps = {
  error: unknown,
  isLoading: boolean,
  feature : string
}

const ErrorHandling = ({ error, isLoading, feature }: ErrorHandlingProps) => {
  return (
    <>
      {isLoading && (
        <Box
          sx={{
            mt: 3,
            color: `${theme.palette.error.main}`,
            textAlign: "center",
          }}
        >
          <Typography fontSize="11px" fontWeight="bold">
            요청 중입니다. 잠시만 기다려주세요...
          </Typography>
        </Box>
      )}
      {error === "Network Error" && (
        <Box
          sx={{
            mt: 3,
            color: `${theme.palette.error.main}`,
            textAlign: "center",
          }}
        >
          <Typography fontSize="11px" fontWeight="bold">
            {feature} 요청 중 네트워크 문제가 발생했습니다. 잠시 후 다시 시도해주세요.
          </Typography>
        </Box>
      )}
    </>
  );
};

export default ErrorHandling;
