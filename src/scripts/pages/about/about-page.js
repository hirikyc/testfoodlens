function renderTentangKamiIdentity() {
  return `
    <div class="tentang-cards">
      <div class="tentang-card">
        <img src="/images/icon/book.png" alt="Story" />
        <div>
          <h3>Our Story</h3>
          <p>Singkatnya tentang inspirasi dan awal mula FoodLens, bagaimana kami lahir dari kecintaan pada kuliner dan teknologi untuk memudahkan eksplorasi rasa.</p>
        </div>
      </div>
      <div class="tentang-card">
        <img src="/images/icon/target.png" alt="Mission" />
        <div>
          <h3>Our Mission</h3>
          <p>Menjadi panduan kuliner terpercaya, menghubungkan Anda dengan cita rasa dan kisah di balik setiap hidangan.</p>
        </div>
      </div>
      <div class="tentang-card">
        <img src="/images/icon/currency.png" alt="Values" />
        <div>
          <h3>Our Values</h3>
          <p>Inovasi teknologi, keaslian rasa, dan semangat membangun komunitas kuliner adalah inti dari setiap langkah kami.</p>
        </div>
      </div>
    </div>
  `;
}

// Komponen Reach
function renderTentangKamiReach() {
  return `
    <div class="tentang-stats-section">
      <div class="tentang-stats-container">
        <div class="tentang-stats-info">
          <h2>Mengenal FoodLens Lebih Jauh</h2>
          <div class="tentang-stats-list">
            <div class="tentang-stats-item">
              <span class="stats-value">34+</span>
              <div class="stats-label">Jumlah Kota/Provinsi</div>
            </div>
            <div class="tentang-stats-item">
              <span class="stats-value">2000+</span>
              <div class="stats-label">Hidangan Tercatat</div>
            </div>
            <div class="tentang-stats-item">
              <span class="stats-value">65+</span>
              <div class="stats-label">Pengguna Aktif</div>
            </div>
            <div class="tentang-stats-item">
              <span class="stats-value">100%</span>
              <div class="stats-label">Pengguna yg Puas</div>
            </div>
          </div>
        </div>
        <div class="tentang-stats-img">
          <img src="/images/tentang-kami/tentang-kami-reach-pictures.jpg" alt="Mengenal FoodLens" />
        </div>
      </div>
    </div>
  `;
}

// Komponen Review
function renderTentangKamiReview() {
  return `
    <div class="tentang-testimoni-section">
      <h2 class="tentang-testimoni-title">Apa Kata Pengguna Kami</h2>
      <div class="tentang-testimoni-list">
        <div class="tentang-testimoni-card">
          <p class="testimoni-title">“Petualangan Kuliner Jadi Lebih Mudah!”</p>
          <div class="testimoni-desc">Dulu saya sering kesulitan mencari makanan khas daerah atau tempat makan unik. Dengan FoodLens, saya bisa menjelajahi berbagai pilihan dan menemukan permata tersembunyi yang benar-benar otentik.</div>
          <hr class="testimoni-divider" />
          <div class="testimoni-user">
            <img src="/images/tentang-kami/sophia.jpg" alt="Sophia" class="testimoni-img" />
            <div>
              <div class="testimoni-nama">Sophia</div>
              <div class="testimoni-loc">Jakarta, Indonesia</div>
            </div>
          </div>
        </div>
        <div class="tentang-testimoni-card">
          <p class="testimoni-title">“Rekomendasi FoodLens Selalu Tepat!”</p>
          <div class="testimoni-desc">Saya sangat mengandalkan rekomendasi dari FoodLens untuk mencoba hidangan baru. Deskripsi yang jelas dan asal makanan yang informatif. Rasanya tidak pernah mengecewakan, selalu sesuai ekspektasi!</div>
          <hr class="testimoni-divider" />
          <div class="testimoni-user">
            <img src="/images/tentang-kami/budi.jpeg" alt="Budi" class="testimoni-img" />
            <div>
              <div class="testimoni-nama">Budi</div>
              <div class="testimoni-loc">Surabaya, Indonesia</div>
            </div>
          </div>
        </div>
        <div class="tentang-testimoni-card">
          <p class="testimoni-title">“Sumber Inspirasi Kuliner Terbaik!”</p>
          <div class="testimoni-desc">FoodLens bukan hanya tentang mencari makanan, tapi juga tentang belajar dan terinspirasi. Saya jadi lebih mengenal kekayaan kuliner Indonesia dan bahkan mencoba memasak beberapa resep otentik yang saya temukan di sini.</div>
          <hr class="testimoni-divider" />
          <div class="testimoni-user">
            <img src="/images/tentang-kami/aisha.avif" alt="Aisha" class="testimoni-img" />
            <div>
              <div class="testimoni-nama">Aisha</div>
              <div class="testimoni-loc">Bandung, Indonesia</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Komponen Footer
function renderTentangKamiFooter() {
  return `
    <footer class="tentang-footer">
      <div class="tentang-footer-container">
        <div class="tentang-footer-logo">
          <div class="logo-row">
            <img src="/images/Logo-App/food_lens_logo.jpg" alt="FoodLens Logo" />
            <span>FOODLENS</span>
          </div>
          <div class="desc">FoodLens adalah platform inovatif yang memanfaatkan teknologi untuk membantu Anda menjelajahi dunia kuliner. Kami berdedikasi untuk memberikan pengalaman pencarian dan penemuan makanan yang cerdas dan memuaskan.</div>
          <div class="sosmed-row">
            <img src="/images/footer-pictures/twitter.png" alt="Twitter" />
            <img src="/images/footer-pictures/facebook.png" alt="Facebook" />
            <img src="/images/footer-pictures/instagram.png" alt="Instagram" />
            <img src="/images/footer-pictures/github.png" alt="Github" />
          </div>
        </div>
        <div class="tentang-footer-pages">
          <h4>Pages</h4>
          <ul>
            <li><a href="#/home">Home</a></li>
            <li><a href="#/kategori">Kategori</a></li>
            <li><a href="#/about">Tentang kami</a></li>
            <li><a href="#/blog">Blog</a></li>
          </ul>
        </div>
        <div class="tentang-footer-ig">
          <h4>Follow Kami di Instagram</h4>
          <div class="ig-grid ig-grid-large">
            <img src="/images/footer-pictures/makanan1.png" alt="Makanan 1" />
            <img src="/images/footer-pictures/makanan2.png" alt="Makanan 2" />
            <img src="/images/footer-pictures/makanan3.png" alt="Makanan 3" />
            <img src="/images/footer-pictures/makanan4.png" alt="Makanan 4" />
          </div>
        </div>
      </div>
      <div class="tentang-footer-copyright">
        &copy; 2025 FoodLens. All rights reserved.
      </div>
    </footer>
  `;
}

export { renderTentangKamiIdentity, renderTentangKamiReach, renderTentangKamiReview, renderTentangKamiFooter };

export default class AboutPage {
  async render() {
    return `
      <section class="tentang-section">
        <div class="tentang-hero">
          <h1 class="tentang-hero-title">Menghubungkan Anda dengan Dunia Rasa dan Cerita Kuliner.</h1>
        </div>
        ${renderTentangKamiIdentity()}
        ${renderTentangKamiReach()}
        ${renderTentangKamiReview()}
        <div id="tentang-kami-footer-container"></div>
      </section>
    `;
  }

  async afterRender() {
    const footerContainer = document.getElementById('tentang-kami-footer-container');
    if (footerContainer) {
      footerContainer.innerHTML = renderTentangKamiFooter();
    }
  }
}
