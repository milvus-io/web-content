---
id: bitmap.md
title: BITMAP
related_key: bitmap
summary: >-
  Pengindeksan Bitmap adalah teknik pengindeksan yang efisien yang dirancang
  untuk meningkatkan kinerja kueri pada bidang skalar dengan kardinalitas
  rendah.
---
<h1 id="BITMAP​" class="common-anchor-header">BITMAP<button data-href="#BITMAP​" class="anchor-icon" translate="no">
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
    </button></h1><p>Pengindeksan Bitmap adalah teknik pengindeksan yang efisien yang dirancang untuk meningkatkan performa kueri pada bidang skalar dengan kardinalitas rendah. Kardinalitas mengacu pada jumlah nilai yang berbeda dalam suatu bidang. Bidang dengan lebih sedikit elemen yang berbeda dianggap memiliki kardinalitas rendah.</p>
<p>Jenis indeks ini membantu mengurangi waktu pengambilan kueri skalar dengan merepresentasikan nilai bidang dalam format biner yang ringkas dan melakukan operasi bitwise yang efisien. Dibandingkan dengan jenis indeks lainnya, indeks bitmap biasanya memiliki efisiensi ruang yang lebih tinggi dan kecepatan kueri yang lebih cepat saat berurusan dengan bidang dengan kardinalitas rendah.</p>
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
    </button></h2><p>Istilah Bitmap menggabungkan dua kata: <strong>Bit</strong> dan <strong>Peta</strong>. Bit mewakili unit data terkecil dalam komputer, yang hanya dapat menyimpan nilai <strong>0</strong> atau <strong>1</strong>. Peta, dalam konteks ini, mengacu pada proses mengubah dan mengatur data sesuai dengan nilai apa yang harus diberikan pada 0 dan 1.</p>
<p>Indeks bitmap terdiri dari dua komponen utama: bitmap dan kunci. Kunci mewakili nilai unik dalam bidang yang diindeks. Untuk setiap nilai unik, ada bitmap yang sesuai. Panjang bitmap ini sama dengan jumlah record dalam koleksi. Setiap bit dalam bitmap berhubungan dengan sebuah record dalam koleksi. Jika nilai bidang yang diindeks dalam sebuah rekaman cocok dengan kunci, bit yang sesuai diset ke <strong>1</strong>; jika tidak, bit tersebut diset ke <strong>0</strong>.</p>
<p>Pertimbangkan sebuah koleksi dokumen dengan bidang <strong>Kategori</strong> dan <strong>Publik</strong>. Kita ingin mengambil dokumen yang termasuk dalam kategori <strong>Teknologi</strong> dan terbuka untuk <strong>Publik</strong>. Dalam kasus ini, kunci untuk indeks bitmap kita adalah <strong>Tech</strong> dan <strong>Public</strong>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/bitmap.png" alt="Bitmap indexing" class="doc-image" id="bitmap-indexing" />
   </span> <span class="img-wrapper"> <span>Pengindeksan bitmap</span> </span></p>
<p>Seperti yang ditunjukkan pada gambar, indeks bitmap untuk <strong>Kategori</strong> dan <strong>Publik</strong> adalah.</p>
<ul>
<li><p><strong>Tech</strong>: [1, 0, 1, 0, 0], yang menunjukkan bahwa hanya dokumen ke-1 dan ke-3 yang masuk ke dalam kategori <strong>Teknologi</strong>.</p></li>
<li><p><strong>Publik</strong>: [1, 0, 0, 1, 0], yang menunjukkan bahwa hanya dokumen ke-1 dan ke-4 yang terbuka untuk <strong>Publik</strong>.</p></li>
</ul>
<p>Untuk menemukan dokumen yang sesuai dengan kedua kriteria tersebut, kita melakukan operasi bitwise AND pada kedua bitmap ini.</p>
<ul>
<li><strong>Teknologi</strong> DAN <strong>Publik</strong>: [1, 0, 0, 0, 0]</li>
</ul>
<p>Bitmap yang dihasilkan [1, 0, 0, 0, 0] mengindikasikan bahwa hanya dokumen pertama<strong>(ID</strong> <strong>1</strong>) yang memenuhi kedua kriteria. Dengan menggunakan indeks bitmap dan operasi bitwise yang efisien, kita dapat dengan cepat mempersempit cakupan pencarian, sehingga tidak perlu memindai seluruh kumpulan data.</p>
<h2 id="Create-a-bitmap-index" class="common-anchor-header">Membuat indeks bitmap<button data-href="#Create-a-bitmap-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk membuat indeks bitmap di Milvus, gunakan metode <code translate="no">create_index()</code> dan atur parameter <code translate="no">index_type</code> ke <code translate="no">&quot;BITMAP&quot;</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient​
​
index_params = client.create_index_params() <span class="hljs-comment"># Prepare an empty IndexParams object, without having to specify any index parameters​</span>
index_params.add_index(​
    field_name=<span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-comment"># Name of the scalar field to be indexed​</span>
    index_type=<span class="hljs-string">&quot;BITMAP&quot;</span>, <span class="hljs-comment"># Type of index to be created​</span>
    index_name=<span class="hljs-string">&quot;category_bitmap_index&quot;</span> <span class="hljs-comment"># Name of the index to be created​</span>
)​
​
client.create_index(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment"># Specify the collection name​</span>
    index_params=index_params​
)​

<button class="copy-code-btn"></button></code></pre>
<p>Pada contoh ini, kita membuat indeks bitmap pada bidang <code translate="no">category</code> dari koleksi <code translate="no">my_collection</code>. Metode <code translate="no">add_index()</code> digunakan untuk menentukan nama field, tipe indeks, dan nama indeks.</p>
<p>Setelah indeks bitmap dibuat, Anda dapat menggunakan parameter <code translate="no">filter</code> dalam operasi kueri untuk melakukan pemfilteran skalar berdasarkan bidang yang diindeks. Hal ini memungkinkan Anda mempersempit hasil pencarian secara efisien dengan menggunakan indeks bitmap. Untuk informasi lebih lanjut, lihat Pemfilteran <a href="/docs/id/boolean.md">Metadata</a>.</p>
<h2 id="Limits" class="common-anchor-header">Batasan<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>Indeks bitmap hanya didukung untuk bidang skalar yang bukan merupakan kunci utama.</p></li>
<li><p>Tipe data bidang harus merupakan salah satu dari yang berikut ini.</p>
<ul>
<li><p><code translate="no">BOOL</code>, <code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>, <code translate="no">VARCHAR</code></p></li>
<li><p><code translate="no">ARRAY</code> (elemen harus salah satu dari: <code translate="no">BOOL</code>, <code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>, <code translate="no">VARCHAR</code>)</p></li>
</ul></li>
<li><p>Indeks Bitmap tidak mendukung tipe data berikut ini.</p>
<ul>
<li><p><code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>: Tipe floating-point tidak kompatibel dengan sifat biner indeks bitmap.</p></li>
<li><p><code translate="no">JSON</code>: Tipe data JSON memiliki struktur kompleks yang tidak dapat direpresentasikan secara efisien menggunakan indeks bitmap.</p></li>
</ul></li>
<li><p>Indeks bitmap tidak cocok untuk bidang dengan kardinalitas tinggi (yaitu, bidang dengan sejumlah besar nilai yang berbeda).</p>
<ul>
<li><p>Sebagai pedoman umum, indeks bitmap paling efektif bila kardinalitas bidang kurang dari 500.</p></li>
<li><p>Ketika kardinalitas meningkat melebihi ambang batas ini, manfaat kinerja indeks bitmap berkurang, dan overhead penyimpanan menjadi signifikan.</p></li>
<li><p>Untuk bidang dengan kardinalitas tinggi, pertimbangkan untuk menggunakan teknik pengindeksan alternatif seperti indeks terbalik, tergantung pada kasus penggunaan dan persyaratan kueri Anda.</p></li>
</ul></li>
</ul>
