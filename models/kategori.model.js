
const pool = require('../config/database');

const KategoriModel = {
  getAll: async () => {
    const [rows] = await pool.execute(
      'SELECT id_kategori, nama_kategori FROM kategori'
    );

    return rows;
  }
};

module.exports = KategoriModel;
