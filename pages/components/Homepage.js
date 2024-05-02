import React, { useState } from "react";
import Footer from './footer'
import {
  Grid,
  Stack,
  TextField,
  Typography,
  Autocomplete,
} from "@mui/material";
import { IoHomeOutline } from "react-icons/io5";
import { MdPriceCheck } from "react-icons/md";
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import { SiSlideshare } from "react-icons/si";
const Homepage = () => {
  const residences = [
    "Claudette Millar Hall (CMH)",
    "Columbia Lake Village - South (CLV)",
    "Columbia Lake Village - North (CLV)",
    "Mackenzie King Village (MKV)",
    "Minota Hagey",
    "Renison",
    "Ron Eydt Village (REV)",
    "St.Jerome (SJU)",
    "United College (UC)",
    "UW Place (UWP)",
    "Village1 (V1)",
    // Add more residences as needed
  ];

  function handleResidenceChange(e){
    const selectedResValue = e.target.value;
    if (selectedResValue){
      window.location.href = (`/${selectedResValue}`);
    }
    else{
      <h1>Nothing here</h1>
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
        <Grid
          
        >
          <Stack margin="0 auto" justifyContent={"center"}>
            <span className="text-7xl text-center mb-10 text-blue-300">
              UW Rez
            </span>
            <span className="text-xl mb-10 text-gray-300 ">
              Explore reviews of Waterloo&apos;s residences and add your own!
            </span>
            <label className="flex text-lg justify-center h-[3rem]">
              <select className="text-blue-900 font-medium rounded-lg bg-gray-300"onChange={handleResidenceChange}>
                <option className="" disabled selected hidden >&nbsp;Select a Residence</option>
                {residences.map((residence, index) => (
                  <option  key={residence} value={index+1} className="font-medium text-black">
                    &nbsp;{residence}
                  </option>
                ))}
              </select>
            </label>
          </Stack>
          <Grid>
            <Stack direction="row" gap="1rem" marginTop="4rem">
              <IoHomeOutline style={{ fontSize: "3rem", color: "#d4d4d8" }} />
              <Stack>
                <Typography fontWeight="bold" color="#93c5fd">
                  {"Housing"}
                </Typography>
                <Typography fontWeight="300" color="#d4d4d8">
                  Learn about the available accommodations!
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row" gap="1rem" marginTop="2rem">
              <MdPriceCheck style={{ fontSize: "3rem", color: "#d4d4d8" }} />
              <Stack>
                <Typography fontWeight="bold" color="#93c5fd">
                  {"Price"}
                </Typography>
                <Typography fontWeight="300" color="lightgray">
                  Compare prices between different residences!
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row" gap="1rem" marginTop="2rem">
              <TransferWithinAStationIcon
                style={{ fontSize: "3rem", color: "#d4d4d8"}}
              />
              <Stack>
                <Typography fontWeight="bold" color="#93c5fd">
                  {"Experience"}
                </Typography>
                <Typography fontWeight="300" color="#d4d4d8">
                Learn from the experiences of others!
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row" gap="1rem" marginTop="2rem">
              <SiSlideshare
                style={{ fontSize: "3rem", color: "#d4d4d8"}}
              />
              <Stack>
                <Typography fontWeight="bold" color="#93c5fd">
                  {"Share"}
                </Typography>
                <Typography fontWeight="300" color="#d4d4d8">
                  Add your view on residences for others to see!
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </div>
      
    </>
  );
};

export default Homepage;