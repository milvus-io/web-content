---
id: array-operators.md
title: Operator ARRAY
summary: >-
  Milvus menyediakan operator yang kuat untuk melakukan kueri terhadap bidang
  larik, yang memungkinkan Anda untuk memfilter dan mengambil entitas
  berdasarkan isi larik.
---
<h1 id="ARRAY-Operators" class="common-anchor-header">Operator ARRAY<button data-href="#ARRAY-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus menyediakan operator yang kuat untuk melakukan kueri pada bidang array, memungkinkan Anda untuk memfilter dan mengambil entitas berdasarkan isi array.</p>
<div class="alert note">
<p>Semua elemen dalam larik harus memiliki tipe yang sama, dan struktur bersarang dalam larik diperlakukan sebagai string biasa. Oleh karena itu, saat bekerja dengan bidang ARRAY, disarankan untuk menghindari penumpukan yang terlalu dalam dan memastikan bahwa struktur data Anda serata mungkin untuk kinerja yang optimal.</p>
</div>
<h2 id="Available-ARRAY-Operators" class="common-anchor-header">Operator ARRAY yang Tersedia<button data-href="#Available-ARRAY-Operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Operator ARRAY memungkinkan untuk melakukan kueri bidang array yang halus di Milvus. Operator-operator ini adalah:</p>
<ul>
<li><p><a href="/docs/id/array-operators.md#ARRAYCONTAINS"><code translate="no">ARRAY_CONTAINS(identifier, expr)</code></a>: memeriksa apakah elemen tertentu ada di dalam sebuah field array.</p></li>
<li><p><a href="/docs/id/array-operators.md#ARRAYCONTAINSALL"><code translate="no">ARRAY_CONTAINS_ALL(identifier, expr)</code></a>: memastikan bahwa semua elemen dari daftar yang ditentukan ada dalam bidang array.</p></li>
<li><p><a href="/docs/id/array-operators.md#ARRAYCONTAINSANY"><code translate="no">ARRAY_CONTAINS_ANY(identifier, expr)</code></a>: memeriksa apakah salah satu elemen dari daftar yang ditentukan ada dalam bidang larik.</p></li>
<li><p><a href="/docs/id/array-operators.md#ARRAYLENGTH"><code translate="no">ARRAY_LENGTH(identifier)</code></a>: mengembalikan jumlah elemen dalam bidang larik dan dapat dikombinasikan dengan operator perbandingan untuk pemfilteran.</p></li>
</ul>
<h2 id="ARRAYCONTAINS" class="common-anchor-header">ARRAY_CONTAINS<button data-href="#ARRAYCONTAINS" class="anchor-icon" translate="no">
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
    </button></h2><p>Operator <code translate="no">ARRAY_CONTAINS</code> memeriksa apakah elemen tertentu ada dalam bidang larik. Operator ini berguna ketika Anda ingin menemukan entitas di mana elemen tertentu ada dalam larik.</p>
<p><strong>Contoh</strong></p>
<p>Misalkan Anda memiliki bidang larik <code translate="no">history_temperatures</code>, yang berisi suhu terendah yang tercatat untuk tahun yang berbeda. Untuk menemukan semua entitas di mana larik berisi nilai <code translate="no">23</code>, Anda dapat menggunakan ekspresi filter berikut:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS(history_temperatures, 23)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Ini akan mengembalikan semua entitas di mana larik <code translate="no">history_temperatures</code> berisi nilai <code translate="no">23</code>.</p>
<h2 id="ARRAYCONTAINSALL" class="common-anchor-header">LARIK_MENGANDUNG_SEMUA<button data-href="#ARRAYCONTAINSALL" class="anchor-icon" translate="no">
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
    </button></h2><p>Operator <code translate="no">ARRAY_CONTAINS_ALL</code> memastikan bahwa semua elemen dari daftar yang ditentukan ada dalam bidang larik. Operator ini berguna ketika Anda ingin mencocokkan entitas yang berisi beberapa nilai dalam larik.</p>
<p><strong>Contoh</strong></p>
<p>Jika Anda ingin menemukan semua entitas di mana larik <code translate="no">history_temperatures</code> berisi <code translate="no">23</code> dan <code translate="no">24</code>, Anda dapat menggunakan:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Ini akan mengembalikan semua entitas di mana larik <code translate="no">history_temperatures</code> berisi kedua nilai yang ditentukan.</p>
<h2 id="ARRAYCONTAINSANY" class="common-anchor-header">LARIK_BERISI_APA SAJA<button data-href="#ARRAYCONTAINSANY" class="anchor-icon" translate="no">
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
    </button></h2><p>Operator <code translate="no">ARRAY_CONTAINS_ANY</code> memeriksa apakah ada elemen dari daftar yang ditentukan yang ada dalam bidang larik. Ini berguna saat Anda ingin mencocokkan entitas yang mengandung setidaknya satu dari nilai yang ditentukan dalam larik.</p>
<p><strong>Contoh</strong></p>
<p>Untuk menemukan semua entitas di mana larik <code translate="no">history_temperatures</code> berisi <code translate="no">23</code> atau <code translate="no">24</code>, Anda dapat menggunakan:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Ini akan mengembalikan semua entitas di mana larik <code translate="no">history_temperatures</code> berisi setidaknya salah satu nilai <code translate="no">23</code> atau <code translate="no">24</code>.</p>
<h2 id="ARRAYLENGTH" class="common-anchor-header">ARRAY_LENGTH<button data-href="#ARRAYLENGTH" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">ARRAY_LENGTH</code> mengembalikan panjang (jumlah elemen) dari sebuah bidang larik. Ia menerima tepat satu parameter: pengenal bidang larik.</p>
<p><strong>Contoh</strong></p>
<p>Untuk menemukan semua entitas di mana larik <code translate="no">history_temperatures</code> memiliki kurang dari 10 elemen:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_LENGTH(history_temperatures) &lt; 10&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Ini akan mengembalikan semua entitas di mana larik <code translate="no">history_temperatures</code> memiliki kurang dari 10 elemen.</p>
