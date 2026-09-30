---
id: gpu-ivf-pq.md
title: GPU_IVF_PQ
summary: >-
  Indeks GPU_IVF_PQ dibangun berdasarkan konsep IVF_PQ dengan menggabungkan
  pengelompokan file terbalik dengan Product Quantization (PQ), yang memecah
  vektor berdimensi tinggi menjadi subruang yang lebih kecil dan
  mengkuantifikasinya untuk pencarian kemiripan yang efisien. Didesain khusus
  untuk lingkungan GPU, GPU_IVF_PQ memanfaatkan pemrosesan paralel untuk
  mempercepat komputasi dan menangani data vektor berskala besar secara efektif.
  Untuk informasi lebih lanjut mengenai konsep dasar, lihat IVF_PQ.
---
<h1 id="GPUIVFPQ" class="common-anchor-header">GPU_IVF_PQ<button data-href="#GPUIVFPQ" class="anchor-icon" translate="no">
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
    </button></h1><p>Indeks <strong>GPU_IVF_PQ</strong> dibangun berdasarkan konsep <strong>IVF_PQ</strong> dengan menggabungkan pengelompokan file terbalik dengan Product Quantization (PQ), yang memecah vektor berdimensi tinggi menjadi subruang yang lebih kecil dan mengkuantifikasinya untuk pencarian kemiripan yang efisien. Didesain khusus untuk lingkungan GPU, GPU_IVF_PQ memanfaatkan pemrosesan paralel untuk mempercepat komputasi dan menangani data vektor berskala besar secara efektif. Untuk informasi lebih lanjut tentang konsep dasar, lihat <a href="/docs/id/ivf-pq.md">IVF_PQ</a>.</p>
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
    </button></h2><p>Untuk membangun indeks <code translate="no">GPU_IVF_PQ</code> pada bidang vektor di Milvus, gunakan metode <code translate="no">add_index()</code>, tentukan <code translate="no">index_type</code>, <code translate="no">metric_type</code>, dan parameter tambahan untuk indeks.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;GPU_IVF_PQ&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;m&quot;</span>: <span class="hljs-number">4</span>, <span class="hljs-comment"># Number of sub-vectors to split eahc vector into</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Dalam konfigurasi ini:</p>
<ul>
<li><p><code translate="no">index_type</code>: Jenis indeks yang akan dibangun. Dalam contoh ini, tetapkan nilainya ke <code translate="no">GPU_IVF_PQ</code>.</p></li>
<li><p><code translate="no">metric_type</code>: Metode yang digunakan untuk menghitung jarak antara vektor. Nilai yang didukung termasuk <code translate="no">COSINE</code>, <code translate="no">L2</code>, dan <code translate="no">IP</code>. Untuk detailnya, lihat <a href="/docs/id/metric.md">Jenis Metrik</a>.</p></li>
<li><p><code translate="no">params</code>: Opsi konfigurasi tambahan untuk membangun indeks.</p>
<ul>
<li><code translate="no">m</code>: Jumlah sub-vektor yang akan dibagi menjadi vektor.</li>
</ul>
<p>Untuk mempelajari lebih lanjut parameter pembuatan yang tersedia untuk indeks <code translate="no">GPU_IVF_PQ</code>, lihat Parameter <a href="/docs/id/gpu-ivf-pq.md#Index-building-params">pembuatan indeks</a>.</p></li>
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
        <span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Number of clusters to search</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>Dalam konfigurasi ini:</p>
<ul>
<li><p><code translate="no">params</code>: Opsi konfigurasi tambahan untuk pencarian pada indeks.</p>
<ul>
<li><code translate="no">nprobe</code>: Jumlah kluster yang akan dicari.</li>
</ul>
<p>Untuk mempelajari lebih lanjut parameter pencarian yang tersedia untuk indeks <code translate="no">GPU_IVF_PQ</code>, lihat Parameter <a href="/docs/id/gpu-ivf-pq.md#Index-specific-search-params">pencarian khusus indeks</a>.</p></li>
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
    </button></h3><p>Tabel berikut mencantumkan parameter yang dapat dikonfigurasi di <code translate="no">params</code> saat <a href="/docs/id/gpu-ivf-pq.md#Build-index">membangun indeks.</a></p>
<table>
   <tr>
     <th></th>
     <th><p>Parameter</p></th>
     <th><p>Deskripsi</p></th>
     <th><p>Rentang Nilai</p></th>
     <th><p>Saran Penyetelan</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code translate="no">nlist</code></p></td>
     <td><p>Jumlah klaster yang akan dibuat menggunakan algoritme k-means selama pembuatan indeks.</p></td>
     <td><p><strong>Jenis</strong>: <strong>Rentang</strong> bilangan bulat: [1, 65536]</p>
<p><strong>Nilai default</strong>: <code translate="no">128</code></p></td>
     <td><p>Nilai <code translate="no">nlist</code> yang lebih besar meningkatkan daya ingat dengan membuat klaster yang lebih halus, tetapi meningkatkan waktu pembuatan indeks. Optimalkan berdasarkan ukuran set data dan sumber daya yang tersedia. Dalam kebanyakan kasus, kami sarankan Anda menetapkan nilai dalam kisaran ini: [32, 4096].</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p>PQ</p></td>
     <td><p><code translate="no">m</code></p></td>
     <td><p>Jumlah sub-vektor (digunakan untuk kuantisasi) untuk membagi setiap vektor dimensi tinggi selama proses kuantisasi.</p></td>
     <td><p><strong>Jenis</strong>: Bilangan bulat <strong>Rentang</strong>: [1, 65536]</p>
<p><strong>Nilai default</strong>: Tidak ada</p></td>
     <td><p>Nilai <code translate="no">m</code> yang lebih tinggi dapat meningkatkan akurasi, tetapi juga meningkatkan kompleksitas komputasi dan penggunaan memori. <code translate="no">m</code> harus merupakan pembagi dimensi vektor<em>(D)</em> untuk memastikan penguraian yang tepat. Nilai yang umumnya direkomendasikan adalah <em>m = D/2</em>.</p>
<p>Dalam kebanyakan kasus, kami sarankan Anda menetapkan nilai dalam kisaran ini: [D/8, D].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">nbits</code></p></td>
     <td><p>Jumlah bit yang digunakan untuk merepresentasikan indeks centroid setiap sub-vektor dalam bentuk terkompresi. Ini secara langsung menentukan ukuran setiap codebook. Setiap codebook akan berisi centroid <sup>2nbit</sup>. Sebagai contoh, jika <code translate="no">nbits</code> diatur ke 8, setiap sub-vektor akan diwakili oleh indeks centroid 8-bit. Hal ini memungkinkan<sup>28</sup> (256) kemungkinan centroid dalam codebook untuk sub-vektor tersebut.</p></td>
     <td><p><strong>Jenis</strong>: <strong>Rentang</strong> Bilangan Bulat: [1, 24]</p>
<p><strong>Nilai default</strong>: <code translate="no">8</code></p></td>
     <td><p>Nilai <code translate="no">nbits</code> yang lebih tinggi memungkinkan codebook yang lebih besar, yang berpotensi menghasilkan representasi yang lebih akurat dari vektor asli. Namun, ini juga berarti menggunakan lebih banyak bit untuk menyimpan setiap indeks, yang menghasilkan kompresi yang lebih sedikit. Dalam kebanyakan kasus, kami sarankan Anda menetapkan nilai dalam kisaran ini: [1, 16].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">cache_dataset_on_device</code></p></td>
     <td><p>Memutuskan apakah akan menyimpan dataset asli dalam memori GPU. Nilai yang mungkin:</p>
<ul>
<li><p><code translate="no">"true"</code>: Menyimpan dataset asli untuk meningkatkan daya ingat dengan menyempurnakan hasil pencarian.</p></li>
<li><p><code translate="no">"false"</code>: Tidak menyimpan set data asli untuk menghemat memori GPU.</p></li>
</ul></td>
     <td><p><strong>Jenis</strong>: <strong>Rentang</strong> String: [<code translate="no">"true"</code>, <code translate="no">"false"</code>]</p>
<p><strong>Nilai default</strong>: <code translate="no">"false"</code></p></td>
     <td><p>Mengaturnya ke <code translate="no">"true"</code> akan meningkatkan daya ingat dengan menyempurnakan hasil pencarian, tetapi menggunakan lebih banyak memori GPU. Mengaturnya ke <code translate="no">"false"</code> akan menghemat memori GPU.</p></td>
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
    </button></h3><p>Tabel berikut mencantumkan parameter yang dapat dikonfigurasi di <code translate="no">search_params.params</code> saat melakukan <a href="/docs/id/gpu-ivf-pq.md#Search-on-index">pencarian pada indeks</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>Parameter</p></th>
     <th><p>Deskripsi</p></th>
     <th><p>Rentang Nilai</p></th>
     <th><p>Saran Penyetelan</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code translate="no">nprobe</code></p></td>
     <td><p>Jumlah cluster untuk mencari kandidat.</p></td>
     <td><p><strong>Tipe</strong> Bilangan bulat <strong>Rentang</strong>: [1, <em>nlist</em>]</p>
<p><strong>Nilai default</strong>: <code translate="no">8</code></p></td>
     <td><p>Nilai yang lebih tinggi memungkinkan lebih banyak klaster untuk dicari, meningkatkan daya ingat dengan memperluas cakupan pencarian, namun dengan biaya peningkatan latensi kueri. Tetapkan <code translate="no">nprobe</code> secara proporsional dengan <code translate="no">nlist</code> untuk menyeimbangkan kecepatan dan akurasi.</p>
<p>Pada kebanyakan kasus, kami menyarankan Anda menetapkan nilai dalam kisaran ini: [1, nlist].</p></td>
   </tr>
</table>
