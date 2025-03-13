---
id: full-text-search.md
title: 全文検索
related_key: 'full, text, search'
summary: 全文検索とは、テキストデータセット中の特定の語句を含む文書を検索し、その結果を関連性に基づいてランク付けする機能である。
---
<h1 id="Full-Text-Search​BM25" class="common-anchor-header">全文検索(BM25)<button data-href="#Full-Text-Search​BM25" class="anchor-icon" translate="no">
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
    </button></h1><p>全文検索は、テキストデータセット内の特定の語句を含む文書を検索し、関連性に基づいて結果をランク付けする機能です。この機能は、正確な用語を見落とす可能性のあるセマンティック検索の限界を克服し、最も正確で文脈に関連した結果を確実に受け取ることができます。さらに、生のテキスト入力を受け付けることでベクトル検索を簡素化し、ベクトル埋め込みを手動で生成することなく、テキストデータをスパース埋め込みに自動的に変換します。</p>
<p>関連性のスコアリングにBM25アルゴリズムを使用するこの機能は、特定の検索用語に密接に一致する文書を優先的に検索する、検索拡張世代（RAG）シナリオで特に有用です。</p>
<div class="alert note">
<ul>
<li>全文検索とセマンティックベースの密なベクトル検索を統合することで、検索結果の精度と関連性を高めることができます。詳しくは<a href="/docs/ja/multi-vector-search.md">ハイブリッド検索を</a>ご参照ください。</li>
<li>全文検索はMilvus StandaloneとMilvus Distributedでご利用いただけますが、Milvus Liteではご利用いただけません。</li>
</ul>
</div>
<h2 id="Overview​" class="common-anchor-header">概要<button data-href="#Overview​" class="anchor-icon" translate="no">
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
    </button></h2><p>全文検索は、手作業による埋め込みを不要にすることで、テキストベースの検索プロセスを簡素化します。この機能は以下のようなワークフローで動作します。</p>
<ol>
<li><p><strong>テキスト入力</strong>：手動で埋め込むことなく、生のテキスト文書を挿入するか、クエリテキストを提供します。</p></li>
<li><p><strong>テキスト分析</strong>：Milvusはアナライザーを使用して、入力テキストを検索可能な個々の用語にトークン化します。 アナライザーの詳細については、<a href="/docs/ja/analyzer-overview.md">アナライザーの概要を</a>参照してください。</p></li>
<li><p><strong>関数処理</strong>：組み込み関数はトークン化された用語を受け取り、スパースベクトル表現に変換します。</p></li>
<li><p><strong>コレクションストア</strong>：Milvusは効率的な検索のために、これらのスパース埋め込みをコレクションに保存します。</p></li>
<li><p><strong>BM25スコアリング</strong>：検索中、MilvusはBM25アルゴリズムを適用して保存された文書のスコアを計算し、クエリテキストとの関連性に基づいてマッチした結果をランク付けします。</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/full-text-search.png" alt="Full text search" class="doc-image" id="full-text-search" />
   </span> <span class="img-wrapper"> <span>全文検索</span> </span></p>
<p>全文検索を使用するには、以下の主な手順に従ってください。</p>
<ol>
<li><p><a href="#Create-a-collection-for-full-text-search">コレクションを作成</a>する：必要なフィールドを持つコレクションをセットアップし、生テキストをスパース埋め込みに変換する関数を定義する。</p></li>
<li><p><a href="#Insert-text-data">データを挿入する</a>：生テキスト文書をコレクションに取り込む。</p></li>
<li><p><a href="#Perform-full-text-search">検索を実行する</a>：クエリテキストを使用してコレクションを検索し、関連する結果を取得します。</p></li>
</ol>
<h2 id="Create-a-collection-for-full-text-search​" class="common-anchor-header">全文検索用のコレクションの作成<button data-href="#Create-a-collection-for-full-text-search​" class="anchor-icon" translate="no">
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
    </button></h2><p>全文検索を有効にするには、特定のスキーマを持つコレクションを作成します。このスキーマには3つの必要なフィールドが含まれていなければなりません。</p>
<ul>
<li><p>コレクション内の各エンティティを一意に識別するプライマリ・フィールド。</p></li>
<li><p>生のテキスト文書を格納する<code translate="no">VARCHAR</code> フィールド。<code translate="no">enable_analyzer</code> 属性は<code translate="no">True</code> に設定されている。これにより、milvus はテキストを機能処理のために特定の用語にトークン化することができる。</p></li>
<li><p>Milvusが<code translate="no">VARCHAR</code> フィールド用に自動生成するスパース埋め込みを格納するために予約された<code translate="no">SPARSE_FLOAT_VECTOR</code> フィールド。</p></li>
</ul>
<h3 id="Define-the-collection-schema" class="common-anchor-header">コレクションスキーマの定義</h3><p>まず、スキーマを作成し、必要なフィールドを追加する。</p>
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
<p>この設定では</p>
<ul>
<li><p><code translate="no">id</code>: は主キーとして機能し、<code translate="no">auto_id=True</code> で自動的に生成される。</p></li>
<li><p><code translate="no">text</code>この構成では、 : が主キーとなり、 で自動的に生成されます。 : には、全文検索操作のための生のテキスト・データが格納されます。データ型は<code translate="no">VARCHAR</code> でなければなりません。<code translate="no">VARCHAR</code> はMilvusのテキスト保存用の文字列データ型です。Milvus がテキストをトークン化できるようにするには<code translate="no">enable_analyzer=True</code> を設定します。デフォルトでは、Milvusはテキスト分析に<a href="/docs/ja/standard-analyzer.md">標準アナライザを</a>使用します。別の解析器を設定するには、<a href="/docs/ja/analyzer-overview.md">概要を</a>参照してください。</p></li>
<li><p><code translate="no">sparse</code>全文検索操作のために内部で生成されたスパース埋め込みを格納するために予約されたベクトルフィールド。データ型は<code translate="no">SPARSE_FLOAT_VECTOR</code> でなければなりません。</p></li>
</ul>
<p>次に、テキストをスパース・ベクトル表現に変換する関数を定義し、スキーマに追加します。</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">bm25_function = Function(​
    name=<span class="hljs-string">&quot;text_bm25_emb&quot;</span>, <span class="hljs-comment"># Function name​</span>
    input_field_names=[<span class="hljs-string">&quot;text&quot;</span>], <span class="hljs-comment"># Name of the VARCHAR field containing raw text data​</span>
    output_field_names=[<span class="hljs-string">&quot;sparse&quot;</span>], <span class="hljs-comment"># Name of the SPARSE_FLOAT_VECTOR field reserved to store generated embeddings​</span>
    function_type=FunctionType.BM25,​
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
        .outputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;vector&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">const <span class="hljs-built_in">functions</span> = [
    {
      name: <span class="hljs-string">&#x27;text_bm25_emb&#x27;</span>,
      description: <span class="hljs-string">&#x27;bm25 function&#x27;</span>,
      <span class="hljs-built_in">type</span>: FunctionType.BM25,
      input_field_names: [<span class="hljs-string">&#x27;text&#x27;</span>],
      output_field_names: [<span class="hljs-string">&#x27;vector&#x27;</span>],
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
<table data-block-token="EfAfdS3iXoAULPxQ3mwckzTrnUb"><thead><tr><th data-block-token="O3sLd5KNXou4Egxq6XVcoNiJnMW" colspan="1" rowspan="1"><p data-block-token="QRttdgJBpo2hEuxb438c7eOgn2f">パラメータ</p>
</th><th data-block-token="SMGGduN8zo3cgXxVnwZcW0UAnbA" colspan="1" rowspan="1"><p data-block-token="LY39dA2eOoyVUUxvKwlcyyjdn3e">説明</p>
</th></tr></thead><tbody><tr><td data-block-token="Pbj3dPvuno3x6kxnCsWcTb3knag" colspan="1" rowspan="1"><p data-block-token="EeHOdxCjloFUAGxuY1CcScCTnDe"><code translate="no">name</code></p>
<p data-block-token="FzAJdVbrzozmTdxwy4fcJQkQnlh"></p>
</td><td data-block-token="VJWydnWHJoV66jx6oEPcH9lGnvh" colspan="1" rowspan="1"><p data-block-token="Clg3dWrJpo39lfxSWjVcbE7GnYm">関数の名前。この関数は、<code translate="no">text</code> フィールドの生のテキストを、<code translate="no">sparse</code> フィールドに格納される検索可能なベクトルに変換します。</p>
</td></tr><tr><td data-block-token="ShPJdlvMQoXnSHxIQ1GcoyegnEb" colspan="1" rowspan="1"><p data-block-token="HFT1dYVCioUj4PxnNSVcYIBInNh"><code translate="no">input_field_names</code></p>
</td><td data-block-token="YiZCdrUaaovWnrxef29cmpQFn9c" colspan="1" rowspan="1"><p data-block-token="YFVOd29cUovDpXx7L2zcJK37n1g">テキストからスパース・ベクトルへの変換を必要とする<code translate="no">VARCHAR</code> フィールドの名前。<code translate="no">FunctionType.BM25</code> の場合、このパラメータは1つのフィールド名のみを受け付けます。</p>
</td></tr><tr><td data-block-token="QpcMdDoXfo62aNxQfoyc2E6lneg" colspan="1" rowspan="1"><p data-block-token="D1LkdH1KIojwKDx14HUcHdDJnPh"><code translate="no">output_field_names</code></p>
</td><td data-block-token="TrvodS2xDoF6UhxeFNScRg86nuf" colspan="1" rowspan="1"><p data-block-token="CO6bdbNhQo9ZprxlGdecjs9RnEf">内部生成されたスパース・ベクトルが格納されるフィールドの名前。<code translate="no">FunctionType.BM25</code> の場合、このパラメータは1つのフィールド名のみを受け付ける。</p>
</td></tr><tr><td data-block-token="UvgkdWp5RoXa0QxL3CKcoEZVnIf" colspan="1" rowspan="1"><p data-block-token="PWZSd2E48oWB2QxqVoVcMHGxn7c"><code translate="no">function_type</code></p>
</td><td data-block-token="VdcmdmiiWoy0nex8a29clnslnQg" colspan="1" rowspan="1"><p data-block-token="Q2eSdvOqeoNa6dxcGjcc2LKinDg">使用する関数のタイプ。値を<code translate="no">FunctionType.BM25</code> に設定します。</p>
</td></tr></tbody></table>
<div class="alert note">
<p>テキストからスパース・ベクトルへの変換が必要な複数の<code translate="no">VARCHAR</code> フィールドを持つコレクションの場合は、コレクション・スキーマに個別の関数を追加し、各関数が一意の名前と<code translate="no">output_field_names</code> 値を持つようにします。</p>
</div>
<h3 id="Configure-the-index" class="common-anchor-header">インデックスの構成</h3><p>必要なフィールドと組み込み関数でスキーマを定義した後、コレクションのインデックスを設定します。このプロセスを簡素化するために、<code translate="no">AUTOINDEX</code> を<code translate="no">index_type</code> として使用します。このオプションにより、Milvusはデータの構造に基づいて最適なインデックスタイプを選択し、設定することができます。</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">index_params = client.<span class="hljs-title function_">prepare_index_params</span>()​
​
index_params.<span class="hljs-title function_">add_index</span>(​
    field_name=<span class="hljs-string">&quot;sparse&quot;</span>,​
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, ​
    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">common</span>.<span class="hljs-property">IndexParam</span>;

<span class="hljs-title class_">List</span>&lt;<span class="hljs-title class_">IndexParam</span>&gt; indexes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexes.<span class="hljs-title function_">add</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-title function_">builder</span>()
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;sparse&quot;</span>)
        .<span class="hljs-title function_">indexType</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-property">IndexType</span>.<span class="hljs-property">SPARSE_INVERTED_INDEX</span>)
        .<span class="hljs-title function_">metricType</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-property">MetricType</span>.<span class="hljs-property">BM25</span>)
        .<span class="hljs-title function_">build</span>());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> index_params = [
  {
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;sparse&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;BM25&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
  },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[
        {
            &quot;fieldName&quot;: &quot;sparse&quot;,
            &quot;metricType&quot;: &quot;BM25&quot;,
            &quot;indexType&quot;: &quot;AUTOINDEX&quot;
        }
    ]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<table data-block-token="XEoodLxOFoukWJx9aLXcH46snXc"><thead><tr><th data-block-token="PfGNdbuq9o9PEWxzAWecWWoInUf" colspan="1" rowspan="1"><p data-block-token="KX1VdsOJCoO0Exxhg8acsduwncd">パラメータ</p>
</th><th data-block-token="VNwBdAyWKoPktSxYaBtcn5rKnNb" colspan="1" rowspan="1"><p data-block-token="Oo1PduIsxo4HcMx2NRmcxvAMnld">説明</p>
</th></tr></thead><tbody><tr><td data-block-token="UxxWdkIBPoSbjOx7MO8csiFEn5d" colspan="1" rowspan="1"><p data-block-token="NYODddTbmoYoBrxPQ8ectvGxnPe"><code translate="no">field_name</code></p>
</td><td data-block-token="L2ZGdkB2voKhmsx8ezecoPxmnVf" colspan="1" rowspan="1"><p data-block-token="Y16fdZ6hPoXVlgxSTQjctsTonac">インデックスを作成するベクトルフィールドの名前。全文検索の場合は、生成されたスパース・ベクトルを格納するフィールドでなければなりません。この例では、値を<code translate="no">sparse</code> に設定します。</p>
</td></tr><tr><td data-block-token="Wn1rdzso5o8AmqxqxiqccBpCnD4" colspan="1" rowspan="1"><p data-block-token="WLDrdOzSXoiKEOxoDREctDounRf"><code translate="no">index_type</code></p>
</td><td data-block-token="I9TpdLWlXozM3Hx2Z9mcWvDHnNc" colspan="1" rowspan="1"><p data-block-token="Q3cgdK7OTo3kzXxQ1Y2cSarZned">作成するインデックスのタイプです。<code translate="no">AUTOINDEX</code> 、Milvusは自動的にインデックス設定を最適化します。インデックス設定をより細かく制御する必要がある場合は、Milvusのスパースベクタで利用可能な様々なインデックスタイプから選択することができます。詳細は<a href="https://milvus.io/docs/index.md#Indexes-supported-in-Milvus">Milvusでサポートされるインデックスを</a>参照してください。</p>
</td></tr><tr><td data-block-token="KJfgdQmD1odMgdxkG6uczBYknQh" colspan="1" rowspan="1"><p data-block-token="XVCsdz9Ulo93A2xavPtcF9Bvnec"><code translate="no">metric_type</code></p>
</td><td data-block-token="S3NHds6MTodtrsxRILIc8E1wngh" colspan="1" rowspan="1"><p data-block-token="G9i7dPczzoyJRHxyXbecrWBBn0d">全文検索機能を使用する場合は、このパラメータの値を<code translate="no">BM25</code> に設定する必要があります。</p>
</td></tr></tbody></table>
<h3 id="Create-the-collection​" class="common-anchor-header">コレクションの作成</h3><p>定義したスキーマとインデックスパラメータを使用してコレクションを作成します。</p>
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
<h2 id="Insert-text-data" class="common-anchor-header">テキストデータの挿入<button data-href="#Insert-text-data" class="anchor-icon" translate="no">
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
    </button></h2><p>コレクションとインデックスを設定したら、テキストデータを挿入する準備ができた。このプロセスでは、生のテキストを提供するだけでよい。先ほど定義した組み込み関数が、各テキスト・エントリに対応するスパース・ベクトルを自動的に生成します。</p>
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
<h2 id="Perform-full-text-search" class="common-anchor-header">全文検索の実行<button data-href="#Perform-full-text-search" class="anchor-icon" translate="no">
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
    </button></h2><p>データをコレクションに挿入したら、生テキストクエリを使用して全文検索を実行できます。Milvusは自動的にクエリをスパースベクトルに変換し、マッチした検索結果をBM25アルゴリズムを使ってランク付けし、トップK(<code translate="no">limit</code>)の結果を返します。</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">search_params = {​
    <span class="hljs-string">&#x27;params&#x27;</span>: {<span class="hljs-string">&#x27;drop_ratio_search&#x27;</span>: 0.2},​
}​
​
client.search(​
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, ​
    data=[<span class="hljs-string">&#x27;whats the focus of information retrieval?&#x27;</span>],​
    anns_field=<span class="hljs-string">&#x27;sparse&#x27;</span>,​
    <span class="hljs-built_in">limit</span>=3,​
    search_params=search_params​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">vector</span>.<span class="hljs-property">request</span>.<span class="hljs-property">SearchReq</span>;
<span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">vector</span>.<span class="hljs-property">request</span>.<span class="hljs-property">data</span>.<span class="hljs-property">EmbeddedText</span>;
<span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">vector</span>.<span class="hljs-property">response</span>.<span class="hljs-property">SearchResp</span>;

<span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>,<span class="hljs-title class_">Object</span>&gt; searchParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
searchParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;drop_ratio_search&quot;</span>, <span class="hljs-number">0.2</span>);
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
    <span class="hljs-keyword">params</span>: {<span class="hljs-string">&#x27;drop_ratio_search&#x27;</span>: <span class="hljs-number">0.2</span>},
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
            &quot;drop_ratio_search&quot;:0.2
        }
    }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<table data-block-token="M37Zdx7XdoYN41xdKtfcHcJpnqh"><thead><tr><th data-block-token="UhTwdxk3Mo5eLjxff0PcL1CHn8b" colspan="1" rowspan="1"><p data-block-token="OwUXdMhOgoRxjzx5t9ecKR9Zn6J">パラメータ</p>
</th><th data-block-token="GM88dTMzTof30QxS9O2cVyrnnJd" colspan="1" rowspan="1"><p data-block-token="Nlp5dAJY8or40nxV6auc20XHnjh">説明</p>
</th></tr></thead><tbody><tr><td data-block-token="QpGIdQ2m0oogCvxColKcNWnYnUc" colspan="1" rowspan="1"><p data-block-token="TkffdBxkKo2hVvx9gGucca46nic"><code translate="no">search_params</code></p>
</td><td data-block-token="HYemdqt6Dow9tvxOcYScmYdPn8e" colspan="1" rowspan="1"><p data-block-token="JiIOdJrBcoGIQ4xrqYycMdjnn7g">検索パラメータを含む辞書。</p>
</td></tr><tr><td data-block-token="DJDgdH5WUoZQxkxmLzQcXqcXnQh" colspan="1" rowspan="1"><p data-block-token="LKWbdw498o9mtRxm9gDcg28FnQd"><code translate="no">params.drop_ratio_search</code></p>
</td><td data-block-token="SEJ7d5y18otFTOxy7gLcvLYRnfb" colspan="1" rowspan="1"><p data-block-token="MnladDjOGoUphGxrZzXchD0anzf">検索時に無視する重要度の低い語の割合。詳細は<a href="/docs/ja/sparse_vector.md">スパース・ベクタを</a>参照。</p>
</td></tr><tr><td data-block-token="XPPYdAYUPoASg5xuIYmcyxqHnPe" colspan="1" rowspan="1"><p data-block-token="T90ndG7H0okLa4xa1wzcHQmEnEg"><code translate="no">data</code></p>
</td><td data-block-token="NMhsduxr1oUESPx2J8YcA8csnA1" colspan="1" rowspan="1"><p data-block-token="ZmEQdkdGtofQsAx9YXNcsnlHnYe">生のクエリ・テキスト。</p>
</td></tr><tr><td data-block-token="O4OVdL9BIollH1xORz3czhInnSh" colspan="1" rowspan="1"><p data-block-token="CYdGd82dRopaWrxfJ9ycWQQnnPc"><code translate="no">anns_field</code></p>
</td><td data-block-token="MsKIdxGj6oWeBExoFurcxWCnnGh" colspan="1" rowspan="1"><p data-block-token="RsMDdgo0roTSBuxYwm6cGw3inZd">内部的に生成されたスパース・ベクトルを含むフィールドの名前。</p>
</td></tr><tr><td data-block-token="G0ewd9TQ1o1RQRxZA9ucMO9tnBK" colspan="1" rowspan="1"><p data-block-token="JOyTdUmLIo5aV0x4ChOcLiDQnLh"><code translate="no">limit</code></p>
</td><td data-block-token="H21hdYGZQoQe5FxYnwCch58qn0g" colspan="1" rowspan="1"><p data-block-token="ATKidHgXoo7c7dxM7cgcE46engb">返すトップ・マッチの最大数。</p>
</td></tr></tbody></table>
<p></p>
