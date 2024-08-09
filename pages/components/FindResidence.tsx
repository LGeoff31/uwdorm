import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useState } from 'react';

const FindResidence = ()  => {
  let [isOpen, setIsOpen] = useState<boolean>(false);
  let [inputText, setInputText] = useState<string>("");
  let [res, setRes] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (inputText === "") {
      window.alert('Please enter a description of your ideal rez!')
      return;
    }
    try {
      const res = await fetch('/api/find_residence', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputText }),
      });

      const data = await res.json();
      setRes(data)
      console.log(data)
      // showToast(`The ideal residence for you is ${data}`)
    } catch (error) {
      console.log(error)
    }
  };

  return (
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
              <DialogTitle as="h3" className="text-base/7 font-medium text-white">
                Please enter a description of your ideal residence - include what you are studying, whether you are undergrad or graad, what type of room you are looking 
                for, what you would like to live close to, and what type of activites and events you are looking forward to attending!
              </DialogTitle>
              <input 
                type='text'
                value={inputText}
                onChange={handleInputChange}
                className="w-full p-2 mt-2 border text-black border-gray-300 rounded-md bg-gray-300 focus:outline-none"
                placeholder="Describe your ideal residence...">
              </input>
              <div className="mt-4">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={handleSubmit}
                >
                  Find my rez!
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </label>
  );
};

export default FindResidence
      