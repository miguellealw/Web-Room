import ReactModal from "react-modal";

ReactModal.setAppElement("#__next");

type CustomModal = {
  width: string;
  height: string;
  bgColor?: string;
  border?: string;
  children: React.ReactElement;
};

const CustomModal: React.FC<CustomModal & ReactModal.Props> = ({
  children,
  width,
  height,
  bgColor = "white",
  border = "1px solid gray",
  ...props
}) => {
  return (
    <ReactModal
      style={{
        overlay: {
          backgroundColor: "rgba(55, 65, 81, .8)",
          zIndex: 99999,
        },
        content: {
          width,
          height,
          backgroundColor: bgColor,
          border,

          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        },
      }}
      {...props}
    >
      {children}
    </ReactModal>
  );
};

export default CustomModal;
