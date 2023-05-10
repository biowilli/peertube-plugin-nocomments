function register({ registerHook }) {
  // Remove the "my-video-comments" element when the video player has loaded
  registerHook({
    target: "action:video-watch.player.loaded",
    handler: () => {
      const myVideoComments = document.querySelector("my-video-comments");
      myVideoComments.remove();
    },
  });
}

export { register };
