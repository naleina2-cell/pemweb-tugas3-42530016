
const pool = require('../config/database');

const BukuModel = {
  // Menghitung jumlah buku
  getJumlah: async () => {
    const [rows] = await pool.execute(
      'SELECT COUNT(*) AS jumlahBuku FROM buku'
    );
    return rows[0].jumlahBuku;
  },

  // Mengambil seluruh data buku dan kategorinya
  getAll: async () => {
    const [rows] = await pool.execute(`
      SELECT
        b.id_buku,
        b.judul,
        b.penulis,
        b.tahun_terbit,
        b.deskripsi,
        b.status_buku,
        k.nama_kategori AS kategori
      FROM buku b
      LEFT JOIN kategori k
        ON b.id_kategori = k.id_kategori
      ORDER BY b.id_buku DESC
    `);
    return rows;
  },

  // Mengambil satu buku berdasarkan ID
  getById: async (id) => {
    const [rows] = await pool.execute(
      'SELECT * FROM buku WHERE id_buku = ?',
      [id]
    );
    return rows[0];
  },

  // Menambahkan buku baru
  create: async (data) => {
    const sql = `
      INSERT INTO buku
      (judul, penulis, tahun_terbit, id_kategori, deskripsi, status_buku)
      VALUES (?, ?, ?, ?, ?,?)
    `;

    const [result] = await pool.execute(sql, [
      data.judul,
      data.penulis,
      data.tahun_terbit,
      data.id_kategori,
      data.deskripsi ?? null,
      data.status_buku ?? 'Tersedia'
    ]);

    return result;
  },

  // Memperbarui data buku
  update: async (id, data) => {
    const sql = `
      UPDATE buku
      SET judul = ?, penulis = ?,
          tahun_terbit = ?, id_kategori = ?, deskripsi = ?, status_buku = ?
      WHERE id_buku = ?
    `;

    const [result] = await pool.execute(sql, [
      data.judul,
      data.penulis,
      data.tahun_terbit,
      data.id_kategori,
      data.deskripsi ?? null,
      data.status_buku ?? 'Tersedia',
      id
    ]);

    return result;
  },

  // Menghapus buku berdasarkan ID
  delete: async (id) => {
    const [result] = await pool.execute(
      'DELETE FROM buku WHERE id_buku = ?',
      [id]
    );
    return result;
  },

  // Uji keamanan
  ujiKeamanan: async (kategoriInput) => {
    const sql = `
    SELECT b.id_buku, b.judul
    FROM buku b
    LEFT JOIN kategori k
    ON b.id_kategori = k.id_kategori
    WHERE k.nama_kategori = ?`;
    const [rows] = await pool.execute(sql, [kategoriInput]);

    console.log('[PREPARED STATEMENT]:', sql);
    console.log('[INPUT PENGUJIAN]:', kategoriInput);

    return rows;
  }
};
module.exports = BukuModel;