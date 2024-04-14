import { Box, Grid, Typography, Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import basicProfileImage from "@/assets/basicProfileImage.png";

const PermissionForm = () => {
  const testMainProject = [
    {
      profileImage: basicProfileImage,
      name: "Navigation",
      permission: "프로젝트 구성원",
    },
    {
      profileImage: basicProfileImage,
      name: "Music",
      permission: "관리자",
    },
    {
      profileImage: basicProfileImage,
      name: "AI 드로잉 서비스",
      permission: "프로젝트 구성원",
    },
    {
      profileImage: basicProfileImage,
      name: "Daily diary",
      permission: "프로젝트 구성원",
    },
    {
      profileImage: basicProfileImage,
      name: "카드 관리 서비스",
      permission: "프로젝트 구성원",
    },
    {
      profileImage: basicProfileImage,
      name: "test1",
      permission: "프로젝트 구성원",
    },
    {
      profileImage: basicProfileImage,
      name: "test1",
      permission: "프로젝트 구성원",
    },
  ];

  const noProject = false;

  const showProjectPermisson = () => {
    return testMainProject ? (
      <>
        {testMainProject.map((data, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              border: "1px solid #626262",
              mt: 2,
              p: 1,
              borderRadius: "7px",
              alignItems: "center",
            }}
          >
            <Box>
              <img
                src={data.profileImage}
                alt=""
                style={{
                  backgroundColor: "#B2B4B8",
                  borderRadius: "50%",
                  width: "30px",
                  height: "30px",
                }}
              />
            </Box>
            <Box sx={{ ml: 2 }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: "bold",
                  color: "#626262",
                  fontFamily: "Poppins",
                }}
              >
                {data.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: "11px",
                  color: "#A4A4A4",
                  fontFamily: "Poppins",
                }}
              >
                {data.permission}
              </Typography>
            </Box>
          </Box>
        ))}
      </>
    ) : (
      <Box sx={{ mx:2, my:4 }}>
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
        height: "590px",
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
        }}
      >
        <Typography sx={{ color: "1F1F1F", fontSize: "11px" }}>
          Permisson
        </Typography>
      </Box>
      {showProjectPermisson()}
    </Box>
  );
};

export default PermissionForm;
