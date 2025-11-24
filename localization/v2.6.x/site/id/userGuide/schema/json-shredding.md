---
id: json-shredding.md
title: Penghancuran JSONCompatible with Milvus 2.6.2+
summary: >-
  Penghancuran JSON mempercepat kueri JSON dengan mengubah penyimpanan berbasis
  baris tradisional menjadi penyimpanan kolom yang dioptimalkan. Sambil
  mempertahankan fleksibilitas JSON untuk pemodelan data, Milvus melakukan
  pengoptimalan kolom di belakang layar yang secara dramatis meningkatkan akses
  dan efisiensi kueri.
beta: Milvus 2.6.2+
---
<h1 id="JSON-Shredding" class="common-anchor-header">Penghancuran JSON<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.2+</span><button data-href="#JSON-Shredding" class="anchor-icon" translate="no">
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
    </button></h1><p>Penghancuran JSON mempercepat kueri JSON dengan mengubah penyimpanan berbasis baris tradisional menjadi penyimpanan kolom yang dioptimalkan. Sambil mempertahankan fleksibilitas JSON untuk pemodelan data, Milvus melakukan pengoptimalan kolom di belakang layar yang secara dramatis meningkatkan akses dan efisiensi kueri.</p>
<p>Penghancuran JSON efektif untuk sebagian besar skenario kueri JSON. Manfaat kinerja menjadi lebih jelas dengan:</p>
<ul>
<li><p><strong>Dokumen JSON yang lebih besar dan lebih kompleks</strong> - Peningkatan kinerja yang lebih besar seiring bertambahnya ukuran dokumen</p></li>
<li><p><strong>Beban kerja yang berat untuk dibaca</strong> - Pemfilteran, penyortiran, atau pencarian yang sering dilakukan pada kunci JSON</p></li>
<li><p><strong>Pola kueri campuran</strong> - Kueri di berbagai kunci JSON yang berbeda mendapatkan manfaat dari pendekatan penyimpanan hibrida</p></li>
</ul>
<h2 id="How-it-works" class="common-anchor-header">Bagaimana cara kerjanya<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>Proses penghancuran JSON terjadi dalam tiga fase yang berbeda untuk mengoptimalkan data agar dapat diambil dengan cepat.</p>
<h3 id="Phase-1-Ingestion--key-classification" class="common-anchor-header">Fase 1: Pencernaan &amp; klasifikasi kunci<button data-href="#Phase-1-Ingestion--key-classification" class="anchor-icon" translate="no">
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
    </button></h3><p>Ketika dokumen JSON baru ditulis, Milvus secara terus menerus mengambil sampel dan menganalisisnya untuk membangun statistik untuk setiap kunci JSON. Analisis ini mencakup rasio kemunculan kunci dan stabilitas tipe (apakah tipe datanya konsisten di seluruh dokumen).</p>
<p>Berdasarkan statistik ini, kunci JSON dikategorikan ke dalam beberapa kategori berikut ini untuk penyimpanan yang optimal.</p>
<h4 id="Categories-of-JSON-keys" class="common-anchor-header">Kategori kunci JSON</h4><table>
   <tr>
     <th><p>Jenis Kunci</p></th>
     <th><p>Deskripsi</p></th>
   </tr>
   <tr>
     <td><p>Kunci yang diketik</p></td>
     <td><p>Kunci yang ada di sebagian besar dokumen dan selalu memiliki tipe data yang sama (misalnya, semua bilangan bulat atau semua string).</p></td>
   </tr>
   <tr>
     <td><p>Kunci dinamis</p></td>
     <td><p>Kunci yang sering muncul namun memiliki tipe data campuran (misalnya, terkadang berupa string, terkadang berupa bilangan bulat).</p></td>
   </tr>
   <tr>
     <td><p>Tombol bersama</p></td>
     <td><p>Kunci yang jarang muncul atau kunci bersarang yang berada di bawah ambang batas frekuensi<strong> yang</strong> dapat dikonfigurasi.</p></td>
   </tr>
</table>
<h4 id="Example-classification" class="common-anchor-header">Contoh klasifikasi</h4><p>Pertimbangkan contoh data JSON yang berisi kunci JSON berikut ini:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">10</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str1&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str2&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">}</span>  
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">30</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str3&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">3</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">40</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4</span><span class="hljs-punctuation">}</span>       <span class="hljs-comment">// b becomes mixed type</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">50</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;e&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;rare&quot;</span><span class="hljs-punctuation">}</span>  <span class="hljs-comment">// e appears infrequently</span>
<button class="copy-code-btn"></button></code></pre>
<p>Berdasarkan data ini, kunci-kunci tersebut akan diklasifikasikan sebagai berikut:</p>
<ul>
<li><p><strong>Kunci yang diketik</strong>: <code translate="no">a</code> dan <code translate="no">f</code> (selalu berupa bilangan bulat)</p></li>
<li><p><strong>Kunci dinamis</strong>: <code translate="no">b</code> (string campuran/bilangan bulat)</p></li>
<li><p><strong>Kunci bersama</strong>: <code translate="no">e</code> (kunci yang jarang muncul)</p></li>
</ul>
<h3 id="Phase-2-Storage-optimization" class="common-anchor-header">Tahap 2: Optimalisasi penyimpanan<button data-href="#Phase-2-Storage-optimization" class="anchor-icon" translate="no">
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
    </button></h3><p>Klasifikasi dari <a href="/docs/id/json-shredding.md#Phase-1-Ingestion--key-classification">Fase 1</a> menentukan tata letak penyimpanan. Milvus menggunakan format kolom yang dioptimalkan untuk kueri.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/json-shredding-flow.png" alt="Json Shredding Flow" class="doc-image" id="json-shredding-flow" />
   </span> <span class="img-wrapper"> <span>Alur Penghancuran Json</span> </span></p>
<ul>
<li><p><strong>Kolom-kolom</strong> yang<strong>diparut</strong>: Untuk <strong>kunci</strong> <strong>yang diketik</strong> dan <strong>dinamis</strong>, data ditulis ke kolom khusus. Penyimpanan kolom ini memungkinkan pemindaian yang cepat dan langsung selama kueri, karena Milvus hanya dapat membaca data yang diperlukan untuk kunci yang diberikan tanpa memproses seluruh dokumen.</p></li>
<li><p><strong>Kolom bersama</strong>: Semua <strong>kunci</strong> bersama disimpan bersama dalam satu kolom JSON biner yang ringkas. <strong>Indeks terbalik</strong> kunci bersama dibangun di atas kolom ini. Indeks ini sangat penting untuk mempercepat kueri pada kunci-kunci berfrekuensi rendah dengan memungkinkan Milvus memangkas data dengan cepat, yang secara efektif mempersempit ruang pencarian menjadi hanya baris-baris yang berisi kunci yang ditentukan.</p></li>
</ul>
<h3 id="Phase-3-Query-execution" class="common-anchor-header">Fase 3: Eksekusi kueri<button data-href="#Phase-3-Query-execution" class="anchor-icon" translate="no">
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
    </button></h3><p>Fase terakhir memanfaatkan tata letak penyimpanan yang dioptimalkan untuk memilih jalur tercepat secara cerdas untuk setiap predikat kueri.</p>
<ul>
<li><p><strong>Jalur cepat</strong>: Kueri dengan kunci yang diketik/dinamis (misalnya, <code translate="no">json['a'] &lt; 100</code>) mengakses kolom khusus secara langsung</p></li>
<li><p><strong>Jalur</strong> yang<strong>dioptimalkan</strong>: Kueri pada kunci bersama (misalnya, <code translate="no">json['e'] = 'rare'</code>) menggunakan indeks terbalik untuk menemukan dokumen yang relevan dengan cepat</p></li>
</ul>
<h2 id="Enable-JSON-shredding" class="common-anchor-header">Mengaktifkan penghancuran JSON<button data-href="#Enable-JSON-shredding" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk mengaktifkan fitur ini, setel <code translate="no">common.enabledJSONShredding</code> ke <code translate="no">true</code> di file konfigurasi <code translate="no">milvus.yaml</code> Anda. Data baru akan secara otomatis memicu proses penghancuran.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-string">...</span>
<span class="hljs-attr">common:</span>
  <span class="hljs-attr">enabledJSONShredding:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># Indicates whether to enable JSON key stats build and load processes</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<p>Setelah diaktifkan, Milvus akan mulai menganalisis dan merestrukturisasi data JSON Anda saat dikonsumsi tanpa intervensi manual lebih lanjut.</p>
<h2 id="Parameter-tuning" class="common-anchor-header">Penyetelan parameter<button data-href="#Parameter-tuning" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk sebagian besar pengguna, setelah penghancuran JSON diaktifkan, pengaturan default untuk parameter lainnya sudah cukup. Namun, Anda dapat menyempurnakan perilaku penghancuran JSON menggunakan parameter-parameter ini di <code translate="no">milvus.yaml</code>.</p>
<table>
   <tr>
     <th><p>Nama Parameter</p></th>
     <th><p>Deskripsi</p></th>
     <th><p>Nilai Default</p></th>
     <th><p>Saran Penyetelan</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">common.enabledJSONShredding</code></p></td>
     <td><p>Mengontrol apakah proses pembuatan dan pemuatan penghancuran JSON diaktifkan.</p></td>
     <td><p>false</p></td>
     <td><p>Harus disetel ke <strong>true</strong> untuk mengaktifkan fitur ini.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">common.usingjsonShreddingForQuery</code></p></td>
     <td><p>Mengontrol apakah Milvus menggunakan data yang diparut untuk akselerasi.</p></td>
     <td><p>true</p></td>
     <td><p>Diatur ke <strong>false</strong> sebagai langkah pemulihan jika kueri gagal, kembali ke jalur kueri asli.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">queryNode.mmap.jsonShredding</code></p></td>
     <td><p>Menentukan apakah Milvus menggunakan mmap saat memuat data yang diparut.</p><p>Untuk detailnya, lihat <a href="/docs/id/mmap.md">Gunakan mmap</a>.</p></td>
     <td><p>true</p></td>
     <td><p>Pengaturan ini umumnya dioptimalkan untuk kinerja. Hanya sesuaikan jika Anda memiliki kebutuhan atau batasan manajemen memori tertentu pada sistem Anda.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.jsonShreddingMaxColumns</code></p></td>
     <td><p>Jumlah maksimum kunci JSON yang akan disimpan dalam kolom cacahan. </p><p>Jika jumlah kunci yang sering muncul melebihi batas ini, Milvus akan memprioritaskan kunci yang paling sering muncul untuk dihancurkan, dan kunci yang tersisa akan disimpan di kolom bersama.</p></td>
     <td><p>1024</p></td>
     <td><p>Ini cukup untuk sebagian besar skenario. Untuk JSON dengan ribuan kunci yang sering muncul, Anda mungkin perlu meningkatkannya, tetapi tetap pantau penggunaan penyimpanan.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.jsonShreddingRatioThreshold</code></p></td>
     <td><p>Rasio kemunculan minimum yang harus dimiliki oleh kunci JSON harus dipertimbangkan untuk dicacah menjadi kolom cacahan.</p><p>Sebuah kunci dianggap sering muncul jika rasionya di atas ambang batas ini.</p></td>
     <td><p>0.3</p></td>
     <td><p><strong>Naikkan</strong> (misalnya, menjadi 0,5) jika jumlah kunci yang memenuhi kriteria penghancuran melebihi batas <code translate="no">dataCoord.jsonShreddingMaxColumns</code>. Hal ini membuat ambang batas menjadi lebih ketat, mengurangi jumlah kunci yang memenuhi syarat untuk penghancuran.</p><p><strong>Kurangi</strong> (misalnya, menjadi 0,1) jika Anda ingin menghancurkan lebih banyak kunci yang lebih jarang muncul daripada ambang batas default 30%.</p></td>
   </tr>
</table>
<h2 id="Performance-benchmarks" class="common-anchor-header">Tolok ukur kinerja<button data-href="#Performance-benchmarks" class="anchor-icon" translate="no">
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
    </button></h2><p>Pengujian kami menunjukkan peningkatan performa yang signifikan di berbagai jenis kunci JSON dan pola kueri.</p>
<h3 id="Test-environment-and-methodology" class="common-anchor-header">Lingkungan dan metodologi pengujian<button data-href="#Test-environment-and-methodology" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><p><strong>Perangkat keras</strong>: 1 inti / 8GB cluster</p></li>
<li><p><strong>Dataset</strong>: 1 juta dokumen dari <a href="https://github.com/ClickHouse/JSONBench.git">JSONBench</a></p></li>
<li><p><strong>Ukuran dokumen rata-rata</strong>: 478,89 byte</p></li>
<li><p><strong>Durasi pengujian</strong>: 100 detik untuk mengukur QPS dan latensi</p></li>
</ul>
<h3 id="Results-typed-keys" class="common-anchor-header">Hasil: kunci yang diketik<button data-href="#Results-typed-keys" class="anchor-icon" translate="no">
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
    </button></h3><p>Pengujian ini mengukur performa saat melakukan kueri terhadap kunci yang ada di sebagian besar dokumen.</p>
<table>
   <tr>
     <th><p>Ekspresi Kueri</p></th>
     <th><p>Jenis Nilai Kunci</p></th>
     <th><p>QPS (tanpa penghancuran)</p></th>
     <th><p>QPS (dengan penghancuran)</p></th>
     <th><p>Peningkatan Kinerja</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">json['time_us'] &gt; 0</code></p></td>
     <td><p>Bilangan bulat</p></td>
     <td><p>8.69</p></td>
     <td><p>287.50</p></td>
     <td><p>33x</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">json['kind'] == 'commit'</code></p></td>
     <td><p>String</p></td>
     <td><p>8.42</p></td>
     <td><p>126.1</p></td>
     <td><p>14.9x</p></td>
   </tr>
</table>
<h3 id="Results-shared-keys" class="common-anchor-header">Hasil: kunci bersama<button data-href="#Results-shared-keys" class="anchor-icon" translate="no">
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
    </button></h3><p>Pengujian ini berfokus pada kueri kunci bersarang yang jarang yang termasuk dalam kategori "bersama".</p>
<table>
   <tr>
     <th><p>Ekspresi Kueri</p></th>
     <th><p>Jenis Nilai Kunci</p></th>
     <th><p>QPS (tanpa penghancuran)</p></th>
     <th><p>QPS (dengan penghancuran)</p></th>
     <th><p>Peningkatan Kinerja</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">json['identity']['seq'] &gt; 0</code></p></td>
     <td><p>Bilangan Bulat Bersarang</p></td>
     <td><p>4.33</p></td>
     <td><p>385</p></td>
     <td><p>88.9x</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">json['identity']['did'] == 'xxxxx'</code></p></td>
     <td><p>String Bersarang</p></td>
     <td><p>7.6</p></td>
     <td><p>352</p></td>
     <td><p>46.3x</p></td>
   </tr>
</table>
<h3 id="Key-insights" class="common-anchor-header">Wawasan utama<button data-href="#Key-insights" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><p><strong>Kueri kunci bersama</strong> menunjukkan peningkatan paling dramatis (hingga 89x lebih cepat)</p></li>
<li><p><strong>Kueri kunci yang diketik</strong> memberikan peningkatan kinerja 15-30x yang konsisten</p></li>
<li><p><strong>Semua jenis kueri</strong> mendapatkan manfaat dari JSON Shredding tanpa regresi kinerja</p></li>
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
<li><p><strong>Bagaimana cara memverifikasi apakah penghancuran JSON berfungsi dengan baik?</strong></p>
<ol>
<li><p>Pertama, periksa apakah data telah dibuat dengan menggunakan perintah <code translate="no">show segment --format table</code> di alat <a href="/docs/id/birdwatcher_usage_guides.md">Birdwatcher</a>. Jika berhasil, output akan berisi <code translate="no">shredding_data/</code> dan <code translate="no">shared_key_index/</code> di bawah bidang <strong>Json Key Stats</strong>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/birdwatcher-output.png" alt="Birdwatcher Output" class="doc-image" id="birdwatcher-output" />
   </span> <span class="img-wrapper"> <span>Keluaran Birdwatcher</span> </span></p></li>
<li><p>Selanjutnya, verifikasi bahwa data telah dimuat dengan menjalankan <code translate="no">show loaded-json-stats</code> pada node kueri. Keluaran akan menampilkan rincian tentang data yang telah dimuat untuk setiap node kueri.</p></li>
</ol></li>
<li><p><strong>Bagaimana jika saya menemukan kesalahan?</strong></p>
<p>Jika proses build atau pemuatan gagal, Anda dapat dengan cepat menonaktifkan fitur tersebut dengan mengatur <code translate="no">common.enabledJSONShredding=false</code>. Untuk menghapus tugas yang tersisa, gunakan perintah <code translate="no">remove stats-task &lt;task_id&gt;</code> di <a href="/docs/id/birdwatcher_usage_guides.md">Birdwatcher</a>. Jika kueri gagal, atur <code translate="no">common.usingjsonShreddingForQuery=false</code> untuk kembali ke jalur kueri asli, melewati data yang diparut.</p></li>
<li><p><strong>Bagaimana cara memilih antara penghancuran JSON dan pengindeksan JSON?</strong></p>
<ul>
<li><p><strong>Penghancuran JSON</strong> ideal untuk kunci yang sering muncul dalam dokumen Anda, terutama untuk struktur JSON yang kompleks. Proses ini menggabungkan manfaat penyimpanan kolumnar dan pengindeksan terbalik, sehingga sangat cocok untuk skenario pembacaan yang berat di mana Anda melakukan kueri terhadap banyak kunci yang berbeda. Namun, ini tidak disarankan untuk dokumen JSON yang sangat kecil karena peningkatan kinerjanya minimal. Semakin kecil proporsi nilai kunci terhadap ukuran total dokumen JSON, semakin baik pengoptimalan kinerja dari penghancuran.</p></li>
<li><p><strong>Pengindeksan JSON</strong> lebih baik untuk pengoptimalan yang ditargetkan untuk kueri berbasis kunci tertentu dan memiliki overhead penyimpanan yang lebih rendah. Ini cocok untuk struktur JSON yang lebih sederhana. Perhatikan bahwa penghancuran JSON tidak mencakup kueri pada kunci di dalam larik, jadi Anda memerlukan indeks JSON untuk mempercepatnya.</p></li>
</ul>
<p>Untuk detailnya, lihat <a href="/docs/id/json-field-overview.md#Next-Accelerate-JSON-queries">Ikhtisar Bidang JSON</a>.</p></li>
</ul>
