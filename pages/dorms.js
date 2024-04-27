import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Village1 from "../public/images/Village1.png";
import { TextField, Button, Typography } from "@mui/material";

function DormInfo(props) {
  const [comment, setComment] = useState(""); //typing textfield
  const [comments, setComments] = useState([]); //all the submitted comments

  const fetchComments = async () => {
    const response = await fetch("/api/comments-by-residence", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ residence_id: props.id }),
    });
    const data = await response.json();
    setComments(data);
  };

  useEffect(() => {
    fetchComments();
  }, []);
  const handleSubmit = async () => {
    const data = {
      residence_id: props.id,
      users_id: 1,
      review: comment,
    };

    const response = await fetch("/api/insert-comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      console.log("error on inserting comment", response.statusText);
    }
    const p = await response.json();
    console.log(p);
    fetchComments();
  };

  return (
    <div className="p-8 border-2 rounded-2xl border-slate-300 ml-10 mr-10 mt-10">
      <h1 className="mb-5 text-xl">{props.name}</h1>
      <div className="flex">
        <img
          className="h-25 max-w-xl rounded-xl transition-all duration-300 rounded-lg cursor-pointer filter grayscale hover:grayscale-0"
          src={props.images}
        />
        <span className="ml-5">{props.description}</span>
      </div>
      <h1>Comment: </h1>
      <TextField value={comment} onChange={(e) => setComment(e.target.value)} />
      <Button onClick={handleSubmit}>Sumbit</Button>
      {comments.map((c, idx) => (
        <Typography key={c.id}>{c.review}</Typography>
      ))}
      {/* <h1 className="text-right text-xs italic font-light text-blue-300">Image source: {props.imagesrc}</h1> */}
    </div>
  );
}

/*images are 750 by 500 */

function dorms() {
  const [residences, setResidences] = useState([]);

  const fetchData = async () => {
    const response = await fetch("/api/residences");
    const data = await response.json();
    setResidences(data);
    console.log(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      {residences.map((residence) => (
        <DormInfo
          key={residence.id}
          id={residence.id}
          name={residence.name}
          images={residence.images}
          description={residence.description}
        />
      ))}
      {/* <DormInfo
        name="Village 1"
        image="https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/campus_housing-220519-0083.jpg"
        description="cozy place you are so cool"
        imagesrc="https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/campus_housing-220519-0083.jpg"
      />
      <DormInfo
        name="Claudette Millar Hall"
        image="https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/newrezhero_0.jpg"
        description="cozy place you are so cool"
        imagesrc="https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/newrezhero_0.jpg"
      />
      <DormInfo
        name="Claudette Millar Hall"
        image="https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/revmain_2.jpg"
        description="cozy place you are so cool"
        imagesrc="https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/revmain_2.jpg
            "
      /> */}
    </div>
  );
}

export default dorms;
