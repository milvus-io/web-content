---
id: milvus_rag_with_vllm.md
summary: >-
  Blog ini akan menunjukkan kepada Anda bagaimana membangun dan menjalankan RAG
  dengan Milvus, vLLM, dan Llama 3.1. Lebih khusus lagi, saya akan menunjukkan
  kepada Anda cara menyematkan dan menyimpan informasi teks sebagai penyematan
  vektor di Milvus dan menggunakan penyimpanan vektor ini sebagai basis
  pengetahuan untuk secara efisien mengambil potongan teks yang relevan dengan
  pertanyaan pengguna.
title: 'Membangun RAG dengan Milvus, vLLM, dan Llama 3.1'
---
<h1 id="Building-RAG-with-Milvus-vLLM-and-Llama-31" class="common-anchor-header">Membangun RAG dengan Milvus, vLLM, dan Llama 3.1<button data-href="#Building-RAG-with-Milvus-vLLM-and-Llama-31" class="anchor-icon" translate="no">
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
    </button></h1><p>University of California - Berkeley mendonasikan <a href="https://docs.vllm.ai/en/latest/index.html">vLLM</a>, sebuah perpustakaan yang cepat dan mudah digunakan untuk inferensi dan penyajian LLM, kepada <a href="https://lfaidata.foundation/">LF AI &amp; Data Foundation</a> sebagai proyek tahap inkubasi pada bulan Juli 2024. Sebagai sesama anggota proyek, kami ingin menyambut vLLM bergabung dengan keluarga LF AI &amp; Data! 🎉</p>
<p>Large Language Models<a href="https://zilliz.com/glossary/large-language-models-(llms)">(LLM</a>) dan <a href="https://zilliz.com/learn/what-is-vector-database">basis data vektor</a> biasanya dipasangkan untuk membangun Retrieval Augmented Generation<a href="https://zilliz.com/learn/Retrieval-Augmented-Generation">(RAG)</a>, sebuah arsitektur aplikasi AI yang populer untuk mengatasi <a href="https://zilliz.com/glossary/ai-hallucination">AI Halusinasi</a>. Blog ini akan menunjukkan kepada Anda bagaimana cara membangun dan menjalankan RAG dengan Milvus, vLLM, dan Llama 3.1. Lebih khusus lagi, saya akan menunjukkan kepada Anda cara menyematkan dan menyimpan informasi teks sebagai penyematan <a href="https://zilliz.com/glossary/vector-embeddings">vektor</a> di Milvus dan menggunakan penyimpanan vektor ini sebagai basis pengetahuan untuk mengambil potongan teks yang relevan dengan pertanyaan pengguna secara efisien. Terakhir, kita akan memanfaatkan vLLM untuk menyajikan model Llama 3.1-8B dari Meta untuk menghasilkan jawaban yang ditambah dengan teks yang diambil. Mari kita selami!</p>
<h2 id="Introduction-to-Milvus-vLLM-and-Meta’s-Llama-31" class="common-anchor-header">Pengantar ke Milvus, vLLM, dan Llama 3.1 Meta<button data-href="#Introduction-to-Milvus-vLLM-and-Meta’s-Llama-31" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Milvus-vector-database" class="common-anchor-header">Basis data vektor Milvus</h3><p><a href="https://zilliz.com/what-is-milvus"><strong>Milvus</strong></a> adalah basis data vektor yang bersifat open-source, <a href="https://zilliz.com/blog/what-is-a-real-vector-database">dibuat khusus</a>, dan didistribusikan untuk menyimpan, mengindeks, dan mencari vektor untuk beban kerja <a href="https://zilliz.com/learn/generative-ai">Generative AI</a> (GenAI). Kemampuannya untuk melakukan <a href="https://zilliz.com/blog/a-review-of-hybrid-search-in-milvus">pencarian hybrid,</a> <a href="https://zilliz.com/blog/what-is-new-with-metadata-filtering-in-milvus">pemfilteran metadata</a>, pemeringkatan ulang, dan secara efisien menangani triliunan vektor membuat Milvus menjadi pilihan utama untuk beban kerja AI dan pembelajaran mesin. <a href="https://github.com/milvus-io/">Milvus</a> dapat dijalankan secara lokal, di cluster, atau di-host di <a href="https://zilliz.com/cloud">Zilliz Cloud</a> yang dikelola secara penuh.</p>
<h3 id="vLLM" class="common-anchor-header">vLLM</h3><p><a href="https://vllm.readthedocs.io/en/latest/index.html"><strong>vLLM</strong></a> adalah proyek sumber terbuka yang dimulai di UC Berkeley SkyLab yang berfokus pada pengoptimalan kinerja penyajian LLM. Ini menggunakan manajemen memori yang efisien dengan PagedAttention, pengelompokan berkelanjutan, dan kernel CUDA yang dioptimalkan. Dibandingkan dengan metode tradisional, vLLM meningkatkan performa penyajian hingga 24x lipat sekaligus memangkas penggunaan memori GPU hingga setengahnya.</p>
<p>Menurut makalah<a href="https://arxiv.org/abs/2309.06180">"Manajemen Memori yang Efisien untuk Penyajian Model Bahasa Besar dengan PagedAttention</a>," cache KV menggunakan sekitar 30% memori GPU, yang menyebabkan potensi masalah memori. Cache KV disimpan dalam memori yang bersebelahan, tetapi perubahan ukuran dapat menyebabkan fragmentasi memori, yang tidak efisien untuk komputasi.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/vllm_1.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p><em>Gambar 1. Manajemen memori cache KV dalam sistem yang ada ( <a href="https://arxiv.org/pdf/2309.06180">Makalah</a> Perhatian Halaman 2023)</em></p>
<p>Dengan menggunakan memori virtual untuk cache KV, vLLM hanya mengalokasikan memori GPU fisik sesuai kebutuhan, sehingga menghilangkan fragmentasi memori dan menghindari pengalokasian awal. Dalam pengujian, vLLM mengungguli <a href="https://huggingface.co/docs/transformers/main_classes/text_generation">HuggingFace Transformers</a> (HF) dan <a href="https://github.com/huggingface/text-generation-inference">Text Generation Inference</a> (TGI), mencapai throughput hingga 24x lebih tinggi daripada HF dan 3,5x lebih tinggi daripada TGI pada GPU NVIDIA A10G dan A100.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/vllm_2.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p><em>Gambar 2. Menyajikan throughput ketika setiap permintaan meminta tiga penyelesaian output paralel. vLLM mencapai throughput 8,5x-15x lebih tinggi daripada HF dan 3,3x-3,5x lebih tinggi daripada TGI ( <a href="https://blog.vllm.ai/2023/06/20/vllm.html">blog vLLM</a> 2023).</em></p>
<h3 id="Meta’s-Llama-31" class="common-anchor-header">Meta's Llama 3.1</h3><p><a href="https://ai.meta.com/research/publications/the-llama-3-herd-of-models"><strong>Llama 3.1 dari Meta</strong></a> diumumkan pada tanggal 23 Juli 2024. Model 405B memberikan performa yang canggih pada beberapa benchmark publik dan memiliki jendela konteks 128.000 token input dengan berbagai penggunaan komersial yang diizinkan. Bersamaan dengan model parameter 405 miliar, Meta merilis versi terbaru dari Llama3 70B (70 miliar parameter) dan 8B (8 miliar parameter). Bobot model tersedia untuk diunduh <a href="https://info.deeplearning.ai/e3t/Ctc/LX+113/cJhC404/VWbMJv2vnLfjW3Rh6L96gqS5YW7MhRLh5j9tjNN8BHR5W3qgyTW6N1vHY6lZ3l8N8htfRfqP8DzW72mhHB6vwYd2W77hFt886l4_PV22X226RPmZbW67mSH08gVp9MW2jcZvf24w97BW207Jmf8gPH0yW20YPQv261xxjW8nc6VW3jj-nNW6XdRhg5HhZk_W1QS0yL9dJZb0W818zFK1w62kdW8y-_4m1gfjfNW2jswrd3xbv-yW5mrvdk3n-KqyW45sLMF21qDrwW5TR3vr2MYxZ9W2hWhq23q-nQdW4blHqh3JlZWfW937hlZ58-KJCW82Pgv9384MbYW7yp56M6pvzd6f77wnH004">di situs web Meta.</a></p>
<p>Wawasan utama adalah bahwa menyempurnakan data yang dihasilkan dapat meningkatkan kinerja, tetapi contoh berkualitas buruk dapat menurunkannya. Tim Llama bekerja secara ekstensif untuk mengidentifikasi dan menghapus contoh-contoh yang buruk ini dengan menggunakan model itu sendiri, model tambahan, dan alat bantu lainnya.</p>
<h2 id="Build-and-Perform-the-RAG-Retrieval-with-Milvus" class="common-anchor-header">Membangun dan Melakukan Pengambilan RAG dengan Milvus<button data-href="#Build-and-Perform-the-RAG-Retrieval-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Prepare-your-dataset" class="common-anchor-header">Siapkan dataset Anda.</h3><p>Saya menggunakan <a href="https://milvus.io/docs/">dokumentasi</a> resmi <a href="https://milvus.io/docs/">Milvus</a> sebagai dataset untuk demo ini, yang saya unduh dan simpan secara lokal.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain.document_loaders <span class="hljs-keyword">import</span> DirectoryLoader
<span class="hljs-comment"># Load HTML files already saved in a local directory</span>
path = <span class="hljs-string">&quot;../../RAG/rtdocs_new/&quot;</span>
global_pattern = <span class="hljs-string">&#x27;*.html&#x27;</span>
loader = DirectoryLoader(path=path, glob=global_pattern)
docs = loader.load()


<span class="hljs-comment"># Print num documents and a preview.</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;loaded <span class="hljs-subst">{<span class="hljs-built_in">len</span>(docs)}</span> documents&quot;</span>)
<span class="hljs-built_in">print</span>(docs[<span class="hljs-number">0</span>].page_content)
pprint.pprint(docs[<span class="hljs-number">0</span>].metadata)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-text">loaded 22 documents
Why Milvus Docs Tutorials Tools Blog Community Stars0 Try Managed Milvus FREE Search Home v2.4.x About ...
{&#x27;source&#x27;: &#x27;https://milvus.io/docs/quickstart.md&#x27;}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Download-an-embedding-model" class="common-anchor-header">Unduh model penyematan.</h3><p>Selanjutnya, unduh <a href="https://zilliz.com/ai-models">model penyematan</a> sumber terbuka gratis dari HuggingFace.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> torch
<span class="hljs-keyword">from</span> sentence_transformers <span class="hljs-keyword">import</span> SentenceTransformer


<span class="hljs-comment"># Initialize torch settings for device-agnostic code.</span>
N_GPU = torch.cuda.device_count()
DEVICE = torch.device(<span class="hljs-string">&#x27;cuda:N_GPU&#x27;</span> <span class="hljs-keyword">if</span> torch.cuda.is_available() <span class="hljs-keyword">else</span> <span class="hljs-string">&#x27;cpu&#x27;</span>)


<span class="hljs-comment"># Download the model from huggingface model hub.</span>
model_name = <span class="hljs-string">&quot;BAAI/bge-large-en-v1.5&quot;</span>
encoder = SentenceTransformer(model_name, device=DEVICE)


<span class="hljs-comment"># Get the model parameters and save for later.</span>
EMBEDDING_DIM = encoder.get_sentence_embedding_dimension()
MAX_SEQ_LENGTH_IN_TOKENS = encoder.get_max_seq_length()


<span class="hljs-comment"># Inspect model parameters.</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;model_name: <span class="hljs-subst">{model_name}</span>&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;EMBEDDING_DIM: <span class="hljs-subst">{EMBEDDING_DIM}</span>&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;MAX_SEQ_LENGTH: <span class="hljs-subst">{MAX_SEQ_LENGTH}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-text">model_name: BAAI/bge-large-en-v1.5
EMBEDDING_DIM: 1024
MAX_SEQ_LENGTH: 512
<button class="copy-code-btn"></button></code></pre>
<h3 id="Chunk-and-encode-your-custom-data-as-vectors" class="common-anchor-header">Potong dan enkode data khusus Anda sebagai vektor.</h3><p>Saya akan menggunakan panjang tetap 512 karakter dengan 10% tumpang tindih.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain.text_splitter <span class="hljs-keyword">import</span> RecursiveCharacterTextSplitter


CHUNK_SIZE = <span class="hljs-number">512</span>
chunk_overlap = np.<span class="hljs-built_in">round</span>(CHUNK_SIZE * <span class="hljs-number">0.10</span>, <span class="hljs-number">0</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;chunk_size: <span class="hljs-subst">{CHUNK_SIZE}</span>, chunk_overlap: <span class="hljs-subst">{chunk_overlap}</span>&quot;</span>)


<span class="hljs-comment"># Define the splitter.</span>
child_splitter = RecursiveCharacterTextSplitter(
   chunk_size=CHUNK_SIZE,
   chunk_overlap=chunk_overlap)


<span class="hljs-comment"># Chunk the docs.</span>
chunks = child_splitter.split_documents(docs)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{<span class="hljs-built_in">len</span>(docs)}</span> docs split into <span class="hljs-subst">{<span class="hljs-built_in">len</span>(chunks)}</span> child documents.&quot;</span>)


<span class="hljs-comment"># Encoder input is doc.page_content as strings.</span>
list_of_strings = [doc.page_content <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> chunks <span class="hljs-keyword">if</span> <span class="hljs-built_in">hasattr</span>(doc, <span class="hljs-string">&#x27;page_content&#x27;</span>)]


<span class="hljs-comment"># Embedding inference using HuggingFace encoder.</span>
embeddings = torch.tensor(encoder.encode(list_of_strings))


<span class="hljs-comment"># Normalize the embeddings.</span>
embeddings = np.array(embeddings / np.linalg.norm(embeddings))


<span class="hljs-comment"># Milvus expects a list of `numpy.ndarray` of `numpy.float32` numbers.</span>
converted_values = <span class="hljs-built_in">list</span>(<span class="hljs-built_in">map</span>(np.float32, embeddings))


<span class="hljs-comment"># Create dict_list for Milvus insertion.</span>
dict_list = []
<span class="hljs-keyword">for</span> chunk, vector <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(chunks, converted_values):
   <span class="hljs-comment"># Assemble embedding vector, original text chunk, metadata.</span>
   chunk_dict = {
       <span class="hljs-string">&#x27;chunk&#x27;</span>: chunk.page_content,
       <span class="hljs-string">&#x27;source&#x27;</span>: chunk.metadata.get(<span class="hljs-string">&#x27;source&#x27;</span>, <span class="hljs-string">&quot;&quot;</span>),
       <span class="hljs-string">&#x27;vector&#x27;</span>: vector,
   }
   dict_list.append(chunk_dict)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-text">chunk_size: 512, chunk_overlap: 51.0
22 docs split into 355 child documents.
<button class="copy-code-btn"></button></code></pre>
<h3 id="Save-the-vectors-in-Milvus" class="common-anchor-header">Simpan vektor di Milvus.</h3><p>Masukkan penyematan vektor yang telah disandikan ke dalam basis data vektor Milvus.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Connect a client to the Milvus Lite server.</span>
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
mc = MilvusClient(<span class="hljs-string">&quot;milvus_demo.db&quot;</span>)


<span class="hljs-comment"># Create a collection with flexible schema and AUTOINDEX.</span>
COLLECTION_NAME = <span class="hljs-string">&quot;MilvusDocs&quot;</span>
mc.create_collection(COLLECTION_NAME,
       EMBEDDING_DIM,
       consistency_level=<span class="hljs-string">&quot;Eventually&quot;</span>,
       auto_id=<span class="hljs-literal">True</span>, 
       overwrite=<span class="hljs-literal">True</span>)


<span class="hljs-comment"># Insert data into the Milvus collection.</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Start inserting entities&quot;</span>)
start_time = time.time()
mc.insert(
   COLLECTION_NAME,
   data=dict_list,
   progress_bar=<span class="hljs-literal">True</span>)


end_time = time.time()
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Milvus insert time for <span class="hljs-subst">{<span class="hljs-built_in">len</span>(dict_list)}</span> vectors: &quot;</span>, end=<span class="hljs-string">&quot;&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{<span class="hljs-built_in">round</span>(end_time - start_time, <span class="hljs-number">2</span>)}</span> seconds&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-text">Start inserting entities
Milvus insert time for 355 vectors: 0.2 seconds
<button class="copy-code-btn"></button></code></pre>
<h3 id="Perform-a-vector-search" class="common-anchor-header">Lakukan pencarian vektor.</h3><p>Ajukan sebuah pertanyaan dan cari potongan tetangga terdekat dari basis pengetahuan Anda di Milvus.</p>
<pre><code translate="no" class="language-python">SAMPLE_QUESTION = <span class="hljs-string">&quot;What do the parameters for HNSW mean?&quot;</span>


<span class="hljs-comment"># Embed the question using the same encoder.</span>
query_embeddings = torch.tensor(encoder.encode(SAMPLE_QUESTION))
<span class="hljs-comment"># Normalize embeddings to unit length.</span>
query_embeddings = F.normalize(query_embeddings, p=<span class="hljs-number">2</span>, dim=<span class="hljs-number">1</span>)
<span class="hljs-comment"># Convert the embeddings to list of list of np.float32.</span>
query_embeddings = <span class="hljs-built_in">list</span>(<span class="hljs-built_in">map</span>(np.float32, query_embeddings))


<span class="hljs-comment"># Define metadata fields you can filter on.</span>
OUTPUT_FIELDS = <span class="hljs-built_in">list</span>(dict_list[<span class="hljs-number">0</span>].keys())
OUTPUT_FIELDS.remove(<span class="hljs-string">&#x27;vector&#x27;</span>)


<span class="hljs-comment"># Define how many top-k results you want to retrieve.</span>
TOP_K = <span class="hljs-number">2</span>


<span class="hljs-comment"># Run semantic vector search using your query and the vector database.</span>
results = mc.search(
    COLLECTION_NAME,
    data=query_embeddings,
    output_fields=OUTPUT_FIELDS,
    limit=TOP_K,
    consistency_level=<span class="hljs-string">&quot;Eventually&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Hasil yang didapat adalah seperti yang ditunjukkan di bawah ini.</p>
<pre><code translate="no" class="language-text">Retrieved result #1
distance = 0.7001987099647522
(&#x27;Chunk text: layer, finds the node closest to the target in this layer, and&#x27;
...
&#x27;outgoing&#x27;)
source: https://milvus.io/docs/index.md

Retrieved result #2
distance = 0.6953287124633789
(&#x27;Chunk text: this value can improve recall rate at the cost of increased&#x27;
...
&#x27;to the target&#x27;)
source: https://milvus.io/docs/index.md
<button class="copy-code-btn"></button></code></pre>
<h2 id="Build-and-Perform-the-RAG-Generation-with-vLLM-and-Llama-31-8B" class="common-anchor-header">Membangun dan Melakukan Pembangkitan RAG dengan vLLM dan Llama 3.1-8B<button data-href="#Build-and-Perform-the-RAG-Generation-with-vLLM-and-Llama-31-8B" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Install-vLLM-and-models-from-HuggingFace" class="common-anchor-header">Instal vLLM dan model-model dari HuggingFace</h3><p>vLLM mengunduh model bahasa yang besar dari HuggingFace secara default. Secara umum, kapan pun Anda ingin menggunakan model baru di HuggingFace, Anda harus melakukan instalasi pip --upgrade atau -U. Selain itu, Anda juga membutuhkan GPU untuk menjalankan inferensi model Llama 3.1 Meta dengan vLLM.</p>
<p>Untuk daftar lengkap semua model yang didukung vLLM, lihat <a href="https://docs.vllm.ai/en/latest/models/supported_models.html#supported-models">halaman dokumentasi</a> ini.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">(Recommended) Create a new conda environment.</span>
conda create -n myenv python=3.11 -y
conda activate myenv
<span class="hljs-meta prompt_">

# </span><span class="language-bash">Install vLLM with CUDA 12.1.</span>
pip install -U vllm transformers torch


import vllm, torch
from vllm import LLM, SamplingParams
<span class="hljs-meta prompt_">

# </span><span class="language-bash">Clear the GPU memory cache.</span>
torch.cuda.empty_cache()
<span class="hljs-meta prompt_">

# </span><span class="language-bash">Check the GPU.</span>
!nvidia-smi
<button class="copy-code-btn"></button></code></pre>
<p>Untuk mempelajari lebih lanjut tentang cara memasang vLLM, lihat halaman <a href="https://docs.vllm.ai/en/latest/getting_started/installation.html">pemasangannya</a>.</p>
<h3 id="Get-a-HuggingFace-token" class="common-anchor-header">Dapatkan token HuggingFace.</h3><p>Beberapa model pada HuggingFace, seperti Meta Llama 3.1, mengharuskan pengguna untuk menerima lisensinya sebelum dapat mengunduh timbangan. Oleh karena itu, Anda harus membuat akun HuggingFace, menerima lisensi model, dan menghasilkan token.</p>
<p>Ketika mengunjungi <a href="https://huggingface.co/meta-llama/Meta-Llama-3.1-70B">halaman Llama3.1</a> ini di HuggingFace, Anda akan mendapatkan pesan yang meminta Anda untuk menyetujui persyaratan. Klik "<strong>Terima Lisensi</strong>" untuk menerima persyaratan Meta sebelum mengunduh bobot model. Persetujuan biasanya membutuhkan waktu kurang dari satu hari.</p>
<p><strong>Setelah Anda menerima persetujuan, Anda harus membuat token HuggingFace yang baru. Token lama Anda tidak akan berfungsi dengan izin yang baru.</strong></p>
<p>Sebelum memasang vLLM, masuk ke HuggingFace dengan token baru Anda. Di bawah ini, saya menggunakan rahasia Colab untuk menyimpan token.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Login to HuggingFace using your new token.</span>
from huggingface_hub import login
from google.colab import userdata
hf_token = userdata.get(&#x27;HF_TOKEN&#x27;)
login(token = hf_token, add_to_git_credential=True)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Run-the-RAG-Generation" class="common-anchor-header">Menjalankan Pembuatan RAG</h3><p>Dalam demo, kami menjalankan model <code translate="no">Llama-3.1-8B</code>, yang membutuhkan GPU dan memori yang cukup besar untuk menjalankannya. Contoh berikut ini dijalankan di Google Colab Pro ($10/bulan) dengan GPU A100. Untuk mempelajari lebih lanjut tentang cara menjalankan vLLM, Anda dapat melihat <a href="https://docs.vllm.ai/en/latest/getting_started/quickstart.html">dokumentasi Quickstart</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 1. Choose a model</span>
MODELTORUN = <span class="hljs-string">&quot;meta-llama/Meta-Llama-3.1-8B-Instruct&quot;</span>


<span class="hljs-comment"># 2. Clear the GPU memory cache, you&#x27;re going to need it all!</span>
torch.cuda.empty_cache()


<span class="hljs-comment"># 3. Instantiate a vLLM model instance.</span>
llm = LLM(model=MODELTORUN,
         enforce_eager=<span class="hljs-literal">True</span>,
         dtype=torch.bfloat16,
         gpu_memory_utilization=<span class="hljs-number">0.5</span>,
         max_model_len=<span class="hljs-number">1000</span>,
         seed=<span class="hljs-number">415</span>,
         max_num_batched_tokens=<span class="hljs-number">3000</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Tulis pertanyaan menggunakan konteks dan sumber yang diambil dari Milvus.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Separate all the context together by space.</span>
contexts_combined = <span class="hljs-string">&#x27; &#x27;</span>.join(contexts)
<span class="hljs-comment"># Lance Martin, LangChain, says put the best contexts at the end.</span>
contexts_combined = <span class="hljs-string">&#x27; &#x27;</span>.join(<span class="hljs-built_in">reversed</span>(contexts))


<span class="hljs-comment"># Separate all the unique sources together by comma.</span>
source_combined = <span class="hljs-string">&#x27; &#x27;</span>.join(<span class="hljs-built_in">reversed</span>(<span class="hljs-built_in">list</span>(<span class="hljs-built_in">dict</span>.fromkeys(sources))))


SYSTEM_PROMPT = <span class="hljs-string">f&quot;&quot;&quot;First, check if the provided Context is relevant to
the user&#x27;s question.  Second, only if the provided Context is strongly relevant, answer the question using the Context.  Otherwise, if the Context is not strongly relevant, answer the question without using the Context. 
Be clear, concise, relevant.  Answer clearly, in fewer than 2 sentences.
Grounding sources: <span class="hljs-subst">{source_combined}</span>
Context: <span class="hljs-subst">{contexts_combined}</span>
User&#x27;s question: <span class="hljs-subst">{SAMPLE_QUESTION}</span>
&quot;&quot;&quot;</span>


prompts = [SYSTEM_PROMPT]
<button class="copy-code-btn"></button></code></pre>
<p>Sekarang, buatlah jawaban dengan menggunakan potongan-potongan yang diambil dan pertanyaan asli yang dimasukkan ke dalam prompt.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Sampling parameters</span>
sampling_params = SamplingParams(temperature=<span class="hljs-number">0.2</span>, top_p=<span class="hljs-number">0.95</span>)


<span class="hljs-comment"># Invoke the vLLM model.</span>
outputs = llm.generate(prompts, sampling_params)


<span class="hljs-comment"># Print the outputs.</span>
<span class="hljs-keyword">for</span> output <span class="hljs-keyword">in</span> outputs:
   prompt = output.prompt
   generated_text = output.outputs[<span class="hljs-number">0</span>].text
   <span class="hljs-comment"># !r calls repr(), which prints a string inside quotes.</span>
   <span class="hljs-built_in">print</span>()
   <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Question: <span class="hljs-subst">{SAMPLE_QUESTION!r}</span>&quot;</span>)
   pprint.pprint(<span class="hljs-string">f&quot;Generated text: <span class="hljs-subst">{generated_text!r}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-text">Question: &#x27;What do the parameters for HNSW MEAN!?&#x27;
Generated text: &#x27;Answer: The parameters for HNSW (Hiera(rchical Navigable Small World Graph) are: &#x27;
&#x27;* M: The maximum degree of nodes on each layer oof the graph, which can improve &#x27;
&#x27;recall rate at the cost of increased search time. * efConstruction and ef: &#x27; 
&#x27;These parameters specify a search range when building or searching an index.&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Jawaban di atas terlihat sempurna bagi saya!</p>
<p>Jika Anda tertarik dengan demo ini, silakan mencobanya sendiri dan beritahu kami pendapat Anda. Anda juga dapat bergabung dengan <a href="https://discord.com/invite/8uyFbECzPX">komunitas Milvus</a> kami <a href="https://discord.com/invite/8uyFbECzPX">di Discord</a> untuk berdiskusi dengan para pengembang GenAI secara langsung.</p>
<h2 id="References" class="common-anchor-header">Referensi<button data-href="#References" class="anchor-icon" translate="no">
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
<li><p><a href="https://docs.vllm.ai/en/latest/models/supported_models.html#supported-models">Halaman</a> <a href="https://docs.vllm.ai/en/latest/getting_started/installation.html">dokumentasi</a> dan <a href="https://docs.vllm.ai/en/latest/models/supported_models.html#supported-models">model</a> <a href="https://docs.vllm.ai/en/latest/getting_started/installation.html">resmi</a> vLLM.</p></li>
<li><p><a href="https://arxiv.org/pdf/2309.06180">Makalah vLLM 2023 tentang Paged Attention</a></p></li>
<li><p><a href="https://www.youtube.com/watch?v=80bIUggRJf4">Presentasi vLLM 2023</a> di Ray Summit</p></li>
<li><p>Blog vLLM: <a href="https://blog.vllm.ai/2023/06/20/vllm.html">vLLM: Penyajian LLM yang Mudah, Cepat, dan Murah dengan PagedAttention</a></p></li>
<li><p>Blog bermanfaat tentang menjalankan server vLLM: <a href="https://ploomber.io/blog/vllm-deploy/">Menerapkan vLLM: Panduan Langkah-demi-Langkah</a></p></li>
<li><p><a href="https://ai.meta.com/research/publications/the-llama-3-herd-of-models/">Kawanan Model Llama 3 | Penelitian - AI di Meta</a></p></li>
</ul>
