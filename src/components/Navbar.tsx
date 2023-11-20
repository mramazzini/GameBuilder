const options = [
  "Map Editor",
  "Tileset Editor",
  "Hitbox Editor",
  "Sprite Editor",
  "Animation Editor",
  "Sound Editor",
  "App Runner",
];

const Navbar = (props: { setCurrentPage: Function; currentPage: string }) => {
  const getButtonClasses = (option: string) => {
    return `btn btn-outline-light font-bold font-mono ml-1 text-md px-2 py-1  hover:bg-slate-400 rounded-md ${
      option === props.currentPage ? "text-black bg-slate-200" : "text-white"
    }`;
  };
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-slate-900 flex justify-between items-center border-b border-white/25'>
      <div className='flex'>
        {options.map((option) => (
          <button
            key={option}
            className={getButtonClasses(option)}
            onClick={() => props.setCurrentPage(option)}
          >
            {option}
          </button>
        ))}
      </div>
      {/* hide the navbar button*/}
      <button
        className='btn btn-outline-light font-bold font-mono  text-white text-lg px-2 py-1 m-1 hover:bg-slate-400 rounded-md'
        onClick={() => props.setCurrentPage("Home")}
      >
        Hide
      </button>
    </nav>
  );
};

export default Navbar;
