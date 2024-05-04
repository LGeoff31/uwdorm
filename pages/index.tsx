import Navbar from "./components/Navbar";
import { Stack } from "@mui/material";
import Homepage from "./components/Homepage.js";
import Dorms from "./components/Dorms";

export default function Home() {
  return (
    <Stack sx={{ background: "rgb(21 16 25)" }}>
      <Navbar />
      <Homepage />
      <Dorms />
    </Stack>
  );
}
