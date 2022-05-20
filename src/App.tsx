import { Client } from "boardgame.io/react";
import { SocketIO } from "boardgame.io/multiplayer";
import { JustusGame } from "./Game";

const App = Client({
  game: JustusGame,
  multiplayer: SocketIO(
    import.meta.env.DEV
      ? {
        server: "localhost:3001",
      }
      : {},
  ),
});

export default App;
