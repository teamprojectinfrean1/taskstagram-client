import { Box, Typography, Button, Grid } from "@mui/material";

const ProfilePage = () => {
  return (
    <Box sx={{ width: "80%", margin: "auto" }}>
      <Box
        boxShadow={10}
        sx={{
          backgroundColor: "#173665",
          minHeight: "10rem",
          borderRadius: "7px 7px 0 0",
          minWidth:'800px',
        }}
      >
        <Typography variant="h5" sx={{ pl: 3, pt: 2, color: "white" }}>
          MY PAGE
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: "#F0F0F0",
          height: "40rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "0 0 7px 7px",
          minWidth:'800px',
        }}
      >
        <Box
          boxShadow={10}
          sx={{
            backgroundColor: "white",
            width: "60%",
            height: "90%",
            borderRadius: "7px"
          }}
        >
          <Box sx={{ p: 5, height: "100%" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <img src="favicon.ico"></img>
              <Button>Upload Photo +</Button>
            </Box>
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
                  <Grid item xs={5}>
                    <Typography variant="h5">Nickname</Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="h5" sx={{ color: "#626262" }}>
                      User
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <Button
                      sx={{
                        fontSize: "9px",
                        backgroundColor: "#F0EFFA",
                        borderRadius: "20px",
                      }}
                    >
                      Edit
                    </Button>
                  </Grid>
                </Grid>

                <Grid container spacing={1} sx={{ mt: 1 }}>
                  <Grid item xs={5}>
                    <Typography variant="h5">Email</Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="h5" sx={{ color: "#626262" }}>
                      example@naver.com
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <Button
                      sx={{
                        fontSize: "9px",
                        backgroundColor: "#F0EFFA",
                        borderRadius: "20px",
                      }}
                    >
                      Edit
                    </Button>
                  </Grid>
                </Grid>

                <Grid container spacing={1} sx={{ mt: 1 }}>
                  <Grid item xs={5}>
                    <Typography variant="h5">Phone Number</Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="h5" sx={{ color: "#626262" }}>
                      01012345678
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <Button
                      sx={{
                        fontSize: "9px",
                        backgroundColor: "#F0EFFA",
                        borderRadius: "20px",
                      }}
                    >
                      Edit
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
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
                    <Typography variant="h5">Password</Typography>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <Button
                      sx={{
                        fontSize: "9px",
                        backgroundColor: "#F0EFFA",
                        borderRadius: "20px",
                      }}
                    >
                      Edit
                    </Button>
                  </Grid>
                </Grid>
                <Typography sx={{ mt: 1 }}>
                  비밀번호를 변경하려면 인증이 필요합니다.
                </Typography>
              </Box>
            </Box>
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
                    <Button
                      sx={{
                        fontSize: "9px",
                        backgroundColor: "#F0EFFA",
                        borderRadius: "20px",
                      }}
                    >
                      Edit
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
