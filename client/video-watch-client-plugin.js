//Die Hooks werden verwendet, um die Videoansicht zu modifizieren.
function register({ registerHook, peertubeHelpers }) {
  const baseStaticUrl = peertubeHelpers.getBaseStaticRoute();

  // verschiedenen Creative-Commons-Lizenzen
  const CC_VIDEO_LICENCES = {
    1: {
      label: "CC BY 4.0",
      image: baseStaticUrl + "/images/by.png",
      href: "https://creativecommons.org/licenses/by/4.0/",
    },
    2: {
      label: "CC BY-SA 4.0",
      image: baseStaticUrl + "/images/by-sa.png",
      href: "https://creativecommons.org/licenses/by-sa/4.0/",
    },
    3: {
      label: "CC BY-ND 4.0",
      image: baseStaticUrl + "/images/by-nd.png",
      href: "https://creativecommons.org/licenses/by-nd/4.0/",
    },
    4: {
      label: "CC BY-NC 4.0",
      image: baseStaticUrl + "/images/by-nc.png",
      href: "https://creativecommons.org/licenses/by-nc/4.0/",
    },
    5: {
      label: "CC BY-NC-SA 4.0",
      image: baseStaticUrl + "/images/by-nc-sa.png",
      href: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
    },
    6: {
      label: "CC BY-NC-ND 4.0",
      image: baseStaticUrl + "/images/by-nc-nd.png",
      href: "https://creativecommons.org/licenses/by-nc-nd/4.0/",
    },
    7: {
      label: "CC0 1.0",
      image: baseStaticUrl + "/images/cc-zero.png",
      href: "https://creativecommons.org/publicdomain/zero/1.0/",
    },
    8: {
      label: "Public Domain Mark 1.0",
      image: baseStaticUrl + "/images/publicdomain.png",
      href: "https://creativecommons.org/publicdomain/mark/1.0/",
    },
  };

  // überprüft die videolicence und gibt dann das img und den link zurück
  registerHook({
    target: "filter:api.video-watch.video.get.result",
    handler: (video) => {
      if (video.licence.id >= 1 && video.licence.id <= 8) {
        video.licence.image = CC_VIDEO_LICENCES[video.licence.id].image;
        video.licence.href = CC_VIDEO_LICENCES[video.licence.id].href;
      }
      return video;
    },
  });

  //  ändert die Anzeige des Video-Players wenn der Player ladet
  registerHook({
    target: "action:video-watch.player.loaded",
    handler: ({ videojs, video, playlist }) => {
      {
        // Match all nodes

        // match multiple elements, defined to handle responsiveness
        // see https://github.com/Chocobozzz/PeerTube/blob/33eb19e5199cc9fa4d73c6675c97508e3e072ef9/client/src/app/%2Bvideos/%2Bvideo-watch/video-watch.component.html#L55-L56

        // Elemente auswählen
        const video_info = document.querySelectorAll(".video-info");
        const video_info_name = document.querySelectorAll(".video-info-name");
        const video_info_date_views = document.querySelectorAll(
          ".video-info-date-views"
        );
        const cc_licence = document.querySelectorAll(".cc-licence");
        const account_page_link = document.querySelector(
          '[title="Account page"]'
        );

        // Remove everything before setting for newly selected video

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

          for (let element of video_info_date_views) {
            element.insertAdjacentHTML("beforeend", licence_span.outerHTML);
          }

          // Set CC-REL metadata

          for (let element of video_info) {
            element.setAttribute("xmlns:dct", "http://purl.org/dc/terms/");
            element.setAttribute("xmlns:cc", "https://creativecommons.org/ns#");
          }

          for (let element of video_info_name) {
            element.setAttribute("property", "dct:title");
          }

          // Attribution only for the 6 CC licenses, not the public domain marks (CC0 and PDM)

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
        }
      }
    },
  });
}

export { register };
