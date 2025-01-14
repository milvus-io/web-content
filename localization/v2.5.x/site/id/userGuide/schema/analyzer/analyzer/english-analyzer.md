---
id: english-analyzer.md
title: Penganalisis Bahasa Inggris
related_key: 'english, analyzer'
summary: >-
  Penganalisis `bahasa Inggris` di Milvus dirancang untuk memproses teks bahasa
  Inggris, menerapkan aturan khusus bahasa untuk tokenisasi dan penyaringan.
---
<h1 id="English​" class="common-anchor-header">Bahasa Inggris<button data-href="#English​" class="anchor-icon" translate="no">
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
    </button></h1><p>Penganalisis <code translate="no">english</code> di Milvus dirancang untuk memproses teks bahasa Inggris, menerapkan aturan khusus bahasa untuk tokenisasi dan penyaringan.</p>
<h3 id="Definition​" class="common-anchor-header">Definisi</h3><p>Penganalisis <code translate="no">english</code> menggunakan komponen-komponen berikut.</p>
<ul>
<li><p><strong>Tokenizer</strong>: Menggunakan <a href="/docs/id/standard-tokenizer.md"><code translate="no">standard tokenizer</code></a> untuk membagi teks menjadi unit-unit kata yang terpisah.</p></li>
<li><p>Filter: Termasuk beberapa filter untuk pemrosesan teks yang komprehensif.</p>
<ul>
<li><p><a href="/docs/id/lowercase-filter.md"><code translate="no">lowercase</code></a>: Mengubah semua token menjadi huruf kecil, sehingga memungkinkan pencarian yang tidak peka huruf.</p></li>
<li><p><a href="/docs/id/stemmer-filter.md"><code translate="no">stemmer</code></a>: Mengurangi kata menjadi bentuk dasar untuk mendukung pencocokan yang lebih luas (misalnya, "berlari" menjadi "menjalankan").</p></li>
<li><p><a href="/docs/id/stop-filter.md"><code translate="no">stop_words</code></a>: Menghilangkan kata henti bahasa Inggris yang umum untuk fokus pada istilah-istilah kunci dalam teks.</p></li>
</ul></li>
</ul>
<p>Fungsionalitas dari <code translate="no">english</code> analyzer setara dengan konfigurasi penganalisis khusus berikut ini.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,​
    <span class="hljs-string">&quot;filter&quot;</span>: [​
        <span class="hljs-string">&quot;lowercase&quot;</span>,​
        {​
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stemmer&quot;</span>,​
            <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>​
        }，{​
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,​
            <span class="hljs-string">&quot;stop_words&quot;</span>: <span class="hljs-string">&quot;_english_&quot;</span>,​
        }​
    ]​
}​
<button class="copy-code-btn"></button></code></pre>
<h3 id="Configuration​" class="common-anchor-header">Konfigurasi</h3><p>Untuk menerapkan penganalisis <code translate="no">english</code> ke suatu bidang, cukup setel <code translate="no">type</code> ke <code translate="no">english</code> di <code translate="no">analyzer_params</code>, dan sertakan parameter opsional sesuai kebutuhan.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>,​
}​
<button class="copy-code-btn"></button></code></pre>
<p>Penganalisis <code translate="no">english</code> menerima parameter opsional berikut ini: </p>
<table data-block-token="YMmUdQtabozHZnxC09QcajU0nvd"><thead><tr><th data-block-token="N1Qfdbd9Vok7mkx0OGpcx49cnUM" colspan="1" rowspan="1"><p data-block-token="PxYUdGyrMoa4x5x3sCpcF7JLn1e">Parameter</p>
</th><th data-block-token="WIQKdcE3coxEirxwmpucXGuin7f" colspan="1" rowspan="1"><p data-block-token="VAHCdZFTkoeSJNxgPmicGnOZnWh">Deskripsi</p>
</th></tr></thead><tbody><tr><td data-block-token="NzThd1pxQoektPxhqrQc7Oxcnhl" colspan="1" rowspan="1"><p data-block-token="SW6SdE2iyohhGaxQIfpcjZfCnBx"><code translate="no">stop_words</code></p>
</td><td data-block-token="KSAbdmKPCowsR7x7UO8c8ngFnnh" colspan="1" rowspan="1"><p data-block-token="F3E1dFjL3oUrl5xWq3ucpVPon7c">Larik yang berisi daftar kata henti, yang akan dihapus dari tokenisasi. Setelan default ke <code translate="no">_english_</code>, kumpulan kata henti bahasa Inggris yang umum.</p>
</td></tr></tbody></table>
<p>Contoh konfigurasi dengan kata henti khusus.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>,​
    <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;the&quot;</span>]​
}​
<button class="copy-code-btn"></button></code></pre>
<p>Setelah mendefinisikan <code translate="no">analyzer_params</code>, Anda dapat menerapkannya ke bidang <code translate="no">VARCHAR</code> ketika mendefinisikan skema koleksi. Hal ini memungkinkan Milvus untuk memproses teks dalam bidang tersebut menggunakan penganalisis yang ditentukan untuk tokenisasi dan pemfilteran yang efisien. Untuk detailnya, lihat <a href="/docs/id/analyzer-overview.md#Example-use">Contoh penggunaan</a>.</p>
<h3 id="Example-output​" class="common-anchor-header">Contoh keluaran</h3><p>Berikut adalah bagaimana penganalisis <code translate="no">english</code> memproses teks.</p>
<p><strong>Teks asli</strong>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>​
<button class="copy-code-btn"></button></code></pre>
<p><strong>Keluaran yang diharapkan</strong>.</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;milvus&quot;</span>, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;databas&quot;</span>, <span class="hljs-string">&quot;built&quot;</span>, <span class="hljs-string">&quot;scale&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
