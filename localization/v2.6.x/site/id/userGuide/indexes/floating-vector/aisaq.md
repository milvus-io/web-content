---
id: aisaq.md
title: AISAQCompatible with Milvus 2.6.4+
summary: >-
  AISAQ adalah indeks vektor berbasis disk yang memperluas DISKANN untuk
  menangani dataset berskala miliaran tanpa melebihi batas RAM. Tidak seperti
  DISKANN, yang menyimpan vektor terkompresi dalam memori, AISAQ menyimpan semua
  data pada disk-menawarkan dua mode untuk menyeimbangkan kinerja dan biaya
  penyimpanan.
beta: Milvus 2.6.4+
---
<h1 id="AISAQ" class="common-anchor-header">AISAQ<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#AISAQ" class="anchor-icon" translate="no">
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
    </button></h1><p>AISAQ adalah indeks vektor berbasis disk yang memperluas <a href="/docs/id/diskann.md">DISKANN</a> untuk menangani dataset berskala miliaran dengan jejak DRAM yang minimal.</p>
<p>Tidak seperti DISKANN, yang menyimpan vektor terkompresi dalam memori, AISAQ dirancang dengan "Arsitektur DRAM Nyaris Nol" yang berarti menyimpan semua struktur data pada SSD.</p>
<p>AISAQ memungkinkan menjalankan database berskala sangat tinggi menggunakan server standar sekaligus menawarkan mode operasi untuk menyeimbangkan kinerja dan biaya penyimpanan.</p>
<h2 id="How-AISAQ-works" class="common-anchor-header">Cara kerja AISAQ<button data-href="#How-AISAQ-works" class="anchor-icon" translate="no">
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
    </button></h2><p>Diagram di atas membandingkan tata letak penyimpanan <strong>DISKANN</strong>, <strong>AISAQ-Performance</strong>, dan <strong>AISAQ-Scale</strong>, yang menunjukkan bagaimana data (vektor mentah, daftar tepi, dan kode PQ) didistribusikan antara RAM dan disk.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/aisaq-vs-diskann.png" alt="Aisaq Vs Diskann" class="doc-image" id="aisaq-vs-diskann" />
   </span> <span class="img-wrapper"> <span>Aisaq Vs Diskann</span> </span></p>
<h3 id="Foundation-DISKANN-recap" class="common-anchor-header">Dasar: Rekap DISKANN<button data-href="#Foundation-DISKANN-recap" class="anchor-icon" translate="no">
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
    </button></h3><p>Dalam DISKANN, vektor mentah dan daftar tepi disimpan di disk, sedangkan vektor yang dikompresi PQ disimpan di memori (DRAM).</p>
<p>Ketika DISKANN berjalan ke sebuah simpul (misalnya, <em>vektor 0</em>):</p>
<ul>
<li><p>Ia memuat vektor mentah<strong>(raw_vector_0</strong>) dan daftar sisi<strong>(edgelist_0</strong>) dari disk.</p></li>
<li><p>Daftar sisi menunjukkan tetangga mana yang akan dikunjungi berikutnya (node 2, 3, dan 5 dalam contoh ini).</p></li>
<li><p>Vektor mentah digunakan untuk menghitung jarak yang tepat ke vektor kueri untuk pemeringkatan.</p></li>
<li><p>Data PQ dalam memori digunakan untuk penyaringan jarak perkiraan untuk memandu penjelajahan berikutnya.</p></li>
</ul>
<p>Karena data PQ sudah di-cache di DRAM, setiap kunjungan node hanya membutuhkan satu disk I/O, sehingga mencapai kecepatan kueri yang tinggi dengan penggunaan memori yang moderat.</p>
<p>Untuk penjelasan rinci tentang komponen dan parameter ini, lihat <a href="/docs/id/diskann.md">DISKANN</a>.</p>
<h3 id="AISAQ-Operation-Modes" class="common-anchor-header">Mode Operasi AISAQ<button data-href="#AISAQ-Operation-Modes" class="anchor-icon" translate="no">
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
    </button></h3><p>AISAQ menawarkan dua mode operasi untuk menangani dua kasus penggunaan yang berbeda:</p>
<p>Mode kinerja: dioptimalkan untuk aplikasi yang membutuhkan latensi rendah dan throughput tinggi dalam skala besar, seperti pencarian semantik online.</p>
<p>Mode skala: dioptimalkan untuk aplikasi dengan batasan latensi yang lebih longgar, seperti RAG dan pencarian semantik offline, sekaligus memungkinkan perluasan dataset yang hemat biaya hingga skala sangat tinggi.</p>
<h4 id="AISAQ-performance-mode" class="common-anchor-header">Mode performa AISAQ</h4><p><strong>Performa AISAQ</strong> mencapai "Jejak DRAM Nyaris Nol" dengan memindahkan data PQ dari memori ke disk dengan tetap mempertahankan IOPS yang rendah melalui kolokasi dan redundansi data.</p>
<ul>
<li><p>Vektor mentah setiap node, daftar tepi, dan data PQ tetangganya disimpan bersama pada disk.</p></li>
<li><p>Tata letak ini memastikan bahwa mengunjungi sebuah node (misalnya, vektor 0) hanya membutuhkan satu disk I/O.</p></li>
<li><p>Karena data PQ disimpan secara berlebihan di dekat beberapa node, ukuran file indeks meningkat secara signifikan, menghabiskan lebih banyak ruang disk.</p></li>
</ul>
<h4 id="AISAQ-scale-mode" class="common-anchor-header">Mode skala AISAQ</h4><p><strong>Skala AISAQ</strong> berfokus pada pengurangan penggunaan ruang disk sekaligus memenuhi persyaratan kinerja aplikasi targetnya.</p>
<p>Dalam mode ini:</p>
<ul>
<li><p>Data PQ disimpan secara terpisah pada disk, tanpa redundansi.</p></li>
<li><p>Desain ini meminimalkan ukuran indeks tetapi menyebabkan lebih banyak operasi I / O selama penelusuran grafik.</p></li>
<li><p>Untuk mengurangi biaya overhead IOPS, AISAQ memperkenalkan dua optimasi:</p>
<ul>
<li><p>Algoritma penyusunan ulang yang mengurutkan vektor PQ berdasarkan prioritas untuk meningkatkan lokalitas data.</p></li>
<li><p>Cache PQ dalam DRAM (pq_read_page_cache_size) yang menyimpan data PQ yang sering diakses.</p></li>
</ul></li>
</ul>
<h2 id="Example-configuration" class="common-anchor-header">Contoh konfigurasi<button data-href="#Example-configuration" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">knowhere:</span>
  <span class="hljs-attr">AISAQ:</span>
    <span class="hljs-attr">build:</span>
      <span class="hljs-attr">max_degree:</span> <span class="hljs-number">56</span> <span class="hljs-comment"># Controls the maximum number of connections (edges) each data point can have in the Vamana graph</span>
      <span class="hljs-attr">search_list_size:</span> <span class="hljs-number">100</span> <span class="hljs-comment"># During index construction, this parameter defines the size of the candidate pool used when searching for the nearest neighbors for each node. For every node being added to the graph, the algorithm maintains a list of the search_list_size best candidates found so far. The search for neighbors stops when this list can no longer be improved. From this final candidate pool, the top max_degree nodes are selected to form the final edges</span>
      <span class="hljs-attr">inline_pq:</span> <span class="hljs-number">-1</span> <span class="hljs-comment"># Number of PQ vectors stored inline per Index node (read when node is accessed, to reduce IO)</span>
      <span class="hljs-attr">rearrange:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># Re-arrange the PQ vectors data structure to improve data locality and reduce disk accesses during search (ignored in performance mode)</span>
      <span class="hljs-attr">num_entry_points:</span> <span class="hljs-number">100</span> <span class="hljs-comment"># Number of candidate entry points to optimize search entry-point selection</span>
      <span class="hljs-attr">pq_code_budget_gb_ratio:</span> <span class="hljs-number">0.125</span> <span class="hljs-comment"># Controls the size of the PQ codes (compressed representations of data points) compared to the size of the uncompressed data</span>
      <span class="hljs-attr">disk_pq_code_budget_gb_ratio:</span> <span class="hljs-number">0.25</span> <span class="hljs-comment"># Controls the size of the PQ codes of the high precision vectors stored in the index (used for re-ranking), compared to the size of the uncompressed data</span>
      <span class="hljs-attr">pq_cache_size:</span> <span class="hljs-number">0</span> <span class="hljs-comment"># PQ vectors cache size in DRAM (bytes). The PQ vectors cache is loaded during Index load and used during search to reduce IOs (ignored in performance mode)</span>
      <span class="hljs-attr">search_cache_budget_gb_ratio:</span> <span class="hljs-number">0</span> <span class="hljs-comment"># Controls the amount of DRAM to be used for caching frequently accessed index nodes. This cache is loaded during index load and used during search to reduce IOs</span>
    <span class="hljs-attr">search:</span>
      <span class="hljs-attr">search_list:</span> <span class="hljs-number">16</span> <span class="hljs-comment"># During a search operation, this parameter determines the size of the candidate pool that the algorithm maintains as it traverses the graph. A larger value increases the chances of finding the true nearest neighbors (higher recall) but also increases search latency</span>
      <span class="hljs-attr">beamwidth:</span> <span class="hljs-number">8</span> <span class="hljs-comment"># Controls the degree of parallelism during search by determining the maximum number of parallel disk I/O requests to read the index nodes</span>
      <span class="hljs-attr">vectors_beamwidth:</span> <span class="hljs-number">1</span> <span class="hljs-comment"># Controls the degree of parallelism during search by determining the maximum number of parallel disk I/O requests to read groups of neighboring PQ vectors (ignored in performance mode)</span>
      <span class="hljs-attr">pq_read_page_cache_size:</span> <span class="hljs-number">5242880</span> <span class="hljs-string">(5MiB)</span> <span class="hljs-comment"># PQ read cache size in DRAM per search thread (bytes). It caches frequently accessed data pages containing PQ vectors (ignored in performance mode and applicable only when rearrange is true). The PQ read cache memory is reused across all AISAQ segments</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="AISAQ-parameters" class="common-anchor-header">Parameter AISAQ<button data-href="#AISAQ-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>AISAQ mewarisi beberapa parameter dari DISKANN - <code translate="no">max_degree</code>, <code translate="no">search_list_size</code>, dan <code translate="no">pq_code_budget_gb_ratio</code>.</p>
<h3 id="Index-building-params" class="common-anchor-header">Parameter pembangun indeks<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>Parameter-parameter ini mempengaruhi bagaimana indeks AISAQ dibangun. Menyesuaikan parameter ini dapat memengaruhi ukuran indeks, waktu pembuatan, dan kualitas pencarian.</p>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Deskripsi</p></th>
     <th><p>Rentang Nilai</p></th>
     <th><p>Saran Penyetelan</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">max_degree</code></p></td>
     <td><p>Mengontrol jumlah maksimum koneksi (sisi) yang dapat dimiliki setiap titik data dalam grafik Vamana.</p></td>
     <td><p><strong>Tipe</strong> Bilangan bulat</p><p><strong>Rentang</strong>: [1, 512]</p><p><strong>Nilai default</strong>: <code translate="no">56</code></p></td>
     <td><p>Nilai yang lebih tinggi akan membuat grafik yang lebih padat, berpotensi meningkatkan pemanggilan (menemukan hasil yang lebih relevan), tetapi juga meningkatkan penggunaan memori dan waktu pembuatan. Dalam kebanyakan kasus, kami sarankan Anda menetapkan nilai dalam kisaran ini: [10, 100].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">search_list_size</code></p></td>
     <td><p>Selama pembangunan indeks, parameter ini mendefinisikan ukuran kumpulan kandidat yang digunakan ketika mencari tetangga terdekat untuk setiap node. Untuk setiap simpul yang ditambahkan ke dalam graf, algoritma akan menyimpan sebuah daftar kandidat terbaik yang ditemukan sejauh ini. Pencarian tetangga berhenti ketika daftar ini tidak lagi dapat ditingkatkan. Dari kumpulan kandidat akhir ini, node-node dengan max_degree tertinggi dipilih untuk membentuk sisi-sisi akhir.</p></td>
     <td><p><strong>Tipe</strong> Bilangan bulat</p><p><strong>Rentang</strong>: [1, 512]</p><p><strong>Nilai default</strong>: <code translate="no">100</code></p></td>
     <td><p>Ukuran search_list_size yang lebih besar meningkatkan kemungkinan menemukan tetangga terdekat yang sebenarnya untuk setiap simpul, yang dapat menghasilkan grafik berkualitas lebih tinggi dan kinerja pencarian yang lebih baik (recall). Namun, hal ini memerlukan waktu pembuatan indeks yang jauh lebih lama. Ini harus selalu diatur ke nilai yang lebih besar atau sama dengan max_degree.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">inline_pq</code></p></td>
     <td><p>Jumlah vektor PQ yang disimpan sebaris per simpul Indeks (dibaca ketika simpul diakses, untuk mengurangi IO)</p></td>
     <td><p><strong>Tipe</strong> Bilangan bulat</p><p><strong>Rentang</strong>: [0, <em>max_degree</em>]</p><p><strong>Nilai default</strong>: <code translate="no">-1</code></p></td>
     <td><p>Nilai <code translate="no">inline_pq</code> yang lebih tinggi akan meningkatkan performa namun menambah ruang disk.</p><p>Tetapkan <code translate="no">inline_pq</code>=0 untuk AISAQ dalam mode skala.</p><p>Atur <code translate="no">inline_pq</code>=-1 untuk secara otomatis mengisi ruang yang tidak terpakai dalam indeks dengan vektor PQ untuk optimalisasi lebih lanjut AISAQ dalam mode skala.</p><p>Tetapkan <code translate="no">inline_pq</code><em>=max_degree</em> untuk AISAQ dalam mode performa.</p><p><code translate="no">inline_pq</code> Pengaturan di antara 0 dan <em>max_degree</em> memungkinkan keseimbangan yang dapat disesuaikan antara kinerja dan konsumsi ruang disk.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">rearrange</code></p></td>
     <td><p>Atur ulang struktur data vektor PQ untuk meningkatkan lokalitas data dan mengurangi akses disk selama pencarian (diabaikan dalam mode kinerja).</p></td>
     <td><p><strong>Jenis</strong> Boolean</p><p><strong>Rentang</strong>: [benar, salah]</p><p><strong>Nilai default</strong>: <code translate="no">true</code></p></td>
     <td><p>Jika benar, mengurangi IO selama pencarian dengan hanya sedikit peningkatan memori dan waktu pembuatan indeks.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">num_entry_points</code></p></td>
     <td><p>Jumlah kandidat titik masuk untuk mengoptimalkan pemilihan titik masuk pencarian.</p></td>
     <td><p><strong>Tipe</strong> Bilangan bulat</p><p><strong>Rentang</strong>: [0, 1000]</p><p><strong>Nilai default</strong>: <code translate="no">100</code></p></td>
     <td><p>Nilai yang tinggi dapat mengurangi waktu pencarian dengan memulai pencarian dari titik masuk yang lebih dekat.</p><p>Tetapkan nilai yang lebih tinggi untuk segmen besar (misalnya untuk vektor 10M dan di atasnya gunakan nilai 1000).</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">pq_code_budget_gb_ratio</code></p></td>
     <td><p>Mengontrol ukuran kode PQ (representasi titik data yang dikompresi) dibandingkan dengan ukuran data yang tidak dikompresi.</p></td>
     <td><p><strong>Tipe</strong> Mengapung</p><p><strong>Rentang</strong>: (0.0, 0.25]</p><p><strong>Nilai default</strong>: <code translate="no">0.125</code></p></td>
     <td><p>Rasio yang lebih tinggi akan menghasilkan hasil pencarian yang lebih akurat, secara efektif menyimpan lebih banyak informasi tentang vektor asli, tetapi meningkatkan kompleksitas komputasi selama pencarian.</p><p>Dalam kebanyakan kasus, kami sarankan Anda menetapkan nilai dalam kisaran ini: (0,0417, 0,25].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">disk_pq_code_budget_gb_ratio</code></p></td>
     <td><p>Mengontrol ukuran kode PQ dari vektor presisi tinggi yang disimpan dalam indeks (digunakan untuk pemeringkatan ulang), dibandingkan dengan ukuran data yang tidak dikompresi.</p></td>
     <td><p><strong>Tipe</strong> Mengapung</p><p><strong>Rentang</strong>: [0, 0.25]</p><p><strong>Nilai default</strong>: <code translate="no">0.25</code></p></td>
     <td><p>Dengan nilai default 0,25, vektor akan dikuantisasi menjadi 25% dari ukuran aslinya (kompresi 4×), sehingga mengurangi jejak disk dengan dampak akurasi yang relatif minimal.</p><p>Tetapkan nilai 0 untuk menyimpan vektor presisi penuh dalam indeks disk untuk pemeringkatan ulang. Nilai yang lebih besar menawarkan tingkat penemuan kembali yang lebih tinggi tetapi meningkatkan penggunaan disk.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">pq_cache_size</code></p></td>
     <td><p>Ukuran cache vektor PQ dalam DRAM (byte). Cache vektor PQ dimuat selama pemuatan indeks dan digunakan selama pencarian untuk mengurangi IO (diabaikan dalam mode kinerja).</p></td>
     <td><p><strong>Jenis</strong> Bilangan bulat</p><p><strong>Rentang</strong>: [0, 1073741824]</p><p><strong>Nilai default</strong>: <code translate="no">0</code></p></td>
     <td><p>Cache yang lebih besar meningkatkan kinerja kueri tetapi meningkatkan penggunaan DRAM.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">search_cache_budget_gb_ratio</code></p></td>
     <td><p>Mengontrol jumlah DRAM yang akan digunakan untuk cache node indeks yang sering diakses</p><p>Cache ini dimuat selama pemuatan indeks dan digunakan selama pencarian untuk mengurangi IO.</p></td>
     <td><p><strong>Tipe</strong> Mengapung</p><p><strong>Rentang</strong>: [0.0, 0.3)</p><p><strong>Nilai default</strong>: <code translate="no">0</code></p></td>
     <td><p>Nilai yang lebih tinggi mengalokasikan lebih banyak memori untuk caching, mengurangi IO disk, namun menghabiskan lebih banyak memori sistem. Nilai yang lebih rendah menggunakan lebih sedikit memori untuk caching, sehingga berpotensi meningkatkan kebutuhan akses disk.</p></td>
   </tr>
</table>
<h3 id="Index-search-params" class="common-anchor-header">Parameter pencarian indeks<button data-href="#Index-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>Parameter ini mempengaruhi bagaimana AISAQ melakukan pencarian. Menyesuaikannya dapat memengaruhi kecepatan pencarian, latensi, dan penggunaan sumber daya.</p>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Deskripsi</p></th>
     <th><p>Rentang Nilai</p></th>
     <th><p>Saran Penyetelan</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">search_list</code></p></td>
     <td><p>Selama operasi pencarian, parameter ini menentukan ukuran kumpulan kandidat yang dipertahankan oleh algoritme saat melintasi grafik. Nilai yang lebih besar meningkatkan peluang menemukan tetangga terdekat yang sebenarnya (recall yang lebih tinggi) tetapi juga meningkatkan latensi pencarian.</p></td>
     <td><p><strong>Tipe</strong> Bilangan bulat</p><p><strong>Rentang</strong>: [topk, int32_max]</p><p><strong>Nilai default</strong>: <code translate="no">16</code></p></td>
     <td><p>Untuk keseimbangan yang baik antara performa dan akurasi, disarankan untuk menetapkan nilai ini sama atau sedikit lebih besar daripada jumlah hasil yang ingin Anda ambil (top_k).</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">beamwidth</code></p></td>
     <td><p>Mengontrol tingkat paralelisme selama pencarian dengan menentukan jumlah maksimum permintaan I/O disk paralel untuk membaca simpul indeks.</p></td>
     <td><p><strong>Tipe</strong> Bilangan bulat</p><p><strong>Rentang</strong>: [1, 16]</p><p><strong>Nilai default</strong>: <code translate="no">8</code></p></td>
     <td><p>Nilai yang lebih tinggi meningkatkan paralelisme, yang dapat mempercepat pencarian pada sistem dengan CPU dan SSD yang kuat. Namun, pengaturan yang terlalu tinggi dapat menyebabkan perebutan sumber daya yang berlebihan.</p><p>Pada kebanyakan kasus, kami sarankan Anda menetapkan nilai 2.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">vectors_beamwidth</code></p></td>
     <td><p>Mengontrol tingkat paralelisme selama pencarian dengan menentukan jumlah maksimum permintaan I/O disk paralel untuk membaca kelompok vektor PQ yang berdekatan (diabaikan dalam mode kinerja).</p></td>
     <td><p><strong>Tipe</strong> Bilangan bulat</p><p><strong>Rentang</strong>: [1, 4] harus &lt;= <em>beamwidth</em></p><p><strong>Nilai default</strong>: <code translate="no">1</code></p></td>
     <td><p>Nilai yang lebih tinggi meningkatkan paralelisme, yang dapat mempercepat pencarian pada sistem dengan CPU dan SSD yang kuat. Namun, pengaturan yang terlalu tinggi dapat menyebabkan perebutan sumber daya yang berlebihan, karena setiap kelompok vektor PQ yang bertetangga dapat berisi hingga vektor dengan derajat maksimal.</p><p>Dalam kebanyakan kasus, kami menyarankan Anda menetapkan nilai 1.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">pq_read_page_cache_size</code></p></td>
     <td><p>Ukuran cache baca PQ dalam DRAM per thread pencarian (byte). Memori ini menyimpan halaman data yang sering diakses yang berisi vektor PQ (diabaikan dalam mode kinerja dan hanya berlaku bila pengaturan ulang benar).</p><p>Memori cache baca PQ digunakan kembali di semua segmen AISAQ.</p></td>
     <td><p><strong>Jenis</strong> Bilangan bulat</p><p><strong>Rentang</strong>: [0, 33554432]</p><p><strong>Nilai default</strong>: <code translate="no">5242880 (5MiB)</code></p></td>
     <td><p>Cache yang lebih besar meningkatkan kinerja kueri tetapi meningkatkan penggunaan DRAM.</p><p>Nilai yang disarankan berkisar dari 2 MiB untuk segmen kecil (1 M vektor), 5 MiB untuk segmen sedang (50 M vektor) dan 10 MiB untuk segmen besar (250 M vektor).</p></td>
   </tr>
</table>
