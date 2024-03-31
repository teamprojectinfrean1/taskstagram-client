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
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import useGetIssueListQuery from "@/hooks/useGetIssueListQuery";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

type IssueTicketContainerProps = {
  ariaLabel: string;
  containerId: string;
  isHovered: boolean;
  issueTicketList: IssueSummary[];
  title: string;
  children?: React.ReactNode;
  showIssueTicketMaker?: boolean;
  IconComponent?: React.ElementType<SvgIconProps>;
  onIconComponentClick?: () => void;
};

const IssueTicketContainer = ({
  ariaLabel,
  containerId,
  isHovered,
  issueTicketList,
  title,
  children,
  showIssueTicketMaker = false,
  IconComponent,
  onIconComponentClick,
}: IssueTicketContainerProps) => {
  const { setNodeRef } = useDroppable({
    id: containerId,
  });

  const { projectId } = useParams();

  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetIssueListQuery({ projectId: projectId!, issueStatus: containerId });

  const lastIssueRef = useInfiniteScroll({
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  const [testLoading, setTestLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setTestLoading(false), 5000);
    return () => clearTimeout(timeout);
  }, []);

  // 다양한 에러 헨들링 케이스 구현 예정

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
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ px: 2 }}
        >
          <Typography noWrap sx={{ borderBottom: "1px solid black", p: 1 }}>
            {title}
          </Typography>
          {IconComponent && (
            <IconButton
              size="large"
              edge="end"
              aria-label={ariaLabel}
              onClick={() =>
                onIconComponentClick ? onIconComponentClick() : {}
              }
              sx={{ p: 1, mr: "1px" }}
            >
              <IconComponent />
            </IconButton>
          )}
        </Box>
        <Stack
          spacing={2}
          className="custom-scrollbar"
          sx={{ overflowY: "auto", overflowX: "hidden", px: 2, pb: 2 }}
        >
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
              },
              "& .MuiOutlinedInput-input": {
                py: 1.5,
              },
            }}
          />
          {children}
          {data?.pages.map((group, i) => (
            <Fragment key={i}>
              {group.map((issue, index) => (
                <IssueTicket
                  key={issue.issueId}
                  index={index}
                  issue={issue}
                  parent={containerId}
                />
              ))}
            </Fragment>
          ))}
          {!testLoading &&
            issueTicketList.map((issue, index) => (
              <IssueTicket
                key={issue.issueId}
                index={index}
                issue={issue}
                parent={containerId}
              />
            ))} 
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
