import { Box, Grid, Typography, Button, Avatar } from "@mui/material";
import { useRecoilValue } from "recoil";
import { projectListState } from "@/stores/projectStore";
import basicProjectImage from "@/assets/basicProjectImage.png";
import StarIcon from "@mui/icons-material/Star";

const PermissionForm = () => {
  const projectList = useRecoilValue(projectListState);
  console.log(projectList);

  const showProjectPermisson = () => {
    return projectList ? (
      <>
        {projectList.map((data) => (
          <Box
            key={data.projectId}
            sx={{
              // display: "flex",
              border: "1px solid #626262",
              mt: 2,
              p: 1,
              borderRadius: "7px",
              // alignItems: "center",
            }}
          >
            <Grid container spacing={1}>
              <Grid item xs={3}>
                <Avatar
                  src={
                    data.projectImage ? data.projectImage : basicProjectImage
                  }
                />
              </Grid>
              <Grid item xs={7}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: "bold",
                    color: "#626262",
                    fontFamily: "Poppins",
                  }}
                >
                  {data.projectName}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "11px",
                    color: "#A4A4A4",
                    fontFamily: "Poppins",
                  }}
                >
                  {data.permission === "LEADER" ? "관리자" : "프로젝트 구성원"}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                {data.isMainProject && (
                  <StarIcon fontSize="medium" sx={{ color: "#E5DC00" }} />
                )}
              </Grid>
            </Grid>
          </Box>
        ))}
      </>
    ) : (
      <Box sx={{ mx: 2, my: 4 }}>
        <Typography sx={{ fontFamily: "Poppins", color: "#A4A4A4" }}>
          포함된 프로젝트가 없습니다.
        </Typography>
      </Box>
    );
  };

  return (
    <Box
      boxShadow={10}
      sx={{
        p: 3,
        ml: 10,
        borderRadius: "7px",
        width: "300px",
        backgroundColor: "white",
      }}
    >
      <Box
        sx={{
          display: "flex",
          backgroundColor: "#F0EFFA",
          borderRadius: "30px",
          height: "40px",
          width: "120px",
          justifyContent: "center",
          alignItems: "center",
          mt:2.5
        }}
      >
        <Typography sx={{ color: "1F1F1F", fontSize: "11px", fontWeight:'bold' }}>
          Permisson
        </Typography>
      </Box>
      {showProjectPermisson()}
    </Box>
  );
};

export default PermissionForm;
