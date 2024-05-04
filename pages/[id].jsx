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
} from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Images from "./components/Images";
import ResidenceImage from "./components/ResidenceImage";
import AddReview from "./components/AddReview";
import Description from "./components/Description";

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
    3: {
      size: "1,650 residents",
      style: "Suite",
      rooms: ["2", "3", "4-bedroom suite"],
      mealPlan: "Optional",
      community: "First-year and upper-year students",
      mascot: "UWP Unicorn",
    },
    4: {
      size: "960 residents",
      style: "Traditional",
      rooms: ["Double"],
      mealPlan: "Required",
      community: "First-year students",
      mascot: "REV Moustache",
    },
    5: {
      size: "320 residents",
      style: "Suite",
      rooms: ["4-bedroom suite"],
      mealPlan: "Optional",
      community: "First-year students",
      mascot: "MKV Crown",
    },
    6: {
      size: "400 residents",
      style: "Suite",
      rooms: ["4-bedroom townhouse"],
      mealPlan: "Optional",
      community: "First-year, upper-year, graduate and exchange students",
      mascot: "CLV Lake Monster",
    },
    7: {
      size: "70 residents",
      style: "Hybrid (shared kitchen per floor and optional meal plans)",
      rooms: ["Single"],
      mealPlan: "Optional",
      community: "Upper-year students",
      mascot: "MH Owl",
    },
    8: {
      size: "1019 residents",
      style: "Traditional",
      founded: "1865",
      mascot: "Jerome Lion",
    },
    9: {
      size: "330 residents",
      style: "Traditional",
      rooms: ["Single", "Semi-Private"],
      mealPlan: "Required",
      community: "First-year and upper-year students",
      mascot: "UWP Unicorn",
    },
    10: {
      size: "539 residents",
      style: "Traditional",
      rooms: ["Single", "Double Room"],
      founded: "1962",
      community: "First-year and upper-year students",
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
      <Stack
        direction="row"
        justifyContent={"space-between"}
        className="text-blue-700"
      >
        <Typography fontSize="1.5rem" marginRight="3rem">
          {name}{" "}
        </Typography>
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
        }}
      >
        <Navbar />
        <ResidenceImage
          residence={residence}
          overallRating={overallRating}
          overallBathroomRating={overallBathroomRating}
          overallBuildingRating={overallBuildingRating}
          overallRoomRating={overallRoomRating}
          overallLocationRating={overallLocationRating}
        />
        <Stack
          direction="row"
          spacing={1.5}
          alignItems="center"
          paddingLeft="10rem"
          paddingTop="2rem"
        >
          <Link href="/">
            <ArrowBackIcon
              sx={{ fontSize: "2rem" }}
              className="hover:scale-125 ease-in-out duration-900"
            />
          </Link>
          <Typography variant="body1" fontSize="1.5rem">
            {" "}
            Back to Residences
          </Typography>
        </Stack>
        <Grid justifyContent={"space-between"}>
          <Stack
            padding="2rem"
            paddingLeft="10rem"
            paddingRight="10rem"
            direction="row"
          >
            <Description
              residence={residence}
              residenceDetails={residenceDetails}
            />
            <Images id={id} />
          </Stack>

          <Stack padding="2rem" paddingLeft="10rem" paddingRight="10rem">
            <Stack
              direction="row"
              alignItems={"center"}
              display="flex"
              justifyContent={"space-between"}
              gap="2rem"
            >
              <Typography variant="h2" fontWeight={"bold"} marginBottom="2rem">
                Comments
              </Typography>
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
              />
            </Stack>
            {comments.map((c, idx) => {
              return (
                <>
                  <br></br>
                  <Stack
                    key={idx}
                    direction="column"
                    className="pt-5 px-20 border-2 border-slate-300 rounded-3xl"

                    // width="20%"
                    // alignItems={"center"}
                    // justifyContent={"space-between"}
                  >
                    {/* <Stack direction="row" spacing={2} alignItems={"center"}>
                  <StarIcon style={{ fontSize: "5rem", color: "#FFD700" }} />
                  <Typography fontWeight="bold" fontSize="2.5rem">
                    {(
                      (c.building + c.room + c.location + c.bathroom) /
                      4
                    ).toFixed(1)}
                  </Typography>
                </Stack> */}
                    <Stack
                      direction="row"
                      alignItems={"center"}
                      spacing={2}
                      justifyContent={"space-between"}
                    >
                      <Typography fontSize="1.5rem">Room</Typography>
                      <StarRating rating={c.room} name={""} />{" "}
                    </Stack>
                    <Stack
                      direction="row"
                      alignItems={"center"}
                      spacing={2}
                      justifyContent={"space-between"}
                    >
                      <Typography fontSize="1.5rem">Building</Typography>
                      <StarRating rating={c.building} name={""} />{" "}
                    </Stack>
                    <Stack
                      direction="row"
                      alignItems={"center"}
                      spacing={2}
                      justifyContent={"space-between"}
                    >
                      <Typography fontSize="1.5rem">Location</Typography>
                      <StarRating rating={c.location} name={""} />{" "}
                    </Stack>
                    <Stack
                      direction="row"
                      alignItems={"center"}
                      spacing={2}
                      justifyContent={"space-between"}
                    >
                      <Typography fontSize="1.5rem">Bathroom</Typography>
                      <StarRating rating={c.bathroom} name={""} />{" "}
                    </Stack>

                    {/* <StarRating rating={c.room} name={"Room"} /> */}
                    {/* <StarRating rating={c.building} name={"Building"} />
                <StarRating rating={c.location} name={"Location"} />
                <StarRating rating={c.bathroom} name={"Bathroom"} /> */}
                    <Typography
                      key={c.id}
                      fontSize="1.5rem"
                      marginBottom="2rem"
                      color="grey"
                    >
                      {c.review}{" "}
                    </Typography>
                  </Stack>
                </>
              );
            })}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

// <Stack direction={"column"}>
//   <Stack
//     direction="row"
//     alignItems={"center"}
//     spacing={2}
//     justifyContent={"space-between"}
//   >
//     <Typography fontSize="1.5rem">Room</Typography>
//     <StarRating rating={overallRoomRating} name={""} />{" "}
//   </Stack>
//   <Stack
//     direction="row"
//     alignItems={"center"}
//     spacing={2}
//     justifyContent={"space-between"}
//   >
//     <Typography fontSize="1.5rem">Building</Typography>
//     <StarRating rating={overallBuildingRating} name={""} />{" "}
//   </Stack>
//   <Stack
//     direction="row"
//     alignItems={"center"}
//     spacing={2}
//     justifyContent={"space-between"}
//   >
//     <Typography fontSize="1.5rem">Location</Typography>
//     <StarRating rating={overallLocationRating} name={""} />{" "}
//   </Stack>
//   <Stack
//     direction="row"
//     alignItems={"center"}
//     spacing={2}
//     justifyContent={"space-between"}
//   >
//     <Typography fontSize="1.5rem">Bathroom</Typography>
//     <StarRating rating={overallBathroomRating} name={""} />{" "}
//   </Stack>
// </Stack>;
