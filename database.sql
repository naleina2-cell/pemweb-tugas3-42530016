CREATE DATABASE IF NOT EXIST perpustakaan_db;
USE perpustakaan_db;
CREATE TABLE IF NOT EXISTS kategori (
    id_kategori INT AUTO_INCREMENT PRIMARY KEY,
    nama_kategori VARCHAR(100) NOT NULL
);
CREATE TABLE IF NOT EXISTS buku (
    id_buku INT AUTO_INCREMENT PRIMARY KEY,
    judul VARCHAR(150) NOT NULL,
    penulis VARCHAR(100) NOT NULL,
    tahun_terbit INT,
    id_kategori INT, 
    FOREIGN KEY (id_kategori)
    REFERENCES kategori(id_kategori)
);
INSERT INTO kategori (id_kategori, nama_kategori)
VALUES
(1, 'Novel'),
(2, 'Teknologi'),
(3, 'Pendidikan');

INSERT INTO buku
(judul, penulis, tahun_terbit, id_kategori)
VALUES
('Laskar Pelangi', 'Andrea Hirata', 2005, 1),
('Dasar Pemrograman', 'Penulis Contoh', 2022, 2),
('Introduction of Reinforcement Learning', 'Unknown', 2026,2);