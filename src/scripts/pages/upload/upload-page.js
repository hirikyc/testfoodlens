class UploadPage {
  async render() {
    return `
      <section class="upload-section">
        <h1>Unggah Foto</h1>
        <div id="permissionPrompt" style="border: 1px solid #ccc; padding: 10px; display: none;">
          <p>Aplikasi membutuhkan izin untuk mengakses kamera Anda.</p>
          <button id="allowCamera">Izinkan Kamera</button>
        </div>
        <select id="cameraMode">
          <option value="user">Kamera Depan</option>
          <option value="environment">Kamera Belakang</option>
        </select>
        <button id="startCamera">Buka Kamera</button>
        <br /><br />
        <video id="video" autoplay playsinline width="300" style="display: none;"></video>
        <button id="capture" style="display: none;">Ambil Gambar</button>
        <br /><br />
        <input type="file" id="fileInput" accept="image/*" />
        <div id="drop-area" style="border:2px dashed #aaa;padding:24px;text-align:center;margin:16px 0;cursor:pointer;">Drag & Drop gambar di sini</div>
        <br />
        <canvas id="canvas" width="300" height="300" style="display: none;"></canvas>
        <img id="preview" src="" width="300" style="display:none;" />
        <br />
        <button id="analyzeBtn" style="display:none;margin-top:8px;">Analize Picture</button>
        <div id="prediction-result" style="margin-top:16px;font-weight:bold;"></div>
      </section>
    `;
  }
  async afterRender() {
    const presenterModule = await import('./upload-page-presenter.js');
    if (typeof presenterModule.default === 'function') {
      presenterModule.default();
    }
  }
}
export default UploadPage;
