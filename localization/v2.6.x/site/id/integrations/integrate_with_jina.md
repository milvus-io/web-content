---
id: integrate_with_jina.md
summary: >-
  Panduan ini mendemonstrasikan cara menggunakan penyematan Jina dan Milvus
  untuk melakukan tugas pencarian dan pengambilan kemiripan.
title: Mengintegrasikan Milvus dengan Jina
---
<h1 id="Integrate-Milvus-with-Jina-AI" class="common-anchor-header">Mengintegrasikan Milvus dengan Jina AI<button data-href="#Integrate-Milvus-with-Jina-AI" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/milvus_with_Jina.ipynb" target="_parent"><img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/milvus_with_Jina.ipynb" target="_blank"><img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/></a></p>
<p>Panduan ini mendemonstrasikan cara menggunakan penyematan Jina AI dan Milvus untuk melakukan tugas pencarian dan pengambilan kemiripan.</p>
<h2 id="Who-is-Jina-AI" class="common-anchor-header">Siapa itu Jina AI<button data-href="#Who-is-Jina-AI" class="anchor-icon" translate="no">
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
    </button></h2><p>Jina AI, yang didirikan pada tahun 2020 di Berlin, adalah perusahaan AI perintis yang berfokus pada revolusi masa depan kecerdasan buatan melalui fondasi pencariannya. Mengkhususkan diri dalam AI multimodal, Jina AI bertujuan untuk memberdayakan bisnis dan pengembang dalam memanfaatkan kekuatan data multimodal untuk penciptaan nilai dan penghematan biaya melalui rangkaian komponen terintegrasi, termasuk penyematan, pemeringkatan, operasi cepat, dan infrastruktur inti.<br>
Penyematan mutakhir Jina AI membanggakan kinerja tingkat atas, menampilkan model panjang token 8192 yang ideal untuk representasi data yang komprehensif. Menawarkan dukungan multibahasa dan integrasi tanpa batas dengan platform terkemuka seperti OpenAI, penyematan ini memfasilitasi aplikasi lintas bahasa.</p>
<h2 id="Milvus-and-Jina-AIs-Embedding" class="common-anchor-header">Penyematan Milvus dan Jina AI<button data-href="#Milvus-and-Jina-AIs-Embedding" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk menyimpan dan mencari embedding ini secara efisien demi kecepatan dan skala, diperlukan infrastruktur khusus yang dirancang untuk tujuan ini. Milvus adalah basis data vektor sumber terbuka canggih yang dikenal luas yang mampu menangani data vektor berskala besar. Milvus memungkinkan pencarian vektor (embedding) yang cepat dan akurat sesuai dengan banyak metrik. Skalabilitasnya memungkinkan penanganan data gambar dalam jumlah besar tanpa hambatan, memastikan operasi pencarian berkinerja tinggi bahkan ketika kumpulan data terus bertambah.</p>
<h2 id="Examples" class="common-anchor-header">Contoh<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>Penyematan Jina telah diintegrasikan ke dalam pustaka model PyMilvus. Sekarang, kami akan mendemonstrasikan contoh kode untuk menunjukkan cara menggunakan embedding Jina.</p>
<p>Sebelum kita mulai, kita perlu menginstal pustaka model untuk PyMilvus.</p>
<pre><code translate="no" class="language-python">$ pip install -U pymilvus milvus-lite
$ pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Jika Anda menggunakan Google Colab, untuk mengaktifkan dependensi yang baru saja terinstal, Anda mungkin perlu <strong>memulai ulang runtime</strong>. (Klik pada menu "Runtime" di bagian atas layar, dan pilih "Restart session" dari menu dropdown).</p>
</div>
<h2 id="General-Purpose-Embedding" class="common-anchor-header">Penyematan Tujuan Umum<button data-href="#General-Purpose-Embedding" class="anchor-icon" translate="no">
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
    </button></h2><p>Model penyematan inti Jina AI, unggul dalam memahami teks yang mendetail, sehingga ideal untuk pencarian semantik, klasifikasi konten sehingga mendukung analisis sentimen tingkat lanjut, peringkasan teks, dan sistem rekomendasi yang dipersonalisasi.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.dense <span class="hljs-keyword">import</span> JinaEmbeddingFunction

jina_api_key = <span class="hljs-string">&quot;&lt;YOUR_JINA_API_KEY&gt;&quot;</span>
ef = JinaEmbeddingFunction(
    <span class="hljs-string">&quot;jina-embeddings-v3&quot;</span>, 
    jina_api_key,
    task=<span class="hljs-string">&quot;retrieval.passage&quot;</span>,
    dimensions=<span class="hljs-number">1024</span>
)

query = <span class="hljs-string">&quot;what is information retrieval?&quot;</span>
doc = <span class="hljs-string">&quot;Information retrieval is the process of finding relevant information from a large collection of data or documents.&quot;</span>

qvecs = ef.encode_queries([query])  <span class="hljs-comment"># This method uses `retrieval.query` as the task</span>
dvecs = ef.encode_documents([doc])  <span class="hljs-comment"># This method uses `retrieval.passage` as the task</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Bilingual-Embeddings" class="common-anchor-header">Penyematan Bilingual<button data-href="#Bilingual-Embeddings" class="anchor-icon" translate="no">
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
    </button></h2><p>Model dwibahasa Jina AI meningkatkan platform multibahasa, dukungan global, dan penemuan konten lintas bahasa. Dirancang untuk terjemahan bahasa Jerman-Inggris dan bahasa Mandarin-Inggris, model ini mendorong pemahaman di antara kelompok bahasa yang beragam, sehingga menyederhanakan interaksi lintas bahasa.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.dense <span class="hljs-keyword">import</span> JinaEmbeddingFunction

jina_api_key = <span class="hljs-string">&quot;&lt;YOUR_JINA_API_KEY&gt;&quot;</span>
ef = JinaEmbeddingFunction(<span class="hljs-string">&quot;jina-embeddings-v2-base-de&quot;</span>, jina_api_key)

query = <span class="hljs-string">&quot;what is information retrieval?&quot;</span>
doc = <span class="hljs-string">&quot;Information Retrieval ist der Prozess, relevante Informationen aus einer großen Sammlung von Daten oder Dokumenten zu finden.&quot;</span>

qvecs = ef.encode_queries([query])
dvecs = ef.encode_documents([doc])
<button class="copy-code-btn"></button></code></pre>
<h2 id="Code-Embeddings" class="common-anchor-header">Penyematan Kode<button data-href="#Code-Embeddings" class="anchor-icon" translate="no">
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
    </button></h2><p>Model penyematan kode Jina AI menyediakan kemampuan pencarian melalui kode dan dokumentasi. Model ini mendukung bahasa Inggris dan 30 bahasa pemrograman populer yang dapat digunakan untuk meningkatkan navigasi kode, tinjauan kode yang efisien, dan bantuan dokumentasi otomatis.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.dense <span class="hljs-keyword">import</span> JinaEmbeddingFunction

jina_api_key = <span class="hljs-string">&quot;&lt;YOUR_JINA_API_KEY&gt;&quot;</span>
ef = JinaEmbeddingFunction(<span class="hljs-string">&quot;jina-embeddings-v2-base-code&quot;</span>, jina_api_key)

<span class="hljs-comment"># Case1: Enhanced Code Navigation</span>
<span class="hljs-comment"># query: text description of the functionality</span>
<span class="hljs-comment"># document: relevant code snippet</span>

query = <span class="hljs-string">&quot;function to calculate average in Python.&quot;</span>
doc = <span class="hljs-string">&quot;&quot;&quot;
def calculate_average(numbers):
    total = sum(numbers)
    count = len(numbers)
    return total / count
&quot;&quot;&quot;</span>

<span class="hljs-comment"># Case2: Streamlined Code Review</span>
<span class="hljs-comment"># query: text description of the programming concept</span>
<span class="hljs-comment"># document: relevante code snippet or PR</span>

query = <span class="hljs-string">&quot;pull quest related to Collection&quot;</span>
doc = <span class="hljs-string">&quot;fix:[restful v2] parameters of create collection ...&quot;</span>

<span class="hljs-comment"># Case3: Automatic Documentation Assistance</span>
<span class="hljs-comment"># query: code snippet you need explanation</span>
<span class="hljs-comment"># document: relevante document or DocsString</span>

query = <span class="hljs-string">&quot;What is Collection in Milvus&quot;</span>
doc = <span class="hljs-string">&quot;&quot;&quot;
In Milvus, you store your vector embeddings in collections. All vector embeddings within a collection share the same dimensionality and distance metric for measuring similarity.
Milvus collections support dynamic fields (i.e., fields not pre-defined in the schema) and automatic incrementation of primary keys.
&quot;&quot;&quot;</span>

qvecs = ef.encode_queries([query])
dvecs = ef.encode_documents([doc])
<button class="copy-code-btn"></button></code></pre>
<h2 id="Semantic-Search-with-Jina--Milvus" class="common-anchor-header">Pencarian Semantik dengan Jina &amp; Milvus<button data-href="#Semantic-Search-with-Jina--Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Dengan fungsi penyematan vektor yang kuat, kita dapat menggabungkan penyematan yang diambil dengan menggunakan model AI Jina dengan database vektor Milvus Lite untuk melakukan pencarian semantik.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.dense <span class="hljs-keyword">import</span> JinaEmbeddingFunction
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

jina_api_key = <span class="hljs-string">&quot;&lt;YOUR_JINA_API_KEY&gt;&quot;</span>
DIMENSION = <span class="hljs-number">1024</span>  <span class="hljs-comment"># `jina-embeddings-v3` supports flexible embedding sizes (32, 64, 128, 256, 512, 768, 1024), allowing for truncating embeddings to fit your application. </span>
ef = JinaEmbeddingFunction(
    <span class="hljs-string">&quot;jina-embeddings-v3&quot;</span>, 
    jina_api_key,
    task=<span class="hljs-string">&quot;retrieval.passage&quot;</span>,
    dimensions=DIMENSION,
)


doc = [
    <span class="hljs-string">&quot;In 1950, Alan Turing published his seminal paper, &#x27;Computing Machinery and Intelligence,&#x27; proposing the Turing Test as a criterion of intelligence, a foundational concept in the philosophy and development of artificial intelligence.&quot;</span>,
    <span class="hljs-string">&quot;The Dartmouth Conference in 1956 is considered the birthplace of artificial intelligence as a field; here, John McCarthy and others coined the term &#x27;artificial intelligence&#x27; and laid out its basic goals.&quot;</span>,
    <span class="hljs-string">&quot;In 1951, British mathematician and computer scientist Alan Turing also developed the first program designed to play chess, demonstrating an early example of AI in game strategy.&quot;</span>,
    <span class="hljs-string">&quot;The invention of the Logic Theorist by Allen Newell, Herbert A. Simon, and Cliff Shaw in 1955 marked the creation of the first true AI program, which was capable of solving logic problems, akin to proving mathematical theorems.&quot;</span>,
]

dvecs = ef.encode_documents(doc) <span class="hljs-comment"># This method uses `retrieval.passage` as the task</span>

data = [
    {<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: dvecs[i], <span class="hljs-string">&quot;text&quot;</span>: doc[i], <span class="hljs-string">&quot;subject&quot;</span>: <span class="hljs-string">&quot;history&quot;</span>}
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(dvecs))
]

milvus_client = MilvusClient(<span class="hljs-string">&quot;./milvus_jina_demo.db&quot;</span>)
COLLECTION_NAME = <span class="hljs-string">&quot;demo_collection&quot;</span>  <span class="hljs-comment"># Milvus collection name</span>
<span class="hljs-keyword">if</span> milvus_client.has_collection(collection_name=COLLECTION_NAME):
    milvus_client.drop_collection(collection_name=COLLECTION_NAME)
milvus_client.create_collection(collection_name=COLLECTION_NAME, dimension=DIMENSION)

res = milvus_client.insert(collection_name=COLLECTION_NAME, data=data)

<span class="hljs-built_in">print</span>(res[<span class="hljs-string">&quot;insert_count&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Adapun argumen dari <code translate="no">MilvusClient</code>:</p>
<ul>
<li>Menetapkan <code translate="no">uri</code> sebagai file lokal, misalnya<code translate="no">./milvus.db</code>, adalah metode yang paling mudah, karena secara otomatis menggunakan <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> untuk menyimpan semua data dalam file ini.</li>
<li>Jika Anda memiliki data dalam skala besar, Anda dapat mengatur server Milvus yang lebih berkinerja pada <a href="https://milvus.io/docs/quickstart.md">docker atau kubernetes</a>. Dalam pengaturan ini, silakan gunakan uri server, misalnya<code translate="no">http://localhost:19530</code>, sebagai <code translate="no">uri</code>.</li>
<li>Jika Anda ingin menggunakan <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, layanan cloud yang dikelola sepenuhnya untuk Milvus, sesuaikan <code translate="no">uri</code> dan <code translate="no">token</code>, yang sesuai dengan <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">kunci Public Endpoint dan Api</a> di Zilliz Cloud.</li>
</ul>
</div>
<p>Dengan semua data dalam basis data vektor Milvus, kita sekarang dapat melakukan pencarian semantik dengan membuat penyematan vektor untuk kueri dan melakukan pencarian vektor.</p>
<pre><code translate="no" class="language-python">queries = <span class="hljs-string">&quot;What event in 1956 marked the official birth of artificial intelligence as a discipline?&quot;</span>
qvecs = ef.encode_queries([queries]) <span class="hljs-comment"># This method uses `retrieval.query` as the task</span>

res = milvus_client.search(
    collection_name=COLLECTION_NAME,  <span class="hljs-comment"># target collection</span>
    data=[qvecs[<span class="hljs-number">0</span>]],  <span class="hljs-comment"># query vectors</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># number of returned entities</span>
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],  <span class="hljs-comment"># specifies fields to be returned</span>
)[<span class="hljs-number">0</span>]

<span class="hljs-keyword">for</span> result <span class="hljs-keyword">in</span> res:
    <span class="hljs-built_in">print</span>(result)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'id': 1, 'distance': 0.8802614808082581, 'entity': {'text': &quot;The Dartmouth Conference in 1956 is considered the birthplace of artificial intelligence as a field; here, John McCarthy and others coined the term 'artificial intelligence' and laid out its basic goals.&quot;, 'subject': 'history'}}
</code></pre>
<h2 id="Jina-Reranker" class="common-anchor-header">Jina Reranker<button data-href="#Jina-Reranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Jina Ai juga menyediakan perangking ulang untuk lebih meningkatkan kualitas pencarian setelah melakukan pencarian menggunakan penyematan.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.reranker <span class="hljs-keyword">import</span> JinaRerankFunction

jina_api_key = <span class="hljs-string">&quot;&lt;YOUR_JINA_API_KEY&gt;&quot;</span>

rf = JinaRerankFunction(<span class="hljs-string">&quot;jina-reranker-v1-base-en&quot;</span>, jina_api_key)

query = <span class="hljs-string">&quot;What event in 1956 marked the official birth of artificial intelligence as a discipline?&quot;</span>

documents = [
    <span class="hljs-string">&quot;In 1950, Alan Turing published his seminal paper, &#x27;Computing Machinery and Intelligence,&#x27; proposing the Turing Test as a criterion of intelligence, a foundational concept in the philosophy and development of artificial intelligence.&quot;</span>,
    <span class="hljs-string">&quot;The Dartmouth Conference in 1956 is considered the birthplace of artificial intelligence as a field; here, John McCarthy and others coined the term &#x27;artificial intelligence&#x27; and laid out its basic goals.&quot;</span>,
    <span class="hljs-string">&quot;In 1951, British mathematician and computer scientist Alan Turing also developed the first program designed to play chess, demonstrating an early example of AI in game strategy.&quot;</span>,
    <span class="hljs-string">&quot;The invention of the Logic Theorist by Allen Newell, Herbert A. Simon, and Cliff Shaw in 1955 marked the creation of the first true AI program, which was capable of solving logic problems, akin to proving mathematical theorems.&quot;</span>,
]

rf(query, documents)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[RerankResult(text=&quot;The Dartmouth Conference in 1956 is considered the birthplace of artificial intelligence as a field; here, John McCarthy and others coined the term 'artificial intelligence' and laid out its basic goals.&quot;, score=0.9370958209037781, index=1),
 RerankResult(text='The invention of the Logic Theorist by Allen Newell, Herbert A. Simon, and Cliff Shaw in 1955 marked the creation of the first true AI program, which was capable of solving logic problems, akin to proving mathematical theorems.', score=0.35420963168144226, index=3),
 RerankResult(text=&quot;In 1950, Alan Turing published his seminal paper, 'Computing Machinery and Intelligence,' proposing the Turing Test as a criterion of intelligence, a foundational concept in the philosophy and development of artificial intelligence.&quot;, score=0.3498658835887909, index=0),
 RerankResult(text='In 1951, British mathematician and computer scientist Alan Turing also developed the first program designed to play chess, demonstrating an early example of AI in game strategy.', score=0.2728956639766693, index=2)]
</code></pre>
