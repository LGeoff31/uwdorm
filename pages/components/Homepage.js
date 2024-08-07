import React, { useState } from "react";
import {
  Grid,
  Stack,
  TextField,
  Typography,
  Autocomplete,
  Button,
  Box,
} from "@mui/material";
import { IoHomeOutline } from "react-icons/io5";
import { MdPriceCheck } from "react-icons/md";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import { SiSlideshare } from "react-icons/si";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const FindResidence = dynamic(() => import('../components/FindResidence'), {
  ssr: false,
});

const Homepage = () => {
  const residences = [
    "Village1 (V1)",
    "Claudette Millar Hall (CMH)",
    "UW Place (UWP)",
    "Ron Eydt Village (REV)",
    "Mackenzie King Village (MKV)",
    "Columbia Lake Village (CLV)",
    "Minota Hagey",
    "St.Jerome (SJU)",
    "United College (UC)",
    "Renison",

    // Add more residences as needed
  ];

  const ScrollLink = dynamic(
    () => import("react-scroll").then((module) => module.Link),
    { ssr: false }
  );
  function handleResidenceChange(e) {
    const selectedResValue = e.target.value;
    if (selectedResValue) {
      window.location.href = `/${selectedResValue}`;
    } else {
      <h1>Nothing here</h1>;
    }
  }

  return (
    <>
      <div
        style={{
          backgroundImage: `url(https://coolbackgrounds.io/images/backgrounds/index/compute-ea4c57a4.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "105vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid>
          <Stack>
            <Typography
              fontSize="3rem"
              color="#93C5FD"
              margin="0 auto"
              marginBottom="1rem"
            >
              UW Rez
            </Typography>
            <Typography
              fontSize={{ md: "1.7rem", xs: "1rem" }}
              marginBottom="1rem"
              color="#D4D4D8"
              marginLeft="2rem"
              marginRight="2rem"
            >
              Explore reviews of Waterloo&apos;s residences or add your own!
            </Typography>
            <label className="flex text-med justify-center h-[3rem]">
              <select
                className=" font-medium rounded-lg bg-gray-300"
                onChange={handleResidenceChange}
              >
                <option className="pr-2" disabled selected hidden>
                  &nbsp;&nbsp;Select a Residence
                </option>
                {residences.map((residence, index) => (
                  <option
                    key={residence}
                    value={index + 1}
                    className="font-medium text-black"
                  >
                    &nbsp;{residence}
                  </option>
                ))}
              </select>
            </label>
            <Typography
              fontSize={{ md: "1.7rem", xs: "1rem" }}
              marginTop="1rem"
              color="#93C5FD"
              marginLeft="2rem"
              marginRight="2rem"
              className="text-center"
            >
              OR
            </Typography>
            
            <FindResidence/>
            
          </Stack>

          <motion.div
            initial={{ x: 0, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.5 }}
            className=" object-cover md:rounded-lg  overflow-hidden"
          >
            <Stack
              direction="row"
              gap="1rem"
              marginTop="2rem"
              justifyContent={"center"}
            >
              <IoHomeOutline
                style={{ fontSize: "3rem", color: "#d4d4d8" }}
                // fontSize={{ md: "3rem", xs: "2rem" }}
              />
              <Stack>
                <Typography fontWeight="bold" color="#93c5fd">
                  {"Housing"}
                </Typography>
                <Typography fontWeight="300" color="#d4d4d8" fontSize="1rem">
                  Learn about all the available accommodations!
                </Typography>
              </Stack>
            </Stack>
          </motion.div>

          <motion.div
            initial={{ x: 0, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className=" object-cover md:rounded-lg  overflow-hidden"
          >
            <Stack
              direction="row"
              gap="1rem"
              marginTop="2rem"
              justifyContent={"center"}
            >
              <MdPriceCheck style={{ fontSize: "3rem", color: "#d4d4d8" }} />
              <Stack>
                <Typography fontWeight="bold" color="#93c5fd">
                  {"Price"}
                </Typography>
                <Typography fontWeight="300" color="#d4d4d8" fontSize="1rem">
                  Compare prices between different residences!
                </Typography>
              </Stack>
            </Stack>
          </motion.div>

          <motion.div
            initial={{ x: 0, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
            className=" object-cover md:rounded-lg  overflow-hidden"
          >
            <Stack
              direction="row"
              gap="1rem"
              marginTop="2rem"
              justifyContent={"center"}
            >
              <TransferWithinAStationIcon
                style={{ fontSize: "3rem", color: "#d4d4d8" }}
              />
              <Stack>
                <Typography fontWeight="bold" color="#93c5fd">
                  {"Experience"}
                </Typography>
                <Typography fontWeight="300" color="#d4d4d8" fontSize="1rem">
                  Learn from the experiences of other students!
                </Typography>
              </Stack>
            </Stack>
          </motion.div>

          <motion.div
            initial={{ x: 0, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.5 }}
            className=" object-cover md:rounded-lg  overflow-hidden"
          >
            <Stack
              direction="row"
              gap="1rem"
              marginTop="2rem"
              justifyContent={"center"}
            >
              <SiSlideshare style={{ fontSize: "3rem", color: "#d4d4d8" }} />
              <Stack>
                <Typography fontWeight="bold" color="#93c5fd">
                  {"Share"}
                </Typography>
                <Typography fontWeight="300" color="#d4d4d8" fontSize="1rem">
                  Add your view on residences for others to see!
                </Typography>
              </Stack>
            </Stack>
          </motion.div>
          <Stack
            paddingTop="2rem"
            display="flex"
            justifyContent={"center"}
            width={"30%"}
            margin="0 auto"
          >
            <ScrollLink
              to="dorms"
              spy={true}
              smooth={true}
              duration={1500}
              style={{
                padding: "0.5rem 0rem",
                border: "2px solid transparent",
                textDecoration: "none",
                color: "grey",
                borderRadius: "10rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  margin: "0 auto",
                  justifyContent: "center",
                  transition: "transform 0.3s ease-in-out", // Animation transition
                  ":hover": {
                    transform: "scale(1.1)", // Scale to 1.2 times on hover
                  },
                }}
              >
                <div className="flex flex-row">
                  <Button variant="contained">
                    <h1>Get Started</h1>
                  </Button>
                </div>
              </Box>
            </ScrollLink>
          </Stack>
        </Grid>
      </div>
    </>
  );
};

export default Homepage;
