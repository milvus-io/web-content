---
id: tiered-storage-overview.md
title: Gambaran Umum Penyimpanan BerjenjangCompatible with Milvus 2.6.4+
summary: >-
  Dalam Milvus, mode beban penuh tradisional mengharuskan setiap QueryNode untuk
  memuat semua bidang skema dan indeks segmen pada inisialisasi, bahkan data
  yang mungkin tidak pernah diakses. Hal ini memastikan ketersediaan data secara
  langsung, tetapi sering kali menyebabkan pemborosan sumber daya, termasuk
  penggunaan memori yang tinggi, aktivitas disk yang berat, dan overhead I/O
  yang signifikan, terutama ketika menangani set data berskala besar.
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
    </button></h1><p>Di Milvus, <strong>mode beban penuh</strong> tradisional mengharuskan setiap QueryNode untuk memuat semua bidang skema dan indeks <a href="https://zilliverse.feishu.cn/wiki/IBX3w5p4Tipy1KkNxI6cbEOwnGf">segmen</a> saat inisialisasi, bahkan data yang mungkin tidak pernah diakses. Hal ini memastikan ketersediaan data secara langsung, tetapi sering kali menyebabkan pemborosan sumber daya, termasuk penggunaan memori yang tinggi, aktivitas disk yang berat, dan overhead I/O yang signifikan, terutama saat menangani set data berskala besar.</p>
<p><strong>Tiered Storage</strong> menjawab tantangan ini dengan memisahkan cache data dari pemuatan segmen. Alih-alih memuat semua data sekaligus, Milvus memperkenalkan lapisan caching yang membedakan antara data panas (di-cache secara lokal) dan data dingin (disimpan secara remote). QueryNode sekarang hanya memuat metadata ringan pada awalnya dan secara dinamis menarik atau mengeluarkan data sesuai permintaan. Hal ini secara signifikan mengurangi waktu muat, mengoptimalkan pemanfaatan sumber daya lokal, dan memungkinkan QueryNode untuk memproses kumpulan data yang jauh melebihi memori fisik atau kapasitas disk.</p>
<p>Anda dapat mempertimbangkan untuk mengaktifkan Penyimpanan Berjenjang dalam skenario seperti:</p>
<ul>
<li><p>Koleksi yang melebihi memori yang tersedia atau kapasitas NVMe dari satu QueryNode</p></li>
<li><p>Beban kerja analitis atau batch di mana pemuatan yang lebih cepat lebih penting daripada latensi kueri pertama</p></li>
<li><p>Beban kerja campuran yang dapat mentoleransi kesalahan cache sesekali untuk data yang lebih jarang diakses</p></li>
</ul>
<div class="alert note">
<p>Untuk detail lebih lanjut tentang segmen dan potongan, lihat <a href="https://zilliverse.feishu.cn/wiki/IBX3w5p4Tipy1KkNxI6cbEOwnGf">Penjelasan Segmen</a>.</p>
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
    </button></h2><p>Penyimpanan Berjenjang mengubah cara QueryNode mengelola data segmen. Alih-alih menyimpan cache setiap bidang dan indeks pada saat pemuatan, QueryNode kini hanya memuat <strong>metadata</strong> dan menggunakan lapisan cache untuk mengambil dan mengeluarkan data secara dinamis.</p>
<div class="alert note">
<p><strong>Metadata</strong> meliputi skema, definisi indeks, peta potongan, jumlah baris, dan referensi ke objek jarak jauh. Data ini berukuran kecil, selalu di-cache, dan tidak pernah digusur.</p>
</div>
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
    </button></h3><p>Meskipun mode full-load dan Tiered Storage menangani data yang sama, keduanya berbeda dalam hal kapan dan bagaimana QueryNode menyimpan komponen-komponen ini dalam cache.</p>
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
    </button></h3><p>Dalam Penyimpanan Berjenjang, alur kerja memiliki tiga fase:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/querynode-loading-workflow.png" alt="Querynode Loading Workflow" class="doc-image" id="querynode-loading-workflow" />
   </span> <span class="img-wrapper"> <span>Alur Kerja Pemuatan Querynode</span> </span></p>
<h4 id="Lazy-load" class="common-anchor-header">Pemuatan malas</h4><p>Saat inisialisasi, Milvus melakukan lazy load, hanya menyimpan <strong>metadata</strong> yang berisi definisi skema, informasi indeks, pemetaan chunk, dan jumlah baris.</p>
<p>Tidak ada data lapangan atau file indeks yang diunduh pada tahap ini. Hal ini membuat koleksi dapat di-query dengan cepat dan meminimalkan penggunaan sumber daya startup.</p>
<p><strong>Manfaat</strong></p>
<ul>
<li><p>Waktu pemuatan koleksi yang jauh lebih cepat</p></li>
<li><p>Memori dan jejak disk yang minimal</p></li>
<li><p>Memungkinkan QueryNodes menangani lebih banyak segmen secara bersamaan</p></li>
</ul>
<p><strong>Konfigurasi</strong></p>
<p>Diterapkan secara otomatis ketika Penyimpanan Berjenjang diaktifkan. Tidak diperlukan pengaturan manual.</p>
<h4 id="Partial-load" class="common-anchor-header">Beban sebagian</h4><p>Ketika kueri atau operasi pencarian dimulai, QueryNode melakukan pemuatan parsial, hanya mengambil potongan bidang atau indeks yang diperlukan dari penyimpanan objek dan menyimpannya sementara untuk digunakan kembali.</p>
<ul>
<li><p><strong>Bidang</strong>: Dimuat sesuai permintaan pada tingkat <strong>potongan</strong> </p></li>
<li><p><strong>Indeks:</strong> Dimuat saat pertama kali diakses pada tingkat <strong>segmen</strong> </p></li>
</ul>
<p><strong>Manfaat</strong></p>
<ul>
<li><p>Mengurangi tekanan memori dan disk</p></li>
<li><p>Memungkinkan Milvus untuk melakukan kueri terhadap kumpulan data yang besar secara efisien</p></li>
<li><p>Menyeimbangkan latensi kueri dan efisiensi sumber daya</p></li>
</ul>
<p><strong>Konfigurasi</strong></p>
<p>Pemuatan sebagian adalah perilaku default ketika Penyimpanan Berjenjang diaktifkan. Untuk meminimalkan latensi hit pertama untuk bidang atau indeks yang penting, gunakan <strong>Pemanasan</strong> untuk memuat data sebelum kueri. Lihat <a href="/docs/id/warm-up.md">Pemanasan</a> untuk contoh konfigurasi.</p>
<h4 id="Eviction" class="common-anchor-header">Penggusuran</h4><p>Untuk menjaga penggunaan sumber daya yang sehat, Milvus secara otomatis melepaskan data yang di-cache yang tidak terpakai ketika ambang batas tercapai.</p>
<p>Penggusuran mengikuti kebijakan <a href="https://en.wikipedia.org/wiki/Cache_replacement_policies">Least Recently Used (LRU</a> ) dan diatur oleh parameter yang dapat dikonfigurasi:</p>
<ul>
<li><p><strong>Tanda air:</strong> Menetapkan ambang batas mulai dan berhenti untuk penggusuran</p></li>
<li><p><strong>Cache TTL:</strong> Menghapus item yang ditembolok setelah durasi yang ditentukan</p></li>
<li><p><strong>Rasio overcommit:</strong> Memungkinkan langganan berlebih sementara sebelum penggusuran dipercepat</p></li>
</ul>
<p><strong>Manfaat</strong></p>
<ul>
<li><p>Menjaga penggunaan cache tetap stabil di seluruh beban kerja</p></li>
<li><p>Memaksimalkan penggunaan kembali cache sekaligus mencegah kerusakan</p></li>
<li><p>Mempertahankan kinerja yang dapat diprediksi dari waktu ke waktu</p></li>
</ul>
<p><strong>Konfigurasi</strong></p>
<p>Aktifkan dan setel parameter penggusuran di <code translate="no">milvus.yaml</code>. Lihat <a href="/docs/id/eviction.md">Penggusuran</a> untuk konfigurasi terperinci.</p>
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
      
      <span class="hljs-comment"># Overcommit Ratios</span>
      <span class="hljs-attr">evictableMemoryCacheRatio:</span> <span class="hljs-number">0.3</span>
      <span class="hljs-attr">evictableDiskCacheRatio:</span> <span class="hljs-number">0.3</span>
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
    </button></h3><p>Jika terlalu banyak kueri yang mengakses data panas pada waktu yang sama, batas sumber daya QueryNode mungkin akan terlampaui. Beberapa thread mungkin gagal karena batas waktu pemesanan sumber daya. Mencoba kembali setelah beban berkurang, atau mengalokasikan lebih banyak sumber daya, dapat mengatasi hal ini.</p>
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
<li><p>Seringnya melakukan kueri ke data dingin, yang harus diambil dari penyimpanan.</p></li>
<li><p>Rasio overcommit yang terlalu tinggi, yang menyebabkan seringnya penggusuran.</p></li>
<li><p>Watermark yang ditetapkan terlalu berdekatan, menyebabkan seringnya penggusuran sinkron.</p></li>
</ul>
<h3 id="Can-Tiered-Storage-handle-unlimited-data-by-overcommitting-cache" class="common-anchor-header">Dapatkah Penyimpanan Berjenjang menangani data tak terbatas dengan melakukan overcommit cache?<button data-href="#Can-Tiered-Storage-handle-unlimited-data-by-overcommitting-cache" class="anchor-icon" translate="no">
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
    </button></h3><p>Rasio overcommit memungkinkan QueryNode bekerja dengan lebih banyak segmen daripada yang diizinkan oleh memori fisik, tetapi rasio yang terlalu tinggi dapat menyebabkan penggusuran yang sering terjadi, cache yang meronta-ronta, atau kegagalan kueri.</p>
