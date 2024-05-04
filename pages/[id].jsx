import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "./components/Navbar";
import { Carousel } from "react-responsive-carousel";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import {
  Paper,
  Link,
  TextField,
  Stack,
  Grid,
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  CheckBox,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Rating,
} from "@mui/material";
// import FormControlContext from "@mui/material/FormControl/FormControlContext";
import { MdOutlineRateReview } from "react-icons/md";
import CloseIcon from "@mui/icons-material/Close";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Images from "./components/Images";

export default function Residence() {
  const router = useRouter();
  const [residence, setResidence] = useState([]);
  const [comment, setComment] = useState(""); //typing textfield
  const [comments, setComments] = useState([]); //all the submitted comments
  const [open, setOpen] = useState(false);
  const [roomRating, setRoomRating] = useState(0);
  const [buildingRating, setBuildingRating] = useState(0);
  const [locationRating, setLocationRating] = useState(0);
  const [bathroomRating, setBathroomRating] = useState(0);
  const { id } = router.query;

  const residencesMap = {
    1: {
      size: "1,381 residents",
      style: "Traditional",
      rooms: ["Single", "Double", "Interconnecting"],
      mealPlan: "Required",
      community: "First-year students",
      mascot: "V1 Groundhog",
    },
    2: {
      size: "539 residents",
      style: "Traditional",
      rooms: ["Single", "Semi-Private"],
      mealPlan: "Required",
      community: "First-year and upper-year students",
      mascot: "UWP Unicorn",
    },
  };

  let residenceDetails = residencesMap[id];

  console.log("fun facts #1", residencesMap);
  console.log("fun facts", residenceDetails);

  const fetchComments = async () => {
    const response = await fetch("/api/comments-by-residence", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ residence_id: id }),
    });
    const data = await response.json();
    setComments(data);
  };

  const handleSubmit = async () => {
    console.log("room rating", roomRating, "  review", comment);
    const data = {
      residence_id: id,
      users_id: 1,
      review: comment,
      room: roomRating,
      building: buildingRating,
      location: locationRating,
      bathroom: bathroomRating,
    };
    console.log("comment", comment);

    const response = await fetch("/api/insert-comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      console.log("error on inserting comment", response.statusText);
    }
    const p = await response.json();
    console.log("inserting comment", p);
    fetchComments();
  };

  useEffect(() => {
    console.log("id", router.query.id);
    if (router.query.id) {
      fetchResidence();
      fetchComments();
    }
  }, [router.query.id]);
  const fetchResidence = async () => {
    try {
      const response = await fetch("/api/residence-by-id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ residence_id: id }),
      });
      const data = await response.json();
      setResidence(data);
    } catch (error) {
      console.error("Error fetching residence data:", error);
    }
  };

  console.log("residence for village 1", residence);
  if (!residence || residence.length === 0) {
    return <h1>Loading...</h1>;
  }

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const StarRating = ({ rating, name }) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(
          <StarIcon key={i} style={{ fontSize: "2.5rem", color: "#FFD700" }} />
        );
      } else {
        stars.push(
          <StarBorderIcon
            key={i}
            style={{ fontSize: "2.5rem", color: "#FFD700" }}
          />
        );
      }
    }
    return (
      <Stack direction="row" justifyContent={"space-between"}>
        <Typography fontSize="1.5rem">{name}</Typography>
        {stars}
      </Stack>
    );
  };

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
  overallRating /= comments.length;
  overallBathroomRating /= comments.length;
  overallRoomRating /= comments.length;
  overallLocationRating /= comments.length;
  overallBuildingRating /= comments.length;

  overallRating = overallRating.toFixed(1);

  return (
    <>
      <Grid
        sx={{
          background: "rgb(225 246 255)",
          height: "100%",
          position: "relative",
        }}
      >
        <Navbar />
        <div style={{ position: "relative", width: "100%" }}>
          <img
            src={residence[0].images}
            alt="image"
            style={{ width: "100%", height: "500px" }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 10,
              left: 150,
              fontSize: "1.5rem",
              fontWeight: "bold",
              zIndex: 1,
            }}
            className="text-blue-300"
          >
            <Typography fontSize="bold" variant="h2">
              {residence[0].name}
            </Typography>
          </div>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0, 0, 0, 0.7)",
            }}
          ></div>
        </div>

        <Grid container direction="row" justifyContent={"space-between"}>
          <Stack padding="2rem" paddingLeft="10rem">
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Link href="/">
                <ArrowBackIcon sx={{ fontSize: "2rem" }} />
              </Link>
              <Typography variant="body1"> Back to Residences</Typography>
            </Stack>
            <Stack spacing={3} marginTop="2rem">
              <Typography variant="h4" fontWeight="bold">
                Overall Rating
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <StarIcon style={{ fontSize: "5rem", color: "#FFD700" }} />
                <Typography fontSize="3rem" className="text-blue-500">
                  {" "}
                  {overallRating}{" "}
                </Typography>
              </Stack>
            </Stack>
            <Grid width="20%" marginTop="1.5rem">
              <Stack
                direction="row"
                alignItems={"center"}
                spacing={2}
                justifyContent={"space-between"}
              >
                <Typography fontSize="1.5rem">Room</Typography>
                <StarRating rating={overallRoomRating} name={""} />{" "}
              </Stack>
              <Stack
                direction="row"
                alignItems={"center"}
                spacing={2}
                justifyContent={"space-between"}
              >
                <Typography fontSize="1.5rem">Building</Typography>
                <StarRating rating={overallBuildingRating} name={""} />{" "}
              </Stack>
              <Stack
                direction="row"
                alignItems={"center"}
                spacing={2}
                justifyContent={"space-between"}
              >
                <Typography fontSize="1.5rem">Location</Typography>
                <StarRating rating={overallLocationRating} name={""} />{" "}
              </Stack>
              <Stack
                direction="row"
                alignItems={"center"}
                spacing={2}
                justifyContent={"space-between"}
              >
                <Typography fontSize="1.5rem">Bathroom</Typography>
                <StarRating rating={overallBathroomRating} name={""} />{" "}
              </Stack>
            </Grid>
            <Typography
              variant="h4"
              marginTop="2rem"
              fontWeight="bold"
              marginBottom="1rem"
            >
              Description
            </Typography>
            <Typography variant="body1" fontSize="1.5rem" width="70%">
              {residence[0].description}
            </Typography>
            <Typography
              variant="h4"
              marginTop="2rem"
              fontWeight="bold"
              marginBottom="1rem"
            >
              Fun Facts
            </Typography>
            <Stack spacing={1}>
              {residenceDetails &&
                Object.entries(residenceDetails).map(([key, value]) => {
                  if (key !== "images") {
                    return (
                      <Typography key={key} variant="body1" fontSize="1.5rem">
                        <strong>
                          {key.charAt(0).toUpperCase() + key.slice(1)}:
                        </strong>{" "}
                        {Array.isArray(value) ? value.join(", ") : value}
                      </Typography>
                    );
                  }
                })}
            </Stack>
            <Typography
              variant="h4"
              fontWeight="bold"
              marginTop="2rem"
              marginBottom="2rem"
            >
              Images
            </Typography>
            <Images id={id} />
          </Stack>
          <Stack padding="2rem" paddingRight="10rem">
            <Button variant="contained" onClick={handleOpen}>
              Write a Review &nbsp; <MdOutlineRateReview />
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
              <DialogTitle margin={2}>
                Add a Review!{" "}
                <IconButton style={{ float: "right" }} onClick={handleClose}>
                  <CloseIcon color="primary" />
                </IconButton>
              </DialogTitle>
              <DialogContent>
                <Stack spacing={2} margin={2}>
                  <Stack direction="row" justifyContent={"space-between"}>
                    <Typography>Room</Typography>
                    <Rating
                      name="rating"
                      value={roomRating}
                      onChange={(e) => setRoomRating(e.target.value)}
                    />
                  </Stack>
                  <Stack direction="row" justifyContent={"space-between"}>
                    <Typography>Building</Typography>
                    <Rating
                      name="rating"
                      value={buildingRating}
                      onChange={(e) => setBuildingRating(e.target.value)}
                    />
                  </Stack>
                  <Stack direction="row" justifyContent={"space-between"}>
                    <Typography>Location</Typography>
                    <Rating
                      name="rating"
                      value={locationRating}
                      onChange={(e) => setLocationRating(e.target.value)}
                    />
                  </Stack>
                  <Stack direction="row" justifyContent={"space-between"}>
                    <Typography>Bathroom</Typography>
                    <Rating
                      name="rating"
                      value={bathroomRating}
                      onChange={(e) => setBathroomRating(e.target.value)}
                    />
                  </Stack>
                  <TextField
                    variant="outlined"
                    label="Write a detailed review..."
                    multiline
                    rows={4}
                    onChange={(e) => setComment(e.target.value)}
                  />

                  <Button
                    color="primary"
                    variant="contained"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </Stack>
              </DialogContent>
              <DialogActions></DialogActions>
            </Dialog>

            <Typography variant="h2">Comments</Typography>
            {comments.map((c, idx) => (
              <Stack spacing={2} margin={2} key={idx}>
                <Stack direction="row" spacing={2} alignItems={"center"}>
                  <StarIcon style={{ fontSize: "5rem", color: "#FFD700" }} />
                  <Typography fontWeight="bold" fontSize="2.5rem">
                    {(
                      (c.building + c.room + c.location + c.bathroom) /
                      4
                    ).toFixed(1)}
                  </Typography>
                </Stack>
                <StarRating rating={c.room} name={"Room"} />
                <StarRating rating={c.building} name={"Building"} />
                <StarRating rating={c.location} name={"Location"} />
                <StarRating rating={c.bathroom} name={"Bathroom"} />
                <Typography key={c.id} fontSize="1.5rem">
                  {c.review}{" "}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
