---
id: milvus_lite.md
summary: 開始使用 Milvus Lite。
title: 本地運行 Milvus Lite
---
<h1 id="Run-Milvus-Lite-Locally" class="common-anchor-header">本地運行 Milvus Lite<button data-href="#Run-Milvus-Lite-Locally" class="anchor-icon" translate="no">
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
    </button></h1><p>本頁說明如何使用 Milvus Lite 在本機執行 Milvus。Milvus Lite 是<a href="https://github.com/milvus-io/milvus">Milvus</a> 的輕量級版本，Milvus 是一個開放源碼向量資料庫，可透過向量嵌入和相似性搜尋為 AI 應用程式提供動力。</p>
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
    </button></h2><p>Milvus Lite 可以匯入您的 Python 應用程式，提供 Milvus 的核心向量搜尋功能。Milvus Lite 已包含在<a href="https://github.com/milvus-io/pymilvus">Milvus 的 Python SDK</a> 中。它可以簡單地透過<code translate="no">pip install pymilvus</code> 部署。</p>
<p>使用 Milvus Lite，您可以在幾分鐘內開始建立具有向量相似性搜尋的 AI 應用程式！Milvus Lite 適合在下列環境中執行：</p>
<ul>
<li>Jupyter Notebook / Google Colab</li>
<li>筆記型電腦</li>
<li>邊緣裝置</li>
</ul>
<p>Milvus Lite 與 Milvus Standalone 和 Distributed 共用相同的 API，並涵蓋大部分功能，例如向量資料持久化和管理、向量 CRUD 操作、稀疏和密集向量搜尋、元資料過濾、多向量和混合搜尋。這兩項功能可在不同類型的環境中提供一致的體驗，從邊緣裝置到雲端集群，適合不同規模的使用個案。使用相同的客戶端程式碼，您可以在筆記型電腦或 Jupyter Notebook 上使用 Milvus Lite 執行 GenAI 應用程式，或在 Docker 容器上使用 Milvus Standalone 執行 GenAI 應用程式，或在大型 Kubernetes 叢集上使用 Milvus Distributed 執行 GenAI 應用程式，在生產中提供數十億向量的服務。</p>
<h2 id="Prerequisites" class="common-anchor-header">先決條件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Lite 目前支援下列環境：</p>
<ul>
<li>Ubuntu &gt;= 20.04 (x86_64 和 arm64)</li>
<li>MacOS &gt;= 11.0 (Apple Silicon M1/M2 和 x86_64)</li>
</ul>
<p>請注意 Milvus Lite 只適用於小規模的向量搜尋使用個案。對於大規模的使用個案，我們建議使用<a href="https://milvus.io/docs/install-overview.md#Milvus-Standalone">Milvus Standalone</a>或<a href="https://milvus.io/docs/install-overview.md#Milvus-Distributed">Milvus Distributed</a>。您也可以考慮在<a href="https://zilliz.com/cloud">Zilliz Cloud</a> 上使用完全管理的 Milvus。</p>
<h2 id="Set-up-Milvus-Lite" class="common-anchor-header">設定 Milvus Lite<button data-href="#Set-up-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-shell">pip install -U pymilvus
<button class="copy-code-btn"></button></code></pre>
<p>我們建議使用<code translate="no">pymilvus</code> 。由於<code translate="no">milvus-lite</code> 已包含在<code translate="no">pymilvus</code> 2.4.2 或以上版本，您可以<code translate="no">pip install</code> 與<code translate="no">-U</code> 強制更新至最新版本，<code translate="no">milvus-lite</code> 會自動安裝。</p>
<p>如果您想明確地安裝<code translate="no">milvus-lite</code> 套件，或者您已經安裝了較舊版本的<code translate="no">milvus-lite</code> 並想要更新它，您可以進行<code translate="no">pip install -U milvus-lite</code> 。</p>
<h2 id="Connect-to-Milvus-Lite" class="common-anchor-header">連接至 Milvus Lite<button data-href="#Connect-to-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p>在<code translate="no">pymilvus</code> 中，指定一個本地檔案名稱作為 MilvusClient 的 uri 參數，將會使用 Milvus Lite。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
client = MilvusClient(<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>執行上述程式碼片段後，會在目前的資料夾中產生一個名為<strong>milvus_demo.db</strong>的資料庫檔案。</p>
<blockquote>
<p><strong><em>注意：</em></strong>請注意相同的 API 也適用於 Milvus Standalone、Milvus Distributed 和 Zilliz Cloud，唯一的差別是將本機檔案名稱換成遠端伺服器端點和憑證，例如<code translate="no">client = MilvusClient(uri=&quot;http://localhost:19530&quot;, token=&quot;username:password&quot;)</code> 。</p>
</blockquote>
<h2 id="Examples" class="common-anchor-header">範例<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>以下是一個簡單的示範，展示如何使用 Milvus Lite 進行文字搜尋。有更多使用 Milvus Lite 建立應用程式的完整<a href="https://github.com/milvus-io/bootcamp/tree/master/bootcamp/tutorials">範例</a>，例如<a href="https://github.com/milvus-io/bootcamp/blob/master/tutorials/quickstart/build_RAG_with_milvus.ipynb">RAG</a>、<a href="https://github.com/milvus-io/bootcamp/blob/master/tutorials/quickstart/image_search_with_milvus.ipynb">圖片搜尋</a>，以及在流行的 RAG 架構中使用 Milvus Lite，例如<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/rag_with_milvus_and_langchain.ipynb">LangChain</a>和<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/rag_with_milvus_and_llamaindex.ipynb">LlamaIndex</a>！</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np

client = MilvusClient(<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)
client.create_collection(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    dimension=<span class="hljs-number">384</span>  <span class="hljs-comment"># The vectors we will use in this demo has 384 dimensions</span>
)

<span class="hljs-comment"># Text strings to search from.</span>
docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]
<span class="hljs-comment"># For illustration, here we use fake vectors with random numbers (384 dimension).</span>

vectors = [[ np.random.uniform(-<span class="hljs-number">1</span>, <span class="hljs-number">1</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">384</span>) ] <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(docs)) ]
data = [ {<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: vectors[i], <span class="hljs-string">&quot;text&quot;</span>: docs[i], <span class="hljs-string">&quot;subject&quot;</span>: <span class="hljs-string">&quot;history&quot;</span>} <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(vectors)) ]
res = client.insert(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    data=data
)

<span class="hljs-comment"># This will exclude any text in &quot;history&quot; subject despite close to the query vector.</span>
res = client.search(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    data=[vectors[<span class="hljs-number">0</span>]],
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;subject == &#x27;history&#x27;&quot;</span>,
    limit=<span class="hljs-number">2</span>,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],
)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># a query that retrieves all entities matching filter expressions.</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;subject == &#x27;history&#x27;&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],
)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># delete</span>
res = client.delete(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;subject == &#x27;history&#x27;&quot;</span>,
)
<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>當執行 Milvus Lite 時，請注意有些功能是不支援的。以下表格總結了 Milvus Lite 的使用限制。</p>
<h3 id="Collection" class="common-anchor-header">收集</h3><table>
<thead>
<tr><th>方法/參數</th><th>Milvus Lite 支援</th></tr>
</thead>
<tbody>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md">create_collection()</a></td><td>支援有限的參數</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">dimension</code></td><td>Y</td></tr>
<tr><td><code translate="no">primary_field_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">id_type</code></td><td>Y</td></tr>
<tr><td><code translate="no">vector_field_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">metric_type</code></td><td>Y</td></tr>
<tr><td><code translate="no">auto_id</code></td><td>Y</td></tr>
<tr><td><code translate="no">schema</code></td><td>Y</td></tr>
<tr><td><code translate="no">index_params</code></td><td>Y</td></tr>
<tr><td><code translate="no">enable_dynamic_field</code></td><td>Y</td></tr>
<tr><td><code translate="no">num_shards</code></td><td>N</td></tr>
<tr><td><code translate="no">partition_key_field</code></td><td>N</td></tr>
<tr><td><code translate="no">num_partitions</code></td><td>N</td></tr>
<tr><td><code translate="no">consistency_level</code></td><td>N (僅支援<code translate="no">Strong</code>; 任何設定都會被視為<code translate="no">Strong</code>.)</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/get_collection_stats.md">get_collection_stats()</a></td><td>支援取得集合統計資料。</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/describe_collection.md">describe_collection()</a></td><td><code translate="no">num_shards</code>、<code translate="no">consistency_level</code> 及<code translate="no">collection_id</code> 回應無效。</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/has_collection.md">has_collection()</a></td><td>支援檢查集合是否存在。</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/list_collections.md">list_collections()</a></td><td>支援列出所有的集合。</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/drop_collection.md">drop_collection()</a></td><td>支援丟棄一個集合。</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/rename_collection.md">rename_collection()</a></td><td>不支援重新命名集合。</td></tr>
</tbody>
</table>
<h3 id="Field--Schema" class="common-anchor-header">欄位與模式</h3><table>
<thead>
<tr><th>方法/參數</th><th>Milvus Lite 支援</th></tr>
</thead>
<tbody>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md">create_schema()</a></td><td>支援有限的參數</td></tr>
<tr><td><code translate="no">auto_id</code></td><td>Y</td></tr>
<tr><td><code translate="no">enable_dynamic_field</code></td><td>Y</td></tr>
<tr><td><code translate="no">primary_field</code></td><td>Y</td></tr>
<tr><td><code translate="no">partition_key_field</code></td><td>N</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/CollectionSchema/add_field.md">add_field()</a></td><td>支援有限的參數</td></tr>
<tr><td><code translate="no">field_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">datatype</code></td><td>Y</td></tr>
<tr><td><code translate="no">is_primary</code></td><td>Y</td></tr>
<tr><td><code translate="no">max_length</code></td><td>Y</td></tr>
<tr><td><code translate="no">element_type</code></td><td>Y</td></tr>
<tr><td><code translate="no">max_capacity</code></td><td>Y</td></tr>
<tr><td><code translate="no">dim</code></td><td>Y</td></tr>
<tr><td><code translate="no">is_partition_key</code></td><td>N</td></tr>
</tbody>
</table>
<h3 id="Insert--Search" class="common-anchor-header">插入與搜尋</h3><table>
<thead>
<tr><th>方法/參數</th><th>Milvus Lite 支援</th></tr>
</thead>
<tbody>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/search.md">搜尋()</a></td><td>支援有限的參數</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">data</code></td><td>Y</td></tr>
<tr><td><code translate="no">filter</code></td><td>Y</td></tr>
<tr><td><code translate="no">limit</code></td><td>Y</td></tr>
<tr><td><code translate="no">output_fields</code></td><td>Y</td></tr>
<tr><td><code translate="no">search_params</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><code translate="no">partition_names</code></td><td>N</td></tr>
<tr><td><code translate="no">anns_field</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/query.md">查詢()</a></td><td>支援有限參數</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">filter</code></td><td>Y</td></tr>
<tr><td><code translate="no">output_fields</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><code translate="no">ids</code></td><td>Y</td></tr>
<tr><td><code translate="no">partition_names</code></td><td>N</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/get.md">獲取()</a></td><td>支援有限參數</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">ids</code></td><td>Y</td></tr>
<tr><td><code translate="no">output_fields</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><code translate="no">partition_names</code></td><td>N</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/delete.md">刪除()</a></td><td>支援有限參數</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">ids</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><code translate="no">filter</code></td><td>Y</td></tr>
<tr><td><code translate="no">partition_name</code></td><td>N</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/insert.md">插入()</a></td><td>支援有限參數</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">data</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><code translate="no">partition_name</code></td><td>N</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/upsert.md">upsert()</a></td><td>支援有限參數</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">data</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><code translate="no">partition_name</code></td><td>N</td></tr>
</tbody>
</table>
<h3 id="Load--Release" class="common-anchor-header">載入與釋放</h3><table>
<thead>
<tr><th>方法/參數</th><th>Milvus Lite 支援</th></tr>
</thead>
<tbody>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/load_collection.md">load_collection()</a></td><td>Y</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/release_collection.md">release_collection()</a></td><td>Y</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/get_load_state.md">get_load_state()</a></td><td>不支援取得載入狀態。</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/refresh_load.md">refresh_load()</a></td><td>不支援載入已載入集合的未載入資料。</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Client/close.md">close()</a></td><td>Y</td></tr>
</tbody>
</table>
<h3 id="Index" class="common-anchor-header">索引</h3><table>
<thead>
<tr><th>方法/參數</th><th>Milvus Lite 支援</th></tr>
</thead>
<tbody>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/list_collections.md">list_indexes()</a></td><td>支援列出索引。</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">field_name</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/create_index.md">create_index()</a></td><td>僅支援<code translate="no">FLAT</code> 索引類型。</td></tr>
<tr><td><code translate="no">index_params</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/drop_index.md">drop_index()</a></td><td>支援丟失索引。</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">index_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/describe_index.md">describe_index()</a></td><td>支援描述索引。</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">index_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
</tbody>
</table>
<h3 id="Vector-Index-Types" class="common-anchor-header">向量索引類型</h3><p>Milvus Lite 只支援<a href="https://milvus.io/docs/index.md?tab=floating#FLAT">FLAT</a>索引類型。無論集合中指定的索引類型為何，它都使用 FLAT 類型。</p>
<h3 id="Search-Features" class="common-anchor-header">搜尋功能</h3><p>Milvus Lite 支援 Sparse Vector、Multi-vector、Hybrid Search。</p>
<h3 id="Partition" class="common-anchor-header">分割</h3><p>Milvus Lite 不支援分割和分割相關的方法。</p>
<h3 id="Users--Roles" class="common-anchor-header">使用者與角色</h3><p>Milvus Lite 不支援使用者與角色及相關方法。</p>
<h3 id="Alias" class="common-anchor-header">別名</h3><p>Milvus Lite 不支援別名和別名相關的方法。</p>
<h2 id="Migrating-data-from-Milvus-Lite" class="common-anchor-header">從 Milvus Lite 遷移資料<button data-href="#Migrating-data-from-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p>所有儲存於 Milvus Lite 的資料都可以輕鬆匯出並載入其他類型的 Milvus 部署，例如 Docker 上的 Milvus Standalone、K8s 上的 Milvus Distributed 或<a href="https://zilliz.com/cloud">Zilliz Cloud</a> 上的完全管理式 Milvus。</p>
<p>Milvus Lite 提供一個命令列工具，可以將資料轉存為 json 檔案，並將其匯入<a href="https://github.com/milvus-io/milvus">Milvus</a>和<a href="https://zilliz.com/cloud">Zilliz Cloud</a>(Milvus 的完全管理雲端服務)。milvus-lite 指令會與 milvus-lite python 套件一起安裝。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Install</span>
pip install -U &quot;pymilvus[bulk_writer]&quot;

milvus-lite dump -h

usage: milvus-lite dump [-h] [-d DB_FILE] [-c COLLECTION] [-p PATH]

optional arguments:
  -h, --help            show this help message and exit
  -d DB_FILE, --db-file DB_FILE
                        milvus lite db file
  -c COLLECTION, --collection COLLECTION
                        collection that need to be dumped
  -p PATH, --path PATH  dump file storage dir
<button class="copy-code-btn"></button></code></pre>
<p>以下範例會將<code translate="no">demo_collection</code> 套件中儲存於<code translate="no">./milvus_demo.db</code> (Milvus Lite 資料庫檔案) 的所有資料匯出。</p>
<p>匯出資料：</p>
<pre><code translate="no" class="language-shell">milvus-lite dump -d ./milvus_demo.db -c demo_collection -p ./data_dir
<span class="hljs-meta prompt_"># </span><span class="language-bash">./milvus_demo.db: milvus lite db file</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">demo_collection: collection that need to be dumped</span>
<span class="hljs-meta prompt_">#</span><span class="language-bash">./data_dir : dump file storage <span class="hljs-built_in">dir</span></span>
<button class="copy-code-btn"></button></code></pre>
<p>使用轉儲檔案，您可以透過<a href="https://docs.zilliz.com/docs/data-import">資料匯入</a>上傳資料到 Zilliz Cloud，或透過<a href="https://milvus.io/docs/import-data.md">大量插入</a>上傳資料到 Milvus 伺服器。</p>
<h2 id="Whats-next" class="common-anchor-header">下一步<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>連接 Milvus Lite 後，您可以</p>
<ul>
<li><p>查看<a href="/docs/zh-hant/quickstart.md">快速入門</a>，了解 Milvus 的功能。</p></li>
<li><p>學習 Milvus 的基本操作：</p>
<ul>
<li><a href="/docs/zh-hant/manage_databases.md">管理資料庫</a></li>
<li><a href="/docs/zh-hant/manage-collections.md">管理資料庫</a></li>
<li><a href="/docs/zh-hant/manage-partitions.md">管理分區</a></li>
<li><a href="/docs/zh-hant/insert-update-delete.md">插入、倒置及刪除</a></li>
<li><a href="/docs/zh-hant/single-vector-search.md">單向量搜尋</a></li>
<li><a href="/docs/zh-hant/multi-vector-search.md">混合搜尋</a></li>
</ul></li>
<li><p><a href="/docs/zh-hant/upgrade_milvus_cluster-helm.md">使用 Helm Chart 升級 Milvus</a>。</p></li>
<li><p><a href="/docs/zh-hant/scaleout.md">擴充您的 Milvus 集群</a>。</p></li>
<li><p>在雲端部署您的 Milvus 叢集：</p>
<ul>
<li><a href="/docs/zh-hant/eks.md">亞馬遜 EKS</a></li>
<li><a href="/docs/zh-hant/gcp.md">谷歌雲</a></li>
<li><a href="/docs/zh-hant/azure.md">微軟 Azure</a></li>
</ul></li>
<li><p>探索<a href="/docs/zh-hant/milvus_backup_overview.md">Milvus 備份</a>，Milvus 資料備份的開放原始碼工具。</p></li>
<li><p>探索<a href="/docs/zh-hant/birdwatcher_overview.md">Birdwatcher</a>，用於調試 Milvus 和動態配置更新的開放源碼工具。</p></li>
<li><p>探索<a href="https://github.com/zilliztech/attu">Attu</a>，用於直覺式 Milvus 管理的開放原始碼 GUI 工具。</p></li>
<li><p><a href="/docs/zh-hant/monitor.md">使用 Prometheus 監控 Milvus</a>。</p></li>
</ul>
