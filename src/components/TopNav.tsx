import { AppBar, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

interface TopNavProps {
  onMenuClick: () => void;
};

function TopNav({ onMenuClick }: TopNavProps) {
  return (
    <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={onMenuClick}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
    </AppBar>
  );
}
export default TopNav;
