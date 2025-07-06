import React, { useEffect, useState } from "react";
import {
  Link,
  Stack,
  Paper,
  TextField,
  Grid,
  Button,
  Typography,
  Box,
  Container,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import FooterOther from "./footerOther";
import { motion } from "framer-motion";
import { IoHomeOutline } from "react-icons/io5";
import { MdLocationOn } from "react-icons/md";
import { MdStar } from "react-icons/md";

function DormInfo(props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
      <Card
        sx={{
          height: "100%",
          minHeight: "500px",
          display: "flex",
          flexDirection: "column",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: 4,
          overflow: "hidden",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
            transform: "translateY(-8px)",
          },
        }}
      >
        <Link href={props.link} style={{ textDecoration: "none" }}>
          <CardMedia
            component="img"
            height="250"
            image={props.images}
            alt={props.name}
            sx={{
              height: "250px",
              width: "100%",
              objectFit: "cover",
              objectPosition: "center",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          />
        </Link>

        <CardContent
          sx={{ p: 3, flexGrow: 1, display: "flex", flexDirection: "column" }}
        >
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="h5"
              component="h2"
              sx={{
                fontWeight: 700,
                mb: 1,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                lineHeight: 1.2,
              }}
            >
              {props.name}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <Rating
                value={4.5}
                readOnly
                size="small"
                sx={{
                  "& .MuiRating-iconFilled": {
                    color: "#F59E0B",
                  },
                }}
              />
              <Typography variant="body2" color="text.secondary">
                {props.residenceCounts} reviews
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <MdLocationOn style={{ color: "#667eea", fontSize: "1.2rem" }} />
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                lineHeight: 1.4,
                minHeight: "2.8em",
                display: "flex",
                alignItems: "center",
              }}
            >
              {props.address}
            </Typography>
          </Box>
          {props.description && (
            <Box sx={{ mb: 2, flexGrow: 1 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  lineHeight: 1.5,
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {props.description.length > 150
                  ? `${props.description.substring(0, 150)}...`
                  : props.description}
              </Typography>
            </Box>
          )}
          <Box sx={{ flexGrow: 1 }} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: "auto",
            }}
          >
            <Chip
              label={props.price}
              sx={{
                background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                color: "white",
                fontWeight: 600,
                fontSize: "0.9rem",
              }}
            />

            <Button
              variant="outlined"
              size="small"
              sx={{
                borderColor: "rgba(102, 126, 234, 0.3)",
                color: "#667eea",
                "&:hover": {
                  borderColor: "#667eea",
                  background: "rgba(102, 126, 234, 0.04)",
                },
              }}
              startIcon={<IoHomeOutline />}
            >
              View Details
            </Button>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
}

const Dorms = () => {
  const theme = useTheme();

  const [residences, setResidences] = useState([]);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/residences");
      const data = await response.json();
      setResidences(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching residences:", error);
    }
  };

  const fetchAllComments = async () => {
    try {
      const response = await fetch("/api/all_comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log("THIS IS DATA", data);
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([fetchData(), fetchAllComments()]);
      setIsLoading(false);
    };
    loadData();
  }, []);

  const residenceCounts = {};
  comments.forEach((item) => {
    const residenceId = item.residence_id;
    residenceCounts[residenceId] = (residenceCounts[residenceId] || 0) + 1;
  });

  const findCount = ({ id }) => {
    console.log("checking ", id, residenceCounts);
    if (id in residenceCounts) {
      return residenceCounts[id];
    }
    console.log("ID", id);
    return 0;
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Box
            sx={{
              width: 50,
              height: 50,
              border: "4px solid rgba(102, 126, 234, 0.2)",
              borderTop: "4px solid #667eea",
              borderRadius: "50%",
            }}
          />
        </motion.div>
      </Box>
    );
  }
  return (
    <>
      <Box
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          py: 8,
          position: "relative",
          overflow: "hidden",
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
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Box sx={{ textAlign: "center", position: "relative", zIndex: 1 }}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                  fontWeight: 800,
                  color: "white",
                  mb: 2,
                  textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                }}
              >
                Explore Our Residences
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  color: "rgba(255,255,255,0.9)",
                  fontWeight: 300,
                  maxWidth: "600px",
                  mx: "auto",
                  mb: 4,
                }}
              >
                Discover the perfect place to call home during your time at
                Waterloo
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                <Chip
                  label={`${residences.length} Residences`}
                  sx={{
                    background: "rgba(255,255,255,0.2)",
                    color: "white",
                    fontWeight: 600,
                  }}
                />
                <Chip
                  label={`${comments.length} Total Reviews`}
                  sx={{
                    background: "rgba(255,255,255,0.2)",
                    color: "white",
                    fontWeight: 600,
                  }}
                />
              </Box>
            </Box>
          </motion.div>
        </Container>
      </Box>

      <Box
        sx={{
          py: 8,
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          minHeight: "100vh",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {residences.map((residence, index) => (
              <Grid item xs={12} sm={6} md={4} key={residence.id}>
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <DormInfo
                    id={residence.id}
                    name={residence.name}
                    images={residence.images}
                    description={residence.description}
                    address={residence.address}
                    link={residence.id}
                    residenceCounts={findCount({ id: residence.id })}
                    price={residence.price}
                  />
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

export default Dorms;
