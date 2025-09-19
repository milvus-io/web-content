---
id: json-field-overview.md
title: JSON 欄位概述
summary: >-
  在建立商品目錄、內容管理系統或使用者偏好引擎等應用程式時，您通常需要在向量嵌入的同時儲存彈性的元資料。產品屬性因類別而異，使用者偏好隨時間演變，而文件屬性則有複雜的嵌套結構。Milvus
  中的 JSON 欄位可讓您在不犧牲效能的情況下儲存和查詢彈性的結構化資料，從而解決這項挑戰。
---
<h1 id="JSON-Field-Overview" class="common-anchor-header">JSON 欄位概述<button data-href="#JSON-Field-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>在建立商品目錄、內容管理系統或使用者偏好引擎等應用程式時，您通常需要在向量嵌入的同時儲存彈性的元資料。產品屬性因類別而異，使用者偏好隨時間演變，而文件屬性則有複雜的嵌套結構。Milvus 的 JSON 欄位可讓您在不犧牲效能的情況下，儲存和查詢彈性的結構化資料，從而解決這項挑戰。</p>
<h2 id="What-is-a-JSON-field" class="common-anchor-header">什麼是 JSON 欄位？<button data-href="#What-is-a-JSON-field" class="anchor-icon" translate="no">
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
    </button></h2><p>在 Milvus 中，JSON 欄位是一種模式定義的資料類型 (<code translate="no">DataType.JSON</code>) ，用來儲存結構化的鍵值資料。與傳統僵化的資料庫列不同，JSON 欄位可容納巢狀物件、陣列和混合資料類型，同時提供多種索引選項以進行快速查詢。</p>
<p>JSON 欄位結構範例：</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;metadata&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> 
    <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;electronics&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;BrandA&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">99.99</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;string_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;99.99&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;tags&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;clearance&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;summer_sale&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;supplier&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;SupplierX&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;country&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;USA&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;contact&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;email&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;support@supplierx.com&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;phone&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;+1-800-555-0199&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>在這個範例中，<code translate="no">metadata</code> 是一個單一的 JSON 欄位，包含平面值 (例如<code translate="no">category</code>,<code translate="no">in_stock</code>)、陣列 (<code translate="no">tags</code>) 和巢狀物件 (<code translate="no">supplier</code>) 的混合資料。</p>
<div class="alert note">
<p><strong>命名慣例：</strong>在 JSON 鍵中只使用字母、數字和底線。避免使用特殊字符、空格或點，因為它們可能會在查詢中導致解析問題。</p>
</div>
<h2 id="JSON-field-vs-dynamic-field" class="common-anchor-header">JSON 欄位 vs. 動態欄位<button data-href="#JSON-field-vs-dynamic-field" class="anchor-icon" translate="no">
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
    </button></h2><p>常見的混淆點是 JSON 欄位與<a href="/docs/zh-hant/enable-dynamic-field.md">動態欄位</a>之間的差異。雖然兩者都與 JSON 有關，但它們有不同的目的。</p>
<p>下表總結了 JSON 欄位與動態欄位之間的主要差異：</p>
<table>
   <tr>
     <th><p>特徵</p></th>
     <th><p>JSON 欄位</p></th>
     <th><p>動態欄位</p></th>
   </tr>
   <tr>
     <td><p>模式定義</p></td>
     <td><p>一個標量欄位，必須在集合模式中以<code translate="no">DataType.JSON</code> 類型明確宣告。</p></td>
     <td><p>一個隱藏的 JSON 欄位 (命名為<code translate="no">#meta</code>)，可自動儲存未宣告的欄位。</p></td>
   </tr>
   <tr>
     <td><p>使用情況</p></td>
     <td><p>儲存模式已知且一致的結構化資料。</p></td>
     <td><p>儲存不符合固定模式的彈性、演進或半結構化資料。</p></td>
   </tr>
   <tr>
     <td><p>控制</p></td>
     <td><p>您可以控制欄位名稱和結構。</p></td>
     <td><p>系統管理未定義的欄位。</p></td>
   </tr>
   <tr>
     <td><p>查詢</p></td>
     <td><p>使用您的欄位名稱或 JSON 欄位內的目標關鍵查詢：<code translate="no">metadata["key"]</code> 。</p></td>
     <td><p>直接使用動態欄位關鍵查詢：<code translate="no">"dynamic_key"</code> 或透過<code translate="no">#meta</code> ：<code translate="no">#meta["dynamic_key"]</code></p></td>
   </tr>
</table>
<h2 id="Basic-operations" class="common-anchor-header">基本操作<button data-href="#Basic-operations" class="anchor-icon" translate="no">
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
    </button></h2><p>使用 JSON 欄位的基本工作流程包括在模式中定義、插入資料，然後透過特定的篩選表達式查詢資料。</p>
<h3 id="Define-a-JSON-field" class="common-anchor-header">定義 JSON 欄位<button data-href="#Define-a-JSON-field" class="anchor-icon" translate="no">
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
    </button></h3><p>要使用 JSON 欄位，請在建立集合時，在集合模式中明確定義。下面的示例演示了如何使用<code translate="no">metadata</code> 欄位類型<code translate="no">DataType.JSON</code> 來創建一個集合：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>) <span class="hljs-comment"># Replace with your server address </span>

<span class="hljs-comment"># Create schema</span>
schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">True</span>)

schema.add_field(field_name=<span class="hljs-string">&quot;product_id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>) <span class="hljs-comment"># Primary field</span>
schema.add_field(field_name=<span class="hljs-string">&quot;vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>) <span class="hljs-comment"># Vector field</span>
<span class="hljs-comment"># Define a JSON field that allows null values</span>
<span class="highlighted-wrapper-line">schema.add_field(field_name=<span class="hljs-string">&quot;metadata&quot;</span>, datatype=DataType.JSON, nullable=<span class="hljs-literal">True</span>)</span>

client.create_collection(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
    schema=schema
)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>在這個範例中，在集合模式中定義的 JSON 欄位允許使用<code translate="no">nullable=True</code> 的 null 值。詳情請參閱<a href="/docs/zh-hant/nullable-and-default.md">Nullable &amp; Default</a>。</p>
</div>
<h3 id="Insert-data" class="common-anchor-header">插入資料<button data-href="#Insert-data" class="anchor-icon" translate="no">
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
    </button></h3><p>建立資料集後，在指定的 JSON 欄位中插入包含結構化 JSON 物件的實體。您的資料格式應為字典清單。</p>
<pre><code translate="no" class="language-python">entities = [
    {
        <span class="hljs-string">&quot;product_id&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>],
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;metadata&quot;</span>: { <span class="hljs-comment"># JSON field</span></span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;electronics&quot;</span>,</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>,</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>,</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;string_price&quot;</span>: <span class="hljs-string">&quot;99.99&quot;</span>,</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;clearance&quot;</span>, <span class="hljs-string">&quot;summer_sale&quot;</span>],</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;supplier&quot;</span>: {</span>
<span class="highlighted-comment-line">                <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;SupplierX&quot;</span>,</span>
<span class="highlighted-comment-line">                <span class="hljs-string">&quot;country&quot;</span>: <span class="hljs-string">&quot;USA&quot;</span>,</span>
<span class="highlighted-comment-line">                <span class="hljs-string">&quot;contact&quot;</span>: {</span>
<span class="highlighted-comment-line">                    <span class="hljs-string">&quot;email&quot;</span>: <span class="hljs-string">&quot;support@supplierx.com&quot;</span>,</span>
<span class="highlighted-comment-line">                    <span class="hljs-string">&quot;phone&quot;</span>: <span class="hljs-string">&quot;+1-800-555-0199&quot;</span></span>
<span class="highlighted-comment-line">                }</span>
<span class="highlighted-comment-line">            }</span>
<span class="highlighted-comment-line">        }</span>
    }
]

client.insert(collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>, data=entities)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Filtering-operations" class="common-anchor-header">過濾作業<button data-href="#Filtering-operations" class="anchor-icon" translate="no">
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
    </button></h3><p>在您對 JSON 欄位執行過濾作業之前，請確定</p>
<ul>
<li><p>您已在每個向量欄位上建立索引。</p></li>
<li><p>集合已載入記憶體。</p></li>
</ul>
<p><details></p>
<p><summary>顯示程式碼</summary></p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>
)

client.create_index(collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>, index_params=index_params)

client.load_collection(collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>一旦滿足這些要求，您就可以使用下面的表達式，根據 JSON 欄位內的值對集合進行篩選。這些篩選表達式利用特定的 JSON 路徑語法和專用運算符號。</p>
<h4 id="Filtering-with-JSON-path-syntax" class="common-anchor-header">使用 JSON 路徑語法篩選</h4><p>若要查詢特定的鍵，請使用括號符號存取 JSON 鍵：<code translate="no">json_field_name[&quot;key&quot;]</code> 。對於嵌套的鍵，請將它們鏈結在一起：<code translate="no">json_field_name[&quot;key1&quot;][&quot;key2&quot;]</code> 。</p>
<p>要過濾<code translate="no">category</code> 為<code translate="no">&quot;electronics&quot;</code> 的實體：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define filter expression</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;metadata[&quot;category&quot;] == &quot;electronics&quot;&#x27;</span>

client.search(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,  <span class="hljs-comment"># Collection name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],               <span class="hljs-comment"># Query vector (must match collection&#x27;s vector dim)</span>
    limit=<span class="hljs-number">5</span>,                           <span class="hljs-comment"># Max. number of results to return</span>
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,                    <span class="hljs-comment"># Filter expression</span></span>
    output_fields=[<span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>]   <span class="hljs-comment"># Fields to include in the search results</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>要篩選嵌套鍵<code translate="no">supplier[&quot;country&quot;]</code> 是<code translate="no">&quot;USA&quot;</code> 的實體：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define filter expression</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;metadata[&quot;supplier&quot;][&quot;country&quot;] == &quot;USA&quot;&#x27;</span>

res = client.search(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,  <span class="hljs-comment"># Collection name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],               <span class="hljs-comment"># Query vector (must match collection&#x27;s vector dim)</span>
    limit=<span class="hljs-number">5</span>,                           <span class="hljs-comment"># Max. number of results to return</span>
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,                    <span class="hljs-comment"># Filter expression</span></span>
    output_fields=[<span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>]   <span class="hljs-comment"># Fields to include in the search results</span>
)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<h4 id="Filtering-with-JSON-specific-operators" class="common-anchor-header">使用 JSON 特定的運算符號過濾</h4><p>Milvus 也提供特殊的運算符號來查詢特定 JSON 欄位鍵的陣列值。例如</p>
<ul>
<li><p><code translate="no">json_contains(identifier, expr)</code>:檢查 JSON 陣列中是否存在特定元素或子陣列</p></li>
<li><p><code translate="no">json_contains_all(identifier, expr)</code>:確保指定的 JSON 表達式的所有元素都存在於欄位中</p></li>
<li><p><code translate="no">json_contains_any(identifier, expr)</code>:過濾至少有一個 JSON 表達式成員存在於欄位中的實體</p></li>
</ul>
<p>尋找在<code translate="no">tags</code> 鍵下有<code translate="no">&quot;summer_sale&quot;</code> 值的產品：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define filter expression</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_contains(metadata[&quot;tags&quot;], &quot;summer_sale&quot;)&#x27;</span>

res = client.search(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,  <span class="hljs-comment"># Collection name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],               <span class="hljs-comment"># Query vector (must match collection&#x27;s vector dim)</span>
    limit=<span class="hljs-number">5</span>,                           <span class="hljs-comment"># Max. number of results to return</span>
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,                    <span class="hljs-comment"># Filter expression</span></span>
    output_fields=[<span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>]   <span class="hljs-comment"># Fields to include in the search results</span>
)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<p>尋找在<code translate="no">tags</code> 鍵下至少有一個<code translate="no">&quot;electronics&quot;</code>,<code translate="no">&quot;new&quot;</code>, 或<code translate="no">&quot;clearance&quot;</code> 值的產品：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define filter expression</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_contains_any(metadata[&quot;tags&quot;], [&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;])&#x27;</span>

res = client.search(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,  <span class="hljs-comment"># Collection name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],               <span class="hljs-comment"># Query vector (must match collection&#x27;s vector dim)</span>
    limit=<span class="hljs-number">5</span>,                           <span class="hljs-comment"># Max. number of results to return</span>
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,                    <span class="hljs-comment"># Filter expression</span></span>
    output_fields=[<span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>]   <span class="hljs-comment"># Fields to include in the search results</span>
)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<p>有關 JSON 特定運算符號的詳細資訊，請參閱<a href="/docs/zh-hant/json-operators.md">JSON 運算符號</a>。</p>
<h2 id="Next-Accelerate-JSON-queries" class="common-anchor-header">下一步：加速 JSON 查詢<button data-href="#Next-Accelerate-JSON-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>預設情況下，在沒有加速的情況下，對 JSON 欄位的查詢會對所有行執行完整掃描，這在大型資料集上可能會很慢。為了加速 JSON 查詢，Milvus 提供了先進的索引和儲存優化功能。</p>
<p>下表總結了它們的差異和最佳使用情境：</p>
<table>
   <tr>
     <th><p>技術</p></th>
     <th><p>最適用於</p></th>
     <th><p>陣列 加速</p></th>
     <th><p>注意事項</p></th>
   </tr>
   <tr>
     <td><p>JSON 索引</p></td>
     <td><p>一小組經常存取的鍵，特定陣列鍵上的陣列</p></td>
     <td><p>是（在索引陣列鍵上）</p></td>
     <td><p>必須預先選擇鍵，如果模式演進則需要維護</p></td>
   </tr>
   <tr>
     <td><p>JSON 切碎</p></td>
     <td><p>在多個鍵值上普遍加速，可彈性處理各種查詢</p></td>
     <td><p>否（不會加速陣列內的值）</p></td>
     <td><p>額外的儲存配置，陣列仍需要每個鍵的索引</p></td>
   </tr>
   <tr>
     <td><p>NGRAM 索引</p></td>
     <td><p>通配符搜尋、文字欄位中的子串匹配</p></td>
     <td><p>不適用</p></td>
     <td><p>不適用於數值/範圍篩選器</p></td>
   </tr>
</table>
<p><strong>提示：</strong>您可以結合這些方法--例如，使用 JSON 切碎來加速廣泛的查詢，使用 JSON 索引來處理高頻陣列鍵，使用 NGRAM 索引來處理彈性的文字搜尋。</p>
<p>如需實施細節，請參閱：</p>
<ul>
<li><p><a href="/docs/zh-hant/json-indexing.md">JSON 索引</a></p></li>
<li><p><a href="/docs/zh-hant/json-shredding.md">JSON 切碎</a></p></li>
<li><p><a href="/docs/zh-hant/ngram.md">NGRAM</a></p></li>
</ul>
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
    </button></h2><h3 id="Are-there-any-limitations-on-the-size-of-a-JSON-field" class="common-anchor-header">JSON 欄位的大小有任何限制嗎？<button data-href="#Are-there-any-limitations-on-the-size-of-a-JSON-field" class="anchor-icon" translate="no">
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
    </button></h3><p>有。每個 JSON 欄位的大小限制為 65,536 位元組。</p>
<h3 id="Does-a-JSON-field-support-setting-a-default-value" class="common-anchor-header">JSON 欄位是否支援設定預設值？<button data-href="#Does-a-JSON-field-support-setting-a-default-value" class="anchor-icon" translate="no">
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
    </button></h3><p>不，JSON 欄位不支援預設值。但是，您可以在定義欄位時設定<code translate="no">nullable=True</code> ，以允許空項目。</p>
<p>詳情請參閱<a href="/docs/zh-hant/nullable-and-default.md">Nullable &amp; Default</a>。</p>
<h3 id="Are-there-any-naming-conventions-for-JSON-field-keys" class="common-anchor-header">JSON 欄位鍵有任何命名慣例嗎？<button data-href="#Are-there-any-naming-conventions-for-JSON-field-keys" class="anchor-icon" translate="no">
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
    </button></h3><p>有，以確保與查詢和索引的相容性：</p>
<ul>
<li><p>在 JSON 鍵中只能使用字母、數字和底線。</p></li>
<li><p>避免使用特殊字符、空格或點 (<code translate="no">.</code>,<code translate="no">/</code>, 等等)。</p></li>
<li><p>不相容的鍵可能會在篩選表達式中造成解析問題。</p></li>
</ul>
<h3 id="How-does-Milvus-handle-string-values-in-JSON-fields" class="common-anchor-header">Milvus 如何處理 JSON 欄位中的字串值？<button data-href="#How-does-Milvus-handle-string-values-in-JSON-fields" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus 完全按照 JSON 輸入中出現的字串值來儲存，沒有語義轉換。引號不當的字串可能會在解析過程中導致錯誤。</p>
<p><strong>有效字串的範例</strong>：</p>
<pre><code translate="no" class="language-plaintext">&quot;a\&quot;b&quot;, &quot;a&#x27;b&quot;, &quot;a\\b&quot;
<button class="copy-code-btn"></button></code></pre>
<p><strong>無效字串的範例</strong>：</p>
<pre><code translate="no" class="language-plaintext">&#x27;a&quot;b&#x27;, &#x27;a\&#x27;b&#x27;
<button class="copy-code-btn"></button></code></pre>
