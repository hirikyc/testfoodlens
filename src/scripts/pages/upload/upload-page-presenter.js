import UploaderModel from './uploader.js';
import FoodLensMLAPI from '../../data/FoodLensMLAPI';

export default function uploadPagePresenter() {
  const model = new UploaderModel();

  const video = document.getElementById("video");
  const canvas = document.getElementById("canvas");
  const preview = document.getElementById("preview");
  const fileInput = document.getElementById("fileInput");
  const captureBtn = document.getElementById("capture");
  const startCameraBtn = document.getElementById("startCamera");
  const allowCameraBtn = document.getElementById("allowCamera");
  const cameraMode = document.getElementById("cameraMode");
  const permissionPrompt = document.getElementById("permissionPrompt");
  const dropArea = document.getElementById("drop-area");
  const predictionResult = document.getElementById("prediction-result");
  const analyzeBtn = document.getElementById("analyzeBtn");

  let stream;
  let lastSelectedFile = null;

  if (permissionPrompt) permissionPrompt.style.display = "block";

  if (allowCameraBtn) allowCameraBtn.onclick = async () => {
    permissionPrompt.style.display = "none";
    try {
      const result = await navigator.permissions.query({ name: "camera" });
      if (result.state === "denied") {
        alert("Akses kamera ditolak. Silakan izinkan dari pengaturan browser.");
      }
    } catch (err) {}
    alert("Kamera siap digunakan. Silakan klik tombol 'Buka Kamera'.");
  };

  if (startCameraBtn) startCameraBtn.onclick = async () => {
    const facingMode = cameraMode.value;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
        audio: false,
      });
      video.srcObject = stream;
      video.style.display = "block";
      captureBtn.style.display = "inline-block";
    } catch (err) {
      alert("Gagal membuka kamera: " + err.message);
    }
  };

  async function handleImageFile(file) {
    // Preview
    const reader = new FileReader();
    reader.onload = () => {
      model.setImageData(reader.result);
      preview.src = reader.result;
      preview.style.display = "block";
      if (analyzeBtn) analyzeBtn.style.display = "inline-block";
    };
    reader.readAsDataURL(file);
    lastSelectedFile = file;
    predictionResult.textContent = '';
  }

  if (analyzeBtn) analyzeBtn.onclick = async () => {
    if (!lastSelectedFile) {
      predictionResult.textContent = 'Silakan pilih atau ambil gambar terlebih dahulu.';
      return;
    }
    predictionResult.innerHTML = '<span class="prediksi-title">Memprediksi...</span>';
    try {
      const result = await FoodLensMLAPI.predictFood(lastSelectedFile);
      // Format hasil prediksi
      if (result.detection) {
        const det = result.detection;
        const topPreds = (det.top_predictions || []).map((p, i) =>
          `<div class="prediksi-top">${i === 0 ? '<b>Top 3 Prediksi:</b><br>' : ''}<span class="prediksi-food">${p.food_name}</span> <span class="prediksi-confidence">(${(p.confidence*100).toFixed(1)}%)</span> <span class="prediksi-origin">Asal: ${p.origin}</span></div>`
        ).join('');
        let rekom = '';
        if (result.recommendations && result.recommendations.length > 0) {
          rekom = `<div class="prediksi-rekomendasi"><span class="prediksi-rekomendasi-title">Rekomendasi Restoran:</span><ul class="prediksi-rekomendasi-list">` +
            result.recommendations.map(r => `<li><b>${r.name}</b> <span style='color:#ffb800'>&#9733;${r.rating}</span> <span style='color:#666'>(Lokasi: ${r.cuisine}, Skor: ${(r.similarity_score*100).toFixed(1)}%)</span></li>`).join('') +
            `</ul></div>`;
        }
        predictionResult.innerHTML = `
          <span class="prediksi-title">Prediksi Makanan</span>
          <span class="prediksi-food">${det.food_name}</span>
          <span class="prediksi-origin">Asal: ${det.origin}</span>
          <span class="prediksi-confidence">Kepercayaan: ${(det.confidence*100).toFixed(1)}%</span>
          ${topPreds}
          ${rekom}
        `;
      } else {
        predictionResult.textContent = JSON.stringify(result);
      }
    } catch (err) {
      predictionResult.textContent = 'Gagal memproses gambar: ' + err.message;
    }
  };

  if (captureBtn) captureBtn.onclick = async () => {
    canvas.style.display = "block";
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL("image/png");
    model.setImageData(imageData);
    preview.src = imageData;
    preview.style.display = "block";
    if (analyzeBtn) analyzeBtn.style.display = "inline-block";
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    video.style.display = "none";
    captureBtn.style.display = "none";
    // Convert dataURL to Blob for upload
    const blob = await (await fetch(imageData)).blob();
    const file = new File([blob], "capture.png", { type: "image/png" });
    lastSelectedFile = file;
    predictionResult.textContent = '';
  };

  if (fileInput) fileInput.onchange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    handleImageFile(file);
  };

  // Drag & Drop
  if (dropArea) {
    dropArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropArea.style.background = '#f0f0f0';
    });
    dropArea.addEventListener('dragleave', (e) => {
      e.preventDefault();
      dropArea.style.background = '';
    });
    dropArea.addEventListener('drop', (e) => {
      e.preventDefault();
      dropArea.style.background = '';
      const file = e.dataTransfer.files[0];
      if (file) handleImageFile(file);
    });
    // Klik area = buka file dialog
    dropArea.addEventListener('click', () => fileInput && fileInput.click());
  }
}
