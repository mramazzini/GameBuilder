import Navbar from "./components/Navbar.tsx";
import "./App.css";
import { ProjectProvider } from "./utils/GlobalState/GlobalState.tsx";
import TitleBar from "./components/TitleBar.tsx";
import Home from "./pages/Home.tsx";
import AppRunner from "./pages/AppRunner.tsx";
import MapEditor from "./pages/MapEditor.tsx";
import FileExplorer from "./components/FileExplorer/FileExplorer.tsx";
import Error from "./components/Error.tsx";
import { useState } from "react";
import IpcListener from "./utils/IpcListener.tsx";

function App() {
  const [currentPage, setCurrentPage] = useState("Home");
  return (
    <ProjectProvider>
      <TitleBar />
      <main className='bg-gray-800  h-full flex-col'>
        <div className='flex flex-row justify-between h-full '>
          <div className='flex justify-start flex-col  w-full  h-full'>
            <Navbar setCurrentPage={setCurrentPage} currentPage={currentPage} />
            {currentPage === "Home" ? (
              <Home />
            ) : currentPage === "App Runner" ? (
              <AppRunner />
            ) : currentPage === "Map Editor" ? (
              <MapEditor />
            ) : (
              <h1>Page Not Found</h1>
            )}
          </div>
          <div className='flex justify-start grow flex-col'>
            <FileExplorer initialPath='/root' />
          </div>
        </div>
        <IpcListener />
        <Error />
      </main>
    </ProjectProvider>
  );
}

export default App;
