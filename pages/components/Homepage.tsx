import React, { useState } from "react";
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

  const [selectedResidence, setSelectedResidence] = useState<string | null>("");
  const handleResidenceSelect = (residence: string) => {
    setSelectedResidence(residence);
  };
  return (
    <>
      <Grid
        container
        display="flex"
        alignItems="center"
        direction="column"
        justifyContent={"center"}
        height="100vh"
      >
        <Typography variant="h1">
          UW <span style={{ color: "#349eeb" }}>Rez</span>
        </Typography>
        {/* <span className="text-6xl text-center mb-8 text-black-300 hover:text-blue-400">
          UW Rez
        </span> */}
        <span className="text-xl mb-8">
          Explore reviews of Waterloo&apos;s residences and add your own!
        </span>
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

        <Grid>
          <Stack direction="row" gap="1rem" marginTop="2rem">
            <IoHomeOutline style={{ fontSize: "3rem" }} />
            <Stack>
              <Typography fontWeight="bold" color="#349eeb">
                {"Comfort"}
              </Typography>
              <Typography fontWeight="300">
                Learn about the lifestyle and available accomodations!
              </Typography>
            </Stack>
          </Stack>

          <Stack direction="row" gap="1rem" marginTop="2rem">
            <CiDollar style={{ fontSize: "3rem" }} />
            <Stack>
              <Typography fontWeight="bold" color="#349eeb">
                {"Price"}
              </Typography>
              <Typography fontWeight="300">
                Compare prices between different residences.
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" gap="1rem" marginTop="2rem">
            <AccessibilityNewIcon style={{ fontSize: "3rem" }} />
            <Stack>
              <Typography fontWeight="bold" color="#349eeb">
                {"Life"}
              </Typography>
              <Typography fontWeight="300">
                Learn about the Waterloo experience or add yours!
              </Typography>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default Homepage;
