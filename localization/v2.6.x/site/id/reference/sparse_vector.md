---
id: sparse_vector.md
summary: Pelajari cara menggunakan vektor jarang di Milvus.
title: Vektor Jarang
---
<h1 id="Sparse-Vector" class="common-anchor-header">Vektor Jarang<button data-href="#Sparse-Vector" class="anchor-icon" translate="no">
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
    </button></h1><p>Vektor jarang merepresentasikan kata atau frasa menggunakan penyematan vektor yang sebagian besar elemennya bernilai nol, dengan hanya satu elemen bukan nol yang menunjukkan keberadaan kata tertentu. Model vektor jarang, seperti <a href="https://arxiv.org/abs/2109.10086">SPLADEv2</a>, mengungguli model padat dalam pencarian pengetahuan di luar domain, kesadaran akan kata kunci, dan kemampuan penafsiran. Model-model ini sangat berguna dalam pencarian informasi, pemrosesan bahasa alami, dan sistem rekomendasi, di mana menggabungkan vektor yang jarang untuk mengingat dengan model yang besar untuk pemeringkatan dapat secara signifikan meningkatkan hasil pencarian.</p>
<p>Di Milvus, penggunaan vektor jarang mengikuti alur kerja yang mirip dengan vektor padat. Ini melibatkan pembuatan koleksi dengan kolom vektor jarang, memasukkan data, membuat indeks, dan melakukan pencarian kemiripan dan kueri skalar.</p>
<p>Dalam tutorial ini, Anda akan belajar bagaimana caranya:</p>
<ul>
<li>Menyiapkan penyisipan vektor jarang;</li>
<li>Membuat koleksi dengan kolom vektor jarang;</li>
<li>Menyisipkan entitas dengan sematan vektor jarang;</li>
<li>Mengindeks koleksi dan melakukan pencarian ANN pada vektor jarang.</li>
</ul>
<p>Untuk melihat vektor jarang beraksi, lihat <a href="https://github.com/milvus-io/pymilvus/blob/master/examples/milvus_client/sparse.py">hello_sparse.py</a>.</p>
<div class="admonition note">
    <p><b>Catatan</b></p>
        Saat ini, dukungan untuk vektor jarang adalah fitur beta di 2.4.0, dengan rencana untuk membuatnya tersedia secara umum di 3.0.0.</div>
<h2 id="Prepare-sparse-vector-embeddings" class="common-anchor-header">Menyiapkan penyematan vektor jarang<button data-href="#Prepare-sparse-vector-embeddings" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk menggunakan vektor jarang di Milvus, siapkan penyematan vektor dalam salah satu format yang didukung:</p>
<ul>
<li><p><strong>Matriks Jarang</strong>: Manfaatkan keluarga kelas <a href="https://docs.scipy.org/doc/scipy/reference/sparse.html#module-scipy.sparse">scipy.sparse</a> untuk merepresentasikan embedding jarang Anda. Metode ini efisien untuk menangani data berskala besar dan berdimensi tinggi.</p></li>
<li><p><strong>Daftar Kamus</strong>: Merepresentasikan setiap sematan jarang sebagai kamus, terstruktur sebagai <code translate="no">{dimension_index: value, ...}</code>, di mana setiap pasangan kunci-nilai merepresentasikan indeks dimensi dan nilai yang sesuai.</p>
<p>Contoh:</p>
<pre><code translate="no" class="language-python">{<span class="hljs-number">2</span>: <span class="hljs-number">0.33</span>, <span class="hljs-number">98</span>: <span class="hljs-number">0.72</span>, ...}
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Daftar Iterasi Tupel</strong>: Mirip dengan daftar kamus, tetapi menggunakan iterable tuple, <code translate="no">[(dimension_index, value)]</code>, untuk menentukan hanya dimensi yang tidak nol dan nilainya.</p>
<p>Contoh:</p>
<pre><code translate="no" class="language-python">[(<span class="hljs-number">2</span>, <span class="hljs-number">0.33</span>), (<span class="hljs-number">98</span>, <span class="hljs-number">0.72</span>), ...]
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>Contoh berikut ini menyiapkan sematan jarang dengan membuat matriks jarang acak untuk 10.000 entitas, masing-masing dengan 10.000 dimensi dan kerapatan jarang 0,005.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare entities with sparse vector representation</span>
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np
<span class="hljs-keyword">import</span> random

rng = np.random.default_rng()

num_entities, dim = <span class="hljs-number">10000</span>, <span class="hljs-number">10000</span>

<span class="hljs-comment"># Generate random sparse rows with an average of 25 non-zero elements per row</span>
entities = [
    {
        <span class="hljs-string">&quot;scalar_field&quot;</span>: rng.random(),
        <span class="hljs-comment"># To represent a single sparse vector row, you can use:</span>
        <span class="hljs-comment"># - Any of the scipy.sparse sparse matrices class family with shape[0] == 1</span>
        <span class="hljs-comment"># - Dict[int, float]</span>
        <span class="hljs-comment"># - Iterable[Tuple[int, float]]</span>
        <span class="hljs-string">&quot;sparse_vector&quot;</span>: {
            d: rng.random() <span class="hljs-keyword">for</span> d <span class="hljs-keyword">in</span> random.sample(<span class="hljs-built_in">range</span>(dim), random.randint(<span class="hljs-number">20</span>, <span class="hljs-number">30</span>))
        },
    }
    <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(num_entities)
]

<span class="hljs-comment"># print the first entity to check the representation</span>
<span class="hljs-built_in">print</span>(entities[<span class="hljs-number">0</span>])

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &#x27;scalar_field&#x27;: 0.520821523849214,</span>
<span class="hljs-comment">#     &#x27;sparse_vector&#x27;: {</span>
<span class="hljs-comment">#         5263: 0.2639375518635271,</span>
<span class="hljs-comment">#         3573: 0.34701499565746674,</span>
<span class="hljs-comment">#         9637: 0.30856525997853057,</span>
<span class="hljs-comment">#         4399: 0.19771651149001523,</span>
<span class="hljs-comment">#         6959: 0.31025067641541815,</span>
<span class="hljs-comment">#         1729: 0.8265339135915016,</span>
<span class="hljs-comment">#         1220: 0.15303302147479103,</span>
<span class="hljs-comment">#         7335: 0.9436728846033107,</span>
<span class="hljs-comment">#         6167: 0.19929870545596562,</span>
<span class="hljs-comment">#         5891: 0.8214617920371853,</span>
<span class="hljs-comment">#         2245: 0.7852255053773395,</span>
<span class="hljs-comment">#         2886: 0.8787982039149889,</span>
<span class="hljs-comment">#         8966: 0.9000606703940665,</span>
<span class="hljs-comment">#         4910: 0.3001170013981104,</span>
<span class="hljs-comment">#         17: 0.00875671667413136,</span>
<span class="hljs-comment">#         3279: 0.7003425473001098,</span>
<span class="hljs-comment">#         2622: 0.7571360018373428,</span>
<span class="hljs-comment">#         4962: 0.3901879090102064,</span>
<span class="hljs-comment">#         4698: 0.22589525720196246,</span>
<span class="hljs-comment">#         3290: 0.5510228492587324,</span>
<span class="hljs-comment">#         6185: 0.4508413201390492</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<div class="admonition note">
<p><b>Catatan</b></p>
<p>Dimensi vektor harus bertipe Python <code translate="no">int</code> atau <code translate="no">numpy.integer</code>, dan nilainya harus bertipe Python <code translate="no">float</code> atau <code translate="no">numpy.floating</code>.</p>
</div>
<p>Untuk menghasilkan embeddings, Anda juga bisa menggunakan paket <code translate="no">model</code> yang dibangun di dalam pustaka PyMilvus, yang menawarkan berbagai fungsi penyematan. Untuk detailnya, lihat <a href="/docs/id/embeddings.md">Embeddings</a>.</p>
<h2 id="Create-a-collection-with-a-sparse-vector-field" class="common-anchor-header">Membuat koleksi dengan bidang vektor yang jarang<button data-href="#Create-a-collection-with-a-sparse-vector-field" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk membuat koleksi dengan bidang vektor jarang, atur <strong>tipe data</strong> bidang vektor jarang ke <strong>DataType.SPARSE_FLOAT_VECTOR</strong>. Tidak seperti vektor padat, tidak perlu menentukan dimensi untuk vektor jarang.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># Create a MilvusClient instance</span>
client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Create a collection with a sparse vector field</span>
schema = client.create_schema(
    auto_id=<span class="hljs-literal">True</span>,
    enable_dynamic_fields=<span class="hljs-literal">True</span>,
)

schema.add_field(field_name=<span class="hljs-string">&quot;pk&quot;</span>, datatype=DataType.VARCHAR, is_primary=<span class="hljs-literal">True</span>, max_length=<span class="hljs-number">100</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;scalar_field&quot;</span>, datatype=DataType.DOUBLE)
<span class="hljs-comment"># For sparse vector, no need to specify dimension</span>
schema.add_field(field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR) <span class="hljs-comment"># set `datatype` to `SPARSE_FLOAT_VECTOR`</span>

client.create_collection(collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>, schema=schema)
<button class="copy-code-btn"></button></code></pre>
<p>Untuk detail tentang parameter koleksi umum, lihat <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md">create_collection()</a>.</p>
<h2 id="Insert-entities-with-sparse-vector-embeddings" class="common-anchor-header">Menyisipkan entitas dengan penyematan vektor jarang<button data-href="#Insert-entities-with-sparse-vector-embeddings" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk menyisipkan entitas dengan penyematan vektor jarang, cukup berikan daftar entitas ke metode <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/insert.md"><code translate="no">insert()</code></a> metode.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Insert entities</span>
client.insert(collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>, data=entities)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Index-the-collection" class="common-anchor-header">Mengindeks koleksi<button data-href="#Index-the-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Sebelum melakukan pencarian kemiripan, buatlah indeks untuk koleksi. Untuk informasi lebih lanjut mengenai jenis dan parameter indeks, lihat <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/add_index.md">add_index()</a> dan <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/create_index.md">create_index()</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Index the collection</span>

<span class="hljs-comment"># Prepare index params</span>
index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    index_name=<span class="hljs-string">&quot;sparse_inverted_index&quot;</span>,
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>, <span class="hljs-comment"># the type of index to be created. set to `SPARSE_INVERTED_INDEX` or `SPARSE_WAND`.</span>
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-comment"># the metric type to be used for the index. Currently, only `IP` (Inner Product) is supported.</span>
    params={<span class="hljs-string">&quot;drop_ratio_build&quot;</span>: <span class="hljs-number">0.2</span>}, <span class="hljs-comment"># the ratio of small vector values to be dropped during indexing.</span>
)

<span class="hljs-comment"># Create index</span>
client.create_index(collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>, index_params=index_params)
<button class="copy-code-btn"></button></code></pre>
<p>Untuk membuat indeks pada vektor yang jarang, perhatikan yang berikut ini:</p>
<ul>
<li><p><code translate="no">index_type</code>: Jenis indeks yang akan dibangun. Opsi-opsi yang memungkinkan untuk vektor jarang:</p>
<ul>
<li><p><code translate="no">SPARSE_INVERTED_INDEX</code>: Indeks terbalik yang memetakan setiap dimensi ke vektor non-nol, memfasilitasi akses langsung ke data yang relevan selama pencarian. Ideal untuk set data dengan data yang jarang namun berdimensi tinggi.</p></li>
<li><p><code translate="no">SPARSE_WAND</code>: Memanfaatkan algoritme Weak-and (WAND) untuk melewatkan kandidat yang tidak mungkin dengan cepat, memfokuskan evaluasi pada kandidat yang memiliki potensi peringkat yang lebih tinggi. Memperlakukan dimensi sebagai istilah dan vektor sebagai dokumen, sehingga mempercepat pencarian dalam set data yang besar dan jarang.</p></li>
</ul></li>
<li><p><code translate="no">metric_type</code>: Hanya metrik jarak <code translate="no">IP</code> (Inner Product) yang didukung untuk vektor yang jarang.</p></li>
<li><p><code translate="no">params.drop_ratio_build</code>: Parameter indeks yang digunakan secara khusus untuk vektor jarang. Parameter ini mengontrol proporsi nilai vektor kecil yang dikecualikan selama proses pengindeksan. Parameter ini memungkinkan penyetelan yang baik dari trade-off antara efisiensi dan akurasi dengan mengabaikan nilai-nilai kecil saat membangun indeks. Sebagai contoh, jika <code translate="no">drop_ratio_build = 0.3</code>, selama pembangunan indeks, semua nilai dari semua vektor yang jarang dikumpulkan dan diurutkan. Nilai terkecil 30% dari nilai-nilai ini tidak disertakan dalam indeks, sehingga mengurangi beban kerja komputasi selama pencarian.</p></li>
</ul>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/index.md">Indeks dalam memori</a>.</p>
<h2 id="Perform-ANN-search" class="common-anchor-header">Melakukan pencarian ANN<button data-href="#Perform-ANN-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Setelah koleksi diindeks dan dimuat ke dalam memori, gunakan metode <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/search.md"><code translate="no">search()</code></a> untuk mengambil dokumen yang relevan berdasarkan kueri.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Load the collection into memory</span>
client.load_collection(collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>)

<span class="hljs-comment"># Perform ANN search on sparse vectors</span>

<span class="hljs-comment"># for demo purpose we search for the last inserted vector</span>
query_vector = entities[-<span class="hljs-number">1</span>][<span class="hljs-string">&quot;sparse_vector&quot;</span>]

search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;drop_ratio_search&quot;</span>: <span class="hljs-number">0.2</span>}, <span class="hljs-comment"># the ratio of small vector values to be dropped during search.</span>
}

search_res = client.search(
    collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>,
    data=[query_vector],
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;pk&quot;</span>, <span class="hljs-string">&quot;scalar_field&quot;</span>],
    search_params=search_params,
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> search_res:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;hit: <span class="hljs-subst">{hit}</span>&quot;</span>)
        
<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># hit: {&#x27;id&#x27;: &#x27;448458373272710786&#x27;, &#x27;distance&#x27;: 7.220192909240723, &#x27;entity&#x27;: {&#x27;pk&#x27;: &#x27;448458373272710786&#x27;, &#x27;scalar_field&#x27;: 0.46767865218233806}}</span>
<span class="hljs-comment"># hit: {&#x27;id&#x27;: &#x27;448458373272708317&#x27;, &#x27;distance&#x27;: 1.2287548780441284, &#x27;entity&#x27;: {&#x27;pk&#x27;: &#x27;448458373272708317&#x27;, &#x27;scalar_field&#x27;: 0.7315987515699472}}</span>
<span class="hljs-comment"># hit: {&#x27;id&#x27;: &#x27;448458373272702005&#x27;, &#x27;distance&#x27;: 0.9848432540893555, &#x27;entity&#x27;: {&#x27;pk&#x27;: &#x27;448458373272702005&#x27;, &#x27;scalar_field&#x27;: 0.9871869181562156}}</span>
<button class="copy-code-btn"></button></code></pre>
<p>Saat mengonfigurasi parameter pencarian, perhatikan hal-hal berikut ini:</p>
<ul>
<li><code translate="no">params.drop_ratio_search</code>: Parameter pencarian yang digunakan secara khusus untuk vektor yang jarang. Opsi ini memungkinkan penyempurnaan proses pencarian dengan menentukan rasio nilai terkecil dalam vektor kueri yang akan diabaikan. Ini membantu menyeimbangkan ketepatan pencarian dan kinerja. Semakin kecil nilai yang ditetapkan untuk <code translate="no">drop_ratio_search</code>, semakin sedikit nilai kecil ini berkontribusi pada skor akhir. Dengan mengabaikan beberapa nilai kecil, kinerja pencarian dapat ditingkatkan dengan dampak minimal pada akurasi.</li>
</ul>
<h2 id="Perform-scalar-queries" class="common-anchor-header">Melakukan kueri skalar<button data-href="#Perform-scalar-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>Selain pencarian ANN, Milvus juga mendukung kueri skalar pada vektor yang jarang. Kueri ini memungkinkan Anda mengambil dokumen berdasarkan nilai skalar yang terkait dengan vektor jarang. Untuk informasi lebih lanjut mengenai parameter, lihat <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/query.md">query()</a>.</p>
<p>Menyaring entitas dengan <strong>scalar_field</strong> lebih besar dari 3:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Perform a query by specifying filter expr</span>
filter_query_res = client.query(
    collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;scalar_field &gt; 0.999&quot;</span>,
)

<span class="hljs-built_in">print</span>(filter_query_res[:<span class="hljs-number">2</span>])

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># [{&#x27;pk&#x27;: &#x27;448458373272701862&#x27;, &#x27;scalar_field&#x27;: 0.9994093623822689, &#x27;sparse_vector&#x27;: {173: 0.35266244411468506, 400: 0.49995484948158264, 480: 0.8757831454277039, 661: 0.9931875467300415, 1040: 0.0965644046664238, 1728: 0.7478245496749878, 2365: 0.4351981580257416, 2923: 0.5505295395851135, 3181: 0.7396837472915649, 3848: 0.4428485333919525, 4701: 0.39119353890419006, 5199: 0.790219783782959, 5798: 0.9623121619224548, 6213: 0.453134149312973, 6341: 0.745091438293457, 6775: 0.27766478061676025, 6875: 0.017947908490896225, 8093: 0.11834774166345596, 8617: 0.2289179265499115, 8991: 0.36600416898727417, 9346: 0.5502803921699524}}, {&#x27;pk&#x27;: &#x27;448458373272702421&#x27;, &#x27;scalar_field&#x27;: 0.9990218525410719, &#x27;sparse_vector&#x27;: {448: 0.587817907333374, 1866: 0.0994109958410263, 2438: 0.8672442436218262, 2533: 0.8063794374465942, 2595: 0.02122959867119789, 2828: 0.33827054500579834, 2871: 0.1984412521123886, 2938: 0.09674275666475296, 3154: 0.21552987396717072, 3662: 0.5236313343048096, 3711: 0.6463911533355713, 4029: 0.4041993021965027, 7143: 0.7370485663414001, 7589: 0.37588241696357727, 7776: 0.436136394739151, 7962: 0.06377989053726196, 8385: 0.5808192491531372, 8592: 0.8865005970001221, 8648: 0.05727503448724747, 9071: 0.9450633525848389, 9161: 0.146037295460701, 9358: 0.1903032660484314, 9679: 0.3146636486053467, 9974: 0.8561339378356934, 9991: 0.15841573476791382}}]</span>
<button class="copy-code-btn"></button></code></pre>
<p>Memfilter entitas berdasarkan kunci utama:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># primary keys of entities that satisfy the filter</span>
pks = [ret[<span class="hljs-string">&quot;pk&quot;</span>] <span class="hljs-keyword">for</span> ret <span class="hljs-keyword">in</span> filter_query_res]

<span class="hljs-comment"># Perform a query by primary key</span>
pk_query_res = client.query(
    collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>, <span class="hljs-built_in">filter</span>=<span class="hljs-string">f&quot;pk == &#x27;<span class="hljs-subst">{pks[<span class="hljs-number">0</span>]}</span>&#x27;&quot;</span>
)

<span class="hljs-built_in">print</span>(pk_query_res)

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># [{&#x27;scalar_field&#x27;: 0.9994093623822689, &#x27;sparse_vector&#x27;: {173: 0.35266244411468506, 400: 0.49995484948158264, 480: 0.8757831454277039, 661: 0.9931875467300415, 1040: 0.0965644046664238, 1728: 0.7478245496749878, 2365: 0.4351981580257416, 2923: 0.5505295395851135, 3181: 0.7396837472915649, 3848: 0.4428485333919525, 4701: 0.39119353890419006, 5199: 0.790219783782959, 5798: 0.9623121619224548, 6213: 0.453134149312973, 6341: 0.745091438293457, 6775: 0.27766478061676025, 6875: 0.017947908490896225, 8093: 0.11834774166345596, 8617: 0.2289179265499115, 8991: 0.36600416898727417, 9346: 0.5502803921699524}, &#x27;pk&#x27;: &#x27;448458373272701862&#x27;}]</span>
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
    </button></h2><p>Ketika menggunakan vektor jarang di Milvus, pertimbangkan batas-batas berikut ini:</p>
<ul>
<li><p>Saat ini, hanya metrik jarak <strong>IP</strong> yang didukung untuk vektor jarang.</p></li>
<li><p>Untuk bidang vektor jarang, hanya jenis indeks <strong>SPARSE_INVERTED_INDEX</strong> dan <strong>SPARSE_WAND</strong> yang didukung.</p></li>
<li><p>Saat ini, <a href="https://milvus.io/docs/single-vector-search.md#Range-search">pencarian rentang</a>, <a href="https://milvus.io/docs/single-vector-search.md#Grouping-search">pencarian pengelompokan</a>, dan <a href="https://milvus.io/docs/with-iterators.md#Search-with-iterator">iterator pencarian</a> tidak didukung untuk vektor jarang.</p></li>
</ul>
<h2 id="FAQ" class="common-anchor-header">TANYA JAWAB<button data-href="#FAQ" class="anchor-icon" translate="no">
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
<li><p><strong>Metrik jarak apa yang didukung untuk vektor jarang?</strong></p>
<p>Vektor jarang hanya mendukung metrik jarak Inner Product (IP) karena dimensi vektor jarang yang tinggi, sehingga jarak L2 dan jarak kosinus menjadi tidak praktis.</p></li>
<li><p><strong>Dapatkah Anda menjelaskan perbedaan antara SPARSE_INVERTED_INDEX dan SPARSE_WAND, dan bagaimana cara memilih di antara keduanya?</strong></p>
<p><strong>SPARSE_INVERTED_INDEX</strong> adalah indeks terbalik tradisional, sedangkan <strong>SPARSE_WAND</strong> menggunakan algoritme <a href="https://dl.acm.org/doi/10.1145/956863.956944">Weak-AND</a> untuk mengurangi jumlah evaluasi jarak IP penuh selama pencarian. <strong>SPARSE_WAND</strong> biasanya lebih cepat, tetapi kinerjanya dapat menurun dengan meningkatnya kepadatan vektor. Untuk memilih di antara keduanya, lakukan eksperimen dan tolok ukur berdasarkan dataset dan kasus penggunaan spesifik Anda.</p></li>
<li><p><strong>Bagaimana cara memilih parameter drop_ratio_build dan drop_ratio_search?</strong></p>
<p>Pilihan <strong>drop_ratio_build</strong> dan <strong>drop_ratio_search</strong> bergantung pada karakteristik data Anda dan kebutuhan Anda untuk latensi/throughput dan akurasi pencarian.</p></li>
<li><p><strong>Tipe data apa yang didukung untuk penyematan jarang?</strong></p>
<p>Bagian dimensi harus berupa bilangan bulat 32-bit yang tidak ditandatangani, dan bagian nilai dapat berupa bilangan floating-point 32-bit non-negatif.</p></li>
<li><p><strong>Dapatkah dimensi embedding jarang berupa nilai diskrit dalam ruang uint32?</strong></p>
<p>Ya, dengan satu pengecualian. Dimensi dari embedding jarang dapat berupa nilai apa pun dalam kisaran <code translate="no">[0, maximum of uint32)</code>. Ini berarti Anda tidak dapat menggunakan nilai maksimum uint32.</p></li>
<li><p><strong>Apakah pencarian pada ruas yang sedang tumbuh dilakukan melalui indeks atau dengan brute force?</strong></p>
<p>Pencarian pada segmen yang sedang tumbuh dilakukan melalui indeks dengan tipe yang sama dengan indeks segmen yang disegel. Untuk segmen baru yang sedang tumbuh sebelum indeks dibangun, pencarian brute force digunakan.</p></li>
<li><p><strong>Apakah mungkin untuk memiliki vektor yang jarang dan padat dalam satu koleksi?</strong></p>
<p>Ya, dengan dukungan beberapa jenis vektor, Anda dapat membuat koleksi dengan kolom vektor jarang dan padat serta melakukan pencarian hibrida pada koleksi tersebut.</p></li>
<li><p><strong>Apa saja persyaratan agar sematan jarang dapat disisipkan atau dicari?</strong></p>
<p>Sematan jarang harus memiliki setidaknya satu nilai bukan nol, dan indeks vektor harus non-negatif.</p></li>
</ul>
