import { useCallback, useState } from "react";

const useOnHover = () => {
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = useCallback(
    () => setIsHovering(true),
    [setIsHovering]
  );
  const handleMouseOut = useCallback(
    () => setIsHovering(false),
    [setIsHovering]
  );

  return {
    isHovering,
    setIsHovering,
    handleMouseOver,
    handleMouseOut,
  };
};

export default useOnHover