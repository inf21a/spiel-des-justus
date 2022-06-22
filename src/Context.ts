import { createContext } from "react";

export const QuitGameContext = createContext(async (matchID: string) => {
  matchID;
});
