---
id: use_ColPali_with_milvus.md
summary: >-
  Dalam buku catatan ini, kami menyebut representasi multi-vektor semacam ini
  sebagai "embeddings ColBERT" untuk keumuman. Namun, model sebenarnya yang
  digunakan adalah model ColPali. Kami akan mendemonstrasikan cara menggunakan
  Milvus untuk pengambilan multi-vektor. Selanjutnya, kami akan memperkenalkan
  cara menggunakan ColPali untuk mengambil halaman berdasarkan kueri yang
  diberikan.
title: Gunakan ColPali untuk Pengambilan Multi-Modal dengan Milvus
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/tutorials/quickstart/use_ColPali_with_milvus.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/tutorials/quickstart/use_ColPali_with_milvus.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Use-ColPali-for-Multi-Modal-Retrieval-with-Milvus" class="common-anchor-header">Gunakan ColPali untuk Pengambilan Multi-Modal dengan Milvus<button data-href="#Use-ColPali-for-Multi-Modal-Retrieval-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>Model pengambilan modern biasanya menggunakan satu penyematan untuk merepresentasikan teks atau gambar. Akan tetapi, ColBERT adalah model neural yang menggunakan daftar penyematan untuk setiap contoh data dan menggunakan operasi "MaxSim" untuk menghitung kemiripan antara dua teks. Selain data tekstual, gambar, tabel, dan diagram juga mengandung informasi yang kaya, yang sering diabaikan dalam pencarian informasi berbasis teks.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/colpali_formula.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Fungsi MaxSim membandingkan kueri dengan dokumen (yang Anda cari) dengan melihat penyematan tokennya. Untuk setiap kata dalam kueri, ia memilih kata yang paling mirip dari dokumen (menggunakan cosine similarity atau jarak L2 kuadrat) dan menjumlahkan kemiripan maksimum ini di semua kata dalam kueri</p>
<p>ColPali adalah metode yang menggabungkan representasi multi-vektor ColBERT dengan PaliGemma (model bahasa besar multimodal) untuk meningkatkan kemampuan pemahamannya yang kuat. Pendekatan ini memungkinkan sebuah halaman dengan teks dan gambar direpresentasikan menggunakan penyematan multi-vektor terpadu. Penyematan dalam representasi multi-vektor ini dapat menangkap informasi yang terperinci, meningkatkan kinerja pengambilan-penambahan generasi (RAG) untuk data multimodal.</p>
<p>Dalam buku catatan ini, kami menyebut representasi multi-vektor semacam ini sebagai "embeddings ColBERT" untuk keumumannya. Namun, model sebenarnya yang digunakan adalah <strong>model ColPali</strong>. Kami akan mendemonstrasikan bagaimana cara menggunakan Milvus untuk pengambilan multi-vektor. Selanjutnya, kami akan memperkenalkan cara menggunakan ColPali untuk mengambil halaman berdasarkan kueri yang diberikan.</p>
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
    </button></h2><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install pdf2image</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install pymilvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install colpali_engine</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install tqdm</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install pillow</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Prepare-the-data" class="common-anchor-header">Siapkan data<button data-href="#Prepare-the-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Kita akan menggunakan PDF RAG sebagai contoh. Anda dapat mengunduh dokumen <a href="https://arxiv.org/pdf/2004.12832">ColBERT</a> dan memasukkannya ke dalam <code translate="no">./pdf</code>. ColPali tidak memproses teks secara langsung; sebaliknya, seluruh halaman di-raster menjadi sebuah gambar. Model ColPali unggul dalam memahami informasi tekstual yang terkandung di dalam gambar-gambar ini. Oleh karena itu, kita akan mengubah setiap halaman PDF menjadi gambar untuk diproses.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pdf2image <span class="hljs-keyword">import</span> convert_from_path

pdf_path = <span class="hljs-string">&quot;pdfs/2004.12832v2.pdf&quot;</span>
images = convert_from_path(pdf_path)

<span class="hljs-keyword">for</span> i, image <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(images):
    image.save(<span class="hljs-string">f&quot;pages/page_<span class="hljs-subst">{i + <span class="hljs-number">1</span>}</span>.png&quot;</span>, <span class="hljs-string">&quot;PNG&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Selanjutnya, kita akan menginisialisasi database menggunakan Milvus Lite. Anda dapat dengan mudah beralih ke instance Milvus penuh dengan mengatur uri ke alamat yang sesuai di mana layanan Milvus Anda dihosting.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np
<span class="hljs-keyword">import</span> concurrent.futures

client = MilvusClient(uri=<span class="hljs-string">&quot;milvus.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li>Jika Anda hanya membutuhkan basis data vektor lokal untuk data skala kecil atau pembuatan prototipe, mengatur uri sebagai file lokal, misalnya<code translate="no">./milvus.db</code>, adalah metode yang paling mudah, karena secara otomatis menggunakan <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> untuk menyimpan semua data dalam file ini.</li>
<li>Jika Anda memiliki data berskala besar, misalnya lebih dari satu juta vektor, Anda dapat menyiapkan server Milvus yang lebih berkinerja tinggi di <a href="https://milvus.io/docs/quickstart.md">Docker atau Kubernetes</a>. Dalam pengaturan ini, gunakan alamat dan port server sebagai uri Anda, misalnya<code translate="no">http://localhost:19530</code>. Jika Anda mengaktifkan fitur autentikasi pada Milvus, gunakan "<your_username>:<your_password>" sebagai token, jika tidak, jangan setel token.</li>
<li>Jika Anda menggunakan <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, layanan cloud yang dikelola sepenuhnya untuk Milvus, sesuaikan <code translate="no">uri</code> dan <code translate="no">token</code>, yang sesuai dengan <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">Public Endpoint dan API key</a> di Zilliz Cloud.</li>
</ul>
</div>
<p>Kita akan mendefinisikan kelas MilvusColbertRetriever untuk membungkus klien Milvus untuk pengambilan data multi-vektor. Implementasi ini meratakan penyematan ColBERT dan memasukkannya ke dalam sebuah koleksi, di mana setiap baris mewakili penyematan individu dari daftar penyematan ColBERT. Implementasi ini juga mencatat doc_id dan seq_id untuk melacak asal usul setiap embedding.</p>
<p>Ketika mencari dengan daftar embedding ColBERT, beberapa pencarian akan dilakukan-satu untuk setiap embedding ColBERT. Doc_id yang diambil kemudian akan diduplikasi. Proses pemeringkatan ulang akan dilakukan, di mana penyematan lengkap untuk setiap doc_id diambil, dan skor MaxSim dihitung untuk menghasilkan hasil peringkat akhir.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">MilvusColbertRetriever</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, milvus_client, collection_name, dim=<span class="hljs-number">128</span></span>):
        <span class="hljs-comment"># Initialize the retriever with a Milvus client, collection name, and dimensionality of the vector embeddings.</span>
        <span class="hljs-comment"># If the collection exists, load it.</span>
        <span class="hljs-variable language_">self</span>.collection_name = collection_name
        <span class="hljs-variable language_">self</span>.client = milvus_client
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.client.has_collection(collection_name=<span class="hljs-variable language_">self</span>.collection_name):
            <span class="hljs-variable language_">self</span>.client.load_collection(collection_name)
        <span class="hljs-variable language_">self</span>.dim = dim

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">create_collection</span>(<span class="hljs-params">self</span>):
        <span class="hljs-comment"># Create a new collection in Milvus for storing embeddings.</span>
        <span class="hljs-comment"># Drop the existing collection if it already exists and define the schema for the collection.</span>
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.client.has_collection(collection_name=<span class="hljs-variable language_">self</span>.collection_name):
            <span class="hljs-variable language_">self</span>.client.drop_collection(collection_name=<span class="hljs-variable language_">self</span>.collection_name)
        schema = <span class="hljs-variable language_">self</span>.client.create_schema(
            auto_id=<span class="hljs-literal">True</span>,
            enable_dynamic_fields=<span class="hljs-literal">True</span>,
        )
        schema.add_field(field_name=<span class="hljs-string">&quot;pk&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
        schema.add_field(
            field_name=<span class="hljs-string">&quot;vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-variable language_">self</span>.dim
        )
        schema.add_field(field_name=<span class="hljs-string">&quot;seq_id&quot;</span>, datatype=DataType.INT16)
        schema.add_field(field_name=<span class="hljs-string">&quot;doc_id&quot;</span>, datatype=DataType.INT64)
        schema.add_field(field_name=<span class="hljs-string">&quot;doc&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">65535</span>)

        <span class="hljs-variable language_">self</span>.client.create_collection(
            collection_name=<span class="hljs-variable language_">self</span>.collection_name, schema=schema
        )

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">create_index</span>(<span class="hljs-params">self</span>):
        <span class="hljs-comment"># Create an index on the vector field to enable fast similarity search.</span>
        <span class="hljs-comment"># Releases and drops any existing index before creating a new one with specified parameters.</span>
        <span class="hljs-variable language_">self</span>.client.release_collection(collection_name=<span class="hljs-variable language_">self</span>.collection_name)
        <span class="hljs-variable language_">self</span>.client.drop_index(
            collection_name=<span class="hljs-variable language_">self</span>.collection_name, index_name=<span class="hljs-string">&quot;vector&quot;</span>
        )
        index_params = <span class="hljs-variable language_">self</span>.client.prepare_index_params()
        index_params.add_index(
            field_name=<span class="hljs-string">&quot;vector&quot;</span>,
            index_name=<span class="hljs-string">&quot;vector_index&quot;</span>,
            index_type=<span class="hljs-string">&quot;HNSW&quot;</span>,  <span class="hljs-comment"># or any other index type you want</span>
            metric_type=<span class="hljs-string">&quot;IP&quot;</span>,  <span class="hljs-comment"># or the appropriate metric type</span>
            params={
                <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
                <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">500</span>,
            },  <span class="hljs-comment"># adjust these parameters as needed</span>
        )

        <span class="hljs-variable language_">self</span>.client.create_index(
            collection_name=<span class="hljs-variable language_">self</span>.collection_name, index_params=index_params, sync=<span class="hljs-literal">True</span>
        )

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">create_scalar_index</span>(<span class="hljs-params">self</span>):
        <span class="hljs-comment"># Create a scalar index for the &quot;doc_id&quot; field to enable fast lookups by document ID.</span>
        <span class="hljs-variable language_">self</span>.client.release_collection(collection_name=<span class="hljs-variable language_">self</span>.collection_name)

        index_params = <span class="hljs-variable language_">self</span>.client.prepare_index_params()
        index_params.add_index(
            field_name=<span class="hljs-string">&quot;doc_id&quot;</span>,
            index_name=<span class="hljs-string">&quot;int32_index&quot;</span>,
            index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,  <span class="hljs-comment"># or any other index type you want</span>
        )

        <span class="hljs-variable language_">self</span>.client.create_index(
            collection_name=<span class="hljs-variable language_">self</span>.collection_name, index_params=index_params, sync=<span class="hljs-literal">True</span>
        )

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">search</span>(<span class="hljs-params">self, data, topk</span>):
        <span class="hljs-comment"># Perform a vector search on the collection to find the top-k most similar documents.</span>
        search_params = {<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {}}
        results = <span class="hljs-variable language_">self</span>.client.search(
            <span class="hljs-variable language_">self</span>.collection_name,
            data,
            limit=<span class="hljs-built_in">int</span>(<span class="hljs-number">50</span>),
            output_fields=[<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;seq_id&quot;</span>, <span class="hljs-string">&quot;doc_id&quot;</span>],
            search_params=search_params,
        )
        doc_ids = <span class="hljs-built_in">set</span>()
        <span class="hljs-keyword">for</span> r_id <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(results)):
            <span class="hljs-keyword">for</span> r <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(results[r_id])):
                doc_ids.add(results[r_id][r][<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;doc_id&quot;</span>])

        scores = []

        <span class="hljs-keyword">def</span> <span class="hljs-title function_">rerank_single_doc</span>(<span class="hljs-params">doc_id, data, client, collection_name</span>):
            <span class="hljs-comment"># Rerank a single document by retrieving its embeddings and calculating the similarity with the query.</span>
            doc_colbert_vecs = client.query(
                collection_name=collection_name,
                <span class="hljs-built_in">filter</span>=<span class="hljs-string">f&quot;doc_id in [<span class="hljs-subst">{doc_id}</span>]&quot;</span>,
                output_fields=[<span class="hljs-string">&quot;seq_id&quot;</span>, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;doc&quot;</span>],
                limit=<span class="hljs-number">1000</span>,
            )
            doc_vecs = np.vstack(
                [doc_colbert_vecs[i][<span class="hljs-string">&quot;vector&quot;</span>] <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(doc_colbert_vecs))]
            )
            score = np.dot(data, doc_vecs.T).<span class="hljs-built_in">max</span>(<span class="hljs-number">1</span>).<span class="hljs-built_in">sum</span>()
            <span class="hljs-keyword">return</span> (score, doc_id)

        <span class="hljs-keyword">with</span> concurrent.futures.ThreadPoolExecutor(max_workers=<span class="hljs-number">300</span>) <span class="hljs-keyword">as</span> executor:
            futures = {
                executor.submit(
                    rerank_single_doc, doc_id, data, client, <span class="hljs-variable language_">self</span>.collection_name
                ): doc_id
                <span class="hljs-keyword">for</span> doc_id <span class="hljs-keyword">in</span> doc_ids
            }
            <span class="hljs-keyword">for</span> future <span class="hljs-keyword">in</span> concurrent.futures.as_completed(futures):
                score, doc_id = future.result()
                scores.append((score, doc_id))

        scores.sort(key=<span class="hljs-keyword">lambda</span> x: x[<span class="hljs-number">0</span>], reverse=<span class="hljs-literal">True</span>)
        <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(scores) &gt;= topk:
            <span class="hljs-keyword">return</span> scores[:topk]
        <span class="hljs-keyword">else</span>:
            <span class="hljs-keyword">return</span> scores

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">insert</span>(<span class="hljs-params">self, data</span>):
        <span class="hljs-comment"># Insert ColBERT embeddings and metadata for a document into the collection.</span>
        colbert_vecs = [vec <span class="hljs-keyword">for</span> vec <span class="hljs-keyword">in</span> data[<span class="hljs-string">&quot;colbert_vecs&quot;</span>]]
        seq_length = <span class="hljs-built_in">len</span>(colbert_vecs)
        doc_ids = [data[<span class="hljs-string">&quot;doc_id&quot;</span>] <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(seq_length)]
        seq_ids = <span class="hljs-built_in">list</span>(<span class="hljs-built_in">range</span>(seq_length))
        docs = [<span class="hljs-string">&quot;&quot;</span>] * seq_length
        docs[<span class="hljs-number">0</span>] = data[<span class="hljs-string">&quot;filepath&quot;</span>]

        <span class="hljs-comment"># Insert the data as multiple vectors (one for each sequence) along with the corresponding metadata.</span>
        <span class="hljs-variable language_">self</span>.client.insert(
            <span class="hljs-variable language_">self</span>.collection_name,
            [
                {
                    <span class="hljs-string">&quot;vector&quot;</span>: colbert_vecs[i],
                    <span class="hljs-string">&quot;seq_id&quot;</span>: seq_ids[i],
                    <span class="hljs-string">&quot;doc_id&quot;</span>: doc_ids[i],
                    <span class="hljs-string">&quot;doc&quot;</span>: docs[i],
                }
                <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(seq_length)
            ],
        )
<button class="copy-code-btn"></button></code></pre>
<p>Kita akan menggunakan <a href="https://github.com/illuin-tech/colpali">colpali_engine</a> untuk mengekstrak daftar sematan untuk dua kueri dan mengambil informasi yang relevan dari halaman PDF.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> colpali_engine.models <span class="hljs-keyword">import</span> ColPali
<span class="hljs-keyword">from</span> colpali_engine.models.paligemma.colpali.processing_colpali <span class="hljs-keyword">import</span> ColPaliProcessor
<span class="hljs-keyword">from</span> colpali_engine.utils.processing_utils <span class="hljs-keyword">import</span> BaseVisualRetrieverProcessor
<span class="hljs-keyword">from</span> colpali_engine.utils.torch_utils <span class="hljs-keyword">import</span> ListDataset, get_torch_device
<span class="hljs-keyword">from</span> torch.utils.data <span class="hljs-keyword">import</span> DataLoader
<span class="hljs-keyword">import</span> torch
<span class="hljs-keyword">from</span> typing <span class="hljs-keyword">import</span> <span class="hljs-type">List</span>, cast

device = get_torch_device(<span class="hljs-string">&quot;cpu&quot;</span>)
model_name = <span class="hljs-string">&quot;vidore/colpali-v1.2&quot;</span>

model = ColPali.from_pretrained(
    model_name,
    torch_dtype=torch.bfloat16,
    device_map=device,
).<span class="hljs-built_in">eval</span>()

queries = [
    <span class="hljs-string">&quot;How to end-to-end retrieval with ColBert?&quot;</span>,
    <span class="hljs-string">&quot;Where is ColBERT performance table?&quot;</span>,
]

processor = cast(ColPaliProcessor, ColPaliProcessor.from_pretrained(model_name))

dataloader = DataLoader(
    dataset=ListDataset[<span class="hljs-built_in">str</span>](queries),
    batch_size=<span class="hljs-number">1</span>,
    shuffle=<span class="hljs-literal">False</span>,
    collate_fn=<span class="hljs-keyword">lambda</span> x: processor.process_queries(x),
)

qs: <span class="hljs-type">List</span>[torch.Tensor] = []
<span class="hljs-keyword">for</span> batch_query <span class="hljs-keyword">in</span> dataloader:
    <span class="hljs-keyword">with</span> torch.no_grad():
        batch_query = {k: v.to(model.device) <span class="hljs-keyword">for</span> k, v <span class="hljs-keyword">in</span> batch_query.items()}
        embeddings_query = model(**batch_query)
    qs.extend(<span class="hljs-built_in">list</span>(torch.unbind(embeddings_query.to(<span class="hljs-string">&quot;cpu&quot;</span>))))
<button class="copy-code-btn"></button></code></pre>
<p>Selain itu, kita perlu mengekstrak daftar penyematan untuk setiap halaman dan ini menunjukkan bahwa ada 1030 penyematan 128 dimensi untuk setiap halaman.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm
<span class="hljs-keyword">from</span> PIL <span class="hljs-keyword">import</span> Image
<span class="hljs-keyword">import</span> os

images = [Image.<span class="hljs-built_in">open</span>(<span class="hljs-string">&quot;./pages/&quot;</span> + name) <span class="hljs-keyword">for</span> name <span class="hljs-keyword">in</span> os.listdir(<span class="hljs-string">&quot;./pages&quot;</span>)]

dataloader = DataLoader(
    dataset=ListDataset[<span class="hljs-built_in">str</span>](images),
    batch_size=<span class="hljs-number">1</span>,
    shuffle=<span class="hljs-literal">False</span>,
    collate_fn=<span class="hljs-keyword">lambda</span> x: processor.process_images(x),
)

ds: <span class="hljs-type">List</span>[torch.Tensor] = []
<span class="hljs-keyword">for</span> batch_doc <span class="hljs-keyword">in</span> tqdm(dataloader):
    <span class="hljs-keyword">with</span> torch.no_grad():
        batch_doc = {k: v.to(model.device) <span class="hljs-keyword">for</span> k, v <span class="hljs-keyword">in</span> batch_doc.items()}
        embeddings_doc = model(**batch_doc)
    ds.extend(<span class="hljs-built_in">list</span>(torch.unbind(embeddings_doc.to(<span class="hljs-string">&quot;cpu&quot;</span>))))

<span class="hljs-built_in">print</span>(ds[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">  0%|          | 0/10 [00:00&lt;?, ?it/s]

100%|██████████| 10/10 [01:22&lt;00:00,  8.24s/it]

torch.Size([1030, 128])
</code></pre>
<p>Kita akan membuat koleksi bernama "colpali" menggunakan MilvusColbertRetriever.</p>
<pre><code translate="no" class="language-python">retriever = MilvusColbertRetriever(collection_name=<span class="hljs-string">&quot;colpali&quot;</span>, milvus_client=client)
retriever.create_collection()
retriever.create_index()
<button class="copy-code-btn"></button></code></pre>
<p>Kita akan memasukkan daftar penyematan ke dalam basis data Milvus.</p>
<pre><code translate="no" class="language-python">filepaths = [<span class="hljs-string">&quot;./pages/&quot;</span> + name <span class="hljs-keyword">for</span> name <span class="hljs-keyword">in</span> os.listdir(<span class="hljs-string">&quot;./pages&quot;</span>)]
<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(filepaths)):
    data = {
        <span class="hljs-string">&quot;colbert_vecs&quot;</span>: ds[i].<span class="hljs-built_in">float</span>().numpy(),
        <span class="hljs-string">&quot;doc_id&quot;</span>: i,
        <span class="hljs-string">&quot;filepath&quot;</span>: filepaths[i],
    }
    retriever.insert(data)
<button class="copy-code-btn"></button></code></pre>
<p>Sekarang kita dapat mencari halaman yang paling relevan menggunakan daftar sematan kueri.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> query <span class="hljs-keyword">in</span> qs:
    query = query.<span class="hljs-built_in">float</span>().numpy()
    result = retriever.search(query, topk=<span class="hljs-number">1</span>)
    <span class="hljs-built_in">print</span>(filepaths[result[<span class="hljs-number">0</span>][<span class="hljs-number">1</span>]])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">./pages/page_5.png
./pages/page_7.png
</code></pre>
<p>Terakhir, kita mengambil nama halaman asli. Dengan ColPali, kita dapat mengambil dokumen multimodal tanpa memerlukan teknik pemrosesan yang rumit untuk mengekstrak teks dan gambar dari dokumen. Dengan memanfaatkan model visi besar, lebih banyak informasi - seperti tabel dan gambar - dapat dianalisis tanpa kehilangan informasi yang signifikan.</p>
