---
id: multi-vector-search.md
order: 2
summary: >-
  Panduan ini mendemonstrasikan cara melakukan pencarian hybrid di Milvus dan
  memahami pemeringkatan hasil.
title: Pencarian Hibrida
---
<h1 id="Hybrid-Search" class="common-anchor-header">Pencarian Hibrida<button data-href="#Hybrid-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>Sejak Milvus 2.4, kami memperkenalkan dukungan multi-vektor dan kerangka kerja pencarian hibrida, yang berarti pengguna dapat memasukkan beberapa bidang vektor (hingga 10) ke dalam satu koleksi. Vektor-vektor dalam kolom yang berbeda ini mewakili berbagai aspek data, yang berasal dari model penyematan yang berbeda atau menjalani metode pemrosesan yang berbeda. Hasil pencarian hibrida diintegrasikan menggunakan strategi pemeringkatan ulang, seperti Reciprocal Rank Fusion (RRF) dan Weighted Scoring. Untuk mempelajari lebih lanjut tentang strategi pemeringkatan ulang, lihat <a href="/docs/id/v2.4.x/reranking.md">Pemeringkatan</a> Ulang.</p>
<p>Fitur ini sangat berguna dalam skenario pencarian yang komprehensif, seperti mengidentifikasi orang yang paling mirip dalam pustaka vektor berdasarkan berbagai atribut seperti gambar, suara, sidik jari, dll.</p>
<p>Dalam tutorial ini, Anda akan belajar bagaimana caranya:</p>
<ul>
<li><p>Membuat beberapa contoh <code translate="no">AnnSearchRequest</code> untuk pencarian kemiripan pada bidang vektor yang berbeda;</p></li>
<li><p>Mengonfigurasi strategi pemeringkatan ulang untuk menggabungkan dan memberi peringkat ulang hasil pencarian dari beberapa contoh <code translate="no">AnnSearchRequest</code>;</p></li>
<li><p>Menggunakan metode <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/hybrid_search.md"><code translate="no">hybrid_search()</code></a> untuk melakukan pencarian hibrida.</p></li>
</ul>
<div class="alert note">
<p>Cuplikan kode di halaman ini menggunakan <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Connections/connect.md">modul PyMilvus ORM</a> untuk berinteraksi dengan Milvus. Cuplikan kode dengan <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">MilvusClient SDK</a> yang baru akan segera tersedia.</p>
</div>
<h2 id="Preparations" class="common-anchor-header">Persiapan<button data-href="#Preparations" class="anchor-icon" translate="no">
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
    </button></h2><p>Sebelum memulai pencarian hibrida, pastikan Anda memiliki koleksi dengan beberapa bidang vektor. Saat ini, Milvus memperkenalkan default empat bidang vektor per koleksi, yang dapat diperluas hingga maksimum sepuluh dengan memodifikasi konfigurasi <a href="https://milvus.io/docs/configure_proxy.md#proxymaxVectorFieldNum">proxy.maxVectorFieldNum</a>.</p>
<p>Di bawah ini adalah contoh pembuatan koleksi bernama <code translate="no">test_collection</code> dengan dua bidang vektor, <code translate="no">filmVector</code> dan <code translate="no">posterVector</code>, dan memasukkan entitas acak ke dalamnya.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> connections, Collection, FieldSchema, CollectionSchema, DataType
<span class="hljs-keyword">import</span> random

<span class="hljs-comment"># Connect to Milvus</span>
connections.connect(
    host=<span class="hljs-string">&quot;127.0.0.1&quot;</span>, <span class="hljs-comment"># Replace with your Milvus server IP</span>
    port=<span class="hljs-string">&quot;19530&quot;</span>
)

<span class="hljs-comment"># Create schema</span>
fields = [
    FieldSchema(name=<span class="hljs-string">&quot;film_id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>),
    FieldSchema(name=<span class="hljs-string">&quot;filmVector&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>), <span class="hljs-comment"># Vector field for film vectors</span>
    FieldSchema(name=<span class="hljs-string">&quot;posterVector&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)] <span class="hljs-comment"># Vector field for poster vectors</span>

schema = CollectionSchema(fields=fields,enable_dynamic_field=<span class="hljs-literal">False</span>)

<span class="hljs-comment"># Create collection</span>
collection = Collection(name=<span class="hljs-string">&quot;test_collection&quot;</span>, schema=schema)

<span class="hljs-comment"># Create index for each vector field</span>
index_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;IVF_FLAT&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">128</span>},
}

collection.create_index(<span class="hljs-string">&quot;filmVector&quot;</span>, index_params)
collection.create_index(<span class="hljs-string">&quot;posterVector&quot;</span>, index_params)

<span class="hljs-comment"># Generate random entities to insert</span>
entities = []

<span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">1000</span>):
    <span class="hljs-comment"># generate random values for each field in the schema</span>
    film_id = random.randint(<span class="hljs-number">1</span>, <span class="hljs-number">1000</span>)
    film_vector = [ random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">5</span>) ]
    poster_vector = [ random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">5</span>) ]

    <span class="hljs-comment"># create a dictionary for each entity</span>
    entity = {
        <span class="hljs-string">&quot;film_id&quot;</span>: film_id,
        <span class="hljs-string">&quot;filmVector&quot;</span>: film_vector,
        <span class="hljs-string">&quot;posterVector&quot;</span>: poster_vector
    }

    <span class="hljs-comment"># add the entity to the list</span>
    entities.append(entity)
    
collection.insert(entities)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-1-Create-Multiple-AnnSearchRequest-Instances" class="common-anchor-header">Langkah 1: Membuat Beberapa Instance AnnSearchRequest<button data-href="#Step-1-Create-Multiple-AnnSearchRequest-Instances" class="anchor-icon" translate="no">
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
    </button></h2><p>Pencarian hybrid menggunakan API <code translate="no">hybrid_search()</code> untuk melakukan beberapa permintaan pencarian ANN dalam satu panggilan. Setiap <code translate="no">AnnSearchRequest</code> mewakili satu permintaan pencarian pada bidang vektor tertentu.</p>
<p>Contoh berikut ini membuat dua contoh <code translate="no">AnnSearchRequest</code> untuk melakukan pencarian kemiripan individual pada dua bidang vektor.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest

<span class="hljs-comment"># Create ANN search request 1 for filmVector</span>
query_filmVector = [[<span class="hljs-number">0.8896863042430693</span>, <span class="hljs-number">0.370613100114602</span>, <span class="hljs-number">0.23779315077113428</span>, <span class="hljs-number">0.38227915951132996</span>, <span class="hljs-number">0.5997064603128835</span>]]

search_param_1 = {
    <span class="hljs-string">&quot;data&quot;</span>: query_filmVector, <span class="hljs-comment"># Query vector</span>
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;filmVector&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># This parameter value must be identical to the one used in the collection schema</span>
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}
    },
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span> <span class="hljs-comment"># Number of search results to return in this AnnSearchRequest</span>
}
request_1 = AnnSearchRequest(**search_param_1)

<span class="hljs-comment"># Create ANN search request 2 for posterVector</span>
query_posterVector = [[<span class="hljs-number">0.02550758562349764</span>, <span class="hljs-number">0.006085637357292062</span>, <span class="hljs-number">0.5325251250159071</span>, <span class="hljs-number">0.7676432650114147</span>, <span class="hljs-number">0.5521074424751443</span>]]
search_param_2 = {
    <span class="hljs-string">&quot;data&quot;</span>: query_posterVector, <span class="hljs-comment"># Query vector</span>
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;posterVector&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># This parameter value must be identical to the one used in the collection schema</span>
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}
    },
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span> <span class="hljs-comment"># Number of search results to return in this AnnSearchRequest</span>
}
request_2 = AnnSearchRequest(**search_param_2)

<span class="hljs-comment"># Store these two requests as a list in `reqs`</span>
reqs = [request_1, request_2]
<button class="copy-code-btn"></button></code></pre>
<p>Parameter</p>
<ul>
<li><p><code translate="no">AnnSearchRequest</code> <em>(objek</em>)</p>
<p>Kelas yang mewakili permintaan pencarian ANN. Setiap pencarian hibrida dapat berisi 1 hingga 1.024 objek <code translate="no">ANNSearchRequest</code> sekaligus.</p></li>
<li><p><code translate="no">data</code> <em>(daftar</em>)</p>
<p>Vektor kueri untuk mencari dalam satu <code translate="no">AnnSearchRequest</code>. Saat ini, parameter ini hanya menerima daftar yang berisi satu vektor kueri, misalnya, <code translate="no">[[0.5791814851218929, 0.5792985702614121, 0.8480776460143558, 0.16098005945243, 0.2842979317256803]]</code>. Di masa mendatang, parameter ini akan diperluas untuk menerima beberapa vektor kueri.</p></li>
<li><p><code translate="no">anns_field</code> <em>(string</em>)</p>
<p>Nama bidang vektor yang akan digunakan dalam satu <code translate="no">AnnSearchRequest</code>.</p></li>
<li><p><code translate="no">param</code> <em>(dict</em>)</p>
<p>Kamus parameter pencarian untuk satu <code translate="no">AnnSearchRequest</code>. Parameter pencarian ini identik dengan parameter pencarian vektor tunggal. Untuk informasi lebih lanjut, lihat <a href="https://milvus.io/docs/single-vector-search.md#Search-parameters">Parameter pencarian</a>.</p></li>
<li><p><code translate="no">limit</code> <em>(int</em>)</p>
<p>Jumlah maksimum hasil pencarian yang akan disertakan dalam satu <code translate="no">ANNSearchRequest</code>.</p>
<p>Parameter ini hanya memengaruhi jumlah hasil pencarian yang akan dikembalikan dalam satu <code translate="no">ANNSearchRequest</code>, dan tidak menentukan hasil akhir yang akan dikembalikan untuk pemanggilan <code translate="no">hybrid_search</code>. Dalam pencarian hibrida, hasil akhir ditentukan dengan menggabungkan dan memberi peringkat ulang hasil dari beberapa contoh <code translate="no">ANNSearchRequest</code>.</p></li>
</ul>
<h2 id="Step-2-Configure-a-Reranking-Strategy" class="common-anchor-header">Langkah 2: Konfigurasikan Strategi Perangkingan Ulang<button data-href="#Step-2-Configure-a-Reranking-Strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>Setelah membuat contoh <code translate="no">AnnSearchRequest</code>, konfigurasikan strategi perangkingan ulang untuk menggabungkan dan memberi peringkat ulang hasil. Saat ini, ada dua opsi: <code translate="no">WeightedRanker</code> dan <code translate="no">RRFRanker</code>. Untuk informasi lebih lanjut tentang strategi pemeringkatan ulang, lihat <a href="/docs/id/v2.4.x/reranking.md">Pemeringkatan</a> Ulang.</p>
<ul>
<li><p>Gunakan penilaian tertimbang</p>
<p><code translate="no">WeightedRanker</code> digunakan untuk memberikan nilai penting pada hasil dari setiap pencarian bidang vektor dengan bobot tertentu. Jika Anda memprioritaskan beberapa bidang vektor di atas yang lain, <code translate="no">WeightedRanker(value1, value2, ..., valueN)</code> dapat merefleksikannya dalam hasil pencarian gabungan.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> WeightedRanker
<span class="hljs-comment"># Use WeightedRanker to combine results with specified weights</span>
<span class="hljs-comment"># Assign weights of 0.8 to text search and 0.2 to image search</span>
rerank = WeightedRanker(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.2</span>)  
<button class="copy-code-btn"></button></code></pre>
<p>Saat menggunakan <code translate="no">WeightedRanker</code>, perhatikan hal itu:</p>
<ul>
<li>Setiap nilai bobot berkisar dari 0 (paling tidak penting) hingga 1 (paling penting), yang mempengaruhi skor gabungan akhir.</li>
<li>Jumlah total nilai bobot yang disediakan di <code translate="no">WeightedRanker</code> harus sama dengan jumlah instance <code translate="no">AnnSearchRequest</code> yang Anda buat.</li>
</ul></li>
<li><p>Gunakan Reciprocal Rank Fusion (RFF)</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Alternatively, use RRFRanker for reciprocal rank fusion reranking</span>
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> RRFRanker

rerank = RRFRanker()
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Step-3-Perform-a-Hybrid-Search" class="common-anchor-header">Langkah 3: Lakukan Pencarian Hibrida<button data-href="#Step-3-Perform-a-Hybrid-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>Dengan <code translate="no">AnnSearchRequest</code> instance dan strategi perankingan ulang yang ditetapkan, gunakan metode <code translate="no">hybrid_search()</code> untuk melakukan pencarian hybrid.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Before conducting hybrid search, load the collection into memory.</span>
collection.load()

res = collection.hybrid_search(
    reqs, <span class="hljs-comment"># List of AnnSearchRequests created in step 1</span>
    rerank, <span class="hljs-comment"># Reranking strategy specified in step 2</span>
    limit=<span class="hljs-number">2</span> <span class="hljs-comment"># Number of final search results to return</span>
)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<p>Parameter:</p>
<ul>
<li><p><code translate="no">reqs</code> <em>(daftar</em>)</p>
<p>Daftar permintaan pencarian, di mana setiap permintaan adalah objek <code translate="no">ANNSearchRequest</code>. Setiap permintaan dapat berhubungan dengan bidang vektor yang berbeda dan set parameter pencarian yang berbeda.</p></li>
<li><p><code translate="no">rerank</code> <em>(objek</em>)</p>
<p>Strategi pemeringkatan yang akan digunakan untuk pencarian hibrida. Nilai yang mungkin: <code translate="no">WeightedRanker(value1, value2, ..., valueN)</code> dan <code translate="no">RRFRanker()</code>.</p>
<p>Untuk informasi lebih lanjut tentang strategi perangkingan ulang, lihat <a href="/docs/id/v2.4.x/reranking.md">Perangkingan</a> ulang.</p></li>
<li><p><code translate="no">limit</code> <em>(int</em>)</p>
<p>Jumlah maksimum hasil akhir yang akan dikembalikan dalam pencarian hibrida.</p></li>
</ul>
<p>Keluarannya mirip dengan yang berikut ini:</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;[&#x27;id: 844, distance: 0.006047376897186041, entity: {}&#x27;, &#x27;id: 876, distance: 0.006422005593776703, entity: {}&#x27;]&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Limits" class="common-anchor-header">Batas<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>Biasanya, setiap koleksi memiliki jatah default hingga 4 bidang vektor. Namun, Anda memiliki opsi untuk menyesuaikan konfigurasi <code translate="no">proxy.maxVectorFieldNum</code> untuk memperluas jumlah maksimum bidang vektor dalam koleksi, dengan batas maksimum 10 bidang vektor per koleksi. Lihat <a href="https://milvus.io/docs/configure_proxy.md#Proxy-related-Configurations">Konfigurasi terkait Proksi</a> untuk mengetahui lebih lanjut.</p></li>
<li><p>Bidang vektor yang diindeks atau dimuat sebagian dalam koleksi akan mengakibatkan kesalahan.</p></li>
<li><p>Saat ini, setiap <code translate="no">AnnSearchRequest</code> dalam penelusuran hibrida hanya dapat memuat satu vektor kueri.</p></li>
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
    </button></h2><ul>
<li><p><strong>Dalam skenario apa pencarian hibrida direkomendasikan?</strong></p>
<p>Pencarian hibrida ideal untuk situasi kompleks yang menuntut akurasi tinggi, terutama saat sebuah entitas dapat diwakili oleh beberapa vektor yang beragam. Hal ini berlaku untuk kasus-kasus di mana data yang sama, seperti kalimat, diproses melalui model penyematan yang berbeda atau ketika informasi multimodal (seperti gambar, sidik jari, dan sidik suara seseorang) dikonversi ke dalam berbagai format vektor. Dengan memberikan bobot pada vektor-vektor ini, pengaruh gabungannya dapat secara signifikan memperkaya daya ingat dan meningkatkan efektivitas hasil pencarian.</p></li>
<li><p><strong>Bagaimana pemeringkat berbobot menormalkan jarak antara bidang vektor yang berbeda?</strong></p>
<p>Pemeringkat berbobot menormalkan jarak antara bidang vektor menggunakan bobot yang ditetapkan untuk setiap bidang. Perangking ini menghitung tingkat kepentingan setiap bidang vektor berdasarkan bobotnya, dan memprioritaskan bidang yang memiliki bobot lebih tinggi. Disarankan untuk menggunakan jenis metrik yang sama di seluruh permintaan pencarian ANN untuk memastikan konsistensi. Metode ini memastikan bahwa vektor yang dianggap lebih penting memiliki pengaruh yang lebih besar pada peringkat keseluruhan.</p></li>
<li><p><strong>Apakah mungkin untuk menggunakan pemeringkat alternatif seperti Cohere Ranker atau BGE Ranker?</strong></p>
<p>Saat ini, hanya pemeringkat yang disediakan yang didukung. Rencana untuk menyertakan pemeringkat tambahan sedang dilakukan untuk pembaruan di masa mendatang.</p></li>
<li><p><strong>Apakah mungkin untuk melakukan beberapa operasi pencarian hybrid secara bersamaan?</strong></p>
<p>Ya, eksekusi beberapa operasi pencarian hybrid secara bersamaan didukung.</p></li>
<li><p><strong>Dapatkah saya menggunakan bidang vektor yang sama di beberapa objek AnnSearchRequest untuk melakukan pencarian hibrida?</strong></p>
<p>Secara teknis, dimungkinkan untuk menggunakan bidang vektor yang sama di beberapa objek AnnSearchRequest untuk pencarian hybrid. Tidak perlu memiliki beberapa bidang vektor untuk pencarian hibrida.</p></li>
</ul>
