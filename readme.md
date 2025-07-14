Berikut adalah versi **Markdown (`README.md`)** dari dokumen desain teknis yang sudah kamu minta, dirapikan agar cocok ditaruh di GitHub:

---

```md
# 📄 Sistem Manajemen Surat Otomatis

**Versi:** 1.0  
**Tanggal:** 8 Juli 2025  
**Referensi:** Product Requirement Document v1.0  
**Repository:** [https://github.com/dawnofknight/gnpth-intern](https://github.com/dawnofknight/gnpth-intern)

---

## 🧭 1. Pendahuluan

Dokumen ini menjelaskan arsitektur, desain sistem, dan tech stack untuk Sistem Manajemen Surat Otomatis. Ditujukan untuk tim pengembang (terutama pemula) sebagai panduan teknis.

---

## 🏗️ 2. Arsitektur Sistem

Sistem menggunakan **Monolithic Jamstack** berbasis **Next.js (pages/)** — tanpa TypeScript.

**Struktur:**
- **Frontend:** React di Next.js (`pages/`)
- **Backend:** API Routes di `pages/api/`
- **Database:** PostgreSQL

```

\[Browser]
|
v
\[Next.js App (pages/)] -- API Routes --> \[PostgreSQL Database]

````

---

## 🧰 3. Tech Stack

| Kategori     | Teknologi        | Alasan                                   |
|--------------|------------------|------------------------------------------|
| Framework    | Next.js (pages/) | SSR + Routing + API Routes built-in      |
| Styling      | Tailwind CSS     | Utility-first, konsisten, cepat          |
| Database     | PostgreSQL       | Open-source, powerful relational DB      |
| ORM          | Prisma           | Modern ORM, mudah digunakan di JS        |
| Auth         | NextAuth.js      | Mudah, aman, support OAuth/email/etc     |
| Deployment   | Vercel / Docker  | CI/CD mudah (Vercel), lokal fleksibel    |

---

## 🗃️ 4. Desain Database

### Setup Prisma

```bash
npm install prisma @prisma/client
npx prisma init --datasource-provider postgresql
````

`.env`

```env
DATABASE_URL="postgresql://username:password@localhost:5432/nama_db"
```

### Migrasi

```bash
npx prisma migrate dev --name init
npx prisma generate
```

Model `User`, `Surat`, `Account`, dan `Session` disimpan di `schema.prisma`.

---

## 📁 5. Struktur Folder

```
/pages
  /api
    surat.js
    auth/[...nextauth].js
  index.js
  dashboard.js

/components
  Navbar.js
  SuratTable.js
  SuratForm.js
  FilterControls.js
  ui/
    Button.js
    Modal.js
    Table.js

/lib
  prisma.js

/utils
  generateNomorSurat.js
```

---

## 🧩 6. Komponen Frontend

* `pages/dashboard.js`: Halaman utama
* `SuratTable.js`: Tabel daftar surat
* `SuratForm.js`: Form tambah/edit surat
* `FilterControls.js`: Filter berdasarkan bulan/departemen
* `Navbar.js`: Header + Logout

---

## 🔌 7. API Endpoints

Semua ditulis dalam **JavaScript (ES6)** di `pages/api/`

### `POST /api/surat`

* Validasi data
* Generate no surat
* Simpan via Prisma

### `GET /api/surat`

* Ambil data surat (dengan filter)

### `PUT /api/surat/[id]`

* Update surat

### `DELETE /api/surat/[id]`

* Hapus surat

---

## 🔢 8. Penomoran Otomatis

`/utils/generateNomorSurat.js`

Contoh format hasil:

```
001/HRD.INT/VII/2025
```

Logika:

* Cek surat terakhir di tahun dan kategori yang sama
* Tambah 1 ke urutan
* Konversi bulan ke Romawi
* Gabungkan

---

## 🛠️ 9. Panduan Developer Junior

### 1. Setup Proyek

```bash
npx create-next-app sistem-surat
cd sistem-surat
npm install prisma @prisma/client pg next-auth tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 2. Setup Tailwind

Edit `tailwind.config.js` & `styles/globals.css`

### 3. Setup DB

* Isi `.env` → jalankan:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 4. Setup Auth

Ikuti: [https://next-auth.js.org/](https://next-auth.js.org/)

---

## 🐳 10. PostgreSQL dengan Docker

### `docker-compose.yml`

```yaml
version: "3.9"
services:
  postgres:
    image: postgres:15
    container_name: sistem-surat-db
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: sistem_surat
    ports:
      - "5432:5432"
    volumes:
      - postgres-data:/var/lib/postgresql/data

volumes:
  postgres-data:
```

### Jalankan:

```bash
docker-compose up -d
```

`.env`

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/sistem_surat"
```

---

## ⚙️ 11. Prisma Singleton

`/lib/prisma.js`

```js
import { PrismaClient } from "@prisma/client";
let prisma;
if (!global.prisma) {
  global.prisma = new PrismaClient();
}
prisma = global.prisma;
export { prisma };
```

---

## 🧠 12. Cheatsheet Developer Pemula

### A. JavaScript

```js
const tambah = (a, b) => a + b;
```

### B. React

```jsx
const [count, setCount] = useState(0);
```

### C. Next.js

```js
<Link href='/dashboard'>Ke Dashboard</Link>
```

### D. Prisma

```js
const users = await prisma.user.findMany();
```

### E. Docker

```bash
docker ps
docker exec -it sistem-surat-db psql -U postgres -d sistem_surat
```

---

## 🧰 Tools Rekomendasi

| Tool            | Fungsi                      |
| --------------- | --------------------------- |
| Thunder Client  | Testing API via VS Code     |
| Prisma Studio   | GUI DB: `npx prisma studio` |
| TablePlus       | GUI PostgreSQL              |
| ESLint/Prettier | Format dan lint JavaScript  |

---

## ✅ Selesai

Butuh bantuan kontribusi atau dokumentasi lanjutan? Silakan buka issue atau PR di [repository ini](https://github.com/dawnofknight/gnpth-intern).

```

---

Jika kamu mau, saya bisa bantu:
- Export ke file `README.md`
- Auto-push ke repo GitHub kamu lewat CLI setup
- Tambahkan badge GitHub (build status, license, dll.)

Mau dilanjutkan ke salah satu langkah itu?
```
