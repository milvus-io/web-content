---
id: gpu-index-overview.md
title: Ikhtisar Indeks GPU
summary: >-
  Membangun indeks dengan dukungan GPU di Milvus dapat secara signifikan
  meningkatkan performa pencarian dalam skenario throughput tinggi dan recall
  tinggi.
---
<h1 id="GPU-Index-Overview" class="common-anchor-header">Ikhtisar Indeks GPU<button data-href="#GPU-Index-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Membangun indeks dengan dukungan GPU di Milvus dapat secara signifikan meningkatkan performa pencarian dalam skenario throughput dan recall tinggi.</p>
<p>Gambar berikut ini membandingkan throughput kueri (kueri per detik) di seluruh konfigurasi indeks, pengaturan perangkat keras, kumpulan data vektor (Cohere dan OpenAI), dan ukuran kumpulan pencarian, yang menunjukkan bahwa <code translate="no">GPU_CAGRA</code> secara konsisten mengungguli metode lainnya.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/gpu-index-performance.png" alt="Gpu Index Performance" class="doc-image" id="gpu-index-performance" />
   </span> <span class="img-wrapper"> <span>Kinerja Indeks Gpu</span> </span></p>
<h2 id="Configure-GPU-memory-pool-for-Milvus" class="common-anchor-header">Mengonfigurasi kumpulan memori GPU untuk Milvus<button data-href="#Configure-GPU-memory-pool-for-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus mendukung kumpulan memori GPU global dan menyediakan dua parameter konfigurasi, <code translate="no">initMemSize</code> dan <code translate="no">maxMemSize</code>, dalam <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml#L767-L769">file konfigurasi Milvus</a>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">gpu:</span>
  <span class="hljs-attr">initMemSize:</span> <span class="hljs-number">0</span> <span class="hljs-comment"># set the initial memory pool size.</span>
  <span class="hljs-attr">maxMemSize:</span> <span class="hljs-number">0</span> <span class="hljs-comment"># sets the maximum memory usage limit. When the memory usage exceeds initMemSize, Milvus will attempt to expand the memory pool.</span>
<button class="copy-code-btn"></button></code></pre>
<p>Default <code translate="no">initMemSize</code> biasanya setengah dari memori GPU ketika Milvus dimulai, dan <code translate="no">maxMemSize</code> default untuk seluruh memori GPU. Ukuran pool memori GPU pada awalnya diatur ke <code translate="no">initMemSize</code> dan secara otomatis akan diperluas ke <code translate="no">maxMemSize</code> sesuai kebutuhan.</p>
<p>Ketika indeks yang mendukung GPU ditentukan, Milvus memuat data koleksi target ke dalam memori GPU sebelum melakukan pencarian, sehingga <code translate="no">maxMemSize</code> harus berukuran minimal sama dengan ukuran data.</p>
<h2 id="Limits" class="common-anchor-header">Batas<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>Untuk <code translate="no">GPU_IVF_FLAT</code>, nilai maksimum untuk <code translate="no">limit</code> adalah 1.024.</p></li>
<li><p>Untuk <code translate="no">GPU_IVF_PQ</code> dan <code translate="no">GPU_CAGRA</code>, nilai maksimum untuk <code translate="no">limit</code> adalah 1.024.</p></li>
<li><p>Meskipun tidak ada batasan <code translate="no">limit</code> untuk <code translate="no">GPU_BRUTE_FORCE</code>, disarankan untuk tidak melebihi 4.096 untuk menghindari potensi masalah kinerja.</p></li>
<li><p>Saat ini, indeks GPU tidak mendukung jarak <code translate="no">COSINE</code>. Jika jarak <code translate="no">COSINE</code> diperlukan, data harus dinormalisasi terlebih dahulu, dan kemudian jarak inner product (IP) dapat digunakan sebagai pengganti.</p></li>
<li><p>Memuat perlindungan OOM untuk indeks GPU tidak sepenuhnya didukung, terlalu banyak data dapat menyebabkan QueryNode mengalami crash.</p></li>
<li><p>Indeks GPU tidak mendukung fungsi pencarian seperti <a href="/docs/id/range-search.md">pencarian rentang</a> dan <a href="/docs/id/grouping-search.md">pencarian pengelompokan</a>.</p></li>
</ul>
<h2 id="Supported-GPU-index-types" class="common-anchor-header">Jenis indeks GPU yang didukung<button data-href="#Supported-GPU-index-types" class="anchor-icon" translate="no">
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
    </button></h2><p>Tabel berikut mencantumkan jenis indeks GPU yang didukung oleh Milvus.</p>
<table>
   <tr>
     <th><p>Jenis Indeks</p></th>
     <th><p>Deskripsi</p></th>
     <th><p>Penggunaan Memori</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/id/gpu-cagra.md">GPU_CAGRA</a></p></td>
     <td><p>GPU_CAGRA adalah indeks berbasis grafik yang dioptimalkan untuk GPU, Menggunakan GPU kelas inferensi untuk menjalankan versi GPU Milvus dapat lebih hemat biaya dibandingkan dengan menggunakan GPU kelas pelatihan yang mahal.</p></td>
     <td><p>Penggunaan memori sekitar 1,8 kali lipat dari data vektor asli.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/id/gpu-ivf-flat.md">GPU_IVF_FLAT</a></p></td>
     <td><p>GPU_IVF_FLAT adalah indeks IVF yang paling dasar, dan data yang disandikan yang disimpan di setiap unit konsisten dengan data asli. Saat melakukan pencarian, perhatikan bahwa Anda dapat mengatur top-k (<code translate="no">limit</code>) hingga 256 untuk pencarian apa pun terhadap koleksi yang diindeks GPU_IVF_FLAT.</p></td>
     <td><p>Memerlukan memori yang sama dengan ukuran data asli.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/id/gpu-ivf-pq.md">GPU_IVF_PQ</a></p></td>
     <td><p>GPU_IVF_PQ melakukan pengelompokan indeks IVF sebelum mengkuantisasi hasil perkalian vektor. Saat melakukan pencarian, perhatikan bahwa Anda dapat mengatur top-k (<code translate="no">limit</code>) hingga 8.192 untuk setiap pencarian terhadap koleksi yang diindeks GPU_IVF_FLAT.</p></td>
     <td><p>Memanfaatkan jejak memori yang lebih kecil, yang bergantung pada pengaturan parameter kompresi.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/id/gpu-brute-force.md">GPU_BRUTE_FORCE</a></p></td>
     <td><p>GPU_BRUTE_FORCE dirancang untuk kasus-kasus di mana pemanggilan yang sangat tinggi sangat penting, menjamin pemanggilan 1 dengan membandingkan setiap kueri dengan semua vektor dalam kumpulan data. Hanya membutuhkan tipe metrik (<code translate="no">metric_type</code>) dan top-k (<code translate="no">limit</code>) sebagai parameter pembangunan indeks dan pencarian.</p></td>
     <td><p>Membutuhkan memori yang sama dengan ukuran data asli.</p></td>
   </tr>
</table>
<h2 id="Configure-Milvus-settings-for-GPU-memory-control" class="common-anchor-header">Mengonfigurasi pengaturan Milvus untuk kontrol memori GPU<button data-href="#Configure-Milvus-settings-for-GPU-memory-control" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus menggunakan kumpulan memori grafis global untuk mengalokasikan memori GPU. Ini mendukung dua parameter <code translate="no">initMemSize</code> dan <code translate="no">maxMemSize</code> dalam <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml#L767-L769">file konfigurasi Milvus</a>. Ukuran pool pada awalnya diatur ke <code translate="no">initMemSize</code>, dan akan secara otomatis diperluas ke <code translate="no">maxMemSize</code> setelah melebihi batas ini.</p>
<p>Default <code translate="no">initMemSize</code> adalah 1/2 dari memori GPU yang tersedia saat Milvus dijalankan, dan default <code translate="no">maxMemSize</code> sama dengan semua memori GPU yang tersedia.</p>
<p>Hingga Milvus 2.4.1, Milvus menggunakan kumpulan memori GPU terpadu. Untuk versi sebelum 2.4.1, direkomendasikan untuk mengatur kedua nilai tersebut ke 0.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">gpu:</span>
  <span class="hljs-attr">initMemSize:</span> <span class="hljs-number">0</span> <span class="hljs-comment">#set the initial memory pool size.</span>
  <span class="hljs-attr">maxMemSize:</span> <span class="hljs-number">0</span> <span class="hljs-comment">#maxMemSize sets the maximum memory usage limit. When the memory usage exceed initMemSize, Milvus will attempt to expand the memory pool. </span>
<button class="copy-code-btn"></button></code></pre>
<p>Mulai Milvus 2.4.1 dan seterusnya, kumpulan memori GPU hanya digunakan untuk data GPU sementara selama pencarian. Oleh karena itu, disarankan untuk mengaturnya ke 2048 dan 4096.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">gpu:</span>
  <span class="hljs-attr">initMemSize:</span> <span class="hljs-number">2048</span> <span class="hljs-comment">#set the initial memory pool size.</span>
  <span class="hljs-attr">maxMemSize:</span> <span class="hljs-number">4096</span> <span class="hljs-comment">#maxMemSize sets the maximum memory usage limit. When the memory usage exceed initMemSize, Milvus will attempt to expand the memory pool. </span>
<button class="copy-code-btn"></button></code></pre>
<p>Untuk mempelajari cara membuat indeks GPU, lihat panduan khusus untuk setiap jenis indeks.</p>
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
    </button></h2><ul>
<li><p><strong>Kapan waktu yang tepat untuk menggunakan indeks GPU?</strong></p>
<p>Indeks GPU sangat bermanfaat dalam situasi yang menuntut throughput tinggi atau recall tinggi. Misalnya, saat menangani batch besar, throughput pengindeksan GPU dapat melampaui throughput pengindeksan CPU sebanyak 100 kali lipat. Dalam skenario dengan batch yang lebih kecil, indeks GPU masih secara signifikan mengungguli indeks CPU dalam hal kinerja. Selain itu, jika ada persyaratan untuk penyisipan data yang cepat, menggabungkan GPU dapat mempercepat proses pembuatan indeks secara substansial.</p></li>
<li><p><strong>Dalam skenario apa indeks GPU seperti GPU_CAGRA, GPU_IVF_PQ, GPU_IVF_FLAT, dan GPU_BRUTE_FORCE paling cocok?</strong></p>
<p><code translate="no">GPU_CAGRA</code> Indeks ini ideal untuk skenario yang menuntut peningkatan performa, meskipun dengan mengorbankan konsumsi memori yang lebih besar. Untuk lingkungan di mana konservasi memori menjadi prioritas, indeks <code translate="no">GPU_IVF_PQ</code> dapat membantu meminimalkan kebutuhan penyimpanan, meskipun hal ini disertai dengan kehilangan presisi yang lebih tinggi. Indeks <code translate="no">GPU_IVF_FLAT</code> berfungsi sebagai opsi yang seimbang, menawarkan kompromi antara kinerja dan penggunaan memori. Terakhir, indeks <code translate="no">GPU_BRUTE_FORCE</code> dirancang untuk operasi pencarian yang lengkap, menjamin tingkat recall 1 dengan melakukan pencarian traversal.</p></li>
</ul>
