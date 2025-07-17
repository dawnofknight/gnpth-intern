import { prisma } from '../lib/prisma';

// Konversi bulan ke angka Romawi
const bulanKeRomawi = {
  1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V', 6: 'VI',
  7: 'VII', 8: 'VIII', 9: 'IX', 10: 'X', 11: 'XI', 12: 'XII'
};

// Mapping kategori ke kode departemen
const kategoriKode = {
  'internal': 'INT',
  'eksternal': 'EXT',
  'undangan': 'UND',
  'pengumuman': 'PNG',
  'surat_tugas': 'ST',
  'surat_keputusan': 'SK'
};

export async function generateNomorSurat(kategori, departemen) {
  try {
    const tahunSekarang = new Date().getFullYear();
    const bulanSekarang = new Date().getMonth() + 1;
    const bulanRomawi = bulanKeRomawi[bulanSekarang];
    
    // Ambil surat terakhir dengan kategori dan tahun yang sama
    const suratTerakhir = await prisma.surat.findFirst({
      where: {
        kategori: kategori,
        tanggal: {
          gte: new Date(tahunSekarang, 0, 1), // Awal tahun
          lt: new Date(tahunSekarang + 1, 0, 1) // Awal tahun berikutnya
        }
      },
      orderBy: {
        nomorSurat: 'desc'
      }
    });

    let nomorUrut = 1;
    
    if (suratTerakhir) {
      // Extract nomor urut dari nomor surat terakhir
      const nomorTerakhir = suratTerakhir.nomorSurat.split('/')[0];
      nomorUrut = parseInt(nomorTerakhir) + 1;
    }

    // Format nomor urut dengan leading zeros (3 digit)
    const nomorUrutFormatted = nomorUrut.toString().padStart(3, '0');
    
    // Kode kategori
    const kodeKategori = kategoriKode[kategori] || 'GEN';
    
    // Format departemen (uppercase)
    const kodeDepartemen = departemen.toUpperCase();
    
    // Generate nomor surat final
    const nomorSurat = `${nomorUrutFormatted}/${kodeDepartemen}.${kodeKategori}/${bulanRomawi}/${tahunSekarang}`;
    
    return nomorSurat;
  } catch (error) {
    console.error('Error generating nomor surat:', error);
    throw new Error('Gagal generate nomor surat');
  }
}