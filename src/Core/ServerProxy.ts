import { MapData } from "./MapData";
import type { PropMapData } from "./ServerInteropTypes";

export function fetchMapData(): Promise<PropMapData[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Object.values(MapData));
    }, 500);
  });
}
