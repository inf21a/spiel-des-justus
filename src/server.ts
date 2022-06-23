import { Origins, Server } from "boardgame.io/server";
import bodyParser from "koa-bodyparser";
import { game } from "./Game";

const prod = process.env.NODE_ENV == "production";

const server = Server({
  games: [game],
  origins: prod ? [] : [Origins.LOCALHOST],
});

// const groupAnswers = new Map<string, Array<string>>();

// server.router.use("/group-answers/:id", bodyParser());

// server.router.post("/group-answers/:id", async (ctx) => {
//   console.log(ctx.request.body);
//   if (ctx.request.body && ctx.request.body.answer) {
//     const id = ctx.params["id"];
//     const answer = ctx.request.body.answer;
//     const collection = groupAnswers.get(id);
//     if (collection) {
//       collection.push(answer);
//     } else {
//       groupAnswers.set(id, [answer]);
//     }
//     ctx.status = 201;
//   } else {
//     ctx.status = 400;
//   }
// });

// server.router.get("/group-answers/:id", async (ctx) => {
//   const collection = groupAnswers.get(ctx.params["id"]);
//   if (collection) {
//     ctx.body = JSON.stringify(collection);
//     ctx.status = 200;
//   } else {
//     ctx.status = 404;
//   }
// });

// server.router.delete("/group-answers/:id", async (ctx) => {
//   groupAnswers.delete(ctx.params["id"]);
//   ctx.status = 200;
// });

server.run(prod ? Number(process.env.PORT) : 3001);
