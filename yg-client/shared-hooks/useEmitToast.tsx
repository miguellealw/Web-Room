import { toast } from "react-toastify";

const useEmitToast = () => {
  return {
    notifySuccess: toast.dark,
  };
};

export default useEmitToast;
