import React, { useState } from "react";
import Footer from "./footer";
import {
  Grid,
  Stack,
  TextField,
  Typography,
  Autocomplete,
} from "@mui/material";
import { IoHomeOutline } from "react-icons/io5";
import { MdPriceCheck } from "react-icons/md";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import { SiSlideshare } from "react-icons/si";
import { motion } from "framer-motion";

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
          <Stack margin="0 auto" justifyContent={"center"}>
            <span className="text-7xl text-center mb-10 text-blue-300">
              UW Rez
            </span>
            <span className="text-4xl mb-10 text-gray-300 ">
              Explore reviews of Waterloo&apos;s residences or add your own!
            </span>
            <label className="flex text-med justify-center h-[3rem]">
              <select
                className=" font-medium rounded-lg bg-gray-300"
                onChange={handleResidenceChange}
              >
                <option className="" disabled selected hidden>
                  &nbsp;Select a Residence
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
          </Stack>
          <Grid>
            <motion.div
              initial={{ x: -200, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.5 }}
              className=" object-cover md:rounded-lg  overflow-hidden"
            >
              <Stack
                direction="row"
                gap="1rem"
                marginTop="4rem"
                justifyContent={"center"}
              >
                <IoHomeOutline style={{ fontSize: "3rem", color: "#d4d4d8" }} />
                <Stack>
                  <Typography
                    fontWeight="bold"
                    color="#93c5fd"
                    fontSize="1.5rem"
                  >
                    {"Housing"}
                  </Typography>
                  <Typography
                    fontWeight="300"
                    color="#d4d4d8"
                    fontSize="1.2rem"
                  >
                    Learn about the available accommodations!
                  </Typography>
                </Stack>
              </Stack>
            </motion.div>

            <motion.div
              initial={{ x: 200, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.5, delay: 1 }}
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
                  <Typography
                    fontWeight="bold"
                    color="#93c5fd"
                    fontSize="1.5rem"
                  >
                    {"Price"}
                  </Typography>
                  <Typography
                    fontWeight="300"
                    color="#d4d4d8"
                    fontSize="1.2rem"
                  >
                    Compare prices between different residences!
                  </Typography>
                </Stack>
              </Stack>
            </motion.div>

            <motion.div
              initial={{ x: -200, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.5, delay: 2 }}
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
                  <Typography
                    fontWeight="bold"
                    color="#93c5fd"
                    fontSize="1.5rem"
                  >
                    {"Experience"}
                  </Typography>
                  <Typography
                    fontWeight="300"
                    color="#d4d4d8"
                    fontSize="1.2rem"
                  >
                    Learn from the experiences of other students!
                  </Typography>
                </Stack>
              </Stack>
            </motion.div>

            <motion.div
              initial={{ x: 200, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.5, delay: 3 }}
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
                  <Typography
                    fontWeight="bold"
                    color="#93c5fd"
                    fontSize="1.5rem"
                  >
                    {"Share"}
                  </Typography>
                  <Typography
                    fontWeight="300"
                    color="#d4d4d8"
                    fontSize="1.2rem"
                  >
                    Add your view on residences for others to see!
                  </Typography>
                </Stack>
              </Stack>
            </motion.div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Homepage;
