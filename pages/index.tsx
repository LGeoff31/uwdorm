import Navbar from "./components/Navbar";
import { Stack } from "@mui/material";
import Homepage from "./components/Homepage.js";
import Dorms from "./components/Dorms";
import FooterOther from "./components/footerOther";
import AddWebsiteReview from "./components/AddWebsiteReview";
import Maps from "./components/Maps";
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
      {/* <Maps />
       */}
      <div className="maprouter">
        <iframe
          width="100%"
          height="100%"
          src="https://maps.google.com/maps?q=43.473395,-80.537320&t=&z=17&ie=UTF8&iwloc=&output=embed"
        ></iframe>
      </div>
      <AddWebsiteReview />
      <FooterOther />
    </Stack>
  );
}
