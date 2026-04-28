---
id: best-practices-for-tiered-storage.md
title: Praktik Terbaik untuk Penyimpanan BerjenjangCompatible with Milvus 2.6.4+
summary: >-
  Milvus menyediakan Penyimpanan Berjenjang untuk membantu Anda menangani data
  berskala besar secara efisien sekaligus menyeimbangkan latensi kueri,
  kapasitas, dan penggunaan sumber daya. Panduan ini merangkum konfigurasi yang
  direkomendasikan untuk beban kerja yang umum dan menjelaskan alasan di balik
  setiap strategi penyetelan.
beta: Milvus 2.6.4+
---
<h1 id="Best-Practices-for-Tiered-Storage" class="common-anchor-header">Praktik Terbaik untuk Penyimpanan Berjenjang<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Best-Practices-for-Tiered-Storage" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus menyediakan Penyimpanan Berjenjang untuk membantu Anda menangani data berskala besar secara efisien sekaligus menyeimbangkan latensi kueri, kapasitas, dan penggunaan sumber daya. Panduan ini merangkum konfigurasi yang direkomendasikan untuk beban kerja yang umum dan menjelaskan alasan di balik setiap strategi penyetelan.</p>
<h2 id="Before-you-start" class="common-anchor-header">Sebelum Anda memulai<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
<li><p>Milvus v2.6.4 atau yang lebih baru</p></li>
<li><p>QueryNodes harus memiliki sumber daya lokal khusus (memori dan disk). Lingkungan bersama dapat mendistorsi estimasi cache dan menyebabkan kesalahan penilaian penggusuran.</p></li>
</ul>
<h2 id="Choose-the-right-strategy" class="common-anchor-header">Pilih strategi yang tepat<button data-href="#Choose-the-right-strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>Tiered Storage menawarkan strategi pemuatan dan caching yang fleksibel yang dapat dikombinasikan agar sesuai dengan beban kerja Anda.</p>
<table>
   <tr>
     <th><p>Sasaran</p></th>
     <th><p>Fokus yang disarankan</p></th>
     <th><p>Mekanisme utama</p></th>
   </tr>
   <tr>
     <td><p>Meminimalkan latensi kueri pertama</p></td>
     <td><p>Memuat bidang-bidang penting secara preload</p></td>
     <td><p>Pemanasan</p></td>
   </tr>
   <tr>
     <td><p>Menangani data berskala besar secara efisien</p></td>
     <td><p>Memuat sesuai permintaan</p></td>
     <td><p>Beban Malas + Beban Parsial</p></td>
   </tr>
   <tr>
     <td><p>Menjaga stabilitas jangka panjang</p></td>
     <td><p>Mencegah cache meluap</p></td>
     <td><p>Penggusuran</p></td>
   </tr>
   <tr>
     <td><p>Menyeimbangkan kinerja dan kapasitas</p></td>
     <td><p>Menggabungkan pramuat dan cache dinamis</p></td>
     <td><p>Konfigurasi hibrida</p></td>
   </tr>
</table>
<h2 id="Scenario-1-real-time-low-latency-retrieval" class="common-anchor-header">Skenario 1: pengambilan waktu nyata dan latensi rendah<button data-href="#Scenario-1-real-time-low-latency-retrieval" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Kapan menggunakan</strong></p>
<ul>
<li><p>Latensi kueri sangat penting (misalnya, rekomendasi waktu nyata atau peringkat penelusuran)</p></li>
<li><p>Indeks vektor inti dan filter skalar sering diakses</p></li>
<li><p>Performa yang konsisten lebih penting daripada kecepatan startup</p></li>
</ul>
<p><strong>Konfigurasi yang disarankan</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">warmup:</span>
        <span class="hljs-comment"># scalar field/index warm-up to eliminate first-time latency</span>
        <span class="hljs-attr">scalarField:</span> <span class="hljs-string">sync</span>
        <span class="hljs-attr">scalarIndex:</span> <span class="hljs-string">sync</span>
        <span class="hljs-comment"># warm-up of vector fields is disabled (if the original vector is not required)</span>
        <span class="hljs-attr">vectorField:</span> <span class="hljs-string">disable</span>
        <span class="hljs-comment"># vector indexes warm-up to elminate first-time latenct</span>
        <span class="hljs-attr">vectorIndex:</span> <span class="hljs-string">sync</span>
      <span class="hljs-comment"># enable cache eviction, and also turn on background asynchronous eviction</span>
      <span class="hljs-comment"># to reduce the triggering of synchronous eviction.</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">memoryLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>
      <span class="hljs-attr">memoryHighWatermarkRatio:</span> <span class="hljs-number">0.8</span>
      <span class="hljs-attr">diskLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>
      <span class="hljs-attr">diskHighWatermarkRatio:</span> <span class="hljs-number">0.8</span>
      <span class="hljs-comment"># no expiration time, which avoids frequent reloading</span>
      <span class="hljs-attr">cacheTtl:</span> <span class="hljs-number">0</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Dasar pemikiran</strong></p>
<ul>
<li><p>Pemanasan menghilangkan latensi pada pemanggilan pertama untuk indeks skalar dan vektor frekuensi tinggi.</p></li>
<li><p>Penggusuran latar belakang mempertahankan tekanan cache yang stabil tanpa memblokir kueri.</p></li>
<li><p>Menonaktifkan TTL cache menghindari pemuatan ulang yang tidak perlu untuk data panas.</p></li>
</ul>
<h2 id="Scenario-2-offline-batch-analysis" class="common-anchor-header">Skenario 2: offline, analisis batch<button data-href="#Scenario-2-offline-batch-analysis" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Kapan digunakan</strong></p>
<ul>
<li><p>Toleransi latensi kueri tinggi</p></li>
<li><p>Beban kerja melibatkan kumpulan data yang sangat besar atau banyak segmen</p></li>
<li><p>Kapasitas dan throughput diprioritaskan di atas daya tanggap</p></li>
</ul>
<p><strong>Konfigurasi yang disarankan</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">warmup:</span>
        <span class="hljs-comment"># disable scalar field/index warm-up to speed up loading</span>
        <span class="hljs-attr">scalarField:</span> <span class="hljs-string">disable</span>
        <span class="hljs-attr">scalarIndex:</span> <span class="hljs-string">disable</span>
        <span class="hljs-comment"># disable vector field/index warm-up to speed up loading</span>
        <span class="hljs-attr">vectorField:</span> <span class="hljs-string">disable</span>
        <span class="hljs-attr">vectorIndex:</span> <span class="hljs-string">disable</span>
      <span class="hljs-comment"># enable cache eviction, and also turn on background asynchronous eviction</span>
      <span class="hljs-comment"># to reduce the triggering of synchronous eviction.</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">memoryLowWatermarkRatio:</span> <span class="hljs-number">0.7</span>
      <span class="hljs-attr">memoryHighWatermarkRatio:</span> <span class="hljs-number">0.85</span>
      <span class="hljs-attr">diskLowWatermarkRatio:</span> <span class="hljs-number">0.7</span>
      <span class="hljs-attr">diskHighWatermarkRatio:</span> <span class="hljs-number">0.85</span>
      <span class="hljs-comment"># use 1 day expiration to clean unused cache</span>
      <span class="hljs-attr">cacheTtl:</span> <span class="hljs-number">86400</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Dasar pemikiran</strong></p>
<ul>
<li><p>Menonaktifkan pemanasan akan mempercepat pengaktifan saat menginisialisasi banyak segmen.</p></li>
<li><p>Tanda air yang lebih tinggi memungkinkan penggunaan cache yang lebih padat, sehingga meningkatkan kapasitas beban total.</p></li>
<li><p>Cache TTL secara otomatis membersihkan data yang tidak terpakai untuk mengosongkan ruang lokal.</p></li>
</ul>
<h2 id="Scenario-3-hybrid-deployment-mixed-online-+-offline" class="common-anchor-header">Skenario 3: penerapan hibrida (campuran online + offline)<button data-href="#Scenario-3-hybrid-deployment-mixed-online-+-offline" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Kapan digunakan</strong></p>
<ul>
<li><p>Satu cluster melayani beban kerja online dan analitik</p></li>
<li><p>Beberapa koleksi membutuhkan latensi rendah, sementara yang lain memprioritaskan kapasitas</p></li>
</ul>
<p><strong>Strategi yang disarankan</strong></p>
<ul>
<li><p>Menerapkan <strong>konfigurasi waktu nyata</strong> ke koleksi yang sensitif terhadap latensi</p></li>
<li><p>Menerapkan <strong>konfigurasi offline</strong> ke koleksi analitik atau arsip</p></li>
<li><p>Sesuaikan rasio evictableMemoryCacheRatio, cacheTtl, dan watermark secara independen untuk setiap jenis beban kerja</p></li>
</ul>
<p><strong>Dasar pemikiran</strong></p>
<p>Menggabungkan konfigurasi memungkinkan kontrol alokasi sumber daya yang lebih baik.</p>
<p>Koleksi kritis mempertahankan jaminan latensi rendah, sementara koleksi sekunder dapat menangani lebih banyak segmen dan volume data.</p>
<h2 id="Additional-tuning-tips" class="common-anchor-header">Tips penyetelan tambahan<button data-href="#Additional-tuning-tips" class="anchor-icon" translate="no">
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
    </button></h2><table>
   <tr>
     <th><p>Aspek</p></th>
     <th><p>Rekomendasi</p></th>
     <th><p>Penjelasan</p></th>
   </tr>
   <tr>
     <td><p><strong>Lingkup Pemanasan</strong></p></td>
     <td><p>Hanya memuat bidang atau indeks yang memiliki frekuensi kueri yang tinggi.</p></td>
     <td><p>Pemuatan awal yang tidak perlu akan meningkatkan waktu muat dan penggunaan sumber daya.</p></td>
   </tr>
   <tr>
     <td><p><strong>Penyetelan penggusuran</strong></p></td>
     <td><p>Mulailah dengan tanda air default (75-80%) dan sesuaikan secara bertahap.</p></td>
     <td><p>Celah kecil menyebabkan penggusuran yang sering terjadi; celah yang besar akan menunda pelepasan sumber daya.</p></td>
   </tr>
   <tr>
     <td><p><strong>Cache TTL</strong></p></td>
     <td><p>Nonaktifkan untuk kumpulan data panas yang stabil; aktifkan (misalnya, 1-3 hari) untuk data dinamis.</p></td>
     <td><p>Mencegah penumpukan cache yang basi sekaligus menyeimbangkan overhead pembersihan.</p></td>
   </tr>
   <tr>
     <td><p><strong>Rasio overcommit</strong></p></td>
     <td><p>Hindari nilai &gt; 0,7 kecuali jika ruang sumber daya besar.</p></td>
     <td><p>Overcommit yang berlebihan dapat menyebabkan cache meronta-ronta dan latensi yang tidak stabil.</p></td>
   </tr>
   <tr>
     <td><p><strong>Pemantauan</strong></p></td>
     <td><p>Pantau rasio hit cache, pemanfaatan sumber daya, dan frekuensi penggusuran.</p></td>
     <td><p>Beban dingin yang sering terjadi dapat mengindikasikan bahwa pemanasan atau tanda air perlu disesuaikan.</p></td>
   </tr>
</table>
