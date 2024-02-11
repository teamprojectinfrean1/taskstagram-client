import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

type SideNavProps = {
  open: boolean;
};

const SideNav = ({ open }: SideNavProps) => {
  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: 'var(--side-nav-width)',
        ".MuiDrawer-paper": {
          marginTop: 'var(--top-nav-height)',
        },
      }}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>{/* 아이콘 플레이스홀더 */}</ListItemIcon>
            <ListItemText primary="이슈 보드" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>{/* 아이콘 플레이스홀더 */}</ListItemIcon>
            <ListItemText primary="Task 관리" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideNav;
