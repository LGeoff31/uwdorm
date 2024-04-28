import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "./components/Navbar";
import { Stack, Grid, Box, Typography } from "@mui/material";

const Residence = () => {
  const router = useRouter();
  const [residence, setResidence] = useState([]);

  const { id } = router.query;
  useEffect(() => {
    console.log("id", router.query.id);
    if (router.query.id) {
      fetchResidence();
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

  console.log("residence for village 1", residence);
  if (!residence || residence.length === 0) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <Grid
        sx={{
          background: "rgb(225 246 255)",
          height: "100vh",
          position: "relative",
        }}
      >
        <Navbar />

        <div style={{ position: "relative", width: "100%" }}>
          <img
            src={residence[0].images}
            alt="image"
            style={{ width: "100%", height: "400px" }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0, 0, 0, 0.5)",
            }}
          />
        </div>

        <Grid container direction="row" justifyContent={"space-between"}>
          <Stack padding="2rem" paddingLeft="10rem">
            <Typography variant="h2"> {residence[0].name}</Typography>
            <Typography variant="h2">⭐ {3.6}</Typography>

            <Typography variant="h3">Rating Breakdown </Typography>

            <Typography>
              Room &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;⭐⭐⭐⭐⭐{" "}
            </Typography>
            <Typography>Building &nbsp;&nbsp;&nbsp;&nbsp;⭐⭐ </Typography>
            <Typography>Location &nbsp;&nbsp;&nbsp;⭐⭐⭐⭐⭐ </Typography>
            <Typography>Bathroom &nbsp;⭐⭐⭐⭐ </Typography>
            <Typography variant="h2">Description</Typography>
            <Typography>{residence[0].description}</Typography>
          </Stack>
          <Stack padding="2rem" paddingRight="10rem">
            <Typography variant="h2">Images</Typography>
            <Typography>{residence[0].description}</Typography>
            <Typography variant="h2">Comments</Typography>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default Residence;
