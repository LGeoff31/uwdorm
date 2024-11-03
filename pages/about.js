import Navbar from "./components/Navbar";
import { Stack } from "@mui/material";
import FooterOther from "./components/footerOther";
import React, { useState } from "react";

export default function About() {
  const [user, setUser] = useState(null);
  return (
    <>
      <Navbar setUser={setUser} />
      <div
        style={{
          background: `url('https://coolbackgrounds.io/images/backgrounds/index/compute-ea4c57a4.png') no-repeat center center fixed`,
          backgroundSize: "cover",
          height: "30vh",
          display: "flex",
        }}
      >
        <Stack margin="">
          <span className="text-4xl p-20 text-blue-300">About UW Rez</span>
        </Stack>
      </div>
      <div className="bg-[rgba(225,246,255,1)]">
        <div className="p-20 ">
          <div className="text-3xl font-bold">Welcome to UW Rez!</div>

          <br></br>
          <h1>
            UW Rez is a platform website for University of Waterloo incoming
            students and current students. You can find every on-campus
            residence through navigating our website! Our goal is to help
            students decide where to live based off the experiences of others
            and ratings for different campus housing.
          </h1>
        </div>

        <div className="px-20 font-bold">
          <div>
            <div className="flex flex-row items-center ">
              <img
                alt="James Yu Image"
                className=" w-[10rem] mr-5 h-[10rem] rounded-full border-2 border-blue-500"
                src="geo.png"
              />
              <div className="flex flex-col">
                <h1 className="text-xl">Geoffrey Lee</h1>
                <h1 className="italic font-light text-md">
                  Founder - Software Engineering
                </h1>
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-row mt-2 items-center">
              <img
                alt="James Yu Image"
                className="mt-5 mr-5 w-[10rem] mb-5 h-[10rem] rounded-full border-2 border-blue-500"
                src="james.jpg"
              />
              <div className="flex flex-col">
                <h1 className="font-bold text-lg">James Yu</h1>
                <h1 className="italic font-light">
                  Founder - Biomedical Engineering
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterOther />
    </>
  );
}
