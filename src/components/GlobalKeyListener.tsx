import { useEffect } from "react";
import TABLIST from "../utils/TabList";
const GlobalKeyListener = ({
  setCurrentPage,
}: {
  setCurrentPage: Function;
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      //toggle pages with ctrl + 1, 2, 3, 4
      if (event.ctrlKey) {
        switch (event.key) {
          case "1":
            setCurrentPage(TABLIST[0].id);
            break;
          case "2":
            setCurrentPage(TABLIST[1].id);
            break;
          case "3":
            setCurrentPage(TABLIST[2].id);
            break;
          case "4":
            setCurrentPage(TABLIST[3].id);
            break;
          case "5":
            setCurrentPage(TABLIST[4].id);
            break;
          case "6":
            setCurrentPage(TABLIST[5].id);
            break;
          case "7":
            setCurrentPage(TABLIST[6].id);
            break;

          default:
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return null;
};
export default GlobalKeyListener;
