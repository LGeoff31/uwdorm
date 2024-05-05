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
      <h1 className="text-3xl font-bold mb-3">Description</h1>
      <h1 className="text-lg mb-5 mr-5">{residence[0].description}</h1>
      <h1 className="text-3xl font-bold mb-3">Fun Facts</h1>
      <div spacing={1} marginBottom="2rem" className="mr-5">
        {residenceDetails &&
          Object.entries(residenceDetails).map(([key, value]) => (
            <h1 key={key} className="text-lg">
              <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{" "}
              {Array.isArray(value) ? value.join(", ") : value}
            </h1>
          ))}
      </div>
    </Stack>
  );
};

export default Description;
