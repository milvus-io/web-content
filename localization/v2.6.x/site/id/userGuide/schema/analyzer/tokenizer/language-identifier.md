---
id: language-identifier.md
title: Pengidentifikasi BahasaCompatible with Milvus v2.5.15+
summary: >-
  Pengenal_bahasa adalah pengenal khusus yang dirancang untuk meningkatkan
  kemampuan pencarian teks Milvus dengan mengotomatiskan proses analisis bahasa.
  Fungsi utamanya adalah untuk mendeteksi bahasa bidang teks dan kemudian secara
  dinamis menerapkan penganalisis yang telah dikonfigurasi sebelumnya yang
  paling sesuai untuk bahasa tersebut. Hal ini sangat berharga untuk aplikasi
  yang menangani berbagai bahasa, karena menghilangkan kebutuhan untuk penetapan
  bahasa secara manual berdasarkan per input.
beta: Milvus v2.5.15+
---
<h1 id="Language-Identifier" class="common-anchor-header">Pengidentifikasi Bahasa<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v2.5.15+</span><button data-href="#Language-Identifier" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">language_identifier</code> adalah tokenizer khusus yang dirancang untuk meningkatkan kemampuan pencarian teks Milvus dengan mengotomatiskan proses analisis bahasa. Fungsi utamanya adalah untuk mendeteksi bahasa bidang teks dan kemudian secara dinamis menerapkan penganalisis yang telah dikonfigurasi sebelumnya yang paling sesuai untuk bahasa tersebut. Hal ini sangat berharga untuk aplikasi yang menangani berbagai bahasa, karena menghilangkan kebutuhan untuk penetapan bahasa secara manual berdasarkan per input.</p>
<p>Dengan merutekan data teks secara cerdas ke jalur pemrosesan yang sesuai, <code translate="no">language_identifier</code> merampingkan konsumsi data multibahasa dan memastikan tokenisasi yang akurat untuk operasi pencarian dan pengambilan selanjutnya.</p>
<h2 id="Language-detection-workflow" class="common-anchor-header">Alur kerja deteksi bahasa<button data-href="#Language-detection-workflow" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">language_identifier</code> melakukan serangkaian langkah untuk memproses string teks, sebuah alur kerja yang sangat penting bagi pengguna untuk memahami cara mengonfigurasinya dengan benar.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/language-detection-workflow.png" alt="Language Detection Workflow" class="doc-image" id="language-detection-workflow" />
   </span> <span class="img-wrapper"> <span>Alur Kerja Deteksi Bahasa</span> </span></p>
<ol>
<li><p><strong>Masukan:</strong> Alur kerja dimulai dengan string teks sebagai masukan.</p></li>
<li><p><strong>Deteksi bahasa:</strong> String ini pertama-tama diteruskan ke mesin pendeteksi bahasa, yang mencoba mengidentifikasi bahasa. Milvus mendukung dua mesin: <strong>whatlang</strong> dan <strong>lingua</strong>.</p></li>
<li><p><strong>Pemilihan penganalisis:</strong></p>
<ul>
<li><p><strong>Sukses:</strong> Jika bahasa berhasil dideteksi, sistem akan memeriksa apakah nama bahasa yang terdeteksi memiliki penganalisis yang sesuai yang dikonfigurasikan dalam kamus <code translate="no">analyzers</code> Anda. Jika ditemukan kecocokan, sistem akan menerapkan penganalisis yang ditentukan pada teks masukan. Sebagai contoh, teks "Mandarin" yang terdeteksi akan dialihkan ke tokenizer <code translate="no">jieba</code>.</p></li>
<li><p><strong>Mundur:</strong> Jika pendeteksian gagal, atau jika bahasa berhasil dideteksi namun Anda belum menyediakan penganalisis khusus untuk bahasa tersebut, sistem akan beralih ke <strong>penganalisis default</strong> yang telah dikonfigurasi sebelumnya. Ini adalah titik klarifikasi yang penting; penganalisis <code translate="no">default</code> adalah fallback untuk kegagalan deteksi dan ketiadaan penganalisis yang cocok.</p></li>
</ul></li>
</ol>
<p>Setelah penganalisis yang sesuai dipilih, teks diberi tanda dan diproses, menyelesaikan alur kerja.</p>
<h2 id="Available-language-detection-engines" class="common-anchor-header">Mesin pendeteksi bahasa yang tersedia<button data-href="#Available-language-detection-engines" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus menawarkan pilihan antara dua mesin pendeteksi bahasa:</p>
<ul>
<li><p><a href="https://github.com/greyblake/whatlang-rs">whatlang</a></p></li>
<li><p><a href="https://github.com/pemistahl/lingua">lingua</a></p></li>
</ul>
<p>Pemilihannya tergantung pada kinerja spesifik dan persyaratan akurasi aplikasi Anda.</p>
<table>
   <tr>
     <th><p>Mesin</p></th>
     <th><p>Kecepatan</p></th>
     <th><p>Akurasi</p></th>
     <th><p>Format Keluaran</p></th>
     <th><p>Terbaik Untuk</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">whatlang</code></p></td>
     <td><p>Cepat</p></td>
     <td><p>Baik untuk sebagian besar bahasa</p></td>
     <td><p>Nama bahasa (misalnya, <code translate="no">"English"</code>, <code translate="no">"Mandarin"</code>, <code translate="no">"Japanese"</code>)</p><p><strong>Referensi</strong> <a href="https://github.com/greyblake/whatlang-rs/blob/master/SUPPORTED_LANGUAGES.md">Kolom bahasa dalam tabel bahasa yang didukung</a></p></td>
     <td><p>Aplikasi waktu nyata di mana kecepatan sangat penting</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">lingua</code></p></td>
     <td><p>Lebih lambat</p></td>
     <td><p>Ketepatan yang lebih tinggi, terutama untuk teks pendek</p></td>
     <td><p>Nama dalam bahasa Inggris (misalnya, <code translate="no">"English"</code>, <code translate="no">"Chinese"</code>, <code translate="no">"Japanese"</code>)</p><p><strong>Referensi:</strong> <a href="https://github.com/pemistahl/lingua?tab=readme-ov-file#3-which-languages-are-supported">Daftar bahasa yang didukung</a></p></td>
     <td><p>Aplikasi yang mengutamakan keakuratan daripada kecepatan</p></td>
   </tr>
</table>
<p>Pertimbangan penting adalah konvensi penamaan mesin. Meskipun kedua mesin mengembalikan nama bahasa dalam bahasa Inggris, mereka menggunakan istilah yang berbeda untuk beberapa bahasa (misalnya, <code translate="no">whatlang</code> mengembalikan <code translate="no">Mandarin</code>, sementara <code translate="no">lingua</code> mengembalikan <code translate="no">Chinese</code>). Kunci penganalisis harus sama persis dengan nama yang dikembalikan oleh mesin pendeteksi yang dipilih.</p>
<h2 id="Configuration" class="common-anchor-header">Konfigurasi<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk menggunakan tokenizer <code translate="no">language_identifier</code> dengan benar, langkah-langkah berikut harus diambil untuk menentukan dan menerapkan konfigurasinya.</p>
<h3 id="Step-1-Choose-your-languages-and-analyzers" class="common-anchor-header">Langkah 1: Pilih bahasa dan penganalisis Anda<button data-href="#Step-1-Choose-your-languages-and-analyzers" class="anchor-icon" translate="no">
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
    </button></h3><p>Inti dari pengaturan <code translate="no">language_identifier</code> adalah menyesuaikan penganalisis Anda dengan bahasa tertentu yang Anda rencanakan untuk didukung. Sistem bekerja dengan mencocokkan bahasa yang terdeteksi dengan penganalisis yang tepat, sehingga langkah ini sangat penting untuk pemrosesan teks yang akurat.</p>
<p>Di bawah ini adalah pemetaan bahasa yang direkomendasikan ke penganalisis Milvus yang sesuai. Tabel ini berfungsi sebagai jembatan antara output mesin pendeteksi bahasa dan alat terbaik untuk pekerjaan tersebut.</p>
<table>
   <tr>
     <th><p>Bahasa (Keluaran Detektor)</p></th>
     <th><p>Penganalisis yang Direkomendasikan</p></th>
     <th><p>Deskripsi</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">English</code></p></td>
     <td><p><code translate="no">type: english</code></p></td>
     <td><p>Tokenisasi bahasa Inggris standar dengan pemangkasan dan penyaringan kata henti.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">Mandarin</code> (via whatlang) atau <code translate="no">Chinese</code> (via lingua)</p></td>
     <td><p><code translate="no">tokenizer: jieba</code></p></td>
     <td><p>Segmentasi kata dalam bahasa Mandarin untuk teks yang tidak dibatasi spasi.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">Japanese</code></p></td>
     <td><p><code translate="no">tokenizer: icu</code></p></td>
     <td><p>Tokenisasi yang kuat untuk skrip yang kompleks, termasuk bahasa Jepang.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">French</code></p></td>
     <td><p><code translate="no">type: standard</code>, <code translate="no">filter: ["lowercase", "asciifolding"]</code></p></td>
     <td><p>Konfigurasi khusus yang menangani aksen dan karakter bahasa Prancis.</p></td>
   </tr>
</table>
<div class="alert note">
<ul>
<li><p><strong>Pencocokan adalah Kuncinya:</strong> Nama penganalisis Anda <strong>harus sama persis</strong> dengan keluaran bahasa mesin pendeteksi. Misalnya, jika Anda menggunakan <code translate="no">whatlang</code>, kunci untuk teks bahasa Mandarin harus <code translate="no">Mandarin</code>.</p></li>
<li><p><strong>Praktik terbaik:</strong> Tabel di atas menyediakan konfigurasi yang direkomendasikan untuk beberapa bahasa yang umum, tetapi ini bukan daftar yang lengkap. Untuk panduan yang lebih komprehensif dalam memilih penganalisis, lihat <a href="/docs/id/choose-the-right-analyzer-for-your-use-case.md">Memilih Penganalisis yang Tepat untuk Kasus Penggunaan Anda</a>.</p></li>
<li><p><strong>Keluaran detektor</strong>: Untuk daftar lengkap nama bahasa yang dikembalikan oleh mesin pendeteksi, lihat <a href="https://github.com/greyblake/whatlang-rs">tabel bahasa yang didukung Whatlang</a> dan <a href="https://github.com/pemistahl/lingua-rs">daftar bahasa yang didukung Lingua</a>.</p></li>
</ul>
</div>
<h3 id="Step-2-Define-analyzerparams" class="common-anchor-header">Langkah 2: Tentukan parameter penganalisis<button data-href="#Step-2-Define-analyzerparams" class="anchor-icon" translate="no">
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
    </button></h3><p>Untuk menggunakan tokenizer <code translate="no">language_identifier</code> di Milvus, buatlah kamus yang berisi komponen-komponen kunci berikut ini:</p>
<p><strong>Komponen yang diperlukan:</strong></p>
<ul>
<li><p><code translate="no">analyzers</code> config set - Kamus yang berisi semua konfigurasi penganalisis, yang harus disertakan:</p>
<ul>
<li><p><code translate="no">default</code> - Penganalisis mundur yang digunakan ketika deteksi bahasa gagal atau tidak ada penganalisis yang cocok yang ditemukan</p></li>
<li><p><strong>Penganalisis khusus bahasa</strong> - Masing-masing didefinisikan sebagai <code translate="no">&lt;analyzer_name&gt;: &lt;analyzer_config&gt;</code>, di mana:</p>
<ul>
<li><p><code translate="no">analyzer_name</code> cocok dengan keluaran mesin deteksi yang Anda pilih (misalnya, <code translate="no">&quot;English&quot;</code>, <code translate="no">&quot;Japanese&quot;</code>)</p></li>
<li><p><code translate="no">analyzer_config</code> mengikuti format parameter penganalisis standar (lihat <a href="/docs/id/analyzer-overview.md#Analyzer-types">Ikhtisar Penganalisis</a>)</p></li>
</ul></li>
</ul></li>
</ul>
<p><strong>Komponen opsional:</strong></p>
<ul>
<li><p><code translate="no">identifier</code> - Menentukan mesin pendeteksi bahasa mana yang akan digunakan (<code translate="no">whatlang</code> atau <code translate="no">lingua</code>). Setelan default ke <code translate="no">whatlang</code> jika tidak ditentukan</p></li>
<li><p><code translate="no">mapping</code> - Membuat alias khusus untuk penganalisis Anda, sehingga Anda dapat menggunakan nama deskriptif alih-alih format keluaran mesin pendeteksi yang tepat</p></li>
</ul>
<p>Tokenizer bekerja dengan pertama-tama mendeteksi bahasa teks input, kemudian memilih penganalisis yang sesuai dari konfigurasi Anda. Jika deteksi gagal atau tidak ada penganalisis yang cocok, maka secara otomatis akan kembali ke penganalisis <code translate="no">default</code>.</p>
<h4 id="Recommended-Direct-name-matching" class="common-anchor-header">Direkomendasikan: Pencocokan nama langsung</h4><p>Nama penganalisis Anda harus sama persis dengan keluaran mesin pendeteksi bahasa yang Anda pilih. Pendekatan ini lebih sederhana dan menghindari potensi kebingungan.</p>
<p>Untuk <code translate="no">whatlang</code> dan <code translate="no">lingua</code>, gunakan nama bahasa seperti yang ditunjukkan dalam dokumentasi masing-masing:</p>
<ul>
<li><p><a href="https://github.com/greyblake/whatlang-rs/blob/master/SUPPORTED_LANGUAGES.md">bahasa yang didukung whatlang</a> (gunakan kolom<strong>"Bahasa</strong>")</p></li>
<li><p><a href="https://github.com/pemistahl/lingua?tab=readme-ov-file#3-which-languages-are-supported">bahasa yang didukung lingua</a></p></li>
</ul>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,  <span class="hljs-comment"># Must be `language_identifier`</span>
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;whatlang&quot;</span>,  <span class="hljs-comment"># or `lingua`</span>
        <span class="hljs-string">&quot;analyzers&quot;</span>: {  <span class="hljs-comment"># A set of analyzer configs</span>
            <span class="hljs-string">&quot;default&quot;</span>: {
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>  <span class="hljs-comment"># fallback if language detection fails</span>
            },
            <span class="hljs-string">&quot;English&quot;</span>: {  <span class="hljs-comment"># Analyzer name that matches whatlang output</span>
                <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
            },
            <span class="hljs-string">&quot;Mandarin&quot;</span>: {  <span class="hljs-comment"># Analyzer name that matches whatlang output</span>
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>
            }
        }
    }
}
<button class="copy-code-btn"></button></code></pre>
<h4 id="Alternative-approach-Custom-names-with-mapping" class="common-anchor-header">Pendekatan alternatif: Nama khusus dengan pemetaan</h4><p>Jika Anda lebih suka menggunakan nama penganalisis khusus atau perlu menjaga kompatibilitas dengan konfigurasi yang ada, Anda dapat menggunakan parameter <code translate="no">mapping</code>. Hal ini akan membuat alias untuk penganalisis Anda-baik nama mesin pendeteksi asli maupun nama kustom Anda akan berfungsi.</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;lingua&quot;</span>,
        <span class="hljs-string">&quot;analyzers&quot;</span>: {
            <span class="hljs-string">&quot;default&quot;</span>: {
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>
            },
            <span class="hljs-string">&quot;english_analyzer&quot;</span>: {  <span class="hljs-comment"># Custom analyzer name</span>
                <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
            },
            <span class="hljs-string">&quot;chinese_analyzer&quot;</span>: {  <span class="hljs-comment"># Custom analyzer name</span>
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>
            }
        },
        <span class="hljs-string">&quot;mapping&quot;</span>: {
            <span class="hljs-string">&quot;English&quot;</span>: <span class="hljs-string">&quot;english_analyzer&quot;</span>,   <span class="hljs-comment"># Maps detection output to custom name</span>
            <span class="hljs-string">&quot;Chinese&quot;</span>: <span class="hljs-string">&quot;chinese_analyzer&quot;</span>
        }
    }
}
<button class="copy-code-btn"></button></code></pre>
<p>Setelah mendefinisikan <code translate="no">analyzer_params</code>, Anda dapat menerapkannya ke bidang <code translate="no">VARCHAR</code> ketika mendefinisikan skema koleksi. Hal ini memungkinkan Milvus untuk memproses teks dalam bidang tersebut menggunakan penganalisis yang ditentukan untuk tokenisasi dan pemfilteran yang efisien. Untuk detailnya, lihat <a href="/docs/id/analyzer-overview.md#Example-use">Contoh penggunaan</a>.</p>
<h2 id="Examples" class="common-anchor-header">Contoh<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>Berikut adalah beberapa konfigurasi siap pakai untuk skenario umum. Setiap contoh menyertakan kode konfigurasi dan verifikasi sehingga Anda dapat langsung menguji penyiapannya.</p>
<h3 id="English-and-Chinese-detection" class="common-anchor-header">Deteksi bahasa Inggris dan Cina<button data-href="#English-and-Chinese-detection" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Configuration</span>
analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;whatlang&quot;</span>,
        <span class="hljs-string">&quot;analyzers&quot;</span>: {
            <span class="hljs-string">&quot;default&quot;</span>: {<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>},
            <span class="hljs-string">&quot;English&quot;</span>: {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>},
            <span class="hljs-string">&quot;Mandarin&quot;</span>: {<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>}
        }
    }
}

<span class="hljs-comment"># Test the configuration</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># English text</span>
result_en = client.run_analyzer(<span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;English:&quot;</span>, result_en)
<span class="hljs-comment"># Output: </span>
<span class="hljs-comment"># English: [&#x27;The&#x27;, &#x27;Milvus&#x27;, &#x27;vector&#x27;, &#x27;database&#x27;, &#x27;is&#x27;, &#x27;built&#x27;, &#x27;for&#x27;, &#x27;scale&#x27;]</span>

<span class="hljs-comment"># Chinese text  </span>
result_cn = client.run_analyzer(<span class="hljs-string">&quot;Milvus向量数据库专为大规模应用而设计&quot;</span>, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Chinese:&quot;</span>, result_cn)
<span class="hljs-comment"># Output: </span>
<span class="hljs-comment"># Chinese: [&#x27;Milvus&#x27;, &#x27;向量&#x27;, &#x27;数据&#x27;, &#x27;据库&#x27;, &#x27;数据库&#x27;, &#x27;专&#x27;, &#x27;为&#x27;, &#x27;大规&#x27;, &#x27;规模&#x27;, &#x27;大规模&#x27;, &#x27;应用&#x27;, &#x27;而&#x27;, &#x27;设计&#x27;]</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="European-languages-with-accent-normalization" class="common-anchor-header">Bahasa Eropa dengan normalisasi aksen<button data-href="#European-languages-with-accent-normalization" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-comment"># Configuration for French, German, Spanish, etc.</span>
analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;lingua&quot;</span>, 
        <span class="hljs-string">&quot;analyzers&quot;</span>: {
            <span class="hljs-string">&quot;default&quot;</span>: {<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>},
            <span class="hljs-string">&quot;English&quot;</span>: {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>},
            <span class="hljs-string">&quot;French&quot;</span>: {
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
                <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;asciifolding&quot;</span>]
            }
        }
    }
}

<span class="hljs-comment"># Test with accented text</span>
result_fr = client.run_analyzer(<span class="hljs-string">&quot;Café français très délicieux&quot;</span>, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;French:&quot;</span>, result_fr)
<span class="hljs-comment"># Output: </span>
<span class="hljs-comment"># French: [&#x27;cafe&#x27;, &#x27;francais&#x27;, &#x27;tres&#x27;, &#x27;delicieux&#x27;]</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Usage-notes" class="common-anchor-header">Catatan penggunaan<button data-href="#Usage-notes" class="anchor-icon" translate="no">
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
<li><p><strong>Bahasa tunggal per bidang:</strong> Fitur ini beroperasi pada sebuah bidang sebagai satu unit teks yang homogen. Fitur ini dirancang untuk menangani bahasa yang berbeda di berbagai catatan data yang berbeda, seperti satu catatan yang berisi kalimat bahasa Inggris dan catatan berikutnya berisi kalimat bahasa Prancis.</p></li>
<li><p><strong>Tidak ada string bahasa campuran:</strong> <strong>Tidak</strong> dirancang untuk menangani string tunggal yang berisi teks dari berbagai bahasa. Sebagai contoh, satu bidang <code translate="no">VARCHAR</code> yang berisi kalimat bahasa Inggris dan frasa bahasa Jepang yang dikutip akan diproses sebagai satu bahasa.</p></li>
<li><p><strong>Pemrosesan bahasa dominan:</strong> Dalam skenario bahasa campuran, mesin pendeteksi kemungkinan akan mengidentifikasi bahasa yang dominan, dan penganalisis yang sesuai akan diterapkan ke seluruh teks. Hal ini akan menghasilkan tokenisasi yang buruk atau tidak ada sama sekali untuk teks asing yang disematkan.</p></li>
</ul>
