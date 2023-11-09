import TitleDropdownMenu from "./TitleDropdownMenu";
const TitleBar = () => {
  const maximize = () => {
    window.resizeTo(screen.availWidth, screen.availHeight);
  };
  const minimize = () => {
    window.resizeTo(400, 300);
  };
  const close = () => {
    window.close();
  };

  return (
    <div
      className='title-bar flex justify-between items-center bg-gray-800 text-white text-sm font-semibold px-4 py-2 w-full h-7'
      id='title-bar'
    >
      <div className='title-bar-controls flex min-w-min '>
        <TitleDropdownMenu
          options={["New Project", "Load Project", "Settings"]}
          header='File'
        />
        <TitleDropdownMenu
          options={["Import Image", "Import Map", "Import Tileset"]}
          header='Import'
        />
        <TitleDropdownMenu
          options={["Run Project", "Run Project with Debugging"]}
          header='Run'
        />
      </div>
      <div
        className='title-bar-title w-full text-center'
        id='title-bar-draggable'
      >
        {document.title ? document.title : "Untitled"}
      </div>
      <div className='title-bar-window-controls flex '>
        <button
          className='hover:bg-gray-400 hover:text-black hover:font-bold px-2 py-1 '
          aria-label='Minimize'
          onClick={minimize}
        >
          -
        </button>
        <button
          aria-label='Maximize'
          className='hover:bg-gray-400 hover:text-black hover:font-bold px-2 py-1 '
          onClick={maximize}
          id='maximizeButton'
        >
          +
        </button>
        <button
          className='hover:bg-gray-400 hover:text-black hover:font-bold px-2 py-1 '
          aria-label='Close'
          onClick={close}
        >
          X
        </button>
      </div>
    </div>
  );
};
export default TitleBar;
