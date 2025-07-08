import * as tf from 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@3.18.0/dist/tf.min.js';
import { loadGraphModel } from 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-converter@3.18.0/dist/tf-converter.min.js';

let model;
async function loadModel() {
  model = await loadGraphModel('https://your-github-raw-url/model.json'); // Host model.json on GitHub
}

document.getElementById("check").addEventListener("click", async () => {
  const resultEl = document.getElementById("result");
  resultEl.textContent = "Analyzing frame...";
  
  // Capture video frame (simplified example)
  const video = document.querySelector("video");
  const canvas = document.createElement("canvas");
  canvas.width = 224;
  canvas.height = 224;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0, 224, 224);
  
  // Predict
  const tensor = tf.browser.fromPixels(canvas)
    .resizeNearestNeighbor([224, 224])
    .toFloat()
    .expandDims();
  
  const prediction = await model.predict(tensor);
  const isFake = prediction.dataSync()[0] > 0.5;
  
  resultEl.innerHTML = isFake 
    ? '⚠️ <b>High chance of AI-generation</b>' 
    : '✅ <b>Likely authentic</b>';
});

loadModel(); // Initialize model
