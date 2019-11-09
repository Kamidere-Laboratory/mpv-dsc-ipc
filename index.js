const mpv = require("mpv-ipc");
const DiscordRPC = require("discord-rpc");
const anitomy = require("anitomy-js");
const debug = require("debug")("MPV:Client");
process.env.DEBUG = "*";
const player = new mpv.MPVClient("\\\\.\\pipe\\mpv");
const clientId = "608285274736427038";

DiscordRPC.register(clientId);
const rpc = new DiscordRPC.Client({ transport: "ipc" });
rpc.on("ready", () => {
  player.observeMediaTitle(title => {
    updateActivity();
  });

  player.onEndFile(e => {
    rpc.clearActivity();
    rpc.destroy();
  });

  player.on("pause", () => {
    updateActivity(true);
  });
  player.on("unpause", () => {
    updateActivity(false);
  });
});
rpc.login({ clientId }).catch(debug);

async function updateActivity(pause = false) {
  const titleData = await anitomy.parse(await player.getProperty("filename"));
  rpc.setActivity({
    details: titleData["anime_title"],
    endTimestamp: pause
      ? 0
      : Date.now() + (await player.getProperty("time-remaining")) * 1000,
    largeImageKey: "mpv_icon",
    smallImageKey: pause ? "pause" : "play"
  });
}