import React, { useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "../styles/Navbar.css";
import { Login } from "@mui/icons-material";
import { LoginService } from "../services";
import { Link } from "@mui/material";
// import { useToast } from "../hooks/useToast";

export default function RegisterDialog({ open, onClose, onOpenLogin }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [serverError, setServerError] = React.useState("");
  const [formSubmitted, setFormSubmitted] = React.useState(false);

  const handleRegister = async () => {
    setServerError("");
    setFormSubmitted(true);
    // setErrors({});
    if (!fullName.trim() || !email.trim() || !mobile.trim()) {
      return;
    }
    setSubmitting(true);
    try {
      const response = await LoginService.register({
        fullName,
        email,
        phone: mobile,
      });
      console.log(111, response);
      if (response.status === 201 && response.data.success) {
        // toast.success("Registration successful! Please log in.");
        console.log(777, response);
        alert("Registration successful! Please log in.");
        handleClose();
        onOpenLogin();
      } else {
        // toast.error("Registration failed. Please try again.");
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error.response.data.code);
      console.log(error.response);

      if (error.response.data.code === "DUPLICATE") {
        console.log(error.response.data.message);
        alert(error.response.data.message);
      } else if (error.response?.data?.code === "VALIDATION_ERROR") {
        alert("Please fill all required fields correctly.");
      } else {
        alert("Something went wrong. Try again later.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    // reset on close
    setFullName("");
    setEmail("");
    setMobile("");
    setSubmitting(false);
    setServerError("");
    onClose && onClose();
  };

  useEffect(() => {
    if (!open && formSubmitted) {
      setFormSubmitted(false);
    }
  }, [open]);

  return (
    <Dialog
      open={Boolean(open)}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
      fullScreen={isMobile}
      aria-labelledby="register-dialog-title"
    >
      <DialogTitle id="register-dialog-title" sx={{ fontWeight: 700 }}>
        Register
      </DialogTitle>

      <DialogContent
        dividers
        sx={{ display: "flex", flexDirection: "column", gap: 2, py: 3 }}
      >
        {serverError ? (
          <Box sx={{ mb: 1 }}>
            <Typography color="error" variant="body2">
              {serverError}
            </Typography>
          </Box>
        ) : null}

        <TextField
          variant="outlined"
          label="Full Name"
          placeholder="Your full name"
          value={fullName}
          onChange={(e) => {
            setFullName(e.target.value);
          }}
          fullWidth
          slotProps={{
            inputLabel: { shrink: true },
          }}
          autoComplete="name"
          error={formSubmitted && !fullName.trim()}
          helperText={
            formSubmitted && !fullName.trim()
              ? "Full name is required"
              : undefined
          }
          size="small"
        />

        <TextField
          variant="outlined"
          label="Email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          fullWidth
          slotProps={{
            inputLabel: { shrink: true },
          }}
          type="email"
          autoComplete="email"
          error={formSubmitted && !email.trim()}
          helperText={
            formSubmitted && !email.trim() ? "Email is required" : undefined
          }
          size="small"
        />

        <TextField
          variant="outlined"
          label="Mobile"
          placeholder="+1234567890"
          value={mobile}
          onChange={(e) => {
            setMobile(e.target.value.replace(/[^0-9]/g, ""));
          }}
          fullWidth
          slotProps={{
            inputLabel: {
              shrink: true,
            },
            htmlInput: {
              maxLength: 10,
            },
          }}
          autoComplete="tel"
          error={formSubmitted && !mobile.trim()}
          helperText={
            formSubmitted && !mobile.trim()
              ? "Mobile No is required"
              : undefined
          }
          size="small"
        />
        <Link
          sx={{ textDecoration: "none", cursor: "pointer", fontSize: 14 }}
          onClick={() => {
            handleClose();
            onOpenLogin();
          }}
        >
          Already have an account? Log In
        </Link>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button
          onClick={handleClose}
          variant="contained"
          disabled={submitting}
          color="error"
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleRegister}
          disabled={submitting}
          color="success"
        >
          {submitting ? "Registering…" : "Register"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
