---
id: struct-array-operators.md
title: Operator StructArray
summary: >-
  Operator StructArray menyaring entitas dengan mengevaluasi predikat pada
  subbidang skalar di dalam bidang StructArray. Gunakan halaman ini sebagai
  referensi sintaks untuk `element_filter`, keluarga operator `MATCH_*`, dan
  predikat tingkat baris pada jalur StructArray.
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
    </button></h1><p>Operator StructArray menyaring entitas dengan mengevaluasi predikat pada subbidang skalar di dalam bidang StructArray. Gunakan halaman ini sebagai referensi sintaks untuk <code translate="no">element_filter</code>, keluarga operator <code translate="no">MATCH_*</code>, dan predikat tingkat baris pada jalur StructArray.</p>
<p>Penyaringan StructArray memiliki dua keluarga operator dan sekumpulan predikat jalur tingkat baris:</p>
<table>
<thead>
<tr><th>Bentuk penyaringan</th><th>Tujuan utama</th><th>Perilaku hasil</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">element_filter</code></td><td>Mencocokkan elemen Struct yang memenuhi predikat skalar.</td><td>Dalam pencarian tingkat elemen, hasil yang cocok dapat mencakup offset elemen. Dalam kueri tingkat baris atau pencarian yang difilter, bentuk hasil bergantung pada API dan bidang keluaran.</td></tr>
<tr><td><code translate="no">MATCH_*</code></td><td>Memilih entitas berdasarkan jumlah elemen Struct yang memenuhi predikat skalar.</td><td>Penyaringan tingkat baris. Operator-operator ini tidak mengembalikan offset elemen secara langsung.</td></tr>
<tr><td>Predikat jalur tingkat baris</td><td>Uji posisi satu elemen, hitung jumlah elemen Struct, atau uji nilai subbidang di seluruh elemen tanpa predikat " <code translate="no">$[...]</code> ".</td><td>Penyaringan tingkat baris. Predikat-predikat ini tidak mengembalikan offset elemen.</td></tr>
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
<tr><td>Batasi pencarian vektor tingkat elemen hanya pada elemen yang memenuhi kondisi skalar.</td><td><code translate="no">element_filter</code></td></tr>
<tr><td>Mencocokkan beberapa kondisi skalar dalam elemen Struct yang sama.</td><td><code translate="no">element_filter</code></td></tr>
<tr><td>Mengembalikan hanya entitas di mana setidaknya satu elemen Struct memenuhi suatu predikat.</td><td><code translate="no">MATCH_ANY</code></td></tr>
<tr><td>Hanya mengembalikan entitas di mana semua elemen Struct memenuhi suatu predikat.</td><td><code translate="no">MATCH_ALL</code></td></tr>
<tr><td>Hanya mengembalikan entitas di mana setidaknya, paling banyak, atau tepat <code translate="no">N</code> elemen Struct memenuhi suatu predikat.</td><td><code translate="no">MATCH_LEAST</code>, <code translate="no">MATCH_MOST</code>, atau <code translate="no">MATCH_EXACT</code></td></tr>
<tr><td>Periksa elemen Struct pada posisi tertentu, seperti potongan pertama.</td><td>Jalur posisi seperti <code translate="no">chunks[0][section]</code></td></tr>
<tr><td>Saring berdasarkan jumlah elemen Struct dalam suatu entitas.</td><td><code translate="no">array_length(chunks)</code></td></tr>
<tr><td>Periksa apakah ada elemen Struct yang memiliki nilai subfield, tanpa menggabungkan kondisi pada elemen yang sama.</td><td><code translate="no">array_contains</code>, <code translate="no">array_contains_any</code>, atau <code translate="no">array_contains_all</code> pada jalur subbidang seperti <code translate="no">chunks[section]</code></td></tr>
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
    </button></h2><p>Gunakan <code translate="no">element_filter(structArrayField, predicate)</code> untuk mencocokkan elemen Struct dalam bidang StructArray.</p>
<p>Di dalam predikat, gunakan <code translate="no">$[subfield]</code> untuk merujuk ke subfield skalar dari elemen Struct saat ini.</p>
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
<p><code translate="no">MATCH_ANY</code> dan <code translate="no">element_filter</code> keduanya dapat menyatakan bahwa setidaknya satu elemen Struct memenuhi predikat. Gunakan <code translate="no">MATCH_ANY</code> jika Anda hanya memerlukan penyaringan tingkat baris. Gunakan <code translate="no">element_filter</code> jika Anda memerlukan batasan tingkat elemen, seperti penyaringan elemen Struct mana yang berpartisipasi dalam pencarian vektor tingkat elemen.</p>
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
    </button></h3><p><code translate="no">MATCH_LEAST</code> menghasilkan nilai <code translate="no">true</code> jika jumlah elemen yang memenuhi predikat tersebut lebih besar dari atau sama dengan <code translate="no">threshold</code>.</p>
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
<p>Untuk <code translate="no">MATCH_MOST</code>, <code translate="no">threshold</code> dapat bernilai nol atau bilangan bulat positif.</p>
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
<h2 id="Row-level-predicates-on-StructArray-paths" class="common-anchor-header">Predikat tingkat baris pada jalur StructArray<button data-href="#Row-level-predicates-on-StructArray-paths" class="anchor-icon" translate="no">
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
    </button></h2><p>Selain <code translate="no">element_filter</code> dan <code translate="no">MATCH_*</code>, ekspresi filter biasa dapat merujuk langsung ke bidang StructArray atau salah satu subbidang skalarnya. Predikat ini dievaluasi pada tingkat entitas dan tidak mengembalikan offset elemen.</p>
<h3 id="Access-a-Struct-element-by-position" class="common-anchor-header">Mengakses elemen Struct berdasarkan posisi<button data-href="#Access-a-Struct-element-by-position" class="anchor-icon" translate="no">
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
    </button></h3><p>Gunakan <code translate="no">structArrayField[index][subfield]</code> untuk merujuk ke satu subbidang skalar dari elemen Struct pada posisi berbasis nol. Tulis posisi terlebih dahulu, kemudian nama subbidang.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># The first chunk belongs to the &quot;index&quot; section.</span>
chunks[<span class="hljs-number">0</span>][section] == <span class="hljs-string">&quot;index&quot;</span>

<span class="hljs-comment"># The second chunk has a high quality score.</span>
chunks[<span class="hljs-number">1</span>][quality_score] &gt; <span class="hljs-number">0.9</span>

<span class="hljs-comment"># The first chunk is on page 1, 2, or 3.</span>
chunks[<span class="hljs-number">0</span>][page] <span class="hljs-keyword">in</span> [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]

<span class="hljs-comment"># Chained range on a positional path.</span>
<span class="hljs-number">0.8</span> &lt; chunks[<span class="hljs-number">0</span>][quality_score] &lt; <span class="hljs-number">0.95</span>
<button class="copy-code-btn"></button></code></pre>
<p>Jalur posisi mendukung perbandingan, <code translate="no">in</code>, <code translate="no">not in</code>, dan predikat rentang berantai pada subbidang skalar. Sebuah entitas tidak cocok jika bidang StructArray-nya tidak memiliki elemen pada posisi tersebut.</p>
<h3 id="Count-Struct-elements" class="common-anchor-header">Menghitung elemen Struct<button data-href="#Count-Struct-elements" class="anchor-icon" translate="no">
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
    </button></h3><p>Gunakan <code translate="no">array_length(structArrayField)</code> untuk menyaring berdasarkan jumlah elemen Struct dalam suatu entitas. <code translate="no">array_length</code> pada jalur subbidang, seperti <code translate="no">array_length(chunks[section])</code>, mengembalikan jumlah yang sama, karena setiap subbidang menyimpan satu nilai per elemen Struct.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Articles with at least three chunks.</span>
array_length(chunks) &gt;= <span class="hljs-number">3</span>

<span class="hljs-comment"># Articles with exactly one chunk.</span>
array_length(chunks) == <span class="hljs-number">1</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Test-subfield-values-across-elements" class="common-anchor-header">Menguji nilai subbidang di seluruh elemen<button data-href="#Test-subfield-values-across-elements" class="anchor-icon" translate="no">
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
    </button></h3><p>Gunakan <code translate="no">array_contains</code>, <code translate="no">array_contains_any</code>, atau <code translate="no">array_contains_all</code> pada jalur subfield skalar untuk menguji nilai subfield tersebut di seluruh elemen Struct dalam entitas. Setiap jalur subfield dievaluasi secara terpisah, sehingga kondisi pada subfield yang berbeda dapat dipenuhi oleh elemen Struct yang berbeda.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># At least one chunk belongs to the &quot;index&quot; section.</span>
array_contains(chunks[section], <span class="hljs-string">&quot;index&quot;</span>)

<span class="hljs-comment"># At least one chunk belongs to the &quot;index&quot; or the &quot;search&quot; section.</span>
array_contains_any(chunks[section], [<span class="hljs-string">&quot;index&quot;</span>, <span class="hljs-string">&quot;search&quot;</span>])

<span class="hljs-comment"># The chunks cover both the &quot;index&quot; and the &quot;search&quot; sections,</span>
<span class="hljs-comment"># not necessarily in the same chunk.</span>
array_contains_all(chunks[section], [<span class="hljs-string">&quot;index&quot;</span>, <span class="hljs-string">&quot;search&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">array_contains(chunks[section], &quot;index&quot;)</code> memilih entitas yang sama seperti <code translate="no">MATCH_ANY(chunks, $[section] == &quot;index&quot;)</code>. Gunakan <code translate="no">MATCH_*</code> atau <code translate="no">element_filter</code> ketika beberapa kondisi harus terpenuhi untuk elemen Struct yang sama, karena predikat <code translate="no">$[...]</code> dievaluasi per elemen.</p>
<h3 id="Test-whether-a-nullable-StructArray-field-is-null" class="common-anchor-header">Uji apakah bidang StructArray yang dapat bernilai null memang bernilai null<button data-href="#Test-whether-a-nullable-StructArray-field-is-null" class="anchor-icon" translate="no">
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
    </button></h3><p>Gunakan <code translate="no">IS NULL</code> atau <code translate="no">IS NOT NULL</code> pada bidang StructArray yang dapat bernilai null untuk menguji nilai bidang secara keseluruhan. Nilai null berlaku untuk seluruh bidang StructArray, sehingga predikat ini hanya menerima nama bidang, bukan jalur subbidang.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Entities that have no chunks value.</span>
chunks <span class="hljs-keyword">is</span> null

<span class="hljs-comment"># Entities that have a chunks value.</span>
chunks <span class="hljs-keyword">is</span> <span class="hljs-keyword">not</span> null
<button class="copy-code-btn"></button></code></pre>
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
<tr><th>Tipe subbidang</th><th>Dukungan predikat tingkat elemen</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td>Predikat skalar seperti ` <code translate="no">$[has_code] == true</code> ` atau ` <code translate="no">!($[has_code] == true)</code>`. Hindari ekspresi boolean tanpa penekanan seperti ` <code translate="no">$[has_code]</code>`.</td></tr>
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
<li><p>Fungsi wadah array seperti <code translate="no">array_contains</code>, <code translate="no">array_contains_all</code>, <code translate="no">array_contains_any</code>, atau <code translate="no">array_length</code> di <code translate="no">$[subfield]</code>. Gunakan fungsi-fungsi ini pada jalur subbidang seperti <code translate="no">chunks[section]</code> dalam predikat tingkat baris sebagai gantinya.</p></li>
<li><p><code translate="no">$[subfield] is null</code> atau <code translate="no">$[subfield] is not null</code>.</p></li>
<li><p>Fungsi geometri/GIS.</p></li>
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
<li><p><code translate="no">MATCH_*</code> Nama operator tidak peka huruf besar/kecil.</p></li>
<li><p>Gunakan <code translate="no">$[subfield]</code> hanya di dalam predikat <code translate="no">element_filter</code> atau <code translate="no">MATCH_*</code>. Misalnya, <code translate="no">array_length($[section])</code> akan ditolak.</p></li>
<li><p>Jangan gunakan ` <code translate="no">$[subfield]</code> ` sebagai jalur JSON, wadah array, atau referensi bidang vektor.</p></li>
<li><p>Jangan menyematkan <code translate="no">element_filter</code> atau <code translate="no">MATCH_*</code> di dalam operator StructArray lainnya.</p></li>
<li><p>Gunakan <code translate="no">threshold=N</code> yang diberi nama untuk <code translate="no">MATCH_LEAST</code>, <code translate="no">MATCH_MOST</code>, dan <code translate="no">MATCH_EXACT</code>.</p></li>
<li><p>Dalam jalur posisional, tuliskan posisi elemen sebelum nama subbidang: ` <code translate="no">chunks[0][section]</code>`, bukan ` <code translate="no">chunks[section][0]</code>`.</p></li>
<li><p>Gunakan <code translate="no">IS NULL</code> dan <code translate="no">IS NOT NULL</code> hanya pada bidang StructArray secara keseluruhan, seperti <code translate="no">chunks is null</code>. Jangan gunakan keduanya pada jalur subbidang seperti <code translate="no">chunks[section]</code> atau pada <code translate="no">$[subfield]</code>.</p></li>
<li><p><code translate="no">MATCH_ANY</code> pada StructArray kosong akan mengembalikan <code translate="no">false</code>.</p></li>
<li><p><code translate="no">MATCH_ALL</code> pada StructArray kosong akan mengembalikan <code translate="no">true</code>.</p></li>
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
<li><p><a href="/docs/id/structarray-limits.md">Batas StructArray</a></p></li>
</ul>
