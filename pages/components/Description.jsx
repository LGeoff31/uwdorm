import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

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

const Description = ({ residence, residenceDetails }) => {
  if (!residence) {
    return <div>Loading</div>;
  }
  return (
    <Stack>
      <Typography variant="h4" fontWeight="bold" marginBottom="1rem">
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
      <Stack spacing={1} marginBottom="2rem">
        {residenceDetails &&
          Object.entries(residenceDetails).map(([key, value]) => (
            <Typography key={key} variant="body1" fontSize="1.5rem">
              <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{" "}
              {Array.isArray(value) ? value.join(", ") : value}
            </Typography>
          ))}
      </Stack>
    </Stack>
  );
};

export default Description;
