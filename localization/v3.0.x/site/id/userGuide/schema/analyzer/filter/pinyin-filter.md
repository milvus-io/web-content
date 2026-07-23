---
id: pinyin-filter.md
title: PinyinCompatible with Milvus 3.0.x
summary: >-
  Filter Pinyin mengubah token karakter Tionghoa menjadi token Pinyin selama
  analisis teks, sehingga memungkinkan pencocokan berbasis Pinyin untuk teks
  berbahasa Tionghoa.
beta: Milvus 3.0.x
---
<h1 id="Pinyin" class="common-anchor-header">Pinyin<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Pinyin" class="anchor-icon" translate="no">
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
    </button></h1><p>Pencarian teks bahasa Mandarin sering kali mengharuskan pengguna memasukkan karakter Mandarin persis seperti yang muncul dalam teks yang diindeks. Dalam alur kerja pencarian nama, pelengkapan otomatis, dan pencarian saat mengetik, pengguna sering kali mengetik Pinyin alih-alih karakter Mandarin. Misalnya, pengguna mungkin mengetik <code translate="no">zuqiu</code> untuk mencari <code translate="no">足球</code>. Filter " <code translate="no">pinyin</code> " menambahkan token Pinyin ke output penganalisis sehingga teks Mandarin dapat dicocokkan dengan masukan Pinyin tanpa perlu mengelola bidang Pinyin terpisah.</p>
<p>Filter ` <code translate="no">pinyin</code> ` biasanya digunakan bersama tokenizer <a href="/docs/id/jieba-tokenizer.md">Jieba</a> untuk teks bahasa Tionghoa. Filter ini berfungsi dalam pipa filter penganalisis khusus dan dapat menghasilkan beberapa bentuk token Pinyin untuk token bahasa Tionghoa yang sama.</p>
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
    </button></h2><p>Untuk menggunakan opsi default, tentukan ` <code translate="no">&quot;pinyin&quot;</code> ` di bagian ` <code translate="no">filter</code> ` pada ` <code translate="no">analyzer_params</code>`.</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;pinyin&quot;</span>],</span>
}
<button class="copy-code-btn"></button></code></pre>
<p>Singkatnya, ini mempertahankan token bahasa Mandarin asli dan menghasilkan token Pinyin tingkat karakter. Fitur ini tidak menghasilkan Pinyin gabungan atau inisial Pinyin kecuali Anda mengaktifkan opsi tersebut secara eksplisit.</p>
<p>Untuk kontrol penuh, tentukan filter sebagai objek dan konfigurasikan bentuk token Pinyin yang dihasilkan oleh Milvus.</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;filter&quot;</span>: [</span>
<span class="highlighted-comment-line">        {</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;pinyin&quot;</span>,</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;keep_original&quot;</span>: <span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;keep_full_pinyin&quot;</span>: <span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;keep_joined_full_pinyin&quot;</span>: <span class="hljs-literal">False</span>,</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;keep_separate_first_letter&quot;</span>: <span class="hljs-literal">False</span>,</span>
<span class="highlighted-comment-line">        }</span>
<span class="highlighted-comment-line">    ],</span>
}
<button class="copy-code-btn"></button></code></pre>
<p>Filter ini menerima parameter-parameter berikut.</p>
<table>
<thead>
<tr><th>Parameter</th><th>Tipe</th><th>Default</th><th>Deskripsi</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">keep_original</code></td><td>Boolean</td><td><code translate="no">true</code></td><td>Menjaga token bahasa Mandarin asli dalam keluaran penganalisis.</td></tr>
<tr><td><code translate="no">keep_full_pinyin</code></td><td>Boolean</td><td><code translate="no">true</code></td><td>Menghasilkan token Pinyin tingkat karakter. Misalnya, " <code translate="no">中文</code> " menghasilkan " <code translate="no">zhong</code> " dan " <code translate="no">wen</code>".</td></tr>
<tr><td><code translate="no">keep_joined_full_pinyin</code></td><td>Boolean</td><td><code translate="no">false</code></td><td>Menghasilkan token Pinyin yang digabungkan untuk setiap token sumber. Misalnya, <code translate="no">中文</code> menghasilkan <code translate="no">zhongwen</code>.</td></tr>
<tr><td><code translate="no">keep_separate_first_letter</code></td><td>Boolean</td><td><code translate="no">false</code></td><td>Menghasilkan token inisial Pinyin untuk setiap token sumber. Misalnya, <code translate="no">中文</code> menghasilkan <code translate="no">zw</code>.</td></tr>
</tbody>
</table>
<p>Filter ini beroperasi pada token yang dihasilkan oleh tokenizer. Untuk teks bahasa Mandarin, gunakan filter ini bersama tokenizer seperti <code translate="no">jieba</code>.</p>
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
    </button></h2><p>Sebelum menerapkan konfigurasi penganalisis ke skema koleksi Anda, verifikasi perilakunya dengan <code translate="no">run_analyzer</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

sample_text = <span class="hljs-string">&quot;中文测试&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Match-Chinese-text-with-character-level-Pinyin" class="common-anchor-header">Mencocokkan teks bahasa Mandarin dengan Pinyin tingkat karakter<button data-href="#Match-Chinese-text-with-character-level-Pinyin" class="anchor-icon" translate="no">
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
    </button></h3><p>Filter <code translate="no">pinyin</code> default mempertahankan token bahasa Mandarin asli dan menghasilkan token Pinyin tingkat karakter.</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;pinyin&quot;</span>],
}

result = client.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(result)
<button class="copy-code-btn"></button></code></pre>
<p>Hasil yang diharapkan:</p>
<pre><code translate="no" class="language-plaintext">[&#x27;中文&#x27;, &#x27;zhong&#x27;, &#x27;wen&#x27;, &#x27;测试&#x27;, &#x27;ce&#x27;, &#x27;shi&#x27;]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Match-Chinese-terms-with-joined-Pinyin" class="common-anchor-header">Mencocokkan istilah bahasa Mandarin dengan Pinyin yang digabungkan<button data-href="#Match-Chinese-terms-with-joined-Pinyin" class="anchor-icon" translate="no">
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
    </button></h3><p>Aktifkan <code translate="no">keep_joined_full_pinyin</code> jika Anda ingin istilah bahasa Mandarin dicocokkan dengan bentuk Pinyin gabungannya yang lengkap.</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;pinyin&quot;</span>,
            <span class="hljs-string">&quot;keep_original&quot;</span>: <span class="hljs-literal">True</span>,
            <span class="hljs-string">&quot;keep_full_pinyin&quot;</span>: <span class="hljs-literal">False</span>,
            <span class="hljs-string">&quot;keep_joined_full_pinyin&quot;</span>: <span class="hljs-literal">True</span>,
            <span class="hljs-string">&quot;keep_separate_first_letter&quot;</span>: <span class="hljs-literal">False</span>,
        }
    ],
}

result = client.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(result)
<button class="copy-code-btn"></button></code></pre>
<p>Hasil yang diharapkan:</p>
<pre><code translate="no" class="language-plaintext">[&#x27;中文&#x27;, &#x27;zhongwen&#x27;, &#x27;测试&#x27;, &#x27;ceshi&#x27;]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Match-Chinese-terms-with-Pinyin-initials" class="common-anchor-header">Mencocokkan istilah bahasa Mandarin dengan inisial Pinyin<button data-href="#Match-Chinese-terms-with-Pinyin-initials" class="anchor-icon" translate="no">
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
    </button></h3><p>Aktifkan " <code translate="no">keep_separate_first_letter</code> " saat Anda ingin istilah bahasa Mandarin dicocokkan dengan inisial bentuk Pinyin-nya.</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;pinyin&quot;</span>,
            <span class="hljs-string">&quot;keep_original&quot;</span>: <span class="hljs-literal">True</span>,
            <span class="hljs-string">&quot;keep_full_pinyin&quot;</span>: <span class="hljs-literal">False</span>,
            <span class="hljs-string">&quot;keep_joined_full_pinyin&quot;</span>: <span class="hljs-literal">False</span>,
            <span class="hljs-string">&quot;keep_separate_first_letter&quot;</span>: <span class="hljs-literal">True</span>,
        }
    ],
}

result = client.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(result)
<button class="copy-code-btn"></button></code></pre>
<p>Hasil yang diharapkan:</p>
<pre><code translate="no" class="language-plaintext">[&#x27;中文&#x27;, &#x27;zw&#x27;, &#x27;测试&#x27;, &#x27;cs&#x27;]
<button class="copy-code-btn"></button></code></pre>
