import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views-react-18-fix";
import { autoPlay } from "react-swipeable-views-utils";
import { Paper, Box, Typography, Button } from "@mui/material";

const Images = ({ id }) => {
  const residencesMap = {
    1: {
      images: [
        {
          label: "Exterior",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/campus_housing-220519-0083.jpg",
        },
        {
          label: "Single Room",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/campus_housing-220519-8879.jpg",
        },
        {
          label: "Double Room",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/styles/uw_is_ig_x_large/public/uploads/images/v1-6.jpg?itok=xdARP_LS",
        },
        {
          label: "Washroom",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/campus_housing-220519-8890.jpg",
        },
        {
          label: "Stalls",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/campus_housing-220519-8897.jpg",
        },
        {
          label: "Showers",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/campus_housing-220519-8927.jpg",
        },
        {
          label: "Lounge",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/v1-9.jpg",
        },
        {
          label: "Communal Space",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/clc_3197.jpg",
        },
        {
          label: "Seating",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/clc_3767.jpg",
        },
        {
          label: "Laundry",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/clc_3582.jpg",
        },
        {
          label: "Cafeteria",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/v1-14.jpg",
        },
      ],
    },
    2: {
      images: [
        {
          label: "Exterior",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/styles/uw_is_ig_x_large/public/uploads/images/_dsc6566-pano_sm_1.jpg?itok=SZoxOZYU",
        },
        {
          label: "Double Room",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/styles/uw_is_ig_x_large/public/uploads/images/22-10-28-f22-campus-housing-26136.jpg?itok=2XWb0VbP",
        },
        {
          label: "Single Room",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/newrez20.jpg",
        },
        {
          label: "Washroom",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/styles/uw_is_ig_x_large/public/uploads/images/22-10-28-f22-campus-housing-26124.jpg?itok=rI7lFhbq",
        },
        {
          label: "Floor Kitchen",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/img_1390.jpg",
        },
        {
          label: "Floor Lounge",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/img_1391.jpg",
        },
        {
          label: "Study Lounge",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/img_1396.jpg",
        },
        {
          label: "Front Desk",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/img_1444.jpg",
        },
        {
          label: "Seating Area",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/22-10-28-f22-campus-housing-25900.jpg",
        },
        {
          label: "Laundry Room",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/styles/uw_is_ig_x_large/public/uploads/images/22-10-28-f22-campus-housing-25972.jpg?itok=kq6UvFf5",
        },
        {
          label: "Game Room",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/img_1429.jpg",
        },
        {
          label: "Music Room",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/img_1436.jpg",
        },
        {
          label: "Gym Room",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/img_1425.jpg",
        },
      ],
    },
    3: {
      images: [
        {
          label: "Exterior",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/campus_housing-220520-0639.jpg",
        },
        {
          label: "Double Room",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/campus_housing-220520-0252.jpg",
        },
        {
          label: "Double Room Desks",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/campus_housing-220520-0262.jpg",
        },
        {
          label: "Single Room",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/campus_housing-220520-0109.jpg",
        },
        {
          label: "Washroom",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/campus_housing-220520-0102.jpg",
        },
        {
          label: "Shower",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/campus_housing-220520-0103.jpg",
        },
        {
          label: "Kitchen",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/campus_housing-220520-0334.jpg",
        },
        {
          label: "Room Common Area",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/campus_housing-220520-0340.jpg",
        },
        {
          label: "Study Lounge",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/uwp-12.jpg",
        },

        {
          label: "Laundry Room",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/uwp-13.jpg",
        },
        {
          label: "Seating",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/uwp-15.jpg",
        },
      ],
    },
    4: {
      images: [
        {
          label: "Exterior",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/revhero.jpg",
        },
        {
          label: "Playground",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/rev-2.jpg",
        },
        {
          label: "Double Room",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/campus_housing-220519-9557_0.jpg",
        },
        {
          label: "Washroom",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/campus_housing-220519-9539.jpg",
        },
        {
          label: "Stalls",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/campus_housing-220519-9542.jpg",
        },
        {
          label: "Showers",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/campus_housing-220519-9548.jpg",
        },
        {
          label: "Entertainment",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/rev-9.jpg",
        },
        {
          label: "Communal Space",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/rev-10.jpg",
        },
        {
          label: "Cafeteria",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/rev-11.jpg",
        },
        {
          label: "Laundry",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/rev-13.jpg",
        },
      ],
    },
    5: {
      images: [
        {
          label: "Exterior",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/campus_housing-220519-9344.jpg",
        },
        {
          label: "Single Room",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/campus_housing-220519-9077.jpg",
        },
        {
          label: "Kitchen",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/campus_housing-220519-9098.jpg",
        },
        {
          label: "Washroom",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/campus_housing-220519-9090.jpg",
        },
        {
          label: "Community Lounge",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/mkv-12.jpg",
        },
        {
          label: "Laundry",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/mkv-15.jpg",
        },
        {
          label: "Entertainment",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/campus_housing-220519-9162.jpg",
        },
        {
          label: "More Entertainment",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/mkv-14.jpg",
        },
        {
          label: "Study Lounge",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/mkv-13.jpg",
        },
      ],
    },
    6: {
      images: [
        {
          label: "Exterior",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/clvhero.jpg",
        },
        {
          label: "Single Room",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/22-10-28-f22-campus-housing-26889.jpg",
        },
        {
          label: "Multiple Rooms",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/22-10-28-f22-campus-housing-26999.jpg",
        },
        {
          label: "Washroom",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/22-10-28-f22-campus-housing-26909.jpg",
        },
        {
          label: "Kitchen",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/22-10-28-f22-campus-housing-26752_1.jpg",
        },
        {
          label: "Stairs",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/22-10-28-f22-campus-housing-26742.jpg",
        },
        {
          label: "Entertainment",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/22-10-28-f22-campus-housing-26388.jpg",
        },
        {
          label: "Seating",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/22-10-28-f22-campus-housing-26337.jpg",
        },
        {
          label: "Laundry",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/22-10-28-f22-campus-housing-26483.jpg",
        },
      ],
    },
    7: {
      images: [
        {
          label: "Exterior",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/22-10-27-f22-campus-housing-25876.jpg",
        },
        {
          label: "Single Room",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/22-10-27-f22-campus-housing-25777.jpg",
        },

        {
          label: "Washroom",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/22-10-27-f22-campus-housing-25773.png",
        },
        {
          label: "Stalls",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/22-10-27-f22-campus-housing-25770_0.jpg",
        },
        {
          label: "Shower",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/22-10-27-f22-campus-housing-25765.jpg",
        },
        {
          label: "Kitchen",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/22-10-27-f22-campus-housing-25726.jpg",
        },
        {
          label: "Entertainment",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/22-10-27-f22-campus-housing-25670.jpg",
        },
        {
          label: "More Entertainment",
          imgPath:
            "https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/0c0a0528.jpg",
        },
      ],
    },
    8: {
      images: [
        {
          label: "Exterior",
          imgPath:
            "https://uwaterloo.ca/continuous-improvement/sites/default/files/uploads/images/sju_image.jpg",
        },
        {
          label: "Double Room",
          imgPath:
            "https://www.sju.ca/sites/default/files/styles/child_page_banner/public/Facts%20and%20figures.png?itok=pPxIp3i7",
        },

        {
          label: "Single Room",
          imgPath:
            "https://www.sju.ca/sites/default/files/styles/child_page_banner/public/IMG_Conference%20Services_SRH%20Double_22-08-30-St%20Jeromes-744.jpg?itok=f2dLamPD",
        },
        {
          label: "Washroom",
          imgPath:
            "https://www.sju.ca/sites/default/files/styles/child_page_banner/public/sidebar-icons/DSC01457.JPG?itok=qRyCzs_k",
        },
        {
          label: "Cafeteria",
          imgPath:
            "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.sju.ca%2Ffoodservices&psig=AOvVaw1GRU4oqf6l0glJ1-JjLXjH&ust=1714873820147000&source=images&cd=vfe&opi=89978449&ved=2ahUKEwjNnKz48PKFAxVkAGIAHRudDrUQjRx6BAgAEBY",
        },
      ],
    },
    9: {
      images: [
        {
          label: "Exterior",
          imgPath:
            "https://uwaterloo.ca/united-college/sites/default/files/uploads/images/dsc_0616_copy.jpg",
        },
        {
          label: "Single Room",
          imgPath:
            "https://cf.bstatic.com/xdata/images/hotel/max1024x768/124437271.jpg?k=7df4f1077a4925625fe4da93ee7b5c2a3c11c4a252c3562a55e9bb3a9770c6fa&o=&hp=1",
        },

        {
          label: "Washroom",
          imgPath:
            "https://cf.bstatic.com/xdata/images/hotel/max1024x768/124437274.jpg?k=687f49b8600417dce568a911f8cbf85f8d79afe2532e51ca51a18bc512c2ba88&o=&hp=1",
        },
        {
          label: "Lounge",
          imgPath:
            "https://cf.bstatic.com/xdata/images/hotel/max1024x768/126059178.jpg?k=f088ba113ccd1472592059ca997ee791a259db42cd25158eecd52c89c5de76ec&o=&hp=1",
        },
        {
          label: "Kitchen",
          imgPath:
            "https://cf.bstatic.com/xdata/images/hotel/max1024x768/129659262.jpg?k=963a48a342c2fc0081296f4c2ed5378e8d4fc28ba00ba7174170e3a029238736&o=&hp=1",
        },
        {
          label: "Cafeteria",
          imgPath:
            "https://cf.bstatic.com/xdata/images/hotel/max1024x768/125921349.jpg?k=79c5d541ceb4d81ef3163b7c70bccde1d84bacffea3ecad40c032d7c29763e55&o=&hp=1",
        },
      ],
    },
    10: {
      images: [
        {
          label: "Exterior",
          imgPath:
            "https://uwaterloo.ca/bridge-to-academic-success-in-english/sites/default/files/uploads/images/renison_building.jpg",
        },
        {
          label: "Double Room",
          imgPath:
            "https://uwaterloo.ca/renison-student-experience/sites/default/files/styles/uw_is_media_x_large/public/uploads/images/traditional-res_0.jpg?itok=1A257J3M",
        },

        {
          label: "Single Room",
          imgPath:
            "https://uwaterloo.ca/renison-student-experience/sites/default/files/uploads/images/lzlink_room_2_copy.jpg",
        },
        {
          label: "Seating",
          imgPath:
            "https://uwaterloo.ca/renison-student-experience/sites/default/files/uploads/images/students_eating.jpg",
        },
        {
          label: "Cafeteria",
          imgPath:
            "data:image/jpeg;base64,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",
        },
      ],
    },
  };

  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  if (!id) {
    return <div>Loading</div>;
  }

  const maxSteps = residencesMap[id]["images"].length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div className="w-[120rem] rounded-sm">
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {residencesMap[id]["images"].map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: "350px",
                  width: "800px",
                }}
                className="rounded-t-2xl"
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        className="rounded-b-2xl"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </div>
  );
};

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

// };

export default Images;
