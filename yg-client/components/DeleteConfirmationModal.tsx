import Modal from "../components/Modal";
import { confirmable, createConfirmation } from "react-confirm";

const DeleteConfirmationDialog = ({
  show,
  proceed,
  confirmation,
  dismiss,
  cancel,
  options,
}) => {
  // console.log("SHOW", show);
  return (
    // TODO: onHide -> proceed(false)
    <Modal
      isOpen={show}
      onAfterClose={() => proceed(false)}
			width="20rem"
			height="13rem"
    >
      <div className="flex flex-col justify-between h-full w-full">
        <h3 className="text-sm font-bold uppercase text-red-600">
          Are you sure?
        </h3>

        <span className="block">{confirmation}</span>
        <div>
          <button
            className="w-14 h-8 font-bold rounded-sm text-sm text-white bg-red-500 mr-2 hover:bg-red-600"
            onClick={() => proceed(true)}
          >
            Yes
          </button>
          <button
            className="w-14 h-8 rounded-sm text-sm border border-gray-200 hover:bg-gray-200"
            // onClick={() => proceed(false)}
            onClick={() => cancel()}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

// Create confirm function to call on handle functions
export function confirm(
  confirmation,
  proceedLabel = "OK",
  cancelLabel = "cancel",
  options = {}
) {
  // Wrap function for easier use
  return createConfirmation(confirmable(DeleteConfirmationDialog))({
    confirmation,
    proceedLabel,
    cancelLabel,
    ...options,
  });
}

// confirmable HOC pass props `show`, `dismiss`, `cancel` and `proceed` to your component.
// TODO: may not need confirmable here
export default confirmable(DeleteConfirmationDialog);
