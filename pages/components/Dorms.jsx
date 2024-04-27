import React, { useEffect, useState } from "react";
import { TextField, Button, Typography } from "@mui/material";

function DormInfo(props) {
  const [comment, setComment] = useState(""); //typing textfield
  const [comments, setComments] = useState([]); //all the submitted comments

  const fetchComments = async () => {
    const response = await fetch("/pages/api/comments-by-residence", {
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

    const response = await fetch("/pages/api/insert-comment.ts", {
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
      <Typography
        variant="h1"
        display="flex"
        margin="0 auto"
        justifyContent={"center"}
      >
        Residences
      </Typography>
      {residences.map((residence) => (
        <DormInfo
          key={residence.id}
          id={residence.id}
          name={residence.name}
          images={residence.images}
          description={residence.description}
        />
      ))}
    </div>
  );
}

export default dorms;
