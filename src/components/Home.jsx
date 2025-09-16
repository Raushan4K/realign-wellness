import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import "../styles/Navbar.css";

const classesData = [
  { id: 1, title: "Morning Boost Yoga", image: "/assets/MorningYoga.png", btnColor: "success" },
  { id: 2, title: "Chair Yoga for Seniors", image: "/assets/yogachair.png", btnColor: "primary" },
  { id: 3, title: "Evening Meditation", image: "/assets/meditations.png", btnColor: "secondary" },
];

export default function Home() {
  const openLogin = () => window.dispatchEvent(new CustomEvent("openLogin"));

  return (
    <section className="hero" aria-labelledby="hero-heading">
      <Container className="hero-container">
        <h1 id="hero-heading" className="hero-title">
          Wellness Made Simple, From Your Home
        </h1>

        <p className="hero-subtitle">
          Live fitness, yoga, and meditation classes for housewives, seniors, and busy professionals —
          accessible, inclusive, and effective.
        </p>

        <Box component="section" sx={{ width: "100%", mb: 6 }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
            alignItems="center"
            className="hero-cta-group"
          >
            <Button variant="contained" color="success" onClick={openLogin} className="cta" sx={{ textTransform: "none", px: { xs: 4, sm: 6 }, py: { xs: 1.6, sm: 1.2 }, borderRadius: 2 }}>
              Join Free Trial
            </Button>

            <Button variant="contained" color="success" onClick={openLogin} className="cta" sx={{ textTransform: "none", px: { xs: 4, sm: 5 }, py: { xs: 1.6, sm: 1.2 }, borderRadius: 2 }}>
              Book Your First Class
            </Button>
          </Stack>
        </Box>

        <Typography id="featured-classes-heading" component="h2" className="featured-heading" sx={{ mb: 1, mt: 2 }}>
          Featured Classes
        </Typography>

        <Typography className="featured-subtitle" variant="subtitle1" sx={{ mb: 4 }}>
          Handpicked live and on‑demand sessions — clear, accessible, and effective. Choose classes tailored to your schedule, fitness level, and mobility needs.
        </Typography>

        {/* REPLACED: use a flex row so cards sit inline responsively */}
        <Box component="div" className="cards-row" role="list">
          {classesData.map((c) => (
            <Box key={c.id} className="cards-row-item" role="listitem">
              <Card className="image-only-card" elevation={3}>
                <Box className="image-area">
                  <img src={c.image} alt={c.title} className="image-area-img" loading="lazy" />
                </Box>

                <Box className="card-footer">
                  <Button
                    variant="contained"
                    color={c.btnColor || "primary"}
                    onClick={(e) => {
                      e.stopPropagation();
                      openLogin();
                    }}
                    sx={{
                      textTransform: "none",
                      width: { xs: "100%", sm: "auto" },
                      px: { xs: 2.5, sm: 4 },
                    }}
                  >
                    Join Class
                  </Button>
                </Box>
              </Card>
            </Box>
          ))}
        </Box>

      </Container>
    </section>
  );
}