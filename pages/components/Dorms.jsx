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
import Footer from "./footer";

function DormInfo(props) {
  return (
    <Stack elevation={3} padding="2.5rem">
      <Link href={props.link} height={350}>
      <div class="rounded-t-3xl relative overflow-hidden bg-cover bg-no-repeat">
        <img
          src={props.images}
          alt={props.name}
          className="rounded-t-3xl h-[22rem] w-[35rem] transition 
          duration-300 ease-in-out hover:scale-110"
        />
      </div>
      </Link>

      <div className="h-full bg-white p-3 rounded-b-3xl">
        <div>
          <h1 className="font-medium text-xl">
            {props.name}
          </h1>

          <h1 className="text-med">399 Reviews ⭐</h1>
        </div>

        <h1 className="text-right text-lg">{props.address}</h1>
      </div>
    </Stack>
  );
}

/*images are 750 by 500 */

const Dorms = () => {
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
    <>
      <h1 className="text-center p-8 text-3xl mt-4 font-medium">
        Residences
      </h1>
      <Grid container justifyContent={"center"} >
        {residences.map((residence) => (
          <DormInfo 
            key={residence.id}
            id={residence.id}
            name={residence.name}
            images={residence.images}
            description={residence.description}
            address={residence.address}
            link={residence.id}
            
          />
        ))}
      </Grid>
      <Footer/>
    </>
  );
};

export default Dorms;
