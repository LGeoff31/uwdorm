import React, { useEffect, useState } from "react";
import {
  Link,
  Stack,
  Paper,
  TextField,
  Grid,
  Button,
  Typography,
  Box,
} from "@mui/material";
import FooterOther from "./footerOther";
import { motion } from "framer-motion";
// import { useMediaQuery } from "react-responsive";

function DormInfo(props) {
  return (
    <Stack elevation={3} padding="2.5rem">
      <Link href={props.link} height={350}>
        <div className="rounded-t-3xl relative overflow-hidden bg-cover bg-no-repeat">
          <img
            src={props.images}
            alt={props.name}
            className="rounded-t-3xl h-[22rem] w-[35rem] transition 
          duration-300 ease-in-out hover:scale-110 "
          />
        </div>
      </Link>

      <div className="h-full bg-white p-3 rounded-b-3xl ">
        <div>
          <h1 className="font-medium text-xl">{props.name}</h1>

          <h1 className="text-med text-zinc-500">
            {props.residenceCounts} Reviews ⭐
          </h1>
        </div>
        <div className="flex justify-between">
          <h1 className="text-med text-zinc-500">{props.price}</h1>

          <h1 className="text-right text-lg text-blue-400 ">{props.address}</h1>
        </div>
      </div>
    </Stack>
  );
}

/*images are 750 by 500 */

const Dorms = () => {
  const [residences, setResidences] = useState([]);
  let commentLength = 0;
  // let [comment, setComment] = useState(""); //typing textfield
  const [comments, setComments] = useState([]); //all the submitted comments

  const fetchData = async () => {
    const response = await fetch("/api/residences");
    const data = await response.json();
    setResidences(data);
    console.log(data);
  };

  const fetchAllComments = async () => {
    const response = await fetch("/api/all_comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log("THIS IS DATA", data);
    setComments(data);
  };

  useEffect(() => {
    fetchData();
    fetchAllComments();
  }, []);

  const residenceCounts = {};
  comments.forEach((item) => {
    const residenceId = item.residence_id;
    residenceCounts[residenceId] = (residenceCounts[residenceId] || 0) + 1;
  });

  const findCount = ({ id }) => {
    console.log("checking ", id, residenceCounts);

    if (id in residenceCounts) {
      return residenceCounts[id];
    }
    console.log("ID", id);
    return 0;
  };

  console.log("THIS IS COUNT", residenceCounts);
  if (!residenceCounts) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <h1
        className="text-center p-4 text-4xl mt-20 text-blue-500"
        style={{ fontWeight: "bold" }}
      >
        Residences
      </h1>
      <Grid container justifyContent={"center"} marginBottom="3rem">
        {residences.map((residence) => (
          <motion.div
            key={residence.id}
            initial={{ x: 0, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.5 }}
            className=" object-cover md:rounded-lg"
          >
            <DormInfo
              key={residence.id}
              id={residence.id}
              name={residence.name}
              images={residence.images}
              description={residence.description}
              address={residence.address}
              link={residence.id}
              residenceCounts={findCount({ id: residence.id })}
              price={residence.price}
            />
          </motion.div>
        ))}
      </Grid>
    </>
  );
};

export default Dorms;
