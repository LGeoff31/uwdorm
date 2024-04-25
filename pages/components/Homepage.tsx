import React, { useState } from "react";
import {
  Grid,
  Stack,
  TextField,
  Typography,
  Autocomplete,
  Box,
  Button,
} from "@mui/material";
import { IoHomeOutline } from "react-icons/io5";
import { CiDollar } from "react-icons/ci";
import { IoRestaurantOutline } from "react-icons/io5";
import Features from "../subcomponents/Features";

const Homepage = () => {
  const residences = [
    "CMH",
    "UWP",
    "Village 1",
    // Add more residences as needed
  ];
  const featuresData = [
    {
      Icon: IoHomeOutline,
      title: "Comfort",
      description:
        "The lifestyle, appliances, entertainment within the residence.",
    },
    {
      Icon: CiDollar,
      title: "Pricing",
      description: "Compare the prices between countless residences.",
    },
    {
      Icon: IoRestaurantOutline,
      title: "Easy-to-use",
      description: "Discover delicious restaurants nearby to eat.",
    },
  ];

  const [selectedResidence, setSelectedResidence] = useState<string | null>("");
  const handleResidenceSelect = (residence: string) => {
    setSelectedResidence(residence);
  };
  return (
    <>
      <Grid
        container
        sx={{
          background: "linear-gradient(to right, #8e2de2, #4a00e0);",
        }}
        alignItems="center"
        direction="column"
        justifyContent={"center"}
        height="90vh"
      >
        <Stack margin="0 auto" justifyContent={"center"}>
          <Typography variant="h1" color="white" margin="0 auto">
            {" "}
            UW <span style={{ color: "#7be4ed" }}>Dorms</span>
          </Typography>
          <Typography fontSize="2rem" color="white" marginBottom="2rem">
            Explore thousands of reviews of first year and upper year residences
          </Typography>
          <Autocomplete
            sx={{
              background: "white",
              width: "50%",
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              marginBottom: "4rem",
            }}
            options={residences}
            getOptionLabel={(option) => option}
            renderInput={(params) => (
              <TextField {...params} label="Search Residence" />
            )}
            onChange={(event, value) => setSelectedResidence(value)}
          />
        </Stack>

        <Stack
          direction="column" // Change to column to stack features vertically
        >
          {featuresData.map((feature, index) => (
            <Features
              key={index}
              Icon={feature.Icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </Stack>
      </Grid>
    </>
  );
};

export default Homepage;
