---
id: clustering-compaction.md
title: Pemadatan Pengelompokan
summary: >-
  Pemadatan pengelompokan dirancang untuk meningkatkan kinerja pencarian dan
  mengurangi biaya dalam koleksi besar. Panduan ini akan membantu Anda memahami
  pemadatan pengelompokan dan bagaimana fitur ini dapat meningkatkan kinerja
  pencarian.
---
<h1 id="Clustering-Compaction" class="common-anchor-header">Pemadatan Pengelompokan<button data-href="#Clustering-Compaction" class="anchor-icon" translate="no">
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
    </button></h1><p>Pemadatan pengelompokan dirancang untuk meningkatkan kinerja pencarian dan mengurangi biaya dalam koleksi yang besar. Panduan ini akan membantu Anda memahami pemadatan pengelompokan dan bagaimana fitur ini dapat meningkatkan kinerja pencarian.</p>
<h2 id="Overview" class="common-anchor-header">Ikhtisar<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus menyimpan entitas yang masuk dalam segmen di dalam koleksi dan menutup segmen jika sudah penuh. Jika hal ini terjadi, sebuah segmen baru dibuat untuk mengakomodasi entitas tambahan. Akibatnya, entitas didistribusikan secara acak di seluruh segmen. Distribusi ini mengharuskan Milvus untuk mencari beberapa segmen untuk menemukan tetangga terdekat dengan vektor kueri yang diberikan.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/without-clustering-compaction.png" alt="Without Clustering Compaction" class="doc-image" id="without-clustering-compaction" />
   </span> <span class="img-wrapper"> <span>Tanpa Pemadatan Clustering</span> </span></p>
<p>Jika Milvus dapat mendistribusikan entitas di antara segmen berdasarkan nilai di bidang tertentu, cakupan pencarian dapat dibatasi dalam satu segmen, sehingga meningkatkan kinerja pencarian.</p>
<p><strong>Pemadatan Clustering</strong> adalah fitur di Milvus yang mendistribusikan kembali entitas di antara segmen dalam koleksi berdasarkan nilai dalam bidang skalar. Untuk mengaktifkan fitur ini, pertama-tama Anda harus memilih sebuah bidang skalar sebagai <strong>kunci pengelompokan</strong>. Hal ini memungkinkan Milvus untuk mendistribusikan ulang entitas ke dalam segmen ketika nilai kunci pengelompokannya berada dalam rentang tertentu. Ketika Anda memicu pemadatan pengelompokan, Milvus membuat/memperbaharui indeks global yang disebut <strong>PartitionStats</strong>, yang mencatat hubungan pemetaan antara segmen dan nilai kunci pengelompokan.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/clustering-compaction.png" alt="Clustering Compaction" class="doc-image" id="clustering-compaction" />
   </span> <span class="img-wrapper"> <span>Pemadatan Pengelompokan</span> </span></p>
<p>Dengan menggunakan <strong>PartitionStats</strong> sebagai referensi, Milvus dapat memangkas data yang tidak relevan setelah menerima permintaan pencarian/kueri yang membawa nilai kunci pengelompokan dan membatasi cakupan pencarian di dalam segmen yang memetakan nilai tersebut, sehingga meningkatkan kinerja pencarian. Untuk detail tentang peningkatan kinerja, lihat <a href="/docs/id/clustering-compaction.md#Benchmark-Test">Tes tolok ukur</a>.</p>
<h2 id="Use-Clustering-Compaction" class="common-anchor-header">Gunakan Pemadatan Pengelompokan<button data-href="#Use-Clustering-Compaction" class="anchor-icon" translate="no">
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
    </button></h2><p>Fitur Pemadatan Klaster di Milvus sangat mudah dikonfigurasi. Anda dapat memilih untuk memicunya secara manual atau mengaturnya untuk dipicu secara otomatis pada interval tertentu oleh Milvus. Untuk mengaktifkan pemadatan pengelompokan, lakukan hal berikut:</p>
<h3 id="Global-Configuration" class="common-anchor-header">Konfigurasi Global</h3><p>Anda perlu memodifikasi file konfigurasi Milvus Anda seperti yang ditunjukkan di bawah ini.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">dataCoord:</span>
  <span class="hljs-attr">compaction:</span>
    <span class="hljs-attr">clustering:</span>
      <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span> 
      <span class="hljs-attr">autoEnable:</span> <span class="hljs-literal">false</span> 
      <span class="hljs-attr">triggerInterval:</span> <span class="hljs-number">600</span> 
      <span class="hljs-attr">minInterval:</span> <span class="hljs-number">3600</span> 
      <span class="hljs-attr">maxInterval:</span> <span class="hljs-number">259200</span> 
      <span class="hljs-attr">newDataSizeThreshold:</span> <span class="hljs-string">512m</span> 
      <span class="hljs-attr">timeout:</span> <span class="hljs-number">7200</span>
     
<span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">enableSegmentPrune:</span> <span class="hljs-literal">true</span> 

<span class="hljs-attr">datanode:</span>
  <span class="hljs-attr">clusteringCompaction:</span>
    <span class="hljs-attr">memoryBufferRatio:</span> <span class="hljs-number">0.1</span> 
    <span class="hljs-attr">workPoolSize:</span> <span class="hljs-number">8</span>  
<span class="hljs-attr">common:</span>
  <span class="hljs-attr">usePartitionKeyAsClusteringKey:</span> <span class="hljs-literal">true</span> 
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Konfigurasi Item</p></th>
     <th><p>Deskripsi</p></th>
     <th><p>Nilai Default</p></th>
   </tr>
   <tr>
     <td colspan="3"><p><code translate="no">dataCoord.compaction.clustering</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">enable</code></p></td>
     <td><p>Menentukan apakah akan mengaktifkan pemadatan pengelompokan. Setel ini ke <code translate="no">true</code> jika Anda perlu mengaktifkan fitur ini untuk setiap koleksi yang memiliki kunci pengelompokan.</p></td>
     <td><p>false</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">autoEnable</code></p></td>
     <td><p>Menentukan apakah akan mengaktifkan pemadatan yang dipicu secara otomatis. Mengatur ini ke <code translate="no">true</code> mengindikasikan bahwa Milvus akan memadatkan koleksi yang memiliki kunci pengelompokan pada interval yang ditentukan.</p></td>
     <td><p>false</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">triggerInterval</code></p></td>
     <td><p>Menentukan interval dalam milidetik di mana Milvus memulai pemadatan pengelompokan. Ini hanya berlaku jika Anda mengatur <code translate="no">autoEnable</code> ke <code translate="no">true</code>.</p></td>
     <td></td>
   </tr>
   <tr>
     <td><p><code translate="no">minInterval</code></p></td>
     <td><p>Menentukan interval minimum dalam milidetik. Ini hanya berlaku bila Anda mengatur <code translate="no">autoEnable</code> ke <code translate="no">true</code>.</p><p>Mengatur ini ke bilangan bulat yang lebih besar dari <code translate="no">triggerInterval</code> akan membantu menghindari pemadatan berulang dalam waktu singkat.</p></td>
     <td></td>
   </tr>
   <tr>
     <td><p><code translate="no">maxInterval</code></p></td>
     <td><p>Menentukan interval maksimum dalam milidetik. Ini hanya berlaku ketika Anda mengatur <code translate="no">autoEnable</code> ke <code translate="no">true</code>.</p><p>Setelah Milvus mendeteksi bahwa sebuah koleksi belum dipadatkan secara pengelompokan untuk durasi yang lebih lama dari nilai ini, ia akan memaksa pemadatan pengelompokan.</p></td>
     <td></td>
   </tr>
   <tr>
     <td><p><code translate="no">newDataSizeThreshold</code></p></td>
     <td><p>Menentukan ambang batas atas untuk memicu pemadatan pengelompokan. Ini hanya berlaku jika Anda menetapkan <code translate="no">autoEnable</code> ke <code translate="no">true</code>.</p><p>Setelah Milvus mendeteksi bahwa volume data dalam koleksi melebihi nilai ini, Milvus akan memulai proses pemadatan pengelompokan.</p></td>
     <td></td>
   </tr>
   <tr>
     <td><p><code translate="no">timeout</code></p></td>
     <td><p>Menentukan durasi batas waktu untuk pemadatan pengelompokan. Pemadatan pengelompokan akan gagal jika waktu eksekusinya melebihi nilai ini.</p></td>
     <td></td>
   </tr>
   <tr>
     <td colspan="3"><p><code translate="no">queryNode</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">enableSegmentPrune</code></p></td>
     <td><p>Menentukan apakah Milvus memangkas data dengan merujuk ke PartitionStats setelah menerima permintaan pencarian/kueri. Atur ini ke <code translate="no">true</code> sehingga Milvus dapat memangkas data saat menerima permintaan pencarian/kueri dengan merujuk ke PartitionStats.</p></td>
     <td></td>
   </tr>
   <tr>
     <td colspan="3"><p><code translate="no">dataNode.clusteringCompaction</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">memoryBufferRatio</code></p></td>
     <td><p>Menentukan rasio buffer memori untuk tugas pemadatan pengelompokan.  Milvus akan memangkas data ketika ukuran data melebihi ukuran buffer yang dialokasikan yang dihitung menggunakan rasio ini.</p></td>
     <td></td>
   </tr>
   <tr>
     <td><p><code translate="no">workPoolSize</code></p></td>
     <td><p>Menentukan ukuran kumpulan pekerja untuk tugas pemadatan pengelompokan.</p></td>
     <td></td>
   </tr>
   <tr>
     <td colspan="3"><p><code translate="no">common</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">usePartitionKeyAsClusteringKey</code></p></td>
     <td><p>Menentukan apakah akan menggunakan kunci partisi dalam koleksi sebagai kunci pengelompokan. Mengatur ini ke true akan membuat Milvus memperlakukan kunci partisi dalam koleksi sebagai kunci pengelompokan. </p><p>Anda selalu dapat mengganti pengaturan ini dalam koleksi dengan secara eksplisit mengatur kunci pengelompokan.</p></td>
     <td></td>
   </tr>
</table>
<p>Untuk menerapkan perubahan di atas pada kluster Milvus Anda, silakan ikuti langkah-langkah di <a href="/docs/id/configure-helm.md#Configure-Milvus-via-configuration-file">Konfigurasi Milvus dengan Helm</a> dan <a href="/docs/id/configure_operator.md">Konfigurasi Milvus dengan Operator Milvus</a>.</p>
<h3 id="Collection-Configuration" class="common-anchor-header">Konfigurasi Koleksi</h3><p>Untuk pemadatan cluster dalam koleksi tertentu, Anda harus memilih bidang skalar dari koleksi sebagai kunci clustering.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

client = MilvusClient(
    uri=CLUSTER_ENDPOINT,
    token=TOKEN
)

schema = MilvusClient.create_schema()
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;key&quot;</span>, DataType.INT64, is_clustering_key=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;var&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>)
schema.add_field(<span class="hljs-string">&quot;vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;clustering_test&quot;</span>,
    schema=schema
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build());
        
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">false</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;key&quot;</span>)
        .dataType(DataType.Int64)
        .isClusteringKey(<span class="hljs-literal">true</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;var&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">1000</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;vector&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">5</span>)
        .build());

<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;clustering_test&quot;</span>)
        .collectionSchema(schema)
        .build();
client.createCollection(requestCreate);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">CLUSTER_ENDPOINT</span> = <span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>;
<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">TOKEN</span> = <span class="hljs-string">&#x27;root:Milvus&#x27;</span>;
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-variable constant_">CLUSTER_ENDPOINT</span>,
  <span class="hljs-attr">token</span>: <span class="hljs-variable constant_">TOKEN</span>,
});
<span class="hljs-keyword">const</span> schema = [
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;id&#x27;</span>,
      <span class="hljs-attr">type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
      <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">autoID</span>: <span class="hljs-literal">false</span>,
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;key&#x27;</span>,
      <span class="hljs-attr">type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
      <span class="hljs-attr">is_clustering_key</span>: <span class="hljs-literal">true</span>,
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;var&#x27;</span>,
      <span class="hljs-attr">type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
      <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>,
      <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">false</span>,
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;vector&#x27;</span>,
      <span class="hljs-attr">type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
      <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span>,
    },
  ];
  
  <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;clustering_test&#x27;</span>,
    <span class="hljs-attr">schema</span>: schema,
  });
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Anda dapat menggunakan bidang skalar dari tipe data berikut ini sebagai kunci pengelompokan: <code translate="no">Int8</code>, <code translate="no">Int16</code>, <code translate="no">Int32</code>, <code translate="no">Int64</code>, <code translate="no">Float</code>, <code translate="no">Double</code>, dan <code translate="no">VarChar</code>.</p>
</div>
<h3 id="Trigger-Clustering-Compaction" class="common-anchor-header">Memicu Pemadatan Pengelompokan</h3><p>Jika Anda telah mengaktifkan pemadatan pengelompokan otomatis, Milvus secara otomatis memicu pemadatan pada interval yang ditentukan. Sebagai alternatif, Anda dapat memicu pemadatan secara manual sebagai berikut:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># trigger a manual compaction</span>
job_id = client.compact(
    collection_name=<span class="hljs-string">&quot;clustering_test&quot;</span>, 
    is_clustering=<span class="hljs-literal">True</span>
)

<span class="hljs-comment"># get the compaction state</span>
client.get_compaction_state(
    job_id=job_id,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.utility.request.CompactReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.utility.request.GetCompactionStateReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.utility.response.CompactResp;
<span class="hljs-keyword">import</span> io.milvus.v2.service.utility.response.GetCompactionStateResp;

<span class="hljs-type">CompactResp</span> <span class="hljs-variable">compactResp</span> <span class="hljs-operator">=</span> client.compact(CompactReq.builder()
        .collectionName(<span class="hljs-string">&quot;clustering_test&quot;</span>)
        .isClustering(<span class="hljs-literal">true</span>)
        .build());

<span class="hljs-type">GetCompactionStateResp</span> <span class="hljs-variable">stateResp</span> <span class="hljs-operator">=</span> client.getCompactionState(GetCompactionStateReq.builder()
        .compactionID(compactResp.getCompactionID())
        .build());

System.out.println(stateResp.getState());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// trigger a manual compaction</span>
<span class="hljs-keyword">const</span> {compactionID} = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">compact</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;clustering_test&quot;</span>, 
    <span class="hljs-attr">is_clustering</span>: <span class="hljs-literal">true</span>
});

<span class="hljs-comment">// get the compaction state</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getCompactionState</span>({
    <span class="hljs-attr">compactionID</span>: compactionID,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Benchmark-Test" class="common-anchor-header">Uji Tolok Ukur<button data-href="#Benchmark-Test" class="anchor-icon" translate="no">
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
    </button></h2><p>Volume data dan pola kueri yang digabungkan menentukan peningkatan kinerja yang dapat dihasilkan oleh pemadatan klaster. Uji tolok ukur internal menunjukkan bahwa pemadatan klaster menghasilkan peningkatan hingga 25 kali lipat dalam kueri per detik (QPS).</p>
<p>Uji tolok ukur dilakukan pada koleksi yang berisi entitas dari kumpulan data LAION sebanyak 20 juta, 768 dimensi dengan bidang <code translate="no">key</code> yang ditetapkan sebagai kunci pengelompokan. Setelah pemadatan klaster dipicu dalam koleksi, pencarian bersamaan dikirim hingga penggunaan CPU mencapai level tertinggi.</p>
<table>
   <tr>
     <th rowspan="2"><p>Filter pencarian</p></th>
     <th rowspan="2"><p>Rasio pemangkasan</p></th>
     <th colspan="5"><p>Latensi</p></th>
     <th rowspan="2"><p>Permintaan/s</p></th>
   </tr>
   <tr>
     <td><p>Rata-rata</p></td>
     <td><p>Min</p></td>
     <td><p>Maks</p></td>
     <td><p>Median</p></td>
     <td><p>TP99</p></td>
   </tr>
   <tr>
     <td><p>N/A</p></td>
     <td><p>0%</p></td>
     <td><p>1685</p></td>
     <td><p>672</p></td>
     <td><p>2294</p></td>
     <td><p>1710</p></td>
     <td><p>2291</p></td>
     <td><p>17.75</p></td>
   </tr>
   <tr>
     <td><p>kunci&gt; 200 dan kunci &lt; 800</p></td>
     <td><p>40.2%</p></td>
     <td><p>1045</p></td>
     <td><p>47</p></td>
     <td><p>1828</p></td>
     <td><p>1085</p></td>
     <td><p>1617</p></td>
     <td><p>28.38</p></td>
   </tr>
   <tr>
     <td><p>kunci&gt; 200 dan kunci &lt; 600</p></td>
     <td><p>59.8%</p></td>
     <td><p>829</p></td>
     <td><p>45</p></td>
     <td><p>1483</p></td>
     <td><p>882</p></td>
     <td><p>1303</p></td>
     <td><p>35.78</p></td>
   </tr>
   <tr>
     <td><p>kunci&gt; 200 dan kunci &lt; 400</p></td>
     <td><p>79.5%</p></td>
     <td><p>550</p></td>
     <td><p>100</p></td>
     <td><p>985</p></td>
     <td><p>584</p></td>
     <td><p>898</p></td>
     <td><p>54.00</p></td>
   </tr>
   <tr>
     <td><p>kunci = 1000</p></td>
     <td><p>99%</p></td>
     <td><p>68</p></td>
     <td><p>24</p></td>
     <td><p>1273</p></td>
     <td><p>70</p></td>
     <td><p>246</p></td>
     <td><p>431.41</p></td>
   </tr>
</table>
<p>Ketika rentang pencarian menyempit dalam filter pencarian, rasio pemangkasan meningkat. Ini berarti lebih banyak entitas yang dilewati selama proses pencarian. Ketika membandingkan statistik di baris pertama dan terakhir, Anda dapat melihat bahwa pencarian tanpa pemadatan pengelompokan memerlukan pemindaian seluruh koleksi. Di sisi lain, pencarian dengan pemadatan pengelompokan menggunakan kunci tertentu dapat mencapai peningkatan hingga 25 kali lipat.</p>
<h2 id="Best-Practices" class="common-anchor-header">Praktik Terbaik<button data-href="#Best-Practices" class="anchor-icon" translate="no">
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
    </button></h2><p>Berikut ini beberapa kiat agar Anda dapat menggunakan pemadatan pengelompokan secara efisien:</p>
<ul>
<li><p>Aktifkan ini untuk koleksi dengan volume data yang besar.</p>
<p>Performa pencarian meningkat dengan volume data yang lebih besar dalam koleksi. Ini adalah pilihan yang baik untuk mengaktifkan fitur ini untuk koleksi dengan lebih dari 1 juta entitas.</p></li>
<li><p>Pilih kunci pengelompokan yang tepat.</p>
<p>Anda dapat menggunakan bidang skalar yang biasa digunakan sebagai kondisi pemfilteran sebagai kunci pengelompokan. Untuk koleksi yang menyimpan data dari beberapa penyewa, Anda dapat menggunakan bidang yang membedakan satu penyewa dengan penyewa lainnya sebagai kunci pengelompokan.</p></li>
<li><p>Gunakan kunci partisi sebagai kunci pengelompokan.</p>
<p>Anda dapat mengatur <code translate="no">common.usePartitionKeyAsClusteringKey</code> ke <code translate="no">true</code> jika anda ingin mengaktifkan fitur ini untuk semua koleksi di dalam instance Milvus anda atau jika anda masih menghadapi masalah performa di dalam koleksi yang besar dengan kunci partisi. Dengan demikian, Anda akan memiliki kunci pengelompokan dan kunci partisi ketika Anda memilih sebuah field skalar dalam koleksi sebagai kunci partisi.</p>
<p>Perhatikan bahwa pengaturan ini tidak menghalangi Anda untuk memilih bidang skalar lain sebagai kunci pengelompokan. Kunci pengelompokan yang ditetapkan secara eksplisit selalu diutamakan.</p></li>
</ul>
