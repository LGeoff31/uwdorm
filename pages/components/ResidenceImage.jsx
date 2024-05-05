import React, { useEffect, useState } from "react";

import { Stack, Grid, Typography } from "@mui/material";

import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

const ResidenceImage = ({
  residence,
  overallRating,
  overallBathroomRating,
  overallLocationRating,
  overallRoomRating,
  overallBuildingRating,
}) => {
  if (!residence) {
    return <div>Loading</div>;
  }
  const StarRating = ({ rating, name }) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(
          <StarIcon key={i} style={{ fontSize: "2rem", color: "#FFD700" }} />
        );
      } else {
        stars.push(
          <StarBorderIcon
            key={i}
            style={{ fontSize: "2rem", color: "#FFD700" }}
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
  return (
    <Grid sx={{ position: "relative", width: "100%" }}>
      <div
        style={{
          background: `url('https://coolbackgrounds.io/images/backgrounds/index/compute-ea4c57a4.png') no-repeat center center fixed`,
          backgroundSize: "cover",
          height: "25vh",
          display: "flex",
        }}
      ></div>
      {/* <img
        src={residence[0].images}
        alt="image"
        style={{ width: "100%", height: "500px" }}
      /> */}
      <Grid
        sx={{ position: "absolute", bottom: 20, left: 150, zIndex: 1 }}
        className="text-blue-300"
      >
        <Stack direction="row" alignItems={"center"} spacing={10}>
          <Stack direction="column">
            <h1 className="text-5xl">{residence[0].name}</h1>
            <Stack direction="row" alignItems={"center"}>
              <StarIcon style={{ fontSize: "3rem", color: "#FFD700" }} />
              <Typography fontSize="2.7rem" color="yellow">
                {" "}
                {overallRating}{" "}
              </Typography>
            </Stack>
          </Stack>

          <Stack direction={"column"}>
            <Stack
              direction="row"
              alignItems={"center"}
              spacing={2}
              justifyContent={"space-between"}
            >
              <h1 className="text-xl">Room</h1>
              <StarRating rating={overallRoomRating} name={""} />{" "}
            </Stack>
            <Stack
              direction="row"
              alignItems={"center"}
              spacing={2}
              justifyContent={"space-between"}
            >
              <h1 className="text-xl">Pricing</h1>
              <StarRating rating={overallBuildingRating} name={""} />{" "}
            </Stack>
            <Stack
              direction="row"
              alignItems={"center"}
              spacing={2}
              justifyContent={"space-between"}
            >
              <h1 className="text-xl">Location</h1>
              <StarRating rating={overallLocationRating} name={""} />{" "}
            </Stack>
            <Stack
              direction="row"
              alignItems={"center"}
              spacing={2}
              justifyContent={"space-between"}
            >
              <h1 className="text-xl">Bathroom</h1>
              <StarRating rating={overallBathroomRating} name={""} />{" "}
            </Stack>
          </Stack>
        </Stack>
      </Grid>

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          // background: "rgba(0, 0, 0, 0.7)",
        }}
      ></div>
    </Grid>
  );
};

export default ResidenceImage;
