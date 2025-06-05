import RegisterPresenter from './register-presenter';
import * as AuthModel from '../../../utils/auth';
import FoodLensLoginAPI from '../../../data/FoodLensLoginAPI';

export default class RegisterPage {
  #presenter = null;

  async render() {
    document.body.classList.remove('signin-bg');
    document.body.classList.add('signup-bg');
    return `
      <div class="login-brand" style="text-align:center;margin-bottom:18px;">
        <img src="/images/Logo-App/food_lens_logo.jpg" alt="FoodLens Logo" class="food-lens-logo" style="width:56px;height:56px;object-fit:cover;border-radius:12px;" />
        <div class="brand-name" style="font-size:1.5rem;font-weight:700;color:#2196f3;margin-top:8px;">FOODLENS</div>
      </div>
      <div class="wrapper">
        <form id="register-form">
          <h1>Register</h1>
          <div class="input-box">
            <label for="register-email" class="visually-hidden">Email</label>
            <input type="email" id="register-email" placeholder="Email" required />
            <i class="bx bx-envelope"></i>
          </div>
          <div class="input-box">
            <label for="register-password" class="visually-hidden">Password</label>
            <input type="password" id="register-password" placeholder="Password" required />
            <i class="bx bx-lock"></i>
          </div>
          <div class="input-box">
            <label for="register-confirm-password" class="visually-hidden">Confirm Password</label>
            <input type="password" id="register-confirm-password" placeholder="Confirm Password" required />
            <i class="bx bx-lock"></i>
          </div>
          <div id="register-error" class="register-error" style="display: none; color: red;"></div>
          <div id="submit-button-container">
            <button type="submit" class="btn">Register</button>
          </div>
          <div class="register-link">
            <p>Already have an account? <a href="#/login">Login</a></p>
          </div>
        </form>
      </div>
    `;
  }

  async afterRender() {
    document.body.classList.remove('signin-bg');
    document.body.classList.add('signup-bg');
    this.#presenter = new RegisterPresenter({
      view: this,
      model: FoodLensLoginAPI,
      authModel: AuthModel,
    });
    document.getElementById('register-form').addEventListener('submit', async (event) => {
      event.preventDefault();
      const email = document.getElementById('register-email')?.value;
      const password = document.getElementById('register-password')?.value;
      const confirmPassword = document.getElementById('register-confirm-password')?.value;
      const errorDiv = document.getElementById('register-error');
      if (!email || !password || !confirmPassword || !errorDiv) {
        console.error('One or more elements are missing in the DOM.');
        return;
      }
      if (password !== confirmPassword) {
        errorDiv.textContent = 'Passwords do not match!';
        errorDiv.style.display = 'block';
        return;
      }
      errorDiv.style.display = 'none';
      await this.#presenter.register({ email, password });
    });
    this.initPasswordToggle();
  }

  initPasswordToggle() {
    document.querySelectorAll('.input-group').forEach((group) => {
      const iconElement = group.querySelector('.pw_hide');
      if (!iconElement) return;
      iconElement.addEventListener('click', () => {
        const inputElement = group.querySelector('input');
        if (!inputElement) return;
        if (inputElement.type === 'password') {
          inputElement.type = 'text';
          iconElement.src = 'https://cdn-icons-png.flaticon.com/512/709/709612.png'; 
        } else {
          inputElement.type = 'password';
          iconElement.src = 'https://cdn-icons-png.flaticon.com/512/2767/2767146.png'; 
        }
      });
    });
  }

  showSubmitLoadingButton() {
    document.getElementById('submit-button-container').innerHTML = `
      <button class="btn btn-primary" type="submit" disabled>
        <i class="fas fa-spinner loader-button"></i> Signup Now
      </button>
    `;
  }

  hideSubmitLoadingButton() {
    document.getElementById('submit-button-container').innerHTML = `
      <button class="btn btn-primary" type="submit">Signup Now</button>
    `;
  }

  showNotification(message) {
    if (window.Notification) {
      if (Notification.permission === 'granted') {
        new Notification(message || 'Registrasi berhasil!');
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification(message || 'Registrasi berhasil!');
          }
        });
      }
    }
  }

  registerSuccessfully(message) {
    document.body.classList.remove('signup-bg');
    this.showNotification(message || 'Registrasi berhasil!');
    if (window.renderNavbar) window.renderNavbar();
    location.hash = '/home';
  }

  registerFailed(message) {
    const errorDiv = document.getElementById('register-error');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
  }
}
