import Navbar from "./components/Navbar.tsx";
import "./App.css";
import { ProjectProvider } from "./utils/GlobalState.tsx";
import TitleBar from "./components/TitleBar.tsx";
import Home from "./pages/Home.tsx";

import { useState } from "react";
function App() {
  const [currentPage, setCurrentPage] = useState("Home");
  return (
    <main className='bg-gray-800 h-screen'>
      <ProjectProvider>
        <TitleBar />
        <Navbar setCurrentPage={setCurrentPage} currentPage={currentPage} />
        {currentPage === "Home" ? <Home /> : currentPage}
      </ProjectProvider>
    </main>
  );
}

export default App;
