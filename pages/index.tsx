import Navbar from "./components/Navbar";
import { Stack } from "@mui/material";
import Homepage from "./components/Homepage.js";
import Dorms from "./components/Dorms";
import FooterOther from "./components/footerOther";
import AddWebsiteReview from "./components/AddWebsiteReview";
import React, { useState } from "react";

export default function Home() {
  const [user, setUser] = useState(null);

  return (
    <Stack sx={{ background: "rgb(225 246 255)" }}>
      <Navbar setUser={setUser} />
      <Homepage />
      <section id="dorms">
        <Dorms />
      </section>
      <AddWebsiteReview />
      <FooterOther />
    </Stack>
  );
}
