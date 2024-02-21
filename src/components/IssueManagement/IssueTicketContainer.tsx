import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import { SvgIconProps } from "@mui/material/SvgIcon";
import IssueTicket from "@/components/IssueManagement/IssueTicket";

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
        flex: 1,
      }}
    >
      <Stack
        spacing={2}
        sx={{
          pt: 2,
          height: "100%",
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ px: 4 }}
        >
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
        <Stack
          spacing={2}
          className="custom-scrollbar"
          sx={{ overflow: "auto", px: 4, pb: 2 }}
        >
          <IssueTicket testText="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " />
          <IssueTicket testText="Lorem ipsum dolor sit amet, consectetur adipiscing eli" />
          <IssueTicket testText="Lorem ipsum dolor sit amet" />
          <IssueTicket testText="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " />
          <IssueTicket testText="Lorem ipsum dolor sit amet, consectetur adipiscing eli" />
          <IssueTicket testText="Lorem ipsum dolor sit amet, consectetur adipiscing eli" />
          <IssueTicket testText="Lorem ipsum dolor sit amet, consectetur adipiscing eli" />
          <IssueTicket testText="Lorem ipsum dolor sit amet, consectetur adipiscing eli" />
        </Stack>
      </Stack>
    </Paper>
  );
};

export default IssueTicketContainer;
