import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "./components/Navbar";

const Residence = () => {
  const router = useRouter();
  const [residence, setResidence] = useState([]);

  const { id } = router.query;
  useEffect(() => {
    console.log("id", router.query.id);
    if (router.query.id) {
      fetchResidence();
    }
  }, [router.query.id]);
  const fetchResidence = async () => {
    try {
      const response = await fetch("/api/residence-by-id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ residence_id: id }),
      });
      const data = await response.json();
      setResidence(data);
    } catch (error) {
      console.error("Error fetching residence data:", error);
    }
  };

  console.log("residence for village 1", residence);
  if (!residence || residence.length === 0) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <Navbar />
      {/* <div>{residence[0] && <div>hell {} </div>}</div> */}
      <img src={residence[0].images} alt="image" />
      {residence && <div>hello {residence[0].address} adwa</div>}
    </>
  );
};

export default Residence;
