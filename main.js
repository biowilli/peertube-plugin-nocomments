async function register({
  registerHook,
  storageManager,
  registerSetting,
  baseStaticUrl,
}) {
  /*   registerSetting({
    name: "admin-name",
    label: "Admin name",

    type: "html",
    // type: 'input' | 'input-checkbox' | 'input-password' | 'input-textarea' | 'markdown-text' | 'markdown-enhanced' | 'select' | 'html'

    // If type: 'select', give the select available options
    options: [
      { label: "Label 1", value: "value1" },
      { label: "Label 2", value: "value2" },
    ],

    // If type: 'html', set the HTML that will be injected in the page
    html: '<strong class="...">Hello</strong><br /><br />',

    // Optional
    descriptionHTML: "The purpose of this field is...",

    default: "my super name",

    // If the setting is not private, anyone can view its value (client code included)
    // If the setting is private, only server-side hooks can access it
    private: false,
  }); */

  //disable comments when the video wants to be shown
  registerHook({
    target: "action:api.video.updated",
    handler: ({ video, body }) => {
      if (!body.pluginData) return;

      Object.keys(body.pluginData).forEach(function (key) {
        const value = body.pluginData[key];
        if (!value) return;
        storageManager.storeData(key + "-" + video.id, value);
      });
    },
  });

  //disable comments when the video wants to be shown
  registerHook({
    target: "filter:api.video.get.result",
    handler: async (video) => {
      if (!video) return video;

      video.commentsEnabled = false;
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
