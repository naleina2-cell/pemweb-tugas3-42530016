const pool = require('./config/database');
async function testKoneksi() {
    try{
        const [rows] = await pool.execute(
            'SELECT COUNT(*) AS jumlah_buku FROM buku'
        );
        console.log('Koneksi MySQL berhasil!');
        console.log('Jumlah buku:', rows[0].jumlah_buku);
    } catch (eror) {
        console.eror('Koneksi gagal:', eror.message);
    } finally {
        await pool.end();
    }
}
testKoneksi();