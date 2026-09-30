---
id: struct-array-operators.md
title: Operator StructArrayCompatible with Milvus 3.0.x
summary: >-
  Gunakan filter elemen dan operator pencocokan-keluarga untuk memfilter
  sub-bidang skalar di dalam bidang StructArray.
beta: Milvus 3.0.x
---
<h1 id="StructArray-Operators" class="common-anchor-header">Operator StructArray<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#StructArray-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>Larik Struktur, atau StructArray, dalam sebuah entitas menyimpan sekumpulan elemen Struktur yang terurut. Setiap Struktur dalam Larik memiliki skema yang telah ditentukan sebelumnya, yang terdiri dari beberapa vektor dan bidang skalar. Ketika sub-bidang skalar dalam sebuah Struktur diindeks, Anda dapat menggunakan <strong>filter elemen</strong> dan <strong>operator dalam keluarga pencocokan</strong> untuk melakukan pemfilteran skalar di dalamnya.</p>
<p>Filter elemen memilih entitas yang mengandung setidaknya satu nilai dalam bidang StructArray yang cocok dengan predikat yang ditentukan. Sebaliknya, operator keluarga pencocokan digunakan untuk menemukan entitas yang mengandung jumlah atau proporsi nilai tertentu dalam bidang StructArray yang cocok dengan predikat yang ditentukan.</p>
<div class="alert note">
<p>Saat membuat predikat terhadap <code translate="no">$[subField]</code>, pastikan subbidang diindeks jika Anda bekerja dengan kumpulan data berskala besar, karena operator ini memerlukan perulangan melalui elemen larik untuk setiap entitas kandidat.</p>
</div>
<h2 id="Element-filter" class="common-anchor-header">Filter elemen<button data-href="#Element-filter" class="anchor-icon" translate="no">
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
    </button></h2><p>Gunakan filter elemen ketika Anda perlu memeriksa apakah suatu entitas berisi nilai yang cocok dengan predikat tertentu dalam bidang StructArray.</p>
<pre><code translate="no" class="language-python">element_filter(chunks, $[text] LIKE <span class="hljs-string">&quot;Red%&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Seperti yang ditunjukkan pada ekspresi filter elemen di atas, filter elemen mengembalikan entitas yang mengandung setidaknya satu potongan yang dimulai dengan "Red" di sub-bidang <code translate="no">text</code>. Parameter pertama adalah nama bidang StructArray, sedangkan parameter kedua adalah predikat yang berlaku untuk sub-bidang Struct.</p>
<p>Anda dapat menggunakan operator perbandingan, rentang, dan aritmatika untuk membuat kondisi, dan operator logika untuk menggabungkan beberapa kondisi, seperti yang ditunjukkan di <a href="/docs/id/v2.6.x/basic-operators.md">Operator Dasar</a>.</p>
<p>Namun, saat Anda membuat ekspresi filter yang menggabungkan predikat tingkat entitas dan filter elemen, Anda harus selalu menempatkan fltler elemen di bagian akhir, seperti yang ditunjukkan pada contoh berikut.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># correct</span>
<span class="hljs-built_in">id</span> &gt; <span class="hljs-number">0</span> &amp;&amp; element_filter(chunks, $[x] &gt; <span class="hljs-number">1</span>)

<span class="hljs-comment"># incorrect, resulting errors</span>
element_filter(chunks, $[x] &gt; <span class="hljs-number">1</span>) &amp;&amp; <span class="hljs-built_in">id</span> &gt; <span class="hljs-number">0</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Match-family-operators" class="common-anchor-header">Operator keluarga pencocokan<button data-href="#Match-family-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Operator keluarga pencocokan juga bekerja di atas bidang StructArray. Daripada hanya memeriksa apakah sebuah elemen ada, Anda bisa menentukan berapa banyak elemen (atau proporsi) yang harus memenuhi predikat elemen.</p>
<ul>
<li><p><a href="/docs/id/v2.6.x/struct-array-operators.md#MATCHANY"><code translate="no">MATCH_ANY(identifier, predicate)</code></a>: mengembalikan entitas yang mengandung setidaknya satu potongan yang dimulai dengan "Red" dalam sub-bidang <code translate="no">text</code>; secara semantik, ini setara dengan <code translate="no">element_filter</code>.</p></li>
<li><p><a href="/docs/id/v2.6.x/struct-array-operators.md#MATCHALL"><code translate="no">MATCH_ALL(identifier, predicate)</code></a>: mengembalikan entitas yang sub-bidang teksnya di semua potongan dimulai dengan "Red".</p></li>
<li><p><a href="/docs/id/v2.6.x/struct-array-operators.md#MATCHLEAST"><code translate="no">MATCH_LEAST(identifier, predicate, k)</code></a>: mengembalikan entitas yang berisi setidaknya potongan <code translate="no">k</code> yang dimulai dengan "Red" di sub-bidang <code translate="no">text</code>.</p></li>
<li><p><a href="/docs/id/v2.6.x/struct-array-operators.md#MATCHMOST"><code translate="no">MATCH_MOST(identifier, predicate, k)</code></a>: mengembalikan entitas yang berisi paling banyak potongan <code translate="no">k</code> yang dimulai dengan "Red" di sub-bidang <code translate="no">text</code>.</p></li>
<li><p><a href="/docs/id/v2.6.x/struct-array-operators.md#MATCHEXACT"><code translate="no">MATCH_EXACT(identifier, predicate, k)</code></a>: mengembalikan entitas yang berisi tepat <code translate="no">k</code> potongan yang dimulai dengan "Red" di sub-bidang <code translate="no">text</code>.</p></li>
</ul>
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
    </button></h3><p>Operator ini bernilai benar jika <strong>setidaknya satu</strong> elemen dalam larik memenuhi predikat, yang mengindikasikan bahwa ekuivalen struktural dari logika <code translate="no">OR</code> di semua elemen larik.</p>
<p>Operator MATCH_ANY dan filter elemen secara semantik sama, dan Anda dapat menggunakannya secara bergantian. Ketika Anda perlu mengekspresikan logika <code translate="no">count(matches) &gt;= 1</code>, Anda harus menggunakannya.</p>
<p><strong>CONTOH:</strong></p>
<p>Contoh berikut ini mengembalikan entitas di mana bagian mana pun dari dokumen dimulai dengan "Merah".</p>
<pre><code translate="no" class="language-python">MATCH_ANY(chunks, $[text] LIKE <span class="hljs-string">&#x27;Red%&#x27;</span>)
<button class="copy-code-btn"></button></code></pre>
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
    </button></h3><p>Operator ini bernilai benar hanya jika <strong>setiap</strong> elemen dalam larik memenuhi predikat.</p>
<p>Ketika Anda perlu mengekspresikan logika <code translate="no">count(matches) == total elements</code>, gunakan operator ini.</p>
<p><strong>CONTOH:</strong></p>
<pre><code translate="no" class="language-python">MATCH_ALL(chunks, $[text] LIKE <span class="hljs-string">&#x27;Red%&#x27;</span>)
<button class="copy-code-btn"></button></code></pre>
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
    </button></h3><p>Operator ini adalah filter kuantitatif yang menghasilkan nilai benar jika jumlah elemen yang memenuhi predikat <strong>lebih besar atau sama dengan</strong> konstanta tertentu <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">kk</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span></span></span></span> k.</p>
<p>Ketika Anda perlu mengekspresikan logika <code translate="no">count(matches) &gt;= k</code>, gunakan operator ini.</p>
<p><strong>CONTOH</strong></p>
<pre><code translate="no" class="language-python">MATCH_LEAST(chunks, $[text] LIKE <span class="hljs-string">&#x27;Red%&#x27;</span>, <span class="hljs-number">3</span>)
<button class="copy-code-btn"></button></code></pre>
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
    </button></h3><p>Operator ini adalah filter kuantitatif yang mengembalikan nilai benar jika jumlah elemen yang memenuhi predikat <strong>kurang dari atau sama dengan</strong> konstanta tertentu <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">kk</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span></span></span></span> k.</p>
<p>Ini sangat berguna untuk menyaring entitas yang terlalu banyak menargetkan kata kunci tertentu (pengurangan noise).</p>
<p><strong>CONTOH:</strong></p>
<pre><code translate="no" class="language-python">MATCH_MOST(chunks, $[text] LIKE <span class="hljs-string">&#x27;Red%&#x27;</span>, <span class="hljs-number">3</span>)
<button class="copy-code-btn"></button></code></pre>
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
    </button></h3><p>Operator ini adalah operator kuantitatif yang paling ketat di dalam keluarga ini. Operator ini menghasilkan nilai benar jika dan hanya jika jumlah elemen yang memenuhi predikat adalah <strong>tepat</strong> <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">kk</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span></span></span></span> k.</p>
<p><strong>CONTOH:</strong></p>
<pre><code translate="no" class="language-python">MATCH_EXACT(chunks, $[text] LIKE <span class="hljs-string">&#x27;Red%&#x27;</span>, <span class="hljs-number">3</span>)
<button class="copy-code-btn"></button></code></pre>
