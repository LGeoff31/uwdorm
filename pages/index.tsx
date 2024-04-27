import Navbar from "./components/Navbar";
import { Stack } from "@mui/material";
import Homepage from "./components/Homepage";
import Dorms from "./components/Dorms";

export default function Home() {
  return (
    <Stack sx={{ background: "rgb(225 246 255)" }}>
      <Navbar />
      <Homepage />
      <Dorms />
    </Stack>
  );
}
