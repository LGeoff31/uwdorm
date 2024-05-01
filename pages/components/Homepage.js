import React, { useState } from "react";
import Footer from './footer'
import {
  Grid,
  Stack,
  TextField,
  Typography,
  Autocomplete,
} from "@mui/material";
import { IoHomeOutline } from "react-icons/io5";
import { CiDollar } from "react-icons/ci";
import { IoRestaurantOutline } from "react-icons/io5";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";

const Homepage = () => {
  const residences = [
    "CMH",
    "UWP",
    "Village 1",
    // Add more residences as needed
  ];

  const [selectedResidence, setSelectedResidence] = useState("");
  const handleResidenceSelect = (residence) => {
    setSelectedResidence(residence);
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url(https://coolbackgrounds.io/images/backgrounds/index/compute-ea4c57a4.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid
          container
          sx={{
            background:
              "linear-gradient(to bottom, to right, #8e2de2, #4a00e0);",
          }}
          alignItems="center"
          direction="column"
          justifyContent={"center"}
          height="90vh"
        >
          <Stack margin="0 auto" justifyContent={"center"}>
            <span className="text-6xl text-center mb-8 text-blue-300">
              UW Rez
            </span>
            <span className="text-xl mb-8 text-gray-300">
              Explore reviews of Waterloo&apos;s residences and add your own!
            </span>
            <Autocomplete
              sx={{
                background: "lightgray",
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
          <Grid>
            <Stack direction="row" gap="1rem" marginTop="2rem">
              <IoHomeOutline style={{ fontSize: "3rem", color: "#d4d4d8" }} />
              <Stack>
                <Typography fontWeight="bold" color="#93c5fd">
                  {"Comfort"}
                </Typography>
                <Typography fontWeight="300" color="#d4d4d8">
                  Learn about the lifestyle and available accommodations!
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row" gap="1rem" marginTop="2rem">
              <CiDollar style={{ fontSize: "3rem", color: "#d4d4d8" }} />
              <Stack>
                <Typography fontWeight="bold" color="#93c5fd">
                  {"Price"}
                </Typography>
                <Typography fontWeight="300" color="lightgray">
                  Compare prices between different residences.
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row" gap="1rem" marginTop="2rem">
              <AccessibilityNewIcon
                style={{ fontSize: "3rem", color: "#d4d4d8"}}
              />
              <Stack>
                <Typography fontWeight="bold" color="#93c5fd">
                  {"Life"}
                </Typography>
                <Typography fontWeight="300" color="#d4d4d8">
                  Learn about the Waterloo experience or add yours!
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </div>
      
    </>
  );
};

export default Homepage;