import { useState } from "react";

const Navbar = () => {
  const [count, setCount] = useState(0);

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <div className='bg-gray-700 text-white p-4'>
        <button onClick={() => setCount(count + 1)}>{count}</button>
      </div>
    </nav>
  );
};

export default Navbar;
