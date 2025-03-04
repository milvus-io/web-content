---
id: ETL_using_vectorETL.md
summary: >-
  Dalam tutorial ini, kita akan mengeksplorasi cara memuat data secara efisien
  ke dalam Milvus menggunakan [VectorETL]
  (https://github.com/ContextData/VectorETL), sebuah kerangka kerja ETL ringan
  yang dirancang untuk database vektor. VectorETL menyederhanakan proses
  mengekstraksi data dari berbagai sumber, mengubahnya menjadi embedding vektor
  menggunakan model AI, dan menyimpannya di Milvus untuk pengambilan yang cepat
  dan terukur. Pada akhir tutorial ini, Anda akan memiliki pipeline ETL yang
  berfungsi yang memungkinkan Anda untuk mengintegrasikan dan mengelola sistem
  pencarian vektor dengan mudah. Mari kita mulai belajar!
title: Memuat Data yang Efisien ke dalam Milvus dengan VectorETL
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/ETL_using_vectorETL.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/ETL_using_vectorETL.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Efficient-Data-Loading-into-Milvus-with-VectorETL" class="common-anchor-header">Memuat Data yang Efisien ke dalam Milvus dengan VectorETL<button data-href="#Efficient-Data-Loading-into-Milvus-with-VectorETL" class="anchor-icon" translate="no">
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
    </button></h1><p>Dalam tutorial ini, kita akan mengeksplorasi cara memuat data secara efisien ke dalam Milvus menggunakan <a href="https://github.com/ContextData/VectorETL">VectorETL</a>, sebuah kerangka kerja ETL ringan yang dirancang untuk database vektor. VectorETL menyederhanakan proses mengekstraksi data dari berbagai sumber, mengubahnya menjadi embedding vektor menggunakan model AI, dan menyimpannya di Milvus untuk pengambilan yang cepat dan dapat diskalakan. Pada akhir tutorial ini, Anda akan memiliki pipeline ETL yang berfungsi yang memungkinkan Anda untuk mengintegrasikan dan mengelola sistem pencarian vektor dengan mudah. Mari kita mulai belajar!</p>
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
    </button></h2><h3 id="Dependency-and-Environment" class="common-anchor-header">Ketergantungan dan Lingkungan</h3><pre><code translate="no" class="language-shell">$ pip install --upgrade vector-etl pymilvus
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Jika Anda menggunakan Google Colab, untuk mengaktifkan dependensi yang baru saja diinstal, Anda mungkin perlu <strong>memulai ulang runtime</strong> (klik menu "Runtime" di bagian atas layar, dan pilih "Restart session" dari menu tarik-turun).</p>
</div>
<p>VectorETL mendukung berbagai sumber data, termasuk Amazon S3, Google Cloud Storage, File Lokal, dll. Anda dapat melihat daftar lengkap sumber yang didukung <a href="https://github.com/ContextData/VectorETL?tab=readme-ov-file#source-configuration">di sini</a>. Dalam tutorial ini, kita akan fokus pada Amazon S3 sebagai contoh sumber data.</p>
<p>Kita akan memuat dokumen dari Amazon S3. Oleh karena itu, Anda perlu menyiapkan <code translate="no">AWS_ACCESS_KEY_ID</code> dan <code translate="no">AWS_SECRET_ACCESS_KEY</code> sebagai variabel lingkungan untuk mengakses bucket S3 dengan aman. Selain itu, kita akan menggunakan model penyematan <code translate="no">text-embedding-ada-002</code> dari OpenAI untuk menghasilkan penyematan data. Anda juga harus menyiapkan <a href="https://platform.openai.com/docs/quickstart">kunci api</a> <code translate="no">OPENAI_API_KEY</code> sebagai variabel lingkungan.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;your-openai-api-key&quot;</span>
os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;AWS_ACCESS_KEY_ID&quot;</span>] = <span class="hljs-string">&quot;your-aws-access-key-id&quot;</span>
os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;AWS_SECRET_ACCESS_KEY&quot;</span>] = <span class="hljs-string">&quot;your-aws-secret-access-key&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Workflow" class="common-anchor-header">Alur kerja<button data-href="#Workflow" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Defining-the-Data-Source-Amazon-S3" class="common-anchor-header">Menentukan Sumber Data (Amazon S3)</h3><p>Dalam kasus ini, kita mengekstrak dokumen dari bucket Amazon S3. VectorETL memungkinkan kita untuk menentukan nama bucket, jalur ke file, dan jenis data yang sedang kita kerjakan.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">source</span> = {
    <span class="hljs-string">&quot;source_data_type&quot;</span>: <span class="hljs-string">&quot;Amazon S3&quot;</span>,
    <span class="hljs-string">&quot;bucket_name&quot;</span>: <span class="hljs-string">&quot;my-bucket&quot;</span>,
    <span class="hljs-string">&quot;key&quot;</span>: <span class="hljs-string">&quot;path/to/files/&quot;</span>,
    <span class="hljs-string">&quot;file_type&quot;</span>: <span class="hljs-string">&quot;.csv&quot;</span>,
    <span class="hljs-string">&quot;aws_access_key_id&quot;</span>: os.environ[<span class="hljs-string">&quot;AWS_ACCESS_KEY_ID&quot;</span>],
    <span class="hljs-string">&quot;aws_secret_access_key&quot;</span>: os.environ[<span class="hljs-string">&quot;AWS_SECRET_ACCESS_KEY&quot;</span>],
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Configuring-the-Embedding-Model-OpenAI" class="common-anchor-header">Mengonfigurasi Model Penyematan (OpenAI)</h3><p>Setelah kita menyiapkan sumber data, kita perlu menentukan model penyematan yang akan mengubah data tekstual kita menjadi penyematan vektor. Di sini, kita menggunakan <code translate="no">text-embedding-ada-002</code> dari OpenAI dalam contoh ini.</p>
<pre><code translate="no" class="language-python">embedding = {
    <span class="hljs-string">&quot;embedding_model&quot;</span>: <span class="hljs-string">&quot;OpenAI&quot;</span>,
    <span class="hljs-string">&quot;api_key&quot;</span>: os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>],
    <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;text-embedding-ada-002&quot;</span>,
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Setting-Up-Milvus-as-the-Target-Database" class="common-anchor-header">Menyiapkan Milvus sebagai Basis Data Target</h3><p>Kita perlu menyimpan embedding yang dihasilkan di Milvus. Di sini, kita mendefinisikan parameter koneksi Milvus menggunakan Milvus Lite.</p>
<pre><code translate="no" class="language-python">target = {
    <span class="hljs-string">&quot;target_database&quot;</span>: <span class="hljs-string">&quot;Milvus&quot;</span>,
    <span class="hljs-string">&quot;host&quot;</span>: <span class="hljs-string">&quot;./milvus.db&quot;</span>,  <span class="hljs-comment"># os.environ[&quot;ZILLIZ_CLOUD_PUBLIC_ENDPOINT&quot;] if using Zilliz Cloud</span>
    <span class="hljs-string">&quot;api_key&quot;</span>: <span class="hljs-string">&quot;&quot;</span>,  <span class="hljs-comment"># os.environ[&quot;ZILLIZ_CLOUD_TOKEN&quot;] if using Zilliz Cloud</span>
    <span class="hljs-string">&quot;collection_name&quot;</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-string">&quot;vector_dim&quot;</span>: <span class="hljs-number">1536</span>,  <span class="hljs-comment"># 1536 for text-embedding-ada-002</span>
}
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Untuk <code translate="no">host</code> dan <code translate="no">api_key</code>:</p>
<ul>
<li><p>Menetapkan <code translate="no">host</code> sebagai file lokal, misalnya<code translate="no">./milvus.db</code>, dan membiarkan <code translate="no">api_key</code> kosong adalah metode yang paling mudah, karena secara otomatis menggunakan <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> untuk menyimpan semua data dalam file ini.</p></li>
<li><p>Jika Anda memiliki data berskala besar, Anda dapat menyiapkan server Milvus yang lebih berkinerja tinggi pada <a href="https://milvus.io/docs/quickstart.md">docker atau kubernetes</a>. Dalam pengaturan ini, silakan gunakan uri server, misalnya<code translate="no">http://localhost:19530</code>, sebagai <code translate="no">host</code> dan biarkan <code translate="no">api_key</code> kosong.</p></li>
<li><p>Jika Anda ingin menggunakan <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, layanan cloud yang dikelola sepenuhnya untuk Milvus, sesuaikan <code translate="no">host</code> dan <code translate="no">api_key</code>, yang sesuai dengan <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">kunci Public Endpoint dan Api</a> di Zilliz Cloud.</p></li>
</ul>
</div>
<h3 id="Specifying-Columns-for-Embedding" class="common-anchor-header">Menentukan Kolom untuk Penyematan</h3><p>Sekarang, kita perlu menentukan kolom mana dari file CSV kita yang akan dikonversi menjadi embedding. Hal ini memastikan bahwa hanya kolom teks yang relevan yang akan diproses, mengoptimalkan efisiensi dan penyimpanan.</p>
<pre><code translate="no" class="language-python">embed_columns = [<span class="hljs-string">&quot;col_1&quot;</span>, <span class="hljs-string">&quot;col_2&quot;</span>, <span class="hljs-string">&quot;col_3&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Creating-and-Executing-the-VectorETL-Pipeline" class="common-anchor-header">Membuat dan Menjalankan Pipeline VectorETL</h3><p>Dengan semua konfigurasi yang ada, kita sekarang menginisialisasi pipeline ETL, mengatur aliran data, dan menjalankannya.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> vector_etl <span class="hljs-keyword">import</span> create_flow

flow = create_flow()
flow.set_source(source)
flow.set_embedding(embedding)
flow.set_target(target)
flow.set_embed_columns(embed_columns)

<span class="hljs-comment"># Execute the flow</span>
flow.execute()
<button class="copy-code-btn"></button></code></pre>
<p>Dengan mengikuti tutorial ini, kita telah berhasil membangun pipeline ETL end-to-end untuk memindahkan dokumen dari Amazon S3 ke Milvus menggunakan VectorETL. VectorETL memiliki sumber data yang fleksibel, sehingga Anda dapat memilih sumber data apa pun yang Anda sukai berdasarkan kebutuhan aplikasi spesifik Anda. Dengan desain modular VectorETL, Anda dapat dengan mudah memperluas pipeline ini untuk mendukung sumber data lain, menyematkan model, menjadikannya alat yang ampuh untuk AI dan alur kerja rekayasa data!</p>
