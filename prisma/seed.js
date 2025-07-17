const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create sample users
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      role: 'admin',
      departemen: 'IT',
      emailVerified: new Date(),
    },
  });

  const hrUser = await prisma.user.upsert({
    where: { email: 'hr@example.com' },
    update: {},
    create: {
      email: 'hr@example.com',
      name: 'HR Manager',
      role: 'user',
      departemen: 'HRD',
      emailVerified: new Date(),
    },
  });

  const financeUser = await prisma.user.upsert({
    where: { email: 'finance@example.com' },
    update: {},
    create: {
      email: 'finance@example.com',
      name: 'Finance Manager',
      role: 'user',
      departemen: 'Finance',
      emailVerified: new Date(),
    },
  });

  console.log('✅ Users created:', {
    admin: adminUser.email,
    hr: hrUser.email,
    finance: financeUser.email,
  });

  // Create sample letters
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const sampleLetters = [
    {
      nomorSurat: `001/HRD/INT/I/${currentYear}`,
      judul: '📋 Pengumuman Kebijakan Baru Work From Home',
      kategori: 'pengumuman',
      departemen: 'HRD',
      perihal: 'Implementasi kebijakan work from home yang baru',
      tujuan: 'Seluruh Karyawan',
      isi: 'Dengan hormat, kami sampaikan bahwa mulai tanggal 1 Februari 2024, perusahaan akan menerapkan kebijakan work from home yang baru. Kebijakan ini memungkinkan karyawan untuk bekerja dari rumah maksimal 3 hari dalam seminggu dengan persetujuan atasan langsung.',
      status: 'sent',
      createdBy: hrUser.id,
    },
    {
      nomorSurat: `002/IT/INT/I/${currentYear}`,
      judul: '🔧 Maintenance Server Terjadwal',
      kategori: 'pengumuman',
      departemen: 'IT',
      perihal: 'Pemberitahuan maintenance server rutin',
      tujuan: 'Seluruh Pengguna Sistem',
      isi: 'Kami informasikan bahwa akan dilakukan maintenance server pada hari Sabtu, 10 Februari 2024 pukul 22:00 - 02:00 WIB. Selama periode ini, sistem akan tidak dapat diakses. Mohon untuk menyimpan pekerjaan Anda sebelum waktu maintenance.',
      status: 'approved',
      createdBy: adminUser.id,
    },
    {
      nomorSurat: `003/FIN/EXT/I/${currentYear}`,
      judul: '💰 Laporan Keuangan Triwulan I',
      kategori: 'eksternal',
      departemen: 'Finance',
      perihal: 'Penyampaian laporan keuangan triwulan pertama',
      tujuan: 'Dewan Komisaris',
      isi: 'Dengan hormat, bersama ini kami sampaikan laporan keuangan perusahaan untuk triwulan pertama tahun 2024. Laporan ini mencakup neraca, laporan laba rugi, dan arus kas perusahaan.',
      status: 'review',
      createdBy: financeUser.id,
    },
    {
      nomorSurat: `004/HRD/ST/I/${currentYear}`,
      judul: '📝 Surat Tugas Pelatihan Karyawan',
      kategori: 'surat_tugas',
      departemen: 'HRD',
      perihal: 'Penugasan mengikuti pelatihan leadership',
      tujuan: 'Manager Departemen',
      isi: 'Berdasarkan program pengembangan SDM tahun 2024, dengan ini menugaskan kepada para manager departemen untuk mengikuti pelatihan leadership yang akan dilaksanakan pada tanggal 15-17 Februari 2024 di Hotel Grand Indonesia.',
      status: 'draft',
      createdBy: hrUser.id,
    },
    {
      nomorSurat: `005/IT/SK/I/${currentYear}`,
      judul: '⚖️ Surat Keputusan Upgrade Sistem',
      kategori: 'surat_keputusan',
      departemen: 'IT',
      perihal: 'Keputusan upgrade sistem informasi perusahaan',
      tujuan: 'Seluruh Departemen',
      isi: 'Memutuskan untuk melakukan upgrade sistem informasi perusahaan guna meningkatkan efisiensi dan keamanan data. Upgrade akan dilakukan secara bertahap mulai bulan Maret 2024.',
      status: 'sent',
      createdBy: adminUser.id,
    },
  ];

  for (const letter of sampleLetters) {
    await prisma.surat.create({
      data: letter,
    });
  }

  console.log('✅ Sample letters created:', sampleLetters.length);

  // Create sample accounts for OAuth
  await prisma.account.create({
    data: {
      userId: adminUser.id,
      type: 'oauth',
      provider: 'google',
      providerAccountId: 'google-admin-123',
      access_token: 'sample-access-token',
      token_type: 'Bearer',
      scope: 'openid email profile',
    },
  });

  console.log('✅ Sample OAuth account created');

  console.log('🎉 Database seeding completed successfully!');
  console.log('');
  console.log('📧 Sample user credentials:');
  console.log('   Admin: admin@example.com (role: admin, dept: IT)');
  console.log('   HR: hr@example.com (role: user, dept: HRD)');
  console.log('   Finance: finance@example.com (role: user, dept: Finance)');
  console.log('');
  console.log('📄 Sample letters created: 5 letters with various statuses');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });