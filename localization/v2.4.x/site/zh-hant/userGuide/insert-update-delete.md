---
id: insert-update-delete.md
summary: 本指南將引導您了解集合內的資料處理作業，包括插入、上移和刪除。
title: 插入、上置和刪除
---
<h1 id="Insert-Upsert--Delete" class="common-anchor-header">插入、上置和刪除<button data-href="#Insert-Upsert--Delete" class="anchor-icon" translate="no">
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
    </button></h1><p>本指南將教您如何在資料集中進行資料處理作業，包括插入、倒插和刪除。</p>
<h2 id="Before-you-start" class="common-anchor-header">開始之前<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
<li><p>您已安裝您所選擇的 SDK。若要安裝 SDK，請參閱<a href="https://milvus.io/docs/install-pymilvus.md">安裝 SDK</a>。</p></li>
<li><p>您已建立一個資料夾。若要建立資料夾，請參閱<a href="/docs/zh-hant/v2.4.x/manage-collections.md">管理資料夾</a>。</p></li>
<li><p>若要插入大量資料，建議您使用<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/DataImport/LocalBulkWriter/LocalBulkWriter.md">資料匯入</a>。</p></li>
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
    </button></h2><p>在 Milvus 集合的上下文中，實體是集合中一個單一的、可識別的實例。它代表一個特定類別的獨特成員，無論是圖書館中的一本书、基因組中的一個基因或任何其他可識別的實體。</p>
<p>資料集中的實體共享一組共同的屬性，稱為模式，概述每個實體必須遵守的結構，包括欄位名稱、資料類型和任何其他限制。</p>
<p>要將實體成功插入集合，所提供的資料必須包含目標集合的所有模式定義的欄位。此外，只有啟用動態欄位，才能包含非模式定義的欄位。如需詳細資訊，請參閱<a href="/docs/zh-hant/v2.4.x/enable-dynamic-field.md">啟用動態欄位</a>。</p>
<h2 id="Preparations" class="common-anchor-header">準備工作<button data-href="#Preparations" class="anchor-icon" translate="no">
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
    </button></h2><p>下面的程式碼片段將現有的程式碼重新利用，以建立與 Milvus 叢集的連線，並快速建立一個集合。</p>
<div class="language-python">
<p>對於準備工作，使用 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Client/MilvusClient.md"><code translate="no">MilvusClient</code></a>連接至 Milvus 伺服器，並使用 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md"><code translate="no">create_collection()</code></a>以快速設定模式建立一個集合。</p>
</div>
<div class="language-java">
<p>對於準備工作，使用 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Client/MilvusClientV2.md"><code translate="no">MilvusClientV2</code></a>連接至 Milvus 伺服器，並 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createCollection.md"><code translate="no">createCollection()</code></a>在快速設置模式下創建一個集合。</p>
</div>
<div class="language-javascript">
<p>對於準備工作，使用 <a href="https://milvus.io/api-reference/node/v2.4.x/Client/MilvusClient.md"><code translate="no">MilvusClient</code></a>連接至 Milvus 伺服器，並使用 <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/createCollection.md"><code translate="no">createCollection()</code></a>以快速設定模式建立一個集合。</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># 1. Set up a Milvus client</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
)

<span class="hljs-comment"># 2. Create a collection</span>
client.create_collection(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    dimension=<span class="hljs-number">5</span>,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.partition.request.CreatePartitionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.*;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.*;

<span class="hljs-type">String</span> <span class="hljs-variable">CLUSTER_ENDPOINT</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;

<span class="hljs-comment">// 1. Connect to Milvus server</span>
<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
    .uri(CLUSTER_ENDPOINT)
    .build();

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

<span class="hljs-comment">// 2. Create a collection in quick setup mode</span>
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">quickSetupReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .dimension(<span class="hljs-number">5</span>)
    .metricType(<span class="hljs-string">&quot;IP&quot;</span>)
    .build();

client.createCollection(quickSetupReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span>, sleep } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)

<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>

<span class="hljs-comment">// 1. Set up a Milvus Client</span>
client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address});

<span class="hljs-comment">// 2. Create a collection in quick setup mode</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">dimension</span>: <span class="hljs-number">5</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;IP&quot;</span>
});  
<button class="copy-code-btn"></button></code></pre>
<div class="admonition note">
<p><b>注意事項</b></p>
<p>上述程式碼產生的集合只包含兩個欄位：<code translate="no">id</code> (作為主索引鍵) 和<code translate="no">vector</code> (作為向量欄位)，預設啟用<code translate="no">auto_id</code> 和<code translate="no">enable_dynamic_field</code> 設定。插入資料時、</p>
<ul>
<li><p>您不需要在要插入的資料中包含<strong>id</strong>，因為主欄位在插入資料時會自動遞增。</p></li>
<li><p>非模式定義的欄位會以 key-value 對的方式儲存於保留的 JSON 欄位中，該欄位的名稱為<strong>$meta</strong>。</p></li>
</ul>
</div>
<h2 id="Insert-entities" class="common-anchor-header">插入實體<button data-href="#Insert-entities" class="anchor-icon" translate="no">
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
    </button></h2><p>要插入實體，您需要將資料組織成一列字典，其中每個字典代表一個實體。每個字典包含對應目標集合中預先定義和動態欄位的鍵。</p>
<div class="language-python">
<p>要將實體插入集合，請使用 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/insert.md"><code translate="no">insert()</code></a>方法。</p>
</div>
<div class="language-java">
<p>要將實體插入集合，請使用 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Vector/insert.md"><code translate="no">insert()</code></a>方法。</p>
</div>
<div class="language-javascript">
<p>要將實體插入集合，請使用 <a href="https://milvus.io/api-reference/node/v2.4.x/Vector/insert.md"><code translate="no">insert()</code></a>方法。</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 3. Insert some data</span>
data=[
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">0</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;pink_8682&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.19886812562848388</span>, <span class="hljs-number">0.06023560599112088</span>, <span class="hljs-number">0.6976963061752597</span>, <span class="hljs-number">0.2614474506242501</span>, <span class="hljs-number">0.838729485096104</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red_7025&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.43742130801983836</span>, -<span class="hljs-number">0.5597502546264526</span>, <span class="hljs-number">0.6457887650909682</span>, <span class="hljs-number">0.7894058910881185</span>, <span class="hljs-number">0.20785793220625592</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;orange_6781&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.3172005263489739</span>, <span class="hljs-number">0.9719044792798428</span>, -<span class="hljs-number">0.36981146090600725</span>, -<span class="hljs-number">0.4860894583077995</span>, <span class="hljs-number">0.95791889146345</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;pink_9298&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">4</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.4452349528804562</span>, -<span class="hljs-number">0.8757026943054742</span>, <span class="hljs-number">0.8220779437047674</span>, <span class="hljs-number">0.46406290649483184</span>, <span class="hljs-number">0.30337481143159106</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red_4794&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">5</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.985825131989184</span>, -<span class="hljs-number">0.8144651566660419</span>, <span class="hljs-number">0.6299267002202009</span>, <span class="hljs-number">0.1206906911183383</span>, -<span class="hljs-number">0.1446277761879955</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;yellow_4222&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">6</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.8371977790571115</span>, -<span class="hljs-number">0.015764369584852833</span>, -<span class="hljs-number">0.31062937026679327</span>, -<span class="hljs-number">0.562666951622192</span>, -<span class="hljs-number">0.8984947637863987</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red_9392&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">7</span>, <span class="hljs-string">&quot;vector&quot;</span>: [-<span class="hljs-number">0.33445148015177995</span>, -<span class="hljs-number">0.2567135004164067</span>, <span class="hljs-number">0.8987539745369246</span>, <span class="hljs-number">0.9402995886420709</span>, <span class="hljs-number">0.5378064918413052</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;grey_8510&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">8</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.39524717779832685</span>, <span class="hljs-number">0.4000257286739164</span>, -<span class="hljs-number">0.5890507376891594</span>, -<span class="hljs-number">0.8650502298996872</span>, -<span class="hljs-number">0.6140360785406336</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;white_9381&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">9</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.5718280481994695</span>, <span class="hljs-number">0.24070317428066512</span>, -<span class="hljs-number">0.3737913482606834</span>, -<span class="hljs-number">0.06726932177492717</span>, -<span class="hljs-number">0.6980531615588608</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;purple_4976&quot;</span>}
]

res = client.insert(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    data=data
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;insert_count&quot;: 10,</span>
<span class="hljs-comment">#     &quot;ids&quot;: [</span>
<span class="hljs-comment">#         0,</span>
<span class="hljs-comment">#         1,</span>
<span class="hljs-comment">#         2,</span>
<span class="hljs-comment">#         3,</span>
<span class="hljs-comment">#         4,</span>
<span class="hljs-comment">#         5,</span>
<span class="hljs-comment">#         6,</span>
<span class="hljs-comment">#         7,</span>
<span class="hljs-comment">#         8,</span>
<span class="hljs-comment">#         9</span>
<span class="hljs-comment">#     ]</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// 3. Insert some data</span>
Gson gson = <span class="hljs-keyword">new</span> Gson();
List&lt;JsonObject&gt; data = Arrays.asList(
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 0, \&quot;vector\&quot;: [0.3580376395471989f, -0.6023495712049978f, 0.18414012509913835f, -0.26286205330961354f, 0.9029438446296592f], \&quot;color\&quot;: \&quot;pink_8682\&quot;}&quot;</span>, JsonObject.<span class="hljs-keyword">class</span>),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 1, \&quot;vector\&quot;: [0.19886812562848388f, 0.06023560599112088f, 0.6976963061752597f, 0.2614474506242501f, 0.838729485096104f], \&quot;color\&quot;: \&quot;red_7025\&quot;}&quot;</span>, JsonObject.<span class="hljs-keyword">class</span>),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 2, \&quot;vector\&quot;: [0.43742130801983836f, -0.5597502546264526f, 0.6457887650909682f, 0.7894058910881185f, 0.20785793220625592f], \&quot;color\&quot;: \&quot;orange_6781\&quot;}&quot;</span>, JsonObject.<span class="hljs-keyword">class</span>),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 3, \&quot;vector\&quot;: [0.3172005263489739f, 0.9719044792798428f, -0.36981146090600725f, -0.4860894583077995f, 0.95791889146345f], \&quot;color\&quot;: \&quot;pink_9298\&quot;}&quot;</span>, JsonObject.<span class="hljs-keyword">class</span>),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 4, \&quot;vector\&quot;: [0.4452349528804562f, -0.8757026943054742f, 0.8220779437047674f, 0.46406290649483184f, 0.30337481143159106f], \&quot;color\&quot;: \&quot;red_4794\&quot;}&quot;</span>, JsonObject.<span class="hljs-keyword">class</span>),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 5, \&quot;vector\&quot;: [0.985825131989184f, -0.8144651566660419f, 0.6299267002202009f, 0.1206906911183383f, -0.1446277761879955f], \&quot;color\&quot;: \&quot;yellow_4222\&quot;}&quot;</span>, JsonObject.<span class="hljs-keyword">class</span>),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 6, \&quot;vector\&quot;: [0.8371977790571115f, -0.015764369584852833f, -0.31062937026679327f, -0.562666951622192f, -0.8984947637863987f], \&quot;color\&quot;: \&quot;red_9392\&quot;}&quot;</span>, JsonObject.<span class="hljs-keyword">class</span>),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 7, \&quot;vector\&quot;: [-0.33445148015177995f, -0.2567135004164067f, 0.8987539745369246f, 0.9402995886420709f, 0.5378064918413052f], \&quot;color\&quot;: \&quot;grey_8510\&quot;}&quot;</span>, JsonObject.<span class="hljs-keyword">class</span>),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 8, \&quot;vector\&quot;: [0.39524717779832685f, 0.4000257286739164f, -0.5890507376891594f, -0.8650502298996872f, -0.6140360785406336f], \&quot;color\&quot;: \&quot;white_9381\&quot;}&quot;</span>, JsonObject.<span class="hljs-keyword">class</span>),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 9, \&quot;vector\&quot;: [0.5718280481994695f, 0.24070317428066512f, -0.3737913482606834f, -0.06726932177492717f, -0.6980531615588608f], \&quot;color\&quot;: \&quot;purple_4976\&quot;}&quot;</span>, JsonObject.<span class="hljs-keyword">class</span>)
);

InsertReq insertReq = InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
        .data(data)
        .build();

InsertResp insertResp = client.insert(insertReq);
System.<span class="hljs-keyword">out</span>.println(insertResp.getInsertCnt());

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// 10</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 3. Insert some data</span>

<span class="hljs-keyword">var</span> data = [
    {<span class="hljs-attr">id</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;pink_8682&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.19886812562848388</span>, <span class="hljs-number">0.06023560599112088</span>, <span class="hljs-number">0.6976963061752597</span>, <span class="hljs-number">0.2614474506242501</span>, <span class="hljs-number">0.838729485096104</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;red_7025&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.43742130801983836</span>, -<span class="hljs-number">0.5597502546264526</span>, <span class="hljs-number">0.6457887650909682</span>, <span class="hljs-number">0.7894058910881185</span>, <span class="hljs-number">0.20785793220625592</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;orange_6781&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">3</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.3172005263489739</span>, <span class="hljs-number">0.9719044792798428</span>, -<span class="hljs-number">0.36981146090600725</span>, -<span class="hljs-number">0.4860894583077995</span>, <span class="hljs-number">0.95791889146345</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;pink_9298&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">4</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.4452349528804562</span>, -<span class="hljs-number">0.8757026943054742</span>, <span class="hljs-number">0.8220779437047674</span>, <span class="hljs-number">0.46406290649483184</span>, <span class="hljs-number">0.30337481143159106</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;red_4794&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">5</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.985825131989184</span>, -<span class="hljs-number">0.8144651566660419</span>, <span class="hljs-number">0.6299267002202009</span>, <span class="hljs-number">0.1206906911183383</span>, -<span class="hljs-number">0.1446277761879955</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;yellow_4222&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">6</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.8371977790571115</span>, -<span class="hljs-number">0.015764369584852833</span>, -<span class="hljs-number">0.31062937026679327</span>, -<span class="hljs-number">0.562666951622192</span>, -<span class="hljs-number">0.8984947637863987</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;red_9392&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">7</span>, <span class="hljs-attr">vector</span>: [-<span class="hljs-number">0.33445148015177995</span>, -<span class="hljs-number">0.2567135004164067</span>, <span class="hljs-number">0.8987539745369246</span>, <span class="hljs-number">0.9402995886420709</span>, <span class="hljs-number">0.5378064918413052</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;grey_8510&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">8</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.39524717779832685</span>, <span class="hljs-number">0.4000257286739164</span>, -<span class="hljs-number">0.5890507376891594</span>, -<span class="hljs-number">0.8650502298996872</span>, -<span class="hljs-number">0.6140360785406336</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;white_9381&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">9</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.5718280481994695</span>, <span class="hljs-number">0.24070317428066512</span>, -<span class="hljs-number">0.3737913482606834</span>, -<span class="hljs-number">0.06726932177492717</span>, -<span class="hljs-number">0.6980531615588608</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;purple_4976&quot;</span>}        
]

<span class="hljs-keyword">var</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">data</span>: data,
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">insert_cnt</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// 10</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Insert-into-partitions" class="common-anchor-header">插入分區</h3><p>若要將資料插入特定的分割區，您可以在插入請求中指定分割區的名稱，如下所示：</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 4. Insert some more data into a specific partition</span>
data=[
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-string">&quot;vector&quot;</span>: [-<span class="hljs-number">0.5570353903748935</span>, -<span class="hljs-number">0.8997887893201304</span>, -<span class="hljs-number">0.7123782431855732</span>, -<span class="hljs-number">0.6298990746450119</span>, <span class="hljs-number">0.6699215060604258</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red_1202&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">11</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.6319019033373907</span>, <span class="hljs-number">0.6821488267878275</span>, <span class="hljs-number">0.8552303045704168</span>, <span class="hljs-number">0.36929791364943054</span>, -<span class="hljs-number">0.14152860714878068</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;blue_4150&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">12</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.9483947484855766</span>, -<span class="hljs-number">0.32294203351925344</span>, <span class="hljs-number">0.9759290319978025</span>, <span class="hljs-number">0.8262982148666174</span>, -<span class="hljs-number">0.8351194181285713</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;orange_4590&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">13</span>, <span class="hljs-string">&quot;vector&quot;</span>: [-<span class="hljs-number">0.5449109892498731</span>, <span class="hljs-number">0.043511240563786524</span>, -<span class="hljs-number">0.25105249484790804</span>, -<span class="hljs-number">0.012030655265886425</span>, -<span class="hljs-number">0.0010987671273892108</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;pink_9619&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">14</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.6603339372951424</span>, -<span class="hljs-number">0.10866551787442225</span>, -<span class="hljs-number">0.9435597754324891</span>, <span class="hljs-number">0.8230244263466688</span>, -<span class="hljs-number">0.7986720938400362</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;orange_4863&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">15</span>, <span class="hljs-string">&quot;vector&quot;</span>: [-<span class="hljs-number">0.8825129181091456</span>, -<span class="hljs-number">0.9204557711667729</span>, -<span class="hljs-number">0.935350065513425</span>, <span class="hljs-number">0.5484069690287079</span>, <span class="hljs-number">0.24448151140671204</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;orange_7984&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">16</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.6285586391568163</span>, <span class="hljs-number">0.5389064528263487</span>, -<span class="hljs-number">0.3163366239905099</span>, <span class="hljs-number">0.22036279378888013</span>, <span class="hljs-number">0.15077052220816167</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;blue_9010&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">17</span>, <span class="hljs-string">&quot;vector&quot;</span>: [-<span class="hljs-number">0.20151825016059233</span>, -<span class="hljs-number">0.905239387635804</span>, <span class="hljs-number">0.6749305353372479</span>, -<span class="hljs-number">0.7324272081377843</span>, -<span class="hljs-number">0.33007998971889263</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;blue_4521&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">18</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.2432286610792349</span>, <span class="hljs-number">0.01785636564206139</span>, -<span class="hljs-number">0.651356982731391</span>, -<span class="hljs-number">0.35848148851027895</span>, -<span class="hljs-number">0.7387383128324057</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;orange_2529&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">19</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.055512329053363674</span>, <span class="hljs-number">0.7100266349039421</span>, <span class="hljs-number">0.4956956543575197</span>, <span class="hljs-number">0.24541352586717702</span>, <span class="hljs-number">0.4209030729923515</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red_9437&quot;</span>}
]

client.create_partition(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    partition_name=<span class="hljs-string">&quot;partitionA&quot;</span>
)

res = client.insert(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    data=data,
    partition_name=<span class="hljs-string">&quot;partitionA&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;insert_count&quot;: 10,</span>
<span class="hljs-comment">#     &quot;ids&quot;: [</span>
<span class="hljs-comment">#         10,</span>
<span class="hljs-comment">#         11,</span>
<span class="hljs-comment">#         12,</span>
<span class="hljs-comment">#         13,</span>
<span class="hljs-comment">#         14,</span>
<span class="hljs-comment">#         15,</span>
<span class="hljs-comment">#         16,</span>
<span class="hljs-comment">#         17,</span>
<span class="hljs-comment">#         18,</span>
<span class="hljs-comment">#         19</span>
<span class="hljs-comment">#     ]</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// 4. Insert some more data into a specific partition</span>
Gson gson = <span class="hljs-keyword">new</span> Gson();
List&lt;JsonObject&gt; data = Arrays.asList(
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 10, \&quot;vector\&quot;: [-0.5570353903748935f, -0.8997887893201304f, -0.7123782431855732f, -0.6298990746450119f, 0.6699215060604258f], \&quot;color\&quot;: \&quot;red_1202\&quot;}&quot;</span>, JsonObject.<span class="hljs-keyword">class</span>),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 11, \&quot;vector\&quot;: [0.6319019033373907f, 0.6821488267878275f, 0.8552303045704168f, 0.36929791364943054f, -0.14152860714878068f], \&quot;color\&quot;: \&quot;blue_4150\&quot;}&quot;</span>, JsonObject.<span class="hljs-keyword">class</span>),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 12, \&quot;vector\&quot;: [0.9483947484855766f, -0.32294203351925344f, 0.9759290319978025f, 0.8262982148666174f, -0.8351194181285713f], \&quot;color\&quot;: \&quot;orange_4590\&quot;}&quot;</span>, JsonObject.<span class="hljs-keyword">class</span>),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 13, \&quot;vector\&quot;: [-0.5449109892498731f, 0.043511240563786524f, -0.25105249484790804f, -0.012030655265886425f, -0.0010987671273892108f], \&quot;color\&quot;: \&quot;pink_9619\&quot;}&quot;</span>, JsonObject.<span class="hljs-keyword">class</span>),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 14, \&quot;vector\&quot;: [0.6603339372951424f, -0.10866551787442225f, -0.9435597754324891f, 0.8230244263466688f, -0.7986720938400362f], \&quot;color\&quot;: \&quot;orange_4863\&quot;}&quot;</span>, JsonObject.<span class="hljs-keyword">class</span>),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 15, \&quot;vector\&quot;: [-0.8825129181091456f, -0.9204557711667729f, -0.935350065513425f, 0.5484069690287079f, 0.24448151140671204f], \&quot;color\&quot;: \&quot;orange_7984\&quot;}&quot;</span>, JsonObject.<span class="hljs-keyword">class</span>),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 16, \&quot;vector\&quot;: [0.6285586391568163f, 0.5389064528263487f, -0.3163366239905099f, 0.22036279378888013f, 0.15077052220816167f], \&quot;color\&quot;: \&quot;blue_9010\&quot;}&quot;</span>, JsonObject.<span class="hljs-keyword">class</span>),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 17, \&quot;vector\&quot;: [-0.20151825016059233f, -0.905239387635804f, 0.6749305353372479f, -0.7324272081377843f, -0.33007998971889263f], \&quot;color\&quot;: \&quot;blue_4521\&quot;}&quot;</span>, JsonObject.<span class="hljs-keyword">class</span>),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 18, \&quot;vector\&quot;: [0.2432286610792349f, 0.01785636564206139f, -0.651356982731391f, -0.35848148851027895f, -0.7387383128324057f], \&quot;color\&quot;: \&quot;orange_2529\&quot;}&quot;</span>, JsonObject.<span class="hljs-keyword">class</span>),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 19, \&quot;vector\&quot;: [0.055512329053363674f, 0.7100266349039421f, 0.4956956543575197f, 0.24541352586717702f, 0.4209030729923515f], \&quot;color\&quot;: \&quot;red_9437\&quot;}&quot;</span>, JsonObject.<span class="hljs-keyword">class</span>)
);

CreatePartitionReq createPartitionReq = CreatePartitionReq.builder()
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
        .partitionName(<span class="hljs-string">&quot;partitionA&quot;</span>)
        .build();

client.createPartition(createPartitionReq);

InsertReq insertReq = InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
        .data(data)
        .partitionName(<span class="hljs-string">&quot;partitionA&quot;</span>)
        .build();

InsertResp insertResp = client.insert(insertReq);
System.<span class="hljs-keyword">out</span>.println(insertResp.getInsertCnt());

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// 10</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 4. Insert some more data into a specific partition</span>
data = [
    {<span class="hljs-attr">id</span>: <span class="hljs-number">10</span>, <span class="hljs-attr">vector</span>: [-<span class="hljs-number">0.5570353903748935</span>, -<span class="hljs-number">0.8997887893201304</span>, -<span class="hljs-number">0.7123782431855732</span>, -<span class="hljs-number">0.6298990746450119</span>, <span class="hljs-number">0.6699215060604258</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;red_1202&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">11</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.6319019033373907</span>, <span class="hljs-number">0.6821488267878275</span>, <span class="hljs-number">0.8552303045704168</span>, <span class="hljs-number">0.36929791364943054</span>, -<span class="hljs-number">0.14152860714878068</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;blue_4150&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">12</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.9483947484855766</span>, -<span class="hljs-number">0.32294203351925344</span>, <span class="hljs-number">0.9759290319978025</span>, <span class="hljs-number">0.8262982148666174</span>, -<span class="hljs-number">0.8351194181285713</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;orange_4590&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">13</span>, <span class="hljs-attr">vector</span>: [-<span class="hljs-number">0.5449109892498731</span>, <span class="hljs-number">0.043511240563786524</span>, -<span class="hljs-number">0.25105249484790804</span>, -<span class="hljs-number">0.012030655265886425</span>, -<span class="hljs-number">0.0010987671273892108</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;pink_9619&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">14</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.6603339372951424</span>, -<span class="hljs-number">0.10866551787442225</span>, -<span class="hljs-number">0.9435597754324891</span>, <span class="hljs-number">0.8230244263466688</span>, -<span class="hljs-number">0.7986720938400362</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;orange_4863&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">15</span>, <span class="hljs-attr">vector</span>: [-<span class="hljs-number">0.8825129181091456</span>, -<span class="hljs-number">0.9204557711667729</span>, -<span class="hljs-number">0.935350065513425</span>, <span class="hljs-number">0.5484069690287079</span>, <span class="hljs-number">0.24448151140671204</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;orange_7984&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">16</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.6285586391568163</span>, <span class="hljs-number">0.5389064528263487</span>, -<span class="hljs-number">0.3163366239905099</span>, <span class="hljs-number">0.22036279378888013</span>, <span class="hljs-number">0.15077052220816167</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;blue_9010&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">17</span>, <span class="hljs-attr">vector</span>: [-<span class="hljs-number">0.20151825016059233</span>, -<span class="hljs-number">0.905239387635804</span>, <span class="hljs-number">0.6749305353372479</span>, -<span class="hljs-number">0.7324272081377843</span>, -<span class="hljs-number">0.33007998971889263</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;blue_4521&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">18</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.2432286610792349</span>, <span class="hljs-number">0.01785636564206139</span>, -<span class="hljs-number">0.651356982731391</span>, -<span class="hljs-number">0.35848148851027895</span>, -<span class="hljs-number">0.7387383128324057</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;orange_2529&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">19</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.055512329053363674</span>, <span class="hljs-number">0.7100266349039421</span>, <span class="hljs-number">0.4956956543575197</span>, <span class="hljs-number">0.24541352586717702</span>, <span class="hljs-number">0.4209030729923515</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;red_9437&quot;</span>}
]

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createPartition</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionA&quot;</span>
})

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">data</span>: data,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionA&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">insert_cnt</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// 10</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<p>輸出是包含受影響實體統計資料的字典。有關分區作業的詳細資訊，請參閱<a href="/docs/zh-hant/v2.4.x/manage-partitions.md">管理分區</a>。</p>
<h2 id="Upsert-entities" class="common-anchor-header">倒插實體<button data-href="#Upsert-entities" class="anchor-icon" translate="no">
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
    </button></h2><p>向上插入資料是更新和插入操作的組合。在 Milvus 中，upsert 操作根據實體的主索引鍵是否已存在於集合中，執行資料層級的動作來插入或更新實體。具體來說：</p>
<ul>
<li><p>如果實體的主索引鍵已經存在於集合中，現有的實體將被覆蓋。</p></li>
<li><p>如果集合中不存在實體的主索引鍵，則會插入一個新實體。</p></li>
</ul>
<div class="alert note">
<ul>
<li>Upsert 操作不會更新主索引鍵。</li>
<li>如果您計劃使用<code translate="no">upsert</code> 作業而非<code translate="no">insert</code> 來進行大規模的資料擷取 (例如數百萬向量)，請注意這可能會導致 Milvus 資料節點上的高記憶體消耗。</li>
</ul>
</div>
<div class="language-python">
<p>要倒插實體，請使用 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/upsert.md"><code translate="no">upsert()</code></a>方法。</p>
</div>
<div class="language-java">
<p>若要上載實體，請使用 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Vector/insert.md"><code translate="no">upsert()</code></a>方法。</p>
</div>
<div class="language-javascript">
<p>若要上載實體，請使用 <a href="https://milvus.io/api-reference/node/v2.4.x/Vector/upsert.md"><code translate="no">upsert()</code></a>方法。</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 5. Upsert some data</span>
data=[
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">0</span>, <span class="hljs-string">&quot;vector&quot;</span>: [-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black_9898&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.4762662251462588</span>, -<span class="hljs-number">0.6942502138717026</span>, -<span class="hljs-number">0.4490002642657902</span>, -<span class="hljs-number">0.628696575798281</span>, <span class="hljs-number">0.9660395877041965</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red_7319&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&quot;vector&quot;</span>: [-<span class="hljs-number">0.8864122635045097</span>, <span class="hljs-number">0.9260170474445351</span>, <span class="hljs-number">0.801326976181461</span>, <span class="hljs-number">0.6383943392381306</span>, <span class="hljs-number">0.7563037341572827</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;white_6465&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.14594326235891586</span>, -<span class="hljs-number">0.3775407299900644</span>, -<span class="hljs-number">0.3765479013078812</span>, <span class="hljs-number">0.20612075380355122</span>, <span class="hljs-number">0.4902678929632145</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;orange_7580&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">4</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.4548498669607359</span>, -<span class="hljs-number">0.887610217681605</span>, <span class="hljs-number">0.5655081329910452</span>, <span class="hljs-number">0.19220509387904117</span>, <span class="hljs-number">0.016513983433433577</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red_3314&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">5</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.11755001847051827</span>, -<span class="hljs-number">0.7295149788999611</span>, <span class="hljs-number">0.2608115847524266</span>, -<span class="hljs-number">0.1719167007897875</span>, <span class="hljs-number">0.7417611743754855</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black_9955&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">6</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.9363032158314308</span>, <span class="hljs-number">0.030699901477745373</span>, <span class="hljs-number">0.8365910312319647</span>, <span class="hljs-number">0.7823840208444011</span>, <span class="hljs-number">0.2625222076909237</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;yellow_2461&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">7</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.0754823906014721</span>, -<span class="hljs-number">0.6390658668265143</span>, <span class="hljs-number">0.5610517334334937</span>, -<span class="hljs-number">0.8986261118798251</span>, <span class="hljs-number">0.9372056764266794</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;white_5015&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">8</span>, <span class="hljs-string">&quot;vector&quot;</span>: [-<span class="hljs-number">0.3038434006935904</span>, <span class="hljs-number">0.1279149203380523</span>, <span class="hljs-number">0.503958664270957</span>, -<span class="hljs-number">0.2622661156746988</span>, <span class="hljs-number">0.7407627307791929</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;purple_6414&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">9</span>, <span class="hljs-string">&quot;vector&quot;</span>: [-<span class="hljs-number">0.7125086947677588</span>, -<span class="hljs-number">0.8050968321012257</span>, -<span class="hljs-number">0.32608864121785786</span>, <span class="hljs-number">0.3255654958645424</span>, <span class="hljs-number">0.26227968923834233</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;brown_7231&quot;</span>}
]

res = client.upsert(
    collection_name=<span class="hljs-string">&#x27;quick_setup&#x27;</span>,
    data=data
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;upsert_count&quot;: 10</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// 5. Upsert some data</span>
Gson gson = <span class="hljs-keyword">new</span> Gson();
List&lt;JsonObject&gt; data = Arrays.asList(
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 0, \&quot;vector\&quot;: [-0.619954382375778f, 0.4479436794798608f, -0.17493894838751745f, -0.4248030059917294f, -0.8648452746018911f], \&quot;color\&quot;: \&quot;black_9898\&quot;}&quot;</span>, JsonObject.<span class="hljs-keyword">class</span>),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 1, \&quot;vector\&quot;: [0.4762662251462588f, -0.6942502138717026f, -0.4490002642657902f, -0.628696575798281f, 0.9660395877041965f], \&quot;color\&quot;: \&quot;red_7319\&quot;}&quot;</span>, JsonObject.<span class="hljs-keyword">class</span>),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 2, \&quot;vector\&quot;: [-0.8864122635045097f, 0.9260170474445351f, 0.801326976181461f, 0.6383943392381306f, 0.7563037341572827f], \&quot;color\&quot;: \&quot;white_6465\&quot;}&quot;</span>, JsonObject.<span class="hljs-keyword">class</span>),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 3, \&quot;vector\&quot;: [0.14594326235891586f, -0.3775407299900644f, -0.3765479013078812f, 0.20612075380355122f, 0.4902678929632145f], \&quot;color\&quot;: \&quot;orange_7580\&quot;}&quot;</span>, JsonObject.<span class="hljs-keyword">class</span>),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 4, \&quot;vector\&quot;: [0.4548498669607359f, -0.887610217681605f, 0.5655081329910452f, 0.19220509387904117f, 0.016513983433433577f], \&quot;color\&quot;: \&quot;red_3314\&quot;}&quot;</span>, JsonObject.<span class="hljs-keyword">class</span>),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 5, \&quot;vector\&quot;: [0.11755001847051827f, -0.7295149788999611f, 0.2608115847524266f, -0.1719167007897875f, 0.7417611743754855f], \&quot;color\&quot;: \&quot;black_9955\&quot;}&quot;</span>, JsonObject.<span class="hljs-keyword">class</span>),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 6, \&quot;vector\&quot;: [0.9363032158314308f, 0.030699901477745373f, 0.8365910312319647f, 0.7823840208444011f, 0.2625222076909237f], \&quot;color\&quot;: \&quot;yellow_2461\&quot;}&quot;</span>, JsonObject.<span class="hljs-keyword">class</span>),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 7, \&quot;vector\&quot;: [0.0754823906014721f, -0.6390658668265143f, 0.5610517334334937f, -0.8986261118798251f, 0.9372056764266794f], \&quot;color\&quot;: \&quot;white_5015\&quot;}&quot;</span>, JsonObject.<span class="hljs-keyword">class</span>),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 8, \&quot;vector\&quot;: [-0.3038434006935904f, 0.1279149203380523f, 0.503958664270957f, -0.2622661156746988f, 0.7407627307791929f], \&quot;color\&quot;: \&quot;purple_6414\&quot;}&quot;</span>, JsonObject.<span class="hljs-keyword">class</span>),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 9, \&quot;vector\&quot;: [-0.7125086947677588f, -0.8050968321012257f, -0.32608864121785786f, 0.3255654958645424f, 0.26227968923834233f], \&quot;color\&quot;: \&quot;brown_7231\&quot;}&quot;</span>, JsonObject.<span class="hljs-keyword">class</span>)
);

UpsertReq upsertReq = UpsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
        .data(data)
        .build();

UpsertResp upsertResp = client.upsert(upsertReq);
System.<span class="hljs-keyword">out</span>.println(upsertResp.getUpsertCnt());

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// 10</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">// <span class="hljs-number">5.</span> Upsert some data
data = [
    {<span class="hljs-built_in">id</span>: <span class="hljs-number">0</span>, vector: [-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>], color: <span class="hljs-string">&quot;black_9898&quot;</span>},
    {<span class="hljs-built_in">id</span>: <span class="hljs-number">1</span>, vector: [<span class="hljs-number">0.4762662251462588</span>, -<span class="hljs-number">0.6942502138717026</span>, -<span class="hljs-number">0.4490002642657902</span>, -<span class="hljs-number">0.628696575798281</span>, <span class="hljs-number">0.9660395877041965</span>], color: <span class="hljs-string">&quot;red_7319&quot;</span>},
    {<span class="hljs-built_in">id</span>: <span class="hljs-number">2</span>, vector: [-<span class="hljs-number">0.8864122635045097</span>, <span class="hljs-number">0.9260170474445351</span>, <span class="hljs-number">0.801326976181461</span>, <span class="hljs-number">0.6383943392381306</span>, <span class="hljs-number">0.7563037341572827</span>], color: <span class="hljs-string">&quot;white_6465&quot;</span>},
    {<span class="hljs-built_in">id</span>: <span class="hljs-number">3</span>, vector: [<span class="hljs-number">0.14594326235891586</span>, -<span class="hljs-number">0.3775407299900644</span>, -<span class="hljs-number">0.3765479013078812</span>, <span class="hljs-number">0.20612075380355122</span>, <span class="hljs-number">0.4902678929632145</span>], color: <span class="hljs-string">&quot;orange_7580&quot;</span>},
    {<span class="hljs-built_in">id</span>: <span class="hljs-number">4</span>, vector: [<span class="hljs-number">0.4548498669607359</span>, -<span class="hljs-number">0.887610217681605</span>, <span class="hljs-number">0.5655081329910452</span>, <span class="hljs-number">0.19220509387904117</span>, <span class="hljs-number">0.016513983433433577</span>], color: <span class="hljs-string">&quot;red_3314&quot;</span>},
    {<span class="hljs-built_in">id</span>: <span class="hljs-number">5</span>, vector: [<span class="hljs-number">0.11755001847051827</span>, -<span class="hljs-number">0.7295149788999611</span>, <span class="hljs-number">0.2608115847524266</span>, -<span class="hljs-number">0.1719167007897875</span>, <span class="hljs-number">0.7417611743754855</span>], color: <span class="hljs-string">&quot;black_9955&quot;</span>},
    {<span class="hljs-built_in">id</span>: <span class="hljs-number">6</span>, vector: [<span class="hljs-number">0.9363032158314308</span>, <span class="hljs-number">0.030699901477745373</span>, <span class="hljs-number">0.8365910312319647</span>, <span class="hljs-number">0.7823840208444011</span>, <span class="hljs-number">0.2625222076909237</span>], color: <span class="hljs-string">&quot;yellow_2461&quot;</span>},
    {<span class="hljs-built_in">id</span>: <span class="hljs-number">7</span>, vector: [<span class="hljs-number">0.0754823906014721</span>, -<span class="hljs-number">0.6390658668265143</span>, <span class="hljs-number">0.5610517334334937</span>, -<span class="hljs-number">0.8986261118798251</span>, <span class="hljs-number">0.9372056764266794</span>], color: <span class="hljs-string">&quot;white_5015&quot;</span>},
    {<span class="hljs-built_in">id</span>: <span class="hljs-number">8</span>, vector: [-<span class="hljs-number">0.3038434006935904</span>, <span class="hljs-number">0.1279149203380523</span>, <span class="hljs-number">0.503958664270957</span>, -<span class="hljs-number">0.2622661156746988</span>, <span class="hljs-number">0.7407627307791929</span>], color: <span class="hljs-string">&quot;purple_6414&quot;</span>},
    {<span class="hljs-built_in">id</span>: <span class="hljs-number">9</span>, vector: [-<span class="hljs-number">0.7125086947677588</span>, -<span class="hljs-number">0.8050968321012257</span>, -<span class="hljs-number">0.32608864121785786</span>, <span class="hljs-number">0.3255654958645424</span>, <span class="hljs-number">0.26227968923834233</span>], color: <span class="hljs-string">&quot;brown_7231&quot;</span>}
]

res = <span class="hljs-keyword">await</span> client.upsert({
    collection_name: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    data: data,
})

console.log(res.upsert_cnt)

// Output
// 
// <span class="hljs-number">10</span>
// 
<button class="copy-code-btn"></button></code></pre>
<h3 id="Upsert-data-in-partitions" class="common-anchor-header">在分割區中上載資料</h3><p>若要向上插入資料到特定的分割區，您可以在插入請求中指定分割區的名稱，如下所示：</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 6. Upsert data in partitions</span>
data=[
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.06998888224297328</span>, <span class="hljs-number">0.8582816610326578</span>, -<span class="hljs-number">0.9657938677934292</span>, <span class="hljs-number">0.6527905683627726</span>, -<span class="hljs-number">0.8668460657158576</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black_3651&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">11</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.6060703043917468</span>, -<span class="hljs-number">0.3765080534566074</span>, -<span class="hljs-number">0.7710758854987239</span>, <span class="hljs-number">0.36993888322346136</span>, <span class="hljs-number">0.5507513364206531</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;grey_2049&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">12</span>, <span class="hljs-string">&quot;vector&quot;</span>: [-<span class="hljs-number">0.9041813104515337</span>, -<span class="hljs-number">0.9610546012461163</span>, <span class="hljs-number">0.20033003106083358</span>, <span class="hljs-number">0.11842506351635174</span>, <span class="hljs-number">0.8327356724591011</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;blue_6168&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">13</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.3202914977909075</span>, -<span class="hljs-number">0.7279137773695252</span>, -<span class="hljs-number">0.04747830871620273</span>, <span class="hljs-number">0.8266053056909548</span>, <span class="hljs-number">0.8277957187455489</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;blue_1672&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">14</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.2975811497890859</span>, <span class="hljs-number">0.2946936202691086</span>, <span class="hljs-number">0.5399463833894609</span>, <span class="hljs-number">0.8385334966677529</span>, -<span class="hljs-number">0.4450543984655133</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;pink_1601&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">15</span>, <span class="hljs-string">&quot;vector&quot;</span>: [-<span class="hljs-number">0.04697464305600074</span>, -<span class="hljs-number">0.08509022265734134</span>, <span class="hljs-number">0.9067184632552001</span>, -<span class="hljs-number">0.2281912685064822</span>, -<span class="hljs-number">0.9747503428652762</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;yellow_9925&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">16</span>, <span class="hljs-string">&quot;vector&quot;</span>: [-<span class="hljs-number">0.9363075919673911</span>, -<span class="hljs-number">0.8153981031085669</span>, <span class="hljs-number">0.7943039120490902</span>, -<span class="hljs-number">0.2093886809842529</span>, <span class="hljs-number">0.0771191335807897</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;orange_9872&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">17</span>, <span class="hljs-string">&quot;vector&quot;</span>: [-<span class="hljs-number">0.050451522820639916</span>, <span class="hljs-number">0.18931572752321935</span>, <span class="hljs-number">0.7522886192190488</span>, -<span class="hljs-number">0.9071793089474034</span>, <span class="hljs-number">0.6032647330692296</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red_6450&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">18</span>, <span class="hljs-string">&quot;vector&quot;</span>: [-<span class="hljs-number">0.9181544231141592</span>, <span class="hljs-number">0.6700755998126806</span>, -<span class="hljs-number">0.014174674636136642</span>, <span class="hljs-number">0.6325780463623432</span>, -<span class="hljs-number">0.49662222164032976</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;purple_7392&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">19</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.11426945899602536</span>, <span class="hljs-number">0.6089190684002581</span>, -<span class="hljs-number">0.5842735738352236</span>, <span class="hljs-number">0.057050610092692855</span>, -<span class="hljs-number">0.035163433018196244</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;pink_4996&quot;</span>}
]

res = client.upsert(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    data=data,
    partition_name=<span class="hljs-string">&quot;partitionA&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;upsert_count&quot;: 10</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">import io.milvus.v2.service.vector.request.UpsertReq;
import io.milvus.v2.service.vector.response.UpsertResp;

<span class="hljs-comment">// 6. Upsert data in parition</span>
Gson gson = <span class="hljs-keyword">new</span> Gson();
List&lt;JsonObject&gt; data = Arrays.asList(
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 10, \&quot;vector\&quot;: [0.06998888224297328f, 0.8582816610326578f, -0.9657938677934292f, 0.6527905683627726f, -0.8668460657158576f], \&quot;color\&quot;: \&quot;black_3651\&quot;}&quot;</span>, JsonObject.<span class="hljs-keyword">class</span>),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 11, \&quot;vector\&quot;: [0.6060703043917468f, -0.3765080534566074f, -0.7710758854987239f, 0.36993888322346136f, 0.5507513364206531f], \&quot;color\&quot;: \&quot;grey_2049\&quot;}&quot;</span>, JsonObject.<span class="hljs-keyword">class</span>),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 12, \&quot;vector\&quot;: [-0.9041813104515337f, -0.9610546012461163f, 0.20033003106083358f, 0.11842506351635174f, 0.8327356724591011f], \&quot;color\&quot;: \&quot;blue_6168\&quot;}&quot;</span>, JsonObject.<span class="hljs-keyword">class</span>),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 13, \&quot;vector\&quot;: [0.3202914977909075f, -0.7279137773695252f, -0.04747830871620273f, 0.8266053056909548f, 0.8277957187455489f], \&quot;color\&quot;: \&quot;blue_1672\&quot;}&quot;</span>, JsonObject.<span class="hljs-keyword">class</span>),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 14, \&quot;vector\&quot;: [0.2975811497890859f, 0.2946936202691086f, 0.5399463833894609f, 0.8385334966677529f, -0.4450543984655133f], \&quot;color\&quot;: \&quot;pink_1601\&quot;}&quot;</span>, JsonObject.<span class="hljs-keyword">class</span>),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 15, \&quot;vector\&quot;: [-0.04697464305600074f, -0.08509022265734134f, 0.9067184632552001f, -0.2281912685064822f, -0.9747503428652762f], \&quot;color\&quot;: \&quot;yellow_9925\&quot;}&quot;</span>, JsonObject.<span class="hljs-keyword">class</span>),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 16, \&quot;vector\&quot;: [-0.9363075919673911f, -0.8153981031085669f, 0.7943039120490902f, -0.2093886809842529f, 0.0771191335807897f], \&quot;color\&quot;: \&quot;orange_9872\&quot;}&quot;</span>, JsonObject.<span class="hljs-keyword">class</span>),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 17, \&quot;vector\&quot;: [-0.050451522820639916f, 0.18931572752321935f, 0.7522886192190488f, -0.9071793089474034f, 0.6032647330692296f], \&quot;color\&quot;: \&quot;red_6450\&quot;}&quot;</span>, JsonObject.<span class="hljs-keyword">class</span>),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 18, \&quot;vector\&quot;: [-0.9181544231141592f, 0.6700755998126806f, -0.014174674636136642f, 0.6325780463623432f, -0.49662222164032976f], \&quot;color\&quot;: \&quot;purple_7392\&quot;}&quot;</span>, JsonObject.<span class="hljs-keyword">class</span>),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 19, \&quot;vector\&quot;: [0.11426945899602536f, 0.6089190684002581f, -0.5842735738352236f, 0.057050610092692855f, -0.035163433018196244f], \&quot;color\&quot;: \&quot;pink_4996\&quot;}&quot;</span>, JsonObject.<span class="hljs-keyword">class</span>)
);

UpsertReq upsertReq = UpsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
        .partitionName(<span class="hljs-string">&quot;partitionA&quot;</span>)
        .data(data)
        .build();

UpsertResp upsertResp = client.upsert(upsertReq);
System.<span class="hljs-keyword">out</span>.println(upsertResp.getUpsertCnt());

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// 10</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 6. Upsert data in partitions</span>
data = [
    {<span class="hljs-attr">id</span>: <span class="hljs-number">10</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.06998888224297328</span>, <span class="hljs-number">0.8582816610326578</span>, -<span class="hljs-number">0.9657938677934292</span>, <span class="hljs-number">0.6527905683627726</span>, -<span class="hljs-number">0.8668460657158576</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;black_3651&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">11</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.6060703043917468</span>, -<span class="hljs-number">0.3765080534566074</span>, -<span class="hljs-number">0.7710758854987239</span>, <span class="hljs-number">0.36993888322346136</span>, <span class="hljs-number">0.5507513364206531</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;grey_2049&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">12</span>, <span class="hljs-attr">vector</span>: [-<span class="hljs-number">0.9041813104515337</span>, -<span class="hljs-number">0.9610546012461163</span>, <span class="hljs-number">0.20033003106083358</span>, <span class="hljs-number">0.11842506351635174</span>, <span class="hljs-number">0.8327356724591011</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;blue_6168&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">13</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.3202914977909075</span>, -<span class="hljs-number">0.7279137773695252</span>, -<span class="hljs-number">0.04747830871620273</span>, <span class="hljs-number">0.8266053056909548</span>, <span class="hljs-number">0.8277957187455489</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;blue_1672&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">14</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.2975811497890859</span>, <span class="hljs-number">0.2946936202691086</span>, <span class="hljs-number">0.5399463833894609</span>, <span class="hljs-number">0.8385334966677529</span>, -<span class="hljs-number">0.4450543984655133</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;pink_1601&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">15</span>, <span class="hljs-attr">vector</span>: [-<span class="hljs-number">0.04697464305600074</span>, -<span class="hljs-number">0.08509022265734134</span>, <span class="hljs-number">0.9067184632552001</span>, -<span class="hljs-number">0.2281912685064822</span>, -<span class="hljs-number">0.9747503428652762</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;yellow_9925&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">16</span>, <span class="hljs-attr">vector</span>: [-<span class="hljs-number">0.9363075919673911</span>, -<span class="hljs-number">0.8153981031085669</span>, <span class="hljs-number">0.7943039120490902</span>, -<span class="hljs-number">0.2093886809842529</span>, <span class="hljs-number">0.0771191335807897</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;orange_9872&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">17</span>, <span class="hljs-attr">vector</span>: [-<span class="hljs-number">0.050451522820639916</span>, <span class="hljs-number">0.18931572752321935</span>, <span class="hljs-number">0.7522886192190488</span>, -<span class="hljs-number">0.9071793089474034</span>, <span class="hljs-number">0.6032647330692296</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;red_6450&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">18</span>, <span class="hljs-attr">vector</span>: [-<span class="hljs-number">0.9181544231141592</span>, <span class="hljs-number">0.6700755998126806</span>, -<span class="hljs-number">0.014174674636136642</span>, <span class="hljs-number">0.6325780463623432</span>, -<span class="hljs-number">0.49662222164032976</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;purple_7392&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">19</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.11426945899602536</span>, <span class="hljs-number">0.6089190684002581</span>, -<span class="hljs-number">0.5842735738352236</span>, <span class="hljs-number">0.057050610092692855</span>, -<span class="hljs-number">0.035163433018196244</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;pink_4996&quot;</span>}
]

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">upsert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">data</span>: data,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionA&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">upsert_cnt</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// 10</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<p>輸出是包含受影響實體統計資料的字典。有關磁碟分割作業的詳細資訊，請參閱<a href="/docs/zh-hant/v2.4.x/manage-partitions.md">管理磁碟分割</a>。</p>
<h2 id="Delete-entities" class="common-anchor-header">刪除實體<button data-href="#Delete-entities" class="anchor-icon" translate="no">
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
    </button></h2><div class="language-python">
<p>如果不再需要某個實體，您可以使用 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/delete.md"><code translate="no">delete()</code></a>.</p>
</div>
<div class="language-java">
<p>如果不再需要某個實體，您可以使用 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Vector/delete.md"><code translate="no">delete()</code></a>.</p>
</div>
<div class="language-javascript">
<p>如果不再需要實體，您可以使用 . <a href="https://milvus.io/api-reference/node/v2.4.x/Vector/delete.md"><code translate="no">delete()</code></a>.</p>
</div>
<p>Milvus 提供了兩種方法讓您識別要刪除的實體。</p>
<ul>
<li><p><strong>通過篩選刪除實體。</strong></p>
   <div class='alert note'>
<p>當使用篩選表達式刪除實體時，請確認已載入集合。否則，Milvus 會返回錯誤。</p>
   </div>
<p><div class="multipleCode">
<a href="#python">Python </a><a href="#java">Java</a><a href="#javascript">Node.js</a></div></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 7. Delete entities</span>
res = client.delete(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;id in [4,5,6]&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;delete_count&quot;: 3</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.DeleteReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.DeleteResp;


<span class="hljs-comment">// 7. Delete entities</span>

<span class="hljs-type">DeleteReq</span> <span class="hljs-variable">deleteReq</span> <span class="hljs-operator">=</span> DeleteReq.builder()
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
        .filter(<span class="hljs-string">&quot;id in [4, 5, 6]&quot;</span>)
        .build();

<span class="hljs-type">DeleteResp</span> <span class="hljs-variable">deleteResp</span> <span class="hljs-operator">=</span> client.delete(deleteReq);
System.out.println(deleteResp.getDeleteCnt());

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// 3</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 7. Delete entities</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">delete</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">filter</span>: <span class="hljs-string">&quot;id in [4,5,6]&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">delete_cnt</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// 3</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>以 ID 刪除實體。</strong></p>
<p>以下片段示範如何從特定分割區依 ID 刪除實體。如果您不指定分割區名稱，它也可以運作。</p>
<p><div class="multipleCode">
<a href="#python">Python </a><a href="#java">Java</a><a href="#javascript">Node.js</a></div></p>
<pre><code translate="no" class="language-python">res = client.delete(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    ids=[<span class="hljs-number">18</span>, <span class="hljs-number">19</span>],
    partition_name=<span class="hljs-string">&quot;partitionA&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;delete_count&quot;: 2</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">deleteReq = DeleteReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .ids(Arrays.asList(<span class="hljs-number">18</span>L, <span class="hljs-number">19</span>L))
    .partitionName(<span class="hljs-string">&quot;partitionA&quot;</span>)
    .build();

deleteResp = client.<span class="hljs-built_in">delete</span>(deleteReq);

System.out.<span class="hljs-built_in">println</span>(deleteResp.getDeleteCnt());

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// 2</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">delete</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">ids</span>: [<span class="hljs-number">18</span>, <span class="hljs-number">19</span>],
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionA&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">delete_cnt</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// 2</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<p>有關如何使用篩選表達式的詳細資訊，請參閱<a href="/docs/zh-hant/v2.4.x/get-and-scalar-query.md">Get &amp; Scalar Query</a>。</p></li>
<li><p><strong>依據分割區名稱刪除實體</strong>。</p>
<p>如果要從特定的分割區刪除實體，可以在<code translate="no">delete()</code> 方法中使用<code translate="no">partition_name</code> 參數指定分割區名稱。以下範例會從<code translate="no">partitionA</code> 刪除顏色以<code translate="no">blue</code> 開頭的實體。</p>
<p><div class="multipleCode">
<a href="#python">Python </a><a href="#java">Java</a><a href="#javascript">Node.js</a></div></p>
<pre><code translate="no" class="language-python">res = client.delete(
collection_name=<span class="hljs-string">&#x27;quick_setup&#x27;</span>,
partition_name=<span class="hljs-string">&#x27;partitionA&#x27;</span>,
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;color like &quot;blue%&quot;&#x27;</span>
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Entities deleted from partitionA: &quot;</span>, res[<span class="hljs-string">&#x27;delete_count&#x27;</span>])

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># Entities deleted from partitionA:  3</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">deleteReq = DeleteReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .filter(<span class="hljs-string">&#x27;color like &quot;blue%&quot;&#x27;</span>)
    .partitionName(<span class="hljs-string">&quot;partitionA&quot;</span>)
    .build();

deleteResp = client.<span class="hljs-built_in">delete</span>(deleteReq);

System.out.<span class="hljs-built_in">println</span>(deleteResp.getDeleteCnt());
<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// 3</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">delete</span>({
<span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
<span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionA&quot;</span>,
<span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;color like &quot;blue%&quot;&#x27;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Entities deleted from partitionA: &quot;</span> + res.<span class="hljs-property">delete_cnt</span>)

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// Entities deleted from partitionA: 3</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
