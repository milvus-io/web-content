---
id: milvus-webui.md
summary: >-
  Milvus Web UI adalah alat manajemen grafis untuk Milvus. Alat ini meningkatkan
  kemampuan pengamatan sistem dengan antarmuka yang sederhana dan intuitif. Anda
  dapat
title: Milvus WebUI
---
<h1 id="Milvus-WebUI" class="common-anchor-header">Milvus WebUI<button data-href="#Milvus-WebUI" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus Web UI adalah alat manajemen grafis untuk Milvus. Alat ini meningkatkan kemampuan pengamatan sistem dengan antarmuka yang sederhana dan intuitif. Anda dapat menggunakan Milvus Web UI untuk mengamati statistik dan metrik komponen dan ketergantungan Milvus, memeriksa detail basis data dan koleksi, dan membuat daftar konfigurasi Milvus yang terperinci.</p>
<h2 id="Overview" class="common-anchor-header">Gambaran Umum<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Web UI berbeda dengan Birdwatcher dan Attu karena Milvus Web UI merupakan alat bawaan untuk menyediakan pengamatan sistem secara keseluruhan dengan antarmuka yang sederhana dan intuitif.</p>
<p>Tabel berikut ini membandingkan fitur-fitur Milvus Web UI dan Birdwatcher/Attu:</p>
<table>
<thead>
<tr><th>Fitur</th><th>Milvus Web UI</th><th>Pengamat Burung</th><th>Attu</th></tr>
</thead>
<tbody>
<tr><td>Bentuk operasional</td><td>GUI</td><td>CLI</td><td>GUI</td></tr>
<tr><td>Target pengguna</td><td>Pemelihara, pengembang</td><td>Pemelihara</td><td>Pengembang</td></tr>
<tr><td>Instalasi</td><td>Bawaan</td><td>Alat yang berdiri sendiri</td><td>Alat yang berdiri sendiri</td></tr>
<tr><td>Ketergantungan</td><td>Milvus</td><td>Milvus / etcd</td><td>Milvus</td></tr>
<tr><td>Fungsi Utama</td><td>Lingkungan runtime, detail basis data/koleksi, segmen, saluran, tugas, dan permintaan kueri yang lambat</td><td>Pemeriksaan metadata dan eksekusi API Milvus</td><td>Manajemen basis data dan tugas-tugas operasional</td></tr>
<tr><td>Tersedia sejak</td><td>v2.5.0</td><td>v2.0.0</td><td>v0.1.8</td></tr>
</tbody>
</table>
<p>Sejak v2.5.0, Anda dapat mengakses Milvus Web UI menggunakan URL berikut ini pada instance Milvus yang sedang berjalan:</p>
<pre><code translate="no">http://<span class="hljs-variable">${MILVUS_PROXY_IP}</span>:9091/webui
<button class="copy-code-btn"></button></code></pre>
<h2 id="Features" class="common-anchor-header">Fitur<button data-href="#Features" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Web UI menyediakan fitur-fitur berikut ini:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/milvus-webui-overview.png" alt="Milvus Web UI overview" class="doc-image" id="milvus-web-ui-overview" />
   </span> <span class="img-wrapper"> <span>Gambaran umum Milvus Web UI</span> </span></p>
<ul>
<li><p><a href="#Home">Beranda</a></p>
<p>Anda dapat menemukan informasi tentang instance Milvus yang sedang berjalan, komponen-komponennya, klien-klien yang terhubung, dan dependensi.</p></li>
<li><p><a href="#Collections">Koleksi</a></p>
<p>Anda dapat melihat daftar database dan koleksi yang sedang berjalan di Milvus dan memeriksa detailnya.</p></li>
<li><p><a href="#Query">Query</a></p>
<p>Anda dapat melihat statistik yang dikumpulkan dari node kueri dan koordinator kueri dalam hal segmen, saluran, replika, dan grup sumber daya.</p></li>
<li><p><a href="#Data">Data</a></p>
<p>Anda dapat melihat statistik yang dikumpulkan dari node data dalam hal segmen dan saluran.</p></li>
<li><p><a href="#Tasks">Tugas</a></p>
<p>Anda dapat melihat daftar tugas yang berjalan di Milvus, termasuk tugas penjadwal Querycoord, tugas pemadatan, tugas pembuatan indeks, tugas impor, dan tugas sinkronisasi data.</p></li>
<li><p><a href="#Slow-requests">Permintaan lambat</a></p>
<p>Anda dapat melihat daftar permintaan lambat di Milvus, termasuk jenis permintaan, durasi permintaan, dan parameter permintaan.</p></li>
<li><p><a href="#Configurations">Konfigurasi</a></p>
<p>Anda dapat melihat daftar konfigurasi Milvus dan nilainya.</p></li>
<li><p><a href="#Tools">Alat</a></p>
<p>Anda dapat mengakses dua alat bawaan, pprof dan alat visualisasi data Milvus, dari UI Web.</p></li>
</ul>
<h2 id="Home" class="common-anchor-header">Beranda<button data-href="#Home" class="anchor-icon" translate="no">
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
    </button></h2><p>Pada halaman Beranda, Anda dapat menemukan informasi berikut:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/webui-home.png" alt="Milvus Web UI Home" class="doc-image" id="milvus-web-ui-home" />
   </span> <span class="img-wrapper"> <span>Beranda UI Web Milvus</span> </span></p>
<ul>
<li><p><strong>Informasi sistem</strong>: Melihat informasi sistem, termasuk informasi tentang mode penerapan, gambar yang digunakan dalam penerapan, dan informasi terkait.</p></li>
<li><p><strong>Informasi Komponen</strong>: Melihat status dan metrik komponen di Milvus, termasuk status dan metrik node kueri, node data, node indeks, koordinator, dan proksi.</p></li>
<li><p><strong>Klien yang terhubung</strong>: Melihat klien yang terhubung dan informasinya, termasuk jenis dan versi SDK, nama pengguna, dan riwayat akses mereka.</p></li>
<li><p><strong>Ketergantungan sistem</strong>: Melihat status dan metrik ketergantungan Milvus, termasuk status dan metrik meta store, antrean pesan, dan penyimpanan objek.</p></li>
</ul>
<h2 id="Collections" class="common-anchor-header">Koleksi<button data-href="#Collections" class="anchor-icon" translate="no">
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
    </button></h2><p>Pada halaman Koleksi, Anda dapat melihat daftar basis data dan koleksi yang ada di Milvus saat ini dan memeriksa detailnya.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/webui-collections.png" alt="Milvus Web UI Collections" class="doc-image" id="milvus-web-ui-collections" />
   </span> <span class="img-wrapper"> <span>Koleksi UI Web Milvus</span> </span></p>
<ul>
<li><p><strong>Database</strong>: Melihat daftar database yang saat ini ada di Milvus dan detailnya.</p></li>
<li><p><strong>Koleksi</strong>: Melihat daftar koleksi di setiap basis data dan rinciannya.</p>
<p>Anda dapat mengklik sebuah koleksi untuk melihat detailnya, termasuk jumlah field, partisi, indeks, dan informasi lainnya secara rinci.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/webui-collection-details.png" alt="Milvus Web UI Collection Details" class="doc-image" id="milvus-web-ui-collection-details" />
   </span> <span class="img-wrapper"> <span>Detail Koleksi UI Web Milvus</span> </span></p></li>
</ul>
<h2 id="Query" class="common-anchor-header">Query<button data-href="#Query" class="anchor-icon" translate="no">
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
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/webui-query.png" alt="Milvus Web UI Query Page" class="doc-image" id="milvus-web-ui-query-page" />
   </span> <span class="img-wrapper"> <span>Halaman Kueri Milvus Web UI</span> </span></p>
<ul>
<li><p><strong>Segmen</strong>: Melihat daftar segmen dan detailnya, termasuk ID segmen, koleksi yang sesuai, status, ukuran, dll.</p></li>
<li><p><strong>Saluran</strong>: Melihat daftar saluran dan detailnya, termasuk nama saluran, koleksi yang sesuai, dll.</p></li>
<li><p><strong>Replika</strong>: Melihat daftar replika dan detailnya, termasuk ID replika, koleksi yang sesuai, dll.</p></li>
<li><p><strong>Grup sumber daya</strong>: Melihat daftar grup sumber daya dan detailnya, termasuk nama grup sumber daya, jumlah node kueri dalam grup, dan konfigurasinya, dll.</p></li>
</ul>
<h2 id="Data" class="common-anchor-header">Data<button data-href="#Data" class="anchor-icon" translate="no">
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
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/webui-data.png" alt="Milvus Web UI Data Page" class="doc-image" id="milvus-web-ui-data-page" />
   </span> <span class="img-wrapper"> <span>Halaman Data UI Web Milvus</span> </span></p>
<ul>
<li><p><strong>Segmen</strong>: Melihat daftar segmen dari node/koordinator data dan detailnya, termasuk ID segmen, koleksi yang sesuai, status, ukuran, dll.</p></li>
<li><p><strong>Saluran</strong>: Melihat daftar saluran dari node/koordinator data dan detailnya, termasuk nama saluran, koleksi yang sesuai, dll.</p></li>
</ul>
<h2 id="Tasks" class="common-anchor-header">Tugas<button data-href="#Tasks" class="anchor-icon" translate="no">
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
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/webui-tasks.png" alt="Milvus Web UI Tasks Page" class="doc-image" id="milvus-web-ui-tasks-page" />
   </span> <span class="img-wrapper"> <span>Halaman Tugas UI Web Milvus</span> </span></p>
<ul>
<li><p><strong>Tugas</strong>: Melihat daftar tugas yang sedang berjalan di Milvus, termasuk jenis tugas, status, dan tindakan.</p>
<ul>
<li><p><strong>Tugas QueryCoord</strong>: Melihat semua tugas penjadwal QueryCoord, termasuk penyeimbang, pemeriksa indeks/segmen/saluran/pemimpin dalam 15 menit terakhir.</p></li>
<li><p><strong>Tugas Pemadatan</strong>: Melihat semua tugas pemadatan dari koordinator data dalam 15 menit terakhir.</p></li>
<li><p><strong>Tugas Pembuatan Indeks</strong>: Melihat semua tugas pembuatan indeks dari koordinator data dalam 30 menit terakhir.</p></li>
<li><p><strong>Tugas Impor</strong>: Melihat semua tugas impor dari koordinator data dalam 30 menit terakhir.</p></li>
<li><p><strong>Tugas Sinkronisasi Data</strong>: Melihat semua tugas sinkronisasi data dari node data dalam 15 menit terakhir.</p></li>
</ul></li>
</ul>
<h2 id="Slow-requests" class="common-anchor-header">Permintaan lambat<button data-href="#Slow-requests" class="anchor-icon" translate="no">
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
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/webui-slow-requests.png" alt="Milvus Web UI Slow Requests Page" class="doc-image" id="milvus-web-ui-slow-requests-page" />
   </span> <span class="img-wrapper"> <span>Halaman Permintaan Lambat UI Web Milvus</span> </span></p>
<ul>
<li><strong>Permintaan lambat</strong>: Permintaan lambat adalah pencarian atau kueri yang memiliki latensi lebih lama dari nilai <code translate="no">proxy.slowQuerySpanInSeconds</code> yang ditentukan dalam konfigurasi. Daftar permintaan lambat menampilkan semua permintaan lambat dalam 15 menit terakhir.</li>
</ul>
<h2 id="Configurations" class="common-anchor-header">Konfigurasi<button data-href="#Configurations" class="anchor-icon" translate="no">
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
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/webui-configurations.png" alt="Milvus Web UI Configurations Page" class="doc-image" id="milvus-web-ui-configurations-page" />
   </span> <span class="img-wrapper"> <span>Halaman Konfigurasi UI Web Milvus</span> </span></p>
<ul>
<li><strong>Konfigurasi</strong>: Melihat daftar konfigurasi runtime Milvus dan nilainya.</li>
</ul>
<h2 id="Tools" class="common-anchor-header">Alat<button data-href="#Tools" class="anchor-icon" translate="no">
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
<li><p><strong>pprof</strong>: Mengakses alat pprof untuk membuat profil dan men-debug Milvus.</p></li>
<li><p><strong>Alat visualisasi data Milvus</strong>: Mengakses alat visualisasi data Milvus untuk memvisualisasikan data dalam Milvus.</p></li>
</ul>
