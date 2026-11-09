---
id: mmap.md
title: 使用 mmap
summary: >-
  記憶體映射（Mmap）可實現對磁碟上大型檔案的直接記憶體存取，使 Milvus
  能同時將索引和資料儲存於記憶體與硬碟中。此方法有助於根據存取頻率優化資料配置策略，在不會顯著影響搜尋效能的前提下，擴充集合的儲存容量。 本頁面將協助您了解
  Milvus 如何運用 mmap 來實現快速且高效的数据儲存與檢索。
---
<h1 id="Use-mmap" class="common-anchor-header">使用 mmap<button data-href="#Use-mmap" class="anchor-icon" translate="no">
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
    </button></h1><p>記憶體映射 (mmap) 能讓系統直接存取磁碟上的大型檔案，使 Milvus 得以同時將索引和資料儲存於記憶體與硬碟中。此方法有助於根據存取頻率優化資料配置策略，在不會顯著影響搜尋效能的前提下，擴充集合的儲存容量。 本頁面將協助您了解 Milvus 如何運用 mmap 來實現快速且高效的数据儲存與檢索。</p>
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
    </button></h2><p>Milvus 透過集合來組織向量嵌入及其元資料，集合中的每一行代表一個實體。如下方左圖所示，向量欄位儲存向量嵌入，而標量欄位則儲存其元資料。當您針對特定欄位建立索引並載入集合後，Milvus 會將建立的索引與欄位原始資料載入記憶體中。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/mmap-illustrated.png" alt="Mmap Illustrated" class="doc-image" id="mmap-illustrated" /> 
   <span>mmap 圖解</span>
  
 </span></p>
<p>Milvus 是一個高度依賴記憶體的資料庫系統，可用的記憶體大小決定了集合的容量。若資料大小超過記憶體容量，便無法將包含大量資料的欄位載入記憶體中，而這在 AI 驅動的應用程式中是常見的情況。</p>
<p>為解決此類問題，Milvus 引入 mmap 機制，以平衡集合中熱數據與冷數據的載入。如上圖右側所示，您可以配置 Milvus，使其將特定欄位的原始資料進行記憶體映射，而非將其完全載入記憶體中。 如此一來，您即可直接存取這些欄位的記憶體內容，無需擔心記憶體問題，同時還能擴展集合的容量。</p>
<p>透過比較左、右圖中的資料配置流程，您會發現左圖的記憶體使用量遠高於右圖。 啟用 mmap 後，原本應載入記憶體的資料會被卸載至硬碟，並緩存於作業系統的頁面快取中，從而減少記憶體佔用量。然而，快取未命中可能會導致效能下降。詳情請參閱<a href="https://en.wikipedia.org/wiki/Mmap">這篇文章</a>。</p>
<p>在 Milvus 上配置 mmap 時，請務必遵循以下原則：始終將頻繁存取的資料和索引完全載入記憶體中，並僅對其餘欄位使用 mmap。</p>
<h2 id="Use-mmap-in-Milvus" class="common-anchor-header">在 Milvus 中使用 mmap<button data-href="#Use-mmap-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 提供分層式的 mmap 設定，涵蓋全域、欄位、索引及集合層級，其中索引與欄位層級的設定優先於集合層級，而集合層級的設定則優先於全域層級。</p>
<h3 id="Global-mmap-settings" class="common-anchor-header">全域 mmap 設定<button data-href="#Global-mmap-settings" class="anchor-icon" translate="no">
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
    </button></h3><p>叢集層級的設定即為全域設定，且優先級最低。Milvus 在 `<code translate="no">milvus.yaml</code>` 中提供數項與 mmap 相關的設定。這些設定將套用至叢集中的所有集合。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">mmap:</span>
    <span class="hljs-attr">scalarField:</span> <span class="hljs-literal">false</span>
    <span class="hljs-attr">scalarIndex:</span> <span class="hljs-literal">false</span>
    <span class="hljs-attr">vectorField:</span> <span class="hljs-literal">false</span>
    <span class="hljs-attr">vectorIndex:</span> <span class="hljs-literal">false</span>
    <span class="hljs-comment"># The following should be a path on a high-performance disk</span>
    <span class="hljs-attr">mmapDirPath:</span> <span class="hljs-string">any/valid/path</span> 
<span class="hljs-string">....</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>設定項目</p></th>
     <th><p>說明</p></th>
     <th><p>預設值</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">queryNode.mmap.scalarField</code></p></td>
     <td><p>指定是否將所有標量欄位的原始資料映射至記憶體。若將此設定設為 `<code translate="no">true</code> `，Milvus 會將集合中標量欄位的原始資料映射至記憶體，而非在收到針對該集合的載入請求時才將其完全載入。</p></td>
     <td><p><code translate="no">false</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">queryNode.mmap.scalarIndex</code></p></td>
     <td><p>指定是否將所有標量欄位的索引映射至記憶體中。將此設定設為<code translate="no">true</code> 時，Milvus 會將集合的標量欄位索引映射至記憶體中，而非在收到針對該集合的載入請求時才將其完全載入。</p><p>目前僅支援使用以下索引類型的標量欄位：</p><ul><li>INVERTED</li></ul></td>
     <td><p><code translate="no">false</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">queryNode.mmap.vectorField</code></p></td>
     <td><p>指定是否將所有向量欄位的原始資料映射至記憶體中。將此參數設定為 `<code translate="no">true</code> ` 時，Milvus 會將集合中向量欄位的原始資料映射至記憶體中，而非在收到針對該集合的載入請求時才將其完全載入。</p></td>
     <td><p><code translate="no">false</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">queryNode.mmap.vectorIndex</code></p></td>
     <td><p>指定是否將所有向量欄位索引映射至記憶體中。將此參數設定為<code translate="no">true</code> 時，Milvus 會將集合的向量欄位索引映射至記憶體中，而非在收到針對此集合的載入請求時才將其完全載入。</p><p>目前僅支援使用以下索引類型的向量場：</p><ul><li><p>FLAT</p></li><li><p>IVF_FLAT</p></li><li><p>IVF_SQ8</p></li><li><p>IVF_PQ</p></li><li><p>BIN_FLAT</p></li><li><p>BIN_IVF_FLAT</p></li><li><p>HNSW</p></li><li><p>SCANN</p></li><li><p>稀疏_反向索引</p></li><li><p>SPARSE_WAND</p></li></ul></td>
     <td><p><code translate="no">false</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">queryNode.mmap.mmapDirPath</code></p></td>
     <td><p>指定記憶體映射檔案的路徑。若未指定此參數，則採用預設值。 </p><p>預設值中的「<code translate="no">localStorage.path</code> 」佔位符代表 Milvus QueryNodes 的硬碟。請確保您的 QueryNodes 配備高效能硬碟，以充分發揮記憶體映射（mmap）的優勢。</p></td>
     <td><p><code translate="no">{localStorage.path}/mmap</code></p></td>
   </tr>
</table>
<p>若要將上述設定套用至您的 Milvus 叢集，請依照《<a href="/docs/zh-hant/configure-helm.md#Configure-Milvus-via-configuration-file">使用 Helm 配置 Milvus</a>》及<a href="/docs/zh-hant/configure_operator.md">《使用 Milvus Operators 配置 Milvus</a>》中的步驟操作。</p>
<p>有時，面對特定使用情境時，全域 mmap 設定可能不夠靈活。若要對特定集合或其索引套用替代設定，請考慮針對集合、欄位或索引進行專屬的 mmap 配置。您必須先釋出並載入該集合，mmap 設定的變更才會生效。</p>
<h3 id="Field-specific-mmap-settings" class="common-anchor-header">針對特定欄位的 mmap 設定<button data-href="#Field-specific-mmap-settings" class="anchor-icon" translate="no">
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
    </button></h3><p>若要配置針對特定欄位的 mmap，您在新增欄位時需包含 `<code translate="no">mmap_enabled</code> ` 參數。您可以將此參數設定為 `<code translate="no">True</code>`，以啟用該特定欄位的 mmap。</p>
<p>以下範例示範如何在新增欄位時設定針對特定欄位的 mmap。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

client = MilvusClient(
    uri=CLUSTER_ENDPOINT,
    token=TOKEN
)

schema = MilvusClient.create_schema()
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)

schema = MilvusClient.create_schema()

<span class="hljs-comment"># Add a scalar field and enable mmap</span>
schema.add_field(
    field_name=<span class="hljs-string">&quot;doc_chunk&quot;</span>,
    datatype=DataType.INT64,
    is_primary=<span class="hljs-literal">True</span>,
    mmap_enabled=<span class="hljs-literal">True</span>,
)

<span class="hljs-comment"># Alter mmap settings on a specific field</span>
<span class="hljs-comment"># The following assumes that you have a collection named `my_collection`</span>
client.alter_collection_field(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    field_name=<span class="hljs-string">&quot;doc_chunk&quot;</span>,
    field_params={<span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-literal">True</span>}
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.param.Constant;
<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.*;

<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">String</span> <span class="hljs-variable">CLUSTER_ENDPOINT</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-type">String</span> <span class="hljs-variable">TOKEN</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;root:Milvus&quot;</span>;
client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(CLUSTER_ENDPOINT)
        .token(TOKEN)
        .build());
        
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">false</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;vector&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">5</span>)
        .build());

Map&lt;String, String&gt; typeParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, String&gt;() {{
    put(Constant.MMAP_ENABLED, <span class="hljs-string">&quot;false&quot;</span>);
}};
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;doc_chunk&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">512</span>)
        .typeParams(typeParams)
        .build());

<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">req</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .collectionSchema(schema)
        .build();
client.createCollection(req);

client.alterCollectionField(AlterCollectionFieldReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .fieldName(<span class="hljs-string">&quot;doc_chunk&quot;</span>)
        .property(Constant.MMAP_ENABLED, <span class="hljs-string">&quot;true&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">CLUSTER_ENDPOINT</span>=<span class="hljs-string">&quot;YOUR_CLUSTER_ENDPOINT&quot;</span>;
<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">TOKEN</span>=<span class="hljs-string">&quot;YOUR_TOKEN&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">await</span> <span class="hljs-title class_">MilvusClient</span>({
    <span class="hljs-attr">address</span>: <span class="hljs-variable constant_">CLUSTER_ENDPOINT</span>,
    <span class="hljs-attr">token</span>: <span class="hljs-variable constant_">TOKEN</span>
});

<span class="hljs-keyword">const</span> schema = [
{
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;vector&#x27;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>
},
{
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;doc_chunk&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span>,
    <span class="hljs-string">&#x27;mmap.enabled&#x27;</span>: <span class="hljs-literal">false</span>,
}
];

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">schema</span>: schema
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">alterCollectionFieldProperties</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;doc_chunk&quot;</span>,
    <span class="hljs-attr">properties</span>: {<span class="hljs-string">&quot;mmap_enable&quot;</span>: <span class="hljs-literal">true</span>}
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment">#restful</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>
<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>

<span class="hljs-built_in">export</span> idField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;id&quot;,
    &quot;dataType&quot;: &quot;Int64&quot;,
    &quot;elementTypeParams&quot;: {
        &quot;max_length&quot;: 512
    },
    &quot;isPrimary&quot;: true,
    &quot;autoId&quot;: false
}&#x27;</span>

<span class="hljs-built_in">export</span> vectorField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;vector&quot;,
    &quot;dataType&quot;: &quot;FloatVector&quot;,
    &quot;elementTypeParams&quot;: {
       &quot;dim&quot;: 5
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> docChunkField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;doc_chunk&quot;,
    &quot;dataType&quot;: &quot;Int64&quot;,
    &quot;elementTypeParams&quot;: {
        &quot;max_length&quot;: 512,
        &quot;mmap.enabled&quot;: false
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: false,
    \&quot;fields\&quot;: [
        <span class="hljs-variable">$idField</span>,
        <span class="hljs-variable">$docChunkField</span>,
        <span class="hljs-variable">$vectorField</span>
    ]
}&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
--data <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>
}&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/fields/alter_properties&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;fieldName&quot;: &quot;doc_chunk&quot;,
    &quot;fieldParams&quot;:{
        &quot;mmap.enabled&quot;: true
    }
}&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>建議針對儲存大量資料的欄位啟用 mmap。此功能同時支援標量欄位與向量欄位。</p>
</div>
<p>接著，您可以使用上述建立的模式來建立一個集合。當收到載入該集合的請求時，Milvus 會將<strong>doc_chunk</strong>欄位的原始資料透過記憶體映射（mmap）載入至記憶體中。</p>
<h3 id="Index-specific-mmap-settings" class="common-anchor-header">索引專屬的 mmap 設定<button data-href="#Index-specific-mmap-settings" class="anchor-icon" translate="no">
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
    </button></h3><p>若要配置索引專用的 mmap，您在新增索引時，需在索引參數中包含 `<code translate="no">mmap.enable</code> ` 屬性。您可以將該屬性設定為 `<code translate="no">true</code>`，以在該特定索引上啟用 mmap。</p>
<p>以下範例示範如何在新增索引時配置針對特定索引的 mmap。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Add a varchar field</span>
schema.add_field(
    field_name=<span class="hljs-string">&quot;title&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">512</span>   
)

index_params = MilvusClient.prepare_index_params()

<span class="hljs-comment"># Create index on the varchar field with mmap settings</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;title&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
<span class="highlighted-wrapper-line">    params={ <span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-string">&quot;false&quot;</span> }</span>
)

<span class="hljs-comment"># Change mmap settings for an index</span>
<span class="hljs-comment"># The following assumes that you have a collection named `my_collection`</span>
client.alter_index_properties(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    index_name=<span class="hljs-string">&quot;title&quot;</span>,
    properties={<span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-literal">True</span>}
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;title&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">512</span>)
        .build());
        
List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
Map&lt;String, Object&gt; extraParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
    put(Constant.MMAP_ENABLED, <span class="hljs-literal">false</span>);
}};
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;title&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams)
        .build());
        
client.alterIndexProperties(AlterIndexPropertiesReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .indexName(<span class="hljs-string">&quot;title&quot;</span>)
        .property(Constant.MMAP_ENABLED, <span class="hljs-string">&quot;true&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Create index on the varchar field with mmap settings</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;title&quot;</span>,
    <span class="hljs-attr">params</span>: { <span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-literal">false</span> }
});

<span class="hljs-comment">// Change mmap settings for an index</span>
<span class="hljs-comment">// The following assumes that you have a collection named `my_collection`</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">alterIndexProperties</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;title&quot;</span>,
    <span class="hljs-attr">properties</span>:{<span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-literal">true</span>}
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
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
            &quot;fieldName&quot;: &quot;doc_chunk&quot;,
            &quot;params&quot;: {
                &quot;index_type&quot;: &quot;AUTOINDEX&quot;,
                &quot;mmap.enabled&quot;: true
            }
        }
    ]
}&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/indexes/alter_properties&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;indexName&quot;: &quot;doc_chunk&quot;,
    &quot;properties&quot;: {
        &quot;mmap.enabled&quot;: false
    }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>此設定適用於向量欄位與標量欄位的索引。</p>
</div>
<p>之後，您可以在集合中參照索引參數。當收到載入集合的請求時，Milvus 會將<strong>標題</strong>欄位的索引記憶體映射至記憶體中。</p>
<h3 id="Collection-specific-mmap-settings" class="common-anchor-header">集合專用的 mmap 設定<button data-href="#Collection-specific-mmap-settings" class="anchor-icon" translate="no">
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
    </button></h3><p>若要設定全集合範圍的 mmap 策略，您需要在建立集合的請求中包含 `<code translate="no">mmap.enabled</code> ` 屬性。您可以將此屬性設定為 `<code translate="no">true</code>`，以啟用集合的 mmap 功能。</p>
<p>以下範例示範如何在建立名為<strong>my_collection</strong>的集合時啟用 mmap。當收到載入該集合的請求時，Milvus 會將所有欄位的原始資料記憶體映射至記憶體中。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Enable mmap when creating a collection</span>
client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
    properties={ <span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-string">&quot;true&quot;</span> }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">req</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .collectionSchema(schema)
        .property(Constant.MMAP_ENABLED, <span class="hljs-string">&quot;false&quot;</span>)
        .build();
client.createCollection(req);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">scheme</span>: schema,
    <span class="hljs-attr">properties</span>: { <span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-literal">false</span> }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
--data <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;params\&quot;: {
        \&quot;mmap.enabled\&quot;: \&quot;false\&quot;
    }
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>您也可以變更現有集合的 mmap 設定。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Release collection before change mmap settings</span>
client.release_collection(<span class="hljs-string">&quot;my_collection&quot;</span>)

<span class="hljs-comment"># Ensure that the collection has already been released </span>
<span class="hljs-comment"># and run the following</span>
client.alter_collection_properties(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    properties={
        <span class="hljs-string">&quot;mmap.enabled&quot;</span>: false
    }
)

<span class="hljs-comment"># Load the collection to make the above change take effect</span>
client.load_collection(<span class="hljs-string">&quot;my_collection&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">client.releaseCollection(ReleaseCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .build());
        
client.alterCollectionProperties(AlterCollectionPropertiesReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .property(Constant.MMAP_ENABLED, <span class="hljs-string">&quot;false&quot;</span>)
        .build());

client.loadCollection(LoadCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .build());
       
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Release collection before change mmap settings</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">releaseCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>
});

<span class="hljs-comment">// Ensure that the collection has already been released </span>
<span class="hljs-comment">// and run the following</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">alterCollectionProperties</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">properties</span>: {
        <span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-literal">false</span>
    }
});

<span class="hljs-comment">// Load the collection to make the above change take effect</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">loadCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/release&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;
}&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/alter_properties&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;properties&quot;: {
        &quot;mmmap.enabled&quot;: false
    }
}&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/load&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>您需要釋放該集合才能修改其屬性，並重新載入該集合以使變更生效。</p>
