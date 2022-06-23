import { Origins, Server } from "boardgame.io/server";
import bodyParser from "koa-bodyparser";
import { game } from "./Game";

const prod = process.env.NODE_ENV == "production";

const server = Server({
  games: [game],
  origins: prod ? [] : [Origins.LOCALHOST],
});

const groupAnswers = new Map<string, Array<string>>();
const groupAnswerCounts = new Map<string, number>();

server.router.use("/group-answers/:id", bodyParser());

server.router.post("/group-answers/:id", (ctx) => {
  if (ctx.request.body && ctx.request.body.answer) {
    const id = ctx.params["id"];
    const answer = ctx.request.body.answer;
    const collection = groupAnswers.get(id);

    if (collection) {
      if (!collection.includes(answer)) {
        collection.push(answer);
      }
    } else {
      groupAnswers.set(id, [answer]);
    }

    if (groupAnswerCounts.has(id)) {
      groupAnswerCounts.set(id, groupAnswerCounts.get(id)! + 1);
    } else {
      groupAnswerCounts.set(id, 1);
    }

    ctx.status = 201;
    ctx.body = JSON.stringify({
      count: groupAnswerCounts.get(id),
      answers: groupAnswers.get(id),
    });
  } else {
    ctx.status = 400;
  }
});

server.router.get("/group-answers/:id", (ctx) => {
  const id = ctx.params["id"];
  const answers = groupAnswers.get(id);

  if (answers) {
    ctx.body = JSON.stringify({ answers, count: groupAnswerCounts.get(id) });
    ctx.status = 200;
  } else {
    ctx.status = 404;
  }
});

server.router.delete("/group-answers/:id", (ctx) => {
  const id = ctx.params["id"];
  groupAnswers.delete(id);
  groupAnswerCounts.delete(id);
  ctx.status = 200;
});

server.run(prod ? Number(process.env.PORT) : 3001);
