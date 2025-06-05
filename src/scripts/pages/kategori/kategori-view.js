export default class KategoriView {
  constructor(root) {
    this.root = root;
  }

  renderSkeleton() {
    this.root.innerHTML = `
      <div class="kategori-section">
        <h1 class="kategori-title">KATEGORI MAKANAN</h1>
        <p class="kategori-subtitle">Jelajahi pilihan hidangan dan minuman lengkap, dari sarapan hingga makanan penutup.</p>
        <div class="kategori-filter-row" id="kategori-filter-row"></div>
        <div class="kategori-makanan-grid" id="kategori-makanan-grid"></div>
      </div>
      <div id="kategori-footer"></div>
    `;
  }

  renderKategoriFilter(kategoriList, onFilterClick) {
    const filterRow = this.root.querySelector('#kategori-filter-row');
    filterRow.innerHTML = '';
    const semuaBtn = document.createElement('button');
    semuaBtn.textContent = 'Semua';
    semuaBtn.className = 'kategori-filter-btn active';
    semuaBtn.onclick = () => onFilterClick(null, semuaBtn);
    filterRow.appendChild(semuaBtn);

    kategoriList.forEach((kategori) => {
      if (kategori.nama_kategori.toLowerCase().includes('minuman')) return;
      const btn = document.createElement('button');
      btn.textContent = kategori.nama_kategori;
      btn.className = 'kategori-filter-btn';
      btn.onclick = () => onFilterClick(kategori.id, btn);
      filterRow.appendChild(btn);
    });
  }

  setActiveFilterButton(btn) {
    this.root.querySelectorAll('.kategori-filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }

  renderMakananGrid(makananList) {
    const grid = this.root.querySelector('#kategori-makanan-grid');
    if (!makananList.length) {
      grid.innerHTML = '<div style="text-align:center;padding:32px;">Tidak ada makanan ditemukan.</div>';
      return;
    }
    grid.innerHTML = '';
    makananList.forEach(makanan => {
      const card = document.createElement('div');
      card.className = 'kategori-makanan-card';
      let imgSrc = '/images/gambar-kategori-makanan/' + (makanan.gambar ? makanan.gambar : '');
      if (!makanan.gambar) imgSrc = '/images/icon/menu.png';
      card.innerHTML = `
        <img src="${imgSrc}" alt="${makanan.nama_makanan}">
        <h3>${makanan.nama_makanan}</h3>
        ${makanan.lokasi ? `<div class="kategori-makanan-lokasi">${makanan.lokasi}</div>` : ''}
        ${makanan.deskripsi ? `<p>${makanan.deskripsi}</p>` : ''}
      `;
      grid.appendChild(card);
    });
  }

  renderFooter(html) {
    this.root.querySelector('#kategori-footer').innerHTML = html;
  }
}
