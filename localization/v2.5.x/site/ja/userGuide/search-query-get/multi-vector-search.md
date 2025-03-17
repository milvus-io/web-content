---
id: multi-vector-search.md
order: 2
summary: このガイドでは、Milvusでハイブリッド検索を実行し、結果の再順位を理解する方法を示します。
title: ハイブリッド検索
---
<h1 id="Hybrid-Search​" class="common-anchor-header">ハイブリッド検索<button data-href="#Hybrid-Search​" class="anchor-icon" translate="no">
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
    </button></h1><p>ハイブリッド検索とは、複数のANN検索を同時に行い、それらのANN検索から得られた複数の結果セットを再ランク付けし、最終的に単一の結果セットを返す検索手法である。ハイブリッド検索を使用することで、検索精度を高めることができます。Zillizは、複数のベクトル・フィールドを持つコレクションに対してハイブリッド検索を行うことをサポートしています。</p>
<p>ハイブリッド検索は、疎密ベクトル検索やマルチモーダル検索を含むシナリオで最も一般的に使用される。このガイドでは、Zillizでハイブリッド検索を行う方法を具体的な例を挙げて説明します。</p>
<h2 id="Scenarios​" class="common-anchor-header">シナリオ<button data-href="#Scenarios​" class="anchor-icon" translate="no">
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
    </button></h2><p>ハイブリッド検索は以下の2つのシナリオに適しています。</p>
<h3 id="Sparse-Dense-Vector-Search​" class="common-anchor-header">疎密ベクトル検索</h3><p>異なるタイプのベクトルは異なる情報を表現することができ、様々な埋め込みモデルを使用することで、データの異なる特徴や側面をより包括的に表現することができます。例えば、同じ文に対して異なる埋め込みモデルを使用することで、意味的な意味を表す密なベクトルと、文中の単語頻度を表す疎なベクトルを生成することができる。</p>
<ul>
<li><p><strong>スパース・ベクトル：</strong>スパースベクトルは、ベクトル次元が高く、非ゼロ値が少ないという特徴がある。この構造により、従来の情報検索アプリケーションに特に適している。ほとんどの場合、スパース・ベクトルで使用される次元数は、1つまたは複数の言語にわたる異なるトークンに対応します。各次元には、文書内のそのトークンの相対的な重要度を示す値が割り当てられます。このレイアウトは、テキストのマッチングを伴うタスクに有利です。</p></li>
<li><p><strong>密なベクトル：</strong>密なベクトルは、ニューラルネットワークに由来する埋め込みである。順序付けられた配列に配置されたとき、これらのベクトルは入力テキストの意味的本質を捉える。密なベクトルはテキスト処理に限定されるものではなく、視覚データの意味を表現するためにコンピュータビジョンでも広く使用されている。これらの密なベクトルは、通常テキスト埋め込みモデルによって生成され、ほとんどの要素またはすべての要素が非ゼロであることを特徴とする。したがって、密なベクトルは意味検索アプリケーションに特に効果的であり、テキストが完全に一致しない場合でも、ベクトル距離に基づいて最も類似した結果を返すことができる。この機能により、キーワードベースのアプローチでは見逃されがちな概念間の関係性を捉えることができ、よりニュアンスや文脈を考慮した検索結果を得ることができます。</p></li>
</ul>
<p>詳しくは、<a href="/docs/ja/sparse_vector.md">Sparse Vectorと</a> <a href="/docs/ja/dense-vector.md">Dense Vectorを</a>ご参照ください。</p>
<h3 id="Multimodal-Search​" class="common-anchor-header">マルチモーダル検索</h3><p>マルチモーダル検索とは、複数のモダリティ（画像、動画、音声、テキストなど）にまたがる非構造化データの類似検索を指す。例えば、人物は指紋、声紋、顔の特徴など様々なモダリティのデータを使って表現することができる。ハイブリッド検索は、複数の検索を同時にサポートする。例えば、指紋と声紋の両方が似ている人物を検索することができます。</p>
<h2 id="Workflow​" class="common-anchor-header">ワークフロー<button data-href="#Workflow​" class="anchor-icon" translate="no">
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
    </button></h2><p>ハイブリッド検索を行うための主なワークフローは以下の通りである。</p>
<ol>
<li><p><a href="https://zilliz.com/learn/explore-colbert-token-level-embedding-and-ranking-model-for-similarity-search#A-Quick-Recap-of-BERT">BERTや</a> <a href="https://zilliz.com/learn/NLP-essentials-understanding-transformers-in-AI">Transformersの</a>ような埋め込みモデルを使って密なベクトルを生成する。</p></li>
<li><p><a href="https://zilliz.com/learn/mastering-bm25-a-deep-dive-into-the-algorithm-and-application-in-milvus">BM25</a>、<a href="https://zilliz.com/learn/bge-m3-and-splade-two-machine-learning-models-for-generating-sparse-embeddings#BGE-M3">BGE-M3</a>、<a href="https://zilliz.com/learn/bge-m3-and-splade-two-machine-learning-models-for-generating-sparse-embeddings#SPLADE">SPLADEなどの</a>埋め込みモデルを使ってスパースベクトルを生成する。 Milvusでは、スパースベクトルを生成するために関数を使用することができます。 詳細については、<a href="/docs/ja/full-text-search.md">全文検索を</a>参照してください。</p></li>
<li><p>コレクションを作成し、密なベクトル場と疎なベクトル場の両方を含むコレクションスキーマを定義します。</p></li>
<li><p>前のステップで作成したコレクションに、スパース密なベクトルを挿入します。</p></li>
<li><p>ハイブリッド検索を実行する：密なベクトルでのANN検索は、上位K個の最も類似した結果を返し、疎なベクトルでのテキストマッチも上位K個の結果を返します。</p></li>
<li><p>正規化：上位K個の結果の2つのセットのスコアを正規化し、スコアを[0,1]の間の範囲に変換する。</p></li>
<li><p>適切な再ランク付け戦略を選択し、2つのTop-K結果セットをマージして再ランク付けし、最終的にTop-K結果セットを返す。</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/hybrid-search.png" alt="Hybrid Search Workflow" class="doc-image" id="hybrid-search-workflow" />
   </span> <span class="img-wrapper"> <span>ハイブリッド検索ワークフロー</span> </span></p>
<h2 id="Examples​" class="common-anchor-header">例<button data-href="#Examples​" class="anchor-icon" translate="no">
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
    </button></h2><p>このセクションでは、テキスト検索の精度を高めるために、疎な密度を持つベクトルでハイブリッド検索を行う方法を、具体的な例を使って説明する。</p>
<h3 id="Create-a-collection-with-multiple-vector-fields​" class="common-anchor-header">複数のベクトル・フィールドでコレクションを作成する</h3><p>コレクションを作成するプロセスには、コレクション・スキーマの定義、インデックス・パラメータの構 成、コレクションの作成の3つの部分があります。</p>
<h4 id="Define-schema​" class="common-anchor-header">スキーマの定義</h4><p>この例では、コレクションスキーマ内で複数のベクトルフィールドを定義する必要があります。現在、各コレクションはデフォルトで最大4つのベクトルフィールドを含むことができます。しかし  <a href="https://milvus.io/docs/configure_proxy.md#proxymaxVectorFieldNum"><code translate="no">proxy.maxVectorFieldNum</code></a>  の値を変更することもできます。</p>
<p>以下の例では、<code translate="no">dense</code> と<code translate="no">sparse</code> の2つのベクトル・フィールドをコレクション・スキーマとして定義しています。</p>
<ul>
<li><p><code translate="no">id</code>:このフィールドは、テキストIDを格納するプライマリキーの役割を果たす。このフィールドのデータ型はINT64である。</p></li>
<li><p><code translate="no">text</code>:このフィールドはテキストコンテンツを格納するために使用される。このフィールドのデータ型は VARCHAR で、最大長は 1000 文字である。</p></li>
<li><p><code translate="no">dense</code>:このフィールドはテキストの密なベクトルを格納するために使用される。このフィールドのデータ型はFLOAT_VECTORで、ベクトル次元は768である。</p></li>
<li><p><code translate="no">sparse</code>:このフィールドはテキストのスパース・ベクトルを格納するために使用される。このフィールドのデータ型は SPARSE_FLOAT_VECTOR です。 この例では、スパース・ベクトルを生成するために関数を使用します。</p></li>
</ul>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create a collection in customized setup mode​</span>
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (​
    MilvusClient, DataType​
)​
​
client = MilvusClient(​
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,​
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
)​
​
<span class="hljs-comment"># Create schema​</span>
schema = MilvusClient.create_schema(​
    auto_id=<span class="hljs-literal">False</span>,​
    enable_dynamic_field=<span class="hljs-literal">True</span>,​
)​
<span class="hljs-comment"># Add fields to schema​</span>
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;text&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>)​
<span class="hljs-comment"># Define a sparse vector field to generate spare vectors with BM25</span>
schema.add_field(field_name=<span class="hljs-string">&quot;sparse&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR)​
schema.add_field(field_name=<span class="hljs-string">&quot;dense&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;​
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;​
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;​
​
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()​
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)​
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)​
        .build());​
​
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)​
        .dataType(DataType.Int64)​
        .isPrimaryKey(<span class="hljs-literal">true</span>)​
        .autoID(<span class="hljs-literal">false</span>)​
        .build());​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;text&quot;</span>)​
        .dataType(DataType.VarChar)​
        .maxLength(<span class="hljs-number">1000</span>)​
        .build());​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;dense&quot;</span>)​
        .dataType(DataType.FloatVector)​
        .dimension(<span class="hljs-number">768</span>)​
        .build());​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;sparse&quot;</span>)​
        .dataType(DataType.SparseFloatVector)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// WIP​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;​
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;​
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});​
​
<span class="hljs-comment">// Create a collection in customized setup mode​</span>
<span class="hljs-comment">// Define fields​</span>
<span class="hljs-keyword">const</span> fields = [​
    {​
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>,​
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,​
        <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,​
        <span class="hljs-attr">auto_id</span>: <span class="hljs-literal">false</span>​
    },​
    {​
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text&quot;</span>,​
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,​
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>​
    },​
    {​
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;sparse&quot;</span>,​
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">SPARSE_FLOAT_VECTOR</span>​
    },​
    {​
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;dense&quot;</span>,​
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,​
        <span class="hljs-attr">dim</span>: <span class="hljs-number">768</span>​
    }​
]​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{​
        &quot;autoId&quot;: false,​
        &quot;enabledDynamicField&quot;: true,​
        &quot;fields&quot;: [​
            {​
                &quot;fieldName&quot;: &quot;id&quot;,​
                &quot;dataType&quot;: &quot;Int64&quot;,​
                &quot;isPrimary&quot;: true​
            },​
            {​
                &quot;fieldName&quot;: &quot;text&quot;,​
                &quot;dataType&quot;: &quot;VarChar&quot;,​
                &quot;elementTypeParams&quot;: {​
                    &quot;max_length&quot;: 1000​
                }​
            },​
            {​
                &quot;fieldName&quot;: &quot;sparse&quot;,​
                &quot;dataType&quot;: &quot;SparseFloatVector&quot;​
            },​
            {​
                &quot;fieldName&quot;: &quot;dense&quot;,​
                &quot;dataType&quot;: &quot;FloatVector&quot;,​
                &quot;elementTypeParams&quot;: {​
                    &quot;dim&quot;: &quot;768&quot;​
                }​
            }​
        ]​
    }&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>スパース・ベクトル検索では、全文検索機能を活用することで、スパース埋め込みベクトルの生成プロセスを簡素化できます。詳細は<a href="/docs/ja/full-text-search.md">全文検索を</a>ご覧ください。</p>
<h4 id="Define-function-to-generate-sparse-vectors​" class="common-anchor-header">スパース・ベクトルを生成する関数の定義</h4><p>スパースベクトルを生成するには、MilvusのFunction機能を使用します。以下の例では、BM25アルゴリズムを使用してスパースベクトルを生成する関数を定義しています。詳細は<a href="/docs/ja/full-text-search.md">全文検索を</a>ご参照ください。</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define function to generate sparse vectors</span>

bm25_function = Function(
    name=<span class="hljs-string">&quot;text_bm25_emb&quot;</span>, <span class="hljs-comment"># Function name</span>
    input_field_names=[<span class="hljs-string">&quot;text&quot;</span>], <span class="hljs-comment"># Name of the VARCHAR field containing raw text data</span>
    output_field_names=[<span class="hljs-string">&quot;sparse&quot;</span>], <span class="hljs-comment"># Name of the SPARSE_FLOAT_VECTOR field reserved to store generated embeddings</span>
    function_type=FunctionType.BM25,
)

schema.add_function(bm25_function)
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
<h4 id="Create-index​" class="common-anchor-header">インデックスの作成</h4><p>コレクション・スキーマを定義した後、ベクトル・インデックスと類似度メトリクスを設定する必 要がある。この例では、密なベクトル場<code translate="no">dense</code> に対して IVF_FLAT インデックスが作成され、疎なベクトル場<code translate="no">sparse</code> に対して SPARSE_INVERTED_INDEX が作成されます。サポートされているインデックスの種類については、<a href="https://milvus.io/docs/index.md?tab=floating">インデックスの説明を</a>参照してください。</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient​
​
<span class="hljs-comment"># Prepare index parameters​</span>
index_params = client.prepare_index_params()​
​
<span class="hljs-comment"># Add indexes​</span>
index_params.add_index(​
    field_name=<span class="hljs-string">&quot;dense&quot;</span>,​
    index_name=<span class="hljs-string">&quot;dense_index&quot;</span>,​
    index_type=<span class="hljs-string">&quot;IVF_FLAT&quot;</span>,​
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,​
    params={<span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">128</span>},​
)​
​
index_params.add_index(
    field_name=<span class="hljs-string">&quot;sparse&quot;</span>,
    index_name=<span class="hljs-string">&quot;sparse_index&quot;</span>,
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,  <span class="hljs-comment"># Index type for sparse vectors</span>
    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>,  <span class="hljs-comment"># Set to `BM25` when using function to generate sparse vectors</span>
    params={<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>},  <span class="hljs-comment"># The ratio of small vector values to be dropped during indexing</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">common</span>.<span class="hljs-property">IndexParam</span>;​
<span class="hljs-keyword">import</span> java.<span class="hljs-property">util</span>.*;​
​
<span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>, <span class="hljs-title class_">Object</span>&gt; denseParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();​
denseParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;nlist&quot;</span>, <span class="hljs-number">128</span>);​
<span class="hljs-title class_">IndexParam</span> indexParamForDenseField = <span class="hljs-title class_">IndexParam</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;dense&quot;</span>)​
        .<span class="hljs-title function_">indexName</span>(<span class="hljs-string">&quot;dense_index&quot;</span>)​
        .<span class="hljs-title function_">indexType</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-property">IndexType</span>.<span class="hljs-property">IVF_FLAT</span>)​
        .<span class="hljs-title function_">metricType</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-property">MetricType</span>.<span class="hljs-property">IP</span>)​
        .<span class="hljs-title function_">extraParams</span>(denseParams)​
        .<span class="hljs-title function_">build</span>();​
​
<span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>, <span class="hljs-title class_">Object</span>&gt; sparseParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();​
sparseParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>);​ <span class="hljs-comment">// Algorithm used for building and querying the index</span>
<span class="hljs-title class_">IndexParam</span> indexParamForSparseField = <span class="hljs-title class_">IndexParam</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;sparse&quot;</span>)​
        .<span class="hljs-title function_">indexName</span>(<span class="hljs-string">&quot;sparse_index&quot;</span>)​
        .<span class="hljs-title function_">indexType</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-property">IndexType</span>.<span class="hljs-property">SPARSE_INVERTED_INDEX</span>)​
        .<span class="hljs-title function_">metricType</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-property">MetricType</span>.<span class="hljs-property">BM25</span>)​
        .<span class="hljs-title function_">extraParams</span>(sparseParams)​
        .<span class="hljs-title function_">build</span>();​
​
<span class="hljs-title class_">List</span>&lt;<span class="hljs-title class_">IndexParam</span>&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();​
indexParams.<span class="hljs-title function_">add</span>(indexParamForDenseField);​
indexParams.<span class="hljs-title function_">add</span>(indexParamForSparseField);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> index_params = [{​
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;dense&quot;</span>,​
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;IVF_FLAT&quot;</span>,​
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;IP&quot;</span>​
},{​
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;sparse&quot;</span>,​
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,​
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;BM25&quot;</span>​
}]​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[​
        {​
            &quot;fieldName&quot;: &quot;dense&quot;,​
            &quot;metricType&quot;: &quot;IP&quot;,​
            &quot;indexName&quot;: &quot;dense_index&quot;,​
            &quot;indexType&quot;:&quot;IVF_FLAT&quot;,​
            &quot;params&quot;:{&quot;nlist&quot;:128}​
        },​
        {​
            &quot;fieldName&quot;: &quot;sparse&quot;,​
            &quot;metricType&quot;: &quot;BM25&quot;,​
            &quot;indexName&quot;: &quot;sparse_index&quot;,​
            &quot;indexType&quot;: &quot;SPARSE_INVERTED_INDEX&quot;​
        }​
    ]&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h4 id="Create-collection​" class="common-anchor-header">コレクションの作成</h4><p>前の2つのステップで設定したコレクションスキーマとインデックスを使用して、<code translate="no">demo</code> という名前のコレクションを作成します。</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusClient</span>​
​
client.<span class="hljs-title function_">create_collection</span>(​
    collection_name=<span class="hljs-string">&quot;hybrid_search_collection&quot;</span>,​
    schema=schema,​
    index_params=index_params​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">createCollectionReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()​
        .collectionName(<span class="hljs-string">&quot;hybrid_search_collection&quot;</span>)​
        .collectionSchema(schema)​
        .indexParams(indexParams)​
        .build();​
client.createCollection(createCollectionReq);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;hybrid_search_collection&quot;</span>,​
    <span class="hljs-attr">fields</span>: fields,​
    <span class="hljs-attr">index_params</span>: index_params,​
})​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&quot;{​
    \&quot;collectionName\&quot;: \&quot;hybrid_search_collection\&quot;,​
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,​
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Insert-data​" class="common-anchor-header">データの挿入</h3><p>疎密ベクトルをコレクション<code translate="no">demo</code> に挿入する。</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusClient</span>​
​
docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

data = [
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;text&quot;</span>: docs[<span class="hljs-number">0</span>], <span class="hljs-string">&quot;dense&quot;</span>: [<span class="hljs-number">2.7242085933685303</span>, <span class="hljs-number">6.021071434020996</span>, <span class="hljs-number">0.4754035174846649</span>, <span class="hljs-number">9.358858108520508</span>, <span class="hljs-number">5.173221111297607</span>]},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&quot;text&quot;</span>: docs[<span class="hljs-number">1</span>], <span class="hljs-string">&quot;dense&quot;</span>: [<span class="hljs-number">8.584294319152832</span>, <span class="hljs-number">2.7640628814697266</span>, <span class="hljs-number">9.558855056762695</span>, <span class="hljs-number">2.584272861480713</span>, <span class="hljs-number">4.705013275146484</span>]},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&quot;text&quot;</span>: docs[<span class="hljs-number">2</span>], <span class="hljs-string">&quot;dense&quot;</span>: [<span class="hljs-number">2.5525057315826416</span>, <span class="hljs-number">3.8815805912017822</span>, <span class="hljs-number">9.343480110168457</span>, <span class="hljs-number">7.888997554779053</span>, <span class="hljs-number">4.500918388366699</span>]},
]
​
res = client.<span class="hljs-title function_">insert</span>(​
    collection_name=<span class="hljs-string">&quot;hybrid_search_collection&quot;</span>,​
    data=data​
)​
​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;​
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;​
​
<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();​
<span class="hljs-type">float</span>[] dense1 = {<span class="hljs-number">2.7242086f</span>, <span class="hljs-number">6.0210714f</span>, <span class="hljs-number">0.47540352f</span>, <span class="hljs-number">9.3588581f</span>, <span class="hljs-number">5.1732211f</span>};
<span class="hljs-type">float</span>[] dense2 = {<span class="hljs-number">8.5842943f</span>, <span class="hljs-number">2.7640628f</span>, <span class="hljs-number">9.5588550f</span>, <span class="hljs-number">2.5842728f</span>, <span class="hljs-number">4.7050133f</span>};
<span class="hljs-type">float</span>[] dense3 = {<span class="hljs-number">2.5525057f</span>, <span class="hljs-number">3.8815806f</span>, <span class="hljs-number">9.3434801f</span>, <span class="hljs-number">7.8889976f</span>, <span class="hljs-number">4.5009184f</span>};
String[] docs = {
            <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
            <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
            <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>
};
<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row1</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row1.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">1</span>);
row1.addProperty(<span class="hljs-string">&quot;text&quot;</span>, docs[<span class="hljs-number">0</span>]);
row1.add(<span class="hljs-string">&quot;dense&quot;</span>, gson.toJsonTree(dense1));
​
<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row2</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row2.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">2</span>);
row2.addProperty(<span class="hljs-string">&quot;text&quot;</span>, docs[<span class="hljs-number">1</span>]);
row2.add(<span class="hljs-string">&quot;dense&quot;</span>, gson.toJsonTree(dense2));
​
<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row3</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row3.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">3</span>);
row3.addProperty(<span class="hljs-string">&quot;text&quot;</span>, docs[<span class="hljs-number">2</span>]);
row3.add(<span class="hljs-string">&quot;dense&quot;</span>, gson.toJsonTree(dense3));
​
List&lt;JsonObject&gt; data = Arrays.asList(row1, row2, row3);​
<span class="hljs-type">InsertReq</span> <span class="hljs-variable">insertReq</span> <span class="hljs-operator">=</span> InsertReq.builder()​
        .collectionName(<span class="hljs-string">&quot;hybrid_search_collection&quot;</span>)​
        .data(data)​
        .build();​
​
<span class="hljs-type">InsertResp</span> <span class="hljs-variable">insertResp</span> <span class="hljs-operator">=</span> client.insert(insertReq);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)​
​
<span class="hljs-keyword">const</span> docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>
];

<span class="hljs-keyword">const</span> data = [
    {
        <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>,
        <span class="hljs-attr">text</span>: docs[<span class="hljs-number">0</span>],
        <span class="hljs-attr">dense</span>: [<span class="hljs-number">2.7242085933685303</span>, <span class="hljs-number">6.021071434020996</span>, <span class="hljs-number">0.4754035174846649</span>, <span class="hljs-number">9.358858108520508</span>, <span class="hljs-number">5.173221111297607</span>]
    },
    {
        <span class="hljs-attr">id</span>: <span class="hljs-number">2</span>,
        <span class="hljs-attr">text</span>: docs[<span class="hljs-number">1</span>],
        <span class="hljs-attr">dense</span>: [<span class="hljs-number">8.584294319152832</span>, <span class="hljs-number">2.7640628814697266</span>, <span class="hljs-number">9.558855056762695</span>, <span class="hljs-number">2.584272861480713</span>, <span class="hljs-number">4.705013275146484</span>]
    },
    {
        <span class="hljs-attr">id</span>: <span class="hljs-number">3</span>,
        <span class="hljs-attr">text</span>: docs[<span class="hljs-number">2</span>],
        <span class="hljs-attr">dense</span>: [<span class="hljs-number">2.5525057315826416</span>, <span class="hljs-number">3.8815805912017822</span>, <span class="hljs-number">9.343480110168457</span>, <span class="hljs-number">7.888997554779053</span>, <span class="hljs-number">4.500918388366699</span>]
    }
];
​
<span class="hljs-keyword">var</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;hybrid_search_collection&quot;</span>,​
    <span class="hljs-attr">data</span>: data,​
})​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;data&quot;: [
            {
                &quot;id&quot;: 1,
                &quot;text&quot;: &quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;,
                &quot;dense&quot;: [2.7242085933685303, 6.021071434020996, 0.4754035174846649, 9.358858108520508, 5.173221111297607]
            },
            {
                &quot;id&quot;: 2,
                &quot;text&quot;: &quot;Alan Turing was the first person to conduct substantial research in AI.&quot;,
                &quot;dense&quot;: [8.584294319152832, 2.7640628814697266, 9.558855056762695, 2.584272861480713, 4.705013275146484]
            },
            {
                &quot;id&quot;: 3,
                &quot;text&quot;: &quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;,
                &quot;dense&quot;: [2.5525057315826416, 3.8815805912017822, 9.343480110168457, 7.888997554779053, 4.500918388366699]
            }
        ],​
    &quot;collectionName&quot;: &quot;hybrid_search_collection&quot;​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-multiple-AnnSearchRequest-instances​" class="common-anchor-header">複数のAnnSearchRequestインスタンスを作成する。</h3><p>ハイブリッド検索は、<code translate="no">hybrid_search()</code> 関数で複数の<code translate="no">AnnSearchRequest</code> を作成することで実装される。各<code translate="no">AnnSearchRequest</code> は、特定のベクトル・フィールドに対する基本的な ANN 検索リクエストを表す。したがって、ハイブリッド・サーチを行う前に、各ベクトル・フィールドの<code translate="no">AnnSearchRequest</code> を作成する必要がある。</p>
<div class="alert note">
<p>ハイブリッド検索では、各<code translate="no">AnnSearchRequest</code> は1つのクエリ・ベクトルのみをサポートする。</p>
</div>
<p>例えば、"Who started AI research? "というクエリ・テキストが既にスパース・ベクトルとデンス・ベクトルに変換されているとする。これに基づいて、次の例に示すように、<code translate="no">sparse</code> と<code translate="no">dense</code> のベクトル・フィールドに対して、それぞれ2つの<code translate="no">AnnSearchRequest</code> 検索リクエストが作成される。</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">AnnSearchRequest</span>​
​
search_param_1 = {
    <span class="hljs-string">&quot;data&quot;</span>: [[<span class="hljs-number">0.7425515055656433</span>, <span class="hljs-number">7.774101734161377</span>, <span class="hljs-number">0.7397570610046387</span>, <span class="hljs-number">2.429982900619507</span>, <span class="hljs-number">3.8253049850463867</span>]],
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;dense&quot;</span>,
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}
    },
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span>
}
request_1 = <span class="hljs-title class_">AnnSearchRequest</span>(**search_param_1)

search_param_2 = {
    <span class="hljs-string">&quot;data&quot;</span>: [<span class="hljs-string">&#x27;Who started AI research&#x27;</span>],
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;sparse&quot;</span>,
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;BM25&quot;</span>,
    },
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span>
}
request_2 = <span class="hljs-title class_">AnnSearchRequest</span>(**search_param_2)

reqs = [request_1, request_2]
​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.AnnSearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.BaseVector;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.TextVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.IndexParam;

<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">MilvusSearchRequest</span> {
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">main</span><span class="hljs-params">(String[] args)</span> {
        <span class="hljs-type">float</span>[] denseQueryVector = {
                <span class="hljs-number">0.7425515f</span>, <span class="hljs-number">7.7741017f</span>, <span class="hljs-number">0.73975706f</span>, <span class="hljs-number">2.4299829f</span>, <span class="hljs-number">3.825305f</span>
        };

        <span class="hljs-type">String</span> <span class="hljs-variable">sparseQueryText</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;Who started AI research&quot;</span>;

        List&lt;BaseVector&gt; queryDenseVectors = Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(denseQueryVector));

        List&lt;BaseVector&gt; querySparseVectors = Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">TextVec</span>(sparseQueryText));

        List&lt;AnnSearchReq&gt; searchRequests = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();

        searchRequests.add(AnnSearchReq.builder()
                .vectorFieldName(<span class="hljs-string">&quot;dense&quot;</span>)  <span class="hljs-comment">// Field Name</span>
                .vectors(queryDenseVectors) <span class="hljs-comment">// Query Vector</span>
                .metricType(IndexParam.MetricType.IP) <span class="hljs-comment">// Inner Product Metric</span>
                .params(<span class="hljs-string">&quot;{\&quot;nprobe\&quot;: 10}&quot;</span>) <span class="hljs-comment">// Search Params</span>
                .topK(<span class="hljs-number">2</span>) <span class="hljs-comment">// Limit results to top 2</span>
                .build());

        searchRequests.add(AnnSearchReq.builder()
                .vectorFieldName(<span class="hljs-string">&quot;sparse&quot;</span>) <span class="hljs-comment">// Field Name</span>
                .vectors(querySparseVectors) <span class="hljs-comment">// Query Text Vector</span>
                .metricType(IndexParam.MetricType.BM25) <span class="hljs-comment">// BM25 Metric for sparse</span>
                .params(<span class="hljs-string">&quot;{}&quot;</span>) <span class="hljs-comment">// No additional parameters for BM25</span>
                .topK(<span class="hljs-number">2</span>) <span class="hljs-comment">// Limit results to top 2</span>
                .build());

        System.out.println(<span class="hljs-string">&quot;Generated Search Requests:&quot;</span>);
        searchRequests.forEach(System.out::println);
    }
}


<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> search_param_1 = {
    <span class="hljs-string">&quot;data&quot;</span>: [[<span class="hljs-number">0.7425515055656433</span>, <span class="hljs-number">7.774101734161377</span>, <span class="hljs-number">0.7397570610046387</span>, <span class="hljs-number">2.429982900619507</span>, <span class="hljs-number">3.8253049850463867</span>]], 
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;dense&quot;</span>,
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: { <span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span> } 
    },
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span>
};

<span class="hljs-keyword">const</span> search_param_2 = {
    <span class="hljs-string">&quot;data&quot;</span>: [<span class="hljs-string">&quot;Who started AI research&quot;</span>], 
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;sparse&quot;</span>,
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;BM25&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: {} <span class="hljs-comment">// BM25 does not require extra parameters</span>
    },
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span>
};

<span class="hljs-comment">// Combine both search parameters into a single request list</span>
<span class="hljs-keyword">const</span> reqs = [search_param_1, search_param_2];

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> req=<span class="hljs-string">&#x27;[
    {
        &quot;data&quot;: [[0.7425515055656433, 7.774101734161377, 0.7397570610046387, 2.429982900619507, 3.8253049850463867]], 
        &quot;anns_field&quot;: &quot;dense&quot;,
        &quot;param&quot;: {
            &quot;metric_type&quot;: &quot;IP&quot;,
            &quot;params&quot;: {
                &quot;nprobe&quot;: 10
            }
        },
        &quot;limit&quot;: 2
    },
    {
        &quot;data&quot;: [&quot;Who started AI research&quot;],
        &quot;anns_field&quot;: &quot;sparse&quot;,
        &quot;param&quot;: {
            &quot;metric_type&quot;: &quot;BM25&quot;,
            &quot;params&quot;: {}
        },
        &quot;limit&quot;: 2
    }
]&#x27;</span>

curl -X POST <span class="hljs-string">&quot;http://your-milvus-server-address/v1/vector/search&quot;</span> \
     -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
     -d <span class="hljs-string">&quot;<span class="hljs-variable">$req</span>&quot;</span>


<button class="copy-code-btn"></button></code></pre>
<p>パラメータ<code translate="no">limit</code> は 2 に設定されているため、各<code translate="no">AnnSearchRequest</code> は 2 つの検索結果を返す。この例では、<code translate="no">AnnSearchRequest</code> が2つ作成されるため、合計4つの検索結果が返される。</p>
<h3 id="Configure-a-reranking-strategy​" class="common-anchor-header">再ランク付け戦略の設定</h3><p>2組のANN検索結果をマージしてランク付けし直すには、適切なランク付けストラテジーを選択する必要があります。Zillizは2種類のリランキング戦略をサポートしています：<strong>WeightedRankerと</strong> <strong>RRFRanker</strong>である。リランキング戦略を選択する際に考慮すべき点は、1つ以上の基本的なANN検索がベクトルフィールド上で強調されているかどうかである。</p>
<ul>
<li><p><strong>WeightedRanker</strong>：この戦略は、特定のベクトル・フィールドを強調する結果を必要とする場合に推奨される。WeightedRankerでは、特定のベクトル・フィールドに高いウェイトを割り当て、より強調することができる。例えば、マルチモーダル検索では、画像の色よりも画像のテキスト説明が重要視されるかもしれません。</p></li>
<li><p><strong>RRFRanker（Reciprocal Rank Fusion Ranker）</strong>：このストラテジーは、特定の重点がない場合に推奨される。RRFは各ベクトル場の重要度のバランスを効果的にとることができる。</p></li>
</ul>
<p>これら2つのリランキング戦略のメカニズムの詳細については、<a href="/docs/ja/reranking.md">リランキングを</a>参照。</p>
<p>以下の2つの例は、WeightedRankerとRRFRankerの再ランク戦略の使い方を示している。</p>
<ol>
<li><p><strong>例1：WeightedRankerの使用</strong></p>
<p>WeightedRankerストラテジーを使用する場合、<code translate="no">WeightedRanker</code> 関数に重み値を入力する必要があります。ハイブリッド探索の基本ANN探索数は、入力する必要のある値の数に対応する。入力値は[0,1]の範囲で、1に近いほど重要度が高いことを示す。</p>
<p><div class="multipleCode">
<a href="#python">Python </a><a href="#java">Java</a><a href="#javascript">Node.js</a><a href="#curl">cURL</a></div></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">WeightedRanker</span>​
​
ranker = <span class="hljs-title class_">WeightedRanker</span>(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.3</span>) ​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.BaseRanker;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.WeightedRanker;​
​
<span class="hljs-type">BaseRanker</span> <span class="hljs-variable">reranker</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">WeightedRanker</span>(Arrays.asList(<span class="hljs-number">0.8f</span>, <span class="hljs-number">0.3f</span>));​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> rerank = <span class="hljs-title class_">WeightedRanker</span>(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.3</span>);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> rerank=<span class="hljs-string">&#x27;{​
        &quot;strategy&quot;: &quot;ws&quot;,​
        &quot;params&quot;: {&quot;weights&quot;: [0.8,0.3]}​
    }&#x27;</span>​

<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>例2：RRFRankerの使用</strong></p>
<p>RRFRankerストラテジーを使う場合、パラメータ値<code translate="no">k</code> をRRFRankerに入力する必要がある。<code translate="no">k</code> のデフォルト値は60です。このパラメータは、異なるANN検索からのランクをどのように組み合わせるかを決定するのに役立ち、すべての検索にわたる重要性のバランスと調和を目指します。</p>
<p><div class="multipleCode">
<a href="#python">Python </a><a href="#java">Java</a><a href="#javascript">Node.js</a><a href="#curl">cURL</a></div></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">RRFRanker</span>​
​
ranker = <span class="hljs-title class_">RRFRanker</span>(<span class="hljs-number">100</span>)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.BaseRanker;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.RRFRanker;​
​
<span class="hljs-type">BaseRanker</span> <span class="hljs-variable">reranker</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">RRFRanker</span>(<span class="hljs-number">100</span>);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> rerank = <span class="hljs-title class_">RRFRanker</span>(<span class="hljs-string">&quot;100&quot;</span>);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> rerank=<span class="hljs-string">&#x27;{​
        &quot;strategy&quot;: &quot;rrf&quot;,​
        &quot;params&quot;: { &quot;k&quot;: 100}​
    }&#x27;</span>​

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Perform-a-Hybrid-Search​" class="common-anchor-header">ハイブリッド検索の実行</h3><p>ハイブリッド検索を実行する前に、コレクションをメモリにロードする必要がある。コレクション内のベクトル・フィールドにインデックスがないか、ロードされていない場合、Hybrid Searchメソッドを呼び出すときにエラーが発生する。</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient​
​
res = client.hybrid_search(​
    collection_name=<span class="hljs-string">&quot;hybrid_search_collection&quot;</span>,​
    reqs=reqs,​
    ranker=ranker,​
    limit=<span class="hljs-number">2</span>​
)​
<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> res:​
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;TopK results:&quot;</span>)​
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:​
        <span class="hljs-built_in">print</span>(hit)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.ConsistencyLevel;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.HybridSearchReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;​
​
<span class="hljs-type">HybridSearchReq</span> <span class="hljs-variable">hybridSearchReq</span> <span class="hljs-operator">=</span> HybridSearchReq.builder()​
        .collectionName(<span class="hljs-string">&quot;hybrid_search_collection&quot;</span>)​
        .searchRequests(searchRequests)​
        .ranker(reranker)​
        .topK(<span class="hljs-number">2</span>)​
        .consistencyLevel(ConsistencyLevel.BOUNDED)​
        .build();​
​
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.hybridSearch(hybridSearchReq);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)​
​
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">loadCollection</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;hybrid_search_collection&quot;</span>​
})​
​
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">RRFRanker</span>, <span class="hljs-title class_">WeightedRanker</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;​
​
<span class="hljs-keyword">const</span> search = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({​
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;hybrid_search_collection&quot;</span>,​
  <span class="hljs-attr">data</span>: [search_param_1, search_param_2],​
  <span class="hljs-attr">limit</span>: <span class="hljs-number">2</span>,​
  <span class="hljs-attr">rerank</span>: <span class="hljs-title class_">RRFRanker</span>(<span class="hljs-number">100</span>)​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/advanced_search&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&quot;{​
    \&quot;collectionName\&quot;: \&quot;hybrid_search_collection\&quot;,​
    \&quot;search\&quot;: <span class="hljs-variable">${req}</span>,​
    \&quot;rerank\&quot;: {​
        \&quot;strategy\&quot;:\&quot;rrf\&quot;,​
        \&quot;params\&quot;: {​
            \&quot;k\&quot;: 10​
        }​
    },​
    \&quot;limit\&quot;: 3,​
    \&quot;outputFields\&quot;: [​
        \&quot;user_id\&quot;,​
        \&quot;word_count\&quot;,​
        \&quot;book_describe\&quot;​
    ]​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>以下はその出力である。</p>
<pre><code translate="no" class="language-json">[<span class="hljs-string">&quot;[&#x27;id: 844, distance: 0.006047376897186041, entity: {}&#x27;, &#x27;id: 876, distance: 0.006422005593776703, entity: {}&#x27;]&quot;</span>]​

<button class="copy-code-btn"></button></code></pre>
<p>ハイブリッド検索で<code translate="no">limit=2</code> が指定されているため、Zillizはステップ3の4つの検索結果を再ランク付けし、最終的に最も類似した検索結果の上位2つだけを返します。</p>
