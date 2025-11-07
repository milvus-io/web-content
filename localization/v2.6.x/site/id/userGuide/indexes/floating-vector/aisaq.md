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
    </button></h1><p>AISAQ adalah indeks vektor berbasis disk yang memperluas <a href="/docs/id/diskann.md">DISKANN</a> untuk menangani set data berskala miliaran tanpa melebihi batas RAM. Tidak seperti DISKANN, yang menyimpan vektor terkompresi dalam memori, AISAQ menyimpan semua data pada disk-menawarkan dua mode untuk menyeimbangkan kinerja dan biaya penyimpanan.</p>
<p>Gunakan AISAQ ketika dataset vektor Anda terlalu besar untuk ditampung dalam RAM, atau ketika Anda perlu mengoptimalkan biaya infrastruktur dengan menukar beberapa kinerja kueri untuk mengurangi kebutuhan memori.</p>
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
<h3 id="AISAQ-modes" class="common-anchor-header">Mode AISAQ<button data-href="#AISAQ-modes" class="anchor-icon" translate="no">
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
    </button></h3><p>AISAQ menawarkan dua strategi penyimpanan berbasis disk. Perbedaan utamanya adalah bagaimana data yang dikompresi PQ disimpan.</p>
<h4 id="AISAQ-performance" class="common-anchor-header">Kinerja AISAQ</h4><p><strong>Performa AISAQ</strong> mencapai penyimpanan berbasis disk sepenuhnya dengan memindahkan data PQ dari memori ke disk sambil mempertahankan IOPS yang rendah melalui kolokasi dan redundansi data.</p>
<p>Dalam mode ini:</p>
<ul>
<li><p>Vektor mentah setiap node, daftar tepi, dan data PQ tetangganya disimpan bersama pada disk.</p></li>
<li><p>Tata letak ini memastikan bahwa mengunjungi sebuah node (misalnya, <em>vektor 0</em>) hanya membutuhkan satu disk I/O.</p></li>
<li><p>Namun, karena data PQ disimpan secara berlebihan di dekat beberapa node, ukuran file indeks meningkat secara signifikan, menghabiskan lebih banyak ruang disk.</p></li>
</ul>
<h4 id="AISAQ-scale" class="common-anchor-header">Skala AISAQ</h4><p><strong>Skala AISAQ</strong> berfokus pada <em>pengurangan penggunaan ruang disk</em> sambil tetap menyimpan semua data di disk.</p>
<p>Dalam mode ini:</p>
<ul>
<li><p>Data PQ disimpan secara terpisah pada disk, tanpa redundansi.</p></li>
<li><p>Desain ini meminimalkan ukuran indeks tetapi menyebabkan lebih banyak operasi I / O selama penjelajahan grafik.</p></li>
<li><p>Untuk mengurangi biaya overhead IOPS, AISAQ memperkenalkan dua pengoptimalan:</p>
<ul>
<li><p>Strategi penyusunan ulang yang mengurutkan vektor PQ berdasarkan prioritas untuk meningkatkan lokalitas data.</p></li>
<li><p>Cache PQ dalam DRAM (pq_cache_size) yang menyimpan data PQ yang sering diakses.</p></li>
</ul></li>
</ul>
<p>Hasilnya, skala AISAQ mencapai efisiensi penyimpanan yang lebih baik tetapi kinerja lebih rendah daripada DISKANN atau AISAQ-Performance.</p>
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
      <span class="hljs-attr">max_degree:</span> <span class="hljs-number">56</span> <span class="hljs-comment"># Maximum degree of the Vamana graph</span>
      <span class="hljs-attr">pq_code_budget_gb_ratio:</span> <span class="hljs-number">0.125</span> <span class="hljs-comment"># Size limit on the PQ code (compared with raw data)</span>
      <span class="hljs-attr">search_list_size:</span> <span class="hljs-number">100</span> <span class="hljs-comment"># Size of the candidate list during building graph</span>
    <span class="hljs-attr">search:</span>
      <span class="hljs-attr">beam_width_ratio:</span> <span class="hljs-number">4</span> <span class="hljs-comment"># Ratio between the maximum number of IO requests per search iteration and CPU number</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="AISAQ-specific-parameters" class="common-anchor-header">Parameter khusus AISAQ<button data-href="#AISAQ-specific-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>AISAQ mewarisi banyak parameter dari DISKANN. Untuk menghindari redundansi, hanya parameter khusus AISAQ yang dirinci di bawah ini. Untuk deskripsi parameter bersama seperti <code translate="no">max_degree</code>, <code translate="no">pq_code_budget_gb_ratio</code>, <code translate="no">search_list_size</code>, dan <code translate="no">beam_width_ratio</code>, lihat <a href="/docs/id/diskann.md#DISKANN-params">DISKANN</a>.</p>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Deskripsi</p></th>
     <th><p>Rentang Nilai</p></th>
     <th><p>Saran Penyetelan</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">inline_pq</code></p></td>
     <td><p>Jumlah vektor PQ yang disimpan sebaris per node. Menentukan tata letak penyimpanan (mode Performa vs Skala).</p></td>
     <td><p><strong>Tipe</strong> Bilangan bulat</p><p><strong>Rentang</strong>: [0, <em>max_degree</em>]</p><p><strong>Nilai default</strong>: <code translate="no">-1</code></p></td>
     <td><p>Semakin dekat <code translate="no">inline_pq</code> ke <em>max_degree</em>, kinerja cenderung lebih baik, tetapi ukuran file indeks meningkat secara signifikan.</p><p>Ketika <code translate="no">inline_pq</code> mendekati 0, kinerja menurun, dan ukuran indeks menjadi serupa dengan DISKANN.</p><p><strong>Catatan</strong>: Ini sangat tergantung pada kinerja disk. Jika kinerja disk buruk, tidak disarankan untuk mengaktifkan opsi ini, karena bandwidth disk yang terbatas dapat menjadi hambatan dan menurunkan kinerja secara keseluruhan.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">rearrange</code></p></td>
     <td><p>Mengaktifkan pengurutan vektor PQ berdasarkan prioritas untuk meningkatkan lokalitas I/O.</p></td>
     <td><p><strong>Jenis</strong> Boolean</p><p><strong>Rentang</strong>: [benar, salah]</p><p><strong>Nilai default</strong>: <code translate="no">false</code></p></td>
     <td><p>Mengurangi I/O kueri tetapi meningkatkan waktu pembuatan indeks.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">pq_cache_size</code></p></td>
     <td><p>Ukuran cache PQ dalam DRAM (byte).</p></td>
     <td><p><strong>Jenis</strong>: Bilangan bulat</p><p><strong>Rentang</strong>: [0, 1&lt;&lt;30]</p><p><strong>Nilai default</strong>: <code translate="no">0</code></p></td>
     <td><p>Cache yang lebih besar meningkatkan kinerja kueri tetapi meningkatkan penggunaan DRAM.</p></td>
   </tr>
</table>
<h2 id="Considerations" class="common-anchor-header">Pertimbangan<button data-href="#Considerations" class="anchor-icon" translate="no">
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
<li><p>Performa disk penting. AISAQ sangat bergantung pada IOPS SSD; penyimpanan yang buruk dapat mengurangi QPS.</p></li>
<li><p>Mode performa AISAQ ≈ latensi DISKANN, tetapi mungkin memerlukan ruang disk beberapa kali lebih besar.</p></li>
<li><p>Mode skala AISAQ cocok untuk pencarian offline atau beban kerja pengarsipan data di mana QPS tidak terlalu penting.</p></li>
</ul>
