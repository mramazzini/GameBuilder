import MapEditor from "../pages/MapEditor";
import TilesetEditor from "../pages/TilesetEditor";
import AppRunner from "../pages/AppRunner";
import Home from "../pages/Home";
import { ReactNode } from "react";
const tabs = [
  "Map Editor",
  "Tileset Editor",
  "Hitbox Editor",
  "Sprite Editor",
  "Animation Editor",
  "Sound Editor",
  "App Runner",
];
interface TabComponent {
  (): ReactNode;
}
const TABLIST: { tab: string; id: number; element: TabComponent }[] = tabs.map(
  (tab, index) => {
    return {
      tab: tab,
      id: index,
      element:
        tab === "Map Editor"
          ? MapEditor
          : tab === "Tileset Editor"
          ? TilesetEditor
          : tab === "App Runner"
          ? AppRunner
          : Home,
    };
  }
);
export default TABLIST;
