---
id: phrase-match.md
title: Pencocokan FrasaCompatible with Milvus 2.5.17+
summary: >-
  Pencocokan frasa memungkinkan Anda mencari dokumen yang mengandung istilah
  kueri Anda sebagai frasa yang tepat. Secara default, kata-kata harus muncul
  dalam urutan yang sama dan berdekatan satu sama lain. Misalnya, kueri untuk
  "pembelajaran mesin robotika" mencocokkan teks seperti "... model pembelajaran
  mesin robotika yang khas...", di mana kata "robotika", "mesin", dan
  "pembelajaran" muncul secara berurutan tanpa kata lain di antaranya.
beta: Milvus 2.5.17+
---
<h1 id="Phrase-Match" class="common-anchor-header">Pencocokan Frasa<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.5.17+</span><button data-href="#Phrase-Match" class="anchor-icon" translate="no">
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
    </button></h1><p>Pencocokan frasa memungkinkan Anda mencari dokumen yang mengandung istilah kueri Anda sebagai frasa yang tepat. Secara default, kata-kata harus muncul dalam urutan yang sama dan berdekatan satu sama lain. Misalnya, kueri untuk <strong>"pembelajaran mesin robotika"</strong> mencocokkan teks seperti <em>"... model pembelajaran mesin robotika yang khas...",</em> di mana kata <strong>"robotika",</strong> <strong>"mesin"</strong>, dan <strong>"pembelajaran"</strong> muncul secara berurutan tanpa kata lain di antaranya.</p>
<p>Namun, dalam skenario dunia nyata, pencocokan frasa yang ketat bisa jadi terlalu kaku. Anda mungkin ingin mencocokkan teks seperti <em>"... model pembelajaran mesin yang banyak diadopsi dalam robotika...".</em> Di sini, kata kunci yang sama ada tetapi tidak berdampingan atau dalam urutan aslinya. Untuk menangani hal ini, pencocokan frasa mendukung parameter <code translate="no">slop</code>, yang memperkenalkan fleksibilitas. Nilai <code translate="no">slop</code> mendefinisikan berapa banyak pergeseran posisi yang diperbolehkan di antara istilah dalam frasa. Misalnya, dengan <code translate="no">slop</code> sebesar 1, kueri untuk <strong>"pembelajaran mesin"</strong> dapat mencocokkan teks seperti <em>"... machine deep learning...",</em> di mana satu kata (<strong>"deep")</strong> memisahkan istilah aslinya.</p>
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
    </button></h2><p>Didukung oleh pustaka mesin pencari <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a>, pencocokan frasa bekerja dengan menganalisis informasi posisi kata dalam dokumen. Diagram di bawah ini mengilustrasikan prosesnya:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/phrase-match-workflow.png" alt="Phrase Match Workflow" class="doc-image" id="phrase-match-workflow" />
   </span> <span class="img-wrapper"> <span>Alur Kerja Pencocokan Frasa</span> </span></p>
<ol>
<li><p><strong>Tokenisasi Dokumen</strong>: Ketika Anda memasukkan dokumen ke dalam Milvus, teks akan dipecah menjadi token (kata atau istilah individual) menggunakan penganalisis, dengan informasi posisi yang dicatat untuk setiap token. Sebagai contoh, <strong>doc_1</strong> ditokenisasi menjadi <strong>["mesin" (pos=0), "belajar" (pos=1), "meningkatkan" (pos=2), "efisiensi" (pos=3)]</strong>. Untuk informasi lebih lanjut tentang penganalisis, lihat <a href="/docs/id/v2.5.x/analyzer-overview.md">Ikhtisar Penganalisis</a>.</p></li>
<li><p><strong>Pembuatan Indeks Terbalik</strong>: Milvus membuat indeks terbalik, memetakan setiap token ke dokumen tempat token tersebut muncul dan posisi token dalam dokumen tersebut.</p></li>
<li><p><strong>Pencocokan Frasa</strong>: Ketika kueri frasa dijalankan, Milvus mencari setiap token dalam indeks terbalik dan memeriksa posisinya untuk menentukan apakah token tersebut muncul dalam urutan dan jarak yang benar. Parameter <code translate="no">slop</code> mengontrol jumlah maksimum posisi yang diperbolehkan di antara token yang cocok:</p>
<ul>
<li><p><strong>slop = 0</strong> berarti token harus muncul <strong>dalam urutan yang tepat dan berdekatan</strong> (yaitu, tidak ada kata tambahan di antaranya).</p>
<ul>
<li>Dalam contoh, hanya <strong>doc_1</strong> (<strong>"machine"</strong> pada <strong>pos=0</strong>, <strong>"learning"</strong> pada <strong>pos=1</strong>) yang cocok dengan tepat.</li>
</ul></li>
<li><p><strong>slop = 2</strong> memungkinkan hingga dua posisi fleksibilitas atau pengaturan ulang antara token yang cocok.</p>
<ul>
<li><p>Hal ini memungkinkan urutan terbalik (<strong>"mesin pembelajaran")</strong> atau celah kecil di antara token.</p></li>
<li><p>Akibatnya, <strong>doc_1</strong>, <strong>doc_2</strong> (<strong>"belajar"</strong> pada <strong>pos=0</strong>, <strong>"mesin"</strong> pada <strong>pos=1</strong>), dan <strong>doc_3</strong> (<strong>"belajar"</strong> pada <strong>pos=1</strong>, <strong>"mesin"</strong> pada <strong>pos=2</strong>) semuanya cocok.</p></li>
</ul></li>
</ul></li>
</ol>
<h2 id="Enable-phrase-match" class="common-anchor-header">Mengaktifkan pencocokan frasa<button data-href="#Enable-phrase-match" class="anchor-icon" translate="no">
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
    </button></h2><p>Pencocokan frasa bekerja dengan tipe bidang <code translate="no">VARCHAR</code>, tipe data string di Milvus. Untuk mengaktifkan pencocokan frasa, konfigurasikan skema koleksi Anda dengan mengatur parameter <code translate="no">enable_analyzer</code> dan <code translate="no">enable_match</code> ke <code translate="no">True</code>, mirip dengan pencocokan <a href="/docs/id/v2.5.x/keyword-match.md">teks</a>.</p>
<h3 id="Set-enableanalyzer-and-enablematch" class="common-anchor-header">Tetapkan <code translate="no">enable_analyzer</code> dan <code translate="no">enable_match</code><button data-href="#Set-enableanalyzer-and-enablematch" class="anchor-icon" translate="no">
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
    </button></h3><p>Untuk mengaktifkan pencocokan frasa untuk bidang <code translate="no">VARCHAR</code> tertentu, setel kedua parameter <code translate="no">enable_analyzer</code> dan <code translate="no">enable_match</code> ke <code translate="no">True</code> ketika mendefinisikan skema bidang. Konfigurasi ini menginstruksikan Milvus untuk menandai teks dan membuat indeks terbalik dengan informasi posisi yang diperlukan untuk pencocokan frasa yang efisien.</p>
<p>Berikut adalah contoh definisi skema untuk mengaktifkan pencocokan frasa:</p>
<p>[Jenis blok yang tidak didukung]</p>
<h3 id="Optional-Configure-an-analyzer" class="common-anchor-header">Opsional: Mengonfigurasi penganalisis<button data-href="#Optional-Configure-an-analyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>Akurasi pencocokan frasa sangat bergantung pada penganalisis yang digunakan untuk memberi tanda pada data teks Anda. Penganalisis yang berbeda sesuai dengan bahasa dan format teks yang berbeda, yang memengaruhi tokenisasi dan akurasi posisi. Memilih penganalisis yang sesuai untuk kasus penggunaan spesifik Anda akan mengoptimalkan hasil pencocokan frasa.</p>
<p>Secara default, Milvus menggunakan penganalisis standar, yang memberi token pada teks berdasarkan spasi dan tanda baca, menghapus token yang lebih panjang dari 40 karakter, dan mengonversi teks menjadi huruf kecil. Tidak ada parameter tambahan yang diperlukan untuk penggunaan default. Lihat <a href="/docs/id/v2.5.x/standard-analyzer.md">Penganalisis Standar</a> untuk detailnya.</p>
<p>Jika aplikasi Anda memerlukan penganalisis tertentu, konfigurasikan menggunakan parameter <code translate="no">analyzer_params</code>. Sebagai contoh, berikut ini cara mengonfigurasi penganalisis <code translate="no">english</code> untuk pencocokan frasa dalam teks bahasa Inggris:</p>
<p>[Jenis blok yang tidak didukung]</p>
<p>Milvus mendukung beberapa penganalisis yang disesuaikan untuk berbagai bahasa dan kasus penggunaan. Untuk informasi rinci, lihat <a href="/docs/id/v2.5.x/analyzer-overview.md">Ikhtisar Penganalisis</a>.</p>
<h2 id="Use-phrase-match" class="common-anchor-header">Menggunakan pencocokan frasa<button data-href="#Use-phrase-match" class="anchor-icon" translate="no">
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
    </button></h2><p>Setelah Anda mengaktifkan pencocokan untuk bidang <code translate="no">VARCHAR</code> dalam skema koleksi Anda, Anda dapat melakukan pencocokan frasa menggunakan ekspresi <code translate="no">PHRASE_MATCH</code>.</p>
<div class="alert note">
<p>Ekspresi <code translate="no">PHRASE_MATCH</code> tidak peka huruf besar/kecil. Anda dapat menggunakan <code translate="no">PHRASE_MATCH</code> atau <code translate="no">phrase_match</code>.</p>
</div>
<h3 id="PHRASEMATCH-expression-syntax" class="common-anchor-header">Sintaks ekspresi PHRASE_MATCH<button data-href="#PHRASEMATCH-expression-syntax" class="anchor-icon" translate="no">
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
    </button></h3><p>Gunakan ekspresi <code translate="no">PHRASE_MATCH</code> untuk menentukan bidang, frasa, dan fleksibilitas opsional (<code translate="no">slop</code>) saat melakukan pencarian. Sintaksnya adalah:</p>
<p>[Jenis blok yang tidak didukung]</p>
<ul>
<li><p><code translate="no">field_name</code><strong>:</strong> Nama bidang <code translate="no">VARCHAR</code> yang digunakan untuk melakukan pencocokan frasa.</p></li>
<li><p><code translate="no">phrase</code><strong>:</strong> Frasa yang tepat untuk dicari.</p></li>
<li><p><code translate="no">slop</code> (opsional)<strong>:</strong> Bilangan bulat yang menentukan jumlah maksimum posisi yang diperbolehkan dalam pencocokan token.</p>
<ul>
<li><p><code translate="no">0</code> (default): Hanya mencocokkan frasa yang sama persis. Contoh: Filter untuk <strong>"machine learning"</strong> akan mencocokkan <strong>"machine learning"</strong> dengan tepat, tetapi tidak mencocokkan <strong>"machine boosts learning"</strong> atau <strong>"learning machine".</strong></p></li>
<li><p><code translate="no">1</code>: Memungkinkan variasi kecil, seperti satu istilah tambahan atau pergeseran posisi kecil. Contoh: Filter untuk <strong>"machine learning"</strong> akan cocok dengan <strong>"machine boosts learning"</strong> (satu token di antara <strong>"machine"</strong> dan <strong>"learning")</strong>, tetapi tidak cocok dengan <strong>"learning machine"</strong> (istilahnya dibalik).</p></li>
<li><p><code translate="no">2</code>: Memungkinkan fleksibilitas yang lebih besar, termasuk urutan istilah yang dibalik atau hingga dua token di antaranya. Contoh: Filter untuk <strong>"machine learning"</strong> akan cocok dengan <strong>"learning machine"</strong> (istilah dibalik) atau <strong>"machine quickly boosts learning"</strong> (dua token di antara <strong>"machine"</strong> dan <strong>"learning")</strong>.</p></li>
</ul></li>
</ul>
<h3 id="Example-dataset" class="common-anchor-header">Contoh kumpulan data<button data-href="#Example-dataset" class="anchor-icon" translate="no">
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
    </button></h3><p>Misalkan Anda memiliki koleksi bernama <strong>tech_articles</strong> yang berisi lima entitas berikut ini:</p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>"Pembelajaran mesin meningkatkan efisiensi dalam analisis data berskala besar"</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>"Mempelajari pendekatan berbasis mesin sangat penting untuk kemajuan AI modern"</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>"Arsitektur mesin pembelajaran mendalam mengoptimalkan beban komputasi"</p></td>
   </tr>
   <tr>
     <td><p>4</p></td>
     <td><p>"Mesin dengan cepat meningkatkan kinerja model untuk pembelajaran yang berkelanjutan"</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>"Mempelajari algoritme mesin tingkat lanjut memperluas kemampuan AI"</p></td>
   </tr>
</table>
<h3 id="Query-with-phrase-match" class="common-anchor-header">Kueri dengan pencocokan frasa<button data-href="#Query-with-phrase-match" class="anchor-icon" translate="no">
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
    </button></h3><p>Saat menggunakan metode <code translate="no">query()</code>, <strong>PHRASE_MATCH</strong> bertindak sebagai filter skalar. Hanya dokumen yang mengandung frasa yang ditentukan (sesuai dengan slop yang diizinkan) yang dikembalikan.</p>
<h4 id="Example-slop--0-exact-match" class="common-anchor-header">Contoh: slop = 0 (sama persis)</h4><p>Contoh ini mengembalikan dokumen yang berisi frasa yang sama persis dengan <strong>"machine learning"</strong> tanpa token tambahan di antaranya.</p>
<p>[Jenis blok yang tidak didukung]</p>
<p><strong>Hasil kecocokan yang diharapkan:</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>"Pembelajaran mesin meningkatkan efisiensi dalam analisis data berskala besar"</p></td>
   </tr>
</table>
<p>Hanya dokumen 1 yang mengandung frasa yang sama persis dengan <strong>"machine learning"</strong> dalam urutan yang ditentukan tanpa token tambahan.</p>
<h3 id="Search-with-phrase-match" class="common-anchor-header">Pencarian dengan pencocokan frasa<button data-href="#Search-with-phrase-match" class="anchor-icon" translate="no">
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
    </button></h3><p>Dalam operasi pencarian, <strong>PHRASE_MATCH</strong> digunakan untuk menyaring dokumen sebelum menerapkan peringkat kemiripan vektor. Pendekatan dua langkah ini pertama-tama mempersempit kumpulan kandidat dengan pencocokan tekstual dan kemudian memberi peringkat ulang pada kandidat tersebut berdasarkan sematan vektor.</p>
<h4 id="Example-slop--1" class="common-anchor-header">Contoh: slop = 1</h4><p>Di sini, kami mengizinkan slop sebesar 1. Filter diterapkan pada dokumen yang mengandung frasa <strong>"mesin pembelajaran"</strong> dengan sedikit fleksibilitas.</p>
<p>[Jenis blok yang tidak didukung]</p>
<p><strong>Mencocokkan hasil:</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>"Mempelajari pendekatan berbasis mesin sangat penting untuk kemajuan AI modern"</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>"Arsitektur mesin pembelajaran mendalam mengoptimalkan beban komputasi"</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>"Mempelajari algoritme mesin tingkat lanjut memperluas kemampuan AI"</p></td>
   </tr>
</table>
<h4 id="Example-slop--2" class="common-anchor-header">Contoh: slop = 2</h4><p>Contoh ini mengizinkan slop sebesar 2, yang berarti bahwa hingga dua token tambahan (atau istilah yang dibalik) diperbolehkan di antara kata <strong>"mesin"</strong> dan <strong>"pembelajaran"</strong>.</p>
<p>[Jenis blok yang tidak didukung]</p>
<p><strong>Hasil pencocokan:</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>"Pembelajaran mesin meningkatkan efisiensi dalam analisis data berskala besar"</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>"Arsitektur mesin pembelajaran mendalam mengoptimalkan beban komputasi"</p></td>
   </tr>
</table>
<h4 id="Example-slop--3" class="common-anchor-header">Contoh: slop = 3</h4><p>Dalam contoh ini, slop 3 memberikan fleksibilitas yang lebih besar. Filter mencari <strong>"machine learning"</strong> dengan maksimal tiga posisi token yang diperbolehkan di antara kata.</p>
<p>[Jenis blok yang tidak didukung]</p>
<p><strong>Mencocokkan hasil:</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>"Pembelajaran mesin meningkatkan efisiensi dalam analisis data berskala besar"</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>"Mempelajari pendekatan berbasis mesin sangat penting untuk kemajuan AI modern"</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>"Arsitektur mesin pembelajaran mendalam mengoptimalkan beban komputasi"</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>"Mempelajari algoritme mesin tingkat lanjut memperluas kemampuan AI"</p></td>
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
<li><p>Mengaktifkan pencocokan frasa untuk suatu bidang akan memicu pembuatan indeks terbalik, yang menghabiskan sumber daya penyimpanan. Pertimbangkan dampak penyimpanan ketika memutuskan untuk mengaktifkan fitur ini, karena bervariasi berdasarkan ukuran teks, token unik, dan penganalisis yang digunakan.</p></li>
<li><p>Setelah Anda mendefinisikan penganalisis dalam skema Anda, pengaturannya menjadi permanen untuk koleksi tersebut. Jika Anda memutuskan bahwa penganalisis yang berbeda lebih sesuai dengan kebutuhan Anda, Anda dapat mempertimbangkan untuk menghapus koleksi yang ada dan membuat yang baru dengan konfigurasi penganalisis yang diinginkan.</p></li>
<li><p>Kinerja pencocokan frasa bergantung pada bagaimana teks diberi tanda. Sebelum menerapkan penganalisis ke seluruh koleksi Anda, gunakan metode <code translate="no">run_analyzer</code> untuk meninjau keluaran tokenisasi. Untuk informasi lebih lanjut, lihat <a href="/docs/id/v2.5.x/analyzer-overview.md#share-DYZvdQ2vUowWEwx1MEHcdjNNnqT">Ikhtisar Penganalisis</a>.</p></li>
<li><p>Aturan pelarian dalam ekspresi <code translate="no">filter</code>:</p>
<ul>
<li><p>Karakter yang diapit oleh tanda kutip ganda atau tanda kutip tunggal di dalam ekspresi ditafsirkan sebagai konstanta string. Jika konstanta string menyertakan karakter escape, karakter escape harus direpresentasikan dengan urutan escape. Misalnya, gunakan <code translate="no">\\</code> untuk mewakili <code translate="no">\</code>, <code translate="no">\\t</code> untuk mewakili tab <code translate="no">\t</code>, dan <code translate="no">\\n</code> untuk mewakili baris baru.</p></li>
<li><p>Jika konstanta string diapit oleh tanda kutip tunggal, tanda kutip tunggal dalam konstanta tersebut harus direpresentasikan sebagai <code translate="no">\\'</code> sedangkan tanda kutip ganda dapat direpresentasikan sebagai <code translate="no">&quot;</code> atau <code translate="no">\\&quot;</code>. Contoh: <code translate="no">'It\\'s milvus'</code>.</p></li>
<li><p>Jika konstanta string diapit oleh tanda kutip ganda, tanda kutip ganda di dalam konstanta harus direpresentasikan sebagai <code translate="no">\\&quot;</code> sedangkan tanda kutip tunggal dapat direpresentasikan sebagai <code translate="no">'</code> atau <code translate="no">\\'</code>. Contoh: <code translate="no">&quot;He said \\&quot;Hi\\&quot;&quot;</code>.</p></li>
</ul></li>
</ul>
