import HomePresenter from './home-presenter';
import HomeModel from './home-model';

export default class HomePage {
  #presenter = null;

  async render() {
    document.body.classList.remove('signin-bg');
    document.body.classList.remove('signup-bg');
    return `
      <section class="container" style="padding-top: 0;">
        <div class="home-hero-section">
          <h1>SELAMAT DATANG DI FOODLENS</h1>
          <p>Platform cerdas berbasis gambar untuk mengenali,mengindetifikasi, dan mengeksplorasi makanan tradisional Indonesia lengkap dengan Asal Daerahnya.</p>
          <div class="home-hero-actions">
            <button class="button-primary" id="go-upload">Coba Sekarang <img src="https://cdn-icons-png.flaticon.com/512/545/545682.png" alt="right arrow" style="width:20px;height:20px;margin-left:8px;vertical-align:middle;"/></button>
          </div>
        </div>
        <div class="home-food-section">
          <h2>Contoh Pengenalan Makanan Mengunakan Teknologi Prediksi</h2>
          <div class="home-food-list" id="home-food-list"></div>
        </div>
      </section>
      <footer class="footer-home">
        <div class="footer-container">
          <div class="footer-brand">
            <div class="footer-brand-logo">
              <img src="/images/Logo-App/food_lens_logo.jpg" alt="FoodLens Logo" />
              <span class="footer-brand-title">FOODLENS</span>
            </div>
            <div class="footer-brand-desc">
              FoodLens adalah platform inovatif yang memanfaatkan teknologi untuk membantu Anda menjelajahi dunia kuliner. Kami berdedikasi untuk memberikan pengalaman pencarian dan penemuan makanan yang cerdas dan memuaskan.
            </div>
            <div class="footer-social">
              <a href="https://twitter.com" target="_blank" rel="noopener" aria-label="Twitter"><img src="/images/footer-pictures/twitter.png" alt="Twitter" /></a>
              <a href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook"><img src="/images/footer-pictures/facebook.png" alt="Facebook" /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram"><img src="/images/footer-pictures/instagram.png" alt="Instagram" /></a>
              <a href="https://github.com" target="_blank" rel="noopener" aria-label="Github"><img src="/images/footer-pictures/github.png" alt="Github" /></a>
            </div>
          </div>
          <div class="footer-links">
            <div class="footer-links-title">Pages</div>
            <ul class="footer-links-list">
              <li><a href="#/home">Home</a></li>
              <li><a href="#/kategori">Kategori</a></li>
              <li><a href="#/about">Tentang kami</a></li>
              <li><a href="#/blog">Blog</a></li>
            </ul>
          </div>
          <div class="footer-instagram">
            <div class="footer-instagram-title">Follow Kami di Instagram</div>
            <div class="footer-pictures">
              <img src="/images/footer-pictures/makanan1.png" alt="Makanan 1" />
              <img src="/images/footer-pictures/makanan2.png" alt="Makanan 2" />
              <img src="/images/footer-pictures/makanan3.png" alt="Makanan 3" />
              <img src="/images/footer-pictures/makanan4.png" alt="Makanan 4" />
            </div>
          </div>
        </div>
        <div class="footer-copyright">
          &copy; 2025 FoodLens. All rights reserved.
        </div>
      </footer>
    `;
  }

  async afterRender() {
    this.#presenter = new HomePresenter({ view: this, model: new HomeModel() });
    this.#presenter.renderFoods();
    // Tambahkan event listener untuk tombol upload
    setTimeout(() => {
      const goUploadBtn = document.getElementById('go-upload');
      if (goUploadBtn) {
        goUploadBtn.onclick = () => {
          window.location.hash = '/upload';
        };
      }
    }, 0);
  }

  showFoods(foods) {
    const list = document.getElementById('home-food-list');
    if (!list) return;
    list.innerHTML = foods.map(food => `
      <div class="home-food-card">
        <img src="${food.image}" alt="${food.name}">
        <div class="food-info">
          <div>NAMA MAKANAN: <span>${food.name}</span></div>
          <div>ASAL DAERAH: <span>${food.region}</span></div>
          <div>KATEGORI: <span>${food.category}</span></div>
        </div>
      </div>
    `).join('');
  }
}
