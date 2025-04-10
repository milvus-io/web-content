---
id: integrate_with_llamaindex.md
summary: >-
  Panduan ini mendemonstrasikan cara membangun sistem Retrieval-Augmented
  Generation (RAG) menggunakan LlamaIndex dan Milvus.
title: Retrieval-Augmented Generation (RAG) dengan Milvus dan LlamaIndex
---
<h1 id="Retrieval-Augmented-Generation-RAG-with-Milvus-and-LlamaIndex" class="common-anchor-header">Retrieval-Augmented Generation (RAG) dengan Milvus dan LlamaIndex<button data-href="#Retrieval-Augmented-Generation-RAG-with-Milvus-and-LlamaIndex" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/rag_with_milvus_and_llamaindex.ipynb" target="_parent"><img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/rag_with_milvus_and_llamaindex.ipynb" target="_blank"><img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/></a></p>
<p>Panduan ini mendemonstrasikan cara membangun sistem Retrieval-Augmented Generation (RAG) dengan menggunakan LlamaIndex dan Milvus.</p>
<p>Sistem RAG menggabungkan sistem pencarian dengan model generatif untuk menghasilkan teks baru berdasarkan perintah yang diberikan. Sistem ini pertama-tama mengambil dokumen yang relevan dari sebuah korpus menggunakan Milvus, dan kemudian menggunakan model generatif untuk menghasilkan teks baru berdasarkan dokumen yang diambil.</p>
<p><a href="https://www.llamaindex.ai/">LlamaIndex</a> adalah kerangka kerja data yang sederhana dan fleksibel untuk menghubungkan sumber data khusus ke model bahasa besar (LLM). <a href="https://milvus.io/">Milvus</a> adalah basis data vektor sumber terbuka yang paling canggih di dunia, yang dibuat untuk mendukung pencarian kemiripan dan aplikasi AI.</p>
<p>Dalam buku catatan ini, kami akan menunjukkan demo singkat penggunaan MilvusVectorStore.</p>
<h2 id="Before-you-begin" class="common-anchor-header">Sebelum Anda memulai<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Install-dependencies" class="common-anchor-header">Menginstal ketergantungan</h3><p>Potongan kode pada halaman ini membutuhkan dependensi pymilvus dan llamaindex. Anda dapat menginstalnya dengan menggunakan perintah berikut:</p>
<pre><code translate="no" class="language-python">$ pip install pymilvus&gt;=<span class="hljs-number">2.4</span><span class="hljs-number">.2</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">$ pip install llama-index-vector-stores-milvus
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">$ pip install llama-index
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Jika Anda menggunakan Google Colab, untuk mengaktifkan dependensi yang baru saja diinstal, Anda mungkin perlu <strong>memulai ulang runtime</strong>. (Klik menu "Runtime" di bagian atas layar, dan pilih "Restart session" dari menu tarik-turun).</p>
</div>
<h3 id="Setup-OpenAI" class="common-anchor-header">Menyiapkan OpenAI</h3><p>Pertama-tama, mari kita mulai dengan menambahkan kunci api openai. Ini akan memungkinkan kita untuk mengakses chatgpt.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> openai

openai.api_key = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Prepare-data" class="common-anchor-header">Menyiapkan data</h3><p>Anda dapat mengunduh data sampel dengan perintah berikut:</p>
<pre><code translate="no" class="language-python">! mkdir -p <span class="hljs-string">&#x27;data/&#x27;</span>
! wget <span class="hljs-string">&#x27;https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/paul_graham/paul_graham_essay.txt&#x27;</span> -O <span class="hljs-string">&#x27;data/paul_graham_essay.txt&#x27;</span>
! wget <span class="hljs-string">&#x27;https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/10k/uber_2021.pdf&#x27;</span> -O <span class="hljs-string">&#x27;data/uber_2021.pdf&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Getting-Started" class="common-anchor-header">Memulai<button data-href="#Getting-Started" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Generate-our-data" class="common-anchor-header">Menghasilkan data kita</h3><p>Sebagai contoh pertama, mari kita buat sebuah dokumen dari file <code translate="no">paul_graham_essay.txt</code>. Dokumen tersebut adalah sebuah esai dari Paul Graham yang berjudul <code translate="no">What I Worked On</code>. Untuk menghasilkan dokumen, kita akan menggunakan SimpleDirectoryReader.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> SimpleDirectoryReader

<span class="hljs-comment"># load documents</span>
documents = SimpleDirectoryReader(
    input_files=[<span class="hljs-string">&quot;./data/paul_graham_essay.txt&quot;</span>]
).load_data()

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Document ID:&quot;</span>, documents[<span class="hljs-number">0</span>].doc_id)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Document ID: 95f25e4d-f270-4650-87ce-006d69d82033
</code></pre>
<h3 id="Create-an-index-across-the-data" class="common-anchor-header">Membuat indeks di seluruh data</h3><p>Sekarang setelah kita memiliki sebuah dokumen, kita dapat membuat sebuah indeks dan menyisipkan dokumen tersebut. Untuk indeks kita akan menggunakan MilvusVectorStore. MilvusVectorStore membutuhkan beberapa argumen:</p>
<h4 id="basic-args" class="common-anchor-header">argumen dasar</h4><ul>
<li><code translate="no">uri (str, optional)</code>: URI yang akan disambungkan, berupa "https://address:port" untuk layanan Milvus atau Zilliz Cloud, atau "path/to/local/milvus.db" untuk Milvus lokal lite. Defaultnya adalah "./milvus_llamaindex.db".</li>
<li><code translate="no">token (str, optional)</code>: Token untuk masuk. Kosongkan jika tidak menggunakan rbac, jika menggunakan rbac kemungkinan besar akan menjadi "username:password".</li>
<li><code translate="no">collection_name (str, optional)</code>: Nama koleksi di mana data akan disimpan. Defaultnya adalah "llamalection".</li>
<li><code translate="no">overwrite (bool, optional)</code>: Apakah akan menimpa koleksi yang sudah ada dengan nama yang sama. Nilai defaultnya adalah "False".</li>
</ul>
<h4 id="scalar-fields-including-doc-id--text" class="common-anchor-header">bidang skalar termasuk id dokumen &amp; teks</h4><ul>
<li><code translate="no">doc_id_field (str, optional)</code>: Nama bidang doc_id untuk koleksi. Defaultnya adalah DEFAULT_DOC_ID_KEY.</li>
<li><code translate="no">text_key (str, optional)</code>: Teks kunci apa yang disimpan dalam koleksi yang dilewatkan. Digunakan saat membawa koleksi Anda sendiri. Defaultnya adalah DEFAULT_TEXT_KEY.</li>
<li><code translate="no">scalar_field_names (list, optional)</code>: Nama-nama bidang skalar tambahan yang akan disertakan dalam skema koleksi.</li>
<li><code translate="no">scalar_field_types (list, optional)</code>: Jenis-jenis bidang skalar ekstra.</li>
</ul>
<h4 id="dense-field" class="common-anchor-header">bidang padat</h4><ul>
<li><code translate="no">enable_dense (bool)</code>: Bendera boolean untuk mengaktifkan atau menonaktifkan penyematan padat. Nilai defaultnya adalah True (Benar).</li>
<li><code translate="no">dim (int, optional)</code>: Dimensi vektor penyematan untuk koleksi. Diperlukan saat membuat koleksi baru dengan enable_sparse bernilai False.</li>
<li><code translate="no">embedding_field (str, optional)</code>: Nama bidang penyematan padat untuk koleksi, defaultnya adalah DEFAULT_EMBEDDING_KEY.</li>
<li><code translate="no">index_config (dict, optional)</code>: Konfigurasi yang digunakan untuk membangun indeks sematan padat. Defaultnya adalah None.</li>
<li><code translate="no">search_config (dict, optional)</code>: Konfigurasi yang digunakan untuk mencari indeks padat Milvus. Perhatikan bahwa ini harus kompatibel dengan jenis indeks yang ditentukan oleh <code translate="no">index_config</code>. Setelan default untuk Tidak Ada.</li>
<li><code translate="no">similarity_metric (str, optional)</code>: Metrik kemiripan yang digunakan untuk penyematan padat, saat ini mendukung IP, COSINE, dan L2.</li>
</ul>
<h4 id="sparse-field" class="common-anchor-header">sparse field</h4><ul>
<li><code translate="no">enable_sparse (bool)</code>: Bendera boolean untuk mengaktifkan atau menonaktifkan penyematan jarang. Defaultnya adalah False.</li>
<li><code translate="no">sparse_embedding_field (str)</code>: Nama bidang penyematan jarang, defaultnya adalah DEFAULT_SPARSE_EMBEDDING_KEY.</li>
<li><code translate="no">sparse_embedding_function (Union[BaseSparseEmbeddingFunction, BaseMilvusBuiltInFunction], optional)</code>: Jika enable_sparse bernilai True, objek ini harus disediakan untuk mengonversi teks ke sematan jarang. Jika Tidak Ada, fungsi penyematan jarang default (BGEM3SparseEmbeddingFunction) akan digunakan.</li>
<li><code translate="no">sparse_index_config (dict, optional)</code>: Konfigurasi yang digunakan untuk membangun indeks sematan jarang. Defaultnya adalah Tidak Ada.</li>
</ul>
<h4 id="hybrid-ranker" class="common-anchor-header">pemeringkat hibrida</h4><ul>
<li><p><code translate="no">hybrid_ranker (str)</code>: Menentukan jenis pemeringkat yang digunakan dalam kueri penelusuran hibrida. Saat ini hanya mendukung ["RRFRanker", "WeightedRanker"]. Nilai default untuk "RRFRanker".</p></li>
<li><p><code translate="no">hybrid_ranker_params (dict, optional)</code>: Parameter konfigurasi untuk pemeringkat hibrida. Struktur kamus ini tergantung pada pemeringkat spesifik yang digunakan:</p>
<ul>
<li>Untuk "RRFRanker", harus menyertakan:<ul>
<li>"k" (int): Parameter yang digunakan dalam Reciprocal Rank Fusion (RRF). Nilai ini digunakan untuk menghitung skor peringkat sebagai bagian dari algoritme RRF, yang menggabungkan beberapa strategi peringkat menjadi satu skor untuk meningkatkan relevansi penelusuran.</li>
</ul></li>
<li>Untuk "WeightedRanker", ini mengharapkan:<ul>
<li>"bobot" (daftar float): Daftar yang terdiri dari dua bobot:<ol>
<li>Bobot untuk komponen sematan padat.</li>
<li>Bobot untuk komponen sematan jarang. Bobot ini digunakan untuk menyesuaikan pentingnya komponen sematan padat dan jarang dalam proses pengambilan hibrida. Default ke kamus kosong, menyiratkan bahwa pemeringkat akan beroperasi dengan pengaturan default yang telah ditetapkan sebelumnya.</li>
</ol></li>
</ul></li>
</ul></li>
</ul>
<h4 id="others" class="common-anchor-header">lainnya</h4><ul>
<li><code translate="no">collection_properties (dict, optional)</code>: Properti koleksi seperti TTL (Time-To-Live) dan MMAP (pemetaan memori). Defaultnya adalah Tidak Ada. Ini bisa termasuk:<ul>
<li>"collection.ttl.seconds" (int): Setelah properti ini ditetapkan, data dalam koleksi saat ini akan kedaluwarsa dalam waktu yang ditentukan. Data yang kedaluwarsa dalam koleksi akan dibersihkan dan tidak akan dilibatkan dalam pencarian atau kueri.</li>
<li>"mmap.enabled" (bool): Apakah akan mengaktifkan penyimpanan yang dipetakan memori di tingkat koleksi.</li>
</ul></li>
<li><code translate="no">index_management (IndexManagement)</code>: Menentukan strategi manajemen indeks yang akan digunakan. Nilai defaultnya adalah "buat_jika_tidak_ada".</li>
<li><code translate="no">batch_size (int)</code>: Mengonfigurasi jumlah dokumen yang diproses dalam satu batch saat memasukkan data ke dalam Milvus. Nilai defaultnya adalah DEFAULT_BATCH_SIZE.</li>
<li><code translate="no">consistency_level (str, optional)</code>: Tingkat konsistensi yang digunakan untuk koleksi yang baru dibuat. Defaultnya adalah "Session".</li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create an index over the documents</span>
<span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> VectorStoreIndex, StorageContext
<span class="hljs-keyword">from</span> llama_index.vector_stores.milvus <span class="hljs-keyword">import</span> MilvusVectorStore


vector_store = MilvusVectorStore(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>, dim=<span class="hljs-number">1536</span>, overwrite=<span class="hljs-literal">True</span>)
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(documents, storage_context=storage_context)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Untuk parameter <code translate="no">MilvusVectorStore</code>:</p>
<ul>
<li>Mengatur <code translate="no">uri</code> sebagai file lokal, misalnya<code translate="no">./milvus.db</code>, adalah metode yang paling mudah, karena secara otomatis menggunakan <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> untuk menyimpan semua data dalam file ini.</li>
<li>Jika Anda memiliki data dalam skala besar, Anda dapat mengatur server Milvus yang lebih berkinerja pada <a href="https://milvus.io/docs/quickstart.md">docker atau kubernetes</a>. Dalam pengaturan ini, silakan gunakan uri server, misalnya<code translate="no">http://localhost:19530</code>, sebagai <code translate="no">uri</code>.</li>
<li>Jika Anda ingin menggunakan <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, layanan cloud yang dikelola sepenuhnya untuk Milvus, sesuaikan <code translate="no">uri</code> dan <code translate="no">token</code>, yang sesuai dengan <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">kunci Public Endpoint dan Api</a> di Zilliz Cloud.</li>
</ul>
</div>
<h3 id="Query-the-data" class="common-anchor-header">Menanyakan data</h3><p>Setelah dokumen kita tersimpan dalam indeks, kita dapat mengajukan pertanyaan terhadap indeks. Indeks akan menggunakan data yang tersimpan di dalamnya sebagai basis pengetahuan untuk chatgpt.</p>
<pre><code translate="no" class="language-python">query_engine = index.as_query_engine()
res = query_engine.query(<span class="hljs-string">&quot;What did the author learn?&quot;</span>)
<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The author learned that philosophy courses in college were boring to him, leading him to switch his focus to studying AI.
</code></pre>
<pre><code translate="no" class="language-python">res = query_engine.query(<span class="hljs-string">&quot;What challenges did the disease pose for the author?&quot;</span>)
<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The disease posed challenges for the author as it affected his mother's health, leading to a stroke caused by colon cancer. This resulted in her losing her balance and needing to be placed in a nursing home. The author and his sister were determined to help their mother get out of the nursing home and back to her house.
</code></pre>
<p>Pengujian berikutnya menunjukkan bahwa penimpaan akan menghapus data sebelumnya.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> Document


vector_store = MilvusVectorStore(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>, dim=<span class="hljs-number">1536</span>, overwrite=<span class="hljs-literal">True</span>)
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(
    [Document(text=<span class="hljs-string">&quot;The number that is being searched for is ten.&quot;</span>)],
    storage_context,
)
query_engine = index.as_query_engine()
res = query_engine.query(<span class="hljs-string">&quot;Who is the author?&quot;</span>)
<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The author is the individual who created the context information.
</code></pre>
<p>Pengujian berikutnya menunjukkan penambahan data tambahan ke indeks yang sudah ada.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">del</span> index, vector_store, storage_context, query_engine

vector_store = MilvusVectorStore(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>, overwrite=<span class="hljs-literal">False</span>)
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(documents, storage_context=storage_context)
query_engine = index.as_query_engine()
res = query_engine.query(<span class="hljs-string">&quot;What is the number?&quot;</span>)
<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The number is ten.
</code></pre>
<pre><code translate="no" class="language-python">res = query_engine.query(<span class="hljs-string">&quot;Who is the author?&quot;</span>)
<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Paul Graham
</code></pre>
<h2 id="Metadata-filtering" class="common-anchor-header">Penyaringan metadata<button data-href="#Metadata-filtering" class="anchor-icon" translate="no">
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
    </button></h2><p>Kita dapat menghasilkan hasil dengan menyaring sumber-sumber tertentu. Contoh berikut mengilustrasikan pemuatan semua dokumen dari direktori dan kemudian menyaringnya berdasarkan metadata.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core.vector_stores <span class="hljs-keyword">import</span> ExactMatchFilter, MetadataFilters

<span class="hljs-comment"># Load all the two documents loaded before</span>
documents_all = SimpleDirectoryReader(<span class="hljs-string">&quot;./data/&quot;</span>).load_data()

vector_store = MilvusVectorStore(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>, dim=<span class="hljs-number">1536</span>, overwrite=<span class="hljs-literal">True</span>)
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(documents_all, storage_context)
<button class="copy-code-btn"></button></code></pre>
<p>Kita hanya ingin mengambil dokumen dari file <code translate="no">uber_2021.pdf</code>.</p>
<pre><code translate="no" class="language-python">filters = MetadataFilters(
    filters=[ExactMatchFilter(key=<span class="hljs-string">&quot;file_name&quot;</span>, value=<span class="hljs-string">&quot;uber_2021.pdf&quot;</span>)]
)
query_engine = index.as_query_engine(filters=filters)
res = query_engine.query(<span class="hljs-string">&quot;What challenges did the disease pose for the author?&quot;</span>)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The disease posed challenges related to the adverse impact on the business and operations, including reduced demand for Mobility offerings globally, affecting travel behavior and demand. Additionally, the pandemic led to driver supply constraints, impacted by concerns regarding COVID-19, with uncertainties about when supply levels would return to normal. The rise of the Omicron variant further affected travel, resulting in advisories and restrictions that could adversely impact both driver supply and consumer demand for Mobility offerings.
</code></pre>
<p>Kita mendapatkan hasil yang berbeda ketika mengambil dari file <code translate="no">paul_graham_essay.txt</code>.</p>
<pre><code translate="no" class="language-python">filters = MetadataFilters(
    filters=[ExactMatchFilter(key=<span class="hljs-string">&quot;file_name&quot;</span>, value=<span class="hljs-string">&quot;paul_graham_essay.txt&quot;</span>)]
)
query_engine = index.as_query_engine(filters=filters)
res = query_engine.query(<span class="hljs-string">&quot;What challenges did the disease pose for the author?&quot;</span>)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The disease posed challenges for the author as it affected his mother's health, leading to a stroke caused by colon cancer. This resulted in his mother losing her balance and needing to be placed in a nursing home. The author and his sister were determined to help their mother get out of the nursing home and back to her house.
</code></pre>
