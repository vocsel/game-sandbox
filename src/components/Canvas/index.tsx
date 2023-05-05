import React, { useEffect, useState } from "react";
import Renderer from "lib/3d/renderer";
import { Game } from "lib/3d/game";
import { useGameStatus } from "store/game-status";

const Canvas = () => {
  const [gameStatus, setGameStatus] = useGameStatus();

  let canvas: HTMLCanvasElement;

  useEffect(() => {
    async function init() {
      const canvas = document.querySelector("canvas") as HTMLCanvasElement;

      setGameStatus("uploaded");
    }

    init();
  }, []);

  return (
    <canvas />
  );
};

export default Canvas;
