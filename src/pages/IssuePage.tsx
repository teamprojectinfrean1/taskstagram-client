// import IssueFormModal from "@/components/IssueFormModal";
// import { useState } from "react";
// import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
// import IssueTicketContainer from "@/components/IssueTicketContainer";
// import IssueStoryContainer from "@/components/IssueStoryContainer";
// import { Box, Grid } from "@mui/material";
// import AddCircleIcon from "@mui/icons-material/AddCircle";
// import DeleteIcon from "@mui/icons-material/Delete";

// const IssuePage = () => {
//   const [openNewIssueFormModal, setOpenNewIssueFormModal] = useState(false);

//   return (
//     <>
//       <Grid
//         container
//         spacing={4}
//         sx={{ height: "100%", border: "2px dotted red" }}
//       >
//         <Grid item xs={12} md={12} sx={{height: "25%"}}>
//           <IssueStoryContainer
//             title="진행 중"
//             IconComponent={KeyboardDoubleArrowRightIcon}
//             ariaLabel="next"
//           />
//         </Grid>
//         <Grid item xs={12} md={6} sx={{ height:{md: "40%", lg: "80%"}}}>
//           <IssueTicketContainer
//             ariaLabel="create issue"
//             IconComponent={AddCircleIcon}
//             onIconComponentClick={() => {
//               setOpenNewIssueFormModal(true);
//             }}
//             title="할 일"
//           />
//         </Grid>
//         <Grid item xs={12} md={6} sx={{ height:{md: "40%", lg: "80%"}}}>
//           <IssueTicketContainer
//             ariaLabel="delete issue"
//             IconComponent={DeleteIcon}
//             onIconComponentClick={() => {}}
//             title="완료"
//           />
//         </Grid>
//       </Grid>
//       <IssueFormModal
//         open={openNewIssueFormModal}
//         handleClose={() => {
//           setOpenNewIssueFormModal(false);
//         }}
//       />
//     </>
//   );
// };

// export default IssuePage;

import IssueFormModal from "@/components/IssueFormModal";
import { useState } from "react";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import IssueTicketContainer from "@/components/IssueTicketContainer";
import IssueStoryContainer from "@/components/IssueStoryContainer";
import { Box } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";

const IssuePage = () => {
  const [openNewIssueFormModal, setOpenNewIssueFormModal] = useState(false);

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        gap={4}
        sx={{ height: "100%" }}
      >
        <Box sx={{ flex: 1 }}>
          <IssueStoryContainer
            title="진행 중"
            IconComponent={KeyboardDoubleArrowRightIcon}
            ariaLabel="next"
          />
        </Box>
        <Box display="flex" gap={4} sx={{ flex: 4 }}>
          <IssueTicketContainer
            ariaLabel="create issue"
            IconComponent={AddCircleIcon}
            onIconComponentClick={() => {
              setOpenNewIssueFormModal(true);
            }}
            title="할 일"
          />
          <IssueTicketContainer
            ariaLabel="delete issue"
            IconComponent={DeleteIcon}
            onIconComponentClick={() => {}}
            title="완료"
          />
        </Box>
      </Box>
      <IssueFormModal
        open={openNewIssueFormModal}
        handleClose={() => {
          setOpenNewIssueFormModal(false);
        }}
      />
    </>
  );
};

export default IssuePage;
