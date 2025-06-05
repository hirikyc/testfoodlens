import FoodLensLoginAPI from '../../../data/FoodLensLoginAPI';

export default class ForgotPasswordPage {
  async render() {
    document.body.classList.remove('signup-bg');
    document.body.classList.add('signin-bg');
    return `
      <div class="login-brand" style="text-align:center;margin-bottom:18px;">
        <img src="/images/Logo-App/food_lens_logo.jpg" alt="FoodLens Logo" class="food-lens-logo" style="width:56px;height:56px;object-fit:cover;border-radius:12px;" />
        <div class="brand-name" style="font-size:1.5rem;font-weight:700;color:#2196f3;margin-top:8px;">FOODLENS</div>
      </div>
      <div class="wrapper">
        <form id="forgot-password-form">
          <h1>Forgot Password</h1>
          <div class="input-box">
            <label for="forgot-email-input" class="visually-hidden">Email</label>
            <input type="email" id="forgot-email-input" required placeholder="Enter your email" />
            <i class="bx bx-envelope"></i>
          </div>
          <div id="forgot-error" class="login-error"></div>
          <div id="submit-button-container">
            <button class="btn" type="submit">Send Reset Link</button>
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
    document.getElementById('forgot-password-form').addEventListener('submit', async (event) => {
      event.preventDefault();
      const email = document.getElementById('forgot-email-input').value;
      const errorDiv = document.getElementById('forgot-error');
      errorDiv.style.display = 'none';
      this.showSubmitLoadingButton();
      const response = await FoodLensLoginAPI.forgotPassword({ email });
      this.hideSubmitLoadingButton();
      if (response.ok) {
        errorDiv.textContent = 'If this email is registered, a reset link has been sent.';
        errorDiv.style.color = '#3b82f6';
      } else {
        errorDiv.textContent = response.message || 'Failed to send reset link.';
        errorDiv.style.color = '#e74c3c';
      }
      errorDiv.style.display = 'block';
    });
  }

  showSubmitLoadingButton() {
    document.getElementById('submit-button-container').innerHTML = `
      <button class="btn btn-primary" type="submit" disabled>
        <i class="fas fa-spinner loader-button"></i> Sending...
      </button>
    `;
  }

  hideSubmitLoadingButton() {
    document.getElementById('submit-button-container').innerHTML = `
      <button class="btn btn-primary" type="submit">Send Reset Link</button>
    `;
  }
}
