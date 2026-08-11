---
id: array-operators.md
title: Operator ARRAY
summary: >-
  Milvus menyediakan operator-operator yang canggih untuk melakukan kueri
  terhadap bidang-bidang array, sehingga Anda dapat menyaring dan mengambil
  entitas berdasarkan isi array tersebut.
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
    </button></h1><p>Milvus menyediakan operator yang kuat untuk melakukan kueri pada bidang array, sehingga Anda dapat menyaring dan mengambil entitas berdasarkan isi array.</p>
<div class="alert note">
<p>Semua elemen dalam sebuah array harus memiliki tipe yang sama, dan struktur bersarang di dalam array diperlakukan sebagai string biasa. Oleh karena itu, saat bekerja dengan bidang ARRAY, disarankan untuk menghindari penyarangan yang terlalu dalam dan memastikan bahwa struktur data Anda sedatar mungkin untuk kinerja yang optimal.</p>
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
    </button></h2><p>Operator ARRAY memungkinkan pencarian yang lebih terperinci pada bidang array di Milvus. Operator-operator tersebut adalah:</p>
<ul>
<li><p><a href="/docs/id/v2.6.x/array-operators.md#ARRAYCONTAINS"><code translate="no">ARRAY_CONTAINS(identifier, expr)</code></a>: memeriksa apakah elemen tertentu ada dalam bidang array.</p></li>
<li><p><a href="/docs/id/v2.6.x/array-operators.md#ARRAYCONTAINSALL"><code translate="no">ARRAY_CONTAINS_ALL(identifier, expr)</code></a>: memastikan bahwa semua elemen dari daftar yang ditentukan terdapat dalam bidang array.</p></li>
<li><p><a href="/docs/id/v2.6.x/array-operators.md#ARRAYCONTAINSANY"><code translate="no">ARRAY_CONTAINS_ANY(identifier, expr)</code></a>: memeriksa apakah ada elemen dari daftar yang ditentukan yang terdapat dalam bidang array.</p></li>
<li><p><a href="/docs/id/v2.6.x/array-operators.md#ARRAYLENGTH"><code translate="no">ARRAY_LENGTH(identifier)</code></a>: mengembalikan jumlah elemen dalam bidang array dan dapat digabungkan dengan operator perbandingan untuk penyaringan.</p></li>
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
    </button></h2><p>Operator ` <code translate="no">ARRAY_CONTAINS</code> ` memeriksa apakah suatu elemen tertentu terdapat dalam bidang array. Operator ini berguna ketika Anda ingin menemukan entitas di mana elemen tertentu terdapat dalam array.</p>
<p><strong>Contoh</strong></p>
<p>Misalkan Anda memiliki bidang array ` <code translate="no">history_temperatures</code>`, yang berisi suhu terendah yang tercatat untuk tahun-tahun yang berbeda. Untuk menemukan semua entitas di mana array tersebut mengandung nilai ` <code translate="no">23</code>`, Anda dapat menggunakan ekspresi filter berikut:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS(history_temperatures, 23)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Ini akan mengembalikan semua entitas di mana array ` <code translate="no">history_temperatures</code> ` berisi nilai ` <code translate="no">23</code>`.</p>
<h2 id="ARRAYCONTAINSALL" class="common-anchor-header">ARRAY_CONTAINS_ALL<button data-href="#ARRAYCONTAINSALL" class="anchor-icon" translate="no">
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
    </button></h2><p>Operator ` <code translate="no">ARRAY_CONTAINS_ALL</code> ` memastikan bahwa semua elemen dari daftar yang ditentukan terdapat dalam bidang array. Operator ini berguna ketika Anda ingin mencocokkan entitas yang mengandung beberapa nilai dalam array.</p>
<p><strong>Contoh</strong></p>
<p>Jika Anda ingin menemukan semua entitas di mana array ` <code translate="no">history_temperatures</code> ` berisi baik ` <code translate="no">23</code> ` maupun ` <code translate="no">24</code>`, Anda dapat menggunakan:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Ini akan mengembalikan semua entitas di mana array ` <code translate="no">history_temperatures</code> ` berisi kedua nilai yang ditentukan.</p>
<h2 id="ARRAYCONTAINSANY" class="common-anchor-header">ARRAY_CONTAINS_ANY<button data-href="#ARRAYCONTAINSANY" class="anchor-icon" translate="no">
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
    </button></h2><p>Operator ` <code translate="no">ARRAY_CONTAINS_ANY</code> ` memeriksa apakah salah satu elemen dari daftar yang ditentukan terdapat dalam bidang array. Ini berguna ketika Anda ingin mencocokkan entitas yang mengandung setidaknya satu dari nilai yang ditentukan dalam array.</p>
<p><strong>Contoh</strong></p>
<p>Untuk menemukan semua entitas di mana array ` <code translate="no">history_temperatures</code> ` berisi salah satu dari ` <code translate="no">23</code> ` atau ` <code translate="no">24</code>`, Anda dapat menggunakan:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Ini akan mengembalikan semua entitas di mana array ` <code translate="no">history_temperatures</code> ` berisi setidaknya salah satu dari nilai ` <code translate="no">23</code> ` atau ` <code translate="no">24</code>`.</p>
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
    </button></h2><p><code translate="no">ARRAY_LENGTH</code> mengembalikan panjang (jumlah elemen) dari bidang array. Fungsi ini menerima tepat satu parameter: pengenal bidang array.</p>
<p><strong>Contoh</strong></p>
<p>Untuk menemukan semua entitas di mana array ` <code translate="no">history_temperatures</code> ` memiliki kurang dari 10 elemen:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_LENGTH(history_temperatures) &lt; 10&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Ini akan mengembalikan semua entitas di mana array ` <code translate="no">history_temperatures</code> ` memiliki kurang dari 10 elemen.</p>
