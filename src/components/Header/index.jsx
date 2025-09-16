import {
  Box,
  IconButton,
  styled,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { URLS } from "../../urls";
import { useState } from "react";
import ConfirmDialog from "../ConfirmDialog";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Header = ({ open, handleDrawerOpen }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const navigate = useNavigate();
  const fullName = localStorage.getItem("fullName");

  const handleLogout = () => {
    setConfirmOpen(true);
  };

  const handleClose = (confirm) => {
    if (confirm) {
      localStorage.removeItem("token");
      localStorage.removeItem("roles");
      localStorage.removeItem("user");
      localStorage.removeItem("fullName");
      navigate(URLS.HOME);
    }
    setConfirmOpen(false);
  };

  return (
    <>
      <AppBar position="fixed" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: "none" },
            ]}
          >
            <MenuIcon />
          </IconButton>
          {!open && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                flexGrow: 1,
              }}
            >
              <Typography
                component="span"
                aria-hidden="true"
                sx={{ fontSize: 20 }}
              >
                🧘
              </Typography>
              <Typography
                component="span"
                variant="h6"
                className="brand-name"
                sx={{ fontWeight: 700, color: "#fff" }}
              >
                ReAlign
              </Typography>
            </Box>
          )}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              columnGap: 1,
              mr: 1.5,
            }}
          >
            <AccountCircleIcon sx={{ color: "#fff", fontSize: 30 }} />
            <Typography sx={{ color: "#fff" }}>{fullName}</Typography>
          </Box>
          <Tooltip title="Logout">
            <IconButton onClick={handleLogout}>
              <LogoutOutlinedIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <ConfirmDialog
        open={confirmOpen}
        handleClose={handleClose}
        dialogTitle="Confirm Logout"
        dialogContent="Are you sure you want to logout from the application?"
        cancelBtnText="cancel"
        confirmBtnText="confirm"
      />
    </>
  );
};

export default Header;
