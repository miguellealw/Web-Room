type LoadingTextProps = {
  children: string
}

const LoadingText: React.FC<LoadingTextProps> = ({ children }) => (
  <div className="w-full h-screen flex justify-center items-center font-bold text-red-500">
    {children}
  </div>
);

export default LoadingText;
