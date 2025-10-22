---
id: multi-vector-search.md
title: 多向量混合搜尋
summary: >-
  在許多應用程式中，可以透過豐富的資訊（例如標題和描述）或多種模式（例如文字、影像和音訊）來搜尋物件。例如，包含一段文字和一張圖片的
  tweet，如果文字或圖片符合搜尋查詢的語意，就會被搜尋。混合搜尋透過結合這些不同領域的搜尋來增強搜尋體驗。Milvus
  支援此功能，允許在多向量領域進行搜尋，同時進行多個近似近鄰 (ANN)
  搜尋。如果您想要同時搜尋文字與影像、描述同一物件的多個文字欄位，或是密集與稀疏向量，多向量混合搜尋對改善搜尋品質特別有用。
---
<h1 id="Multi-Vector-Hybrid-Search" class="common-anchor-header">多向量混合搜尋<button data-href="#Multi-Vector-Hybrid-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>在許多應用程式中，可以透過豐富的資訊（例如標題和描述）或多種模式（例如文字、影像和音訊）來搜尋物件。例如，包含一段文字和一張圖片的 tweet，如果文字或圖片符合搜尋查詢的語意，就會被搜尋。混合搜尋透過結合這些不同領域的搜尋來增強搜尋體驗。Milvus 支援此功能，允許在多向量領域進行搜尋，同時進行多個近似近鄰 (ANN) 搜尋。如果您要同時搜尋文字和影像、描述同一物件的多個文字欄位，或密集和稀疏向量以改善搜尋品質，多向量混合搜尋就特別有用。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/hybrid-search-workflow.png" alt="Hybrid Search Workflow" class="doc-image" id="hybrid-search-workflow" />
   </span> <span class="img-wrapper"> <span>混合搜尋工作流程</span> </span></p>
<p>多向量混合搜尋整合了不同的搜尋方法，或跨越各種模式的嵌入：</p>
<ul>
<li><p><strong>稀疏-密集向量搜尋</strong>：<a href="/docs/zh-hant/dense-vector.md">Dense Vector</a>是捕捉語意關係的絕佳方法，而<a href="/docs/zh-hant/sparse_vector.md">Sparse Vector</a>則是精確關鍵字比對的高效方法。混合搜尋結合了這些方法，既能提供廣泛的概念理解，又能提供精確的詞彙相關性，從而改善搜尋結果。混合搜尋利用每種方法的優點，克服獨立方法的限制，為複雜的查詢提供更好的效能。以下是結合語意搜尋與全文檢索的混合式檢索的詳細<a href="/docs/zh-hant/full_text_search_with_milvus.md">指南</a>。</p></li>
<li><p><strong>多模式向量搜尋</strong>：多模態向量搜尋是一種功能強大的技術，可讓您跨各種資料類型進行搜尋，包括文字、影像、音訊等。這種方法的主要優勢在於它能將不同的模式統一為無縫且具凝聚力的搜尋體驗。例如，在產品搜尋中，使用者可能會輸入文字查詢，以尋找以文字和影像描述的產品。透過混合搜尋方法結合這些模式，您可以提高搜尋準確度或豐富搜尋結果。</p></li>
</ul>
<h2 id="Example" class="common-anchor-header">範例<button data-href="#Example" class="anchor-icon" translate="no">
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
    </button></h2><p>讓我們考慮一個真實世界的使用案例，其中每個產品都包含文字說明和圖片。根據可用的資料，我們可以進行三種類型的搜尋：</p>
<ul>
<li><p><strong>語意文字搜尋：</strong>這包括使用密集向量來查詢產品的文字說明。可以使用<a href="https://zilliz.com/learn/explore-colbert-token-level-embedding-and-ranking-model-for-similarity-search?_gl=1*d243m9*_gcl_au*MjcyNTAwMzUyLjE3NDMxMzE1MjY.*_ga*MTQ3OTI4MDc5My4xNzQzMTMxNTI2*_ga_KKMVYG8YF2*MTc0NTkwODU0Mi45NC4xLjE3NDU5MDg4MzcuMC4wLjA.#A-Quick-Recap-of-BERT">BERT</a>和<a href="https://zilliz.com/learn/NLP-essentials-understanding-transformers-in-AI?_gl=1*d243m9*_gcl_au*MjcyNTAwMzUyLjE3NDMxMzE1MjY.*_ga*MTQ3OTI4MDc5My4xNzQzMTMxNTI2*_ga_KKMVYG8YF2*MTc0NTkwODU0Mi45NC4xLjE3NDU5MDg4MzcuMC4wLjA.">Transformers</a>等模型或<a href="https://zilliz.com/learn/guide-to-using-openai-text-embedding-models">OpenAI</a> 等服務來產生文字內嵌。</p></li>
<li><p><strong>全文檢索</strong>：在此，我們使用關鍵字匹配稀疏向量來查詢產品的文字描述。<a href="https://zilliz.com/learn/mastering-bm25-a-deep-dive-into-the-algorithm-and-application-in-milvus">BM25</a>等演算法或<a href="https://zilliz.com/learn/bge-m3-and-splade-two-machine-learning-models-for-generating-sparse-embeddings?_gl=1*1cde1oq*_gcl_au*MjcyNTAwMzUyLjE3NDMxMzE1MjY.*_ga*MTQ3OTI4MDc5My4xNzQzMTMxNTI2*_ga_KKMVYG8YF2*MTc0NTkwODU0Mi45NC4xLjE3NDU5MDg4MzcuMC4wLjA.#BGE-M3">BGE-M3</a>或<a href="https://zilliz.com/learn/bge-m3-and-splade-two-machine-learning-models-for-generating-sparse-embeddings?_gl=1*ov2die*_gcl_au*MjcyNTAwMzUyLjE3NDMxMzE1MjY.*_ga*MTQ3OTI4MDc5My4xNzQzMTMxNTI2*_ga_KKMVYG8YF2*MTc0NTkwODU0Mi45NC4xLjE3NDU5MDg4MzcuMC4wLjA.#SPLADE">SPLADE</a>等稀疏嵌入模型都可以用來達到此目的。</p></li>
<li><p><strong>多模態影像搜尋：</strong>此方法使用具有密集向量的文字查詢來查詢影像。圖像嵌入可以使用<a href="https://zilliz.com/learn/exploring-openai-clip-the-future-of-multimodal-ai-learning">CLIP</a> 等模型產生。</p></li>
</ul>
<p>本指南將引導您參考一個結合上述搜尋方法的多模態混合搜尋範例，給定產品的原始文字描述和圖像嵌入。我們將示範如何儲存多向量資料，並使用重排策略執行混合搜尋。</p>
<h2 id="Create-a-collection-with-multiple-vector-fields" class="common-anchor-header">以多向量欄位建立集合<button data-href="#Create-a-collection-with-multiple-vector-fields" class="anchor-icon" translate="no">
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
    </button></h2><p>建立集合的過程包含三個關鍵步驟：定義集合模式、配置索引參數，以及建立集合。</p>
<h3 id="Define-schema" class="common-anchor-header">定義模式<button data-href="#Define-schema" class="anchor-icon" translate="no">
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
    </button></h3><p>對於多向量混合搜尋，我們應該在一個集合模式中定義多個向量欄位。有關集合中允許的向量欄位數量限制的詳細資訊，請參閱<a href="https://zilliverse.feishu.cn/wiki/PuxkwMWvbiHxvTkHsVkcMZP9n5f#E5yxdHM16okh57xV3WKcTJsYn0f">Zilliz Cloud Limits</a>。  不過，如有必要，您可以調整 <a href="/docs/zh-hant/configure_proxy.md#proxymaxVectorFieldNum"><code translate="no">proxy.maxVectorFieldNum</code></a>以根據需要在集合中包含最多 10 個向量欄位。</p>
<p>本範例在模式中加入下列欄位：</p>
<ul>
<li><p><code translate="no">id</code>:作為儲存文字 ID 的主索引鍵。這個欄位的資料類型是<code translate="no">INT64</code> 。</p></li>
<li><p><code translate="no">text</code>:用於儲存文字內容。此欄位的資料類型為<code translate="no">VARCHAR</code> ，最大長度為 1000 位元組。<code translate="no">enable_analyzer</code> 選項設定為<code translate="no">True</code> ，以方便全文檢索。</p></li>
<li><p><code translate="no">text_dense</code>:用於儲存文字的密集向量。此欄位的資料類型為<code translate="no">FLOAT_VECTOR</code> ，向量尺寸為 768。</p></li>
<li><p><code translate="no">text_sparse</code>:用於儲存文字的稀疏向量。這個欄位的資料類型是<code translate="no">SPARSE_FLOAT_VECTOR</code> 。</p></li>
<li><p><code translate="no">image_dense</code>:用於儲存產品影像的密集向量。此欄位的資料類型為<code translate="no">FLOAT_VETOR</code> ，向量維度為 512。</p></li>
</ul>
<p>由於我們會使用內建的 BM25 演算法來對文字欄位執行全文檢索，因此有必要在模式中加入 Milvus<code translate="no">Function</code> 。如需詳細資訊，請參閱<a href="/docs/zh-hant/full-text-search.md">全文</a>檢索。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (
    MilvusClient, DataType, Function, FunctionType
)

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># Init schema with auto_id disabled</span>
schema = MilvusClient.create_schema(auto_id=<span class="hljs-literal">False</span>)

<span class="hljs-comment"># Add fields to schema</span>
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;product id&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;text&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>, enable_analyzer=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;raw text of product description&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;text_dense&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>, description=<span class="hljs-string">&quot;text dense embedding&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;text_sparse&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR, description=<span class="hljs-string">&quot;text sparse embedding auto-generated by the built-in BM25 function&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;image_dense&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">512</span>, description=<span class="hljs-string">&quot;image dense embedding&quot;</span>)

<span class="hljs-comment"># Add function to schema</span>
bm25_function = Function(
    name=<span class="hljs-string">&quot;text_bm25_emb&quot;</span>,
    input_field_names=[<span class="hljs-string">&quot;text&quot;</span>],
    output_field_names=[<span class="hljs-string">&quot;text_sparse&quot;</span>],
    function_type=FunctionType.BM25,
)
schema.add_function(bm25_function)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq.Function;

<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build());

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">false</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">1000</span>)
        .enableAnalyzer(<span class="hljs-literal">true</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text_dense&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">768</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text_sparse&quot;</span>)
        .dataType(DataType.SparseFloatVector)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;image_dense&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">512</span>)
        .build());

schema.addFunction(Function.builder()
        .functionType(FunctionType.BM25)
        .name(<span class="hljs-string">&quot;text_bm25_emb&quot;</span>)
        .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;text&quot;</span>))
        .outputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;text_sparse&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/column&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

milvusAddr := <span class="hljs-string">&quot;localhost:19530&quot;</span>
client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: milvusAddr,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

function := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;text_bm25_emb&quot;</span>).
    WithInputFields(<span class="hljs-string">&quot;text&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;text_sparse&quot;</span>).
    WithType(entity.FunctionTypeBM25)

schema := entity.NewSchema()

schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;id&quot;</span>).
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(<span class="hljs-literal">true</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithEnableAnalyzer(<span class="hljs-literal">true</span>).
    WithMaxLength(<span class="hljs-number">1000</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text_dense&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(<span class="hljs-number">768</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text_sparse&quot;</span>).
    WithDataType(entity.FieldTypeSparseVector),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;image_dense&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(<span class="hljs-number">512</span>),
).WithFunction(function)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});

<span class="hljs-comment">// Define fields</span>
<span class="hljs-keyword">const</span> fields = [
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
        <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">auto_id</span>: <span class="hljs-literal">false</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>,
        <span class="hljs-attr">enable_match</span>: <span class="hljs-literal">true</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text_dense&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
        <span class="hljs-attr">dim</span>: <span class="hljs-number">768</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text_sparse&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">SPARSE_FLOAT_VECTOR</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;image_dense&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
        <span class="hljs-attr">dim</span>: <span class="hljs-number">512</span>
    }
];

<span class="hljs-comment">// define function</span>
<span class="hljs-keyword">const</span> functions = [
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text_bm25_emb&quot;</span>,
      <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;text bm25 function&quot;</span>,
      <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">BM25</span>,
      <span class="hljs-attr">input_field_names</span>: [<span class="hljs-string">&quot;text&quot;</span>],
      <span class="hljs-attr">output_field_names</span>: [<span class="hljs-string">&quot;text_sparse&quot;</span>],
      <span class="hljs-attr">params</span>: {},
    },
]；
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> bm25Function=<span class="hljs-string">&#x27;{
    &quot;name&quot;: &quot;text_bm25_emb&quot;,
    &quot;type&quot;: &quot;BM25&quot;,
    &quot;inputFieldNames&quot;: [&quot;text&quot;],
    &quot;outputFieldNames&quot;: [&quot;text_sparse&quot;],
    &quot;params&quot;: {}
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
        &quot;autoId&quot;: false,
        &quot;functions&quot;: [$bm25Function],
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
                &quot;fieldName&quot;: &quot;text_dense&quot;,
                &quot;dataType&quot;: &quot;FloatVector&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;dim&quot;: &quot;768&quot;
                }
            },
            {
                &quot;fieldName&quot;: &quot;text_sparse&quot;,
                &quot;dataType&quot;: &quot;SparseFloatVector&quot;
            },
            {
                &quot;fieldName&quot;: &quot;image_dense&quot;,
                &quot;dataType&quot;: &quot;FloatVector&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;dim&quot;: &quot;512&quot;
                }
            }
        ]
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-index" class="common-anchor-header">建立索引<button data-href="#Create-index" class="anchor-icon" translate="no">
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
    </button></h3><p>定義資料集模式之後，下一步就是設定向量索引並指定相似度指標。在給出的範例中</p>
<ul>
<li><p><code translate="no">text_dense_index</code>：針對文字密集向量欄位建立<code translate="no">AUTOINDEX</code> 類型的索引，其公制類型為<code translate="no">IP</code> 。</p></li>
<li><p><code translate="no">text_sparse_index</code>：使用<code translate="no">BM25</code> 公制類型的<code translate="no">SPARSE_INVERTED_INDEX</code>類型索引用於文字稀疏向量場。</p></li>
<li><p><code translate="no">image_dense_index</code>：會為影像密集向量場建立<code translate="no">AUTOINDEX</code> 與<code translate="no">IP</code> 公制類型的索引。</p></li>
</ul>
<p>您可以根據需要選擇其他索引類型，以最適合您的需求和資料類型。如需支援索引類型的進一步資訊，請參閱<a href="/docs/zh-hant/index-vector-fields.md">可用索引類型的</a>說明文件。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add indexes</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;text_dense&quot;</span>,
    index_name=<span class="hljs-string">&quot;text_dense_index&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;text_sparse&quot;</span>,
    index_name=<span class="hljs-string">&quot;text_sparse_index&quot;</span>,
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>,
    params={<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>}, <span class="hljs-comment"># or &quot;DAAT_WAND&quot; or &quot;TAAT_NAIVE&quot;</span>
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;image_dense&quot;</span>,
    index_name=<span class="hljs-string">&quot;image_dense_index&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> java.util.*;

Map&lt;String, Object&gt; denseParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();

<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParamForTextDense</span> <span class="hljs-operator">=</span> IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;text_dense&quot;</span>)
        .indexName(<span class="hljs-string">&quot;text_dense_index&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.IP)
        .build();

Map&lt;String, Object&gt; sparseParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
sparseParams.put(<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>);
<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParamForTextSparse</span> <span class="hljs-operator">=</span> IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;text_sparse&quot;</span>)
        .indexName(<span class="hljs-string">&quot;text_sparse_index&quot;</span>)
        .indexType(IndexParam.IndexType.SPARSE_INVERTED_INDEX)
        .metricType(IndexParam.MetricType.BM25)
        .extraParams(sparseParams)
        .build();

<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParamForImageDense</span> <span class="hljs-operator">=</span> IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;image_dense&quot;</span>)
        .indexName(<span class="hljs-string">&quot;image_dense_index&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.IP)
        .build();

List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexParams.add(indexParamForTextDense);
indexParams.add(indexParamForTextSparse);
indexParams.add(indexParamForImageDense);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">indexOption1 := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;text_dense&quot;</span>,
    index.NewAutoIndex(index.MetricType(entity.IP)))
indexOption2 := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;text_sparse&quot;</span>,
    index.NewSparseInvertedIndex(entity.BM25, <span class="hljs-number">0.2</span>))
indexOption3 := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;image_dense&quot;</span>,
    index.NewAutoIndex(index.MetricType(entity.IP)))
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> index_params = [{
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;text_dense&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;text_dense_index&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;IP&quot;</span>
},{
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;text_sparse&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;text_sparse_index&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;IndexType.SPARSE_INVERTED_INDEX&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;BM25&quot;</span>,
    <span class="hljs-attr">params</span>: {
      <span class="hljs-attr">inverted_index_algo</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>, 
    }
},{
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;image_dense&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;image_dense_index&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;IP&quot;</span>
}]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[
        {
            &quot;fieldName&quot;: &quot;text_dense&quot;,
            &quot;metricType&quot;: &quot;IP&quot;,
            &quot;indexName&quot;: &quot;text_dense_index&quot;,
            &quot;indexType&quot;:&quot;AUTOINDEX&quot;
        },
        {
            &quot;fieldName&quot;: &quot;text_sparse&quot;,
            &quot;metricType&quot;: &quot;BM25&quot;,
            &quot;indexName&quot;: &quot;text_sparse_index&quot;,
            &quot;indexType&quot;: &quot;SPARSE_INVERTED_INDEX&quot;,
            &quot;params&quot;:{&quot;inverted_index_algo&quot;: &quot;DAAT_MAXSCORE&quot;}
        },
        {
            &quot;fieldName&quot;: &quot;image_dense&quot;,
            &quot;metricType&quot;: &quot;IP&quot;,
            &quot;indexName&quot;: &quot;image_dense_index&quot;,
            &quot;indexType&quot;:&quot;AUTOINDEX&quot;
        }
    ]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-collection" class="common-anchor-header">建立集合<button data-href="#Create-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>使用前兩個步驟中配置的集合模式和索引，建立一個名為<code translate="no">demo</code> 的集合。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">createCollectionReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .collectionSchema(schema)
        .indexParams(indexParams)
        .build();
client.createCollection(createCollectionReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;my_collection&quot;</span>, schema).
        WithIndexOptions(indexOption1, indexOption2))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">fields</span>: fields,
    <span class="hljs-attr">index_params</span>: index_params,
})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Insert-data" class="common-anchor-header">插入資料<button data-href="#Insert-data" class="anchor-icon" translate="no">
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
    </button></h2><p>本節根據之前定義的模式將資料插入<code translate="no">my_collection</code> 集合。在插入過程中，確保所有欄位 (有自動產生數值的欄位除外) 都有正確格式的資料。在此範例中</p>
<ul>
<li><p><code translate="no">id</code>代表產品 ID 的整數</p></li>
<li><p><code translate="no">text</code>：包含產品描述的字串</p></li>
<li><p><code translate="no">text_dense</code>：768 個浮點值的清單，代表文字描述的密集嵌入</p></li>
<li><p><code translate="no">image_dense</code>代表產品圖片密集嵌入的 512 個浮點值清單。</p></li>
</ul>
<p>您可以使用相同或不同的模型為每個欄位產生密集內嵌。在這個範例中，兩個密集內嵌有不同的尺寸，顯示它們是由不同的模型產生。稍後定義每項搜尋時，請務必使用對應的模型來產生適當的查詢內嵌。</p>
<p>由於本範例使用內建的 BM25 函式從文字欄位產生稀疏內嵌，因此您不需要手動提供稀疏向量。但是，如果您選擇不使用 BM25，則必須自行預先計算並提供稀疏內嵌。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

data=[
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">0</span>,
        <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Red cotton t-shirt with round neck&quot;</span>,
        <span class="hljs-string">&quot;text_dense&quot;</span>: [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, ...],
        <span class="hljs-string">&quot;image_dense&quot;</span>: [<span class="hljs-number">0.6366019600530924</span>, -<span class="hljs-number">0.09323198122475052</span>, ...]
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Wireless noise-cancelling over-ear headphones&quot;</span>,
        <span class="hljs-string">&quot;text_dense&quot;</span>: [<span class="hljs-number">0.19886812562848388</span>, <span class="hljs-number">0.06023560599112088</span>, <span class="hljs-number">0.6976963061752597</span>, ...],
        <span class="hljs-string">&quot;image_dense&quot;</span>: [<span class="hljs-number">0.6414180010301553</span>, <span class="hljs-number">0.8976979978567611</span>, ...]
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,
        <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Stainless steel water bottle, 500ml&quot;</span>,
        <span class="hljs-string">&quot;dense&quot;</span>: [<span class="hljs-number">0.43742130801983836</span>, -<span class="hljs-number">0.5597502546264526</span>, <span class="hljs-number">0.6457887650909682</span>, ...],
        <span class="hljs-string">&quot;image_dense&quot;</span>: [-<span class="hljs-number">0.6901259768402174</span>, <span class="hljs-number">0.6100500332193755</span>, ...]
    }
]

res = client.insert(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=data
)

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;

<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row1</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row1.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">0</span>);
row1.addProperty(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;Red cotton t-shirt with round neck&quot;</span>);
row1.add(<span class="hljs-string">&quot;text_dense&quot;</span>, gson.toJsonTree(text_dense1));
row1.add(<span class="hljs-string">&quot;image_dense&quot;</span>, gson.toJsonTree(image_dense));

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row2</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row2.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">1</span>);
row2.addProperty(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;Wireless noise-cancelling over-ear headphones&quot;</span>);
row2.add(<span class="hljs-string">&quot;text_dense&quot;</span>, gson.toJsonTree(text_dense2));
row2.add(<span class="hljs-string">&quot;image_dense&quot;</span>, gson.toJsonTree(image_dense2));

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row3</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row3.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">2</span>);
row3.addProperty(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;Stainless steel water bottle, 500ml&quot;</span>);
row3.add(<span class="hljs-string">&quot;text_dense&quot;</span>, gson.toJsonTree(dense3));
row3.add(<span class="hljs-string">&quot;image_dense&quot;</span>, gson.toJsonTree(sparse3));

List&lt;JsonObject&gt; data = Arrays.asList(row1, row2, row3);
<span class="hljs-type">InsertReq</span> <span class="hljs-variable">insertReq</span> <span class="hljs-operator">=</span> InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(data)
        .build();

<span class="hljs-type">InsertResp</span> <span class="hljs-variable">insertResp</span> <span class="hljs-operator">=</span> client.insert(insertReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">_, err = client.Insert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;my_collection&quot;</span>).
    WithInt64Column(<span class="hljs-string">&quot;id&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>}).
    WithVarcharColumn(<span class="hljs-string">&quot;text&quot;</span>, []<span class="hljs-type">string</span>{
        <span class="hljs-string">&quot;Red cotton t-shirt with round neck&quot;</span>,
        <span class="hljs-string">&quot;Wireless noise-cancelling over-ear headphones&quot;</span>,
        <span class="hljs-string">&quot;Stainless steel water bottle, 500ml&quot;</span>,
    }).
    WithFloatVectorColumn(<span class="hljs-string">&quot;text_dense&quot;</span>, <span class="hljs-number">768</span>, [][]<span class="hljs-type">float32</span>{
        {<span class="hljs-number">0.3580376395471989</span>, <span class="hljs-number">-0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, ...},
        {<span class="hljs-number">0.19886812562848388</span>, <span class="hljs-number">0.06023560599112088</span>, <span class="hljs-number">0.6976963061752597</span>, ...},
        {<span class="hljs-number">0.43742130801983836</span>, <span class="hljs-number">-0.5597502546264526</span>, <span class="hljs-number">0.6457887650909682</span>, ...},
    }).
    WithFloatVectorColumn(<span class="hljs-string">&quot;image_dense&quot;</span>, <span class="hljs-number">512</span>, [][]<span class="hljs-type">float32</span>{
        {<span class="hljs-number">0.6366019600530924</span>, <span class="hljs-number">-0.09323198122475052</span>, ...},
        {<span class="hljs-number">0.6414180010301553</span>, <span class="hljs-number">0.8976979978567611</span>, ...},
        {<span class="hljs-number">-0.6901259768402174</span>, <span class="hljs-number">0.6100500332193755</span>, ...},
    }).
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle err</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)

<span class="hljs-keyword">var</span> data = [
    {<span class="hljs-attr">id</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;Red cotton t-shirt with round neck&quot;</span> , <span class="hljs-attr">text_dense</span>: [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, ...], <span class="hljs-attr">image_dense</span>: [<span class="hljs-number">0.6366019600530924</span>, -<span class="hljs-number">0.09323198122475052</span>, ...]},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;Wireless noise-cancelling over-ear headphones&quot;</span> , <span class="hljs-attr">text_dense</span>: [<span class="hljs-number">0.19886812562848388</span>, <span class="hljs-number">0.06023560599112088</span>, <span class="hljs-number">0.6976963061752597</span>, ...], <span class="hljs-attr">image_dense</span>: [<span class="hljs-number">0.6414180010301553</span>, <span class="hljs-number">0.8976979978567611</span>, ...]},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;Stainless steel water bottle, 500ml&quot;</span> , <span class="hljs-attr">text_dense</span>: [<span class="hljs-number">0.43742130801983836</span>, -<span class="hljs-number">0.5597502546264526</span>, <span class="hljs-number">0.6457887650909682</span>, ...], <span class="hljs-attr">image_dense</span>: [-<span class="hljs-number">0.6901259768402174</span>, <span class="hljs-number">0.6100500332193755</span>, ...]}
]

<span class="hljs-keyword">var</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">data</span>: data,
})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;data&quot;: [
        {&quot;id&quot;: 0, &quot;text&quot;: &quot;Red cotton t-shirt with round neck&quot; , &quot;text_dense&quot;: [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, ...], &quot;image_dense&quot;: [0.6366019600530924, -0.09323198122475052, ...]},
        {&quot;id&quot;: 1, &quot;text&quot;: &quot;Wireless noise-cancelling over-ear headphones&quot; , &quot;text_dense&quot;: [0.19886812562848388, 0.06023560599112088, 0.6976963061752597, ...], &quot;image_dense&quot;: [0.6414180010301553, 0.8976979978567611, ...]},
        {&quot;id&quot;: 2, &quot;text&quot;: &quot;Stainless steel water bottle, 500ml&quot; , &quot;text_dense&quot;: [0.43742130801983836, -0.5597502546264526, 0.6457887650909682, ...], &quot;image_dense&quot;: [-0.6901259768402174, 0.6100500332193755, ...]}
    ],
    &quot;collectionName&quot;: &quot;my_collection&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Perform-Hybrid-Search" class="common-anchor-header">執行混合搜尋<button data-href="#Perform-Hybrid-Search" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Create-multiple-AnnSearchRequest-instances" class="common-anchor-header">步驟 1：建立多個 AnnSearchRequest 實體<button data-href="#Step-1-Create-multiple-AnnSearchRequest-instances" class="anchor-icon" translate="no">
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
    </button></h3><p>Hybrid Search 是透過在<code translate="no">hybrid_search()</code> 函式中建立多個<code translate="no">AnnSearchRequest</code> 來實作，其中每個<code translate="no">AnnSearchRequest</code> 代表特定向量領域的基本 ANN 搜尋請求。因此，在進行 Hybrid Search 之前，必須為每個向量領域建立一個<code translate="no">AnnSearchRequest</code> 。</p>
<p>此外，透過在<code translate="no">AnnSearchRequest</code> 中設定<code translate="no">expr</code> 參數，您可以設定混合搜尋的過濾條件。請參閱<a href="/docs/zh-hant/filtered-search.md">過濾搜尋與</a> <a href="/docs/zh-hant/boolean.md">過濾說明</a>。</p>
<div class="alert note">
<p>在混合搜尋中，每個<code translate="no">AnnSearchRequest</code> 只支援一個查詢資料。</p>
</div>
<p>為了示範各種搜尋向量字段的功能，我們將使用一個範例查詢來建構三個<code translate="no">AnnSearchRequest</code> 搜尋請求。在此過程中，我們也會使用其預先計算的密集向量。搜尋請求將以下列向量領域為目標：</p>
<ul>
<li><p><code translate="no">text_dense</code> 用於語意文字搜尋，允許基於意義而非直接關鍵字匹配進行上下文理解和檢索。</p></li>
<li><p><code translate="no">text_sparse</code>用於全文檢索或關鍵字比對，著重於文字中的精確單字或短語匹配。</p></li>
<li><p><code translate="no">image_dense</code>用於多模式文字到圖片搜尋，根據查詢的語意內容擷取相關的產品圖片。</p></li>
</ul>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest

query_text = <span class="hljs-string">&quot;white headphones, quiet and comfortable&quot;</span>
query_dense_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.5142999509918703</span>, ...]
query_multimodal_vector = [<span class="hljs-number">0.015829865178701663</span>, <span class="hljs-number">0.5264158340734488</span>, ...]

<span class="hljs-comment"># text semantic search (dense)</span>
search_param_1 = {
    <span class="hljs-string">&quot;data&quot;</span>: [query_dense_vector],
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;text_dense&quot;</span>,
    <span class="hljs-string">&quot;param&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>},
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span>
}
request_1 = AnnSearchRequest(**search_param_1)

<span class="hljs-comment"># full-text search (sparse)</span>
search_param_2 = {
    <span class="hljs-string">&quot;data&quot;</span>: [query_text],
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;text_sparse&quot;</span>,
    <span class="hljs-string">&quot;param&quot;</span>: {<span class="hljs-string">&quot;drop_ratio_search&quot;</span>: <span class="hljs-number">0.2</span>},
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span>
}
request_2 = AnnSearchRequest(**search_param_2)

<span class="hljs-comment"># text-to-image search (multimodal)</span>
search_param_3 = {
    <span class="hljs-string">&quot;data&quot;</span>: [query_multimodal_vector],
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;image_dense&quot;</span>,
    <span class="hljs-string">&quot;param&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>},
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span>
}
request_3 = AnnSearchRequest(**search_param_3)

reqs = [request_1, request_2, request_3]

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.AnnSearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.BaseVector;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.SparseFloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;

<span class="hljs-type">float</span>[] queryDense = <span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{-<span class="hljs-number">0.0475336798f</span>,  <span class="hljs-number">0.0521207601f</span>,  <span class="hljs-number">0.0904406682f</span>, ...};
<span class="hljs-type">float</span>[] queryMultimodal = <span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.0158298651f</span>, <span class="hljs-number">0.5264158340f</span>, ...}

List&lt;BaseVector&gt; queryTexts = Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;white headphones, quiet and comfortable&quot;</span>);)
List&lt;BaseVector&gt; queryDenseVectors = Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(queryDense));
List&lt;BaseVector&gt; queryMultimodalVectors = Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(queryMultimodal));

List&lt;AnnSearchReq&gt; searchRequests = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;text_dense&quot;</span>)
        .vectors(queryDenseVectors)
        .params(<span class="hljs-string">&quot;{\&quot;nprobe\&quot;: 10}&quot;</span>)
        .topK(<span class="hljs-number">2</span>)
        .build());
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;text_sparse&quot;</span>)
        .vectors(queryTexts)
        .params(<span class="hljs-string">&quot;{\&quot;drop_ratio_search\&quot;: 0.2}&quot;</span>)
        .topK(<span class="hljs-number">2</span>)
        .build());
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;image_dense&quot;</span>)
        .vectors(queryMultimodalVectors)
        .params(<span class="hljs-string">&quot;{\&quot;nprobe\&quot;: 10}&quot;</span>)
        .topK(<span class="hljs-number">2</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">queryText := entity.Text({<span class="hljs-string">&quot;white headphones, quiet and comfortable&quot;</span>})
queryVector := []<span class="hljs-type">float32</span>{<span class="hljs-number">0.3580376395471989</span>, <span class="hljs-number">-0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, ...}
queryMultimodalVector := []<span class="hljs-type">float32</span>{<span class="hljs-number">0.015829865178701663</span>, <span class="hljs-number">0.5264158340734488</span>, ...}

request1 := milvusclient.NewAnnRequest(<span class="hljs-string">&quot;text_dense&quot;</span>, <span class="hljs-number">2</span>, entity.FloatVector(queryVector)).
    WithAnnParam(index.NewIvfAnnParam(<span class="hljs-number">10</span>))

annParam := index.NewSparseAnnParam()
annParam.WithDropRatio(<span class="hljs-number">0.2</span>)
request2 := milvusclient.NewAnnRequest(<span class="hljs-string">&quot;text_sparse&quot;</span>, <span class="hljs-number">2</span>, queryText).
    WithAnnParam(annParam)

request3 := milvusclient.NewAnnRequest(<span class="hljs-string">&quot;image_dense&quot;</span>, <span class="hljs-number">2</span>, entity.FloatVector(queryMultimodalVector)).
    WithAnnParam(index.NewIvfAnnParam(<span class="hljs-number">10</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> query_text = <span class="hljs-string">&quot;white headphones, quiet and comfortable&quot;</span>
<span class="hljs-keyword">const</span> query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, ...]
<span class="hljs-keyword">const</span> query_multimodal_vector = [<span class="hljs-number">0.015829865178701663</span>, <span class="hljs-number">0.5264158340734488</span>, ...]

<span class="hljs-keyword">const</span> search_param_1 = {
    <span class="hljs-string">&quot;data&quot;</span>: query_vector, 
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;text_dense&quot;</span>, 
    <span class="hljs-string">&quot;param&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>},
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span>
}

<span class="hljs-keyword">const</span> search_param_2 = {
    <span class="hljs-string">&quot;data&quot;</span>: query_text, 
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;text_sparse&quot;</span>, 
    <span class="hljs-string">&quot;param&quot;</span>: {<span class="hljs-string">&quot;drop_ratio_search&quot;</span>: <span class="hljs-number">0.2</span>},
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span>
}

<span class="hljs-keyword">const</span> search_param_3 = {
    <span class="hljs-string">&quot;data&quot;</span>: query_multimodal_vector, 
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;image_dense&quot;</span>, 
    <span class="hljs-string">&quot;param&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>},
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> req=<span class="hljs-string">&#x27;[
    {
        &quot;data&quot;: [[0.3580376395471989, -0.6023495712049978, 0.18414012509913835, ...]],
        &quot;annsField&quot;: &quot;text_dense&quot;,
        &quot;params&quot;: {&quot;nprobe&quot;: 10},
        &quot;limit&quot;: 2
    },
    {
        &quot;data&quot;: [&quot;white headphones, quiet and comfortable&quot;],
        &quot;annsField&quot;: &quot;text_sparse&quot;,
        &quot;params&quot;: {&quot;drop_ratio_search&quot;: 0.2},
        &quot;limit&quot;: 2
    },
    {
        &quot;data&quot;: [[0.015829865178701663, 0.5264158340734488, ...]],
        &quot;annsField&quot;: &quot;image_dense&quot;,
        &quot;params&quot;: {&quot;nprobe&quot;: 10},
        &quot;limit&quot;: 2
    }
 ]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>鑑於參數<code translate="no">limit</code> 設定為 2，每個<code translate="no">AnnSearchRequest</code> 會返回 2 個搜尋結果。在本範例中，會建立 3 個<code translate="no">AnnSearchRequest</code> 實體，總共產生 6 個搜尋結果。</p>
<h3 id="Step-2-Configure-a-reranking-strategy" class="common-anchor-header">步驟 2：設定重新排序策略<button data-href="#Step-2-Configure-a-reranking-strategy" class="anchor-icon" translate="no">
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
    </button></h3><p>要合併 ANN 搜尋結果集並重新排序，選擇適當的重新排序策略是必要的。Milvus 提供多種重排策略。有關這些重新排序機制的詳細資訊，請參閱重新<a href="/docs/zh-hant/reranking">排序</a>。</p>
<p>在本範例中，由於沒有特別強調特定的搜尋查詢，我們將採用 RRFRanker 策略。</p>
<h3 id="Step-3-Perform-a-Hybrid-Search" class="common-anchor-header">步驟 3：執行混合搜尋<button data-href="#Step-3-Perform-a-Hybrid-Search" class="anchor-icon" translate="no">
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
    </button></h3><p>在啟動混合搜尋之前，請確保資料集已載入。如果集合中的任何向量欄位缺乏索引或未載入記憶體，在執行 Hybrid Search 方法時將會發生錯誤。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

res = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    reqs=reqs,
    ranker=ranker,
    limit=<span class="hljs-number">2</span>
)
<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> res:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;TopK results:&quot;</span>)
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(hit)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.ConsistencyLevel;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.HybridSearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;

<span class="hljs-type">HybridSearchReq</span> <span class="hljs-variable">hybridSearchReq</span> <span class="hljs-operator">=</span> HybridSearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .searchRequests(searchRequests)
        .ranker(reranker)
        .topK(<span class="hljs-number">2</span>)
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.hybridSearch(hybridSearchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">resultSets, err := client.HybridSearch(ctx, milvusclient.NewHybridSearchOption(
    <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-number">2</span>,
    request1,
    request2,
    request3,
).WithReranker(reranker))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs.FieldData().GetScalars())
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">loadCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>
})

<span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">RRFRanker</span>, <span class="hljs-title class_">WeightedRanker</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> search = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
  <span class="hljs-attr">data</span>: [search_param_1, search_param_2, search_param_3],
  <span class="hljs-attr">limit</span>: <span class="hljs-number">2</span>,
  <span class="hljs-attr">rerank</span>: rerank
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/advanced_search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;search\&quot;: <span class="hljs-variable">${req}</span>,
    \&quot;rerank\&quot;: {
        \&quot;strategy\&quot;:\&quot;rrf\&quot;,
        \&quot;params\&quot;: <span class="hljs-variable">${rerank}</span>
    },
    \&quot;limit\&quot;: 2
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>輸出如下：</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;[&#x27;id: 1, distance: 0.006047376897186041, entity: {}&#x27;, &#x27;id: 2, distance: 0.006422005593776703, entity: {}&#x27;]&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
<p>在為 Hybrid Search 指定<code translate="no">limit=2</code> 參數後，Milvus 會將三次搜尋所得的六個結果重新排序。最終，它們只會返回最相似的前兩個結果。</p>
