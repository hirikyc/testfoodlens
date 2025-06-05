// filepath: src/scripts/pages/Auth/forgot-pass/reset-password-page.js
import FoodLensLoginAPI from '../../../data/FoodLensLoginAPI';

export default class ResetPasswordPage {
  async render() {
    document.body.classList.remove('signup-bg');
    document.body.classList.add('signin-bg');
    return `
      <div class="login-brand" style="text-align:center;margin-bottom:18px;">
        <img src="/images/Logo-App/food_lens_logo.jpg" alt="FoodLens Logo" class="food-lens-logo" style="width:56px;height:56px;object-fit:cover;border-radius:12px;" />
        <div class="brand-name" style="font-size:1.5rem;font-weight:700;color:#2196f3;margin-top:8px;">FOODLENS</div>
      </div>
      <div class="wrapper">
        <form id="reset-password-form">
          <h1>Reset Password</h1>
          <div class="input-box">
            <label for="reset-password" class="visually-hidden">New password</label>
            <input type="password" id="reset-password" required placeholder="New password" />
            <i class="bx bx-lock"></i>
          </div>
          <div class="input-box">
            <label for="reset-confirm-password" class="visually-hidden">Confirm new password</label>
            <input type="password" id="reset-confirm-password" required placeholder="Confirm new password" />
            <i class="bx bx-lock"></i>
          </div>
          <div id="reset-error" class="login-error"></div>
          <div id="submit-button-container">
            <button class="btn" type="submit">Reset Password</button>
          </div>
          <div class="register-link">
            <p>Remembered? <a href="#/login">Login</a></p>
          </div>
        </form>
      </div>
    `;
  }

  async afterRender() {
    document.body.classList.remove('signup-bg');
    document.body.classList.add('signin-bg');
    const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
    const token = urlParams.get('token');
    const errorDiv = document.getElementById('reset-error');
    const submitButton = document.querySelector('#submit-button-container button');
    if (!token) {
      errorDiv.textContent = 'Invalid or missing token. Please use the reset link from your email.';
      errorDiv.style.display = 'block';
      errorDiv.style.color = '#e74c3c';
      if (submitButton) submitButton.disabled = true;
      return;
    }
    document.getElementById('reset-password-form').addEventListener('submit', async (event) => {
      event.preventDefault();
      const password = document.getElementById('reset-password').value;
      const confirmPassword = document.getElementById('reset-confirm-password').value;
      errorDiv.style.display = 'none';
      if (password !== confirmPassword) {
        errorDiv.textContent = 'Passwords do not match!';
        errorDiv.style.display = 'block';
        errorDiv.style.color = '#e74c3c';
        return;
      }
      this.showSubmitLoadingButton();
      const response = await FoodLensLoginAPI.resetPassword({ token, password });
      this.hideSubmitLoadingButton();
      if (response.ok) {
        errorDiv.textContent = 'Password reset successful. Please login.';
        errorDiv.style.display = 'block';
        errorDiv.style.color = '#3b82f6';
        setTimeout(() => { location.hash = '/login'; }, 2000);
      } else {
        errorDiv.textContent = response.message || 'Failed to reset password.';
        errorDiv.style.display = 'block';
        errorDiv.style.color = '#e74c3c';
      }
    });
  }

  showSubmitLoadingButton() {
    document.getElementById('submit-button-container').innerHTML = `
      <button class="btn btn-primary" type="submit" disabled>
        <i class="fas fa-spinner loader-button"></i> Resetting...
      </button>
    `;
  }

  hideSubmitLoadingButton() {
    document.getElementById('submit-button-container').innerHTML = `
      <button class="btn btn-primary" type="submit">Reset Password</button>
    `;
  }
}
