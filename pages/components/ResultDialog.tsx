import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

interface ResultDialogProps {
    isOpen: boolean;
    closeFunction: () => void;
    ideal_residence: string;
    match: number;
}


const ResultDialog = ({ isOpen, closeFunction, ideal_residence, match}: ResultDialogProps) => {
  const redirect_to_res = () => {
    switch (ideal_residence) {
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
        closeFunction()
        break;
    }
  }
  return(
      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={closeFunction}>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <div className="text-lg font-medium text-white ">
              Congratulations! Match found!
            </div>
            <p className="mt-2 text-med text-white/50 ">
              Your ideal residence is 
              <b className='text-blue-300'>
                &nbsp;{ideal_residence}&nbsp;
              </b> 
              with a&nbsp;
              <b>
                {match}%
              </b> 
              &nbsp;match
            </p>
            <div className="mt-4">
              <Button
                className="inline-flex text-sm items-center gap-1 rounded-md bg-gray-700 py-1.5 px-2  font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                onClick={redirect_to_res}
              >
                Go to Residence
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default ResultDialog;