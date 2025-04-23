---
id: clustering-compaction.md
title: クラスタリング・コンパクション
summary: >-
  クラスタリング・コンパクションは、大規模なコレクションの検索パフォーマンスを向上させ、コストを削減するために設計されています。このガイドでは、クラスタリング・コンパクションと、この機能による検索パフォーマンスの向上について説明します。
---
<h1 id="Clustering-Compaction" class="common-anchor-header">クラスタリング・コンパクション<button data-href="#Clustering-Compaction" class="anchor-icon" translate="no">
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
    </button></h1><p>クラスタリング・コンパクションは、大規模なコレクションの検索パフォーマンスを向上させ、コストを削減するために設計されています。このガイドでは、クラスタリング・コンパクションと、この機能による検索パフォーマンスの向上について説明します。</p>
<h2 id="Overview" class="common-anchor-header">概要<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusは入力されたエンティティをコレクション内のセグメントに格納し、セグメントが一杯になるとそのセグメントを封印します。この場合、追加のエンティティを収容するために新しいセグメントが作成されます。その結果、エンティティはセグメント間で任意に分散される。この分散により、Milvus は複数のセグメントを検索して、与えられたクエリベクトルに最も近いものを見つける必要がある。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/without-clustering-compaction.png" alt="Without Clustering Compaction" class="doc-image" id="without-clustering-compaction" />
   </span> <span class="img-wrapper"> <span>クラスタリングコンパクションなし</span> </span></p>
<p>もし Milvus が特定のフィールドの値に基づいてセグメント間でエンティティを分散させることができれば、検索範囲をセグメント内に制限することができ、検索性能が向上します。</p>
<p><strong>クラスタリングコンパクションは</strong>Milvusの機能で、スカラーフィールドの値に基づいてコレクション内のセグメント間でエンティティを再分配します。この機能を有効にするには、まず<strong>クラスタリングキーとして</strong>スカラーフィールドを選択する必要があります。これにより、Milvusはクラスタリングキーの値が特定の範囲内にあるエンティティをセグメントに再分配することができます。クラスタリングコンパクションをトリガーすると、Milvusは<strong>PartitionStatsという</strong>グローバルインデックスを生成/更新し、セグメントとクラスタリングキー値のマッピング関係を記録します。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/clustering-compaction.png" alt="Clustering Compaction" class="doc-image" id="clustering-compaction" />
   </span> <span class="img-wrapper"> <span>クラスタリングコンパクション</span> </span></p>
<p><strong>PartitionStatsを</strong>参照として、Milvusはクラスタリングキー値を持つ検索/クエリリクエストを受信した際に無関係なデータを刈り込み、その値にマッピングされたセグメント内で検索範囲を制限することで、検索パフォーマンスを向上させることができます。性能向上の詳細については、<a href="/docs/ja/clustering-compaction.md#Benchmark-Test">ベンチマーク</a>テストを参照してください。</p>
<h2 id="Use-Clustering-Compaction" class="common-anchor-header">クラスタリング・コンパクションの使用<button data-href="#Use-Clustering-Compaction" class="anchor-icon" translate="no">
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
    </button></h2><p>MilvusのClustering Compaction機能は高度な設定が可能です。手動で起動させることも、Milvusが一定間隔で自動的に起動させるように設定することもできます。クラスタリングコンパクションを有効にするには、次のようにします：</p>
<h3 id="Global-Configuration" class="common-anchor-header">グローバル設定</h3><p>Milvusの設定ファイルを以下のように変更する必要があります。</p>
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
     <th><p>設定項目</p></th>
     <th><p>設定項目</p></th>
     <th><p>デフォルト値</p></th>
   </tr>
   <tr>
     <td colspan="3"><p><code translate="no">dataCoord.compaction.clustering</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">enable</code></p></td>
     <td><p>クラスタリングコンパクションを有効にするかどうかを指定します。クラスタリングキーを持つすべてのコレクションでこの機能を有効にする必要がある場合は、<code translate="no">true</code> に設定します。</p></td>
     <td><p>false</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">autoEnable</code></p></td>
     <td><p>自動的にトリガーされるコンパクションを有効にするかどうかを指定します。これを<code translate="no">true</code> に設定すると、Milvusは指定された間隔でクラスタリングキーを持つコレクションを圧縮します。</p></td>
     <td><p>false</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">triggerInterval</code></p></td>
     <td><p>Milvusがクラスタリング圧縮を開始する間隔をミリ秒単位で指定します。これは、<code translate="no">autoEnable</code> を<code translate="no">true</code> に設定した場合にのみ適用されます。</p></td>
     <td></td>
   </tr>
   <tr>
     <td><p><code translate="no">minInterval</code></p></td>
     <td><p>最小間隔をミリ秒単位で指定します。これは<code translate="no">autoEnable</code> から<code translate="no">true</code> を設定した場合にのみ適用されます。</p><p>これを<code translate="no">triggerInterval</code> より大きい整数に設定すると、短時間に繰り返し圧縮が行われるのを防ぐことができます。</p></td>
     <td></td>
   </tr>
   <tr>
     <td><p><code translate="no">maxInterval</code></p></td>
     <td><p>最大間隔をミリ秒単位で指定します。<code translate="no">autoEnable</code> から<code translate="no">true</code> に設定した場合のみ適用されます。</p><p>Milvusは、コレクションがこの値より長い期間クラスタリング圧縮されていないことを検出すると、強制的にクラスタリング圧縮を行います。</p></td>
     <td></td>
   </tr>
   <tr>
     <td><p><code translate="no">newDataSizeThreshold</code></p></td>
     <td><p>クラスタリング圧縮をトリガする上限しきい値を指定します。これは、<code translate="no">autoEnable</code> を<code translate="no">true</code> に設定した場合にのみ適用されます。</p><p>Milvusは、コレクション内のデータ量がこの値を超えたことを検出すると、クラスタリングコンパクション処理を開始します。</p></td>
     <td></td>
   </tr>
   <tr>
     <td><p><code translate="no">timeout</code></p></td>
     <td><p>クラスタリングコンパクションのタイムアウト時間を指定します。実行時間がこの値を超えると、クラスタリング圧縮は失敗します。</p></td>
     <td></td>
   </tr>
   <tr>
     <td colspan="3"><p><code translate="no">queryNode</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">enableSegmentPrune</code></p></td>
     <td><p>Milvusが検索/クエリ要求を受信したときに、PartitionStatsを参照してデータをプルーンするかどうかを指定します。これを<code translate="no">true</code> に設定すると、Milvus は検索/クエリ要求を受信したときに PartitionStats を参照してデータをプルーンできます。</p></td>
     <td></td>
   </tr>
   <tr>
     <td colspan="3"><p><code translate="no">dataNode.clusteringCompaction</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">memoryBufferRatio</code></p></td>
     <td><p>クラスタリング・コンパクション・タスクのメモリ・バッファ比率を指定します。  Milvusは、データサイズがこの比率を使用して計算された割り当てバッファサイズを超えると、データをフラッシュします。</p></td>
     <td></td>
   </tr>
   <tr>
     <td><p><code translate="no">workPoolSize</code></p></td>
     <td><p>クラスタリング・コンパクション・タスクのワーカープールサイズを指定します。</p></td>
     <td></td>
   </tr>
   <tr>
     <td colspan="3"><p><code translate="no">common</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">usePartitionKeyAsClusteringKey</code></p></td>
     <td><p>コレクション内のパーティション・キーをクラスタリング・キーとして使用するかどうかを指定します。これをtrueに設定すると、milvusはコレクション内のパーティション・キーをクラスタリング・キーとして扱います。 </p><p>明示的にクラスタリング・キーを設定することで、コレクション内のこの設定を常に上書きできます。</p></td>
     <td></td>
   </tr>
</table>
<p>上記の変更をMilvusクラスタに適用するには、<a href="/docs/ja/configure-helm.md#Configure-Milvus-via-configuration-file">HelmによるMilvusの設定</a>および<a href="/docs/ja/configure_operator.md">Milvus OperatorsによるMilvusの</a>設定の手順に従ってください。</p>
<h3 id="Collection-Configuration" class="common-anchor-header">コレクションの構成</h3><p>特定のコレクションでクラスタリングコンパクトを行うには、クラスタリングキーとしてコレクションからスカラーフィールドを選択する必要があります。</p>
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
<p><code translate="no">Int8</code>,<code translate="no">Int16</code>,<code translate="no">Int32</code>,<code translate="no">Int64</code>,<code translate="no">Float</code>,<code translate="no">Double</code>, および<code translate="no">VarChar</code>.</p>
</div>
<h3 id="Trigger-Clustering-Compaction" class="common-anchor-header">クラスタリング・コンパクションのトリガー</h3><p>自動クラスタリングコンパクションを有効にしている場合、Milvusは指定された間隔で自動的にコンパクションをトリガします。また、以下のように手動でコンパクションをトリガすることもできます：</p>
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
<h2 id="Benchmark-Test" class="common-anchor-header">ベンチマークテスト<button data-href="#Benchmark-Test" class="anchor-icon" translate="no">
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
    </button></h2><p>データ量とクエリパターンの組み合わせによって、クラスタリングコンパクションがもたらすパフォーマンスの向上が決まります。社内のベンチマーク・テストでは、クラスタリング・コンパクションによって1秒あたりのクエリー数（QPS）が最大25倍向上することが実証されています。</p>
<p>ベンチマークテストは、<code translate="no">key</code> フィールドをクラスタリングキーとして指定した、2,000 万、768 次元の LAION データセットのエンティティを含むコレクションを対象としている。コレクション内でクラスタリング圧縮がトリガーされた後、CPU使用率が高水準に達するまで同時検索が送信される。</p>
<table>
   <tr>
     <th rowspan="2"><p>検索フィルター</p></th>
     <th rowspan="2"><p>プルーンの比率</p></th>
     <th colspan="5"><p>待ち時間</p></th>
     <th rowspan="2"><p>待ち時間</p></th>
   </tr>
   <tr>
     <td><p>平均</p></td>
     <td><p>最小</p></td>
     <td><p>最大</p></td>
     <td><p>中央値</p></td>
     <td><p>TP99</p></td>
   </tr>
   <tr>
     <td><p>該当なし</p></td>
     <td><p>0%</p></td>
     <td><p>1685</p></td>
     <td><p>672</p></td>
     <td><p>2294</p></td>
     <td><p>1710</p></td>
     <td><p>2291</p></td>
     <td><p>17.75</p></td>
   </tr>
   <tr>
     <td><p>キー&gt;200、キー&lt;800</p></td>
     <td><p>40.2%</p></td>
     <td><p>1045</p></td>
     <td><p>47</p></td>
     <td><p>1828</p></td>
     <td><p>1085</p></td>
     <td><p>1617</p></td>
     <td><p>28.38</p></td>
   </tr>
   <tr>
     <td><p>キー&gt;200、キー&lt;600</p></td>
     <td><p>59.8%</p></td>
     <td><p>829</p></td>
     <td><p>45</p></td>
     <td><p>1483</p></td>
     <td><p>882</p></td>
     <td><p>1303</p></td>
     <td><p>35.78</p></td>
   </tr>
   <tr>
     <td><p>キー&gt;200かつキー&lt;400</p></td>
     <td><p>79.5%</p></td>
     <td><p>550</p></td>
     <td><p>100</p></td>
     <td><p>985</p></td>
     <td><p>584</p></td>
     <td><p>898</p></td>
     <td><p>54.00</p></td>
   </tr>
   <tr>
     <td><p>キー==1000</p></td>
     <td><p>99%</p></td>
     <td><p>68</p></td>
     <td><p>24</p></td>
     <td><p>1273</p></td>
     <td><p>70</p></td>
     <td><p>246</p></td>
     <td><p>431.41</p></td>
   </tr>
</table>
<p>検索フィルターで検索範囲を狭めると、プルーンの比率が高くなる。これは、検索プロセスでより多くのエンティティがスキップされることを意味します。最初の行と最後の行の統計値を比較すると、クラスタリング・コンパクションなしの検索では、コレクション全体をスキャンする必要があることがわかります。一方、特定のキーを使用してクラスタリング・コンパクションを行う検索では、最大25倍の改善が得られます。</p>
<h2 id="Best-Practices" class="common-anchor-header">ベストプラクティス<button data-href="#Best-Practices" class="anchor-icon" translate="no">
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
    </button></h2><p>クラスタリングコンパクションを効率的に使用するためのヒントをいくつか紹介します：</p>
<ul>
<li><p>データボリュームの大きいコレクションでこれを有効にします。</p>
<p>検索パフォーマンスは、コレクション内のデータ量が大きいほど向上します。100万エンティティを超えるコレクションでは、この機能を有効にすることをお勧めします。</p></li>
<li><p>適切なクラスタリングキーを選択します。</p>
<p>フィルタリング条件としてよく使用されるスカラフィールドをクラスタリングキーとして使用できます。複数のテナントからのデータを保持するコレクションでは、あるテナントと別のテナントを区別するフィールドをクラスタリ ング・キーとして使用できます。</p></li>
<li><p>パーティション・キーをクラスタリング・キーとして使用します。</p>
<p>Milvusインスタンスのすべてのコレクションでこの機能を有効にしたい場合、またはパーティションキーを持つ大規模なコレクションでパフォーマンスの問題にまだ直面している場合は、<code translate="no">common.usePartitionKeyAsClusteringKey</code> を<code translate="no">true</code> に設定できます。そうすることで、コレクション内のスカラーフィールドをパーティションキーとして選択した場合、クラスタリングキーとパーティションキーを持つことになります。</p>
<p>この設定は、別のスカラー・フィールドをクラスタリング・キーとして選択することを妨げるものではありません。明示的に指定されたクラスタリング・キーが常に優先されます。</p></li>
</ul>
