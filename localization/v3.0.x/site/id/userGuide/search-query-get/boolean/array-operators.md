---
id: array-operators.md
title: Operator ARRAY
summary: >-
  Milvus menyediakan operator ARRAY untuk menyaring bidang ARRAY dan memperbarui
  sebagian nilai bidang ARRAY.
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
    </button></h1><p>Milvus menyediakan operator ARRAY untuk menyaring bidang ARRAY dan memperbarui sebagian nilai bidang ARRAY.</p>
<div class="alert note">
<p>Semua elemen dalam sebuah array harus memiliki tipe yang sama, dan struktur bersarang di dalam array diperlakukan sebagai string biasa. Oleh karena itu, saat bekerja dengan bidang ARRAY, disarankan untuk menghindari penyarangan yang terlalu dalam dan memastikan bahwa struktur data Anda sedatar mungkin untuk kinerja yang optimal.</p>
</div>
<p>Operator ARRAY di Milvus mencakup dua skenario penggunaan:</p>
<ul>
<li><p>Ekspresi penyaringan untuk kueri dan pencarian.</p></li>
<li><p>Pembaruan sebagian dalam perminta <code translate="no">upsert</code>.</p></li>
</ul>
<h2 id="Available-ARRAY-operators" class="common-anchor-header">Operator ARRAY yang tersedia<button data-href="#Available-ARRAY-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Tabel berikut mencantumkan operator ARRAY yang tersedia di Milvus.</p>
<table>
<thead>
<tr><th>Operator</th><th>Digunakan dalam</th><th>Deskripsi</th></tr>
</thead>
<tbody>
<tr><td><a href="/docs/id/array-operators.md#ARRAYCONTAINS">ARRAY_CONTAINS(pengidentifikasi, ekspresi)</a></td><td>Ekspresi filter</td><td>Memeriksa apakah elemen tertentu ada dalam bidang ARRAY.</td></tr>
<tr><td><a href="/docs/id/array-operators.md#ARRAYCONTAINSALL">ARRAY_CONTAINS_ALL(pengidentifikasi, ekspresi)</a></td><td>Ekspresi filter</td><td>Memeriksa apakah semua elemen dalam daftar yang ditentukan terdapat dalam bidang ARRAY.</td></tr>
<tr><td><a href="/docs/id/array-operators.md#ARRAYCONTAINSANY">ARRAY_CONTAINS_ANY(pengidentifikasi, ekspresi)</a></td><td>Ekspresi filter</td><td>Memeriksa apakah ada elemen dalam daftar yang ditentukan yang terdapat dalam bidang ARRAY.</td></tr>
<tr><td><a href="/docs/id/array-operators.md#ARRAYLENGTH">ARRAY_LENGTH(pengidentifikasi)</a></td><td>Ekspresi filter</td><td>Mengembalikan jumlah elemen dalam bidang ARRAY dan dapat digabungkan dengan operator perbandingan untuk penyaringan.</td></tr>
<tr><td><a href="/docs/id/array-operators.md#ARRAYAPPEND">ARRAY_APPEND</a></td><td><code translate="no">upsert</code> dengan <code translate="no">field_ops</code></td><td>Menambahkan elemen muatan ke bidang ARRAY yang sudah ada. Tersedia di Milvus v2.6.17 dan versi selanjutnya.</td></tr>
<tr><td><a href="/docs/id/array-operators.md#ARRAYREMOVE">ARRAY_REMOVE</a></td><td><code translate="no">upsert</code> dengan <code translate="no">field_ops</code></td><td>Menghapus setiap elemen dari bidang ARRAY yang sudah ada yang cocok dengan nilai dalam payload permintaan. Tersedia di Milvus v2.6.17 dan yang lebih baru.</td></tr>
</tbody>
</table>
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
    </button></h2><p>Operator ` <code translate="no">ARRAY_CONTAINS</code> ` memeriksa apakah elemen tertentu ada dalam bidang array. Operator ini berguna saat Anda ingin menemukan entitas di mana elemen tertentu terdapat dalam array.</p>
<p><strong>Contoh</strong></p>
<p>Misalkan Anda memiliki bidang array ` <code translate="no">history_temperatures</code>`, yang berisi suhu terendah yang tercatat untuk tahun-tahun yang berbeda. Untuk menemukan semua entitas di mana array tersebut berisi nilai ` <code translate="no">23</code>`, Anda dapat menggunakan ekspresi filter berikut:</p>
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
    </button></h2><p>Operator ` <code translate="no">ARRAY_CONTAINS_ALL</code> ` memastikan bahwa semua elemen dari daftar yang ditentukan terdapat dalam bidang array. Operator ini berguna saat Anda ingin mencocokkan entitas yang mengandung beberapa nilai dalam array.</p>
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
<h2 id="ARRAYAPPEND--Milvus-2617+" class="common-anchor-header">ARRAY_APPEND<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.17+</span><button data-href="#ARRAYAPPEND--Milvus-2617+" class="anchor-icon" translate="no">
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
    </button></h2><p>Operator ` <code translate="no">ARRAY_APPEND</code> ` menambahkan elemen payload ke bidang ARRAY yang sudah ada selama permintaan ` <code translate="no">upsert</code> `. Ini bukan ekspresi filter. Gunakan operator ini saat Anda ingin menambahkan nilai ke array tanpa terlebih dahulu menanyakan nilai array saat ini.</p>
<p>Contoh Python berikut menambahkan ` <code translate="no">&quot;premium&quot;</code> ` ke bidang ARRAY ` <code translate="no">tags</code> ` dari entitas yang kunci utamanya adalah ` <code translate="no">1</code>`:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldOp, MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

client.upsert(
    collection_name=<span class="hljs-string">&quot;users&quot;</span>,
    data=[{<span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;premium&quot;</span>]}],
<span class="highlighted-wrapper-line">    field_ops={<span class="hljs-string">&quot;tags&quot;</span>: FieldOp.array_append()},</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Menambahkan ` <code translate="no">ARRAY_APPEND</code> ` ke bidang melalui ` <code translate="no">field_ops</code> ` mengaktifkan semantik pembaruan parsial untuk bidang tersebut. Untuk alur kerja lengkap, jenis elemen yang didukung, dan batasan, lihat <a href="/docs/id/upsert-entities.md#Upsert-ARRAY-fields-in-merge-mode">Bidang ARRAY Upsert dalam mode penggabungan</a>.</p>
<h2 id="ARRAYREMOVE--Milvus-2617+" class="common-anchor-header">ARRAY_REMOVE<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.17+</span><button data-href="#ARRAYREMOVE--Milvus-2617+" class="anchor-icon" translate="no">
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
    </button></h2><p>Operator ` <code translate="no">ARRAY_REMOVE</code> ` menghapus setiap elemen dari bidang ARRAY yang ada yang cocok dengan nilai dalam muatan permintaan selama permintaan ` <code translate="no">upsert</code> `. Ini bukan ekspresi filter. Gunakan ini saat Anda ingin menghapus nilai yang cocok dari array tanpa terlebih dahulu menanyakan nilai array saat ini.</p>
<p>Contoh Python berikut menghapus ` <code translate="no">&quot;trial&quot;</code> ` dari bidang ARRAY ` <code translate="no">tags</code> ` entitas yang memiliki kunci utama ` <code translate="no">1</code>`:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldOp, MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

client.upsert(
    collection_name=<span class="hljs-string">&quot;users&quot;</span>,
    data=[{<span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;trial&quot;</span>]}],
<span class="highlighted-wrapper-line">    field_ops={<span class="hljs-string">&quot;tags&quot;</span>: FieldOp.array_remove()},</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Menambahkan ` <code translate="no">ARRAY_REMOVE</code> ` ke suatu bidang melalui ` <code translate="no">field_ops</code> ` mengaktifkan semantik pembaruan parsial untuk bidang tersebut. Untuk alur kerja lengkap, jenis elemen yang didukung, dan batasan, lihat <a href="/docs/id/upsert-entities.md#Upsert-ARRAY-fields-in-merge-mode">bidang ARRAY Upsert dalam mode penggabungan</a>.</p>
