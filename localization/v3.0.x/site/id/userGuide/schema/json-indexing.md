---
id: json-indexing.md
title: Pengindeksan JSON
summary: >-
  Bidang JSON menyediakan cara yang fleksibel untuk menyimpan metadata
  terstruktur di Milvus. Tanpa pengindeksan, kueri pada bidang JSON memerlukan
  pemindaian koleksi penuh, yang menjadi lambat seiring dengan bertambahnya
  kumpulan data Anda. Pengindeksan JSON memungkinkan pencarian cepat dengan
  membuat indeks di dalam data JSON Anda.
---
<h1 id="JSON-Indexing" class="common-anchor-header">Pengindeksan JSON<button data-href="#JSON-Indexing" class="anchor-icon" translate="no">
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
    </button></h1><p>Bidang JSON menyediakan cara yang fleksibel untuk menyimpan metadata terstruktur di Milvus. Tanpa pengindeksan, kueri pada bidang JSON memerlukan pemindaian koleksi penuh, yang menjadi lambat seiring dengan bertambahnya kumpulan data Anda. Pengindeksan JSON memungkinkan pencarian cepat dengan membuat indeks di dalam data JSON Anda.</p>
<p>Pengindeksan JSON sangat ideal untuk:</p>
<ul>
<li><p>Skema terstruktur dengan kunci yang konsisten dan diketahui</p></li>
<li><p>Kueri kesetaraan dan rentang pada jalur JSON tertentu</p></li>
<li><p>Skenario di mana Anda memerlukan kontrol yang tepat atas kunci mana yang diindeks</p></li>
<li><p>Akselerasi kueri yang ditargetkan dengan hemat penyimpanan</p></li>
</ul>
<div class="alert note">
<p>Untuk dokumen JSON yang kompleks dengan pola kueri yang beragam, pertimbangkan <a href="/docs/id/json-shredding.md">JSON Shredding</a> sebagai alternatif.</p>
</div>
<h2 id="JSON-indexing-syntax" class="common-anchor-header">Sintaks pengindeksan JSON<button data-href="#JSON-indexing-syntax" class="anchor-icon" translate="no">
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
    </button></h2><p>Saat Anda membuat indeks JSON, Anda menentukan:</p>
<ul>
<li><p><strong>Jalur JSON</strong>: Lokasi persis data yang ingin Anda indeks</p></li>
<li><p><strong>Jenis data yang diberikan</strong>: Cara menafsirkan dan menyimpan nilai yang diindeks</p></li>
<li><p><strong>Konversi tipe opsional</strong>: Mengubah data selama pengindeksan jika diperlukan</p></li>
</ul>
<p>Berikut ini sintaks untuk mengindeks bidang JSON:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare index params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;&lt;json_field_name&gt;&quot;</span>,  <span class="hljs-comment"># Name of the JSON field</span>
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,  <span class="hljs-comment"># Must be AUTOINDEX or INVERTED</span>
    index_name=<span class="hljs-string">&quot;&lt;unique_index_name&gt;&quot;</span>,  <span class="hljs-comment"># Index name</span>
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;&lt;path_to_json_key&gt;&quot;</span>,  <span class="hljs-comment"># Specific key to be indexed within JSON data</span>
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;&lt;data_type&gt;&quot;</span>,  <span class="hljs-comment"># Data type to use when interpreting and indexing the value</span>
        <span class="hljs-comment"># &quot;json_cast_function&quot;: &quot;&lt;cast_function&gt;&quot;  # Optional: convert key values into a target type at index time</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Deskripsi</p></th>
     <th><p>Nilai / Contoh</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">field_name</code></p></td>
     <td><p>Nama bidang JSON Anda dalam skema koleksi.</p></td>
     <td><p><code translate="no">"metadata"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">index_type</code></p></td>
     <td><p>Harus <code translate="no">"AUTOINDEX"</code> atau <code translate="no">"INVERTED"</code> untuk pengindeksan JSON.</p></td>
     <td><p><code translate="no">"AUTOINDEX"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">index_name</code></p></td>
     <td><p>Pengenal unik untuk indeks ini.</p></td>
     <td><p><code translate="no">"category_index"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">json_path</code></p></td>
     <td><p>Jalur ke kunci yang ingin diindeks dalam objek JSON Anda.</p></td>
     <td><ul><li><p>Kunci tingkat teratas: <code translate="no">'metadata["category"]'</code></p></li><li><p>Kunci bersarang: <code translate="no">'metadata["supplier"]["contact"]["email"]'</code></p></li><li><p>Seluruh objek JSON: <code translate="no">"metadata"</code></p></li><li><p>Sub-objek: <code translate="no">'metadata["supplier"]'</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">json_cast_type</code></p></td>
     <td><p>Tipe data yang akan digunakan saat menginterpretasikan dan mengindeks nilai. Harus sesuai dengan tipe data sebenarnya dari kunci.</p><p>Untuk daftar tipe cast yang tersedia, lihat <a href="/docs/id/json-indexing.md#Supported-cast-types">Tipe cast yang didukung</a><a href="/docs/id/json-indexing.md#Supported-cast-types"> di bawah ini</a>.</p></td>
     <td><p><code translate="no">"VARCHAR"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">json_cast_function</code></p></td>
     <td><p><strong>(Opsional</strong> ) Mengonversi nilai kunci asli ke tipe target pada waktu indeks. Konfigurasi ini diperlukan hanya jika nilai kunci disimpan dalam format yang salah dan Anda ingin mengonversi tipe data selama pengindeksan.</p><p>Untuk daftar fungsi cast yang tersedia, lihat <a href="/docs/id/json-indexing.md#Supported-cast-functions">Fungsi cast yang didukung di bawah ini</a>.</p></td>
     <td><p><code translate="no">"STRING_TO_DOUBLE"</code></p></td>
   </tr>
</table>
<h3 id="Supported-cast-types" class="common-anchor-header">Tipe cast yang didukung<button data-href="#Supported-cast-types" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus mendukung tipe data berikut ini untuk cast pada waktu pengindeksan. Tipe-tipe ini memastikan bahwa data Anda ditafsirkan dengan benar untuk pemfilteran yang efisien.</p>
<table>
   <tr>
     <th><p>Tipe Cast</p></th>
     <th><p>Deskripsi</p></th>
     <th><p>Contoh Nilai JSON</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">BOOL</code> / <code translate="no">bool</code></p></td>
     <td><p>Digunakan untuk mengindeks nilai boolean, sehingga memungkinkan kueri yang memfilter kondisi benar/salah.</p></td>
     <td><p><code translate="no">true</code>, <code translate="no">false</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">DOUBLE</code> / <code translate="no">double</code></p></td>
     <td><p>Digunakan untuk nilai numerik, termasuk bilangan bulat dan bilangan floating-point. Memungkinkan pemfilteran berdasarkan rentang atau kesetaraan (mis., <code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">==</code>).</p></td>
     <td><p><code translate="no">42</code>, <code translate="no">99.99</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">VARCHAR</code> / <code translate="no">varchar</code></p></td>
     <td><p>Digunakan untuk mengindeks nilai string, yang umum digunakan untuk data berbasis teks seperti nama, kategori, atau ID.</p></td>
     <td><p><code translate="no">"electronics"</code>, <code translate="no">"BrandA"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ARRAY_BOOL</code> / <code translate="no">array_bool</code></p></td>
     <td><p>Digunakan untuk mengindeks larik nilai boolean.</p></td>
     <td><p><code translate="no">[true, false, true]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ARRAY_DOUBLE</code> / <code translate="no">array_double</code></p></td>
     <td><p>Digunakan untuk mengindeks larik nilai numerik.</p></td>
     <td><p><code translate="no">[1.2, 3.14, 42]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ARRAY_VARCHAR</code> / <code translate="no">array_varchar</code></p></td>
     <td><p>Digunakan untuk mengindeks larik string, yang ideal untuk daftar tag atau kata kunci.</p></td>
     <td><p><code translate="no">["tag1", "tag2", "tag3"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">JSON</code> / <code translate="no">json</code></p></td>
     <td><p>Seluruh objek atau sub-objek JSON dengan inferensi dan perataan tipe otomatis.</p><p>Mengindeks seluruh objek JSON akan meningkatkan ukuran indeks. Untuk skenario banyak kunci, pertimbangkan <a href="/docs/id/json-shredding.md">Penghancuran JSON</a>.</p></td>
     <td><p>Objek JSON apa pun</p></td>
   </tr>
</table>
<div class="alert note">
<p>Larik harus berisi elemen dengan tipe yang sama untuk pengindeksan yang optimal. Untuk informasi lebih lanjut, lihat <a href="/docs/id/array_data_type.md">Bidang Larik</a>.</p>
</div>
<h3 id="Supported-cast-functions" class="common-anchor-header">Fungsi cast yang didukung<button data-href="#Supported-cast-functions" class="anchor-icon" translate="no">
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
    </button></h3><p>Jika kunci bidang JSON Anda berisi nilai dalam format yang salah (misalnya, angka yang disimpan sebagai string), Anda dapat mengoper fungsi cast ke argumen <code translate="no">json_cast_function</code> untuk mengonversi nilai-nilai ini pada waktu pengindeksan.</p>
<p>Fungsi cast tidak peka terhadap huruf besar/kecil. Fungsi-fungsi berikut ini didukung:</p>
<table>
   <tr>
     <th><p>Fungsi Cast</p></th>
     <th><p>Mengonversi Dari → Ke</p></th>
     <th><p>Kasus Penggunaan</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">STRING_TO_DOUBLE</code> / <code translate="no">string_to_double</code></p></td>
     <td><p>String → Numerik (ganda)</p></td>
     <td><p>Ubah <code translate="no">"99.99"</code> menjadi <code translate="no">99.99</code></p></td>
   </tr>
</table>
<div class="alert note">
<p>Jika konversi gagal (misalnya, string non-numerik), nilai akan dilewati dan tidak diindeks.</p>
</div>
<h2 id="Create-JSON-indexes" class="common-anchor-header">Membuat indeks JSON<button data-href="#Create-JSON-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>Bagian ini mendemonstrasikan cara membuat indeks pada berbagai jenis data JSON dengan menggunakan contoh-contoh praktis. Semua contoh menggunakan contoh struktur JSON yang ditunjukkan di bawah ini dan mengasumsikan bahwa Anda telah membuat koneksi ke <strong>MilvusClient</strong> dengan skema koleksi yang telah didefinisikan dengan benar.</p>
<h3 id="Sample-JSON-structure" class="common-anchor-header">Contoh struktur JSON<button data-href="#Sample-JSON-structure" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;metadata&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> 
    <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;electronics&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;BrandA&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">99.99</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;string_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;99.99&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;tags&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;clearance&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;summer_sale&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;supplier&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;SupplierX&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;country&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;USA&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;contact&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;email&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;support@supplierx.com&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;phone&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;+1-800-555-0199&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Basic-setup" class="common-anchor-header">Penyiapan dasar<button data-href="#Basic-setup" class="anchor-icon" translate="no">
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
    </button></h3><p>Sebelum membuat indeks JSON, siapkan parameter indeks Anda:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare index params</span>
index_params = MilvusClient.prepare_index_params()
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-1-Index-a-simple-JSON-key" class="common-anchor-header">Contoh 1: Mengindeks kunci JSON sederhana<button data-href="#Example-1-Index-a-simple-JSON-key" class="anchor-icon" translate="no">
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
    </button></h3><p>Buat indeks pada bidang <code translate="no">category</code> untuk mengaktifkan penyaringan cepat berdasarkan kategori produk:</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-comment"># Must be set to AUTOINDEX or INVERTED for JSON path indexing</span></span>
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>,  <span class="hljs-comment"># Unique index name</span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;category&quot;]&#x27;</span>, <span class="hljs-comment"># Path to the JSON key</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;varchar&quot;</span> <span class="hljs-comment"># Data cast type</span></span>
<span class="highlighted-comment-line">    }</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Index-a-nested-key" class="common-anchor-header">Contoh 2: Mengindeks kunci bersarang<button data-href="#Example-2-Index-a-nested-key" class="anchor-icon" translate="no">
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
    </button></h3><p>Buat indeks pada bidang <code translate="no">email</code> yang bersarang dalam untuk pencarian kontak pemasok:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Index the nested key</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-comment"># Must be set to AUTOINDEX or INVERTED for JSON path indexing</span></span>
    index_name=<span class="hljs-string">&quot;email_index&quot;</span>, <span class="hljs-comment"># Unique index name</span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;supplier&quot;][&quot;contact&quot;][&quot;email&quot;]&#x27;</span>, <span class="hljs-comment"># Path to the nested JSON key</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;varchar&quot;</span> <span class="hljs-comment"># Data cast type</span></span>
<span class="highlighted-comment-line">    }</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Convert-data-type-at-index-time" class="common-anchor-header">Contoh 3: Mengonversi tipe data pada saat mengindeks<button data-href="#Example-3-Convert-data-type-at-index-time" class="anchor-icon" translate="no">
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
    </button></h3><p>Terkadang data numerik secara keliru disimpan sebagai string. Gunakan fungsi <code translate="no">STRING_TO_DOUBLE</code> cast untuk mengonversi dan mengindeksnya dengan benar:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Convert string numbers to double for indexing</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-comment"># Must be set to AUTOINDEX or INVERTED for JSON path indexing</span></span>
    index_name=<span class="hljs-string">&quot;string_to_double_index&quot;</span>, <span class="hljs-comment"># Unique index name</span>
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;string_price&quot;]&#x27;</span>, <span class="hljs-comment"># Path to the JSON key to be indexed</span>
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;double&quot;</span>, <span class="hljs-comment"># Data cast type</span>
<span class="highlighted-wrapper-line">        <span class="hljs-string">&quot;json_cast_function&quot;</span>: <span class="hljs-string">&quot;STRING_TO_DOUBLE&quot;</span> <span class="hljs-comment"># Cast function; case insensitive</span></span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Penting</strong>: Jika konversi gagal untuk dokumen apa pun (misalnya, string non-numerik seperti <code translate="no">&quot;invalid&quot;</code>), nilai dokumen tersebut akan dikecualikan dari indeks dan tidak akan muncul dalam hasil yang difilter.</p>
<h3 id="Example-4-Index-entire-objects" class="common-anchor-header">Contoh 4: Mengindeks seluruh objek<button data-href="#Example-4-Index-entire-objects" class="anchor-icon" translate="no">
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
    </button></h3><p>Mengindeks seluruh objek JSON untuk memungkinkan kueri pada bidang apa pun di dalamnya. Saat Anda menggunakan <code translate="no">json_cast_type=&quot;JSON&quot;</code>, sistem secara otomatis:</p>
<ul>
<li><p>Meratakan<strong>struktur JSON</strong>: Objek bersarang diubah menjadi jalur datar untuk pengindeksan yang efisien</p></li>
<li><p><strong>Menyimpulkan tipe data</strong>: Setiap nilai secara otomatis dikategorikan sebagai numerik, string, boolean, atau tanggal berdasarkan isinya</p></li>
<li><p><strong>Menciptakan cakupan yang komprehensif</strong>: Semua kunci dan jalur bersarang di dalam objek menjadi dapat dicari</p></li>
</ul>
<p>Untuk <a href="/docs/id/json-indexing.md#Sample-JSON-structure">contoh struktur JSON</a> di atas, indeks seluruh objek <code translate="no">metadata</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Index the entire JSON object</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    index_name=<span class="hljs-string">&quot;metadata_full_index&quot;</span>,
    params={
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;JSON&quot;</span></span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>Anda juga dapat mengindeks hanya sebagian dari struktur JSON, seperti semua informasi <code translate="no">supplier</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Index a sub-object</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, 
    index_name=<span class="hljs-string">&quot;supplier_index&quot;</span>,
    params={
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;supplier&quot;]&#x27;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;JSON&quot;</span></span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Apply-index-configuration" class="common-anchor-header">Menerapkan konfigurasi indeks<button data-href="#Apply-index-configuration" class="anchor-icon" translate="no">
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
    </button></h3><p>Setelah menentukan semua parameter indeks Anda, terapkan parameter tersebut ke koleksi Anda:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Apply all index configurations to the collection</span>
MilvusClient.create_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>Setelah pengindeksan selesai, kueri bidang JSON Anda akan secara otomatis menggunakan indeks ini untuk kinerja yang lebih cepat.</p>
<h2 id="FAQ" class="common-anchor-header">PERTANYAAN UMUM<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="What-happens-if-a-querys-filter-expression-uses-a-different-type-than-the-indexed-cast-type" class="common-anchor-header">Apa yang terjadi jika ekspresi filter kueri menggunakan jenis yang berbeda dari jenis cast yang diindeks?<button data-href="#What-happens-if-a-querys-filter-expression-uses-a-different-type-than-the-indexed-cast-type" class="anchor-icon" translate="no">
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
    </button></h3><p>Jika ekspresi filter Anda menggunakan tipe yang berbeda dari tipe indeks <code translate="no">json_cast_type</code>, Milvus tidak akan menggunakan indeks dan mungkin akan kembali ke pemindaian brute-force yang lebih lambat jika datanya memungkinkan. Untuk performa terbaik, selalu selaraskan ekspresi filter Anda dengan tipe cast dari indeks. Sebagai contoh, jika indeks numerik dibuat dengan <code translate="no">json_cast_type=&quot;double&quot;</code>, hanya kondisi filter numerik yang akan memanfaatkan indeks.</p>
<h3 id="When-creating-a-JSON-index-what-if-a-JSON-key-has-inconsistent-data-types-across-different-entities" class="common-anchor-header">Saat membuat indeks JSON, bagaimana jika kunci JSON memiliki tipe data yang tidak konsisten di berbagai entitas?<button data-href="#When-creating-a-JSON-index-what-if-a-JSON-key-has-inconsistent-data-types-across-different-entities" class="anchor-icon" translate="no">
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
    </button></h3><p>Tipe yang tidak konsisten dapat menyebabkan <strong>pengindeksan parsial</strong>. Misalnya, jika bidang <code translate="no">metadata[&quot;price&quot;]</code> disimpan sebagai angka (<code translate="no">99.99</code>) dan string (<code translate="no">&quot;99.99&quot;</code>) dan Anda membuat indeks dengan <code translate="no">json_cast_type=&quot;double&quot;</code>, hanya nilai numerik yang akan diindeks. Entri berbentuk string akan dilewati dan tidak akan muncul dalam hasil filter.</p>
<h3 id="Can-I-create-multiple-indexes-on-the-same-JSON-key" class="common-anchor-header">Dapatkah saya membuat beberapa indeks pada kunci JSON yang sama?<button data-href="#Can-I-create-multiple-indexes-on-the-same-JSON-key" class="anchor-icon" translate="no">
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
    </button></h3><p>Tidak, setiap kunci JSON hanya mendukung satu indeks. Anda harus memilih satu <code translate="no">json_cast_type</code> yang sesuai dengan data Anda. Namun, Anda dapat membuat indeks pada seluruh objek JSON dan indeks pada kunci bersarang di dalam objek tersebut.</p>
<h3 id="Does-a-JSON-field-support-setting-a-default-value" class="common-anchor-header">Apakah bidang JSON mendukung pengaturan nilai default?<button data-href="#Does-a-JSON-field-support-setting-a-default-value" class="anchor-icon" translate="no">
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
    </button></h3><p>Tidak, bidang JSON tidak mendukung nilai default. Namun, Anda dapat menetapkan <code translate="no">nullable=True</code> saat mendefinisikan bidang untuk mengizinkan entri kosong. Untuk informasi lebih lanjut, lihat <a href="/docs/id/nullable-and-default.md">Nullable &amp; Default</a>.</p>
