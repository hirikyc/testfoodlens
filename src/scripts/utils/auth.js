import { getActiveRoute } from '../routes/url-parser';
import { ACCESS_TOKEN_KEY } from '../config';

export function getAccessToken() {
  try {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (accessToken === 'null' || accessToken === 'undefined') {
      return null;
    }

    return accessToken;
  } catch (error) {
    console.error('getAccessToken: error:', error);
    return null;
  }
}

export function putAccessToken(token) {
  try {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
    return true;
  } catch (error) {
    console.error('putAccessToken: error:', error);
    return false;
  }
}

export function removeAccessToken() {
  try {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    return true;
  } catch (error) {
    console.error('getLogout: error:', error);
    return false;
  }
}

const unauthenticatedRoutesOnly = ['/login', '/register'];

export function checkUnauthenticatedRouteOnly(page) {
  const url = getActiveRoute();
  const isLogin = !!getAccessToken();

  if (unauthenticatedRoutesOnly.includes(url) && isLogin) {
    location.hash = '/';
    return null;
  }

  return page;
}

export function checkAuthenticatedRoute(page) {
  const isLogin = !!getAccessToken();

  if (!isLogin) {
    location.hash = '/login';
    return null;
  }

  return page;
}

export function getLogout() {
  removeAccessToken();
}

// Toggle show/hide password dan event signup/login ala CodingLab
export function setupPasswordToggleAndFormSwitch() {
  const pwShowHide = document.querySelectorAll('.pw_hide');
  const formContainer = document.querySelector('.form_container');
  const signupBtn = document.querySelector('#signup');
  const loginBtn = document.querySelector('#login');

  pwShowHide.forEach((icon) => {
    icon.addEventListener('click', () => {
      // Cari input password yang terkait langsung dengan icon
      let getPwInput = icon.previousElementSibling;
      if (!getPwInput || getPwInput.tagName !== 'INPUT') {
        // fallback: cari input di parent
        getPwInput = icon.parentElement.querySelector('input[type="password"], input[type="text"]');
      }
      if (!getPwInput) return;
      if (getPwInput.type === 'password') {
        getPwInput.type = 'text';
        icon.classList.remove('uil-eye-slash');
        icon.classList.add('uil-eye');
      } else {
        getPwInput.type = 'password';
        icon.classList.remove('uil-eye');
        icon.classList.add('uil-eye-slash');
      }
    });
  });

  if (signupBtn && formContainer) {
    signupBtn.addEventListener('click', (e) => {
      e.preventDefault();
      formContainer.classList.add('active');
    });
  }
  if (loginBtn && formContainer) {
    loginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      formContainer.classList.remove('active');
    });
  }
}
