---
id: index-with-gpu.md
order: 3
summary: >-
  Panduan ini menjelaskan cara membuat indeks dengan dukungan GPU di Milvus
  untuk meningkatkan performa pencarian.
title: Indeks dengan GPU
---
<h1 id="Index-with-GPU" class="common-anchor-header">Indeks dengan GPU<button data-href="#Index-with-GPU" class="anchor-icon" translate="no">
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
    </button></h1><p>Panduan ini menguraikan langkah-langkah untuk membuat indeks dengan dukungan GPU di Milvus, yang secara signifikan dapat meningkatkan performa pencarian dalam skenario throughput tinggi dan recall tinggi. Untuk detail tentang jenis indeks GPU yang didukung oleh Milvus, lihat <a href="/docs/id/v2.4.x/gpu_index.md">Indeks GPU</a>.</p>
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
    </button></h2><p>Milvus menggunakan kumpulan memori grafis global untuk mengalokasikan memori GPU.</p>
<p>Ini mendukung dua parameter <code translate="no">initMemSize</code> dan <code translate="no">maxMemSize</code> dalam <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml#L767-L769">file konfigurasi Milvus</a>. Ukuran pool pada awalnya diatur ke <code translate="no">initMemSize</code>, dan akan secara otomatis diperluas ke <code translate="no">maxMemSize</code> setelah melebihi batas ini.</p>
<p>Default <code translate="no">initMemSize</code> adalah 1/2 dari memori GPU yang tersedia saat Milvus dijalankan, dan default <code translate="no">maxMemSize</code> sama dengan semua memori GPU yang tersedia.</p>
<p>Hingga Milvus 2.4.1 (termasuk versi 2.4.1), Milvus menggunakan kumpulan memori GPU terpadu. Untuk versi sebelum 2.4.1 (termasuk versi 2.4.1), direkomendasikan untuk mengatur kedua nilai tersebut ke 0.</p>
<pre><code translate="no" class="language-yaml">gpu:
  initMemSize: <span class="hljs-number">0</span> <span class="hljs-comment">#set the initial memory pool size.</span>
  maxMemSize: <span class="hljs-number">0</span> <span class="hljs-comment">#maxMemSize sets the maximum memory usage limit. When the memory usage exceed initMemSize, Milvus will attempt to expand the memory pool. </span>
<button class="copy-code-btn"></button></code></pre>
<p>Mulai Milvus 2.4.1 dan seterusnya, kumpulan memori GPU hanya digunakan untuk data GPU sementara selama pencarian. Oleh karena itu, disarankan untuk mengaturnya ke 2048 dan 4096.</p>
<pre><code translate="no" class="language-yaml">gpu:
  initMemSize: <span class="hljs-number">2048</span> <span class="hljs-comment">#set the initial memory pool size.</span>
  maxMemSize: <span class="hljs-number">4096</span> <span class="hljs-comment">#maxMemSize sets the maximum memory usage limit. When the memory usage exceed initMemSize, Milvus will attempt to expand the memory pool. </span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Build-an-index" class="common-anchor-header">Membangun indeks<button data-href="#Build-an-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Contoh berikut ini menunjukkan cara membuat indeks GPU dengan tipe yang berbeda.</p>
<h3 id="Prepare-index-parameters" class="common-anchor-header">Menyiapkan parameter indeks</h3><p>Saat menyiapkan parameter indeks GPU, tentukan <strong>index_type</strong>, <strong>metric_type</strong>, dan <strong>params</strong>:</p>
<ul>
<li><p><strong>index_type</strong><em>(string</em>): Jenis indeks yang digunakan untuk mempercepat pencarian vektor. Pilihan yang valid termasuk <strong>GPU_CAGRA</strong>, <strong>GPU_IVF_FLAT</strong>, <strong>GPU_IVF_PQ</strong>, dan <strong>GPU_BRUTE_FORCE</strong>.</p></li>
<li><p><strong>metric_type</strong><em>(string</em>): Jenis metrik yang digunakan untuk mengukur kemiripan vektor. Opsi yang valid adalah <strong>IP</strong> dan <strong>L2</strong>.</p></li>
<li><p><strong>params</strong><em>(dict</em>): Parameter bangunan khusus indeks. Opsi yang valid untuk parameter ini bergantung pada jenis indeks.</p></li>
</ul>
<p>Berikut adalah contoh konfigurasi untuk berbagai jenis indeks:</p>
<ul>
<li><p>Indeks<strong>GPU_CAGRA</strong> </p>
<pre><code translate="no" class="language-python">index_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;GPU_CAGRA&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&#x27;intermediate_graph_degree&#x27;</span>: <span class="hljs-number">64</span>,
        <span class="hljs-string">&#x27;graph_degree&#x27;</span>: <span class="hljs-number">32</span>
    }
}
<button class="copy-code-btn"></button></code></pre>
<p>Opsi yang mungkin untuk <strong>params</strong> meliputi:</p>
<ul>
<li><p><strong>intermediate_graph_degree</strong><em>(int</em>): Mempengaruhi waktu pemanggilan dan pembuatan dengan menentukan derajat grafik sebelum pemangkasan. Nilai yang disarankan adalah <strong>32</strong> atau <strong>64</strong>.</p></li>
<li><p><strong>graph_degree</strong><em>(int</em>): Mempengaruhi performa pencarian dan pemanggilan dengan mengatur derajat graf setelah pemangkasan. Biasanya, nilai ini adalah setengah dari <strong>intermediate_graph_degree</strong>. Perbedaan yang lebih besar antara kedua derajat ini menghasilkan waktu pembangunan yang lebih lama. Nilainya harus lebih kecil dari nilai <strong>intermediate_graph_degree</strong>.</p></li>
<li><p><strong>build_algo</strong><em>(string</em>): Memilih algoritma pembuatan graf sebelum pemangkasan. Pilihan yang mungkin:</p>
<ul>
<li><p><strong>IVF_PQ</strong>: Menawarkan kualitas yang lebih tinggi tetapi waktu pembuatan yang lebih lambat.</p></li>
<li><p><strong>NN_DESCENT</strong>: Menyediakan pembuatan yang lebih cepat dengan potensi penarikan yang lebih rendah.</p></li>
</ul></li>
<li><p><strong>cache_dataset_on_device</strong><em>(string</em>, <strong>"true"</strong> | <strong>"false")</strong>: Memutuskan apakah akan menyimpan dataset asli dalam memori GPU. Mengaturnya ke <strong>"true"</strong> akan meningkatkan daya ingat dengan menyempurnakan hasil pencarian, sementara mengaturnya ke <strong>"false"</strong> akan menghemat memori GPU.</p></li>
</ul></li>
<li><p>Indeks<strong>GPU_IVF_FLAT</strong> atau <strong>GPU_IVF_PQ</strong> </p>
<pre><code translate="no" class="language-python">index_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;GPU_IVF_FLAT&quot;</span>, <span class="hljs-comment"># Or GPU_IVF_PQ</span>
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">1024</span>
    }
}
<button class="copy-code-btn"></button></code></pre>
<p>Opsi <strong>parameter</strong> identik dengan yang digunakan dalam <strong><a href="https://milvus.io/docs/index.md#IVF_FLAT">IVF_FLAT</a></strong> dan <strong><a href="https://milvus.io/docs/index.md#IVF_PQ">IVF_PQ</a></strong>.</p></li>
<li><p>Indeks<strong>GPU_BRUTE_FORCE</strong> </p>
<pre><code translate="no" class="language-python">index_params = {
    <span class="hljs-string">&#x27;index_type&#x27;</span>: <span class="hljs-string">&#x27;GPU_BRUTE_FORCE&#x27;</span>,
    <span class="hljs-string">&#x27;metric_type&#x27;</span>: <span class="hljs-string">&#x27;L2&#x27;</span>,
    <span class="hljs-string">&#x27;params&#x27;</span>: {}
}
<button class="copy-code-btn"></button></code></pre>
<p>Tidak ada konfigurasi <strong>params</strong> tambahan yang diperlukan.</p></li>
</ul>
<h3 id="Build-index" class="common-anchor-header">Membangun indeks</h3><p>Setelah mengonfigurasi parameter indeks di <strong>index_params</strong>, panggil metode <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/create_index.md"><code translate="no">create_index()</code></a> untuk membangun indeks.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Get an existing collection</span>
collection = Collection(<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>)

collection.create_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-comment"># Name of the vector field on which an index is built</span>
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Search" class="common-anchor-header">Pencarian<button data-href="#Search" class="anchor-icon" translate="no">
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
    </button></h2><p>Setelah Anda membuat indeks GPU, langkah selanjutnya adalah menyiapkan parameter pencarian sebelum melakukan pencarian.</p>
<h3 id="Prepare-search-parameters" class="common-anchor-header">Menyiapkan parameter pencarian</h3><p>Di bawah ini adalah contoh konfigurasi untuk berbagai jenis indeks:</p>
<ul>
<li><p>Indeks<strong>GPU_BRUTE_FORCE</strong> </p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {}
}
<button class="copy-code-btn"></button></code></pre>
<p>Tidak ada konfigurasi <strong>parameter</strong> tambahan yang diperlukan.</p></li>
<li><p>Indeks<strong>GPU_CAGRA</strong> </p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;itopk_size&quot;</span>: <span class="hljs-number">128</span>,
        <span class="hljs-string">&quot;search_width&quot;</span>: <span class="hljs-number">4</span>,
        <span class="hljs-string">&quot;min_iterations&quot;</span>: <span class="hljs-number">0</span>,
        <span class="hljs-string">&quot;max_iterations&quot;</span>: <span class="hljs-number">0</span>,
        <span class="hljs-string">&quot;team_size&quot;</span>: <span class="hljs-number">0</span>
    }
}
<button class="copy-code-btn"></button></code></pre>
<p>Parameter pencarian utama meliputi:</p>
<ul>
<li><p><strong>itopk_size</strong>: Menentukan ukuran hasil perantara yang disimpan selama pencarian. Nilai yang lebih besar dapat meningkatkan daya ingat dengan mengorbankan kinerja pencarian. Nilai ini setidaknya harus sama dengan nilai top-k<strong>(batas</strong>) akhir dan biasanya merupakan pangkat 2 (misalnya, 16, 32, 64, 128).</p></li>
<li><p><strong>search_width</strong>: Menentukan jumlah titik masuk ke dalam grafik CAGRA selama pencarian. Meningkatkan nilai ini dapat meningkatkan daya ingat tetapi dapat mempengaruhi kinerja pencarian.</p></li>
<li><p><strong>min_iterations</strong> / <strong>max_iterations</strong>: Parameter ini mengontrol proses iterasi pencarian. Secara default, keduanya diatur ke <strong>0</strong>, dan CAGRA secara otomatis menentukan jumlah iterasi berdasarkan <strong>itopk_size</strong> dan <strong>search_width</strong>. Menyesuaikan nilai-nilai ini secara manual dapat membantu menyeimbangkan kinerja dan akurasi.</p></li>
<li><p><strong>team_size</strong>: Menentukan jumlah thread CUDA yang digunakan untuk menghitung jarak metrik pada GPU. Nilai yang umum adalah pangkat 2 hingga 32 (mis. 2, 4, 8, 16, 32). Ini memiliki dampak kecil pada kinerja pencarian. Nilai defaultnya adalah <strong>0</strong>, di mana Milvus secara otomatis memilih <strong>team_size</strong> berdasarkan dimensi vektor.</p></li>
</ul></li>
<li><p>Indeks<strong>GPU_IVF_FLAT</strong> atau <strong>GPU_IVF_PQ</strong> </p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>, 
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}
}
<button class="copy-code-btn"></button></code></pre>
<p>Parameter pencarian untuk kedua jenis indeks ini serupa dengan yang digunakan pada <strong><a href="https://milvus.io/docs/index.md#IVF_FLAT">IVF_FLAT</a> dan <a href="https://milvus.io/docs/index.md#IVF_PQ">IVF_PQ</a></strong>. Untuk informasi lebih lanjut, lihat <a href="https://milvus.io/docs/search.md#Prepare-search-parameters">Melakukan Pencarian Kemiripan Vektor</a>.</p></li>
</ul>
<h3 id="Conduct-a-search" class="common-anchor-header">Melakukan pencarian</h3><p>Gunakan metode <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/search.md"><code translate="no">search()</code></a> untuk melakukan pencarian kemiripan vektor pada indeks GPU.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Load data into memory</span>
collection.load()

collection.search(
    data=[[query_vector]], <span class="hljs-comment"># Your query vector</span>
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-comment"># Name of the vector field</span>
    param=search_params,
    limit=<span class="hljs-number">100</span> <span class="hljs-comment"># Number of the results to return</span>
)
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>Saat menggunakan indeks GPU, perhatikan batasan tertentu:</p>
<ul>
<li><p>Untuk <strong>GPU_IVF_FLAT</strong>, nilai maksimum untuk <strong>batas</strong> adalah 1024.</p></li>
<li><p>Untuk <strong>GPU_IVF_PQ</strong> dan <strong>GPU_CAGRA</strong>, nilai maksimum untuk <strong>limit</strong> adalah 1024.</p></li>
<li><p>Meskipun tidak ada batas yang ditetapkan untuk <strong>limit</strong> pada <strong>GPU_BRUTE_FORCE</strong>, disarankan untuk tidak melebihi 4096 untuk menghindari potensi masalah kinerja.</p></li>
<li><p>Saat ini, indeks GPU tidak mendukung jarak COSINE. Jika jarak COSINE diperlukan, data harus dinormalisasi terlebih dahulu, lalu jarak inner product (IP) dapat digunakan sebagai pengganti.</p></li>
<li><p>Memuat perlindungan OOM untuk indeks GPU tidak sepenuhnya didukung, terlalu banyak data dapat menyebabkan QueryNode macet.</p></li>
<li><p>Indeks GPU tidak mendukung fungsi pencarian seperti <a href="https://milvus.io/docs/single-vector-search.md#Range-search">pencarian rentang</a> dan <a href="https://milvus.io/docs/single-vector-search.md#Grouping-searchh">pencarian pengelompokan</a>.</p></li>
</ul>
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
<p>Indeks GPU sangat bermanfaat dalam situasi yang menuntut throughput tinggi atau pemanggilan tinggi. Misalnya, saat menangani batch besar, throughput pengindeksan GPU dapat melampaui throughput pengindeksan CPU sebanyak 100 kali lipat. Dalam skenario dengan batch yang lebih kecil, indeks GPU masih secara signifikan mengungguli indeks CPU dalam hal kinerja. Selain itu, jika ada persyaratan untuk penyisipan data yang cepat, menggabungkan GPU dapat mempercepat proses pembuatan indeks secara substansial.</p></li>
<li><p><strong>Dalam skenario apa indeks GPU seperti CAGRA, GPU_IVF_PQ, GPU_IVF_FLAT, dan GPU_BRUTE_FORCE paling cocok?</strong></p>
<p>Indeks CAGRA ideal untuk skenario yang menuntut peningkatan performa, meskipun dengan mengorbankan konsumsi memori yang lebih besar. Untuk lingkungan di mana konservasi memori menjadi prioritas, indeks <strong>GPU_IVF_PQ</strong> dapat membantu meminimalkan kebutuhan penyimpanan, meskipun hal ini disertai dengan kehilangan presisi yang lebih tinggi. Indeks <strong>GPU_IVF_FLAT</strong> berfungsi sebagai opsi yang seimbang, menawarkan kompromi antara performa dan penggunaan memori. Terakhir, indeks <strong>GPU_BRUTE_FORCE</strong> dirancang untuk operasi pencarian yang menyeluruh, menjamin tingkat recall 1 dengan melakukan pencarian traversal.</p></li>
</ul>
