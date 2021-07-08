import ReactModal from "react-modal";
import styles from '../styles/CategoriesModal.module.css'

ReactModal.setAppElement("#__next");

type CustomModal = {
  tw_className: string;
  children: React.ReactElement;
};

const CustomModal: React.FC<CustomModal & ReactModal.Props> = ({
  children,
  tw_className,
  ...props
}) => {
  return (
    <ReactModal
      className={`${styles.Modal} ${tw_className}`}
      overlayClassName={styles.Overlay}
      closeTimeoutMS={200}
      {...props}
    >
      {children}
    </ReactModal>
  );
};

export default CustomModal;
