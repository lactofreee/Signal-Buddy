import fs from "node:fs/promises";
import path from "node:path";
import { getPlaiceholder } from "plaiceholder";

export type PlaiceholderType = {
  color: {
    r: number;
    g: number;
    b: number;
    hex: string;
  };
  css: {
    backgroundImage: string;
    backgroundPosition: string;
    backgroundSize: string;
    backgroundRepeat: string;
  };
  base64: string;
  pixels: {
    a?: number | undefined;
    r: number;
    g: number;
    b: number;
  }[][];
};

const getBase64 = async (
  src: string,
): Promise<
  PlaiceholderType & { img: { src: string; height: number; width: number } }
> => {
  const buffer = await fs.readFile(path.join("./public", src));

  const {
    metadata: { height, width },
    ...plaiceholder
  } = await getPlaiceholder(buffer, { size: 10 });

  return {
    ...plaiceholder,
    img: { src, height, width },
  };
};

export default getBase64;
