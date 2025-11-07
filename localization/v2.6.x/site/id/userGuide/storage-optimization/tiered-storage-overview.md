---
id: tiered-storage-overview.md
title: Gambaran Umum Penyimpanan BerjenjangCompatible with Milvus 2.6.4+
summary: >-
  Dalam Milvus, mode beban penuh tradisional mengharuskan setiap QueryNode untuk
  memuat semua bidang data dan indeks dari sebuah segmen pada saat inisialisasi,
  bahkan data yang mungkin tidak pernah diakses. Hal ini memastikan ketersediaan
  data secara langsung, tetapi sering kali menyebabkan pemborosan sumber daya,
  termasuk penggunaan memori yang tinggi, aktivitas disk yang berat, dan
  overhead I/O yang signifikan, terutama ketika menangani set data berskala
  besar.
beta: Milvus 2.6.4+
---
<h1 id="Tiered-Storage-Overview" class="common-anchor-header">Gambaran Umum Penyimpanan Berjenjang<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Tiered-Storage-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Di Milvus, mode <em>beban penuh</em> tradisional mengharuskan setiap QueryNode untuk memuat semua bidang data dan indeks <a href="/docs/id/glossary.md#Segment">segmen</a> saat inisialisasi, bahkan data yang mungkin tidak pernah diakses. Hal ini memastikan ketersediaan data dengan segera, tetapi sering kali menyebabkan pemborosan sumber daya, termasuk penggunaan memori yang tinggi, aktivitas disk yang berat, dan overhead I/O yang signifikan, terutama saat menangani dataset berskala besar.</p>
<p><em>Tiered Storage</em> menjawab tantangan ini dengan memisahkan cache data dari pemuatan segmen. Alih-alih memuat semua data sekaligus, Milvus memperkenalkan lapisan caching yang membedakan antara data panas (di-cache secara lokal) dan data dingin (disimpan secara remote). QueryNode sekarang hanya memuat <em>metadata</em> ringan pada awalnya dan secara dinamis menarik atau mengeluarkan data lapangan sesuai permintaan. Hal ini secara signifikan mengurangi waktu muat, mengoptimalkan pemanfaatan sumber daya lokal, dan memungkinkan QueryNode untuk memproses dataset yang jauh melebihi kapasitas memori fisik atau disk.</p>
<p>Pertimbangkan untuk mengaktifkan Penyimpanan Berjenjang dalam skenario seperti:</p>
<ul>
<li><p>Koleksi yang melebihi memori yang tersedia atau kapasitas NVMe dari satu QueryNode</p></li>
<li><p>Beban kerja analitis atau batch di mana pemuatan yang lebih cepat lebih penting daripada latensi kueri pertama</p></li>
<li><p>Beban kerja campuran yang dapat mentoleransi cache yang sesekali meleset untuk data yang lebih jarang diakses</p></li>
</ul>
<div class="alert note">
<ul>
<li><p><em>Metadata</em> mencakup skema, definisi indeks, peta potongan, jumlah baris, dan referensi ke objek jarak jauh. Jenis data ini berukuran kecil, selalu di-cache, dan tidak pernah digusur.</p></li>
<li><p>Untuk detail lebih lanjut tentang segmen dan potongan, lihat <a href="/docs/id/glossary.md#Segment">Segmen</a>.</p></li>
</ul>
</div>
<h2 id="How-it-works" class="common-anchor-header">Bagaimana cara kerjanya<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>Penyimpanan Berjenjang mengubah cara QueryNode mengelola data segmen. Alih-alih menyimpan cache setiap bidang dan indeks pada saat pemuatan, QueryNode kini hanya memuat metadata dan menggunakan lapisan cache untuk mengambil dan mengeluarkan data secara dinamis.</p>
<h3 id="Full-load-mode-vs-Tiered-Storage-mode" class="common-anchor-header">Mode beban penuh vs mode Penyimpanan Berjenjang<button data-href="#Full-load-mode-vs-Tiered-Storage-mode" class="anchor-icon" translate="no">
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
    </button></h3><p>Meskipun mode full-load dan Tiered Storage menangani data yang sama, keduanya berbeda dalam hal <em>kapan</em> dan <em>bagaimana</em> QueryNode menyimpan komponen-komponen ini di dalam cache.</p>
<ul>
<li><p><strong>Mode beban penuh</strong>: Pada saat pemuatan, QueryNode menyimpan data koleksi penuh, termasuk metadata, data bidang, dan indeks, dari penyimpanan objek.</p></li>
<li><p><strong>Mode Penyimpanan Berjenjang</strong>: Pada waktu pemuatan, QueryNode hanya menyimpan metadata. Data bidang ditarik sesuai permintaan pada granularitas potongan. File indeks tetap berada di luar jangkauan hingga kueri pertama membutuhkannya; kemudian seluruh indeks per segmen diambil dan di-cache.</p></li>
</ul>
<p>Diagram di bawah ini menunjukkan perbedaan ini.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/full-load-mode-vs-tiered-storage-mode.png" alt="Full Load Mode Vs Tiered Storage Mode" class="doc-image" id="full-load-mode-vs-tiered-storage-mode" />
   </span> <span class="img-wrapper"> <span>Mode Pemuatan Penuh Vs Mode Penyimpanan Berjenjang</span> </span></p>
<h3 id="QueryNode-loading-workflow" class="common-anchor-header">Alur kerja pemuatan QueryNode<button data-href="#QueryNode-loading-workflow" class="anchor-icon" translate="no">
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
    </button></h3><p>Dalam Penyimpanan Berjenjang, alur kerja memiliki fase-fase berikut:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/querynode-load-workflow.png" alt="Querynode Load Workflow" class="doc-image" id="querynode-load-workflow" />
   </span> <span class="img-wrapper"> <span>Alur Kerja Pemuatan Querynode</span> </span></p>
<h4 id="Phase-1-Lazy-load" class="common-anchor-header">Fase 1: Beban malas</h4><p>Saat inisialisasi, Milvus melakukan lazy load, hanya menyimpan metadata tingkat segmen seperti definisi skema, informasi indeks, dan pemetaan potongan.</p>
<p>Tidak ada data lapangan aktual atau file indeks yang di-cache pada tahap ini. Hal ini memungkinkan koleksi untuk dapat diakses segera setelah startup sambil menjaga konsumsi memori dan disk tetap minimal.</p>
<p>Karena data field dan file indeks tetap berada di penyimpanan jarak jauh hingga pertama kali diakses, <em>query pertama</em> mungkin mengalami latensi tambahan karena data yang diperlukan harus diambil sesuai permintaan. Untuk mengurangi efek ini untuk bidang atau indeks yang penting, Anda dapat menggunakan strategi <a href="/docs/id/tiered-storage-overview.md#Phase-2-Warm-up">Pemanasan</a> untuk secara proaktif melakukan pramuat sebelum segmen tersebut dapat di-query.</p>
<p><strong>Konfigurasi</strong></p>
<p>Diterapkan secara otomatis ketika Penyimpanan Berjenjang diaktifkan. Tidak diperlukan pengaturan manual.</p>
<h4 id="Phase-2-Warm-up" class="common-anchor-header">Fase 2: Pemanasan</h4><p>Untuk mengurangi latensi serangan pertama yang disebabkan oleh <a href="/docs/id/tiered-storage-overview.md#Phase-1-Lazy-load">beban malas</a>, Milvus menyediakan mekanisme <em>Pemanasan</em>.</p>
<p>Sebelum sebuah segmen dapat di-query, Milvus dapat secara proaktif mengambil dan menyimpan field atau indeks tertentu dari penyimpanan objek, memastikan bahwa query pertama langsung menyentuh data yang di-cache alih-alih memicu pemuatan sesuai permintaan.</p>
<p>Selama pemanasan, field akan dimuat sebelumnya di tingkat chunk, sementara indeks akan dimuat sebelumnya di tingkat segmen.</p>
<p><strong>Konfigurasi</strong></p>
<p>Pengaturan Pemanasan ditentukan di bagian Penyimpanan Berjenjang di <code translate="no">milvus.yaml</code>. Anda dapat mengaktifkan atau menonaktifkan pramuat untuk setiap bidang atau jenis indeks dan menentukan strategi yang diinginkan. Lihat <a href="/docs/id/warm-up.md">Pemanasan</a> untuk konfigurasi terperinci.</p>
<h4 id="Phase-3-Partial-load" class="common-anchor-header">Tahap 3: Pemuatan sebagian</h4><p>Setelah kueri atau pencarian dimulai, QueryNode melakukan pemuatan <em>parsial</em>, hanya mengambil potongan data atau file indeks yang diperlukan dari penyimpanan objek.</p>
<ul>
<li><p><strong>Bidang</strong>: Dimuat sesuai permintaan pada <strong>tingkat potongan</strong>. Hanya potongan data yang sesuai dengan kondisi kueri saat ini yang diambil, sehingga meminimalkan penggunaan I/O dan memori.</p></li>
<li><p><strong>Indeks</strong>: Dimuat sesuai permintaan pada <strong>tingkat segmen</strong>. File indeks harus diambil sebagai unit yang lengkap dan tidak dapat dipecah menjadi beberapa bagian.</p></li>
</ul>
<p><strong>Konfigurasi</strong></p>
<p>Pemuatan sebagian secara otomatis diterapkan ketika Penyimpanan Berjenjang diaktifkan. Tidak diperlukan pengaturan manual. Untuk meminimalkan latensi yang pertama kali masuk untuk data penting, kombinasikan dengan <a href="/docs/id/warm-up.md">Pemanasan</a>.</p>
<h4 id="Phase-4-Eviction" class="common-anchor-header">Fase 4: Penggusuran</h4><p>Untuk menjaga penggunaan sumber daya yang sehat, Milvus secara otomatis melepaskan data cache yang tidak terpakai ketika ambang batas tertentu tercapai.</p>
<p>Eviction mengikuti kebijakan <a href="https://en.wikipedia.org/wiki/Cache_replacement_policies">Least Recently Used (LRU</a> ), memastikan bahwa data yang jarang diakses akan dihapus terlebih dahulu sementara data yang aktif tetap berada di cache.</p>
<p>Penggusuran diatur oleh item yang dapat dikonfigurasi berikut ini:</p>
<ul>
<li><p><strong>Tanda air</strong>: Menetapkan ambang batas memori atau disk yang memicu dan menghentikan penggusuran.</p></li>
<li><p><strong>Cache TTL</strong>: Menghapus data cache yang sudah basi setelah durasi tidak aktif yang ditentukan.</p></li>
</ul>
<p><strong>Konfigurasi</strong></p>
<p>Mengaktifkan dan menyetel parameter penggusuran di <strong>milvus.yaml</strong>. Lihat <a href="/docs/id/eviction.md">Penggusuran</a> untuk konfigurasi terperinci.</p>
<h2 id="Getting-started" class="common-anchor-header">Memulai<button data-href="#Getting-started" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Prerequisites" class="common-anchor-header">Prasyarat<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><p>Milvus 2.6.4+</p></li>
<li><p>QueryNode dengan memori dan sumber daya disk khusus</p></li>
<li><p>Backend penyimpanan objek (S3, MinIO, dll.)</p></li>
</ul>
<div class="alert warning">
<p>Sumber daya QueryNode tidak boleh digunakan bersama dengan beban kerja lain. Sumber daya yang digunakan bersama dapat menyebabkan Penyimpanan Berjenjang salah menilai kapasitas yang tersedia, sehingga menyebabkan kerusakan.</p>
</div>
<h3 id="Basic-configuration-template" class="common-anchor-header">Templat konfigurasi dasar<button data-href="#Basic-configuration-template" class="anchor-icon" translate="no">
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
    </button></h3><p>Edit file konfigurasi Milvus (<code translate="no">milvus.yaml</code>) untuk mengonfigurasi pengaturan Penyimpanan Berjenjang:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-comment"># Warm Up Configuration</span>
      <span class="hljs-attr">warmup:</span>
        <span class="hljs-attr">scalarField:</span> <span class="hljs-string">sync</span>      <span class="hljs-comment"># Preload scalar field data</span>
        <span class="hljs-attr">scalarIndex:</span> <span class="hljs-string">sync</span>      <span class="hljs-comment"># Preload scalar indexes</span>
        <span class="hljs-attr">vectorField:</span> <span class="hljs-string">disable</span>   <span class="hljs-comment"># Don&#x27;t preload vector field data (large)</span>
        <span class="hljs-attr">vectorIndex:</span> <span class="hljs-string">sync</span>      <span class="hljs-comment"># Preload vector indexes</span>
      
      <span class="hljs-comment"># Eviction Configuration</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>
      
      <span class="hljs-comment"># Memory Watermarks</span>
      <span class="hljs-attr">memoryLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>   <span class="hljs-comment"># Stop evicting at 75%</span>
      <span class="hljs-attr">memoryHighWatermarkRatio:</span> <span class="hljs-number">0.80</span>  <span class="hljs-comment"># Start evicting at 80%</span>
      
      <span class="hljs-comment"># Disk Watermarks  </span>
      <span class="hljs-attr">diskLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>
      <span class="hljs-attr">diskHighWatermarkRatio:</span> <span class="hljs-number">0.80</span>
      
      <span class="hljs-comment"># Cache TTL (7 days)</span>
      <span class="hljs-attr">cacheTtl:</span> <span class="hljs-number">604800</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Next-steps" class="common-anchor-header">Langkah selanjutnya<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li><p><strong>Konfigurasikan</strong> Pemanasan - Optimalkan pemuatan awal untuk pola akses Anda. Lihat <a href="/docs/id/warm-up.md">Pemanasan</a>.</p></li>
<li><p><strong>Tune Eviction</strong> - Atur tanda air dan TTL yang sesuai untuk batasan sumber daya Anda. Lihat <a href="/docs/id/eviction.md">Penggusuran</a>.</p></li>
<li><p>Pantau<strong>Performa</strong> - Melacak tingkat hit cache, frekuensi penggusuran, dan pola latensi kueri.</p></li>
<li><p><strong>Konfigurasi Iterasi</strong> - Menyesuaikan pengaturan berdasarkan karakteristik beban kerja yang diamati.</p></li>
</ol>
<h2 id="FAQ" class="common-anchor-header">PERTANYAAN UMUM<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Can-I-change-Tiered-Storage-parameters-at-runtime" class="common-anchor-header">Dapatkah saya mengubah parameter Penyimpanan Berjenjang pada saat runtime?<button data-href="#Can-I-change-Tiered-Storage-parameters-at-runtime" class="anchor-icon" translate="no">
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
    </button></h3><p>Tidak. Semua parameter harus diatur di <code translate="no">milvus.yaml</code> sebelum memulai Milvus. Perubahan memerlukan pengaktifan ulang agar dapat diterapkan.</p>
<h3 id="Does-Tiered-Storage-affect-data-durability" class="common-anchor-header">Apakah Penyimpanan Berjenjang memengaruhi daya tahan data?<button data-href="#Does-Tiered-Storage-affect-data-durability" class="anchor-icon" translate="no">
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
    </button></h3><p>Tidak. Ketahanan data masih ditangani oleh penyimpanan objek jarak jauh. Penyimpanan Berjenjang hanya mengelola cache di QueryNode.</p>
<h3 id="Will-queries-always-be-faster-with-Tiered-Storage" class="common-anchor-header">Apakah kueri akan selalu lebih cepat dengan Penyimpanan Berjenjang?<button data-href="#Will-queries-always-be-faster-with-Tiered-Storage" class="anchor-icon" translate="no">
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
    </button></h3><p>Belum tentu. Penyimpanan Berjenjang mengurangi waktu muat dan penggunaan sumber daya, tetapi kueri yang menyentuh data yang tidak di-cache (dingin) mungkin mengalami latensi yang lebih tinggi. Untuk beban kerja yang sensitif terhadap latensi, mode beban penuh direkomendasikan.</p>
<h3 id="Why-does-a-QueryNode-still-run-out-of-resources-even-with-Tiered-Storage-enabled" class="common-anchor-header">Mengapa QueryNode masih kehabisan sumber daya meskipun Penyimpanan Berjenjang diaktifkan?<button data-href="#Why-does-a-QueryNode-still-run-out-of-resources-even-with-Tiered-Storage-enabled" class="anchor-icon" translate="no">
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
    </button></h3><p>Ada dua penyebab umum:</p>
<ul>
<li><p>QueryNode dikonfigurasikan dengan sumber daya yang terlalu sedikit. Watermark relatif terhadap sumber daya yang tersedia, sehingga penyediaan yang kurang akan memperkuat kesalahan penilaian.</p></li>
<li><p>Sumber daya QueryNode digunakan bersama dengan beban kerja lain, sehingga Penyimpanan Berjenjang tidak dapat menilai kapasitas aktual yang tersedia dengan benar.</p></li>
</ul>
<p>Untuk mengatasi hal ini, kami sarankan Anda mengalokasikan sumber daya khusus untuk QueryNode.</p>
<h3 id="Why-do-some-queries-fail-under-high-concurrency" class="common-anchor-header">Mengapa beberapa kueri gagal dalam konkurensi tinggi?<button data-href="#Why-do-some-queries-fail-under-high-concurrency" class="anchor-icon" translate="no">
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
    </button></h3><p>Jika terlalu banyak kueri yang mengakses data panas pada saat yang sama, batas sumber daya QueryNode mungkin akan terlampaui. Beberapa thread mungkin gagal karena batas waktu pemesanan sumber daya. Mencoba kembali setelah beban berkurang, atau mengalokasikan lebih banyak sumber daya, dapat mengatasi hal ini.</p>
<h3 id="Why-does-searchquery-latency-increase-after-enabling-Tiered-Storage" class="common-anchor-header">Mengapa latensi pencarian/kueri meningkat setelah mengaktifkan Penyimpanan Berjenjang?<button data-href="#Why-does-searchquery-latency-increase-after-enabling-Tiered-Storage" class="anchor-icon" translate="no">
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
    </button></h3><p>Kemungkinan penyebabnya meliputi:</p>
<ul>
<li><p>Sering melakukan kueri ke data dingin, yang harus diambil dari penyimpanan.</p></li>
<li><p>Tanda air yang ditetapkan terlalu berdekatan, menyebabkan seringnya penggusuran sinkron.</p></li>
</ul>
