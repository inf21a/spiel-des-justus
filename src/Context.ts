import { createContext } from "react";

export const QuitGameContext = createContext(async () => {});

export const AudioContext = createContext({
  playAudio: true,
  setPlayAudio: (_: boolean) => {},
});
