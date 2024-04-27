import React, { useEffect, useState } from "react";
import {
  Stack,
  Paper,
  TextField,
  Grid,
  Button,
  Typography,
  Box,
} from "@mui/material";

function DormInfo(props) {
  return (
    <Stack elevation={3} padding="2rem">
      <img
        height={200} // Adjust the height as needed
        width={600} // Adjust the width as needed
        src={props.images}
        alt={props.name}
        className=" h-full transition-all duration-300 cursor-pointer filter  hover:grayscale-0"
      />

      <Stack
        bottom={0}
        left={0}
        width="100%"
        bgcolor="white"
        p={2}
        borderBottomLeftRadius="xl"
        borderBottomRightRadius="xl"
        borderRadius={"5%"}
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Box>
          <Typography variant="h6" fontWeight={"bold"}>
            {props.name}
          </Typography>

          <Typography>399 Reviews ⭐</Typography>
        </Box>

        <Typography>{props.address}</Typography>
      </Stack>
    </Stack>
  );
}

/*images are 750 by 500 */

const Dorms = () => {
  const [residences, setResidences] = useState([]);

  const fetchData = async () => {
    const response = await fetch("/api/residences");
    const data = await response.json();
    setResidences(data);
    console.log(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Typography
        variant="h1"
        display="flex"
        margin="0 auto"
        justifyContent={"center"}
        marginBottom="4rem"
        marginTop="4rem"
      >
        Residences
      </Typography>
      <Grid container spacing={3} justifyContent={"center"}>
        {residences.map((residence) => (
          <DormInfo
            key={residence.id}
            id={residence.id}
            name={residence.name}
            images={residence.images}
            description={residence.description}
            address={residence.address}
          />
        ))}
      </Grid>
    </>
  );
};

export default Dorms;
