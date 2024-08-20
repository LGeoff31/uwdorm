import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useState } from 'react';
import ResultDialog from './ResultDialog';

const FindResidence = ()  => {
  const rooms = [
    { id: 1, type: 'Traditional Dormitory' },
    { id: 2, type: 'Suite-Style' },
    { id: 3, type: 'Apartment-Style' },
    { id: 4, type: 'Specialty Housing' },
  ];  

  const mealplans = [
    { id: 1, name: 'Yes'},
    { id: 2, name: 'No'}
  ]

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
  }

  const handleAmenitiesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAmenities(event.target.value);
  };

  const handleDetailsChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDetails(event.target.value);
  };

  const handleMealplanChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMealplan(event.target.value)
  }

  const createInputText = (room: string, mealplan: string, amenities: string, details: string) => {
    let input_text: string = "";
    input_text += `The user is looking for a residence that accomodates the room type: ${room}. `
    if (mealplan == 'No') {
      input_text += `The user is looking for a residence without mealplan. This could mean they want to cook often and need a residence with ` 
      + `a cooking area or they are looking to eat out often at different places. `
    } else {
      input_text += `The user is looking for a place with a mealplan so that they can eat in the cafeteria. `
    }
    input_text += `Moreover, the user wants the residence to have these things available: ${amenities}. `
    input_text += `Overall, the user is looking for this type of residence to spend their year in: ${details}`
    console.log('Input text is:', input_text)
    return input_text
  }

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  function openResult() {
    setIsResultOpen(true)
  }

  // function closeResult(isResultOpen: boolean) {
  //   setIsResultOpen(false)
  // }

  const showToast = (message: string) => {
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

  const handleAddResidences = async (event: React.FormEvent) => {
    event.preventDefault();
  
    if (room && mealplan && amenities && details) {
      const inputText = await createInputText(room, mealplan, amenities, details);
      try {
        const res = await fetch('/api/insert_residences', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          // body: JSON.stringify({ ideal_res: room, res_des: des, user_des: des1 }),
        });
        let selectRoom = document.getElementById('select_room') as HTMLSelectElement;
        let selectMealplan = document.getElementById('select_mealplan') as HTMLSelectElement;

        if (selectRoom && selectMealplan) {
          selectRoom.value = 'default';
          selectMealplan.value = 'default';
        }

        setRoom("");
        setMealplan("");
        setDetails("");
        setAmenities("");
        const data = await res.json();
        console.log(data)

        setIsOpen(false)
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log('unable to create inputText')
      return;
    }
  };

  const handleFindResidences = async (event: React.FormEvent) => {
    event.preventDefault();
    if (amenities.length < 100 || details.length < 100) {
      window.alert('Please make sure amenities and details have at least 100 characteres')
      return;
    }
    if (room && mealplan && amenities && details) {
      setIsLoading(true)
      const inputText = await createInputText(room, mealplan, amenities, details);
      try {
        const res = await fetch('/api/find_residence', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ inputText }),
        });
        let selectRoom = document.getElementById('select_room') as HTMLSelectElement;
        let selectMealplan = document.getElementById('select_mealplan') as HTMLSelectElement;

        if (selectRoom && selectMealplan) {
          selectRoom.value = 'default';
          selectMealplan.value = 'default';
        }

        setRoom("");
        setMealplan("");
        setDetails("");
        setAmenities("");
        const data = await res.json();

        if (data) {
          const idea = data.results[0].idea
          const similarity: number = Math.round(data.results[0].similarity * 100)
          const res_name = parseResidenceFromResults(idea)
          setIdealRes(res_name)
          setSimilarity(similarity)
        }
        setIsLoading(false)
        setIsOpen(false)
        openResult();
        // showToast(`The ideal residence for you is ${data}`)
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log('unable to create inputText')
      return;
    }
  }

  const parseResidenceFromResults = (results: string) => {
    let i = 0
    let res_name = ""
    while (results[i] !== ',') {
      if (results[i] === '(') {
        res_name = res_name.substring(0, res_name.length - 1)
        break;
      }
      res_name += results[i]
      i++;
    }
    return res_name;
  }
  return (
    <>
    <label className="flex text-med justify-center h-[3rem] mt-1">
      <button className="text-center rounded-lg bg-gray-300 font-semibold p-3 duration-300 ease-in-out hover:scale-110" onClick={open}>
        Discover your ideal residence!
      </button>
      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >                
                <h1 className='mt-2 text-white mb-1'>What type of room are you looking for?</h1>
                <label className="flex text-med justify-start h-[2rem]">
                  <select
                    className="font-medium rounded-lg bg-gray-300 text-gray-500"
                    onChange={handleRoomChange}
                    id="select_room"
                    value={room}
                  >
                    <option value="" disabled hidden>&nbsp;Room type</option>
                    {rooms.map((room) => (
                      <option key={room.id} value={room.type}>
                        &nbsp;{room.type}
                      </option>
                    ))}
                  </select>
                </label>
                <h1 className='text-white mt-2 mb-1'>Are you getting a mealplan:</h1>
                <label className="flex text-med justify-start h-[2rem]">
                  <select
                    className="font-medium rounded-lg bg-gray-300 text-gray-500"
                    onChange={handleMealplanChange}
                    id="select_mealplan"
                    value={mealplan}
                  >
                    <option value="" disabled hidden>&nbsp;Mealplan option</option>
                    {mealplans.map((mealplan) => (
                      <option key={mealplan.id} value={mealplan.name}>
                        &nbsp;{mealplan.name}
                      </option>
                    ))}
                  </select>
                </label>
              <h1 className='mt-2 mb-1 text-white'>What are some other amenities you wish to have? (Ex. gym, gaming room, great hall, pool table, ping pong table, etc...) - min 100 char</h1>
              <textarea 
                value={amenities}
                onChange={handleAmenitiesChange}
                className="w-full p-2 mt-2 border text-black border-gray-300 rounded-md bg-gray-300 focus:outline-none"
                placeholder="Describe your ideal residence...">
              </textarea>
              <h1 className='mt-2 mb-1 text-white'>Other details (Ex. living learning community, close to UW plaza, etc...) - min 100 char</h1>
              <textarea
                value={details}
                onChange={handleDetailsChange}
                className="w-full p-2 mt-2 border text-black border-gray-300 rounded-md bg-gray-300 focus:outline-none"
                placeholder="Describe your ideal residence...">
              </textarea>
              {isLoading ? (
                <div className="mt-4">
                  <span className="loading loading-spinner text-info"></span>
                </div>
                ) : (
                <div className="mt-4">
                  <Button
                    className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                    onClick={handleFindResidences}
                  >
                    Find my rez!
                  </Button>
                </div>
              )}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </label>
    <ResultDialog
      ideal_residence={idealRes}
      close={setIsResultOpen}
      match={similarity}
      isOpen={isResultOpen}
    />
  </>
  );
};

export default FindResidence
      