import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { IoHomeOutline } from "react-icons/io5";
import { MdPriceCheck } from "react-icons/md";
import { GiMaterialsScience } from "react-icons/gi";
import { SiSlideshare } from "react-icons/si";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import FindResidence from "./FindResidence";

const Homepage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const features = [
    {
      icon: (
        <GiMaterialsScience style={{ fontSize: "2.5rem", color: "#3B82F6" }} />
      ),
      title: "AI-Powered Matching",
      description:
        "Find your perfect residence using our advanced AI algorithm that considers your preferences and lifestyle.",
      color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      icon: <IoHomeOutline style={{ fontSize: "2.5rem", color: "#10B981" }} />,
      title: "Comprehensive Housing Guide",
      description:
        "Explore detailed information about all available accommodations across campus.",
      color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    {
      icon: <MdPriceCheck style={{ fontSize: "2.5rem", color: "#F59E0B" }} />,
      title: "Smart Price Comparison",
      description:
        "Compare costs and value across different residences to make informed decisions.",
      color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
    {
      icon: <SiSlideshare style={{ fontSize: "2.5rem", color: "#8B5CF6" }} />,
      title: "Student Experiences",
      description:
        "Learn from real student reviews and experiences to understand what to expect.",
      color: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    },
  ];

  const ScrollLink = dynamic(
    () => import("react-scroll").then((module) => module.Link),
    { ssr: false }
  );

  return (
    <>
      <Box
        sx={{
          minHeight: "90vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')',
            animation: "float 20s ease-in-out infinite",
          }}
        />
        <Container maxWidth="lg">
          <Grid
            container
            spacing={4}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12} md={8} textAlign="center">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: "3rem", md: "4.5rem" },
                    fontWeight: 800,
                    color: "white",
                    mb: 2,
                    textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                    background: "linear-gradient(45deg, #ffffff, #e0e7ff)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  UW Rez
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: { xs: "1.2rem", md: "1.5rem" },
                    color: "rgba(255,255,255,0.9)",
                    mb: 4,
                    fontWeight: 300,
                    lineHeight: 1.6,
                  }}
                >
                  Discover your perfect home at Waterloo with AI-powered
                  recommendations
                </Typography>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <FindResidence />
                </motion.div>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          style={{
            position: "absolute",
            bottom: "2rem",
            transform: "translateX(-50%)",
          }}
        >
          {ScrollLink && (
            <ScrollLink
              to="features"
              spy={true}
              smooth={true}
              duration={1000}
              style={{ cursor: "pointer" }}
              // @ts-ignore
              as={"div"}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  color: "white",
                }}
              >
                <Typography variant="body2" sx={{ mb: 1, opacity: 0.8 }}>
                  Why Choose UW Rez?
                </Typography>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Box
                    sx={{
                      width: "2px",
                      height: "30px",
                      background: "rgba(255,255,255,0.6)",
                      position: "relative",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: "-4px",
                        width: "10px",
                        height: "10px",
                        border: "2px solid rgba(255,255,255,0.6)",
                        borderTop: "none",
                        borderLeft: "none",
                        transform: "rotate(45deg)",
                      },
                    }}
                  />
                </motion.div>
              </Box>
            </ScrollLink>
          )}
        </motion.div>
      </Box>
      <Box
        id="features"
        sx={{
          py: 8,
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h2"
              textAlign="center"
              sx={{
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                fontWeight: 700,
                mb: 2,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Why Choose UW Rez?
            </Typography>
            <Typography
              variant="h5"
              textAlign="center"
              sx={{
                color: "text.secondary",
                mb: 6,
                fontWeight: 300,
                maxWidth: "600px",
                mx: "auto",
              }}
            >
              Everything you need to make the best housing decision for your
              university experience
            </Typography>
          </motion.div>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    sx={{
                      height: "100%",
                      background: "rgba(255, 255, 255, 0.9)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      borderRadius: 3,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                        background: "rgba(255, 255, 255, 0.95)",
                      },
                    }}
                  >
                    <CardContent
                      sx={{
                        p: 4,
                        textAlign: "center",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                        style={{ marginBottom: "1rem" }}
                      >
                        {feature.icon}
                      </motion.div>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          mb: 2,
                          color: "text.primary",
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          lineHeight: 1.6,
                        }}
                      >
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </>
  );
};

export default Homepage;
