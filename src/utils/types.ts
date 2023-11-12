export interface Map {
  tag: string;
  mapPath: string;
  mapSize: {
    width: number;
    height: number;
  };
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
