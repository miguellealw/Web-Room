import React from "react";

type DropdownProps = {
  isOpen: boolean;
  tw_className?: string;
  children: React.ReactElement | React.ReactElement[];
  // setIsOpen: (value: boolean) => void;
};

type DropdownItemProps = {
  children: string | React.ReactElement;
  tw_className?: string;
  handleClick?: (e: React.SyntheticEvent) => void;
};

// Type extends FC to add Item as static component on Dropdown
type IDropdown<P> = React.FC<P> & {
  Item: React.FC<DropdownItemProps>;
};

const DropdownItem: React.FC<DropdownItemProps> = ({
  children,
  handleClick,
  tw_className = "",
  ...props
}) => (
  <li
    className={`text-xs text-gray-500  cursor-pointer flex items-center py-2 px-1 hover:bg-gray-200 ${tw_className}`}
    onClick={handleClick}
    {...props}
  >
    {children}
  </li>
);

const Dropdown: IDropdown<DropdownProps> = ({
  isOpen,
  children,
  tw_className = "",
  ...props
}) => {
  return (
    <>
      {isOpen && (
        <ul
          className={`bg-gray-50 border border-gray-300 w-36 absolute text-sm font-normal top-8 right-3 rounded-sm shadow-xl z-20 ${tw_className}`}
          {...props}
        >
          {children}
        </ul>
      )}
    </>
  );
};

Dropdown.Item = DropdownItem;

export default Dropdown;
