import { Box, Paper, Skeleton, Stack, Typography } from "@mui/material";
import { useDroppable } from "@dnd-kit/core";
import { useCallback, useRef } from "react";
import SearchWithDropdownFilter from "@/components/SearchWithDropdownFilter";
import { IssueFullList, IssueSearchResultList } from "@/components/Issue";
import {
  issueStatusBoardSearchState,
  endIssueSearchMode,
} from "@/stores/issueStore";
import { useRecoilState } from "recoil";
import PrimaryButton from "@/components/PrimaryButton";

type IssueStatusBoardProps = {
  statusId: IssueStatus;
  isHovered: boolean;
  isIssueFeatureAvailable: boolean;
  projectId?: string;
  title: string;
};

const IssueStatusBoard = ({
  statusId,
  isHovered,
  isIssueFeatureAvailable,
  projectId,
  title,
}: IssueStatusBoardProps) => {
  const { setNodeRef } = useDroppable({
    id: statusId,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  const [issueStatusBoardSearch, setIssueStatusBoardSearch] = useRecoilState(
    issueStatusBoardSearchState
  );
  const { executeSearchApi, isSearchMode, searchParams } =
    issueStatusBoardSearch[statusId];

  const handleSearchParamsChange = <T extends keyof typeof searchParams>(
    key: T,
    value: (typeof searchParams)[T]
  ) => {
    setIssueStatusBoardSearch((prev) => ({
      ...prev,
      [statusId]: {
        ...prev[statusId],
        searchParams: {
          ...prev[statusId].searchParams,
          [key]: value,
        },
      },
    }));
  };

  const startSearchMode = () => {
    setIssueStatusBoardSearch((prev) => ({
      ...prev,
      [statusId]: {
        ...prev[statusId],
        isSearchMode: true,
        executeSearchApi: true,
      },
    }));
  };

  const endSearchApi = useCallback(() => {
    setIssueStatusBoardSearch((prev) => ({
      ...prev,
      [statusId]: {
        ...prev[statusId],
        executeSearchApi: false,
      },
    }));
  }, [setIssueStatusBoardSearch, statusId]);

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
                  endIssueSearchMode(setIssueStatusBoardSearch, statusId)
                }
              >
                검색 종료
              </PrimaryButton>
            )}
          </Box>
          {isIssueFeatureAvailable && (
            <Box sx={{ px: 2 }}>
              <SearchWithDropdownFilter
                handleSearchParamsChange={handleSearchParamsChange}
                startSearchMode={startSearchMode}
                searchParams={searchParams}
              />
            </Box>
          )}
          <Stack
            id={statusId}
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
              <IssueSearchResultList
                statusId={statusId}
                containerRef={containerRef}
                endSearchApi={endSearchApi}
                executeSearchApi={executeSearchApi}
                projectId={projectId}
                searchParams={searchParams}
              />
            ) : (
              <IssueFullList
                statusId={statusId}
                containerRef={containerRef}
                projectId={projectId}
              />
            )}
          </Stack>
        </Stack>
      )}
    </Paper>
  );
};

export default IssueStatusBoard;
