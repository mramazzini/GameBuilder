const options = [
  "Map Editor",
  "Tileset Editor",
  "Hitbox Editor",
  "Sprite Editor",
  "Animation Editor",
  "Sound Editor",
];

const Navbar = (props: { setCurrentPage: Function; currentPage: string }) => {
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-slate-900'>
      {options.map((option) => (
        <button
          key={option}
          className={`btn btn-outline-light font-bold font-mono  text-lg px-2 py-1 m-1 hover:bg-slate-400
          ${option === props.currentPage ? "bg-slate-400" : ""}`}
          onClick={() => props.setCurrentPage(option)}
        >
          {option}
        </button>
      ))}
    </nav>
  );
};

export default Navbar;
