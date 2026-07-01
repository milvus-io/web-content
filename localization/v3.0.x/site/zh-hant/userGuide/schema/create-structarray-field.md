---
id: create-structarray-field.md
title: 建立 StructArray 欄位
summary: >-
  當一個實體需要包含一組有序的結構化元素清單時，請建立一個 StructArray 欄位。StructArray 欄位是一種 Array 欄位，其元素類型為
  Struct。每個 Struct 元素均遵循相同的結構，並可包含標量子欄位、向量子欄位，或兩者兼具。
---
<h1 id="Create-a-StructArray-Field" class="common-anchor-header">建立 StructArray 欄位<button data-href="#Create-a-StructArray-Field" class="anchor-icon" translate="no">
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
    </button></h1><p>當一個實體需要包含結構化元素的有序清單時，請建立 StructArray 欄位。StructArray 欄位是一種 Array 欄位，其元素類型為 Struct。每個 Struct 元素均遵循相同的架構，並可包含標量子欄位、向量子欄位，或兩者兼具。</p>
<p>本頁將說明如何定義 Struct 模式、將其新增為 StructArray 欄位、選擇日後用於搜尋與篩選的子欄位，以及在插入或建立資料索引之前，了解適用的模式規則。</p>
<h2 id="Before-you-begin" class="common-anchor-header">開始之前<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>本頁使用名為「<code translate="no">tech_articles</code> 」的集合。每個實體代表一篇技術文章，而「<code translate="no">chunks</code> 」欄位則將區塊層級的資料儲存為 Struct 元素。</p>
<table>
<thead>
<tr><th>欄位</th><th>類型</th><th>用途</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">doc_id</code></td><td><code translate="no">INT64</code></td><td>文章的主鍵。</td></tr>
<tr><td><code translate="no">title</code></td><td><code translate="no">VARCHAR</code></td><td>文章標題。</td></tr>
<tr><td><code translate="no">category</code></td><td><code translate="no">VARCHAR</code></td><td>文章層級的分類。</td></tr>
<tr><td><code translate="no">title_vector</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>文章層級的向量欄位，稍後將在混合搜尋範例中使用。</td></tr>
<tr><td><code translate="no">chunks</code></td><td><code translate="no">ARRAY</code></td><td>用於儲存片段層級文字、元資料及嵌入向量的 StructArray 欄位。</td></tr>
</tbody>
</table>
<p><code translate="no">chunks</code> StructArray 欄位包含以下子欄位。</p>
<table>
<thead>
<tr><th>子欄位</th><th>類型</th><th>用途</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">text</code></td><td><code translate="no">VARCHAR</code></td><td>區塊文字。</td></tr>
<tr><td><code translate="no">section</code></td><td><code translate="no">VARCHAR</code></td><td>區段名稱，例如<code translate="no">index</code> 、<code translate="no">search</code> 或<code translate="no">filter</code> 。</td></tr>
<tr><td><code translate="no">page</code></td><td><code translate="no">INT64</code></td><td>該區塊的頁碼或邏輯位置。</td></tr>
<tr><td><code translate="no">quality_score</code></td><td><code translate="no">FLOAT</code></td><td>用於標量篩選和範圍範例中的區塊級分數。</td></tr>
<tr><td><code translate="no">has_code</code></td><td><code translate="no">BOOL</code></td><td>該片段是否包含程式碼。</td></tr>
<tr><td><code translate="no">emb_list_vector</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>用於搭配<code translate="no">MAX_SIM*</code> 指標進行 EmbeddingList 搜尋的向量子欄位。</td></tr>
<tr><td><code translate="no">emb</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>用於搭配常規向量指標進行元素層級搜尋的向量子欄位。</td></tr>
</tbody>
</table>
<div class="alert note">
<p>向量欄位或向量子欄位僅接受一個索引。若需同時進行 EmbeddingList 搜尋與元素層級搜尋，請定義兩個獨立的向量子欄位。在此範例中，<code translate="no">chunks[emb_list_vector]</code> 用於 EmbeddingList 搜尋，而<code translate="no">chunks[emb]</code> 則用於元素層級搜尋。</p>
</div>
<h2 id="Supported-subfield-data-types" class="common-anchor-header">支援的子欄位資料類型<button data-href="#Supported-subfield-data-types" class="anchor-icon" translate="no">
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
    </button></h2><p>StructArray 欄位會為每個 Struct 子欄位儲存一個陣列值。定義 Struct 模式時，請從受支援的標量與向量類別中選擇子欄位類型。</p>
<table>
<thead>
<tr><th>Struct 子欄位的實體類型</th><th>支援</th><th>備註</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">Array</code></td><td>受支援</td><td>將子欄位定義為 `<code translate="no">DataType.BOOL</code>`。</td></tr>
<tr><td><code translate="no">Array</code></td><td>受支援</td><td>將子欄位定義為<code translate="no">DataType.INT8</code> 、<code translate="no">DataType.INT16</code> 、<code translate="no">DataType.INT32</code> 或<code translate="no">DataType.INT64</code> 。</td></tr>
<tr><td><code translate="no">Array</code></td><td>受支援</td><td>將子欄位定義為<code translate="no">DataType.FLOAT</code> 或<code translate="no">DataType.DOUBLE</code> 。</td></tr>
<tr><td><code translate="no">Array</code></td><td>受支援</td><td>將子欄位定義為<code translate="no">DataType.VARCHAR</code> ，並設定<code translate="no">max_length</code> 。</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>受支援</td><td>將子欄位定義為<code translate="no">DataType.FLOAT_VECTOR</code> ，並設定<code translate="no">dim</code> 。</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>受支援</td><td>將子欄位定義為<code translate="no">DataType.FLOAT16_VECTOR</code> ，並設定<code translate="no">dim</code> 。</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>受支援</td><td>將子欄位定義為<code translate="no">DataType.BFLOAT16_VECTOR</code> ，並設定<code translate="no">dim</code> 。</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>受支援</td><td>將子欄位定義為<code translate="no">DataType.INT8_VECTOR</code> ，並設定<code translate="no">dim</code> 。</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>受支援</td><td>將子欄位定義為<code translate="no">DataType.BINARY_VECTOR</code> ，並設定<code translate="no">dim</code> 。</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>不支援</td><td>StructArray 欄位不支援稀疏向量子欄位。</td></tr>
<tr><td><code translate="no">Array</code></td><td>不支援</td><td>請使用 `<code translate="no">VARCHAR</code>`，而非 `<code translate="no">String</code>`。</td></tr>
<tr><td><code translate="no">Array</code></td><td>不支援</td><td>StructArray 欄位不支援 JSON 子欄位。</td></tr>
<tr><td><code translate="no">Array</code></td><td>不支援</td><td>StructArray 欄位不支援幾何子欄位及 GIS 函式。</td></tr>
<tr><td><code translate="no">Array</code></td><td>不支援</td><td>StructArray 欄位不支援文字子欄位。</td></tr>
<tr><td><code translate="no">Array</code></td><td>不支援</td><td>StructArray 欄位不支援 Timestamptz 子欄位及時間特定表達式。</td></tr>
<tr><td>嵌套的<code translate="no">Array</code> 、<code translate="no">ArrayOfVector</code> 、<code translate="no">Struct</code> 或<code translate="no">ArrayOfStruct</code></td><td>不支援</td><td>StructArray 欄位不能包含嵌套陣列、嵌套向量陣列、嵌套 Struct 欄位或嵌套 Array-of-Struct 欄位。</td></tr>
</tbody>
</table>
<p>有關特定版本的支援、可為 null 的行為及其他限制，請參閱<a href="/docs/zh-hant/structarray-limits.md">StructArray 限制</a>。</p>
<h2 id="Create-a-collection-with-a-StructArray-field" class="common-anchor-header">建立具有 StructArray 欄位的集合<button data-href="#Create-a-collection-with-a-StructArray-field" class="anchor-icon" translate="no">
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
    </button></h2><p>要建立 StructArray 欄位，請先定義每個元素所使用的 Struct 架構。接著新增一個 Array 欄位，並將其元素類型設定為 Struct。</p>
<ol>
<li><p>建立集合架構。</p></li>
<li><p>新增集合層級的欄位，例如主鍵和文章層級的欄位。</p></li>
<li><p>為儲存於 StructArray 欄位內的元素建立 Struct 模式。</p></li>
<li><p>在 Struct 模式中新增標量與向量子欄位。</p></li>
<li><p>新增一個陣列欄位，並將其<code translate="no">element_type=DataType.STRUCT</code> 設為 Struct 模式。</p></li>
<li><p>將 `<code translate="no">struct_schema</code> ` 設定為 `Struct` 模式。</p></li>
<li><p>設定 `<code translate="no">max_capacity</code> ` 以限制每個實體可在該欄位中儲存的 `Struct` 元素數量。</p></li>
</ol>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

schema = client.create_schema(
    auto_id=<span class="hljs-literal">False</span>,
    enable_dynamic_field=<span class="hljs-literal">False</span>,
)

<span class="hljs-comment"># Collection-level fields.</span>
schema.add_field(
    field_name=<span class="hljs-string">&quot;doc_id&quot;</span>,
    datatype=DataType.INT64,
    is_primary=<span class="hljs-literal">True</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;title&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">512</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;category&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">128</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;title_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)

<span class="hljs-comment"># Struct schema used by each element in the StructArray field.</span>
chunk_schema = client.create_struct_field_schema()
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;text&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">65535</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;section&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">128</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;page&quot;</span>,
    datatype=DataType.INT64,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;quality_score&quot;</span>,
    datatype=DataType.FLOAT,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;has_code&quot;</span>,
    datatype=DataType.BOOL,
)

<span class="hljs-comment"># Vector subfield for EmbeddingList search.</span>
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;emb_list_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)

<span class="hljs-comment"># Vector subfield for element-level search.</span>
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;emb&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)

<span class="hljs-comment"># Add the StructArray field.</span>
schema.add_field(
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
    datatype=DataType.ARRAY,
    element_type=DataType.STRUCT,
    struct_schema=chunk_schema,
    max_capacity=<span class="hljs-number">1000</span>,
)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    schema=schema,
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Understand-StructArray-field-paths" class="common-anchor-header">了解 StructArray 欄位路徑<button data-href="#Understand-StructArray-field-paths" class="anchor-icon" translate="no">
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
    </button></h2><p>建立 StructArray 欄位後，請使用<code translate="no">structArray[subfield]</code> 路徑語法來參照其子欄位。在建立索引、搜尋向量子欄位、輸出子欄位或建立標量篩選器時，請使用此語法。</p>
<table>
<thead>
<tr><th>路徑</th><th>含義</th><th>常見用法</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">chunks[text]</code></td><td><code translate="no">text</code> 子欄位位於每個 Struct 元素內部。</td><td>輸出欄位或標量篩選。</td></tr>
<tr><td><code translate="no">chunks[section]</code></td><td>每個區塊的區段標籤。</td><td>標量濾波。</td></tr>
<tr><td><code translate="no">chunks[quality_score]</code></td><td>區塊層級的品質分數。</td><td>標量篩選或標量索引。</td></tr>
<tr><td><code translate="no">chunks[emb_list_vector]</code></td><td>用作嵌入清單的向量子欄位。</td><td>使用 `<code translate="no">MAX_SIM*</code>` 進行 `EmbeddingList` 搜尋。</td></tr>
<tr><td><code translate="no">chunks[emb]</code></td><td>每個 Struct 元素獨立使用的向量子欄位。</td><td>元素層級的向量搜尋。</td></tr>
</tbody>
</table>
<h2 id="Make-a-StructArray-field-nullable" class="common-anchor-header">將 StructArray 欄位設為可為空<button data-href="#Make-a-StructArray-field-nullable" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus v3.0.x 支援可為空的 StructArray 欄位。可為空的 StructArray 欄位允許實體針對整個 StructArray 欄位儲存 `<code translate="no">null</code> `。</p>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
    datatype=DataType.ARRAY,
    element_type=DataType.STRUCT,
    struct_schema=chunk_schema,
    max_capacity=<span class="hljs-number">1000</span>,
    nullable=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>警告
可為空的 StructArray 欄位僅在 Milvus v3.0.x 中提供。對於可為空的 StructArray 欄位，實體可以提供有效的 StructArray 值，或將整個欄位設為 `<code translate="no">null</code>`。插入有效的 StructArray 值時，所有子欄位應為空或具有有效值。 若插入的實體中，部分子欄位設定為 null 而其他子欄位設定為有效值，將會導致錯誤。詳細資訊請參閱《<a href="/docs/zh-hant/structarray-limits.md">StructArray 限制</a>》。</p>
</div>
<h2 id="Add-a-StructArray-field-to-an-existing-collection" class="common-anchor-header">將 StructArray 欄位新增至現有集合<button data-href="#Add-a-StructArray-field-to-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus v3.0.x 支援將 StructArray 欄位新增至現有集合。新增的 StructArray 欄位必須為可為 null 的欄位，因為集合中已存在的實體並未針對此新欄位設定值。</p>
<p>若要將 StructArray 欄位新增至現有集合，請先定義 Struct 模式。接著呼叫 `<code translate="no">add_collection_struct_field()</code> ` 並設定 `<code translate="no">nullable=True</code>`。</p>
<pre><code translate="no" class="language-python">chunk_schema = client.create_struct_field_schema()
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;text&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">65535</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;section&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">128</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;page&quot;</span>,
    datatype=DataType.INT64,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;quality_score&quot;</span>,
    datatype=DataType.FLOAT,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;has_code&quot;</span>,
    datatype=DataType.BOOL,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;emb_list_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;emb&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)

client.add_collection_struct_field(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
    struct_schema=chunk_schema,
    max_capacity=<span class="hljs-number">1000</span>,
    nullable=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>新增 StructArray 欄位後，現有實體針對該新欄位的所有子欄位，皆會傳回 `<code translate="no">null</code> `。</p>
<p>StructArray 欄位建立後，您無法向該現有 StructArray 欄位新增子欄位。若日後需要額外的元素屬性，請呼叫 `<code translate="no">drop_collection_field()</code> ` 來刪除該 StructArray 欄位，然後使用更新後的 Struct 架構新增一個新的 StructArray 欄位。</p>
<pre><code translate="no" class="language-python">client.drop_collection_field(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
)

client.add_collection_struct_field(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
    struct_schema=updated_chunk_schema,
    max_capacity=<span class="hljs-number">1000</span>,
    nullable=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Schema-rules" class="common-anchor-header">架構規則<button data-href="#Schema-rules" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>規則</th><th>說明</th></tr>
</thead>
<tbody>
<tr><td>Struct 用作 Array 元素類型。</td><td>請使用<code translate="no">element_type=STRUCT</code> 建立 StructArray 欄位作為 Array 欄位。請勿將 Struct 建立為頂層集合欄位。</td></tr>
<tr><td>所有元素共用一個架構。</td><td>同一 StructArray 欄位中的每個 Struct 元素均遵循為該欄位所定義的 Struct 架構。</td></tr>
<tr><td><code translate="no">max_capacity</code> 此欄位為必填。</td><td>此欄位會限制每個實體可在 StructArray 欄位中儲存的 Struct 元素數量。</td></tr>
<tr><td>僅允許使用受支援的子欄位類型。</td><td>請使用 StructArray 支援的標量和向量子欄位類型。請勿定義 JSON、Geometry、Text、Timestamptz、SparseFloatVector 或嵌套的 Struct / Array 子欄位。</td></tr>
<tr><td>向量子欄位在搜尋前需要建立索引。</td><td>在執行向量搜尋之前，請先針對路徑（例如<code translate="no">chunks[emb_list_vector]</code> 或<code translate="no">chunks[emb]</code> ）建立索引。</td></tr>
<tr><td>每個向量子欄位僅對應一個索引。</td><td>若需同時進行 EmbeddingList 搜尋與元素層級搜尋，請建立兩個獨立的向量子欄位。</td></tr>
<tr><td>現有的 StructArray 子欄位是固定的。</td><td>建立 StructArray 欄位後，請勿期望能向同一個 StructArray 欄位新增更多子欄位。</td></tr>
<tr><td>Struct 內部不支援函式。</td><td>請勿在 StructArray 欄位內為欄位或子欄位定義函式。</td></tr>
<tr><td>標量子欄位應符合篩選需求。</td><td>僅在日後需要對其進行篩選、分組或輸出時，才應新增如<code translate="no">section</code> 、<code translate="no">quality_score</code> 或<code translate="no">has_code</code> 等欄位。</td></tr>
</tbody>
</table>
<h2 id="Common-mistakes" class="common-anchor-header">常見錯誤<button data-href="#Common-mistakes" class="anchor-icon" translate="no">
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
<li><p>將 `<code translate="no">DataType.STRUCT</code> ` 建立為頂層集合欄位，而非將其用作 `Array` 欄位的元素類型。</p></li>
<li><p>忘記在 StructArray 欄位上設定<code translate="no">max_capacity</code> 。</p></li>
<li><p>定義不支援的子欄位類型，例如 JSON、Geometry、Text、Timestamptz、SparseFloatVector、嵌套 Array、嵌套 Struct 或 Array-of-Struct。</p></li>
<li><p>將 `<code translate="no">String</code> ` 用作子欄位類型。請改用 `<code translate="no">VARCHAR</code> ` 並設定 `<code translate="no">max_length</code>`。</p></li>
<li><p>將同一個向量子欄位同時用於 EmbeddingList 搜尋與元素層級搜尋。</p></li>
<li><p>僅新增向量子欄位，卻忽略了篩選所需的標量子欄位，例如<code translate="no">section</code> 、<code translate="no">quality_score</code> 或<code translate="no">has_code</code> 。</p></li>
<li><p>將向量子欄位視為<code translate="no">$[...]</code> 的標量謂詞輸入。使用向量子欄位進行向量搜尋，並使用標量子欄位進行標量謂詞搜尋。</p></li>
<li><p>假設在 StructArray 欄位建立後，可向該欄位新增子欄位。</p></li>
<li><p>使用<code translate="no">chunks.emb</code> 或<code translate="no">chunks.emb_list_vector</code> 取代必需的路徑語法<code translate="no">chunks[emb]</code> 或<code translate="no">chunks[emb_list_vector]</code> 。</p></li>
<li><p>將可為空的 StructArray 行為視為在每個目標版本中皆可用。</p></li>
</ul>
<h2 id="Next-steps" class="common-anchor-header">後續步驟<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>若要將嵌套資料插入 StructArray 欄位，請參閱<a href="/docs/zh-hant/insert-data-into-structarray-fields.md">《將資料插入 StructArray 欄位</a>》。</p></li>
<li><p>若要建立向量和標量索引，請參閱《<a href="/docs/zh-hant/index-structarray-fields.md">索引 StructArray 欄位</a>》。</p></li>
<li><p>若要搜尋 StructArray 的向量子欄位，請參閱《使用 StructArray 進行基本向量搜尋》。</p></li>
<li><p>若要檢視受支援的資料類型、可為空的行為以及特定版本的限制，請參閱《<a href="/docs/zh-hant/structarray-limits.md">StructArray 限制</a>》。</p></li>
</ol>
