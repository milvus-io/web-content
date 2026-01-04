---
id: scann.md
title: SCANN
summary: >-
  Didukung oleh pustaka ScaNN dari Google, indeks SCANN di Milvus dirancang
  untuk mengatasi tantangan penskalaan pencarian kemiripan vektor, dengan
  menyeimbangkan antara kecepatan dan akurasi, bahkan pada kumpulan data besar
  yang secara tradisional akan menjadi tantangan bagi sebagian besar algoritme
  pencarian.
---
<h1 id="SCANN" class="common-anchor-header">SCANN<button data-href="#SCANN" class="anchor-icon" translate="no">
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
    </button></h1><p>Didukung oleh pustaka <a href="https://github.com/google-research/google-research/blob/master/scann%2FREADME.md">ScaNN</a> dari Google, indeks <code translate="no">SCANN</code> di Milvus dirancang untuk mengatasi tantangan penskalaan pencarian kemiripan vektor, dengan menyeimbangkan antara kecepatan dan akurasi, bahkan pada dataset besar yang secara tradisional akan menjadi tantangan bagi sebagian besar algoritme pencarian.</p>
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
    </button></h2><p>ScaNN dibangun untuk memecahkan salah satu tantangan terbesar dalam pencarian vektor: secara efisien menemukan vektor yang paling relevan dalam ruang dimensi tinggi, bahkan ketika set data tumbuh lebih besar dan lebih kompleks. Arsitekturnya memecah proses pencarian vektor menjadi beberapa tahap yang berbeda:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/scann.png" alt="Scann" class="doc-image" id="scann" />
   </span> <span class="img-wrapper"> <span>Memindai</span> </span></p>
<ol>
<li><p><strong>Pemilahan</strong>: Membagi set data menjadi beberapa kelompok. Metode ini mempersempit ruang pencarian dengan hanya berfokus pada subset data yang relevan daripada memindai seluruh dataset, sehingga menghemat waktu dan sumber daya pemrosesan. ScaNN sering menggunakan algoritme pengelompokan, seperti <a href="https://zilliz.com/blog/k-means-clustering">k-means</a>, untuk mengidentifikasi klaster, yang memungkinkannya melakukan pencarian kemiripan dengan lebih efisien.</p></li>
<li><p><strong>Kuantisasi</strong>: ScaNN menerapkan proses kuantisasi yang dikenal sebagai <a href="https://arxiv.org/abs/1908.10396">kuantisasi vektor anisotropik</a> setelah melakukan partisi. Kuantisasi tradisional berfokus pada meminimalkan jarak keseluruhan antara vektor asli dan vektor yang dikompresi, yang tidak ideal untuk tugas-tugas seperti <a href="https://papers.nips.cc/paper/5329-asymmetric-lsh-alsh-for-sublinear-time-maximum-inner-product-search-mips.pdf">Maximum Inner Product Search (MIPS</a>), di mana kemiripan ditentukan oleh hasil kali dalam vektor, bukan jarak langsung. Sebaliknya, kuantisasi anisotropik memprioritaskan pemeliharaan komponen paralel di antara vektor, atau bagian yang paling penting untuk menghitung inner product yang akurat. Pendekatan ini memungkinkan ScaNN untuk mempertahankan akurasi MIPS yang tinggi dengan menyelaraskan vektor yang dikompresi dengan kueri secara hati-hati, sehingga memungkinkan pencarian kemiripan yang lebih cepat dan lebih tepat.</p></li>
<li><p><strong>Pemeringkatan ulang</strong>: Fase pemeringkatan ulang adalah langkah terakhir, di mana ScaNN menyempurnakan hasil pencarian dari tahap partisi dan kuantisasi. Pemeringkatan ulang ini menerapkan perhitungan inner product yang tepat pada vektor kandidat teratas, untuk memastikan hasil akhir yang sangat akurat. Pemeringkatan ulang sangat penting dalam mesin rekomendasi berkecepatan tinggi atau aplikasi pencarian gambar di mana pemfilteran dan pengelompokan awal berfungsi sebagai lapisan kasar, dan tahap akhir memastikan bahwa hanya hasil yang paling relevan yang dikembalikan kepada pengguna.</p></li>
</ol>
<p>Kinerja <code translate="no">SCANN</code> dikendalikan oleh dua parameter utama yang memungkinkan Anda menyempurnakan keseimbangan antara kecepatan dan akurasi:</p>
<ul>
<li><p><code translate="no">with_raw_data</code>: Mengontrol apakah data vektor asli disimpan bersama dengan representasi yang dikuantisasi. Mengaktifkan parameter ini akan meningkatkan akurasi selama pemeringkatan ulang, tetapi meningkatkan kebutuhan penyimpanan.</p></li>
<li><p><code translate="no">reorder_k</code>: Menentukan berapa banyak kandidat yang disempurnakan selama fase pemeringkatan ulang akhir. Nilai yang lebih tinggi meningkatkan akurasi tetapi meningkatkan latensi pencarian.</p></li>
</ul>
<p>Untuk panduan terperinci tentang cara mengoptimalkan parameter ini untuk kasus penggunaan spesifik Anda, lihat Parameter <a href="/docs/id/scann.md#Index-params">indeks</a>.</p>
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
    </button></h2><p>Untuk membangun indeks <code translate="no">SCANN</code> pada bidang vektor di Milvus, gunakan metode <code translate="no">add_index()</code>, tentukan <code translate="no">index_type</code>, <code translate="no">metric_type</code>, dan parameter tambahan untuk indeks.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;SCANN&quot;</span>, <span class="hljs-comment"># Type of the index to create</span></span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;with_raw_data&quot;</span>: <span class="hljs-literal">True</span>, <span class="hljs-comment"># Whether to hold raw data</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Dalam konfigurasi ini:</p>
<ul>
<li><p><code translate="no">index_type</code>: Jenis indeks yang akan dibangun. Dalam contoh ini, tetapkan nilainya ke <code translate="no">SCANN</code>.</p></li>
<li><p><code translate="no">metric_type</code>: Metode yang digunakan untuk menghitung jarak antara vektor. Nilai yang didukung termasuk <code translate="no">COSINE</code>, <code translate="no">L2</code>, dan <code translate="no">IP</code>. Untuk detailnya, lihat <a href="/docs/id/metric.md">Jenis Metrik</a>.</p></li>
<li><p><code translate="no">params</code>: Opsi konfigurasi tambahan untuk membangun indeks.</p>
<ul>
<li><code translate="no">with_raw_data</code>: Apakah akan menyimpan data vektor asli di samping representasi yang dikuantisasi.</li>
</ul>
<p>Untuk mempelajari lebih lanjut parameter pembuatan yang tersedia untuk indeks <code translate="no">SCANN</code>, lihat Parameter <a href="/docs/id/scann.md#Index-building-params">pembuatan indeks</a>.</p></li>
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
        <span class="hljs-string">&quot;reorder_k&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Number of candidates to refine</span>
        <span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">8</span> <span class="hljs-comment"># Number of clusters to search</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">10</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>Dalam konfigurasi ini:</p>
<ul>
<li><p><code translate="no">params</code>: Opsi konfigurasi tambahan untuk pencarian pada indeks.</p>
<ul>
<li><code translate="no">reorder_k</code>: Jumlah kandidat yang akan disaring selama fase pemeringkatan ulang.</li>
<li><code translate="no">nprobe</code>: Jumlah kluster yang akan dicari.</li>
</ul>
<p>Untuk mempelajari lebih lanjut parameter pencarian yang tersedia untuk indeks <code translate="no">SCANN</code>, lihat Parameter <a href="/docs/id/scann.md#Index-specific-search-params">pencarian khusus indeks</a>.</p></li>
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
<h3 id="Index-building-params" class="common-anchor-header">Parameter pembangunan indeks<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>Tabel berikut mencantumkan parameter yang dapat dikonfigurasi di <code translate="no">params</code> saat <a href="/docs/id/scann.md#Build-index">membangun indeks.</a></p>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Deskripsi</p></th>
     <th><p>Rentang Nilai</p></th>
     <th><p>Saran Penyetelan</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">nlist</code></p></td>
     <td><p>Jumlah unit cluster</p></td>
     <td><p>[1, 65536]</p></td>
     <td><p><em>Nlist</em> yang lebih tinggi meningkatkan efisiensi pemangkasan dan biasanya mempercepat pencarian kasar, tetapi partisi dapat menjadi terlalu kecil, yang dapat mengurangi penarikan; <em>nlist</em> yang lebih rendah memindai cluster yang lebih besar, meningkatkan penarikan tetapi memperlambat pencarian.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">with_raw_data</code></p></td>
     <td><p>Apakah akan menyimpan data vektor asli bersama dengan representasi terkuantisasi. Jika diaktifkan, ini memungkinkan penghitungan kemiripan yang lebih akurat selama fase pemeringkatan ulang dengan menggunakan vektor asli, bukan perkiraan terkuantisasi.</p></td>
     <td><p><strong>Jenis</strong>: Boolean</p><p><strong>Rentang</strong> <code translate="no">true</code>, <code translate="no">false</code></p><p><strong>Nilai default</strong>: <code translate="no">true</code></p></td>
     <td><p>Setel ke <code translate="no">true</code> untuk <strong>akurasi pencarian yang lebih tinggi</strong> dan ketika ruang penyimpanan tidak menjadi perhatian utama. Data vektor asli memungkinkan penghitungan kemiripan yang lebih tepat selama pemeringkatan ulang.</p><p>Atur ke <code translate="no">false</code> untuk <strong>mengurangi biaya penyimpanan</strong> dan penggunaan memori, terutama untuk set data yang besar. Namun, hal ini dapat menghasilkan akurasi pencarian yang sedikit lebih rendah karena fase pemeringkatan ulang akan menggunakan vektor yang dikuantisasi.</p><p><strong>Direkomendasikan</strong>: Gunakan <code translate="no">true</code> untuk aplikasi produksi yang memerlukan akurasi tinggi.</p></td>
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
    </button></h3><p>Tabel berikut mencantumkan parameter yang dapat dikonfigurasi di <code translate="no">search_params.params</code> saat melakukan <a href="/docs/id/scann.md#Search-on-index">pencarian pada indeks</a>.</p>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Deskripsi</p></th>
     <th><p>Rentang Nilai</p></th>
     <th><p>Saran Penyetelan</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">reorder_k</code></p></td>
     <td><p>Mengontrol jumlah vektor kandidat yang disempurnakan selama tahap pemeringkatan ulang. Parameter ini menentukan berapa banyak kandidat teratas dari tahap pemartisian dan kuantisasi awal yang dievaluasi ulang menggunakan perhitungan kemiripan yang lebih tepat.</p></td>
     <td><p><strong>Tipe</strong> Bilangan bulat</p><p><strong>Rentang</strong>: [1, <em>int_max</em>]</p><p><strong>Nilai default</strong>: Tidak ada</p></td>
     <td><p><code translate="no">reorder_k</code> yang lebih besar umumnya menghasilkan <strong>akurasi pencarian yang lebih tinggi</strong> karena lebih banyak kandidat yang dipertimbangkan selama fase penyempurnaan akhir. Namun, hal ini juga <strong>meningkatkan waktu pencarian</strong> karena adanya komputasi tambahan.</p><p>Pertimbangkan untuk meningkatkan <code translate="no">reorder_k</code> ketika mencapai recall yang tinggi sangat penting dan kecepatan pencarian tidak terlalu menjadi perhatian. Titik awal yang baik adalah 2-5x dari <code translate="no">limit</code> yang Anda inginkan (hasil TopK yang akan dikembalikan).</p><p>Pertimbangkan untuk mengurangi <code translate="no">reorder_k</code> untuk memprioritaskan pencarian yang lebih cepat, terutama dalam skenario di mana sedikit penurunan akurasi dapat diterima.</p><p>Dalam kebanyakan kasus, kami sarankan Anda menetapkan nilai dalam kisaran ini:<em>[batas</em>, <em>batas</em> * 5].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">nprobe</code></p></td>
     <td><p>Jumlah cluster untuk mencari kandidat.</p></td>
     <td><p><strong>Jenis</strong> Bilangan bulat</p><p><strong>Rentang</strong>: [1, <em>nlist</em>]</p><p><strong>Nilai default</strong>: <code translate="no">8</code></p></td>
     <td><p>Nilai yang lebih tinggi memungkinkan lebih banyak klaster untuk dicari, meningkatkan daya ingat dengan memperluas cakupan pencarian, tetapi dengan biaya peningkatan latensi kueri.</p><p>Tetapkan <code translate="no">nprobe</code> secara proporsional dengan <code translate="no">nlist</code> untuk menyeimbangkan kecepatan dan akurasi.</p><p>Pada kebanyakan kasus, kami menyarankan Anda menetapkan nilai dalam kisaran ini: [1, nlist].</p></td>
   </tr>
</table>
