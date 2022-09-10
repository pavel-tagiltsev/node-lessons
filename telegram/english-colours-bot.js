import { Telegraf } from "telegraf";

const bot = new Telegraf(process.env.ENGLISH_COLOURS_BOT_KEY);

bot.on("text", (ctx) => ctx.reply("Hello"));

export default bot;
