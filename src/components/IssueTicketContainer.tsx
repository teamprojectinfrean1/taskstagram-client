import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import { SvgIconProps } from "@mui/material/SvgIcon";
import IssueTicket from "./IssueTicket";
import { pink } from "@mui/material/colors";

type IssueTicketContainerProps = {
  title: string;
  IconComponent: React.ElementType<SvgIconProps>;
  onIconComponentClick: () => void;
  ariaLabel: string;
};

const IssueTicketContainer = ({
  ariaLabel,
  IconComponent,
  onIconComponentClick,
  title,
}: IssueTicketContainerProps) => {
  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: 3,
        width: "calc(50% - 16px)",
      }}
    >
      <Stack
        spacing={3}
        sx={{
          my: 3,
          mx: 4,
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography noWrap sx={{ borderBottom: "1px solid black", p: 1 }}>
            {title}
          </Typography>
          <IconButton
            size="large"
            edge="end"
            aria-label={ariaLabel}
            onClick={() => onIconComponentClick()}
          >
            <IconComponent />
          </IconButton>
        </Box>
        <Stack spacing={2} sx={{ overflow: "auto" }}>
          <IssueTicket />
          <IssueTicket />
          <IssueTicket />
        </Stack>
      </Stack>
    </Paper>
  );
};

export default IssueTicketContainer;
