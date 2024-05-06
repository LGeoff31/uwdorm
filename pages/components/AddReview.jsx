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
  MenuItem,
  Alert,
} from "@mui/material";
import { MdOutlineRateReview } from "react-icons/md";
import CloseIcon from "@mui/icons-material/Close";
import Snackbar from "@mui/material/Snackbar";

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
  userPhoto,
}) => {
  const [name, setName] = useState("");
  const [faculty, setFaculty] = useState("");
  if (!id) {
    return <div>Loading</div>;
  }
  const showToast = (message) => {
    const toast = document.createElement("div");
    toast.innerHTML = `
      <div id="toast-success" class="fixed top-4 right-4 z-50 flex items-center w-max p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
        <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
          </svg>
          <span class="sr-only">Check icon</span>
        </div>
        <div class="ml-3 text-sm font-normal">${message}</div>
      </div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 4000);
  };
  const handleSubmit = async () => {
    const data = {
      residence_id: id,
      users_id: 1,
      review: comment,
      room: roomRating,
      building: buildingRating,
      location: locationRating,
      bathroom: bathroomRating,
      userPhoto: userPhoto,
      name: name,
      faculty: faculty,
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
    showToast("Thanks so much for leaving a comment!")
    handleClose();
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
            <TextField
              required
              variant="outlined"
              label="Display Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              required
              select
              variant="outlined"
              label="Faculty Program"
              value={faculty}
              onChange={(e) => setFaculty(e.target.value)}
            >
              <MenuItem value="Arts">Arts</MenuItem>
              <MenuItem value="Engineering">Engineering</MenuItem>
              <MenuItem value="Environment">Environment</MenuItem>
              <MenuItem value="Health">Health</MenuItem>
              <MenuItem value="Mathematics">Mathematics</MenuItem>
              <MenuItem value="Science">Science</MenuItem>
            </TextField>
            <Stack direction="row" justifyContent={"space-between"}>
              <Typography>Room</Typography>
              <Rating
                name="rating"
                value={roomRating}
                onChange={(e) => setRoomRating(e.target.value)}
              />
            </Stack>
            <Stack direction="row" justifyContent={"space-between"}>
              <Typography>Pricing</Typography>
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
