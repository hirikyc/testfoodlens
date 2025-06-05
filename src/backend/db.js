const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',         
  host: 'localhost',
  database: 'foodlens_db',     
  password: 'Husen28082005',     
  port: 5432,
});

module.exports = pool;