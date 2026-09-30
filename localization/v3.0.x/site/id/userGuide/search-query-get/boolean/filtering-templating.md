---
id: filtering-templating.md
title: Pola Ekspresi Filter
summary: >-
  Di Milvus, ekspresi filter yang kompleks dengan banyak elemen, terutama yang
  melibatkan karakter non-ASCII seperti karakter CJK, dapat sangat memengaruhi
  kinerja kueri. Untuk mengatasi hal ini, Milvus memperkenalkan mekanisme
  templat ekspresi filter yang dirancang untuk meningkatkan efisiensi dengan
  mengurangi waktu yang dibutuhkan untuk mengurai ekspresi yang kompleks.
  Halaman ini menjelaskan penggunaan templat ekspresi filter dalam operasi
  pencarian, kueri, dan penghapusan.
---
<h1 id="Filter-Templating" class="common-anchor-header">Pola Ekspresi Filter<button data-href="#Filter-Templating" class="anchor-icon" translate="no">
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
    </button></h1><p>Di Milvus, ekspresi filter yang kompleks dengan banyak elemen, terutama yang melibatkan karakter non-ASCII seperti karakter CJK, dapat sangat memengaruhi kinerja kueri. Untuk mengatasi hal ini, Milvus memperkenalkan mekanisme templat ekspresi filter yang dirancang untuk meningkatkan efisiensi dengan mengurangi waktu yang dihabiskan untuk mengurai ekspresi yang kompleks. Halaman ini menjelaskan penggunaan templat ekspresi filter dalam operasi pencarian, kueri, dan penghapusan.</p>
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
    </button></h2><p>Pola ekspresi filter memungkinkan Anda membuat ekspresi filter dengan placeholder, yang dapat diganti secara dinamis dengan nilai selama eksekusi kueri. Dengan menggunakan pola, Anda tidak perlu menyisipkan array besar atau ekspresi kompleks secara langsung ke dalam filter, sehingga mengurangi waktu penguraian dan meningkatkan kinerja kueri.</p>
<p>Misalkan Anda memiliki ekspresi filter yang melibatkan dua bidang, <code translate="no">age</code> dan <code translate="no">city</code>, dan Anda ingin menemukan semua orang yang usianya lebih dari 25 tahun dan tinggal di “北京” (Beijing) atau “上海” (Shanghai). Alih-alih menyisipkan nilai-nilai tersebut secara langsung ke dalam ekspresi filter, Anda dapat menggunakan templat:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
<button class="copy-code-btn"></button></code></pre>
<p>Di sini, ` <code translate="no">{age}</code> ` dan ` <code translate="no">{city}</code> ` adalah penanda tempat yang akan diganti dengan nilai sebenarnya di ` <code translate="no">filter_params</code> ` saat kueri dijalankan.</p>
<p>Penggunaan templat ekspresi filter di Milvus memiliki beberapa keunggulan utama:</p>
<ul>
<li><p><strong>Waktu Parsing yang Lebih Singkat</strong>: Dengan mengganti ekspresi filter yang besar atau kompleks dengan penanda tempat, sistem menghabiskan waktu lebih sedikit untuk mem-parsing dan memproses filter.</p></li>
<li><p><strong>Peningkatan Kinerja Kueri</strong>: Dengan berkurangnya beban pemrosesan, kinerja kueri meningkat, sehingga menghasilkan QPS yang lebih tinggi dan waktu respons yang lebih cepat.</p></li>
<li><p><strong>Skalabilitas</strong>: Seiring bertambahnya dataset Anda dan ekspresi filter menjadi lebih kompleks, templating memastikan bahwa kinerja tetap efisien dan dapat diskalakan.</p></li>
</ul>
<h2 id="Search-Operations" class="common-anchor-header">Operasi Pencarian<button data-href="#Search-Operations" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk operasi pencarian di Milvus, ekspresi ` <code translate="no">filter</code> ` digunakan untuk mendefinisikan kondisi penyaringan, dan parameter ` <code translate="no">filter_params</code> ` digunakan untuk menentukan nilai-nilai pengganti. Kamus ` <code translate="no">filter_params</code> ` berisi nilai-nilai dinamis yang akan digunakan Milvus untuk menggantikan nilai dalam ekspresi filter.</p>
<pre><code translate="no" class="language-python">expr = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
res = client.search(
    <span class="hljs-string">&quot;hello_milvus&quot;</span>,
    vectors[:nq],
    <span class="hljs-built_in">filter</span>=expr,
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;city&quot;</span>],
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;COSINE&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;search_list&quot;</span>: <span class="hljs-number">100</span>}},
    filter_params=filter_params,
)
<button class="copy-code-btn"></button></code></pre>
<p>Dalam contoh ini, Milvus akan secara dinamis mengganti ` <code translate="no">{age}</code> ` dengan ` <code translate="no">25</code> ` dan ` <code translate="no">{city}</code> ` dengan ` <code translate="no">[&quot;北京&quot;, &quot;上海&quot;]</code> ` saat menjalankan pencarian.</p>
<h2 id="Query-Operations" class="common-anchor-header">Operasi Kueri<button data-href="#Query-Operations" class="anchor-icon" translate="no">
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
    </button></h2><p>Mekanisme templating yang sama dapat diterapkan pada operasi kueri di Milvus. Dalam fungsi ` <code translate="no">query</code> `, Anda mendefinisikan ekspresi filter dan menggunakan ` <code translate="no">filter_params</code> ` untuk menentukan nilai-nilai yang akan disubstitusi.</p>
<pre><code translate="no" class="language-python">expr = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
res = client.query(
    <span class="hljs-string">&quot;hello_milvus&quot;</span>,
    <span class="hljs-built_in">filter</span>=expr,
    output_fields=[<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;city&quot;</span>],
    filter_params=filter_params
)
<button class="copy-code-btn"></button></code></pre>
<p>Dengan menggunakan <code translate="no">filter_params</code>, Milvus secara efisien menangani penyisipan nilai secara dinamis, sehingga meningkatkan kecepatan eksekusi kueri.</p>
<h2 id="Delete-Operations" class="common-anchor-header">Operasi Penghapusan<button data-href="#Delete-Operations" class="anchor-icon" translate="no">
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
    </button></h2><p>Anda juga dapat menggunakan templat ekspresi filter dalam operasi penghapusan. Serupa dengan pencarian dan kueri, ekspresi ` <code translate="no">filter</code> ` mendefinisikan kondisi, sedangkan ` <code translate="no">filter_params</code> ` menyediakan nilai dinamis untuk penanda tempat.</p>
<pre><code translate="no" class="language-python">expr = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
res = client.delete(
    <span class="hljs-string">&quot;hello_milvus&quot;</span>,
    <span class="hljs-built_in">filter</span>=expr,
    filter_params=filter_params
)
<button class="copy-code-btn"></button></code></pre>
<p>Pendekatan ini meningkatkan kinerja operasi penghapusan, terutama saat menangani kondisi filter yang kompleks.</p>
<h2 id="Conclusion" class="common-anchor-header">Kesimpulan<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>Pola ekspresi filter merupakan alat penting untuk mengoptimalkan kinerja kueri di Milvus. Dengan menggunakan penanda tempat dan kamus <code translate="no">filter_params</code>, Anda dapat secara signifikan mengurangi waktu yang dihabiskan untuk mengurai ekspresi filter yang kompleks. Hal ini menghasilkan eksekusi kueri yang lebih cepat dan kinerja keseluruhan yang lebih baik.</p>
