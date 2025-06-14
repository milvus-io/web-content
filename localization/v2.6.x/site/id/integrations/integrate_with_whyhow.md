---
id: integrate_with_whyhow.md
summary: >-
  Panduan ini mendemonstrasikan cara menggunakan whyhow.ai dan Milvus Lite untuk
  melakukan Rule-based Retrieval.
title: Mengintegrasikan Milvus dengan WhyHow
---
<h1 id="Integrate-Milvus-with-WhyHow" class="common-anchor-header">Mengintegrasikan Milvus dengan WhyHow<button data-href="#Integrate-Milvus-with-WhyHow" class="anchor-icon" translate="no">
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
    </button></h1><p>Panduan ini mendemonstrasikan cara menggunakan whyhow.ai dan Milvus Lite untuk melakukan Rule-based Retrieval.</p>
<h2 id="Overview" class="common-anchor-header">Gambaran Umum<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>WhyHow adalah platform yang menyediakan blok bangunan yang dibutuhkan pengembang untuk mengatur, mengontekstualisasikan, dan mengambil data tidak terstruktur secara andal untuk melakukan RAG yang kompleks. Paket Rule-based Retrieval adalah paket Python yang dikembangkan oleh WhyHow yang memungkinkan orang untuk membuat dan mengelola aplikasi Retrieval Augmented Generation (RAG) dengan kemampuan pemfilteran tingkat lanjut.</p>
<h2 id="Installation" class="common-anchor-header">Instalasi<button data-href="#Installation" class="anchor-icon" translate="no">
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
    </button></h2><p>Sebelum memulai, silakan instal semua paket python yang diperlukan untuk digunakan nanti.</p>
<pre><code translate="no" class="language-shell">pip install --upgrade pymilvus, whyhow_rbr
<button class="copy-code-btn"></button></code></pre>
<p>Selanjutnya, kita perlu menginisialisasi klien Milvus untuk mengimplementasikan Rule-based Retrieval dengan menggunakan Milvus Lite.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Milvus Lite local path</span>
path=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span> <span class="hljs-comment"># random name for local milvus lite db path</span>

<span class="hljs-comment"># Initialize the ClientMilvus</span>
milvus_client = ClientMilvus(path)
<button class="copy-code-btn"></button></code></pre>
<p>Anda juga dapat menginisialisasi klien Milvus melalui Milvus Cloud</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Milvus Cloud credentials</span>
YOUR_MILVUS_CLOUD_END_POINT = <span class="hljs-string">&quot;YOUR_MILVUS_CLOUD_END_POINT&quot;</span>
YOUR_MILVUS_CLOUD_TOKEN = <span class="hljs-string">&quot;YOUR_MILVUS_CLOUD_TOKEN&quot;</span>

<span class="hljs-comment"># Initialize the ClientMilvus</span>
milvus_client = ClientMilvus(
        milvus_uri=YOUR_MILVUS_CLOUD_END_POINT, 
        milvus_token=YOUR_MILVUS_CLOUD_TOKEN,
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Create-Collection" class="common-anchor-header">Membuat Koleksi<button data-href="#Create-Collection" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Defining-necessary-variables" class="common-anchor-header">Mendefinisikan variabel yang diperlukan</h3><pre><code translate="no" class="language-python"><span class="hljs-comment"># Define collection name</span>
COLLECTION_NAME=<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span> <span class="hljs-comment"># take your own collection name</span>

<span class="hljs-comment"># Define vector dimension size</span>
DIMENSION=<span class="hljs-number">1536</span> <span class="hljs-comment"># decide by the model you use</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-schema" class="common-anchor-header">Menambahkan skema</h3><p>Sebelum memasukkan data ke dalam database Milvus Lite, kita perlu mendefinisikan field data terlebih dahulu, yang disebut schema di sini. Dengan membuat objek <code translate="no">CollectionSchema</code> dan menambahkan data field melalui <code translate="no">add_field()</code>, kita dapat mengontrol tipe data dan karakteristiknya. Langkah ini wajib dilakukan sebelum memasukkan data apapun ke dalam Milvus.</p>
<pre><code translate="no" class="language-python">schema = milvus_client.create_schema(auto_id=<span class="hljs-literal">True</span>) <span class="hljs-comment"># Enable id matching</span>

schema = milvus_client.add_field(schema=schema, field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema = milvus_client.add_field(schema=schema, field_name=<span class="hljs-string">&quot;embedding&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=DIMENSION)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-index" class="common-anchor-header">Membuat indeks</h3><p>Untuk setiap skema, akan lebih baik jika kita memiliki sebuah indeks agar proses query menjadi lebih efisien. Untuk membuat indeks, pertama-tama kita membutuhkan sebuah <code translate="no">index_params</code> dan kemudian menambahkan lebih banyak data indeks pada objek <code translate="no">IndexParams</code> ini.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Start to indexing data field</span>
index_params = milvus_client.prepare_index_params()
index_params = milvus_client.add_index(
    index_params=index_params,  <span class="hljs-comment"># pass in index_params object</span>
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,  <span class="hljs-comment"># use autoindex instead of other complex indexing method</span>
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,  <span class="hljs-comment"># L2, COSINE, or IP</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Metode ini merupakan pembungkus tipis dari implementasi resmi Milvus<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/add_index.md">(dokumen resmi)</a>.</p>
<h3 id="Create-collection" class="common-anchor-header">Membuat koleksi</h3><p>Setelah mendefinisikan semua field data dan mengindeksnya, sekarang kita perlu membuat koleksi basis data kita sehingga kita dapat mengakses data kita dengan cepat dan tepat. Yang perlu disebutkan adalah bahwa kita menginisialisasi <code translate="no">enable_dynamic_field</code> menjadi true sehingga Anda dapat mengunggah data apa pun dengan bebas. Konsekuensinya adalah permintaan data mungkin tidak efisien.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create Collection</span>
milvus_client.create_collection(
    collection_name=COLLECTION_NAME,
    schema=schema,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Upload-documents" class="common-anchor-header">Mengunggah dokumen<button data-href="#Upload-documents" class="anchor-icon" translate="no">
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
    </button></h2><p>Setelah membuat koleksi, kita siap untuk mengisinya dengan dokumen. Di <code translate="no">whyhow_rbr</code>, hal ini dilakukan dengan menggunakan metode <code translate="no">upload_documents</code> dari <code translate="no">MilvusClient</code>. Metode ini melakukan langkah-langkah berikut ini:</p>
<ul>
<li><strong>Pemrosesan awal</strong>: Membaca dan membagi file PDF yang disediakan menjadi beberapa bagian</li>
<li><strong>Penyematan</strong>: Menyematkan semua potongan menggunakan model OpenAI</li>
<li><strong>Memasukkan</strong>: Mengunggah penyematan dan metadata ke Milvus Lite</li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># get pdfs</span>
pdfs = [<span class="hljs-string">&quot;harry-potter.pdf&quot;</span>, <span class="hljs-string">&quot;game-of-thrones.pdf&quot;</span>] <span class="hljs-comment"># replace to your pdfs path</span>

<span class="hljs-comment"># Uploading the PDF document</span>
milvus_client.upload_documents(
    collection_name=COLLECTION_NAME,
    documents=pdfs
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Question-answering" class="common-anchor-header">Menjawab pertanyaan<button data-href="#Question-answering" class="anchor-icon" translate="no">
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
    </button></h2><p>Sekarang kita akhirnya dapat beralih ke pengambilan augmented generation.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Search data and implement RAG!</span>
res = milvus_client.search(
    question=<span class="hljs-string">&#x27;What food does Harry Potter like to eat?&#x27;</span>,
    collection_name=COLLECTION_NAME,
    anns_field=<span class="hljs-string">&#x27;embedding&#x27;</span>,
    output_fields=<span class="hljs-string">&#x27;text&#x27;</span>
)
<span class="hljs-built_in">print</span>(res[<span class="hljs-string">&#x27;answer&#x27;</span>])
<span class="hljs-built_in">print</span>(res[<span class="hljs-string">&#x27;matches&#x27;</span>])
<button class="copy-code-btn"></button></code></pre>
<h3 id="Rules" class="common-anchor-header">Aturan</h3><p>Pada contoh sebelumnya, setiap dokumen dalam indeks kita dipertimbangkan. Namun, kadang-kadang mungkin bermanfaat untuk hanya mengambil dokumen yang memenuhi beberapa kondisi yang telah ditentukan (misalnya <code translate="no">filename=harry-potter.pdf</code>). Di <code translate="no">whyhow_rbr</code> melalui Milvus Lite, hal ini dapat dilakukan dengan menyesuaikan parameter pencarian.</p>
<p>Sebuah aturan dapat mengontrol atribut metadata berikut ini</p>
<ul>
<li><code translate="no">filename</code> nama berkas</li>
<li><code translate="no">page_numbers</code> daftar bilangan bulat yang berhubungan dengan nomor halaman (pengindeksan 0)</li>
<li><code translate="no">id</code> pengenal unik dari sebuah potongan (ini adalah filter yang paling "ekstrem")</li>
<li>Aturan lain yang didasarkan pada <a href="https://milvus.io/docs/boolean.md">Ekspresi Boolean</a></li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># RULES(search on book harry-potter on page 8):</span>
PARTITION_NAME=<span class="hljs-string">&#x27;harry-potter&#x27;</span> <span class="hljs-comment"># search on books</span>
page_number=<span class="hljs-string">&#x27;page_number == 8&#x27;</span>

<span class="hljs-comment"># first create a partitions to store the book and later search on this specific partition:</span>
milvus_client.crate_partition(
    collection_name=COLLECTION_NAME,
    partition_name=PARTITION_NAME <span class="hljs-comment"># separate base on your pdfs type</span>
)

<span class="hljs-comment"># search with rules</span>
res = milvus_client.search(
    question=<span class="hljs-string">&#x27;Tell me about the greedy method&#x27;</span>,
    collection_name=COLLECTION_NAME,
    partition_names=PARTITION_NAME,
    <span class="hljs-built_in">filter</span>=page_number, <span class="hljs-comment"># append any rules follow the Boolean Expression Rule</span>
    anns_field=<span class="hljs-string">&#x27;embedding&#x27;</span>,
    output_fields=<span class="hljs-string">&#x27;text&#x27;</span>
)
<span class="hljs-built_in">print</span>(res[<span class="hljs-string">&#x27;answer&#x27;</span>])
<span class="hljs-built_in">print</span>(res[<span class="hljs-string">&#x27;matches&#x27;</span>])
<button class="copy-code-btn"></button></code></pre>
<p>Dalam contoh ini, pertama-tama kita membuat partisi yang menyimpan pdf yang berhubungan dengan Harry Potter, dan melalui pencarian di dalam partisi ini, kita dapat memperoleh informasi yang paling langsung. Selain itu, kami juga menerapkan nomor halaman sebagai filter untuk menentukan halaman yang ingin kami cari. Ingat, parameter filer harus mengikuti <a href="https://milvus.io/docs/boolean.md">aturan boolean</a>.</p>
<h3 id="Clean-up" class="common-anchor-header">Bersihkan</h3><p>Akhirnya, setelah menerapkan semua instruksi, Anda dapat membersihkan basis data dengan menghubungi <code translate="no">drop_collection()</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Clean up</span>
milvus_client.drop_collection(
    collection_name=COLLECTION_NAME
)
<button class="copy-code-btn"></button></code></pre>
