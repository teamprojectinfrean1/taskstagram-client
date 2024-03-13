import {
  Box,
  Fade,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { SvgIconProps } from "@mui/material/SvgIcon";
import IssueTicket from "@/components/IssueManagement/IssueTicket";
import { useDroppable } from "@dnd-kit/core";
import { IssueSummary } from "@/models/Issue";
import SearchIcon from "@mui/icons-material/Search";

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
                backgroundColor: "white",
              },
              "& .MuiOutlinedInput-input": {
                py: 1.5,
              },
            }}
          />
          {children}
          {issueTicketList.map((issue, index) => (
            <Fade in={true} timeout={500}>
              <div>
                <IssueTicket
                  key={issue.issueId}
                  index={index}
                  issue={issue}
                  parent={containerId}
                />
              </div>
            </Fade>
          ))}
        </Stack>
      </Stack>
    </Paper>
  );
};

export default IssueTicketContainer;
