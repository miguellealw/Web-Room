type ButtonProps = {
  children: string | React.ReactElement;
  tw_className?: string;
};

const Button: React.FC<ButtonProps> = ({ children, tw_className }) => (
  <button
    className={`bg-red-600 hover:bg-red-500 text-white w-32 h-11 rounded ${
      tw_className ? tw_className : ""
    }`}
  >
    {children}
  </button>
);

export default Button;
