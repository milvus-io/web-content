---
id: json-field-overview.md
title: Ikhtisar Bidang JSON
summary: >-
  Ketika membangun aplikasi seperti katalog produk, sistem manajemen konten,
  atau mesin preferensi pengguna, Anda sering kali perlu menyimpan metadata yang
  fleksibel di samping penyematan vektor. Atribut produk bervariasi berdasarkan
  kategori, preferensi pengguna berkembang dari waktu ke waktu, dan properti
  dokumen memiliki struktur bersarang yang kompleks. Bidang JSON di Milvus
  mengatasi tantangan ini dengan memungkinkan Anda menyimpan dan meminta data
  terstruktur yang fleksibel tanpa mengorbankan kinerja.
---
<h1 id="JSON-Field-Overview" class="common-anchor-header">Ikhtisar Bidang JSON<button data-href="#JSON-Field-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Ketika membangun aplikasi seperti katalog produk, sistem manajemen konten, atau mesin preferensi pengguna, Anda sering kali perlu menyimpan metadata yang fleksibel di samping penyematan vektor. Atribut produk bervariasi berdasarkan kategori, preferensi pengguna berkembang dari waktu ke waktu, dan properti dokumen memiliki struktur bersarang yang kompleks. Bidang JSON di Milvus mengatasi tantangan ini dengan memungkinkan Anda menyimpan dan meminta data terstruktur yang fleksibel tanpa mengorbankan kinerja.</p>
<h2 id="What-is-a-JSON-field" class="common-anchor-header">Apa yang dimaksud dengan bidang JSON?<button data-href="#What-is-a-JSON-field" class="anchor-icon" translate="no">
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
    </button></h2><p>Bidang JSON adalah tipe data yang ditentukan skema (<code translate="no">DataType.JSON</code>) di Milvus yang menyimpan data nilai-kunci terstruktur. Tidak seperti kolom basis data tradisional yang kaku, field JSON mengakomodasi objek bersarang, array, dan tipe data campuran sambil menyediakan beberapa opsi pengindeksan untuk kueri cepat.</p>
<p>Contoh struktur bidang JSON:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
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
<p>Dalam contoh ini, <code translate="no">metadata</code> adalah bidang JSON tunggal yang berisi campuran nilai datar (misalnya <code translate="no">category</code>, <code translate="no">in_stock</code>), larik (<code translate="no">tags</code>), dan objek bersarang (<code translate="no">supplier</code>).</p>
<div class="alert note">
<p><strong>Konvensi penamaan:</strong> Gunakan hanya huruf, angka, dan garis bawah pada kunci JSON. Hindari karakter khusus, spasi, atau titik karena dapat menyebabkan masalah penguraian dalam kueri.</p>
</div>
<h2 id="JSON-field-vs-dynamic-field" class="common-anchor-header">Bidang JSON vs bidang dinamis<button data-href="#JSON-field-vs-dynamic-field" class="anchor-icon" translate="no">
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
    </button></h2><p>Hal yang sering membingungkan adalah perbedaan antara field JSON dan <a href="/docs/id/enable-dynamic-field.md">field dinamis</a>. Meskipun keduanya terkait dengan JSON, keduanya memiliki tujuan yang berbeda.</p>
<p>Tabel di bawah ini merangkum perbedaan utama antara field JSON dan field dinamis:</p>
<table>
   <tr>
     <th><p>Fitur</p></th>
     <th><p>Bidang JSON</p></th>
     <th><p>Bidang Dinamis</p></th>
   </tr>
   <tr>
     <td><p>Definisi skema</p></td>
     <td><p>Bidang skalar yang harus dideklarasikan secara eksplisit di dalam skema koleksi dengan tipe <code translate="no">DataType.JSON</code>.</p></td>
     <td><p>Bidang JSON tersembunyi (bernama <code translate="no">$meta</code>) yang secara otomatis menyimpan bidang yang tidak dideklarasikan.</p></td>
   </tr>
   <tr>
     <td><p>Kasus penggunaan</p></td>
     <td><p>Menyimpan data terstruktur yang skemanya diketahui dan konsisten.</p></td>
     <td><p>Menyimpan data yang fleksibel, berkembang, atau semi-terstruktur yang tidak sesuai dengan skema tetap.</p></td>
   </tr>
   <tr>
     <td><p>Kontrol</p></td>
     <td><p>Anda mengontrol nama dan struktur bidang.</p></td>
     <td><p>Dikelola sistem untuk bidang yang tidak ditentukan.</p></td>
   </tr>
   <tr>
     <td><p>Kueri</p></td>
     <td><p>Kueri menggunakan nama bidang atau kunci target di dalam bidang JSON: <code translate="no">metadata["key"]</code>.</p></td>
     <td><p>Kueri secara langsung menggunakan kunci bidang dinamis: <code translate="no">"dynamic_key"</code> atau melalui <code translate="no">$meta</code>: <code translate="no">$meta["dynamic_key"]</code></p></td>
   </tr>
</table>
<h2 id="Basic-operations" class="common-anchor-header">Operasi dasar<button data-href="#Basic-operations" class="anchor-icon" translate="no">
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
    </button></h2><p>Alur kerja dasar untuk menggunakan bidang JSON melibatkan pendefinisiannya di dalam skema Anda, memasukkan data, dan kemudian melakukan kueri data dengan menggunakan ekspresi filter tertentu.</p>
<h3 id="Define-a-JSON-field" class="common-anchor-header">Mendefinisikan bidang JSON<button data-href="#Define-a-JSON-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Untuk menggunakan bidang JSON, tentukan secara eksplisit dalam skema koleksi Anda saat membuat koleksi. Contoh berikut ini menunjukkan cara membuat koleksi dengan bidang <code translate="no">metadata</code> bertipe <code translate="no">DataType.JSON</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>) <span class="hljs-comment"># Replace with your server address </span>

<span class="hljs-comment"># Create schema</span>
schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">True</span>)

schema.add_field(field_name=<span class="hljs-string">&quot;product_id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>) <span class="hljs-comment"># Primary field</span>
schema.add_field(field_name=<span class="hljs-string">&quot;vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>) <span class="hljs-comment"># Vector field</span>
<span class="hljs-comment"># Define a JSON field that allows null values</span>
<span class="highlighted-wrapper-line">schema.add_field(field_name=<span class="hljs-string">&quot;metadata&quot;</span>, datatype=DataType.JSON, nullable=<span class="hljs-literal">True</span>)</span>

client.create_collection(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
    schema=schema
)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Dalam contoh ini, bidang JSON yang ditetapkan dalam skema koleksi memungkinkan nilai null dengan <code translate="no">nullable=True</code>. Untuk detailnya, lihat <a href="/docs/id/nullable-and-default.md">Nullable &amp; Default</a>.</p>
</div>
<h3 id="Insert-data" class="common-anchor-header">Menyisipkan data<button data-href="#Insert-data" class="anchor-icon" translate="no">
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
    </button></h3><p>Setelah koleksi dibuat, masukkan entitas yang berisi objek JSON terstruktur di bidang JSON yang Anda tentukan. Data Anda harus diformat sebagai daftar kamus.</p>
<pre><code translate="no" class="language-python">entities = [
    {
        <span class="hljs-string">&quot;product_id&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>],
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;metadata&quot;</span>: { <span class="hljs-comment"># JSON field</span></span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;electronics&quot;</span>,</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>,</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>,</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;string_price&quot;</span>: <span class="hljs-string">&quot;99.99&quot;</span>,</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;clearance&quot;</span>, <span class="hljs-string">&quot;summer_sale&quot;</span>],</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;supplier&quot;</span>: {</span>
<span class="highlighted-comment-line">                <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;SupplierX&quot;</span>,</span>
<span class="highlighted-comment-line">                <span class="hljs-string">&quot;country&quot;</span>: <span class="hljs-string">&quot;USA&quot;</span>,</span>
<span class="highlighted-comment-line">                <span class="hljs-string">&quot;contact&quot;</span>: {</span>
<span class="highlighted-comment-line">                    <span class="hljs-string">&quot;email&quot;</span>: <span class="hljs-string">&quot;support@supplierx.com&quot;</span>,</span>
<span class="highlighted-comment-line">                    <span class="hljs-string">&quot;phone&quot;</span>: <span class="hljs-string">&quot;+1-800-555-0199&quot;</span></span>
<span class="highlighted-comment-line">                }</span>
<span class="highlighted-comment-line">            }</span>
<span class="highlighted-comment-line">        }</span>
    }
]

client.insert(collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>, data=entities)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Filtering-operations" class="common-anchor-header">Operasi pemfilteran<button data-href="#Filtering-operations" class="anchor-icon" translate="no">
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
    </button></h3><p>Sebelum Anda dapat melakukan operasi pemfilteran pada bidang JSON, pastikan:</p>
<ul>
<li><p>Anda telah membuat indeks pada setiap bidang vektor.</p></li>
<li><p>Koleksi dimuat ke dalam memori.</p></li>
</ul>
<p><details></p>
<p><summary>Menampilkan kode</summary></p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>
)

client.create_index(collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>, index_params=index_params)

client.load_collection(collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>Setelah persyaratan ini terpenuhi, Anda dapat menggunakan ekspresi di bawah ini untuk memfilter koleksi Anda berdasarkan nilai di dalam bidang JSON. Ekspresi filter ini memanfaatkan sintaksis jalur JSON tertentu dan operator khusus.</p>
<h4 id="Filtering-with-JSON-path-syntax" class="common-anchor-header">Memfilter dengan sintaks jalur JSON</h4><p>Untuk menanyakan kunci tertentu, gunakan notasi tanda kurung untuk mengakses kunci JSON: <code translate="no">json_field_name[&quot;key&quot;]</code>. Untuk kunci bersarang, rangkai kunci-kunci tersebut menjadi satu: <code translate="no">json_field_name[&quot;key1&quot;][&quot;key2&quot;]</code>.</p>
<p>Untuk memfilter entitas di mana <code translate="no">category</code> adalah <code translate="no">&quot;electronics&quot;</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define filter expression</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;metadata[&quot;category&quot;] == &quot;electronics&quot;&#x27;</span>

client.search(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,  <span class="hljs-comment"># Collection name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],               <span class="hljs-comment"># Query vector (must match collection&#x27;s vector dim)</span>
    limit=<span class="hljs-number">5</span>,                           <span class="hljs-comment"># Max. number of results to return</span>
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,                    <span class="hljs-comment"># Filter expression</span></span>
    output_fields=[<span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>]   <span class="hljs-comment"># Fields to include in the search results</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Untuk memfilter entitas dengan kunci bersarang <code translate="no">supplier[&quot;country&quot;]</code> adalah <code translate="no">&quot;USA&quot;</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define filter expression</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;metadata[&quot;supplier&quot;][&quot;country&quot;] == &quot;USA&quot;&#x27;</span>

res = client.search(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,  <span class="hljs-comment"># Collection name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],               <span class="hljs-comment"># Query vector (must match collection&#x27;s vector dim)</span>
    limit=<span class="hljs-number">5</span>,                           <span class="hljs-comment"># Max. number of results to return</span>
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,                    <span class="hljs-comment"># Filter expression</span></span>
    output_fields=[<span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>]   <span class="hljs-comment"># Fields to include in the search results</span>
)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<h4 id="Filtering-with-JSON-specific-operators" class="common-anchor-header">Memfilter dengan operator khusus JSON</h4><p>Milvus juga menyediakan operator khusus untuk menanyakan nilai larik pada kunci bidang JSON tertentu. Sebagai contoh:</p>
<ul>
<li><p><code translate="no">json_contains(identifier, expr)</code>: Memeriksa apakah elemen atau sub-larik tertentu ada di dalam larik JSON</p></li>
<li><p><code translate="no">json_contains_all(identifier, expr)</code>: Memastikan bahwa semua elemen dari ekspresi JSON yang ditentukan ada di dalam field</p></li>
<li><p><code translate="no">json_contains_any(identifier, expr)</code>: Memfilter entitas yang setidaknya memiliki satu anggota ekspresi JSON di dalam field</p></li>
</ul>
<p>Untuk menemukan produk yang memiliki nilai <code translate="no">&quot;summer_sale&quot;</code> di bawah kunci <code translate="no">tags</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define filter expression</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_contains(metadata[&quot;tags&quot;], &quot;summer_sale&quot;)&#x27;</span>

res = client.search(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,  <span class="hljs-comment"># Collection name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],               <span class="hljs-comment"># Query vector (must match collection&#x27;s vector dim)</span>
    limit=<span class="hljs-number">5</span>,                           <span class="hljs-comment"># Max. number of results to return</span>
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,                    <span class="hljs-comment"># Filter expression</span></span>
    output_fields=[<span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>]   <span class="hljs-comment"># Fields to include in the search results</span>
)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<p>Untuk menemukan produk yang memiliki setidaknya satu dari nilai <code translate="no">&quot;electronics&quot;</code>, <code translate="no">&quot;new&quot;</code>, atau <code translate="no">&quot;clearance&quot;</code> di bawah kunci <code translate="no">tags</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define filter expression</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_contains_any(metadata[&quot;tags&quot;], [&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;])&#x27;</span>

res = client.search(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,  <span class="hljs-comment"># Collection name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],               <span class="hljs-comment"># Query vector (must match collection&#x27;s vector dim)</span>
    limit=<span class="hljs-number">5</span>,                           <span class="hljs-comment"># Max. number of results to return</span>
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,                    <span class="hljs-comment"># Filter expression</span></span>
    output_fields=[<span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>]   <span class="hljs-comment"># Fields to include in the search results</span>
)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<p>Untuk informasi lebih lanjut tentang operator khusus JSON, lihat <a href="/docs/id/json-operators.md">Operator JSON</a>.</p>
<h2 id="Next-Accelerate-JSON-queries" class="common-anchor-header">Berikutnya: Mempercepat kueri JSON<button data-href="#Next-Accelerate-JSON-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>Secara default, kueri pada bidang JSON tanpa akselerasi akan melakukan pemindaian penuh terhadap semua baris, yang dapat berjalan lambat pada kumpulan data yang besar. Untuk mempercepat kueri JSON, Milvus menyediakan fitur pengindeksan dan pengoptimalan penyimpanan tingkat lanjut.</p>
<p>Tabel di bawah ini merangkum perbedaan dan skenario penggunaan terbaiknya:</p>
<table>
   <tr>
     <th><p>Teknik</p></th>
     <th><p>Terbaik Untuk</p></th>
     <th><p>Akselerasi Larik</p></th>
     <th><p>Catatan</p></th>
   </tr>
   <tr>
     <td><p>Pengindeksan JSON</p></td>
     <td><p>Kumpulan kecil kunci yang sering diakses, larik pada kunci larik tertentu</p></td>
     <td><p>Ya (pada kunci larik yang diindeks)</p></td>
     <td><p>Harus memilih kunci terlebih dahulu, diperlukan pemeliharaan jika skema berkembang</p></td>
   </tr>
   <tr>
     <td><p>Penghancuran JSON</p></td>
     <td><p>Percepatan umum di banyak kunci, fleksibel untuk beragam kueri</p></td>
     <td><p>Tidak (tidak mempercepat nilai di dalam larik)</p></td>
     <td><p>Konfigurasi penyimpanan ekstra, larik masih membutuhkan indeks per kunci</p></td>
   </tr>
   <tr>
     <td><p>Indeks NGRAM</p></td>
     <td><p>Pencarian wildcard, pencocokan substring dalam bidang teks</p></td>
     <td><p>N/A</p></td>
     <td><p>Tidak untuk filter numerik/rentang</p></td>
   </tr>
</table>
<p><strong>Tips:</strong> Anda dapat menggabungkan pendekatan-pendekatan ini-misalnya, menggunakan penghancuran JSON untuk akselerasi kueri yang luas, pengindeksan JSON untuk kunci larik berfrekuensi tinggi, dan pengindeksan NGRAM untuk penelusuran teks yang fleksibel.</p>
<p>Untuk detail implementasi, lihat:</p>
<ul>
<li><p><a href="/docs/id/json-indexing.md">Pengindeksan JSON</a></p></li>
<li><p><a href="/docs/id/json-shredding.md">Penghancuran JSON</a></p></li>
<li><p><a href="/docs/id/ngram.md">NGRAM</a></p></li>
</ul>
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
    </button></h2><h3 id="Are-there-any-limitations-on-the-size-of-a-JSON-field" class="common-anchor-header">Apakah ada batasan pada ukuran bidang JSON?<button data-href="#Are-there-any-limitations-on-the-size-of-a-JSON-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Ya. Setiap bidang JSON dibatasi hingga 65.536 byte.</p>
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
    </button></h3><p>Tidak, bidang JSON tidak mendukung nilai default. Namun, Anda dapat mengatur <code translate="no">nullable=True</code> saat mendefinisikan bidang untuk mengizinkan entri kosong.</p>
<p>Lihat <a href="/docs/id/nullable-and-default.md">Nullable &amp; Default</a> untuk detailnya.</p>
<h3 id="Are-there-any-naming-conventions-for-JSON-field-keys" class="common-anchor-header">Apakah ada konvensi penamaan untuk kunci bidang JSON?<button data-href="#Are-there-any-naming-conventions-for-JSON-field-keys" class="anchor-icon" translate="no">
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
    </button></h3><p>Ya, untuk memastikan kompatibilitas dengan kueri dan pengindeksan:</p>
<ul>
<li><p>Gunakan hanya huruf, angka, dan garis bawah pada kunci JSON.</p></li>
<li><p>Hindari penggunaan karakter khusus, spasi, atau titik (<code translate="no">.</code>, <code translate="no">/</code>, dll.).</p></li>
<li><p>Kunci yang tidak kompatibel dapat menyebabkan masalah penguraian dalam ekspresi filter.</p></li>
</ul>
<h3 id="How-does-Milvus-handle-string-values-in-JSON-fields" class="common-anchor-header">Bagaimana Milvus menangani nilai string dalam bidang JSON?<button data-href="#How-does-Milvus-handle-string-values-in-JSON-fields" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus menyimpan nilai string persis seperti yang muncul di input JSON-tanpa transformasi semantik. String yang dikutip dengan tidak benar dapat mengakibatkan kesalahan selama penguraian.</p>
<p><strong>Contoh string yang valid</strong>:</p>
<pre><code translate="no" class="language-plaintext">&quot;a\&quot;b&quot;, &quot;a&#x27;b&quot;, &quot;a\\b&quot;
<button class="copy-code-btn"></button></code></pre>
<p><strong>Contoh string yang tidak valid</strong>:</p>
<pre><code translate="no" class="language-plaintext">&#x27;a&quot;b&#x27;, &#x27;a\&#x27;b&#x27;
<button class="copy-code-btn"></button></code></pre>
