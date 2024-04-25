import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import { Stack } from "@mui/material";
import Homepage from "./components/Homepage";

export default function Home() {
  return (
    <Stack sx={{ background: "purple", height: "100vh" }}>
      <Navbar />
      <Homepage />
    </Stack>
  );
}
