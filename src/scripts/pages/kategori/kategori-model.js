export default class KategoriModel {
  async fetchKategoriList() {
    const res = await fetch('http://localhost:5000/api/kategori');
    const data = await res.json();
    return data.data;
  }

  async fetchMakananByKategori(kategoriId) {
    const res = await fetch(`http://localhost:5000/api/makanan?kategori_id=${kategoriId}`);
    const data = await res.json();
    return data.data;
  }

  async fetchSemuaMakanan() {
    const res = await fetch('http://localhost:5000/api/makanan');
    const data = await res.json();
    return data.data;
  }
}
