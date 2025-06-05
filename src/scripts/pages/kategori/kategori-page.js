import { renderTentangKamiFooter } from '../about/about-page';
import KategoriPresenter from './kategori-presenter';

// Fungsi untuk fetch kategori dari backend
async function fetchKategoriList() {
  const res = await fetch('http://localhost:5000/api/kategori');
  const data = await res.json();
  return data.data;
}

// Fungsi untuk fetch makanan berdasarkan kategori dari backend
async function fetchMakananByKategori(kategoriId) {
  const res = await fetch(`http://localhost:5000/api/makanan?kategori_id=${kategoriId}`);
  const data = await res.json();
  return data.data;
}

// Fungsi utama render halaman kategori makanan
async function renderKategoriPage() {
  // Ambil kategori dari backend
  const kategoriList = await fetchKategoriList();

  // Buat fragment agar navbar dan footer tetap tampil
  const fragment = document.createDocumentFragment();

  // Konten utama kategori
  const container = document.createElement('div');
  container.className = 'kategori-section';

  const title = document.createElement('h1');
  title.textContent = 'KATEGORI MAKANAN';
  title.className = 'kategori-title';
  container.appendChild(title);

  const subtitle = document.createElement('p');
  subtitle.textContent = 'Jelajahi pilihan hidangan dan minuman lengkap, dari sarapan hingga makanan penutup.';
  subtitle.className = 'kategori-subtitle';
  container.appendChild(subtitle);

  // Filter button
  const filterRow = document.createElement('div');
  filterRow.className = 'kategori-filter-row';

  const semuaBtn = document.createElement('button');
  semuaBtn.textContent = 'Semua';
  semuaBtn.className = 'kategori-filter-btn active';
  filterRow.appendChild(semuaBtn);

  kategoriList.forEach((kategori) => {
    if (kategori.nama_kategori.toLowerCase().includes('minuman')) return; // skip minuman
    const btn = document.createElement('button');
    btn.textContent = kategori.nama_kategori;
    btn.className = 'kategori-filter-btn';
    btn.onclick = async () => {
      document.querySelectorAll('.kategori-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderMakananGrid(kategori.id);
    };
    filterRow.appendChild(btn);
  });
  semuaBtn.onclick = () => {
    document.querySelectorAll('.kategori-filter-btn').forEach(b => b.classList.remove('active'));
    semuaBtn.classList.add('active');
    renderMakananGrid();
  };
  container.appendChild(filterRow);

  const makananGrid = document.createElement('div');
  makananGrid.className = 'kategori-makanan-grid';
  container.appendChild(makananGrid);

  async function renderMakananGrid(kategoriId) {
    makananGrid.innerHTML = '<div style="text-align:center;padding:32px;">Loading...</div>';
    let makananList = [];
    if (kategoriId) {
      makananList = await fetchMakananByKategori(kategoriId);
    } else {
      const res = await fetch('http://localhost:5000/api/makanan');
      const data = await res.json();
      makananList = data.data;
    }
    makananGrid.innerHTML = '';
    if (!makananList.length) {
      makananGrid.innerHTML = '<div style="text-align:center;padding:32px;">Tidak ada makanan ditemukan.</div>';
      return;
    }
    makananList.forEach(makanan => {
      const card = document.createElement('div');
      card.className = 'kategori-makanan-card';
      let imgSrc = '/images/gambar-kategori-makanan/' + (makanan.gambar ? makanan.gambar : '');
      if (!makanan.gambar) {
        imgSrc = '/images/icon/menu.png';
      }
      const img = document.createElement('img');
      img.src = imgSrc;
      img.alt = makanan.nama_makanan;
      card.appendChild(img);
      const nama = document.createElement('h3');
      nama.textContent = makanan.nama_makanan;
      card.appendChild(nama);
      if (makanan.lokasi) {
        const lokasi = document.createElement('div');
        lokasi.textContent = makanan.lokasi;
        lokasi.className = 'kategori-makanan-lokasi';
        card.appendChild(lokasi);
      }
      if (makanan.deskripsi) {
        const desc = document.createElement('p');
        desc.textContent = makanan.deskripsi;
        card.appendChild(desc);
      }
      makananGrid.appendChild(card);
    });
  }

  await renderMakananGrid();

  fragment.appendChild(container);

  const footerWrapper = document.createElement('div');
  footerWrapper.innerHTML = renderTentangKamiFooter();
  fragment.appendChild(footerWrapper.firstElementChild);

  return fragment;
}

export async function showKategoriPage() {
  if (window.renderNavbar) window.renderNavbar();
  const root = document.getElementById('main-content');
  if (!root) return;
  root.innerHTML = '';
  const presenter = new KategoriPresenter(root);
  await presenter.init();
}