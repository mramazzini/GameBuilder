import { useState, useEffect } from "react";
import { useProjectContext } from "../../utils/GlobalState/GlobalState";
import { RUN_COMMAND } from "../../utils/GlobalState/actions";
const CommandLine = () => {
  const [inputText, setInputText] = useState("");
  const { state: projectState, dispatch: projectDispatch } =
    useProjectContext();

  useEffect(() => {
    const keyListener = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        projectDispatch({
          type: RUN_COMMAND,
          payload: inputText,
        });
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
