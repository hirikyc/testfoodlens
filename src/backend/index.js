const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const pool = require('./db');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Middleware untuk autentikasi token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided', data: null });
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token', data: null });
    req.user = user;
    next();
  });
};

// LOGIN
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    const user = result.rows[0];
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
      res.json({
        message: 'Login successful',
        data: {
          id: user.id,
          email: user.email,
          username: user.username, 
          accessToken: token
        }
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials', data: null });
    }
  } catch (err) {
    res.status(500).json({ message: err.message, data: null });
  }
});

// REGISTER
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body; 
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const check = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (check.rows.length > 0) {
      return res.status(400).json({ message: 'Email already registered', data: null });
    }
    const result = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email',
      [email, hashedPassword] 
    );
    res.status(201).json({ message: 'Register successful', data: result.rows[0] });
  } catch (err) {
    res.status(400).json({ message: err.message, data: null });
  }
});

// FORGOT PASSWORD
app.post('/api/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    if (!user) {
      return res.json({ message: 'If this email is registered, a reset link has been sent.', data: null });
    }
    const resetToken = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '15m' });
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const resetLink = `http://localhost:5173/#/reset-password?token=${resetToken}`;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'FoodLens Password Reset',
      html: `<p>Click the link below to reset your password:</p><a href="${resetLink}">${resetLink}</a>`
    });
    res.json({ message: 'If this email is registered, a reset link has been sent.', data: null });
  } catch (err) {
    res.status(500).json({ message: 'Failed to send reset link', data: null });
  }
});

// RESET PASSWORD
app.post('/api/reset-password', async (req, res) => {
  const { token, password } = req.body;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, decoded.id]);
    res.json({ message: 'Password reset successful', data: null });
  } catch (err) {
    console.error('RESET PASSWORD ERROR:', err); // Tambah log error detail
    res.status(400).json({ message: 'Invalid or expired token', data: null });
  }
});

// Contoh endpoint yang butuh autentikasi
app.get('/api/home', authenticateToken, (req, res) => {
  res.json({ message: 'Welcome to Home!', user: req.user });
});

// Ambil semua kategori makanan
app.get('/api/kategori', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM kategori_makanan');
    res.json({ message: 'Success', data: result.rows });
  } catch (err) {
    res.status(500).json({ message: err.message, data: null });
  }
});

// Ambil makanan berdasarkan kategori (termasuk relasi banyak ke banyak)
app.get('/api/makanan', async (req, res) => {
  const kategoriId = req.query.kategori_id;
  try {
    let result;
    if (kategoriId) {
      result = await pool.query(
        `SELECT m.nama_makanan, m.deskripsi, m.gambar
         FROM makanan m
         JOIN makanan_kategori mk ON m.id = mk.makanan_id
         WHERE mk.kategori_id = $1`,
        [kategoriId]
      );
    } else {
      result = await pool.query('SELECT nama_makanan, deskripsi, gambar FROM makanan');
    }
    res.json({ message: 'Success', data: result.rows });
  } catch (err) {
    res.status(500).json({ message: err.message, data: null });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});