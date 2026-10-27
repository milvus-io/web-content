---
id: ivf-rabitq-fastscan.md
title: IVF_RABITQ_FASTSCANCompatible with Milvus 3.0.x
summary: >-
  IVF_RABITQ_FASTSCAN menggabungkan IVF, kuantisasi biner RaBitQ, dan pemindaian
  batch SIMD untuk menghadirkan pencarian vektor yang hemat memori dan
  berkapasitas tinggi.
beta: Milvus 3.0.x
---
<h1 id="IVFRABITQFASTSCAN" class="common-anchor-header">IVF_RABITQ_FASTSCAN<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#IVFRABITQFASTSCAN" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">IVF_RABITQ_FASTSCAN</code> menggabungkan pemisahan IVF, kuantisasi biner RaBitQ, dan pemrosesan batch FastScan. Algoritma ini menyimpan kode RaBitQ satu bit untuk vektor basis data dan memproses kode-kode tersebut dalam blok-blok yang ramah SIMD yang terdiri dari 32 vektor basis data. Hal ini menjadikannya pilihan yang tepat untuk beban kerja dengan throughput tinggi dan keterbatasan memori yang dapat menerima hasil yang mendekati nilai sebenarnya.</p>
<p>Pilih <code translate="no">IVF_RABITQ_FASTSCAN</code> daripada <a href="/docs/id/ivf-rabitq.md">IVF_RABITQ</a> ketika pencarian memindai banyak kandidat dan throughput menjadi tujuan utama. Biaya penyiapan per kueri FastScan dibebankan secara merata ke seluruh blok kode yang dikemas, sehingga biasanya lebih menguntungkan untuk kumpulan data besar atau daftar IVF yang panjang. Untuk koleksi kecil atau pencarian yang memeriksa sedikit kandidat, gunakan <code translate="no">IVF_RABITQ</code> sebagai gantinya. Alat ini juga mendukung kuantisasi kueri yang dapat dikonfigurasi, lebih banyak jenis penyempurnaan, dan iterator.</p>
<h2 id="How-it-works" class="common-anchor-header">Cara kerjanya<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">IVF_RABITQ_FASTSCAN</code> menggunakan tahapan-tahapan berikut:</p>
<ol>
<li><strong>Partisi IVF</strong>: IVF mengelompokkan vektor ke dalam kluster " <code translate="no">nlist</code> " dan mencari kluster terdekat yang di <code translate="no">nprobe</code>.</li>
<li><strong>Pengkodean RaBitQ</strong>: Setiap residu vektor dikodekan sebagai kode RaBitQ satu bit per dimensi.</li>
<li><strong>FastScan</strong>: Indeks mengemas kode untuk pemrosesan batch SIMD yang ramah cache. Indeks ini mengevaluasi 32 vektor basis data dalam setiap batch.</li>
<li><strong>Penyempurnaan opsional</strong>: Saat diaktifkan, penyempurna FP32 akan menilai ulang kandidat sebelum Milvus mengembalikan hasil akhir.</li>
</ol>
<p>Indeks Faiss yang mendasarinya adalah <code translate="no">IndexIVFRaBitQFastScan</code>. Knowhere membungkusnya dengan transformasi rotasi acak dan secara opsional menambahkan penyempurna FP32.</p>
<p>FastScan melakukan pekerjaan persiapan per-kueri, seperti membangun dan mengkuantisasi tabel pencarian terkait kueri, sebelum memindai blok kode yang dikemas. Lakukan pengujian kinerja baik pada <code translate="no">IVF_RABITQ</code> maupun <code translate="no">IVF_RABITQ_FASTSCAN</code> dengan data dan parameter pencarian Anda.</p>
<h2 id="Build-index" class="common-anchor-header">Membuat indeks<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk membuat indeks <code translate="no">IVF_RABITQ_FASTSCAN</code> pada bidang vektor di Milvus, gunakan metode <code translate="no">add_index()</code>, dengan menentukan <code translate="no">index_type</code>, <code translate="no">metric_type</code>, dan parameter tambahan untuk indeks tersebut.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;IVF_RABITQ_FASTSCAN&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
<span class="highlighted-wrapper-line">    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span></span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">1024</span>, <span class="hljs-comment"># Number of clusters for the index</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;refine&quot;</span>: <span class="hljs-literal">True</span>, <span class="hljs-comment"># Enable refinement for higher recall</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;refine_type&quot;</span>: <span class="hljs-string">&quot;FP32&quot;</span> <span class="hljs-comment"># Refinement data format</span></span>
<span class="highlighted-comment-line">    } <span class="hljs-comment"># Index building params</span></span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Dalam konfigurasi ini:</p>
<ul>
<li><p><code translate="no">index_type</code>: Jenis indeks yang akan dibuat. Dalam contoh ini, tetapkan nilainya ke ` <code translate="no">IVF_RABITQ_FASTSCAN</code>`.</p></li>
<li><p><code translate="no">metric_type</code>: Metode yang digunakan untuk menghitung jarak antar vektor. Nilai yang didukung meliputi <code translate="no">COSINE</code>, <code translate="no">L2</code>, dan <code translate="no">IP</code>. Untuk detailnya, lihat <a href="/docs/id/metric.md">Jenis Metrik</a>.</p></li>
<li><p><code translate="no">params</code>: Opsi konfigurasi tambahan untuk membangun indeks. Untuk detailnya, lihat <a href="/docs/id/ivf-rabitq-fastscan.md#Index-building-params">Parameter Pembuatan Indeks</a>.</p></li>
</ul>
<p>Setelah parameter indeks dikonfigurasi, Anda dapat membuat indeks dengan menggunakan metode ` <code translate="no">create_index()</code> ` secara langsung atau dengan meneruskan parameter indeks ke metode ` <code translate="no">create_collection</code> `. Untuk detailnya, lihat <a href="/docs/id/create-collection.md">Buat Koleksi</a>.</p>
<h2 id="Search-on-index" class="common-anchor-header">Pencarian pada indeks<button data-href="#Search-on-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Setelah indeks dibangun dan entitas dimasukkan, Anda dapat melakukan pencarian kesamaan pada indeks tersebut.</p>
<p>Atur ` <code translate="no">nprobe</code> ` untuk mengontrol berapa banyak kluster IVF yang akan dicari. Jika indeks dibangun dengan penyempurnaan, gunakan ` <code translate="no">refine_k</code> ` untuk mengontrol kumpulan kandidat yang diteruskan ke penyempurna FP32.</p>
<pre><code translate="no" class="language-python">client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>) <span class="hljs-comment"># Replace with your Milvus server address</span>

search_params = {
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;params&quot;</span>: {</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">128</span>, <span class="hljs-comment"># Number of clusters to search</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;refine_k&quot;</span>: <span class="hljs-number">2</span> <span class="hljs-comment"># Refinement magnification factor</span></span>
<span class="highlighted-comment-line">    }</span>
}

res = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]], <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>, <span class="hljs-comment"># TopK results to return</span>
<span class="highlighted-wrapper-line">    search_params=search_params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Dalam konfigurasi ini:</p>
<ul>
<li><code translate="no">params</code>: Opsi konfigurasi tambahan untuk pencarian pada indeks. Untuk detailnya, lihat " <a href="/docs/id/ivf-rabitq-fastscan.md#Index-specific-search-params">Parameter Pencarian Khusus Indeks</a>".</li>
</ul>
<div class="alert note">
<p>Berbeda dengan ` <code translate="no">IVF_RABITQ</code>`, ` <code translate="no">IVF_RABITQ_FASTSCAN</code> ` tidak menerima parameter pencarian ` <code translate="no">rbq_bits_query</code> `. FastScan selalu menggunakan kuantisasi kueri 8-bit secara internal, jadi abaikan ` <code translate="no">rbq_bits_query</code> ` atau atur ke ` <code translate="no">0</code>`; nilai yang lebih besar akan ditolak.</p>
</div>
<h2 id="Index-params" class="common-anchor-header">Parameter Indeks<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>Bagian ini memberikan gambaran umum tentang parameter yang digunakan untuk membuat indeks dan melakukan pencarian pada indeks tersebut.</p>
<h3 id="Index-building-params" class="common-anchor-header">Parameter pembuatan indeks<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>Tabel berikut mencantumkan parameter yang dapat dikonfigurasi di <code translate="no">params</code> saat <a href="/docs/id/ivf-rabitq-fastscan.md#Build-index">membangun indeks</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>Parameter</p></th>
     <th><p>Deskripsi</p></th>
     <th><p>Rentang Nilai</p></th>
     <th><p>Saran Penyesuaian</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code translate="no">nlist</code></p></td>
     <td><p>Jumlah kluster yang akan dibuat menggunakan algoritma k-means selama proses pembuatan indeks. Setiap kluster, yang diwakili oleh sebuah pusat kluster (centroid), menyimpan daftar vektor. Meningkatkan nilai parameter ini akan mengurangi jumlah vektor dalam setiap kluster, sehingga menghasilkan partisi yang lebih kecil dan lebih terfokus.</p></td>
     <td><p><strong>Tipe</strong>: Bilangan Bulat<br><strong>Rentang</strong>: [1, 65536]<br><strong>Nilai default</strong>: <code translate="no">128</code></p></td>
     <td><p>Nilai <code translate="no">nlist</code> yang lebih besar meningkatkan recall dengan menciptakan kluster yang lebih terperinci, tetapi memperpanjang waktu pembuatan indeks. Optimalkan berdasarkan ukuran dataset dan sumber daya yang tersedia. Dalam kebanyakan kasus, kami merekomendasikan Anda menetapkan nilai dalam rentang ini: [32, 4096].</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p>RaBitQ</p></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>Mengaktifkan proses penyempurnaan dan menyimpan data yang telah disempurnakan. <code translate="no">IVF_RABITQ_FASTSCAN</code> hanya mendukung penyempurnaan FP32.</p></td>
     <td><p><strong>Tipe</strong>: Boolean<br><strong>Rentang</strong>: [<code translate="no">true</code>, <code translate="no">false</code>]<br><strong>Nilai default</strong>: <code translate="no">false</code></p></td>
     <td><p>Atur ke <code translate="no">true</code> jika tingkat recall 0,9+ diperlukan. Mengaktifkan penyempurnaan meningkatkan akurasi tetapi meningkatkan kebutuhan penyimpanan dan waktu pembuatan indeks.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">refine_type</code></p></td>
     <td><p>Menentukan representasi data yang digunakan untuk penyempurnaan saat <code translate="no">refine</code> diaktifkan. Diperlukan hanya jika <code translate="no">refine</code> adalah <code translate="no">true</code>.</p></td>
     <td><p><strong>Tipe</strong>: String<br><strong>Rentang</strong>: [<code translate="no">FP32</code>, <code translate="no">FLAT</code>]<br><strong>Nilai default</strong>: Tidak ada</p></td>
     <td><p><code translate="no">IVF_RABITQ_FASTSCAN</code> hanya mendukung penyempurnaan FP32, dan <code translate="no">FLAT</code> identik dengan <code translate="no">FP32</code>. Pencocokan nilai tidak membedakan huruf besar-kecil.</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Parameter pencarian khusus indeks<button data-href="#Index-specific-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>Tabel berikut mencantumkan parameter yang dapat dikonfigurasi di <code translate="no">search_params.params</code> saat <a href="/docs/id/ivf-rabitq-fastscan.md#Search-on-index">melakukan pencarian pada indeks</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>Parameter</p></th>
     <th><p>Deskripsi</p></th>
     <th><p>Rentang Nilai</p></th>
     <th><p>Saran Penyesuaian</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code translate="no">nprobe</code></p></td>
     <td><p>Jumlah kluster yang akan dicari untuk kandidat. Nilai yang lebih tinggi memungkinkan pencarian pada lebih banyak kluster, sehingga meningkatkan recall dengan memperluas cakupan pencarian, namun dengan konsekuensi peningkatan latensi kueri.</p></td>
     <td><p><strong>Tipe</strong>: Bilangan bulat<br><strong>Rentang</strong>: [1, <em>nlist</em>]<br><strong>Nilai default</strong>: <code translate="no">8</code></p></td>
     <td><p>Meningkatkan nilai ini meningkatkan recall tetapi dapat memperlambat pencarian. Atur ` <code translate="no">nprobe</code> ` secara proporsional dengan ` <code translate="no">nlist</code> ` untuk menyeimbangkan kecepatan dan akurasi. Dalam kebanyakan kasus, kami merekomendasikan Anda untuk mengatur nilai dalam rentang ini: [1, <em>nlist</em>].</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p>RaBitQ</p></td>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>Proses penyempurnaan menggunakan kuantisasi berkualitas lebih tinggi untuk memilih jumlah tetangga terdekat yang diperlukan dari kumpulan kandidat yang <code translate="no">refine_k</code> kali lebih besar, yang dipilih menggunakan IVF_RABITQ_FASTSCAN. Tidak berpengaruh jika penyempurnaan dinonaktifkan.</p></td>
     <td><p><strong>Tipe</strong>: Float<br><strong>Rentang</strong>: [1, <em>float_max</em>)<br><strong>Nilai default</strong>: <code translate="no">1</code></p></td>
     <td><p>Nilai ` <code translate="no">refine_k</code> ` yang lebih tinggi akan menurunkan QPS tetapi meningkatkan tingkat recall. Mulailah dengan ` <code translate="no">1</code> ` dan uji nilai-nilai ` <code translate="no">2</code>`, ` <code translate="no">3</code>`, ` <code translate="no">4</code>`, dan ` <code translate="no">5</code> ` untuk menemukan keseimbangan optimal antara QPS dan recall untuk dataset Anda.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">rbq_bits_query</code></p></td>
     <td><p>Menentukan apakah kuantisasi skalar tambahan pada vektor kueri diterapkan. <strong>Tidak didukung pada <code translate="no">IVF_RABITQ_FASTSCAN</code></strong>: indeks selalu menggunakan kuantisasi kueri 8-bit secara internal. Abaikan parameter ini atau atur ke <code translate="no">0</code>; nilai yang lebih besar dari <code translate="no">0</code> akan ditolak.</p></td>
     <td><p><strong>Tipe</strong>: Bilangan bulat<br><strong>Rentang</strong>: [0, 0]<br><strong>Nilai default</strong>: <code translate="no">0</code></p></td>
     <td><p>Biarkan tidak diatur. Untuk kuantisasi kueri yang dapat dikonfigurasi, gunakan <a href="/docs/id/ivf-rabitq.md">IVF_RABITQ</a> sebagai gantinya.</p></td>
   </tr>
</table>
<h2 id="Limitations" class="common-anchor-header">Batasan<button data-href="#Limitations" class="anchor-icon" translate="no">
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
<li>FastScan menggunakan pengkodean basis data RaBitQ 1-bit tetap dan kuantisasi kueri 8-bit. Pengaturan " <code translate="no">rbq_bits_query</code> " harus diabaikan atau disetel ke " <code translate="no">0</code>".</li>
<li>Hanya penyempurnaan FP32 (setara dengan <code translate="no">FLAT</code>) yang didukung.</li>
<li>Iterator tidak didukung.</li>
<li>Ini adalah indeks CPU. Indeks ini tidak berjalan di GPU.</li>
<li>Kinerja aktual bergantung pada dukungan SIMD CPU, dimensi vektor, <code translate="no">nlist</code>, <code translate="no">nprobe</code>, dan distribusi data. Lakukan pengujian kinerja dengan beban kerja Anda sebelum menerapkannya ke produksi.</li>
</ul>
<p>Untuk varian RaBitQ non-FastScan dan opsi penyempurnaan tambahannya, lihat <a href="/docs/id/ivf-rabitq.md">IVF_RABITQ</a>.</p>
