---
id: yandex-cloud.md
title: Yandex CloudCompatible with Milvus 2.6.x
summary: >-
  Topik ini menjelaskan cara mengonfigurasi dan menggunakan fungsi embedding
  Yandex Cloud di Milvus.
beta: Milvus 2.6.x
---
<h1 id="Yandex-Cloud" class="common-anchor-header">Yandex Cloud<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Yandex-Cloud" class="anchor-icon" translate="no">
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
    </button></h1><p>Topik ini menjelaskan cara mengonfigurasi dan menggunakan fungsi embedding Yandex Cloud di Milvus.</p>
<h2 id="Choose-an-embedding-model" class="common-anchor-header">Pilih model embedding<button data-href="#Choose-an-embedding-model" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus mendukung model vektorisasi teks Yandex Cloud AI Studio melalui penyedia <code translate="no">yc</code>. Pada parameter Fungsi, atur ` <code translate="no">model_name</code> ` ke URI model Yandex Cloud yang harus dipanggil oleh Milvus.</p>
<p>Misalnya, Yandex Text Embeddings untuk dokumen menggunakan URI model seperti <code translate="no">emb://&lt;folder_ID&gt;/text-search-doc/latest</code> dan mengembalikan vektor berdimensi 256. Untuk URI model dan dimensi yang tersedia, lihat <a href="https://aistudio.yandex.ru/docs/en/ai-studio/concepts/embeddings">Model vektorisasi teks</a>.</p>
<h2 id="Configure-credentials" class="common-anchor-header">Konfigurasikan kredensial<button data-href="#Configure-credentials" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus harus mengetahui kunci API Yandex Cloud Anda sebelum dapat meminta embeddings. Anda dapat mengonfigurasi kunci API di <code translate="no">milvus.yaml</code> atau melalui variabel lingkungan.</p>
<h3 id="Option-1-Configuration-file" class="common-anchor-header">Opsi 1: Berkas konfigurasi<button data-href="#Option-1-Configuration-file" class="anchor-icon" translate="no">
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
    </button></h3><p>Simpan kunci API Anda di <code translate="no">milvus.yaml</code> dan arahkan penyedia Yandex Cloud ke label kredensial.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-attr">yandex_apikey:</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_YC_API_KEY&gt;</span>

<span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">yc:</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">yandex_apikey</span>
        <span class="hljs-comment"># url: https://llm.api.cloud.yandex.net/foundationModels/v1/textEmbedding</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Option-2-Environment-variable" class="common-anchor-header">Opsi 2: Variabel lingkungan<button data-href="#Option-2-Environment-variable" class="anchor-icon" translate="no">
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
    </button></h3><p>Jika tidak ada kredensial yang sesuai yang dikonfigurasi di <code translate="no">milvus.yaml</code>, Milvus dapat membaca kunci API Yandex Cloud dari variabel lingkungan berikut:</p>
<table>
   <tr>
     <th><p>Variabel</p></th>
     <th><p>Wajib?</p></th>
     <th><p>Deskripsi</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">MILVUS_YC_API_KEY</code></p></td>
     <td><p>Ya</p></td>
     <td><p>Kunci API Yandex Cloud yang digunakan oleh layanan Milvus untuk memanggil Yandex Cloud AI Studio.</p></td>
   </tr>
</table>
<h2 id="Use-embedding-function" class="common-anchor-header">Gunakan fungsi embedding<button data-href="#Use-embedding-function" class="anchor-icon" translate="no">
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
    </button></h2><p>Setelah kredensial dikonfigurasi, tentukan skema dengan bidang teks masukan dan bidang vektor keluaran, lalu tambahkan Fungsi embedding Yandex Cloud ke skema tersebut.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Function, FunctionType

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

schema = client.create_schema()
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;document&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">9000</span>)
schema.add_field(<span class="hljs-string">&quot;dense&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">256</span>)

text_embedding_function = Function(
    name=<span class="hljs-string">&quot;yandex_cloud_embedding&quot;</span>,
    function_type=FunctionType.TEXTEMBEDDING,
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],
    output_field_names=[<span class="hljs-string">&quot;dense&quot;</span>],
    params={
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;yc&quot;</span>,
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;emb://&lt;folder_ID&gt;/text-search-doc/latest&quot;</span>,
        <span class="hljs-string">&quot;credential&quot;</span>: <span class="hljs-string">&quot;yandex_apikey&quot;</span>,
        <span class="hljs-string">&quot;dim&quot;</span>: <span class="hljs-string">&quot;256&quot;</span>,
    },
)

schema.add_function(text_embedding_function)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Yandex-Cloud-specific-parameters" class="common-anchor-header">Parameter khusus Yandex Cloud<button data-href="#Yandex-Cloud-specific-parameters" class="anchor-icon" translate="no">
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
    </button></h3><table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Wajib?</p></th>
     <th><p>Deskripsi</p></th>
     <th><p>Nilai / Contoh</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">provider</code></p></td>
     <td><p>Ya</p></td>
     <td><p>Penyedia model embedding yang akan digunakan.</p></td>
     <td><p><code translate="no">"yc"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">model_name</code></p></td>
     <td><p>Ya</p></td>
     <td><p>URI model Yandex Cloud yang akan dipanggil.</p></td>
     <td><p><code translate="no">"emb://&lt;folder_ID&gt;/text-search-doc/latest"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">credential</code></p></td>
     <td><p>Tidak</p></td>
     <td><p>Label kredensial yang didefinisikan di bagian tingkat atas <code translate="no">credential:</code> dari <code translate="no">milvus.yaml</code>.</p></td>
     <td><p><code translate="no">"yandex_apikey"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dim</code></p></td>
     <td><p>Tidak</p></td>
     <td><p>Dimensi vektor keluaran. Jika ditetapkan, nilainya harus sesuai dengan dimensi bidang vektor keluaran.</p></td>
     <td><p><code translate="no">"256"</code></p></td>
   </tr>
</table>
<h2 id="Next-steps" class="common-anchor-header">Langkah selanjutnya<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
    </button></h2><p>Setelah mengonfigurasi fungsi embedding, lihat <a href="/docs/id/embedding-function-overview.md">Ikhtisar Fungsi Embedding</a> untuk panduan mengenai pembuatan indeks, penyisipan data, dan menjalankan pencarian semantik.</p>
