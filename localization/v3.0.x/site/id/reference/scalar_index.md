---
id: scalar_index.md
related_key: scalar_index
summary: >-
  Indeks skalar mempercepat proses penyaringan pada bidang non-vektor. Referensi
  ini menjelaskan cara Milvus memilih indeks skalar, jenis indeks apa saja yang
  dapat Anda tentukan, serta tipe data yang didukung oleh masing-masing indeks.
title: Indeks Skalar
---
<h1 id="Scalar-Index" class="common-anchor-header">Indeks Skalar<button data-href="#Scalar-Index" class="anchor-icon" translate="no">
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
    </button></h1><p>Indeks skalar mempercepat proses penyaringan pada bidang non-vektor, seperti kategori, harga, cap waktu, dan lokasi. Saat ekspresi filter mempersempit hasil pencarian, indeks skalar memungkinkan Milvus menemukan entitas yang cocok tanpa perlu memindai bidang tersebut.</p>
<p>Jika Anda tidak yakin indeks mana yang harus dipilih, gunakan <code translate="no">AUTOINDEX</code>. Tentukan jenis indeks secara manual hanya jika Anda memerlukan perilaku tertentu.</p>
<h2 id="Choosing-a-scalar-index" class="common-anchor-header">Memilih indeks skalar<button data-href="#Choosing-a-scalar-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Tabel berikut mencantumkan indeks yang dipilih Milvus secara default saat Anda menggunakan <code translate="no">AUTOINDEX</code>, beserta jenis indeks yang dapat Anda tentukan secara manual untuk setiap tipe data.</p>
<table>
<thead>
<tr><th>Tipe data</th><th>Default AUTOINDEX</th><th>Jenis indeks manual</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td><code translate="no">BITMAP</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code></td></tr>
<tr><td><code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code>, <code translate="no">TRIE</code>, <code translate="no">NGRAM</code>, <code translate="no">FMINDEX</code></td></tr>
<tr><td><code translate="no">TIMESTAMPTZ</code></td><td><code translate="no">STL_SORT</code></td><td><code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">GEOMETRY</code></td><td><code translate="no">RTREE</code></td><td><code translate="no">RTREE</code></td></tr>
<tr><td><code translate="no">JSON</code> dengan pengonversian tipe skalar atau array</td><td><code translate="no">HYBRID</code></td><td>Bergantung pada <code translate="no">json_cast_type</code>; lihat <a href="#JSON-field-indexing">pengindeksan bidang JSON</a>.</td></tr>
<tr><td><code translate="no">JSON</code> dengan <code translate="no">json_cast_type=&quot;JSON&quot;</code></td><td><code translate="no">INVERTED</code></td><td><code translate="no">INVERTED</code></td></tr>
<tr><td><code translate="no">ARRAY&lt;BOOL&gt;</code></td><td><code translate="no">BITMAP</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY&lt;INT8&gt;</code> melalui <code translate="no">ARRAY&lt;INT64&gt;</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY&lt;FLOAT&gt;</code>, <code translate="no">ARRAY&lt;DOUBLE&gt;</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY&lt;VARCHAR&gt;</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">TEXT</code></td><td>Tidak didukung</td><td>Tidak ada</td></tr>
</tbody>
</table>
<p><code translate="no">HYBRID</code> adalah strategi internal, bukan tipe yang dapat Anda tentukan secara langsung. Lihat <a href="#How-AUTOINDEX-selects">Cara AUTOINDEX melakukan pemilihan</a>.</p>
<p>Pembatasan berikut berlaku:</p>
<ul>
<li><strong>Kunci utama:</strong> <code translate="no">BITMAP</code> tidak tersedia pada kolom kunci utama.</li>
<li><strong>Array:</strong> Array rekursif dan array dengan elemen yang dapat bernilai null tidak mendukung pengindeksan skalar, termasuk <code translate="no">AUTOINDEX</code>. Array biasa mendukung elemen Boolean, integer, floating-point, dan VARCHAR.</li>
<li><strong>Array struktur:</strong> Indeks subbidang skalar secara individual. Dukungan terhadapnya dapat berbeda dari array biasa; misalnya, subbidang struktur Boolean tidak mendukung <code translate="no">STL_SORT</code> eksplisit.</li>
<li><strong>TEXT:</strong> Indeks skalar yang dibuat pengguna, termasuk <code translate="no">AUTOINDEX</code>, tidak tersedia. Analisis teks dan pencarian BM25 menggunakan mekanisme terpisah.</li>
</ul>
<h2 id="Index-types" class="common-anchor-header">Jenis indeks<button data-href="#Index-types" class="anchor-icon" translate="no">
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
<tr><th>Jenis indeks</th><th>Kegunaannya</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">INVERTED</code></td><td>Filter kesetaraan, keanggotaan, dan rentang untuk keperluan umum.</td></tr>
<tr><td><code translate="no">BITMAP</code></td><td>Kolom dengan sedikit nilai unik; penyaringan bitwise yang ringkas.</td></tr>
<tr><td><code translate="no">STL_SORT</code></td><td>Pencarian nilai yang diurutkan dan penyaringan rentang.</td></tr>
<tr><td><code translate="no">TRIE</code></td><td>Kesetaraan string dan pencocokan awalan.</td></tr>
<tr><td><code translate="no">NGRAM</code></td><td>LIKE dan regex pada string dengan mempersempit kandidat.</td></tr>
<tr><td><code translate="no">FMINDEX</code></td><td>Pencocokan substring awalan, akhiran, dan infiks yang tepat.</td></tr>
<tr><td><code translate="no">RTREE</code></td><td>Penyaringan spasial pada kolom GEOMETRY.</td></tr>
</tbody>
</table>
<p>Untuk contoh pembuatan, parameter indeks, dan kueri yang didukung, lihat <a href="/docs/id/bitmap.md">BITMAP</a>, <a href="/docs/id/inverted.md">INVERTED</a>, <a href="/docs/id/ngram.md">NGRAM</a>, <a href="/docs/id/stl-sort.md">STL_SORT</a>, <a href="/docs/id/trie.md">TRIE</a>, <a href="/docs/id/fmindex.md">FMINDEX</a>, dan <a href="/docs/id/rtree.md">RTREE</a>.</p>
<h2 id="How-AUTOINDEX-selects" class="common-anchor-header">Cara AUTOINDEX memilih<button data-href="#How-AUTOINDEX-selects" class="anchor-icon" translate="no">
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
    </button></h2><p>Dengan <code translate="no">AUTOINDEX</code>, Milvus memilih indeks berdasarkan tipe bidang, konfigurasi server, dan, untuk beberapa bidang, jumlah nilai unik (kardinalitas). Pilihan default tercantum dalam <a href="#Choosing-a-scalar-index">Memilih indeks skalar</a>.</p>
<p>Untuk sebagian besar bidang, <code translate="no">AUTOINDEX</code> menggunakan strategi internal " <code translate="no">HYBRID</code> " yang memilih indeks berdasarkan kardinalitas:</p>
<ul>
<li><strong><code translate="no">BITMAP</code></strong> ketika build berisi kurang dari 100 nilai unik.</li>
<li><strong><code translate="no">STL_SORT</code></strong> ketika sebuah build berisi 100 atau lebih nilai unik.</li>
</ul>
<p>Indeks array menggunakan kebijakan kompatibilitas terpisah: cabang kardinalitas tinggi mereka menggunakan " <code translate="no">STL_SORT</code> " jika kluster mendukungnya, dan " <code translate="no">INVERTED</code> " jika tidak. Lihat " <a href="#Version-compatibility">Kompatibilitas Versi</a>".</p>
<p><code translate="no">HYBRID</code> hanya bersifat internal — Anda tidak dapat menentukannya secara langsung. Pemilihan internal juga dapat menggunakan indeks yang tidak tersedia sebagai pilihan eksplisit untuk bidang tersebut, seperti pengindeksan bitmap untuk nilai floating-point.</p>
<blockquote>
<p>Pilihan-pilihan ini adalah pengaturan default. Administrator dapat mengubahnya melalui <code translate="no">scalarAutoIndex.params.build</code>. Pengaturan <code translate="no">scalarAutoIndex.enable</code> secara default diatur ke <code translate="no">false</code>, yang masih memungkinkan penggunaan <code translate="no">AUTOINDEX</code> dan pemilihan eksplisit saat jenis indeks diabaikan; mengaturnya ke <code translate="no">true</code> juga menerapkan pemilihan otomatis pada permintaan manual yang valid.</p>
</blockquote>
<h2 id="JSON-field-indexing" class="common-anchor-header">Pengindeksan bidang JSON<button data-href="#JSON-field-indexing" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk mengindeks nilai JSON, tentukan ` <code translate="no">json_cast_type</code> ` untuk menunjukkan jenis nilai yang akan diindeks. Parameter ini wajib untuk pengindeksan otomatis maupun manual. Gunakan ` <code translate="no">json_path</code> ` untuk mengidentifikasi jalur; jika diabaikan, Milvus menggunakan nama bidang yang disediakan dalam permintaan.</p>
<table>
<thead>
<tr><th>json_cast_type</th><th>AUTOINDEX default</th><th>Jenis indeks manual</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code></td></tr>
<tr><td><code translate="no">DOUBLE</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code>, <code translate="no">NGRAM</code></td></tr>
<tr><td><code translate="no">ARRAY_BOOL</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY_DOUBLE</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY_VARCHAR</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">JSON</code></td><td><code translate="no">INVERTED</code></td><td><code translate="no">INVERTED</code></td></tr>
</tbody>
</table>
<p>Konversi ` <code translate="no">JSON</code> ` memilih pengindeksan JSON lengkap daripada indeks jalur skalar bertipe, dan mengubah nilai default ` <code translate="no">AUTOINDEX</code> ` dari ` <code translate="no">HYBRID</code> ` menjadi ` <code translate="no">INVERTED</code>`.</p>
<p>Konversi opsional ` <code translate="no">json_cast_function=&quot;STRING_TO_DOUBLE&quot;</code> ` mengubah nilai string untuk konversi ` <code translate="no">DOUBLE</code> `. Konversi ini tidak dapat digunakan dengan jenis konversi lainnya. Baik ` <code translate="no">TRIE</code> ` maupun ` <code translate="no">FMINDEX</code> ` tidak mendukung bidang JSON.</p>
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
    </button></h2><p>Tabel berikut menunjukkan predikat mana yang dapat dievaluasi oleh masing-masing indeks. <strong>Dukungan indeks tidak menjamin bahwa Milvus akan menggunakan indeks tersebut untuk setiap kueri.</strong> Milvus dapat memindai data bidang jika indeks <strong>tidak</strong> sesuai untuk ekspresi atau pola tertentu.</p>
<h3 id="Comparisons-and-membership" class="common-anchor-header">Perbandingan dan keanggotaan<button data-href="#Comparisons-and-membership" class="anchor-icon" translate="no">
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
    </button></h3><p>Kesetaraan dan keanggotaan meliputi <code translate="no">==</code>, <code translate="no">!=</code>, <code translate="no">in</code>, dan <code translate="no">not in</code>. Perbandingan rentang meliputi <code translate="no">&lt;</code>, <code translate="no">&lt;=</code>, <code translate="no">&gt;</code>, <code translate="no">&gt;=</code>, dan ekspresi seperti <code translate="no">10 &lt;= price &lt; 50</code>.</p>
<table>
<thead>
<tr><th>Tipe indeks</th><th>Tipe data bidang</th><th>Predikat yang didukung oleh indeks</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">INVERTED</code></td><td><code translate="no">BOOL</code></td><td>Kesetaraan dan keanggotaan</td></tr>
<tr><td><code translate="no">INVERTED</code></td><td>Bilangan bulat, <code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>, <code translate="no">VARCHAR</code></td><td>Kesetaraan, keanggotaan, dan rentang</td></tr>
<tr><td><code translate="no">BITMAP</code></td><td><code translate="no">BOOL</code></td><td>Kesamaan dan keanggotaan</td></tr>
<tr><td><code translate="no">BITMAP</code></td><td>Bilangan bulat, <code translate="no">VARCHAR</code></td><td>Kesetaraan, keanggotaan, dan rentang</td></tr>
<tr><td><code translate="no">STL_SORT</code></td><td>Bilangan bulat, <code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>, <code translate="no">TIMESTAMPTZ</code>, <code translate="no">VARCHAR</code></td><td>Kesetaraan, keanggotaan, dan rentang</td></tr>
<tr><td><code translate="no">TRIE</code></td><td><code translate="no">VARCHAR</code></td><td>Kesetaraan, keanggotaan, dan rentang; evaluasi rentang dapat mengunjungi beberapa string terindeks</td></tr>
<tr><td><code translate="no">NGRAM</code></td><td><code translate="no">VARCHAR</code></td><td>Hanya pola string; tidak ada perbandingan kesetaraan langsung, keanggotaan, atau pencarian rentang</td></tr>
<tr><td><code translate="no">FMINDEX</code></td><td><code translate="no">VARCHAR</code></td><td>Hanya pola string; tidak ada pencarian kesetaraan, keanggotaan, atau rentang secara langsung</td></tr>
<tr><td><code translate="no">RTREE</code></td><td><code translate="no">GEOMETRY</code></td><td>Predikat spasial, tercantum di bawah ini</td></tr>
<tr><td><code translate="no">AUTOINDEX</code></td><td>Tipe skalar yang didukung</td><td>Tergantung pada indeks yang dipilih. Pemilihan internal <code translate="no">HYBRID</code> menggunakan kemampuan indeks bitmap, indeks terurut, atau indeks terbaliknya.</td></tr>
</tbody>
</table>
<p>Rentang VARCHAR membandingkan nilai string, bukan menafsirkannya sebagai angka. Tabel ini hanya menjelaskan perbandingan terhadap nilai literal; ini tidak berarti bahwa ekspresi aritmatika atau perbandingan antara dua bidang mendapatkan akselerasi indeks yang sama.</p>
<h3 id="String-patterns" class="common-anchor-header">Pola string<button data-href="#String-patterns" class="anchor-icon" translate="no">
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
    </button></h3><p>Tabel ini berlaku untuk kolom VARCHAR. Untuk jalur string JSON, gunakan indeks dan konversi " <code translate="no">VARCHAR</code> " yang didukung oleh tabel pengindeksan JSON; perilaku string yang sesuai berlaku.</p>
<ul>
<li><strong>Ya:</strong> Indeks mengembalikan kecocokan yang tepat.</li>
<li><strong>Periksa nilai yang diindeks:</strong> Milvus mengevaluasi pola terhadap string yang disimpan dalam indeks, yang mungkin memerlukan pemeriksaan terhadap banyak string yang berbeda.</li>
<li><strong>Kandidat:</strong> Indeks mempersempit kemungkinan kecocokan, kemudian Milvus memeriksa nilai aslinya.</li>
<li><strong>Pemindaian:</strong> Indeks tidak memenuhi predikat; Milvus menggunakan jalur lain yang memenuhi syarat atau memindai bidang tersebut.</li>
</ul>
<table>
<thead>
<tr><th>Jenis indeks</th><th>Awalan <code translate="no">like &quot;abc%&quot;</code></th><th>Sufiks <code translate="no">like &quot;%abc&quot;</code></th><th>Substring <code translate="no">like &quot;%abc%&quot;</code></th><th>LIKE umum <code translate="no">like &quot;a%b_c&quot;</code></th><th>Regex <code translate="no">=~ &quot;a.*b&quot;</code></th></tr>
</thead>
<tbody>
<tr><td><code translate="no">INVERTED</code></td><td>Ya</td><td>Pindai</td><td>Pindai</td><td>Ya</td><td>Pindai</td></tr>
<tr><td><code translate="no">BITMAP</code></td><td>Periksa nilai yang diindeks</td><td>Periksa nilai-nilai yang diindeks</td><td>Periksa nilai-nilai terindeks</td><td>Periksa nilai-nilai yang diindeks</td><td>Periksa nilai-nilai yang diindeks</td></tr>
<tr><td><code translate="no">STL_SORT</code></td><td>Ya</td><td>Periksa nilai-nilai terindeks</td><td>Periksa nilai-nilai terindeks</td><td>Periksa nilai-nilai terindeks</td><td>Periksa nilai-nilai terindeks</td></tr>
<tr><td><code translate="no">TRIE</code></td><td>Ya</td><td>Periksa nilai-nilai terindeks</td><td>Periksa nilai-nilai terindeks</td><td>Periksa nilai-nilai terindeks</td><td>Periksa nilai-nilai terindeks</td></tr>
<tr><td><code translate="no">NGRAM</code></td><td>Calon</td><td>Calon</td><td>Kandidat; cocok persis dengan literal dalam rentang panjang gram yang telah dikonfigurasi</td><td>Kandidat</td><td>Kandidat</td></tr>
<tr><td><code translate="no">FMINDEX</code></td><td>Ya</td><td>Ya</td><td>Ya</td><td>Calon</td><td>Kandidat</td></tr>
</tbody>
</table>
<p>Entri-entri ini menjelaskan operator setelah perencanaan kueri. Milvus dapat menyederhanakan pola LIKE literal menjadi perbandingan kesamaan, dan regex berancor sederhana menjadi perbandingan kesamaan, pencocokan awalan, atau pencocokan akhiran; misalnya, <code translate="no">name =~ &quot;^abc$&quot;</code> menjadi uji kesamaan dan mengikuti tabel kesamaan.</p>
<p><code translate="no">INVERTED</code> menganggap bentuk sufiks dan substring sederhana sebagai pemindaian meskipun pola LIKE yang lebih kompleks dapat menggunakan indeks. <code translate="no">NGRAM</code> memerlukan teks literal dengan panjang minimal <code translate="no">min_gram</code> karakter; LIKE umum mengharuskan setiap fragmen literal yang tidak kosong memenuhi batas minimum tersebut, dan percepatan regex bergantung pada ekstraksi literal yang sesuai. Jika tidak, Milvus akan memindai data. ` <code translate="no">FMINDEX</code> ` juga dapat memilih pemindaian jika pola yang digunakan memberikan sedikit penyaringan yang berguna atau terlalu mahal untuk diselesaikan melalui indeks.</p>
<p>Ini adalah predikat nilai string. Fungsi berbasis token seperti <code translate="no">TEXT_MATCH</code> dan <code translate="no">PHRASE_MATCH</code> menggunakan pengindeksan pencocokan teks yang dikonfigurasi melalui properti bidang; memilih indeks skalar <code translate="no">INVERTED</code> tidak mengaktifkan fungsi-fungsi tersebut.</p>
<h3 id="Array-JSON-and-spatial-predicates" class="common-anchor-header">Predikat array, JSON, dan spasial<button data-href="#Array-JSON-and-spatial-predicates" class="anchor-icon" translate="no">
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
    </button></h3><table>
<thead>
<tr><th>Jenis indeks</th><th>Tipe data atau konversi</th><th>Predikat yang dapat menggunakan indeks</th><th>Catatan</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code>, atau pilihan <code translate="no">AUTOINDEX</code> yang memenuhi syarat</td><td>Array biasa dengan tipe elemen yang didukung</td><td><code translate="no">ARRAY_CONTAINS</code>, <code translate="no">ARRAY_CONTAINS_ANY</code>, <code translate="no">ARRAY_CONTAINS_ALL</code></td><td>Mencocokkan elemen terlepas dari posisinya. Pembatasan indeks/tipe tetap berlaku.</td></tr>
<tr><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td><td>Array biasa dengan nilai Boolean, integer, atau VARCHAR</td><td><code translate="no">==</code> seluruh array dan <code translate="no">!=</code></td><td>Dapat menggunakan kandidat indeks yang diikuti dengan pemeriksaan terhadap array asli. Array bilangan floating-point akan beralih ke pemindaian; indeks bitmap tidak mendukung jalur kandidat ini.</td></tr>
<tr><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code>, atau pilihan <code translate="no">AUTOINDEX</code> yang memenuhi syarat</td><td>Jalur JSON yang dikonversi ke <code translate="no">BOOL</code>, <code translate="no">DOUBLE</code>, atau <code translate="no">VARCHAR</code></td><td>Perbandingan dan keanggotaan yang sesuai dengan tipe hasil konversi</td><td>Jalur terindeks dan hasil konversi harus sesuai dengan kueri. Pola string mengikuti tabel di atas.</td></tr>
<tr><td><code translate="no">NGRAM</code></td><td>Jalur JSON yang dikonversi ke <code translate="no">VARCHAR</code></td><td>pola LIKE dan regex</td><td>Menggunakan aturan kelayakan pola yang sama seperti indeks VARCHAR NGRAM.</td></tr>
<tr><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code>, atau pilihan <code translate="no">AUTOINDEX</code> yang memenuhi syarat</td><td>Jalur JSON yang dikonversi ke <code translate="no">ARRAY_BOOL</code>, <code translate="no">ARRAY_DOUBLE</code>, atau <code translate="no">ARRAY_VARCHAR</code></td><td><code translate="no">JSON_CONTAINS</code>, <code translate="no">JSON_CONTAINS_ANY</code>, <code translate="no">JSON_CONTAINS_ALL</code></td><td>Memerlukan tipe elemen yang kompatibel. Operan bertipe campuran atau array bersarang dapat dialihkan ke pemindaian.</td></tr>
<tr><td><code translate="no">INVERTED</code> dengan konversi <code translate="no">JSON</code></td><td>Indeks JSON lengkap</td><td>Perbandingan dan keanggotaan pada jalur skalar yang didukung; pola string yang didukung; pencakupan JSON pada jalur array yang didukung</td><td>Jalur string mengikuti perilaku TERBALIK. Keterkandungan array memerlukan tipe elemen yang kompatibel.</td></tr>
<tr><td>Indeks jalur JSON dan indeks JSON lengkap</td><td>Jalur JSON yang diindeks</td><td><code translate="no">exists</code></td><td>Menguji apakah jalur tersebut ada, yang berbeda dari menguji nilainya atau apakah seluruh bidang bernilai null.</td></tr>
<tr><td><code translate="no">RTREE</code></td><td><code translate="no">GEOMETRY</code></td><td><code translate="no">ST_EQUALS</code>, <code translate="no">ST_INTERSECTS</code>, <code translate="no">ST_CONTAINS</code>, <code translate="no">ST_WITHIN</code>, <code translate="no">ST_TOUCHES</code>, <code translate="no">ST_OVERLAPS</code>, <code translate="no">ST_CROSSES</code>, <code translate="no">ST_DWITHIN</code></td><td>Menggunakan kotak pembatas (bounding boxes) untuk menemukan kandidat, kemudian memeriksa hubungan spasial yang tepat. <code translate="no">ST_ISVALID</code> tidak menggunakan RTREE.</td></tr>
</tbody>
</table>
<p>Dukungan untuk "array containment" tidak berarti pencarian indeks untuk elemen pada posisi tertentu, seperti pada <code translate="no">values[0]</code>, atau untuk panjang array. Kesetaraan seluruh array juga harus memeriksa urutan dan panjang, yang tidak dapat ditentukan hanya berdasarkan keanggotaan elemen.</p>
<p><code translate="no">IS NULL</code> dan <code translate="no">IS NOT NULL</code> menggunakan informasi validitas dan tidak memerlukan tipe indeks skalar tertentu. Anda dapat menggabungkan predikat dengan <code translate="no">and</code>, <code translate="no">or</code>, dan <code translate="no">not</code>; setiap bagian dapat menggunakan jalur eksekusi yang memenuhi syarat masing-masing.</p>
<h2 id="Version-compatibility" class="common-anchor-header">Kompatibilitas versi<button data-href="#Version-compatibility" class="anchor-icon" translate="no">
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
    </button></h2><p>Sebagian besar indeks skalar — <code translate="no">BITMAP</code>, <code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code>, <code translate="no">TRIE</code>, dan <code translate="no">NGRAM</code> pada bidang skalar biasa — tidak memiliki persyaratan versi. Persyaratan di bawah ini hanya berlaku untuk kombinasi yang lebih baru: indeks pada bidang array, indeks JSON-path, dan <code translate="no">FMINDEX</code>.</p>
<p>Persyaratan ini menggunakan nomor versi mesin indeks skalar, yaitu penghitung kemampuan internal yang berbeda dari nomor rilis perangkat lunak Milvus.</p>
<table>
<thead>
<tr><th>Kemampuan</th><th>Persyaratan</th></tr>
</thead>
<tbody>
<tr><td>Eksplisit <code translate="no">FMINDEX</code></td><td>Versi mesin indeks skalar 5 atau yang lebih baru</td></tr>
<tr><td><code translate="no">STL_SORT</code> eksplisit pada array biasa</td><td>Mesin indeks skalar versi 3 atau yang lebih baru, dengan dukungan pengurutan array diaktifkan</td></tr>
<tr><td><code translate="no">HYBRID</code> memilih " <code translate="no">STL_SORT</code> " untuk array biasa</td><td>Mesin indeks skalar versi 5 atau yang lebih baru, dengan dukungan pengurutan array diaktifkan</td></tr>
<tr><td><code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code>, atau <code translate="no">HYBRID</code> pada jalur skalar JSON</td><td>Mesin indeks skalar versi 4 atau yang lebih baru</td></tr>
<tr><td><code translate="no">STL_SORT</code> atau <code translate="no">HYBRID</code> pada jalur array JSON bertipe</td><td>Mesin indeks skalar versi 3 atau yang lebih baru, dengan dukungan pengurutan array diaktifkan</td></tr>
</tbody>
</table>
<p>Jika persyaratan kompatibilitas array atau JSON tidak terpenuhi, permintaan otomatis yang terpengaruh dapat beralih ke <code translate="no">INVERTED</code>, dan permintaan eksplisit untuk kombinasi yang tidak didukung akan gagal. Untuk <code translate="no">HYBRID</code> pada array biasa, cabang dengan kardinalitas tinggi terus menggunakan <code translate="no">INVERTED</code> hingga pengindeksan terurut tersedia.</p>
<h2 id="Performance-considerations" class="common-anchor-header">Pertimbangan kinerja<button data-href="#Performance-considerations" class="anchor-icon" translate="no">
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
    </button></h2><p>Kinerja indeks bergantung pada distribusi data dan filter yang digunakan aplikasi Anda. Kardinalitas, panjang string, panjang array, dan jumlah entitas yang cocok semuanya dapat memengaruhi penggunaan memori dan latensi kueri. Bandingkan indeks menggunakan data dan ekspresi filter yang representatif, serta ukur penggunaan memori, waktu pembuatan, dan latensi kueri secara bersamaan.</p>
<h3 id="Estimating-memory-requirements" class="common-anchor-header">Memperkirakan kebutuhan memori<button data-href="#Estimating-memory-requirements" class="anchor-icon" translate="no">
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
    </button></h3><p>Rumus-rumus berikut memberikan gambaran kasar mengenai memori yang dibutuhkan oleh indeks skalar setelah dimuat, dengan pemetaan memori dinonaktifkan. Rumus-rumus <code translate="no">STL_SORT</code> mengasumsikan bidang skalar biasa tanpa nilai null.</p>
<ul>
<li><code translate="no">N</code>: jumlah entitas.</li>
<li><code translate="no">D</code>: jumlah nilai unik.</li>
<li><code translate="no">l</code>: panjang rata-rata string unik, dalam <strong>byte</strong>.</li>
<li><code translate="no">S</code>: ukuran indeks yang dibuat sebelum kompresi penyimpanan, dalam <strong>byte</strong>.</li>
</ul>
<table>
<thead>
<tr><th>Jenis indeks</th><th>Perkiraan kasar memori dalam byte</th><th>Intuisi</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">STL_SORT</code> <code translate="no">INT8</code>, , , atau <code translate="no">INT16</code> <code translate="no">INT32</code> <code translate="no">FLOAT</code></td><td><code translate="no">12 * N</code></td><td>Sekitar 12 byte per entitas.</td></tr>
<tr><td><code translate="no">STL_SORT</code> di <code translate="no">INT64</code>, <code translate="no">DOUBLE</code>, atau <code translate="no">TIMESTAMPTZ</code></td><td><code translate="no">20 * N</code></td><td>Sekitar 20 byte per entitas untuk nilai yang lebih besar.</td></tr>
<tr><td><code translate="no">STL_SORT</code> di <code translate="no">VARCHAR</code></td><td><code translate="no">8 * N + (l + 16) * D</code></td><td>String yang berulang berbagi penyimpanan, sehingga semakin sedikit string yang berbeda biasanya berarti semakin sedikit memori yang digunakan.</td></tr>
<tr><td><code translate="no">BITMAP</code>, menggunakan bitmap padat</td><td><code translate="no">(D + 1) * N / 8</code></td><td>Setiap nilai yang berbeda membutuhkan kira-kira satu bit per entitas, ditambah satu bitmap untuk melacak entitas yang valid.</td></tr>
<tr><td><code translate="no">INVERTED</code> atau <code translate="no">NGRAM</code></td><td><code translate="no">S</code></td><td>Mulailah dengan ukuran yang kira-kira sama dengan ukuran indeks yang telah dibuat.</td></tr>
<tr><td><code translate="no">FMINDEX</code></td><td><code translate="no">2 * S</code></td><td>Sediakan ruang sekitar dua kali ukuran indeks yang telah dibuat.</td></tr>
</tbody>
</table>
<p>Bagi hasilnya dengan <code translate="no">1024 * 1024</code> untuk mengonversi byte ke <strong>MiB</strong>. Misalnya, indeks <code translate="no">STL_SORT</code> pada satu juta nilai <code translate="no">INT64</code> yang tidak null membutuhkan sekitar <strong>19 MiB</strong> untuk struktur data utamanya. Untuk kolom VARCHAR di mana setiap string unik, perkiraan menyederhanakan menjadi <code translate="no">(l + 24) * N</code>; satu juta string unik dengan rata-rata 32 byte menghasilkan sekitar <strong>53 MiB</strong>.</p>
<p>Rumus BITMAP menggambarkan penyimpanan bitmap padat; mengaktifkan cache offset opsional menambah sekitar <code translate="no">8 * N</code> byte pada sistem 64-bit. Untuk <code translate="no">INVERTED</code>, <code translate="no">NGRAM</code>, dan <code translate="no">FMINDEX</code>, buat indeks pada data representatif untuk mendapatkan <code translate="no">S</code> — ukuran data mentah tidak dapat menggantikan ukuran indeks yang telah dibuat. Untuk <code translate="no">AUTOINDEX</code>, gunakan rumus untuk indeks yang sebenarnya dipilih, dan terapkan perkiraan per segmen, lalu tambahkan nilai-nilai tersebut di seluruh segmen yang dimuat dan replika.</p>
<p>Ini adalah angka perencanaan perkiraan, bukan batas memori. Angka-angka ini tidak memperhitungkan memori sementara yang digunakan selama pembuatan, pemuatan, dan kueri, serta lebih sensitif terhadap nilai unik dan distribusi data untuk indeks string dan bitmap dibandingkan dengan indeks numerik <code translate="no">STL_SORT</code>. Tidak ada persentase akurasi tetap yang dijamin. Pemetaan memori, format indeks lama, array, dan bidang JSON memerlukan pengukuran terpisah. Sebelum menentukan ukuran penerapan, periksa penggunaan memori aktual dengan data dan kueri yang representatif, serta sisakan ruang untuk penggunaan puncak.</p>
<h2 id="Whats-next" class="common-anchor-header">Langkah Selanjutnya<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Untuk contoh pembuatan dan konfigurasi indeks, lihat <a href="/docs/id/bitmap.md">BITMAP</a>, <a href="/docs/id/inverted.md">INVERTED</a>, <a href="/docs/id/ngram.md">NGRAM</a>, <a href="/docs/id/stl-sort.md">STL_SORT</a>, <a href="/docs/id/trie.md">TRIE</a>, <a href="/docs/id/fmindex.md">FMINDEX</a>, dan <a href="/docs/id/rtree.md">RTREE</a>.</li>
<li>Untuk definisi bidang dan skema koleksi, lihat <a href="/docs/id/schema.md">Penjelasan Skema</a>.</li>
</ul>
