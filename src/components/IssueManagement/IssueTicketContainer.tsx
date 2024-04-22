import { Box, Paper, Stack, Typography } from "@mui/material";
import { useDroppable } from "@dnd-kit/core";
import { useRef, useState } from "react";
import SearchWithDropdownFilter from "@/components/SearchWithDropdownFilter";
import { DefaultIssueList } from "@/components/IssueManagement/DefaultIssueList";
import { IssueSearchResults } from "@/components/IssueManagement/IssueSearchResults";

type IssueTicketContainerProps = {
  containerId: string;
  isHovered: boolean;
  projectId: string;
  title: string;
};

const IssueTicketContainer = ({
  containerId,
  isHovered,
  projectId,
  title,
}: IssueTicketContainerProps) => {
  const { setNodeRef } = useDroppable({
    id: containerId,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  const [searchMode, setSearchMode] = useState(false);
  const [searchParams, setSearchParams] = useState<IssueSearchParams>({
    filter: "Issue",
    keyword: "",
  });

  const handleSearchParamsChange = <T extends keyof IssueSearchParams>(
    key: T,
    value: IssueSearchParams[T]
  ) => {
    setSearchParams((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const triggerSearch = () => {
    setSearchMode(true);
  };

  return (
    <Paper
      ref={setNodeRef}
      elevation={2}
      sx={{
        borderRadius: 3,
        flex: 1,
        backgroundColor: isHovered ? "#C2C6D6" : null,
      }}
    >
      <Stack
        spacing={2}
        sx={{
          pt: 1,
          height: "100%",
        }}
      >
        <Box display="flex" sx={{ px: 2 }}>
          <Typography noWrap sx={{ borderBottom: "1px solid black", p: 1 }}>
            {title}
          </Typography>
        </Box>
        <Box sx={{ px: 2 }}>
          <SearchWithDropdownFilter
            handleSearchParamsChange={handleSearchParamsChange}
            triggerSearch={triggerSearch}
            searchParams={searchParams}
          />
        </Box>
        <Stack
          id={containerId}
          ref={containerRef}
          spacing={2}
          className="custom-scrollbar"
          sx={{
            height: { xs: "500px", md: "auto" },
            overflowY: "auto",
            overflowX: "hidden",
            px: 2,
            pb: 2,
          }}
        >
          {searchMode ? (
            <IssueSearchResults
              projectId={projectId}
              containerId={containerId}
              containerRef={containerRef}
              searchParams={searchParams}
            />
          ) : (
            <DefaultIssueList
              projectId={projectId}
              containerId={containerId}
              containerRef={containerRef}
            />
          )}
        </Stack>
      </Stack>
    </Paper>
  );
};

export default IssueTicketContainer;
