import { Backdrop, Box, CircularProgress } from "@mui/material/";

type SpinnerProps = {
  centerInViewport?: boolean;
  size?: number;
};

const Spinner = ({ centerInViewport = false, size = 40 }: SpinnerProps) => {
  return (
    <>
      {centerInViewport ? (
        <Backdrop
          sx={{
            zIndex: 999,
          }}
          open={true}
        >
          <CircularProgress
            size={size}
            sx={{
              color: "#fff",
              zIndex: 1000,
            }}
          />
        </Backdrop>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress size={size} />
        </Box>
      )}
    </>
  );
};

export default Spinner;
