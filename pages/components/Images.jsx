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
            "https://sju.ca/sites/default/files/IMG_Conference%20Services_Servery_161017-SJU-AR_Round1-2912.jpg",
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
            "https://uwaterloo.ca/renison/sites/default/files/uploads/images/cafeteria_2.jpg",
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
    <div className="w-[38rem] rounded-sm">
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
                  height: "400px",
                  width: { md: "800px", xs: "full" },
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
        className="rounded-b-2xl w-[38rem]"
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
