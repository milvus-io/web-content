---
id: alter-external-collection-schema.md
title: Mengubah Skema Koleksi EksternalCompatible with Milvus 3.0.x
summary: >-
  Pelajari cara menampilkan kolom tambahan dari sumber data eksternal dalam
  koleksi eksternal yang sudah ada.
beta: Milvus 3.0.x
---
<h1 id="Alter-External-Collection-Schema" class="common-anchor-header">Mengubah Skema Koleksi Eksternal<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Alter-External-Collection-Schema" class="anchor-icon" translate="no">
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
    </button></h1><p>Sumber data eksternal sering kali mengalami perubahan setelah Anda membuat koleksi eksternal. Misalnya, tabel Lakehouse yang sudah menyimpan embeddings mungkin nantinya akan mencakup bidang skalar baru, seperti skor, kategori, atau cap waktu, yang ingin Anda tampilkan dalam hasil kueri atau gunakan dalam filter.</p>
<p>Daripada membuat ulang koleksi eksternal atau menyalin data sumber ke Milvus, tambahkan bidang Milvus yang dipetakan ke bidang yang sudah ada di sumber data eksternal. Setelah menambahkan bidang tersebut, segarkan koleksi eksternal agar bidang baru tersebut dapat digunakan dalam kueri dan pencarian.</p>
<h2 id="Limits" class="common-anchor-header">Batasan<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>Koleksi eksternal saat ini mendukung penambahan bidang setelah pembuatan. Perubahan skema lainnya, seperti menghapus bidang, mengganti nama bidang, mengubah tipe data bidang, mengubah dimensi vektor, atau memetakan ulang <code translate="no">external_field</code>, tidak didukung.</p></li>
<li><p>Anda hanya dapat menambahkan bidang yang sudah ada di sumber data eksternal. Operasi ini memetakan bidang eksternal yang sudah ada ke bidang Milvus. Operasi ini tidak membuat bidang baru di sumber data eksternal atau mengisi ulang data sumber.</p></li>
<li><p>Penambahan bidang <code translate="no">SPARSE_FLOAT_VECTOR</code> ke koleksi eksternal yang sudah ada tidak didukung.</p></li>
<li><p>Menambahkan bidang StructArray ke koleksi eksternal yang sudah ada tidak didukung. Jika koleksi eksternal Anda memerlukan bidang StructArray, tentukan bidang tersebut dalam skema koleksi saat Anda membuat koleksi.</p></li>
</ul>
<h2 id="Add-a-field" class="common-anchor-header">Menambahkan bidang<button data-href="#Add-a-field" class="anchor-icon" translate="no">
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
    </button></h2><p>Sebelum menambahkan bidang ke koleksi eksternal, pastikan bidang tersebut sudah ada di sumber data eksternal. Kemudian panggil ` <code translate="no">add_collection_field()</code> ` untuk menampilkan bidang tersebut di Milvus dengan mengatur ` <code translate="no">external_field</code> ` ke nama bidang di sumber data eksternal. Atur ` <code translate="no">data_type</code> ` ke tipe data Milvus yang sesuai dengan bidang di sumber data eksternal. Misalnya, jika bidang yang dipetakan menyimpan nilai presisi ganda, gunakan ` <code translate="no">DataType.DOUBLE</code>`.</p>
<p>Berbeda dengan koleksi terkelola, nilai untuk kolom yang ditambahkan dibaca dari sumber data eksternal setelah Anda menyegarkan koleksi eksternal.</p>
<h3 id="Add-a-scalar-field" class="common-anchor-header">Menambahkan bidang skalar<button data-href="#Add-a-scalar-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Gunakan ` <code translate="no">add_collection_field()</code> ` untuk menambahkan bidang skalar jika Anda ingin menampilkan bidang tersebut dalam hasil kueri atau menggunakannya dalam filter. Contoh berikut menambahkan bidang ` <code translate="no">score</code> ` yang dipetakan ke bidang ` <code translate="no">score</code> ` di sumber data eksternal.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

client.add_collection_field(
    collection_name=<span class="hljs-string">&quot;product_embeddings&quot;</span>,
    field_name=<span class="hljs-string">&quot;score&quot;</span>,
    data_type=DataType.DOUBLE,
    nullable=<span class="hljs-literal">True</span>,
<span class="highlighted-wrapper-line">    external_field=<span class="hljs-string">&quot;score&quot;</span>,</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Dalam contoh ini, ` <code translate="no">score</code> ` adalah nama bidang Milvus dan ` <code translate="no">external_field=&quot;score&quot;</code> ` memetakan bidang tersebut ke bidang ` <code translate="no">score</code> ` di sumber data eksternal. Tetapkan ` <code translate="no">nullable=True</code> ` karena bidang tersebut ditambahkan setelah koleksi telah dibuat.</p>
<h3 id="Add-a-vector-field" class="common-anchor-header">Menambahkan bidang vektor<button data-href="#Add-a-vector-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Anda juga dapat menambahkan bidang vektor jika sumber data eksternal sudah berisi nilai-nilai vektor. Atur vektor <code translate="no">data_type</code> dan <code translate="no">dim</code> agar sesuai dengan bidang vektor di sumber data eksternal.</p>
<p>Contoh berikut menambahkan bidang vektor padat bernama <code translate="no">image_embedding_v2</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

client.add_collection_field(
    collection_name=<span class="hljs-string">&quot;product_embeddings&quot;</span>,
    field_name=<span class="hljs-string">&quot;image_embedding_v2&quot;</span>,
    data_type=DataType.FLOAT_VECTOR,
<span class="highlighted-wrapper-line">    dim=<span class="hljs-number">768</span>,</span>
    nullable=<span class="hljs-literal">True</span>,
<span class="highlighted-wrapper-line">    external_field=<span class="hljs-string">&quot;image_embedding_v2&quot;</span>,</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Jika Anda berencana menjalankan pencarian vektor pada bidang vektor yang ditambahkan, buatlah indeks untuk bidang tersebut sebelum menyegarkan koleksi eksternal.</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;image_embedding_v2&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;product_embeddings&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Refresh-the-external-collection" class="common-anchor-header">Segarkan koleksi eksternal<button data-href="#Refresh-the-external-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Setelah mengubah skema koleksi eksternal, segarkan koleksi eksternal agar Milvus memperbarui metadata koleksi eksternal dan menerapkan perubahan skema tersebut pada hasil kueri, pencarian, dan penyaringan.</p>
<pre><code translate="no" class="language-python">client.refresh_external_collection(
    collection_name=<span class="hljs-string">&quot;product_embeddings&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
