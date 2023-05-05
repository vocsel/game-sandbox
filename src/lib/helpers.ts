import { Mesh, Vector3 } from "@babylonjs/core";

export const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
};

export const deg = (d: number): number => (d * Math.PI) / 180;

export const localAsset = (name: string) => name.replace(/.*\/(.+)$/, "$1");

export const random = (from: number, to: number, precision = 1) => {
  let n = +(Math.random() * to).toFixed(precision);

  if (from < 0) {
    const multiplier = Math.random() > 0.5 ? 1 : -1;

    n *= multiplier;
  } else {
    n += Math.abs(from);
  }

  return n;
};

export const getFileExtension = (fileName: string): string | null => fileName.replace(/(.*)(\..*)$/, "$2");

export const getDistance = (playerPosition: Vector3, mesh: Mesh): number => {
  const meshPosition = mesh.getAbsolutePosition();

  const d = Math.sqrt((meshPosition.x - playerPosition.x) ** 2 + (meshPosition.z - playerPosition.z) ** 2);

  return d;
};
