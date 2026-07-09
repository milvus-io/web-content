---
id: text.md
title: 文字欄位Compatible with Milvus 3.0.x
summary: TEXT 是一種標量字段類型，用於在 Milvus 中儲存文件文本、段落及其他長篇文本內容。
beta: Milvus 3.0.x
---
<h1 id="Text-Field" class="common-anchor-header">文字欄位<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Text-Field" class="anchor-icon" translate="no">
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
    </button></h1><p>在 AI 搜尋應用中，向量搜尋可協助您找出語義相似的實體，但應用程式通常也需要每個搜尋結果背後的原始來源文字。大型語言模型（LLM）或代理程式可將該文字作為上下文，用於閱讀、引用、摘要，或將結果納入提示字串中。</p>
<p>Milvus 提供「<code translate="no">TEXT</code> 」標量欄位類型，可直接將長篇來源文字與實體一併儲存。典型值包括段落、長篇文件、文章正文、工單及日誌。與「<code translate="no">VARCHAR</code> 」不同，後者需要設定固定的「<code translate="no">max_length</code> 」，而「<code translate="no">TEXT</code> 」則無需在集合架構中設定最大位元組長度。</p>
<p>要定義<code translate="no">TEXT</code> 欄位，請將<code translate="no">datatype</code> 設定為<code translate="no">DataType.TEXT</code> 。</p>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;content&quot;</span>,
<span class="highlighted-wrapper-line">    datatype=DataType.TEXT,</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>定義該欄位後，每個實體皆可在該欄位中包含字串值。您可像處理其他標量欄位一樣插入<code translate="no">TEXT</code> 值，並透過在<code translate="no">output_fields</code> 中列出該欄位，從查詢或搜尋結果中擷取這些值。</p>
<div class="alert note">
<p><code translate="no">TEXT</code> 字段支援空值。若要啟用此功能，請將<code translate="no">nullable</code> 設定為<code translate="no">True</code> 。詳細資訊請參閱「<a href="/docs/zh-hant/nullable-and-default.md">可為空字段</a>」。</p>
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
<li><code translate="no">TEXT</code> 欄位不能作為主欄位。主欄位支援<code translate="no">INT64</code> 及<code translate="no">VARCHAR</code> 。</li>
<li>在 Milvus 3.0.0 中，<code translate="no">TEXT</code> 欄位不支援<code translate="no">PHRASE_MATCH</code> 。</li>
<li>在 Milvus 3.0.0 中，<code translate="no">TEXT</code> 欄位不支援預設值。</li>
<li>在 Milvus 3.0.0 中，外部集合不支援<code translate="no">TEXT</code> 欄位。</li>
<li>在 Milvus 3.0.0 中，<code translate="no">TEXT</code> 欄位不支援標量索引。</li>
<li><code translate="no">TEXT</code> 此功能並非用於常規的元資料篩選。若您需要根據短字串元資料進行篩選，且欄位值符合<code translate="no">VARCHAR</code> 的長度限制，請使用<code translate="no">VARCHAR</code> 。</li>
</ul>
<h2 id="Choose-TEXT-or-VARCHAR" class="common-anchor-header">請選擇 TEXT 或 VARCHAR<button data-href="#Choose-TEXT-or-VARCHAR" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">TEXT</code> 與<code translate="no">VARCHAR</code> 皆用於儲存字串值，但它們支援不同的應用需求。請使用<code translate="no">VARCHAR</code> 來處理用於識別、分類或篩選實體的短且有限長度的元資料。請使用<code translate="no">TEXT</code> 來處理較長的來源內容，以便為大型語言模型（LLM）或代理程式提供足夠的上下文，以進行閱讀、引用、摘要或建構提示詞。</p>
<table>
<thead>
<tr><th>適用情境</th><th><code translate="no">VARCHAR</code></th><th><code translate="no">TEXT</code></th></tr>
</thead>
<tbody>
<tr><td>最適合</td><td>用於識別、分類或篩選實體的簡短元資料，例如<code translate="no">title</code> 、<code translate="no">tag</code> 、<code translate="no">category</code> 或<code translate="no">external_id</code> 。</td><td>用於大型語言模型（LLM）或代理工作流程的較長來源內容，例如<code translate="no">content</code> 、<code translate="no">passage</code> 、<code translate="no">article_body</code> 或<code translate="no">log_message</code> 。</td></tr>
<tr><td>長度設定</td><td>必須使用<code translate="no">max_length</code> ，該設定定義了該欄位可儲存的最大位元組數。最大值為<code translate="no">65,535</code> 位元組。若值可能超過此限制，請使用<code translate="no">TEXT</code> 。</td><td>無需指定<code translate="no">max_length</code> ，因此資料結構無需為文字值設定固定的位元組限制。</td></tr>
<tr><td>儲存行為</td><td>將每個值儲存於該欄位所設定的<code translate="no">max_length</code> 內。</td><td>對於較大的文字值，會使用自動儲存選取機制。詳細資訊請參閱《<a href="#how-milvus-stores-large-text-values">Milvus 如何儲存大型 TEXT 值</a>》。</td></tr>
<tr><td>主要欄位支援</td><td>可用作主欄位。</td><td>無法用作主欄位。</td></tr>
<tr><td>篩選</td><td>適用於需要出現在篩選表達式中的短字串元資料，例如<code translate="no">category == &quot;news&quot;</code> 或<code translate="no">tag in [&quot;ai&quot;, &quot;database&quot;]</code> 。</td><td>不適用於一般元資料篩選。</td></tr>
</tbody>
</table>
<p>有關<code translate="no">VARCHAR</code> 欄位的詳細資訊，請參閱<a href="/docs/zh-hant/string.md">VarChar 欄位</a>。</p>
<h2 id="How-Milvus-stores-large-TEXT-values" class="common-anchor-header">Milvus 如何儲存大型 TEXT 值<button data-href="#How-Milvus-stores-large-TEXT-values" class="anchor-icon" translate="no">
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
<p><summary>展開以了解其運作方式</summary></p>
<p>當您插入實體時，您為<code translate="no">TEXT</code> 欄位提供的字串即為<code translate="no">TEXT</code> 值。Milvus 會將該值的大小與<a href="/docs/zh-hant/configure_datanode.md#dataNodetextinlineThreshold">dataNode.text.inlineThreshold</a> 進行比較（預設值為<code translate="no">65,536</code> 位元組），然後從兩種內部儲存路徑中選擇其一。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/text-large-storage-flow.png" alt="Large text storage" class="doc-image" id="large-text-storage" /> 
   <span>大容量文字儲存</span>
  
 </span></p>
<ul>
<li><strong>內聯儲存</strong>：若<code translate="no">TEXT</code> 值小於<code translate="no">dataNode.text.inlineThreshold</code> ，Milvus 會將原始文字值直接儲存於<code translate="no">TEXT</code> 欄位的 data 中。</li>
<li><strong>LOB 儲存</strong>：若 `<code translate="no">TEXT</code> ` 的值大於或等於 `<code translate="no">dataNode.text.inlineThreshold</code>`，Milvus 會將該值視為大型物件，並將原始文字分別儲存於物件儲存空間（例如 MinIO）中。`<code translate="no">TEXT</code> ` 欄位資料則儲存指向該獨立儲存文字的內部參照。當在查詢或搜尋結果中請求 `<code translate="no">TEXT</code> ` 欄位時，Milvus 會使用該參照來擷取並回傳原始文字。</li>
</ul>
<p>此儲存選項屬內部機制。無論 Milvus 使用何種儲存路徑，您對<code translate="no">TEXT</code> 欄位的插入、查詢及搜尋操作方式皆相同。若要調整閾值或相關的儲存、壓縮及垃圾回收行為，請參閱與<a href="/docs/zh-hant/configure_datanode.md">dataNode 相關的設定</a>以及<a href="/docs/zh-hant/configure_datacoord.md">與 dataCoord 相關的設定</a>。</p>
<p>若您的部署使用物件儲存，大型的 `<code translate="no">TEXT</code> ` 值可能會以 Milvus 管理的物件形式，出現在如<code translate="no">lobs/...</code> 等路徑下。這些物件屬於實作細節，不應手動移動、複製或刪除。 在您刪除實體、釋放分區或壓縮資料後，物件儲存的使用量可能僅會在 Milvus 垃圾回收於安全窗口期結束後，移除未被引用的巨型物件資料時才會減少。</p>
<p></details></p>
<p><code translate="no">TEXT</code> 的常見應用之一是搭配 BM25 進行全文檢索。在此模式下，<code translate="no">TEXT</code> 欄位儲存原始來源內容，而 BM25 會分析文字並產生稀疏向量，以針對基於關鍵字的匹配結果進行排序。搜尋結果隨後可返回匹配的<code translate="no">TEXT</code> 值，作為大型語言模型 (LLM) 或代理程式工作流程的上下文。 以下範例展示如何將「<code translate="no">TEXT</code> 」欄位用作 BM25 的輸入欄位。如需瞭解全文搜尋的概念與查詢選項，請參閱《<a href="/docs/zh-hant/full-text-search.md">全文搜尋》</a>。</p>
<h2 id="Step-1-Create-a-collection-with-a-TEXT-field" class="common-anchor-header">步驟 1：建立包含 TEXT 欄位的集合<button data-href="#Step-1-Create-a-collection-with-a-TEXT-field" class="anchor-icon" translate="no">
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
    </button></h2><p>以下範例建立一個集合，其中包含用於來源內容的<code translate="no">TEXT</code> 欄位，以及用於 BM25 所產生稀疏向量的稀疏向量欄位。BM25 函式會將來自<code translate="no">content</code> 的分詞文字轉換為稀疏向量，並儲存於<code translate="no">sparse</code> 中。</p>
<p>若要進行 BM25 全文檢索，輸入的<code translate="no">TEXT</code> 欄位必須設定為<code translate="no">enable_analyzer=True</code> 。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, Function, FunctionType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
COLLECTION_NAME = <span class="hljs-string">&quot;text_bm25_collection&quot;</span>

<span class="hljs-keyword">if</span> client.has_collection(COLLECTION_NAME):
    client.drop_collection(COLLECTION_NAME)

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
<span class="highlighted-comment-line">schema.add_field(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;content&quot;</span>,</span>
<span class="highlighted-comment-line">    datatype=DataType.TEXT,</span>
<span class="highlighted-comment-line">    enable_analyzer=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
schema.add_field(field_name=<span class="hljs-string">&quot;sparse&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR)

<span class="highlighted-comment-line">bm25_function = Function(</span>
<span class="highlighted-comment-line">    name=<span class="hljs-string">&quot;content_bm25&quot;</span>,</span>
<span class="highlighted-comment-line">    input_field_names=[<span class="hljs-string">&quot;content&quot;</span>],</span>
<span class="highlighted-comment-line">    output_field_names=[<span class="hljs-string">&quot;sparse&quot;</span>],</span>
<span class="highlighted-comment-line">    function_type=FunctionType.BM25,</span>
<span class="highlighted-comment-line">)</span>
<span class="highlighted-comment-line">schema.add_function(bm25_function)</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-2-Create-a-sparse-vector-index" class="common-anchor-header">步驟 2：建立稀疏向量索引<button data-href="#Step-2-Create-a-sparse-vector-index" class="anchor-icon" translate="no">
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
    </button></h2><p>針對由 BM25 函式產生的稀疏向量欄位建立索引。度量類型必須設定為<code translate="no">BM25</code> 。</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
<span class="highlighted-comment-line">index_params.add_index(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;sparse&quot;</span>,</span>
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,</span>
<span class="highlighted-comment-line">    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>,</span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;bm25_k1&quot;</span>: <span class="hljs-number">1.2</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;bm25_b&quot;</span>: <span class="hljs-number">0.75</span>,</span>
<span class="highlighted-comment-line">    },</span>
<span class="highlighted-comment-line">)</span>

client.create_collection(
    collection_name=COLLECTION_NAME,
    schema=schema,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-3-Insert-TEXT-data" class="common-anchor-header">步驟 3：插入 TEXT 資料<button data-href="#Step-3-Insert-TEXT-data" class="anchor-icon" translate="no">
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
    </button></h2><p>將文字直接插入至<code translate="no">TEXT</code> 欄位中。請勿為<code translate="no">sparse</code> 欄位提供值。Milvus 會透過將 BM25 函式套用至<code translate="no">content</code> ，在內部生成稀疏向量。</p>
<pre><code translate="no" class="language-python">data = [
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Milvus stores vector embeddings and scalar fields in collections. It supports vector search, full text search, and metadata filtering for retrieval applications.&quot;</span>,
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,
        <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Long documents are often split into passages before embedding. Store each passage in a TEXT field so search results can return the source text.&quot;</span>,
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>,
        <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Operational logs and support tickets often contain long natural-language text. TEXT fields can store these values without a fixed max_length setting.&quot;</span>,
    },
]

client.insert(collection_name=COLLECTION_NAME, data=data)
client.load_collection(collection_name=COLLECTION_NAME)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-4-Perform-BM25-full-text-search" class="common-anchor-header">步驟 4：執行 BM25 全文檢索<button data-href="#Step-4-Perform-BM25-full-text-search" class="anchor-icon" translate="no">
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
    </button></h2><p>將原始查詢文字用作搜尋資料，並針對稀疏向量欄位進行搜尋。Milvus 會將查詢文字轉換為稀疏向量，透過 BM25 對匹配結果進行排序，並將請求的<code translate="no">TEXT</code> 欄位結果回傳至<code translate="no">output_fields</code> 。</p>
<pre><code translate="no" class="language-python">results = client.search(
    collection_name=COLLECTION_NAME,
<span class="highlighted-comment-line">    data=[<span class="hljs-string">&quot;how does Milvus store source text for retrieval&quot;</span>],</span>
<span class="highlighted-comment-line">    anns_field=<span class="hljs-string">&quot;sparse&quot;</span>,</span>
<span class="highlighted-comment-line">    limit=<span class="hljs-number">2</span>,</span>
<span class="highlighted-comment-line">    output_fields=[<span class="hljs-string">&quot;content&quot;</span>],</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-5-Read-the-returned-TEXT-values" class="common-anchor-header">步驟 5：讀取回傳的 TEXT 值<button data-href="#Step-5-Read-the-returned-TEXT-values" class="anchor-icon" translate="no">
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
    </button></h2><p>每個搜尋結果皆包含 BM25 分數及原始的<code translate="no">TEXT</code> 值。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> results[<span class="hljs-number">0</span>]:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;id: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;id&#x27;</span>]}</span>, score: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;distance&#x27;</span>]}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(hit[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;content&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<p>有關 BM25 函式、稀疏向量索引以及全文搜尋查詢語法的更多資訊，請參閱《<a href="/docs/zh-hant/full-text-search.md">全文搜尋</a>》。</p>
