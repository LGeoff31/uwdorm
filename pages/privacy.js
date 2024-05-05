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

export default function Privacy() {
  return (
    <>
      <Navbar />
      <div
        style={{
          background: `url('https://coolbackgrounds.io/images/backgrounds/index/compute-ea4c57a4.png') no-repeat center center fixed`,
          backgroundSize: "cover",
          height: "25vh",
          display: "flex",
        }}
      >
        <Stack margin="">
          <span className="text-4xl p-20 ml-20 text-blue-300">
            UW Rez Privacy
          </span>
        </Stack>
      </div>
      <Grid
        sx={{ background: "rgb(225 246 255)" }}
        paddingLeft="10rem"
        paddingTop="5rem"
      >
        <Typography variant="h3" fontWeight="bold" fontSize="2.5rem">
          Privacy Policy:
        </Typography>
        <Typography variant="body1" marginTop="2rem">
          Thank you for using uwrez.com. his Privacy Policy explains how we
          collect, use, and disclose your information when you use our website.
        </Typography>

        <Grid>
          <Stack direction="row" gap="1rem" marginTop="2rem">
            <IoIosInformationCircleOutline style={{ fontSize: "3rem" }} />
            <Stack>
              <Typography fontWeight="bold">
                {"Information We Collect"}
              </Typography>
              <Typography fontWeight="300">
                When you voluntarily login with us, we collect your email
                address. However, this is not required to access the site.
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" gap="1rem" marginTop="2rem">
            <MdOutlineRateReview style={{ fontSize: "3rem" }} />
            <Stack>
              <Typography fontWeight="bold">{"User-Generated"}</Typography>
              <Typography fontWeight="300">
                When you add a review, we will list your name (optional),
                message, and reviews.
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" gap="1rem" marginTop="2rem">
            <CiDatabase style={{ fontSize: "3rem" }} />
            <Stack>
              <Typography fontWeight="bold">
                {"Automatically Collected Data"}
              </Typography>
              <Typography fontWeight="300">
                We may automatically collect certain information when you visit
                our website, including your browser type, operating system, and
                browsing behavior.
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" gap="1rem" marginTop="2rem">
            <FaExchangeAlt style={{ fontSize: "3rem" }} />
            <Stack>
              <Typography fontWeight="bold">
                {"Changes to this Privacy Policy"}
              </Typography>
              <Typography fontWeight="300">
                We may update this Privacy Policy from time to time to reflect
                changes in our practices or legal requirements.
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        <Typography
          variant="body1"
          marginTop="2rem"
          marginBottom="1rem"
          fontSize="1.5rem"
        >
          Have any other questions?
        </Typography>
        <Link href="/contact">
          <Button variant="contained">Contact Us</Button>
        </Link>
      </Grid>
      <Stack paddingTop="7rem" sx={{ background: "rgb(225 246 255)" }} />
      <FooterOther />
    </>
  );
}
