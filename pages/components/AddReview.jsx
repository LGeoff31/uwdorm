import React, { useEffect, useState } from "react";

import {
  TextField,
  Stack,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Rating,
} from "@mui/material";
import { MdOutlineRateReview } from "react-icons/md";
import CloseIcon from "@mui/icons-material/Close";

const AddReview = ({
  id,
  residencesMap,
  fetchComments,
  roomRating,
  buildingRating,
  locationRating,
  bathroomRating,
  setRoomRating,
  setBathroomRating,
  setBuildingRating,
  setLocationRating,
  open,
  setOpen,
  comment,
  setComment,
}) => {
  if (!id) {
    return <div>Loading</div>;
  }
  const handleSubmit = async () => {
    console.log("room rating", roomRating, "  review", comment);
    const data = {
      residence_id: id,
      users_id: 1,
      review: comment,
      room: roomRating,
      building: buildingRating,
      location: locationRating,
      bathroom: bathroomRating,
    };
    console.log("comment", comment);

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
    console.log("inserting comment", p);
    fetchComments();
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Stack>
      <Button variant="contained" onClick={handleOpen} size="large">
        Add a Review &nbsp; <MdOutlineRateReview fontSize="2rem" />
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle margin={2}>
          Add a Review!{" "}
          <IconButton style={{ float: "right" }} onClick={handleClose}>
            <CloseIcon color="primary" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} margin={2}>
            <Stack direction="row" justifyContent={"space-between"}>
              <Typography>Room</Typography>
              <Rating
                name="rating"
                value={roomRating}
                onChange={(e) => setRoomRating(e.target.value)}
              />
            </Stack>
            <Stack direction="row" justifyContent={"space-between"}>
              <Typography>Building</Typography>
              <Rating
                name="rating"
                value={buildingRating}
                onChange={(e) => setBuildingRating(e.target.value)}
              />
            </Stack>
            <Stack direction="row" justifyContent={"space-between"}>
              <Typography>Location</Typography>
              <Rating
                name="rating"
                value={locationRating}
                onChange={(e) => setLocationRating(e.target.value)}
              />
            </Stack>
            <Stack direction="row" justifyContent={"space-between"}>
              <Typography>Bathroom</Typography>
              <Rating
                name="rating"
                value={bathroomRating}
                onChange={(e) => setBathroomRating(e.target.value)}
              />
            </Stack>
            <TextField
              variant="outlined"
              label="Write a detailed review..."
              multiline
              rows={4}
              onChange={(e) => setComment(e.target.value)}
            />

            <Button color="primary" variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </Stack>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </Stack>
  );
};

export default AddReview;
