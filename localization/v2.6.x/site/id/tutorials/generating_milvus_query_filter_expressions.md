---
id: generating_milvus_query_filter_expressions.md
summary: >-
  Dalam tutorial ini, kami akan mendemonstrasikan cara menggunakan Large
  Language Models (LLM) untuk secara otomatis menghasilkan ekspresi penyaringan
  Milvus dari kueri bahasa alami. Pendekatan ini membuat kueri basis data vektor
  lebih mudah diakses dengan memungkinkan pengguna mengekspresikan kondisi
  pemfilteran yang rumit dalam bahasa Inggris, yang kemudian dikonversi ke
  sintaks Milvus yang tepat.
title: Menghasilkan Ekspresi Filter Kueri Milvus dengan Model Bahasa Besar
---
<h1 id="Generating-Milvus-Query-Filter-Expressions-with-Large-Language-Models" class="common-anchor-header">Menghasilkan Ekspresi Filter Kueri Milvus dengan Model Bahasa Besar<button data-href="#Generating-Milvus-Query-Filter-Expressions-with-Large-Language-Models" class="anchor-icon" translate="no">
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
    </button></h1><p>Dalam tutorial ini, kami akan mendemonstrasikan cara menggunakan Model Bahasa Besar (LLM) untuk secara otomatis menghasilkan ekspresi filter Milvus dari kueri bahasa alami. Pendekatan ini membuat kueri basis data vektor menjadi lebih mudah diakses dengan mengizinkan pengguna untuk mengekspresikan kondisi penyaringan yang kompleks dalam bahasa Inggris sederhana, yang kemudian dikonversi ke sintaks Milvus yang tepat.</p>
<p>Milvus mendukung kemampuan pemfilteran yang canggih termasuk:</p>
<ul>
<li><strong>Operator Dasar</strong>: Operator perbandingan seperti <code translate="no">==</code>, <code translate="no">!=</code>, <code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code>, <code translate="no">&lt;=</code></li>
<li><strong>Operator Boolean</strong>: Operator logika seperti <code translate="no">and</code>, <code translate="no">or</code>, <code translate="no">not</code> untuk kondisi yang kompleks</li>
<li><strong>Operasi String</strong>: Pencocokan pola dengan <code translate="no">like</code> dan fungsi string lainnya</li>
<li><strong>Operasi Larik</strong>: Bekerja dengan bidang larik menggunakan <code translate="no">array_contains</code>, <code translate="no">array_length</code>, dll.</li>
<li><strong>Operasi JSON</strong>: Mengajukan pertanyaan ke bidang JSON dengan operator khusus</li>
</ul>
<p>Dengan mengintegrasikan LLM dengan dokumentasi Milvus, kita dapat membuat sistem cerdas yang memahami kueri bahasa alami dan menghasilkan ekspresi filter yang benar secara sintaksis. Tutorial ini akan memandu Anda dalam proses menyiapkan sistem ini, menyoroti keefektifannya dalam berbagai skenario penyaringan.</p>
<h2 id="Dependencies-and-Environment" class="common-anchor-header">Ketergantungan dan Lingkungan<button data-href="#Dependencies-and-Environment" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install --upgrade pymilvus openai requests docling beautifulsoup4</span>
print(&quot;Environment setup complete!&quot;)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-up-environment-variables" class="common-anchor-header">Menyiapkan variabel lingkungan<button data-href="#Set-up-environment-variables" class="anchor-icon" translate="no">
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
    </button></h2><p>Konfigurasikan kredensial API OpenAI Anda untuk mengaktifkan pembuatan embedding dan pembuatan ekspresi filter berbasis LLM. Ganti <code translate="no">'your_openai_api_key'</code> dengan kunci API OpenAI Anda yang sebenarnya.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os
<span class="hljs-keyword">import</span> openai

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;your_openai_api_key&quot;</span>
api_key = os.getenv(<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>)

<span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> api_key:
    <span class="hljs-keyword">raise</span> ValueError(<span class="hljs-string">&quot;Please set the OPENAI_API_KEY environment variable!&quot;</span>)

openai.api_key = api_key
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;API key loaded.&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Create-a-Sample-Collection" class="common-anchor-header">Membuat Koleksi Sampel<button data-href="#Create-a-Sample-Collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Sekarang mari kita buat contoh koleksi Milvus dengan data pengguna. Koleksi ini akan berisi bidang skalar (untuk penyaringan) dan penyematan vektor (untuk pencarian semantik). Kita akan menggunakan model penyematan teks OpenAI untuk menghasilkan representasi vektor dari informasi pengguna.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, FieldSchema, CollectionSchema, DataType
<span class="hljs-keyword">import</span> os
<span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> OpenAI
<span class="hljs-keyword">import</span> uuid

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
openai_client = OpenAI(api_key=os.environ.get(<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>))
embedding_model = <span class="hljs-string">&quot;text-embedding-3-small&quot;</span>
embedding_dim = <span class="hljs-number">1536</span>

fields = [
    FieldSchema(
        name=<span class="hljs-string">&quot;pk&quot;</span>,
        dtype=DataType.VARCHAR,
        is_primary=<span class="hljs-literal">True</span>,
        auto_id=<span class="hljs-literal">False</span>,
        max_length=<span class="hljs-number">100</span>,
    ),
    FieldSchema(name=<span class="hljs-string">&quot;name&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">128</span>),
    FieldSchema(name=<span class="hljs-string">&quot;age&quot;</span>, dtype=DataType.INT64),
    FieldSchema(name=<span class="hljs-string">&quot;city&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">128</span>),
    FieldSchema(name=<span class="hljs-string">&quot;hobby&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">128</span>),
    FieldSchema(name=<span class="hljs-string">&quot;embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=embedding_dim),
]
schema = CollectionSchema(fields=fields, description=<span class="hljs-string">&quot;User data embedding example&quot;</span>)
collection_name = <span class="hljs-string">&quot;user_data_collection&quot;</span>

<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)
<span class="hljs-comment"># Strong consistency waits for all loads to complete, adding latency with large datasets</span>
<span class="hljs-comment"># client.create_collection(</span>
<span class="hljs-comment">#     collection_name=collection_name, schema=schema, consistency_level=&quot;Strong&quot;</span>
<span class="hljs-comment"># )</span>
client.create_collection(collection_name=collection_name, schema=schema)

index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    index_type=<span class="hljs-string">&quot;IVF_FLAT&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
    params={<span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">128</span>},
)
client.create_index(collection_name=collection_name, index_params=index_params)

data_to_insert = [
    {<span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;John&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">23</span>, <span class="hljs-string">&quot;city&quot;</span>: <span class="hljs-string">&quot;Shanghai&quot;</span>, <span class="hljs-string">&quot;hobby&quot;</span>: <span class="hljs-string">&quot;Drinking coffee&quot;</span>},
    {<span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Alice&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">29</span>, <span class="hljs-string">&quot;city&quot;</span>: <span class="hljs-string">&quot;New York&quot;</span>, <span class="hljs-string">&quot;hobby&quot;</span>: <span class="hljs-string">&quot;Reading books&quot;</span>},
    {<span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Bob&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">31</span>, <span class="hljs-string">&quot;city&quot;</span>: <span class="hljs-string">&quot;London&quot;</span>, <span class="hljs-string">&quot;hobby&quot;</span>: <span class="hljs-string">&quot;Playing chess&quot;</span>},
    {<span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Eve&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">27</span>, <span class="hljs-string">&quot;city&quot;</span>: <span class="hljs-string">&quot;Paris&quot;</span>, <span class="hljs-string">&quot;hobby&quot;</span>: <span class="hljs-string">&quot;Painting&quot;</span>},
    {<span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Charlie&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">35</span>, <span class="hljs-string">&quot;city&quot;</span>: <span class="hljs-string">&quot;Tokyo&quot;</span>, <span class="hljs-string">&quot;hobby&quot;</span>: <span class="hljs-string">&quot;Cycling&quot;</span>},
    {<span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Grace&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">22</span>, <span class="hljs-string">&quot;city&quot;</span>: <span class="hljs-string">&quot;Berlin&quot;</span>, <span class="hljs-string">&quot;hobby&quot;</span>: <span class="hljs-string">&quot;Photography&quot;</span>},
    {<span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;David&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">40</span>, <span class="hljs-string">&quot;city&quot;</span>: <span class="hljs-string">&quot;Toronto&quot;</span>, <span class="hljs-string">&quot;hobby&quot;</span>: <span class="hljs-string">&quot;Watching movies&quot;</span>},
    {<span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Helen&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">30</span>, <span class="hljs-string">&quot;city&quot;</span>: <span class="hljs-string">&quot;Sydney&quot;</span>, <span class="hljs-string">&quot;hobby&quot;</span>: <span class="hljs-string">&quot;Cooking&quot;</span>},
    {<span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Frank&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">28</span>, <span class="hljs-string">&quot;city&quot;</span>: <span class="hljs-string">&quot;Beijing&quot;</span>, <span class="hljs-string">&quot;hobby&quot;</span>: <span class="hljs-string">&quot;Hiking&quot;</span>},
    {<span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Ivy&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">26</span>, <span class="hljs-string">&quot;city&quot;</span>: <span class="hljs-string">&quot;Seoul&quot;</span>, <span class="hljs-string">&quot;hobby&quot;</span>: <span class="hljs-string">&quot;Dancing&quot;</span>},
    {<span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Tom&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">33</span>, <span class="hljs-string">&quot;city&quot;</span>: <span class="hljs-string">&quot;Madrid&quot;</span>, <span class="hljs-string">&quot;hobby&quot;</span>: <span class="hljs-string">&quot;Writing&quot;</span>},
]


<span class="hljs-keyword">def</span> <span class="hljs-title function_">get_embeddings</span>(<span class="hljs-params">texts</span>):
    <span class="hljs-keyword">return</span> [
        rec.embedding
        <span class="hljs-keyword">for</span> rec <span class="hljs-keyword">in</span> openai_client.embeddings.create(
            <span class="hljs-built_in">input</span>=texts, model=embedding_model, dimensions=embedding_dim
        ).data
    ]


texts = [
    <span class="hljs-string">f&quot;<span class="hljs-subst">{item[<span class="hljs-string">&#x27;name&#x27;</span>]}</span> from <span class="hljs-subst">{item[<span class="hljs-string">&#x27;city&#x27;</span>]}</span> is <span class="hljs-subst">{item[<span class="hljs-string">&#x27;age&#x27;</span>]}</span> years old and likes <span class="hljs-subst">{item[<span class="hljs-string">&#x27;hobby&#x27;</span>]}</span>.&quot;</span>
    <span class="hljs-keyword">for</span> item <span class="hljs-keyword">in</span> data_to_insert
]
embeddings = get_embeddings(texts)

insert_data = []
<span class="hljs-keyword">for</span> item, embedding <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(data_to_insert, embeddings):
    item_with_embedding = {
        <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-built_in">str</span>(uuid.uuid4()),
        <span class="hljs-string">&quot;name&quot;</span>: item[<span class="hljs-string">&quot;name&quot;</span>],
        <span class="hljs-string">&quot;age&quot;</span>: item[<span class="hljs-string">&quot;age&quot;</span>],
        <span class="hljs-string">&quot;city&quot;</span>: item[<span class="hljs-string">&quot;city&quot;</span>],
        <span class="hljs-string">&quot;hobby&quot;</span>: item[<span class="hljs-string">&quot;hobby&quot;</span>],
        <span class="hljs-string">&quot;embedding&quot;</span>: embedding,
    }
    insert_data.append(item_with_embedding)

client.insert(collection_name=collection_name, data=insert_data)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Collection &#x27;<span class="hljs-subst">{collection_name}</span>&#x27; has been created and data has been inserted.&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Print-3-sample-data" class="common-anchor-header">Mencetak 3 data sampel<button data-href="#Print-3-sample-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Kode di atas membuat koleksi Milvus dengan struktur sebagai berikut:</p>
<ul>
<li><strong>pk</strong>: Bidang kunci utama (VARCHAR)</li>
<li><strong>nama</strong>: Nama pengguna (VARCHAR)</li>
<li><strong>usia</strong>: Usia pengguna (INT64)</li>
<li><strong>kota</strong>: Kota pengguna (VARCHAR)</li>
<li><strong>hobi</strong>: Hobi pengguna (VARCHAR)</li>
<li><strong>penyematan</strong>: Penyematan vektor (FLOAT_VECTOR, 1536 dimensi)</li>
</ul>
<p>Kami telah memasukkan 11 sampel pengguna dengan informasi pribadi mereka dan menghasilkan penyematan untuk kemampuan pencarian semantik. Setiap informasi pengguna diubah menjadi teks deskriptif yang menangkap nama, lokasi, usia, dan minat mereka sebelum disematkan. Mari kita verifikasi bahwa koleksi kita telah berhasil dibuat dan berisi data yang diharapkan dengan melakukan kueri pada beberapa contoh record.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">import</span> os
<span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> OpenAI

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
collection_name = <span class="hljs-string">&quot;user_data_collection&quot;</span>

client.load_collection(collection_name=collection_name)

result = client.query(
    collection_name=collection_name,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;name&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;city&quot;</span>, <span class="hljs-string">&quot;hobby&quot;</span>],
    limit=<span class="hljs-number">3</span>,
)

<span class="hljs-keyword">for</span> record <span class="hljs-keyword">in</span> result:
    <span class="hljs-built_in">print</span>(record)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Collecting-Milvus-Filter-Expression-Documentation" class="common-anchor-header">Mengumpulkan Dokumentasi Ekspresi Filter Milvus<button data-href="#Collecting-Milvus-Filter-Expression-Documentation" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk membantu model bahasa besar lebih memahami sintaks ekspresi filter Milvus, kita perlu menyediakan dokumentasi resmi yang relevan. Kita akan menggunakan pustaka <code translate="no">docling</code> untuk mengambil beberapa halaman utama dari situs web resmi Milvus.</p>
<p>Halaman-halaman ini berisi informasi rinci tentang:</p>
<ul>
<li><strong>Operator Boolean</strong>: <code translate="no">and</code>, <code translate="no">or</code>, <code translate="no">not</code> untuk kondisi logika yang kompleks</li>
<li><strong>Operator dasar</strong>: Operator perbandingan seperti <code translate="no">==</code>, <code translate="no">!=</code>, <code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code>, <code translate="no">&lt;=</code></li>
<li><strong>Template pemfilteran</strong>: Pola dan sintaks pemfilteran tingkat lanjut</li>
<li><strong>Pencocokan string</strong>: Pencocokan pola dengan <code translate="no">like</code> dan operasi string lainnya</li>
</ul>
<p>Dokumentasi ini akan berfungsi sebagai basis pengetahuan bagi LLM kami untuk menghasilkan ekspresi filter yang akurat.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> docling
<span class="hljs-keyword">from</span> docling.document_converter <span class="hljs-keyword">import</span> DocumentConverter

converter = DocumentConverter()
docs = [
    converter.convert(url)
    <span class="hljs-keyword">for</span> url <span class="hljs-keyword">in</span> [
        <span class="hljs-string">&quot;https://milvus.io/docs/boolean.md&quot;</span>,
        <span class="hljs-string">&quot;https://milvus.io/docs/basic-operators.md&quot;</span>,
        <span class="hljs-string">&quot;https://milvus.io/docs/filtering-templating.md&quot;</span>,
    ]
]

<span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> docs[:<span class="hljs-number">3</span>]:
    <span class="hljs-built_in">print</span>(doc.document.export_to_markdown())
<button class="copy-code-btn"></button></code></pre>
<p>Penggalian dokumentasi menyediakan cakupan yang komprehensif dari sintaks filter Milvus. Basis pengetahuan ini akan memungkinkan LLM kami untuk memahami nuansa konstruksi ekspresi filter, termasuk penggunaan operator yang tepat, referensi bidang, dan kombinasi kondisi yang kompleks.</p>
<h2 id="LLM-Powered-Filter-Generation" class="common-anchor-header">Pembuatan Filter yang Didukung LLM<button data-href="#LLM-Powered-Filter-Generation" class="anchor-icon" translate="no">
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
    </button></h2><p>Sekarang kita telah memiliki konteks dokumentasi, mari kita siapkan sistem LLM untuk menghasilkan ekspresi filter. Kita akan membuat prompt terstruktur yang menggabungkan dokumentasi yang telah di-scan dengan pertanyaan pengguna untuk menghasilkan ekspresi filter Milvus yang benar secara sintaksis.</p>
<p>Sistem pembuatan filter kami menggunakan prompt yang dibuat dengan hati-hati:</p>
<ol>
<li><strong>Menyediakan konteks</strong>: Mencakup dokumentasi Milvus yang lengkap sebagai bahan referensi</li>
<li><strong>Menetapkan batasan</strong>: Memastikan LLM hanya menggunakan sintaks dan fitur yang terdokumentasi</li>
<li><strong>Menegakkan akurasi</strong>: Memerlukan ekspresi yang benar secara sintaksis</li>
<li><strong>Mempertahankan fokus</strong>: Hanya mengembalikan ekspresi filter tanpa penjelasan</li>
</ol>
<p>Mari kita uji dengan kueri bahasa alami dan lihat seberapa baik kinerja LLM.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> OpenAI
<span class="hljs-keyword">import</span> json
<span class="hljs-keyword">from</span> IPython.display <span class="hljs-keyword">import</span> display, Markdown

context = <span class="hljs-string">&quot;\n&quot;</span>.join([doc.document.export_to_markdown() <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> docs])

prompt = <span class="hljs-string">f&quot;&quot;&quot;
You are an expert Milvus vector database engineer. Your task is to convert a user&#x27;s natural language query into a valid Milvus filter expression, using the provided Milvus documentation as your knowledge base.

Follow these rules strictly:
1. Only use the provided documents as your source of knowledge.
2. Ensure the generated filter expression is syntactically correct.
3. If there isn&#x27;t enough information in the documents to create an expression, state that directly.
4. Only return the final filter expression. Do not include any explanations or extra text.

---
**Milvus Documentation Context:**
<span class="hljs-subst">{context}</span>

---
**User Query:**
<span class="hljs-subst">{user_query}</span>

---
**Filter Expression:**
&quot;&quot;&quot;</span>

client = OpenAI()


<span class="hljs-keyword">def</span> <span class="hljs-title function_">generate_filter_expr</span>(<span class="hljs-params">user_query</span>):
    <span class="hljs-string">&quot;&quot;&quot;
    Generates a Milvus filter expression from a user query using GPT-4o-mini.
    &quot;&quot;&quot;</span>
    completion = client.chat.completions.create(
        model=<span class="hljs-string">&quot;gpt-4o-mini&quot;</span>,
        messages=[
            {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;system&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: prompt},
            {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: user_query},
        ],
        temperature=<span class="hljs-number">0.0</span>,
    )
    <span class="hljs-keyword">return</span> completion.choices[<span class="hljs-number">0</span>].message.content


user_query = <span class="hljs-string">&quot;Find people older than 30 who live in London, Tokyo, or Toronto&quot;</span>

filter_expr = generate_filter_expr(user_query)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Generated filter expression: <span class="hljs-subst">{filter_expr}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>LLM berhasil menghasilkan ekspresi filter yang menggabungkan beberapa kondisi:</p>
<ul>
<li>Perbandingan usia menggunakan <code translate="no">&gt;</code></li>
<li>Pencocokan beberapa kota menggunakan operator <code translate="no">in</code> </li>
<li>Perujukan dan sintaksis bidang yang tepat</li>
</ul>
<p>Hal ini menunjukkan kekuatan dari penyediaan konteks dokumentasi yang komprehensif untuk memandu pembuatan filter LLM.</p>
<h2 id="Test-the-Generated-Filter" class="common-anchor-header">Menguji Filter yang Dihasilkan<button data-href="#Test-the-Generated-Filter" class="anchor-icon" translate="no">
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
    </button></h2><p>Sekarang mari kita uji ekspresi filter yang telah dihasilkan dengan menggunakannya dalam operasi pencarian Milvus yang sebenarnya. Kami akan menggabungkan pencarian semantik dengan penyaringan yang tepat untuk menemukan pengguna yang sesuai dengan maksud kueri dan kriteria tertentu.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> OpenAI
<span class="hljs-keyword">import</span> os

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
openai_client = OpenAI(api_key=os.environ.get(<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>))

clean_filter = (
    filter_expr.replace(<span class="hljs-string">&quot;```&quot;</span>, <span class="hljs-string">&quot;&quot;</span>).replace(<span class="hljs-string">&#x27;filter=&quot;&#x27;</span>, <span class="hljs-string">&quot;&quot;</span>).replace(<span class="hljs-string">&#x27;&quot;&#x27;</span>, <span class="hljs-string">&quot;&quot;</span>).strip()
)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Using filter: <span class="hljs-subst">{clean_filter}</span>&quot;</span>)

query_embedding = (
    openai_client.embeddings.create(
        <span class="hljs-built_in">input</span>=[user_query], model=<span class="hljs-string">&quot;text-embedding-3-small&quot;</span>, dimensions=<span class="hljs-number">1536</span>
    )
    .data[<span class="hljs-number">0</span>]
    .embedding
)

search_results = client.search(
    collection_name=<span class="hljs-string">&quot;user_data_collection&quot;</span>,
    data=[query_embedding],
    limit=<span class="hljs-number">10</span>,
    <span class="hljs-built_in">filter</span>=clean_filter,
    output_fields=[<span class="hljs-string">&quot;pk&quot;</span>, <span class="hljs-string">&quot;name&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;city&quot;</span>, <span class="hljs-string">&quot;hobby&quot;</span>],
    search_params={
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;COSINE&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>},
    },
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Search results:&quot;</span>)
<span class="hljs-keyword">for</span> i, hits <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(search_results):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Query <span class="hljs-subst">{i}</span>:&quot;</span>)
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  - <span class="hljs-subst">{hit}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<h2 id="Results-Analysis" class="common-anchor-header">Analisis Hasil<button data-href="#Results-Analysis" class="anchor-icon" translate="no">
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
    </button></h2><p>Hasil pencarian menunjukkan keberhasilan integrasi filter yang dihasilkan LLM dengan pencarian vektor Milvus. Penyaringan mengidentifikasi dengan tepat pengguna yang:</p>
<ul>
<li>Berusia lebih dari 30 tahun</li>
<li>Tinggal di London, Tokyo, atau Toronto</li>
<li>Sesuai dengan konteks semantik kueri</li>
</ul>
<p>Pendekatan ini menggabungkan ketepatan pemfilteran terstruktur dengan fleksibilitas input bahasa alami, sehingga database vektor lebih mudah diakses oleh pengguna yang mungkin tidak terbiasa dengan sintaksis kueri tertentu.</p>
