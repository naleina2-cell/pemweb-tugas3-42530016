const pool = require('../config/database');


// Controller halaman Beranda
exports.getBeranda = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT COUNT(*) AS jumlahBuku FROM buku'
    );
  res.render('pages/home', {
    pageTitle: 'Beranda',
    userName: 'Pengunjung PustakaKita',
    fiturList: [
      'Katalog Buku Digital',
      'Informasi Perpustakaan',
      'Form Tambah Buku'
    ],
    jumlahBuku: rows[0].jumlahBuku
  });

} catch (error) {
  console.error('Gagal memuat beranda:', error.message);
  res.status(500).send('Gagal memuat beranda.');
}
};

// Controller halaman Tentang Kami
exports.getTentang = (req, res) => {
  res.render('pages/about', {
    pageTitle: 'Tentang Kami'
  });
};

// Controller halaman Katalog
exports.getKatalog = async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT
      b.id_buku,
      b.judul,
      b.penulis,
      b.tahun_terbit,
      k.nama_kategori AS kategori
    FROM buku b 
    LEFT JOIN kategori k 
     ON b.id_kategori = k.id_kategori
    ORDER BY b.id_buku DESC
      `)
  res.render('pages/katalog', {
    pageTitle: 'Katalog Buku',
    daftarBuku: rows
  });
} catch (error) {
  console.error('Gagal mengambil data buku:', error.message);
  res.status(500).send('Gagal memuat katalog buku.');
}
};

// Controller halaman Form Tambah Buku
exports.getFormTambah = async (req, res) => {
  try { 
    const [kategoriList] = await pool.execute('SELECT id_kategori, nama_kategori FROM kategori');

  res.render('pages/tambah', {
    pageTitle: 'Tambah Buku',
    kategoriList: kategoriList
  });
} catch (error) {
  console.error('Gagal mengambil kategori:', error.message);
  res.status(500).send('Gagal memuat formulir.');
}
};

// Controller HTTP POST
exports.postTambahBuku = async (req, res) => {
  try {
  const { judul, penulis, tahun_terbit, id_kategori } = req.body;

  const tahun = Number(tahun_terbit);
  const kategori = Number(id_kategori);

  if (
    !judul?.trim() || 
    !penulis?.trim() || 
    !Number.isInteger(tahun) ||
    tahun < 1 ||
    !Number.isInteger(kategori) ||
    kategori < 1
  ){
    return res.status(400).send('Data buku tidak valid.');
  
  }
  const sql = `
    INSERT INTO buku 
    (judul, penulis, tahun_terbit, id_kategori)
    VALUES (?, ?, ?, ?)
  `;

  await pool.execute(sql, [
    judul.trim(),
    penulis.trim(),
    tahun,
    kategori
  ]);
  res.redirect('/katalog');
} catch (error) {
  console.error('Gagal menambah buku:', error.message);
  res.status(500).send('Gagal menyimpan buku.');
}
};
 exports.getFormEdit = async (req, res)=> {
  try{
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).send('ID buku tidak valid.');
    }
    const [rows] = await pool.execute(
      'SELECT * FROM buku WHERE id_buku = ?',
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).send('Buku tidak ditemukan.');
    }
    const [kategoriList] = await pool.execute(
      'SELECT id_kategori, nama_kategori FROM kategori');
      res.render('pages/edit', {
        pageTitle: 'Edit Buku', 
        buku: rows[0],
        kategoriList: kategoriList
      });
  } catch (error) {
    console.error('Gagal membuka form edit:', error.message);
    res.status(500).send('Gagal membuka formulir edit.');
  }
 };
 exports.postEditBuku = async (req, res) => {
  try{
    const id = Number(req.params.id);
    const { judul, penulis, tahun_terbit, id_kategori} = req.body;

    const tahun = Number(tahun_terbit);
    const kategori = Number(id_kategori);

    if (
      !Number.isInteger(id) || id < 1 ||
      typeof judul !== 'string' || !judul.trim() ||
      typeof penulis !== 'string' || !penulis.trim() ||
      !Number.isInteger(tahun) || tahun < 1 || tahun > 2100 ||
      !Number.isInteger(kategori) || kategori < 1
    ) {
      return res.status(400).send('Data buku tidak valid.');
    }
    const sql = `UPDATE buku
    SET judul = ?, penulis = ?, tahun_terbit = ?, id_kategori = ?
    WHERE id_buku = ?`;
    await pool.execute(sql, [
      judul.trim(),
      penulis.trim(),
      tahun,
      kategori,
      id
    ]);
    res.redirect('/katalog');
  

  } catch (error) {
    console.error('Gagal mengedit buku:', error.message);
    res.status(500).send('Gagal menyimpan perubahan buku.');
  }
 };
 exports.postHapusBuku = async (req, res) => {
  try{
    const id = Number(req.params.id);
    if(!Number.isInteger(id) || id < 1) {
      return res.status(400).send('ID buku tidak valid.');
    }
    const [result] = await pool.execute(
      'DELETE FROM buku WHERE id_buku = ?',
      [id]
    );
    if (result.affectedRows ===0) {
      return res.status(404).send('Buku tidak ditemukan.');
    }
    return res.redirect('/katalog');
  } catch (error) {
    console.error('Gagal menghapus buku:', error.message);
    return res.status(500).send('Gagal menghapus buku.');
  }
 };