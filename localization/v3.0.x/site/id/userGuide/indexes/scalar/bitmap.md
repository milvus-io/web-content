---
id: bitmap.md
title: BITMAP
summary: >-
  Pengindeksan bitmap adalah teknik pengindeksan yang efisien yang dirancang
  untuk meningkatkan kinerja kueri pada bidang skalar dengan kardinalitas
  rendah. Kardinalitas mengacu pada jumlah nilai unik dalam suatu bidang. Bidang
  dengan jumlah elemen unik yang lebih sedikit dianggap memiliki kardinalitas
  rendah.
---
<h1 id="BITMAP" class="common-anchor-header">BITMAP<button data-href="#BITMAP" class="anchor-icon" translate="no">
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
    </button></h1><p>Pengindeksan bitmap adalah teknik pengindeksan yang efisien yang dirancang untuk meningkatkan kinerja kueri pada bidang skalar dengan kardinalitas rendah. Kardinalitas mengacu pada jumlah nilai unik dalam suatu bidang. Bidang dengan jumlah elemen unik yang lebih sedikit dianggap memiliki kardinalitas rendah.</p>
<p>Jenis indeks ini membantu mengurangi waktu pengambilan data pada kueri skalar dengan merepresentasikan nilai-nilai bidang dalam format biner yang ringkas dan melakukan operasi bitwise yang efisien terhadap nilai-nilai tersebut. Dibandingkan dengan jenis indeks lainnya, indeks bitmap umumnya memiliki efisiensi ruang yang lebih tinggi dan kecepatan kueri yang lebih cepat saat menangani bidang dengan kardinalitas rendah.</p>
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
    </button></h2><p>Istilah <strong>Bitmap</strong> merupakan gabungan dari dua kata: <strong>Bit</strong> dan <strong>Map</strong>. Bit mewakili unit data terkecil dalam komputer, yang hanya dapat menyimpan nilai <strong>0</strong> atau <strong>1</strong>. Map, dalam konteks ini, merujuk pada proses transformasi dan pengorganisasian data sesuai dengan nilai apa yang harus ditetapkan untuk 0 dan 1.</p>
<p>Indeks bitmap terdiri dari dua komponen utama: bitmap dan kunci. Kunci mewakili nilai-nilai unik dalam bidang yang diindeks. Untuk setiap nilai unik, terdapat bitmap yang sesuai. Panjang bitmap-bitmap ini sama dengan jumlah rekaman dalam koleksi. Setiap bit dalam bitmap sesuai dengan satu catatan dalam koleksi. Jika nilai bidang yang diindeks dalam suatu catatan cocok dengan kunci, bit yang sesuai akan ditetapkan ke <strong>1</strong>; sebaliknya, bit tersebut ditetapkan ke <strong>0</strong>.</p>
<p>Bayangkan sebuah koleksi dokumen dengan bidang <strong>Kategori</strong> dan <strong>Publik</strong>. Kita ingin mengambil dokumen yang termasuk dalam kategori <strong>Tech</strong> dan terbuka untuk <strong>Publik</strong>. Dalam hal ini, kunci untuk indeks bitmap kita adalah <strong>Tech</strong> dan <strong>Publik</strong>.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/bitmap.png" alt="Bitmap" class="doc-image" id="bitmap" /> 
   <span>Bitmap</span>
  
 </span></p>
<p>Seperti yang ditunjukkan pada gambar, indeks bitmap untuk <strong>Kategori</strong> dan <strong>Publik</strong> adalah:</p>
<ul>
<li><p><strong>Tech</strong>: [1, 0, 1, 0, 0], yang menunjukkan bahwa hanya dokumen ke-1 dan ke-3 yang termasuk dalam kategori <strong>Tech</strong>.</p></li>
<li><p><strong>Public</strong>: [1, 0, 0, 1, 0], yang menunjukkan bahwa hanya dokumen ke-1 dan ke-4 yang terbuka untuk <strong>Publik</strong>.</p></li>
</ul>
<p>Untuk menemukan dokumen yang memenuhi kedua kriteria tersebut, kita melakukan operasi AND bitwise pada kedua bitmap ini:</p>
<ul>
<li><strong>Teknologi</strong> AND <strong>Publik</strong>: [1, 0, 0, 0, 0]</li>
</ul>
<p>Bitmap yang dihasilkan [1, 0, 0, 0, 0] menunjukkan bahwa hanya dokumen pertama (<strong>ID</strong> <strong>1</strong>) yang memenuhi kedua kriteria tersebut. Dengan menggunakan indeks bitmap dan operasi bitwise yang efisien, kita dapat dengan cepat mempersempit cakupan pencarian, sehingga tidak perlu memindai seluruh kumpulan data.</p>
<h2 id="Create-a-bitmap-index" class="common-anchor-header">Membuat indeks bitmap<button data-href="#Create-a-bitmap-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk membuat indeks bitmap di Milvus, gunakan metode ` <code translate="no">create_index()</code> ` dan atur parameter ` <code translate="no">index_type</code> ` menjadi ` <code translate="no">&quot;BITMAP&quot;</code>`.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
)

index_params = client.prepare_index_params() <span class="hljs-comment"># Prepare an empty IndexParams object, without having to specify any index parameters</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-comment"># Name of the scalar field to be indexed</span>
    index_type=<span class="hljs-string">&quot;BITMAP&quot;</span>, <span class="hljs-comment"># Type of index to be created</span>
    index_name=<span class="hljs-string">&quot;category_bitmap_index&quot;</span> <span class="hljs-comment"># Name of the index to be created</span>
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment"># Specify the collection name</span>
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;
<span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

client.createIndex(CreateIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .indexParams(Collections.singletonList(IndexParam.builder()
                .fieldName(<span class="hljs-string">&quot;category&quot;</span>)
                .indexType(IndexParam.IndexType.BITMAP)
                .indexName(<span class="hljs-string">&quot;category_bitmap_index&quot;</span>)
                .build()))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;log&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
})

<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to connect to milvus server: &quot;</span>, err.Error())
}

_, err = cli.CreateIndex(ctx, milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, index.NewBitmapIndex()).WithIndexName(<span class="hljs-string">&quot;category_bitmap_index&quot;</span>))

<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to create index: &quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>);

<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

client
    .<span class="hljs-title function_ invoke__">create_index</span>(
        CreateIndexRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">index_param</span>(
                IndexParam::<span class="hljs-title function_ invoke__">new</span>()
                    .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;category&quot;</span>)
                    .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::Bitmap)
                    .<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;category_bitmap_index&quot;</span>),
            )
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(milvus::<span class="hljs-built_in">ConnectParam</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>));

<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

status = client-&gt;<span class="hljs-built_in">CreateIndex</span>(milvus::<span class="hljs-built_in">CreateIndexRequest</span>().<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .<span class="hljs-built_in">AddIndex</span>(milvus::<span class="hljs-built_in">IndexDesc</span>(<span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;category_bitmap_index&quot;</span>, milvus::IndexType::BITMAP)));

<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;category&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;BITMAP&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;category_bitmap_index&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> config = <span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
};
<span class="hljs-keyword">using</span> <span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(config);
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-comment">// Prepare index building params</span>
<span class="hljs-keyword">var</span> indexParam = <span class="hljs-keyword">new</span> IndexParam(
    fieldName: <span class="hljs-string">&quot;category&quot;</span>,
    indexType: IndexType.Bitmap,
    indexName: <span class="hljs-string">&quot;category_bitmap_index&quot;</span>);

<span class="hljs-keyword">await</span> client.CreateIndexAsync(<span class="hljs-keyword">new</span> CreateIndexReq
{
    CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>,
    Indexes = [indexParam]
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/indexes/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;indexParams&quot;: [
        {
            &quot;fieldName&quot;: &quot;category&quot;,
            &quot;indexName&quot;: &quot;category_bitmap_index&quot;,
            &quot;indexType&quot;: &quot;BITMAP&quot;
        }
    ]
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {}</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<p>Dalam contoh ini, kami membuat indeks bitmap pada bidang ` <code translate="no">category</code> ` dari koleksi ` <code translate="no">my_collection</code> `. Metode ` <code translate="no">add_index()</code> ` digunakan untuk menentukan nama bidang, jenis indeks, dan nama indeks.</p>
<p>Setelah indeks bitmap dibuat, Anda dapat menggunakan parameter ` <code translate="no">filter</code> ` dalam operasi kueri untuk melakukan penyaringan skalar berdasarkan bidang yang diindeks. Hal ini memungkinkan Anda mempersempit hasil pencarian secara efisien menggunakan indeks bitmap. Untuk informasi lebih lanjut, lihat <a href="/docs/id/boolean.md">Penjelasan</a> tentang <a href="/docs/id/boolean.md">Penyaringan</a>.</p>
<h2 id="Drop-an-index" class="common-anchor-header">Menghapus indeks<button data-href="#Drop-an-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Gunakan metode ` <code translate="no">drop_index()</code> ` untuk menghapus indeks yang ada dari sebuah koleksi.</p>
<div class="alert note">
<ul>
<li><p>Pada <strong>v2.6.3</strong> atau sebelumnya, Anda harus melepaskan koleksi terlebih dahulu sebelum menghapus indeks skalar.</p></li>
<li><p>Mulai <strong>v2.6.4</strong> atau yang lebih baru, Anda dapat menghapus indeks skalar secara langsung begitu indeks tersebut tidak lagi diperlukan—tidak perlu melepaskan koleksi terlebih dahulu.</p></li>
</ul>
</div>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">client.drop_index(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,   <span class="hljs-comment"># Name of the collection</span>
    index_name=<span class="hljs-string">&quot;category_bitmap_index&quot;</span> <span class="hljs-comment"># Name of the index to drop</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.DropIndexReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

client.dropIndex(DropIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .indexName(<span class="hljs-string">&quot;category_bitmap_index&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;log&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
})

<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to connect to milvus server: &quot;</span>, err.Error())
}

err = cli.DropIndex(ctx, milvusclient.NewDropIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;category_bitmap_index&quot;</span>))

<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to drop index: &quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>);

<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

client
    .<span class="hljs-title function_ invoke__">drop_index</span>(
        DropIndexRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;category_bitmap_index&quot;</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(milvus::<span class="hljs-built_in">ConnectParam</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>));

<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

status = client-&gt;<span class="hljs-built_in">DropIndex</span>(milvus::<span class="hljs-built_in">DropIndexRequest</span>()
        .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .<span class="hljs-built_in">WithIndexName</span>(<span class="hljs-string">&quot;category_bitmap_index&quot;</span>));

<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;category_bitmap_index&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;

<span class="hljs-keyword">await</span> client.DropIndexAsync(<span class="hljs-keyword">new</span> DropIndexReq
{
    CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment">// Name of the collection</span>
    IndexName = <span class="hljs-string">&quot;category_bitmap_index&quot;</span> <span class="hljs-comment">// Name of the index to drop</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/indexes/drop&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;indexName&quot;: &quot;category_bitmap_index&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {}</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
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
<li><p>Indeks bitmap hanya didukung untuk bidang skalar yang bukan merupakan kunci utama.</p></li>
<li><p>Tipe data bidang tersebut harus salah satu dari berikut ini:</p>
<ul>
<li><p><code translate="no">BOOL</code>, <code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>, <code translate="no">VARCHAR</code></p></li>
<li><p><code translate="no">ARRAY</code> (elemen harus salah satu dari: <code translate="no">BOOL</code>, <code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>, <code translate="no">VARCHAR</code>)</p></li>
</ul></li>
<li><p>Indeks bitmap tidak mendukung tipe data berikut:</p>
<ul>
<li><p><code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>: Tipe bilangan floating-point tidak kompatibel dengan sifat biner indeks bitmap.</p></li>
<li><p><code translate="no">JSON</code>: Tipe data JSON memiliki struktur yang kompleks sehingga tidak dapat direpresentasikan secara efisien menggunakan indeks bitmap.</p></li>
</ul></li>
<li><p>Indeks bitmap tidak cocok untuk kolom dengan kardinalitas tinggi (yaitu, kolom dengan jumlah nilai unik yang besar).</p>
<ul>
<li><p>Sebagai pedoman umum, indeks bitmap paling efektif ketika kardinalitas suatu kolom kurang dari 500.</p></li>
<li><p>Ketika kardinalitas melebihi ambang batas ini, manfaat kinerja indeks bitmap berkurang, dan beban penyimpanan menjadi signifikan.</p></li>
<li><p>Untuk kolom dengan kardinalitas tinggi, pertimbangkan untuk menggunakan teknik pengindeksan alternatif seperti indeks terbalik, tergantung pada kasus penggunaan dan persyaratan kueri Anda.</p></li>
</ul></li>
</ul>
