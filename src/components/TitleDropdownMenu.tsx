import React, { useState } from "react";

const TitleDropdownMenu = (props: { options: string[]; header: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const options = props.options;

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: string) => {
    // Handle the selected option here (e.g., save it to state or perform an action)
    console.log("Selected option:", option);
    // Close the dropdown after selection
    setIsOpen(false);
  };
  return (
    <div className=' hover:bg-white hover:text-black hover:font-bold px-2 py-1 '>
      <ul onMouseEnter={handleToggle} onMouseLeave={handleToggle}>
        <li>{props.header}</li>
        {isOpen && (
          <ul className='absolute bg-white shadow-lg py-1 '>
            {options.map((option) => (
              <li
                key={option}
                onClick={() => handleSelect(option)}
                className='w-full bg-white px-3 py-1 hover:bg-gray-100 hover:text-black cursor-pointer'
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </ul>
    </div>
  );
};
export default TitleDropdownMenu;
