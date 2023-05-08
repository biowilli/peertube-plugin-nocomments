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
  var ebuData = [
    "title",
    "alternativeTitle",
    "dateModified",
    "publicationHistory",
    "note",
    "alternativeTitle2",
    "creator",
    "contributor",
    "description",
    "subject",
    "duration",
    "identifier",
    "identifier2",
    "publisher",
    "date",
    "dateIssued",
    "dateDigitised",
    "publicationHistory2",
    "dateModified2",
    "coverage",
    "coverage2",
    "entity",
    "entity2",
    "type",
    "type2",
    "type3",
    "part",
    "part2",
    "part3",
    "language",
    "source",
    "version",
    "relation",
    "rights",
    "rightsCoverage",
    "rightsCoverage2",
    "rightsCoverage3",
    "dateModified3",
    "metadataProvider",
    "format",
    "format",
    "format2",
    "format3",
    "format4",
    "format5",
    "format6",
    "format7",
    "format8",
    "format9",
    "format10",
    "format11",
    "format12",
    "format13",
    "language2",
    "format14",
    "format15",
    "rating",
  ];

  // Store data associated to this video
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

  // Add your custom value to the video, so the client autofill your field using the previously stored value
  registerHook({
    target: "filter:api.video.get.result",
    handler: async (video) => {
      if (!video) return video;
      if (!video.pluginData) video.pluginData = {};

      const promises = ebuData.map(async (ebuField) => {
        var storedData = await storageManager.getData(
          ebuField + "-" + video.id
        );

        if (ebuField == "title") {
          video.pluginData[ebuField] = video.dataValues.name;
          return;
        }

        video.pluginData[ebuField] = storedData;
      });

      await Promise.all(promises);

      const sortedPluginData = {};
      ebuData.forEach((ebuField) => {
        sortedPluginData[ebuField] = video.pluginData[ebuField];
      });

      video.pluginData = sortedPluginData;
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
