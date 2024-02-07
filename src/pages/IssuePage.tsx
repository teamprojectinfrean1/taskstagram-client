import IssueFormModal from "@/components/IssueFormModal";
import { Button } from "@mui/material";
import { useState } from "react";

const IssuePage = () => {
  const [open, setOpen] = useState(false);

  

  return (
    <div>
      이슈 페이지
      <Button
        variant="outlined"
        onClick={() => {
          setOpen(true);
        }}
      >
        open
      </Button>
      <IssueFormModal
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};

export default IssuePage;
