# Muhammad Azrial — Curriculum Vitae

Situs CV pribadi saya, dapat diakses di **https://azrialwork.github.io**

## Stack

Sengaja dibuat seringan mungkin dan modular agar mudah dibesarkan:

- HTML, CSS, dan JavaScript vanilla — tanpa framework dan tanpa dependensi
- Build statis kecil tanpa library: `build.mjs` (Node.js bawaan saja)
- Deployment otomatis ke GitHub Pages melalui GitHub Actions

## Struktur Modular

```
.
├── build.mjs                  # Script build: menggabungkan src/ menjadi dist/
├── src/
│   ├── index.template.html    # Kerangka halaman; susun section di sini
│   ├── partials/              # Bagian yang dipakai ulang antar-halaman
│   │   ├── head.html
│   │   ├── header.html
│   │   └── footer.html
│   ├── sections/              # Satu file per bagian isi — edit di sini
│   │   ├── hero.html
│   │   ├── about.html
│   │   ├── experience.html
│   │   ├── education.html
│   │   ├── skills.html
│   │   └── contact.html
│   ├── css/                   # Satu file per tanggung jawab tampilan
│   │   ├── base.css           # Variabel, reset, gaya dasar
│   │   ├── layout.css         # Header, navigasi, hero, kerangka
│   │   ├── components.css     # Section, card, tombol, daftar
│   │   └── responsive.css     # Mobile dan cetak
│   ├── js/                    # ES modules — satu file per fitur
│   │   ├── main.js            # Titik masuk; daftarkan modul baru di sini
│   │   ├── nav.js
│   │   └── year.js
│   └── assets/                # Gambar dan berkas statis
│       └── profile.jpg
├── .github/workflows/pages.yml  # Build + deploy otomatis
└── dist/                      # Hasil build (tidak di-commit)
```

## Mengembangkan Situs Ini

- **Mengubah isi satu bagian:** edit file terkait di `src/sections/`.
- **Menambah bagian baru:** buat `src/sections/<nama>.html`, lalu sisipkan
  `<!-- @include "sections/<nama>.html" -->` di `src/index.template.html`.
- **Menambah halaman baru:** buat `src/<nama>.template.html` — build akan
  menghasilkan `dist/<nama>.html`. Partial di `src/partials/` dapat dipakai
  ulang di semua halaman.
- **Menambah gaya / fitur:** tambahkan file baru di `src/css/` atau
  `src/js/`, lalu daftarkan di `src/partials/head.html` (untuk CSS) atau
  impor di `src/js/main.js` (untuk JS).

## Build & Deployment

Pratinjau lokal:

```bash
node build.mjs
npx serve dist   # atau server statis apa pun
```

Setiap push ke branch `main` otomatis menjalankan build yang sama di
GitHub Actions (`.github/workflows/pages.yml`) dan men-deploy `dist/`
ke GitHub Pages.
