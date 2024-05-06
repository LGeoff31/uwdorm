import Navbar from "./components/Navbar";
import FooterOther from "./components/footerOther";
import {
  Paper,
  Link,
  TextField,
  Stack,
  Grid,
  Box,
  Button,
  Typography,
} from "@mui/material";
import { IoHomeOutline } from "react-icons/io5";
import { MdPriceCheck } from "react-icons/md";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import { SiSlideshare } from "react-icons/si";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { MdOutlineRateReview } from "react-icons/md";
import { CiDatabase } from "react-icons/ci";
import { FaExchangeAlt } from "react-icons/fa";
import React, { useState } from "react";

export default function Privacy() {
  const [user, setUser] = useState(null);
  return (
    <>
      <Navbar setUser={setUser} />
      <div
        style={{
          background: `url('https://coolbackgrounds.io/images/backgrounds/index/compute-ea4c57a4.png') no-repeat center center fixed`,
          backgroundSize: "cover",
          height: "25vh",
          display: "flex",
        }}
      >
        <Stack margin="">
          <span className="text-4xl p-20 ml-20 text-blue-300 mb-6">
            UW Rez Privacy
          </span>
        </Stack>
      </div>
      <Grid
        sx={{ background: "rgb(225 246 255)" }}
        paddingLeft="10rem"
        paddingTop="5rem"
        height="65vh"
      >
        <h1 className="text-3xl font-bold">
          Privacy Policy:
        </h1>
        <h1 className="mt-2">
          Thank you for using UW Rez! This Privacy Policy explains how we
          collect, use, and disclose your information while you are on our site.
        </h1>

        <Grid>
          <Stack direction="row" gap="1rem" marginTop="2rem">
            <IoIosInformationCircleOutline style={{ fontSize: "3rem" }} />
            <Stack>
              <h1 className="font-medium">
                {"Information We Collect"}
              </h1>
              <h1>
                When you voluntarily login with us, we collect your email
                address. However, this is not required to access the site.
              </h1>
            </Stack>
          </Stack>
          <Stack direction="row" gap="1rem" marginTop="2rem">
            <MdOutlineRateReview style={{ fontSize: "3rem" }} />
            <Stack>
              <h1 className="font-medium">{"User-Generated"}</h1>
              <h1 fontWeight="300">
                When you add a review, we will list your name (optional),
                message, and reviews.
              </h1>
            </Stack>
          </Stack>
          <Stack direction="row" gap="1rem" marginTop="2rem">
            <CiDatabase style={{ fontSize: "3rem" }} />
            <Stack>
              <h1 className="font-medium">
                {"Automatically Collected Data"}
              </h1>
              <h1 fontWeight="300">
                We may automatically collect certain information when you visit
                our website, including your browser type, operating system, and
                browsing behavior.
              </h1>
            </Stack>
          </Stack>
          <Stack direction="row" gap="1rem" marginTop="2rem">
            <FaExchangeAlt style={{ fontSize: "3rem" }} />
            <Stack>
              <h1 className="font-medium">
                {"Changes to this Privacy Policy"}
              </h1>
              <h1 fontWeight="300">
                We may update this Privacy Policy from time to time to reflect
                changes in our practices or legal requirements.
              </h1>
            </Stack>
          </Stack>
        </Grid>
        
      </Grid>
      <Stack paddingTop="7rem" sx={{ background: "rgb(225 246 255)" }} />
      <FooterOther />
    </>
  );
}
