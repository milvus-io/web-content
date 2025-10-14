---
id: timestamptz-field.md
title: Bidang TIMESTAMPTZCompatible with Milvus 2.6.4+
summary: >-
  Aplikasi yang melacak waktu di seluruh wilayah, seperti sistem e-commerce,
  alat kolaborasi, atau pencatatan terdistribusi, membutuhkan penanganan stempel
  waktu dengan zona waktu yang tepat. Tipe data TIMESTAMPTZ di Milvus
  menyediakan kemampuan ini dengan menyimpan stempel waktu dengan zona waktu
  terkait.
beta: Milvus 2.6.4+
---
<h1 id="TIMESTAMPTZ-Field" class="common-anchor-header">Bidang TIMESTAMPTZ<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#TIMESTAMPTZ-Field" class="anchor-icon" translate="no">
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
    </button></h1><p>Aplikasi yang melacak waktu di seluruh wilayah, seperti sistem e-commerce, alat kolaborasi, atau pencatatan terdistribusi, membutuhkan penanganan stempel waktu yang tepat dengan zona waktu. Tipe data <code translate="no">TIMESTAMPTZ</code> di Milvus menyediakan kemampuan ini dengan menyimpan stempel waktu dengan zona waktu terkait.</p>
<h2 id="What-is-a-TIMESTAMPTZ-field" class="common-anchor-header">Apa yang dimaksud dengan bidang TIMESTAMPTZ?<button data-href="#What-is-a-TIMESTAMPTZ-field" class="anchor-icon" translate="no">
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
    </button></h2><p>Bidang <code translate="no">TIMESTAMPTZ</code> adalah tipe data yang ditentukan skema (<code translate="no">DataType.TIMESTAMPTZ</code>) di Milvus yang menyimpan stempel waktu dengan zona waktu eksplisit:</p>
<ul>
<li><p><strong>Format masukan yang diterima</strong>: String <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a> dengan offset zona waktu (misalnya, <code translate="no">&quot;2025-05-01T23:59:59+08:00&quot;</code> mewakili pukul 11:59:59 PM di UTC+08:00).</p></li>
<li><p><strong>Penyimpanan internal</strong>: Semua nilai <code translate="no">TIMESTAMPTZ</code> dinormalisasi dan disimpan dalam <a href="https://en.wikipedia.org/wiki/Coordinated_Universal_Time">Waktu Universal Terkoordinasi</a> (UTC).</p></li>
<li><p><strong>Perbandingan dan penyaringan</strong>: Semua operasi pemfilteran dan pemesanan dilakukan dalam UTC, untuk memastikan hasil yang konsisten dan dapat diprediksi di berbagai zona waktu.</p></li>
</ul>
<div class="alert note">
<ul>
<li><p>Anda dapat mengatur <code translate="no">nullable=True</code> untuk bidang <code translate="no">TIMESTAMPTZ</code> untuk mengizinkan nilai yang hilang.</p></li>
<li><p>Anda dapat menentukan nilai stempel waktu default menggunakan atribut <code translate="no">default_value</code> dalam format <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>.</p></li>
</ul>
<p>Lihat <a href="/docs/id/nullable-and-default.md">Nullable &amp; Default</a> untuk detailnya.</p>
</div>
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
    </button></h2><p>Alur kerja dasar penggunaan bidang <code translate="no">TIMESTAMPTZ</code> mencerminkan bidang skalar lainnya di Milvus: tentukan bidang → masukkan data → kueri/filter.</p>
<h3 id="Step-1-Define-a-TIMESTAMPTZ-field" class="common-anchor-header">Langkah 1: Mendefinisikan bidang TIMESTAMPTZ<button data-href="#Step-1-Define-a-TIMESTAMPTZ-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Untuk menggunakan field <code translate="no">TIMESTAMPTZ</code>, secara eksplisit mendefinisikannya di dalam skema koleksi Anda ketika membuat koleksi. Contoh berikut ini menunjukkan cara membuat koleksi dengan bidang <code translate="no">tsz</code> bertipe <code translate="no">DataType.TIMESTAMPTZ</code>.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> time
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType
<span class="hljs-keyword">import</span> datetime
<span class="hljs-keyword">import</span> pytz

server_address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
collection_name = <span class="hljs-string">&quot;timestamptz_test123&quot;</span>

client = MilvusClient(uri=server_address)

<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)

schema = client.create_schema()
<span class="hljs-comment"># Add a primary key field</span>
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
<span class="hljs-comment"># Add a TIMESTAMPTZ field that allows null values</span>
<span class="highlighted-wrapper-line">schema.add_field(<span class="hljs-string">&quot;tsz&quot;</span>, DataType.TIMESTAMPTZ, nullable=<span class="hljs-literal">True</span>)</span>
<span class="hljs-comment"># Add a vector field</span>
schema.add_field(<span class="hljs-string">&quot;vec&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">4</span>)

client.create_collection(collection_name, schema=schema, consistency_level=<span class="hljs-string">&quot;Session&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Collection &#x27;<span class="hljs-subst">{collection_name}</span>&#x27; with a TimestampTz field created successfully.&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Insert-data" class="common-anchor-header">Langkah 2: Memasukkan data<button data-href="#Step-2-Insert-data" class="anchor-icon" translate="no">
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
    </button></h3><p>Sisipkan entitas yang berisi string ISO 8601 dengan offset zona waktu.</p>
<p>Contoh di bawah ini menyisipkan 8.193 baris data sampel ke dalam koleksi. Setiap baris meliputi:</p>
<ul>
<li><p>ID unik</p></li>
<li><p>stempel waktu yang sadar zona waktu (waktu Shanghai)</p></li>
<li><p>vektor 4 dimensi sederhana</p></li>
</ul>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">data_size = <span class="hljs-number">8193</span>

<span class="hljs-comment"># Get the Asia/Shanghai time zone using the pytz library</span>
<span class="hljs-comment"># You can use any valid IANA time zone identifier such as:</span>
<span class="hljs-comment">#   &quot;Asia/Tokyo&quot;, &quot;America/New_York&quot;, &quot;Europe/London&quot;, &quot;UTC&quot;, etc.</span>
<span class="hljs-comment"># To view all available values:</span>
<span class="hljs-comment">#   import pytz; print(pytz.all_timezones)</span>
<span class="hljs-comment"># Reference:</span>
<span class="hljs-comment">#   IANA database – https://www.iana.org/time-zones</span>
<span class="hljs-comment">#   Wikipedia – https://en.wikipedia.org/wiki/List_of_tz_database_time_zones</span>
shanghai_tz = pytz.timezone(<span class="hljs-string">&quot;Asia/Shanghai&quot;</span>)

data = [
    {
        <span class="hljs-string">&quot;id&quot;</span>: i + <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;tsz&quot;</span>: shanghai_tz.localize(
            datetime.datetime(<span class="hljs-number">2025</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>) + datetime.timedelta(days=i)
        ).isoformat(),
        <span class="hljs-string">&quot;vec&quot;</span>: [<span class="hljs-built_in">float</span>(i) / <span class="hljs-number">10</span> <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">4</span>)],
    }
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(data_size)
]

client.insert(collection_name, data)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Data inserted successfully.&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-3-Filtering-operations" class="common-anchor-header">Langkah 3: Operasi pemfilteran<button data-href="#Step-3-Filtering-operations" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">TIMESTAMPTZ</code> mendukung perbandingan skalar, aritmatika interval, dan ekstraksi komponen waktu.</p>
<p>Sebelum Anda dapat melakukan operasi pemfilteran pada bidang <code translate="no">TIMESTAMPTZ</code>, pastikan:</p>
<ul>
<li><p>Anda telah membuat indeks pada setiap bidang vektor.</p></li>
<li><p>Koleksi dimuat ke dalam memori.</p></li>
</ul>
<p><details></p>
<p><summary>Tampilkan contoh kode</summary></p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create index on vector field</span>
index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;vec&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    index_name=<span class="hljs-string">&quot;vec_index&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>
)
client.create_index(collection_name, index_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Index created successfully.&quot;</span>)

<span class="hljs-comment"># Load the collection</span>
client.load_collection(collection_name)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Collection &#x27;<span class="hljs-subst">{collection_name}</span>&#x27; loaded successfully.&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<h4 id="Query-with-timestamp-filtering" class="common-anchor-header">Kueri dengan pemfilteran stempel waktu</h4><p>Gunakan operator aritmatika seperti <code translate="no">==</code>, <code translate="no">!=</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;</code>, <code translate="no">&lt;=</code>, <code translate="no">&gt;=</code>. Untuk daftar lengkap operator aritmatika yang tersedia di Milvus, lihat <a href="/docs/id/basic-operators.md#Arithmetic-Operators">Operator Aritmatika</a>.</p>
<p>Contoh di bawah ini memfilter entitas dengan stempel waktu (<code translate="no">tsz</code>) yang tidak sama dengan <strong>2025-01-03T00:00:00+08:00</strong>:</p>
<div class="multipleCode">
   <a href="#bash">cURL</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Query for entities where tsz is not equal to &#x27;2025-01-03T00:00:00+08:00&#x27;</span>
<span class="highlighted-wrapper-line"><span class="hljs-built_in">expr</span> = <span class="hljs-string">&quot;tsz != ISO &#x27;2025-01-03T00:00:00+08:00&#x27;&quot;</span></span>

results = client.query(
    collection_name=collection_name,
    filter=<span class="hljs-built_in">expr</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;tsz&quot;</span>],
    <span class="hljs-built_in">limit</span>=10
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Query result: &quot;</span>, results)

<span class="hljs-comment"># Expected output:</span>
<span class="hljs-comment"># Query result:  data: [&quot;{&#x27;id&#x27;: 1, &#x27;tsz&#x27;: &#x27;2024-12-31T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 2, &#x27;tsz&#x27;: &#x27;2025-01-01T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 4, &#x27;tsz&#x27;: &#x27;2025-01-03T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 5, &#x27;tsz&#x27;: &#x27;2025-01-04T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 6, &#x27;tsz&#x27;: &#x27;2025-01-05T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 7, &#x27;tsz&#x27;: &#x27;2025-01-06T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 8, &#x27;tsz&#x27;: &#x27;2025-01-07T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 9, &#x27;tsz&#x27;: &#x27;2025-01-08T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 10, &#x27;tsz&#x27;: &#x27;2025-01-09T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 11, &#x27;tsz&#x27;: &#x27;2025-01-10T16:00:00Z&#x27;}&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>Pada contoh di atas,</p>
<ul>
<li><p><code translate="no">tsz</code> adalah nama bidang <code translate="no">TIMESTAMPTZ</code> yang didefinisikan dalam skema.</p></li>
<li><p><code translate="no">ISO '2025-01-03T00:00:00+08:00'</code> adalah literal stempel waktu dalam format <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>, termasuk offset zona waktu.</p></li>
<li><p><code translate="no">!=</code> membandingkan nilai bidang dengan literal tersebut. Operator lain yang didukung termasuk <code translate="no">==</code>, <code translate="no">&lt;</code>, <code translate="no">&lt;=</code>, <code translate="no">&gt;</code>, dan <code translate="no">&gt;=</code>.</p></li>
</ul>
<h4 id="Interval-operations" class="common-anchor-header">Operasi interval</h4><p>Anda dapat melakukan aritmatika pada bidang <code translate="no">TIMESTAMPTZ</code> menggunakan nilai <strong>INTERVAL</strong> dalam <a href="https://en.wikipedia.org/wiki/ISO_8601#Durations">format durasi ISO 8601</a>. Hal ini memungkinkan Anda menambah atau mengurangi durasi, seperti hari, jam, atau menit, dari stempel waktu saat memfilter data.</p>
<p>Sebagai contoh, kueri berikut ini memfilter entitas dengan cap waktu (<code translate="no">tsz</code>) ditambah nol hari <strong>tidak sama</strong> dengan <strong>2025-01-03T00:00:00+08:00</strong>:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="highlighted-wrapper-line">expr = <span class="hljs-string">&quot;tsz + INTERVAL &#x27;P0D&#x27; != ISO &#x27;2025-01-03T00:00:00+08:00&#x27;&quot;</span></span>

results = client.query(
    collection_name, 
    <span class="hljs-built_in">filter</span>=expr, 
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;tsz&quot;</span>], 
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Query result: &quot;</span>, results)

<span class="hljs-comment"># Expected output:</span>
<span class="hljs-comment"># Query result:  data: [&quot;{&#x27;id&#x27;: 1, &#x27;tsz&#x27;: &#x27;2024-12-31T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 2, &#x27;tsz&#x27;: &#x27;2025-01-01T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 4, &#x27;tsz&#x27;: &#x27;2025-01-03T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 5, &#x27;tsz&#x27;: &#x27;2025-01-04T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 6, &#x27;tsz&#x27;: &#x27;2025-01-05T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 7, &#x27;tsz&#x27;: &#x27;2025-01-06T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 8, &#x27;tsz&#x27;: &#x27;2025-01-07T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 9, &#x27;tsz&#x27;: &#x27;2025-01-08T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 10, &#x27;tsz&#x27;: &#x27;2025-01-09T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 11, &#x27;tsz&#x27;: &#x27;2025-01-10T16:00:00Z&#x27;}&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><code translate="no">INTERVAL</code> mengikuti <a href="https://www.w3.org/TR/xmlschema-2/#duration">sintaks durasi ISO 8601</a>. Sebagai contoh:</p>
<ul>
<li><p><code translate="no">P1D</code> → 1 hari</p></li>
<li><p><code translate="no">PT3H</code> → 3 jam</p></li>
<li><p><code translate="no">P2DT6H</code> → 2 hari dan 6 jam</p></li>
</ul>
<p>Anda dapat menggunakan aritmatika <code translate="no">INTERVAL</code> secara langsung dalam ekspresi filter, seperti:</p>
<ul>
<li><p><code translate="no">tsz + INTERVAL 'P3D'</code> → Menambahkan 3 hari</p></li>
<li><p><code translate="no">tsz - INTERVAL 'PT2H'</code> → Mengurangi 2 jam</p></li>
</ul>
</div>
<h4 id="Extract-timestamp-elements" class="common-anchor-header">Mengekstrak elemen stempel waktu</h4><p>Anda dapat mengekstrak komponen tertentu dari bidang <code translate="no">TIMESTAMPTZ</code>, seperti tahun, bulan, atau hari, dengan menggunakan parameter <code translate="no">time_fields</code> di kueri atau pencarian Anda.</p>
<p>Contoh di bawah ini mengekstrak elemen <code translate="no">year</code>, <code translate="no">month</code>, dan <code translate="no">day</code> dari setiap bidang <code translate="no">TIMESTAMPTZ</code> dalam hasil kueri:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">results = client.query(
    collection_name,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;id &lt;= 10&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;tsz&quot;</span>],
<span class="highlighted-wrapper-line">    time_fields=<span class="hljs-string">&quot;year, month, day&quot;</span>,</span>
    limit=<span class="hljs-number">2</span>,
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Query result: &quot;</span>, results)

<span class="hljs-comment"># Expected output:</span>
<span class="hljs-comment"># Query result:  data: [&quot;{&#x27;id&#x27;: 1, &#x27;tsz&#x27;: [2024, 12, 31]}&quot;, &quot;{&#x27;id&#x27;: 2, &#x27;tsz&#x27;: [2025, 1, 1]}&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Elemen yang didukung untuk ekstraksi</strong></p>
<table>
   <tr>
     <th><p>Elemen</p></th>
     <th><p>Deskripsi</p></th>
     <th><p>Contoh keluaran</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">year</code></p></td>
     <td><p>Komponen tahun</p></td>
     <td><p><code translate="no">2025</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">month</code></p></td>
     <td><p>Nomor bulan</p></td>
     <td><p><code translate="no">1</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">day</code></p></td>
     <td><p>Hari dalam bulan</p></td>
     <td><p><code translate="no">3</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">hour</code></p></td>
     <td><p>Jam (0-23)</p></td>
     <td><p><code translate="no">14</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">minute</code></p></td>
     <td><p>Menit</p></td>
     <td><p><code translate="no">30</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">second</code></p></td>
     <td><p>Detik</p></td>
     <td><p><code translate="no">5</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">microsecond</code></p></td>
     <td><p>Mikrodetik</p></td>
     <td><p><code translate="no">123456</code></p></td>
   </tr>
</table>
<div class="alert note">
<ul>
<li><p>Parameter <code translate="no">time_fields</code> adalah string yang dipisahkan dengan koma (misalnya, <code translate="no">&quot;year, month, day&quot;</code>).</p></li>
<li><p>Hasilnya dikembalikan sebagai larik komponen yang diekstrak (misalnya, <code translate="no">[2024, 12, 31]</code>).</p></li>
</ul>
</div>
<h4 id="Search-with-timestamp-filtering" class="common-anchor-header">Pencarian dengan pemfilteran stempel waktu</h4><p>Anda dapat menggabungkan pemfilteran <code translate="no">TIMESTAMPTZ</code> dengan pencarian kemiripan vektor untuk mempersempit hasil berdasarkan waktu dan kemiripan.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define a time-based filter expression</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;tsz &gt; ISO &#x27;2025-01-05T00:00:00+08:00&#x27;&quot;</span>

res = client.search(
    collection_name=collection_name,             <span class="hljs-comment"># Collection name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>]],                  <span class="hljs-comment"># Query vector (must match collection&#x27;s vector dim)</span>
    limit=<span class="hljs-number">5</span>,                                      <span class="hljs-comment"># Max. number of results to return</span>
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,                                <span class="hljs-comment"># Filter expression using TIMESTAMPTZ</span></span>
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;tsz&quot;</span>],  <span class="hljs-comment"># Fields to include in the search results</span>
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Search result: &quot;</span>, res)

<span class="hljs-comment"># Expected output:</span>
<span class="hljs-comment"># Search result:  data: [[{&#x27;id&#x27;: 10, &#x27;distance&#x27;: 0.9759000539779663, &#x27;entity&#x27;: {&#x27;tsz&#x27;: &#x27;2025-01-09T16:00:00Z&#x27;, &#x27;id&#x27;: 10}}, {&#x27;id&#x27;: 9, &#x27;distance&#x27;: 0.9759000539779663, &#x27;entity&#x27;: {&#x27;tsz&#x27;: &#x27;2025-01-08T16:00:00Z&#x27;, &#x27;id&#x27;: 9}}, {&#x27;id&#x27;: 8, &#x27;distance&#x27;: 0.9759000539779663, &#x27;entity&#x27;: {&#x27;tsz&#x27;: &#x27;2025-01-07T16:00:00Z&#x27;, &#x27;id&#x27;: 8}}, {&#x27;id&#x27;: 7, &#x27;distance&#x27;: 0.9759000539779663, &#x27;entity&#x27;: {&#x27;tsz&#x27;: &#x27;2025-01-06T16:00:00Z&#x27;, &#x27;id&#x27;: 7}}, {&#x27;id&#x27;: 6, &#x27;distance&#x27;: 0.9759000539779663, &#x27;entity&#x27;: {&#x27;tsz&#x27;: &#x27;2025-01-05T16:00:00Z&#x27;, &#x27;id&#x27;: 6}}]]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Jika koleksi Anda memiliki dua atau lebih bidang vektor, Anda dapat melakukan operasi pencarian gabungan dengan pemfilteran stempel waktu. Untuk detailnya, lihat <a href="/docs/id/multi-vector-search.md">Pencarian Hibrida Multi-Vektor</a>.</p>
</div>
<h2 id="Advanced-usage" class="common-anchor-header">Penggunaan lanjutan<button data-href="#Advanced-usage" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk penggunaan tingkat lanjut, Anda dapat mengelola zona waktu pada tingkat yang berbeda (misalnya basis data, koleksi, atau kueri) atau mempercepat kueri pada bidang <code translate="no">TIMESTAMPTZ</code> menggunakan indeks.</p>
<h3 id="Manage-time-zones-at-different-levels" class="common-anchor-header">Mengelola zona waktu di tingkat yang berbeda<button data-href="#Manage-time-zones-at-different-levels" class="anchor-icon" translate="no">
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
    </button></h3><p>Anda dapat mengontrol zona waktu untuk bidang <code translate="no">TIMESTAMPTZ</code> di tingkat <strong>basis data</strong>, <strong>koleksi</strong>, atau <strong>kueri/pencarian</strong>.</p>
<table>
   <tr>
     <th><p>Tingkat</p></th>
     <th><p>Parameter</p></th>
     <th><p>Cakupan</p></th>
     <th><p>Prioritas</p></th>
   </tr>
   <tr>
     <td><p>Basis data</p></td>
     <td><p><code translate="no">database.timezone</code></p></td>
     <td><p>Default untuk semua koleksi dalam basis data</p></td>
     <td><p>Terendah</p></td>
   </tr>
   <tr>
     <td><p>Koleksi</p></td>
     <td><p><code translate="no">collection.timezone</code></p></td>
     <td><p>Mengganti pengaturan zona waktu default basis data untuk koleksi tersebut</p></td>
     <td><p>Sedang</p></td>
   </tr>
   <tr>
     <td><p>Kueri/pencarian/pencarian gabungan</p></td>
     <td><p><code translate="no">timezone</code></p></td>
     <td><p>Penggantian sementara untuk satu operasi tertentu</p></td>
     <td><p>Tertinggi</p></td>
   </tr>
</table>
<p>Untuk petunjuk langkah demi langkah dan contoh kode, lihat halaman khusus:</p>
<ul>
<li><p><a href="/docs/id/modify-collection.md#Example-6-Set-collection-time-zone">Memodifikasi Koleksi</a></p></li>
<li><p><a href="/docs/id/manage_databases.md#Manage-database-properties">Basis data</a></p></li>
<li><p><a href="/docs/id/get-and-scalar-query.md#Temporarily-set-a-timezone-for-a-query">Permintaan</a></p></li>
<li><p><a href="/docs/id/single-vector-search.md#Temporarily-set-a-timezone-for-a-search">Pencarian Vektor Dasar</a></p></li>
<li><p><a href="/docs/id/multi-vector-search.md">Pencarian Hibrida Multi-Vektor</a></p></li>
</ul>
<h3 id="Accelerate-queries" class="common-anchor-header">Mempercepat kueri<button data-href="#Accelerate-queries" class="anchor-icon" translate="no">
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
    </button></h3><p>Secara default, kueri pada bidang <code translate="no">TIMESTAMPTZ</code> tanpa indeks akan melakukan pemindaian penuh terhadap semua baris, yang dapat berjalan lambat pada kumpulan data yang besar. Untuk mempercepat kueri stempel waktu, buat indeks <code translate="no">STL_SORT</code> pada bidang <code translate="no">TIMESTAMPTZ</code> Anda.</p>
<p>Untuk detailnya, lihat <a href="https://zilliverse.feishu.cn/wiki/YBYmwvx68iMKFRknytJccwk0nPf">STL_SORT</a>.</p>
