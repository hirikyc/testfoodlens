export default class HomePresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  renderFoods() {
    const foods = this.#model.getExampleFoods();
    this.#view.showFoods(foods);
  }
}
