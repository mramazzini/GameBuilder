const TitleBar = () => {
  return (
    <div
      className='title-bar flex 
        justify-between
        items-center
        bg-gray-800
        text-white
        text-lg
        font-semibold
        px-4
        py-2
        border-b-2 border-gray-700 w-full h-10'
      id='title-bar'
    >
      <div className='title-bar-text'></div>
      <div className='title-bar-controls'>
        <button aria-label='Minimize'>asd</button>
        <button aria-label='Maximize'>asd</button>
        <button aria-label='Close'>asd</button>
      </div>
    </div>
  );
};
export default TitleBar;
