import React, { useEffect, useState } from "react";
import Renderer from "lib/3d/renderer";
import loadEnvironment from "lib/3d/environment";
import Freezer from "components/Freezer";
import Spinner from "components/Spinner";
import { Vocsel } from "vocsel-api";
import { useVocselApi } from "store/vocsel-api";
import { Mesh, Vector3 } from "@babylonjs/core";
import { Box, Typography } from "@mui/material";
import { getToken } from "lib/auth";
import SignInModal from "components/AuthModal";
import Api, { NewApi } from "vocsel-api/dist/Api";
import { imagePortal, videoPortal } from "lib/3d/media-portals";

async function updateDisplays(vocselApi: NewApi) {
  const renderer = Renderer.shared();

  const videoStreamsUrls: Record<string, string> = await vocselApi.public.db.dict.getMany("display:*");

  Object.keys(videoStreamsUrls).forEach((displayName: string) => {
    const videoDisplay = renderer.scene.meshes.find(({ name }) => name === displayName);

    if (videoDisplay) {
      if (displayName === "display:main") {
        videoPortal(videoDisplay as Mesh, videoStreamsUrls[displayName]);
      } else {
        imagePortal(videoDisplay as Mesh, videoStreamsUrls[displayName]);
      }
    }
  });
}

const App = () => {
  const [_, setVocselApi] = useVocselApi();
  const [isInitialized, setIsInitialized] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  let canvas: HTMLCanvasElement;

  // useEffect(() => {
  //   if (isInitialized) {
  //     const renderer = Renderer.shared();

  //     if (renderer.scene) {
  //       renderer.initPlayer();
  //     }
  //   }
  // }, [isInitialized]);

  useEffect(() => {
    async function init() {
      const canvas = document.querySelector("canvas") as HTMLCanvasElement;

      const renderer = Renderer.shared();
      await renderer.init(canvas);

      await loadEnvironment();

      renderer.run();

      setIsInitialized(true);

      if (getToken()) {
        setShowSignInModal(true);
      }

      const vocApi = await Vocsel.auth({
        projectId: process.env.PROJECT_ID,
        auth: {
          token: window.localStorage.getItem("Authorization") as string,
        },
      });

      setVocselApi(vocApi);

      // updateVideoPortals(vocApi);
      updateDisplays(vocApi);

      setInterval(() => {
        updateDisplays(vocApi);
      }, 1000 * 60);
    }

    init();
  }, []);

  return (
    <Freezer
      show={!isInitialized}
      message={!isInitialized ? (
        <Box>
          <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <Spinner />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <Typography>Loading scene...</Typography>
          </Box>
        </Box>
      ) : null}
    >
      {/* {
        showSignInModal ? (
          <SignInModal open={showSignInModal} onClose={() => setShowSignInModal(false)} />
        ) : null
      } */}
      <canvas />
    </Freezer>
  );
};

export default App;
