function register({ registerHook, peertubeHelpers }) {
  registerHook({
    target: "action:video-watch.player.loaded",
    handler: ({ videojs, video, playlist }) => {
      // Match all nodes
      console.log("update view");
      console.log(video.pluginData);

      var data = video.pluginData;
      Object.keys(data).forEach((key) => {
        const value = data[key];
        console.log(key, value);
        createVideoInfo(key, value);
      });

      /*  // match multiple elements, defined to handle responsiveness
        // siehe https://github.com/Chocobozzz/PeerTube/blob/33eb19e5199cc9fa4d73c6675c97508e3e072ef9/client/src/app/%2Bvideos/%2Bvideo-watch/video-watch.component.html#L55-L56

        // Block zur Aktualisierung der Anzeige des Videos mit CC-Lizenz
        // Auswahl von Elementen aus dem DOM, die aktualisiert werden sollen
        const video_info = document.querySelectorAll(".video-info");
        const video_info_name = document.querySelectorAll(".video-info-name");
        const video_info_date_views = document.querySelectorAll(
          ".video-info-date-views"
        );
        const cc_licence = document.querySelectorAll(".cc-licence");
        const account_page_link = document.querySelector(
          '[title="Account page"]'
        );

        // Entfernen von Attributen und Elementen vor der Aktualisierung für das neu ausgewählte Video
        for (let element of video_info) {
          element.removeAttribute("xmlns:dct");
          element.removeAttribute("xmlns:cc");
        }

        for (let element of video_info_name) {
          element.removeAttribute("property");
        }

        for (let element of cc_licence) {
          element.remove();
        }

        if (account_page_link) {
          account_page_link.firstElementChild.removeAttribute("property");
          account_page_link.removeAttribute("rel");
        }

        if (video.licence.id >= 1 && video.licence.id <= 8) {
          // Insert licence buttonlink

          // Erstellen der Lizenzschaltfläche und des Links
          const licence_span = document.createElement("span");
          licence_span.className = "cc-licence";
          licence_span.innerHTML = " • ";

          const licence_link = document.createElement("a");
          licence_link.rel = "license";
          licence_link.href = video.licence.href;
          licence_link.target = "_blank";

          const licence_button = document.createElement("img");
          licence_button.src = video.licence.image;

          licence_link.appendChild(licence_button);
          licence_span.appendChild(licence_link);

          // Hinzufügen der Lizenzschaltfläche zur Anzeige des Videos
          for (let element of video_info_date_views) {
            element.insertAdjacentHTML("beforeend", licence_span.outerHTML);
          }

          // Set CC-REL metadata

          // Setzen von Metadaten für das Video mit CC-Lizenz
          for (let element of video_info) {
            element.setAttribute("xmlns:dct", "http://purl.org/dc/terms/");
            element.setAttribute("xmlns:cc", "https://creativecommons.org/ns#");
          }

          for (let element of video_info_name) {
            element.setAttribute("property", "dct:title");
          }

          // Nur bei den sechs CC-Lizenzen Attribution hinzufügen, nicht bei CC0 und PDM
          if (video.licence.id <= 6) {
            if (account_page_link) {
              account_page_link.firstElementChild.setAttribute(
                "property",
                "cc:attributionName"
              );
              account_page_link.setAttribute(
                "rel",
                "cc:attributionURL dct:creator"
              );
              // rewrite relative URL to absolute URL
              account_page_link.setAttribute("href", account_page_link.href);
            }
          }
        } */
    },
  });
}

function createVideoInfo(label, value) {
  // Wähle das Element aus, zu dem du das neue Feld hinzufügen möchtest
  const myVideoAttributes = document.querySelector("my-video-attributes");

  // Erstelle das neue Feld
  const newField = document.createElement("div");
  newField.classList.add("attribute-ebu");

  // Füge den Inhalt des neuen Feldes hinzu
  newField.innerHTML = `
<span class="attribute-label-ebu">${label}</span>
<span class="attribute-value-ebu">${value}</span>
`;

  // Füge das neue Feld am Ende des my-video-attributes-Elements hinzu
  myVideoAttributes.appendChild(newField);
}

export { register };
