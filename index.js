const mpv = require("mpv-ipc");
const DiscordRPC = require("discord-rpc");
const anitomy = require("anitomy-js");
const debug = require("debug")("MPV:Client");
const path = require("path");
process.env.DEBUG = "*";
const mpvConfDir = path.join(process.argv[2]);
const player = new mpv.MPVClient(path.join(mpvConfDir, "mpv.sock"));
const clientId = "608285274736427038";


DiscordRPC.register(clientId);
const rpc = new DiscordRPC.Client({ transport: "ipc" });
rpc.on("ready", async () => {
  player.observeMediaTitle(async () => {
    await updateActivity();
  });

  player.onEndFile(e => {
    rpc.clearActivity();
    rpc.destroy();
  });

  player.on("pause", async () => {
    await updateActivity(true);
  });
  player.on("unpause", async () => {
    await updateActivity(false);
  });
});
rpc.login({ clientId }).catch(debug);

async function getName(){
  const path = await player.getProperty("path");
  if (path.startsWith("https://") || path.startsWith("http://")){
    return await player.getProperty("media-title");
  }else{
    const titleData = await anitomy.parse(await player.getProperty("filename"));
    return titleData["episode_number"]
    ? `${titleData["anime_title"]} ep. ${titleData["episode_number"]}`
    : titleData["anime_title"];
  }
}

async function updateActivity(pause = false) {
  const details = await getName();
  console.log(details);
  rpc.setActivity({
    details: details,
    endTimestamp: pause
      ? 0
      : Date.now() + (await player.getProperty("time-remaining")) * 1000,
    largeImageKey: "mpv_icon",
    smallImageKey: pause ? "pause" : "play"
  });
}
