import { Client } from "boardgame.io/react";
import { JustusGame } from "./Game";

const App = Client({ game: JustusGame });

export default App;
