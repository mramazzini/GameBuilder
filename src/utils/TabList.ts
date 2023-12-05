import MapEditor from "../pages/MapEditor";
import TilesetEditor from "../pages/TilesetEditor";
import AppRunner from "../pages/AppRunner";
import Home from "../pages/Home";
import { ReactNode } from "react";
const tabs = ["Maps", "Tilesets", "Entities", "App Runner"];
interface TabComponent {
  (): ReactNode;
}
const TABLIST: { tab: string; id: number; element: TabComponent }[] = tabs.map(
  (tab, index) => {
    return {
      tab: tab,
      id: index,
      element:
        tab === "Maps"
          ? MapEditor
          : tab === "Tilesets"
          ? TilesetEditor
          : tab === "App Runner"
          ? AppRunner
          : Home,
    };
  }
);
export default TABLIST;
