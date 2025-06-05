import { renderTentangKamiIdentity, renderTentangKamiReach, renderTentangKamiReview, renderTentangKamiFooter } from './about-page.js';

function renderAboutPageModular() {
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

function afterRenderAboutPage() {
  const footerContainer = document.getElementById('tentang-kami-footer-container');
  if (footerContainer) {
    footerContainer.innerHTML = renderTentangKamiFooter();
  }
}

export { renderAboutPageModular, afterRenderAboutPage };
