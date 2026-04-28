---
id: build_RAG_with_milvus_and_cognee.md
summary: >-
  Dalam tutorial ini, kami akan menunjukkan kepada Anda cara membuat pipeline
  RAG (Retrieval-Augmented Generation) dengan Milvus dan Cognee.
title: Membangun RAG dengan Milvus dan Cognee
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/build_RAG_with_milvus_and_cognee.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/build_RAG_with_milvus_and_cognee.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h3 id="Build-RAG-with-Milvus-and-Cognee" class="common-anchor-header">Membangun RAG dengan Milvus dan Cognee</h3><p><a href="https://www.cognee.ai">Cognee</a> adalah platform khusus pengembang yang menyederhanakan pengembangan aplikasi AI dengan pipeline ECL (Extract, Cognify, Load) modular yang dapat diskalakan. Dengan mengintegrasikan secara mulus dengan Milvus, Cognee memungkinkan koneksi dan pengambilan percakapan, dokumen, dan transkripsi yang efisien, mengurangi halusinasi dan mengoptimalkan biaya operasional.</p>
<p>Dengan dukungan yang kuat untuk penyimpanan vektor seperti Milvus, basis data grafik, dan LLM, Cognee menyediakan kerangka kerja yang fleksibel dan dapat disesuaikan untuk membangun sistem retrieval-augmented generation (RAG). Arsitekturnya yang siap produksi memastikan peningkatan akurasi dan efisiensi untuk aplikasi yang didukung AI.</p>
<p>Dalam tutorial ini, kami akan menunjukkan kepada Anda cara membuat pipeline RAG (Retrieval-Augmented Generation) dengan Milvus dan Cognee.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install pymilvus git+https://github.com/topoteretes/cognee.git</span>
<button class="copy-code-btn"></button></code></pre>
<blockquote>
<p>Jika Anda menggunakan Google Colab, untuk mengaktifkan dependensi yang baru saja diinstal, Anda mungkin perlu <strong>memulai ulang runtime</strong> (klik menu "Runtime" di bagian atas layar, dan pilih "Restart session" dari menu tarik-turun).</p>
</blockquote>
<p>Secara default, ia menggunakan OpenAI sebagai LLM dalam contoh ini. Anda harus menyiapkan <a href="https://platform.openai.com/docs/quickstart">kunci api</a>, dan mengaturnya dalam fungsi konfigurasi <code translate="no">set_llm_api_key()</code>.</p>
<p>Untuk mengkonfigurasi Milvus sebagai basis data vektor, atur <code translate="no">VECTOR_DB_PROVIDER</code> ke <code translate="no">milvus</code> dan tentukan <code translate="no">VECTOR_DB_URL</code> dan <code translate="no">VECTOR_DB_KEY</code>. Karena kita menggunakan Milvus Lite untuk menyimpan data pada demo ini, maka hanya <code translate="no">VECTOR_DB_URL</code> yang perlu disediakan.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

<span class="hljs-keyword">import</span> cognee

cognee.config.set_llm_api_key(<span class="hljs-string">&quot;YOUR_OPENAI_API_KEY&quot;</span>)


os.environ[<span class="hljs-string">&quot;VECTOR_DB_PROVIDER&quot;</span>] = <span class="hljs-string">&quot;milvus&quot;</span>
os.environ[<span class="hljs-string">&quot;VECTOR_DB_URL&quot;</span>] = <span class="hljs-string">&quot;./milvus.db&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Sedangkan untuk variabel lingkungan <code translate="no">VECTOR_DB_URL</code> dan <code translate="no">VECTOR_DB_KEY</code>:</p>
<ul>
<li>Mengatur <code translate="no">VECTOR_DB_URL</code> sebagai file lokal, misalnya<code translate="no">./milvus.db</code>, adalah metode yang paling mudah, karena secara otomatis menggunakan <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> untuk menyimpan semua data dalam file ini.</li>
<li>Jika Anda memiliki data dalam skala besar, Anda dapat mengatur server Milvus yang lebih berkinerja pada <a href="https://milvus.io/docs/quickstart.md">docker atau kubernetes</a>. Dalam pengaturan ini, silakan gunakan uri server, misalnya<code translate="no">http://localhost:19530</code>, sebagai <code translate="no">VECTOR_DB_URL</code>.</li>
<li>Jika Anda ingin menggunakan <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, layanan cloud yang dikelola sepenuhnya untuk Milvus, sesuaikan <code translate="no">VECTOR_DB_URL</code> dan <code translate="no">VECTOR_DB_KEY</code>, yang sesuai dengan <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Public Endpoint dan Api key</a> di Zilliz Cloud.</li>
</ul>
<p></a></p>
<h3 id="Prepare-the-data" class="common-anchor-header">Siapkan data</h3><p>Kami menggunakan halaman FAQ dari <a href="https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip">Dokumentasi Milvus 2.4.x</a> sebagai pengetahuan pribadi dalam RAG kami, yang merupakan sumber data yang baik untuk pipeline RAG sederhana.</p>
<p>Unduh file zip dan ekstrak dokumen ke folder <code translate="no">milvus_docs</code>.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">unzip -q milvus_docs_2.4.x_en.zip -d milvus_docs</span>
<button class="copy-code-btn"></button></code></pre>
<p>Kami memuat semua file penurunan harga dari folder <code translate="no">milvus_docs/en/faq</code>. Untuk setiap dokumen, kita cukup menggunakan "# " untuk memisahkan konten dalam file, yang secara kasar dapat memisahkan konten dari setiap bagian utama dari file penurunan harga.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> glob <span class="hljs-keyword">import</span> glob

text_lines = []

<span class="hljs-keyword">for</span> file_path <span class="hljs-keyword">in</span> glob(<span class="hljs-string">&quot;milvus_docs/en/faq/*.md&quot;</span>, recursive=<span class="hljs-literal">True</span>):
    <span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(file_path, <span class="hljs-string">&quot;r&quot;</span>) <span class="hljs-keyword">as</span> file:
        file_text = file.read()

    text_lines += file_text.split(<span class="hljs-string">&quot;# &quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Build-RAG" class="common-anchor-header">Membangun RAG<button data-href="#Build-RAG" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Resetting-Cognee-Data" class="common-anchor-header">Mengatur Ulang Data Cognee</h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">await</span> cognee.prune.prune_data()
<span class="hljs-keyword">await</span> cognee.prune.prune_system(metadata=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Dengan catatan yang bersih, kita sekarang dapat menambahkan kumpulan data kita dan memprosesnya menjadi grafik pengetahuan.</p>
<h3 id="Adding-Data-and-Cognifying" class="common-anchor-header">Menambahkan Data dan Mengenali</h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">await</span> cognee.add(data=text_lines, dataset_name=<span class="hljs-string">&quot;milvus_faq&quot;</span>)
<span class="hljs-keyword">await</span> cognee.cognify()

<span class="hljs-comment"># [DocumentChunk(id=UUID(&#x27;6889e7ef-3670-555c-bb16-3eb50d1d30b0&#x27;), updated_at=datetime.datetime(2024, 12, 4, 6, 29, 46, 472907, tzinfo=datetime.timezone.utc), text=&#x27;Does the query perform in memory? What are incremental data and historical data?\n\nYes. When ...</span>
<span class="hljs-comment"># ...</span>
<button class="copy-code-btn"></button></code></pre>
<p>Metode <code translate="no">add</code> memuat set data (Milvus FAQ) ke dalam Cognee dan metode <code translate="no">cognify</code> memproses data untuk mengekstrak entitas, hubungan, dan rangkuman, membangun grafik pengetahuan.</p>
<h3 id="Querying-for-Summaries" class="common-anchor-header">Mengajukan Pertanyaan untuk Rangkuman</h3><p>Setelah data diproses, mari kita melakukan kueri pada grafik pengetahuan.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> cognee.api.v1.search <span class="hljs-keyword">import</span> SearchType

query_text = <span class="hljs-string">&quot;How is data stored in milvus?&quot;</span>
search_results = <span class="hljs-keyword">await</span> cognee.search(SearchType.SUMMARIES, query_text=query_text)

<span class="hljs-built_in">print</span>(search_results[<span class="hljs-number">0</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'id': 'de5c6713-e079-5d0b-b11d-e9bacd1e0d73', 'text': 'Milvus stores two data types: inserted data and metadata.'}
</code></pre>
<p>Kueri ini mencari ringkasan yang terkait dengan teks kueri, dan kandidat yang paling terkait akan dicetak.</p>
<h3 id="Querying-for-Chunks" class="common-anchor-header">Mengajukan Kueri untuk Potongan</h3><p>Ringkasan menawarkan wawasan tingkat tinggi, tetapi untuk detail yang lebih terperinci, kita dapat melakukan kueri untuk potongan data tertentu secara langsung dari kumpulan data yang telah diproses. Potongan-potongan ini berasal dari data asli yang ditambahkan dan dianalisis selama pembuatan grafik pengetahuan.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> cognee.api.v1.search <span class="hljs-keyword">import</span> SearchType

query_text = <span class="hljs-string">&quot;How is data stored in milvus?&quot;</span>
search_results = <span class="hljs-keyword">await</span> cognee.search(SearchType.CHUNKS, query_text=query_text)
<button class="copy-code-btn"></button></code></pre>
<p>Mari kita format dan tampilkan agar lebih mudah dibaca!</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">format_and_print</span>(<span class="hljs-params">data</span>):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;ID:&quot;</span>, data[<span class="hljs-string">&quot;id&quot;</span>])
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\nText:\n&quot;</span>)
    paragraphs = data[<span class="hljs-string">&quot;text&quot;</span>].split(<span class="hljs-string">&quot;\n\n&quot;</span>)
    <span class="hljs-keyword">for</span> paragraph <span class="hljs-keyword">in</span> paragraphs:
        <span class="hljs-built_in">print</span>(paragraph.strip())
        <span class="hljs-built_in">print</span>()


format_and_print(search_results[<span class="hljs-number">0</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">ID: 4be01c4b-9ee5-541c-9b85-297883934ab3

Text:

Where does Milvus store data?

Milvus deals with two types of data, inserted data and metadata.

Inserted data, including vector data, scalar data, and collection-specific schema, are stored in persistent storage as incremental log. Milvus supports multiple object storage backends, including [MinIO](https://min.io/), [AWS S3](https://aws.amazon.com/s3/?nc1=h_ls), [Google Cloud Storage](https://cloud.google.com/storage?hl=en#object-storage-for-companies-of-all-sizes) (GCS), [Azure Blob Storage](https://azure.microsoft.com/en-us/products/storage/blobs), [Alibaba Cloud OSS](https://www.alibabacloud.com/product/object-storage-service), and [Tencent Cloud Object Storage](https://www.tencentcloud.com/products/cos) (COS).

Metadata are generated within Milvus. Each Milvus module has its own metadata that are stored in etcd.

###
</code></pre>
<p>Pada langkah sebelumnya, kami menanyakan dataset FAQ Milvus untuk ringkasan dan potongan data tertentu. Meskipun hal ini memberikan wawasan yang rinci dan informasi granular, dataset ini sangat besar, sehingga sulit untuk memvisualisasikan ketergantungan dengan jelas di dalam grafik pengetahuan.</p>
<p>Untuk mengatasi hal ini, kita akan mengatur ulang lingkungan Cognee dan bekerja dengan set data yang lebih kecil dan lebih terfokus. Hal ini akan memungkinkan kita untuk menunjukkan hubungan dan ketergantungan yang diekstrak selama proses cognify dengan lebih baik. Dengan menyederhanakan data, kita dapat dengan jelas melihat bagaimana Cognee mengatur dan menyusun informasi dalam grafik pengetahuan.</p>
<h3 id="Reset-Cognee" class="common-anchor-header">Mengatur Ulang Cognee</h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">await</span> cognee.prune.prune_data()
<span class="hljs-keyword">await</span> cognee.prune.prune_system(metadata=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Adding-the-Focused-Dataset" class="common-anchor-header">Menambahkan Dataset Terfokus</h3><p>Di sini, kumpulan data yang lebih kecil dengan hanya satu baris teks ditambahkan dan diproses untuk memastikan grafik pengetahuan yang terfokus dan mudah diinterpretasikan.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># We only use one line of text as the dataset, which simplifies the output later</span>
text = <span class="hljs-string">&quot;&quot;&quot;
    Natural language processing (NLP) is an interdisciplinary
    subfield of computer science and information retrieval.
    &quot;&quot;&quot;</span>

<span class="hljs-keyword">await</span> cognee.add(text)
<span class="hljs-keyword">await</span> cognee.cognify()
<button class="copy-code-btn"></button></code></pre>
<h3 id="Querying-for-Insights" class="common-anchor-header">Mengajukan Pertanyaan untuk Wawasan</h3><p>Dengan berfokus pada kumpulan data yang lebih kecil ini, kita sekarang dapat dengan jelas menganalisis hubungan dan struktur di dalam knowledge graph.</p>
<pre><code translate="no" class="language-python">query_text = <span class="hljs-string">&quot;Tell me about NLP&quot;</span>
search_results = <span class="hljs-keyword">await</span> cognee.search(SearchType.INSIGHTS, query_text=query_text)

<span class="hljs-keyword">for</span> result_text <span class="hljs-keyword">in</span> search_results:
    <span class="hljs-built_in">print</span>(result_text)

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># ({&#x27;id&#x27;: UUID(&#x27;bc338a39-64d6-549a-acec-da60846dd90d&#x27;), &#x27;updated_at&#x27;: datetime.datetime(2024, 11, 21, 12, 23, 1, 211808, tzinfo=datetime.timezone.utc), &#x27;name&#x27;: &#x27;natural language processing&#x27;, &#x27;description&#x27;: &#x27;An interdisciplinary subfield of computer science and information retrieval.&#x27;}, {&#x27;relationship_name&#x27;: &#x27;is_a_subfield_of&#x27;, &#x27;source_node_id&#x27;: UUID(&#x27;bc338a39-64d6-549a-acec-da60846dd90d&#x27;), &#x27;target_node_id&#x27;: UUID(&#x27;6218dbab-eb6a-5759-a864-b3419755ffe0&#x27;), &#x27;updated_at&#x27;: datetime.datetime(2024, 11, 21, 12, 23, 15, 473137, tzinfo=datetime.timezone.utc)}, {&#x27;id&#x27;: UUID(&#x27;6218dbab-eb6a-5759-a864-b3419755ffe0&#x27;), &#x27;updated_at&#x27;: datetime.datetime(2024, 11, 21, 12, 23, 1, 211808, tzinfo=datetime.timezone.utc), &#x27;name&#x27;: &#x27;computer science&#x27;, &#x27;description&#x27;: &#x27;The study of computation and information processing.&#x27;})</span>
<span class="hljs-comment"># (...)</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># It represents nodes and relationships in the knowledge graph:</span>
<span class="hljs-comment"># - The first element is the source node (e.g., &#x27;natural language processing&#x27;).</span>
<span class="hljs-comment"># - The second element is the relationship between nodes (e.g., &#x27;is_a_subfield_of&#x27;).</span>
<span class="hljs-comment"># - The third element is the target node (e.g., &#x27;computer science&#x27;).</span>
<button class="copy-code-btn"></button></code></pre>
<p>Output ini mewakili hasil dari kueri grafik pengetahuan, menampilkan entitas (node) dan hubungannya (edge) yang diekstrak dari dataset yang diproses. Setiap tupel mencakup entitas sumber, jenis hubungan, dan entitas target, bersama dengan metadata seperti ID unik, deskripsi, dan stempel waktu. Grafik menyoroti konsep-konsep utama dan hubungan semantiknya, memberikan pemahaman yang terstruktur tentang kumpulan data.</p>
<p>Selamat, Anda telah mempelajari penggunaan dasar cognee dengan Milvus. Jika Anda ingin mengetahui penggunaan cognee yang lebih lanjut, silakan lihat <a href="https://github.com/topoteretes/cognee">halaman</a> resminya.</p>
