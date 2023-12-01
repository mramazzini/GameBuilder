export interface Map {
  sizeX: number;
  sizeY: number;
  layers: MapLayer[];

  tag: string;
  tileset: string;
}
export interface MapLayer {
  tiles: Tile[][];
  tag: string;
}

export interface Tile {
  collider: boolean;
  srcX: number;
  srcY: number;
}

export interface Tileset {
  tag: string;

  tileWidth: number;
  tileHeight: number;
  base64: string;
  tileCount: number;
  columns: number;
  rows: number;
}

export interface ProjectState {
  projectDirectory: string;
  filesAndFolders: FileOrFolder;
  error: string;
  stdLog: log[];
  tilesets: Tileset[];
  maps: Map[];
  colors: RGBA[];
  history: History;
  fileExplorerOpened: boolean;
  tilesetPixelData: number[];
}

export interface MapState {
  selectedMap: Map;
  selectedTileset: Tileset;
  selectedTile: number;
  selectedLayer: number;
  colliderVision: boolean;
  addingCollider: boolean;
}

export interface TilesetState {
  selectedTileset: Tileset;
  selectedTile: number;
  selectedColor: number;
}

export interface tileHistory {
  tile: Tile;
  tilePosition: [number, number];
}
export interface History {
  maps: Array<{
    mapTag: string;
    current: tileHistory[];
    removed: tileHistory[];
  }>;
}

export interface log {
  message: string;
  timestamp: string;
}
export interface FileOrFolder {
  name: string;
  isFolder: boolean;
  children: FileOrFolder[];
}

export interface RGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}
