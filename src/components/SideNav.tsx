import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

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
        },
      }}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleNavigation("/")}>
            <ListItemIcon>{/* 아이콘 */}</ListItemIcon>
            <ListItemText primary="이슈 보드" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleNavigation("/tasks")}>
            <ListItemIcon>{/* 아이콘 */}</ListItemIcon>
            <ListItemText primary="태스크 관리" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleNavigation("/project")}>
            <ListItemIcon>{/* 아이콘 */}</ListItemIcon>
            <ListItemText primary="프로젝트 설정" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideNav;
