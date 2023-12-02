import Navbar from "./components/Navbar.tsx";
import "./App.css";
import { ProjectProvider } from "./utils/GlobalState/GlobalState.tsx";
import TitleBar from "./components/TitleBar.tsx";

import FileExplorer from "./components/FileExplorer/FileExplorer.tsx";
import Error from "./components/Error.tsx";
import { useState } from "react";
import IpcListener from "./utils/IpcListener.tsx";
import TABLIST from "./utils/TabList.ts";
import GlobalKeyListener from "./components/GlobalKeyListener.tsx";
function App() {
  const renderActiveTab = () => {
    const currentTab = TABLIST.find((tab) => tab.id === currentPage);
    return currentTab ? <currentTab.element /> : null;
  };
  const [currentPage, setCurrentPage] = useState(0);
  return (
    <ProjectProvider>
      <GlobalKeyListener setCurrentPage={setCurrentPage} />
      <TitleBar />
      <main className='bg-gray-800  h-full flex-col w-screen min-w-fit'>
        <div className='flex flex-row  h-full   '>
          <div className='flex  flex-col w-full  h-full '>
            <Navbar
              setCurrentPage={setCurrentPage}
              currentPage={TABLIST[currentPage].tab}
            />
            <div className='flex-grow bg-black/25 h-full overflow-y-auto'>
              {renderActiveTab()}
            </div>
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
