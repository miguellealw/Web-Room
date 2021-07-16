import { ToastContainer, toast, Zoom, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = () => {
  return (
    <ToastContainer
      position="bottom-center"
      autoClose={2500}
      // hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      // transition={Zoom}
      transition={Slide}
      style={{
        zIndex: 100000,
      }}
    />
  );
};

export default Toast;
