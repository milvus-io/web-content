---
id: multi-vector-search.md
title: マルチベクトルハイブリッド検索
summary: >-
  多くのアプリケーションでは、タイトルや説明文といった豊富な情報、あるいはテキスト、画像、音声といった複数のモダリティを用いてオブジェクトを検索することができます。例えば、テキストと画像を含むツイートについては、テキストまたは画像のいずれかが検索クエリの意味内容と一致する場合、そのツイートが検索対象となります。
  ハイブリッド検索は、こうした多様なフィールドにわたる検索を組み合わせることで、検索体験を向上させます。Milvusは、複数のベクトルフィールドでの検索を可能にし、複数の近似最近傍法（ANN）検索を同時に実行することで、これをサポートしています。
  マルチベクトル・ハイブリッド検索は、テキストと画像の両方を検索したい場合、同じオブジェクトを記述する複数のテキストフィールドを検索したい場合、あるいは検索品質を向上させるために高密度ベクトルと疎ベクトルを検索したい場合に特に有用です。
---
<h1 id="Multi-Vector-Hybrid-Search" class="common-anchor-header">マルチベクトルハイブリッド検索<button data-href="#Multi-Vector-Hybrid-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>多くのアプリケーションにおいて、オブジェクトはタイトルや説明文といった豊富な情報、あるいはテキスト、画像、音声といった複数のモダリティを用いて検索することができます。例えば、テキストと画像を含むツイートについては、テキストまたは画像のいずれかが検索クエリの意味内容と一致すれば、そのツイートが検索対象となります。 ハイブリッド検索は、こうした多様なフィールドにわたる検索を組み合わせることで、検索体験を向上させます。Milvusは、複数のベクトルフィールドでの検索を可能にし、複数の近似最近傍法（ANN）検索を同時に実行することで、これをサポートしています。 マルチベクトルハイブリッド検索は、テキストと画像の両方を検索したい場合、同じオブジェクトを記述する複数のテキストフィールドを検索したい場合、あるいは検索品質を向上させるために高密度ベクトルと疎ベクトルを検索したい場合に特に有用です。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/hybrid-search-workflow.png" alt="Hybrid Search Workflow" class="doc-image" id="hybrid-search-workflow" /> 
   <span>ハイブリッド検索のワークフロー</span>
  
 </span></p>
<p>マルチベクトルハイブリッド検索は、異なる検索手法を統合したり、さまざまなモダリティの埋め込みを横断したりします：</p>
<ul>
<li><p><strong>疎・密ベクトル検索</strong>：<a href="/docs/ja/dense-vector.md">密ベクトルは</a>意味的な関係を捉えるのに優れており、一方、<a href="/docs/ja/sparse_vector.md">疎ベクトルは</a>正確なキーワードマッチングに非常に効果的です。 ハイブリッド検索は、これらのアプローチを組み合わせることで、広範な概念的理解と正確な用語の関連性の両方を提供し、検索結果の質を向上させます。各手法の強みを活かすことで、ハイブリッド検索は個々のアプローチの限界を克服し、複雑なクエリに対してより優れたパフォーマンスを発揮します。ここでは、セマンティック検索と全文検索を組み合わせたハイブリッド検索に関するより詳細な<a href="/docs/ja/full_text_search_with_milvus.md">ガイド</a>をご紹介します。</p></li>
<li><p><strong>マルチモーダルベクトル検索</strong>：マルチモーダルベクトル検索は、テキスト、画像、音声など、さまざまなデータタイプを横断して検索できる強力な技術です。このアプローチの主な利点は、異なるモダリティを統合し、シームレスで一貫性のある検索体験を実現できる点にあります。 例えば、商品検索において、ユーザーはテキストクエリを入力して、テキストと画像の両方で説明されている商品を検索することがあります。ハイブリッド検索手法を通じてこれらのモダリティを組み合わせることで、検索精度を高めたり、検索結果を充実させたりすることができます。</p></li>
</ul>
<h2 id="Example" class="common-anchor-header">例<button data-href="#Example" class="anchor-icon" translate="no">
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
    </button></h2><p>各商品にテキストによる説明と画像が含まれているという実世界のユースケースを考えてみましょう。利用可能なデータに基づいて、以下の3種類の検索を行うことができます：</p>
<ul>
<li><p><strong>セマンティックテキスト検索：</strong>これは、高密度ベクトルを用いて商品のテキスト説明を検索するものです。テキスト埋め込みは、<a href="https://zilliz.com/learn/NLP-essentials-understanding-transformers-in-AI?_gl=1*d243m9*_gcl_au*MjcyNTAwMzUyLjE3NDMxMzE1MjY.*_ga*MTQ3OTI4MDc5My4xNzQzMTMxNTI2*_ga_KKMVYG8YF2*MTc0NTkwODU0Mi45NC4xLjE3NDU5MDg4MzcuMC4wLjA.">BERTやTransformersといった</a>モデル、<a href="https://zilliz.com/learn/guide-to-using-openai-text-embedding-models">あるいはOpenAIのような</a>サービスを使用して生成できます。</p></li>
<li><p><strong>全文検索</strong>：ここでは、スパースベクトルを用いたキーワードマッチングにより、商品のテキスト説明を検索します。この目的には、<a href="https://zilliz.com/learn/mastering-bm25-a-deep-dive-into-the-algorithm-and-application-in-milvus">BM25</a>のようなアルゴリズムや、<a href="https://zilliz.com/learn/bge-m3-and-splade-two-machine-learning-models-for-generating-sparse-embeddings?_gl=1*1cde1oq*_gcl_au*MjcyNTAwMzUyLjE3NDMxMzE1MjY.*_ga*MTQ3OTI4MDc5My4xNzQzMTMxNTI2*_ga_KKMVYG8YF2*MTc0NTkwODU0Mi45NC4xLjE3NDU5MDg4MzcuMC4wLjA.#BGE-M3">BGE-M3</a>、<a href="https://zilliz.com/learn/bge-m3-and-splade-two-machine-learning-models-for-generating-sparse-embeddings?_gl=1*ov2die*_gcl_au*MjcyNTAwMzUyLjE3NDMxMzE1MjY.*_ga*MTQ3OTI4MDc5My4xNzQzMTMxNTI2*_ga_KKMVYG8YF2*MTc0NTkwODU0Mi45NC4xLjE3NDU5MDg4MzcuMC4wLjA.#SPLADE">SPLADE</a>などのスパース埋め込みモデルを利用できます。</p></li>
<li><p><strong>マルチモーダル画像検索：</strong>この手法では、高密度ベクトルを用いたテキストクエリを使用して画像を検索します。画像の埋め込みは、<a href="https://zilliz.com/learn/exploring-openai-clip-the-future-of-multimodal-ai-learning">CLIP</a>などのモデルで生成できます。</p></li>
</ul>
<p>本ガイドでは、製品の生のテキスト説明と画像埋め込みデータを用いて、上記の検索手法を組み合わせたマルチモーダルハイブリッド検索の例を解説します。マルチベクトルデータの保存方法と、再ランク付け戦略を用いたハイブリッド検索の実行方法について説明します。</p>
<h2 id="Create-a-collection-with-multiple-vector-fields" class="common-anchor-header">複数のベクトルフィールドを持つコレクションを作成する<button data-href="#Create-a-collection-with-multiple-vector-fields" class="anchor-icon" translate="no">
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
    </button></h2><p>コレクションの作成プロセスには、コレクションスキーマの定義、インデックスパラメータの設定、コレクションの作成という3つの主要なステップがあります。</p>
<h3 id="Define-schema" class="common-anchor-header">スキーマの定義<button data-href="#Define-schema" class="anchor-icon" translate="no">
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
    </button></h3><p>マルチベクトルハイブリッド検索を行うには、コレクションスキーマ内で複数のベクトルフィールドを定義する必要があります。コレクションで許可されるベクトルフィールド数の制限に関する詳細については、<a href="https://zilliverse.feishu.cn/wiki/PuxkwMWvbiHxvTkHsVkcMZP9n5f#E5yxdHM16okh57xV3WKcTJsYn0f">「Zilliz Cloudの制限</a>」を参照してください。ただし、必要に応じて、 <a href="/docs/ja/configure_proxy.md#proxymaxVectorFieldNum"><code translate="no">proxy.maxVectorFieldNum</code></a> 調整して、必要に応じて1つのコレクションに最大10個のベクトルフィールドを含めることができます。</p>
<p>この例では、以下のフィールドをスキーマに組み込んでいます：</p>
<ul>
<li><p><code translate="no">id</code>: テキスト ID を格納するための主キーとして機能します。このフィールドのデータ型は `<code translate="no">INT64</code>` です。</p></li>
<li><p><code translate="no">text</code>: テキストコンテンツを格納するために使用されます。このフィールドのデータ型は<code translate="no">VARCHAR</code> で、最大長は1000バイトです。全文検索を容易にするため、<code translate="no">enable_analyzer</code> オプションは<code translate="no">True</code> に設定されています。</p></li>
<li><p><code translate="no">text_dense</code>: テキストの密ベクトルを格納するために使用されます。このフィールドのデータ型は<code translate="no">FLOAT_VECTOR</code> で、ベクトルの次元は768です。</p></li>
<li><p><code translate="no">text_sparse</code>: テキストの疎ベクトルを格納するために使用されます。このフィールドのデータ型は<code translate="no">SPARSE_FLOAT_VECTOR</code> です。</p></li>
<li><p><code translate="no">image_dense</code>: 商品画像の密ベクトルを格納するために使用されます。このフィールドのデータ型は<code translate="no">FLOAT_VETOR</code> で、ベクトルの次元は512です。</p></li>
</ul>
<p>テキストフィールドに対して全文検索を実行するために組み込みのBM25アルゴリズムを使用するため、スキーマにMilvusの<code translate="no">Function</code> を追加する必要があります。詳細については、「<a href="/docs/ja/full-text-search.md">全文検索</a>」を参照してください。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
 <a href="#cpp">   C++</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (
    MilvusClient, DataType, Function, FunctionType
)

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># Init schema with auto_id disabled</span>
schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>)

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
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span>, <span class="hljs-title class_">FunctionType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

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
        <span class="hljs-attr">enable_analyzer</span>: <span class="hljs-literal">true</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text_dense&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
        <span class="hljs-attr">dim</span>: <span class="hljs-number">768</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text_sparse&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">SparseFloatVector</span>
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
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
        &quot;autoId&quot;: false,
        &quot;functions&quot;: [
            {
                &quot;name&quot;: &quot;text_bm25_emb&quot;,
                &quot;type&quot;: &quot;BM25&quot;,
                &quot;inputFieldNames&quot;: [&quot;text&quot;],
                &quot;outputFieldNames&quot;: [&quot;text_sparse&quot;],
                &quot;params&quot;: {}
            }
        ],
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
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

milvus::ConnectParam connect_param{<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-string">&quot;root:Milvus&quot;</span>};
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(connect_param);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

milvus::FunctionPtr function = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::Function&gt;(<span class="hljs-string">&quot;text_bm25_emb&quot;</span>, milvus::FunctionType::BM25, <span class="hljs-string">&quot;text bm25 function&quot;</span>);
function-&gt;<span class="hljs-built_in">AddInputFieldName</span>(<span class="hljs-string">&quot;text&quot;</span>);
function-&gt;<span class="hljs-built_in">AddOutputFieldName</span>(<span class="hljs-string">&quot;text_sparse&quot;</span>);

milvus::CollectionSchemaPtr schema = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::CollectionSchema&gt;();
schema-&gt;<span class="hljs-built_in">AddField</span>({<span class="hljs-string">&quot;id&quot;</span>, milvus::DataType::INT64, <span class="hljs-string">&quot;&quot;</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>});
schema-&gt;<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;text&quot;</span>, milvus::DataType::VARCHAR).<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">1000</span>).<span class="hljs-built_in">EnableAnalyzer</span>(<span class="hljs-literal">true</span>));
schema-&gt;<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;text_dense&quot;</span>, milvus::DataType::FLOAT_VECTOR).<span class="hljs-built_in">WithDimension</span>(<span class="hljs-number">768</span>));
schema-&gt;<span class="hljs-built_in">AddField</span>({<span class="hljs-string">&quot;text_sparse&quot;</span>, milvus::DataType::SPARSE_FLOAT_VECTOR});
schema-&gt;<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;image_dense&quot;</span>, milvus::DataType::FLOAT_VECTOR).<span class="hljs-built_in">WithDimension</span>(<span class="hljs-number">512</span>));
schema-&gt;<span class="hljs-built_in">AddFunction</span>(function);
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-index" class="common-anchor-header">インデックスの作成<button data-href="#Create-index" class="anchor-icon" translate="no">
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
    </button></h3><p>コレクションスキーマを定義した後、次のステップとしてベクトルインデックスを設定し、類似度メトリクスを指定します。以下の例では：</p>
<ul>
<li><p><code translate="no">text_dense_index</code>: テキストの密ベクトルフィールドに対して、メトリックタイプが `<code translate="no">IP</code> ` の `<code translate="no">AUTOINDEX</code> ` タイプのインデックスが作成されます。</p></li>
<li><p><code translate="no">text_sparse_index</code>: テキストのスパースベクトルフィールドには、タイプが<code translate="no">SPARSE_INVERTED_INDEX</code>で、メトリックタイプが<code translate="no">BM25</code> のインデックスが使用されます。</p></li>
<li><p><code translate="no">image_dense_index</code>: 画像の密ベクトルフィールドに対して、メトリックタイプが<code translate="no">IP</code> の<code translate="no">AUTOINDEX</code> 型のインデックスが作成されます。</p></li>
</ul>
<p>必要に応じて、要件やデータ型に最適な他のインデックス型を選択できます。サポートされているインデックス型の詳細については、<a href="/docs/ja/index-vector-fields.md">利用可能なインデックス型</a>に関するドキュメントを参照してください。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
 <a href="#cpp">   C++</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare index parameters</span>
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
sparseParams.put(<span class="hljs-string">&quot;inverted_index_algo&quot;</span>, <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>);
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
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> index_params = [{
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;text_dense&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;text_dense_index&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;IP&quot;</span>
},{
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;text_sparse&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;text_sparse_index&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,
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
<pre><code translate="no" class="language-cpp"><span class="hljs-function">milvus::IndexDesc <span class="hljs-title">text_sparse_index</span><span class="hljs-params">(<span class="hljs-string">&quot;text_sparse&quot;</span>, <span class="hljs-string">&quot;text_sparse_index&quot;</span>, milvus::IndexType::SPARSE_INVERTED_INDEX, milvus::MetricType::BM25)</span></span>;
text_sparse_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;inverted_index_algo&quot;</span>, <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>);

std::vector&lt;milvus::IndexDesc&gt; indexes = {
    milvus::<span class="hljs-built_in">IndexDesc</span>(<span class="hljs-string">&quot;text_dense&quot;</span>, <span class="hljs-string">&quot;text_dense_index&quot;</span>, milvus::IndexType::AUTOINDEX, milvus::MetricType::IP),
    text_sparse_index,
    milvus::<span class="hljs-built_in">IndexDesc</span>(<span class="hljs-string">&quot;image_dense&quot;</span>, <span class="hljs-string">&quot;image_dense_index&quot;</span>, milvus::IndexType::AUTOINDEX, milvus::MetricType::IP),
};
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-collection" class="common-anchor-header">コレクションの作成<button data-href="#Create-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>前の2つの手順で設定したコレクションスキーマとインデックスを使用して、<code translate="no">demo</code> という名前のコレクションを作成します。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
 <a href="#cpp">   C++</a>
</div>
<pre><code translate="no" class="language-python">client.create_collection(
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
        WithIndexOptions(indexOption1, indexOption2, indexOption3))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">fields</span>: fields,
    <span class="hljs-attr">functions</span>: functions,
    <span class="hljs-attr">index_params</span>: index_params,
})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">status = client-&gt;<span class="hljs-built_in">CreateCollection</span>(milvus::<span class="hljs-built_in">CreateCollectionRequest</span>()
                                      .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                                      .<span class="hljs-built_in">WithCollectionSchema</span>(schema)
                                      .<span class="hljs-built_in">WithIndexes</span>(std::<span class="hljs-built_in">move</span>(indexes)));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Insert-data" class="common-anchor-header">データの挿入<button data-href="#Insert-data" class="anchor-icon" translate="no">
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
    </button></h2><p>このセクションでは、先に定義したスキーマに基づいて、<code translate="no">my_collection</code> コレクションにデータを挿入します。挿入の際は、自動生成される値を持つフィールドを除き、すべてのフィールドに正しい形式のデータが指定されていることを確認してください。この例では：</p>
<ul>
<li><p><code translate="no">id</code>: 製品IDを表す整数</p></li>
<li><p><code translate="no">text</code>: 製品の説明を含む文字列</p></li>
<li><p><code translate="no">text_dense</code>: テキスト説明の密な埋め込みを表す 768 個の浮動小数点値のリスト</p></li>
<li><p><code translate="no">image_dense</code>: 商品画像の密な埋め込みを表す512個の浮動小数点値のリスト</p></li>
</ul>
<p>各フィールドの密な埋め込みを生成するために、同じモデルを使用しても、異なるモデルを使用しても構いません。この例では、2つの密な埋め込みの次元が異なっており、異なるモデルによって生成されたことを示唆しています。後で各検索を定義する際は、適切なクエリ埋め込みを生成するために、対応するモデルを使用するようにしてください。</p>
<p>この例では、テキストフィールドからスパース埋め込みを生成するために組み込みの BM25 関数を使用しているため、スパースベクトルを手動で指定する必要はありません。ただし、BM25 を使用しない場合は、スパース埋め込みを事前に計算して、自身で提供する必要があります。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
 <a href="#cpp">   C++</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random

<span class="hljs-comment"># Generate example vectors</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">generate_dense_vector</span>(<span class="hljs-params">dim</span>):
    <span class="hljs-keyword">return</span> [random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(dim)]

data=[
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">0</span>,
        <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Red cotton t-shirt with round neck&quot;</span>,
        <span class="hljs-string">&quot;text_dense&quot;</span>: generate_dense_vector(<span class="hljs-number">768</span>),
        <span class="hljs-string">&quot;image_dense&quot;</span>: generate_dense_vector(<span class="hljs-number">512</span>)
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Wireless noise-cancelling over-ear headphones&quot;</span>,
        <span class="hljs-string">&quot;text_dense&quot;</span>: generate_dense_vector(<span class="hljs-number">768</span>),
        <span class="hljs-string">&quot;image_dense&quot;</span>: generate_dense_vector(<span class="hljs-number">512</span>)
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,
        <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Stainless steel water bottle, 500ml&quot;</span>,
        <span class="hljs-string">&quot;text_dense&quot;</span>: generate_dense_vector(<span class="hljs-number">768</span>),
        <span class="hljs-string">&quot;image_dense&quot;</span>: generate_dense_vector(<span class="hljs-number">512</span>)
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
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.InsertResp;

<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row1</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row1.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">0</span>);
row1.addProperty(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;Red cotton t-shirt with round neck&quot;</span>);
row1.add(<span class="hljs-string">&quot;text_dense&quot;</span>, gson.toJsonTree(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.3580376395471989f</span>, -<span class="hljs-number">0.6023495712049978f</span>, <span class="hljs-number">0.18414012509913835f</span>, ...}));
row1.add(<span class="hljs-string">&quot;image_dense&quot;</span>, gson.toJsonTree(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.6366019600530924f</span>, -<span class="hljs-number">0.09323198122475052f</span>, ...}));

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row2</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row2.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">1</span>);
row2.addProperty(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;Wireless noise-cancelling over-ear headphones&quot;</span>);
row2.add(<span class="hljs-string">&quot;text_dense&quot;</span>, gson.toJsonTree(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.19886812562848388f</span>, <span class="hljs-number">0.06023560599112088f</span>, <span class="hljs-number">0.6976963061752597f</span>, ...}));
row2.add(<span class="hljs-string">&quot;image_dense&quot;</span>, gson.toJsonTree(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.6414180010301553f</span>, <span class="hljs-number">0.8976979978567611f</span>, ...}));

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row3</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row3.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">2</span>);
row3.addProperty(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;Stainless steel water bottle, 500ml&quot;</span>);
row3.add(<span class="hljs-string">&quot;text_dense&quot;</span>, gson.toJsonTree(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.43742130801983836f</span>, -<span class="hljs-number">0.5597502546264526f</span>, <span class="hljs-number">0.6457887650909682f</span>, ...}));
row3.add(<span class="hljs-string">&quot;image_dense&quot;</span>, gson.toJsonTree(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{-<span class="hljs-number">0.6901259768402174f</span>, <span class="hljs-number">0.6100500332193755f</span>, ...}));

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
    }))
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
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;data&quot;: [
        {&quot;id&quot;: 0, &quot;text&quot;: &quot;Red cotton t-shirt with round neck&quot; , &quot;text_dense&quot;: [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, ...], &quot;image_dense&quot;: [0.6366019600530924, -0.09323198122475052, ...]},
        {&quot;id&quot;: 1, &quot;text&quot;: &quot;Wireless noise-cancelling over-ear headphones&quot; , &quot;text_dense&quot;: [0.19886812562848388, 0.06023560599112088, 0.6976963061752597, ...], &quot;image_dense&quot;: [0.6414180010301553, 0.8976979978567611, ...]},
        {&quot;id&quot;: 2, &quot;text&quot;: &quot;Stainless steel water bottle, 500ml&quot; , &quot;text_dense&quot;: [0.43742130801983836, -0.5597502546264526, 0.6457887650909682, ...], &quot;image_dense&quot;: [-0.6901259768402174, 0.6100500332193755, ...]}
    ],
    &quot;collectionName&quot;: &quot;my_collection&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;random&gt;</span></span>

<span class="hljs-function">std::vector&lt;<span class="hljs-type">float</span>&gt;
<span class="hljs-title">GenerateFloatVector</span><span class="hljs-params">(<span class="hljs-type">int</span> dimension)</span> </span>{
    std::random_device rd;
    <span class="hljs-function">std::mt19937 <span class="hljs-title">ran</span><span class="hljs-params">(rd())</span></span>;
    <span class="hljs-function">std::uniform_real_distribution&lt;<span class="hljs-type">float</span>&gt; <span class="hljs-title">float_gen</span><span class="hljs-params">(<span class="hljs-number">0.0</span>, <span class="hljs-number">1.0</span>)</span></span>;
    <span class="hljs-function">std::vector&lt;<span class="hljs-type">float</span>&gt; <span class="hljs-title">vector</span><span class="hljs-params">(dimension)</span></span>;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">auto</span> d = <span class="hljs-number">0</span>; d &lt; dimension; ++d) {
        vector[d] = <span class="hljs-built_in">float_gen</span>(ran);
    }
    <span class="hljs-keyword">return</span> vector;
}

milvus::EntityRows data = {
    {{<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">0</span>}, {<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;Red cotton t-shirt with round neck&quot;</span>}, {<span class="hljs-string">&quot;text_dense&quot;</span>, <span class="hljs-built_in">GenerateFloatVector</span>(<span class="hljs-number">768</span>)}, {<span class="hljs-string">&quot;image_dense&quot;</span>, <span class="hljs-built_in">GenerateFloatVector</span>(<span class="hljs-number">512</span>)}},
    {{<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">1</span>}, {<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;Wireless noise-cancelling over-ear headphones&quot;</span>}, {<span class="hljs-string">&quot;text_dense&quot;</span>, <span class="hljs-built_in">GenerateFloatVector</span>(<span class="hljs-number">768</span>)}, {<span class="hljs-string">&quot;image_dense&quot;</span>, <span class="hljs-built_in">GenerateFloatVector</span>(<span class="hljs-number">512</span>)}},
    {{<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">2</span>}, {<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;Stainless steel water bottle, 500ml&quot;</span>}, {<span class="hljs-string">&quot;text_dense&quot;</span>, <span class="hljs-built_in">GenerateFloatVector</span>(<span class="hljs-number">768</span>)}, {<span class="hljs-string">&quot;image_dense&quot;</span>, <span class="hljs-built_in">GenerateFloatVector</span>(<span class="hljs-number">512</span>)}}
};

milvus::InsertResponse response;
status = client-&gt;<span class="hljs-built_in">Insert</span>(milvus::<span class="hljs-built_in">InsertRequest</span>()
                            .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                            .<span class="hljs-built_in">WithRowsData</span>(std::<span class="hljs-built_in">move</span>(data)),
                        response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Perform-Hybrid-Search" class="common-anchor-header">ハイブリッド検索の実行<button data-href="#Perform-Hybrid-Search" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Create-multiple-AnnSearchRequest-instances" class="common-anchor-header">ステップ 1: 複数の AnnSearchRequest インスタンスを作成する<button data-href="#Step-1-Create-multiple-AnnSearchRequest-instances" class="anchor-icon" translate="no">
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
    </button></h3><p>ハイブリッド検索は、<code translate="no">hybrid_search()</code> 関数内で複数の<code translate="no">AnnSearchRequest</code> を作成することで実装されます。各<code translate="no">AnnSearchRequest</code> は、特定のベクトルフィールドに対する基本的なANN検索リクエストを表します。したがって、ハイブリッド検索を実行する前に、各ベクトルフィールドに対して<code translate="no">AnnSearchRequest</code> を作成する必要があります。</p>
<p>さらに、<code translate="no">AnnSearchRequest</code> 内の<code translate="no">expr</code> パラメータを設定することで、ハイブリッド検索のフィルタリング条件を設定できます。「<a href="/docs/ja/filtered-search.md">フィルタリング検索</a>」および「<a href="/docs/ja/boolean.md">フィルタリングの解説</a>」を参照してください。</p>
<div class="alert note">
<p>ハイブリッド検索では、各<code translate="no">AnnSearchRequest</code> は1つのクエリデータのみをサポートします。</p>
</div>
<p>さまざまな検索ベクトルフィールドの機能を実証するために、サンプルクエリを使用して3つの<code translate="no">AnnSearchRequest</code> 検索リクエストを作成します。また、このプロセスでは、事前に計算された密ベクトルも使用します。検索リクエストは、以下のベクトルフィールドを対象とします：</p>
<ul>
<li><p><code translate="no">text_dense</code> セマンティックテキスト検索：文脈を理解し、単純なキーワードの一致ではなく、意味に基づいた検索と抽出を可能にします。</p></li>
<li><p><code translate="no">text_sparse</code>全文検索またはキーワードマッチング用。テキスト内の単語やフレーズの完全一致に焦点を当てます。</p></li>
<li><p><code translate="no">image_dense</code>マルチモーダルなテキストから画像への検索用。クエリのセマンティックな内容に基づいて、関連する商品画像を検索します。</p></li>
</ul>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
 <a href="#cpp">   C++</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest

query_text = <span class="hljs-string">&quot;white headphones, quiet and comfortable&quot;</span>
query_dense_vector = generate_dense_vector(<span class="hljs-number">768</span>)
query_multimodal_vector = generate_dense_vector(<span class="hljs-number">512</span>)

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
    <span class="hljs-string">&quot;param&quot;</span>: {},
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
<span class="hljs-type">float</span>[] queryMultimodal = <span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.0158298651f</span>, <span class="hljs-number">0.5264158340f</span>, ...};

List&lt;BaseVector&gt; queryTexts = Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;white headphones, quiet and comfortable&quot;</span>));
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
        .topK(<span class="hljs-number">2</span>)
        .build());
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;image_dense&quot;</span>)
        .vectors(queryMultimodalVectors)
        .params(<span class="hljs-string">&quot;{\&quot;nprobe\&quot;: 10}&quot;</span>)
        .topK(<span class="hljs-number">2</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">queryText := entity.Text(<span class="hljs-string">&quot;white headphones, quiet and comfortable&quot;</span>)
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
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>},
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span>
}

<span class="hljs-keyword">const</span> search_param_2 = {
    <span class="hljs-string">&quot;data&quot;</span>: query_text, 
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;text_sparse&quot;</span>, 
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span>
}

<span class="hljs-keyword">const</span> search_param_3 = {
    <span class="hljs-string">&quot;data&quot;</span>: query_multimodal_vector, 
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;image_dense&quot;</span>, 
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>},
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
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> query_text = <span class="hljs-string">&quot;white headphones, quiet and comfortable&quot;</span>;
<span class="hljs-keyword">auto</span> query_dense_vector = <span class="hljs-built_in">GenerateFloatVector</span>(<span class="hljs-number">768</span>);
<span class="hljs-keyword">auto</span> query_multimodal_vector = <span class="hljs-built_in">GenerateFloatVector</span>(<span class="hljs-number">512</span>);

<span class="hljs-comment">// text semantic search (dense)</span>
<span class="hljs-keyword">auto</span> sub_req1 = milvus::<span class="hljs-built_in">SubSearchRequest</span>()
                    .<span class="hljs-built_in">AddFloatVector</span>(query_dense_vector)
                    .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;text_dense&quot;</span>)
                    .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">2</span>);
sub_req<span class="hljs-number">1.</span><span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;nprobe&quot;</span>, <span class="hljs-string">&quot;10&quot;</span>);

<span class="hljs-comment">// full-text search (sparse)</span>
<span class="hljs-keyword">auto</span> sub_req2 = milvus::<span class="hljs-built_in">SubSearchRequest</span>()
                    .<span class="hljs-built_in">AddEmbeddedText</span>(query_text)
                    .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;text_sparse&quot;</span>)
                    .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">2</span>);

<span class="hljs-comment">// text-to-image search (multimodal)</span>
<span class="hljs-keyword">auto</span> sub_req3 = milvus::<span class="hljs-built_in">SubSearchRequest</span>()
                    .<span class="hljs-built_in">AddFloatVector</span>(query_multimodal_vector)
                    .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;image_dense&quot;</span>)
                    .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">2</span>);
sub_req<span class="hljs-number">3.</span><span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;nprobe&quot;</span>, <span class="hljs-string">&quot;10&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<p>パラメータ `<code translate="no">limit</code> ` が 2 に設定されているため、各 `<code translate="no">AnnSearchRequest</code> ` は 2 件の検索結果を返します。この例では、3 つの `<code translate="no">AnnSearchRequest</code> ` インスタンスが作成されるため、合計 6 件の検索結果が得られます。</p>
<h3 id="Step-2-Configure-a-reranking-strategy" class="common-anchor-header">ステップ 2: 再ランク付け戦略の設定<button data-href="#Step-2-Configure-a-reranking-strategy" class="anchor-icon" translate="no">
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
    </button></h3><p>ANNの検索結果セットを統合して再ランク付けするには、適切な再ランク付け戦略を選択することが不可欠です。Milvusでは、いくつかの種類の再ランク付け戦略が用意されています。これらの再ランク付けメカニズムの詳細については、「<a href="/docs/ja/weighted-ranker.md">Weighted Ranker</a>」または「<a href="/docs/ja/rrf-ranker.md">RRF Ranker</a>」を参照してください。</p>
<p>この例では、特定の検索クエリを特に重視するわけではないため、RRFRanker戦略を採用します。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
 <a href="#cpp">   C++</a>
</div>
<pre><code translate="no" class="language-python">ranker = Function(
    name=<span class="hljs-string">&quot;rrf&quot;</span>,
    input_field_names=[], <span class="hljs-comment"># Must be an empty list</span>
    function_type=FunctionType.RERANK,
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;rrf&quot;</span>, 
        <span class="hljs-string">&quot;k&quot;</span>: <span class="hljs-number">100</span>  <span class="hljs-comment"># Optional</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq.Function;

<span class="hljs-type">Function</span> <span class="hljs-variable">ranker</span> <span class="hljs-operator">=</span> Function.builder()
        .name(<span class="hljs-string">&quot;rrf&quot;</span>)
        .functionType(FunctionType.RERANK)
        .param(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;rrf&quot;</span>)
        .param(<span class="hljs-string">&quot;k&quot;</span>, <span class="hljs-string">&quot;100&quot;</span>)
        .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> rerank = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;rrf&#x27;</span>,
  <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;bm25 function&#x27;</span>,
  <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">RERANK</span>,
  <span class="hljs-attr">input_field_names</span>: [],
  <span class="hljs-attr">params</span>: {
      <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;rrf&quot;</span>, 
      <span class="hljs-string">&quot;k&quot;</span>: <span class="hljs-number">100</span>
  },
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">reranker := milvusclient.NewRRFReranker().WithK(<span class="hljs-number">100</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Restful</span>
<span class="hljs-built_in">export</span> rerank=<span class="hljs-string">&#x27;{&quot;k&quot;: 100}&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> ranker = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::RRFRerank&gt;(<span class="hljs-number">100</span>);
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-3-Perform-a-Hybrid-Search" class="common-anchor-header">ステップ 3: ハイブリッド検索の実行<button data-href="#Step-3-Perform-a-Hybrid-Search" class="anchor-icon" translate="no">
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
    </button></h3><p>ハイブリッド検索を開始する前に、コレクションが読み込まれていることを確認してください。コレクション内のベクトルフィールドにインデックスがない場合や、メモリに読み込まれていない場合、ハイブリッド検索メソッドの実行時にエラーが発生します。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
 <a href="#cpp">   C++</a>
</div>
<pre><code translate="no" class="language-python">res = client.hybrid_search(
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
        .ranker(ranker)
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
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/hybrid_search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
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
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">HybridSearchRequest</span>()
                   .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                   .<span class="hljs-built_in">AddSubRequest</span>(std::<span class="hljs-built_in">make_shared</span>&lt;milvus::SubSearchRequest&gt;(std::<span class="hljs-built_in">move</span>(sub_req1)))
                   .<span class="hljs-built_in">AddSubRequest</span>(std::<span class="hljs-built_in">make_shared</span>&lt;milvus::SubSearchRequest&gt;(std::<span class="hljs-built_in">move</span>(sub_req2)))
                   .<span class="hljs-built_in">AddSubRequest</span>(std::<span class="hljs-built_in">make_shared</span>&lt;milvus::SubSearchRequest&gt;(std::<span class="hljs-built_in">move</span>(sub_req3)))
                   .<span class="hljs-built_in">WithRerank</span>(ranker)
                   .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">2</span>);

milvus::SearchResponse response;
status = client-&gt;<span class="hljs-built_in">HybridSearch</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">auto</span>&amp; result : response.<span class="hljs-built_in">Results</span>().<span class="hljs-built_in">Results</span>()) {
    std::cout &lt;&lt; <span class="hljs-string">&quot;TopK results:&quot;</span> &lt;&lt; std::endl;
    milvus::EntityRows output_rows;
    status = result.<span class="hljs-built_in">OutputRows</span>(output_rows);
    <span class="hljs-keyword">for</span> (<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span>&amp; row : output_rows) {
        std::cout &lt;&lt; <span class="hljs-string">&quot;\t&quot;</span> &lt;&lt; row &lt;&lt; std::endl;
    }
}
<button class="copy-code-btn"></button></code></pre>
<p>出力は以下の通りです：</p>
<pre><code translate="no" class="language-text">[&quot;[&#x27;id: 1, distance: 0.006047376897186041, entity: {}&#x27;, &#x27;id: 2, distance: 0.006422005593776703, entity: {}&#x27;]&quot;]
<button class="copy-code-btn"></button></code></pre>
<p>ハイブリッド検索で `<code translate="no">limit=2</code> ` パラメータを指定すると、Milvus は 3 つの検索から得られた 6 件の結果を再ランク付けします。最終的に、最も類似度の高い上位 2 件の結果のみが返されます。</p>
<h2 id="Advanced-usage" class="common-anchor-header">高度な使い方<button data-href="#Advanced-usage" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Temporarily-set-a-timezone-for-a-hybrid-search" class="common-anchor-header">ハイブリッド検索でタイムゾーンを一時的に設定する<button data-href="#Temporarily-set-a-timezone-for-a-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h3><p>コレクションに<code translate="no">TIMESTAMPTZ</code> フィールドがある場合、ハイブリッド検索の呼び出しで<code translate="no">timezone</code> パラメータを設定することで、単一の操作においてデータベースまたはコレクションのデフォルトのタイムゾーンを一時的に上書きできます。これにより、操作中に<code translate="no">TIMESTAMPTZ</code> の値がどのように表示され、比較されるかが制御されます。</p>
<p><code translate="no">timezone</code> の値は、有効な<a href="https://en.wikipedia.org/wiki/List_of_tz_database_time_zones">IANAタイムゾーン識別子</a>（例：<strong>Asia/Shanghai</strong>、<strong>America/Chicago</strong>、<strong>またはUTC</strong>）でなければなりません。<code translate="no">TIMESTAMPTZ</code> フィールドの使用方法の詳細については、<a href="/docs/ja/timestamptz-field.md">「TIMESTAMPTZフィールド</a>」を参照してください。</p>
<p>以下の例は、ハイブリッド検索操作に対してタイムゾーンを一時的に設定する方法を示しています。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
 <a href="#cpp">   C++</a>
</div>
<pre><code translate="no" class="language-python">res = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    reqs=reqs,
    ranker=ranker,
    limit=<span class="hljs-number">2</span>,
<span class="highlighted-wrapper-line">    timezone=<span class="hljs-string">&quot;America/Havana&quot;</span>,</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">List&lt;AnnSearchReq&gt; tzRequests = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
tzRequests.add(AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;text_dense&quot;</span>)
        .vectors(queryDenseVectors)
        .params(<span class="hljs-string">&quot;{\&quot;nprobe\&quot;: 10}&quot;</span>)
        .topK(<span class="hljs-number">2</span>)
<span class="highlighted-wrapper-line">        .timezone(<span class="hljs-string">&quot;America/Havana&quot;</span>)</span>
        .build());
tzRequests.add(AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;text_sparse&quot;</span>)
        .vectors(queryTexts)
        .topK(<span class="hljs-number">2</span>)
<span class="highlighted-wrapper-line">        .timezone(<span class="hljs-string">&quot;America/Havana&quot;</span>)</span>
        .build());
tzRequests.add(AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;image_dense&quot;</span>)
        .vectors(queryMultimodalVectors)
        .params(<span class="hljs-string">&quot;{\&quot;nprobe\&quot;: 10}&quot;</span>)
        .topK(<span class="hljs-number">2</span>)
<span class="highlighted-wrapper-line">        .timezone(<span class="hljs-string">&quot;America/Havana&quot;</span>)</span>
        .build());

<span class="hljs-type">HybridSearchReq</span> <span class="hljs-variable">tzHybridSearchReq</span> <span class="hljs-operator">=</span> HybridSearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .searchRequests(tzRequests)
        .ranker(ranker)
        .topK(<span class="hljs-number">2</span>)
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">tzSearchResp</span> <span class="hljs-operator">=</span> client.hybridSearch(tzHybridSearchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">tzRequest1 := milvusclient.NewAnnRequest(<span class="hljs-string">&quot;text_dense&quot;</span>, <span class="hljs-number">2</span>, entity.FloatVector(queryVector)).
    WithAnnParam(index.NewIvfAnnParam(<span class="hljs-number">10</span>)).
<span class="highlighted-wrapper-line">    WithSearchParam(<span class="hljs-string">&quot;timezone&quot;</span>, <span class="hljs-string">&quot;America/Havana&quot;</span>)</span>

tzRequest2 := milvusclient.NewAnnRequest(<span class="hljs-string">&quot;text_sparse&quot;</span>, <span class="hljs-number">2</span>, queryText).
    WithAnnParam(annParam).
<span class="highlighted-wrapper-line">    WithSearchParam(<span class="hljs-string">&quot;timezone&quot;</span>, <span class="hljs-string">&quot;America/Havana&quot;</span>)</span>

tzRequest3 := milvusclient.NewAnnRequest(<span class="hljs-string">&quot;image_dense&quot;</span>, <span class="hljs-number">2</span>, entity.FloatVector(queryMultimodalVector)).
    WithAnnParam(index.NewIvfAnnParam(<span class="hljs-number">10</span>)).
<span class="highlighted-wrapper-line">    WithSearchParam(<span class="hljs-string">&quot;timezone&quot;</span>, <span class="hljs-string">&quot;America/Havana&quot;</span>)</span>

resultSets, err = client.HybridSearch(ctx, milvusclient.NewHybridSearchOption(
    <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-number">2</span>,
    tzRequest1,
    tzRequest2,
    tzRequest3,
).WithReranker(reranker))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
  <span class="hljs-attr">data</span>: [
    { ...search_param_1, <span class="hljs-attr">params</span>: { <span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-attr">timezone</span>: <span class="hljs-string">&quot;America/Havana&quot;</span> } },
    { ...search_param_2, <span class="hljs-attr">params</span>: { <span class="hljs-attr">timezone</span>: <span class="hljs-string">&quot;America/Havana&quot;</span> } },
    { ...search_param_3, <span class="hljs-attr">params</span>: { <span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-attr">timezone</span>: <span class="hljs-string">&quot;America/Havana&quot;</span> } },
  ],
  <span class="hljs-attr">limit</span>: <span class="hljs-number">2</span>,
  <span class="hljs-attr">rerank</span>: rerank
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/hybrid_search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;search&quot;: [
        {
            &quot;data&quot;: [[0.3580376395471989, -0.6023495712049978, 0.18414012509913835, ...]],
            &quot;annsField&quot;: &quot;text_dense&quot;,
            &quot;params&quot;: {&quot;nprobe&quot;: 10, &quot;timezone&quot;: &quot;America/Havana&quot;},
            &quot;limit&quot;: 2
        },
        {
            &quot;data&quot;: [&quot;white headphones, quiet and comfortable&quot;],
            &quot;annsField&quot;: &quot;text_sparse&quot;,
            &quot;params&quot;: {&quot;timezone&quot;: &quot;America/Havana&quot;},
            &quot;limit&quot;: 2
        },
        {
            &quot;data&quot;: [[0.015829865178701663, 0.5264158340734488, ...]],
            &quot;annsField&quot;: &quot;image_dense&quot;,
            &quot;params&quot;: {&quot;nprobe&quot;: 10, &quot;timezone&quot;: &quot;America/Havana&quot;},
            &quot;limit&quot;: 2
        }
    ],
    &quot;rerank&quot;: {
        &quot;strategy&quot;: &quot;rrf&quot;,
        &quot;params&quot;: {&quot;k&quot;: 100}
    },
    &quot;limit&quot;: 2
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> tz_req1 = milvus::<span class="hljs-built_in">SubSearchRequest</span>()
                   .<span class="hljs-built_in">AddFloatVector</span>(query_dense_vector)
                   .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;text_dense&quot;</span>)
<span class="highlighted-wrapper-line">                   .<span class="hljs-built_in">WithTimezone</span>(<span class="hljs-string">&quot;America/Havana&quot;</span>)</span>
                   .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">2</span>);
tz_req<span class="hljs-number">1.</span><span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;nprobe&quot;</span>, <span class="hljs-string">&quot;10&quot;</span>);

<span class="hljs-keyword">auto</span> tz_req2 = milvus::<span class="hljs-built_in">SubSearchRequest</span>()
                   .<span class="hljs-built_in">AddEmbeddedText</span>(query_text)
                   .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;text_sparse&quot;</span>)
<span class="highlighted-wrapper-line">                   .<span class="hljs-built_in">WithTimezone</span>(<span class="hljs-string">&quot;America/Havana&quot;</span>)</span>
                   .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">2</span>);

<span class="hljs-keyword">auto</span> tz_req3 = milvus::<span class="hljs-built_in">SubSearchRequest</span>()
                   .<span class="hljs-built_in">AddFloatVector</span>(query_multimodal_vector)
                   .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;image_dense&quot;</span>)
<span class="highlighted-wrapper-line">                   .<span class="hljs-built_in">WithTimezone</span>(<span class="hljs-string">&quot;America/Havana&quot;</span>)</span>
                   .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">2</span>);
tz_req<span class="hljs-number">3.</span><span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;nprobe&quot;</span>, <span class="hljs-string">&quot;10&quot;</span>);

<span class="hljs-keyword">auto</span> tz_request = milvus::<span class="hljs-built_in">HybridSearchRequest</span>()
                      .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                      .<span class="hljs-built_in">AddSubRequest</span>(std::<span class="hljs-built_in">make_shared</span>&lt;milvus::SubSearchRequest&gt;(std::<span class="hljs-built_in">move</span>(tz_req1)))
                      .<span class="hljs-built_in">AddSubRequest</span>(std::<span class="hljs-built_in">make_shared</span>&lt;milvus::SubSearchRequest&gt;(std::<span class="hljs-built_in">move</span>(tz_req2)))
                      .<span class="hljs-built_in">AddSubRequest</span>(std::<span class="hljs-built_in">make_shared</span>&lt;milvus::SubSearchRequest&gt;(std::<span class="hljs-built_in">move</span>(tz_req3)))
                      .<span class="hljs-built_in">WithRerank</span>(ranker)
                      .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">2</span>);

milvus::SearchResponse tz_response;
status = client-&gt;<span class="hljs-built_in">HybridSearch</span>(tz_request, tz_response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
