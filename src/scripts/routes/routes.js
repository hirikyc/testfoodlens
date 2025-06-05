import HomePage from '../pages/home/home-page';
import AboutPage from '../pages/about/about-page';
import LoginPage from '../pages/Auth/login/login-page';
import RegisterPage from '../pages/Auth/register/register.page';
import ForgotPasswordPage from '../pages/Auth/forgot-pass/forgot-password-page';
import ResetPasswordPage from '../pages/Auth/reset-pass/reset-password-page';
import UploadPage from '../pages/upload/upload-page';
import { showKategoriPage } from '../pages/kategori/kategori-page';
import { checkUnauthenticatedRouteOnly, checkAuthenticatedRoute } from '../utils/auth';


const KategoriPage = {
  async render() {
    await showKategoriPage();
    return '';
  },
  async afterRender() {}
};

const routes = {
  '/login': () => checkUnauthenticatedRouteOnly(new LoginPage()),
  '/register': () => checkUnauthenticatedRouteOnly(new RegisterPage()),
  '/forgot-password': () => checkUnauthenticatedRouteOnly(new ForgotPasswordPage()),
  '/reset-password': () => checkUnauthenticatedRouteOnly(new ResetPasswordPage()),

  '/home': () => checkAuthenticatedRoute(new HomePage()),
  '/about': () => checkAuthenticatedRoute(new AboutPage()),
  '/upload': () => checkAuthenticatedRoute(new UploadPage()),
  '/kategori': () => checkAuthenticatedRoute(KategoriPage),
  '/': () => checkAuthenticatedRoute(new HomePage()),
};
export default routes;

