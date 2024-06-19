import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import theme from "@/theme/theme";

type SideNavProps = {
  open: boolean;
};

const SideNav = ({ open }: SideNavProps) => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    return () => {
      navigate(path);
    };
  };

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: "var(--side-nav-width)",
        ".MuiDrawer-paper": {
          marginTop: "var(--top-nav-height)",
          backgroundColor: `${theme.palette.primary.main}`,
          color: `${theme.palette.background.default}`,
          py: 2,
        },
      }}
    >
      <List
        sx={{
          ".MuiListItem-root": {
            py: 0.5,
            px: 5,
            cursor: "pointer",
            "&:hover": {
              backgroundColor: theme.palette.background.light,
            },
          },
          ".MuiButtonBase-root": {
            backgroundColor: "transparent",
          },
          ".MuiTypography-root": {
            fontSize: "18px",
            fontWeight: "bold",
          },
        }}
      >
        <ListItem>
          <ListItemButton onClick={handleNavigation("/")} disableRipple>
            <ListItemText primary="이슈" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={handleNavigation("/tasks")} disableRipple>
            <ListItemText primary="태스크" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={handleNavigation("/project")} disableRipple>
            <ListItemText primary="프로젝트" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideNav;
