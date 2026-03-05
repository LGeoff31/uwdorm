import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "./components/Navbar";
import {
  Paper,
  Link,
  TextField,
  Stack,
  Grid,
  Box,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  Chip,
  Avatar,
  Divider,
  useTheme,
  useMediaQuery,
  IconButton,
  Rating,
  Skeleton,
} from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { motion, AnimatePresence } from "framer-motion";
import { IoHomeOutline } from "react-icons/io5";
import { MdLocationOn, MdPeople, MdRestaurant } from "react-icons/md";
import { GiMaterialsScience } from "react-icons/gi";
import Images from "./components/Images";
import ResidenceImage from "./components/ResidenceImage";
import AddReview from "./components/AddReview";
import Description from "./components/Description";
import FooterOther from "./components/footerOther";

export default function Residence() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [residence, setResidence] = useState([]);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [open, setOpen] = useState(false);
  const [roomRating, setRoomRating] = useState(0);
  const [buildingRating, setBuildingRating] = useState(0);
  const [locationRating, setLocationRating] = useState(0);
  const [bathroomRating, setBathroomRating] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = router.query;
  const [user, setUser] = useState(null);

  const residencesMap = {
    1: {
      size: "👥 1,381 residents",
      style: "🌟 Traditional",
      rooms: ["🚪 Single", "Double", "Interconnecting"],
      mealPlan: "🍔 Required",
      community: "🌐 First-year students",
      mascot: "🦦 V1 Groundhog",
    },
    2: {
      size: "👥 539 residents",
      style: "🌟 Traditional",
      rooms: ["🚪 Single", "Semi-Private"],
      mealPlan: "🍔 Required",
      community: "🌐 First-year and upper-year students",
      mascot: "🦄 UWP Unicorn",
    },
    3: {
      size: "👥 1,650 residents",
      style: "🌟 Suite",
      rooms: ["🚪 2", "3", "4-bedroom suite"],
      mealPlan: "🍔 Optional",
      community: "🌐 First-year and upper-year students",
      mascot: "🦄 UWP Unicorn",
    },
    4: {
      size: "👥 960 residents",
      style: "🌟 Traditional",
      rooms: ["🚪 Double"],
      mealPlan: "🍔 Required",
      community: "🌐 First-year students",
      mascot: "🥸 REV Moustache",
    },
    5: {
      size: "👥 320 residents",
      style: "🌟 Suite",
      rooms: ["🚪 4-bedroom suite"],
      mealPlan: "🍔 Optional",
      community: "🌐 First-year students",
      mascot: "👑 MKV Crown",
    },
    6: {
      size: "👥 400 residents",
      style: "🌟 Suite",
      rooms: ["🚪 4-bedroom townhouse"],
      mealPlan: "🍔 Optional",
      community: "🌐 First-year, upper-year, graduate and exchange students",
      mascot: "🐉 CLV Lake Monster",
    },
    7: {
      size: "👥 70 residents",
      style: "🌟 Hybrid (shared kitchen per floor and optional meal plans)",
      rooms: ["🚪 Single"],
      mealPlan: "🍔 Optional",
      community: "🌐 Upper-year students",
      mascot: "🦉 MH Owl",
    },
    9: {
      size: "👥 330 residents",
      style: "🌟 Traditional",
      rooms: ["🚪 Single", "Semi-Private"],
      mealPlan: "🍔 Required",
      community: "🌐 First-year and upper-year students",
      mascot: "🦄 UWP Unicorn",
    },
    10: {
      size: "👥 539 residents",
      style: "🌟 Traditional",
      rooms: ["🚪 Single", "Double Room"],
      founded: "1962",
      community: "🌐 First-year and upper-year students",
    },
  };

  let residenceDetails = residencesMap[id];

  const fetchComments = async () => {
    try {
      const response = await fetch("/api/comments-by-residence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ residence_id: id }),
      });
      const data = await response.json();
      setComments(data);
    } catch (error) {
      // failed silently
    }
  };

  useEffect(() => {
    if (router.query.id) {
      const loadData = async () => {
        setIsLoading(true);
        await Promise.all([fetchResidence(), fetchComments()]);
        setIsLoading(false);
      };
      loadData();
    }
  }, [router.query.id]);

  const fetchResidence = async () => {
    try {
      const response = await fetch("/api/residence-by-id", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ residence_id: id }),
      });
      const data = await response.json();
      setResidence(data);
    } catch (error) {
      // failed silently
    }
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        }}
      >
        <Navbar setUser={setUser} />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Stack spacing={3}>
            <Skeleton
              variant="rectangular"
              height={400}
              sx={{ borderRadius: 3 }}
            />
            <Skeleton variant="text" height={60} />
            <Skeleton variant="text" height={40} />
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Skeleton
                  variant="rectangular"
                  height={300}
                  sx={{ borderRadius: 2 }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Skeleton
                  variant="rectangular"
                  height={300}
                  sx={{ borderRadius: 2 }}
                />
              </Grid>
            </Grid>
          </Stack>
        </Container>
      </Box>
    );
  }

  if (!residence || residence.length === 0) {
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
        <Typography variant="h4" color="text.secondary">
          Residence not found
        </Typography>
      </Box>
    );
  }

  let overallRating = 0;
  let overallRoomRating = 0;
  let overallBuildingRating = 0;
  let overallLocationRating = 0;
  let overallBathroomRating = 0;

  for (let i = 0; i < comments.length; i++) {
    overallRating +=
      (comments[i].room +
        comments[i].building +
        comments[i].bathroom +
        comments[i].location) /
      4;
    overallRoomRating += comments[i].room;
    overallBuildingRating += comments[i].building;
    overallLocationRating += comments[i].location;
    overallBathroomRating += comments[i].bathroom;
  }

  if (comments.length > 0) {
    overallRating /= comments.length;
    overallBathroomRating /= comments.length;
    overallRoomRating /= comments.length;
    overallLocationRating /= comments.length;
    overallBuildingRating /= comments.length;
  }

  overallRating = overallRating.toFixed(1);
  if (isNaN(overallRating)) {
    overallRating = 0;
  }

  let userPhoto =
    "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/little-cute-kitten-serhii-kucher.jpg";
  if (user) {
    userPhoto = user.photoURL;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "long", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const QuickStats = ({ icon, label, value, color = "#667eea" }) => (
    <Card
      sx={{
        background: "rgba(255, 255, 255, 0.97)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(102,126,234,0.08)",
        borderRadius: 4,
        transition: "all 0.35s cubic-bezier(.4,0,.2,1)",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 12px 32px rgba(102,126,234,0.10)",
          borderColor: "rgba(102,126,234,0.15)",
        },
      }}
    >
      <CardContent sx={{ p: 2, textAlign: "center" }}>
        <Box sx={{ color, mb: 1 }}>{icon}</Box>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #f8faff 0%, #eef2ff 50%, #e8ecf8 100%)",
      }}
    >
      <Navbar setUser={setUser} />

      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          position: "relative",
          overflow: "hidden",
          py: 6,
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

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{ mb: 3 }}
            >
              <IconButton
                component={Link}
                href="/"
                sx={{
                  background: "rgba(255,255,255,0.2)",
                  color: "white",
                  "&:hover": {
                    background: "rgba(255,255,255,0.3)",
                  },
                }}
              >
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h4" sx={{ color: "white", fontWeight: 600 }}>
                Back to Residences
              </Typography>
            </Stack>

            <ResidenceImage
              residence={residence}
              overallRating={overallRating}
              overallBathroomRating={overallBathroomRating}
              overallBuildingRating={overallBuildingRating}
              overallRoomRating={overallRoomRating}
              overallLocationRating={overallLocationRating}
            />
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Quick Stats */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Grid container spacing={3} sx={{ mb: 6 }}>
            <Grid item xs={6} md={3}>
              <QuickStats
                icon={<MdPeople style={{ fontSize: "2rem" }} />}
                label="Residents"
                value={residenceDetails?.size?.split(" ")[1] || "N/A"}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <QuickStats
                icon={<IoHomeOutline style={{ fontSize: "2rem" }} />}
                label="Style"
                value={residenceDetails?.style?.split(" ")[1] || "N/A"}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <QuickStats
                icon={<MdRestaurant style={{ fontSize: "2rem" }} />}
                label="Meal Plan"
                value={residenceDetails?.mealPlan?.split(" ")[1] || "N/A"}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <QuickStats
                icon={<MdLocationOn style={{ fontSize: "2rem" }} />}
                label="Community"
                value={residenceDetails?.community?.split(" ")[1] || "N/A"}
              />
            </Grid>
          </Grid>
        </motion.div>

        <Grid container spacing={4}>
          <Grid item xs={12}>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card
                sx={{
                  background: "rgba(255, 255, 255, 0.97)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(102,126,234,0.08)",
                  borderRadius: 4,
                  overflow: "hidden",
                  mb: 4,
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Description
                    residence={residence}
                    residenceDetails={residenceDetails}
                  />
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          <Grid item xs={12}>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card
                sx={{
                  background: "rgba(255, 255, 255, 0.97)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(102,126,234,0.08)",
                  borderRadius: 4,
                  overflow: "hidden",
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Images id={id} />
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card
            sx={{
              background: "rgba(255, 255, 255, 0.97)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(102,126,234,0.08)",
              borderRadius: 4,
              overflow: "hidden",
              mt: 4,
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Stack
                direction={{ xs: "column", md: "row" }}
                alignItems="center"
                justifyContent="space-between"
                sx={{ mb: 4 }}
              >
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                    Student Reviews
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {comments.length} reviews from current and former residents
                  </Typography>
                </Box>
                <AddReview
                  residencesMap={residencesMap}
                  fetchComments={fetchComments}
                  roomRating={roomRating}
                  buildingRating={buildingRating}
                  locationRating={locationRating}
                  bathroomRating={bathroomRating}
                  setRoomRating={setRoomRating}
                  setBathroomRating={setBathroomRating}
                  setBuildingRating={setBuildingRating}
                  setLocationRating={setLocationRating}
                  open={open}
                  setOpen={setOpen}
                  comment={comment}
                  setComment={setComment}
                  id={id}
                  userPhoto={userPhoto}
                />
              </Stack>

              <AnimatePresence>
                {comments.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Box
                      sx={{
                        textAlign: "center",
                        py: 8,
                        color: "text.secondary",
                      }}
                    >
                      <GiMaterialsScience
                        style={{
                          fontSize: "4rem",
                          opacity: 0.3,
                          marginBottom: "1rem",
                        }}
                      />
                      <Typography variant="h6" sx={{ mb: 1 }}>
                        No reviews yet
                      </Typography>
                      <Typography variant="body2">
                        Be the first to share your experience!
                      </Typography>
                    </Box>
                  </motion.div>
                ) : (
                  <Stack spacing={3}>
                    {comments.map((comment, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                      >
                        <Card
                          sx={{
                            background: "rgba(248, 250, 252, 0.9)",
                            border: "1px solid rgba(102, 126, 234, 0.06)",
                            borderRadius: 4,
                            transition: "all 0.3s cubic-bezier(.4,0,.2,1)",
                            "&:hover": {
                              boxShadow: "0 8px 28px rgba(102,126,234,0.08)",
                              transform: "translateY(-2px)",
                              borderColor: "rgba(102, 126, 234, 0.12)",
                            },
                          }}
                        >
                          <CardContent sx={{ p: 3 }}>
                            <Stack
                              direction={{ xs: "column", sm: "row" }}
                              spacing={2}
                            >
                              <Avatar
                                src={comment.photourl}
                                sx={{ width: 56, height: 56 }}
                              />
                              <Box sx={{ flexGrow: 1 }}>
                                <Stack
                                  direction={{ xs: "column", sm: "row" }}
                                  justifyContent="space-between"
                                  alignItems={{
                                    xs: "flex-start",
                                    sm: "center",
                                  }}
                                  sx={{ mb: 2 }}
                                >
                                  <Box>
                                    <Typography
                                      variant="h6"
                                      sx={{ fontWeight: 600 }}
                                    >
                                      {comment.name}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                      sx={{ fontStyle: "italic" }}
                                    >
                                      {comment.faculty}
                                    </Typography>
                                  </Box>
                                  <Box
                                    sx={{
                                      textAlign: { xs: "left", sm: "right" },
                                    }}
                                  >
                                    <Rating
                                      value={
                                        (comment.building +
                                          comment.room +
                                          comment.location +
                                          comment.bathroom) /
                                        4
                                      }
                                      readOnly
                                      size="small"
                                      sx={{
                                        "& .MuiRating-iconFilled": {
                                          color: "#F59E0B",
                                        },
                                      }}
                                    />
                                  </Box>
                                </Stack>
                                <Typography
                                  variant="body1"
                                  sx={{
                                    lineHeight: 1.6,
                                    color: "text.primary",
                                  }}
                                >
                                  {comment.review}
                                </Typography>
                              </Box>
                            </Stack>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </Stack>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </Container>

      <FooterOther />

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
    </Box>
  );
}
