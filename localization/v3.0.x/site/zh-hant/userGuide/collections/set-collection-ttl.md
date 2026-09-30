---
id: set-collection-ttl.md
title: 設定收集 TTL
summary: 設定集合層級或實體層級的 TTL 政策，讓過期資料在 Milvus 中自動過期。
---
<h1 id="Set-Collection-TTL" class="common-anchor-header">設定收集 TTL<button data-href="#Set-Collection-TTL" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 可以透過<strong>Time-to-Live (TTL)</strong>策略自動使實體過期。過期的實體會立即停止出現在查詢和搜尋結果中，並在下一個壓縮週期（通常是 24 小時內）從儲存中移除。</p>
<p>有兩種 TTL 模式：</p>
<ul>
<li><p><strong>集合層級 TTL</strong>- 每個實體共享一個保留視窗，透過<code translate="no">collection.ttl.seconds</code> 屬性設定。</p></li>
<li><p><strong>實體層級 TTL</strong>- 每個實體在專用的<code translate="no">TIMESTAMPTZ</code> 欄位中都有自己的絕對到期時間，透過<code translate="no">ttl_field</code> 屬性標示為 TTL 欄位。</p></li>
</ul>
<div class="alert note">
<p>此功能僅適用於管理的集合。</p>
</div>
<h2 id="Limits" class="common-anchor-header">限制<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>這兩種 TTL 模式是互斥的。一個集合不能同時設定<code translate="no">collection.ttl.seconds</code> 和<code translate="no">ttl_field</code> 。若要切換，請參閱<a href="/docs/zh-hant/set-collection-ttl.md#Migrate-between-the-two-modes">在兩種模式之間</a>轉換。</p></li>
<li><p>集合層級 TTL 對整個集合套用一個視窗。如果單一行需要不同的使用期限，請使用實體層級 TTL。</p></li>
<li><p>實體層級 TTL 的欄位必須是<code translate="no">TIMESTAMPTZ</code> 。其他類型會被拒絕。</p></li>
<li><p>每個集合只有一個 TTL 欄位。模式可以包含多個<code translate="no">TIMESTAMPTZ</code> 欄位，但只有一個可以用<code translate="no">ttl_field</code> 命名。</p></li>
<li><p>丟棄<code translate="no">ttl_field</code> 不會重新出現過期的實體。若要恢復過期的實體，請使用<code translate="no">NULL</code> 或未來的過期時間戳來重新插入。</p></li>
</ul>
<h2 id="Overview" class="common-anchor-header">概述<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p><details></p>
<p><summary>展開</summary></p>
<h3 id="When-to-use-TTL" class="common-anchor-header">何時使用 TTL<button data-href="#When-to-use-TTL" class="anchor-icon" translate="no">
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
    </button></h3><p>當保留是一項<strong>政策</strong>時，TTL 是正確的工具 - 您事先知道某些實體最終應消失，而且您希望群集在您不寫 cron job 的情況下強制執行。</p>
<p>典型情況：</p>
<ul>
<li><p><strong>時間窗資料集。</strong>只保留最近 N 天的日誌、度量指標、事件或短期功能快取。</p></li>
<li><p><strong>多租戶集合。</strong>不同租戶在同一資料集中有不同的保留視窗。</p></li>
<li><p><strong>每筆記錄保留政策。</strong>物聯網管道、文件儲存或 MLOps 特徵儲存中的每筆文件保留期限。</p></li>
<li><p><strong>熱/冷資料混合。</strong>短期實體與長期實體共存於同一資料集中。</p></li>
<li><p><strong>合規驅動的過期。</strong>GDPR 式的資料最小化，每筆記錄都有自己的「刪除日期」。</p></li>
<li><p><strong>業務時間過期。</strong>實體代表僅在某個絕對時刻（活動結束、會話過期）之前有效的記錄。</p></li>
</ul>
<div class="alert note">
<p>過期的實體不會出現在任何搜尋或查詢結果中。不過，它們可能會留在儲存中，直到隨後的資料壓縮為止，而資料壓縮應該在未來 24 小時內進行。</p>
<p>您可以在 Milvus 配置檔中設定<code translate="no">dataCoord.compaction.expiry.tolerance</code> 配置項目，以控制何時觸發資料壓縮。</p>
<p>此配置項的預設值為<code translate="no">-1</code> ，表示現有的資料壓縮間隔適用。但是，當您將其值變更為正整數，如<code translate="no">12</code> 時，資料壓縮將在任何實體過期後的指定小時數觸發。</p>
</div>
<h3 id="TTL-modes" class="common-anchor-header">TTL 模式<button data-href="#TTL-modes" class="anchor-icon" translate="no">
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
    </button></h3><p>這兩種模式會回答不同的保留問題：</p>
<ul>
<li><p><strong>集合層級 TTL</strong>會對每個實體套用單一保留期限。每個實體會在<code translate="no">insert_ts + ttl_seconds</code> 過期。</p></li>
<li><p><strong>實體級 TTL</strong>可讓每個實體在<code translate="no">TIMESTAMPTZ</code> 欄位中儲存自己的絕對過期時間。該欄位中的<code translate="no">NULL</code> 表示該實體永不過期。</p></li>
</ul>
<p>集合一次使用<strong>一種</strong>模式 - 兩者是互斥的。在兩種模式之間切換需要多個步驟的操作；請參閱在兩種模式之間遷移。</p>
<p>使用此表選擇一種模式：</p>
<table>
   <tr>
     <th><p><strong>如果您的情況是...</strong></p></th>
     <th><p><strong>使用</strong></p></th>
   </tr>
   <tr>
     <td><p>集合中的每個實體都應遵循相同的保留視窗</p></td>
     <td><p>集合層級 TTL</p></td>
   </tr>
   <tr>
     <td><p>保留為「從插入的那一刻起，保留 N 秒」。</p></td>
     <td><p>集合層級 TTL</p></td>
   </tr>
   <tr>
     <td><p>在相同的集合中，不同的實體需要不同的生命週期 (每個租戶、熱/冷、每個文件)</p></td>
     <td><p>實體級 TTL</p></td>
   </tr>
   <tr>
     <td><p>保留是絕對的牆鐘時間（例如，2027-01-01T00:00:00Z）</p></td>
     <td><p>實體層級 TTL</p></td>
   </tr>
   <tr>
     <td><p>保留時間由業務時間戳驅動，而非插入時間戳</p></td>
     <td><p>實體層級 TTL</p></td>
   </tr>
   <tr>
     <td><p>您想要在插入後刷新或延長實體的生命週期</p></td>
     <td><p>實體層級 TTL</p></td>
   </tr>
   <tr>
     <td><p>某些實體應該永遠不會過期，而其他實體則應該</p></td>
     <td><p>實體層級 TTL（對於不過期的實體使用 NULL）</p></td>
   </tr>
</table>
<p></details></p>
<h2 id="Set-collection-level-TTL" class="common-anchor-header">設定集合層級 TTL<button data-href="#Set-collection-level-TTL" class="anchor-icon" translate="no">
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
    </button></h2><p>當集合中的每個實體都應該遵循相同的保留視窗時，請使用集合層級 TTL。</p>
<h3 id="Enable-on-a-new-collection" class="common-anchor-header">在新集合上啟用<button data-href="#Enable-on-a-new-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>在建立時透過<code translate="no">properties</code> map 傳送<code translate="no">collection.ttl.seconds</code> (整數，以秒為單位)。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>)

index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>
)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
    index_params=index_params,
<span class="highlighted-comment-line">    properties={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>: <span class="hljs-number">1209600</span>  <span class="hljs-comment"># 14 days</span></span>
<span class="highlighted-comment-line">    },</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> CreateCollectionReq.CollectionSchema.builder().build();
schema.addField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;id&quot;</span>).dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>).autoID(<span class="hljs-literal">false</span>).build());
schema.addField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;vector&quot;</span>).dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">128</span>).build());

<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParam</span> <span class="hljs-operator">=</span> IndexParam.builder().fieldName(<span class="hljs-string">&quot;vector&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.COSINE).build();

<span class="highlighted-comment-line">Map&lt;String, String&gt; properties = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();</span>
<span class="highlighted-comment-line">properties.put(<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>, <span class="hljs-string">&quot;1209600&quot;</span>); <span class="hljs-comment">// 14 days</span></span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line">client.createCollection(CreateCollectionReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .collectionSchema(schema)</span>
<span class="highlighted-comment-line">        .indexParams(Collections.singletonList(indexParam))</span>
<span class="highlighted-comment-line">        .properties(properties)</span>
<span class="highlighted-comment-line">        .build());</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
  <span class="hljs-attr">fields</span>: [
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>, <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">autoID</span>: <span class="hljs-literal">false</span> },
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>, <span class="hljs-attr">dim</span>: <span class="hljs-number">128</span> },
  ],
  <span class="hljs-attr">index_params</span>: [
    { <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;COSINE&quot;</span> },
  ],
<span class="highlighted-comment-line">  <span class="hljs-attr">properties</span>: {</span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>: <span class="hljs-number">1209600</span>, <span class="hljs-comment">// 14 days</span></span>
<span class="highlighted-comment-line">  },</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;my_collection&quot;</span>, schema).
    WithProperty(common.CollectionTTLConfigKey, <span class="hljs-number">1209600</span>)) <span class="hljs-comment">//  TTL in seconds</span>
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> params=<span class="hljs-string">&#x27;{
    &quot;ttlSeconds&quot;: 1209600
}&#x27;</span>

<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

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
<h3 id="Enable-on-an-existing-collection" class="common-anchor-header">在現有集合上啟用<button data-href="#Enable-on-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>使用<code translate="no">properties</code> 映射中的<code translate="no">collection.ttl.seconds</code> 來呼叫<code translate="no">alter_collection_properties</code> ，以將 TTL 應用於已在使用中的集合。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Assumes &quot;my_collection&quot; was created earlier without TTL</span>
schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>)

index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>
)

<span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> client.has_collection(<span class="hljs-string">&quot;my_collection&quot;</span>):
    client.create_collection(
        collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
        schema=schema,
        index_params=index_params,
    )

<span class="highlighted-comment-line">client.alter_collection_properties(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    properties={<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>: <span class="hljs-number">1209600</span>},</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AlterCollectionPropertiesReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="hljs-comment">// Assumes &quot;my_collection&quot; was created earlier without TTL.</span>

<span class="highlighted-comment-line">Map&lt;String, String&gt; properties = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();</span>
<span class="highlighted-comment-line">properties.put(<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>, <span class="hljs-string">&quot;1209600&quot;</span>);</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line">client.alterCollectionProperties(AlterCollectionPropertiesReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .properties(properties)</span>
<span class="highlighted-comment-line">        .build());</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="hljs-comment">// Assumes &quot;my_collection&quot; was created earlier without TTL.</span>
<span class="highlighted-comment-line"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">alterCollectionProperties</span>({</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">properties</span>: { <span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>: <span class="hljs-number">1209600</span> },</span>
<span class="highlighted-comment-line">});</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.AlterCollectionProperties(ctx, milvusclient.NewAlterCollectionPropertiesOption(<span class="hljs-string">&quot;my_collection&quot;</span>).
    WithProperty(common.CollectionTTLConfigKey, <span class="hljs-number">60</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/alter_properties&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;properties\&quot;: {
        \&quot;collection.ttl.seconds\&quot;: 1209600
    }
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Drop-the-TTL-setting" class="common-anchor-header">取消 TTL 設定<button data-href="#Drop-the-TTL-setting" class="anchor-icon" translate="no">
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
    </button></h3><p>如果您決定無限期地保留集合中的資料，您可以簡單地從該集合中刪除 TTL 設定。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.drop_collection_properties(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    property_keys=[<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>],</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.DropCollectionPropertiesReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="highlighted-comment-line">client.dropCollectionProperties(DropCollectionPropertiesReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .propertyKeys(Collections.singletonList(<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>))</span>
<span class="highlighted-comment-line">        .build());</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="highlighted-comment-line"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropCollectionProperties</span>({</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">properties</span>: [<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>],</span>
<span class="highlighted-comment-line">});</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.DropCollectionProperties(ctx, milvusclient.NewDropCollectionPropertiesOption(<span class="hljs-string">&quot;my_collection&quot;</span>, common.CollectionTTLConfigKey))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/drop_properties&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;propertyKeys\&quot;: [
        \&quot;collection.ttl.seconds\&quot;
    ]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-entity-level-TTL--Milvus-30x" class="common-anchor-header">設定實體層級的 TTL<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Set-entity-level-TTL--Milvus-30x" class="anchor-icon" translate="no">
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
    </button></h2><p>實體層級 TTL 讓每個實體都有自己的絕對過期時間。時間儲存在您在模式中宣告的專屬<code translate="no">TIMESTAMPTZ</code> 欄位中，您可以透過<code translate="no">ttl_field</code> 集合屬性，將該欄位標記為 TTL 欄位。</p>
<h3 id="Enable-on-a-new-collection" class="common-anchor-header">在新集合上啟用<button data-href="#Enable-on-a-new-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>在創建時啟用實體級 TTL 需要在同一個<code translate="no">create_collection</code> 呼叫中增加兩個項目：模式中的<code translate="no">TIMESTAMPTZ</code> 欄位，以及指向該欄位的<code translate="no">ttl_field</code> 屬性。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

schema = client.create_schema(enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
<span class="highlighted-wrapper-line">schema.add_field(<span class="hljs-string">&quot;expire_at&quot;</span>, DataType.TIMESTAMPTZ, nullable=<span class="hljs-literal">True</span>)</span>
schema.add_field(<span class="hljs-string">&quot;vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>)

index_params = client.prepare_index_params()
index_params.add_index(field_name=<span class="hljs-string">&quot;vector&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
                       metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
    index_params=index_params,
<span class="highlighted-wrapper-line">    properties={<span class="hljs-string">&quot;ttl_field&quot;</span>: <span class="hljs-string">&quot;expire_at&quot;</span>},</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> CreateCollectionReq.CollectionSchema.builder().build();
schema.addField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;id&quot;</span>).dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>).autoID(<span class="hljs-literal">false</span>).build());
<span class="highlighted-wrapper-line">schema.addField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;expire_at&quot;</span>).dataType(DataType.Timestamptz)</span>
        .isNullable(<span class="hljs-literal">true</span>).build());
schema.addField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;vector&quot;</span>).dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">128</span>).build());

<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParam</span> <span class="hljs-operator">=</span> IndexParam.builder().fieldName(<span class="hljs-string">&quot;vector&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.COSINE).build();

<span class="highlighted-wrapper-line">Map&lt;String, String&gt; properties = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();</span>
<span class="highlighted-wrapper-line">properties.put(<span class="hljs-string">&quot;ttl_field&quot;</span>, <span class="hljs-string">&quot;expire_at&quot;</span>);</span>

client.createCollection(CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .collectionSchema(schema)
        .indexParams(Collections.singletonList(indexParam))
        .properties(properties)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
  <span class="hljs-attr">fields</span>: [
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>, <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">autoID</span>: <span class="hljs-literal">false</span> },
<span class="highlighted-wrapper-line">    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;expire_at&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Timestamptz</span>, <span class="hljs-attr">nullable</span>: <span class="hljs-literal">true</span> },</span>
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>, <span class="hljs-attr">dim</span>: <span class="hljs-number">128</span> },
  ],
  <span class="hljs-attr">index_params</span>: [
    { <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;COSINE&quot;</span> },
  ],
<span class="highlighted-wrapper-line">  <span class="hljs-attr">properties</span>: { <span class="hljs-attr">ttl_field</span>: <span class="hljs-string">&quot;expire_at&quot;</span> },</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>一旦集合存在，插入具有<a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>時間戳字串的實體。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Assumes &quot;my_collection&quot; was created earlier with `ttl_field`: &quot;expire_at&quot;</span>
<span class="highlighted-comment-line">rows = [</span>
<span class="highlighted-comment-line">    <span class="hljs-comment"># Never expires</span></span>
<span class="highlighted-comment-line">    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;expire_at&quot;</span>: <span class="hljs-literal">None</span>,</span>
<span class="highlighted-comment-line">     <span class="hljs-string">&quot;vector&quot;</span>: [random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">128</span>)]},</span>
<span class="highlighted-comment-line">    <span class="hljs-comment"># Expires at 2026-12-31 UTC midnight</span></span>
<span class="highlighted-comment-line">    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&quot;expire_at&quot;</span>: <span class="hljs-string">&quot;2026-12-31T00:00:00Z&quot;</span>,</span>
<span class="highlighted-comment-line">     <span class="hljs-string">&quot;vector&quot;</span>: [random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">128</span>)]},</span>
<span class="highlighted-comment-line">    <span class="hljs-comment"># Shanghai local time — normalized to UTC internally</span></span>
<span class="highlighted-comment-line">    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&quot;expire_at&quot;</span>: <span class="hljs-string">&quot;2027-01-01T00:00:00+08:00&quot;</span>,</span>
<span class="highlighted-comment-line">     <span class="hljs-string">&quot;vector&quot;</span>: [random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">128</span>)]},</span>
<span class="highlighted-comment-line">]</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line">client.insert(<span class="hljs-string">&quot;my_collection&quot;</span>, rows)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.List;
<span class="hljs-keyword">import</span> java.util.Random;

<span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonNull;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;

<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="hljs-comment">// Assumes &quot;my_collection&quot; was created earlier with `ttl_field`: &quot;expire_at&quot;.</span>
<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
<span class="hljs-type">Random</span> <span class="hljs-variable">rng</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Random</span>();

List&lt;Float&gt; vector = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
<span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> <span class="hljs-variable">i</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">128</span>; i++) vector.add(rng.nextFloat());

<span class="highlighted-comment-line">List&lt;JsonObject&gt; rows = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment">// Never expires</span></span>
<span class="highlighted-comment-line"><span class="hljs-type">JsonObject</span> <span class="hljs-variable">r1</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();</span>
<span class="highlighted-comment-line">r1.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">1</span>);</span>
<span class="highlighted-comment-line">r1.add(<span class="hljs-string">&quot;expire_at&quot;</span>, JsonNull.INSTANCE);</span>
<span class="highlighted-comment-line">r1.add(<span class="hljs-string">&quot;vector&quot;</span>, gson.toJsonTree(vector));</span>
<span class="highlighted-comment-line">rows.add(r1);</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment">// Expires at 2026-12-31 UTC midnight</span></span>
<span class="highlighted-comment-line"><span class="hljs-type">JsonObject</span> <span class="hljs-variable">r2</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();</span>
<span class="highlighted-comment-line">r2.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">2</span>);</span>
<span class="highlighted-comment-line">r2.addProperty(<span class="hljs-string">&quot;expire_at&quot;</span>, <span class="hljs-string">&quot;2026-12-31T00:00:00Z&quot;</span>);</span>
<span class="highlighted-comment-line">r2.add(<span class="hljs-string">&quot;vector&quot;</span>, gson.toJsonTree(vector));</span>
<span class="highlighted-comment-line">rows.add(r2);</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment">// Shanghai local time — normalized to UTC internally</span></span>
<span class="highlighted-comment-line"><span class="hljs-type">JsonObject</span> <span class="hljs-variable">r3</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();</span>
<span class="highlighted-comment-line">r3.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">3</span>);</span>
<span class="highlighted-comment-line">r3.addProperty(<span class="hljs-string">&quot;expire_at&quot;</span>, <span class="hljs-string">&quot;2027-01-01T00:00:00+08:00&quot;</span>);</span>
<span class="highlighted-comment-line">r3.add(<span class="hljs-string">&quot;vector&quot;</span>, gson.toJsonTree(vector));</span>
<span class="highlighted-comment-line">rows.add(r3);</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line">client.insert(InsertReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .data(rows)</span>
<span class="highlighted-comment-line">        .build());</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="hljs-keyword">const</span> vector = <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>({ <span class="hljs-attr">length</span>: <span class="hljs-number">128</span> }, <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>());

<span class="hljs-comment">// Assumes &quot;my_collection&quot; was created earlier with `ttl_field`: &quot;expire_at&quot;.</span>
<span class="highlighted-comment-line"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">data</span>: [</span>
<span class="highlighted-comment-line">    <span class="hljs-comment">// Never expires</span></span>
<span class="highlighted-comment-line">    { <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">expire_at</span>: <span class="hljs-literal">null</span>, vector },</span>
<span class="highlighted-comment-line">    <span class="hljs-comment">// Expires at 2026-12-31 UTC midnight</span></span>
<span class="highlighted-comment-line">    { <span class="hljs-attr">id</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">expire_at</span>: <span class="hljs-string">&quot;2026-12-31T00:00:00Z&quot;</span>, vector },</span>
<span class="highlighted-comment-line">    <span class="hljs-comment">// Shanghai local time — normalized to UTC internally</span></span>
<span class="highlighted-comment-line">    { <span class="hljs-attr">id</span>: <span class="hljs-number">3</span>, <span class="hljs-attr">expire_at</span>: <span class="hljs-string">&quot;2027-01-01T00:00:00+08:00&quot;</span>, vector },</span>
<span class="highlighted-comment-line">  ],</span>
<span class="highlighted-comment-line">});</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>在每次查詢和向量搜尋時，伺服器都會自動插入 TTL 過濾器 - 您不需要自己寫一個，過期的實體也不會出現在結果中：</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

client.load_collection(<span class="hljs-string">&quot;my_collection&quot;</span>)

<span class="highlighted-comment-line"><span class="hljs-comment"># Expired rows are filtered out automatically</span></span>
<span class="highlighted-comment-line">results = client.query(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;id &gt;= 0&quot;</span>,</span>
<span class="highlighted-comment-line">    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;expire_at&quot;</span>],</span>
<span class="highlighted-comment-line">    limit=<span class="hljs-number">10</span>,</span>
<span class="highlighted-comment-line">)</span>
<span class="highlighted-comment-line"><span class="hljs-built_in">print</span>(results)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Arrays;

<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.LoadCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.QueryResp;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

client.loadCollection(LoadCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .build());

<span class="highlighted-comment-line"><span class="hljs-comment">// Expired rows are filtered out automatically</span></span>
<span class="highlighted-comment-line"><span class="hljs-type">QueryResp</span> <span class="hljs-variable">results</span> <span class="hljs-operator">=</span> client.query(QueryReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .filter(<span class="hljs-string">&quot;id &gt;= 0&quot;</span>)</span>
<span class="highlighted-comment-line">        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;expire_at&quot;</span>))</span>
<span class="highlighted-comment-line">        .limit(<span class="hljs-number">10L</span>)</span>
<span class="highlighted-comment-line">        .build());</span>
<span class="highlighted-comment-line">System.out.println(results.getQueryResults());</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">loadCollection</span>({ <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span> });

<span class="highlighted-comment-line"><span class="hljs-comment">// Expired rows are filtered out automatically</span></span>
<span class="highlighted-comment-line"><span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">filter</span>: <span class="hljs-string">&quot;id &gt;= 0&quot;</span>,</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;expire_at&quot;</span>],</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,</span>
<span class="highlighted-comment-line">});</span>
<span class="highlighted-comment-line"><span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(results.<span class="hljs-property">data</span>);</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>同樣的自動過濾器也適用於<code translate="no">client.search()</code> 。</p>
<p>要在壓縮實體物理移除之前延長實體的生命週期，可以使用較後的過期時間戳來 upsert - 或<code translate="no">None</code> - 將實體送回可查詢集。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.upsert(<span class="hljs-string">&quot;my_collection&quot;</span>, [</span>
<span class="highlighted-comment-line">    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,</span>
<span class="highlighted-comment-line">     <span class="hljs-string">&quot;vector&quot;</span>: [random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">128</span>)],</span>
<span class="highlighted-comment-line">     <span class="hljs-string">&quot;expire_at&quot;</span>: <span class="hljs-string">&quot;2028-01-01T00:00:00Z&quot;</span>},</span>
<span class="highlighted-comment-line">])</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.List;
<span class="hljs-keyword">import</span> java.util.Random;

<span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;

<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.UpsertReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
<span class="hljs-type">Random</span> <span class="hljs-variable">rng</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Random</span>();
List&lt;Float&gt; vector = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
<span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> <span class="hljs-variable">i</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">128</span>; i++) vector.add(rng.nextFloat());

<span class="highlighted-comment-line"><span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();</span>
<span class="highlighted-comment-line">row.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">2</span>);</span>
<span class="highlighted-comment-line">row.add(<span class="hljs-string">&quot;vector&quot;</span>, gson.toJsonTree(vector));</span>
<span class="highlighted-comment-line">row.addProperty(<span class="hljs-string">&quot;expire_at&quot;</span>, <span class="hljs-string">&quot;2028-01-01T00:00:00Z&quot;</span>);</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line">client.upsert(UpsertReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .data(Collections.singletonList(row))</span>
<span class="highlighted-comment-line">        .build());</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="hljs-keyword">const</span> vector = <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>({ <span class="hljs-attr">length</span>: <span class="hljs-number">128</span> }, <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>());

<span class="highlighted-comment-line"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">upsert</span>({</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">data</span>: [</span>
<span class="highlighted-comment-line">    { <span class="hljs-attr">id</span>: <span class="hljs-number">2</span>, vector, <span class="hljs-attr">expire_at</span>: <span class="hljs-string">&quot;2028-01-01T00:00:00Z&quot;</span> },</span>
<span class="highlighted-comment-line">  ],</span>
<span class="highlighted-comment-line">});</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Enable-on-an-existing-collection" class="common-anchor-header">在現有的集合上啟用<button data-href="#Enable-on-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>如果集合已經存在，而且沒有設定<code translate="no">collection.ttl.seconds</code> ，請使用<code translate="no">add_collection_field</code> 新增<code translate="no">TIMESTAMPTZ</code> 欄位，然後用<code translate="no">alter_collection_properties</code> 將其標示為 TTL 欄位。可選擇向上插入歷史記錄，以回填其到期時間戳記 - 未回填的記錄會保留<code translate="no">NULL</code> 且永不過期。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line"><span class="hljs-comment"># Step 1 — add a TIMESTAMPTZ column to the schema</span></span>
<span class="highlighted-comment-line">client.add_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;expire_at&quot;</span>,</span>
<span class="highlighted-comment-line">    data_type=DataType.TIMESTAMPTZ,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment"># Step 2 — mark the new column as the TTL field</span></span>
<span class="highlighted-comment-line">client.alter_collection_properties(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    properties={<span class="hljs-string">&quot;ttl_field&quot;</span>: <span class="hljs-string">&quot;expire_at&quot;</span>},</span>
<span class="highlighted-comment-line">)</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment"># Step 3 (optional) — backfill expiration timestamps for historical rows</span></span>
<span class="highlighted-comment-line">client.upsert(<span class="hljs-string">&quot;my_collection&quot;</span>, [</span>
<span class="highlighted-comment-line">    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,</span>
<span class="highlighted-comment-line">     <span class="hljs-string">&quot;vector&quot;</span>: [random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">128</span>)],</span>
<span class="highlighted-comment-line">     <span class="hljs-string">&quot;expire_at&quot;</span>: <span class="hljs-string">&quot;2026-12-31T00:00:00Z&quot;</span>},</span>
<span class="highlighted-comment-line">])</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.List;
<span class="hljs-keyword">import</span> java.util.Map;
<span class="hljs-keyword">import</span> java.util.Random;

<span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;

<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddCollectionFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AlterCollectionPropertiesReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.UpsertReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="highlighted-comment-line"><span class="hljs-comment">// Step 1 — add a TIMESTAMPTZ column to the schema</span></span>
<span class="highlighted-comment-line">client.addCollectionField(AddCollectionFieldReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .fieldName(<span class="hljs-string">&quot;expire_at&quot;</span>)</span>
<span class="highlighted-comment-line">        .dataType(DataType.Timestamptz)</span>
<span class="highlighted-comment-line">        .isNullable(<span class="hljs-literal">true</span>)</span>
<span class="highlighted-comment-line">        .build());</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment">// Step 2 — mark the new column as the TTL field</span></span>
<span class="highlighted-comment-line">Map&lt;String, String&gt; properties = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();</span>
<span class="highlighted-comment-line">properties.put(<span class="hljs-string">&quot;ttl_field&quot;</span>, <span class="hljs-string">&quot;expire_at&quot;</span>);</span>
<span class="highlighted-comment-line">client.alterCollectionProperties(AlterCollectionPropertiesReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .properties(properties)</span>
<span class="highlighted-comment-line">        .build());</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment">// Step 3 (optional) — backfill expiration timestamps for historical rows</span></span>
<span class="highlighted-comment-line"><span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();</span>
<span class="highlighted-comment-line"><span class="hljs-type">Random</span> <span class="hljs-variable">rng</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Random</span>();</span>
<span class="highlighted-comment-line">List&lt;Float&gt; vector = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();</span>
<span class="highlighted-comment-line"><span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> <span class="hljs-variable">i</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">128</span>; i++) vector.add(rng.nextFloat());</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();</span>
<span class="highlighted-comment-line">row.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">1</span>);</span>
<span class="highlighted-comment-line">row.add(<span class="hljs-string">&quot;vector&quot;</span>, gson.toJsonTree(vector));</span>
<span class="highlighted-comment-line">row.addProperty(<span class="hljs-string">&quot;expire_at&quot;</span>, <span class="hljs-string">&quot;2026-12-31T00:00:00Z&quot;</span>);</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line">client.upsert(UpsertReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .data(Collections.singletonList(row))</span>
<span class="highlighted-comment-line">        .build());</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="hljs-keyword">const</span> vector = <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>({ <span class="hljs-attr">length</span>: <span class="hljs-number">128</span> }, <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>());

<span class="highlighted-comment-line"><span class="hljs-comment">// Step 1 — add a TIMESTAMPTZ column to the schema</span></span>
<span class="highlighted-comment-line"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">addCollectionField</span>({</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">field</span>: { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;expire_at&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Timestamptz</span>, <span class="hljs-attr">nullable</span>: <span class="hljs-literal">true</span> },</span>
<span class="highlighted-comment-line">});</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment">// Step 2 — mark the new column as the TTL field</span></span>
<span class="highlighted-comment-line"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">alterCollectionProperties</span>({</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">properties</span>: { <span class="hljs-attr">ttl_field</span>: <span class="hljs-string">&quot;expire_at&quot;</span> },</span>
<span class="highlighted-comment-line">});</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment">// Step 3 (optional) — backfill expiration timestamps for historical rows</span></span>
<span class="highlighted-comment-line"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">upsert</span>({</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">data</span>: [</span>
<span class="highlighted-comment-line">    { <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, vector, <span class="hljs-attr">expire_at</span>: <span class="hljs-string">&quot;2026-12-31T00:00:00Z&quot;</span> },</span>
<span class="highlighted-comment-line">  ],</span>
<span class="highlighted-comment-line">});</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Drop-the-TTL-setting" class="common-anchor-header">取消 TTL 設定<button data-href="#Drop-the-TTL-setting" class="anchor-icon" translate="no">
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
    </button></h3><p>在<code translate="no">property_keys</code> 中以<code translate="no">ttl_field</code> 來呼叫<code translate="no">drop_collection_properties</code> ，以停止每個實體的過期。<code translate="no">TIMESTAMPTZ</code> 欄位本身仍保留在模式上 - 您仍可以將它當成一般欄位來查詢。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.drop_collection_properties(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    property_keys=[<span class="hljs-string">&quot;ttl_field&quot;</span>],</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.DropCollectionPropertiesReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="highlighted-comment-line">client.dropCollectionProperties(DropCollectionPropertiesReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .propertyKeys(Collections.singletonList(<span class="hljs-string">&quot;ttl_field&quot;</span>))</span>
<span class="highlighted-comment-line">        .build());</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="highlighted-comment-line"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropCollectionProperties</span>({</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">properties</span>: [<span class="hljs-string">&quot;ttl_field&quot;</span>],</span>
<span class="highlighted-comment-line">});</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>停用<code translate="no">ttl_field</code> 會停用未來查詢的自動過濾功能，但已過期的實體不會再自動浮現。若要使先前過期的實體變為可見，請使用<code translate="no">None</code> 或未來的過期時間戳來重新插入該實體 - 這是在同一載入階段中恢復對過期資料列存取的唯一方法。</p>
<h2 id="Migrate-between-the-two-modes" class="common-anchor-header">在兩種模式之間轉換<button data-href="#Migrate-between-the-two-modes" class="anchor-icon" translate="no">
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
    </button></h2><p>這兩種 TTL 模式是互斥的，因此在兩者之間切換需要多個步驟。</p>
<h3 id="Switch-from-collection-level-to-entity-level-TTL" class="common-anchor-header">從集合層級切換到實體層級 TTL<button data-href="#Switch-from-collection-level-to-entity-level-TTL" class="anchor-icon" translate="no">
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
    </button></h3><p>如果您的集合是使用<code translate="no">collection.ttl.seconds</code> 建立的，而您想要切換到每個實體到期，請遵循下列四個步驟。跳過步驟 1 會導致步驟 3 失敗，<code translate="no">collection TTL is already set, cannot be set ttl field</code> 。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Assumes &quot;my_collection&quot; already exists with `collection.ttl.seconds` set.</span>
<span class="highlighted-comment-line"><span class="hljs-comment"># Step 1 — disable collection-level TTL (mandatory; the two modes are mutually exclusive)</span></span>
<span class="highlighted-comment-line">client.drop_collection_properties(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    property_keys=[<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>],</span>
<span class="highlighted-comment-line">)</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment"># Step 2 — add a TIMESTAMPTZ column to the schema</span></span>
<span class="highlighted-comment-line">client.add_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;expire_at&quot;</span>,</span>
<span class="highlighted-comment-line">    data_type=DataType.TIMESTAMPTZ,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment"># Step 3 — set the ttl_field property on the column you just added</span></span>
<span class="highlighted-comment-line">client.alter_collection_properties(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    properties={<span class="hljs-string">&quot;ttl_field&quot;</span>: <span class="hljs-string">&quot;expire_at&quot;</span>},</span>
<span class="highlighted-comment-line">)</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment"># Step 4 (optional) — backfill expiration timestamps for historical entities</span></span>
<span class="highlighted-comment-line">client.upsert(<span class="hljs-string">&quot;my_collection&quot;</span>, [</span>
<span class="highlighted-comment-line">    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,</span>
<span class="highlighted-comment-line">     <span class="hljs-string">&quot;vector&quot;</span>: [random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">128</span>)],</span>
<span class="highlighted-comment-line">     <span class="hljs-string">&quot;expire_at&quot;</span>: <span class="hljs-string">&quot;2026-12-31T00:00:00Z&quot;</span>},</span>
<span class="highlighted-comment-line">])</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.List;
<span class="hljs-keyword">import</span> java.util.Map;
<span class="hljs-keyword">import</span> java.util.Random;

<span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;

<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddCollectionFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AlterCollectionPropertiesReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.DropCollectionPropertiesReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.UpsertReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="hljs-comment">// Assumes &quot;my_collection&quot; already exists with `collection.ttl.seconds` set.</span>
<span class="highlighted-comment-line"><span class="hljs-comment">// Step 1 — disable collection-level TTL (mandatory; the two modes are mutually exclusive)</span></span>
<span class="highlighted-comment-line">client.dropCollectionProperties(DropCollectionPropertiesReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .propertyKeys(Collections.singletonList(<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>))</span>
<span class="highlighted-comment-line">        .build());</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment">// Step 2 — add a TIMESTAMPTZ column to the schema</span></span>
<span class="highlighted-comment-line">client.addCollectionField(AddCollectionFieldReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .fieldName(<span class="hljs-string">&quot;expire_at&quot;</span>)</span>
<span class="highlighted-comment-line">        .dataType(DataType.Timestamptz)</span>
<span class="highlighted-comment-line">        .isNullable(<span class="hljs-literal">true</span>)</span>
<span class="highlighted-comment-line">        .build());</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment">// Step 3 — set the ttl_field property on the column you just added</span></span>
<span class="highlighted-comment-line">Map&lt;String, String&gt; ttlField = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();</span>
<span class="highlighted-comment-line">ttlField.put(<span class="hljs-string">&quot;ttl_field&quot;</span>, <span class="hljs-string">&quot;expire_at&quot;</span>);</span>
<span class="highlighted-comment-line">client.alterCollectionProperties(AlterCollectionPropertiesReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .properties(ttlField)</span>
<span class="highlighted-comment-line">        .build());</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment">// Step 4 (optional) — backfill expiration timestamps for historical entities</span></span>
<span class="highlighted-comment-line"><span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();</span>
<span class="highlighted-comment-line"><span class="hljs-type">Random</span> <span class="hljs-variable">rng</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Random</span>();</span>
<span class="highlighted-comment-line">List&lt;Float&gt; vector = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();</span>
<span class="highlighted-comment-line"><span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> <span class="hljs-variable">i</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">128</span>; i++) vector.add(rng.nextFloat());</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();</span>
<span class="highlighted-comment-line">row.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">1</span>);</span>
<span class="highlighted-comment-line">row.add(<span class="hljs-string">&quot;vector&quot;</span>, gson.toJsonTree(vector));</span>
<span class="highlighted-comment-line">row.addProperty(<span class="hljs-string">&quot;expire_at&quot;</span>, <span class="hljs-string">&quot;2026-12-31T00:00:00Z&quot;</span>);</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line">client.upsert(UpsertReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .data(Collections.singletonList(row))</span>
<span class="highlighted-comment-line">        .build());</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>您沒有回填<code translate="no">expire_at</code> 的歷史實體，該列會有<code translate="no">NULL</code> ，表示它們永遠不會過期。只回填應具有有限生命週期的行。</p>
<h3 id="Switch-from-entity-level-to-collection-level-TTL" class="common-anchor-header">從實體層級轉換到集合層級 TTL<button data-href="#Switch-from-entity-level-to-collection-level-TTL" class="anchor-icon" translate="no">
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
    </button></h3><p>若要朝另一個方向移動，請移除<code translate="no">ttl_field</code> 並設定<code translate="no">collection.ttl.seconds</code> ：</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Assumes &quot;my_collection&quot; already exists with `ttl_field` set.</span>
<span class="highlighted-comment-line">client.drop_collection_properties(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    property_keys=[<span class="hljs-string">&quot;ttl_field&quot;</span>],</span>
<span class="highlighted-comment-line">)</span>
<span class="highlighted-comment-line">client.alter_collection_properties(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    properties={<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>: <span class="hljs-number">1209600</span>},  <span class="hljs-comment"># 14 days</span></span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AlterCollectionPropertiesReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.DropCollectionPropertiesReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="hljs-comment">// Assumes &quot;my_collection&quot; already exists with `ttl_field` set.</span>
<span class="highlighted-comment-line">client.dropCollectionProperties(DropCollectionPropertiesReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .propertyKeys(Collections.singletonList(<span class="hljs-string">&quot;ttl_field&quot;</span>))</span>
<span class="highlighted-comment-line">        .build());</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line">Map&lt;String, String&gt; properties = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();</span>
<span class="highlighted-comment-line">properties.put(<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>, <span class="hljs-string">&quot;1209600&quot;</span>); <span class="hljs-comment">// 14 days</span></span>
<span class="highlighted-comment-line">client.alterCollectionProperties(AlterCollectionPropertiesReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .properties(properties)</span>
<span class="highlighted-comment-line">        .build());</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="FAQs" class="common-anchor-header">常見問題<button data-href="#FAQs" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="When-does-data-expire-due-to-TTL-settings" class="common-anchor-header">資料何時會因為 TTL 設定而過期？<button data-href="#When-does-data-expire-due-to-TTL-settings" class="anchor-icon" translate="no">
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
    </button></h3><p>目前，資料會依據插入或上插的時間點過期。過期的資料將不會顯示在搜尋結果中。如需詳細資訊，請參閱<a href="/docs/zh-hant/set-collection-ttl.md#Dyq9dQUmwoAk9WxwEuEcSDkPnoc">範例</a>。</p>
<h3 id="When-will-the-expired-data-be-physically-deleted" class="common-anchor-header">過期資料何時會被實體刪除？<button data-href="#When-will-the-expired-data-be-physically-deleted" class="anchor-icon" translate="no">
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
    </button></h3><p>資料一旦過期，將不會顯示在任何搜尋結果中。但是，只有在隨後的系統壓縮之後，才會根據群集的壓縮政策實體刪除該資料。</p>
