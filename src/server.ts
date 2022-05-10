import { Server, Origins } from "boardgame.io/server";
import { JustusGame } from "./Game";

const server = Server({ games: [JustusGame], origins: [Origins.LOCALHOST] });

server.run(process.env.PORT ? Number(process.env.PORT) : 8000);
