---
id: ivf-sq8.md
title: IVF_SQ8
summary: >-
  Indeks IVF_SQ8 adalah algoritme pengindeksan berbasis kuantisasi yang
  dirancang untuk mengatasi tantangan pencarian kemiripan berskala besar. Jenis
  indeks ini menghasilkan pencarian yang lebih cepat dengan jejak memori yang
  jauh lebih kecil dibandingkan dengan metode pencarian yang lengkap.
---
<h1 id="IVFSQ8" class="common-anchor-header">IVF_SQ8<button data-href="#IVFSQ8" class="anchor-icon" translate="no">
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
    </button></h1><p>Indeks <strong>IVF_SQ8</strong> adalah algoritme pengindeksan <strong>berbasis kuantisasi</strong> yang dirancang untuk mengatasi tantangan pencarian kemiripan berskala besar. Jenis indeks ini menghasilkan pencarian yang lebih cepat dengan jejak memori yang jauh lebih kecil dibandingkan dengan metode pencarian yang lengkap.</p>
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
    </button></h2><p>Indeks IVF_SQ8 dibangun di atas dua komponen utama:</p>
<ul>
<li><p><strong>Inverted File (IVF</strong>): Mengatur data ke dalam kelompok-kelompok, memungkinkan algoritme pencarian hanya berfokus pada subset vektor yang paling relevan.</p></li>
<li><p><strong>Kuantisasi Skalar (SQ8</strong>): Mengompresi vektor ke bentuk yang lebih ringkas, secara drastis mengurangi penggunaan memori sekaligus mempertahankan presisi yang cukup untuk perhitungan kemiripan yang cepat.</p></li>
</ul>
<h3 id="IVF" class="common-anchor-header">IVF</h3><p>IVF seperti membuat indeks dalam sebuah buku. Alih-alih memindai setiap halaman (atau, dalam kasus kami, setiap vektor), Anda mencari kata kunci tertentu (kelompok) dalam indeks untuk menemukan halaman (vektor) yang relevan dengan cepat. Dalam skenario kami, vektor dikelompokkan ke dalam kluster, dan algoritme akan mencari dalam beberapa kluster yang dekat dengan vektor kueri.</p>
<p>Berikut cara kerjanya:</p>
<ol>
<li><p><strong>Pengelompokan:</strong> Kumpulan data vektor Anda dibagi ke dalam sejumlah klaster tertentu, menggunakan algoritme pengelompokan seperti k-means. Setiap klaster memiliki centroid (vektor representatif untuk klaster).</p></li>
<li><p><strong>Penugasan:</strong> Setiap vektor ditugaskan ke klaster yang memiliki centroid yang paling dekat dengannya.</p></li>
<li><p><strong>Indeks Terbalik:</strong> Sebuah indeks dibuat, memetakan setiap centroid klaster ke daftar vektor yang ditugaskan ke klaster tersebut.</p></li>
<li><p><strong>Pencarian:</strong> Saat Anda mencari tetangga terdekat, algoritme pencarian membandingkan vektor kueri Anda dengan centroid klaster dan memilih klaster yang paling menjanjikan. Pencarian kemudian dipersempit menjadi vektor dalam klaster yang dipilih.</p></li>
</ol>
<p>Untuk mempelajari lebih lanjut tentang detail teknisnya, lihat <a href="/docs/id/ivf-flat.md">IVF_FLAT</a>.</p>
<h3 id="SQ8" class="common-anchor-header">SQ8</h3><p>Kuantisasi Skalar (SQ) adalah teknik yang digunakan untuk mengurangi ukuran vektor berdimensi tinggi dengan mengganti nilainya dengan representasi yang lebih kecil dan lebih ringkas. Varian <strong>SQ8</strong> menggunakan bilangan bulat 8-bit, bukan bilangan floating point 32-bit yang biasa digunakan untuk menyimpan setiap nilai dimensi vektor. Hal ini sangat mengurangi jumlah memori yang diperlukan untuk menyimpan data.</p>
<p>Berikut cara kerja SQ8:</p>
<ol>
<li><p><strong>Identifikasi Rentang:</strong> Pertama, identifikasi nilai minimum dan maksimum dalam vektor. Rentang ini mendefinisikan batas-batas untuk kuantisasi.</p></li>
<li><p><strong>Normalisasi:</strong> Menormalkan nilai vektor ke kisaran antara 0 dan 1 dengan menggunakan rumus:</p>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mtext>normalized_value</mtext><mo>=</mo><mfrac><mrow><mtext>value</mtext><mo>−</mo><mtext>min</mtext></mrow><mrow><mtext>max</mtext><mo>−</mo><mtext>min</mtext></mrow></mfrac></mrow><annotation encoding="application/x-tex">\text{normalized\_value} = \frac{\text{value} - \text{min}}{\text{max} - \text{min}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0044em;vertical-align:-0.31em;"></span><span class="mord text"><span class="mord">normalized_value</span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.1408em;vertical-align:-0.7693em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3714em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord text"><span class="mord">max</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord text"><span class="mord">min</span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord text"><span class="mord">value</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord text"><span class="mord">min</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.7693em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span></p>
<p>Hal ini memastikan semua nilai dipetakan secara proporsional dalam rentang standar, mempersiapkannya untuk kompresi.</p></li>
<li><p><strong>Kompresi 8-Bit:</strong> Kalikan nilai yang dinormalisasi dengan 255 (nilai maksimum untuk bilangan bulat 8-bit) dan bulatkan hasilnya ke bilangan bulat terdekat. Hal ini secara efektif memampatkan setiap nilai ke dalam representasi 8-bit.</p></li>
</ol>
<p>Misalkan Anda memiliki nilai dimensi 1,2, dengan nilai minimum -1,7 dan nilai maksimum 2,3. Gambar berikut menunjukkan bagaimana SQ8 diterapkan untuk mengubah nilai float32 menjadi bilangan bulat int8.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/ivf-sq8.png" alt="Ivf Sq8" class="doc-image" id="ivf-sq8" />
   </span> <span class="img-wrapper"> <span>Ivf Sq8</span> </span></p>
<h3 id="IVF-+-SQ8" class="common-anchor-header">IVF + SQ8</h3><p>Indeks IVF_SQ8 menggabungkan IVF dan SQ8 untuk melakukan pencarian kemiripan secara efisien:</p>
<ol>
<li><p><strong>IVF mempersempit cakupan pencarian</strong>: Kumpulan data dibagi menjadi beberapa kluster, dan ketika kueri dikeluarkan, IVF pertama-tama membandingkan kueri dengan pusat kluster, memilih kluster yang paling relevan.</p></li>
<li><p><strong>SQ8 mempercepat penghitungan jarak</strong>: Di dalam cluster yang dipilih, SQ8 memampatkan vektor menjadi bilangan bulat 8-bit, sehingga mengurangi penggunaan memori dan mempercepat perhitungan jarak.</p></li>
</ol>
<p>Dengan menggunakan IVF untuk memfokuskan pencarian dan SQ8 untuk mempercepat komputasi, IVF_SQ8 mencapai waktu pencarian yang cepat dan efisiensi memori.</p>
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
    </button></h2><p>Untuk membangun indeks <code translate="no">IVF_SQ8</code> pada bidang vektor di Milvus, gunakan metode <code translate="no">add_index()</code>, tentukan <code translate="no">index_type</code>, <code translate="no">metric_type</code>, dan parameter tambahan untuk indeks.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;IVF_SQ8&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">64</span>, <span class="hljs-comment"># Number of clusters to create using the k-means algorithm during index building</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Dalam konfigurasi ini:</p>
<ul>
<li><p><code translate="no">index_type</code>: Jenis indeks yang akan dibangun. Dalam contoh ini, tetapkan nilainya ke <code translate="no">IVF_SQ8</code>.</p></li>
<li><p><code translate="no">metric_type</code>: Metode yang digunakan untuk menghitung jarak antara vektor. Nilai yang didukung termasuk <code translate="no">COSINE</code>, <code translate="no">L2</code>, dan <code translate="no">IP</code>. Untuk detailnya, lihat <a href="/docs/id/metric.md">Jenis Metrik</a>.</p></li>
<li><p><code translate="no">params</code>: Opsi konfigurasi tambahan untuk membangun indeks.</p>
<ul>
<li><code translate="no">nlist</code>: Jumlah cluster yang akan dibuat menggunakan algoritme k-means selama pembuatan indeks.</li>
</ul>
<p>Untuk mempelajari lebih lanjut parameter pembuatan yang tersedia untuk indeks <code translate="no">IVF_SQ8</code>, lihat Parameter <a href="/docs/id/ivf-sq8.md#share-BwprdWFCjoMBtMxorO0cWrUPnjb">pembuatan indeks</a>.</p></li>
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
        <span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">8</span>, <span class="hljs-comment"># Number of clusters to search for candidates</span>
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
<li><code translate="no">nprobe</code>: Jumlah cluster untuk mencari kandidat.</li>
</ul>
<p>Untuk mempelajari lebih lanjut parameter pencarian yang tersedia untuk indeks <code translate="no">IVF_SQ8</code>, lihat Parameter <a href="/docs/id/ivf-sq8.md#share-PJhqdqNaNodKiexm6F1cD2IInbe">pencarian khusus indeks</a>.</p></li>
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
<h3 id="Index-building-params" class="common-anchor-header">Parameter pembangunan indeks</h3><p>Tabel berikut mencantumkan parameter yang dapat dikonfigurasi di <code translate="no">params</code> saat <a href="/docs/id/ivf-sq8.md#share-X9Y9dTuhDohRRBxSvzBcXmIEnu4">membangun indeks.</a></p>
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
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Parameter pencarian khusus indeks</h3><p>Tabel berikut mencantumkan parameter yang dapat dikonfigurasi di <code translate="no">search_params.params</code> saat melakukan <a href="/docs/id/ivf-sq8.md#share-TI73dmWBOoEnocxQ8H7clSYUnLg">pencarian di indeks</a>.</p>
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
