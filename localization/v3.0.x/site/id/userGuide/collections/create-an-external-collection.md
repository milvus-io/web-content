---
id: create-an-external-collection.md
title: Membuat Koleksi EksternalCompatible with Milvus 3.0.x
summary: >-
  Mengakses data di AWS S3 atau Iceberg melalui koleksi eksternal tanpa
  menyalinnya ke Milvus.
beta: Milvus 3.0.x
---
<h1 id="Create-an-External-Collection" class="common-anchor-header">Membuat Koleksi Eksternal<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Create-an-External-Collection" class="anchor-icon" translate="no">
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
    </button></h1><p>Koleksi eksternal adalah jenis koleksi data di Milvus yang mengakses data dari sistem penyimpanan eksternal seperti AWS S3 dan Iceberg tanpa menyalinnya ke dalam Milvus. Koleksi ini bertindak sebagai lapisan kueri di atas danau data dengan tetap menjaga kompatibilitas dengan antarmuka kueri Milvus.</p>
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
    </button></h2><p>Dalam pipeline data AI pada umumnya, pengguna mungkin sudah menyimpan data mereka dalam format Parquet atau format lain di sistem penyimpanan mereka, seperti AWS S3. Untuk membuat Milvus mengonsumsi data yang disimpan secara eksternal ini, pengguna biasanya perlu mengimpornya ke dalam penyimpanan Milvus sendiri menggunakan pipeline Extract-Transform-Load (ETL).</p>
<p>Alur kerja membawa data Anda ke Milvus ini menciptakan data yang berlebihan yang sulit untuk disinkronkan dan menambah beban pemeliharaan teknik untuk memastikan konsistensi data.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v3.0.x/assets/yqxwwpq3vheya4b8398cwopnnyn.png" alt="Yqxwwpq3vheya4b8398cwopnnyn" class="doc-image" id="yqxwwpq3vheya4b8398cwopnnyn" />
   </span> <span class="img-wrapper"> <span>Yqxwwpq3vheya4b8398cwopnnyn</span> </span></p>
<p>Untuk mengatasi masalah ini, Milvus menyediakan koleksi eksternal yang memungkinkan Anda mengakses data yang disimpan secara eksternal dari Milvus tanpa perlu mengkhawatirkan sinkronisasi data dan jalur ETL.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v3.0.x/assets/q6f4wtcd2h3pnkbnmxncw3urn3f.png" alt="Q6f4wtcd2h3pnkbnmxncw3urn3f" class="doc-image" id="q6f4wtcd2h3pnkbnmxncw3urn3f" />
   </span> <span class="img-wrapper"> <span>Q6f4wtcd2h3pnkbnmxncw3urn3f</span> </span></p>
<p>Setelah dibuat, koleksi eksternal dapat mengakses data Anda secara langsung dan menyimpannya di tempat yang sama dengan tempat Anda menyimpannya. Di latar belakang, Milvus membuat file manifes untuk merekam pemetaan antara metadata Milvus dan baris dalam file data eksternal. Setelah file manifes siap, Anda dapat membuat indeks di koleksi eksternal seperti yang Anda lakukan pada koleksi terkelola lainnya.</p>
<p>Ketika data Anda berubah, pemicu penyegaran sub-detik secara manual akan memperbarui metadata, sehingga Milvus selalu diperbarui.</p>
<h2 id="Limits--restrictions" class="common-anchor-header">Batasan &amp; larangan<button data-href="#Limits--restrictions" class="anchor-icon" translate="no">
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
    </button></h2><p>Karena Milvus tidak menyimpan data mentah dan hanya mempertahankan pemetaan antara metadata dan data mentah, koleksi eksternal hanya dapat dibaca. Itu berarti Anda tidak dapat menyisipkan, menambah, menghapus, mengimpor, memadatkan, dan memadatkan data di sisi Milvus.</p>
<p>Jika dibandingkan dengan koleksi terkelola, koleksi eksternal memiliki batasan sebagai berikut:</p>
<ul>
<li><p>Anda tidak dapat mengatur kunci utama dan atribut AutoID.</p></li>
<li><p>Anda tidak dapat mengaktifkan bidang dinamis.</p></li>
<li><p>Anda tidak dapat mengatur kunci partisi dan kunci pengelompokan, karena partisi tidak tersedia.</p></li>
<li><p>Anda tidak dapat mendefinisikan fungsi dalam skema.</p></li>
<li><p>Anda tidak dapat mengubah skema koleksi eksternal setelah Anda membuatnya.</p></li>
<li><p>Anda tidak dapat menggunakan pencocokan teks dengan BM25.</p></li>
<li><p>Anda harus melakukan operasi penyegaran sebelum membuat indeks.</p></li>
</ul>
<h2 id="Step-1-Create-schema" class="common-anchor-header">Langkah 1: Membuat skema<button data-href="#Step-1-Create-schema" class="anchor-icon" translate="no">
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
    </button></h2><p>Seperti halnya membuat koleksi terkelola, Anda juga perlu membuat skema sebelum membuat koleksi eksternal. Namun, skemanya sedikit berbeda dengan koleksi terkelola.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

schema = MilvusClient.create_schema(
    external_source=<span class="hljs-string">&#x27;s3://s3.&lt;region-id&gt;.amazonaws.com/&lt;bucket&gt;/&#x27;</span>,
    external_spec=<span class="hljs-string">&#x27;{
        &quot;format&quot;: &quot;parquet&quot;，
        &quot;extfs&quot;: {
            ...
        }
    }&#x27;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    client <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

schema := entity.NewSchema().
    WithName(<span class="hljs-string">&quot;product_embeddings&quot;</span>).
    WithExternalSource(<span class="hljs-string">&quot;s3://my-bucket/embeddings/&quot;</span>).
    WithExternalSpec(<span class="hljs-string">`{&quot;format&quot;: &quot;parquet&quot;, &quot;extfs&quot;: { ... }}`</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>Untuk membuat skema untuk koleksi eksternal, Anda perlu menentukan URI data sumber, format data, dan pengaturan autentikasi.</p>
<p><details summary="Authentication Options"></p>
<p>Anda memiliki opsi berikut ini untuk mengatur pengaturan autentikasi:</p>
<h3 id="Use-AWS-AKSK" class="common-anchor-header">Gunakan AWS AK/SK<button data-href="#Use-AWS-AKSK" class="anchor-icon" translate="no">
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
    </button></h3><p>Opsi ini berlaku untuk MinIO yang dihosting sendiri atau skenario di mana Anda memiliki AK/SK untuk bekerja.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;format&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;...&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;extfs&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;access_key_id&quot;</span><span class="hljs-punctuation">:</span>     <span class="hljs-string">&quot;AKIA..&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;access_key_value&quot;</span><span class="hljs-punctuation">:</span>  <span class="hljs-string">&quot;u4Lh...&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;region&quot;</span><span class="hljs-punctuation">:</span>            <span class="hljs-string">&quot;us-west-2&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;cloud_provider&quot;</span><span class="hljs-punctuation">:</span>    <span class="hljs-string">&quot;aws&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;use_ssl&quot;</span><span class="hljs-punctuation">:</span>           <span class="hljs-string">&quot;true&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;use_virtual_host&quot;</span><span class="hljs-punctuation">:</span>  <span class="hljs-string">&quot;true&quot;</span>
    <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Nama Parameter</p></th>
     <th><p>Deskripsi Parameter</p></th>
     <th><p>Nilai Contoh</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">format</code></p></td>
     <td><p>Format file data sumber target.</p><p>Nilai yang memungkinkan adalah <code translate="no">parquet</code>, <code translate="no">vortex</code>, <code translate="no">lance-table</code>, dan <code translate="no">iceberg-table</code>.</p></td>
     <td><p><code translate="no">parquet</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs</code></p></td>
     <td><p>Pengaturan sistem file eksternal dalam struktur JSON yang diurutkan.</p></td>
     <td><p>--</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.access_key_id</code></p></td>
     <td><p>ID kunci akses</p></td>
     <td><p><code translate="no">AKIA...</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.access_key_value</code></p></td>
     <td><p>Nilai kunci akses</p></td>
     <td><p><code translate="no">u7LH...</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.region</code></p></td>
     <td><p>ID wilayah cloud</p></td>
     <td><p><code translate="no">us-west-2</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.cloud_provider</code></p></td>
     <td><p>ID penyedia cloud</p></td>
     <td><p><code translate="no">aws</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.use_ssl</code></p></td>
     <td><p>Apakah SSL digunakan untuk membuat koneksi.</p></td>
     <td><p><code translate="no">true</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.use_virtual_host</code></p></td>
     <td><p>Apakah akan menggunakan hosting virtual untuk akses ke bucket Anda.</p><p>Untuk detailnya, lihat <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/VirtualHosting.html">artikel ini</a>.</p></td>
     <td><p><code translate="no">true</code></p></td>
   </tr>
</table>
<h3 id="Use-AWS-IAM" class="common-anchor-header">Gunakan AWS IAM<button data-href="#Use-AWS-IAM" class="anchor-icon" translate="no">
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
    </button></h3><p>Opsi ini berlaku untuk skenario di mana Milvus berjalan di instance EC2 atau cluster EKS. Dalam kasus ini, Anda tidak perlu meng-hardcode AK/SK.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;format&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;...&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;extfs&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;use_iam&quot;</span><span class="hljs-punctuation">:</span>           <span class="hljs-string">&quot;true&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;iam_endpoint&quot;</span><span class="hljs-punctuation">:</span>      <span class="hljs-string">&quot;https://sts.&lt;region&gt;.amazonaws.com&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;region&quot;</span><span class="hljs-punctuation">:</span>            <span class="hljs-string">&quot;us-west-2&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;cloud_provider&quot;</span><span class="hljs-punctuation">:</span>    <span class="hljs-string">&quot;aws&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;use_ssl&quot;</span><span class="hljs-punctuation">:</span>           <span class="hljs-string">&quot;true&quot;</span>
    <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Nama Parameter</p></th>
     <th><p>Deskripsi Parameter</p></th>
     <th><p>Contoh Nilai</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">format</code></p></td>
     <td><p>Format data sumber target.</p><p>Nilai yang mungkin adalah <code translate="no">parquet</code>, <code translate="no">vortex</code>, <code translate="no">lance-table</code>, dan <code translate="no">iceberg-table</code></p></td>
     <td><p><code translate="no">parquet</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs</code></p></td>
     <td><p>Pengaturan sistem file eksternal</p></td>
     <td><p>--</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.use_iam</code></p></td>
     <td><p>Apakah akan menggunakan AWS IAM.</p><p>Atur ini ke <code translate="no">"true"</code> untuk opsi ini.</p></td>
     <td><p><code translate="no">true</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.iam_endpoint</code></p></td>
     <td><p>Titik akhir AWS STS yang valid. </p><p>Untuk detailnya, lihat <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp_region-endpoints.html">artikel ini</a>.</p></td>
     <td><p><code translate="no">https:&ast;//&ast;sts.&lt;region&gt;.amazonaws.com</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.region</code></p></td>
     <td><p>ID wilayah cloud</p></td>
     <td><p><code translate="no">us-west-2</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.cloud_provider</code></p></td>
     <td><p>ID penyedia cloud</p></td>
     <td><p><code translate="no">aws</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.use_ssl</code></p></td>
     <td><p>Apakah SSL digunakan untuk membuat koneksi.</p></td>
     <td><p><code translate="no">true</code></p></td>
   </tr>
</table>
<h3 id="Use-Milvus-global-credentials" class="common-anchor-header">Gunakan kredensial global Milvus<button data-href="#Use-Milvus-global-credentials" class="anchor-icon" translate="no">
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
    </button></h3><p>Opsi ini berlaku ketika Anda menyimpan data eksternal di bucket Milvus, dan pengaturan MinIO global yang ditentukan di <code translate="no">milvus.yaml</code> dapat digunakan secara langsung untuk mengakses data.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;format&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;...&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;extfs&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;storage_type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;remote&quot;</span>
    <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Use-IAM-Role-ARN" class="common-anchor-header">Gunakan ARN Peran IAM<button data-href="#Use-IAM-Role-ARN" class="anchor-icon" translate="no">
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
    </button></h3><p>Opsi ini berlaku ketika organisasi Anda menggunakan akun AWS yang berbeda untuk mengelola cluster Milvus dan bucket yang menyimpan file data target.</p>
<p>Dalam kasus ini, pemilik bucket harus membuat peran IAM yang</p>
<ul>
<li><p>Melampirkan <code translate="no">AmazonS3FullAccess</code> atau kebijakan yang lebih terperinci untuk akses bucket.</p></li>
<li><p>Menyertakan <code translate="no">sts:ExternalId</code> yang ditentukan sendiri di bidang Kondisi pada Kebijakan Kepercayaan peran.</p></li>
</ul>
<p>Kemudian, pemilik bucket harus memberi Anda ARN peran IAM dan ID Eksternal sehingga Anda dapat memanggil <code translate="no">sts:AssumeRole</code> dengan nilai tersebut untuk mengasumsikan Peran IAM.</p>
<p>Berikut ini adalah contoh kebijakan izin yang akan dilampirkan ke peran IAM dengan izin yang diizinkan. Anda dapat menyesuaikan ini untuk memenuhi kebutuhan Anda.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;Version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2012-10-17&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;Statement&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;Effect&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Allow&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;Action&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
                <span class="hljs-string">&quot;s3:ListBucket&quot;</span><span class="hljs-punctuation">,</span>
                <span class="hljs-string">&quot;s3:GetBucketLocation&quot;</span>
            <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;Resource&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:s3:::SOURCE-DATA-BUCKET&quot;</span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;Effect&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Allow&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;Action&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
                <span class="hljs-string">&quot;s3:GetObject&quot;</span><span class="hljs-punctuation">,</span>
                <span class="hljs-string">&quot;s3:PutObject&quot;</span><span class="hljs-punctuation">,</span>
                <span class="hljs-string">&quot;s3:DeleteObject&quot;</span>
            <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;Resource&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:s3:::SOURCE-DATA-BUCKET/*&quot;</span>
        <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>Dan kebijakan kepercayaan yang terkait dengan peran IAM mendefinisikan siapa yang diizinkan untuk mengasumsikannya.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2012-10-17&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Statement&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Effect&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Allow&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Principal&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;AWS&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:iam::ACCOUNT_RUNNING_MILVUS:root&quot;</span>
      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Action&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;sts:AssumeRole&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Condition&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;StringEquals&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;sts:ExternalId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;YOUR_UNIQUE_EXTERNAL_ID&quot;</span>
        <span class="hljs-punctuation">}</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>Setelah Anda mendapatkan ARN Peran IAM dan ID Eksternal, Anda dapat mengatur parameter <code translate="no">external_spec</code> sebagai berikut:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;format&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;...&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;extfs&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;cloud_provider&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;aws&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;region&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;us-west-2&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;storage_type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;remote&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;use_ssl&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;true&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;use_iam&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;true&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;role_arn&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:iam::306787000000:role/lentitude-bucket-role&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;external_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;YOUR_UNIQUE_EXTERNAL_ID&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;load_frequency&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;900&quot;</span>
    <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Nama Parameter</p></th>
     <th><p>Deskripsi Parameter</p></th>
     <th><p>Contoh Nilai</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">format</code></p></td>
     <td><p>Format data sumber target.</p><p>Nilai yang mungkin adalah <code translate="no">parquet</code>, <code translate="no">vortex</code>, <code translate="no">lance-table</code>, dan <code translate="no">iceberg-table</code></p></td>
     <td><p><code translate="no">parquet</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs</code></p></td>
     <td><p>Pengaturan sistem file eksternal</p></td>
     <td><p>--</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.cloud_provider</code></p></td>
     <td><p>ID penyedia cloud</p></td>
     <td><p><code translate="no">aws</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.region</code></p></td>
     <td><p>ID wilayah cloud</p></td>
     <td><p><code translate="no">us-west-2</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.use_ssl</code></p></td>
     <td><p>Apakah SSL digunakan untuk membuat koneksi.</p></td>
     <td><p><code translate="no">true</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.use_iam</code></p></td>
     <td><p>Apakah akan menggunakan AWS IAM.</p><p>Setel ini ke <code translate="no">"true"</code> untuk opsi ini.</p></td>
     <td><p><code translate="no">true</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.role_arn</code></p></td>
     <td><p>IAM Role ARN yang diperoleh dari pemilik bucket.</p></td>
     <td><p><code translate="no">arn:aws:iam::306787000000:role/...</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.external_id</code></p></td>
     <td><p>ID eksternal yang diperoleh dari pemilik bucket.</p></td>
     <td><p>--</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.load_frequency</code></p></td>
     <td><p>Interval di mana Milvus mengambil kredensial autentikasi sementara dalam hitungan detik.</p></td>
     <td><p><code translate="no">900</code></p></td>
   </tr>
</table>
<p></details></p>
<h2 id="Step-2-Add-fields" class="common-anchor-header">Langkah 2: Menambahkan bidang<button data-href="#Step-2-Add-fields" class="anchor-icon" translate="no">
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
    </button></h2><p>Setelah skema siap, Anda dapat menambahkan bidang sebagai berikut:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;product_id&quot;</span>,
    datatype=DataType.INT64,
    <span class="hljs-comment"># highlight-next</span>
    external_field=<span class="hljs-string">&quot;id&quot;</span> <span class="hljs-comment"># field name in the external data file</span>
)

schema.add_field(
    field_name=<span class="hljs-string">&quot;product_name&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">256</span>,
    <span class="hljs-comment"># highlight-next</span>
    external_field=<span class="hljs-string">&quot;name&quot;</span>
)

schema.add_field(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">768</span>,
    <span class="hljs-comment"># highlight-next</span>
    external_field=<span class="hljs-string">&quot;vector&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    client <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

schema = schema.
    WithField(
        entity.NewField().
            WithName(<span class="hljs-string">&quot;product_id&quot;</span>).
            WithDataType(entity.FieldTypeInt64).
            WithExternalField(<span class="hljs-string">&quot;id&quot;</span>),
    ).
    WithField(
        entity.NewField().
            WithName(<span class="hljs-string">&quot;product_name&quot;</span>).
            WithDataType(entity.FieldTypeVarChar).
            WithMaxLength(<span class="hljs-number">512</span>).
            WithExternalField(<span class="hljs-string">&quot;name&quot;</span>),
    ).
    WithField(
        entity.NewField().
            WithName(<span class="hljs-string">&quot;embedding&quot;</span>).
            WithDataType(entity.FieldTypeFloatVector).
            WithDim(<span class="hljs-number">768</span>).
            WithExternalField(<span class="hljs-string">&quot;vector&quot;</span>),
    )
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-3-Create-a-collection" class="common-anchor-header">Langkah 3: Buat koleksi<button data-href="#Step-3-Create-a-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Setelah menambahkan semua bidang ke skema, Anda dapat membuat koleksi.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;test_collection&quot;</span>,
    schema=schema
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    client <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

milvusAddr := <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
token := <span class="hljs-string">&quot;root:Milvus&quot;</span>

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: milvusAddr,
    APIKey: token
})

err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;test_collection&quot;</span>, schema).
    WithIndexOptions(indexOptions...))

<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-4-Refresh-data" class="common-anchor-header">Langkah 4: Menyegarkan data<button data-href="#Step-4-Refresh-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Setelah koleksi siap, Anda perlu melakukan penyegaran untuk menyinkronkan metadata dari data Anda ke Milvus.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">job_id = client.refresh_external_collection(
    collection_name=<span class="hljs-string">&quot;test_collection&quot;</span>
)

<span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
    progress = client.get_refresh_external_collection_progress(job_id=job_id)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  <span class="hljs-subst">{progress.state}</span>: <span class="hljs-subst">{progress.progress}</span>%&quot;</span>)

    <span class="hljs-keyword">if</span> progress.state == <span class="hljs-string">&quot;RefreshCompleted&quot;</span>:
        elapsed = progress.end_time - progress.start_time
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Completed in <span class="hljs-subst">{elapsed}</span>ms&quot;</span>)
        <span class="hljs-keyword">return</span> job_id
    <span class="hljs-keyword">elif</span> progress.state == <span class="hljs-string">&quot;RefreshFailed&quot;</span>:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Failed: <span class="hljs-subst">{progress.reason}</span>&quot;</span>)
        <span class="hljs-keyword">return</span> job_id

    time.sleep(<span class="hljs-number">2</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">refreshResult, err := client.RefreshExternalCollection(ctx,
    client.NewRefreshExternalCollectionOption(<span class="hljs-string">&quot;test_collection&quot;</span>))

jobID := refreshResult.JobID

<span class="hljs-keyword">for</span> {
    progress, _ := client.GetRefreshExternalCollectionProgress(ctx,
        client.NewGetRefreshExternalCollectionProgressOption(jobID))

    fmt.Printf(<span class="hljs-string">&quot;State: %s\n&quot;</span>, progress.State)

    <span class="hljs-keyword">if</span> progress.State == entity.RefreshStateCompleted {
        fmt.Println(<span class="hljs-string">&quot;Refresh completed!&quot;</span>)
        <span class="hljs-keyword">break</span>
    }
    <span class="hljs-keyword">if</span> progress.State == entity.RefreshStateFailed {
        fmt.Printf(<span class="hljs-string">&quot;Refresh failed: %s\n&quot;</span>, progress.Reason)
        <span class="hljs-keyword">break</span>
    }
    time.Sleep(<span class="hljs-number">2</span> * time.Second)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>Operasi penyegaran bersifat asinkron, jadi Anda perlu menyiapkan iterasi untuk memantau kemajuannya.</p>
<div class="alert note">
<ul>
<li><p>Operasi penyegaran memindai metadata dari berkas data dan menghasilkan berkas manifes yang sesuai. Biasanya membutuhkan waktu 150-250 ms.</p></li>
<li><p>File manifes mencatat pemetaan antara metadata di Milvus dan baris-baris di file eksternal.</p></li>
<li><p>Jika ada pemutakhiran pada data sumber Anda, Anda perlu memanggil refresh secara manual agar Milvus tetap mutakhir.</p></li>
<li><p>Anda tidak dapat mengindeks koleksi eksternal hanya setelah penyegaran selesai. Namun, cara membuat indeks sama dengan cara membuat indeks untuk koleksi terkelola.</p></li>
<li><p>Penyegaran yang memerlukan penghapusan semua metadata aktif tanpa penyisipan akan mengakibatkan penolakan.</p></li>
</ul>
</div>
<h2 id="Follow-ups" class="common-anchor-header">Tindak lanjut<button data-href="#Follow-ups" class="anchor-icon" translate="no">
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
    </button></h2><p>Setelah Anda melakukan operasi penyegaran pada koleksi eksternal dan berkas manifesnya tersedia, Anda dapat membuat indeks, memuat/mengeluarkan koleksi, dan melakukan pencarian kesamaan dan kueri pada koleksi eksternal seperti yang dilakukan pada koleksi terkelola.</p>
