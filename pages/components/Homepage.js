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
import { GiMaterialsScience } from "react-icons/gi";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import { SiSlideshare } from "react-icons/si";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import FindResidence from "../components/FindResidence";

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
          height: "95vh",
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
          </Stack>

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
              <GiMaterialsScience
                style={{ fontSize: "3rem", color: "#d4d4d8" }}
              />
              <Stack>
                <Typography fontWeight="bold" color="#93c5fd">
                  AI Algorithm
                </Typography>
                <Typography fontWeight="300" color="#d4d4d8" fontSize="1rem">
                  Find your ideal location using our AI algorithm.
                </Typography>
              </Stack>
            </Stack>
          </motion.div>
          <motion.div
            initial={{ x: 0, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
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
                  Housing
                </Typography>
                <Typography fontWeight="300" color="#d4d4d8" fontSize="1rem">
                  Learn about all the available accommodations.
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
              <MdPriceCheck style={{ fontSize: "3rem", color: "#d4d4d8" }} />
              <Stack>
                <Typography fontWeight="bold" color="#93c5fd">
                  Price
                </Typography>
                <Typography fontWeight="300" color="#d4d4d8" fontSize="1rem">
                  Compare prices between different residences.
                </Typography>
              </Stack>
            </Stack>
          </motion.div>

          <motion.div
            initial={{ x: 0, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.5, delay: 2 }}
            className=" object-cover md:rounded-lg  overflow-hidden pb-7"
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
                  Experience
                </Typography>
                <Typography fontWeight="300" color="#d4d4d8" fontSize="1rem">
                  Learn from the experiences of other students.
                </Typography>
              </Stack>
            </Stack>
          </motion.div>

          <FindResidence />
          <ScrollLink
            to="dorms"
            spy={true}
            smooth={true}
            duration={1500}
            className="mt-8 cursor-pointer"
          >
            <Box className="flex justify-center mt-12">
              <div className="scroll-arrow flex flex-col items-center">
                <span />
                <span />
                <span />
              </div>
            </Box>
          </ScrollLink>
        </Grid>
      </div>
      <style jsx>{`
        .scroll-arrow {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .scroll-arrow span {
          width: 30px;
          height: 30px;
          border-bottom: 4px solid #93c5fd;
          border-right: 4px solid #93c5fd;
          transform: rotate(45deg);
          margin: -10px;
          animation: bounce 1.5s infinite;
        }

        @keyframes bounce {
          0% {
            transform: translateY(0) rotate(45deg);
          }
          50% {
            transform: translateY(10px) rotate(45deg);
          }
          100% {
            transform: translateY(0) rotate(45deg);
          }
        }
      `}</style>
    </>
  );
};

export default Homepage;
