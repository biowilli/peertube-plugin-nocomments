function register({ registerHook, peertubeHelpers }) {
  registerHook({
    target: "action:video-watch.player.loaded",
    handler: ({ videojs, video, playlist }) => {
      console.log("commentsEnabled:");
      console.log(video.commentsEnabled);
    },
  });
}

export { register };
