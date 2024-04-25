import React from "react";
import { Grid, Stack, Typography, Box } from "@mui/material";

const Features = ({
  Icon,
  title,
  description,
}: {
  Icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <Stack direction="row" gap="1rem" marginTop="2rem">
    <Icon style={{ fontSize: "3rem", color: "white" }} />
    <Stack>
      <Typography fontWeight="bold" color="#ffff87">
        {title}
      </Typography>
      <Typography fontWeight="300" color="white">
        {description}
      </Typography>
    </Stack>
  </Stack>
);

export default Features;
