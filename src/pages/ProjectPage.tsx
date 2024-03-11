import TagChipMaker from "@/components/TagChipMaker";
import { useState, useEffect } from "react";
import ProjectObj from "@/models/ProjectObj";
import { Grid, TextField, Button, Box } from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import DurationPicker from "@/components/DurationPicker";
import ProjectMemberAutocomplete from "@/components/Project/ProjectMemberAutocomplete";

const ProjectPage = () => {
  const [formData, setFormData] = useState<ProjectObj>({
    projectId: "",
    projectName: "",
    projectContent: "",
    projectStartDate: null,
    projectEndDate: null,
    projectMemberUuidList: null,
    projectTags: null,
    isMainProject: false,
  });
  const userUuidList = ["user1", "user2"];
  //각 입력란 change 이벤트
  const handleInputChange = (
    field: keyof ProjectObj,
    value: string | string[] | null
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8} sx={{ "& > *": { mb: 3 } }}>
        <Box
          sx={{
            mb: 1,
            p: 0,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            sx={{
              height: "250px",
              width: "200px",
              backgroundColor: "#dae0e8",
              "&:hover": {
                backgroundColor: "#c3cede",
              },
            }}
          >
            <input type="file" hidden />
            <AddCircleRoundedIcon sx={{ marginRight: 0 }} fontSize="large" />
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12} md={4} sx={{ "& > *": { mb: 3 } }}>
        <TextField
          fullWidth
          color="secondary"
          value={formData.projectName}
          onChange={(e) => handleInputChange("projectName", e.target.value)}
          InputProps={{
            sx: {
              fontSize: "0.9rem",
              height: "40px",
            },
          }}
        />
        <TextField
          fullWidth
          color="secondary"
          value={formData.projectContent}
          onChange={(e) => handleInputChange("projectContent", e.target.value)}
          InputProps={{
            sx: {
              fontSize: "0.9rem",
              height: "40px",
            },
          }}
        />
        <ProjectMemberAutocomplete
          memberUuidList={userUuidList}
          onSelectedMemberChanged={(value) =>
            handleInputChange("projectMemberUuidList", value)
          }
        />
        <DurationPicker
          selectedStartDate={formData.projectStartDate}
          selectedEndDate={formData.projectEndDate}
          onStartDateSelectionChange={(value) =>
            handleInputChange("projectStartDate", value)
          }
          onEndDateSelectionChange={(value) =>
            handleInputChange("projectEndDate", value)
          }
        />
        <TagChipMaker
          tagList={formData.projectTags}
          onTagSelectionChange={(value) =>
            handleInputChange("projectTags", value)
          }
        />
      </Grid>
    </Grid>
  );
};

export default ProjectPage;
