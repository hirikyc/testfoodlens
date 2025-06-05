const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const FoodLensLoginAPI = {
  async getLogin({ email, password }) {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      return {
        ok: response.ok,
        message: data.message,
        data: data.data,
      };
    } catch (error) {
      return {
        ok: false,
        message: error.message,
        data: null,
      };
    }
  },
  async register({ email, password }) {
    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      return {
        ok: response.ok,
        message: data.message,
        data: data.data,
      };
    } catch (error) {
      return {
        ok: false,
        message: error.message,
        data: null,
      };
    }
  },
  async forgotPassword({ email }) {
    try {
      const response = await fetch(`${BASE_URL}/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      return {
        ok: response.ok,
        message: data.message,
        data: data.data,
      };
    } catch (error) {
      return {
        ok: false,
        message: error.message,
        data: null,
      };
    }
  },
  async resetPassword({ token, password }) {
    try {
      const response = await fetch(`${BASE_URL}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const data = await response.json();
      return {
        ok: response.ok,
        message: data.message,
        data: data.data,
      };
    } catch (error) {
      return {
        ok: false,
        message: error.message,
        data: null,
      };
    }
  },
};

export default FoodLensLoginAPI;
