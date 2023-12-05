import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { runCommand } from "../../utils/redux/reducers/GlobalReducers";
const CommandLine = () => {
  const [inputText, setInputText] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const keyListener = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        dispatch(runCommand(inputText));
        setInputText("");
      }
    };
    document.addEventListener("keydown", keyListener);
    return () => {
      document.removeEventListener("keydown", keyListener);
    };
  }, [inputText]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };
  return (
    <div className='text-white text-sm font-bold font-mono py-1 px-5 border-t  border-white/75 flex flex-row'>
      {">"}
      <input
        type='text'
        value={inputText}
        onChange={handleInputChange}
        placeholder='Type your command...'
        className='text-white bg-transparent border-none outline-none w-full px-2'
      />
    </div>
  );
};

export default CommandLine;
