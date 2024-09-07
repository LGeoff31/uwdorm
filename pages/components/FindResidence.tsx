import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";

const FindResidence = () => {
  const rooms = [
    { id: 1, type: "Traditional Dormitory" },
    { id: 2, type: "Suite-Style" },
    { id: 3, type: "Apartment-Style" },
    { id: 4, type: "Specialty Housing" },
  ];

  const mealplans = [
    { id: 1, name: "Yes" },
    { id: 2, name: "No" },
  ];

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isResultOpen, setIsResultOpen] = useState<boolean>(false);
  const [room, setRoom] = useState<string>("");
  const [mealplan, setMealplan] = useState<string>("");
  const [amenities, setAmenities] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [idealRes, setIdealRes] = useState<string>("");
  const [similarity, setSimilarity] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRoomChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRoom(event.target.value);
  };

  const handleAmenitiesChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setAmenities(event.target.value);
  };

  const handleDetailsChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDetails(event.target.value);
  };

  const handleMealplanChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
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
    console.log("Input text is:", input_text);
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
          body: JSON.stringify({ inputText }),
        });

        const data = await res.json();

        if (data) {
          const idea = data.results[0].idea;
          const similarity = Math.round(data.results[0].similarity * 100);
          const res_name = parseResidenceFromResults(idea);
          setIdealRes(res_name);
          setSimilarity(similarity);
        }

        setIsLoading(false);
        setIsOpen(false);
        openResult();
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Unable to create inputText");
    }
  };

  const parseResidenceFromResults = (results: string) => {
    let i = 0;
    let res_name = "";
    while (results[i] !== ",") {
      if (results[i] === "(") {
        res_name = res_name.substring(0, res_name.length - 1);
        break;
      }
      res_name += results[i];
      i++;
    }
    return res_name;
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

  const redirect_to_res = () => {
    switch (idealRes) {
      case "Village 1":
        window.location.href = `/1`;
        break;
      case "Claudette Millar Hall":
        window.location.href = `/2`;
        break;
      case "University of Waterloo Place":
        window.location.href = `/3`;
        break;
      case "Ron Eydt Village":
        window.location.href = `/4`;
        break;
      case "Mackenzie King Village":
        window.location.href = `/5`;
        break;
      case "United College":
        window.location.href = `/9`;
        break;
      default:
        closeResult();
        break;
    }
  };

  return (
    <>
      <label className="flex text-med justify-center h-[3rem] mt-1">
        <button
          className="hidden md:block text-blue-400 bg-black rounded-full font-bold px-6 py-3 mx-auto text-lg transition-transform duration-300 ease-in-out hover:scale-105 "
          onClick={open}
        >
          Find my match
        </button>
        <Dialog
          open={isOpen}
          as="div"
          className="relative z-10 focus:outline-none"
          onClose={close}
        >
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <DialogPanel
                transition
                className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
              >
                <h1 className="mt-2 text-white mb-1">
                  What type of room are you looking for?
                </h1>
                <label className="flex text-med justify-start h-[2rem]">
                  <select
                    className="font-medium rounded-lg bg-gray-300 text-gray-500"
                    onChange={handleRoomChange}
                    id="select_room"
                    value={room}
                  >
                    <option value="" disabled hidden>
                      &nbsp;Room type
                    </option>
                    {rooms.map((room) => (
                      <option key={room.id} value={room.type}>
                        &nbsp;{room.type}
                      </option>
                    ))}
                  </select>
                </label>
                <h1 className="text-white mt-2 mb-1">
                  Are you getting a mealplan?
                </h1>
                <label className="flex text-med justify-start h-[2rem]">
                  <select
                    className="font-medium rounded-lg bg-gray-300 text-gray-500"
                    onChange={handleMealplanChange}
                    id="select_mealplan"
                    value={mealplan}
                  >
                    <option value="" disabled hidden>
                      &nbsp;Mealplan option
                    </option>
                    {mealplans.map((mealplan) => (
                      <option key={mealplan.id} value={mealplan.name}>
                        &nbsp;{mealplan.name}
                      </option>
                    ))}
                  </select>
                </label>
                <h1 className="mt-2 mb-1 text-white">
                  What amenities do you wish to have? Ex. gym, great hall, pool
                  table, ping pong (min 100 char)
                </h1>
                <textarea
                  value={amenities}
                  onChange={handleAmenitiesChange}
                  className="w-full p-2 mt-2 border text-black border-gray-300 rounded-md bg-gray-300 focus:outline-none"
                  placeholder="Describe your ideal residence..."
                ></textarea>
                <h1 className="mt-2 mb-1 text-white">
                  Other details Ex. living learning community, close to UW
                  plaza, roomates (min 100 char)
                </h1>
                <textarea
                  value={details}
                  onChange={handleDetailsChange}
                  className="w-full p-2 mt-2 border text-black border-gray-300 rounded-md bg-gray-300 focus:outline-none"
                  placeholder="Describe your ideal residence..."
                ></textarea>
                {isLoading ? (
                  <button
                    disabled
                    type="button"
                    className="inline-flex w-full mt-4 p-3 justify-center rounded-md bg-gray-500 text-gray-100 hover:bg-gray-600"
                  >
                    Finding your ideal residence...
                  </button>
                ) : (
                  <button
                    type="button"
                    className="inline-flex w-full mt-4 p-3 justify-center rounded-md bg-blue-500 text-white hover:bg-blue-600"
                    onClick={handleFindResidences}
                  >
                    Find your place
                  </button>
                )}
              </DialogPanel>
            </div>
          </div>
        </Dialog>

        <Dialog
          open={isResultOpen}
          as="div"
          className="relative z-10 focus:outline-none"
          onClose={closeResult}
        >
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <DialogPanel
                transition
                className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
              >
                <DialogTitle className="text-lg font-medium leading-6 text-white text-center">
                  Ideal Residence Found!
                </DialogTitle>
                <div className="text-center text-white p-6">
                  <p className="mt-2">
                    The residence that best matches your criteria is:
                  </p>
                  <h3 className="text-3xl font-semibold">{idealRes}</h3>
                  <p>Matching score: {similarity}%</p>
                  <button
                    type="button"
                    className="inline-flex w-full mt-4 p-3 justify-center rounded-md bg-blue-500 text-white hover:bg-blue-600"
                    onClick={redirect_to_res}
                  >
                    View {idealRes}
                  </button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </label>
    </>
  );
};

export default FindResidence;
