import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import { Stack } from "@mui/material";

export default function Home() {
  return (
    <Stack>
      <Navbar />
    </Stack>
  );
}
