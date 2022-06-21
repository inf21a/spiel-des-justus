import { Origins, Server } from "boardgame.io/server";
import { game } from "./Game";

const prod = process.env.NODE_ENV == "production";

const server = Server({
  games: [game],
  origins: prod ? [] : [Origins.LOCALHOST],
});

server.run(prod ? Number(process.env.PORT) : 3001);
