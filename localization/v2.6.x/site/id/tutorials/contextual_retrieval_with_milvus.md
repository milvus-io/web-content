---
id: contextual_retrieval_with_milvus.md
summary: >-
  Contextal Retrieval adalah metode pengambilan lanjutan yang diusulkan oleh
  Anthropic untuk mengatasi masalah isolasi semantik dari potongan-potongan
  dokumen, yang muncul dalam solusi Retrieval-Augmented Generation (RAG) saat
  ini. Dalam paradigma RAG praktis saat ini, dokumen dibagi menjadi beberapa
  bagian, dan basis data vektor digunakan untuk mencari kueri, mengambil bagian
  yang paling relevan. LLM kemudian merespons kueri menggunakan
  potongan-potongan yang diambil ini. Namun, proses pemotongan ini dapat
  mengakibatkan hilangnya informasi kontekstual, sehingga menyulitkan retriever
  untuk menentukan relevansi.
title: Pengambilan Kontekstual dengan Milvus
---
<h1 id="Contextual-Retrieval-with-Milvus" class="common-anchor-header">Pengambilan Kontekstual dengan Milvus<button data-href="#Contextual-Retrieval-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/tutorials/quickstart/contextual_retrieval_with_milvus.ipynb" target="_parent"><img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/tutorials/quickstart/contextual_retrieval_with_milvus.ipynb" target="_blank"><img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/></a></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://raw.githubusercontent.com/milvus-io/bootcamp/refs/heads/master/pics/contextual_retrieval_with_milvus.png" alt="image" class="doc-image" id="image" />
   </span><a href="https://www.anthropic.com/news/contextual-retrieval">Pengambilan Kontekstual</a> <span class="img-wrapper"> <span>gambar</span> </span>adalah metode pengambilan lanjutan yang diusulkan oleh Anthropic untuk mengatasi masalah isolasi semantik dari potongan-potongan, yang muncul dalam solusi Retrieval-Augmented Generation (RAG) saat ini. Dalam paradigma RAG praktis saat ini, dokumen dibagi menjadi beberapa bagian, dan basis data vektor digunakan untuk mencari kueri, mengambil bagian yang paling relevan. LLM kemudian merespons kueri menggunakan potongan-potongan yang diambil ini. Namun, proses pemotongan ini dapat mengakibatkan hilangnya informasi kontekstual, sehingga menyulitkan retriever untuk menentukan relevansi.</p>
<p>Contextual Retrieval meningkatkan sistem pencarian tradisional dengan menambahkan konteks yang relevan pada setiap potongan dokumen sebelum disematkan atau diindeks, sehingga meningkatkan akurasi dan mengurangi kesalahan pencarian. Dikombinasikan dengan teknik seperti pengambilan hibrida dan pemeringkatan ulang, hal ini meningkatkan sistem Retrieval-Augmented Generation (RAG), terutama untuk basis pengetahuan yang besar. Selain itu, ia menawarkan solusi yang hemat biaya jika dipasangkan dengan cache yang cepat, yang secara signifikan mengurangi latensi dan biaya operasional, dengan potongan yang dikontekstualisasikan dengan biaya sekitar $ 1,02 per juta token dokumen. Hal ini menjadikannya pendekatan yang terukur dan efisien untuk menangani basis pengetahuan yang besar. Solusi Anthropic menunjukkan dua aspek yang mendalam:</p>
<ul>
<li><code translate="no">Document Enhancement</code>: Penulisan ulang kueri adalah teknik penting dalam pencarian informasi modern, yang sering kali menggunakan informasi tambahan untuk membuat kueri menjadi lebih informatif. Demikian pula, untuk mencapai kinerja yang lebih baik dalam RAG, prapemrosesan dokumen dengan LLM (misalnya, membersihkan sumber data, melengkapi informasi yang hilang, meringkas, dll.) sebelum pengindeksan dapat secara signifikan meningkatkan peluang untuk mengambil dokumen yang relevan. Dengan kata lain, langkah prapemrosesan ini membantu mendekatkan dokumen ke kueri dalam hal relevansi.</li>
<li><code translate="no">Low-Cost Processing by Caching Long Context</code>: Salah satu kekhawatiran umum ketika menggunakan LLM untuk memproses dokumen adalah biaya. KVCache adalah solusi populer yang memungkinkan penggunaan kembali hasil antara untuk konteks sebelumnya yang sama. Meskipun sebagian besar vendor LLM yang dihosting membuat fitur ini transparan bagi pengguna, Anthropic memberikan kontrol kepada pengguna atas proses caching. Ketika terjadi pemanggilan cache, sebagian besar komputasi dapat disimpan (hal ini biasa terjadi ketika konteks yang panjang tetap sama, tetapi instruksi untuk setiap kueri berubah). Untuk lebih jelasnya, klik <a href="https://www.anthropic.com/news/prompt-caching">di sini</a>.</li>
</ul>
<p>Dalam buku catatan ini, kami akan mendemonstrasikan bagaimana melakukan pengambilan kontekstual menggunakan Milvus dengan LLM, menggabungkan pengambilan hibrida padat-jarang dan perangking ulang untuk menciptakan sistem pengambilan yang semakin kuat. Data dan pengaturan eksperimental didasarkan pada <a href="https://github.com/anthropics/anthropic-cookbook/blob/main/skills/contextual-embeddings/guide.ipynb">pengambilan kontekstual</a>.</p>
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
    </button></h2><h3 id="Install-Dependencies" class="common-anchor-header">Instal Ketergantungan</h3><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span></span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install tqdm</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install anthropic</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Jika Anda menggunakan Google Colab, untuk mengaktifkan dependensi yang baru saja diinstal, Anda mungkin perlu <strong>memulai ulang runtime</strong> (klik menu "Runtime" di bagian atas layar, dan pilih "Restart session" dari menu tarik-turun).</p>
</div>
<p>Anda akan membutuhkan kunci API dari Cohere, Voyage, dan Anthropic untuk menjalankan kode.</p>
<h2 id="Download-Data" class="common-anchor-header">Mengunduh Data<button data-href="#Download-Data" class="anchor-icon" translate="no">
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
    </button></h2><p>Perintah berikut ini akan mengunduh contoh data yang digunakan dalam <a href="https://github.com/anthropics/anthropic-cookbook/blob/main/skills/contextual-embeddings/guide.ipynb">demo</a> Anthropic asli.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://raw.githubusercontent.com/anthropics/anthropic-cookbook/refs/heads/main/skills/contextual-embeddings/data/codebase_chunks.json</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://raw.githubusercontent.com/anthropics/anthropic-cookbook/refs/heads/main/skills/contextual-embeddings/data/evaluation_set.jsonl</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Define-Retriever" class="common-anchor-header">Mendefinisikan Retriever<button data-href="#Define-Retriever" class="anchor-icon" translate="no">
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
    </button></h2><p>Kelas ini didesain agar fleksibel, sehingga Anda dapat memilih mode pengambilan data yang berbeda sesuai dengan kebutuhan Anda. Dengan menentukan opsi dalam metode inisialisasi, Anda dapat menentukan apakah akan menggunakan pencarian kontekstual, pencarian hibrida (menggabungkan metode pencarian padat dan jarang), atau perangking untuk hasil yang lebih baik.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.dense <span class="hljs-keyword">import</span> VoyageEmbeddingFunction
<span class="hljs-keyword">from</span> pymilvus.model.hybrid <span class="hljs-keyword">import</span> BGEM3EmbeddingFunction
<span class="hljs-keyword">from</span> pymilvus.model.reranker <span class="hljs-keyword">import</span> CohereRerankFunction

<span class="hljs-keyword">from</span> typing <span class="hljs-keyword">import</span> <span class="hljs-type">List</span>, <span class="hljs-type">Dict</span>, <span class="hljs-type">Any</span>
<span class="hljs-keyword">from</span> typing <span class="hljs-keyword">import</span> <span class="hljs-type">Callable</span>
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (
    MilvusClient,
    DataType,
    AnnSearchRequest,
    RRFRanker,
)
<span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm
<span class="hljs-keyword">import</span> json
<span class="hljs-keyword">import</span> anthropic


<span class="hljs-keyword">class</span> <span class="hljs-title class_">MilvusContextualRetriever</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">
        self,
        uri=<span class="hljs-string">&quot;milvus.db&quot;</span>,
        collection_name=<span class="hljs-string">&quot;contexual_bgem3&quot;</span>,
        dense_embedding_function=<span class="hljs-literal">None</span>,
        use_sparse=<span class="hljs-literal">False</span>,
        sparse_embedding_function=<span class="hljs-literal">None</span>,
        use_contextualize_embedding=<span class="hljs-literal">False</span>,
        anthropic_client=<span class="hljs-literal">None</span>,
        use_reranker=<span class="hljs-literal">False</span>,
        rerank_function=<span class="hljs-literal">None</span>,
    </span>):
        <span class="hljs-variable language_">self</span>.collection_name = collection_name

        <span class="hljs-comment"># For Milvus-lite, uri is a local path like &quot;./milvus.db&quot;</span>
        <span class="hljs-comment"># For Milvus standalone service, uri is like &quot;http://localhost:19530&quot;</span>
        <span class="hljs-comment"># For Zilliz Clond, please set `uri` and `token`, which correspond to the [Public Endpoint and API key](https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details) in Zilliz Cloud.</span>
        <span class="hljs-variable language_">self</span>.client = MilvusClient(uri)

        <span class="hljs-variable language_">self</span>.embedding_function = dense_embedding_function

        <span class="hljs-variable language_">self</span>.use_sparse = use_sparse
        <span class="hljs-variable language_">self</span>.sparse_embedding_function = <span class="hljs-literal">None</span>

        <span class="hljs-variable language_">self</span>.use_contextualize_embedding = use_contextualize_embedding
        <span class="hljs-variable language_">self</span>.anthropic_client = anthropic_client

        <span class="hljs-variable language_">self</span>.use_reranker = use_reranker
        <span class="hljs-variable language_">self</span>.rerank_function = rerank_function

        <span class="hljs-keyword">if</span> use_sparse <span class="hljs-keyword">is</span> <span class="hljs-literal">True</span> <span class="hljs-keyword">and</span> sparse_embedding_function:
            <span class="hljs-variable language_">self</span>.sparse_embedding_function = sparse_embedding_function
        <span class="hljs-keyword">elif</span> sparse_embedding_function <span class="hljs-keyword">is</span> <span class="hljs-literal">False</span>:
            <span class="hljs-keyword">raise</span> ValueError(
                <span class="hljs-string">&quot;Sparse embedding function cannot be None if use_sparse is False&quot;</span>
            )
        <span class="hljs-keyword">else</span>:
            <span class="hljs-keyword">pass</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">build_collection</span>(<span class="hljs-params">self</span>):
        schema = <span class="hljs-variable language_">self</span>.client.create_schema(
            auto_id=<span class="hljs-literal">True</span>,
            enable_dynamic_field=<span class="hljs-literal">True</span>,
        )
        schema.add_field(field_name=<span class="hljs-string">&quot;pk&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
        schema.add_field(
            field_name=<span class="hljs-string">&quot;dense_vector&quot;</span>,
            datatype=DataType.FLOAT_VECTOR,
            dim=<span class="hljs-variable language_">self</span>.embedding_function.dim,
        )
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.use_sparse <span class="hljs-keyword">is</span> <span class="hljs-literal">True</span>:
            schema.add_field(
                field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR
            )

        index_params = <span class="hljs-variable language_">self</span>.client.prepare_index_params()
        index_params.add_index(
            field_name=<span class="hljs-string">&quot;dense_vector&quot;</span>, index_type=<span class="hljs-string">&quot;FLAT&quot;</span>, metric_type=<span class="hljs-string">&quot;IP&quot;</span>
        )
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.use_sparse <span class="hljs-keyword">is</span> <span class="hljs-literal">True</span>:
            index_params.add_index(
                field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
                index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,
                metric_type=<span class="hljs-string">&quot;IP&quot;</span>,
            )

        <span class="hljs-variable language_">self</span>.client.create_collection(
            collection_name=<span class="hljs-variable language_">self</span>.collection_name,
            schema=schema,
            index_params=index_params,
            enable_dynamic_field=<span class="hljs-literal">True</span>,
        )

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">insert_data</span>(<span class="hljs-params">self, chunk, metadata</span>):
        dense_vec = <span class="hljs-variable language_">self</span>.embedding_function([chunk])[<span class="hljs-number">0</span>]
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.use_sparse <span class="hljs-keyword">is</span> <span class="hljs-literal">True</span>:
            sparse_result = <span class="hljs-variable language_">self</span>.sparse_embedding_function.encode_documents([chunk])
            <span class="hljs-keyword">if</span> <span class="hljs-built_in">type</span>(sparse_result) == <span class="hljs-built_in">dict</span>:
                sparse_vec = sparse_result[<span class="hljs-string">&quot;sparse&quot;</span>][[<span class="hljs-number">0</span>]]
            <span class="hljs-keyword">else</span>:
                sparse_vec = sparse_result[[<span class="hljs-number">0</span>]]
            <span class="hljs-variable language_">self</span>.client.insert(
                collection_name=<span class="hljs-variable language_">self</span>.collection_name,
                data={
                    <span class="hljs-string">&quot;dense_vector&quot;</span>: dense_vec,
                    <span class="hljs-string">&quot;sparse_vector&quot;</span>: sparse_vec,
                    **metadata,
                },
            )
        <span class="hljs-keyword">else</span>:
            <span class="hljs-variable language_">self</span>.client.insert(
                collection_name=<span class="hljs-variable language_">self</span>.collection_name,
                data={<span class="hljs-string">&quot;dense_vector&quot;</span>: dense_vec, **metadata},
            )

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">insert_contextualized_data</span>(<span class="hljs-params">self, doc, chunk, metadata</span>):
        contextualized_text, usage = <span class="hljs-variable language_">self</span>.situate_context(doc, chunk)
        metadata[<span class="hljs-string">&quot;context&quot;</span>] = contextualized_text
        text_to_embed = <span class="hljs-string">f&quot;<span class="hljs-subst">{chunk}</span>\n\n<span class="hljs-subst">{contextualized_text}</span>&quot;</span>
        dense_vec = <span class="hljs-variable language_">self</span>.embedding_function([text_to_embed])[<span class="hljs-number">0</span>]
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.use_sparse <span class="hljs-keyword">is</span> <span class="hljs-literal">True</span>:
            sparse_vec = <span class="hljs-variable language_">self</span>.sparse_embedding_function.encode_documents(
                [text_to_embed]
            )[<span class="hljs-string">&quot;sparse&quot;</span>][[<span class="hljs-number">0</span>]]
            <span class="hljs-variable language_">self</span>.client.insert(
                collection_name=<span class="hljs-variable language_">self</span>.collection_name,
                data={
                    <span class="hljs-string">&quot;dense_vector&quot;</span>: dense_vec,
                    <span class="hljs-string">&quot;sparse_vector&quot;</span>: sparse_vec,
                    **metadata,
                },
            )
        <span class="hljs-keyword">else</span>:
            <span class="hljs-variable language_">self</span>.client.insert(
                collection_name=<span class="hljs-variable language_">self</span>.collection_name,
                data={<span class="hljs-string">&quot;dense_vector&quot;</span>: dense_vec, **metadata},
            )

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">situate_context</span>(<span class="hljs-params">self, doc: <span class="hljs-built_in">str</span>, chunk: <span class="hljs-built_in">str</span></span>):
        DOCUMENT_CONTEXT_PROMPT = <span class="hljs-string">&quot;&quot;&quot;
        &lt;document&gt;
        {doc_content}
        &lt;/document&gt;
        &quot;&quot;&quot;</span>

        CHUNK_CONTEXT_PROMPT = <span class="hljs-string">&quot;&quot;&quot;
        Here is the chunk we want to situate within the whole document
        &lt;chunk&gt;
        {chunk_content}
        &lt;/chunk&gt;

        Please give a short succinct context to situate this chunk within the overall document for the purposes of improving search retrieval of the chunk.
        Answer only with the succinct context and nothing else.
        &quot;&quot;&quot;</span>

        response = <span class="hljs-variable language_">self</span>.anthropic_client.beta.prompt_caching.messages.create(
            model=<span class="hljs-string">&quot;claude-3-haiku-20240307&quot;</span>,
            max_tokens=<span class="hljs-number">1000</span>,
            temperature=<span class="hljs-number">0.0</span>,
            messages=[
                {
                    <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>,
                    <span class="hljs-string">&quot;content&quot;</span>: [
                        {
                            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;text&quot;</span>,
                            <span class="hljs-string">&quot;text&quot;</span>: DOCUMENT_CONTEXT_PROMPT.<span class="hljs-built_in">format</span>(doc_content=doc),
                            <span class="hljs-string">&quot;cache_control&quot;</span>: {
                                <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;ephemeral&quot;</span>
                            },  <span class="hljs-comment"># we will make use of prompt caching for the full documents</span>
                        },
                        {
                            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;text&quot;</span>,
                            <span class="hljs-string">&quot;text&quot;</span>: CHUNK_CONTEXT_PROMPT.<span class="hljs-built_in">format</span>(chunk_content=chunk),
                        },
                    ],
                },
            ],
            extra_headers={<span class="hljs-string">&quot;anthropic-beta&quot;</span>: <span class="hljs-string">&quot;prompt-caching-2024-07-31&quot;</span>},
        )
        <span class="hljs-keyword">return</span> response.content[<span class="hljs-number">0</span>].text, response.usage

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">search</span>(<span class="hljs-params">self, query: <span class="hljs-built_in">str</span>, k: <span class="hljs-built_in">int</span> = <span class="hljs-number">20</span></span>) -&gt; <span class="hljs-type">List</span>[<span class="hljs-type">Dict</span>[<span class="hljs-built_in">str</span>, <span class="hljs-type">Any</span>]]:
        dense_vec = <span class="hljs-variable language_">self</span>.embedding_function([query])[<span class="hljs-number">0</span>]
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.use_sparse <span class="hljs-keyword">is</span> <span class="hljs-literal">True</span>:
            sparse_vec = <span class="hljs-variable language_">self</span>.sparse_embedding_function.encode_queries([query])[
                <span class="hljs-string">&quot;sparse&quot;</span>
            ][[<span class="hljs-number">0</span>]]

        req_list = []
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.use_reranker:
            k = k * <span class="hljs-number">10</span>
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.use_sparse <span class="hljs-keyword">is</span> <span class="hljs-literal">True</span>:
            req_list = []
            dense_search_param = {
                <span class="hljs-string">&quot;data&quot;</span>: [dense_vec],
                <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;dense_vector&quot;</span>,
                <span class="hljs-string">&quot;param&quot;</span>: {<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>},
                <span class="hljs-string">&quot;limit&quot;</span>: k * <span class="hljs-number">2</span>,
            }
            dense_req = AnnSearchRequest(**dense_search_param)
            req_list.append(dense_req)

            sparse_search_param = {
                <span class="hljs-string">&quot;data&quot;</span>: [sparse_vec],
                <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;sparse_vector&quot;</span>,
                <span class="hljs-string">&quot;param&quot;</span>: {<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>},
                <span class="hljs-string">&quot;limit&quot;</span>: k * <span class="hljs-number">2</span>,
            }
            sparse_req = AnnSearchRequest(**sparse_search_param)

            req_list.append(sparse_req)

            docs = <span class="hljs-variable language_">self</span>.client.hybrid_search(
                <span class="hljs-variable language_">self</span>.collection_name,
                req_list,
                RRFRanker(),
                k,
                output_fields=[
                    <span class="hljs-string">&quot;content&quot;</span>,
                    <span class="hljs-string">&quot;original_uuid&quot;</span>,
                    <span class="hljs-string">&quot;doc_id&quot;</span>,
                    <span class="hljs-string">&quot;chunk_id&quot;</span>,
                    <span class="hljs-string">&quot;original_index&quot;</span>,
                    <span class="hljs-string">&quot;context&quot;</span>,
                ],
            )
        <span class="hljs-keyword">else</span>:
            docs = <span class="hljs-variable language_">self</span>.client.search(
                <span class="hljs-variable language_">self</span>.collection_name,
                data=[dense_vec],
                anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,
                limit=k,
                output_fields=[
                    <span class="hljs-string">&quot;content&quot;</span>,
                    <span class="hljs-string">&quot;original_uuid&quot;</span>,
                    <span class="hljs-string">&quot;doc_id&quot;</span>,
                    <span class="hljs-string">&quot;chunk_id&quot;</span>,
                    <span class="hljs-string">&quot;original_index&quot;</span>,
                    <span class="hljs-string">&quot;context&quot;</span>,
                ],
            )
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.use_reranker <span class="hljs-keyword">and</span> <span class="hljs-variable language_">self</span>.use_contextualize_embedding:
            reranked_texts = []
            reranked_docs = []
            <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(k):
                <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.use_contextualize_embedding:
                    reranked_texts.append(
                        <span class="hljs-string">f&quot;<span class="hljs-subst">{docs[<span class="hljs-number">0</span>][i][<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;content&#x27;</span>]}</span>\n\n<span class="hljs-subst">{docs[<span class="hljs-number">0</span>][i][<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;context&#x27;</span>]}</span>&quot;</span>
                    )
                <span class="hljs-keyword">else</span>:
                    reranked_texts.append(<span class="hljs-string">f&quot;<span class="hljs-subst">{docs[<span class="hljs-number">0</span>][i][<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;content&#x27;</span>]}</span>&quot;</span>)
            results = <span class="hljs-variable language_">self</span>.rerank_function(query, reranked_texts)
            <span class="hljs-keyword">for</span> result <span class="hljs-keyword">in</span> results:
                reranked_docs.append(docs[<span class="hljs-number">0</span>][result.index])
            docs[<span class="hljs-number">0</span>] = reranked_docs
        <span class="hljs-keyword">return</span> docs


<span class="hljs-keyword">def</span> <span class="hljs-title function_">evaluate_retrieval</span>(<span class="hljs-params">
    queries: <span class="hljs-type">List</span>[<span class="hljs-type">Dict</span>[<span class="hljs-built_in">str</span>, <span class="hljs-type">Any</span>]], retrieval_function: <span class="hljs-type">Callable</span>, db, k: <span class="hljs-built_in">int</span> = <span class="hljs-number">20</span>
</span>) -&gt; <span class="hljs-type">Dict</span>[<span class="hljs-built_in">str</span>, <span class="hljs-built_in">float</span>]:
    total_score = <span class="hljs-number">0</span>
    total_queries = <span class="hljs-built_in">len</span>(queries)
    <span class="hljs-keyword">for</span> query_item <span class="hljs-keyword">in</span> tqdm(queries, desc=<span class="hljs-string">&quot;Evaluating retrieval&quot;</span>):
        query = query_item[<span class="hljs-string">&quot;query&quot;</span>]
        golden_chunk_uuids = query_item[<span class="hljs-string">&quot;golden_chunk_uuids&quot;</span>]

        <span class="hljs-comment"># Find all golden chunk contents</span>
        golden_contents = []
        <span class="hljs-keyword">for</span> doc_uuid, chunk_index <span class="hljs-keyword">in</span> golden_chunk_uuids:
            golden_doc = <span class="hljs-built_in">next</span>(
                (
                    doc
                    <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> query_item[<span class="hljs-string">&quot;golden_documents&quot;</span>]
                    <span class="hljs-keyword">if</span> doc[<span class="hljs-string">&quot;uuid&quot;</span>] == doc_uuid
                ),
                <span class="hljs-literal">None</span>,
            )
            <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> golden_doc:
                <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Warning: Golden document not found for UUID <span class="hljs-subst">{doc_uuid}</span>&quot;</span>)
                <span class="hljs-keyword">continue</span>

            golden_chunk = <span class="hljs-built_in">next</span>(
                (
                    chunk
                    <span class="hljs-keyword">for</span> chunk <span class="hljs-keyword">in</span> golden_doc[<span class="hljs-string">&quot;chunks&quot;</span>]
                    <span class="hljs-keyword">if</span> chunk[<span class="hljs-string">&quot;index&quot;</span>] == chunk_index
                ),
                <span class="hljs-literal">None</span>,
            )
            <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> golden_chunk:
                <span class="hljs-built_in">print</span>(
                    <span class="hljs-string">f&quot;Warning: Golden chunk not found for index <span class="hljs-subst">{chunk_index}</span> in document <span class="hljs-subst">{doc_uuid}</span>&quot;</span>
                )
                <span class="hljs-keyword">continue</span>

            golden_contents.append(golden_chunk[<span class="hljs-string">&quot;content&quot;</span>].strip())

        <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> golden_contents:
            <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Warning: No golden contents found for query: <span class="hljs-subst">{query}</span>&quot;</span>)
            <span class="hljs-keyword">continue</span>

        retrieved_docs = retrieval_function(query, db, k=k)

        <span class="hljs-comment"># Count how many golden chunks are in the top k retrieved documents</span>
        chunks_found = <span class="hljs-number">0</span>
        <span class="hljs-keyword">for</span> golden_content <span class="hljs-keyword">in</span> golden_contents:
            <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> retrieved_docs[<span class="hljs-number">0</span>][:k]:
                retrieved_content = doc[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;content&quot;</span>].strip()
                <span class="hljs-keyword">if</span> retrieved_content == golden_content:
                    chunks_found += <span class="hljs-number">1</span>
                    <span class="hljs-keyword">break</span>

        query_score = chunks_found / <span class="hljs-built_in">len</span>(golden_contents)
        total_score += query_score

    average_score = total_score / total_queries
    pass_at_n = average_score * <span class="hljs-number">100</span>
    <span class="hljs-keyword">return</span> {
        <span class="hljs-string">&quot;pass_at_n&quot;</span>: pass_at_n,
        <span class="hljs-string">&quot;average_score&quot;</span>: average_score,
        <span class="hljs-string">&quot;total_queries&quot;</span>: total_queries,
    }


<span class="hljs-keyword">def</span> <span class="hljs-title function_">retrieve_base</span>(<span class="hljs-params">query: <span class="hljs-built_in">str</span>, db, k: <span class="hljs-built_in">int</span> = <span class="hljs-number">20</span></span>) -&gt; <span class="hljs-type">List</span>[<span class="hljs-type">Dict</span>[<span class="hljs-built_in">str</span>, <span class="hljs-type">Any</span>]]:
    <span class="hljs-keyword">return</span> db.search(query, k=k)


<span class="hljs-keyword">def</span> <span class="hljs-title function_">load_jsonl</span>(<span class="hljs-params">file_path: <span class="hljs-built_in">str</span></span>) -&gt; <span class="hljs-type">List</span>[<span class="hljs-type">Dict</span>[<span class="hljs-built_in">str</span>, <span class="hljs-type">Any</span>]]:
    <span class="hljs-string">&quot;&quot;&quot;Load JSONL file and return a list of dictionaries.&quot;&quot;&quot;</span>
    <span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(file_path, <span class="hljs-string">&quot;r&quot;</span>) <span class="hljs-keyword">as</span> file:
        <span class="hljs-keyword">return</span> [json.loads(line) <span class="hljs-keyword">for</span> line <span class="hljs-keyword">in</span> file]


<span class="hljs-keyword">def</span> <span class="hljs-title function_">evaluate_db</span>(<span class="hljs-params">db, original_jsonl_path: <span class="hljs-built_in">str</span>, k</span>):
    <span class="hljs-comment"># Load the original JSONL data for queries and ground truth</span>
    original_data = load_jsonl(original_jsonl_path)

    <span class="hljs-comment"># Evaluate retrieval</span>
    results = evaluate_retrieval(original_data, retrieve_base, db, k)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Pass@<span class="hljs-subst">{k}</span>: <span class="hljs-subst">{results[<span class="hljs-string">&#x27;pass_at_n&#x27;</span>]:<span class="hljs-number">.2</span>f}</span>%&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Total Score: <span class="hljs-subst">{results[<span class="hljs-string">&#x27;average_score&#x27;</span>]}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Total queries: <span class="hljs-subst">{results[<span class="hljs-string">&#x27;total_queries&#x27;</span>]}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Sekarang Anda perlu menginisialisasi model-model ini untuk eksperimen berikut. Anda dapat dengan mudah beralih ke model lain menggunakan pustaka model PyMilvus.</p>
<pre><code translate="no" class="language-python">dense_ef = VoyageEmbeddingFunction(api_key=<span class="hljs-string">&quot;your-voyage-api-key&quot;</span>, model_name=<span class="hljs-string">&quot;voyage-2&quot;</span>)
sparse_ef = BGEM3EmbeddingFunction()
cohere_rf = CohereRerankFunction(api_key=<span class="hljs-string">&quot;your-cohere-api-key&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Fetching 30 files:   0%|          | 0/30 [00:00&lt;?, ?it/s]
</code></pre>
<pre><code translate="no" class="language-python">path = <span class="hljs-string">&quot;codebase_chunks.json&quot;</span>
<span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(path, <span class="hljs-string">&quot;r&quot;</span>) <span class="hljs-keyword">as</span> f:
    dataset = json.load(f)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Experiment-I-Standard-Retrieval" class="common-anchor-header">Eksperimen I: Pengambilan Standar<button data-href="#Experiment-I-Standard-Retrieval" class="anchor-icon" translate="no">
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
    </button></h2><p>Pengambilan standar hanya menggunakan sematan padat untuk mengambil dokumen terkait. Dalam percobaan ini, kita akan menggunakan Pass@5 untuk mereproduksi hasil dari repo asli.</p>
<pre><code translate="no" class="language-python">standard_retriever = MilvusContextualRetriever(
    uri=<span class="hljs-string">&quot;standard.db&quot;</span>, collection_name=<span class="hljs-string">&quot;standard&quot;</span>, dense_embedding_function=dense_ef
)

standard_retriever.build_collection()
<span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> dataset:
    doc_content = doc[<span class="hljs-string">&quot;content&quot;</span>]
    <span class="hljs-keyword">for</span> chunk <span class="hljs-keyword">in</span> doc[<span class="hljs-string">&quot;chunks&quot;</span>]:
        metadata = {
            <span class="hljs-string">&quot;doc_id&quot;</span>: doc[<span class="hljs-string">&quot;doc_id&quot;</span>],
            <span class="hljs-string">&quot;original_uuid&quot;</span>: doc[<span class="hljs-string">&quot;original_uuid&quot;</span>],
            <span class="hljs-string">&quot;chunk_id&quot;</span>: chunk[<span class="hljs-string">&quot;chunk_id&quot;</span>],
            <span class="hljs-string">&quot;original_index&quot;</span>: chunk[<span class="hljs-string">&quot;original_index&quot;</span>],
            <span class="hljs-string">&quot;content&quot;</span>: chunk[<span class="hljs-string">&quot;content&quot;</span>],
        }
        chunk_content = chunk[<span class="hljs-string">&quot;content&quot;</span>]
        standard_retriever.insert_data(chunk_content, metadata)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">evaluate_db(standard_retriever, <span class="hljs-string">&quot;evaluation_set.jsonl&quot;</span>, <span class="hljs-number">5</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Evaluating retrieval: 100%|██████████| 248/248 [01:29&lt;00:00,  2.77it/s]

Pass@5: 80.92%
Total Score: 0.8091877880184332
Total queries: 248
</code></pre>
<h2 id="Experiment-II-Hybrid-Retrieval" class="common-anchor-header">Eksperimen II: Pengambilan Hibrida<button data-href="#Experiment-II-Hybrid-Retrieval" class="anchor-icon" translate="no">
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
    </button></h2><p>Setelah kita mendapatkan hasil yang menjanjikan dengan penyematan Voyage, kita akan beralih ke pengambilan hibrida dengan menggunakan model BGE-M3 yang menghasilkan penyematan jarang yang kuat. Hasil dari dense retrieval dan sparse retrieval akan digabungkan menggunakan metode Reciprocal Rank Fusion (RRF) untuk menghasilkan hasil hybrid.</p>
<pre><code translate="no" class="language-python">hybrid_retriever = MilvusContextualRetriever(
    uri=<span class="hljs-string">&quot;hybrid.db&quot;</span>,
    collection_name=<span class="hljs-string">&quot;hybrid&quot;</span>,
    dense_embedding_function=dense_ef,
    use_sparse=<span class="hljs-literal">True</span>,
    sparse_embedding_function=sparse_ef,
)

hybrid_retriever.build_collection()
<span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> dataset:
    doc_content = doc[<span class="hljs-string">&quot;content&quot;</span>]
    <span class="hljs-keyword">for</span> chunk <span class="hljs-keyword">in</span> doc[<span class="hljs-string">&quot;chunks&quot;</span>]:
        metadata = {
            <span class="hljs-string">&quot;doc_id&quot;</span>: doc[<span class="hljs-string">&quot;doc_id&quot;</span>],
            <span class="hljs-string">&quot;original_uuid&quot;</span>: doc[<span class="hljs-string">&quot;original_uuid&quot;</span>],
            <span class="hljs-string">&quot;chunk_id&quot;</span>: chunk[<span class="hljs-string">&quot;chunk_id&quot;</span>],
            <span class="hljs-string">&quot;original_index&quot;</span>: chunk[<span class="hljs-string">&quot;original_index&quot;</span>],
            <span class="hljs-string">&quot;content&quot;</span>: chunk[<span class="hljs-string">&quot;content&quot;</span>],
        }
        chunk_content = chunk[<span class="hljs-string">&quot;content&quot;</span>]
        hybrid_retriever.insert_data(chunk_content, metadata)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">evaluate_db(hybrid_retriever, <span class="hljs-string">&quot;evaluation_set.jsonl&quot;</span>, <span class="hljs-number">5</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Evaluating retrieval: 100%|██████████| 248/248 [02:09&lt;00:00,  1.92it/s]

Pass@5: 84.69%
Total Score: 0.8469182027649771
Total queries: 248
</code></pre>
<h2 id="Experiment-III-Contextual-Retrieval" class="common-anchor-header">Eksperimen III: Temu Kembali Kontekstual<button data-href="#Experiment-III-Contextual-Retrieval" class="anchor-icon" translate="no">
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
    </button></h2><p>Temu kembali hibrida menunjukkan peningkatan, tetapi hasilnya dapat lebih ditingkatkan dengan menerapkan metode temu kembali kontekstual. Untuk mencapai hal ini, kami akan menggunakan model bahasa Anthropic untuk mempersiapkan konteks dari keseluruhan dokumen untuk setiap potongan.</p>
<pre><code translate="no" class="language-python">anthropic_client = anthropic.Anthropic(
    api_key=<span class="hljs-string">&quot;your-anthropic-api-key&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">contextual_retriever = MilvusContextualRetriever(
    uri=<span class="hljs-string">&quot;contextual.db&quot;</span>,
    collection_name=<span class="hljs-string">&quot;contextual&quot;</span>,
    dense_embedding_function=dense_ef,
    use_sparse=<span class="hljs-literal">True</span>,
    sparse_embedding_function=sparse_ef,
    use_contextualize_embedding=<span class="hljs-literal">True</span>,
    anthropic_client=anthropic_client,
)

contextual_retriever.build_collection()
<span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> dataset:
    doc_content = doc[<span class="hljs-string">&quot;content&quot;</span>]
    <span class="hljs-keyword">for</span> chunk <span class="hljs-keyword">in</span> doc[<span class="hljs-string">&quot;chunks&quot;</span>]:
        metadata = {
            <span class="hljs-string">&quot;doc_id&quot;</span>: doc[<span class="hljs-string">&quot;doc_id&quot;</span>],
            <span class="hljs-string">&quot;original_uuid&quot;</span>: doc[<span class="hljs-string">&quot;original_uuid&quot;</span>],
            <span class="hljs-string">&quot;chunk_id&quot;</span>: chunk[<span class="hljs-string">&quot;chunk_id&quot;</span>],
            <span class="hljs-string">&quot;original_index&quot;</span>: chunk[<span class="hljs-string">&quot;original_index&quot;</span>],
            <span class="hljs-string">&quot;content&quot;</span>: chunk[<span class="hljs-string">&quot;content&quot;</span>],
        }
        chunk_content = chunk[<span class="hljs-string">&quot;content&quot;</span>]
        contextual_retriever.insert_contextualized_data(
            doc_content, chunk_content, metadata
        )
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">evaluate_db(contextual_retriever, <span class="hljs-string">&quot;evaluation_set.jsonl&quot;</span>, <span class="hljs-number">5</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no"> Evaluating retrieval: 100%|██████████| 248/248 [01:55&lt;00:00,  2.15it/s]
Pass@5: 87.14%
Total Score: 0.8713517665130568
Total queries: 248 
</code></pre>
<h2 id="Experiment-IV-Contextual-Retrieval-with-Reranker" class="common-anchor-header">Eksperimen IV: Pengambilan Kontekstual dengan Reranker<button data-href="#Experiment-IV-Contextual-Retrieval-with-Reranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Hasilnya dapat ditingkatkan lebih lanjut dengan menambahkan perangking ulang Cohere. Tanpa menginisialisasi retriever baru dengan reranker secara terpisah, kita cukup mengonfigurasi retriever yang sudah ada untuk menggunakan reranker untuk meningkatkan kinerja.</p>
<pre><code translate="no" class="language-python">contextual_retriever.use_reranker = <span class="hljs-literal">True</span>
contextual_retriever.rerank_function = cohere_rf
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">evaluate_db(contextual_retriever, <span class="hljs-string">&quot;evaluation_set.jsonl&quot;</span>, <span class="hljs-number">5</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Evaluating retrieval: 100%|██████████| 248/248 [02:02&lt;00:00,  2.00it/s]
Pass@5: 90.91%
Total Score: 0.9090821812596005
Total queries: 248
</code></pre>
<p>Kami telah mendemonstrasikan beberapa metode untuk meningkatkan kinerja pengambilan. Dengan desain yang lebih ad-hoc yang disesuaikan dengan skenario, pengambilan kontekstual menunjukkan potensi yang signifikan untuk melakukan prapemrosesan dokumen dengan biaya rendah, sehingga menghasilkan sistem RAG yang lebih baik.</p>
