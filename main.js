async function register({ registerHook }) {
  // Disable comments when a video is updated
  registerHook({
    target: "action:api.video.updated",
    handler: ({ video, body }) => {
      video.commentsEnabled = false; // Set `commentsEnabled` to `false`
      return video;
    },
  });

  // Disable comments when a video is retrieved
  registerHook({
    target: "filter:api.video.get.result",
    handler: async (video) => {
      if (!video) return video;
      video.commentsEnabled = false; // Set `commentsEnabled` to `false`
      return video;
    },
  });
}

async function unregister() {
  return;
}

module.exports = {
  register,
  unregister,
};
