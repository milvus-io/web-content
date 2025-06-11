---
id: inverted.md
title: TERBALIK
summary: >-
  Indeks INVERTED di Milvus dirancang untuk mempercepat kueri penyaringan pada
  bidang skalar dan bidang JSON terstruktur. Dengan memetakan istilah ke dokumen
  atau catatan yang berisi istilah tersebut, indeks terbalik sangat meningkatkan
  kinerja kueri dibandingkan dengan pencarian brute force.
---
<h1 id="INVERTED" class="common-anchor-header">TERBALIK<button data-href="#INVERTED" class="anchor-icon" translate="no">
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
    </button></h1><p>Indeks <code translate="no">INVERTED</code> di Milvus dirancang untuk mempercepat kueri penyaringan pada bidang skalar dan bidang JSON terstruktur. Dengan memetakan istilah ke dokumen atau catatan yang berisi istilah tersebut, indeks terbalik sangat meningkatkan kinerja kueri dibandingkan dengan pencarian brute force.</p>
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
    </button></h2><p>Didukung oleh <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a>, Milvus mengimplementasikan pengindeksan terbalik untuk mempercepat kueri filter, terutama untuk data tekstual. Berikut cara kerjanya:</p>
<ol>
<li><p>Memberi<strong>Token pada Data</strong>: Milvus mengambil data mentah Anda-dalam contoh ini, dua kalimat:</p>
<ul>
<li><p><strong>"Milvus adalah basis data vektor asli cloud."</strong></p></li>
<li><p><strong>"Milvus sangat bagus dalam hal kinerja."</strong></p></li>
</ul>
<p>dan memecahnya menjadi kata-kata unik (misalnya, <em>Milvus</em>, <em>adalah</em>, <em>cloud-native</em>, <em>vektor</em>, <em>basis data</em>, <em>sangat</em>, <em>baik</em>, <em>pada</em>, <em>kinerja</em>).</p></li>
<li><p><strong>Membangun Kamus Istilah</strong>: Kata-kata unik ini disimpan dalam daftar terurut yang disebut <strong>Kamus Istilah</strong>. Kamus ini memungkinkan Milvus dengan cepat memeriksa apakah sebuah kata ada dan menemukan posisinya di dalam indeks.</p></li>
<li><p><strong>Membuat Daftar Terbalik</strong>: Untuk setiap kata dalam Kamus Istilah, Milvus menyimpan <strong>Daftar Terbalik</strong> yang menunjukkan dokumen mana saja yang mengandung kata tersebut. Misalnya, <strong>"Milvus"</strong> muncul di kedua kalimat, sehingga daftar terbalik menunjuk ke kedua ID dokumen.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/inverted.png" alt="Inverted" class="doc-image" id="inverted" />
   </span> <span class="img-wrapper"> <span>Terbalik</span> </span></p>
<p>Karena kamus diurutkan, pemfilteran berbasis istilah dapat ditangani secara efisien. Alih-alih memindai semua dokumen, Milvus hanya mencari istilah dalam kamus dan mengambil daftar terbalik-secara signifikan mempercepat pencarian dan penyaringan pada set data yang besar.</p>
<h2 id="Index-a-regular-scalar-field" class="common-anchor-header">Mengindeks bidang skalar biasa<button data-href="#Index-a-regular-scalar-field" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk bidang skalar seperti <strong>BOOL</strong>, <strong>INT8</strong>, <strong>INT16</strong>, <strong>INT32</strong>, <strong>INT64</strong>, <strong>FLOAT</strong>, <strong>DOUBLE</strong>, <strong>VARCHAR</strong>, dan <strong>ARRAY</strong>, membuat indeks terbalik sangatlah mudah. Gunakan metode <code translate="no">create_index()</code> dengan parameter <code translate="no">index_type</code> yang disetel ke <code translate="no">&quot;INVERTED&quot;</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
)

index_params = client.create_index_params() <span class="hljs-comment"># Prepare an empty IndexParams object, without having to specify any index parameters</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;scalar_field_1&quot;</span>, <span class="hljs-comment"># Name of the scalar field to be indexed</span>
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>, <span class="hljs-comment"># Type of index to be created</span>
    index_name=<span class="hljs-string">&quot;inverted_index&quot;</span> <span class="hljs-comment"># Name of the index to be created</span>
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment"># Specify the collection name</span>
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Index-a-JSON-field" class="common-anchor-header">Mengindeks bidang JSON<button data-href="#Index-a-JSON-field" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus memperluas kemampuan pengindeksannya ke bidang JSON, sehingga Anda dapat memfilter secara efisien pada data bersarang atau terstruktur yang disimpan dalam satu kolom. Tidak seperti kolom skalar, ketika mengindeks kolom JSON, Anda harus menyediakan dua parameter tambahan:</p>
<ul>
<li><p><code translate="no">json_path</code><strong>:</strong> Menentukan kunci bersarang untuk mengindeks.</p></li>
<li><p><code translate="no">json_cast_type</code><strong>:</strong> Menentukan tipe data (misalnya, <code translate="no">&quot;varchar&quot;</code>, <code translate="no">&quot;double&quot;</code>, atau <code translate="no">&quot;bool&quot;</code>) yang akan digunakan untuk meng-cast nilai JSON yang diekstrak.</p></li>
</ul>
<p>Sebagai contoh, pertimbangkan bidang JSON bernama <code translate="no">metadata</code> dengan struktur berikut:</p>
<pre><code translate="no" class="language-plaintext">{
  &quot;metadata&quot;: {
    &quot;product_info&quot;: {
      &quot;category&quot;: &quot;electronics&quot;,
      &quot;brand&quot;: &quot;BrandA&quot;
    },
    &quot;price&quot;: 99.99,
    &quot;in_stock&quot;: true,
    &quot;tags&quot;: [&quot;summer_sale&quot;, &quot;clearance&quot;]
  }
}
<button class="copy-code-btn"></button></code></pre>
<p>Untuk membuat indeks terbalik pada jalur JSON tertentu, Anda dapat menggunakan pendekatan berikut:</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

<span class="hljs-comment"># Example 1: Index the &#x27;category&#x27; key inside &#x27;product_info&#x27; as a string.</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,         <span class="hljs-comment"># JSON field name</span>
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,         <span class="hljs-comment"># Specify the inverted index type</span>
    index_name=<span class="hljs-string">&quot;json_index_1&quot;</span>,      <span class="hljs-comment"># Custom name for this JSON index</span>
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata[\&quot;product_info\&quot;][\&quot;category\&quot;]&quot;</span>,  <span class="hljs-comment"># Path to the &#x27;category&#x27; key</span>
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;varchar&quot;</span>   <span class="hljs-comment"># Cast the value as a string</span>
    }
)

<span class="hljs-comment"># Example 2: Index the &#x27;price&#x27; key as a numeric type (double).</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,         <span class="hljs-comment"># JSON field name</span>
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,
    index_name=<span class="hljs-string">&quot;json_index_2&quot;</span>,      <span class="hljs-comment"># Custom name for this JSON index</span>
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata[\&quot;price\&quot;]&quot;</span>,  <span class="hljs-comment"># Path to the &#x27;price&#x27; key</span>
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;double&quot;</span>           <span class="hljs-comment"># Cast the value as a double</span>
    }
)

<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Deskripsi</p></th>
     <th><p>Contoh Nilai</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">field_name</code></p></td>
     <td><p>Nama bidang JSON dalam skema Anda.</p></td>
     <td><p><code translate="no">"metadata"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">index_type</code></p></td>
     <td><p>Jenis indeks yang akan dibuat; saat ini hanya <code translate="no">INVERTED</code> yang didukung untuk pengindeksan jalur JSON.</p></td>
     <td><p><code translate="no">"INVERTED"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">index_name</code></p></td>
     <td><p>(Opsional) Nama indeks khusus. Tentukan nama yang berbeda jika Anda membuat beberapa indeks pada bidang JSON yang sama.</p></td>
     <td><p><code translate="no">"json_index_1"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.json_path</code></p></td>
     <td><p>Menentukan jalur JSON mana yang akan diindeks. Anda dapat menargetkan kunci bersarang, posisi larik, atau keduanya (misalnya, <code translate="no">metadata["product_info"]["category"]</code> atau <code translate="no">metadata["tags"][0]</code>). Jika jalur tidak ada atau elemen larik tidak ada untuk baris tertentu, maka baris tersebut akan dilewati begitu saja saat pengindeksan, dan tidak ada kesalahan yang akan muncul.</p></td>
     <td><p><code translate="no">"metadata[\"product_info\"][\"category\"]"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.json_cast_type</code></p></td>
     <td><p>Tipe data yang akan digunakan Milvus untuk meng-cast nilai JSON yang diekstrak ketika membangun indeks. Nilai yang valid:</p>
<ul>
<li><p><code translate="no">"bool"</code> atau <code translate="no">"BOOL"</code></p></li>
<li><p><code translate="no">"double"</code> atau <code translate="no">"DOUBLE"</code></p></li>
<li><p><code translate="no">"varchar"</code> atau <code translate="no">"VARCHAR"</code></p>
<p><strong>Catatan</strong>: Untuk nilai bilangan bulat, Milvus secara internal menggunakan double untuk indeks. Bilangan bulat besar di atas 2^53 akan kehilangan presisi. Jika cast gagal (karena ketidakcocokan tipe), tidak ada kesalahan yang dilemparkan, dan nilai baris tersebut tidak diindeks.</p></li>
</ul></td>
     <td><p><code translate="no">"varchar"</code></p></td>
   </tr>
</table>
<h2 id="Considerations-on-JSON-indexing" class="common-anchor-header">Pertimbangan tentang pengindeksan JSON<button data-href="#Considerations-on-JSON-indexing" class="anchor-icon" translate="no">
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
<li><p><strong>Logika pemfilteran</strong>:</p>
<ul>
<li><p>Jika Anda <strong>membuat indeks tipe ganda</strong> (<code translate="no">json_cast_type=&quot;double&quot;</code>), hanya kondisi filter tipe numerik yang dapat menggunakan indeks tersebut. Jika filter membandingkan indeks ganda dengan kondisi non-numerik, Milvus akan kembali ke pencarian brute force.</p></li>
<li><p>Jika Anda <strong>membuat indeks tipe varchar</strong> (<code translate="no">json_cast_type=&quot;varchar&quot;</code>), hanya kondisi filter tipe string yang dapat menggunakan indeks tersebut. Jika tidak, Milvus akan kembali ke pencarian brute force.</p></li>
<li><p>Pengindeksan<strong>boolean</strong> berperilaku serupa dengan tipe varchar.</p></li>
</ul></li>
<li><p><strong>Ekspresi istilah</strong>:</p>
<ul>
<li>Anda dapat menggunakan <code translate="no">json[&quot;field&quot;] in [value1, value2, …]</code>. Namun, indeks hanya bekerja untuk nilai skalar yang disimpan di bawah jalur tersebut. Jika <code translate="no">json[&quot;field&quot;]</code> adalah larik, kueri akan kembali ke pengindeksan brute force (pengindeksan tipe larik belum didukung).</li>
</ul></li>
<li><p><strong>Ketepatan numerik</strong>:</p>
<ul>
<li>Secara internal, Milvus mengindeks semua bidang numerik sebagai ganda. Jika nilai numerik melebihi <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">2532^{53}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8141em;"></span></span></span></span> 2 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">53</span></span></span></span></span></span></span></span></span></span></span></span>, maka nilai tersebut akan kehilangan presisi, dan kueri pada nilai di luar rentang tersebut mungkin tidak akan cocok dengan tepat.</li>
</ul></li>
<li><p><strong>Integritas data</strong>:</p>
<ul>
<li>Milvus tidak mem-parsing atau mengubah kunci JSON di luar casting yang Anda tentukan. Jika data sumber tidak konsisten (misalnya, beberapa baris menyimpan string untuk kunci <code translate="no">&quot;k&quot;</code> sementara yang lain menyimpan angka), beberapa baris tidak akan diindeks.</li>
</ul></li>
</ul>
