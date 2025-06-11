---
id: gpu_index.md
related_key: gpu_index
summary: Mekanisme indeks GPU di Milvus.
title: Indeks GPU
---

<h1 id="GPU-Index" class="common-anchor-header">Indeks GPU<button data-href="#GPU-Index" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus mendukung berbagai jenis indeks GPU untuk mempercepat kinerja dan efisiensi pencarian, terutama dalam skenario throughput tinggi dan pemanggilan tinggi. Topik ini memberikan gambaran umum tentang jenis indeks GPU yang didukung oleh Milvus, kasus penggunaan yang sesuai, dan karakteristik kinerja. Untuk informasi tentang membangun indeks dengan GPU, lihat <a href="/docs/id/v2.5.x/index-with-gpu.md">Indeks dengan GPU</a>.</p>
<p>Penting untuk dicatat bahwa menggunakan indeks GPU belum tentu mengurangi latensi dibandingkan dengan menggunakan indeks CPU. Jika Anda ingin memaksimalkan throughput sepenuhnya, Anda memerlukan tekanan permintaan yang sangat tinggi atau vektor kueri dalam jumlah besar.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/gpu_index.png" alt="performance" class="doc-image" id="performance" />
   </span> <span class="img-wrapper"> <span>kinerja</span> </span></p>
<p>Dukungan GPU Milvus dikontribusikan oleh tim Nvidia <a href="https://rapids.ai/">RAPIDS</a>. Berikut ini adalah jenis indeks GPU yang saat ini didukung oleh Milvus.</p>
<h2 id="GPUCAGRA" class="common-anchor-header">GPU_CAGRA<button data-href="#GPUCAGRA" class="anchor-icon" translate="no">
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
    </button></h2><p>GPU_CAGRA adalah indeks berbasis grafik yang dioptimalkan untuk GPU, Menggunakan GPU kelas inferensi untuk menjalankan versi GPU Milvus dapat lebih hemat biaya dibandingkan dengan menggunakan GPU kelas pelatihan yang mahal.</p>
<ul>
<li><p>Parameter pembuatan indeks</p>
<table>
<thead>
<tr><th>Parameter</th><th>Deskripsi</th><th>Nilai Default</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">intermediate_graph_degree</code></td><td>Mempengaruhi waktu pemanggilan dan pembangunan dengan menentukan derajat grafik sebelum pemangkasan. Nilai yang disarankan adalah <code translate="no">32</code> atau <code translate="no">64</code>.</td><td><code translate="no">128</code></td></tr>
<tr><td><code translate="no">graph_degree</code></td><td>Mempengaruhi kinerja pencarian dan pemanggilan dengan mengatur derajat grafik setelah pemangkasan. Perbedaan yang lebih besar antara kedua derajat ini menghasilkan waktu pembangunan yang lebih lama. Nilainya harus lebih kecil dari nilai <strong>intermediate_graph_degree</strong>.</td><td><code translate="no">64</code></td></tr>
<tr><td><code translate="no">build_algo</code></td><td>Memilih algoritma pembuatan graf sebelum pemangkasan. Nilai yang mungkin:</br><code translate="no">IVF_PQ</code>: Menawarkan kualitas yang lebih tinggi tetapi waktu pembuatan lebih lambat.</br> <code translate="no">NN_DESCENT</code>: Menyediakan pembuatan yang lebih cepat dengan potensi pemanggilan yang lebih rendah.</td><td><code translate="no">IVF_PQ</code></td></tr>
<tr><td><code translate="no">cache_dataset_on_device</code></td><td>Memutuskan apakah akan menyimpan dataset asli dalam memori GPU. Nilai yang mungkin:</br><code translate="no">“true”</code>: Menyimpan dataset asli untuk meningkatkan pemanggilan dengan menyempurnakan hasil pencarian.</br> <code translate="no">“false”</code> Tidak menyimpan set data asli untuk menghemat memori GPU.</td><td><code translate="no">“false”</code></td></tr>
<tr><td><code translate="no">adapt_for_cpu</code></td><td>Memutuskan apakah akan menggunakan GPU untuk pembuatan indeks dan CPU untuk pencarian. <br/>Mengatur parameter ini ke <code translate="no">true</code> memerlukan kehadiran parameter <code translate="no">ef</code> dalam permintaan pencarian.</td><td><code translate="no">“false”</code></td></tr>
</tbody>
</table>
</li>
<li><p>Parameter pencarian</p>
<table>
<thead>
<tr><th>Parameter</th><th>Deskripsi</th><th>Nilai Default</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">itopk_size</code></td><td>Menentukan ukuran hasil perantara yang disimpan selama pencarian. Nilai yang lebih besar dapat meningkatkan daya ingat dengan mengorbankan kinerja pencarian. Setidaknya harus sama dengan nilai top-k (batas) akhir dan biasanya merupakan pangkat 2 (misalnya, 16, 32, 64, 128).</td><td>Kosong</td></tr>
<tr><td><code translate="no">search_width</code></td><td>Menentukan jumlah titik masuk ke dalam grafik CAGRA selama pencarian. Meningkatkan nilai ini dapat meningkatkan daya ingat tetapi dapat memengaruhi kinerja pencarian (misalnya 1, 2, 4, 8, 16, 32).</td><td>Kosong</td></tr>
<tr><td><code translate="no">min_iterations</code> / <code translate="no">max_iterations</code></td><td>Mengontrol proses iterasi pencarian. Secara default, nilai ini diatur ke <code translate="no">0</code>, dan CAGRA secara otomatis menentukan jumlah iterasi berdasarkan <code translate="no">itopk_size</code> dan <code translate="no">search_width</code>. Menyesuaikan nilai ini secara manual dapat membantu menyeimbangkan kinerja dan akurasi.</td><td><code translate="no">0</code></td></tr>
<tr><td><code translate="no">team_size</code></td><td>Menentukan jumlah thread CUDA yang digunakan untuk menghitung jarak metrik pada GPU. Nilai yang umum adalah pangkat 2 hingga 32 (mis. 2, 4, 8, 16, 32). Hal ini berdampak kecil pada kinerja pencarian. Nilai defaultnya adalah <code translate="no">0</code>, di mana Milvus secara otomatis memilih <code translate="no">team_size</code> berdasarkan dimensi vektor.</td><td><code translate="no">0</code></td></tr>
<tr><td><code translate="no">ef</code></td><td>Menentukan pertukaran waktu/akurasi kueri. Nilai <code translate="no">ef</code> yang lebih tinggi akan menghasilkan pencarian yang lebih akurat tetapi lebih lambat. <br/>Parameter ini wajib diisi jika Anda mengatur <code translate="no">adapt_for_cpu</code> ke <code translate="no">true</code> ketika Anda membangun indeks.</td><td><code translate="no">[top_k, int_max]</code></td></tr>
</tbody>
</table>
</li>
</ul>
<ul>
<li><p>Batasan pada pencarian</p>
<table>
<thead>
<tr><th>Parameter</th><th>Rentang</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">limit</code> (K atas)</td><td>&lt;= 1024</td></tr>
<tr><td><code translate="no">limit</code> (top-K)</td><td>&lt;=max((<code translate="no">itopk_size</code> + 31)// 32, <code translate="no">search_width</code>) * 32</td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="GPUIVFFLAT" class="common-anchor-header">GPU_IVF_FLAT<button data-href="#GPUIVFFLAT" class="anchor-icon" translate="no">
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
    </button></h2><p>Serupa dengan <a href="https://milvus.io/docs/index.md#IVF_FLAT">IVF_FLAT</a>, GPU_IVF_FLAT juga membagi data vektor ke dalam unit cluster <code translate="no">nlist</code>, dan kemudian membandingkan jarak antara vektor input target dan pusat setiap cluster. Bergantung pada jumlah klaster yang diatur oleh sistem untuk melakukan kueri (<code translate="no">nprobe</code>), hasil pencarian kemiripan dikembalikan berdasarkan perbandingan antara input target dan vektor dalam klaster yang paling mirip saja - secara drastis mengurangi waktu kueri.</p>
<p>Dengan menyesuaikan <code translate="no">nprobe</code>, keseimbangan ideal antara akurasi dan kecepatan dapat ditemukan untuk skenario tertentu. Hasil dari <a href="https://zilliz.com/blog/Accelerating-Similarity-Search-on-Really-Big-Data-with-Vector-Indexing">uji kinerja IVF_FLAT</a> menunjukkan bahwa waktu kueri meningkat tajam seiring dengan bertambahnya jumlah vektor input target (<code translate="no">nq</code>), dan jumlah cluster yang dicari (<code translate="no">nprobe</code>).</p>
<p>GPU_IVF_FLAT adalah indeks IVF yang paling dasar, dan data yang disandikan yang disimpan di setiap unit konsisten dengan data asli.</p>
<p>Ketika melakukan pencarian, perhatikan bahwa Anda dapat mengatur K teratas hingga 256 untuk pencarian apa pun terhadap koleksi yang diindeks GPU_IVF_FLAT.</p>
<ul>
<li><p>Parameter pembuatan indeks</p>
<table>
<thead>
<tr><th>Parameter</th><th>Deskripsi</th><th>Rentang</th><th>Nilai Default</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>Jumlah unit cluster</td><td>[1, 65536]</td><td><code translate="no">128</code></td></tr>
<tr><td><code translate="no">cache_dataset_on_device</code></td><td>Memutuskan apakah akan menyimpan dataset asli dalam memori GPU. Nilai yang mungkin:</br><code translate="no">“true”</code>: Menyimpan dataset asli untuk meningkatkan daya ingat dengan menyempurnakan hasil pencarian.</br> <code translate="no">“false”</code> Tidak menyimpan set data asli untuk menghemat memori GPU.</td><td><code translate="no">&quot;true&quot;</code> <code translate="no">&quot;flase&quot;</code></td><td><code translate="no">&quot;false&quot;</code></td></tr>
</tbody>
</table>
</li>
<li><p>Parameter pencarian</p>
<ul>
<li><p>Pencarian umum</p>
<table>
<thead>
<tr><th>Parameter</th><th>Deskripsi</th><th>Rentang</th><th>Nilai Default</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>Jumlah unit yang akan ditanyakan</td><td>[1, nlist]</td><td><code translate="no">8</code></td></tr>
</tbody>
</table>
</li>
</ul></li>
<li><p>Batas pencarian</p>
<table>
<thead>
<tr><th>Parameter</th><th>Rentang</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">limit</code> (K atas)</td><td>&lt;= <code translate="no">2048</code></td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="GPUIVFPQ" class="common-anchor-header">GPU_IVF_PQ<button data-href="#GPUIVFPQ" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">PQ</code> (Kuantisasi Produk) secara seragam menguraikan ruang vektor dimensi tinggi asli menjadi produk Cartesian dari ruang vektor dimensi rendah <code translate="no">m</code>, dan kemudian mengkuantisasi ruang vektor dimensi rendah yang telah diuraikan. Alih-alih menghitung jarak antara vektor target dan pusat semua unit, kuantisasi produk memungkinkan perhitungan jarak antara vektor target dan pusat pengelompokan setiap ruang dimensi rendah dan sangat mengurangi kompleksitas waktu dan kompleksitas ruang algoritma.</p>
<p>IVF_PQ melakukan pengelompokan indeks IVF sebelum mengkuantisasi produk vektor. File indeksnya bahkan lebih kecil daripada IVF_SQ8, tetapi juga menyebabkan hilangnya akurasi selama pencarian vektor.</p>
<div class="alert note">
<p>Parameter pembuatan indeks dan parameter pencarian bervariasi dengan distribusi Milvus. Pilih distribusi Milvus Anda terlebih dahulu.</p>
<p>Ketika melakukan pencarian, perhatikan bahwa Anda dapat mengatur top-K hingga 8192 untuk setiap pencarian terhadap koleksi yang diindeks GPU_IVF_FLAT.</p>
</div>
<ul>
<li><p>Parameter pembuatan indeks</p>
<table>
<thead>
<tr><th>Parameter</th><th>Deskripsi</th><th>Rentang</th><th>Nilai Default</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>Jumlah unit cluster</td><td>[1, 65536]</td><td><code translate="no">128</code></td></tr>
<tr><td><code translate="no">m</code></td><td>Jumlah faktor kuantisasi produk,</td><td><code translate="no">dim mod m or = 0</code></td><td><code translate="no">0</code></td></tr>
<tr><td><code translate="no">nbits</code></td><td>[Opsional] Jumlah bit tempat penyimpanan setiap vektor dimensi rendah.</td><td>[1, 16]</td><td><code translate="no">8</code></td></tr>
<tr><td><code translate="no">cache_dataset_on_device</code></td><td>Memutuskan apakah akan menyimpan dataset asli dalam memori GPU. Nilai yang mungkin:</br><code translate="no">“true”</code>: Menyimpan dataset asli untuk meningkatkan daya ingat dengan menyempurnakan hasil pencarian.</br> <code translate="no">“false”</code> Tidak menyimpan set data asli untuk menghemat memori GPU.</td><td><code translate="no">&quot;true&quot;</code> <code translate="no">&quot;false&quot;</code></td><td><code translate="no">&quot;false&quot;</code></td></tr>
</tbody>
</table>
</li>
<li><p>Parameter pencarian</p>
<ul>
<li><p>Pencarian umum</p>
<table>
<thead>
<tr><th>Parameter</th><th>Deskripsi</th><th>Rentang</th><th>Nilai Default</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>Jumlah unit yang akan ditanyakan</td><td>[1, nlist]</td><td><code translate="no">8</code></td></tr>
</tbody>
</table>
</li>
</ul></li>
<li><p>Batas pencarian</p>
<table>
<thead>
<tr><th>Parameter</th><th>Rentang</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">limit</code> (K atas)</td><td>&lt;= <code translate="no">1024</code></td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="GPUBRUTEFORCE" class="common-anchor-header">GPU_BRUTE_FORCE<button data-href="#GPUBRUTEFORCE" class="anchor-icon" translate="no">
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
    </button></h2><p>GPU_BRUTE_FORCE dirancang untuk kasus-kasus di mana pemanggilan yang sangat tinggi sangat penting, menjamin pemanggilan 1 dengan membandingkan setiap kueri dengan semua vektor dalam kumpulan data. Ini hanya membutuhkan tipe metrik (<code translate="no">metric_type</code>) dan top-k (<code translate="no">limit</code>) sebagai parameter pembangunan indeks dan pencarian.</p>
<p>Untuk GPU_BRUTE_FORCE, tidak ada tambahan parameter pembangun indeks atau parameter pencarian yang diperlukan.</p>
<h2 id="Conclusion" class="common-anchor-header">Kesimpulan<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>Saat ini, Milvus memuat semua indeks ke dalam memori GPU untuk operasi pencarian yang efisien. Jumlah data yang dapat dimuat tergantung pada ukuran memori GPU:</p>
<ul>
<li><strong>GPU_CAGRA</strong>: Penggunaan memori sekitar 1,8 kali lipat dari data vektor asli.</li>
<li><strong>GPU_IVF_FLAT</strong> dan <strong>GPU_BRUTE_FORCE</strong>: Membutuhkan memori yang sama dengan ukuran data asli.</li>
<li><strong>GPU_IVF_PQ</strong>: Memanfaatkan jejak memori yang lebih kecil, yang bergantung pada pengaturan parameter kompresi.</li>
</ul>
