---
id: diskann.md
title: DISKANN
summary: >-
  Dalam skenario berskala besar, di mana dataset dapat mencakup miliaran atau
  bahkan triliunan vektor, metode pengindeksan dalam memori standar (misalnya,
  HNSW, IVF_FLAT) sering kali tidak dapat mengimbangi karena keterbatasan
  memori. DISKANN menawarkan pendekatan berbasis disk yang menjawab tantangan
  ini dengan mempertahankan akurasi dan kecepatan pencarian yang tinggi ketika
  ukuran dataset melebihi RAM yang tersedia.
---
<h1 id="DISKANN" class="common-anchor-header">DISKANN<button data-href="#DISKANN" class="anchor-icon" translate="no">
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
    </button></h1><p>Dalam skenario berskala besar, di mana kumpulan data dapat mencakup miliaran atau bahkan triliunan vektor, metode pengindeksan dalam memori standar (misalnya, <a href="/docs/id/v2.6.x/hnsw.md">HNSW</a>, <a href="/docs/id/v2.6.x/ivf-flat.md">IVF_FLAT</a>) sering kali tidak dapat mengimbangi karena keterbatasan memori. <strong>DISKANN</strong> menawarkan pendekatan berbasis disk yang mengatasi tantangan ini dengan mempertahankan akurasi dan kecepatan pencarian yang tinggi ketika ukuran dataset melebihi RAM yang tersedia.</p>
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
    </button></h2><p><strong>DISKANN</strong> menggabungkan dua teknik utama untuk pencarian vektor yang efisien:</p>
<ul>
<li><p><strong>Vamana Graph</strong> - Indeks <strong>berbasis disk</strong>, <strong>berbasis grafik</strong> yang menghubungkan titik data (atau vektor) untuk navigasi yang efisien selama pencarian.</p></li>
<li><p><strong>Product Quantization (PQ</strong> ) - Metode kompresi <strong>dalam memori</strong> yang mengurangi ukuran vektor, sehingga memungkinkan penghitungan perkiraan jarak antar vektor dengan cepat.</p></li>
</ul>
<h3 id="Index-construction" class="common-anchor-header">Konstruksi indeks</h3><h4 id="Vamana-graph" class="common-anchor-header">Grafik Vamana</h4><p>Grafik Vamana adalah pusat dari strategi berbasis disk DISKANN. Grafik ini dapat menangani kumpulan data yang sangat besar karena tidak perlu sepenuhnya berada di memori selama atau setelah konstruksi.</p>
<p>Gambar berikut ini menunjukkan bagaimana graf Vamana dibangun.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/diskann.png" alt="Diskann" class="doc-image" id="diskann" />
   </span> <span class="img-wrapper"> <span>Diskann</span> </span></p>
<ol>
<li><p><strong>Koneksi acak awal:</strong> Setiap titik data (vektor) direpresentasikan sebagai sebuah simpul dalam graf. Node-node ini pada awalnya terhubung secara acak, membentuk sebuah jaringan yang padat. Biasanya, sebuah simpul dimulai dengan sekitar 500 sisi (atau koneksi) untuk konektivitas yang luas.</p></li>
<li><p><strong>Pemurnian untuk efisiensi:</strong> Graf acak awal mengalami proses optimasi untuk membuatnya lebih efisien untuk pencarian. Hal ini melibatkan dua langkah utama:</p>
<ul>
<li><p><strong>Memangkas sisi yang berlebihan:</strong> Algoritme membuang koneksi yang tidak perlu berdasarkan jarak antar simpul. Langkah ini memprioritaskan sisi-sisi yang berkualitas lebih tinggi.</p>
<p>Parameter <code translate="no">max_degree</code> membatasi jumlah maksimum sisi per node. <code translate="no">max_degree</code> yang lebih tinggi menghasilkan graf yang lebih padat, berpotensi menemukan lebih banyak tetangga yang relevan (daya ingat yang lebih tinggi) tetapi juga meningkatkan penggunaan memori dan waktu pencarian.</p></li>
<li><p><strong>Menambahkan jalan pintas strategis:</strong> Vamana memperkenalkan sisi-sisi jarak jauh, menghubungkan titik-titik data yang berjauhan dalam ruang vektor. Jalan pintas ini memungkinkan pencarian dengan cepat melompati grafik, melewati simpul perantara dan secara signifikan mempercepat navigasi.</p>
<p>Parameter <code translate="no">search_list_size</code> menentukan luasnya proses penyempurnaan graf. <code translate="no">search_list_size</code> yang lebih tinggi akan memperluas pencarian tetangga selama konstruksi dan dapat meningkatkan akurasi akhir, tetapi meningkatkan waktu pembuatan indeks.</p></li>
</ul></li>
</ol>
<p>Untuk mempelajari lebih lanjut tentang penyetelan parameter, lihat parameter <a href="/docs/id/v2.6.x/diskann.md#diskann-params">DISKANN</a>.</p>
<h4 id="PQ" class="common-anchor-header">PQ</h4><p>DISKANN menggunakan <strong>PQ</strong> untuk memampatkan vektor berdimensi tinggi ke dalam representasi yang lebih kecil<strong>(kode PQ</strong>), yang disimpan di memori untuk perhitungan perkiraan jarak yang cepat.</p>
<p>Parameter <code translate="no">pq_code_budget_gb_ratio</code> mengelola jejak memori yang didedikasikan untuk menyimpan kode-kode PQ ini. Parameter ini merepresentasikan rasio antara ukuran total vektor (dalam gigabyte) dan ruang yang dialokasikan untuk menyimpan kode PQ. Anda dapat menghitung anggaran kode PQ yang sebenarnya (dalam gigabyte) dengan rumus ini:</p>
<pre><code translate="no" class="language-plaintext">PQ Code Budget (GB) = vec_field_size_gb * pq_code_budget_gb_ratio
<button class="copy-code-btn"></button></code></pre>
<p>di mana</p>
<ul>
<li><p><code translate="no">vec_field_size_gb</code> adalah ukuran total vektor (dalam gigabyte).</p></li>
<li><p><code translate="no">pq_code_budget_gb_ratio</code> adalah rasio yang ditentukan pengguna, yang mewakili sebagian kecil dari total ukuran data yang dicadangkan untuk kode PQ. Parameter ini memungkinkan pertukaran antara akurasi pencarian dan sumber daya memori. Untuk informasi lebih lanjut tentang penyetelan parameter, lihat <a href="/docs/id/v2.6.x/diskann.md#share-CEVtdKUBuou0g7xHU1uc1rmYnsd">konfigurasi DISKANN</a>.</p></li>
</ul>
<p>Untuk rincian teknis tentang metode PQ yang mendasari, lihat <a href="/docs/id/v2.6.x/ivf-pq.md#share-MA6SdYG0io3EASxoSpyc7JW3nvc">IVF_PQ</a>.</p>
<h3 id="Search-process" class="common-anchor-header">Proses pencarian</h3><p>Setelah indeks (grafik Vamana pada disk dan kode PQ dalam memori) dibangun, DISKANN melakukan pencarian ANN sebagai berikut:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/diskann-2.png" alt="Diskann 2" class="doc-image" id="diskann-2" />
   </span> <span class="img-wrapper"> <span>Diskann 2</span> </span></p>
<ol>
<li><p><strong>Kueri dan titik masuk:</strong> Sebuah vektor kueri disediakan untuk menemukan tetangga terdekat. DISKANN dimulai dari titik masuk yang dipilih dalam grafik Vamana, biasanya sebuah simpul di dekat pusat global dataset. Pusat global mewakili rata-rata dari semua vektor, yang membantu meminimalkan jarak penjelajahan melalui graf untuk menemukan tetangga yang diinginkan.</p></li>
<li><p><strong>Eksplorasi lingkungan:</strong> Algoritme ini mengumpulkan calon tetangga potensial (lingkaran berwarna merah pada gambar) dari tepi-tepi simpul saat ini, dengan memanfaatkan kode PQ dalam memori untuk memperkirakan jarak antara calon-calon tetangga ini dan vektor kueri. Kandidat tetangga potensial ini adalah node-node yang terhubung langsung ke titik masuk yang dipilih melalui sisi-sisi dalam graf Vamana.</p></li>
<li><p><strong>Memilih node untuk perhitungan jarak yang akurat:</strong> Dari hasil perkiraan, subset dari tetangga yang paling menjanjikan (lingkaran berwarna hijau pada gambar) dipilih untuk evaluasi jarak yang tepat menggunakan vektor aslinya yang tidak dikompresi. Hal ini membutuhkan pembacaan data dari disk, yang dapat memakan waktu. DISKANN menggunakan dua parameter untuk mengontrol keseimbangan antara akurasi dan kecepatan:</p>
<ul>
<li><p><code translate="no">beam_width_ratio</code>: Rasio yang mengontrol luasnya pencarian, menentukan berapa banyak kandidat tetangga yang dipilih secara paralel untuk mengeksplorasi tetangga mereka. <code translate="no">beam_width_ratio</code> yang lebih besar menghasilkan eksplorasi yang lebih luas, yang berpotensi menghasilkan akurasi yang lebih tinggi tetapi juga meningkatkan biaya komputasi dan I/O disk. Lebar berkas, atau jumlah node yang dipilih, ditentukan dengan menggunakan rumus: <code translate="no">Beam width = Number of CPU cores * beam_width_ratio</code>.</p></li>
<li><p><code translate="no">search_cache_budget_gb_ratio</code>: Proporsi memori yang dialokasikan untuk caching data disk yang sering diakses. Caching ini membantu meminimalkan I/O disk, sehingga pencarian berulang menjadi lebih cepat karena data sudah ada di dalam memori.</p></li>
</ul>
<p>Untuk mempelajari lebih lanjut tentang penyetelan parameter, lihat <a href="/docs/id/v2.6.x/diskann.md#share-CEVtdKUBuou0g7xHU1uc1rmYnsd">konfigurasi DISKANN</a>.</p></li>
<li><p><strong>Eksplorasi berulang:</strong> Pencarian secara iteratif menyempurnakan himpunan kandidat, berulang kali melakukan evaluasi perkiraan (menggunakan PQ) diikuti dengan pemeriksaan yang tepat (menggunakan vektor asli dari disk) hingga jumlah tetangga yang cukup ditemukan.</p></li>
</ol>
<h2 id="Enable-DISKANN-in-Milvus" class="common-anchor-header">Mengaktifkan DISKANN di Milvus<button data-href="#Enable-DISKANN-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Secara default, <strong>DISKANN</strong> dinonaktifkan pada Milvus untuk memprioritaskan kecepatan indeks dalam memori untuk dataset yang muat dalam RAM. Namun, jika Anda bekerja dengan kumpulan data yang sangat besar atau ingin memanfaatkan skalabilitas <strong>DISKANN</strong> dan pengoptimalan SSD, Anda dapat dengan mudah mengaktifkannya.</p>
<p>Berikut ini cara mengaktifkan DISKANN di Milvus:</p>
<ol>
<li><p><strong>Perbarui File Konfigurasi Milvus</strong></p>
<ol>
<li><p>Cari file konfigurasi Milvus Anda. (Lihat dokumentasi Milvus tentang Konfigurasi untuk detail cara menemukan file ini).</p></li>
<li><p>Temukan parameter <code translate="no">queryNode.enableDisk</code> dan atur nilainya ke <code translate="no">true</code>:</p>
<pre><code translate="no" class="language-yaml"> <span class="hljs-attr">queryNode:</span>
     <span class="hljs-attr">enableDisk:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># Enables query nodes to load and search using the on-disk index</span>
<button class="copy-code-btn"></button></code></pre></li>
</ol></li>
<li><p><strong>Mengoptimalkan Penyimpanan untuk DISKANN</strong></p></li>
</ol>
<p>Untuk memastikan performa terbaik dengan DISKANN, disarankan untuk menyimpan data Milvus Anda di SSD NVMe yang cepat. Berikut ini adalah cara melakukan hal tersebut untuk penerapan Milvus Standalone dan Cluster:</p>
<ul>
<li><p><strong>Milvus Standalone</strong></p>
<ul>
<li><p>Pasang direktori data Milvus ke SSD NVMe di dalam container Milvus. Anda dapat melakukan ini di file <code translate="no">docker-compose.yml</code> atau menggunakan alat manajemen kontainer lainnya.</p></li>
<li><p>Misalnya, jika SSD NVMe Anda dipasang di <code translate="no">/mnt/nvme</code>, Anda akan memperbarui bagian <code translate="no">volumes</code>pada <code translate="no">docker-compose.yml</code> seperti ini:</p></li>
</ul>
<pre><code translate="no" class="language-yaml"> <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">/mnt/nvme/volumes/milvus:/var/lib/milvus</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Milvus Cluster</strong></p>
<ul>
<li><p>Pasang direktori data Milvus ke SSD NVMe di wadah QueryNode dan IndexNode. Anda dapat melakukannya melalui pengaturan orkestrasi kontainer Anda.</p></li>
<li><p>Dengan memasang data pada SSD NVMe di kedua jenis node, Anda memastikan kecepatan baca dan tulis yang cepat untuk operasi pencarian dan pengindeksan.</p></li>
</ul></li>
</ul>
<p>Setelah Anda melakukan perubahan ini, mulai ulang instans Milvus Anda agar pengaturan dapat diterapkan. Sekarang, Milvus akan memanfaatkan kemampuan DISKANN untuk menangani kumpulan data besar, menghadirkan pencarian vektor yang efisien dan dapat diskalakan.</p>
<h2 id="Configure-DISKANN" class="common-anchor-header">Mengkonfigurasi DISKANN<button data-href="#Configure-DISKANN" class="anchor-icon" translate="no">
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
    </button></h2><p>Parameter DISKANN dapat dikonfigurasi menggunakan dua metode utama:</p>
<ul>
<li><p><strong>File Konfigurasi Milvus:</strong> Menyesuaikan parameter DISKANN melalui file konfigurasi Milvus. Metode ini cocok untuk mengatur opsi konfigurasi umum untuk instance Milvus Anda.</p></li>
<li><p><strong>Milvus SDK:</strong> Menyempurnakan parameter DISKANN menggunakan Milvus SDK selama pembuatan indeks atau operasi pencarian. Hal ini memungkinkan kontrol yang lebih terperinci dan penyesuaian parameter dinamis berdasarkan kasus penggunaan tertentu.</p></li>
</ul>
<div class="alert note">
<p>Konfigurasi yang dibuat oleh SDK menggantikan pengaturan apa pun yang ditentukan dalam file konfigurasi, menawarkan fleksibilitas dan kontrol untuk aplikasi dan kumpulan data tertentu.</p>
</div>
<h3 id="Milvus-configuration-file" class="common-anchor-header">File konfigurasi Milvus</h3><p>Berikut adalah contoh cara mengatur parameter DISKANN dalam file <code translate="no">milvus.yaml</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">knowhere:</span>
  <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># When enable this configuration, the index parameters defined following will be automatically populated as index parameters, without requiring user input.</span>
  <span class="hljs-attr">DISKANN:</span>
    <span class="hljs-attr">build:</span>
      <span class="hljs-attr">max_degree:</span> <span class="hljs-number">56</span> <span class="hljs-comment"># Maximum degree of the Vamana graph</span>
      <span class="hljs-attr">pq_code_budget_gb_ratio:</span> <span class="hljs-number">0.125</span> <span class="hljs-comment"># Size limit on the PQ code (compared with raw data)</span>
      <span class="hljs-attr">search_cache_budget_gb_ratio:</span> <span class="hljs-number">0.1</span> <span class="hljs-comment"># Ratio of cached node numbers to raw data</span>
      <span class="hljs-attr">search_list_size:</span> <span class="hljs-number">100</span> <span class="hljs-comment"># Size of the candidate list during building graph</span>
    <span class="hljs-attr">search:</span>
      <span class="hljs-attr">beam_width_ratio:</span> <span class="hljs-number">4</span> <span class="hljs-comment"># Ratio between the maximum number of IO requests per search iteration and CPU number</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="SDK-configuration" class="common-anchor-header">Konfigurasi SDK</h3><p>Berikut adalah contoh cara mengatur parameter DISKANN menggunakan Milvus SDK.</p>
<h4 id="Build" class="common-anchor-header">Membangun</h4><p>Untuk membangun indeks <code translate="no">DISKANN</code> pada bidang vektor di Milvus, gunakan metode <code translate="no">add_index()</code>, tentukan <code translate="no">index_type</code>, <code translate="no">metric_type</code>, dan parameter tambahan untuk indeks.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;DISKANN&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;max_degree&quot;</span>: <span class="hljs-number">56</span>, <span class="hljs-comment"># Maximum number of connections (edges) each data point can have</span>
        <span class="hljs-string">&quot;search_list_size&quot;</span>: <span class="hljs-number">100</span>,
        <span class="hljs-string">&quot;search_cache_budget_gb_ratio&quot;</span>: <span class="hljs-number">0.10</span>, <span class="hljs-comment"># Amount of memory allocated for caching frequently accessed parts of the graph</span>
        <span class="hljs-string">&quot;pq_code_budget_gb_ratio&quot;</span>: <span class="hljs-number">0.125</span> <span class="hljs-comment"># Size of the PQ codes (compressed representations of data points) compared to the size of the uncompressed data</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Setelah parameter indeks dikonfigurasi, Anda dapat membuat indeks dengan menggunakan metode <code translate="no">create_index()</code> secara langsung atau mengoper parameter indeks dalam metode <code translate="no">create_collection</code>. Untuk detailnya, lihat <a href="/docs/id/v2.6.x/create-collection.md">Membuat Koleksi</a>.</p>
<h4 id="Search" class="common-anchor-header">Pencarian</h4><p>Setelah indeks dibuat dan entitas dimasukkan, Anda dapat melakukan pencarian kemiripan pada indeks.</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;beam_width_ratio&quot;</span>: <span class="hljs-number">4.0</span>, <span class="hljs-comment"># degree of parallelism during search by determining the maximum number of parallel disk I/O requests relative to the number of available CPU cores.</span>
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
<h2 id="DISKANN-params" class="common-anchor-header">Parameter DISKANN<button data-href="#DISKANN-params" class="anchor-icon" translate="no">
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
    </button></h2><p>Menyempurnakan parameter DISKANN memungkinkan Anda menyesuaikan perilakunya dengan set data spesifik dan beban kerja pencarian Anda, mencapai keseimbangan yang tepat antara kecepatan, akurasi, dan penggunaan memori.</p>
<h3 id="Index-building-params" class="common-anchor-header">Parameter pembuatan indeks</h3><p>Parameter-parameter ini mempengaruhi bagaimana indeks DISKANN dibangun. Menyesuaikannya dapat memengaruhi ukuran indeks, waktu pembuatan, dan kualitas pencarian.</p>
<table>
   <tr>
     <th></th>
     <th><p>Parameter</p></th>
     <th><p>Deskripsi</p></th>
     <th><p>Rentang Nilai</p></th>
     <th><p>Saran Penyetelan</p></th>
   </tr>
   <tr>
     <td><p>Vamana</p></td>
     <td><p><code translate="no">max_degree</code></p></td>
     <td><p>Mengontrol jumlah maksimum koneksi (sisi) yang dapat dimiliki setiap titik data dalam grafik Vamana.</p></td>
     <td><p><strong>Jenis</strong>: <strong>Rentang</strong> Bilangan Bulat: [1, 512]</p>
<p><strong>Nilai default</strong>: <code translate="no">56</code></p></td>
     <td><p>Nilai yang lebih tinggi akan membuat grafik yang lebih padat, berpotensi meningkatkan pemanggilan kembali (menemukan hasil yang lebih relevan) tetapi juga meningkatkan penggunaan memori dan waktu pembuatan. 
 Dalam kebanyakan kasus, kami sarankan Anda menetapkan nilai dalam kisaran ini: [10, 100].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">search_list_size</code></p></td>
     <td><p>Menentukan jumlah kandidat tetangga yang dipertimbangkan untuk setiap titik data selama konstruksi graf.</p></td>
     <td><p><strong>Jenis</strong>: Bilangan bulat <strong>Rentang</strong>: [1, <em>int_max</em>]</p>
<p><strong>Nilai default</strong>: <code translate="no">100</code></p></td>
     <td><p>Nilai yang lebih besar akan menghasilkan grafik yang lebih komprehensif, yang berpotensi meningkatkan kualitas pencarian, tetapi juga meningkatkan waktu pembuatan. 
 Pada kebanyakan kasus, kami sarankan Anda menetapkan nilai dalam kisaran ini: [K, 10K].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">search_cache_budget_gb_ratio</code></p></td>
     <td><p>Mengontrol jumlah memori yang dialokasikan untuk menyimpan bagian grafik yang sering diakses selama konstruksi indeks.</p></td>
     <td><p><strong>Jenis</strong>: <strong>Rentang</strong> Float: [0.0, 0.3)</p>
<p><strong>Nilai default</strong>: <code translate="no">0.10</code></p></td>
     <td><p>Nilai yang lebih tinggi mengalokasikan lebih banyak memori untuk caching, secara signifikan mengurangi I/O disk tetapi mengkonsumsi lebih banyak memori sistem. Nilai yang lebih rendah menggunakan lebih sedikit memori untuk caching, sehingga berpotensi meningkatkan kebutuhan akses disk. Dalam kebanyakan kasus, kami sarankan Anda menetapkan nilai dalam kisaran ini: [0.0, 0.3).</p></td>
   </tr>
   <tr>
     <td><p>PQ</p></td>
     <td><p><code translate="no">pq_code_budget_gb_ratio</code></p></td>
     <td><p>Mengontrol ukuran kode PQ (representasi titik data yang dikompresi) dibandingkan dengan ukuran data yang tidak dikompresi.</p></td>
     <td><p><strong>Tipe</strong> <strong>Kisaran</strong> Float: (0,0, 0,25]</p>
<p><strong>Nilai default</strong>: <code translate="no">0.125</code></p></td>
     <td><p>Rasio yang lebih tinggi akan menghasilkan hasil pencarian yang lebih akurat dengan mengalokasikan proporsi memori yang lebih besar untuk kode PQ, yang secara efektif menyimpan lebih banyak informasi tentang vektor asli. Rasio yang lebih rendah mengurangi penggunaan memori tetapi berpotensi mengorbankan akurasi, karena kode PQ yang lebih kecil menyimpan lebih sedikit informasi. Pendekatan ini cocok untuk skenario di mana keterbatasan memori menjadi perhatian, sehingga memungkinkan pengindeksan set data yang lebih besar.</p>
<p>Dalam kebanyakan kasus, kami sarankan Anda menetapkan nilai dalam kisaran ini: (0,0625, 0,25]</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Parameter pencarian khusus indeks</h3><p>Parameter ini memengaruhi cara DISKANN melakukan pencarian. Menyesuaikan parameter ini dapat memengaruhi kecepatan pencarian, latensi, dan penggunaan sumber daya.</p>
<table>
   <tr>
     <th></th>
     <th><p>Parameter</p></th>
     <th><p>Deskripsi</p></th>
     <th><p>Rentang Nilai</p></th>
     <th><p>Saran Penyetelan</p></th>
   </tr>
   <tr>
     <td><p>Vamana</p></td>
     <td><p><code translate="no">beam_width_ratio</code></p></td>
     <td><p>Mengontrol tingkat paralelisme selama pencarian dengan menentukan jumlah maksimum permintaan I/O disk paralel relatif terhadap jumlah inti CPU yang tersedia.</p></td>
     <td><p><strong>Jenis</strong>: <strong>Kisaran</strong> Float: [1, maks (128 / nomor CPU, 16)]</p>
<p><strong>Nilai default</strong>: <code translate="no">4.0</code></p></td>
     <td><p>Nilai yang lebih tinggi akan meningkatkan paralelisme, yang dapat mempercepat pencarian pada sistem dengan CPU dan SSD yang kuat. Namun demikian, pengaturan yang terlalu tinggi dapat menyebabkan perebutan sumber daya yang berlebihan. Pada kebanyakan kasus, kami sarankan Anda menetapkan nilai dalam kisaran ini: [1.0, 4.0].</p></td>
   </tr>
</table>
