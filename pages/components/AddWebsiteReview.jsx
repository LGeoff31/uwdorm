import React, { useState } from "react";
import {
  TextField,
  Stack,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Rating,
  Box,
  Snackbar,
  Alert,
  Container,
  Paper,
} from "@mui/material";
import { MdOutlineRateReview } from "react-icons/md";
import CloseIcon from "@mui/icons-material/Close";
import WebsiteReviews from "./WebsiteReviews";

const WebsiteReview = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSubmit = async () => {
    if (!name || !review) {
      alert("Please fill in all fields!");
      return;
    }
    if (review.length > 300) {
      alert("Sorry, the review must be shorter than 300 characters");
      return;
    }

    const newReview = {
      name: name,
      review: review,
      rating: rating,
    };

    const response = await fetch("/api/add-website-review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newReview),
    });

    if (response.ok) {
      setReviews([...reviews, newReview]);
      setOpen(false);
      setName("");
      setReview("");
      setRating(0);
      setSnackbarOpen(true);
    } else {
      alert("Failed to submit the review. Please try again.");
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        py: 8,
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 1,
            }}
          >
            Site Reviews
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Enjoying UW Rez? We&apos;d love to hear your feedback.
          </Typography>
        </Box>
        <Stack alignItems="center">
          <Button
            variant="contained"
            onClick={() => setOpen(true)}
            sx={{
              borderRadius: "30px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              padding: "10px 28px",
              margin: "0 auto",
              textTransform: "none",
              fontSize: "1rem",
              boxShadow: "0 4px 15px rgba(102,126,234,0.35)",
              "&:hover": {
                background: "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)",
              },
            }}
          >
            Add a Review &nbsp; <MdOutlineRateReview fontSize="2rem" />
          </Button>
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            fullWidth
            maxWidth="sm"
          >
            <DialogTitle
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                py: 2,
              }}
            >
              <Typography variant="h6" fontWeight={600}>Leave a Review</Typography>
              <IconButton onClick={() => setOpen(false)} sx={{ color: "white" }}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent sx={{ pt: 3 }}>
              <Stack spacing={2.5} sx={{ mt: 1 }}>
                <TextField
                  required
                  variant="outlined"
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  label="Write a detailed review..."
                  multiline
                  rows={4}
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                />
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Rating
                    name="rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    sx={{ fontSize: "3rem" }}
                  />
                </Box>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    textTransform: "none",
                    borderRadius: 2,
                    py: 1.2,
                    "&:hover": {
                      background: "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)",
                    },
                  }}
                >
                  Submit Review
                </Button>
              </Stack>
            </DialogContent>
          </Dialog>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              onClose={handleSnackbarClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              Review has been added successfully!
            </Alert>
          </Snackbar>
        </Stack>
        <WebsiteReviews />
      </Container>
    </Box>
  );
};

export default WebsiteReview;
