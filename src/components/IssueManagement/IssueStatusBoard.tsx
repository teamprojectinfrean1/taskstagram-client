import { Box, Paper, Skeleton, Stack, Typography } from "@mui/material";
import { useDroppable } from "@dnd-kit/core";
import { useRef } from "react";
import SearchWithDropdownFilter from "@/components/SearchWithDropdownFilter";
import { DefaultIssueList } from "@/components/IssueManagement/DefaultIssueList";
import { IssueSearchResults } from "@/components/IssueManagement/IssueSearchResults";
import {
  issueStatusBoardSearchModeState,
  issueStatusBoardSearchParamsState,
  endIssueSearchMode,
} from "@/stores/issueStore";
import { useRecoilState } from "recoil";
import PrimaryButton from "@/components/PrimaryButton";

type IssueStatusBoardProps = {
  containerId: IssueStatus;
  isHovered: boolean;
  isIssueFeatureAvailable: boolean;
  projectId?: string;
  title: string;
};

const IssueStatusBoard = ({
  containerId,
  isHovered,
  isIssueFeatureAvailable,
  projectId,
  title,
}: IssueStatusBoardProps) => {
  const { setNodeRef } = useDroppable({
    id: containerId!,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  const [issueStatusBoardSearchModes, setIssueStatusBoardSearchModes] =
    useRecoilState(issueStatusBoardSearchModeState);
  const isSearchMode = issueStatusBoardSearchModes[containerId];

  const [searchParams, setIssueStatusBoardSearchParams] = useRecoilState(
    issueStatusBoardSearchParamsState
  );

  const handleSearchParamsChange = <T extends keyof IssueSearchParams>(
    key: T,
    value: IssueSearchParams[T]
  ) => {
    setIssueStatusBoardSearchParams((prev) => ({
      ...prev,
      [containerId]: {
        ...prev[containerId],
        [key]: value,
      },
    }));
  };

  const startSearchMode = () => {
    setIssueStatusBoardSearchModes({
      ...issueStatusBoardSearchModes,
      [containerId]: true,
    });
  };


  return (
    <Paper
      ref={setNodeRef}
      elevation={2}
      sx={{
        flex: 1,
        backgroundColor: isHovered ? "#C2C6D6" : null,
      }}
    >
      {!projectId ? (
        <Skeleton variant="rounded" height="100%" />
      ) : (
        <Stack
          spacing={2}
          sx={{
            pt: 1,
            height: "100%",
          }}
        >
          <Box
            display="flex"
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              px: 2,
            }}
          >
            <Typography noWrap sx={{ borderBottom: "1px solid black", p: 1 }}>
              {title}
            </Typography>
            {isSearchMode && (
              <PrimaryButton
                color="primary"
                sx={{ fontSize: "0.8rem", height: "28px" }}
                onClick={() =>
                  endIssueSearchMode(
                    setIssueStatusBoardSearchModes,
                    setIssueStatusBoardSearchParams,
                    containerId
                  )
                }
              >
                검색 종료
              </PrimaryButton>
            )}
          </Box>
          {isIssueFeatureAvailable && <Box sx={{ px: 2 }}>
            <SearchWithDropdownFilter
              handleSearchParamsChange={handleSearchParamsChange}
              startSearchMode={startSearchMode}
              searchParams={searchParams[containerId]}
            />
          </Box>}
          <Stack
            id={containerId!}
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
            {isSearchMode ? (
              <IssueSearchResults
                projectId={projectId}
                containerId={containerId}
                containerRef={containerRef}
                searchParams={searchParams[containerId]}
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
      )}
    </Paper>
  );
};

export default IssueStatusBoard;
