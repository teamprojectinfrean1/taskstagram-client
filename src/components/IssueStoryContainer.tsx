import { Box, IconButton, Paper, Typography } from "@mui/material";
import { SvgIconProps } from "@mui/material/SvgIcon";
import IssueStory from "@/components/IssueStory";

type IssueStoryContainerProps = {
  title: string;
  IconComponent: React.ElementType<SvgIconProps>;
  ariaLabel: string;
};

const IssueStoryContainer = ({
  title,
  IconComponent,
  ariaLabel,
}: IssueStoryContainerProps) => {
  return (
    <Paper elevation={2}>
      <Box display="flex" alignItems="center" sx={{ px: 1, py: 2 }} >
        <Box>
          <Typography
            noWrap
            sx={{ p: 1, m: 2, borderBottom: "1px solid black" }}
          >
            {title}
          </Typography>
        </Box>

        <Box
          display="flex"
          overflow="auto" 
          // sx={{ maxWidth: 'calc(100% - 48px)' }} // max-width 변경
        >
          {Array.from({ length: 5 }, (_, index) => (
            <IssueStory key={index} />
          ))}
        </Box>

        <IconButton // this shouldn't be rendering at all if the container is not full
          size="large"
          aria-label={ariaLabel}
          sx={{ m: 2 }}
          onClick={() => {}}
        >
          <IconComponent />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default IssueStoryContainer;
