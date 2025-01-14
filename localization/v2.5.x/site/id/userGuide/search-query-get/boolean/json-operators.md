---
id: json-operators.md
summary: >-
  Milvus mendukung operator tingkat lanjut untuk melakukan kueri dan memfilter
  bidang JSON, menjadikannya sempurna untuk mengelola data yang kompleks dan
  terstruktur. Operator-operator ini memungkinkan kueri yang sangat efektif pada
  dokumen JSON, memungkinkan Anda untuk mengambil entitas berdasarkan elemen,
  nilai, atau kondisi tertentu di dalam bidang JSON. Bagian ini akan memandu
  Anda dalam menggunakan operator khusus JSON di Milvus, dengan memberikan
  contoh-contoh praktis untuk mengilustrasikan fungsionalitasnya.
title: Operator JSON
---
<h1 id="JSON-Operators​" class="common-anchor-header">Operator JSON<button data-href="#JSON-Operators​" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus mendukung operator tingkat lanjut untuk melakukan kueri dan memfilter bidang JSON, menjadikannya sempurna untuk mengelola data yang kompleks dan terstruktur. Operator-operator ini memungkinkan kueri yang sangat efektif untuk dokumen JSON, memungkinkan Anda untuk mengambil entitas berdasarkan elemen, nilai, atau kondisi tertentu di dalam bidang JSON. Bagian ini akan memandu Anda dalam menggunakan operator khusus JSON di Milvus, dengan memberikan contoh-contoh praktis untuk mengilustrasikan fungsionalitasnya.</p>
<div class="alert note">
<p>Field JSON tidak dapat menangani struktur bersarang yang kompleks dan memperlakukan semua struktur bersarang sebagai string biasa. Oleh karena itu, ketika bekerja dengan bidang JSON, disarankan untuk menghindari penumpukan yang terlalu dalam dan memastikan bahwa struktur data Anda serata mungkin untuk kinerja yang optimal.</p>
</div>
<h2 id="Available-JSON-Operators​" class="common-anchor-header">Operator JSON yang Tersedia<button data-href="#Available-JSON-Operators​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus menyediakan beberapa operator JSON yang kuat untuk membantu memfilter dan meminta data JSON, dan operator-operator tersebut adalah.</p>
<ul>
<li><p><a href="#JSON_CONTAINS"><code translate="no">JSON_CONTAINS(identifier, expr)</code></a>: Memfilter entitas di mana ekspresi JSON yang ditentukan ditemukan di dalam field.</p></li>
<li><p><a href="#JSON_CONTAINS_ALL"><code translate="no">JSON_CONTAINS_ALL(identifier, expr)</code></a>: Memastikan bahwa semua elemen dari ekspresi JSON yang ditentukan ada di dalam field.</p></li>
<li><p><a href="#JSON_CONTAINS_ANY"><code translate="no">JSON_CONTAINS_ANY(identifier, expr)</code></a>: Memfilter entitas di mana setidaknya satu anggota ekspresi JSON ada di dalam field.</p></li>
</ul>
<p>Mari kita jelajahi operator ini dengan contoh untuk melihat bagaimana operator ini dapat diterapkan dalam skenario dunia nyata.</p>
<h2 id="JSONCONTAINS​" class="common-anchor-header">JSON_CONTAINS<button data-href="#JSONCONTAINS​" class="anchor-icon" translate="no">
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
    </button></h2><p>Operator <code translate="no">json_contains</code> memeriksa apakah elemen atau sub-larik tertentu ada di dalam bidang JSON. Operator ini berguna ketika Anda ingin memastikan bahwa larik atau objek JSON berisi nilai tertentu.</p>
<p><strong>Contoh</strong></p>
<p>Bayangkan Anda memiliki koleksi produk, masing-masing dengan bidang <code translate="no">tags</code> yang berisi larik JSON berisi string, seperti <code translate="no">[&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]</code>. Anda ingin memfilter produk yang memiliki tag <code translate="no">&quot;sale&quot;</code>.</p>
<pre><code translate="no" class="language-python"># JSON data: {<span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;electronics&quot;</span>, <span class="hljs-string">&quot;sale&quot;</span>, <span class="hljs-string">&quot;new&quot;</span>]}​
filter = <span class="hljs-string">&#x27;json_contains(tags, &quot;sale&quot;)&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Dalam contoh ini, Milvus akan mengembalikan semua produk yang bidang <code translate="no">tags</code> berisi elemen <code translate="no">&quot;sale&quot;</code>.</p>
<h2 id="JSONCONTAINSALL​" class="common-anchor-header">JSON_CONTAINS_ALL<button data-href="#JSONCONTAINSALL​" class="anchor-icon" translate="no">
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
    </button></h2><p>Operator <code translate="no">json_contains_all</code> memastikan bahwa semua elemen dari ekspresi JSON yang ditentukan ada di bidang target. Operator ini sangat berguna ketika Anda perlu mencocokkan beberapa nilai dalam larik JSON.</p>
<p><strong>Contoh</strong></p>
<p>Melanjutkan skenario tag produk, jika Anda ingin menemukan semua produk yang memiliki tag <code translate="no">&quot;electronics&quot;</code>, <code translate="no">&quot;sale&quot;</code>, dan <code translate="no">&quot;new&quot;</code>, Anda dapat menggunakan operator <code translate="no">json_contains_all</code>.</p>
<pre><code translate="no" class="language-python"># JSON data: {<span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;electronics&quot;</span>, <span class="hljs-string">&quot;sale&quot;</span>, <span class="hljs-string">&quot;new&quot;</span>, <span class="hljs-string">&quot;discount&quot;</span>]}​
filter = <span class="hljs-string">&#x27;json_contains_all(tags, [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;])&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Kueri ini akan mengembalikan semua produk yang larik <code translate="no">tags</code> berisi ketiga elemen yang ditentukan: <code translate="no">&quot;electronics&quot;</code>, <code translate="no">&quot;sale&quot;</code>, dan <code translate="no">&quot;new&quot;</code>.</p>
<h2 id="JSONCOTAINSANY​" class="common-anchor-header">JSON_COTAINS_ANY<button data-href="#JSONCOTAINSANY​" class="anchor-icon" translate="no">
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
    </button></h2><p>Operator <code translate="no">json_contains_any</code> menyaring entitas di mana setidaknya satu anggota ekspresi JSON ada di dalam bidang. Ini berguna ketika Anda ingin mencocokkan entitas berdasarkan salah satu dari beberapa nilai yang mungkin.</p>
<p><strong>Contoh</strong></p>
<p>Katakanlah Anda ingin memfilter produk yang memiliki setidaknya salah satu tag <code translate="no">&quot;electronics&quot;</code>, <code translate="no">&quot;sale&quot;</code>, atau <code translate="no">&quot;new&quot;</code>. Anda dapat menggunakan operator <code translate="no">json_contains_any</code> untuk mencapai hal ini.</p>
<pre><code translate="no" class="language-python"># JSON data: {<span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;electronics&quot;</span>, <span class="hljs-string">&quot;sale&quot;</span>, <span class="hljs-string">&quot;new&quot;</span>]}​
filter = <span class="hljs-string">&#x27;json_contains_any(tags, [&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;])&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Dalam hal ini, Milvus akan mengembalikan semua produk yang memiliki setidaknya salah satu tag dalam daftar <code translate="no">[&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;]</code>. Meskipun sebuah produk hanya memiliki salah satu dari tag tersebut, produk tersebut akan disertakan dalam hasil pencarian.</p>
