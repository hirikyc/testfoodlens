import '../styles/styles.css';
import App from './pages/app';
import { getAccessToken, getLogout } from './utils/auth';

document.addEventListener('DOMContentLoaded', async () => {
  const app = new App({
    content: document.querySelector('#main-content'),
    drawerButton: null, 
    navigationDrawer: null,
  });

  function getCleanHash() {
    const hash = location.hash.replace('#', '');
    return hash.split('?')[0];
  }

  function renderNavbar() {
    const navbarRoot = document.getElementById('navbar-root');
    if (!navbarRoot) return;
    const hash = getCleanHash();

    if (getAccessToken() && hash !== '/login' && hash !== '/register') {
      navbarRoot.innerHTML = `
      <header>
        <div class="main-header container">
          <div class="brand-group">
            <img src="/images/Logo-App/food_lens_logo.jpg" alt="FoodLens Logo" class="food-lens-logo" />
            <a class="brand-name" href="#/">FOODLENS</a>
          </div>
          <button id="drawer-button" class="drawer-button" aria-label="Menu">☰</button>
          <nav id="navbar-desktop" class="navbar-desktop">
            <ul class="nav-list-desktop">
              <li><a href="#/home"><img src="/images/icon/home.png" alt="Home" style="width:20px;height:20px;margin-right:8px;vertical-align:middle;"/>HOME</a></li>
              <li><a href="#/kategori"><img src="/images/icon/menu.png" alt="Kategori" style="width:20px;height:20px;margin-right:8px;vertical-align:middle;"/>KATEGORI</a></li>
              <li><a href="#/about"><img src="/images/icon/about.png" alt="Tentang Kami" style="width:20px;height:20px;margin-right:8px;vertical-align:middle;"/>TENTANG KAMI</a></li>
              <li><button class="button logout-desktop" id="logout-btn-desktop"><img src="https://cdn-icons-png.flaticon.com/512/4400/4400629.png" alt="Logout" style="width:18px;height:18px;vertical-align:middle;margin-right:6px;">Logout</button></li>
            </ul>
          </nav>
          <nav id="navigation-drawer" class="navigation-drawer">
            <ul id="nav-list" class="nav-list">
              <li><a href="#/home"><img src="/images/icon/home.png" alt="Home" style="width:20px;height:20px;margin-right:8px;vertical-align:middle;"/>HOME</a></li>
              <li><a href="#/kategori"><img src="/images/icon/menu.png" alt="Kategori" style="width:20px;height:20px;margin-right:8px;vertical-align:middle;"/>KATEGORI</a></li>
              <li><a href="#/about"><img src="/images/icon/about.png" alt="Tentang Kami" style="width:20px;height:20px;margin-right:8px;vertical-align:middle;"/>TENTANG KAMI</a></li>
              <li><button class="button logout-mobile" id="logout-btn-mobile"><img src="https://cdn-icons-png.flaticon.com/512/4400/4400629.png" alt="Logout" style="width:18px;height:18px;vertical-align:middle;margin-right:6px;">Logout</button></li>
            </ul>
          </nav>
        </div>
      </header>
      `;
      // Setup drawer logic ulang
      const drawerButton = document.getElementById('drawer-button');
      const navigationDrawer = document.getElementById('navigation-drawer');
      if (drawerButton && navigationDrawer) {
        drawerButton.addEventListener('click', () => {
          navigationDrawer.classList.toggle('open');
        });
        document.body.addEventListener('click', (event) => {
          if (
            !navigationDrawer.contains(event.target) &&
            !drawerButton.contains(event.target)
          ) {
            navigationDrawer.classList.remove('open');
          }
          navigationDrawer.querySelectorAll('a').forEach((link) => {
            if (link.contains(event.target)) {
              navigationDrawer.classList.remove('open');
            }
          });
        });
      }
      // Logout logic
      const logoutButton = document.getElementById('logout-btn');
      if (logoutButton) {
        logoutButton.addEventListener('click', () => {
          getLogout();
          location.hash = '/login';
          renderNavbar();
        });
      }
      const logoutBtnDesktop = document.getElementById('logout-btn-desktop');
      if (logoutBtnDesktop) {
        logoutBtnDesktop.addEventListener('click', () => {
          getLogout();
          location.hash = '/login';
          renderNavbar();
        });
      }
      const logoutBtnMobile = document.getElementById('logout-btn-mobile');
      if (logoutBtnMobile) {
        logoutBtnMobile.addEventListener('click', () => {
          getLogout();
          location.hash = '/login';
          renderNavbar();
        });
      }
    } else {
      navbarRoot.innerHTML = '';
    }
  }

  function setBodyClass() {
    const hash = getCleanHash();
    const body = document.body;
    body.className = '';
    if (hash === '/login') {
      body.classList.add('login-page');
    } else if (hash === '/register') {
      body.classList.add('register-page');
    } else if (hash === '/forgot-password') {
      body.classList.add('forgot-password-page');
    } else if (hash === '/reset-password') {
      body.classList.add('reset-password-page');
    } else {
      body.classList.add('home-page');
    }
  }

  window.renderNavbar = renderNavbar;

  async function handleRouteChange() {
    if (document.startViewTransition) {
      document.startViewTransition(async () => {
        setBodyClass();
        await app.renderPage();
        renderNavbar();
      });
    } else {
      setBodyClass();
      await app.renderPage();
      renderNavbar();
    }
  }

  window.addEventListener('hashchange', handleRouteChange);

  await handleRouteChange();
});
