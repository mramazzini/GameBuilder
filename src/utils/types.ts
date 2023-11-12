export interface Map {
  sizeX: number;
  sizeY: number;
  tiles: Tile[][];
}

export interface Tile {
  collider: boolean;
  srcX: number;
  srcY: number;
}

export interface Tileset {
  name: string;
  path: string;
  tileWidth: number;
  tileHeight: number;
  tilePath: string;
  tileCount: number;
  tileColumns: number;
  tileRows: number;
}
export interface ProjectState {
  projectDirectory: string;
  filesAndFolders: fileOrFolder;
  error: string;
  stdLog: log[];
  tilesets: Tileset[];
  maps: Map[];
}
export interface log {
  message: string;
  timestamp: string;
}
export interface fileOrFolder {
  name: string;
  isFolder: boolean;
  children: fileOrFolder[];
}
