---
id: milvus_backup_overview.md
summary: >-
  Milvus-Backup adalah alat yang memungkinkan pengguna untuk membuat cadangan
  dan memulihkan data Milvus.
title: Cadangan Milvus
---
<h1 id="Milvus-Backup" class="common-anchor-header">Cadangan Milvus<button data-href="#Milvus-Backup" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus Backup adalah alat yang memungkinkan pengguna untuk mencadangkan dan memulihkan data Milvus. Alat ini menyediakan CLI dan API untuk menyesuaikan diri dengan skenario aplikasi yang berbeda.</p>
<h2 id="Prerequisites" class="common-anchor-header">Prasyarat<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Sebelum mulai menggunakan Milvus Backup, pastikan bahwa</p>
<ul>
<li>Sistem operasi yang digunakan adalah CentOS 7.5+ atau Ubuntu LTS 18.04+,</li>
<li>Versi Go adalah 1.20.2 atau yang lebih baru.</li>
</ul>
<h2 id="Architecture" class="common-anchor-header">Arsitektur<button data-href="#Architecture" class="anchor-icon" translate="no">
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/milvus_backup_architecture.png" alt="Milvus Backup architecture" class="doc-image" id="milvus-backup-architecture" />
   </span> <span class="img-wrapper"> <span>Arsitektur Milvus Backup</span> </span></p>
<p>Milvus Backup memfasilitasi pencadangan dan pemulihan metadata, segmen, dan data di seluruh instance Milvus. Ini menyediakan antarmuka northbound, seperti CLI, API, dan modul Go berbasis gRPC, untuk manipulasi proses pencadangan dan pemulihan yang fleksibel.</p>
<p>Milvus Backup membaca metadata koleksi dan segmen dari instance Milvus sumber untuk membuat cadangan. Kemudian menyalin data koleksi dari jalur root instance Milvus sumber dan menyimpan data yang disalin ke dalam jalur root cadangan.</p>
<p>Untuk memulihkan dari cadangan, Milvus Backup membuat koleksi baru di contoh Milvus target berdasarkan metadata koleksi dan informasi segmen dalam cadangan. Kemudian menyalin data cadangan dari jalur root cadangan ke jalur root dari instans target.</p>
<h2 id="Compatibility-matrix" class="common-anchor-header">Matriks kompatibilitas<button data-href="#Compatibility-matrix" class="anchor-icon" translate="no">
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
    </button></h2><p>Tabel berikut mencantumkan kompatibilitas pencadangan dan pemulihan antara versi Milvus yang berbeda sejak Milvus Backup v0.5.7.</p>
<table>
<thead>
<tr><th>Cadangkan Dari ↓ / Pulihkan Ke →</th><th>Milvus v2.2.x</th><th>Milvus v2.3.x</th><th>Milvus v2.4.x</th><th>Milvus v2.5.x</th><th>Milvus v2.6.x</th></tr>
</thead>
<tbody>
<tr><td>Milvus v2.2.x</td><td>Tidak</td><td>Tidak</td><td>Ya</td><td>Ya</td><td>Ya</td></tr>
<tr><td>Milvus v2.3.x</td><td>Tidak</td><td>Tidak</td><td>Ya</td><td>Ya</td><td>Ya</td></tr>
<tr><td>Milvus v2.4.x</td><td>Tidak</td><td>Tidak</td><td>Ya</td><td>Ya</td><td>Ya</td></tr>
<tr><td>Milvus v2.5.x</td><td>Tidak</td><td>Tidak</td><td>Tidak</td><td>Ya</td><td>Ya</td></tr>
<tr><td>Milvus v2.6.x</td><td>Tidak</td><td>Tidak</td><td>Tidak</td><td>Tidak</td><td>Ya</td></tr>
</tbody>
</table>
<h2 id="Latest-release" class="common-anchor-header">Rilis terbaru<button data-href="#Latest-release" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.5.10">v0.5.10</a></li>
</ul>
