---
id: choose-the-right-analyzer-for-your-use-case.md
title: Pilih Alat Analisis yang Tepat untuk Kebutuhan Anda
summary: Catatan
---
<h1 id="Choose-the-Right-Analyzer-for-Your-Use-Case" class="common-anchor-header">Pilih Alat Analisis yang Tepat untuk Kebutuhan Anda<button data-href="#Choose-the-Right-Analyzer-for-Your-Use-Case" class="anchor-icon" translate="no">
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
    </button></h1><div class="alert note">
<p>Panduan ini berfokus pada pengambilan keputusan praktis dalam pemilihan alat analisis. Untuk detail teknis mengenai komponen alat analisis dan cara menambahkan parameter alat analisis, lihat <a href="/docs/id/analyzer-overview.md">Ikhtisar Alat Analisis</a>.</p>
</div>
<h2 id="Understand-analyzers-in-2-minutes" class="common-anchor-header">Pahami analyzer dalam 2 menit<button data-href="#Understand-analyzers-in-2-minutes" class="anchor-icon" translate="no">
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
    </button></h2><p>Di Milvus, alat analisis memproses teks yang disimpan di bidang ini agar dapat dicari berdasarkan fitur seperti <a href="/docs/id/full-text-search.md">pencarian teks lengkap</a> (BM25), <a href="/docs/id/phrase-match.md">pencocokan frasa</a>, atau <a href="/docs/id/keyword-match.md">pencocokan teks</a>. Anggap saja sebagai pengolah teks yang mengubah konten mentah Anda menjadi token yang dapat dicari.</p>
<p>Penganalisis bekerja dalam alur kerja dua tahap yang sederhana:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/analyzer-workflow.png" alt="Analyzer Workflow" class="doc-image" id="analyzer-workflow" /> 
   <span>Alur Kerja Penganalisis</span>
  
 </span></p>
<ol>
<li><p><strong>Tokenisasi (wajib):</strong> Tahap awal ini menerapkan <strong>tokenizer</strong> untuk memecah rangkaian teks yang berkelanjutan menjadi unit-unit terpisah dan bermakna yang disebut token. Metode tokenisasi dapat sangat bervariasi tergantung pada bahasa dan jenis konten.</p></li>
<li><p><strong>Penyaringan token (opsional):</strong> Setelah tokenisasi, <strong>filter</strong> diterapkan untuk memodifikasi, menghapus, atau menyempurnakan token. Operasi ini dapat mencakup mengubah semua token menjadi huruf kecil, menghapus kata-kata umum yang tidak bermakna (seperti kata-kata penghubung), atau mereduksi kata-kata ke bentuk akarnya (stemming).</p></li>
</ol>
<p><strong>Contoh</strong>:</p>
<pre><code translate="no" class="language-plaintext">Input: &quot;Hello World!&quot; 
       1. Tokenization → [&quot;Hello&quot;, &quot;World&quot;, &quot;!&quot;]
       2. Lowercase &amp; Punctuation Filtering → [&quot;hello&quot;, &quot;world&quot;]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Why-the-choice-of-analyzer-matters" class="common-anchor-header">Mengapa pemilihan penganalisis itu penting<button data-href="#Why-the-choice-of-analyzer-matters" class="anchor-icon" translate="no">
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
    </button></h2><p>Memilih penganalisis yang salah dapat membuat dokumen yang relevan tidak dapat dicari atau menghasilkan hasil yang tidak relevan.</p>
<p>Tabel berikut merangkum masalah umum yang disebabkan oleh pemilihan analis yang tidak tepat dan memberikan solusi praktis untuk mendiagnosis masalah pencarian.</p>
<table>
   <tr>
     <th><p>Masalah</p></th>
     <th><p>Gejala</p></th>
     <th><p>Contoh (Masukan &amp; Keluaran)</p></th>
     <th><p>Penyebab (Alat Analisis yang Salah)</p></th>
     <th><p>Solusi (Alat Analisis yang Tepat)</p></th>
   </tr>
   <tr>
     <td><p>Tokenisasi berlebihan</p></td>
     <td><p>Pencarian teks untuk istilah teknis, pengenal, atau URL gagal menemukan dokumen yang relevan.</p></td>
     <td><ul><li><p><code translate="no">"user_id"</code> → <code translate="no">['user', 'id']</code></p></li><li><p><code translate="no">"C++"</code> → <code translate="no">['c']</code></p></li></ul></td>
     <td><p><a href="/docs/id/standard-analyzer.md"><code translate="no">standard</code></a> analisis</p></td>
     <td><p>Gunakan <a href="/docs/id/whitespace-tokenizer.md"><code translate="no">whitespace</code></a> tokenizer; gabungkan dengan <a href="/docs/id/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a> filter.</p></td>
   </tr>
   <tr>
     <td><p>Tokenisasi yang tidak memadai</p></td>
     <td><p>Pencarian terhadap komponen frasa multi-kata gagal mengembalikan dokumen yang berisi frasa lengkap tersebut.</p></td>
     <td><p><code translate="no">"state-of-the-art"</code> → <code translate="no">['state-of-the-art']</code></p></td>
     <td><p>Analyzer dengan <a href="/docs/id/whitespace-tokenizer.md"><code translate="no">whitespace</code></a> tokenizer</p></td>
     <td><p>Gunakan <a href="/docs/id/standard-tokenizer.md"><code translate="no">standard</code></a> tokenizer untuk memisahkan berdasarkan tanda baca dan spasi; gunakan filter <a href="/docs/id/regex-filter.md">regex</a> khusus.</p></td>
   </tr>
   <tr>
     <td><p>Ketidaksesuaian Bahasa</p></td>
     <td><p>Hasil pencarian untuk bahasa tertentu tidak masuk akal atau tidak ada sama sekali.</p></td>
     <td><p>Teks dalam bahasa Mandarin: <code translate="no">"机器学习"</code> → <code translate="no">['机器学习']</code> (satu token)</p></td>
     <td><p><a href="/docs/id/english-analyzer.md"><code translate="no">english</code></a> analisis</p></td>
     <td><p>Gunakan penganalisis khusus bahasa, seperti <a href="/docs/id/chinese-analyzer.md"><code translate="no">chinese</code></a>.</p></td>
   </tr>
   <tr>
     <td><p>Ketidaksesuaian metode input</p></td>
     <td><p>Pengguna mengetik Pinyin, tetapi teks yang diindeks menggunakan karakter Tionghoa.</p></td>
     <td><p>Teks bahasa Mandarin: <code translate="no">"足球"</code>; teks kueri: <code translate="no">"zuqiu"</code></p></td>
     <td><p>Penganalisis yang hanya menghasilkan token karakter Tionghoa</p></td>
     <td><p>Gunakan penganalisis khusus dengan <a href="/docs/id/jieba-tokenizer.md"><code translate="no">jieba</code></a> tokenizer dan <a href="/docs/id/pinyin-filter.md"><code translate="no">pinyin</code></a> filter.</p></td>
   </tr>
</table>
<h2 id="First-question-Do-you-need-to-choose-an-analyzer" class="common-anchor-header">Pertanyaan pertama: Apakah Anda perlu memilih penganalisis?<button data-href="#First-question-Do-you-need-to-choose-an-analyzer" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk banyak kasus penggunaan, Anda tidak perlu melakukan hal khusus apa pun. Mari kita tentukan apakah Anda termasuk di antaranya.</p>
<h3 id="Default-behavior-standard-analyzer" class="common-anchor-header">Perilaku default: penganalisis <code translate="no">standard</code> <button data-href="#Default-behavior-standard-analyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>Jika Anda tidak menentukan penganalisis saat menggunakan fitur pencarian teks seperti pencarian teks lengkap, Milvus secara otomatis menggunakan <a href="/docs/id/standard-analyzer.md"><code translate="no">standard</code></a> analizer tersebut.</p>
<p>Analyzer " <code translate="no">standard</code> ":</p>
<ul>
<li><p>Memisahkan teks berdasarkan spasi dan tanda baca</p></li>
<li><p>Mengubah semua token menjadi huruf kecil</p></li>
<li><p>Menghapus sekumpulan kata penghubung (stop words) bahasa Inggris umum yang sudah terintegrasi serta sebagian besar tanda baca</p></li>
</ul>
<p><strong>Contoh transformasi</strong>:</p>
<pre><code translate="no" class="language-plaintext">Input:  &quot;The Milvus vector database is built for scale!&quot;
Output: [&#x27;the&#x27;, &#x27;milvus&#x27;, &#x27;vector&#x27;, &#x27;database&#x27;, &#x27;is&#x27;, &#x27;built&#x27;, &#x27;scale&#x27;]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Decision-criteria-A-quick-check" class="common-anchor-header">Kriteria keputusan: Pemeriksaan cepat<button data-href="#Decision-criteria-A-quick-check" class="anchor-icon" translate="no">
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
    </button></h3><p>Gunakan tabel ini untuk dengan cepat menentukan apakah penganalisis default " <code translate="no">standard</code> " memenuhi kebutuhan Anda. Jika tidak, Anda perlu memilih jalur yang berbeda.</p>
<table>
   <tr>
     <th><p>Konten Anda</p></th>
     <th><p>Apakah Penganalisis Standar Cocok?</p></th>
     <th><p>Mengapa</p></th>
     <th><p>Apa yang Anda Butuhkan</p></th>
   </tr>
   <tr>
     <td><p>Posting blog dalam bahasa Inggris</p></td>
     <td><p>✅ Ya</p></td>
     <td><p>Perilaku default sudah cukup.</p></td>
     <td><p>Gunakan pengaturan default (tidak perlu konfigurasi).</p></td>
   </tr>
   <tr>
     <td><p>Dokumen dalam bahasa Mandarin</p></td>
     <td><p>❌ Tidak</p></td>
     <td><p>Kata-kata dalam bahasa Mandarin tidak memiliki spasi dan akan diperlakukan sebagai satu token.</p></td>
     <td><p>Gunakan <a href="/docs/id/chinese-analyzer.md"><code translate="no">chinese</code></a> .</p></td>
   </tr>
   <tr>
     <td><p>Dokumen bahasa Arab</p></td>
     <td><p>❌ Tidak</p></td>
     <td><p>Teks bahasa Arab mungkin berisi varian huruf, tanda diakritik, Tatweel, angka Arab-India, dan kata-kata pengisi umum dalam bahasa Arab yang memerlukan penanganan khusus sesuai bahasa.</p></td>
     <td><p>Gunakan <a href="/docs/id/arabic-analyzer.md"><code translate="no">arabic</code></a> .</p></td>
   </tr>
   <tr>
     <td><p>Dokumen bahasa Thailand</p></td>
     <td><p>❌ Tidak</p></td>
     <td><p>Teks bahasa Thailand biasanya tidak menggunakan spasi di antara kata-kata, sehingga memerlukan segmentasi kata khusus bahasa.</p></td>
     <td><p>Gunakan <a href="/docs/id/thai-analyzer.md"><code translate="no">thai</code></a> .</p></td>
   </tr>
   <tr>
     <td><p>Dokumentasi teknis</p></td>
     <td><p>❌ Tidak</p></td>
     <td><p>Tanda baca dihilangkan dari istilah seperti " <code translate="no">C++</code>".</p></td>
     <td><p>Buat penganalisis khusus dengan <a href="/docs/id/whitespace-tokenizer.md"><code translate="no">whitespace</code></a> tokenizer dan <a href="/docs/id/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a> filter.</p></td>
   </tr>
   <tr>
     <td><p>Bahasa yang dipisahkan dengan spasi seperti teks dalam bahasa Prancis/Spanyol</p></td>
     <td><p>⚠️ Mungkin</p></td>
     <td><p>Karakter beraksen (<code translate="no">café</code> vs. <code translate="no">cafe</code>) mungkin tidak cocok.</p></td>
     <td><p>Disarankan menggunakan penganalisis khusus dengan <a href="/docs/id/ascii-folding-filter.md"><code translate="no">asciifolding</code></a> disarankan untuk hasil yang lebih baik.</p></td>
   </tr>
   <tr>
     <td><p>Bahasa multibahasa atau bahasa yang tidak dikenal</p></td>
     <td><p>❌ Tidak</p></td>
     <td><p>Penganalisis <code translate="no">standard</code> tidak memiliki logika khusus bahasa yang diperlukan untuk menangani berbagai rangkaian karakter dan aturan tokenisasi.</p></td>
     <td><p>Gunakan penganalisis khusus dengan <a href="/docs/id/icu-tokenizer.md"><code translate="no">icu</code></a> tokenizer untuk tokenisasi yang mendukung Unicode. </p><p>Sebagai alternatif, pertimbangkan untuk mengonfigurasi <a href="/docs/id/multi-language-analyzers.md">penganalisis multibahasa</a> atau <a href="/docs/id/language-identifier.md">pengidentifikasi bahasa</a> untuk penanganan konten multibahasa yang lebih tepat.</p></td>
   </tr>
</table>
<p>Jika penganalisis " <code translate="no">standard</code> " bawaan tidak dapat memenuhi kebutuhan Anda, Anda perlu mengimplementasikan penganalisis yang berbeda. Anda memiliki dua pilihan:</p>
<ul>
<li><p><a href="/docs/id/choose-the-right-analyzer-for-your-use-case.md#Path-A-Use-built-in-analyzers">Menggunakan penganalisis bawaan</a> atau</p></li>
<li><p><a href="/docs/id/choose-the-right-analyzer-for-your-use-case.md#Path-B-Create-a-custom-analyzer">Membuat penganalisis khusus</a></p></li>
</ul>
<h2 id="Path-A-Use-built-in-analyzers" class="common-anchor-header">Pilihan A: Gunakan penganalisis bawaan<button data-href="#Path-A-Use-built-in-analyzers" class="anchor-icon" translate="no">
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
    </button></h2><p>Penganalisis bawaan adalah solusi yang telah dikonfigurasi sebelumnya untuk bahasa umum. Ini adalah cara termudah untuk memulai ketika penganalisis standar bawaan tidak cocok sepenuhnya.</p>
<h3 id="Available-built-in-analyzers" class="common-anchor-header">Penganalisis bawaan yang tersedia<button data-href="#Available-built-in-analyzers" class="anchor-icon" translate="no">
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
    </button></h3><table>
   <tr>
     <th><p>Penganalisis</p></th>
     <th><p>Bahasa yang Didukung</p></th>
     <th><p>Komponen</p></th>
     <th><p>Catatan</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/id/standard-analyzer.md"><code translate="no">standard</code></a></p></td>
     <td><p>Sebagian besar bahasa yang menggunakan spasi sebagai pemisah (Inggris, Prancis, Jerman, Spanyol, dll.)</p></td>
     <td><ul><li><p>Tokenizer: <code translate="no">standard</code></p></li><li><p>Filter: <code translate="no">lowercase</code></p></li></ul></td>
     <td><p>Penganalisis serbaguna untuk pemrosesan teks awal. Untuk skenario monolingual, penganalisis khusus bahasa (seperti <code translate="no">english</code>) memberikan kinerja yang lebih baik.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/id/english-analyzer.md"><code translate="no">english</code></a></p></td>
     <td><p>Didedikasikan untuk bahasa Inggris, yang menerapkan stemming dan penghapusan kata penghubung untuk pencocokan semantik bahasa Inggris yang lebih baik</p></td>
     <td><ul><li><p>Tokenizer: <code translate="no">standard</code></p></li><li><p>Filter: <code translate="no">lowercase</code>, <code translate="no">stemmer</code>, <code translate="no">stop</code></p></li></ul></td>
     <td><p>Direkomendasikan untuk konten berbahasa Inggris saja daripada <code translate="no">standard</code>.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/id/chinese-analyzer.md"><code translate="no">chinese</code></a></p></td>
     <td><p>Bahasa Mandarin</p></td>
     <td><ul><li><p>Tokenizer: <code translate="no">jieba</code></p></li><li><p>Filter: <code translate="no">cnalphanumonly</code></p></li></ul></td>
     <td><p>Saat ini menggunakan kamus Bahasa Mandarin Sederhana sebagai default.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/id/arabic-analyzer.md"><code translate="no">arabic</code></a></p></td>
     <td><p>Bahasa Arab</p></td>
     <td><ul><li><p>Tokenizer: <code translate="no">standard</code></p></li><li><p>Filter: <code translate="no">lowercase</code>, <code translate="no">decimaldigit</code>, <code translate="no">arabic_normalization</code>, <code translate="no">stemmer</code>, <code translate="no">stop</code></p></li></ul></td>
     <td><p>Direkomendasikan untuk teks bahasa Arab daripada <code translate="no">standard</code>.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/id/thai-analyzer.md"><code translate="no">thai</code></a></p></td>
     <td><p>Bahasa Thailand</p></td>
     <td><ul><li><p>Pembagi Kata: <code translate="no">thai</code></p></li><li><p>Filter: <code translate="no">lowercase</code>, <code translate="no">decimaldigit</code>, <code translate="no">stop</code></p></li></ul></td>
     <td><p>Direkomendasikan untuk teks bahasa Thailand daripada <code translate="no">standard</code> atau tokenisasi berbasis spasi.</p></td>
   </tr>
</table>
<h3 id="Implementation-example" class="common-anchor-header">Contoh implementasi<button data-href="#Implementation-example" class="anchor-icon" translate="no">
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
    </button></h3><p>Untuk menggunakan penganalisis bawaan, cukup tentukan jenisnya di <code translate="no">analyzer_params</code> saat mendefinisikan skema bidang Anda.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Using built-in English analyzer</span>
analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
}

<span class="hljs-comment"># Applying analyzer config to target VARCHAR field in your collection schema</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">200</span>,
    enable_analyzer=<span class="hljs-literal">True</span>,
<span class="highlighted-wrapper-line">    analyzer_params=analyzer_params,</span>
)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Untuk penggunaan terperinci, lihat <a href="/docs/id/full-text-search.md">Pencarian Teks Lengkap</a>, <a href="/docs/id/keyword-match.md">Pencocokan Teks</a>, atau <a href="/docs/id/phrase-match.md">Pencocokan Frasa</a>.</p>
</div>
<h2 id="Path-B-Create-a-custom-analyzer" class="common-anchor-header">Jalur B: Buat penganalisis khusus<button data-href="#Path-B-Create-a-custom-analyzer" class="anchor-icon" translate="no">
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
    </button></h2><p>Jika <a href="/docs/id/choose-the-right-analyzer-for-your-use-case.md#Available-built-in-analyzers">opsi bawaan</a> tidak memenuhi kebutuhan Anda, Anda dapat membuat penganalisis khusus dengan menggabungkan tokenizer dengan serangkaian filter. Hal ini memberi Anda kendali penuh atas alur pemrosesan teks.</p>
<h3 id="Step-1-Select-the-tokenizer-based-on-language" class="common-anchor-header">Langkah 1: Pilih tokenizer berdasarkan bahasa<button data-href="#Step-1-Select-the-tokenizer-based-on-language" class="anchor-icon" translate="no">
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
    </button></h3><p>Pilih tokenizer Anda berdasarkan bahasa utama konten Anda:</p>
<h4 id="Western-languages" class="common-anchor-header">Bahasa Barat</h4><p>Untuk bahasa yang dipisahkan oleh spasi, Anda memiliki opsi berikut:</p>
<table>
   <tr>
     <th><p>Tokenizer</p></th>
     <th><p>Cara Kerjanya</p></th>
     <th><p>Cocok untuk</p></th>
     <th><p>Contoh</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/id/standard-tokenizer.md"><code translate="no">standard</code></a></p></td>
     <td><p>Memisahkan teks berdasarkan spasi dan tanda baca</p></td>
     <td><p>Teks umum, tanda baca campuran</p></td>
     <td><ul><li><p>Masukan: <code translate="no">"Hello, world! Visit example.com"</code></p></li><li><p>Hasil: <code translate="no">['Hello', 'world', 'Visit', 'example', 'com']</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/id/whitespace-tokenizer.md"><code translate="no">whitespace</code></a></p></td>
     <td><p>Memisahkan hanya berdasarkan karakter spasi</p></td>
     <td><p>Konten yang telah diproses sebelumnya, teks yang diformat oleh pengguna</p></td>
     <td><ul><li><p>Masukan: <code translate="no">"user_id = get_user_data()"</code></p></li><li><p>Hasil: <code translate="no">['user_id', '=', 'get_user_data()']</code></p></li></ul></td>
   </tr>
</table>
<h4 id="East-Asian-languages" class="common-anchor-header">Bahasa-bahasa Asia Timur</h4><p>Bahasa yang tidak menggunakan spasi secara konsisten di antara kata-kata memerlukan tokenizer khusus untuk segmentasi kata yang tepat:</p>
<h5 id="Chinese" class="common-anchor-header">Bahasa Tionghoa</h5><table>
   <tr>
     <th><p>Tokenizer</p></th>
     <th><p>Cara Kerjanya</p></th>
     <th><p>Paling Cocok Untuk</p></th>
     <th><p>Contoh</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/id/jieba-tokenizer.md"><code translate="no">jieba</code></a></p></td>
     <td><p>Segmentasi berbasis kamus bahasa Mandarin dengan algoritma cerdas</p></td>
     <td><p><strong>Direkomendasikan untuk konten bahasa Mandarin</strong> - menggabungkan kamus dengan algoritma cerdas, dirancang khusus untuk bahasa Mandarin</p></td>
     <td><ul><li><p>Masukan: <code translate="no">"机器学习是人工智能的一个分支"</code></p></li><li><p>Hasil: <code translate="no">['机器', '学习', '是', '人工', '智能', '人工智能', '的', '一个', '分支']</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/id/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p>Analisis morfologis murni berbasis kamus dengan kamus bahasa Mandarin (<a href="https://cc-cedict.org/wiki/">cc-cedict</a>)</p></td>
     <td><p>Dibandingkan dengan <code translate="no">jieba</code>, memproses teks bahasa Tionghoa dengan cara yang lebih umum</p></td>
     <td><ul><li><p>Masukan: <code translate="no">"机器学习算法"</code></p></li><li><p>Hasil: <code translate="no">["机器", "学习", "算法"]</code></p></li></ul></td>
   </tr>
</table>
<h5 id="Thai" class="common-anchor-header">Bahasa Thailand</h5><p>Untuk sebagian besar teks bahasa Thailand, gunakan <a href="/docs/id/thai-analyzer.md"><code translate="no">thai</code></a> . Gunakan <a href="/docs/id/thai-tokenizer.md"><code translate="no">thai</code></a> hanya jika Anda perlu membangun jalur penganalisis khusus.</p>
<table>
   <tr>
     <th><p>Tokenizer</p></th>
     <th><p>Cara Kerjanya</p></th>
     <th><p>Cocok Untuk</p></th>
     <th><p>Contoh</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/id/thai-tokenizer.md"><code translate="no">thai</code></a></p></td>
     <td><p>Memecah teks bahasa Thailand menjadi token kata dan menyaring spasi kosong serta segmen yang hanya berisi tanda baca</p></td>
     <td><p>Pipa analisis khusus untuk teks bahasa Thailand atau campuran bahasa Thailand/Inggris</p></td>
     <td><ul><li><p>Masukan: <code translate="no">"สวัสดี! ทดสอบ, ระบบ Milvus"</code></p></li><li><p>Hasil: <code translate="no">['สวัสดี', 'ทดสอบ', 'ระบบ', 'Milvus']</code></p></li></ul></td>
   </tr>
</table>
<h5 id="Japanese-and-Korean" class="common-anchor-header">Bahasa Jepang dan Korea</h5><table>
   <tr>
     <th><p>Bahasa</p></th>
     <th><p>Pembagi Token</p></th>
     <th><p>Opsi Kamus</p></th>
     <th><p>Paling Cocok Untuk</p></th>
     <th><p>Contoh</p></th>
   </tr>
   <tr>
     <td><p>Bahasa Jepang</p></td>
     <td><p><a href="/docs/id/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p><a href="https://taku910.github.io/mecab/">ipadic</a> (serba guna), <a href="https://github.com/neologd/mecab-ipadic-neologd">ipadic-neologd</a> (istilah modern), <a href="https://clrd.ninjal.ac.jp/unidic/">unidic</a> (akademis)</p></td>
     <td><p>Analisis morfologis dengan penanganan nama diri</p></td>
     <td><ul><li><p>Masukan: <code translate="no">"東京都渋谷区"</code></p></li><li><p>Hasil: <code translate="no">["東京", "都", "渋谷", "区"]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p>Korea</p></td>
     <td><p><a href="/docs/id/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p><a href="https://bitbucket.org/eunjeon/mecab-ko-dic/src/master/">ko-dic</a></p></td>
     <td><p>Analisis morfologis bahasa Korea</p></td>
     <td><ul><li><p>Masukan: <code translate="no">"안녕하세요"</code></p></li><li><p>Hasil: <code translate="no">["안녕", "하", "세요"]</code></p></li></ul></td>
   </tr>
</table>
<h4 id="Multilingual-or-unknown-languages" class="common-anchor-header">Bahasa multibahasa atau bahasa yang tidak dikenal</h4><p>Untuk konten di mana bahasa tidak dapat diprediksi atau tercampur dalam dokumen:</p>
<table>
   <tr>
     <th><p>Tokenizer</p></th>
     <th><p>Cara Kerjanya</p></th>
     <th><p>Cocok untuk</p></th>
     <th><p>Contoh</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/id/icu-tokenizer.md"><code translate="no">icu</code></a></p></td>
     <td><p>Tokenisasi yang mendukung Unicode (International Components for Unicode)</p></td>
     <td><p>Skrip campuran, bahasa yang tidak dikenal, atau saat tokenisasi sederhana sudah cukup</p></td>
     <td><ul><li><p>Masukan: <code translate="no">"Hello 世界 مرحبا"</code></p></li><li><p>Hasil: <code translate="no">['Hello', ' ', '世界', ' ', 'مرحبا']</code></p></li></ul></td>
   </tr>
</table>
<p><strong>Kapan menggunakan ICU</strong>:</p>
<ul>
<li><p>Bahasa campuran di mana identifikasi bahasa tidak praktis.</p></li>
<li><p>Anda tidak ingin beban tambahan dari <a href="/docs/id/multi-language-analyzers.md">penganalisis multibahasa</a> atau <a href="/docs/id/language-identifier.md">pengidentifikasi bahasa</a>.</p></li>
<li><p>Konten memiliki bahasa utama dengan kata-kata asing sesekali yang tidak terlalu memengaruhi makna keseluruhan (misalnya, teks bahasa Inggris dengan nama merek atau istilah teknis dalam bahasa Jepang atau Prancis yang muncul sesekali).</p></li>
</ul>
<p><strong>Pendekatan alternatif</strong>: Untuk penanganan konten multibahasa yang lebih akurat, pertimbangkan penggunaan penganalisis multibahasa atau pengidentifikasi bahasa. Untuk detailnya, lihat <a href="/docs/id/multi-language-analyzers.md">Penganalisis Multibahasa</a> atau <a href="/docs/id/language-identifier.md">Pengidentifikasi Bahasa</a>.</p>
<h3 id="Step-2-Add-filters-for-precision" class="common-anchor-header">Langkah 2: Tambahkan filter untuk meningkatkan akurasi<button data-href="#Step-2-Add-filters-for-precision" class="anchor-icon" translate="no">
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
    </button></h3><p>Setelah <a href="/docs/id/choose-the-right-analyzer-for-your-use-case.md#Step-1-Select-the-tokenizer-based-on-language">memilih tokenizer</a>, terapkan filter berdasarkan persyaratan pencarian spesifik dan karakteristik konten <a href="/docs/id/choose-the-right-analyzer-for-your-use-case.md#Step-1-Select-the-tokenizer-based-on-language">Anda</a>.</p>
<h4 id="Commonly-used-filters" class="common-anchor-header">Filter yang umum digunakan</h4><p>Filter-filter ini sangat penting untuk sebagian besar konfigurasi bahasa yang dipisahkan oleh spasi (Inggris, Prancis, Jerman, Spanyol, dll.) dan secara signifikan meningkatkan kualitas pencarian:</p>
<table>
   <tr>
     <th><p>Filter</p></th>
     <th><p>Cara Kerjanya</p></th>
     <th><p>Kapan Digunakan</p></th>
     <th><p>Contoh</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/id/lowercase-filter.md"><code translate="no">lowercase</code></a></p></td>
     <td><p>Mengubah semua token menjadi huruf kecil</p></td>
     <td><p>Universal - berlaku untuk semua bahasa yang membedakan huruf besar dan kecil</p></td>
     <td><ul><li><p>Masukan: <code translate="no">["Apple", "iPhone"]</code></p></li><li><p>Hasil: <code translate="no">[['apple'], ['iphone']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/id/stemmer-filter.md"><code translate="no">stemmer</code></a></p></td>
     <td><p>Mengembalikan kata ke bentuk dasarnya</p></td>
     <td><p>Bahasa dengan infleksi kata (Inggris, Prancis, Jerman, dll.)</p></td>
     <td><p>Untuk Bahasa Inggris:</p><ul><li><p>Masukan: <code translate="no">["running", "runs", "ran"]</code></p></li><li><p>Hasil: <code translate="no">[['run'], ['run'], ['ran']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/id/stop-filter.md"><code translate="no">stop</code></a></p></td>
     <td><p>Hapus kata-kata umum yang tidak bermakna</p></td>
     <td><p>Sebagian besar bahasa — terutama efektif untuk bahasa yang menggunakan pemisah spasi</p></td>
     <td><ul><li><p>Masukan: <code translate="no">["the", "quick", "brown", "fox"]</code></p></li><li><p>Hasil: <code translate="no">[[], ['quick'], ['brown'], ['fox']]</code></p></li></ul></td>
   </tr>
</table>
<div class="alert note">
<p>Untuk bahasa Asia Timur (Mandarin, Jepang, Korea, dll.), fokuslah pada <a href="/docs/id/choose-the-right-analyzer-for-your-use-case.md#Language-specific-filters">filter khusus bahasa</a>. Bahasa-bahasa ini umumnya menggunakan pendekatan yang berbeda dalam pemrosesan teks dan mungkin tidak mendapatkan manfaat signifikan dari stemming.</p>
</div>
<h4 id="Text-normalization-filters" class="common-anchor-header">Filter normalisasi teks</h4><p>Filter ini menstandarkan variasi teks untuk meningkatkan konsistensi pencocokan:</p>
<table>
   <tr>
     <th><p>Filter</p></th>
     <th><p>Cara Kerjanya</p></th>
     <th><p>Kapan Digunakan</p></th>
     <th><p>Contoh</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/id/ascii-folding-filter.md"><code translate="no">asciifolding</code></a></p></td>
     <td><p>Mengonversi karakter beraksen menjadi setara ASCII</p></td>
     <td><p>Konten internasional, konten yang dibuat pengguna</p></td>
     <td><ul><li><p>Masukan: <code translate="no">["café", "naïve", "résumé"]</code></p></li><li><p>Hasil: <code translate="no">[['cafe'], ['naive'], ['resume']]</code></p></li></ul></td>
   </tr>
</table>
<h4 id="Token-filtering" class="common-anchor-header">Penyaringan token</h4><p>Tentukan token mana yang dipertahankan berdasarkan isi karakter atau panjangnya:</p>
<table>
   <tr>
     <th><p>Saring</p></th>
     <th><p>Cara Kerjanya</p></th>
     <th><p>Kapan Digunakan</p></th>
     <th><p>Contoh</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/id/removepunct-filter.md"><code translate="no">removepunct</code></a></p></td>
     <td><p>Hapus token tanda baca yang berdiri sendiri</p></td>
     <td><p>Membersihkan hasil keluaran dari tokenizer <code translate="no">jieba</code>, <code translate="no">lindera</code>, dan <code translate="no">icu</code>, yang akan mengembalikan tanda baca sebagai token tunggal</p></td>
     <td><ul><li><p>Masukan: <code translate="no">["Hello", "!", "world"]</code></p></li><li><p>Hasil: <code translate="no">[['Hello'], ['world']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/id/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a></p></td>
     <td><p>Simpan hanya huruf dan angka</p></td>
     <td><p>Konten teknis, pemrosesan teks yang bersih</p></td>
     <td><ul><li><p>Masukan: <code translate="no">["user123", "test@email.com"]</code></p></li><li><p>Hasil: <code translate="no">[['user123'], ['test', 'email', 'com']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/id/length-filter.md"><code translate="no">length</code></a></p></td>
     <td><p>Hapus token di luar rentang panjang yang ditentukan</p></td>
     <td><p>Saring noise (token yang terlalu panjang)</p></td>
     <td><ul><li><p>Masukan: <code translate="no">["a", "very", "extraordinarily"]</code></p></li><li><p>Hasil: <code translate="no">[['a'], ['very'], []]</code> (jika <strong>max=10</strong>)</p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/id/regex-filter.md"><code translate="no">regex</code></a></p></td>
     <td><p>Penyaringan berbasis pola khusus</p></td>
     <td><p>Persyaratan token khusus domain</p></td>
     <td><ul><li><p>Masukan: <code translate="no">["test123", "prod456"]</code></p></li><li><p>Hasil: <code translate="no">[[], ['prod456']]</code> (jika <strong>expr="^prod"</strong>)</p></li></ul></td>
   </tr>
</table>
<h4 id="Language-specific-filters" class="common-anchor-header">Penyaringan berdasarkan bahasa</h4><p>Filter ini menangani karakteristik bahasa tertentu:</p>
<table>
   <tr>
     <th><p>Filter</p></th>
     <th><p>Bahasa</p></th>
     <th><p>Cara Kerja</p></th>
     <th><p>Contoh</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/id/decompounder-filter.md"><code translate="no">decompounder</code></a></p></td>
     <td><p>Jerman</p></td>
     <td><p>Memisahkan kata majemuk menjadi bagian-bagian yang dapat dicari</p></td>
     <td><ul><li><p>Masukan: <code translate="no">["dampfschifffahrt"]</code></p></li><li><p>Hasil: <code translate="no">[['dampf', 'schiff', 'fahrt']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/id/cnalphanumonly-filter.md">cnalphanumonly</a></p></td>
     <td><p>Bahasa Mandarin</p></td>
     <td><p>Menyimpan karakter Tionghoa + alfanumerik</p></td>
     <td><ul><li><p>Masukan: <code translate="no">["Hello", "世界", "123", "!@#"]</code></p></li><li><p>Hasil: <code translate="no">[['Hello'], ['世界'], ['123'], []]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/id/cncharonly-filter.md"><code translate="no">cncharonly</code></a></p></td>
     <td><p>Bahasa Mandarin</p></td>
     <td><p>Hanya mempertahankan karakter Tionghoa</p></td>
     <td><ul><li><p>Masukan: <code translate="no">["Hello", "世界", "123"]</code></p></li><li><p>Hasil: <code translate="no">[[], ['世界'], []]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/id/pinyin-filter.md"><code translate="no">pinyin</code></a></p></td>
     <td><p>Bahasa Mandarin</p></td>
     <td><p>Menghasilkan bentuk token Pinyin untuk token bahasa Tionghoa</p></td>
     <td><ul><li><p>Masukan: <code translate="no">["中文"]</code></p></li><li><p>Hasil: <code translate="no">[['中文', 'zhong', 'wen']]</code></p></li></ul></td>
   </tr>
</table>
<h3 id="Step-3-Combine-and-implement" class="common-anchor-header">Langkah 3: Gabungkan dan terapkan<button data-href="#Step-3-Combine-and-implement" class="anchor-icon" translate="no">
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
    </button></h3><p>Untuk membuat penganalisis khusus Anda, tentukan tokenizer dan daftar filter dalam kamus ` <code translate="no">analyzer_params</code> `. Filter diterapkan sesuai urutan pencantumannya.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example: A custom analyzer for technical content</span>
analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;whitespace&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;alphanumonly&quot;</span>]
}

<span class="hljs-comment"># Applying analyzer config to target VARCHAR field in your collection schema</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">200</span>,
    enable_analyzer=<span class="hljs-literal">True</span>,
<span class="highlighted-wrapper-line">    analyzer_params=analyzer_params,</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Final-Test-with-runanalyzer" class="common-anchor-header">Terakhir: Uji dengan <code translate="no">run_analyzer</code><button data-href="#Final-Test-with-runanalyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>Selalu validasi konfigurasi Anda sebelum menerapkannya ke koleksi:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Sample text to analyze</span>
sample_text = <span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>

<span class="hljs-comment"># Run analyzer with the defined configuration</span>
result = client.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Analyzer output:&quot;</span>, result)
<button class="copy-code-btn"></button></code></pre>
<p>Masalah umum yang perlu diperiksa:</p>
<ul>
<li><p><strong>Tokenisasi berlebihan</strong>: Istilah teknis dipisahkan secara tidak benar</p></li>
<li><p><strong>Tokenisasi yang kurang</strong>: Frasa tidak dipisahkan dengan benar</p></li>
<li><p><strong>Token yang hilang</strong>: Istilah penting disaring</p></li>
</ul>
<p>Untuk penggunaan terperinci, lihat <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/CollectionSchema/run_analyzer.md">run_analyzer</a>.</p>
<h2 id="Recommended-configurations-by-use-case" class="common-anchor-header">Konfigurasi yang direkomendasikan berdasarkan kasus penggunaan<button data-href="#Recommended-configurations-by-use-case" class="anchor-icon" translate="no">
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
    </button></h2><p>Bagian ini menyediakan konfigurasi tokenizer dan filter yang direkomendasikan untuk kasus penggunaan umum saat bekerja dengan analyzer di Milvus. Pilih kombinasi yang paling sesuai dengan jenis konten dan persyaratan pencarian Anda.</p>
<div class="alert note">
<p>Sebelum menerapkan penganalisis ke koleksi Anda, kami menyarankan Anda menggunakan <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/CollectionSchema/run_analyzer.md"><code translate="no">run_analyzer</code></a> untuk menguji dan memvalidasi kinerja analisis teks.</p>
</div>
<h3 id="Languages-with-accent-marks-French-Spanish-German-etc" class="common-anchor-header">Bahasa dengan tanda aksen (Prancis, Spanyol, Jerman, dll.)<button data-href="#Languages-with-accent-marks-French-Spanish-German-etc" class="anchor-icon" translate="no">
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
    </button></h3><p>Gunakan tokenizer " <code translate="no">standard</code> " dengan konversi huruf kecil, stemming khusus bahasa, dan penghapusan kata stop. Konfigurasi ini juga berlaku untuk bahasa Eropa lainnya dengan memodifikasi parameter " <code translate="no">language</code> " dan " <code translate="no">stop_words</code> ".</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># French example</span>
analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>, 
        <span class="hljs-string">&quot;asciifolding&quot;</span>,  <span class="hljs-comment"># Handle accent marks</span>
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stemmer&quot;</span>,
            <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;french&quot;</span>
        },
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;_french_&quot;</span>]
        }
    ]
}

<span class="hljs-comment"># For other languages, modify the language parameter:</span>
<span class="hljs-comment"># &quot;language&quot;: &quot;spanish&quot; for Spanish</span>
<span class="hljs-comment"># &quot;language&quot;: &quot;german&quot; for German</span>
<span class="hljs-comment"># &quot;stop_words&quot;: [&quot;_spanish_&quot;] or [&quot;_german_&quot;] accordingly</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="English-content" class="common-anchor-header">Konten bahasa Inggris<button data-href="#English-content" class="anchor-icon" translate="no">
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
    </button></h3><p>Untuk pemrosesan teks bahasa Inggris dengan penyaringan komprehensif. Anda juga dapat menggunakan <a href="/docs/id/english-analyzer.md"><code translate="no">english</code></a> :</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>,
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stemmer&quot;</span>,
            <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
        },
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;_english_&quot;</span>]
        }
    ]
}

<span class="hljs-comment"># Equivalent built-in shortcut:</span>
analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Chinese-content" class="common-anchor-header">Konten bahasa Mandarin<button data-href="#Chinese-content" class="anchor-icon" translate="no">
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
    </button></h3><p>Gunakan tokenizer <code translate="no">jieba</code> dan terapkan filter karakter untuk hanya mempertahankan karakter Mandarin, huruf Latin, dan angka.</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;cnalphanumonly&quot;</span>]
}

<span class="hljs-comment"># Equivalent built-in shortcut:</span>
analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;chinese&quot;</span>
}
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Untuk bahasa Mandarin Sederhana, <code translate="no">cnalphanumonly</code> menghapus semua token kecuali karakter Mandarin, teks alfanumerik, dan angka. Hal ini mencegah tanda baca memengaruhi kualitas pencarian.</p>
</div>
<p>Jika pengguna mungkin mencari teks bahasa Tionghoa dengan mengetikkan Pinyin, gunakan penganalisis khusus dengan tokenizer <code translate="no">jieba</code> dan <a href="/docs/id/pinyin-filter.md"><code translate="no">pinyin</code></a> filter, bukan penganalisis <code translate="no">chinese</code> bawaan.</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;pinyin&quot;</span>]
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Japanese-content" class="common-anchor-header">Konten bahasa Jepang<button data-href="#Japanese-content" class="anchor-icon" translate="no">
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
    </button></h3><p>Gunakan tokenizer <code translate="no">lindera</code> dengan kamus dan filter bahasa Jepang untuk membersihkan tanda baca dan mengontrol panjang token:</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;lindera&quot;</span>,
        <span class="hljs-string">&quot;dict&quot;</span>: <span class="hljs-string">&quot;ipadic&quot;</span>  <span class="hljs-comment"># Options: ipadic, ipadic-neologd, unidic</span>
    },
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;removepunct&quot;</span>,  <span class="hljs-comment"># Remove standalone punctuation</span>
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;length&quot;</span>,
            <span class="hljs-string">&quot;min&quot;</span>: <span class="hljs-number">1</span>,
            <span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-number">20</span>
        }
    ]
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Korean-content" class="common-anchor-header">Konten bahasa Korea<button data-href="#Korean-content" class="anchor-icon" translate="no">
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
    </button></h3><p>Sama seperti bahasa Jepang, gunakan tokenizer <code translate="no">lindera</code> dengan kamus bahasa Korea:</p>
<pre><code translate="no" class="language-json">analyzer_params = <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;tokenizer&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;lindera&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;dict&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ko-dic&quot;</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;filter&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-string">&quot;removepunct&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;length&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;min&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;max&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span>
        <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Mixed-or-multilingual-content" class="common-anchor-header">Konten campuran atau multibahasa<button data-href="#Mixed-or-multilingual-content" class="anchor-icon" translate="no">
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
    </button></h3><p>Saat menangani konten yang mencakup beberapa bahasa atau menggunakan skrip secara tidak terduga, mulailah dengan penganalisis <code translate="no">icu</code>. Penganalisis yang mendukung Unicode ini menangani skrip dan simbol campuran secara efektif.</p>
<p><strong>Konfigurasi multibahasa dasar (tanpa stemming)</strong>:</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;icu&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;asciifolding&quot;</span>]
}
<button class="copy-code-btn"></button></code></pre>
<p><strong>Pemrosesan multibahasa tingkat lanjut</strong>:</p>
<p>Untuk kontrol yang lebih baik atas perilaku token di berbagai bahasa:</p>
<ul>
<li><p>Gunakan konfigurasi <strong>penganalisis multibahasa</strong>. Untuk detailnya, lihat <a href="/docs/id/multi-language-analyzers.md">Penganalisis Multibahasa</a>.</p></li>
<li><p>Terapkan <strong>pengenal bahasa</strong> pada konten Anda. Untuk detailnya, lihat <a href="/docs/id/language-identifier.md">Pengenal Bahasa</a>.</p></li>
</ul>
<h2 id="Integrate-with-text-retrieval-features" class="common-anchor-header">Integrasikan dengan fitur pencarian teks<button data-href="#Integrate-with-text-retrieval-features" class="anchor-icon" translate="no">
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
    </button></h2><p>Setelah memilih penganalisis Anda, Anda dapat mengintegrasikannya dengan fitur-fitur pencarian teks yang disediakan oleh Milvus.</p>
<ul>
<li><p><strong>Pencarian teks lengkap</strong></p>
<p>Alat analisis berdampak langsung pada pencarian teks lengkap berbasis BM25 melalui pembuatan vektor jarang. Gunakan alat analisis yang sama untuk pengindeksan dan pencarian guna memastikan tokenisasi yang konsisten. Alat analisis khusus bahasa umumnya memberikan skor BM25 yang lebih baik daripada alat analisis umum. Untuk detail implementasi, lihat <a href="/docs/id/full-text-search.md">Pencarian Teks Lengkap</a>.</p></li>
<li><p><strong>Pencocokan teks</strong></p>
<p>Operasi pencocokan teks melakukan pencocokan token yang tepat antara kueri dan konten yang diindeks berdasarkan hasil keluaran penganalisis Anda. Untuk detail implementasi, lihat <a href="/docs/id/keyword-match.md">Pencocokan Teks</a>.</p></li>
<li><p><strong>Pencocokan frasa</strong></p>
<p>Pencocokan frasa memerlukan tokenisasi yang konsisten pada ekspresi multi-kata untuk mempertahankan batas frasa dan maknanya. Untuk detail implementasi, lihat <a href="/docs/id/phrase-match.md">Pencocokan Frasa</a>.</p></li>
</ul>
