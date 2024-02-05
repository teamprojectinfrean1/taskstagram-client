import { Paper, Typography, Box, IconButton } from "@mui/material";
import { SvgIconProps } from "@mui/material/SvgIcon";

type IssueTicketContainerProps = {
  title: string;
  IconComponent: React.ElementType<SvgIconProps>;
  ariaLabel: string;
};

const IssueTicketContainer = ({
  title,
  IconComponent,
  ariaLabel,
}: IssueTicketContainerProps) => {
  return (
    <Paper elevation={2} sx={{ height: "100%", flex: 1, borderRadius: 3 }}>
      <Box sx={{flex: 1}}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ height: "100%", p: 1 }}
        >
          <Typography
            noWrap
            sx={{ borderBottom: "1px solid black", p: 1, m: 2 }}
          >
            {title}
          </Typography>
          <IconButton size="large" aria-label={ariaLabel} onClick={() => {}}>
            <IconComponent />
          </IconButton>
        </Box>
        
      </Box>
    </Paper>
  );
};

export default IssueTicketContainer;
