
# PustakaKita — Aplikasi Perpustakaan Digital

Proyek Tugas Terstruktur 3 mata kuliah Pemrograman Web.

## Deskripsi
PustakaKita merupakan aplikasi web sederhana untuk
mengelola data buku perpustakaan menggunakan
Node.js, Express.js, EJS, dan MySQL.

## Fitur
- Menampilkan katalog buku (Read)
- Menambahkan buku baru (Create)
- Mengedit informasi buku (Update)
- Menghapus buku (Delete)
- Menampilkan kategori buku
- Menghitung jumlah buku pada beranda

## Teknologi
- Node.js
- Express.js
- EJS
- MySQL
- mysql2/promise
- dotenv
- HTML dan CSS

## Keamanan dan Database
- MySQL Connection Pool berbasis Promise
- Prepared Statements menggunakan parameter SQL
- Kredensial database disimpan di file .env
- Post-Redirect-Get (PRG) setelah operasi CRUD

## Cara Menjalankan Aplikasi

1. Clone repositori.
2. Buka folder proyek di VS Code.
3. Jalankan:

   npm install

4. Buat file .env berdasarkan .env.example.
5. Isi konfigurasi database sesuai MySQL lokal.
6. Impor database.sql ke MySQL.
7. Jalankan:

   npm run dev

8. Buka http://localhost:3001

## Logbook Pengujian (Traceability Matrix)

| ID Uji | Fitur | Endpoint | HTTP | Hasil Pengujian | Bukti |
|---|---|---|---|---|---|
| TC-01 | MySQL Connection Pool | App Startup | - | Server aktif dan database dapat diakses | Screenshot |
| TC-02 | Read Data | `/katalog` | GET | Katalog berhasil ditampilkan, status 200 | Screenshot |
| TC-03 | Create Data | `/katalog/tambah` | POST | Data ditambahkan, redirect 302 → 200 | Screenshot |
| TC-04 | Update Data | `/katalog/edit/:id` | POST | Perubahan data tersimpan di MySQL | Screenshot |
| TC-05 | Delete Data | `/katalog/hapus/:id` | POST | Data terhapus dari MySQL | Screenshot |
| TC-06 | SQL Injection | `/uji-keamanan`    (pengujian sementara) | GET | Input injeksi tidak mengembalikan data | Screenshot |

## Video Penjelasan

YouTube: [Tautan video akan ditambahkan]

## Identitas
Nama: [Nama lengkap mahasiswa]
NIM: [NIM mahasiswa]
Kelas: [Kelas mahasiswa]
Tema: Perpustakaan Digital
