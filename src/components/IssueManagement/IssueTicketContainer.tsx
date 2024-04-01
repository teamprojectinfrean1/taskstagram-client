import {
  Box,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Fragment } from "react";
import { SvgIconProps } from "@mui/material/SvgIcon";
import { IssueTicket, SkeletonIssueTicket } from "@/components/IssueManagement";
import { useDroppable } from "@dnd-kit/core";
import { IssueSummary } from "@/models/Issue";
import SearchIcon from "@mui/icons-material/Search";
import theme from "@/theme/theme";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import useGetIssueTicketListQuery from "@/hooks/useGetIssueTicketListQuery";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { issueIdToShowInModalState } from "@/stores/issueStore";

type IssueTicketContainerProps = {
  ariaLabel: string;
  containerId: string;
  isHovered: boolean;
  projectId: string;
  title: string;
  children?: React.ReactNode;
};

const IssueTicketContainer = ({
  ariaLabel,
  containerId,
  isHovered,
  projectId,
  title,
  children,
}: IssueTicketContainerProps) => {
  const { setNodeRef } = useDroppable({
    id: containerId,
  });

  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetIssueTicketListQuery({
    projectId: projectId!,
    issueStatus: containerId,
  });

  const lastIssueRef = useIntersectionObserver({
    containerId,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  /* 데이터 페칭 시 skeleton UI가 렌더링 되는지 테스트하기 위해 임시 구현; 추후 제거 예정 */
  const [testLoading, setTestLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setTestLoading(false), 5000);
    return () => clearTimeout(timeout);
  }, []);

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
        <TextField
          variant="outlined"
          onChange={() => {}}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => {}}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: theme.palette.background.default,
              mx: 2,
            },
            "& .MuiOutlinedInput-input": {
              py: 1.5,
            },
          }}
        />
        <Stack
          id={containerId}
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
          {children}
          {data?.pages.map((page, i) => (
            <Fragment key={i}>
              {page.issueList.map((issue, index) => (
                <IssueTicket
                  key={issue.issueId}
                  index={index}
                  issue={issue}
                  parent={containerId}
                />
              ))}
            </Fragment>
          ))}
          {/* {!testLoading &&
            issueTicketList.map((issue, index) => (
              <IssueTicket
                key={issue.issueId}
                index={index}
                issue={issue}
                parent={containerId}
              />
            ))}  */}
          <div
            ref={hasNextPage ? lastIssueRef : undefined}
            style={{ margin: 0 }}
          />
          {(isFetchingNextPage || testLoading) &&
            Array.from({ length: 3 }, (_, i) => (
              <SkeletonIssueTicket key={i} />
            ))}
        </Stack>
      </Stack>
    </Paper>
  );
};

export default IssueTicketContainer;
