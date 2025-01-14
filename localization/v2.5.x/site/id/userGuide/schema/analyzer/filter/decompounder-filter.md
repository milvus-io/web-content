---
id: decompounder-filter.md
title: Filter Pengurai
summary: >-
  Filter `decompounder` membagi kata majemuk menjadi komponen-komponen
  individual berdasarkan kamus yang ditentukan, sehingga lebih mudah untuk
  mencari bagian-bagian dari istilah majemuk. Filter ini sangat berguna untuk
  bahasa yang sering menggunakan kata majemuk, seperti bahasa Jerman.
---
<h1 id="Decompounder​" class="common-anchor-header">Pengurai<button data-href="#Decompounder​" class="anchor-icon" translate="no">
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
    </button></h1><p>Filter <code translate="no">decompounder</code> membagi kata majemuk menjadi beberapa komponen berdasarkan kamus yang ditentukan, sehingga lebih mudah untuk mencari bagian dari istilah majemuk. Filter ini sangat berguna untuk bahasa yang sering menggunakan kata majemuk, seperti bahasa Jerman.</p>
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
    </button></h2><p>Filter <code translate="no">decompounder</code> adalah filter khusus di Milvus. Untuk menggunakannya, tentukan <code translate="no">&quot;type&quot;: &quot;decompounder&quot;</code> dalam konfigurasi filter, bersama dengan parameter <code translate="no">word_list</code> yang menyediakan kamus komponen kata yang akan dikenali.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,​
    <span class="hljs-string">&quot;filter&quot;</span>:[{​
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;decompounder&quot;</span>, <span class="hljs-comment"># Specifies the filter type as decompounder​</span>
        <span class="hljs-string">&quot;word_list&quot;</span>: [<span class="hljs-string">&quot;dampf&quot;</span>, <span class="hljs-string">&quot;schiff&quot;</span>, <span class="hljs-string">&quot;fahrt&quot;</span>, <span class="hljs-string">&quot;brot&quot;</span>, <span class="hljs-string">&quot;backen&quot;</span>, <span class="hljs-string">&quot;automat&quot;</span>],​
    }],​
}​
<button class="copy-code-btn"></button></code></pre>
<p>Filter <code translate="no">decompounder</code> menerima parameter yang dapat dikonfigurasi berikut ini.</p>
<table data-block-token="O4ZcdyoEToqP22xm5ELcYyIhnEh"><thead><tr><th data-block-token="MW4TdhfD2oe0KTx9qwGcP5XEnIh" colspan="1" rowspan="1"><p data-block-token="Y5tddmngjoAyd1xtaDzc7It5nRf">Parameter</p>
</th><th data-block-token="Vk8Id7BMRoJMIkxN0YPc4lJgn2f" colspan="1" rowspan="1"><p data-block-token="D4v9dtQ53oCx6ExVKhxcPj1EnWg">Deskripsi</p>
</th></tr></thead><tbody><tr><td data-block-token="CDQldJSkAonYPIxTkiWcWpqPnOd" colspan="1" rowspan="1"><p data-block-token="TX4ndGkwkogWybxIfZocILJOnbd"><code translate="no">word_list</code></p>
</td><td data-block-token="VrxtdsWnZon6oPxMmbQcCgclnUg" colspan="1" rowspan="1"><p data-block-token="BXP4dHimoocoozxbHAecJOA6nTe">Daftar komponen kata yang digunakan untuk memisahkan istilah majemuk. Kamus ini menentukan bagaimana kata majemuk diuraikan menjadi istilah individual.</p>
</td></tr></tbody></table>
<p>Filter <code translate="no">decompounder</code> beroperasi pada istilah yang dihasilkan oleh tokenizer, sehingga harus digunakan bersama dengan tokenizer.</p>
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
    </button></h2><p>Berikut adalah contoh bagaimana penyaring <code translate="no">decompounder</code> memproses teks.</p>
<p><strong>Teks asli</strong>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;dampfschifffahrt brotbackautomat&quot;</span>​
<button class="copy-code-btn"></button></code></pre>
<p><strong>Keluaran yang diharapkan</strong> (dengan <code translate="no">word_list: [&quot;dampf&quot;, &quot;schiff&quot;, &quot;fahrt&quot;, &quot;brot&quot;, &quot;backen&quot;, &quot;automat&quot;]</code>).</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;dampf&quot;</span>, <span class="hljs-string">&quot;schiff&quot;</span>, <span class="hljs-string">&quot;fahrt&quot;</span>, <span class="hljs-string">&quot;brotbackautomat&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
