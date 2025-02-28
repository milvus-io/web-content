---
id: milvus-cdc-overview.md
order: 1
summary: >-
  Milvus-CDC adalah alat bantu yang mudah digunakan yang dapat menangkap dan
  menyinkronkan data tambahan dalam instance Milvus.
title: Gambaran Umum CDC
---
<h1 id="Overview" class="common-anchor-header">Gambaran Umum<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus-CDC adalah alat yang mudah digunakan yang dapat menangkap dan menyinkronkan data tambahan dalam instance Milvus. Alat ini memastikan keandalan data bisnis dengan mentransfernya secara mulus antara instance sumber dan target, sehingga memungkinkan pencadangan inkremental yang mudah dan pemulihan bencana.</p>
<h2 id="Key-capabilities" class="common-anchor-header">Kemampuan utama<button data-href="#Key-capabilities" class="anchor-icon" translate="no">
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
<li><p><strong>Sinkronisasi Data Berurutan</strong>: Memastikan integritas dan konsistensi data dengan menyinkronkan perubahan data secara berurutan di antara instance Milvus.</p></li>
<li><p><strong>Replikasi Data Tambahan</strong>: Mereplikasi data tambahan, termasuk penyisipan dan penghapusan, dari Milvus sumber ke Milvus target, menawarkan penyimpanan yang persisten.</p></li>
<li><p><strong>Manajemen Tugas CDC</strong>: Memungkinkan pengelolaan tugas CDC melalui permintaan OpenAPI, termasuk membuat, menanyakan status, dan menghapus tugas CDC.</p></li>
</ul>
<p>Selain itu, kami berencana untuk memperluas kemampuan kami untuk menyertakan dukungan untuk integrasi dengan sistem pemrosesan aliran di masa depan.</p>
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
    </button></h2><p>Milvus-CDC mengadopsi arsitektur dengan dua komponen utama - server HTTP yang mengelola tugas dan metadata, dan <strong>corelib</strong> yang menyinkronkan eksekusi tugas dengan pembaca yang memperoleh data dari instance Milvus sumber dan penulis yang mengirimkan data yang telah diproses ke instance Milvus target.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/milvus-cdc-architecture.png" alt="milvus-cdc-architecture" class="doc-image" id="milvus-cdc-architecture" />
   </span> <span class="img-wrapper"> <span>arsitektur milvus-cdc</span> </span></p>
<p>Dalam diagram sebelumnya,</p>
<ul>
<li><p><strong>Server HTTP</strong>: Menangani permintaan pengguna, menjalankan tugas, dan memelihara metadata. Server ini berfungsi sebagai bidang kontrol untuk orkestrasi tugas dalam sistem Milvus-CDC.</p></li>
<li><p><strong>Corelib</strong>: Bertanggung jawab atas sinkronisasi tugas yang sebenarnya. Ini mencakup komponen pembaca yang mengambil informasi dari sumber Milvus's etcd dan antrean pesan (MQ), dan komponen penulis yang menerjemahkan pesan dari MQ ke dalam parameter API untuk sistem Milvus dan mengirimkan permintaan ini ke Milvus target untuk menyelesaikan proses sinkronisasi.</p></li>
</ul>
<h2 id="Workflow" class="common-anchor-header">Alur kerja<button data-href="#Workflow" class="anchor-icon" translate="no">
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
    </button></h2><p>Alur pemrosesan data Milvus-CDC melibatkan langkah-langkah berikut:</p>
<ol>
<li><p><strong>Pembuatan tugas</strong>: Pengguna memulai tugas CDC melalui permintaan HTTP.</p></li>
<li><p><strong>Pengambilan metadata</strong>: Sistem mengambil metadata khusus koleksi dari sumber etcd Milvus, termasuk informasi saluran dan pos pemeriksaan untuk koleksi tersebut.</p></li>
<li><p><strong>Koneksi MQ</strong>: Dengan metadata yang ada, sistem terhubung ke MQ untuk mulai berlangganan aliran data.</p></li>
<li><p><strong>Pemrosesan data</strong>: Data dari MQ dibaca, diuraikan, dan diteruskan menggunakan Go SDK atau diproses untuk mereplikasi operasi yang dilakukan di sumber Milvus.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/milvus-cdc-workflow.png" alt="milvus-cdc-workflow" class="doc-image" id="milvus-cdc-workflow" />
   </span> <span class="img-wrapper"> <span>milvus-cdc-alur kerja</span> </span></p>
<h2 id="Limits" class="common-anchor-header">Batasan<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p><strong>Sinkronisasi Data Tambahan</strong>: Untuk saat ini, Milvus-CDC dirancang untuk menyinkronkan hanya data tambahan. Jika bisnis Anda memerlukan pencadangan data penuh, silakan <a href="https://milvus.io/community">hubungi kami</a> untuk mendapatkan bantuan.</p></li>
<li><p><strong>Cakupan Sinkronisasi</strong>: Saat ini, Milvus-CDC dapat menyinkronkan data di tingkat cluster. Kami sedang berupaya menambahkan dukungan untuk sinkronisasi data tingkat koleksi dalam rilis mendatang.</p></li>
<li><p><strong>Permintaan API yang didukung</strong>: Milvus-CDC saat ini mendukung permintaan API berikut ini. Kami berencana untuk memperluas dukungan untuk permintaan tambahan di rilis mendatang:</p>
<ul>
<li><p>Membuat/Menghapus Koleksi</p></li>
<li><p>Menyisipkan/Menghapus/Memasang</p></li>
<li><p>Membuat/Menghapus Partisi</p></li>
<li><p>Membuat/Menghapus Indeks</p></li>
<li><p>Memuat/Melepas/Menyiram</p></li>
<li><p>Memuat/Melepaskan Partisi</p></li>
<li><p>Membuat/Menghapus Basis Data</p></li>
</ul></li>
</ul>
