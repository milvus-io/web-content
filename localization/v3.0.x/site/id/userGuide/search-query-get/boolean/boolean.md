---
id: boolean.md
title: Penjelasan Pemfilteran
summary: >-
  Milvus menyediakan kemampuan penyaringan yang kuat yang memungkinkan kueri
  yang tepat untuk data Anda. Ekspresi filter memungkinkan Anda untuk
  menargetkan bidang skalar tertentu dan menyaring hasil pencarian dengan
  kondisi yang berbeda. Panduan ini menjelaskan bagaimana menggunakan ekspresi
  filter di Milvus, dengan contoh-contoh yang difokuskan pada operasi kueri.
  Anda juga dapat menerapkan filter-filter ini dalam permintaan pencarian dan
  penghapusan.
---
<h1 id="Filtering-Explained" class="common-anchor-header">Penjelasan Pemfilteran<button data-href="#Filtering-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus menyediakan kemampuan pemfilteran yang kuat yang memungkinkan kueri yang tepat untuk data Anda. Ekspresi penyaringan memungkinkan Anda untuk menargetkan bidang skalar tertentu dan mempersempit hasil pencarian dengan kondisi yang berbeda. Panduan ini menjelaskan bagaimana menggunakan ekspresi filter di Milvus, dengan contoh-contoh yang difokuskan pada operasi kueri. Anda juga dapat menerapkan filter ini dalam permintaan pencarian dan penghapusan.</p>
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
<li><p><strong>Operator Perbandingan</strong>: <code translate="no">==</code> <code translate="no">!=</code> , <code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code>, dan <code translate="no">&lt;=</code> memungkinkan pemfilteran berdasarkan bidang numerik atau teks.</p></li>
<li><p><strong>Filter Rentang</strong>: <code translate="no">IN</code> dan <code translate="no">LIKE</code> membantu mencocokkan rentang atau set nilai tertentu.</p></li>
<li><p><strong>Operator Aritmatika</strong>: <code translate="no">+</code> <code translate="no">-</code> , <code translate="no">*</code>, <code translate="no">/</code>, <code translate="no">%</code>, dan <code translate="no">**</code> digunakan untuk perhitungan yang melibatkan bidang numerik.</p></li>
<li><p><strong>Operator Logika</strong>: <code translate="no">AND</code>, <code translate="no">OR</code>, dan <code translate="no">NOT</code> menggabungkan beberapa kondisi ke dalam ekspresi yang kompleks.</p></li>
<li><p><strong>Operator IS NULL dan IS NOT NULL</strong>: Operator <code translate="no">IS NULL</code> dan <code translate="no">IS NOT NULL</code> digunakan untuk memfilter bidang berdasarkan apakah bidang tersebut mengandung nilai null (tidak ada data). Untuk detailnya, lihat <a href="/docs/id/basic-operators.md#IS-NULL-and-IS-NOT-NULL-Operators">Operator Dasar</a>.</p></li>
</ul>
<h3 id="Example-Filtering-by-Color" class="common-anchor-header">Contoh: Memfilter berdasarkan Warna</h3><p>Untuk menemukan entitas dengan warna primer (merah, hijau, atau biru) dalam bidang skalar <code translate="no">color</code>, gunakan ekspresi filter berikut:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;color in [&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-Filtering-JSON-Fields" class="common-anchor-header">Contoh: Memfilter Bidang JSON</h3><p>Milvus mengizinkan referensi kunci dalam bidang JSON. Misalnya, jika Anda memiliki bidang JSON <code translate="no">product</code> dengan kunci <code translate="no">price</code> dan <code translate="no">model</code>, dan ingin menemukan produk dengan model dan harga tertentu yang lebih rendah dari 1.850, gunakan ekspresi filter ini:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;product[&quot;model&quot;] == &quot;JSN-087&quot; AND product[&quot;price&quot;] &lt; 1850&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-Filtering-Array-Fields" class="common-anchor-header">Contoh: Memfilter Bidang Array</h3><p>Jika Anda memiliki bidang larik <code translate="no">history_temperatures</code> yang berisi catatan suhu rata-rata yang dilaporkan oleh observatorium sejak tahun 2000, dan ingin menemukan observatorium yang memiliki suhu pada tahun 2009 (catatan ke-10) melebihi 23°C, gunakan ekspresi ini:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;history_temperatures[10] &gt; 23&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Untuk informasi lebih lanjut tentang operator dasar ini, lihat <a href="/docs/id/basic-operators.md">Operator Dasar</a>.</p>
<h2 id="Filter-expression-templates" class="common-anchor-header">Templat ekspresi penyaringan<button data-href="#Filter-expression-templates" class="anchor-icon" translate="no">
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
    </button></h2><p>Ketika memfilter menggunakan karakter CJK, pemrosesan dapat menjadi lebih kompleks karena set karakter yang lebih besar dan perbedaan pengodean. Hal ini dapat mengakibatkan kinerja yang lebih lambat, terutama dengan operator <code translate="no">IN</code>.</p>
<p>Milvus memperkenalkan templat ekspresi filter untuk mengoptimalkan kinerja saat bekerja dengan karakter CJK. Dengan memisahkan nilai dinamis dari ekspresi filter, mesin kueri menangani penyisipan parameter dengan lebih efisien.</p>
<h3 id="Example" class="common-anchor-header">Contoh</h3><p>Untuk menemukan individu yang berusia di atas 25 tahun yang tinggal di "北京" (Beijing) atau "上海" (Shanghai), gunakan ekspresi templat berikut:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;age &gt; 25 AND city IN [&#x27;北京&#x27;, &#x27;上海&#x27;]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Untuk meningkatkan kinerja, gunakan variasi ini dengan parameter:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;age &gt; {age} AND city in {city}&quot;</span>,
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
<button class="copy-code-btn"></button></code></pre>
<p>Pendekatan ini mengurangi overhead penguraian dan meningkatkan kecepatan kueri. Untuk informasi lebih lanjut, lihat <a href="/docs/id/filtering-templating.md">Filter Templating</a>.</p>
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
    </button></h2><p>Milvus menyediakan operator pemfilteran tingkat lanjut untuk tipe data tertentu, seperti bidang JSON, ARRAY, dan VARCHAR.</p>
<h3 id="JSON-field-specific-operators" class="common-anchor-header">Operator khusus bidang JSON</h3><p>Milvus menawarkan operator tingkat lanjut untuk menanyakan bidang JSON, memungkinkan pemfilteran yang tepat dalam struktur JSON yang kompleks:</p>
<p><code translate="no">JSON_CONTAINS(identifier, jsonExpr)</code>: Memeriksa apakah sebuah ekspresi JSON ada di dalam field.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;json_contains(tags, &quot;sale&quot;)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">JSON_CONTAINS_ALL(identifier, jsonExpr)</code>: Memastikan semua elemen dari ekspresi JSON ada.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;json_contains_all(tags, [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">JSON_CONTAINS_ANY(identifier, jsonExpr)</code>: Memfilter entitas yang setidaknya memiliki satu elemen dalam ekspresi JSON.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;json_contains_any(tags, [&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Untuk detail lebih lanjut tentang operator JSON, lihat <a href="/docs/id/json-operators.md">Operator JSON</a>.</p>
<h3 id="ARRAY-field-specific-operators" class="common-anchor-header">Operator khusus bidang ARRAY</h3><p>Milvus menyediakan operator pemfilteran tingkat lanjut untuk bidang larik, seperti <code translate="no">ARRAY_CONTAINS</code>, <code translate="no">ARRAY_CONTAINS_ALL</code>, <code translate="no">ARRAY_CONTAINS_ANY</code>, dan <code translate="no">ARRAY_LENGTH</code>, yang memungkinkan kontrol yang lebih baik atas data larik:</p>
<p><code translate="no">ARRAY_CONTAINS</code>: Memfilter entitas yang mengandung elemen tertentu.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS(history_temperatures, 23)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_CONTAINS_ALL</code>: Memfilter entitas di mana semua elemen dalam daftar ada.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_CONTAINS_ANY</code>: Menyaring entitas yang berisi elemen apa pun dari daftar.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_LENGTH</code>: Memfilter berdasarkan panjang larik.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_LENGTH(history_temperatures) &lt; 10&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Untuk detail lebih lanjut tentang operator larik, lihat <a href="/docs/id/array-operators.md">Operator</a> Larik.</p>
<h3 id="VARCHAR-field-specific-operators" class="common-anchor-header">Operator khusus bidang VARCHAR</h3><p>Milvus menyediakan operator khusus untuk pencarian berbasis teks yang tepat pada field VARCHAR:</p>
<h4 id="TEXTMATCH-operator" class="common-anchor-header"><code translate="no">TEXT_MATCH</code> operator</h4><p>Operator <code translate="no">TEXT_MATCH</code> memungkinkan pengambilan dokumen yang tepat berdasarkan istilah kueri tertentu. Operator ini sangat berguna untuk pencarian terfilter yang menggabungkan filter skalar dengan pencarian kemiripan vektor. Tidak seperti pencarian semantik, Pencocokan Teks berfokus pada kemunculan istilah yang tepat.</p>
<p>Milvus menggunakan Tantivy untuk mendukung pengindeksan terbalik dan pencarian teks berbasis istilah. Prosesnya melibatkan:</p>
<ol>
<li><p><strong>Penganalisis</strong>: Memberi tanda dan memproses teks masukan.</p></li>
<li><p><strong>Pengindeksan</strong>: Membuat indeks terbalik yang memetakan token unik ke dokumen.</p></li>
</ol>
<p>Untuk lebih jelasnya, lihat <a href="/docs/id/keyword-match.md">Pencocokan Teks</a>.</p>
<h4 id="PHRASEMATCH-operator--Milvus-26x" class="common-anchor-header"><code translate="no">PHRASE_MATCH</code> Operator<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span></h4><p>Operator <strong>PHRASE_MATCH</strong> memungkinkan pengambilan dokumen secara tepat berdasarkan pencocokan frasa yang tepat, dengan mempertimbangkan urutan dan kedekatan istilah kueri.</p>
<p>Untuk lebih jelasnya, lihat <a href="/docs/id/phrase-match.md">Pencocokan Frasa</a>.</p>
