import { Ctx } from "@mengkodingan/ckptw";
import { IGlobal } from "../../types/global";

const BioHandler = {
  name: "bio",
  category: "admin",
  code: async (ctx: Ctx) => {
    const bot = (global as unknown as IGlobal).bot
    const input = ctx.args.join(" ") || null;
    if (!input) {
      return ctx.reply("Masukin bio");
    }

    bot.bio(input)
    return ctx.sendMessage(ctx.id || "", {
      text: "berhasil merubah"
    })
  },
};

module.exports = BioHandler;
