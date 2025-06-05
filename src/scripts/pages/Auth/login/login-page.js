import LoginPresenter from './login-presenter';
import * as AuthModel from '../../../utils/auth';
import FoodLensLoginAPI from '../../../data/FoodLensLoginAPI';

export default class LoginPage {
  #presenter = null;

  async render() {
    document.body.classList.remove('signup-bg');
    document.body.classList.add('signin-bg');
    return `
      <div class="login-brand" style="text-align:center;margin-bottom:18px;">
        <img src="/images/Logo-App/food_lens_logo.jpg" alt="FoodLens Logo" class="food-lens-logo" style="width:56px;height:56px;object-fit:cover;border-radius:12px;" />
        <div class="brand-name" style="font-size:1.5rem;font-weight:700;color:#2196f3;margin-top:8px;">FOODLENS</div>
      </div>
      <div class="wrapper">
        <form id="login-form">
          <h1>Login</h1>
          <div class="input-box">
            <label for="login-email" class="visually-hidden">Email</label>
            <input type="email" id="login-email" placeholder="Email" required />
            <i class="bx bx-envelope"></i>
          </div>
          <div class="input-box">
            <label for="login-password" class="visually-hidden">Password</label>
            <input type="password" id="login-password" placeholder="Password" required />
            <i class="bx bx-lock"></i>
          </div>
          <div class="remember-forgot">
            <label><input type="checkbox" id="remember-me">Remember Me</label>
            <a href="#/forgot-password">Forgot Password?</a>
          </div>
          <div id="submit-button-container">
            <button type="submit" class="btn">Login</button>
          </div>
          <div class="register-link">
            <p>Don't have an account? <a href="#/register">Register Now</a></p>
          </div>
        </form>
      </div>
    `;
  }

  async afterRender() {
    document.body.classList.remove('signup-bg');
    document.body.classList.add('signin-bg');
    this.#presenter = new LoginPresenter({
      view: this,
      model: FoodLensLoginAPI,
      authModel: AuthModel,
    });
    this.#setupForm();
    this.initPasswordToggle();
  }

  initPasswordToggle() {
    document.querySelectorAll('.input-group').forEach((group) => {
      const iconElement = group.querySelector('.pw_hide');
      if (!iconElement) return;
      iconElement.addEventListener('click', () => {
        const inputElement = group.querySelector('input');
        if (!inputElement) return;
        // Simpan style agar tidak berubah saat type diubah
        const style = inputElement.getAttribute('style');
        if (inputElement.type === 'password') {
          inputElement.type = 'text';
          iconElement.src = 'https://cdn-icons-png.flaticon.com/512/709/709612.png'; // show
        } else {
          inputElement.type = 'password';
          iconElement.src = 'https://cdn-icons-png.flaticon.com/512/2767/2767146.png'; // hide
        }
        if (style) inputElement.setAttribute('style', style); // restore style
      });
    });
  }

  #setupForm() {
    document.getElementById('login-form').addEventListener('submit', async (event) => {
      event.preventDefault();
      const data = {
        email: document.getElementById('login-email').value,
        password: document.getElementById('login-password').value,
      };
      await this.#presenter.getLogin(data);
    });
  }

  loginSuccessfully(message) {
    document.body.classList.remove('signin-bg');
    if (window.renderNavbar) window.renderNavbar();
    location.hash = '/home';
  }

  loginFailed(message) {
    alert(message);
  }

  showSubmitLoadingButton() {
    document.getElementById('submit-button-container').innerHTML = `
      <button class="btn btn-primary" type="submit" disabled>
        <i class="fas fa-spinner loader-button"></i> Sign in
      </button>
    `;
  }

  hideSubmitLoadingButton() {
    document.getElementById('submit-button-container').innerHTML = `
      <button class="btn btn-primary" type="submit">Sign in</button>
    `;
  }
}
