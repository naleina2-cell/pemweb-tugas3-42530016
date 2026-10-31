const express = require('express');
const app = express();
const pageRoutes = require('./routes/page.routes');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

//Mengaktifkan EJS sebagai view engine
app.set('view engine', 'ejs');

//Mengizinkan akses file statis
app.use(express.static('public'));

//Middleware untuk membaca data form POST
app.use(express.urlencoded({ extended: true }));

// Memasang router utama
app.use('/', pageRoutes);

// Fallback 404
app.use((req, res) => { 
    res.status(404).send('404 Not Found');
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server MVC Aktif di http://localhost:${PORT}`);
});