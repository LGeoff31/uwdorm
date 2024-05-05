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
import FooterOther from "./components/footerOther";

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
  const [user, setUser] = useState(null);

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

  if (!residence || residence.length === 0) {
    return <h1>Loading...</h1>;
  }

  const StarRating = ({ rating, name }) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(
          <StarIcon key={i} style={{ fontSize: "1.8rem", color: "#FFD700" }} />
        );
      } else {
        stars.push(
          <StarBorderIcon
            key={i}
            style={{ fontSize: "1.8rem", color: "#FFD700" }}
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
  console.log("Please user", user);
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

  return (
    <>
      <Grid
        sx={{
          background: "rgb(225 246 255)",
        }}
      >
        <Navbar setUser={setUser} />
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
          <h1 className="text-xl"> Back to Residences</h1>
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
              <h1 className="text-3xl font-bold">Comments</h1>
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
            {comments.map((c, idx) => {
              return (
                <>
                  <br></br>
                  <div
                    key={idx}
                    className="p-3 border-2 border-slate-300 rounded-3xl bg-gray-100"
                  >
                    <div className="flex flex-row justify-between">
                      <img
                        src={c.photourl}
                        alt="user photo"
                        style={{ borderRadius: "70%", height: "8rem" }}
                      />
                      <Stack direction={"column"}>
                        <Typography color="grey">
                          {formatDate(c.created_at)}
                        </Typography>
                        <h1 className="text-left text-lg text-zinc-500 mr-12 ml-1">
                          {c.review}{" "}
                        </h1>
                      </Stack>

                      <div className="flex flex-col">
                        <div className="flex flex-row justify-between">
                          <h1 className="text-left text-lg">Room</h1>
                          <StarRating rating={c.room} name={""} />{" "}
                        </div>

                        <div className="flex flex-row justify-between">
                          <h1 className="text-left text-lg">Pricing</h1>
                          <StarRating rating={c.building} name={""} />{" "}
                        </div>

                        <div className="flex flex-row justify-between">
                          <h1 className="text-left text-lg">Location</h1>
                          <StarRating rating={c.location} name={""} />{" "}
                        </div>
                        <div className="flex flex-row justify-between">
                          <h1 className="text-left text-lg">Bathroom</h1>
                          <StarRating rating={c.bathroom} name={""} />{" "}
                        </div>
                      </div>
                    </div>
                    {/* <StarRating rating={c.room} name={"Room"} /> */}
                    {/* <StarRating rating={c.building} name={"Building"} />
                <StarRating rating={c.location} name={"Location"} />
                <StarRating rating={c.bathroom} name={"Bathroom"} /> */}
                  </div>
                </>
              );
            })}
          </Stack>
        </Grid>
      </Grid>
      <FooterOther />
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
