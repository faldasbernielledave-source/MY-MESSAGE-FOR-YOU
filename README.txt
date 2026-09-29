FOR US ❤️ — WEBSITE FILES

FILES
- index.html: page structure
- style.css: design, colors, layout, responsive styles
- script.js: slideshow, music controls, mood toggle, heart effects, buttons, Save as Image
- assets/photos/: put your photos here
- assets/music/: put your song here

ADD YOUR PHOTOS
1. Put images in assets/photos/.
2. Open script.js.
3. Edit PHOTO_FILES near the top, for example:
   const PHOTO_FILES = [
     "assets/photos/us1.jpg",
     "assets/photos/us2.jpg",
     "assets/photos/first-date.png"
   ];
4. Make sure each filename and extension matches exactly.

ADD YOUR SONG
1. Put the audio file in assets/music/.
2. Set MUSIC_FILE near the top of script.js, for example:
   const MUSIC_FILE = "assets/music/our-song.mp3";

KEEP IT PERMANENT
Keep index.html, style.css, script.js, and the assets folder together in the same project folder.
The photos and song are referenced by their local relative paths, so they stay connected as long as you keep the folder structure and filenames the same. The website does not upload them.

SAVE AS IMAGE
The Save as Image button uses html2canvas. The starter HTML loads it from a CDN (internet required).
For a fully offline copy, download html2canvas.min.js into the project folder and change the script tag in index.html to:
<script defer src="html2canvas.min.js"></script>

Open index.html in a modern browser to preview. For some browsers, running with a local development server (such as VS Code Live Server) works more reliably than opening the file directly.
