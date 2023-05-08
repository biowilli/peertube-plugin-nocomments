async function register({ registerVideoField, peertubeHelpers }) {
  const baseStaticUrl = peertubeHelpers.getBaseStaticRoute();

  var ebuDataSchema =
    "http://localhost:9000" + baseStaticUrl + "/ebudata/ebudata.json";
  console.log("bin hier");
  const videoFormOptions = {
    // Optional, to choose to put your setting in a specific tab in video form
    // type: 'main' | 'plugin-settings'
    tab: "plugin-settings",
  };
  var fields = {};
  fetch(ebuDataSchema)
    .then((response) => response.json())
    .then((data) => {
      fields = data;
      for (const type of [
        "upload",
        "import-url",
        "import-torrent",
        "update",
        "go-live",
      ]) {
        for (const key in fields) {
          if (fields.hasOwnProperty(key)) {
            console.log(key, fields[key]);
            var currentObj = fields[key];
            registerVideoField(
              {
                name: currentObj.name,
                label: currentObj.label,
                descriptionHTML: currentObj.descriptionHTML,
                type: currentObj.type,
                default: currentObj.default,
                hidden: currentObj.hidden,
                error: currentObj.error,
              },
              {
                type,
                ...videoFormOptions,
              }
            );
          }
        }
      }
    })

    .catch((error) => {
      console.error("Error fetching EBU metadata schema:", error);
    });
}

export { register };
