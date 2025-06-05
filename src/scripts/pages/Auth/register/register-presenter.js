export default class RegisterPresenter {
  #view;
  #model;
  #authModel;

  constructor({ view, model, authModel }) {
    this.#view = view;
    this.#model = model;
    this.#authModel = authModel;
  }

  async register({ email, password }) {
    this.#view.showSubmitLoadingButton();
    try {
      const response = await this.#model.register({ email, password });
      if (!response.ok) {
        this.#view.registerFailed(response.message);
        return;
      }
      this.#authModel.putAccessToken(response.data.accessToken);
      this.#view.registerSuccessfully(response.message, response.data);
    } catch (error) {
      this.#view.registerFailed(error.message);
    } finally {
      this.#view.hideSubmitLoadingButton();
    }
  }
}

