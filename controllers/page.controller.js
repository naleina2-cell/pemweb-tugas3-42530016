const BukuModel = require('../models/buku.model');
const KategoriModel = require('../models/kategori.model');


// Controller halaman Beranda
exports.getBeranda = async (req, res) => {
  try {
    const jumlahBuku = await BukuModel.getJumlah();
  res.render('pages/home', {
    pageTitle: 'Beranda',
    userName: 'Pengunjung PustakaKita',
    fiturList: [
      'Katalog Buku Digital',
      'Informasi Perpustakaan',
      'Form Tambah Buku'
    ],
    jumlahBuku: jumlahBuku
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
    const daftarBuku = await BukuModel.getAll();
  res.render('pages/katalog', {
    pageTitle: 'Katalog Buku',
    daftarBuku: daftarBuku
  });
} catch (error) {
  console.error('Gagal mengambil data buku:', error.message);
  res.status(500).send('Gagal memuat katalog buku.');
}
};

// Controller halaman Form Tambah Buku
exports.getFormTambah = async (req, res) => {
  try { 
    const kategoriList = await KategoriModel.getAll();

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
  const { judul, penulis, tahun_terbit, id_kategori, deskripsi, status_buku } = req.body;

  const tahun = Number(tahun_terbit);
  const kategori = Number(id_kategori);

  if (
    typeof judul !== 'string' || !judul.trim() ||
    typeof penulis !== 'string' || !penulis.trim() ||
    !Number.isInteger(tahun) ||
    tahun < 1 ||
    !Number.isInteger(kategori) ||
    kategori < 1 || (deskripsi !== undefined && !['Tersedia', 'Dipinjam'].includes(status_buku))
  ){
    return res.status(400).send('Data buku tidak valid.');
  
  }
  await BukuModel.create({
    judul: judul.trim(),
    penulis: penulis.trim(),
    tahun_terbit: tahun,
    id_kategori: kategori,
    deskripsi: deskripsi?.trim() || null,
    status_buku: status_buku || 'Tersedia'
  });
  return res.redirect('/katalog');

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
    const buku = await BukuModel.getById(id);
    if (!buku) {
      return res.status(404).send('Buku tidak ditemukan.');
    }
    const kategoriList = await KategoriModel.getAll();
      res.render('pages/edit', {
        pageTitle: 'Edit Buku', 
        buku: buku,
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
    const { judul, penulis, tahun_terbit, id_kategori, deskripsi, status_buku } = req.body;

    const tahun = Number(tahun_terbit);
    const kategori = Number(id_kategori);

    if (
      !Number.isInteger(id) || id < 1 ||
      typeof judul !== 'string' || !judul.trim() ||
      typeof penulis !== 'string' || !penulis.trim() ||
      !Number.isInteger(tahun) || tahun < 1 || tahun > 2100 ||
      !Number.isInteger(kategori) || kategori < 1 ||(deskripsi !== undefined && typeof deskripsi !== 'string') ||
      (status_buku !== undefined && !['Tersedia', 'Dipinjam'].includes(status_buku)
      )) {
      return res.status(400).send('Data buku tidak valid.');
    }
    const result = await BukuModel.update(id, {
      judul: judul.trim(),
      penulis: penulis.trim(),
      tahun_terbit: tahun,
      id_kategori: kategori,
      deskripsi: deskripsi?.trim() || null,
      status_buku: status_buku || 'Tersedia'
    });
    
   if (result.affectedRows === 0) {

      return res.status(404).send('Buku tidak ditemukan.');

    }

    return res.redirect('/katalog');

  } catch (error) {

    console.error('Gagal mengedit buku:', error.message);

    return res.status(500).send('Gagal menyimpan perubahan buku.');

  }

};

// Controller HTTP POST - Hapus Buku

exports.postHapusBuku = async (req, res) => {

  try {

    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {

      return res.status(400).send('ID buku tidak valid.');

    }

    const result = await BukuModel.delete(id);

    if (result.affectedRows === 0) {

      return res.status(404).send('Buku tidak ditemukan.');

    }

    return res.redirect('/katalog');

  } catch (error) {

    console.error('Gagal menghapus buku:', error.message);

    return res.status(500).send('Gagal menghapus buku.');

  }

};

