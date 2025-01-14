---
id: create-collection-instantly.md
title: 立即建立收藏集
---
<h1 id="Create-Collection-Instantly​" class="common-anchor-header">立即建立集合<button data-href="#Create-Collection-Instantly​" class="anchor-icon" translate="no">
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
    </button></h1><p>您可以透過設定名稱和向量場的維度，立即建立一個集合。Milvus 會自動索引向量欄位，並在建立時載入集合。本頁面示範如何使用預設值立即建立集合。</p>
<h2 id="Overview​" class="common-anchor-header">概觀<button data-href="#Overview​" class="anchor-icon" translate="no">
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
    </button></h2><p>集合是一個二維表，有固定的列和變異的行。每列代表一個欄位，每行代表一個實體。要實現這種結構性資料管理，需要一個模式。每個要插入的實體都必須符合模式中定義的約束。</p>
<p>AIGC 應用程式通常使用向量資料庫作為知識庫，以管理使用者與大型語言模型 (LLM) 互動期間所產生的資料。這樣的知識庫幾乎大同小異。為了加速 Milvus 叢集在這種情況下的使用，有一種即時方法可供您建立一個只有兩個參數的集合，即集合名稱和向量欄位維度。</p>
<p>當您使用預設值即時建立集合時，下列設定將會適用。</p>
<ul>
<li><p>主要欄位和向量欄位會新增至模式<strong>（id</strong>和<strong>向量</strong>）。</p></li>
<li><p>主要欄位接受整數並停用<strong>AutoId</strong>。</p></li>
<li><p>向量欄位接受浮動向量嵌入。</p></li>
<li><p><strong>AUTOINDEX</strong>用於在向量欄位上建立索引。</p></li>
<li><p><strong>COSINE</strong>用來測量向量嵌入之間的相似性。</p></li>
<li><p>已啟用名為<strong>$meta</strong>的保留動態欄位，以鍵值對儲存非結構描述定義的欄位及其值。</p></li>
<li><p>該集合會在建立時自動載入。</p></li>
</ul>
<p>有關上述術語的詳細資訊，請參閱<a href="/docs/zh-hant/manage-collections.md">Collection Explained</a>。</p>
<p>值得注意的是，使用預設設定立即建立集合並不適用於所有情況。建議您熟悉<a href="/docs/zh-hant/create-collection.md">常見的集合建立程序</a>，以便更好地瞭解 Milvus 的功能。</p>
<h2 id="Quick-Setup​" class="common-anchor-header">快速設定<button data-href="#Quick-Setup​" class="anchor-icon" translate="no">
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
    </button></h2><p>透過這種方式，您只需輸入集合名稱和向量欄位的維度，就能立即建立集合。</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType​
​
CLUSTER_ENDPOINT = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
TOKEN = <span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
<span class="hljs-comment"># 1. Set up a Milvus client​</span>
client = MilvusClient(​
    uri=CLUSTER_ENDPOINT,​
    token=TOKEN ​
)​
​
<span class="hljs-comment"># 2. Create a collection in quick setup mode​</span>
client.create_collection(​
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,​
    dimension=<span class="hljs-number">5</span>​
)​
​
res = client.get_load_state(​
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>​
)​
​
<span class="hljs-built_in">print</span>(res)​
​
<span class="hljs-comment"># Output​</span>
<span class="hljs-comment">#​</span>
<span class="hljs-comment"># {​</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: Loaded&gt;&quot;​</span>
<span class="hljs-comment"># }​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;​
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.GetLoadStateReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;​
​
<span class="hljs-type">String</span> <span class="hljs-variable">CLUSTER_ENDPOINT</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;​
<span class="hljs-type">String</span> <span class="hljs-variable">TOKEN</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;root:Milvus&quot;</span>;​
​
<span class="hljs-comment">// 1. Connect to Milvus server​</span>
<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()​
        .uri(CLUSTER_ENDPOINT)​
        .token(TOKEN)​
        .build();​
​
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);​
​
<span class="hljs-comment">// 2. Create a collection in quick setup mode​</span>
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">quickSetupReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()​
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)​
        .dimension(<span class="hljs-number">5</span>)​
        .build();​
​
client.createCollection(quickSetupReq);​
​
<span class="hljs-type">GetLoadStateReq</span> <span class="hljs-variable">quickSetupLoadStateReq</span> <span class="hljs-operator">=</span> GetLoadStateReq.builder()​
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)​
        .build();​
​
<span class="hljs-type">Boolean</span> <span class="hljs-variable">res</span> <span class="hljs-operator">=</span> client.getLoadState(quickSetupLoadStateReq);​
System.out.println(res);​
​
<span class="hljs-comment">// Output:​</span>
<span class="hljs-comment">// true​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 1. Set up a Milvus Client​</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;​
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;​
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});​
​
<span class="hljs-comment">// 2. Create a collection in quick setup mode​</span>
<span class="hljs-keyword">let</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,​
    <span class="hljs-attr">dimension</span>: <span class="hljs-number">5</span>,​
});  ​
​
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">// ​</span>
<span class="hljs-comment">// Success​</span>
<span class="hljs-comment">// ​</span>
​
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>​
})​
​
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">state</span>)​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">// ​</span>
<span class="hljs-comment">// LoadStateLoaded​</span>
<span class="hljs-comment">// ​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Go 缺失​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;quick_setup&quot;,​
    &quot;dimension&quot;: 5​
}&#x27;</span>​
​
<span class="hljs-comment"># {​</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,​</span>
<span class="hljs-comment">#     &quot;data&quot;: {}​</span>
<span class="hljs-comment"># }​</span>

<button class="copy-code-btn"></button></code></pre>
<h2 id="Quick-Setup-with-Custom-Fields​" class="common-anchor-header">使用自訂欄位快速設定<button data-href="#Quick-Setup-with-Custom-Fields​" class="anchor-icon" translate="no">
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
    </button></h2><p>如果預設的度量類型、欄位名稱和資料類型不符合您的需求，您可以調整這些設定，如下所示。</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType​
​
CLUSTER_ENDPOINT = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
TOKEN = <span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
<span class="hljs-comment"># 1. Set up a Milvus client​</span>
client = MilvusClient(​
    uri=CLUSTER_ENDPOINT,​
    token=TOKEN ​
)​
​
<span class="hljs-comment"># 2. Create a collection in quick setup mode​</span>
client.create_collection(​
    collection_name=<span class="hljs-string">&quot;custom_quick_setup&quot;</span>,​
    dimension=<span class="hljs-number">5</span>,​
    primary_field_name=<span class="hljs-string">&quot;my_id&quot;</span>,​
    id_type=<span class="hljs-string">&quot;string&quot;</span>,​
    vector_field_name=<span class="hljs-string">&quot;my_vector&quot;</span>,​
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>,​
    auto_id=<span class="hljs-literal">True</span>,​
    max_length=<span class="hljs-number">512</span>​
)​
​
res = client.get_load_state(​
    collection_name=<span class="hljs-string">&quot;custom_quick_setup&quot;</span>​
)​
​
<span class="hljs-built_in">print</span>(res)​
​
<span class="hljs-comment"># Output​</span>
<span class="hljs-comment">#​</span>
<span class="hljs-comment"># {​</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: Loaded&gt;&quot;​</span>
<span class="hljs-comment"># }​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;​
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.GetLoadStateReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;​
​
<span class="hljs-type">String</span> <span class="hljs-variable">CLUSTER_ENDPOINT</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;​
<span class="hljs-type">String</span> <span class="hljs-variable">TOKEN</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;root:Milvus&quot;</span>;​
​
<span class="hljs-comment">// 1. Connect to Milvus server​</span>
<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()​
        .uri(CLUSTER_ENDPOINT)​
        .token(TOKEN)​
        .build();​
​
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);​
​
<span class="hljs-comment">// 2. Create a collection in quick setup mode​</span>
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">customQuickSetupReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()​
        .collectionName(<span class="hljs-string">&quot;custom_quick_setup&quot;</span>)​
        .dimension(<span class="hljs-number">5</span>)​
        .primaryFieldName(<span class="hljs-string">&quot;my_id&quot;</span>)​
        .idType(DataType.VarChar)​
        .maxLength(<span class="hljs-number">512</span>)​
        .vectorFieldName(<span class="hljs-string">&quot;my_vector&quot;</span>)​
        .metricType(<span class="hljs-string">&quot;L2&quot;</span>)​
        .autoID(<span class="hljs-literal">true</span>)​
        .build();​
​
client.createCollection(customQuickSetupReq);​
​
<span class="hljs-type">GetLoadStateReq</span> <span class="hljs-variable">customQuickSetupLoadStateReq</span> <span class="hljs-operator">=</span> GetLoadStateReq.builder()​
        .collectionName(<span class="hljs-string">&quot;custom_quick_setup&quot;</span>)​
        .build();​
​
<span class="hljs-type">Boolean</span> <span class="hljs-variable">res</span> <span class="hljs-operator">=</span> client.getLoadState(customQuickSetupLoadStateReq);​
System.out.println(res);​
​
<span class="hljs-comment">// Output:​</span>
<span class="hljs-comment">// true​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 1. Set up a Milvus Client​</span>
<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;​
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;​
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});​
​
<span class="hljs-comment">// 2. Create a collection in quick setup mode​</span>
<span class="hljs-keyword">let</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;custom_quick_setup&quot;</span>,​
    <span class="hljs-attr">dimension</span>: <span class="hljs-number">5</span>,​
    <span class="hljs-attr">primary_field_name</span>: <span class="hljs-string">&quot;my_id&quot;</span>,​
    <span class="hljs-attr">id_type</span>: <span class="hljs-string">&quot;Varchar&quot;</span>,​
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span>,​
    <span class="hljs-attr">vector_field_name</span>: <span class="hljs-string">&quot;my_vector&quot;</span>,​
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;L2&quot;</span>,​
    <span class="hljs-attr">auto_id</span>: <span class="hljs-literal">true</span>​
});  ​
​
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">// ​</span>
<span class="hljs-comment">// Success​</span>
<span class="hljs-comment">// ​</span>
​
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;custom_quick_setup&quot;</span>​
})​
​
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">state</span>)​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">// ​</span>
<span class="hljs-comment">// LoadStateLoaded​</span>
<span class="hljs-comment">// ​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Go 缺失​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;custom_quick_setup&quot;,​
    &quot;dimension&quot;: 5,​
    &quot;primaryFieldName&quot;: &quot;my_id&quot;,​
    &quot;idType&quot;: &quot;VarChar&quot;,​
    &quot;vectorFieldName&quot;: &quot;my_vector&quot;,​
    &quot;metricType&quot;: &quot;L2&quot;,​
    &quot;autoId&quot;: true,​
    &quot;params&quot;: {​
        &quot;max_length&quot;: &quot;512&quot;​
    }​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>如果使用上述兩種方式建立的集合仍無法滿足您的需求，請考慮遵循「<a href="/docs/zh-hant/create-collection.md">建立集合</a>」中的程序。</p>
