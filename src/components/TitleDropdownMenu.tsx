import React, { useState } from "react";

const TitleDropdownMenu = (props: {
  options: { name: string; action: any }[];
  header: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const options = props.options;

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: { name: string; action: any }) => {
    // Handle the selected option here (e.g., save it to state or perform an action)
    console.log("Selected option:", option);
    option.action();
    // Close the dropdown after selection
    setIsOpen(false);
  };
  return (
    <div
      onMouseEnter={handleToggle}
      onMouseLeave={handleToggle}
      className=' hover:bg-white hover:text-black hover:font-bold px-2  rounded-sm flex justify-center items-center cursor-pointer'
    >
      <ul className='  '>
        <li className=''>{props.header}</li>
        {isOpen && (
          <ul className='absolute bg-white shadow-lg py-1 rounded-md '>
            {options.map((option) => (
              <li
                key={option.name}
                onClick={() => {
                  handleSelect(option);
                }}
                className=' w-full h-full bg-white px-3 py-1 hover:bg-gray-100 hover:text-black cursor-pointer '
              >
                {option.name}
              </li>
            ))}
          </ul>
        )}
      </ul>
    </div>
  );
};
export default TitleDropdownMenu;
