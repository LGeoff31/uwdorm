import React, { useState } from "react";
import { Stack, TextField, Typography, Autocomplete } from "@mui/material";
import SearchBar from "material-ui-search-bar";

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
    <Stack sx={{ background: "purple" }}>
      <Typography margin="0 auto" fontSize="2rem" color="white">
        Explore thousands of reviews of first year and upper year residences
      </Typography>
      <Autocomplete
        sx={{
          background: "white",
          width: "50%",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
        }}
        options={residences}
        getOptionLabel={(option) => option}
        renderInput={(params) => (
          <TextField {...params} label="Search Residence" />
        )}
        onChange={(event, value) => setSelectedResidence(value)}
      />
    </Stack>
  );
};

export default Homepage;
