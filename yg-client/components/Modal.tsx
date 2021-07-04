import Modal from "react-modal";

Modal.setAppElement("#__next");

const CustomModal = ({ children, width, height, ...props }) => {
  return (
    <Modal
      isOpen={true}
      style={{
        overlay: {
          backgroundColor: "rgba(55, 65, 81, .8)",
          // ...styles?.overlay,
        },
        content: {
          width,
          height,

          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        },
      }}
      {...props}
    >
      {children}
    </Modal>
  );
};

export default CustomModal as Modal;
