import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import "../styles/Navbar.css";
import RegisterDialog from "./RegisterDialog";
import { LoginService } from "../services";
import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { URLS } from "../urls";
// import { useToast } from "../hooks/useToast";

function Navbar() {
  const [showModal, setShowModal] = React.useState(false);
  const [registerOpen, setRegisterOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [identifier, setIdentifier] = React.useState(""); // email or mobile
  const [otp, setOtp] = React.useState("");
  const [otpSent, setOtpSent] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const navigate = useNavigate();
  // const toast = useToast();

  React.useEffect(() => {
    // listen for global "openLogin" events (dispatched from Home or anywhere)
    const onOpenLogin = () => setShowModal(true);
    window.addEventListener("openLogin", onOpenLogin);
    return () => window.removeEventListener("openLogin", onOpenLogin);
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLoginButton = (e) => {
    e && e.preventDefault();
    setShowModal(true);
    handleMenuClose();
    console.log("Login button clicked");
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIdentifier("");
    setOtp("");
    setOtpSent(false);
    setSending(false);
  };

  const handleOpenRegisterFromLogin = () => {
    // close login modal and open register dialog
    handleCloseModal();
    setRegisterOpen(true);
  };

  const handleSendOtp = () => {
    if (!identifier.trim()) {
      console.log("Provide email or mobile");
      return;
    }
    sendOtp();
    // setSending(true);
    // // mock API call
    // await new Promise((r) => setTimeout(r, 700));
    // setOtpSent(true);
    // setSending(false);
    // console.log("OTP sent to:", identifier);
  };

  const handleVerifyOtp = () => {
    // mock verify
    // console.log("Verifying OTP:", otp);
    // close modal after verify (or handle actual verification)
    // handleCloseModal();
    verifyOtp();
  };

  const sendOtp = async () => {
    setSending(true);
    try {
      const response = await LoginService.requestOtpLogin({
        email: identifier,
      });
      if (response.status === 200 && response.data.success) {
        setOtpSent(true);
        // toast.success("OTP sent successfully to " + identifier);
        alert("OTP sent successfully to " + identifier);
      } else {
        // toast.error("Failed to send OTP. Please try again");
        alert("Failed to send OTP. Please try again");
      }
    } catch (error) {
      if (
        error.status === 404 &&
        error.response &&
        error.response.status === 404 &&
        error.response.data.code === "NOT_FOUND"
      ) {
        // toast.error("Account not registered. Please create an account first");
        alert("Account not registered. Please create an account first");
      }
      // console.error("Error sending OTP: ", error);
    } finally {
      setSending(false);
    }
  };

  const verifyOtp = async () => {
    setSending(true);
    try {
      const response = await LoginService.verifyOtpLogin({
        email: identifier,
        otp,
      });
      if (response.status === 200 && response.data.success) {
        const { data } = response.data;
        localStorage.setItem("token", data.accessToken);
        getCurrentUserProfile();
        // toast.success("Login successful");
        // handleCloseModal();
      } else {
        // toast.error("An error occurred. Please try again");
        alert("An error occurred. Please try again");
      }
    } catch (error) {
      if (
        error.status === 401 &&
        error.response.status === 401 &&
        error.response.data.code === "UNAUTHORIZED"
      ) {
        // toast.error("Invalid OTP. Please try again");
        alert("Invalid OTP. Please try again");
        setOtp("");
        // return;
      }
    } finally {
      setSending(false);
    }
  };

  const getCurrentUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        // toast.error("No token found. Please login again.");
        alert("No token found. Please login again.");
        setOtp("");
        setOtpSent(false);
        return;
      }
      const response = await LoginService.getCurrentUserProfile();
      if (
        response.status === 200 &&
        response.data.success &&
        response.data.code === "PROFILE"
      ) {
        const { data } = response.data;
        localStorage.setItem("roles", JSON.stringify(data.roles));
        localStorage.setItem("user", data.email);
        localStorage.setItem("fullName", data.fullName);
        alert("Login Successful");
        if (data.roles.includes("USER")) {
          // navigate to user
          navigate(URLS.USERS);
        } else if (data.roles.includes("ADMIN")) {
          // navigate to admin
          navigate(URLS.ADMIN);
        } else {
          // navigate to trainer (change later)
        }
      } else {
        alert("Failed to fetch user profile");
        // toast.error("Failed to fetch user profile");
      }
    } catch (error) {
      console.log(222, error);
      // toast.error("Failed to fetch user profile: " + error);
    }
  };

  const handleOpenLogin = () => {
    // setRegisterOpen(false);
    setShowModal(true);
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={6}
        color="transparent"
        sx={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(250,250,251,0.98))",
          backdropFilter: "blur(6px)",
          borderBottom: "1px solid rgba(16,24,40,0.04)",
          boxShadow: "0 8px 24px rgba(16,24,40,0.06)",
        }}
      >
        <Toolbar className="navbar-toolbar" sx={{ display: "flex", gap: 2 }}>
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
              sx={{ fontWeight: 700 }}
            >
              ReAlign
            </Typography>
          </Box>

          {/* Desktop: show CTA button */}
          {!isMobile && (
            <Button
              variant="contained"
              color="success"
              onClick={handleLoginButton}
              className="cta"
              id="loginId"
              sx={{ textTransform: "none", px: 3, py: 1.1 }}
            >
              Login / Join
            </Button>
          )}

          {/* Mobile: show hamburger that opens a small menu */}
          {isMobile && (
            <>
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleMenuOpen}
                size="large"
              >
                <MenuIcon />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                PaperProps={{ sx: { minWidth: 160, p: 0.5 } }}
              >
                <MenuItem onClick={handleLoginButton}>Login / Join</MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Login Modal (Dialog) */}
      <Dialog
        open={showModal}
        fullWidth
        maxWidth="xs"
        fullScreen={isMobile}
        aria-labelledby="login-dialog-title"
      >
        <DialogTitle id="login-dialog-title" sx={{ fontWeight: 700 }}>
          Login
        </DialogTitle>

        <DialogContent
          dividers
          sx={{ display: "flex", flexDirection: "column", gap: 2, py: 3 }}
        >
          {/* filled input: email or mobile */}
          <TextField
            variant="outlined"
            label="Email or mobile number"
            placeholder="you@example.com or +1234567890"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            fullWidth
            slotProps={{
              inputLabel: { shrink: true },
            }}
            autoComplete="email"
            size="small"
          />

          {/* filled input: OTP */}
          <TextField
            variant="outlined"
            label="OTP"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => {
              const val = e.target.value.replace(/[^0-9]/g, "");
              setOtp(val);
            }}
            fullWidth
            disabled={!otpSent}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
              htmlInput: {
                maxLength: 6,
              },
            }}
            size="small"
          />
          <Link
            sx={{ textDecoration: "none", cursor: "pointer", fontSize: 14 }}
            onClick={handleOpenRegisterFromLogin}
          >
            Don't have an account? Sign Up
          </Link>
        </DialogContent>

        {/* DialogActions: left = register link, right = actions */}
        <DialogActions
          sx={{
            px: 2,
            py: 2,
          }}
        >
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              onClick={handleCloseModal}
              variant="contained"
              color="error"
            >
              Close
            </Button>

            {!otpSent ? (
              <Button
                variant="contained"
                onClick={handleSendOtp}
                disabled={sending || !identifier.trim()}
                color="success"
              >
                {sending ? "Sending…" : "Send OTP"}
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleVerifyOtp}
                disabled={!otp.trim() || sending}
              >
                {sending ? "Verifying…" : "Verify"}
              </Button>
            )}
          </Box>
        </DialogActions>
      </Dialog>

      {/* Register dialog (separate component) */}
      <RegisterDialog
        open={registerOpen}
        onClose={() => setRegisterOpen(false)}
        onOpenLogin={handleOpenLogin}
      />
    </>
  );
}

export default Navbar;
