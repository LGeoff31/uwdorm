import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  CircularProgress,
  Chip,
  Paper,
  IconButton,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import { ResidenceResult, RESIDENCE_ID_TO_PATH } from "../../utils/residenceData";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { GiMaterialsScience } from "react-icons/gi";
import { IoHomeOutline } from "react-icons/io5";
import { MdPriceCheck } from "react-icons/md";

const FindResidence = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const rooms = [
    {
      id: 1,
      type: "Traditional Dormitory",
      description: "Classic dorm-style living with shared facilities",
    },
    {
      id: 2,
      type: "Suite-Style",
      description: "Private bedrooms with shared common areas",
    },
    {
      id: 3,
      type: "Apartment-Style",
      description: "Full apartment with kitchen and living space",
    },
    {
      id: 4,
      type: "Specialty Housing",
      description: "Themed or special interest housing options",
    },
  ];

  const mealplans = [
    { id: 1, name: "Yes", description: "Includes dining plan" },
    { id: 2, name: "No", description: "Self-catering option" },
  ];

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isResultOpen, setIsResultOpen] = useState<boolean>(false);
  const [room, setRoom] = useState<string>("");
  const [mealplan, setMealplan] = useState<string>("");
  const [amenities, setAmenities] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [allResults, setAllResults] = useState<ResidenceResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRoomChange = (event: any) => {
    setRoom(event.target.value);
  };

  const handleAmenitiesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAmenities(event.target.value);
  };

  const handleDetailsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDetails(event.target.value);
  };

  const handleMealplanChange = (event: any) => {
    setMealplan(event.target.value);
  };

  const createInputText = (
    room: string,
    mealplan: string,
    amenities: string,
    details: string
  ) => {
    let input_text: string = `The user is looking for a residence that accommodates the room type: ${room}. `;
    if (mealplan === "No") {
      input_text += `The user is looking for a residence without a meal plan. This could mean they want to cook often and need a residence with a cooking area, or they are looking to eat out often at different places. `;
    } else {
      input_text += `The user is looking for a place with a meal plan so that they can eat in the cafeteria. `;
    }
    input_text += `Moreover, the user wants the residence to have these things available: ${amenities}. `;
    input_text += `Overall, the user is looking for this type of residence to spend their year in: ${details}`;
    return input_text;
  };

  const handleFindResidences = async (event: React.FormEvent) => {
    event.preventDefault();
    if (amenities.length < 100 || details.length < 100) {
      window.alert(
        "Please make sure amenities and details have at least 100 characters"
      );
      return;
    }
    if (room && mealplan && amenities && details) {
      setIsLoading(true);
      const inputText = createInputText(room, mealplan, amenities, details);
      try {
        const res = await fetch("/api/find_residence", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inputText, room, mealplan }),
        });

        const data = await res.json();

        if (data && data.results && data.results.length > 0) {
          setAllResults(data.results as ResidenceResult[]);
        }

        setIsLoading(false);
        setIsOpen(false);
        setAmenities("");
        setDetails("");
        setRoom("");
        setMealplan("");
        openResult();
      } catch (error) {
        setIsLoading(false);
      }
    } else {
      // required fields missing
    }
  };

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  function openResult() {
    setIsResultOpen(true);
  }

  function closeResult() {
    setIsResultOpen(false);
  }

  const redirect_to_res = (id: string) => {
    const path = RESIDENCE_ID_TO_PATH[id];
    if (path) {
      window.location.href = path;
    } else {
      closeResult();
    }
  };

  const rankLabel = (i: number) => {
    if (i === 0) return { label: "Best Match", color: "#10B981" };
    if (i === 1) return { label: "2nd Choice", color: "#667eea" };
    return { label: "3rd Choice", color: "#764ba2" };
  };

  const getCharacterCount = (text: string) => {
    return text.length;
  };

  return (
    <>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="contained"
          size="large"
          onClick={open}
          sx={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            px: 4,
            py: 2,
            fontSize: "1.1rem",
            fontWeight: 600,
            borderRadius: 3,
            boxShadow: "0 8px 32px rgba(102, 126, 234, 0.3)",
            "&:hover": {
              background: "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)",
              transform: "translateY(-2px)",
              boxShadow: "0 12px 40px rgba(102, 126, 234, 0.4)",
            },
          }}
          startIcon={<GiMaterialsScience />}
        >
          Find My Perfect Match
        </Button>
      </motion.div>

      {/* Main Form Dialog */}
      <Dialog
        open={isOpen}
        onClose={close}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
          },
        }}
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            py: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <GiMaterialsScience style={{ fontSize: "2rem" }} />
            <Typography variant="h5" fontWeight={600}>
              Find Your Perfect Residence
            </Typography>
          </Box>
          <IconButton onClick={close} sx={{ color: "white" }}>
            <IoClose />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 4 }}>
          <Box component="form" onSubmit={handleFindResidences}>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 3, mt: 2 }}
            >
              Tell us about your preferences and well use AI to find your ideal
              residence match!
            </Typography>

            {/* Room Type Selection */}
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Room Type</InputLabel>
              <Select
                value={room}
                label="Room Type"
                onChange={handleRoomChange}
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(102, 126, 234, 0.3)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(102, 126, 234, 0.5)",
                  },
                }}
              >
                {rooms.map((roomOption) => (
                  <MenuItem key={roomOption.id} value={roomOption.type}>
                    <Box>
                      <Typography variant="body1" fontWeight={500}>
                        {roomOption.type}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {roomOption.description}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Meal Plan Selection */}
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Meal Plan</InputLabel>
              <Select
                value={mealplan}
                label="Meal Plan"
                onChange={handleMealplanChange}
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(102, 126, 234, 0.3)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(102, 126, 234, 0.5)",
                  },
                }}
              >
                {mealplans.map((mealplanOption) => (
                  <MenuItem key={mealplanOption.id} value={mealplanOption.name}>
                    <Box>
                      <Typography variant="body1" fontWeight={500}>
                        {mealplanOption.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {mealplanOption.description}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Amenities Input */}
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Desired Amenities"
              value={amenities}
              onChange={handleAmenitiesChange}
              placeholder="e.g., gym, study rooms, pool table, ping pong, laundry facilities, common areas..."
              helperText={`${getCharacterCount(
                amenities
              )}/100 characters minimum`}
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(102, 126, 234, 0.3)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(102, 126, 234, 0.5)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#667eea",
                  },
                },
                "& .MuiFormHelperText-root": {
                  color:
                    getCharacterCount(amenities) < 100 ? "#d32f2f" : "#666",
                },
              }}
            />

            {/* Additional Details Input */}
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Additional Details"
              value={details}
              onChange={handleDetailsChange}
              placeholder="e.g., living learning community, close to UW plaza, roommate preferences, quiet environment..."
              helperText={`${getCharacterCount(
                details
              )}/100 characters minimum`}
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(102, 126, 234, 0.3)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(102, 126, 234, 0.5)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#667eea",
                  },
                },
                "& .MuiFormHelperText-root": {
                  color: getCharacterCount(details) < 100 ? "#d32f2f" : "#666",
                },
              }}
            />

            {/* Character Count Indicators */}
            <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
              <Chip
                label={`Amenities: ${getCharacterCount(amenities)}/100`}
                color={
                  getCharacterCount(amenities) >= 100 ? "success" : "warning"
                }
                size="small"
              />
              <Chip
                label={`Details: ${getCharacterCount(details)}/100`}
                color={
                  getCharacterCount(details) >= 100 ? "success" : "warning"
                }
                size="small"
              />
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button
            onClick={close}
            sx={{
              color: "text.secondary",
              "&:hover": {
                background: "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleFindResidences}
            disabled={
              isLoading ||
              !room ||
              !mealplan ||
              getCharacterCount(amenities) < 100 ||
              getCharacterCount(details) < 100
            }
            variant="contained"
            sx={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              px: 4,
              py: 1.5,
              borderRadius: 2,
              "&:hover": {
                background: "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)",
              },
              "&:disabled": {
                background: "#e0e0e0",
                color: "#9e9e9e",
              },
            }}
            startIcon={
              isLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <IoHomeOutline />
              )
            }
          >
            {isLoading ? "Finding Your Match..." : "Find My Perfect Residence"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Results Dialog */}
      <Dialog
        open={isResultOpen}
        onClose={closeResult}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
          },
        }}
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
            color: "white",
            textAlign: "center",
            py: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <MdPriceCheck style={{ fontSize: "2rem" }} />
            <Typography variant="h5" fontWeight={600}>
              Your Top Residence Matches
            </Typography>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ p: 3 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, mt: 1 }}>
            Ranked by relevance with diversity — so each option is meaningfully different.
          </Typography>
          {allResults.map((result, i) => {
            const { label, color } = rankLabel(i);
            return (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Paper
                  elevation={i === 0 ? 3 : 1}
                  sx={{
                    p: 2.5,
                    mb: 2,
                    borderRadius: 3,
                    border: i === 0 ? `2px solid ${color}` : "1px solid rgba(0,0,0,0.08)",
                    background: i === 0
                      ? "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)"
                      : "#fafafa",
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
                    <Box>
                      <Chip
                        label={label}
                        size="small"
                        sx={{ bgcolor: color, color: "white", fontWeight: 700, mb: 0.5 }}
                      />
                      <Typography variant="h6" fontWeight={700} sx={{ mt: 0.5 }}>
                        {result.name}
                      </Typography>
                    </Box>
                    <Chip
                      label={`${result.matchPercentage}% match`}
                      size="small"
                      variant="outlined"
                      sx={{ borderColor: color, color, fontWeight: 600 }}
                    />
                  </Box>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {result.shortDescription}
                  </Typography>

                  {result.whyChosen && (
                    <Box
                      sx={{
                        bgcolor: i === 0 ? 'rgba(16,185,129,0.08)' : 'rgba(102,126,234,0.06)',
                        border: `1px solid ${i === 0 ? 'rgba(16,185,129,0.25)' : 'rgba(102,126,234,0.2)'}`,
                        borderRadius: 2,
                        px: 1.5,
                        py: 1,
                        mb: 1.5,
                      }}
                    >
                      <Typography variant="caption" sx={{ fontWeight: 600, color: i === 0 ? '#059669' : '#667eea', display: 'block', mb: 0.3 }}>
                        Why this matches you
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {result.whyChosen}
                      </Typography>
                    </Box>
                  )}

                  <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 1.5 }}>
                    <strong>Best for:</strong> {result.bestFor}
                  </Typography>

                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 1.5 }}>
                    <Chip label={result.style} size="small" variant="outlined" />
                    <Chip label={result.priceRange} size="small" variant="outlined" />
                    {result.amenities.includes("AIR CONDITIONING") && (
                      <Chip label="AC" size="small" color="info" />
                    )}
                    {result.mealPlan.toLowerCase().includes("optional") ? (
                      <Chip label="Meal plan optional" size="small" color="success" variant="outlined" />
                    ) : (
                      <Chip label="Meal plan included" size="small" color="warning" variant="outlined" />
                    )}
                  </Box>

                  <Divider sx={{ my: 1 }} />

                  <Button
                    onClick={() => redirect_to_res(result.id)}
                    variant={i === 0 ? "contained" : "outlined"}
                    size="small"
                    startIcon={<IoHomeOutline />}
                    sx={{
                      background: i === 0
                        ? `linear-gradient(135deg, ${color} 0%, #059669 100%)`
                        : undefined,
                      color: i === 0 ? "white" : color,
                      borderColor: i === 0 ? undefined : color,
                      borderRadius: 2,
                      textTransform: "none",
                      "&:hover": {
                        background: i === 0
                          ? `linear-gradient(135deg, #059669 0%, #047857 100%)`
                          : `rgba(0,0,0,0.04)`,
                      },
                    }}
                  >
                    View {result.name}
                  </Button>
                </Paper>
              </motion.div>
            );
          })}
        </DialogContent>

        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button
            onClick={closeResult}
            sx={{ color: "text.secondary", "&:hover": { background: "rgba(0,0,0,0.04)" } }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FindResidence;
