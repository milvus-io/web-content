---
id: boolean.md
title: Penjelasan tentang Penyaringan
summary: >-
  Milvus menyediakan kemampuan penyaringan yang canggih yang memungkinkan Anda
  melakukan kueri data secara tepat. Ekspresi penyaringan memungkinkan Anda
  menargetkan bidang skalar tertentu dan menyempurnakan hasil pencarian dengan
  berbagai kondisi. Panduan ini menjelaskan cara menggunakan ekspresi
  penyaringan di Milvus, dengan contoh-contoh yang berfokus pada operasi kueri.
  Anda juga dapat menerapkan filter-filter ini dalam permintaan pencarian dan
  penghapusan.
---
<h1 id="Filtering-Explained" class="common-anchor-header">Penjelasan tentang Penyaringan<button data-href="#Filtering-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus menyediakan kemampuan penyaringan yang kuat yang memungkinkan Anda melakukan kueri data secara tepat. Ekspresi filter memungkinkan Anda menargetkan bidang skalar tertentu dan menyempurnakan hasil pencarian dengan berbagai kondisi. Panduan ini menjelaskan cara menggunakan ekspresi filter di Milvus, dengan contoh-contoh yang berfokus pada operasi kueri. Anda juga dapat menerapkan filter ini dalam permintaan pencarian dan penghapusan.</p>
<h2 id="Basic-operators" class="common-anchor-header">Operator dasar<button data-href="#Basic-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus mendukung beberapa operator dasar untuk memfilter data:</p>
<ul>
<li><p><strong>Operator Perbandingan</strong>: <code translate="no">==</code>, <code translate="no">!=</code>, <code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code>, dan <code translate="no">&lt;=</code> memungkinkan penyaringan berdasarkan bidang numerik atau teks.</p></li>
<li><p><strong>Filter rentang dan pola</strong>: <code translate="no">IN</code>, <code translate="no">LIKE</code>, <code translate="no">=~</code>, dan <code translate="no">!~</code> mencocokkan nilai, pola wildcard, atau pola regex. Untuk detail mengenai pola string, lihat <a href="/docs/id/pattern-matching.md">Pencocokan Pola</a>.</p></li>
<li><p><strong>Operator Aritmatika</strong>: <code translate="no">+</code>, <code translate="no">-</code>, <code translate="no">*</code>, <code translate="no">/</code>, <code translate="no">%</code>, dan <code translate="no">**</code> digunakan untuk perhitungan yang melibatkan bidang numerik.</p></li>
<li><p><strong>Operator Bitwise</strong>: Pada Milvus 3.0.0 dan versi selanjutnya, <code translate="no">&amp;</code>, <code translate="no">|</code>, dan <code translate="no">^</code> menyaring bidang bilangan bulat yang mengkodekan beberapa bendera (flag), seperti izin atau bit status. Untuk detailnya, lihat <a href="/docs/id/basic-operators.md#Bitwise-operators">Operator Dasar</a>.</p></li>
<li><p><strong>Operator Logika</strong>: <code translate="no">AND</code>, <code translate="no">OR</code>, dan <code translate="no">NOT</code> menggabungkan beberapa kondisi menjadi ekspresi kompleks.</p></li>
<li><p><strong>Operator IS NULL dan IS NOT NULL</strong>: Operator <code translate="no">IS NULL</code> dan <code translate="no">IS NOT NULL</code> digunakan untuk menyaring bidang berdasarkan apakah bidang tersebut berisi nilai null (tidak ada data). Untuk detailnya, lihat <a href="/docs/id/basic-operators.md#IS-NULL-and-IS-NOT-NULL-operators">Operator Dasar</a>.</p></li>
</ul>
<h3 id="Example-Filtering-by-Color" class="common-anchor-header">Contoh: Penyaringan berdasarkan Warna<button data-href="#Example-Filtering-by-Color" class="anchor-icon" translate="no">
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
    </button></h3><p>Untuk menemukan entitas dengan warna primer (merah, hijau, atau biru) dalam bidang skalar <code translate="no">color</code>, gunakan ekspresi penyaringan berikut:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;color in [&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-Filtering-by-Permission-Bits" class="common-anchor-header">Contoh: Penyaringan berdasarkan Bit Izin<button data-href="#Example-Filtering-by-Permission-Bits" class="anchor-icon" translate="no">
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
    </button></h3><p>Untuk menemukan entitas yang bidang integer- <code translate="no">permissions</code> -nya memiliki bit " <code translate="no">SHARE</code> " yang disetel, gunakan operator bitwise AND (<code translate="no">&amp;</code>):</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;(permissions &amp; 4) == 4&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-Filtering-by-Regex-Pattern" class="common-anchor-header">Contoh: Penyaringan berdasarkan Pola Regex<button data-href="#Example-Filtering-by-Regex-Pattern" class="anchor-icon" translate="no">
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
    </button></h3><p>Untuk menemukan entitas yang bidang ` <code translate="no">message</code> `-nya berisi kode kesalahan seperti ` <code translate="no">E1001</code>`, gunakan operator pencocokan regex ` <code translate="no">=~</code>`:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Filter Regex menggunakan pencocokan substring. Untuk memastikan seluruh nilai bidang cocok dengan pola, tambahkan jangkar <code translate="no">^</code> dan <code translate="no">$</code>. Untuk detailnya, lihat <a href="/docs/id/pattern-matching.md">Pencocokan Pola</a>.</p>
<h3 id="Example-Filtering-JSON-Fields" class="common-anchor-header">Contoh: Memfilter Bidang JSON<button data-href="#Example-Filtering-JSON-Fields" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus memungkinkan referensi kunci dalam bidang JSON. Misalnya, jika Anda memiliki bidang JSON <code translate="no">product</code> dengan kunci <code translate="no">price</code> dan <code translate="no">model</code>, dan ingin mencari produk dengan model tertentu dan harga di bawah 1.850, gunakan ekspresi filter ini:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;product[&quot;model&quot;] == &quot;JSN-087&quot; AND product[&quot;price&quot;] &lt; 1850&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-Filtering-Array-Fields" class="common-anchor-header">Contoh: Memfilter Bidang Array<button data-href="#Example-Filtering-Array-Fields" class="anchor-icon" translate="no">
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
    </button></h3><p>Jika Anda memiliki bidang array <code translate="no">history_temperatures</code> yang berisi catatan suhu rata-rata yang dilaporkan oleh stasiun pengamatan sejak tahun 2000, dan ingin mencari stasiun pengamatan di mana suhu pada tahun 2009 (tahun ke-10 yang tercatat) melebihi 23°C, gunakan ekspresi berikut:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;history_temperatures[10] &gt; 23&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Untuk informasi lebih lanjut mengenai operator dasar ini, lihat <a href="/docs/id/basic-operators.md">Operator Dasar</a>.</p>
<h2 id="Filter-expression-templates" class="common-anchor-header">Template ekspresi filter<button data-href="#Filter-expression-templates" class="anchor-icon" translate="no">
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
    </button></h2><p>Saat menyaring menggunakan karakter CJK, pemrosesan bisa jadi lebih rumit karena kumpulan karakternya yang lebih besar dan perbedaan pengkodean. Hal ini dapat mengakibatkan kinerja yang lebih lambat, terutama dengan operator ` <code translate="no">IN</code> `.</p>
<p>Milvus memperkenalkan templat ekspresi filter untuk mengoptimalkan kinerja saat bekerja dengan karakter CJK. Dengan memisahkan nilai dinamis dari ekspresi filter, mesin kueri menangani penyisipan parameter secara lebih efisien.</p>
<h3 id="Example" class="common-anchor-header">Contoh<button data-href="#Example" class="anchor-icon" translate="no">
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
    </button></h3><p>Untuk menemukan individu berusia di atas 25 tahun yang tinggal di “北京” (Beijing) atau “上海” (Shanghai), gunakan ekspresi templat berikut:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;age &gt; 25 AND city IN [&#x27;北京&#x27;, &#x27;上海&#x27;]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Untuk meningkatkan kinerja, gunakan variasi berikut dengan parameter:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;age &gt; {age} AND city in {city}&quot;</span>,
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
<button class="copy-code-btn"></button></code></pre>
<p>Pendekatan ini mengurangi beban pemrosesan dan meningkatkan kecepatan kueri. Untuk informasi lebih lanjut, lihat <a href="/docs/id/filtering-templating.md">Templat Filter</a>.</p>
<h2 id="Data-type-specific-operators" class="common-anchor-header">Operator khusus tipe data<button data-href="#Data-type-specific-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus menyediakan operator penyaringan lanjutan untuk tipe data tertentu, seperti bidang JSON, ARRAY, dan VARCHAR.</p>
<h3 id="JSON-field-specific-operators" class="common-anchor-header">Operator khusus bidang JSON<button data-href="#JSON-field-specific-operators" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus menawarkan operator lanjutan untuk melakukan kueri pada kolom JSON, yang memungkinkan penyaringan yang tepat di dalam struktur JSON yang kompleks:</p>
<p><code translate="no">JSON_CONTAINS(identifier, jsonExpr)</code>: Memeriksa apakah ekspresi JSON ada di dalam kolom.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;json_contains(tags, &quot;sale&quot;)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">JSON_CONTAINS_ALL(identifier, jsonExpr)</code>: Memastikan semua elemen dari ekspresi JSON tersebut ada.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;json_contains_all(tags, [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">JSON_CONTAINS_ANY(identifier, jsonExpr)</code>: Memfilter entitas yang setidaknya memiliki satu elemen dalam ekspresi JSON tersebut.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;json_contains_any(tags, [&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Untuk detail lebih lanjut mengenai operator JSON, lihat <a href="/docs/id/json-operators.md">Operator JSON</a>.</p>
<h3 id="ARRAY-field-specific-operators" class="common-anchor-header">Operator khusus bidang ARRAY<button data-href="#ARRAY-field-specific-operators" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus menyediakan operator penyaringan lanjutan untuk bidang array, seperti <code translate="no">ARRAY_CONTAINS</code>, <code translate="no">ARRAY_CONTAINS_ALL</code>, <code translate="no">ARRAY_CONTAINS_ANY</code>, dan <code translate="no">ARRAY_LENGTH</code>, yang memungkinkan kontrol terperinci atas data array:</p>
<p><code translate="no">ARRAY_CONTAINS</code>: Menyaring entitas yang mengandung elemen tertentu.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS(history_temperatures, 23)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_CONTAINS_ALL</code>: Menyaring entitas yang memiliki semua elemen dalam daftar tersebut.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_CONTAINS_ANY</code>: Menyaring entitas yang mengandung salah satu elemen dari daftar tersebut.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_LENGTH</code>: Menyaring berdasarkan panjang array.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_LENGTH(history_temperatures) &lt; 10&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Untuk detail lebih lanjut mengenai operator array, lihat <a href="/docs/id/array-operators.md">Operator ARRAY</a>.</p>
<h3 id="VARCHAR-field-specific-operators" class="common-anchor-header">Operator khusus bidang VARCHAR<button data-href="#VARCHAR-field-specific-operators" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus menyediakan operator khusus untuk pencarian berbasis teks yang presisi pada kolom VARCHAR:</p>
<h4 id="Pattern-matching-operators" class="common-anchor-header">Operator pencocokan pola</h4><p>Operator ` <code translate="no">LIKE</code>`, ` <code translate="no">=~</code>`, dan ` <code translate="no">!~</code> ` mencocokkan pola string pada bidang ` <code translate="no">VARCHAR</code> `, jalur string JSON, dan elemen ` <code translate="no">ARRAY&lt;VARCHAR&gt;</code> ` tertentu. Gunakan ` <code translate="no">LIKE</code> ` untuk pola wildcard sederhana. Gunakan ` <code translate="no">=~</code> ` dan ` <code translate="no">!~</code> ` untuk ekspresi reguler RE2.</p>
<p>Untuk detailnya, lihat <a href="/docs/id/pattern-matching.md">Pencocokan Pola</a>.</p>
<h4 id="TEXTMATCH-operator" class="common-anchor-header"><code translate="no">TEXT_MATCH</code> operator</h4><p>Operator " <code translate="no">TEXT_MATCH</code> " memungkinkan pengambilan dokumen yang tepat berdasarkan istilah kueri tertentu. Operator ini sangat berguna untuk pencarian yang difilter yang menggabungkan filter skalar dengan pencarian kesamaan vektor. Berbeda dengan pencarian semantik, "Text Match" berfokus pada kemunculan istilah yang persis sama.</p>
<p>Milvus menggunakan Tantivy untuk mendukung pengindeksan terbalik dan pencarian teks berbasis istilah. Prosesnya meliputi:</p>
<ol>
<li><p><strong>Analyzer</strong>: Melakukan tokenisasi dan memproses teks masukan.</p></li>
<li><p><strong>Pengindeksan</strong>: Membuat indeks terbalik yang memetakan token unik ke dokumen.</p></li>
</ol>
<p>Untuk detail lebih lanjut, lihat <a href="/docs/id/keyword-match.md">Text Match</a>.</p>
<h4 id="PHRASEMATCH-operator--Milvus-26x" class="common-anchor-header"><code translate="no">PHRASE_MATCH</code> operator<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span></h4><p>Operator <strong>PHRASE_MATCH</strong> memungkinkan pencarian dokumen yang tepat berdasarkan kecocokan frasa yang persis, dengan mempertimbangkan urutan dan kedekatan istilah kueri.</p>
<p>Untuk detail lebih lanjut, lihat <a href="/docs/id/phrase-match.md">Phrase Match</a>.</p>
