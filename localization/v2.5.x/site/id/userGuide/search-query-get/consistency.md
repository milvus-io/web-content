---
id: consistency.md
summary: Pelajari tentang empat tingkat konsistensi dalam Milvus.
title: Konsistensi
---
<h1 id="Consistency-Level​" class="common-anchor-header">Tingkat Konsistensi<button data-href="#Consistency-Level​" class="anchor-icon" translate="no">
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
<h2 id="Overview​" class="common-anchor-header">Gambaran Umum<button data-href="#Overview​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus adalah sebuah sistem yang memisahkan penyimpanan dan komputasi. Dalam sistem ini, <strong>DataNodes</strong> bertanggung jawab atas persistensi data dan pada akhirnya menyimpannya dalam penyimpanan objek terdistribusi seperti MinIO/S3. <strong>QueryNodes</strong> menangani tugas-tugas komputasi seperti Pencarian. Tugas-tugas ini melibatkan pemrosesan <strong>data batch</strong> dan <strong>data streaming</strong>. Sederhananya, data batch dapat dipahami sebagai data yang telah disimpan dalam penyimpanan objek sementara data streaming mengacu pada data yang belum disimpan dalam penyimpanan objek. Karena latensi jaringan, QueryNode sering kali tidak menyimpan data streaming terbaru. Tanpa perlindungan tambahan, melakukan Pencarian secara langsung pada data streaming dapat mengakibatkan hilangnya banyak titik data yang tidak tersimpan, sehingga memengaruhi keakuratan hasil pencarian.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/batch-data-and-streaming-data.png" alt="Batch data and streaming data" class="doc-image" id="batch-data-and-streaming-data" />
   </span> <span class="img-wrapper"> <span>Data batch dan data streaming</span> </span></p>
<p>Seperti yang ditunjukkan pada gambar di atas, QueryNode dapat menerima data streaming dan data batch secara bersamaan setelah menerima permintaan Pencarian. Namun, karena latensi jaringan, data streaming yang diperoleh QueryNodes mungkin tidak lengkap.</p>
<p>Untuk mengatasi masalah ini, Milvus memberi stempel waktu pada setiap catatan dalam antrean data dan secara terus menerus memasukkan stempel waktu sinkronisasi ke dalam antrean data. Setiap kali cap waktu sinkronisasi (syncTs) diterima, QueryNodes menetapkannya sebagai ServiceTime, yang berarti bahwa QueryNodes dapat melihat semua data sebelum Service Time tersebut. Berdasarkan ServiceTime, Milvus dapat memberikan stempel waktu jaminan (GuaranteeTs) untuk memenuhi kebutuhan pengguna yang berbeda untuk konsistensi dan ketersediaan. Pengguna dapat memberi tahu QueryNodes tentang kebutuhan untuk memasukkan data sebelum titik waktu tertentu dalam cakupan pencarian dengan menentukan GuaranteeTs dalam permintaan Pencarian mereka.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/service-time-and-guarantee-time.png" alt="ServiceTime and GuaranteeTs" class="doc-image" id="servicetime-and-guaranteets" />
   </span> <span class="img-wrapper"> <span>ServiceTime dan GuaranteeTs</span> </span></p>
<p>Seperti yang ditunjukkan pada gambar di atas, jika GuaranteeTs kurang dari ServiceTime, itu berarti bahwa semua data sebelum titik waktu yang ditentukan telah sepenuhnya ditulis ke disk, yang memungkinkan QueryNodes untuk segera melakukan operasi Pencarian. Ketika GuaranteeTs lebih besar dari ServiceTime, QueryNodes harus menunggu sampai ServiceTime melebihi GuaranteeTs sebelum dapat menjalankan operasi Pencarian.</p>
<p>Pengguna harus membuat trade-off antara akurasi kueri dan latensi kueri. Jika pengguna memiliki persyaratan konsistensi yang tinggi dan tidak sensitif terhadap latensi kueri, mereka dapat mengatur GuaranteeTs ke nilai sebesar mungkin; jika pengguna ingin menerima hasil pencarian dengan cepat dan lebih toleran terhadap akurasi kueri, maka GuaranteeTs dapat diatur ke nilai yang lebih kecil.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/consistency-level-illustrated.png" alt="Consistency Levels Illustrated" class="doc-image" id="consistency-levels-illustrated" />
   </span> <span class="img-wrapper"> <span>Ilustrasi Tingkat Konsistensi</span> </span></p>
<p>Milvus menyediakan empat jenis tingkat konsistensi dengan nilai GuaranteeT yang berbeda.</p>
<ul>
<li><p><strong>Kuat</strong></p>
<p>Cap waktu terbaru digunakan sebagai GuaranteeTs, dan QueryNode harus menunggu hingga ServiceTime memenuhi GuaranteeTs sebelum mengeksekusi permintaan Pencarian.</p></li>
<li><p><strong>Akhirnya</strong></p>
<p>GuaranteeTs disetel ke nilai yang sangat kecil, seperti 1, untuk menghindari pemeriksaan konsistensi sehingga QueryNode dapat segera mengeksekusi permintaan Pencarian pada semua data batch.</p></li>
<li><p><strong>Terikat</strong>(default)</p>
<p>JaminanTs diatur ke titik waktu yang lebih awal dari stempel waktu terbaru untuk membuat QueryNode melakukan pencarian dengan toleransi kehilangan data tertentu.</p></li>
<li><p><strong>Sesi</strong></p>
<p>Titik waktu terakhir di mana klien memasukkan data digunakan sebagai JaminanTs sehingga QueryNodes dapat melakukan pencarian pada semua data yang dimasukkan oleh klien.</p></li>
</ul>
<p>Milvus menggunakan Bounded Staleness sebagai tingkat konsistensi default. Jika GuaranteeTs tidak ditentukan, maka ServiceTime terakhir digunakan sebagai GuaranteeTs.</p>
<h2 id="Set-Consistency-Level​" class="common-anchor-header">Mengatur Tingkat Konsistensi<button data-href="#Set-Consistency-Level​" class="anchor-icon" translate="no">
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
    </button></h2><p>Anda dapat mengatur tingkat konsistensi yang berbeda saat membuat koleksi serta melakukan pencarian dan kueri.</p>
<h3 id="Set-Consistency-Level-upon-Creating-Collection​" class="common-anchor-header">Mengatur Tingkat Konsistensi saat Membuat Koleksi</h3><p>Saat membuat koleksi, Anda dapat mengatur tingkat konsistensi untuk pencarian dan kueri di dalam koleksi. Contoh kode berikut ini mengatur tingkat konsistensi ke <strong>Bounded</strong>.</p>
<div class="multipleCode">
   <a href="#python">python</a> <a href="#java">java</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.create_collection(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    schema=schema,​
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>,​ <span class="hljs-comment"># Defaults to Bounded if not specified​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">createCollectionReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)​
        .collectionSchema(schema)​
        .consistencyLevel(ConsistencyLevel.BOUNDED)​
        .build();​
client.createCollection(createCollectionReq);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{​
        &quot;autoId&quot;: true,​
        &quot;enabledDynamicField&quot;: false,​
        &quot;fields&quot;: [​
            {​
                &quot;fieldName&quot;: &quot;my_id&quot;,​
                &quot;dataType&quot;: &quot;Int64&quot;,​
                &quot;isPrimary&quot;: true​
            },​
            {​
                &quot;fieldName&quot;: &quot;my_vector&quot;,​
                &quot;dataType&quot;: &quot;FloatVector&quot;,​
                &quot;elementTypeParams&quot;: {​
                    &quot;dim&quot;: &quot;5&quot;​
                }​
            },​
            {​
                &quot;fieldName&quot;: &quot;my_varchar&quot;,​
                &quot;dataType&quot;: &quot;VarChar&quot;,​
                &quot;isClusteringKey&quot;: true,​
                &quot;elementTypeParams&quot;: {​
                    &quot;max_length&quot;: 512​
                }​
            }​
        ]​
    }&#x27;</span>​
​
<span class="hljs-built_in">export</span> params=<span class="hljs-string">&#x27;{​
    &quot;consistencyLevel&quot;: &quot;Bounded&quot;​
}&#x27;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&quot;{​
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,​
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,​
    \&quot;params\&quot;: <span class="hljs-variable">$params</span>​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Nilai yang mungkin untuk parameter <code translate="no">consistency_level</code> adalah <code translate="no">Strong</code>, <code translate="no">Bounded</code>, <code translate="no">Eventually</code>, dan <code translate="no">Session</code>.</p>
<h3 id="Set-Consistency-Level-in-Search​" class="common-anchor-header">Mengatur Tingkat Konsistensi di Penelusuran</h3><p>Anda selalu dapat mengubah tingkat konsistensi untuk pencarian tertentu. Contoh kode berikut ini menetapkan tingkat konsistensi kembali ke Bounded. Perubahan ini hanya berlaku untuk permintaan pencarian saat ini.</p>
<div class="multipleCode">
   <a href="#python">python</a> <a href="#java">java</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">res = client.search(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    data=[query_vector],​
    limit=<span class="hljs-number">3</span>,​
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>}，​
    <span class="hljs-comment"># highlight-start​</span>
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>,​
    <span class="hljs-comment"># highlight-next​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)​
        .data(Collections.singletonList(queryVector))​
        .topK(<span class="hljs-number">3</span>)​
        .searchParams(params)​
        .consistencyLevel(ConsistencyLevel.BOUNDED)​
        .build();​
​
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;my_collection&quot;,​
    &quot;data&quot;: [​
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]​
    ],​
    &quot;limit&quot;: 3,​
    &quot;consistencyLevel&quot;: &quot;Bounded&quot;​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Parameter ini juga tersedia di pencarian hibrida dan iterator pencarian. Nilai yang memungkinkan untuk parameter <code translate="no">consistency_level</code> adalah <code translate="no">Strong</code>, <code translate="no">Bounded</code>, <code translate="no">Eventually</code>, dan <code translate="no">Session</code>.</p>
<h3 id="Set-Consistency-Level-in-Query​" class="common-anchor-header">Mengatur Tingkat Konsistensi dalam Kueri</h3><p>Anda selalu dapat mengubah tingkat konsistensi untuk pencarian tertentu. Contoh kode berikut ini menetapkan tingkat konsistensi ke <strong>Akhirnya</strong>. Pengaturan ini hanya berlaku untuk permintaan kueri saat ini.</p>
<div class="multipleCode">
   <a href="#python">python</a> <a href="#java">java</a></div>
<pre><code translate="no" class="language-python">res = client.query(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;color like \&quot;red%\&quot;&quot;</span>,​
    output_fields=[<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>],​
    limit=<span class="hljs-number">3</span>，​
    <span class="hljs-comment"># highlight-start​</span>
    consistency_level=<span class="hljs-string">&quot;Eventually&quot;</span>,​
    <span class="hljs-comment"># highlight-next​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">QueryReq</span> <span class="hljs-variable">queryReq</span> <span class="hljs-operator">=</span> QueryReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)​
        .filter(<span class="hljs-string">&quot;color like \&quot;red%\&quot;&quot;</span>)​
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>))​
        .limit(<span class="hljs-number">3</span>)​
        .consistencyLevel(ConsistencyLevel.EVENTUALLY)​
        .build();​
        ​
 <span class="hljs-type">QueryResp</span> <span class="hljs-variable">getResp</span> <span class="hljs-operator">=</span> client.query(queryReq);​

<button class="copy-code-btn"></button></code></pre>
<p>Parameter ini juga tersedia di pengulang kueri. Nilai yang mungkin untuk parameter <code translate="no">consistency_level</code> adalah <code translate="no">Strong</code>, <code translate="no">Bounded</code>, <code translate="no">Eventually</code>, dan <code translate="no">Session</code>.</p>
