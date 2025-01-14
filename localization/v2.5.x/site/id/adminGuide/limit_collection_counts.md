---
id: limit_collection_counts.md
title: Tetapkan Batas Jumlah Penagihan
---
<h1 id="Limit-Collection-Counts" class="common-anchor-header">Batasi Jumlah Koleksi<button data-href="#Limit-Collection-Counts" class="anchor-icon" translate="no">
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
    </button></h1><p>Sebuah instance Milvus memungkinkan hingga 65.536 koleksi. Namun, koleksi yang terlalu banyak dapat menyebabkan masalah kinerja. Oleh karena itu, disarankan untuk membatasi jumlah koleksi yang dibuat dalam sebuah instans Milvus.</p>
<p>Panduan ini menyediakan instruksi tentang cara menetapkan batasan jumlah koleksi dalam sebuah instans Milvus.</p>
<p>Konfigurasi bervariasi tergantung pada cara Anda menginstal instans Milvus.</p>
<ul>
<li><p>Untuk instans Milvus yang diinstal menggunakan Helm Charts</p>
<p>Tambahkan konfigurasi ke file <code translate="no">values.yaml</code> di bawah bagian <code translate="no">config</code>. Untuk detailnya, lihat <a href="/docs/id/configure-helm.md">Mengonfigurasi Milvus dengan Helm Charts</a>.</p></li>
<li><p>Untuk instans Milvus yang diinstal menggunakan Docker Compose</p>
<p>Tambahkan konfigurasi ke berkas <code translate="no">milvus.yaml</code> yang Anda gunakan untuk memulai instans Milvus. Untuk detailnya, lihat <a href="/docs/id/configure-docker.md">Mengkonfigurasi Milvus dengan Docker Compose</a>.</p></li>
<li><p>Untuk instans Milvus yang diinstal menggunakan Operator</p>
<p>Tambahkan konfigurasi ke bagian <code translate="no">spec.components</code> pada sumber daya kustom <code translate="no">Milvus</code>. Untuk detailnya, lihat <a href="/docs/id/configure_operator.md">Mengkonfigurasi Milvus dengan Operator</a>.</p></li>
</ul>
<h2 id="Configuration-options" class="common-anchor-header">Opsi konfigurasi<button data-href="#Configuration-options" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-yaml">rootCoord:
    maxGeneralCapacity: 65536
<button class="copy-code-btn"></button></code></pre>
<p>Parameter <code translate="no">maxGeneralCapacity</code> mengatur jumlah maksimum koleksi yang dapat ditampung oleh instans Milvus saat ini. Nilai defaultnya adalah <code translate="no">65536</code>.</p>
<h2 id="Calculating-the-number-of-collections" class="common-anchor-header">Menghitung jumlah koleksi<button data-href="#Calculating-the-number-of-collections" class="anchor-icon" translate="no">
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
    </button></h2><p>Dalam sebuah koleksi, Anda bisa mengatur beberapa pecahan dan partisi. Pecahan adalah unit logika yang digunakan untuk mendistribusikan operasi penulisan data di antara beberapa simpul data. Partisi adalah unit logika yang digunakan untuk meningkatkan efisiensi pengambilan data dengan hanya memuat sebagian data koleksi. Ketika menghitung jumlah koleksi dalam instance Milvus saat ini, Anda juga perlu menghitung pecahan dan partisi.</p>
<p>Sebagai contoh, anggaplah Anda telah membuat <strong>100</strong> koleksi, dengan <strong>2</strong> pecahan dan <strong>4</strong> partisi di <strong>60</strong> koleksi dan dengan <strong>1</strong> pecahan dan <strong>12</strong> partisi di <strong>40</strong> koleksi lainnya. Jumlah total unit koleksi (dihitung sebagai <code translate="no">shards × partitions</code>) dapat ditentukan sebagai berikut:</p>
<pre><code translate="no">60 (collections) x 2 (shards) x 4 (partitions) + 40 (collections) x 1 (shard) x 12 (partitions) = 960
<button class="copy-code-btn"></button></code></pre>
<p>Dalam contoh ini, jumlah total 960 unit koleksi yang dihitung mewakili penggunaan saat ini. <code translate="no">maxGeneralCapacity</code> mendefinisikan jumlah maksimum unit koleksi yang dapat didukung oleh sebuah instans, yang diatur ke <code translate="no">65536</code> secara default. Ini berarti instance dapat menampung hingga 65.536 unit koleksi. Jika jumlah total melebihi batas ini, sistem akan menampilkan pesan kesalahan berikut:</p>
<pre><code translate="no" class="language-shell">failed checking constraint: sum_collections(parition*shard) exceeding the <span class="hljs-built_in">max</span> general capacity:
<button class="copy-code-btn"></button></code></pre>
<p>Untuk menghindari kesalahan ini, Anda bisa mengurangi jumlah pecahan atau partisi dalam koleksi yang sudah ada atau yang baru, menghapus beberapa koleksi, atau menambah nilai <code translate="no">maxGeneralCapacity</code>.</p>
