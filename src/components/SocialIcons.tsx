import { Box } from "@mui/material";

const SocialIcons = () => {
  return (
    <>
      <Box
        sx={{
          m: "auto",
          display: "flex",
          justifyContent: "space-around",
          width: "80%",
          mt: 3,
        }}
      >
        <img src="favicon.ico" alt="..." width={50} />
        <img src="favicon.ico" alt="..." width={50} />
        <img src="favicon.ico" alt="..." width={50} />
        <img src="favicon.ico" alt="..." width={50} />
      </Box>
    </>
  );
};

export default SocialIcons;
