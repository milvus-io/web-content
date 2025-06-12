---
id: hnsw-prq.md
title: HNSW_PRQ
summary: >-
  HNSW_PRQ memanfaatkan grafik Hierarchical Navigable Small World (HNSW) dengan
  Product Residual Quantization (PRQ), menawarkan metode pengindeksan vektor
  tingkat lanjut yang memungkinkan Anda untuk menyelaraskan antara ukuran indeks
  dan akurasi. PRQ melampaui Kuantisasi Produk (PQ) tradisional dengan
  memperkenalkan langkah kuantisasi residu (RQ) untuk menangkap informasi
  tambahan, sehingga menghasilkan akurasi yang lebih tinggi atau indeks yang
  lebih ringkas dibandingkan dengan metode berbasis PQ murni. Namun, langkah
  tambahan ini dapat menyebabkan overhead komputasi yang lebih tinggi selama
  pembuatan indeks dan pencarian.
---
<h1 id="HNSWPRQ" class="common-anchor-header">HNSW_PRQ<button data-href="#HNSWPRQ" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>HNSW_PRQ</strong> memanfaatkan grafik Hierarchical Navigable Small World (HNSW) dengan Product Residual Quantization (PRQ), menawarkan metode pengindeksan vektor tingkat lanjut yang memungkinkan Anda untuk menyesuaikan secara tepat antara ukuran dan akurasi indeks. PRQ melampaui Kuantisasi Produk (PQ) tradisional dengan memperkenalkan langkah kuantisasi residu (RQ) untuk menangkap informasi tambahan, sehingga menghasilkan akurasi yang lebih tinggi atau indeks yang lebih ringkas dibandingkan dengan metode berbasis PQ murni. Namun, langkah tambahan ini dapat menyebabkan overhead komputasi yang lebih tinggi selama pembuatan dan pencarian indeks.</p>
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
    </button></h2><p>HNSW_PRQ menggabungkan dua teknik pengindeksan: <strong>HSNW</strong> untuk navigasi berbasis grafik yang cepat dan <strong>PRQ</strong> untuk kompresi vektor yang efisien.</p>
<h3 id="HNSW" class="common-anchor-header">HNSW</h3><p>HNSW membangun grafik multi-layer di mana setiap node berhubungan dengan sebuah vektor dalam kumpulan data. Dalam grafik ini, node terhubung berdasarkan kesamaan mereka, memungkinkan penjelajahan yang cepat melalui ruang data. Struktur hirarkis memungkinkan algoritme pencarian untuk mempersempit kandidat tetangga, sehingga secara signifikan mempercepat proses pencarian dalam ruang dimensi tinggi.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/hnsw.md">HNSW</a>.</p>
<h3 id="PRQ" class="common-anchor-header">PRQ</h3><p>PRQ adalah pendekatan kompresi vektor multi-tahap yang menggabungkan dua teknik yang saling melengkapi: PQ dan RQ. Dengan terlebih dahulu membagi vektor dimensi tinggi menjadi sub-vektor yang lebih kecil (melalui PQ) dan kemudian mengkuantifikasi perbedaan yang tersisa (melalui RQ), PRQ mencapai representasi yang ringkas namun akurat dari data asli.</p>
<p>Gambar berikut menunjukkan cara kerjanya.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/hnsw-prq.png" alt="Hnsw Prq" class="doc-image" id="hnsw-prq" />
   </span> <span class="img-wrapper"> <span>Hnsw Prq</span> </span></p>
<ol>
<li><p><strong>Kuantisasi Produk (PQ)</strong></p>
<p>Pada fase ini, vektor asli dibagi menjadi sub-vektor yang lebih kecil, dan setiap sub-vektor dipetakan ke centroid terdekat dalam codebook yang dipelajari. Pemetaan ini secara signifikan mengurangi ukuran data, namun menimbulkan beberapa kesalahan pembulatan karena setiap sub-vektor didekati oleh satu centroid. Untuk lebih jelasnya, lihat <a href="/docs/id/ivf-pq.md#PQ">IVF_PQ</a>.</p></li>
<li><p><strong>Kuantisasi Sisa (RQ)</strong></p>
<p>Setelah tahap PQ, RQ mengkuantisasi residual-selisih antara vektor asli dan perkiraan berbasis PQ-menggunakan codebook tambahan. Karena residual ini biasanya jauh lebih kecil, maka dapat dikodekan dengan lebih tepat tanpa peningkatan penyimpanan yang besar.</p>
<p>Parameter <code translate="no">nrq</code> menentukan berapa kali residual ini dikuantisasi secara iteratif, sehingga Anda dapat menyempurnakan keseimbangan antara efisiensi dan akurasi kompresi.</p></li>
<li><p><strong>Representasi Kompresi Akhir</strong></p>
<p>Setelah RQ selesai mengkuantifikasi residual, kode integer dari PQ dan RQ digabungkan menjadi satu indeks terkompresi. Dengan menangkap detail halus yang mungkin terlewatkan oleh PQ, RQ meningkatkan akurasi tanpa menyebabkan peningkatan penyimpanan yang signifikan. Sinergi antara PQ dan RQ inilah yang mendefinisikan PRQ.</p></li>
</ol>
<h3 id="HNSW-+-PRQ" class="common-anchor-header">HNSW + PRQ</h3><p>Dengan menggabungkan HNSW dengan PRQ, <strong>HNSW_PRQ</strong> mempertahankan pencarian berbasis grafik yang cepat dari HNSW sambil memanfaatkan kompresi multi-tahap dari PRQ. Alur kerjanya terlihat seperti ini:</p>
<ol>
<li><p><strong>Kompresi Data:</strong> Setiap vektor pertama-tama ditransformasikan melalui PQ ke representasi kasar, dan kemudian residu dikuantisasi melalui RQ untuk penyempurnaan lebih lanjut. Hasilnya adalah sekumpulan kode ringkas yang mewakili setiap vektor.</p></li>
<li><p><strong>Konstruksi Graf:</strong> Vektor-vektor yang dikompresi (termasuk kode PQ dan RQ) menjadi dasar untuk membangun grafik HNSW. Karena data disimpan dalam bentuk yang ringkas, grafik membutuhkan lebih sedikit memori, dan navigasi melaluinya dipercepat.</p></li>
<li><p><strong>Pengambilan Kandidat:</strong> Selama pencarian, HNSW menggunakan representasi terkompresi untuk menelusuri graf dan mengambil sekumpulan kandidat. Hal ini secara dramatis mengurangi jumlah vektor yang perlu dipertimbangkan.</p></li>
<li><p><strong>(Opsional) Penyempurnaan Hasil:</strong> Hasil kandidat awal dapat disempurnakan untuk akurasi yang lebih baik, berdasarkan parameter berikut:</p>
<ul>
<li><p><code translate="no">refine</code>: Mengontrol apakah langkah penyempurnaan ini diaktifkan. Ketika diatur ke <code translate="no">true</code>, sistem menghitung ulang jarak menggunakan representasi yang lebih presisi atau tidak terkompresi.</p></li>
<li><p><code translate="no">refine_type</code>: Menentukan tingkat presisi data yang digunakan selama penghalusan (misalnya, SQ6, SQ8, BF16). Pilihan presisi yang lebih tinggi seperti <code translate="no">FP32</code> dapat memberikan hasil yang lebih akurat tetapi membutuhkan lebih banyak memori. Ini harus melebihi ketepatan data terkompresi asli yang ditetapkan oleh <code translate="no">sq_type</code>.</p></li>
<li><p><code translate="no">refine_k</code>: Bertindak sebagai faktor pembesaran. Misalnya, jika <em>k</em> teratas Anda adalah 100 dan <code translate="no">refine_k</code> adalah 2, sistem akan mengurutkan ulang 200 kandidat teratas dan mengembalikan 100 terbaik, sehingga meningkatkan akurasi secara keseluruhan.</p></li>
</ul></li>
</ol>
<p>Untuk daftar lengkap parameter dan nilai yang valid, lihat Parameter <a href="/docs/id/hnsw-prq.md#Index-params">indeks</a>.</p>
<h2 id="Build-index" class="common-anchor-header">Membangun indeks<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk membangun indeks <code translate="no">HNSW_PRQ</code> pada bidang vektor di Milvus, gunakan metode <code translate="no">add_index()</code>, tentukan <code translate="no">index_type</code>, <code translate="no">metric_type</code>, dan parameter tambahan untuk indeks.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;HNSW_PRQ&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">30</span>, <span class="hljs-comment"># Maximum number of neighbors each node can connect to in the graph</span>
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">360</span>, <span class="hljs-comment"># Number of candidate neighbors considered for connection during index construction</span>
        <span class="hljs-string">&quot;m&quot;</span>: <span class="hljs-number">384</span>, 
        <span class="hljs-string">&quot;nbits&quot;</span>: <span class="hljs-number">8</span>,
        <span class="hljs-string">&quot;nrq&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;refine&quot;</span>: true, <span class="hljs-comment"># Whether to enable the refinement step</span>
        <span class="hljs-string">&quot;refine_type&quot;</span>: <span class="hljs-string">&quot;SQ8&quot;</span> <span class="hljs-comment"># Precision level of data used for refinement</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Dalam konfigurasi ini:</p>
<ul>
<li><p><code translate="no">index_type</code>: Jenis indeks yang akan dibangun. Dalam contoh ini, tetapkan nilainya ke <code translate="no">HNSW_PQ</code>.</p></li>
<li><p><code translate="no">metric_type</code>: Metode yang digunakan untuk menghitung jarak antara vektor. Nilai yang didukung termasuk <code translate="no">COSINE</code>, <code translate="no">L2</code>, dan <code translate="no">IP</code>. Untuk detailnya, lihat <a href="/docs/id/metric.md">Jenis Metrik</a>.</p></li>
<li><p><code translate="no">params</code>: Opsi konfigurasi tambahan untuk membangun indeks. Untuk detailnya, lihat <a href="/docs/id/hnsw-prq.md#Index-building-params">Parameter pembuatan indeks</a>.</p></li>
</ul>
<p>Setelah parameter indeks dikonfigurasi, Anda dapat membuat indeks dengan menggunakan metode <code translate="no">create_index()</code> secara langsung atau mengoper parameter indeks dalam metode <code translate="no">create_collection</code>. Untuk detailnya, lihat <a href="/docs/id/create-collection.md">Membuat Koleksi</a>.</p>
<h2 id="Search-on-index" class="common-anchor-header">Mencari di indeks<button data-href="#Search-on-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Setelah indeks dibuat dan entitas dimasukkan, Anda dapat melakukan pencarian kemiripan pada indeks.</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;ef&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Parameter controlling query time/accuracy trade-off</span>
        <span class="hljs-string">&quot;refine_k&quot;</span>: <span class="hljs-number">1</span> <span class="hljs-comment"># The magnification factor</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,  <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>Dalam konfigurasi ini:</p>
<ul>
<li><code translate="no">params</code>: Opsi konfigurasi tambahan untuk pencarian pada indeks. Untuk detailnya, lihat <a href="/docs/id/hnsw-prq.md#Index-specific-search-params">Parameter pencarian khusus indeks</a>.</li>
</ul>
<h2 id="Index-params" class="common-anchor-header">Parameter indeks<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>Bagian ini memberikan gambaran umum tentang parameter yang digunakan untuk membangun indeks dan melakukan pencarian pada indeks.</p>
<h3 id="Index-building-params" class="common-anchor-header">Parameter pembuatan indeks</h3><p>Tabel berikut mencantumkan parameter yang dapat dikonfigurasi di <code translate="no">params</code> saat <a href="/docs/id/hnsw-prq.md#Build-index">membangun indeks.</a></p>
<table>
   <tr>
     <th></th>
     <th><p>Parameter</p></th>
     <th><p>Deskripsi</p></th>
     <th><p>Rentang Nilai</p></th>
     <th><p>Saran Penyetelan</p></th>
   </tr>
   <tr>
     <td><p>HNSW</p></td>
     <td><p><code translate="no">M</code></p></td>
     <td><p>Jumlah maksimum koneksi (atau sisi) yang dapat dimiliki setiap simpul dalam graf, termasuk sisi keluar dan masuk. Parameter ini secara langsung memengaruhi konstruksi indeks dan pencarian.</p></td>
     <td><p><strong>Tipe</strong>: Bilangan bulat <strong>Rentang</strong>: [2, 2048]</p>
<p><strong>Nilai default</strong>: <code translate="no">30</code> (hingga 30 sisi keluar dan 30 sisi masuk per simpul)</p></td>
     <td><p><code translate="no">M</code> yang lebih besar umumnya menghasilkan <strong>akurasi yang lebih tinggi</strong> tetapi <strong>meningkatkan overhead memori</strong> dan <strong>memperlambat pembangunan indeks dan pencarian</strong>. Pertimbangkan untuk meningkatkan <code translate="no">M</code> untuk set data dengan dimensi tinggi atau ketika pemanggilan yang tinggi sangat penting.</p>
<p>Pertimbangkan untuk mengurangi <code translate="no">M</code> ketika penggunaan memori dan kecepatan pencarian menjadi perhatian utama.</p>
<p>Dalam kebanyakan kasus, kami sarankan Anda menetapkan nilai dalam kisaran ini: [5, 100].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">efConstruction</code></p></td>
     <td><p>Jumlah kandidat tetangga yang dipertimbangkan untuk koneksi selama konstruksi indeks. Kumpulan kandidat yang lebih besar dievaluasi untuk setiap elemen baru, tetapi jumlah maksimum koneksi yang benar-benar dibuat masih dibatasi oleh <code translate="no">M</code>.</p></td>
     <td><p><strong>Tipe</strong>: Bilangan bulat <strong>Rentang</strong>: [1, <em>int_max</em>]</p>
<p><strong>Nilai default</strong>: <code translate="no">360</code></p></td>
     <td><p>Nilai <code translate="no">efConstruction</code> yang lebih tinggi biasanya menghasilkan <strong>indeks yang lebih akurat</strong>, karena lebih banyak koneksi potensial yang dieksplorasi. Namun, hal ini juga menyebabkan <strong>waktu pengindeksan yang lebih lama dan peningkatan penggunaan memori</strong> selama konstruksi. Pertimbangkan untuk meningkatkan <code translate="no">efConstruction</code> untuk meningkatkan akurasi, terutama dalam skenario di mana waktu pengindeksan tidak terlalu penting.</p>
<p>Pertimbangkan untuk mengurangi <code translate="no">efConstruction</code> untuk mempercepat konstruksi indeks ketika keterbatasan sumber daya menjadi perhatian.</p>
<p>Dalam kebanyakan kasus, kami menyarankan Anda menetapkan nilai dalam kisaran ini: [50, 500].</p></td>
   </tr>
   <tr>
     <td><p>PRQ</p></td>
     <td><p><code translate="no">m</code></p></td>
     <td><p>Jumlah sub-vektor (digunakan untuk kuantisasi) untuk membagi setiap vektor berdimensi tinggi selama proses kuantisasi.</p></td>
     <td><p><strong>Jenis</strong>: Bilangan bulat <strong>Rentang</strong>: [1, 65536]</p>
<p><strong>Nilai default</strong>: Tidak ada</p></td>
     <td><p>Nilai <code translate="no">m</code> yang lebih tinggi dapat meningkatkan akurasi, tetapi juga meningkatkan kompleksitas komputasi dan penggunaan memori. <code translate="no">m</code> harus merupakan pembagi dimensi vektor<em>(D)</em> untuk memastikan penguraian yang tepat. Nilai yang umumnya direkomendasikan adalah <em>m = D/2</em>.</p>
<p>Dalam kebanyakan kasus, kami sarankan Anda menetapkan nilai dalam kisaran ini: [D/8, D].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">nbits</code></p></td>
     <td><p>Jumlah bit yang digunakan untuk merepresentasikan indeks centroid setiap sub-vektor dalam bentuk terkompresi. Ini secara langsung menentukan ukuran setiap codebook. Setiap codebook akan berisi $2^{\textit{nbits}}$ centroid. Sebagai contoh, jika <code translate="no">nbits</code> diatur ke 8, setiap sub-vektor akan diwakili oleh indeks centroid 8-bit. Hal ini memungkinkan adanya $2^8$ (256) kemungkinan centroid dalam buku kode untuk sub-vektor tersebut.</p></td>
     <td><p><strong>Jenis</strong>: <strong>Rentang</strong> Bilangan Bulat: [1, 64]</p>
<p><strong>Nilai default</strong>: <code translate="no">8</code></p></td>
     <td><p>Nilai <code translate="no">nbits</code> yang lebih tinggi memungkinkan codebook yang lebih besar, yang berpotensi menghasilkan representasi yang lebih akurat dari vektor asli. Namun, ini juga berarti menggunakan lebih banyak bit untuk menyimpan setiap indeks, yang menghasilkan kompresi yang lebih sedikit. Dalam kebanyakan kasus, kami sarankan Anda menetapkan nilai dalam kisaran ini: [1, 16].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">nrq</code></p></td>
     <td><p>Mengontrol berapa banyak subkuantisasi sisa yang digunakan dalam tahap RQ. Lebih banyak subkuantisasi berpotensi mencapai kompresi yang lebih besar, tetapi dapat menyebabkan lebih banyak kehilangan informasi.</p></td>
     <td><p><strong>Tipe</strong>: <strong>Rentang</strong> Bilangan Bulat: [1, 16]</p>
<p><strong>Nilai default</strong>: <code translate="no">2</code></p></td>
     <td><p>Nilai <code translate="no">nrq</code> yang lebih tinggi memungkinkan langkah subkuantisasi sisa tambahan, yang berpotensi menghasilkan rekonstruksi yang lebih tepat dari vektor asli. Namun, hal ini juga berarti menyimpan dan menghitung lebih banyak subkuantisasi, sehingga menghasilkan ukuran indeks yang lebih besar dan overhead komputasi yang lebih besar.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>Bendera boolean yang mengontrol apakah langkah penyempurnaan diterapkan selama pencarian. Refinement melibatkan pemeringkatan ulang hasil awal dengan menghitung jarak yang tepat antara vektor kueri dan kandidat.</p></td>
     <td><p><strong>Jenis</strong>: <strong>Rentang</strong> Boolean: [<code translate="no">true</code>, <code translate="no">false</code>]</p>
<p><strong>Nilai default</strong>: <code translate="no">false</code></p></td>
     <td><p>Setel ke <code translate="no">true</code> jika akurasi tinggi sangat penting dan Anda dapat mentolerir waktu pencarian yang sedikit lebih lambat. Gunakan <code translate="no">false</code> jika kecepatan adalah prioritas dan kompromi kecil dalam akurasi dapat diterima.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine_type</code></p></td>
     <td><p>Menentukan ketepatan data yang digunakan selama proses penghalusan. Ketepatan ini harus lebih tinggi daripada vektor yang dikompresi (seperti yang ditetapkan oleh parameter <code translate="no">m</code> dan <code translate="no">nbits</code> ).</p></td>
     <td><p><strong>Jenis</strong>: <strong>Rentang</strong> String:[ <code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code>, <code translate="no">FP32</code> ]</p>
<p><strong>Nilai default</strong>: Tidak ada</p></td>
     <td><p>Gunakan <code translate="no">FP32</code> untuk presisi maksimum dengan biaya memori yang lebih tinggi, atau <code translate="no">SQ6</code>/<code translate="no">SQ8</code> untuk kompresi yang lebih baik. <code translate="no">BF16</code> dan <code translate="no">FP16</code> menawarkan alternatif yang seimbang.</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Parameter pencarian khusus indeks</h3><p>Tabel berikut mencantumkan parameter yang dapat dikonfigurasi di <code translate="no">search_params.params</code> saat <a href="/docs/id/hnsw-prq.md#Search-on-index">mencari di indeks</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>Parameter</p></th>
     <th><p>Deskripsi</p></th>
     <th><p>Rentang Nilai</p></th>
     <th><p>Saran Penyetelan</p></th>
   </tr>
   <tr>
     <td><p>HNSW</p></td>
     <td><p><code translate="no">ef</code></p></td>
     <td><p>Mengontrol luasnya pencarian selama pencarian tetangga terdekat. Parameter ini menentukan berapa banyak node yang dikunjungi dan dievaluasi sebagai tetangga terdekat yang potensial. 
 Parameter ini hanya memengaruhi proses pencarian dan berlaku secara eksklusif pada lapisan bawah grafik.</p></td>
     <td><p><strong>Tipe</strong>: Bilangan bulat <strong>Rentang</strong>: [1, <em>int_max</em>]</p>
<p><strong>Nilai default</strong>: <em>batas</em> (tetangga terdekat TopK yang akan dikembalikan)</p></td>
     <td><p><code translate="no">ef</code> yang lebih besar umumnya menghasilkan <strong>akurasi pencarian yang lebih tinggi</strong> karena lebih banyak tetangga potensial yang dipertimbangkan. Namun, hal ini juga <strong>meningkatkan waktu pencarian</strong>. Pertimbangkan untuk meningkatkan <code translate="no">ef</code> ketika mencapai recall yang tinggi sangat penting dan kecepatan pencarian tidak terlalu menjadi perhatian.</p>
<p>Pertimbangkan untuk mengurangi <code translate="no">ef</code> untuk memprioritaskan pencarian yang lebih cepat, terutama dalam skenario di mana sedikit penurunan akurasi dapat diterima.</p>
<p>Dalam kebanyakan kasus, kami sarankan Anda menetapkan nilai dalam kisaran ini: [K, 10K].</p></td>
   </tr>
   <tr>
     <td><p>PRQ</p></td>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>Faktor pembesaran yang mengontrol berapa banyak kandidat tambahan yang diperiksa selama tahap penyempurnaan (pemeringkatan ulang), relatif terhadap hasil K teratas yang diminta.</p></td>
     <td><p><strong>Tipe</strong> <strong>Rentang</strong> Float: [1, <em>float_max</em>)</p>
<p><strong>Nilai default</strong>: 1</p></td>
     <td><p>Nilai yang lebih tinggi dari <code translate="no">refine_k</code> dapat meningkatkan recall dan akurasi tetapi juga akan meningkatkan waktu pencarian dan penggunaan sumber daya. Nilai 1 berarti proses penyempurnaan hanya mempertimbangkan hasil K teratas awal.</p></td>
   </tr>
</table>
