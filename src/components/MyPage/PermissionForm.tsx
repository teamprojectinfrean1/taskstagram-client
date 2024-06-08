import { Box, Grid, Typography, Avatar } from "@mui/material";
import { useRecoilValue } from "recoil";
import { projectListState } from "@/stores/projectStore";
import basicProjectImage from "@/assets/basicProjectImage.png";
import StarIcon from "@mui/icons-material/Star";
import theme from "@/theme/theme";
import { yellow } from "@mui/material/colors";

const PermissionForm = () => {
  const projectList = useRecoilValue(projectListState);

  const showProjectPermisson = () => {
    return projectList.length !== 0 ? (
      <>
        {projectList.map((data) => (
          <Box
            key={data.projectId}
            sx={{
              border: "1px solid #626262",
              mt: 2,
              p: 1,
              borderRadius: "7px",
              backgroundColor: "white",
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
                  <StarIcon fontSize="medium" sx={{ color: yellow[600] }} />
                )}
              </Grid>
            </Grid>
          </Box>
        ))}
      </>
    ) : (
      <Box sx={{ mx: 2, my: 4 }}>
        <Typography sx={{ fontFamily: "Poppins", color: "#A4A4A4" }}>
          현재 포함된 프로젝트가 없습니다.
        </Typography>
      </Box>
    );
  };

  return (
    <Box
      boxShadow={2}
      sx={{
        p: 3,
        ml: 4,
        borderRadius: "7px",
        minWidth: "21rem",
        backgroundColor: `${theme.palette.background.paper}`,
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
          mt: 2.5,
        }}
      >
        <Typography
          sx={{ color: "1F1F1F", fontSize: "11px", fontWeight: "bold" }}
        >
          프로젝트 정보
        </Typography>
      </Box>
      {showProjectPermisson()}
    </Box>
  );
};

export default PermissionForm;
