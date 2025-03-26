---
id: full-text-search.md
title: 全文檢索
related_key: 'full, text, search'
summary: 全文檢索是一種在文字資料集中擷取包含特定詞彙或短語的文件，然後根據相關性對結果進行排序的功能。
---
<h1 id="Full-Text-Search-​BM25" class="common-anchor-header">全文檢索 (BM25)<button data-href="#Full-Text-Search-​BM25" class="anchor-icon" translate="no">
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
    </button></h1><p>全文檢索是一種在文字資料集中擷取包含特定詞彙或短語的文件，然後根據相關性對結果進行排序的功能。此功能克服了語意搜尋可能會忽略精確詞彙的限制，確保您收到最準確且與上下文相關的結果。此外，它還可以接受原始文字輸入，自動將您的文字資料轉換為稀疏嵌入，而不需要手動產生向量嵌入，從而簡化向量搜尋。</p>
<p>使用 BM25 演算法進行相關性評分，此功能在檢索擴充生成 (RAG) 的情境中特別有價值，它會優先處理與特定搜尋詞彙密切相符的文件。</p>
<div class="alert note">
<ul>
<li>透過整合全文檢索與以語意為基礎的密集向量檢索，您可以提高檢索結果的準確性與相關性。如需詳細資訊，請參閱<a href="/docs/zh-hant/multi-vector-search.md">混合搜尋</a>。</li>
<li>全文搜索在 Milvus Standalone 和 Milvus Distributed 中可用，但在 Milvus Lite 中不可用，儘管將其加入 Milvus Lite 在路線圖上。</li>
</ul>
</div>
<h2 id="Overview​" class="common-anchor-header">概述<button data-href="#Overview​" class="anchor-icon" translate="no">
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
    </button></h2><p>全文檢索簡化了以文字為基礎的檢索過程，省去了手動嵌入的需要。此功能透過下列工作流程運作。</p>
<ol>
<li><p><strong>文字輸入</strong>：您可插入原始文字文件或提供查詢文字，而無需手動嵌入。</p></li>
<li><p><strong>文字分析</strong>：關於分析器的更多資訊，請參閱分析器<a href="/docs/zh-hant/analyzer-overview.md">概述</a>。</p></li>
<li><p><strong>函式處理</strong>：內建函式接收標記化的詞彙，並將它們轉換成稀疏向量表示。</p></li>
<li><p><strong>集合儲存</strong>：Milvus 將這些稀疏嵌入資料儲存在一個集合中，以便進行有效的檢索。</p></li>
<li><p><strong>BM25 評分</strong>：在搜尋過程中，Milvus 應用 BM25 演算法來計算儲存文件的分數，並根據其與查詢文字的相關性對匹配結果進行排序。</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/full-text-search.png" alt="Full text search" class="doc-image" id="full-text-search" />
   </span> <span class="img-wrapper"> <span>全文檢索</span> </span></p>
<p>要使用全文本搜尋，請遵循以下主要步驟。</p>
<ol>
<li><p><a href="#Create-a-collection-for-full-text-search">建立一個集合</a>：設定一個包含必要欄位的集合，並定義一個函數將原始文字轉換為稀疏嵌入。</p></li>
<li><p><a href="#Insert-text-data">插入資料</a>：將原始文字文件輸入到資料集中。</p></li>
<li><p><a href="#Perform-full-text-search">執行搜尋</a>：使用查詢文字在您的資料集中搜尋，並擷取相關結果。</p></li>
</ol>
<h2 id="Create-a-collection-for-full-text-search​" class="common-anchor-header">為全文本搜尋建立資料夾<button data-href="#Create-a-collection-for-full-text-search​" class="anchor-icon" translate="no">
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
    </button></h2><p>若要啟用全文本搜尋，請建立具有特定模式的資料夾。此模式必須包含三個必要欄位。</p>
<ul>
<li><p>唯一識別資料集中每個實體的主要欄位。</p></li>
<li><p>儲存原始文字文件的<code translate="no">VARCHAR</code> 欄位，其<code translate="no">enable_analyzer</code> 屬性設定為<code translate="no">True</code> 。這可讓 Milvus 將文字標記化為特定詞彙，以便進行功能處理。</p></li>
<li><p>預留一個<code translate="no">SPARSE_FLOAT_VECTOR</code> 欄位，用來儲存 Milvus 會自動為<code translate="no">VARCHAR</code> 欄位產生的稀疏嵌入。</p></li>
</ul>
<h3 id="Define-the-collection-schema" class="common-anchor-header">定義集合模式</h3><p>首先，建立模式並新增必要的欄位。</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Function, FunctionType​

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
​
schema = client.create_schema()​
​
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;text&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>, enable_analyzer=<span class="hljs-literal">True</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;sparse&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> CreateCollectionReq.CollectionSchema.builder()
        .build();
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">true</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">1000</span>)
        .enableAnalyzer(<span class="hljs-literal">true</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;sparse&quot;</span>)
        .dataType(DataType.SparseFloatVector)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});
<span class="hljs-keyword">const</span> schema = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-string">&quot;VarChar&quot;</span>,
    <span class="hljs-attr">enable_analyzer</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">enable_match</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;sparse&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">SparseFloatVector</span>,
  },
];


<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">results</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
        &quot;autoId&quot;: true,
        &quot;enabledDynamicField&quot;: false,
        &quot;fields&quot;: [
            {
                &quot;fieldName&quot;: &quot;id&quot;,
                &quot;dataType&quot;: &quot;Int64&quot;,
                &quot;isPrimary&quot;: true
            },
            {
                &quot;fieldName&quot;: &quot;text&quot;,
                &quot;dataType&quot;: &quot;VarChar&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;max_length&quot;: 1000,
                    &quot;enable_analyzer&quot;: true
                }
            },
            {
                &quot;fieldName&quot;: &quot;sparse&quot;,
                &quot;dataType&quot;: &quot;SparseFloatVector&quot;
            }
        ]
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>在此設定中。</p>
<ul>
<li><p><code translate="no">id</code>: 用作主索引鍵，並由<code translate="no">auto_id=True</code> 自動產生。</p></li>
<li><p><code translate="no">text</code>: 儲存您的原始文字資料，用於全文檢索作業。資料類型必須是<code translate="no">VARCHAR</code> ，因為<code translate="no">VARCHAR</code> 是 Milvus 用來儲存文字的字串資料類型。設定<code translate="no">enable_analyzer=True</code> 以允許 Milvus 對文字進行 tokenize。預設情況下，Milvus 使用<a href="/docs/zh-hant/standard-analyzer.md">標準分析器</a>進行文字分析。要設定不同的分析器，請參考<a href="/docs/zh-hant/analyzer-overview.md">概述</a>。</p></li>
<li><p><code translate="no">sparse</code>資料類型：預留向量欄位，以儲存內部產生的稀疏嵌入，用於全文檢索作業。資料類型必須是<code translate="no">SPARSE_FLOAT_VECTOR</code> 。</p></li>
</ul>
<p>現在，定義一個函式，將您的文字轉換為稀疏向量表示，然後將其加入模式。</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">bm25_function = Function(​
    name=<span class="hljs-string">&quot;text_bm25_emb&quot;</span>, <span class="hljs-comment"># Function name​</span>
    input_field_names=[<span class="hljs-string">&quot;text&quot;</span>], <span class="hljs-comment"># Name of the VARCHAR field containing raw text data​</span>
    output_field_names=[<span class="hljs-string">&quot;sparse&quot;</span>], <span class="hljs-comment"># Name of the SPARSE_FLOAT_VECTOR field reserved to store generated embeddings​</span>
    function_type=FunctionType.BM25,​ <span class="hljs-comment"># Set to `BM25`</span>
)​
​
schema.add_function(bm25_function)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq.Function;

<span class="hljs-keyword">import</span> java.util.*;

schema.addFunction(Function.builder()
        .functionType(FunctionType.BM25)
        .name(<span class="hljs-string">&quot;text_bm25_emb&quot;</span>)
        .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;text&quot;</span>))
        .outputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;sparse&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">const <span class="hljs-built_in">functions</span> = [
    {
      name: <span class="hljs-string">&#x27;text_bm25_emb&#x27;</span>,
      description: <span class="hljs-string">&#x27;bm25 function&#x27;</span>,
      <span class="hljs-built_in">type</span>: FunctionType.BM25,
      input_field_names: [<span class="hljs-string">&#x27;text&#x27;</span>],
      output_field_names: [<span class="hljs-string">&#x27;sparse&#x27;</span>],
      params: {},
    },
]；
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
        &quot;autoId&quot;: true,
        &quot;enabledDynamicField&quot;: false,
        &quot;fields&quot;: [
            {
                &quot;fieldName&quot;: &quot;id&quot;,
                &quot;dataType&quot;: &quot;Int64&quot;,
                &quot;isPrimary&quot;: true
            },
            {
                &quot;fieldName&quot;: &quot;text&quot;,
                &quot;dataType&quot;: &quot;VarChar&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;max_length&quot;: 1000,
                    &quot;enable_analyzer&quot;: true
                }
            },
            {
                &quot;fieldName&quot;: &quot;sparse&quot;,
                &quot;dataType&quot;: &quot;SparseFloatVector&quot;
            }
        ],
        &quot;functions&quot;: [
            {
                &quot;name&quot;: &quot;text_bm25_emb&quot;,
                &quot;type&quot;: &quot;BM25&quot;,
                &quot;inputFieldNames&quot;: [&quot;text&quot;],
                &quot;outputFieldNames&quot;: [&quot;sparse&quot;],
                &quot;params&quot;: {}
            }
        ]
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<table data-block-token="EfAfdS3iXoAULPxQ3mwckzTrnUb"><thead><tr><th data-block-token="O3sLd5KNXou4Egxq6XVcoNiJnMW" colspan="1" rowspan="1"><p data-block-token="QRttdgJBpo2hEuxb438c7eOgn2f">參數</p>
</th><th data-block-token="SMGGduN8zo3cgXxVnwZcW0UAnbA" colspan="1" rowspan="1"><p data-block-token="LY39dA2eOoyVUUxvKwlcyyjdn3e">說明</p>
</th></tr></thead><tbody><tr><td data-block-token="Pbj3dPvuno3x6kxnCsWcTb3knag" colspan="1" rowspan="1"><p data-block-token="EeHOdxCjloFUAGxuY1CcScCTnDe"><code translate="no">name</code></p>
<p data-block-token="FzAJdVbrzozmTdxwy4fcJQkQnlh"></p>
</td><td data-block-token="VJWydnWHJoV66jx6oEPcH9lGnvh" colspan="1" rowspan="1"><p data-block-token="Clg3dWrJpo39lfxSWjVcbE7GnYm">函式名稱。這個函式會將<code translate="no">text</code> 欄位中的原始文字轉換成可搜尋的向量，並儲存在<code translate="no">sparse</code> 欄位中。</p>
</td></tr><tr><td data-block-token="ShPJdlvMQoXnSHxIQ1GcoyegnEb" colspan="1" rowspan="1"><p data-block-token="HFT1dYVCioUj4PxnNSVcYIBInNh"><code translate="no">input_field_names</code></p>
</td><td data-block-token="YiZCdrUaaovWnrxef29cmpQFn9c" colspan="1" rowspan="1"><p data-block-token="YFVOd29cUovDpXx7L2zcJK37n1g">需要將文字轉換為稀疏向量的<code translate="no">VARCHAR</code> 欄位名稱。對於<code translate="no">FunctionType.BM25</code> ，此參數只接受一個欄位名稱。</p>
</td></tr><tr><td data-block-token="QpcMdDoXfo62aNxQfoyc2E6lneg" colspan="1" rowspan="1"><p data-block-token="D1LkdH1KIojwKDx14HUcHdDJnPh"><code translate="no">output_field_names</code></p>
</td><td data-block-token="TrvodS2xDoF6UhxeFNScRg86nuf" colspan="1" rowspan="1"><p data-block-token="CO6bdbNhQo9ZprxlGdecjs9RnEf">儲存內部產生的稀疏向量的欄位名稱。對於<code translate="no">FunctionType.BM25</code> ，此參數只接受一個欄位名稱。</p>
</td></tr><tr><td data-block-token="UvgkdWp5RoXa0QxL3CKcoEZVnIf" colspan="1" rowspan="1"><p data-block-token="PWZSd2E48oWB2QxqVoVcMHGxn7c"><code translate="no">function_type</code></p>
</td><td data-block-token="VdcmdmiiWoy0nex8a29clnslnQg" colspan="1" rowspan="1"><p data-block-token="Q2eSdvOqeoNa6dxcGjcc2LKinDg">要使用的函數類型。設定值為<code translate="no">FunctionType.BM25</code> 。</p>
</td></tr></tbody></table>
<div class="alert note">
<p>對於具有多個<code translate="no">VARCHAR</code> 欄位、需要將文字轉換為稀疏向量的資料集，請在資料集模式中加入不同的函式，確保每個函式都有唯一的名稱和<code translate="no">output_field_names</code> 值。</p>
</div>
<h3 id="Configure-the-index" class="common-anchor-header">設定索引</h3><p>定義包含必要欄位和內建函式的模式後，為您的集合設定索引。以下範例以<code translate="no">BM25</code> 公制類型建立<code translate="no">SPARSE_INVERTED_INDEX</code> 。</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()​
​
index_params.add_index(
    field_name=<span class="hljs-string">&quot;sparse&quot;</span>,
    index_name=<span class="hljs-string">&quot;sparse_inverted_index&quot;</span>,
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>, <span class="hljs-comment"># Inverted index type for sparse vectors</span>
    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>,
    params={
        <span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>, <span class="hljs-comment"># Algorithm for building and querying the index. Valid values: DAAT_MAXSCORE, DAAT_WAND, TAAT_NAIVE.</span>
        <span class="hljs-string">&quot;bm25_k1&quot;</span>: <span class="hljs-number">1.2</span>,
        <span class="hljs-string">&quot;bm25_b&quot;</span>: <span class="hljs-number">0.75</span>
    }, 
)

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">import io.milvus.v2.common.IndexParam;

Map&lt;String, Object&gt; <span class="hljs-keyword">params</span> = <span class="hljs-keyword">new</span> HashMap&lt;&gt;();
<span class="hljs-keyword">params</span>.put(<span class="hljs-string">&quot;inverted_index_algo&quot;</span>, <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>); <span class="hljs-comment">// Algorithm for building and querying the index</span>
<span class="hljs-keyword">params</span>.put(<span class="hljs-string">&quot;bm25_k1&quot;</span>, <span class="hljs-number">1.2</span>);
<span class="hljs-keyword">params</span>.put(<span class="hljs-string">&quot;bm25_b&quot;</span>, <span class="hljs-number">0.75</span>);

List&lt;IndexParam&gt; indexes = <span class="hljs-keyword">new</span> ArrayList&lt;&gt;();
indexes.<span class="hljs-keyword">add</span>(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;sparse&quot;</span>)
        .indexType(IndexParam.IndexType.SPARSE_INVERTED_INDEX)
        .metricType(IndexParam.MetricType.BM25)
        .<span class="hljs-keyword">params</span>(<span class="hljs-keyword">params</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> index_params = [
  {
    field_name: <span class="hljs-string">&quot;sparse&quot;</span>,
    metric_type: <span class="hljs-string">&quot;BM25&quot;</span>,
    index_type: <span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,
    <span class="hljs-keyword">params</span>: {
      inverted_index_algo: <span class="hljs-string">&#x27;DAAT_MAXSCORE&#x27;</span>,
      bm25_k1: <span class="hljs-number">1.2</span>,
      bm25_b: <span class="hljs-number">0.75</span>,
    },
  },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[
        {
            &quot;fieldName&quot;: &quot;sparse&quot;,
            &quot;metricType&quot;: &quot;BM25&quot;,
            &quot;indexType&quot;: &quot;SPARSE_INVERTED_INDEX&quot;,
            &quot;params&quot;: {
                &quot;inverted_index_algo&quot;: &quot;DAAT_MAXSCORE&quot;,
                &quot;bm25_k1&quot;: 1.2,
                &quot;bm25_b&quot;: 0.75
            }
        }
    ]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<table>
<thead>
<tr><th>參數</th><th>說明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">field_name</code></td><td>要建立索引的向量欄位名稱。對於全文檢索，這應該是儲存所產生的稀疏向量的欄位。在本範例中，設定值為<code translate="no">sparse</code> 。</td></tr>
<tr><td><code translate="no">index_type</code></td><td>要建立的索引類型。AUTOINDEX 允許<include target="milvus">MilvusZilliz</include><include target="zilliz">Cloud</include>自動最佳化索引設定。如果您需要更多地控制索引設置，您可以從<include target="milvus">MilvusZilliz</include><include target="zilliz">Cloud</include> 中各種可用於稀疏向量的索引類型中進行選擇。<include target="milvus">如需詳細資訊，請參閱 Milvus 支援的索引</include>。</td></tr>
<tr><td><code translate="no">metric_type</code></td><td>此參數的值必須設定為<code translate="no">BM25</code> ，專門用於全文檢索功能。</td></tr>
<tr><td><code translate="no">params</code></td><td>特定於索引的附加參數字典。</td></tr>
<tr><td><code translate="no">params.inverted_index_algo</code></td><td>用於建立和查詢索引的演算法。有效值：<br>-<code translate="no">DAAT_MAXSCORE</code> (預設值)：使用 MaxScore 演算法的最佳化 Document-at-a-Time (DAAT) 查詢處理。MaxScore 可跳過可能影響極小的詞彙和文件，為高 k 值或包含許多詞彙的查詢提供更好的效能。為達到此目的，MaxScore 依據最大影響分數將詞彙分為必要與非必要群組，並將重點放在對 top-k 結果有貢獻的詞彙上。<br>-<code translate="no">DAAT_WAND</code>: 使用 WAND 演算法進行最佳化 DAAT 查詢處理。WAND 利用最大影響分數跳過非競爭性文件，評估較少的命中文件，但每次命中的開銷較高。這使得 WAND 對於 k 值較小的查詢或較短的查詢更有效率，在這些情況下跳過是較可行的。<br>-<code translate="no">TAAT_NAIVE</code>: 基本 Term-at-a-Time (TAAT) 查詢處理。雖然與<code translate="no">DAAT_MAXSCORE</code> 和<code translate="no">DAAT_WAND</code> 相比較慢，但 TAAT_NAIVE 提供了獨特的優勢。DAAT 演算法使用快取的最大影響分數，不論全域集合參數 (<code translate="no">avgdl</code>) 如何改變，這些分數都會保持靜態；TAAT_NAIVE 則不同，它可以動態地適應這些改變。</td></tr>
<tr><td><code translate="no">params.bm25_k1</code></td><td>控制詞彙頻率飽和。較高的值會增加詞彙頻率在文件排名中的重要性。值範圍：[1.2, 2.0].</td></tr>
<tr><td><code translate="no">params.bm25_b</code></td><td>控制文件長度的規範化程度。通常使用介於 0 和 1 之間的值，一般預設值約為 0.75。值為 1 表示不進行長度規範化，而值為 0 則表示完全規範化。</td></tr>
</tbody>
</table>
<h3 id="Create-the-collection​" class="common-anchor-header">建立集合</h3><p>現在使用已定義的模式和索引參數建立集合。</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">client.<span class="hljs-title function_">create_collection</span>(​
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, ​
    schema=schema, ​
    index_params=index_params​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;demo&quot;</span>)
        .collectionSchema(schema)
        .indexParams(indexes)
        .build();
client.createCollection(requestCreate);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">await client.create_collection(
    collection_name: <span class="hljs-string">&#x27;demo&#x27;</span>, 
    schema: schema, 
    index_params: index_params,
    <span class="hljs-built_in">functions</span>: <span class="hljs-built_in">functions</span>
);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;demo\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Insert-text-data" class="common-anchor-header">插入文字資料<button data-href="#Insert-text-data" class="anchor-icon" translate="no">
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
    </button></h2><p>設定好集合和索引後，您就可以插入文字資料了。在這個過程中，您只需要提供原始文字。我們之前定義的內建函式會自動為每個文字項目產生相對應的稀疏向量。</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">client.<span class="hljs-title function_">insert</span>(<span class="hljs-string">&#x27;demo&#x27;</span>, [
    {<span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;information retrieval is a field of study.&#x27;</span>},
    {<span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;information retrieval focuses on finding relevant information in large datasets.&#x27;</span>},
    {<span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;data mining and information retrieval overlap in research.&#x27;</span>},
])

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;

<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;

Gson gson = new Gson();
<span class="hljs-type">List</span>&lt;JsonObject&gt; rows = Arrays.asList(
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;text\&quot;: \&quot;information retrieval is a field of study.\&quot;}&quot;</span>, JsonObject.<span class="hljs-keyword">class</span>),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;text\&quot;: \&quot;information retrieval focuses on finding relevant information in large datasets.\&quot;}&quot;</span>, JsonObject.<span class="hljs-keyword">class</span>),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;text\&quot;: \&quot;data mining and information retrieval overlap in research.\&quot;}&quot;</span>, JsonObject.<span class="hljs-keyword">class</span>)
);

client.insert(InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;demo&quot;</span>)
        .data(rows)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
<span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;demo&#x27;</span>, 
<span class="hljs-attr">data</span>: [
    {<span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;information retrieval is a field of study.&#x27;</span>},
    {<span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;information retrieval focuses on finding relevant information in large datasets.&#x27;</span>},
    {<span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;data mining and information retrieval overlap in research.&#x27;</span>},
]);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;data&quot;: [
        {&quot;text&quot;: &quot;information retrieval is a field of study.&quot;},
        {&quot;text&quot;: &quot;information retrieval focuses on finding relevant information in large datasets.&quot;},
        {&quot;text&quot;: &quot;data mining and information retrieval overlap in research.&quot;}       
    ],
    &quot;collectionName&quot;: &quot;demo&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Perform-full-text-search" class="common-anchor-header">執行全文檢索<button data-href="#Perform-full-text-search" class="anchor-icon" translate="no">
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
    </button></h2><p>將資料插入資料庫後，您就可以使用原始文字查詢來執行全文檢索。Milvus 會自動將您的查詢轉換成稀疏向量，並使用 BM25 演算法對匹配的搜尋結果進行排序，然後傳回 topK (<code translate="no">limit</code>) 結果。</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">search_params = {​
    <span class="hljs-string">&#x27;params&#x27;</span>: {<span class="hljs-string">&#x27;drop_ratio_search&#x27;</span>: <span class="hljs-number">0.2</span>},​ <span class="hljs-comment"># Proportion of small vector values to ignore during the search</span>
}​
​
client.search(​
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, ​
    data=[<span class="hljs-string">&#x27;whats the focus of information retrieval?&#x27;</span>],​
    anns_field=<span class="hljs-string">&#x27;sparse&#x27;</span>,​
    limit=<span class="hljs-number">3</span>,​
    search_params=search_params​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">vector</span>.<span class="hljs-property">request</span>.<span class="hljs-property">SearchReq</span>;
<span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">vector</span>.<span class="hljs-property">request</span>.<span class="hljs-property">data</span>.<span class="hljs-property">EmbeddedText</span>;
<span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">vector</span>.<span class="hljs-property">response</span>.<span class="hljs-property">SearchResp</span>;

<span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>,<span class="hljs-title class_">Object</span>&gt; searchParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
searchParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;drop_ratio_search&quot;</span>, <span class="hljs-number">0.2</span>); <span class="hljs-comment">// Proportion of small vector values to ignore during the search</span>
<span class="hljs-title class_">SearchResp</span> searchResp = client.<span class="hljs-title function_">search</span>(<span class="hljs-title class_">SearchReq</span>.<span class="hljs-title function_">builder</span>()
        .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;demo&quot;</span>)
        .<span class="hljs-title function_">data</span>(<span class="hljs-title class_">Collections</span>.<span class="hljs-title function_">singletonList</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;whats the focus of information retrieval?&quot;</span>)))
        .<span class="hljs-title function_">annsField</span>(<span class="hljs-string">&quot;sparse&quot;</span>)
        .<span class="hljs-title function_">topK</span>(<span class="hljs-number">3</span>)
        .<span class="hljs-title function_">searchParams</span>(searchParams)
        .<span class="hljs-title function_">outputFields</span>(<span class="hljs-title class_">Collections</span>.<span class="hljs-title function_">singletonList</span>(<span class="hljs-string">&quot;text&quot;</span>))
        .<span class="hljs-title function_">build</span>());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.search(
    collection_name: <span class="hljs-string">&#x27;demo&#x27;</span>, 
    data: [<span class="hljs-string">&#x27;whats the focus of information retrieval?&#x27;</span>],
    anns_field: <span class="hljs-string">&#x27;sparse&#x27;</span>,
    limit: <span class="hljs-number">3</span>,
    <span class="hljs-keyword">params</span>: {<span class="hljs-string">&#x27;drop_ratio_search&#x27;</span>: <span class="hljs-number">0.2</span>}, <span class="hljs-comment">// Proportion of small vector values to ignore during the search</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--data-raw <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;demo&quot;,
    &quot;data&quot;: [
        &quot;whats the focus of information retrieval?&quot;
    ],
    &quot;annsField&quot;: &quot;sparse&quot;,
    &quot;limit&quot;: 3,
    &quot;outputFields&quot;: [
        &quot;text&quot;
    ],
    &quot;searchParams&quot;:{
        &quot;params&quot;:{
            &quot;drop_ratio_search&quot;:0.2 # Proportion of small vector values to ignore during the search
        }
    }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<table data-block-token="M37Zdx7XdoYN41xdKtfcHcJpnqh"><thead><tr><th data-block-token="UhTwdxk3Mo5eLjxff0PcL1CHn8b" colspan="1" rowspan="1"><p data-block-token="OwUXdMhOgoRxjzx5t9ecKR9Zn6J">參數</p>
</th><th data-block-token="GM88dTMzTof30QxS9O2cVyrnnJd" colspan="1" rowspan="1"><p data-block-token="Nlp5dAJY8or40nxV6auc20XHnjh">說明</p>
</th></tr></thead><tbody><tr><td data-block-token="QpGIdQ2m0oogCvxColKcNWnYnUc" colspan="1" rowspan="1"><p data-block-token="TkffdBxkKo2hVvx9gGucca46nic"><code translate="no">search_params</code></p>
</td><td data-block-token="HYemdqt6Dow9tvxOcYScmYdPn8e" colspan="1" rowspan="1"><p data-block-token="JiIOdJrBcoGIQ4xrqYycMdjnn7g">包含搜尋參數的字典。</p>
</td></tr><tr><td data-block-token="DJDgdH5WUoZQxkxmLzQcXqcXnQh" colspan="1" rowspan="1"><p data-block-token="LKWbdw498o9mtRxm9gDcg28FnQd"><code translate="no">params.drop_ratio_search</code></p>
</td><td data-block-token="SEJ7d5y18otFTOxy7gLcvLYRnfb" colspan="1" rowspan="1"><p data-block-token="MnladDjOGoUphGxrZzXchD0anzf">搜尋時要忽略的低重要性字詞比例。如需詳細資訊，請參閱<a href="/docs/zh-hant/sparse_vector.md">Sparse Vector</a>。</p>
</td></tr><tr><td data-block-token="XPPYdAYUPoASg5xuIYmcyxqHnPe" colspan="1" rowspan="1"><p data-block-token="T90ndG7H0okLa4xa1wzcHQmEnEg"><code translate="no">data</code></p>
</td><td data-block-token="NMhsduxr1oUESPx2J8YcA8csnA1" colspan="1" rowspan="1"><p data-block-token="ZmEQdkdGtofQsAx9YXNcsnlHnYe">原始查詢文字。</p>
</td></tr><tr><td data-block-token="O4OVdL9BIollH1xORz3czhInnSh" colspan="1" rowspan="1"><p data-block-token="CYdGd82dRopaWrxfJ9ycWQQnnPc"><code translate="no">anns_field</code></p>
</td><td data-block-token="MsKIdxGj6oWeBExoFurcxWCnnGh" colspan="1" rowspan="1"><p data-block-token="RsMDdgo0roTSBuxYwm6cGw3inZd">包含內部產生的稀疏向量的欄位名稱。</p>
</td></tr><tr><td data-block-token="G0ewd9TQ1o1RQRxZA9ucMO9tnBK" colspan="1" rowspan="1"><p data-block-token="JOyTdUmLIo5aV0x4ChOcLiDQnLh"><code translate="no">limit</code></p>
</td><td data-block-token="H21hdYGZQoQe5FxYnwCch58qn0g" colspan="1" rowspan="1"><p data-block-token="ATKidHgXoo7c7dxM7cgcE46engb">要返回的最大頂端匹配數目。</p>
</td></tr></tbody></table>
<p></p>
