---
id: standard-tokenizer.md
title: Tokenizer Standar
summary: >-
  Tokenizer `standar` di Milvus membagi teks berdasarkan spasi dan tanda baca,
  sehingga cocok untuk sebagian besar bahasa.
---
<h1 id="Standard​" class="common-anchor-header">Standar<button data-href="#Standard​" class="anchor-icon" translate="no">
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
    </button></h1><p>Tokenizer <code translate="no">standard</code> di Milvus membagi teks berdasarkan spasi dan tanda baca, sehingga cocok untuk sebagian besar bahasa.</p>
<h2 id="Configuration​" class="common-anchor-header">Konfigurasi<button data-href="#Configuration​" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk mengonfigurasi penganalisis menggunakan tokenizer <code translate="no">standard</code>, setel <code translate="no">tokenizer</code> ke <code translate="no">standard</code> di <code translate="no">analyzer_params</code>.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,​
}​

<button class="copy-code-btn"></button></code></pre>
<p>Tokenizer <code translate="no">standard</code> dapat bekerja bersama dengan satu atau beberapa filter. Sebagai contoh, kode berikut ini mendefinisikan penganalisis yang menggunakan tokenizer <code translate="no">standard</code> dan filter <code translate="no">lowercase</code>.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,​
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>]​
}​

<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Untuk pengaturan yang lebih sederhana, Anda dapat memilih untuk menggunakan filter <a href="/docs/id/standard-analyzer.md"><code translate="no">standard analyzer</code></a>yang menggabungkan tokenizer <code translate="no">standard</code> dengan filter <a href="/docs/id/lowercase-filter.md"><code translate="no">lowercase filter</code></a>.</p>
</div>
<p>Setelah mendefinisikan <code translate="no">analyzer_params</code>, Anda dapat menerapkannya ke bidang <code translate="no">VARCHAR</code> ketika mendefinisikan skema koleksi. Hal ini memungkinkan Milvus untuk memproses teks dalam bidang tersebut menggunakan penganalisis yang ditentukan untuk tokenisasi dan pemfilteran yang efisien. Untuk detailnya, lihat <a href="/docs/id/analyzer-overview.md#Example-use">Contoh penggunaan</a>.</p>
<h2 id="Example-output​" class="common-anchor-header">Contoh keluaran<button data-href="#Example-output​" class="anchor-icon" translate="no">
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
    </button></h2><p>Berikut adalah contoh bagaimana tokenizer <code translate="no">standard</code> memproses teks.</p>
<p><strong>Teks asli</strong>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>​
<button class="copy-code-btn"></button></code></pre>
<p><strong>Keluaran yang diharapkan</strong>.</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;The&quot;</span>, <span class="hljs-string">&quot;Milvus&quot;</span>, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;database&quot;</span>, <span class="hljs-string">&quot;is&quot;</span>, <span class="hljs-string">&quot;built&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>, <span class="hljs-string">&quot;scale&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
