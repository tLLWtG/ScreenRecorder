/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */
const btn = document.getElementById("btn");
const video = document.getElementById("video");

btn.addEventListener("click", async function () {
  const stream = await navigator.mediaDevices.getDisplayMedia({
    video: true,
  });
  video.srcObject = stream;
  video.onloadedmetadata = () => video.play();
  const mime = MediaRecorder.isTypeSupported("video/webm; codecs=vp9")
    ? "video/webm; codecs=vp9"
    : "video/webm";
  const mediaRecorder = new MediaRecorder(stream, {
    mimeType: mime,
  });
  //record
  const chunks = [];
  mediaRecorder.addEventListener("dataavailable", function (e) {
    chunks.push(e.data);
  });
  //stop
  mediaRecorder.addEventListener("stop", function () {
    const blob = new Blob(chunks, { type: chunks[0].type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "video.webm";
    a.click();
  });
  //start manually
  mediaRecorder.start();
});
