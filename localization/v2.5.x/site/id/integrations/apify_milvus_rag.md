---
id: apify_milvus_rag.md
summary: >-
  Tutorial ini menjelaskan cara merayapi situs web menggunakan Perayap Konten
  Situs Web Apify dan menyimpan data ke dalam basis data vektor Milvus / Zilliz
  untuk kemudian digunakan untuk menjawab pertanyaan.
title: >-
  Pengambilan-Penambahan Generasi: Merayapi Situs Web dengan Apify dan Menyimpan
  Data ke Milvus untuk Menjawab Pertanyaan
---
<h1 id="Retrieval-Augmented-Generation-Crawling-Websites-with-Apify-and-Saving-Data-to-Milvus-for-Question-Answering" class="common-anchor-header">Pengambilan-Penambahan Generasi: Merayapi Situs Web dengan Apify dan Menyimpan Data ke Milvus untuk Menjawab Pertanyaan<button data-href="#Retrieval-Augmented-Generation-Crawling-Websites-with-Apify-and-Saving-Data-to-Milvus-for-Question-Answering" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/apify_milvus_rag.ipynb" target="_parent"><img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a></p>
<p>Tutorial ini menjelaskan cara merayapi situs web menggunakan Website Content Crawler dari Apify dan menyimpan datanya ke dalam basis data vektor Milvus/Zilliz untuk kemudian digunakan untuk menjawab pertanyaan.</p>
<p><a href="https://apify.com/">Apify</a> adalah platform web scraping dan ekstraksi data yang menawarkan pasar aplikasi dengan lebih dari dua ribu alat cloud siap pakai, yang dikenal sebagai Actors. Alat-alat ini ideal untuk kasus-kasus penggunaan seperti mengekstraksi data terstruktur dari situs web e-commerce, media sosial, mesin pencari, peta online, dan banyak lagi.</p>
<p>Misalnya, Aktor Perayap <a href="https://apify.com/apify/website-content-crawler">Konten Situs Web</a> dapat merayapi situs web secara mendalam, membersihkan HTML-nya dengan menghapus modal cookie, footer, atau navigasi, dan kemudian mengubah HTML tersebut menjadi Penurunan Harga.</p>
<p>Integrasi Apify untuk Milvus/Zilliz memudahkan untuk mengunggah data dari web ke database vektor.</p>
<h1 id="Before-you-begin" class="common-anchor-header">Sebelum memulai<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h1><p>Sebelum menjalankan buku catatan ini, pastikan Anda memiliki yang berikut ini:</p>
<ul>
<li><p>akun Apify dan <a href="https://docs.apify.com/platform/integrations/api">APIFY_API_TOKEN</a>.</p></li>
<li><p>akun OpenAI dan <a href="https://platform.openai.com/docs/quickstart">OPENAI_API_KEY</a></p></li>
<li><p><a href="https://cloud.zilliz.com">Akun Zilliz Cloud</a> (layanan cloud yang dikelola sepenuhnya untuk Milvus).</p></li>
<li><p>URI dan Token basis data Zilliz</p></li>
</ul>
<h2 id="Install-dependencies" class="common-anchor-header">Menginstal dependensi<button data-href="#Install-dependencies" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python">$ pip install --upgrade --quiet  apify==1.7.2 langchain-core==0.3.5 langchain-milvus==0.1.5 langchain-openai==0.2.0
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-up-Apify-and-Open-API-keys" class="common-anchor-header">Menyiapkan kunci Apify dan Open API<button data-href="#Set-up-Apify-and-Open-API-keys" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os
<span class="hljs-keyword">from</span> getpass <span class="hljs-keyword">import</span> getpass

os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;APIFY_API_TOKEN&quot;</span>] = <span class="hljs-title function_">getpass</span>(<span class="hljs-string">&quot;Enter YOUR APIFY_API_TOKEN&quot;</span>)
os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-title function_">getpass</span>(<span class="hljs-string">&quot;Enter YOUR OPENAI_API_KEY&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Enter YOUR APIFY_API_TOKEN··········
Enter YOUR OPENAI_API_KEY··········
</code></pre>
<h2 id="Set-up-MilvusZilliz-URI-token-and-collection-name" class="common-anchor-header">Menyiapkan URI, token, dan nama koleksi Milvus/Zilliz<button data-href="#Set-up-MilvusZilliz-URI-token-and-collection-name" class="anchor-icon" translate="no">
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
    </button></h2><p>Anda memerlukan URI dan Token Milvus/Zilliz Anda untuk menyiapkan klien.</p>
<ul>
<li>Jika Anda telah menempatkan server Milvus sendiri di <a href="https://milvus.io/docs/quickstart.md">Docker atau Kubernetes</a>, gunakan alamat dan port server sebagai uri Anda, misalnya<code translate="no">http://localhost:19530</code>. Jika Anda mengaktifkan fitur autentikasi pada Milvus, gunakan "&lt;nama pengguna Anda&gt;:&lt;kata sandi Anda&gt;" sebagai token, jika tidak, biarkan token sebagai string kosong.</li>
<li>Jika Anda menggunakan <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, layanan cloud yang dikelola sepenuhnya untuk Milvus, sesuaikan <code translate="no">uri</code> dan <code translate="no">token</code>, yang sesuai dengan <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">Public Endpoint dan API key</a> di Zilliz Cloud.</li>
</ul>
<p>Perhatikan bahwa koleksi tidak perlu ada sebelumnya. Koleksi ini akan secara otomatis dibuat ketika data diunggah ke database.</p>
<pre><code translate="no" class="language-python">os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;MILVUS_URI&quot;</span>] = <span class="hljs-title function_">getpass</span>(<span class="hljs-string">&quot;Enter YOUR MILVUS_URI&quot;</span>)
os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;MILVUS_TOKEN&quot;</span>] = <span class="hljs-title function_">getpass</span>(<span class="hljs-string">&quot;Enter YOUR MILVUS_TOKEN&quot;</span>)

<span class="hljs-variable constant_">MILVUS_COLLECTION_NAME</span> = <span class="hljs-string">&quot;apify&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Enter YOUR MILVUS_URI··········
Enter YOUR MILVUS_TOKEN··········
</code></pre>
<h2 id="Using-the-Website-Content-Crawler-to-scrape-text-content-from-Milvusio" class="common-anchor-header">Menggunakan Perayap Konten Situs Web untuk mengikis konten teks dari Milvus.io<button data-href="#Using-the-Website-Content-Crawler-to-scrape-text-content-from-Milvusio" class="anchor-icon" translate="no">
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
    </button></h2><p>Selanjutnya, kita akan menggunakan Website Content Crawler dengan Apify Python SDK. Kita akan mulai dengan mendefinisikan actor_id dan run_input, lalu menentukan informasi yang akan disimpan ke database vektor.</p>
<p><code translate="no">actor_id=&quot;apify/website-content-crawler&quot;</code> adalah pengenal untuk Website Content Crawler. Perilaku perayap dapat dikontrol sepenuhnya melalui parameter run_input (lihat <a href="https://apify.com/apify/website-content-crawler/input-schema">halaman input</a> untuk lebih jelasnya). Dalam contoh ini, kita akan merayapi dokumentasi Milvus, yang tidak memerlukan rendering JavaScript. Oleh karena itu, kita menetapkan <code translate="no">crawlerType=cheerio</code>, mendefinisikan <code translate="no">startUrls</code>, dan membatasi jumlah halaman yang dirayapi dengan menetapkan <code translate="no">maxCrawlPages=10</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> apify_client <span class="hljs-keyword">import</span> <span class="hljs-title class_">ApifyClient</span>

client = <span class="hljs-title class_">ApifyClient</span>(os.<span class="hljs-title function_">getenv</span>(<span class="hljs-string">&quot;APIFY_API_TOKEN&quot;</span>))

actor_id = <span class="hljs-string">&quot;apify/website-content-crawler&quot;</span>
run_input = {
    <span class="hljs-string">&quot;crawlerType&quot;</span>: <span class="hljs-string">&quot;cheerio&quot;</span>,
    <span class="hljs-string">&quot;maxCrawlPages&quot;</span>: <span class="hljs-number">10</span>,
    <span class="hljs-string">&quot;startUrls&quot;</span>: [{<span class="hljs-string">&quot;url&quot;</span>: <span class="hljs-string">&quot;https://milvus.io/&quot;</span>}, {<span class="hljs-string">&quot;url&quot;</span>: <span class="hljs-string">&quot;https://zilliz.com/&quot;</span>}],
}

actor_call = client.<span class="hljs-title function_">actor</span>(actor_id).<span class="hljs-title function_">call</span>(run_input=run_input)
<button class="copy-code-btn"></button></code></pre>
<p>Perayap Konten Situs Web akan merayapi situs secara menyeluruh hingga mencapai batas yang telah ditentukan yang ditetapkan oleh <code translate="no">maxCrawlPages</code>. Data yang di-crawl akan disimpan di <code translate="no">Dataset</code> pada platform Apify. Untuk mengakses dan menganalisis data ini, Anda dapat menggunakan plugin <code translate="no">defaultDatasetId</code></p>
<pre><code translate="no" class="language-python">dataset_id = actor_call[<span class="hljs-string">&quot;defaultDatasetId&quot;</span>]
dataset_id
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">'P9dLFfeJAljlePWnz'
</code></pre>
<p>Kode berikut ini mengambil data yang di-scrape dari Apify <code translate="no">Dataset</code> dan menampilkan situs web yang di-scrape pertama kali</p>
<pre><code translate="no" class="language-python">item = client.dataset(dataset_id).list_items(<span class="hljs-built_in">limit</span>=1).items
item[0].get(<span class="hljs-string">&quot;text&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">'The High-Performance Vector Database Built for Scale\nStart running Milvus in seconds\nfrom pymilvus import MilvusClient client = MilvusClient(&quot;milvus_demo.db&quot;) client.create_collection( collection_name=&quot;demo_collection&quot;, dimension=5 )\nDeployment Options to Match Your Unique Journey\nMilvus Lite\nLightweight, easy to start\nVectorDB-as-a-library runs in notebooks/ laptops with a pip install\nBest for learning and prototyping\nMilvus Standalone\nRobust, single-machine deployment\nComplete vector database for production or testing\nIdeal for datasets with up to millions of vectors\nMilvus Distributed\nScalable, enterprise-grade solution\nHighly reliable and distributed vector database with comprehensive toolkit\nScale horizontally to handle billions of vectors\nZilliz Cloud\nFully managed with minimal operations\nAvailable in both serverless and dedicated cluster\nSaaS and BYOC options for different security and compliance requirements\nTry Free\nLearn more about different Milvus deployment models\nLoved by GenAI developers\nBased on our research, Milvus was selected as the vector database of choice (over Chroma and Pinecone). Milvus is an open-source vector database designed specifically for similarity search on massive datasets of high-dimensional vectors.\nWith its focus on efficient vector similarity search, Milvus empowers you to build robust and scalable image retrieval systems. Whether you’re managing a personal photo library or developing a commercial image search application, Milvus offers a powerful foundation for unlocking the hidden potential within your image collections.\nBhargav Mankad\nSenior Solution Architect\nMilvus is a powerful vector database tailored for processing and searching extensive vector data. It stands out for its high performance and scalability, rendering it perfect for machine learning, deep learning, similarity search tasks, and recommendation systems.\nIgor Gorbenko\nBig Data Architect\nStart building your GenAI app now\nGuided with notebooks developed by us and our community\nRAG\nTry Now\nImage Search\nTry Now\nMultimodal Search\nTry Now\nUnstructured Data Meetups\nJoin a Community of Passionate Developers and Engineers Dedicated to Gen AI.\nRSVP now\nWhy Developers Prefer Milvus for Vector Databases\nScale as needed\nElastic scaling to tens of billions of vectors with distributed architecture.\nBlazing fast\nRetrieve data quickly and accurately with Global Index, regardless of scale.\nReusable Code\nWrite once, and deploy with one line of code into the production environment.\nFeature-rich\nMetadata filtering, hybrid search, multi-vector and more.\nWant to learn more about Milvus? View our documentation\nJoin the community of developers building GenAI apps with Milvus, now with over 25 million downloads\nGet Milvus Updates\nSubscribe to get updates on the latest Milvus releases, tutorials and training from Zilliz, the creator and key maintainer of Milvus.'
</code></pre>
<p>Untuk mengunggah data ke dalam basis data Milvus, kita menggunakan <a href="https://apify.com/apify/milvus-integration">integrasi Apify Milvus</a>. Pertama, kita perlu mengatur parameter untuk database Milvus. Selanjutnya, kita pilih field (<code translate="no">datasetFields</code>) yang ingin kita simpan di dalam database. Pada contoh di bawah ini, kita menyimpan field <code translate="no">text</code> dan <code translate="no">metadata.title</code>.</p>
<pre><code translate="no" class="language-python">milvus_integration_inputs = {
    <span class="hljs-string">&quot;milvusUri&quot;</span>: os.getenv(<span class="hljs-string">&quot;MILVUS_URI&quot;</span>),
    <span class="hljs-string">&quot;milvusToken&quot;</span>: os.getenv(<span class="hljs-string">&quot;MILVUS_TOKEN&quot;</span>),
    <span class="hljs-string">&quot;milvusCollectionName&quot;</span>: MILVUS_COLLECTION_NAME,
    <span class="hljs-string">&quot;datasetFields&quot;</span>: [<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;metadata.title&quot;</span>],
    <span class="hljs-string">&quot;datasetId&quot;</span>: actor_call[<span class="hljs-string">&quot;defaultDatasetId&quot;</span>],
    <span class="hljs-string">&quot;performChunking&quot;</span>: <span class="hljs-literal">True</span>,
    <span class="hljs-string">&quot;embeddingsApiKey&quot;</span>: os.getenv(<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>),
    <span class="hljs-string">&quot;embeddingsProvider&quot;</span>: <span class="hljs-string">&quot;OpenAI&quot;</span>,
}
<button class="copy-code-btn"></button></code></pre>
<p>Sekarang, kita akan memanggil <code translate="no">apify/milvus-integration</code> untuk menyimpan data</p>
<pre><code translate="no" class="language-python">actor_call = client.<span class="hljs-title function_">actor</span>(<span class="hljs-string">&quot;apify/milvus-integration&quot;</span>).<span class="hljs-title function_">call</span>(
    run_input=milvus_integration_inputs
)
<button class="copy-code-btn"></button></code></pre>
<p>Semua data yang telah dikikis sekarang tersimpan di dalam basis data Milvus dan siap untuk diambil dan menjawab pertanyaan</p>
<h1 id="Retrieval-and-LLM-generative-pipeline" class="common-anchor-header">Pengambilan dan pipeline generatif LLM<button data-href="#Retrieval-and-LLM-generative-pipeline" class="anchor-icon" translate="no">
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
    </button></h1><p>Selanjutnya, kita akan mendefinisikan pipeline yang ditambahi pengambilan menggunakan Langchain. Pipeline ini bekerja dalam dua tahap:</p>
<ul>
<li>Vectorstore (Milvus): Langchain mengambil dokumen yang relevan dari Milvus dengan mencocokkan sematan kueri dengan sematan dokumen yang tersimpan.</li>
<li>Tanggapan LLM: Dokumen yang diambil memberikan konteks untuk LLM (misalnya, GPT-4) untuk menghasilkan jawaban yang tepat.</li>
</ul>
<p>Untuk detail lebih lanjut tentang rantai RAG, silakan lihat <a href="https://python.langchain.com/v0.2/docs/tutorials/rag/">dokumentasi Langchain</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_core.output_parsers <span class="hljs-keyword">import</span> StrOutputParser
<span class="hljs-keyword">from</span> langchain_core.prompts <span class="hljs-keyword">import</span> PromptTemplate
<span class="hljs-keyword">from</span> langchain_core.runnables <span class="hljs-keyword">import</span> RunnablePassthrough
<span class="hljs-keyword">from</span> langchain_milvus.vectorstores <span class="hljs-keyword">import</span> Milvus
<span class="hljs-keyword">from</span> langchain_openai <span class="hljs-keyword">import</span> ChatOpenAI, OpenAIEmbeddings

embeddings = OpenAIEmbeddings(model=<span class="hljs-string">&quot;text-embedding-3-small&quot;</span>)

vectorstore = Milvus(
    connection_args={
        <span class="hljs-string">&quot;uri&quot;</span>: os.getenv(<span class="hljs-string">&quot;MILVUS_URI&quot;</span>),
        <span class="hljs-string">&quot;token&quot;</span>: os.getenv(<span class="hljs-string">&quot;MILVUS_TOKEN&quot;</span>),
    },
    embedding_function=embeddings,
    collection_name=MILVUS_COLLECTION_NAME,
)

prompt = PromptTemplate(
    input_variables=[<span class="hljs-string">&quot;context&quot;</span>, <span class="hljs-string">&quot;question&quot;</span>],
    template=<span class="hljs-string">&quot;Use the following pieces of retrieved context to answer the question. If you don&#x27;t know the answer, &quot;</span>
    <span class="hljs-string">&quot;just say that you don&#x27;t know. \nQuestion: {question} \nContext: {context} \nAnswer:&quot;</span>,
)


<span class="hljs-keyword">def</span> <span class="hljs-title function_">format_docs</span>(<span class="hljs-params">docs</span>):
    <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;\n\n&quot;</span>.join(doc.page_content <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> docs)


rag_chain = (
    {
        <span class="hljs-string">&quot;context&quot;</span>: vectorstore.as_retriever() | format_docs,
        <span class="hljs-string">&quot;question&quot;</span>: RunnablePassthrough(),
    }
    | prompt
    | ChatOpenAI(model=<span class="hljs-string">&quot;gpt-4o-mini&quot;</span>)
    | StrOutputParser()
)
<button class="copy-code-btn"></button></code></pre>
<p>Setelah kita memiliki data di dalam basis data, kita dapat mulai mengajukan pertanyaan</p>
<hr>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;What is Milvus database?&quot;</span>

rag_chain.<span class="hljs-title function_">invoke</span>(question)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">'Milvus is an open-source vector database specifically designed for billion-scale vector similarity search. It facilitates efficient management and querying of vector data, which is essential for applications involving unstructured data, such as AI and machine learning. Milvus allows users to perform operations like CRUD (Create, Read, Update, Delete) and vector searches, making it a powerful tool for handling large datasets.'
</code></pre>
<h1 id="Conclusion" class="common-anchor-header">Kesimpulan<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h1><p>Dalam tutorial ini, kami mendemonstrasikan cara merayapi konten situs web menggunakan Apify, menyimpan data dalam basis data vektor Milvus, dan menggunakan pipeline yang telah ditambahi pengambilan untuk melakukan tugas menjawab pertanyaan. Dengan menggabungkan kemampuan web scraping Apify dengan Milvus/Zilliz untuk penyimpanan vektor dan Langchain untuk model bahasa, Anda dapat membangun sistem pencarian informasi yang sangat efektif.</p>
<p>Untuk meningkatkan pengumpulan dan pembaruan data dalam database, integrasi Apify menawarkan <a href="https://apify.com/apify/milvus-integration#incrementally-update-database-from-the-website-content-crawler">pembaruan inkremental</a>, yang hanya memperbarui data baru atau data yang dimodifikasi berdasarkan checksum. Selain itu, integrasi ini dapat secara otomatis <a href="https://apify.com/apify/milvus-integration#delete-outdated-expired-data">menghapus</a> data <a href="https://apify.com/apify/milvus-integration#delete-outdated-expired-data">usang</a> yang belum dirayapi dalam waktu tertentu. Fitur-fitur ini membantu menjaga basis data vektor Anda tetap dioptimalkan dan memastikan bahwa pipeline yang telah ditingkatkan untuk pengambilan data Anda tetap efisien dan mutakhir dengan upaya manual yang minimal.</p>
<p>Untuk detail lebih lanjut tentang integrasi Apify-Milvus, silakan lihat <a href="https://docs.apify.com/platform/integrations/milvus">dokumentasi Apify Milvus</a> dan <a href="https://apify.com/apify/milvus-integration">file README integrasi</a>.</p>
