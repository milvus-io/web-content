---
id: dashscope-ranker.md
title: DashScope RankerCompatible with Milvus 2.6.x
summary: >-
  Topik ini menjelaskan cara mengonfigurasi dan menggunakan model reranking
  DashScope, seperti model reranking Qwen, di Milvus.
beta: Milvus 2.6.x
---
<h1 id="DashScope-Ranker" class="common-anchor-header">DashScope Ranker<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#DashScope-Ranker" class="anchor-icon" translate="no">
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
    </button></h1><p>DashScope Ranker memungkinkan Milvus memanggil model pengurutan ulang DashScope dari Alibaba Cloud untuk menyusun ulang hasil pencarian berdasarkan relevansi semantik.</p>
<h2 id="Prerequisites" class="common-anchor-header">Persyaratan<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Sebelum menggunakan DashScope Ranker, pastikan Anda memiliki:</p>
<ul>
<li><p>Sebuah koleksi Milvus dengan bidang " <code translate="no">VARCHAR</code> " yang berisi teks yang akan diurutkan ulang.</p></li>
<li><p>Kunci API DashScope yang valid.</p></li>
<li><p>Akses ke model pengurutan ulang DashScope, seperti <code translate="no">gte-rerank-v2</code>.</p></li>
</ul>
<p>Untuk model pengurutan ulang yang tersedia dan titik akhir regional, lihat <a href="https://www.alibabacloud.com/help/en/model-studio/text-rerank-api">API Pengurutan Ulang Teks</a> di <a href="https://www.alibabacloud.com/help/en/model-studio/text-rerank-api">Alibaba Cloud Model Studio</a>.</p>
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
    </button></h2><p>Milvus harus mengetahui kunci API DashScope Anda sebelum dapat meminta pengurutan ulang dari DashScope. Anda dapat mengonfigurasi kunci API di <code translate="no">milvus.yaml</code> atau melalui variabel lingkungan.</p>
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
    </button></h3><p>Simpan kunci API Anda di <code translate="no">milvus.yaml</code> dan arahkan penyedia reranking DashScope ke label kredensial.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-attr">dashscope_apikey:</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_DASHSCOPE_API_KEY&gt;</span>

<span class="hljs-attr">function:</span>
  <span class="hljs-attr">rerank:</span>
    <span class="hljs-attr">model:</span>
      <span class="hljs-attr">providers:</span>
        <span class="hljs-attr">ali:</span>
          <span class="hljs-attr">credential:</span> <span class="hljs-string">dashscope_apikey</span>
          <span class="hljs-comment"># url: https://dashscope.aliyuncs.com/api/v1/services/rerank/text-rerank/text-rerank</span>
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
    </button></h3><p>Jika tidak ada kredensial yang cocok yang dikonfigurasi di <code translate="no">milvus.yaml</code>, Milvus dapat membaca kunci API DashScope dari variabel lingkungan berikut:</p>
<table>
   <tr>
     <th><p>Variabel</p></th>
     <th><p>Diperlukan?</p></th>
     <th><p>Deskripsi</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">MILVUS_DASHSCOPE_API_KEY</code></p></td>
     <td><p>Ya</p></td>
     <td><p>Kunci API DashScope yang digunakan oleh layanan Milvus untuk memanggil Alibaba Cloud DashScope.</p></td>
   </tr>
</table>
<h2 id="Create-a-DashScope-ranker-function" class="common-anchor-header">Buat fungsi pemeringkat DashScope<button data-href="#Create-a-DashScope-ranker-function" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk menggunakan DashScope Ranker, buat objek Function yang menentukan model pengurutan ulang DashScope dan teks kueri. Gunakan <code translate="no">provider: &quot;ali&quot;</code> untuk pengurutan ulang DashScope.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType

dashscope_ranker = Function(
    name=<span class="hljs-string">&quot;dashscope_semantic_ranker&quot;</span>,
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],
    function_type=FunctionType.RERANK,
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;model&quot;</span>,
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;ali&quot;</span>,
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;gte-rerank-v2&quot;</span>,
        <span class="hljs-string">&quot;queries&quot;</span>: [<span class="hljs-string">&quot;renewable energy developments&quot;</span>],
        <span class="hljs-string">&quot;max_client_batch_size&quot;</span>: <span class="hljs-number">128</span>,
        <span class="hljs-string">&quot;credential&quot;</span>: <span class="hljs-string">&quot;dashscope_apikey&quot;</span>,
    },
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="DashScope-ranker-specific-parameters" class="common-anchor-header">Parameter khusus penentu peringkat DashScope<button data-href="#DashScope-ranker-specific-parameters" class="anchor-icon" translate="no">
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
     <td><p><code translate="no">reranker</code></p></td>
     <td><p>Ya</p></td>
     <td><p>Harus diatur ke <code translate="no">"model"</code> untuk mengaktifkan pemeringkatan ulang model.</p></td>
     <td><p><code translate="no">"model"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">provider</code></p></td>
     <td><p>Ya</p></td>
     <td><p>Penyedia layanan model yang akan digunakan untuk penentuan peringkat ulang. Untuk DashScope, gunakan <code translate="no">"ali"</code>.</p></td>
     <td><p><code translate="no">"ali"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">model_name</code></p></td>
     <td><p>Ya</p></td>
     <td><p>Model penentuan peringkat ulang DashScope yang akan digunakan.</p></td>
     <td><p><code translate="no">"gte-rerank-v2"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">queries</code></p></td>
     <td><p>Ya</p></td>
     <td><p>Daftar string kueri yang digunakan oleh model penentuan peringkat ulang untuk menghitung skor relevansi. Jumlah string kueri harus sesuai dengan jumlah kueri dalam permintaan pencarian.</p></td>
     <td><p><code translate="no">["renewable energy developments"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">max_client_batch_size</code></p></td>
     <td><p>Tidak</p></td>
     <td><p>Jumlah maksimum dokumen yang akan dikirim ke layanan model per permintaan.</p></td>
     <td><p><code translate="no">128</code> (default)</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">credential</code></p></td>
     <td><p>Tidak</p></td>
     <td><p>Label kredensial yang didefinisikan di bagian tingkat atas <code translate="no">credential:</code> pada <code translate="no">milvus.yaml</code>.</p></td>
     <td><p><code translate="no">"dashscope_apikey"</code></p></td>
   </tr>
</table>
<div class="alert note">
<p>Untuk parameter umum yang digunakan bersama di semua pemeringkat model, seperti <code translate="no">provider</code> dan <code translate="no">queries</code>, lihat <a href="/docs/id/model-ranker-overview.md#Create-a-model-ranker">Membuat pemeringkat model</a>.</p>
</div>
<h2 id="Apply-to-standard-vector-search" class="common-anchor-header">Terapkan ke pencarian vektor standar<button data-href="#Apply-to-standard-vector-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk menerapkan DashScope Ranker ke pencarian vektor standar, berikan fungsi ranker ke ` <code translate="no">search()</code>`.</p>
<pre><code translate="no" class="language-python">results = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection&quot;</span>,
    data=[your_query_vector],
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,
    limit=<span class="hljs-number">5</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>],
    ranker=dashscope_ranker,
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
