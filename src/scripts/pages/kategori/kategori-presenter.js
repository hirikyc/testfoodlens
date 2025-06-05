import KategoriModel from './kategori-model';
import KategoriView from './kategori-view';
import { renderTentangKamiFooter } from '../about/about-page';

export default class KategoriPresenter {
  constructor(root) {
    this.model = new KategoriModel();
    this.view = new KategoriView(root);
  }

  async init() {
    this.view.renderSkeleton();
    const kategoriList = await this.model.fetchKategoriList();
    this.view.renderKategoriFilter(kategoriList, this.handleFilterClick.bind(this));
    await this.showAllMakanan();
    this.view.renderFooter(renderTentangKamiFooter());
  }

  async handleFilterClick(kategoriId, btn) {
    this.view.setActiveFilterButton(btn);
    if (kategoriId) {
      const makananList = await this.model.fetchMakananByKategori(kategoriId);
      this.view.renderMakananGrid(makananList);
    } else {
      await this.showAllMakanan();
    }
  }

  async showAllMakanan() {
    const makananList = await this.model.fetchSemuaMakanan();
    this.view.renderMakananGrid(makananList);
  }
}
