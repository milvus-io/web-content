---
id: tune_consistency.md
title: Tingkat Konsistensi
summary: >-
  Sebagai basis data vektor terdistribusi, Milvus menawarkan beberapa tingkat
  konsistensi untuk memastikan bahwa setiap node atau replika dapat mengakses
  data yang sama selama operasi baca dan tulis. Saat ini, tingkat konsistensi
  yang didukung meliputi Strong, Bounded, Eventually, dan Session, dengan
  Bounded sebagai tingkat konsistensi default yang digunakan.
---
<h1 id="Consistency-Level" class="common-anchor-header">Tingkat Konsistensi<button data-href="#Consistency-Level" class="anchor-icon" translate="no">
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
    </button></h1><p>Sebagai basis data vektor terdistribusi, Milvus menawarkan beberapa tingkat konsistensi untuk memastikan bahwa setiap node atau replika dapat mengakses data yang sama selama operasi baca dan tulis. Saat ini, tingkat konsistensi yang didukung meliputi <strong>Strong</strong>, <strong>Bounded</strong>, <strong>Eventually</strong>, dan <strong>Session</strong>, dengan <strong>Bounded</strong> sebagai tingkat konsistensi default yang digunakan.</p>
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
    </button></h2><p>Milvus adalah sistem yang memisahkan penyimpanan dan komputasi. <strong>Node Streaming</strong> menambahkan semua operasi penulisan ke Write-Ahead Log (WAL) dan menyimpan <strong>data yang terus bertambah</strong> — data yang masih berada di WAL dan belum disimpan secara permanen. Proses pemulihan mengubah data yang terus bertambah menjadi <strong>data historis</strong> (segmen yang disegel dan disimpan secara permanen di penyimpanan objek seperti MinIO/S3), yang disajikan oleh <strong>Node Kueri</strong>. Setiap permintaan pencarian atau kueri diterima oleh <strong>Query Delegator</strong> di Streaming Node yang menghosting WAL koleksi tersebut: delegator tersebut menghasilkan rencana kueri, mengeksekusi bagian data yang terus bertambah secara lokal, meneruskan bagian data historis ke Query Node yang relevan, dan menggabungkan hasilnya sebelum mengembalikannya. Untuk detailnya, lihat <a href="/docs/id/streaming_service.md">Layanan Streaming</a>.</p>
<p>Untuk menjamin konsistensi, Milvus menetapkan cap waktu Timestamp Oracle (TSO) pada setiap pesan yang menentukan urutannya dalam WAL, serta secara terus-menerus menyisipkan cap waktu sinkronisasi ke dalam WAL bersamaan dengan pesan-pesan data. Setiap kali cap waktu sinkronisasi (syncTs) diterima, cap waktu tersebut dicatat sebagai ServiceTime, yang berarti bahwa semua data sebelum ServiceTime tersebut dapat dilihat oleh kueri. Berdasarkan ServiceTime, Milvus menyediakan cap waktu jaminan (GuaranteeTs) untuk memenuhi berbagai persyaratan pengguna terkait konsistensi dan ketersediaan. Pengguna dapat memberi tahu delegator tentang kebutuhan untuk memasukkan data sebelum titik waktu tertentu ke dalam cakupan pencarian dengan menentukan GuaranteeTs dalam permintaan Search mereka.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/service-time-and-guarantee-time.png" alt="Service Time And Guarantee Time" class="doc-image" id="service-time-and-guarantee-time" /> 
   <span>Waktu Layanan dan Waktu Jaminan</span>
  
 </span></p>
<p>Seperti yang ditunjukkan pada gambar di atas, jika GuaranteeTs lebih kecil dari ServiceTime, artinya semua data sebelum titik waktu yang ditentukan sudah terlihat, sehingga pencarian dapat dieksekusi segera. Ketika GuaranteeTs lebih besar dari ServiceTime, pencarian harus menunggu hingga ServiceTime melebihi GuaranteeTs sebelum dapat dieksekusi.</p>
<p>Pengguna perlu menyeimbangkan antara akurasi kueri dan latensi kueri. Jika pengguna memiliki persyaratan konsistensi yang tinggi dan tidak terlalu sensitif terhadap latensi kueri, mereka dapat menetapkan GuaranteeTs ke nilai sebesar mungkin; jika pengguna ingin menerima hasil pencarian dengan cepat dan lebih toleran terhadap akurasi kueri, maka GuaranteeTs dapat ditetapkan ke nilai yang lebih kecil.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/consistency-level-illustrated.png" alt="Consistency Level Illustrated" class="doc-image" id="consistency-level-illustrated" /> 
   <span>Ilustrasi Tingkat Konsistensi</span>
  
 </span></p>
<p>Milvus menyediakan empat jenis tingkat konsistensi dengan nilai GuaranteeTs yang berbeda-beda.</p>
<ul>
<li><p><strong>Kuat</strong></p>
<p>Stempel waktu terbaru digunakan sebagai GuaranteeTs, dan pencarian harus menunggu hingga ServiceTime memenuhi GuaranteeTs sebelum dieksekusi.</p></li>
<li><p><strong>Eventual</strong></p>
<p>GuaranteeTs ditetapkan ke nilai yang sangat kecil, seperti 1, untuk menghindari pemeriksaan konsistensi sehingga pencarian langsung dieksekusi pada data yang saat ini terlihat.</p></li>
<li><p><strong>Keterlambatan Terbatas</strong></p>
<p>GuaranteeTs ditetapkan ke titik waktu yang lebih awal dari cap waktu terbaru, sehingga pencarian dijalankan dengan toleransi bahwa beberapa data terbaru mungkin belum terlihat.</p></li>
<li><p><strong>Session</strong></p>
<p>Titik waktu terbaru saat klien menyisipkan data digunakan sebagai GuaranteeTs sehingga pencarian dapat mencakup semua data yang disisipkan oleh klien.</p></li>
</ul>
<p>Milvus menggunakan Bounded Staleness sebagai tingkat konsistensi default. Jika GuaranteeTs tidak ditentukan, ServiceTime terbaru digunakan sebagai GuaranteeTs.</p>
<h2 id="Set-Consistency-Level" class="common-anchor-header">Tetapkan Tingkat Konsistensi<button data-href="#Set-Consistency-Level" class="anchor-icon" translate="no">
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
    </button></h2><p>Anda dapat mengatur tingkat konsistensi yang berbeda saat membuat koleksi serta saat melakukan pencarian dan kueri.</p>
<h3 id="Set-Consistency-Level-upon-Creating-Collection" class="common-anchor-header">Menetapkan Tingkat Konsistensi saat Membuat Koleksi<button data-href="#Set-Consistency-Level-upon-Creating-Collection" class="anchor-icon" translate="no">
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
    </button></h3><p>Saat membuat koleksi, Anda dapat mengatur tingkat konsistensi untuk pencarian dan kueri di dalam koleksi tersebut. Contoh kode berikut mengatur tingkat konsistensi menjadi <strong>Bounded</strong>.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
<span class="highlighted-wrapper-line">    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>,</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">createCollectionReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .collectionSchema(schema)
<span class="highlighted-wrapper-line">        .consistencyLevel(ConsistencyLevel.BOUNDED)</span>
        .build();
client.createCollection(createCollectionReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;my_collection&quot;</span>, schema).
        WithConsistencyLevel(entity.ClBounded))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
        &quot;autoId&quot;: true,
        &quot;enabledDynamicField&quot;: false,
        &quot;fields&quot;: [
            {
                &quot;fieldName&quot;: &quot;id&quot;,
                &quot;dataType&quot;: &quot;Int64&quot;,
                &quot;isPrimary&quot;: true
            },
            {
                &quot;fieldName&quot;: &quot;vector&quot;,
                &quot;dataType&quot;: &quot;FloatVector&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;dim&quot;: &quot;5&quot;
                }
            },
            {
                &quot;fieldName&quot;: &quot;my_varchar&quot;,
                &quot;dataType&quot;: &quot;VarChar&quot;,
                &quot;isClusteringKey&quot;: true,
                &quot;elementTypeParams&quot;: {
                    &quot;max_length&quot;: 512
                }
            }
        ]
    }&#x27;</span>

<span class="hljs-built_in">export</span> params=<span class="hljs-string">&#x27;{
    &quot;consistencyLevel&quot;: &quot;Bounded&quot;
}&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;params\&quot;: <span class="hljs-variable">$params</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Nilai yang mungkin untuk parameter ` <code translate="no">consistency_level</code> ` adalah ` <code translate="no">Strong</code>`, ` <code translate="no">Bounded</code>`, ` <code translate="no">Eventually</code>`, dan ` <code translate="no">Session</code>`.</p>
<h3 id="Set-Consistency-Level-in-Search" class="common-anchor-header">Menetapkan Tingkat Konsistensi dalam Pencarian<button data-href="#Set-Consistency-Level-in-Search" class="anchor-icon" translate="no">
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
    </button></h3><p>Anda selalu dapat mengubah tingkat konsistensi untuk pencarian tertentu. Contoh kode berikut mengatur tingkat konsistensi kembali ke <strong>Bounded</strong>. Perubahan ini hanya berlaku untuk permintaan pencarian saat ini.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[query_vector],
    limit=<span class="hljs-number">3</span>,
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>}，
<span class="highlighted-comment-line">    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>,</span>
<span class="highlighted-wrapper-line">)</span>
<span class="highlighted-comment-line"></span><button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(Collections.singletonList(queryVector))
        .topK(<span class="hljs-number">3</span>)
        .searchParams(params)
        .consistencyLevel(ConsistencyLevel.BOUNDED)
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">3</span>,               <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.FloatVector(queryVector)},
).WithConsistencyLevel(entity.ClBounded).
    WithANNSField(<span class="hljs-string">&quot;vector&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;data&quot;: [
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]
    ],
    &quot;limit&quot;: 3,
    &quot;consistencyLevel&quot;: &quot;Bounded&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Parameter ini juga tersedia dalam pencarian hybrid dan iterator pencarian. Nilai yang mungkin untuk parameter ` <code translate="no">consistency_level</code> ` adalah ` <code translate="no">Strong</code>`, ` <code translate="no">Bounded</code>`, ` <code translate="no">Eventually</code>`, dan ` <code translate="no">Session</code>`.</p>
<h3 id="Set-Consistency-Level-in-Query" class="common-anchor-header">Menetapkan Tingkat Konsistensi dalam Kueri<button data-href="#Set-Consistency-Level-in-Query" class="anchor-icon" translate="no">
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
    </button></h3><p>Anda selalu dapat mengubah tingkat konsistensi untuk pencarian tertentu. Contoh kode berikut mengatur tingkat konsistensi ke " <strong>Eventually"</strong>. Pengaturan ini hanya berlaku untuk permintaan kueri saat ini.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;color like \&quot;red%\&quot;&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>],
    limit=<span class="hljs-number">3</span>，
<span class="highlighted-comment-line">    consistency_level=<span class="hljs-string">&quot;Eventually&quot;</span>,</span>
<span class="highlighted-wrapper-line">)</span>
<span class="highlighted-comment-line"></span><button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">QueryReq</span> <span class="hljs-variable">queryReq</span> <span class="hljs-operator">=</span> QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .filter(<span class="hljs-string">&quot;color like \&quot;red%\&quot;&quot;</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>))
        .limit(<span class="hljs-number">3</span>)
        .consistencyLevel(ConsistencyLevel.EVENTUALLY)
        .build();
        
 <span class="hljs-type">QueryResp</span> <span class="hljs-variable">getResp</span> <span class="hljs-operator">=</span> client.query(queryReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">resultSet, err := client.Query(ctx, milvusclient.NewQueryOption(<span class="hljs-string">&quot;my_collection&quot;</span>).
    WithFilter(<span class="hljs-string">&quot;color like \&quot;red%\&quot;&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>).
    WithLimit(<span class="hljs-number">3</span>).
    WithConsistencyLevel(entity.ClEventually))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;filter&quot;: &quot;color like \&quot;red_%\&quot;&quot;,
    &quot;consistencyLevel&quot;: &quot;Bounded&quot;,
    &quot;limit&quot;: 3
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Parameter ini juga tersedia di iterator kueri. Nilai-nilai yang mungkin untuk parameter ` <code translate="no">consistency_level</code> ` adalah ` <code translate="no">Strong</code>`, ` <code translate="no">Bounded</code>`, ` <code translate="no">Eventually</code>`, dan ` <code translate="no">Session</code>`.</p>
