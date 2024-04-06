import { Box, Grid, Typography, Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const PermissionForm = () => {
  return (
    <Box
      sx={{
        border: "1px solid #626262",
        mt: 3,
        p: 3,
        borderRadius: "7px",
      }}
    >
      <Box sx={{ width: "90%", mx: "auto" }}>
        <Grid container spacing={1}>
          <Grid item xs={10}>
            <Typography variant="h5">Permission</Typography>
          </Grid>
          <Grid
            item
            xs={2}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <ArrowForwardIosIcon sx={{ color: "#D9D9D9" }} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default PermissionForm;
