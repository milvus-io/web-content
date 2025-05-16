---
id: funnel_search_with_matryoshka.md
summary: >-
  Dalam buku catatan ini, kami membahas cara menggunakan embedding Matryoshka
  dengan Milvus untuk pencarian semantik. Kami mengilustrasikan sebuah algoritma
  yang disebut "pencarian corong" yang memungkinkan kita untuk melakukan
  pencarian kemiripan pada sebagian kecil dari dimensi embedding kita tanpa
  penurunan drastis dalam recall.
title: Pencarian Corong dengan Penyematan Matryoshka
---
<h1 id="Funnel-Search-with-Matryoshka-Embeddings" class="common-anchor-header">Pencarian Corong dengan Penyematan Matryoshka<button data-href="#Funnel-Search-with-Matryoshka-Embeddings" class="anchor-icon" translate="no">
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
    </button></h1><div style='margin: auto; width: 50%;'><img translate="no" src='/docs/v2.5.x/assets/funnel-search.png' width='100%'></div>
Ketika membangun sistem pencarian vektor yang efisien, salah satu tantangan utama adalah mengelola biaya penyimpanan sambil mempertahankan latensi dan pemanggilan yang dapat diterima. Model penyematan modern menghasilkan vektor dengan ratusan atau ribuan dimensi, menciptakan penyimpanan yang signifikan dan overhead komputasi untuk vektor mentah dan indeks.<p>Secara tradisional, kebutuhan penyimpanan dikurangi dengan menerapkan metode kuantisasi atau pengurangan dimensi sebelum membangun indeks. Sebagai contoh, kita dapat menghemat penyimpanan dengan menurunkan presisi menggunakan Product Quantization (PQ) atau jumlah dimensi menggunakan Principal Component Analysis (PCA). Metode-metode ini menganalisis seluruh kumpulan vektor untuk menemukan vektor yang lebih ringkas yang mempertahankan hubungan semantik antar vektor.</p>
<p>Meskipun efektif, pendekatan standar ini mengurangi presisi atau dimensi hanya sekali dan pada skala tunggal. Namun, bagaimana jika kita dapat mempertahankan beberapa lapisan detail secara bersamaan, seperti piramida representasi yang semakin presisi?</p>
<p>Masuklah ke dalam penyematan Matryoshka. Dinamai berdasarkan boneka sarang Rusia (lihat ilustrasi), konstruksi cerdas ini menyematkan beberapa skala representasi dalam satu vektor. Tidak seperti metode pasca-pemrosesan tradisional, embeddings Matryoshka mempelajari struktur multi-skala ini selama proses pelatihan awal. Hasilnya luar biasa: tidak hanya penyematan penuh yang menangkap semantik input, tetapi setiap awalan subset bersarang (paruh pertama, kuartal pertama, dll.) memberikan representasi yang koheren, meskipun tidak terlalu detail.</p>
<p>Dalam buku catatan ini, kami membahas cara menggunakan embedding Matryoshka dengan Milvus untuk pencarian semantik. Kami mengilustrasikan sebuah algoritma yang disebut "pencarian corong" yang memungkinkan kita untuk melakukan pencarian kemiripan pada sebagian kecil dari dimensi penyematan kita tanpa penurunan yang drastis dalam mengingat.</p>
<h2 id="Preparation" class="common-anchor-header">Persiapan<button data-href="#Preparation" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install datasets numpy pandas pymilvus sentence-transformers tqdm</span>
<button class="copy-code-btn"></button></code></pre>
<p>Hanya untuk CPU:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu</span>
<button class="copy-code-btn"></button></code></pre>
<p>Untuk CUDA 11.8:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118</span>
<button class="copy-code-btn"></button></code></pre>
<p>Perintah instalasi CUDA 11.8 hanyalah sebuah contoh. Harap konfirmasikan versi CUDA Anda saat menginstal PyTorch.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> functools

<span class="hljs-keyword">from</span> datasets <span class="hljs-keyword">import</span> load_dataset
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np
<span class="hljs-keyword">import</span> pandas <span class="hljs-keyword">as</span> pd
<span class="hljs-keyword">import</span> pymilvus
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldSchema, CollectionSchema, DataType
<span class="hljs-keyword">from</span> sentence_transformers <span class="hljs-keyword">import</span> SentenceTransformer
<span class="hljs-keyword">import</span> torch
<span class="hljs-keyword">import</span> torch.nn.functional <span class="hljs-keyword">as</span> F
<span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm
<button class="copy-code-btn"></button></code></pre>
<h2 id="Load-Matryoshka-Embedding-Model" class="common-anchor-header">Memuat Model Embedding Matryoshka<button data-href="#Load-Matryoshka-Embedding-Model" class="anchor-icon" translate="no">
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
    </button></h2><p>Alih-alih menggunakan model embedding standar seperti <a href="https://huggingface.co/sentence-transformers/all-MiniLM-L12-v2"><code translate="no">sentence-transformers/all-MiniLM-L12-v2</code></a>kami menggunakan <a href="https://huggingface.co/nomic-ai/nomic-embed-text-v1">model dari Nomic</a> yang dilatih secara khusus untuk menghasilkan embedding Matryoshka.</p>
<pre><code translate="no" class="language-python">model = SentenceTransformer(
    <span class="hljs-comment"># Remove &#x27;device=&#x27;mps&#x27; if running on non-Mac device</span>
    <span class="hljs-string">&quot;nomic-ai/nomic-embed-text-v1.5&quot;</span>,
    trust_remote_code=<span class="hljs-literal">True</span>,
    device=<span class="hljs-string">&quot;mps&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">&lt;All keys matched successfully&gt;
</code></pre>
<h2 id="Loading-Dataset-Embedding-Items-and-Building-Vector-Database" class="common-anchor-header">Memuat Dataset, Menyematkan Item, dan Membangun Basis Data Vektor<button data-href="#Loading-Dataset-Embedding-Items-and-Building-Vector-Database" class="anchor-icon" translate="no">
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
    </button></h2><p>Kode berikut ini adalah modifikasi dari halaman dokumentasi <a href="https://milvus.io/docs/integrate_with_sentencetransformers.md">"Pencarian Film dengan Pengubah Kalimat dan Milvus"</a>. Pertama, kita memuat dataset dari HuggingFace. Dataset ini berisi sekitar 35 ribu entri, masing-masing sesuai dengan film yang memiliki artikel Wikipedia. Kita akan menggunakan bidang <code translate="no">Title</code> dan <code translate="no">PlotSummary</code> dalam contoh ini.</p>
<pre><code translate="no" class="language-python">ds = load_dataset(<span class="hljs-string">&quot;vishnupriyavr/wiki-movie-plots-with-summaries&quot;</span>, split=<span class="hljs-string">&quot;train&quot;</span>)
<span class="hljs-built_in">print</span>(ds)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Dataset({
    features: ['Release Year', 'Title', 'Origin/Ethnicity', 'Director', 'Cast', 'Genre', 'Wiki Page', 'Plot', 'PlotSummary'],
    num_rows: 34886
})
</code></pre>
<p>Selanjutnya, kita sambungkan ke basis data Milvus Lite, tentukan skema datanya, dan buat koleksi dengan skema ini. Kita akan menyimpan embedding yang belum dinormalisasi dan seperenam pertama dari embedding di bidang yang terpisah. Alasannya adalah karena kita membutuhkan 1/6 pertama dari embedding Matryoshka untuk melakukan pencarian kemiripan, dan 5/6 embedding yang tersisa untuk menentukan peringkat dan meningkatkan hasil pencarian.</p>
<pre><code translate="no" class="language-python">embedding_dim = <span class="hljs-number">768</span>
search_dim = <span class="hljs-number">128</span>
collection_name = <span class="hljs-string">&quot;movie_embeddings&quot;</span>

client = MilvusClient(uri=<span class="hljs-string">&quot;./wiki-movie-plots-matryoshka.db&quot;</span>)

fields = [
    FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>),
    FieldSchema(name=<span class="hljs-string">&quot;title&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">256</span>),
    <span class="hljs-comment"># First sixth of unnormalized embedding vector</span>
    FieldSchema(name=<span class="hljs-string">&quot;head_embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=search_dim),
    <span class="hljs-comment"># Entire unnormalized embedding vector</span>
    FieldSchema(name=<span class="hljs-string">&quot;embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=embedding_dim),
]

schema = CollectionSchema(fields=fields, enable_dynamic_field=<span class="hljs-literal">False</span>)
client.create_collection(collection_name=collection_name, schema=schema)
<button class="copy-code-btn"></button></code></pre>
<p>Milvus saat ini tidak mendukung pencarian melalui subset dari embedding, jadi kami memecah embedding menjadi dua bagian: kepala mewakili subset awal vektor untuk diindeks dan dicari, dan ekor adalah sisanya. Model dilatih untuk pencarian kemiripan jarak kosinus, jadi kami menormalkan embedding kepala. Namun, untuk menghitung kemiripan untuk subset yang lebih besar di kemudian hari, kita perlu menyimpan norma dari penyisipan kepala, sehingga kita dapat menormalkannya kembali sebelum menggabungkannya dengan ekor.</p>
<p>Untuk melakukan pencarian melalui 1/6 pertama dari penyematan, kita perlu membuat indeks pencarian vektor di bidang <code translate="no">head_embedding</code>. Nantinya, kita akan membandingkan hasil "pencarian corong" dengan pencarian vektor biasa, dan juga membuat indeks pencarian di atas penyematan penuh.</p>
<p><em>Yang penting, kita menggunakan metrik jarak <code translate="no">COSINE</code> dan bukan <code translate="no">IP</code>, karena jika tidak, kita harus melacak norma-norma penyematan, yang akan menyulitkan implementasi (hal ini akan lebih masuk akal setelah algoritme pencarian corong dijelaskan).</em></p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;head_embedding&quot;</span>, index_type=<span class="hljs-string">&quot;FLAT&quot;</span>, metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>
)
index_params.add_index(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, index_type=<span class="hljs-string">&quot;FLAT&quot;</span>, metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>)
client.create_index(collection_name, index_params)
<button class="copy-code-btn"></button></code></pre>
<p>Terakhir, kami mengkodekan ringkasan plot untuk semua 35 ribu film dan memasukkan penyematan yang sesuai ke dalam basis data.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> batch <span class="hljs-keyword">in</span> tqdm(ds.batch(batch_size=<span class="hljs-number">512</span>)):
    <span class="hljs-comment"># This particular model requires us to prefix &#x27;search_document:&#x27; to stored entities</span>
    plot_summary = [<span class="hljs-string">&quot;search_document: &quot;</span> + x.strip() <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> batch[<span class="hljs-string">&quot;PlotSummary&quot;</span>]]

    <span class="hljs-comment"># Output of embedding model is unnormalized</span>
    embeddings = model.encode(plot_summary, convert_to_tensor=<span class="hljs-literal">True</span>)
    head_embeddings = embeddings[:, :search_dim]

    data = [
        {
            <span class="hljs-string">&quot;title&quot;</span>: title,
            <span class="hljs-string">&quot;head_embedding&quot;</span>: head.cpu().numpy(),
            <span class="hljs-string">&quot;embedding&quot;</span>: embedding.cpu().numpy(),
        }
        <span class="hljs-keyword">for</span> title, head, embedding <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(batch[<span class="hljs-string">&quot;Title&quot;</span>], head_embeddings, embeddings)
    ]
    res = client.insert(collection_name=collection_name, data=data)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">100%|██████████| 69/69 [05:57&lt;00:00,  5.18s/it]
</code></pre>
<h2 id="Performing-Funnel-Search" class="common-anchor-header">Melakukan Pencarian Corong<button data-href="#Performing-Funnel-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>Sekarang mari kita mengimplementasikan "pencarian corong" dengan menggunakan 1/6 pertama dari dimensi penyematan Matryoshka. Saya memiliki tiga film yang akan diambil dan telah membuat ringkasan plot saya sendiri untuk menanyakan database. Kami menyematkan kueri, lalu melakukan pencarian vektor pada bidang <code translate="no">head_embedding</code>, mengambil 128 kandidat hasil.</p>
<pre><code translate="no" class="language-python">queries = [
    <span class="hljs-string">&quot;An archaeologist searches for ancient artifacts while fighting Nazis.&quot;</span>,
    <span class="hljs-string">&quot;A teenager fakes illness to get off school and have adventures with two friends.&quot;</span>,
    <span class="hljs-string">&quot;A young couple with a kid look after a hotel during winter and the husband goes insane.&quot;</span>,
]


<span class="hljs-comment"># Search the database based on input text</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">embed_search</span>(<span class="hljs-params">data</span>):
    embeds = model.encode(data)
    <span class="hljs-keyword">return</span> [x <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> embeds]


<span class="hljs-comment"># This particular model requires us to prefix &#x27;search_query:&#x27; to queries</span>
instruct_queries = [<span class="hljs-string">&quot;search_query: &quot;</span> + q.strip() <span class="hljs-keyword">for</span> q <span class="hljs-keyword">in</span> queries]
search_data = embed_search(instruct_queries)

<span class="hljs-comment"># Normalize head embeddings</span>
head_search = [x[:search_dim] <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> search_data]

<span class="hljs-comment"># Perform standard vector search on first sixth of embedding dimensions</span>
res = client.search(
    collection_name=collection_name,
    data=head_search,
    anns_field=<span class="hljs-string">&quot;head_embedding&quot;</span>,
    limit=<span class="hljs-number">128</span>,
    output_fields=[<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;head_embedding&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>],
)
<button class="copy-code-btn"></button></code></pre>
<p>Pada titik ini, kita telah melakukan pencarian pada ruang vektor yang jauh lebih kecil, dan oleh karena itu kemungkinan besar telah menurunkan latensi dan mengurangi kebutuhan penyimpanan untuk indeks dibandingkan dengan pencarian pada ruang penuh. Mari kita periksa 5 kecocokan teratas untuk setiap kueri:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> query, hits <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(queries, res):
    rows = [x[<span class="hljs-string">&quot;entity&quot;</span>] <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> hits][:<span class="hljs-number">5</span>]

    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Query:&quot;</span>, query)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Results:&quot;</span>)
    <span class="hljs-keyword">for</span> row <span class="hljs-keyword">in</span> rows:
        <span class="hljs-built_in">print</span>(row[<span class="hljs-string">&quot;title&quot;</span>].strip())
    <span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Query: An archaeologist searches for ancient artifacts while fighting Nazis.
Results:
&quot;Pimpernel&quot; Smith
Black Hunters
The Passage
Counterblast
Dominion: Prequel to the Exorcist

Query: A teenager fakes illness to get off school and have adventures with two friends.
Results:
How to Deal
Shorts
Blackbird
Valentine
Unfriended

Query: A young couple with a kid look after a hotel during winter and the husband goes insane.
Results:
Ghostkeeper
Our Vines Have Tender Grapes
The Ref
Impact
The House in Marsh Road
</code></pre>
<p>Seperti yang bisa kita lihat, recall mengalami penurunan akibat pemotongan sematan selama pencarian. Pencarian corong memperbaiki hal ini dengan trik yang cerdas: kita dapat menggunakan sisa dimensi penyematan untuk memberi peringkat ulang dan memangkas daftar kandidat kita untuk memulihkan kinerja pencarian tanpa menjalankan pencarian vektor tambahan yang mahal.</p>
<p>Untuk memudahkan penjelasan algoritme pencarian corong, kami mengubah hit pencarian Milvus untuk setiap kueri menjadi bingkai data Pandas.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">hits_to_dataframe</span>(<span class="hljs-params">hits: pymilvus.client.abstract.Hits</span>) -&gt; pd.DataFrame:
    <span class="hljs-string">&quot;&quot;&quot;
    Convert a Milvus search result to a Pandas dataframe. This function is specific to our data schema.

    &quot;&quot;&quot;</span>
    rows = [x[<span class="hljs-string">&quot;entity&quot;</span>] <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> hits]
    rows_dict = [
        {<span class="hljs-string">&quot;title&quot;</span>: x[<span class="hljs-string">&quot;title&quot;</span>], <span class="hljs-string">&quot;embedding&quot;</span>: torch.tensor(x[<span class="hljs-string">&quot;embedding&quot;</span>])} <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> rows
    ]
    <span class="hljs-keyword">return</span> pd.DataFrame.from_records(rows_dict)


dfs = [hits_to_dataframe(hits) <span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> res]
<button class="copy-code-btn"></button></code></pre>
<p>Sekarang, untuk melakukan pencarian corong, kami melakukan iterasi pada himpunan bagian yang semakin besar dari sematan. Pada setiap iterasi, kami mengubah peringkat kandidat berdasarkan kesamaan baru dan memangkas sebagian kecil dari peringkat terendah.</p>
<p>Untuk memperjelas hal ini, dari langkah sebelumnya kami telah mengambil 128 kandidat dengan menggunakan 1/6 dari dimensi embedding dan kueri. Langkah pertama dalam melakukan pencarian corong adalah menghitung ulang kemiripan antara kueri dan kandidat menggunakan <em>1/3 dimensi pertama.</em> 64 kandidat terbawah dipangkas. Kemudian kami mengulangi proses ini dengan <em>2/3 dimensi pertama</em>, dan kemudian <em>semua dimensi</em>, secara berurutan memangkas menjadi 32 dan 16 kandidat.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># An optimized implementation would vectorize the calculation of similarity scores across rows (using a matrix)</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">calculate_score</span>(<span class="hljs-params">row, query_emb=<span class="hljs-literal">None</span>, dims=<span class="hljs-number">768</span></span>):
    emb = F.normalize(row[<span class="hljs-string">&quot;embedding&quot;</span>][:dims], dim=-<span class="hljs-number">1</span>)
    <span class="hljs-keyword">return</span> (emb @ query_emb).item()


<span class="hljs-comment"># You could also add a top-K parameter as a termination condition</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">funnel_search</span>(<span class="hljs-params">
    df: pd.DataFrame, query_emb, scales=[<span class="hljs-number">256</span>, <span class="hljs-number">512</span>, <span class="hljs-number">768</span>], prune_ratio=<span class="hljs-number">0.5</span>
</span>) -&gt; pd.DataFrame:
    <span class="hljs-comment"># Loop over increasing prefixes of the embeddings</span>
    <span class="hljs-keyword">for</span> dims <span class="hljs-keyword">in</span> scales:
        <span class="hljs-comment"># Query vector must be normalized for each new dimensionality</span>
        emb = torch.tensor(query_emb[:dims] / np.linalg.norm(query_emb[:dims]))

        <span class="hljs-comment"># Score</span>
        scores = df.apply(
            functools.partial(calculate_score, query_emb=emb, dims=dims), axis=<span class="hljs-number">1</span>
        )
        df[<span class="hljs-string">&quot;scores&quot;</span>] = scores

        <span class="hljs-comment"># Re-rank</span>
        df = df.sort_values(by=<span class="hljs-string">&quot;scores&quot;</span>, ascending=<span class="hljs-literal">False</span>)

        <span class="hljs-comment"># Prune (in our case, remove half of candidates at each step)</span>
        df = df.head(<span class="hljs-built_in">int</span>(prune_ratio * <span class="hljs-built_in">len</span>(df)))

    <span class="hljs-keyword">return</span> df


dfs_results = [
    {<span class="hljs-string">&quot;query&quot;</span>: query, <span class="hljs-string">&quot;results&quot;</span>: funnel_search(df, query_emb)}
    <span class="hljs-keyword">for</span> query, df, query_emb <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(queries, dfs, search_data)
]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> d <span class="hljs-keyword">in</span> dfs_results:
    <span class="hljs-built_in">print</span>(d[<span class="hljs-string">&quot;query&quot;</span>], <span class="hljs-string">&quot;\n&quot;</span>, d[<span class="hljs-string">&quot;results&quot;</span>][:<span class="hljs-number">5</span>][<span class="hljs-string">&quot;title&quot;</span>], <span class="hljs-string">&quot;\n&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">An archaeologist searches for ancient artifacts while fighting Nazis. 
 0           &quot;Pimpernel&quot; Smith
1               Black Hunters
29    Raiders of the Lost Ark
34             The Master Key
51            My Gun Is Quick
Name: title, dtype: object 

A teenager fakes illness to get off school and have adventures with two friends. 
 21               How I Live Now
32     On the Edge of Innocence
77             Bratz: The Movie
4                    Unfriended
108                  Simon Says
Name: title, dtype: object 

A young couple with a kid look after a hotel during winter and the husband goes insane. 
 9         The Shining
0         Ghostkeeper
11     Fast and Loose
7      Killing Ground
12         Home Alone
Name: title, dtype: object 
</code></pre>
<p>Kami telah mampu memulihkan daya ingat tanpa melakukan pencarian vektor tambahan! Secara kualitatif, hasil ini tampaknya memiliki daya ingat yang lebih tinggi untuk "Raiders of the Lost Ark" dan "The Shining" daripada pencarian vektor standar dalam tutorial, <a href="https://milvus.io/docs/integrate_with_sentencetransformers.md">"Pencarian Film menggunakan Milvus dan Sentence Transformers"</a>, yang menggunakan model penyematan yang berbeda. Namun, tidak dapat menemukan "Ferris Bueller's Day Off", yang akan kita bahas nanti di buku catatan ini. (Lihat makalah <a href="https://arxiv.org/abs/2205.13147">Pembelajaran Representasi Matryoshka</a> untuk eksperimen dan pembandingan yang lebih kuantitatif).</p>
<h2 id="Comparing-Funnel-Search-to-Regular-Search" class="common-anchor-header">Membandingkan Pencarian Corong dengan Pencarian Biasa<button data-href="#Comparing-Funnel-Search-to-Regular-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>Mari kita bandingkan hasil pencarian corong kita dengan pencarian vektor standar <em>pada dataset yang sama dengan model penyematan yang sama.</em> Kami melakukan pencarian pada penyematan penuh.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Search on entire embeddings</span>
res = client.search(
    collection_name=collection_name,
    data=search_data,
    anns_field=<span class="hljs-string">&quot;embedding&quot;</span>,
    limit=<span class="hljs-number">5</span>,
    output_fields=[<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>],
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> query, hits <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(queries, res):
    rows = [x[<span class="hljs-string">&quot;entity&quot;</span>] <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> hits]

    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Query:&quot;</span>, query)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Results:&quot;</span>)
    <span class="hljs-keyword">for</span> row <span class="hljs-keyword">in</span> rows:
        <span class="hljs-built_in">print</span>(row[<span class="hljs-string">&quot;title&quot;</span>].strip())
    <span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Query: An archaeologist searches for ancient artifacts while fighting Nazis.
Results:
&quot;Pimpernel&quot; Smith
Black Hunters
Raiders of the Lost Ark
The Master Key
My Gun Is Quick

Query: A teenager fakes illness to get off school and have adventures with two friends.
Results:
A Walk to Remember
Ferris Bueller's Day Off
How I Live Now
On the Edge of Innocence
Bratz: The Movie

Query: A young couple with a kid look after a hotel during winter and the husband goes insane.
Results:
The Shining
Ghostkeeper
Fast and Loose
Killing Ground
Home Alone
</code></pre>
<p>Dengan pengecualian hasil untuk "Seorang remaja berpura-pura sakit agar tidak masuk sekolah...", hasil di bawah pencarian corong hampir sama dengan pencarian lengkap, meskipun pencarian corong dilakukan pada ruang pencarian 128 dimensi vs 768 dimensi untuk pencarian biasa.</p>
<h2 id="Investigating-Funnel-Search-Recall-Failure-for-Ferris-Buellers-Day-Off" class="common-anchor-header">Menyelidiki Kegagalan Pemanggilan Kembali Pencarian Corong untuk Hari Libur Ferris Bueller<button data-href="#Investigating-Funnel-Search-Recall-Failure-for-Ferris-Buellers-Day-Off" class="anchor-icon" translate="no">
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
    </button></h2><p>Mengapa pencarian corong tidak berhasil mendapatkan Ferris Bueller's Day Off? Mari kita periksa apakah film tersebut ada dalam daftar kandidat asli atau salah disaring.</p>
<pre><code translate="no" class="language-python">queries2 = [
    <span class="hljs-string">&quot;A teenager fakes illness to get off school and have adventures with two friends.&quot;</span>
]


<span class="hljs-comment"># Search the database based on input text</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">embed_search</span>(<span class="hljs-params">data</span>):
    embeds = model.encode(data)
    <span class="hljs-keyword">return</span> [x <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> embeds]


instruct_queries = [<span class="hljs-string">&quot;search_query: &quot;</span> + q.strip() <span class="hljs-keyword">for</span> q <span class="hljs-keyword">in</span> queries2]
search_data2 = embed_search(instruct_queries)
head_search2 = [x[:search_dim] <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> search_data2]

<span class="hljs-comment"># Perform standard vector search on subset of embeddings</span>
res = client.search(
    collection_name=collection_name,
    data=head_search2,
    anns_field=<span class="hljs-string">&quot;head_embedding&quot;</span>,
    limit=<span class="hljs-number">256</span>,
    output_fields=[<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;head_embedding&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>],
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> query, hits <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(queries, res):
    rows = [x[<span class="hljs-string">&quot;entity&quot;</span>] <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> hits]

    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Query:&quot;</span>, queries2[<span class="hljs-number">0</span>])
    <span class="hljs-keyword">for</span> idx, row <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(rows):
        <span class="hljs-keyword">if</span> row[<span class="hljs-string">&quot;title&quot;</span>].strip() == <span class="hljs-string">&quot;Ferris Bueller&#x27;s Day Off&quot;</span>:
            <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Row <span class="hljs-subst">{idx}</span>: Ferris Bueller&#x27;s Day Off&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Query: A teenager fakes illness to get off school and have adventures with two friends.
Row 228: Ferris Bueller's Day Off
</code></pre>
<p>Kami melihat bahwa masalahnya adalah daftar kandidat awal tidak cukup besar, atau lebih tepatnya, hasil yang diinginkan tidak cukup mirip dengan kueri pada tingkat perincian tertinggi. Mengubahnya dari <code translate="no">128</code> ke <code translate="no">256</code> menghasilkan pengambilan yang berhasil. <em>Kita harus membuat sebuah aturan praktis untuk mengatur jumlah kandidat pada kumpulan yang ditahan untuk mengevaluasi secara empiris pertukaran antara recall dan latensi.</em></p>
<pre><code translate="no" class="language-python">dfs = [hits_to_dataframe(hits) <span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> res]

dfs_results = [
    {<span class="hljs-string">&quot;query&quot;</span>: query, <span class="hljs-string">&quot;results&quot;</span>: funnel_search(df, query_emb)}
    <span class="hljs-keyword">for</span> query, df, query_emb <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(queries2, dfs, search_data2)
]

<span class="hljs-keyword">for</span> d <span class="hljs-keyword">in</span> dfs_results:
    <span class="hljs-built_in">print</span>(d[<span class="hljs-string">&quot;query&quot;</span>], <span class="hljs-string">&quot;\n&quot;</span>, d[<span class="hljs-string">&quot;results&quot;</span>][:<span class="hljs-number">7</span>][<span class="hljs-string">&quot;title&quot;</span>].to_string(index=<span class="hljs-literal">False</span>), <span class="hljs-string">&quot;\n&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">A teenager fakes illness to get off school and have adventures with two friends. 
       A Walk to Remember
Ferris Bueller's Day Off
          How I Live Now
On the Edge of Innocence
        Bratz: The Movie
              Unfriended
              Simon Says 
</code></pre>
<h2 id="Does-the-order-matter-Prefix-vs-suffix-embeddings" class="common-anchor-header">Apakah urutannya penting? Penyematan awalan vs akhiran.<button data-href="#Does-the-order-matter-Prefix-vs-suffix-embeddings" class="anchor-icon" translate="no">
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
    </button></h2><p>Model ini dilatih untuk melakukan pencocokan awalan yang lebih kecil secara rekursif dengan baik dari sematan. Apakah urutan dimensi yang kita gunakan penting? Sebagai contoh, bisakah kita juga mengambil himpunan bagian dari sematan yang merupakan sufiks? Dalam percobaan ini, kami membalik urutan dimensi dalam embedding Matryoshka dan melakukan pencarian corong.</p>
<pre><code translate="no" class="language-python">client = MilvusClient(uri=<span class="hljs-string">&quot;./wikiplots-matryoshka-flipped.db&quot;</span>)

fields = [
    FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>),
    FieldSchema(name=<span class="hljs-string">&quot;title&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">256</span>),
    FieldSchema(name=<span class="hljs-string">&quot;head_embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=search_dim),
    FieldSchema(name=<span class="hljs-string">&quot;embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=embedding_dim),
]

schema = CollectionSchema(fields=fields, enable_dynamic_field=<span class="hljs-literal">False</span>)
client.create_collection(collection_name=collection_name, schema=schema)

index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;head_embedding&quot;</span>, index_type=<span class="hljs-string">&quot;FLAT&quot;</span>, metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>
)
client.create_index(collection_name, index_params)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">huggingface/tokenizers: The current process just got forked, after parallelism has already been used. Disabling parallelism to avoid deadlocks...
To disable this warning, you can either:
    - Avoid using `tokenizers` before the fork if possible
    - Explicitly set the environment variable TOKENIZERS_PARALLELISM=(true | false)
</code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> batch <span class="hljs-keyword">in</span> tqdm(ds.batch(batch_size=<span class="hljs-number">512</span>)):
    plot_summary = [<span class="hljs-string">&quot;search_document: &quot;</span> + x.strip() <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> batch[<span class="hljs-string">&quot;PlotSummary&quot;</span>]]

    <span class="hljs-comment"># Encode and flip embeddings</span>
    embeddings = model.encode(plot_summary, convert_to_tensor=<span class="hljs-literal">True</span>)
    embeddings = torch.flip(embeddings, dims=[-<span class="hljs-number">1</span>])
    head_embeddings = embeddings[:, :search_dim]

    data = [
        {
            <span class="hljs-string">&quot;title&quot;</span>: title,
            <span class="hljs-string">&quot;head_embedding&quot;</span>: head.cpu().numpy(),
            <span class="hljs-string">&quot;embedding&quot;</span>: embedding.cpu().numpy(),
        }
        <span class="hljs-keyword">for</span> title, head, embedding <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(batch[<span class="hljs-string">&quot;Title&quot;</span>], head_embeddings, embeddings)
    ]
    res = client.insert(collection_name=collection_name, data=data)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">100%|██████████| 69/69 [05:50&lt;00:00,  5.08s/it]
</code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Normalize head embeddings</span>

flip_search_data = [
    torch.flip(torch.tensor(x), dims=[-<span class="hljs-number">1</span>]).cpu().numpy() <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> search_data
]
flip_head_search = [x[:search_dim] <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> flip_search_data]

<span class="hljs-comment"># Perform standard vector search on subset of embeddings</span>
res = client.search(
    collection_name=collection_name,
    data=flip_head_search,
    anns_field=<span class="hljs-string">&quot;head_embedding&quot;</span>,
    limit=<span class="hljs-number">128</span>,
    output_fields=[<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;head_embedding&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>],
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">dfs = [hits_to_dataframe(hits) <span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> res]

dfs_results = [
    {<span class="hljs-string">&quot;query&quot;</span>: query, <span class="hljs-string">&quot;results&quot;</span>: funnel_search(df, query_emb)}
    <span class="hljs-keyword">for</span> query, df, query_emb <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(queries, dfs, flip_search_data)
]

<span class="hljs-keyword">for</span> d <span class="hljs-keyword">in</span> dfs_results:
    <span class="hljs-built_in">print</span>(
        d[<span class="hljs-string">&quot;query&quot;</span>],
        <span class="hljs-string">&quot;\n&quot;</span>,
        d[<span class="hljs-string">&quot;results&quot;</span>][:<span class="hljs-number">7</span>][<span class="hljs-string">&quot;title&quot;</span>].to_string(index=<span class="hljs-literal">False</span>, header=<span class="hljs-literal">False</span>),
        <span class="hljs-string">&quot;\n&quot;</span>,
    )
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">An archaeologist searches for ancient artifacts while fighting Nazis. 
       &quot;Pimpernel&quot; Smith
          Black Hunters
Raiders of the Lost Ark
         The Master Key
        My Gun Is Quick
            The Passage
        The Mole People 

A teenager fakes illness to get off school and have adventures with two friends. 
                       A Walk to Remember
                          How I Live Now
                              Unfriended
Cirque du Freak: The Vampire's Assistant
                             Last Summer
                                 Contest
                                 Day One 

A young couple with a kid look after a hotel during winter and the husband goes insane. 
         Ghostkeeper
     Killing Ground
Leopard in the Snow
              Stone
          Afterglow
         Unfaithful
     Always a Bride 
</code></pre>
<p>Daya ingat jauh lebih buruk daripada pencarian corong atau pencarian biasa seperti yang diharapkan (model penyematan dilatih dengan pembelajaran kontras pada awalan dari dimensi penyematan, bukan akhiran).</p>
<h2 id="Summary" class="common-anchor-header">Ringkasan<button data-href="#Summary" class="anchor-icon" translate="no">
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
    </button></h2><p>Berikut ini adalah perbandingan hasil pencarian kami di seluruh metode:</p>
<div style='margin: auto; width: 80%;'><img translate="no" src='/docs/v2.5.x/assets/results-raiders-of-the-lost-ark.png' width='100%'></div>
<div style='margin: auto; width: 100%;'><img translate="no" src='/docs/v2.5.x/assets/results-ferris-buellers-day-off.png' width='100%'></div>
<div style='margin: auto; width: 80%;'><img translate="no" src='/docs/v2.5.x/assets/results-the-shining.png' width='100%'></div>
Kami telah menunjukkan cara menggunakan penyematan Matryoshka dengan Milvus untuk melakukan algoritme pencarian semantik yang lebih efisien yang disebut "pencarian corong." Kami juga mengeksplorasi pentingnya langkah pemeringkatan dan pemangkasan algoritma, serta mode kegagalan ketika daftar kandidat awal terlalu kecil. Terakhir, kami membahas bagaimana urutan dimensi itu penting ketika membentuk sub-embedding - harus dengan cara yang sama seperti ketika model dilatih. Atau lebih tepatnya, hanya karena model dilatih dengan cara tertentu, maka awalan embedding menjadi bermakna. Sekarang Anda tahu cara mengimplementasikan sematan Matryoshka dan pencarian corong untuk mengurangi biaya penyimpanan pencarian semantik tanpa mengorbankan terlalu banyak kinerja pencarian!
