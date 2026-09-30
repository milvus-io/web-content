---
id: struct-array-operators.md
title: Operator StructArray
summary: >-
  Operator StructArray menyaring entitas dengan mengevaluasi predikat pada
  subbidang skalar di dalam bidang StructArray. Gunakan halaman ini sebagai
  referensi sintaks untuk `element_filter` dan keluarga operator `MATCH_*`.
---
<h1 id="StructArray-Operators" class="common-anchor-header">Operator StructArray<button data-href="#StructArray-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>Operator StructArray menyaring entitas dengan mengevaluasi predikat pada subbidang skalar di dalam bidang StructArray. Gunakan halaman ini sebagai referensi sintaks untuk <code translate="no">element_filter</code> dan keluarga operator <code translate="no">MATCH_*</code>.</p>
<p>Penyaringan StructArray memiliki dua keluarga operator:</p>
<table>
<thead>
<tr><th>Keluarga operator</th><th>Tujuan utama</th><th>Perilaku hasil</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">element_filter</code></td><td>Mencocokkan elemen Struct yang memenuhi predikat skalar.</td><td>Dalam pencarian tingkat elemen, hasil yang cocok dapat mencakup offset elemen. Dalam kueri tingkat baris atau pencarian yang difilter, bentuk hasil bergantung pada API dan bidang keluaran.</td></tr>
<tr><td><code translate="no">MATCH_*</code></td><td>Memilih entitas berdasarkan jumlah elemen Struct yang memenuhi predikat skalar.</td><td>Penyaringan tingkat baris. Operator-operator ini tidak mengembalikan offset elemen secara langsung.</td></tr>
</tbody>
</table>
<p>Gunakan subbidang skalar dalam operator StructArray. Subbidang vektor digunakan oleh jalur pencarian vektor dan bukan masukan predikat skalar.</p>
<h2 id="When-to-use-which-operator" class="common-anchor-header">Kapan menggunakan operator mana<button data-href="#When-to-use-which-operator" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Tujuan</th><th>Penggunaan</th></tr>
</thead>
<tbody>
<tr><td>Membatasi pencarian vektor tingkat elemen hanya pada elemen yang memenuhi kondisi skalar.</td><td><code translate="no">element_filter</code></td></tr>
<tr><td>Mencocokkan beberapa kondisi skalar dalam elemen Struct yang sama.</td><td><code translate="no">element_filter</code></td></tr>
<tr><td>Mengembalikan hanya entitas di mana setidaknya satu elemen Struct memenuhi suatu predikat.</td><td><code translate="no">MATCH_ANY</code></td></tr>
<tr><td>Hanya mengembalikan entitas di mana semua elemen Struct memenuhi suatu predikat.</td><td><code translate="no">MATCH_ALL</code></td></tr>
<tr><td>Hanya mengembalikan entitas di mana setidaknya, paling banyak, atau tepat <code translate="no">N</code> elemen Struct memenuhi suatu predikat.</td><td><code translate="no">MATCH_LEAST</code>, <code translate="no">MATCH_MOST</code>, atau <code translate="no">MATCH_EXACT</code></td></tr>
</tbody>
</table>
<h2 id="Element-Filter" class="common-anchor-header">Filter Elemen<button data-href="#Element-Filter" class="anchor-icon" translate="no">
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
    </button></h2><p>Gunakan ` <code translate="no">element_filter(structArrayField, predicate)</code> ` untuk mencocokkan elemen Struct dalam bidang StructArray.</p>
<p>Di dalam predikat, gunakan " <code translate="no">$[subfield]</code> " untuk merujuk ke subbidang skalar dari elemen Struct saat ini.</p>
<pre><code translate="no" class="language-python">element_filter(chunks, $[section] == <span class="hljs-string">&quot;index&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Jika beberapa kondisi digunakan di dalam predikat, semua referensi ` <code translate="no">$[subfield]</code> ` berlaku untuk elemen Struct yang sama:</p>
<pre><code translate="no" class="language-python">element_filter(chunks, $[section] == <span class="hljs-string">&quot;index&quot;</span> &amp;&amp; $[quality_score] &gt; <span class="hljs-number">0.9</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Saat Anda menggabungkan predikat tingkat entitas dengan ` <code translate="no">element_filter</code>`, letakkan ` <code translate="no">element_filter</code> ` di akhir ekspresi:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Correct</span>
category == <span class="hljs-string">&quot;index&quot;</span> &amp;&amp; element_filter(chunks, $[quality_score] &gt; <span class="hljs-number">0.9</span>)

<span class="hljs-comment"># Incorrect</span>
element_filter(chunks, $[quality_score] &gt; <span class="hljs-number">0.9</span>) &amp;&amp; category == <span class="hljs-string">&quot;index&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">element_filter</code> hanya dapat muncul sekali dalam ekspresi filter. Jangan menyematkan ` <code translate="no">element_filter</code> ` atau ` <code translate="no">MATCH_*</code> ` di dalam ` <code translate="no">element_filter</code>` lainnya.</p>
<h2 id="Match-Family-Operators" class="common-anchor-header">Operator Keluarga Pencocokan<button data-href="#Match-Family-Operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Gunakan operator <code translate="no">MATCH_*</code> ketika suatu entitas harus dipilih berdasarkan berapa banyak elemen Struct yang memenuhi suatu predikat.</p>
<table>
<thead>
<tr><th>Operator</th><th>Arti</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">MATCH_ANY(field, predicate)</code></td><td>Setidaknya satu elemen Struct memenuhi predikat.</td></tr>
<tr><td><code translate="no">MATCH_ALL(field, predicate)</code></td><td>Semua elemen Struct memenuhi predikat.</td></tr>
<tr><td><code translate="no">MATCH_LEAST(field, predicate, threshold=N)</code></td><td>Setidaknya <code translate="no">N</code> elemen Struct memenuhi predikat.</td></tr>
<tr><td><code translate="no">MATCH_MOST(field, predicate, threshold=N)</code></td><td>Paling banyak <code translate="no">N</code> elemen Struct memenuhi predikat tersebut.</td></tr>
<tr><td><code translate="no">MATCH_EXACT(field, predicate, threshold=N)</code></td><td>Tepat <code translate="no">N</code> elemen Struct memenuhi predikat tersebut.</td></tr>
</tbody>
</table>
<p><code translate="no">MATCH_ANY</code> dan <code translate="no">element_filter</code> sama-sama dapat menyatakan bahwa setidaknya satu elemen Struct memenuhi predikat. Gunakan <code translate="no">MATCH_ANY</code> jika Anda hanya memerlukan penyaringan tingkat baris. Gunakan <code translate="no">element_filter</code> jika Anda memerlukan batasan tingkat elemen, seperti penyaringan elemen Struct mana yang berpartisipasi dalam pencarian vektor tingkat elemen.</p>
<h3 id="MATCHANY" class="common-anchor-header">MATCH_ANY<button data-href="#MATCHANY" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">MATCH_ANY</code> akan menghasilkan nilai ` <code translate="no">true</code> ` jika setidaknya satu elemen dalam `StructArray` memenuhi predikat tersebut.</p>
<pre><code translate="no" class="language-python">MATCH_ANY(chunks, $[section] == <span class="hljs-string">&quot;index&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Untuk StructArray yang kosong, ` <code translate="no">MATCH_ANY</code> ` mengembalikan ` <code translate="no">false</code>`.</p>
<h3 id="MATCHALL" class="common-anchor-header">MATCH_ALL<button data-href="#MATCHALL" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">MATCH_ALL</code> menghasilkan nilai ` <code translate="no">true</code> ` jika setiap elemen dalam `StructArray` memenuhi predikat tersebut.</p>
<pre><code translate="no" class="language-python">MATCH_ALL(chunks, $[has_code] == true)
<button class="copy-code-btn"></button></code></pre>
<p>Untuk StructArray yang kosong, <code translate="no">MATCH_ALL</code> mengembalikan <code translate="no">true</code>.</p>
<h3 id="MATCHLEAST" class="common-anchor-header">MATCH_LEAST<button data-href="#MATCHLEAST" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">MATCH_LEAST</code> akan menghasilkan nilai <code translate="no">true</code> jika jumlah elemen yang memenuhi predikat tersebut lebih besar dari atau sama dengan <code translate="no">threshold</code>.</p>
<pre><code translate="no" class="language-python">MATCH_LEAST(chunks, $[quality_score] &gt; <span class="hljs-number">0.9</span>, threshold=<span class="hljs-number">2</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Untuk ` <code translate="no">MATCH_LEAST</code>`, ` <code translate="no">threshold</code> ` harus berupa bilangan bulat positif.</p>
<h3 id="MATCHMOST" class="common-anchor-header">MATCH_MOST<button data-href="#MATCHMOST" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">MATCH_MOST</code> menghasilkan nilai <code translate="no">true</code> jika jumlah elemen yang memenuhi predikat tersebut kurang dari atau sama dengan <code translate="no">threshold</code>.</p>
<pre><code translate="no" class="language-python">MATCH_MOST(chunks, $[has_code] == true, threshold=<span class="hljs-number">1</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Untuk ` <code translate="no">MATCH_MOST</code>`, ` <code translate="no">threshold</code> ` dapat bernilai nol atau bilangan bulat positif.</p>
<h3 id="MATCHEXACT" class="common-anchor-header">MATCH_EXACT<button data-href="#MATCHEXACT" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">MATCH_EXACT</code> menghasilkan nilai <code translate="no">true</code> jika jumlah elemen yang memenuhi predikat tersebut sama persis dengan <code translate="no">threshold</code>.</p>
<pre><code translate="no" class="language-python">MATCH_EXACT(chunks, $[section] == <span class="hljs-string">&quot;filter&quot;</span>, threshold=<span class="hljs-number">1</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Untuk ` <code translate="no">MATCH_EXACT</code>`, ` <code translate="no">threshold</code> ` dapat bernilai nol atau bilangan bulat positif.</p>
<h2 id="Supported-predicates" class="common-anchor-header">Predikat yang didukung<button data-href="#Supported-predicates" class="anchor-icon" translate="no">
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
    </button></h2><p>Sintaks ` <code translate="no">$[...]</code> ` mewakili nilai skalar dari elemen Struct saat ini. Dukungan predikat bergantung pada tipe subbidang skalar.</p>
<table>
<thead>
<tr><th>Tipe subbidang</th><th>Dukungan predikat pada tingkat elemen</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td>Predikat skalar seperti <code translate="no">$[has_code] == true</code> atau <code translate="no">!($[has_code] == true)</code>. Hindari ekspresi boolean tanpa penekanan seperti <code translate="no">$[has_code]</code>.</td></tr>
<tr><td><code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code></td><td>Perbandingan, rentang berantai, <code translate="no">in</code>, <code translate="no">not in</code>, ekspresi aritmatika dengan <code translate="no">+</code>, <code translate="no">-</code>, <code translate="no">*</code>, <code translate="no">/</code>, atau <code translate="no">%</code> yang diikuti oleh perbandingan, serta kombinasi logika.</td></tr>
<tr><td><code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code></td><td>Perbandingan, rentang berantai, <code translate="no">in</code>, <code translate="no">not in</code>, ekspresi aritmatika dengan <code translate="no">+</code>, <code translate="no">-</code>, <code translate="no">*</code>, atau <code translate="no">/</code> yang diikuti oleh perbandingan, serta kombinasi logika. Operator <code translate="no">%</code> tidak didukung untuk subbidang bilangan floating-point.</td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td>Perbandingan string, rentang berantai, <code translate="no">in</code>, <code translate="no">not in</code>, <code translate="no">like</code>, <code translate="no">=~</code>, <code translate="no">!~</code>, dan kombinasi logis.</td></tr>
<tr><td>Subbidang vektor</td><td>Tidak didukung sebagai masukan predikat skalar <code translate="no">$[...]</code>. Gunakan subbidang vektor melalui pencarian EmbeddingList atau pencarian vektor tingkat elemen sebagai gantinya.</td></tr>
</tbody>
</table>
<p>Operator logika seperti <code translate="no">&amp;&amp;</code>, <code translate="no">\|\|</code>, dan <code translate="no">!</code> berlaku untuk ekspresi predikat. Misalnya, tulis <code translate="no">!($[has_code] == true)</code> alih-alih <code translate="no">!$[has_code]</code>.</p>
<h2 id="Unsupported-predicates" class="common-anchor-header">Predikat yang tidak didukung<button data-href="#Unsupported-predicates" class="anchor-icon" translate="no">
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
    </button></h2><p>Predikat <code translate="no">$[...]</code> tingkat elemen tidak mendukung:</p>
<ul>
<li><p>Fungsi pencocokan teks, seperti <code translate="no">text_match(field, &quot;...&quot;)</code> atau <code translate="no">phrase_match(field, &quot;...&quot;)</code>.</p></li>
<li><p>Sintaks JSON path, <code translate="no">exists</code> pada JSON path, atau fungsi JSON seperti <code translate="no">json_contains</code>, <code translate="no">json_contains_all</code>, atau <code translate="no">json_contains_any</code>.</p></li>
<li><p>Fungsi wadah array seperti <code translate="no">array_contains</code>, <code translate="no">array_contains_all</code>, <code translate="no">array_contains_any</code>, atau <code translate="no">array_length</code>.</p></li>
<li><p><code translate="no">$[subfield] is null</code> atau <code translate="no">$[subfield] is not null</code>.</p></li>
<li><p>Fungsi geometri / GIS.</p></li>
<li><p>Ekspresi timestamptz.</p></li>
<li><p><code translate="no">random_sample(...)</code>.</p></li>
<li><p>Predikat vektor tingkat bidang.</p></li>
<li><p>Panggilan fungsi filter generik kecuali jika tanda tangan fungsi dan jalur eksekusi tertentu secara eksplisit mendukung predikat tingkat elemen StructArray.</p></li>
</ul>
<h2 id="Syntax-rules" class="common-anchor-header">Aturan sintaks<button data-href="#Syntax-rules" class="anchor-icon" translate="no">
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
<li><p><code translate="no">MATCH_*</code> Nama operator tidak membedakan huruf besar/kecil.</p></li>
<li><p>Gunakan <code translate="no">$[subfield]</code> hanya di dalam predikat <code translate="no">element_filter</code> atau <code translate="no">MATCH_*</code>.</p></li>
<li><p>Jangan gunakan <code translate="no">$[subfield]</code> sebagai jalur JSON, wadah array, atau referensi bidang vektor.</p></li>
<li><p>Jangan menyematkan ` <code translate="no">element_filter</code> ` atau ` <code translate="no">MATCH_*</code> ` di dalam operator `StructArray` lainnya.</p></li>
<li><p>Gunakan <code translate="no">threshold=N</code> yang diberi nama untuk <code translate="no">MATCH_LEAST</code>, <code translate="no">MATCH_MOST</code>, dan <code translate="no">MATCH_EXACT</code>.</p></li>
<li><p><code translate="no">MATCH_ANY</code> pada StructArray kosong mengembalikan <code translate="no">false</code>.</p></li>
<li><p><code translate="no">MATCH_ALL</code> pada StructArray kosong mengembalikan <code translate="no">true</code>.</p></li>
</ul>
<h2 id="See-also" class="common-anchor-header">Lihat juga<button data-href="#See-also" class="anchor-icon" translate="no">
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
<li><p><a href="/docs/id/filtered-search-with-structarray.md">Pencarian Terfilter dengan StructArray</a></p></li>
<li><p><a href="/docs/id/basic-vector-search-with-structarray.md">Pencarian Vektor Dasar dengan StructArray</a></p></li>
<li><p><a href="/docs/id/index-structarray-fields.md">Mengindeks Bidang StructArray</a></p></li>
<li><p><a href="/docs/id/structarray-limits.md">Batasan StructArray</a></p></li>
</ul>
