import Navbar from "./components/Navbar.tsx";
import "./App.css";
import { ProjectProvider } from "./utils/GlobalState.tsx";
import TitleBar from "./components/TitleBar.tsx";
import Home from "./pages/Home.tsx";
import FileExplorer from "./components/FileExplorer.tsx";

import { useState } from "react";
function App() {
  const [currentPage, setCurrentPage] = useState("Home");
  return (
    <main className='bg-gray-800 h-screen'>
      <ProjectProvider>
        <TitleBar />
        <div className='flex flex-row w-full h-full '>
          <div className='flex justify-start flex-col w-full h-full '>
            <Navbar setCurrentPage={setCurrentPage} currentPage={currentPage} />
            {currentPage === "Home" ? <Home /> : currentPage}
          </div>
          <FileExplorer initialPath='/root' />
        </div>
      </ProjectProvider>
    </main>
  );
}

export default App;
