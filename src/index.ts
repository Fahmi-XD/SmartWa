import {
  Client,
  CommandHandler,
  Events,
} from "@mengkodingan/ckptw";
import path from "path";
import readline from "node:readline";
import fs from "node:fs";
import { stdin as input, stdout as output } from "node:process";
import { IGlobal } from "./types/global";

const rl = readline.createInterface({ input, output });

let pairing = false;
console.clear();
const args = process.argv.slice(2);
if (args.includes("--pairing")) {
  pairing = true;
} else if (args.includes("--qr")) {
  pairing = false;
} else {
  pairing = false;
}

const prompt = (q: string): Promise<string> => {
  return new Promise<string>((resolve) => {
    rl.question(q, resolve)
  })
}

async function main(): Promise<void> {
  let phone: string = "";
  if (pairing && !fs.existsSync("state")) {
    console.log("Masukan nomer anda dengan format 6285xxx")
    phone = await prompt("Nomer : ");
  }
  
  const bot = new Client({
    prefix: "!",
    printQRInTerminal: !pairing,
    usePairingCode: pairing && !fs.existsSync("state"),
    phoneNumber: phone ? phone : "",
    readIncommingMsg: true
  });
  
  const bioTexts = [
    "🚀 Bot is active right now",
    "🚀 Bot created by Tuxedo Labs",
    "🌟 Stay tuned for updates!",
    "🔥 Powered by Node.js",
    "💻 Coding is fun!",
    "🌐 Always online!",
  ];
  
  let currentBioIndex = 0;
  const cmd = new CommandHandler(bot, path.resolve(__dirname, "handler"));
  
  bot.ev.once(Events.ClientReady, (m) => {
    console.log(`ready at ${m.user.id}`);
    updateBio();
    cmd.load();
  });
  
  function updateBio() {
    const bio = bioTexts[currentBioIndex];
  
    bot.bio(bio);
    currentBioIndex = (currentBioIndex + 1) % bioTexts.length;
    setTimeout(updateBio, 10000);
  }
  
  bot.launch();

  (global as unknown as IGlobal).bot = bot;
}

main()