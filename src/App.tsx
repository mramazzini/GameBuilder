import Navbar from "./components/Navbar.tsx";
import "./App.css";
import { ProjectProvider } from "./utils/GlobalState.tsx";
import TitleBar from "./components/TitleBar.tsx";
import Home from "./pages/Home.tsx";
import FileExplorer from "./components/FileExplorer/FileExplorer.tsx";
import Error from "./components/Error.tsx";

import { useState } from "react";
function App() {
  const [currentPage, setCurrentPage] = useState("Home");
  return (
    <main className='bg-gray-800 h-screen'>
      <ProjectProvider>
        <TitleBar />
        <div className='flex flex-row justify-between w-full h-full '>
          <div className='flex justify-start flex-col w-full h-full '>
            <Navbar setCurrentPage={setCurrentPage} currentPage={currentPage} />
            {currentPage === "Home" ? <Home /> : currentPage}
          </div>
          <div className='flex justify-end'>
            <FileExplorer initialPath='/root' />
          </div>
        </div>
        <Error />
      </ProjectProvider>
    </main>
  );
}

export default App;
