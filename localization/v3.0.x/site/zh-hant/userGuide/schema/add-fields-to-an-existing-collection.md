---
id: add-fields-to-an-existing-collection.md
title: 變更集合結構
summary: 透過新增或刪除標量欄位、向量欄位以及由函數生成的向量欄位，來修改現有的集合模式，而無需重新建立該集合。
---
<h1 id="Alter-Collection-Schema" class="common-anchor-header">變更集合結構<button data-href="#Alter-Collection-Schema" class="anchor-icon" translate="no">
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
    </button></h1><p>當集合從開發環境移轉至生產環境時，各實體周邊的欄位通常會有所變更。 您可能會新增如 `<code translate="no">source_uri</code> ` 或 `<code translate="no">review_status</code> ` 等標量欄位，以進行篩選與應用程式邏輯處理；新增由應用程式生成的嵌入向量欄位；新增由 BM25 生成的稀疏向量欄位，以便對現有文字進行詞彙搜尋；或是移除不再使用的欄位。「變更集合架構」功能可讓您直接進行受支援的欄位變更，而無需重新建立集合。</p>
<div class="alert note">
<p>本指南涵蓋受管集合中的欄位層級架構變更，包括使用者自訂欄位及由函式產生的向量欄位。若要將欄位新增至外部集合，請參閱<a href="/docs/zh-hant/alter-external-collection-schema.md">「變更外部集合架構」</a>。若要變更欄位屬性（例如變更<code translate="no">VARCHAR</code> 欄位的<code translate="no">max_length</code> ，或變更<code translate="no">ARRAY</code> 欄位的<code translate="no">max_capacity</code> ），請參閱<a href="/docs/zh-hant/alter-collection-field.md">「變更集合欄位」</a>。 關於動態欄位的行為，請參閱「<a href="/docs/zh-hant/enable-dynamic-field.md">動態欄位</a>」及「<a href="/docs/zh-hant/modify-collection.md">修改集合</a>」。</p>
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
    </button></h2><p><strong>新增使用者自訂欄位</strong></p>
<ul>
<li><p>新增的自訂欄位必須為可為空的。呼叫<code translate="no">add_collection_field()</code> 時，請設定<code translate="no">nullable=True</code> 。對於現有實體，除非您新增的是具有<code translate="no">default_value</code> 的標量欄位，否則新增的欄位將為<code translate="no">NULL</code> 。</p></li>
<li><p>Milvus 2.6.x 及後續版本支援新增使用者自訂標量欄位。Milvus 2.6.18 及後續版本支援新增使用者自訂向量欄位。</p></li>
<li><p>Milvus 3.0.0 及後續版本支援新增 StructArray 欄位。新增的 StructArray 欄位必須為可為空的。</p></li>
<li><p>欄位名稱在集合中的所有欄位中必須是唯一的。</p></li>
</ul>
<p><strong>新增由函式生成的向量欄位</strong></p>
<ul>
<li><p>每次模式更新僅能新增一個函式及一個由該函式產生的向量欄位。</p></li>
<li><p>支援的函式決定了生成的向量欄位類型：<code translate="no">BM25</code> 會生成一個 `<code translate="no">SPARSE_FLOAT_VECTOR</code> ` 欄位，而<code translate="no">MINHASH</code> 會生成一個 `<code translate="no">BINARY_VECTOR</code> ` 欄位。</p></li>
<li><p>生成的向量欄位必須是新欄位。它不能指向集合模式中已存在的欄位。</p></li>
<li><p>生成的向量欄位不得為可為空欄位。</p></li>
<li><p>該函式所使用的輸入欄位必須已存在於集合中。</p></li>
<li><p>當將 BM25 或 MinHash 函式新增至現有集合時，該函式的輸入必須為<code translate="no">VARCHAR</code> 欄位。此工作流程不支援<code translate="no">TEXT</code> 輸入，因為 Milvus 無法透過該輸入類型為現有實體補入生成的輸出資料。</p></li>
</ul>
<p><strong>刪除使用者自訂欄位</strong></p>
<ul>
<li><p>您無法刪除集合中的主鍵欄位、分區鍵欄位、叢集鍵欄位或最後一個向量欄位。</p></li>
<li><p>您可以刪除整個「<code translate="no">ARRAY&lt;STRUCT&gt;</code> 」欄位，但無法刪除「<code translate="no">ARRAY&lt;STRUCT&gt;</code> 」欄位內的個別子欄位。</p></li>
<li><p>您無法直接刪除用作函式輸入欄位或作為函式輸出欄位所產生的欄位。若要移除函式輸出欄位，請刪除產生該欄位的函式。</p></li>
</ul>
<p><strong>刪除由函數產生的向量欄位</strong></p>
<ul>
<li><p>在此模式變更工作流程中，刪除函數會同時移除該函數及其所產生的輸出欄位。函數輸入欄位仍會保留在集合模式中。</p></li>
<li><p>若刪除函數的輸出欄位後，將導致集合中沒有任何向量欄位，則刪除該函數的操作將被拒絕。</p></li>
</ul>
<div class="alert note">
<p>若需進行超出支援之新增與刪除操作範圍的架構變更，請重新建立或遷移該集合。</p>
</div>
<h2 id="Add-fields-to-an-existing-collection" class="common-anchor-header">向現有集合新增欄位<button data-href="#Add-fields-to-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>請根據欄位值的產生方式，選擇新增欄位的路徑：</p>
<ul>
<li><p>當您需要新的元資料來進行篩選、查詢輸出或應用程式邏輯時，<a href="#add-user-defined-scalar-fields--milvus-26x">請新增使用者自訂的標量欄位</a>。</p></li>
<li><p>當您需要一個其元素共享相同 Struct 模式的陣列欄位時，<a href="#add-structarray-fields--milvus-300">請新增 StructArray 欄位</a>。</p></li>
<li><p>當您的應用程式產生嵌入向量並將向量值寫入 Milvus 時，<a href="#add-user-defined-vector-fields--milvus-2618">請新增使用者自訂向量欄位</a>。</p></li>
<li><p>當 Milvus 需從現有欄位生成向量值時（例如從文字中生成 BM25 稀疏向量或 MinHash 簽名），<a href="#add-vector-fields-generated-by-functions--milvus-30x">請新增由函式生成的向量欄位</a>。</p></li>
</ul>
<p>在所有情況下，新欄位名稱不得與集合中已存在的欄位名稱重複，且欄位總數不得超過 Milvus 的欄位數量限制。詳細資訊請參閱《<a href="/docs/zh-hant/limitations.md#number-of-resources-in-a-collection">Milvus 限制</a>》。</p>
<h3 id="Add-user-defined-scalar-fields--Milvus-26x" class="common-anchor-header">新增使用者自訂標量欄位<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Add-user-defined-scalar-fields--Milvus-26x" class="anchor-icon" translate="no">
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
    </button></h3><p>請使用 `<code translate="no">add_collection_field()</code> ` 將使用者自訂標量欄位新增至現有集合。</p>
<p>這與將任意鍵儲存於動態欄位不同：在模式更新生效後，新的標量欄位將成為集合模式的正規組成部分。您可以向其中插入或更新值、在支援的情況下為其建立索引、在查詢和搜尋篩選器中使用它，並在查詢或搜尋輸出中返回該欄位。</p>
<p>由於現有實體是在新欄位建立之前插入的，因此每個新增的自訂標量欄位都必須允許為 null：</p>
<ul>
<li><p>若您新增的標量欄位設定為<code translate="no">nullable=True</code> 且未設定<code translate="no">default_value</code> ，現有實體在新欄位中將返回<code translate="no">NULL</code> 。</p></li>
<li><p>若新增的標量欄位同時具備<code translate="no">nullable=True</code> 且<code translate="no">default_value</code> ，現有實體將回傳預設值，而非<code translate="no">NULL</code> 。</p></li>
</ul>
<p>標量篩選表達式無法與<code translate="no">NULL</code> 的標量值進行比對。詳細資訊請參閱《<a href="/docs/zh-hant/nullable-and-default.md">可為空欄位</a>》。</p>
<p><strong>範例：新增可為空的標量欄位</strong></p>
<p>以下範例將一個可為空的<code translate="no">source</code> 欄位新增至名為<code translate="no">product_catalog</code> 的現有集合中。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.add_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;source&quot;</span>,</span>
<span class="highlighted-comment-line">    data_type=DataType.VARCHAR,</span>
<span class="highlighted-comment-line">    max_length=<span class="hljs-number">128</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>新增該欄位後，集合中原本已存在的實體在查詢<code translate="no">source</code> 時會傳回<code translate="no">NULL</code> 。新實體可在插入 (insert) 或更新插入 (upsert) 時設定<code translate="no">source</code> 。</p>
<p><strong>範例：新增具有預設值的標量欄位</strong></p>
<p>若希望現有實體返回具體數值而非 `<code translate="no">NULL</code>`，請在新增標量欄位時指定 `<code translate="no">default_value</code> `。以下範例新增一個 `<code translate="no">review_status</code> ` 欄位，並將 `<code translate="no">&quot;unreviewed&quot;</code> ` 設為預設值。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.add_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;review_status&quot;</span>,</span>
<span class="highlighted-comment-line">    data_type=DataType.VARCHAR,</span>
<span class="highlighted-comment-line">    max_length=<span class="hljs-number">32</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">    default_value=<span class="hljs-string">&quot;unreviewed&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>新增欄位後，集合中已存在的實體在<code translate="no">review_status</code> 時會回傳<code translate="no">&quot;unreviewed&quot;</code> 。新實體可設定不同值，或在未提供值時使用預設值。</p>
<h3 id="Add-StructArray-fields--Milvus-300" class="common-anchor-header">新增 StructArray 欄位<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.0</span><button data-href="#Add-StructArray-fields--Milvus-300" class="anchor-icon" translate="no">
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
    </button></h3><p>使用 `<code translate="no">add_collection_struct_field()</code> ` 新增一個可接受 Struct 元素陣列的 StructArray 欄位。要新增 StructArray 欄位，請依照以下步驟操作：</p>
<ol>
<li><p>建立一個 Struct 模式，其中包含所需且支援資料類型的子欄位。有關適用資料類型，請參閱<a href="/docs/zh-hant/structarray-limits.md#Supported-subfield-data-types">StructArray 限制</a>。</p></li>
<li><p>在 `<code translate="no">add_collection_struct_field()</code>` 中引用上述建立的 Struct 架構，並設定該欄位的最大容量。</p></li>
<li><p>在請求中設定 `<code translate="no">nullable=True</code> `。</p></li>
</ol>
<p><strong>範例：新增可為 null 的 StructArray 欄位</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Create a Struct schema.</span>
struct_schema = client.create_struct_field_schema()

<span class="hljs-comment"># Add scalar fields to the Struct.</span>
struct_schema.add_field(<span class="hljs-string">&quot;text&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">65535</span>)
struct_schema.add_field(<span class="hljs-string">&quot;chapter&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">512</span>)

<span class="hljs-comment"># Add vector fields to the Struct with mmap enabled.</span>
struct_schema.add_field(<span class="hljs-string">&quot;text_vector&quot;</span>, DataType.FLOAT_VECTOR, mmap_enabled=<span class="hljs-literal">True</span>, dim=<span class="hljs-number">5</span>)
struct_schema.add_field(<span class="hljs-string">&quot;chapter_vector&quot;</span>, DataType.FLOAT_VECTOR, mmap_enabled=<span class="hljs-literal">True</span>, dim=<span class="hljs-number">5</span>)

<span class="highlighted-comment-line">client.add_collection_struct_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;books&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,</span>
<span class="highlighted-comment-line">    struct_schema=struct_schema,</span>
<span class="highlighted-comment-line">    max_capacity=<span class="hljs-number">1024</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>新增 StructArray 欄位後，集合中已存在的實體在所有子欄位上，其 `<code translate="no">chunks</code> ` 值皆為 `<code translate="no">NULL</code> `。插入新實體時，請確保所有子欄位均為 `<code translate="no">NULL</code> ` 或具有有效值。若插入的實體中，部分子欄位設定為 `<code translate="no">NULL</code> ` 而其他子欄位則設定為有效值，將會導致錯誤。</p>
<h3 id="Add-user-defined-vector-fields--Milvus-2618+" class="common-anchor-header">新增使用者自訂向量欄位<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.18+</span><button data-href="#Add-user-defined-vector-fields--Milvus-2618+" class="anchor-icon" translate="no">
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
    </button></h3><p>當您的應用程式產生嵌入向量並將向量值寫入 Milvus 時，請使用<code translate="no">add_collection_field()</code> 來新增使用者自訂向量欄位。</p>
<p>每個新增的自訂向量欄位都必須為可為空欄位。對於現有實體，在您透過 upsert 或後填工作流程寫入向量值之前，該新向量欄位將保持為<code translate="no">NULL</code> 狀態。新實體則可在插入時包含該向量欄位。向量搜尋會跳過向量值為<code translate="no">NULL</code> 的實體。詳細資訊請參閱《<a href="/docs/zh-hant/nullable-and-default.md">可為空欄位</a>》。</p>
<p><strong>範例：新增可為空的向量欄位</strong></p>
<p>以下範例將一個名為<code translate="no">embedding_v2</code> 的可空密集向量欄位新增至現有集合中。請將<code translate="no">dim</code> 設定為您的應用程式所產生嵌入向量的維度。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.add_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;embedding_v2&quot;</span>,</span>
<span class="highlighted-comment-line">    data_type=DataType.FLOAT_VECTOR,</span>
<span class="highlighted-comment-line">    dim=<span class="hljs-number">768</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>新增該欄位後，請在對此向量欄位進行搜尋前，先為其建立索引：</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;embedding_v2&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<p>現有實體的 `<code translate="no">embedding_v2</code> ` 值為 `<code translate="no">NULL</code> `，當您以此欄位進行搜尋時，這些實體將被跳過。若要讓現有實體可透過 `<code translate="no">embedding_v2</code>` 進行搜尋，請透過 upsert 或後填工作流程寫入非 NULL 的向量值。新實體可在插入時包含 `<code translate="no">embedding_v2</code> `。</p>
<h3 id="Add-vector-fields-generated-by-functions--Milvus-30x" class="common-anchor-header">新增由函式生成的向量欄位<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Add-vector-fields-generated-by-functions--Milvus-30x" class="anchor-icon" translate="no">
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
    </button></h3><p>當需要 Milvus 根據現有集合中已儲存的資料生成新的向量欄位時，請使用此工作流程。此操作會新增兩個相關的架構元素：</p>
<ul>
<li><p>一個讀取一個或多個現有輸入欄位的函數。</p></li>
<li><p>一個新的向量輸出欄位，用於儲存由該函數所產生的值。</p></li>
</ul>
<p>例如，BM25 函式會讀取現有的<code translate="no">VARCHAR</code> 欄位，並產生用於詞彙搜尋的<code translate="no">SPARSE_FLOAT_VECTOR</code> 欄位；MinHash 函式則會產生用於近似重複檢測的<code translate="no">BINARY_VECTOR</code> 欄位。此工作流程不會新增或取代函式的輸入欄位。</p>
<div class="alert note">
<p>此功能需要 Storage V3。有關啟用說明與相容性考量，請參閱<a href="/docs/zh-hant/storage-v3.md">Storage V3</a>。</p>
</div>
<p>將函式及其生成的向量欄位新增至現有集合時，還需進行模式版本壓縮與儲存版本壓縮。若任一設定已停用，Milvus 將拒絕該請求。這些額外先決條件僅適用於修改現有集合的情況；在初始集合模式中定義函式時，不會使用此現有資料回填工作流程。</p>
<p>支援的函式將決定所產生向量欄位的類型：</p>
<table>
<thead>
<tr><th>函式</th><th>生成的向量欄位類型</th><th>典型輸入欄位</th><th>典型使用情境</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BM25</code></td><td><code translate="no">SPARSE_FLOAT_VECTOR</code></td><td>啟用分析器的<code translate="no">VARCHAR</code> 場</td><td>詞法搜尋與關鍵字相關性</td></tr>
<tr><td><code translate="no">MINHASH</code></td><td><code translate="no">BINARY_VECTOR</code></td><td>一個<code translate="no">VARCHAR</code> 欄位</td><td>近似重複內容偵測</td></tr>
</tbody>
</table>
<p>有關各函數運作方式的詳細資訊，請參閱<a href="/docs/zh-hant/bm25-function.md">BM25 函數與</a> <a href="/docs/zh-hant/minhash-function.md">MinHash 函數</a>。</p>
<p>所生成的向量欄位不得已在集合中存在，且不得為可為空欄位。函式輸入欄位必須已存在。</p>
<p><strong>範例：新增一個用於詞彙搜尋的 BM25 生成稀疏向量欄位</strong></p>
<p>以下範例將一個名為<code translate="no">text_bm25</code> 的 BM25 函式，以及一個名為<code translate="no">text_sparse</code> 的生成的稀疏向量欄位，新增至現有集合中。該集合必須已具備一個名為<code translate="no">text</code> 的<code translate="no">VARCHAR</code> 欄位，且已啟用分析器。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, Function, FunctionType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

sparse_field = client.create_field_schema(
    name=<span class="hljs-string">&quot;text_sparse&quot;</span>,
    data_type=DataType.SPARSE_FLOAT_VECTOR,
    desc=<span class="hljs-string">&quot;BM25-generated sparse vector field&quot;</span>,
)

bm25_function = Function(
    name=<span class="hljs-string">&quot;text_bm25&quot;</span>,
    input_field_names=[<span class="hljs-string">&quot;text&quot;</span>],
    output_field_names=[<span class="hljs-string">&quot;text_sparse&quot;</span>],
    function_type=FunctionType.BM25,
)

<span class="highlighted-comment-line">client.add_function_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_schema=sparse_field,</span>
<span class="highlighted-comment-line">    func=bm25_function,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>在新增 BM25 函式與生成的欄位後，請在將該稀疏向量欄位用於 BM25 搜尋之前，先為其建立索引：</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;text_sparse&quot;</span>,
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>,
    params={
        <span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>,
        <span class="hljs-string">&quot;bm25_k1&quot;</span>: <span class="hljs-number">1.2</span>,
        <span class="hljs-string">&quot;bm25_b&quot;</span>: <span class="hljs-number">0.75</span>,
    },
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<p>從概念上來說，此操作會新增以下欄位與函式定義：</p>
<pre><code translate="no" class="language-plaintext">New generated output field:
  name: &quot;text_sparse&quot;
  data_type: SPARSE_FLOAT_VECTOR
  nullable: false

New function:
  name: &quot;text_bm25&quot;
  type: BM25
  input_field_names: [&quot;text&quot;]
  output_field_names: [&quot;text_sparse&quot;]
<button class="copy-code-btn"></button></code></pre>
<p>請求成功後，<code translate="no">describe_collection()</code> 會將新的<code translate="no">text_sparse</code> 向量欄位與<code translate="no">text_bm25</code> 函式一併回傳至集合架構中。當新實體被寫入時，Milvus 會為其生成函式輸出。 對於現有實體，Milvus 會透過背景壓縮以非同步方式填充生成的向量欄位。模式可見性可確認模式更新已成功，但並不表示所有現有實體的回填作業均已完成。有關完整的 BM25 搜尋工作流程，請參閱<a href="/docs/zh-hant/full-text-search.md">「全文搜尋</a>」。</p>
<p>Milvus 亦支援由 MinHash 生成的二進位向量欄位，用於近重複項目偵測。MinHash 函式會使用<code translate="no">FunctionType.MINHASH</code> ，並將結果寫入新的<code translate="no">BINARY_VECTOR</code> 輸出欄位。有關設定詳情，請參閱<a href="/docs/zh-hant/minhash-function.md">MinHash 函式</a>。</p>
<h2 id="Drop-fields-from-an-existing-collection" class="common-anchor-header">從現有集合中移除欄位<button data-href="#Drop-fields-from-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>您可透過兩種方式從現有集合中移除欄位。當使用者定義的標量或向量欄位不再屬於您的集合模型時，可直接刪除這些欄位。若要刪除由函式生成的向量欄位，請刪除生成該欄位的函式。</p>
<h3 id="Drop-user-defined-fields--Milvus-30x" class="common-anchor-header">刪除使用者定義的欄位<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Drop-user-defined-fields--Milvus-30x" class="anchor-icon" translate="no">
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
    </button></h3><p>使用 `<code translate="no">drop_collection_field()</code> ` 移除不再屬於集合模型的用戶自定義標量、向量或 StructArray 欄位。</p>
<p>刪除欄位會先變更集合模式與欄位可見性：</p>
<ul>
<li><p>當 `<code translate="no">drop_collection_field()</code> ` 執行成功後，集合模式將隨之更新：`<code translate="no">describe_collection()</code> ` 將不再返回已刪除的欄位，且查詢或搜尋將無法在 `<code translate="no">output_fields</code> ` 中返回該欄位，亦無法在運算式中使用該欄位。</p></li>
<li><p>建置於已刪除欄位上的索引，將作為模式更新的一部分一併清理。</p></li>
</ul>
<p>儲存空間的清理與模式清理是分開處理的。詳細資訊請參閱「<a href="#when-is-storage-space-reclaimed-after-dropping-a-field">刪除欄位後何時會回收儲存空間？</a>」。</p>
<p><strong>範例：刪除使用者定義的標量欄位</strong></p>
<p>以下範例假設 `<code translate="no">experiment_tag</code> ` 是 `<code translate="no">product_catalog</code>` 中的使用者定義標量欄位，並將其從集合中刪除。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.drop_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;experiment_tag&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>刪除欄位後，您可以呼叫 `<code translate="no">describe_collection()</code> ` 來驗證該欄位是否已不再屬於該模式。</p>
<p><strong>範例：刪除 StructArray 欄位</strong></p>
<p>以下範例假設 `<code translate="no">chunks</code> ` 是 `<code translate="no">my_collection</code>` 中的 `StructArray` 欄位，並將其從集合中刪除。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.drop_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>範例：刪除使用者自訂向量欄位</strong></p>
<p>您可以使用相同的<code translate="no">drop_collection_field()</code> 方法刪除向量欄位，但刪除後該集合仍必須至少包含一個向量欄位。此功能對於那些暫時包含多種向量表示形式、但後來會統一採用其中一種的集合非常有用。</p>
<p>以下範例假設 `<code translate="no">image_vector</code> ` 是 `<code translate="no">hybrid_catalog</code>` 中的使用者自訂向量場，且該集合仍保留另一個向量場，例如 `<code translate="no">text_vector</code>`。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.drop_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;hybrid_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;image_vector&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>若<code translate="no">image_vector</code> 是集合中的最後一個向量場，則刪除操作將被拒絕。</p>
<h3 id="Drop-vector-fields-generated-by-functions--Milvus-30x" class="common-anchor-header">刪除由函數生成的向量場<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Drop-vector-fields-generated-by-functions--Milvus-30x" class="anchor-icon" translate="no">
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
    </button></h3><p>當您不再需要由函數所產生的向量場（例如由 BM25 產生的稀疏向量場）時，請使用此操作。</p>
<p>若要移除生成的向量場，請對生成該向量場的函數呼叫<code translate="no">drop_collection_function()</code> 。在此工作流程中，Milvus 會將該函數從集合架構中移除，並一併移除其生成的向量輸出場。</p>
<p>請勿對函數輸入欄位或函數輸出欄位呼叫 `<code translate="no">drop_collection_field()</code> `。若目標欄位為函數輸出欄位，請改為呼叫 `<code translate="no">drop_collection_function()</code> `。刪除函數後，其輸入欄位將予以保留。</p>
<p><strong>範例：刪除 BM25 函式及其生成的欄位</strong></p>
<p>以下範例假設 `<code translate="no">text_bm25</code> ` 是 `<code translate="no">product_catalog</code> ` 中的 BM25 函式，並產生一個名為 `<code translate="no">text_sparse</code>` 的稀疏向量輸出欄位。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.drop_collection_function(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    function_name=<span class="hljs-string">&quot;text_bm25&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>操作成功後，<code translate="no">describe_collection()</code> 將不再返回已刪除的函數或其生成的輸出欄位。函數的輸入欄位仍保留在模式中。</p>
<p>若移除函數輸出欄位後，將導致集合中沒有任何向量欄位，則該操作將被拒絕。</p>
<h2 id="FAQ" class="common-anchor-header">常見問題<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Which-add-field-method-should-I-use" class="common-anchor-header">我應該使用哪種 add-field 方法？<button data-href="#Which-add-field-method-should-I-use" class="anchor-icon" translate="no">
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
    </button></h3><p>當您的應用程式提供標量值用於篩選、查詢輸出或應用程式邏輯時，請使用 `<code translate="no">add_collection_field()</code> ` 來新增使用者定義的標量欄位。</p>
<p>當您需要一個其元素共享相同 Struct 模式的陣列欄位時，請使用 `<code translate="no">add_collection_struct_field()</code> ` 來新增 StructArray 欄位。</p>
<p>當您的應用程式會產生嵌入向量並將向量值寫入 Milvus 時，請使用 `<code translate="no">add_collection_field()</code> ` 來新增自訂向量欄位。</p>
<p>當 Milvus 需從現有欄位產生向量值時，請使用「generated-vector-field」工作流程。本指南以 BM25 路徑搭配 `<code translate="no">add_function_field()</code> ` 進行詞彙搜尋。Milvus 亦支援由 MinHash 生成的二進位向量欄位，用於近似重複內容檢測。</p>
<h3 id="Why-must-added-user-defined-fields-be-nullable" class="common-anchor-header">為何新增的自訂欄位必須為可為空？<button data-href="#Why-must-added-user-defined-fields-be-nullable" class="anchor-icon" translate="no">
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
    </button></h3><p>現有實體是在新欄位建立之前插入的，因此它們不具備該欄位的值。設定 `<code translate="no">nullable=True</code> ` 可讓 Milvus 將缺失值表示為 `<code translate="no">NULL</code> `，直到您的應用程式寫入值為止；若為標量欄位，則直到套用預設值為止。</p>
<p>此規則適用於透過 `<code translate="no">add_collection_field()</code>` 新增的自訂標量欄位與自訂向量欄位，以及透過 `<code translate="no">add_collection_struct_field()</code>` 新增的 StructArray 欄位。此規則不適用於由函式生成的向量欄位，因為該類欄位不允許為空。</p>
<h3 id="What-happens-to-existing-entities-after-I-add-a-user-defined-field" class="common-anchor-header">新增使用者自訂欄位後，現有實體會如何處理？<button data-href="#What-happens-to-existing-entities-after-I-add-a-user-defined-field" class="anchor-icon" translate="no">
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
    </button></h3><p>對於使用者自訂的標量欄位，除非您設定了<code translate="no">default_value</code> ，否則現有實體將回傳<code translate="no">NULL</code> 。若您設定了<code translate="no">default_value</code> ，現有實體則會回傳該預設值。</p>
<p>對於使用者自訂向量欄位，現有實體的新向量欄位值為 `<code translate="no">NULL</code> `。針對新增欄位進行向量搜尋時，系統會跳過向量值為 `<code translate="no">NULL</code>` 的實體。若要讓現有實體能透過新向量欄位進行搜尋，請透過 `upsert` 或後填工作流程寫入非 `NULL` 的向量值。新增實體可在插入時包含此新向量欄位。</p>
<p>對於 StructArray 欄位，現有實體在其所有子欄位中，針對新 StructArray 欄位均會返回<code translate="no">NULL</code> 。新實體必須為所有子欄位提供<code translate="no">NULL</code> ，或為所有子欄位提供有效值。</p>
<h3 id="Can-I-add-BM25-lexical-search-to-an-existing-collection" class="common-anchor-header">我可以為現有集合新增 BM25 詞彙搜尋功能嗎？<button data-href="#Can-I-add-BM25-lexical-search-to-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>可以。若集合已具備啟用分析器的<code translate="no">VARCHAR</code> 欄位，即可新增由BM25生成的稀疏向量欄位以進行詞彙搜尋。在此工作流程中，Milvus會新增<code translate="no">SPARSE_FLOAT_VECTOR</code> 輸出欄位，以及用於生成該欄位值的BM25函式。 在此模式變更工作流程中，您無法將現有的<code translate="no">TEXT</code> 欄位用作 BM25 輸入。若要使用<code translate="no">TEXT</code> 輸入，請在建立集合時定義該欄位及 BM25 函式。</p>
<p>在將 BM25 生成的稀疏向量欄位新增後，請先使用<code translate="no">metric_type=&quot;BM25&quot;</code> 建立<code translate="no">SPARSE_INVERTED_INDEX</code> 索引，然後才能將該欄位用於 BM25 搜尋。</p>
<h3 id="Can-I-drop-a-vector-field-generated-by-a-function-directly" class="common-anchor-header">我可以直接刪除由函數生成的向量欄位嗎？<button data-href="#Can-I-drop-a-vector-field-generated-by-a-function-directly" class="anchor-icon" translate="no">
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
    </button></h3><p>不可以。由函數產生的向量欄位是該函數模式合約的一部分。請改用「<code translate="no">drop_collection_function()</code> 」。在此模式變更工作流程中，Milvus 會一併移除該函數及其產生的向量輸出欄位，同時保留輸入欄位。</p>
<h3 id="Do-I-need-to-wait-after-altering-a-collection-schema" class="common-anchor-header">修改集合模式後是否需要等待？<button data-href="#Do-I-need-to-wait-after-altering-a-collection-schema" class="anchor-icon" translate="no">
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
    </button></h3><p>通常無需手動等待。若您的下一項操作取決於更新後的模式，可先呼叫 `<code translate="no">describe_collection()</code> ` 以確認 Milvus 當前回傳的模式。</p>
<p>在分散式部署環境中，當 Milvus 組件刷新集合元資料時，可能會出現短暫的傳播延遲。若在模式變更後立即執行的操作因模式相關錯誤而失敗，請刷新模式並重新嘗試該操作。</p>
<h3 id="When-is-storage-space-reclaimed-after-dropping-a-field" class="common-anchor-header">刪除欄位後，儲存空間何時會被釋放？<button data-href="#When-is-storage-space-reclaimed-after-dropping-a-field" class="anchor-icon" translate="no">
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
    </button></h3><p>刪除欄位會將其從當前模式及一般查詢／搜尋的可見範圍中移除，但該欄位的歷史資料並不會立即從物件儲存中實體刪除。</p>
<p>儲存空間可在後續的壓縮過程中被釋放。壓縮是一種背景處理程序，會將現有資料檔案重新組織成更緊湊的新檔案。刪除欄位後，新壓縮的檔案將遵循當前資料結構，並省略已刪除的欄位。Milvus 無法保證刪除欄位後能立即或於固定時間內釋放儲存空間。</p>
<h3 id="What-happens-if-I-add-a-scalar-field-with-the-same-name-as-a-dynamic-field-key" class="common-anchor-header">若新增一個與動態欄位鍵名稱相同的標量欄位，會發生什麼情況？<button data-href="#What-happens-if-I-add-a-scalar-field-with-the-same-name-as-a-dynamic-field-key" class="anchor-icon" translate="no">
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
    </button></h3><p>若已啟用動態欄位，您可以新增一個與現有動態欄位鍵同名的標量欄位。在一般查詢輸出中，新標量欄位會遮罩動態欄位鍵，但原始的動態資料仍會保留在<code translate="no">$meta</code> 中。</p>
<p>例如，若現有實體儲存了一個名為<code translate="no">source</code> 的動態鍵，而您後來新增了一個名為<code translate="no">source</code> 的標量欄位，則<code translate="no">source</code> 的正常輸出將引用該標量欄位。若要存取原始的動態值，請使用<code translate="no">$meta</code> 路徑語法，例如<code translate="no">$meta[&quot;source&quot;]</code> 。</p>
