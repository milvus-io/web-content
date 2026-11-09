---
id: install_standalone-binary.md
label: RPM/DEB Package
related_key: RPM/DEB Package
summary: >-
  Periksa ketersediaan paket RPM/DEB dan pilih metode instalasi Milvus
  Standalone yang didukung.
title: Menginstal Milvus Standalone dengan Paket RPM/DEB
---
<h1 id="Install-Milvus-Standalone-with-RPMDEB-Package" class="common-anchor-header">Menginstal Milvus Standalone dengan Paket RPM/DEB<button data-href="#Install-Milvus-Standalone-with-RPMDEB-Package" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h1><p>Halaman ini menjelaskan ketersediaan paket untuk Milvus Standalone dan menyertakan tautan ke metode instalasi menggunakan aset rilis yang telah dipublikasikan.</p>
<h2 id="Check-package-availability" class="common-anchor-header">Periksa ketersediaan paket<button data-href="#Check-package-availability" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>Rilis Milvus 3.0.x, termasuk <a href="https://github.com/milvus-io/milvus/releases/tag/v3.0.5">v3.0.5</a>, menerbitkan berkas konfigurasi Docker Compose tetapi tidak menyediakan paket RPM atau DEB. Jangan membuat URL unduhan RPM atau DEB untuk rilis-rilis ini; nama berkas paket dalam perintah unduhan tidak membuat aset tersebut tersedia.</p>
<p>Untuk rilis lain, periksa bagian <strong>Aset</strong> di <a href="https://github.com/milvus-io/milvus/releases">halaman rilis Milvus</a> sebelum memilih metode pemasangan paket. Gunakan hanya paket yang benar-benar tercantum untuk rilis tersebut dan arsitektur sistem Anda.</p>
<h2 id="Install-Milvus-Standalone-with-Docker" class="common-anchor-header">Instal Milvus Standalone dengan Docker<button data-href="#Install-Milvus-Standalone-with-Docker" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>Untuk v3.0.5, pilih salah satu metode instalasi berikut:</p>
<ul>
<li><a href="/docs/id/install_standalone-docker-compose.md">Jalankan Milvus dengan Docker Compose (Linux)</a> untuk menggunakan konfigurasi Compose yang diterbitkan bersama v3.0.5.</li>
<li><a href="/docs/id/install_standalone-docker.md">Jalankan Milvus di Docker (Linux)</a> untuk menggunakan skrip instalasi mandiri. Periksa tag gambar dalam skrip sebelum menjalankannya.</li>
<li><a href="/docs/id/install_standalone-windows.md">Jalankan Milvus di Docker (Windows)</a> untuk menggunakan Docker Desktop dengan backend WSL 2 dan kontainer Linux.</li>
</ul>
<p>Periksa <a href="/docs/id/prerequisite-docker.md">persyaratan perangkat keras dan perangkat lunak</a> sebelum instalasi. Setelah instance berjalan, ikuti jalur <strong>"Gunakan server Milvus yang sudah ada</strong> " di <a href="/docs/id/quickstart.md">Panduan Cepat</a>, dengan menghubungkan ke <code translate="no">http://localhost:19530</code> alih-alih jalur lokal <code translate="no">.db</code>, untuk memasukkan data dan menjalankan pencarian.</p>
