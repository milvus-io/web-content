---
id: pattern-matching.md
title: Pencocokan Pola
summary: >-
  Milvus mendukung pencocokan pola string menggunakan pola wildcard LIKE dan
  ekspresi reguler RE2. Gunakan filter pola untuk mencocokkan awalan, akhiran,
  substring, kode terstruktur, domain email, jalur URL, dan pola string lainnya
  dalam kolom VARCHAR, jalur string JSON, atau elemen ARRAY.
---
<h1 id="Pattern-Matching" class="common-anchor-header">Pencocokan Pola<button data-href="#Pattern-Matching" class="anchor-icon" translate="no">
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
    </button></h1><p>Dalam aplikasi pencarian berbasis agen, pencarian vektor dan pencocokan pola bergaya grep sering kali saling melengkapi. Pencarian vektor mengambil entitas yang relevan secara semantik, sedangkan pencocokan pola mempersempit hasil tersebut berdasarkan struktur string yang tepat, seperti kode kesalahan, awalan log, domain email, jalur URL, atau pengenal.</p>
<p>Di Milvus, Anda dapat mengekspresikan batasan pola ini dalam filter skalar menggunakan ` <code translate="no">LIKE</code> ` untuk pencocokan wildcard sederhana, serta ` <code translate="no">=~</code> ` atau ` <code translate="no">!~</code> ` untuk ekspresi reguler <a href="https://github.com/google/re2/wiki/syntax">RE2</a>. Anda dapat menggabungkan filter-filter ini dengan ` <code translate="no">query</code>`, ` <code translate="no">search</code>`, atau pencarian hibrida.</p>
<p>Ekspresi pencocokan pola ditulis dalam parameter <code translate="no">filter</code>. Misalnya, kueri berikut mencocokkan pesan log yang berisi kode kesalahan seperti <code translate="no">E1001</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

res = client.query(
    collection_name=<span class="hljs-string">&quot;log_events&quot;</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>,</span>
    output_fields=[<span class="hljs-string">&quot;message&quot;</span>, <span class="hljs-string">&quot;severity&quot;</span>],
)
<button class="copy-code-btn"></button></code></pre>
<p>Contoh-contoh pada halaman ini berfokus pada ekspresi yang ditetapkan ke <code translate="no">filter</code>. Anda dapat menggunakan sintaks ekspresi filter yang sama dalam operasi Milvus yang menerima filter skalar, seperti <code translate="no">query</code>, <code translate="no">search</code>, dan pencarian hibrida.</p>
<h2 id="Supported-field-types" class="common-anchor-header">Jenis bidang yang didukung<button data-href="#Supported-field-types" class="anchor-icon" translate="no">
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
    </button></h2><p>Pencocokan pola tersedia untuk nilai string.</p>
<table>
<thead>
<tr><th>Target</th><th><code translate="no">LIKE</code></th><th>Regex <code translate="no">=~</code> / <code translate="no">!~</code></th><th>Catatan</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">VARCHAR</code> bidang</td><td>Ya</td><td>Ya</td><td>Target umum untuk pencocokan pola pada bidang string.</td></tr>
<tr><td><code translate="no">JSON</code> jalur dengan tipe konversi <code translate="no">VARCHAR</code> </td><td>Ya</td><td>Ya</td><td>Nilai jalur JSON harus berupa string agar pencocokan berhasil. Jika Anda membuat indeks pada jalur JSON untuk percepatan, atur ` <code translate="no">json_cast_type=&quot;varchar&quot;</code>`.</td></tr>
<tr><td><code translate="no">ARRAY&lt;VARCHAR&gt;</code> elemen</td><td>Ya</td><td>Ya</td><td>Cocokkan elemen tertentu berdasarkan indeks, seperti <code translate="no">tags[0]</code>. Pencocokan pola <strong>tidak</strong> memindai semua elemen; pencocokan hanya berlaku untuk elemen pada indeks yang ditentukan.</td></tr>
<tr><td>Numerik, Boolean, vektor, <code translate="no">TEXT</code>, atau target non-<code translate="no">VARCHAR</code> lainnya</td><td>Tidak</td><td>Tidak</td><td>Pencocokan pola hanya tersedia untuk nilai <code translate="no">VARCHAR</code>, jalur JSON yang diterjemahkan menjadi string, atau elemen <code translate="no">ARRAY&lt;VARCHAR&gt;</code> yang diindeks.</td></tr>
</tbody>
</table>
<h2 id="Choose-LIKE-or-regex" class="common-anchor-header">Pilih LIKE atau regex<button data-href="#Choose-LIKE-or-regex" class="anchor-icon" translate="no">
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
    </button></h2><p>Pilih operator paling sederhana yang dapat mengekspresikan pola yang Anda butuhkan.</p>
<p>Jika Anda memerlukan pencocokan string yang tepat, kami menyarankan Anda menggunakan <code translate="no">==</code> alih-alih pencocokan pola. Gunakan <code translate="no">LIKE</code> atau regex hanya jika filter perlu mencocokkan suatu pola.</p>
<table>
<thead>
<tr><th>Persyaratan</th><th>Operator yang direkomendasikan</th><th>Contoh</th><th>Deskripsi</th></tr>
</thead>
<tbody>
<tr><td>Kesamaan string yang tepat</td><td><code translate="no">==</code></td><td><code translate="no">status == &quot;active&quot;</code></td><td>Kesesuaian persis dari string <code translate="no">active</code>.</td></tr>
<tr><td>Kesesuaian awalan sederhana</td><td><code translate="no">LIKE</code></td><td><code translate="no">name LIKE &quot;Prod%&quot;</code></td><td>Mencocokkan string yang dimulai dengan <code translate="no">Prod</code>.</td></tr>
<tr><td>Kesesuaian sufiks sederhana</td><td><code translate="no">LIKE</code></td><td><code translate="no">filename LIKE &quot;%.json&quot;</code></td><td>Mencocokkan string yang diakhiri dengan <code translate="no">.json</code>.</td></tr>
<tr><td>Kecocokan sederhana "mengandung"</td><td><code translate="no">LIKE</code></td><td><code translate="no">description LIKE &quot;%vector database%&quot;</code></td><td>Mencocokkan nilai yang mengandung <code translate="no">vector database</code> di mana saja dalam string.</td></tr>
<tr><td>Mencocokkan kode terstruktur atau pola dengan panjang tetap</td><td><code translate="no">=~</code></td><td><code translate="no">code =~ &quot;E[0-9]{4}&quot;</code></td><td>Mencocokkan string yang secara peka huruf besar/kecil mengandung <code translate="no">E</code> diikuti oleh empat digit, seperti <code translate="no">E1001</code>.</td></tr>
<tr><td>Pencocokan pola tanpa membedakan huruf besar-kecil</td><td><code translate="no">=~</code> dengan <code translate="no">(?i)</code></td><td><code translate="no">message =~ &quot;(?i)error&quot;</code></td><td>Mencocokkan <code translate="no">error</code>, <code translate="no">ERROR</code>, atau varian huruf besar-kecil lainnya.</td></tr>
<tr><td>Kecualikan nilai yang cocok dengan pola regex</td><td><code translate="no">!~</code></td><td><code translate="no">message !~ &quot;^DEBUG&quot;</code></td><td>Mengecualikan string yang dimulai dengan <code translate="no">DEBUG</code>.</td></tr>
</tbody>
</table>
<p>Gunakan <code translate="no">LIKE</code> untuk pencocokan wildcard sederhana. Gunakan regex jika pola memerlukan kelas karakter, pengulangan, alternatif seperti <code translate="no">error|failed</code>, jangkar, atau pencocokan tanpa membedakan huruf besar-kecil.</p>
<h2 id="Use-LIKE" class="common-anchor-header">Gunakan LIKE<button data-href="#Use-LIKE" class="anchor-icon" translate="no">
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
    </button></h2><p>Operator <code translate="no">LIKE</code> digunakan untuk pencocokan karakter pengganti sederhana pada nilai string. Operator ini hanya mendukung karakter pengganti berikut:</p>
<table>
<thead>
<tr><th>Karakter pengganti</th><th>Deskripsi</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">%</code></td><td>Mencocokkan nol atau lebih karakter.</td></tr>
<tr><td><code translate="no">_</code></td><td>Mencocokkan tepat satu karakter.</td></tr>
</tbody>
</table>
<h3 id="Common-LIKE-patterns" class="common-anchor-header">Pola LIKE yang umum<button data-href="#Common-LIKE-patterns" class="anchor-icon" translate="no">
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
    </button></h3><p>Gunakan posisi <code translate="no">%</code> dan <code translate="no">_</code> untuk mengontrol di mana teks tetap muncul dalam string yang cocok.</p>
<table>
<thead>
<tr><th>Persyaratan</th><th>Pola</th><th>Contoh filter</th></tr>
</thead>
<tbody>
<tr><td>Dimulai dengan awalan</td><td><code translate="no">Prod%</code></td><td><code translate="no">filter = 'name LIKE &quot;Prod%&quot;'</code></td></tr>
<tr><td>Berakhir dengan sufiks</td><td><code translate="no">%.json</code></td><td><code translate="no">filter = 'filename LIKE &quot;%.json&quot;'</code></td></tr>
<tr><td>Mengandung substring</td><td><code translate="no">%vector%</code></td><td><code translate="no">filter = 'description LIKE &quot;%vector%&quot;'</code></td></tr>
<tr><td>Mencocokkan satu karakter pada posisi tetap</td><td><code translate="no">AB_%</code></td><td><code translate="no">filter = 'code LIKE &quot;AB_%&quot;'</code></td></tr>
</tbody>
</table>
<h3 id="LIKE-matching-behavior" class="common-anchor-header">Perilaku pencocokan LIKE<button data-href="#LIKE-matching-behavior" class="anchor-icon" translate="no">
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
    </button></h3><p>Gunakan ` <code translate="no">LIKE</code> ` untuk pencocokan awalan, akhiran, mengandung, dan satu karakter pada posisi tetap. ` <code translate="no">LIKE</code> ` tidak mendukung kelas karakter seperti ` <code translate="no">[0-9]</code>`, alternatif seperti ` <code translate="no">error|failed</code>`, pengulangan seperti ` <code translate="no">{4}</code>`, jangkar seperti ` <code translate="no">^</code> ` atau ` <code translate="no">$</code>`, atau bendera tidak peka huruf besar-kecil seperti ` <code translate="no">(?i)</code>`. Gunakan regex untuk pola-pola tersebut.</p>
<p>Gunakan ` <code translate="no">==</code> ` untuk kesamaan string penuh yang tepat. Gunakan ` <code translate="no">LIKE</code> ` hanya jika filter memerlukan pencocokan dengan karakter pengganti.</p>
<h2 id="Use-regex" class="common-anchor-header">Gunakan regex<button data-href="#Use-regex" class="anchor-icon" translate="no">
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
    </button></h2><p>Gunakan filter regex ketika pola memerlukan fitur ekspresi reguler seperti kelas karakter, pengulangan, alternatif, jangkar, atau pencocokan yang tidak membedakan huruf besar-kecil. Milvus menerapkan ekspresi reguler <a href="https://github.com/google/re2/wiki/syntax">RE2</a> ke nilai string.</p>
<p>Sisi kanan dari <code translate="no">=~</code> atau <code translate="no">!~</code> harus berupa literal string.</p>
<table>
<thead>
<tr><th>Operator</th><th>Arti</th><th>Contoh</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">=~</code></td><td>Mencocokkan nilai yang memenuhi pola regex.</td><td><code translate="no">filter = 'message =~ &quot;E[0-9]{4}&quot;'</code></td></tr>
<tr><td><code translate="no">!~</code></td><td>Mengecualikan nilai-nilai yang memenuhi pola regex.</td><td><code translate="no">filter = 'message !~ &quot;^DEBUG&quot;'</code></td></tr>
</tbody>
</table>
<h3 id="Common-regex-patterns" class="common-anchor-header">Pola regex umum<button data-href="#Common-regex-patterns" class="anchor-icon" translate="no">
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
    </button></h3><p>Contoh berikut menggunakan sintaks RE2 umum dalam ekspresi filter Milvus. Untuk sintaks regex lengkap, lihat referensi <a href="https://github.com/google/re2/wiki/syntax">sintaks RE2</a>.</p>
<table>
<thead>
<tr><th>Persyaratan</th><th>Pola</th><th>Contoh filter</th></tr>
</thead>
<tbody>
<tr><td>Mengandung teks literal</td><td><code translate="no">error</code></td><td><code translate="no">filter = 'message =~ &quot;error&quot;'</code></td></tr>
<tr><td>Dimulai dengan awalan</td><td><code translate="no">^ERR</code></td><td><code translate="no">filter = 'code =~ &quot;^ERR&quot;'</code></td></tr>
<tr><td>Berakhir dengan sufiks</td><td><code translate="no">\.json$</code></td><td><code translate="no">filter = 'filename =~ &quot;\\.json$&quot;'</code></td></tr>
<tr><td>Mencocokkan urutan angka</td><td><code translate="no">[0-9]+</code></td><td><code translate="no">filter = 'message =~ &quot;[0-9]+&quot;'</code></td></tr>
<tr><td>Cocok dengan jumlah digit tetap</td><td><code translate="no">[0-9]{4}</code></td><td><code translate="no">filter = 'code =~ &quot;[0-9]{4}&quot;'</code></td></tr>
<tr><td>Cocok dengan domain email</td><td><code translate="no">@example\.com$</code></td><td><code translate="no">filter = 'email =~ &quot;@example\\.com$&quot;'</code></td></tr>
<tr><td>Mencocokkan tanpa membedakan huruf besar-kecil</td><td><code translate="no">(?i)error</code></td><td><code translate="no">filter = 'message =~ &quot;(?i)error&quot;'</code></td></tr>
<tr><td>Mencocokkan string lengkap</td><td><code translate="no">^prod-[0-9]+$</code></td><td><code translate="no">filter = 'name =~ &quot;^prod-[0-9]+$&quot;'</code></td></tr>
</tbody>
</table>
<p>Untuk mencocokkan salah satu dari beberapa kata, gunakan alternatif dengan <code translate="no">|</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ &quot;error|failed|timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Saat mencocokkan karakter meta regex secara harfiah, lakukan escape pada pola regex tersebut. Misalnya, untuk mencocokkan titik (<code translate="no">\.</code> ) secara harfiah dalam regex, tulis <code translate="no">\\.</code> dalam string filter Python:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;email =~ &quot;@gmail\\.com$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Catatan: Filter regex Milvus mengikuti sintaks RE2. Jika pola regex menggunakan sintaks yang tidak didukung oleh RE2 atau tidak valid, Milvus akan menolak ekspresi filter tersebut. Untuk detail mengenai karakter meta regex, bendera, dan perilaku pencocokan, lihat referensi <a href="https://github.com/google/re2/wiki/syntax">sintaks RE2</a>.</p>
<h3 id="Matching-behavior" class="common-anchor-header">Perilaku pencocokan<button data-href="#Matching-behavior" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>Pencocokan substring</strong></p>
<p>Pencocokan regex Milvus menggunakan semantik substring. Pola tidak perlu cocok dengan seluruh nilai bidang. Misalnya, filter berikut cocok dengan <code translate="no">E1001</code> dan <code translate="no">failed with E1001 after retry</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Untuk mencocokkan seluruh nilai bidang, gunakan jangkar <code translate="no">^</code> dan <code translate="no">$</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match only values that are exactly E followed by four digits</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;code =~ &quot;^E[0-9]{4}$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Kolom VARCHAR yang dapat bernilai null</strong></p>
<p>Filter regex tidak mencocokkan nilai null. Hal ini berlaku baik untuk <code translate="no">=~</code> maupun <code translate="no">!~</code>. Jika Anda ingin mengecualikan pola regex tetapi tetap mempertahankan nilai null, tambahkan secara eksplisit <code translate="no">OR field IS NULL</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message !~ &quot;^DEBUG&quot; OR message IS NULL&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Jalur JSON</strong></p>
<p>Untuk jalur JSON, filter regex berperilaku berbeda ketika jalurnya hilang, bernilai null, atau menghasilkan nilai non-string:</p>
<table>
<thead>
<tr><th>Filter</th><th>Menyertakan nilai yang hilang/null/bukan string?</th><th>Catatan</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">json_field[&quot;path&quot;] =~ &quot;pattern&quot;</code></td><td>Tidak</td><td>Hanya cocok dengan nilai string yang memenuhi pola regex.</td></tr>
<tr><td><code translate="no">json_field[&quot;path&quot;] !~ &quot;pattern&quot;</code></td><td>Ya</td><td>Mengembalikan entitas yang jalurnya hilang, null, bukan string, atau string yang tidak sesuai dengan pola regex.</td></tr>
</tbody>
</table>
<h2 id="Accelerate-pattern-matching-with-indexes" class="common-anchor-header">Mempercepat pencocokan pola dengan indeks<button data-href="#Accelerate-pattern-matching-with-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus mendukung beberapa jenis indeks pada bidang string yang dapat digunakan bersama dengan filter " <code translate="no">LIKE</code> " dan filter regex pada bidang " <code translate="no">VARCHAR</code> " atau jalur string JSON, seperti <code translate="no">NGRAM</code>, <code translate="no">STL_SORT</code>, <code translate="no">INVERTED</code>, dan <code translate="no">BITMAP</code>. Pencocokan pola dapat berfungsi tanpa indeks, tetapi indeks dapat meningkatkan kinerja pada dataset besar.</p>
<p>Efektivitas indeks bergantung pada ekspresi pola, apakah Milvus dapat mengekstrak substring literal tetap, serta kardinalitas dan distribusi bidang target. Pola bergaya awalan seperti <code translate="no">name LIKE &quot;Prod%&quot;</code> mungkin memerlukan strategi indeks yang berbeda dibandingkan pola infiks atau sufiks seperti <code translate="no">description LIKE &quot;%vector%&quot;</code> atau <code translate="no">filename LIKE &quot;%.json&quot;</code>.</p>
<p>Gunakan tabel berikut sebagai titik awal, lalu lakukan pengujian kinerja dengan beban kerja Anda sendiri:</p>
<table>
<thead>
<tr><th>Pola atau karakteristik data</th><th>Indeks yang perlu dipertimbangkan</th><th>Catatan</th></tr>
</thead>
<tbody>
<tr><td>Mengandung substring literal tetap, seperti <code translate="no">message =~ &quot;error.*timeout&quot;</code> atau <code translate="no">message LIKE &quot;%database%&quot;</code></td><td><code translate="no">NGRAM</code></td><td>Berguna ketika Milvus dapat mengekstrak substring literal yang bermakna dari pola tersebut. Untuk detailnya, lihat <a href="/docs/id/ngram.md">NGRAM</a>.</td></tr>
<tr><td>Filter string awalan, tepat, atau mirip kesetaraan, terutama pada bidang dengan kardinalitas rendah hingga sedang</td><td><code translate="no">STL_SORT</code>, <code translate="no">INVERTED</code>, atau <code translate="no">BITMAP</code></td><td>Mungkin lebih efektif jika bidang memiliki nilai yang berulang atau jika filter mendekati pencocokan eksak. Untuk detailnya, lihat <a href="/docs/id/stl-sort.md">STL_SORT</a>, <a href="/docs/id/inverted.md">INVERTED</a>, dan <a href="/docs/id/bitmap.md">BITMAP</a>.</td></tr>
<tr><td>Pola regex tanpa literal tetap, atau pola yang didominasi oleh kelas karakter, token pendek, atau karakter pengganti</td><td>Lakukan pengujian kinerja sebelum mengandalkan percepatan indeks</td><td>Pola-pola ini mungkin memberikan selektivitas indeks yang terbatas dan dapat beralih ke pemindaian yang lebih luas.</td></tr>
</tbody>
</table>
