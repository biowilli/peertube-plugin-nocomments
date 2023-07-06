# PeerTube plugin nocomments

This code is a PeerTube plugin called "nocomments" that disables and hides the comment section on PeerTube instances.
It achieves this by removing the "my-video-comments" element from the video player when it has finished loading and setting the `commentsEnabled` property of videos to `false` when they are updated or retrieved.

### How to use nocomments

- Login as admin in your PeerTube instance
- Go to Plugin/Themes in the Administration section
- Search plugins for 'nocomments'
- Click on Install

### npm package

https://www.npmjs.com/package/peertube-plugin-nocomments

### contributor

https://www.fairkom.eu/
