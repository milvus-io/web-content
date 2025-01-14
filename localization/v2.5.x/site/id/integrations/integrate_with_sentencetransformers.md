---
id: integrate_with_sentencetransformers.md
summary: Halaman ini membahas pencarian film menggunakan Milvus
title: Pencarian Film Menggunakan Milvus dan SentenceTransformers
---
<h1 id="Movie-Search-Using-Milvus-and-SentenceTransformers" class="common-anchor-header">Pencarian Film Menggunakan Milvus dan SentenceTransformers<button data-href="#Movie-Search-Using-Milvus-and-SentenceTransformers" class="anchor-icon" translate="no">
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
    </button></h1><p>Dalam contoh ini, kita akan mencari ringkasan plot film menggunakan Milvus dan pustaka SentenceTransformers. Dataset yang akan kita gunakan adalah <a href="https://huggingface.co/datasets/vishnupriyavr/wiki-movie-plots-with-summaries">Wikipedia Movie Plots with Summaries</a> yang dihosting di HuggingFace.</p>
<p>Mari kita mulai!</p>
<h2 id="Required-Libraries" class="common-anchor-header">Pustaka yang Dibutuhkan<button data-href="#Required-Libraries" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk contoh ini, kita akan menggunakan <code translate="no">pymilvus</code> untuk terhubung menggunakan Milvus, <code translate="no">sentence-transformers</code> untuk menghasilkan penyematan vektor, dan <code translate="no">datasets</code> untuk mengunduh dataset contoh.</p>
<pre><code translate="no" class="language-shell">pip install pymilvus sentence-transformers datasets tqdm
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> datasets <span class="hljs-keyword">import</span> load_dataset
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusClient</span>
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">FieldSchema</span>, <span class="hljs-title class_">CollectionSchema</span>, <span class="hljs-title class_">DataType</span>
<span class="hljs-keyword">from</span> sentence_transformers <span class="hljs-keyword">import</span> <span class="hljs-title class_">SentenceTransformer</span>
<span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm
<button class="copy-code-btn"></button></code></pre>
<p>Kita akan mendefinisikan beberapa parameter global,</p>
<pre><code translate="no" class="language-python">embedding_dim = <span class="hljs-number">384</span>
collection_name = <span class="hljs-string">&quot;movie_embeddings&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Downloading-and-Opening-the-Dataset" class="common-anchor-header">Mengunduh dan Membuka Dataset<button data-href="#Downloading-and-Opening-the-Dataset" class="anchor-icon" translate="no">
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
    </button></h2><p>Dalam satu baris, <code translate="no">datasets</code> memungkinkan kita untuk mengunduh dan membuka dataset. Perpustakaan akan menyimpan dataset secara lokal dan menggunakan salinan tersebut pada saat dataset dijalankan. Setiap baris berisi rincian film yang memiliki artikel Wikipedia yang menyertainya. Kami menggunakan kolom <code translate="no">Title</code>, <code translate="no">PlotSummary</code>, <code translate="no">Release Year</code>, dan <code translate="no">Origin/Ethnicity</code>.</p>
<pre><code translate="no" class="language-python">ds = load_dataset(<span class="hljs-string">&quot;vishnupriyavr/wiki-movie-plots-with-summaries&quot;</span>, <span class="hljs-built_in">split</span>=<span class="hljs-string">&quot;train&quot;</span>)
<span class="hljs-built_in">print</span>(ds)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Connecting-to-the-Database" class="common-anchor-header">Menghubungkan ke Basis Data<button data-href="#Connecting-to-the-Database" class="anchor-icon" translate="no">
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
    </button></h2><p>Pada titik ini, kita akan mulai menyiapkan Milvus. Langkah-langkahnya adalah sebagai berikut:</p>
<ol>
<li>Buatlah sebuah database Milvus Lite dalam sebuah berkas lokal. (Ganti URI ini dengan alamat server untuk Milvus Standalone dan Milvus Distributed).</li>
</ol>
<pre><code translate="no" class="language-python">client = <span class="hljs-title class_">MilvusClient</span>(uri=<span class="hljs-string">&quot;./sentence_transformers_example.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Buat skema data. Ini menentukan bidang-bidang yang terdiri dari sebuah elemen termasuk dimensi penyematan vektor.</li>
</ol>
<pre><code translate="no" class="language-python">fields = [
    FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>),
    FieldSchema(name=<span class="hljs-string">&quot;title&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">256</span>),
    FieldSchema(name=<span class="hljs-string">&quot;embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=embedding_dim),
    FieldSchema(name=<span class="hljs-string">&quot;year&quot;</span>, dtype=DataType.INT64),
    FieldSchema(name=<span class="hljs-string">&quot;origin&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">64</span>),
]

schema = CollectionSchema(fields=fields, enable_dynamic_field=<span class="hljs-literal">False</span>)
client.create_collection(collection_name=collection_name, schema=schema)
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>Tentukan algoritme pengindeksan pencarian vektor. Milvus Lite mendukung tipe indeks FLAT, sedangkan Milvus Standalone dan Milvus Distributed mengimplementasikan berbagai macam metode seperti IVF, HNSW, dan DiskANN. Untuk skala data yang kecil dalam demo ini, semua jenis indeks pencarian sudah cukup, jadi kami menggunakan yang paling sederhana, yaitu FLAT.</li>
</ol>
<pre><code translate="no" class="language-python">index_params = client.<span class="hljs-title function_">prepare_index_params</span>()
index_params.<span class="hljs-title function_">add_index</span>(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, index_type=<span class="hljs-string">&quot;FLAT&quot;</span>, metric_type=<span class="hljs-string">&quot;IP&quot;</span>)
client.<span class="hljs-title function_">create_index</span>(collection_name, index_params)
<button class="copy-code-btn"></button></code></pre>
<p>Setelah langkah-langkah ini selesai, kita siap memasukkan data ke dalam koleksi dan melakukan pencarian. Setiap data yang ditambahkan akan diindeks secara otomatis dan langsung tersedia untuk pencarian. Jika datanya masih sangat baru, pencarian mungkin akan lebih lambat karena pencarian brute force akan digunakan pada data yang masih dalam proses pengindeksan.</p>
<h2 id="Inserting-the-Data" class="common-anchor-header">Memasukkan Data<button data-href="#Inserting-the-Data" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk contoh ini, kita akan menggunakan model miniLM SentenceTransformers untuk membuat penyisipan teks plot. Model ini menghasilkan penyematan 384 dimensi.</p>
<pre><code translate="no" class="language-python">model = <span class="hljs-title class_">SentenceTransformer</span>(<span class="hljs-string">&quot;all-MiniLM-L12-v2&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Kami mengulang baris data, menyematkan bidang ringkasan plot, dan menyisipkan entitas ke dalam basis data vektor. Secara umum, Anda harus melakukan langkah ini pada sekumpulan item data untuk memaksimalkan throughput CPU atau GPU untuk model penyematan, seperti yang kita lakukan di sini.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> batch in <span class="hljs-title function_">tqdm</span><span class="hljs-params">(ds.batch(batch_size=<span class="hljs-number">512</span>)</span>):
    embeddings = model.encode(batch[<span class="hljs-string">&quot;PlotSummary&quot;</span>])
    data = [
        {<span class="hljs-string">&quot;title&quot;</span>: title, <span class="hljs-string">&quot;embedding&quot;</span>: embedding, <span class="hljs-string">&quot;year&quot;</span>: year, <span class="hljs-string">&quot;origin&quot;</span>: origin}
        <span class="hljs-keyword">for</span> title, embedding, year, origin in <span class="hljs-title function_">zip</span><span class="hljs-params">(
            batch[<span class="hljs-string">&quot;Title&quot;</span>], embeddings, batch[<span class="hljs-string">&quot;Release Year&quot;</span>], batch[<span class="hljs-string">&quot;Origin/Ethnicity&quot;</span>]
        )</span>
    ]
    res = client.insert(collection_name=collection_name, data=data)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Operasi di atas relatif memakan waktu karena penyematan membutuhkan waktu. Langkah ini membutuhkan waktu sekitar 2 menit menggunakan CPU pada MacBook Pro 2023 dan akan jauh lebih cepat dengan GPU khusus. Beristirahatlah dan nikmati secangkir kopi!</p>
</div>
<h2 id="Performing-the-Search" class="common-anchor-header">Melakukan Pencarian<button data-href="#Performing-the-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>Dengan semua data yang telah dimasukkan ke dalam Milvus, kita dapat mulai melakukan pencarian. Dalam contoh ini, kita akan mencari film berdasarkan ringkasan plot dari Wikipedia. Karena kita melakukan pencarian batch, waktu pencarian dibagi untuk semua pencarian film. (Dapatkah Anda menebak film apa yang ingin saya ambil berdasarkan teks deskripsi kueri?)</p>
<pre><code translate="no" class="language-python">queries = [
    <span class="hljs-string">&#x27;A shark terrorizes an LA beach.&#x27;</span>,
    <span class="hljs-string">&#x27;An archaeologist searches for ancient artifacts while fighting Nazis.&#x27;</span>,
    <span class="hljs-string">&#x27;Teenagers in detention learn about themselves.&#x27;</span>,
    <span class="hljs-string">&#x27;A teenager fakes illness to get off school and have adventures with two friends.&#x27;</span>,
    <span class="hljs-string">&#x27;A young couple with a kid look after a hotel during winter and the husband goes insane.&#x27;</span>,
    <span class="hljs-string">&#x27;Four turtles fight bad guys.&#x27;</span>
    ]

<span class="hljs-comment"># Search the database based on input text</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">embed_query</span>(<span class="hljs-params">data</span>):
    vectors = model.encode(data)
    <span class="hljs-keyword">return</span> [x <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> vectors]


query_vectors = embed_query(queries)

res = client.search(
    collection_name=collection_name,
    data=query_vectors,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;origin == &quot;American&quot; and year &gt; 1945 and year &lt; 2000&#x27;</span>,
    anns_field=<span class="hljs-string">&quot;embedding&quot;</span>,
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;title&quot;</span>],
)

<span class="hljs-keyword">for</span> idx, hits <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(res):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Query:&quot;</span>, queries[idx])
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Results:&quot;</span>)
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(hit[<span class="hljs-string">&quot;entity&quot;</span>].get(<span class="hljs-string">&quot;title&quot;</span>), <span class="hljs-string">&quot;(&quot;</span>, <span class="hljs-built_in">round</span>(hit[<span class="hljs-string">&quot;distance&quot;</span>], <span class="hljs-number">2</span>), <span class="hljs-string">&quot;)&quot;</span>)
    <span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<p>Hasilnya adalah:</p>
<pre><code translate="no" class="language-shell">Query: An archaeologist searches <span class="hljs-keyword">for</span> ancient artifacts <span class="hljs-keyword">while</span> fighting Nazis.
Results:
Love Slaves of the Amazons ( <span class="hljs-number">0.4</span> )
A Time to Love <span class="hljs-keyword">and</span> a Time to Die ( <span class="hljs-number">0.39</span> )
The Fifth Element ( <span class="hljs-number">0.39</span> )

Query: Teenagers <span class="hljs-keyword">in</span> detention learn about themselves.
Results:
The Breakfast Club ( <span class="hljs-number">0.54</span> )
Up the Academy ( <span class="hljs-number">0.46</span> )
Fame ( <span class="hljs-number">0.43</span> )

Query: A teenager fakes illness to get off school <span class="hljs-keyword">and</span> have adventures <span class="hljs-keyword">with</span> two friends.
Results:
Ferris Buelle<span class="hljs-string">r&#x27;s Day Off ( 0.48 )
Fever Lake ( 0.47 )
Losin&#x27;</span> It ( <span class="hljs-number">0.39</span> )

Query: A young couple <span class="hljs-keyword">with</span> a kid look after a hotel during winter <span class="hljs-keyword">and</span> the husband goes insane.
Results:
The Shining ( <span class="hljs-number">0.48</span> )
The Four Seasons ( <span class="hljs-number">0.42</span> )
Highball ( <span class="hljs-number">0.41</span> )

Query: Four turtles fight bad guys.
Results:
Teenage Mutant Ninja Turtles II: The Secret of the Ooze ( <span class="hljs-number">0.47</span> )
Devil May Hare ( <span class="hljs-number">0.43</span> )
Attack of the Giant Leeches ( <span class="hljs-number">0.42</span> )
<button class="copy-code-btn"></button></code></pre>
