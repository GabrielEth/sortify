import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";

export default function SettingsDrawer() {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setIsOpen(open);
    };

  const list = () => (
    <Box
      sx={{ width: 220 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              justifyContent: "center",
              alignItems: "center",
              "&:hover": {
                bgcolor: "#4AA478",
              },
            }}
          >
            <ListItemIcon sx={{ alignItems: "center", color: "#000000" }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText
              primary="Logout"
              sx={{
                color: "#000000",
                "& .MuiTypography-root": {
                  color: "inherit",
                },
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
  return (
    <>
      <AppBar position="static" style={{ backgroundColor: "#52B788" }}>
        <Toolbar>
          <div style={{ flexGrow: 1 }} />
          <IconButton
            onClick={toggleDrawer(true)}
            color="inherit"
            size="large"
            edge="end"
          >
            <SettingsIcon style={{ fontSize: 30, color: "#081C15" }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={isOpen}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": { backgroundColor: "#52B788" },
        }}
      >
        {list()}
      </Drawer>
    </>
  );
}
