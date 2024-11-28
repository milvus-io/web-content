---
id: keyword-match.md
summary: >-
  Milvusのテキストマッチは、特定の用語に基づいた正確な文書検索を可能にします。この機能は、主に特定の条件を満たすフィルタリング検索に使用され、スカラーフィルタリングを組み込んでクエリ結果を絞り込むことができるため、スカラー条件を満たすベクトル内の類似検索が可能です。
title: テキストマッチ
---
<h1 id="Text-Match​" class="common-anchor-header">テキストマッチ<button data-href="#Text-Match​" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusのテキストマッチは、特定の用語に基づいた正確な文書検索を可能にします。この機能は主に特定の条件を満たすためのフィルタリング検索に使用され、クエリ結果を絞り込むためにスカラーフィルタリングを組み込むことができ、スカラー条件を満たすベクトル内の類似検索を可能にします。</p>
<div class="alert note">
<p>テキストマッチは、マッチした文書の関連性をスコアリングすることなく、クエリー用語の正確な出現箇所を見つけることに重点を置いています。クエリー用語の意味や重要性に基づいて最も関連性の高い文書を検索したい場合は、<a href="/docs/ja/full-text-search.md">Full Text Searchを</a>使用することをお勧めします。</p>
</div>
<h2 id="Overview" class="common-anchor-header">概要<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusは<a href="https://github.com/quickwit-oss/tantivy">Tantivyを</a>統合し、転置インデックスと用語ベースのテキスト検索を実現しています。Milvusは各テキストエントリに対して、以下の手順でインデックスを作成します。</p>
<ol>
<li><p><a href="/docs/ja/analyzer-overview.md">アナライザー</a>：アナライザは、入力テキストを個々の単語（トークン）にトークン化し、必要に応じてフィルタを適用することで処理します。これにより、Milvusはこれらのトークンに基づいたインデックスを構築することができる。</p></li>
<li><p><a href="/docs/ja/index-scalar-fields.md">インデックス作成</a>：テキスト解析後、Milvusは各トークンを含む文書に対応付ける転置インデックスを作成します。</p></li>
</ol>
<p>ユーザがテキストマッチを実行すると、転置インデックスがその用語を含む全ての文書を素早く検索するために使用される。これは、各文書を個別にスキャンするよりもはるかに高速です。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/keyword-match.png" alt="Text Match" class="doc-image" id="text-match" />
   </span> <span class="img-wrapper"> <span>テキストマッチ</span> </span></p>
<h2 id="Enable-text-match" class="common-anchor-header">テキストマッチを有効にする<button data-href="#Enable-text-match" class="anchor-icon" translate="no">
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
    </button></h2><p>テキストマッチは<code translate="no">VARCHAR</code> フィールドタイプで機能します。これは基本的にmilvusの文字列データ型です。テキスト照合を有効にするには、<code translate="no">enable_analyzer</code> と<code translate="no">enable_match</code> の両方を<code translate="no">True</code> に設定し、コレクションスキーマを定義するときにオプションでテキスト分析用のアナライザを設定します。</p>
<h3 id="Set-enableanalyzer-and-enablematch​" class="common-anchor-header"><code translate="no">enable_analyzer</code> および<code translate="no">enable_match</code>を設定します。</h3><p>特定の<code translate="no">VARCHAR</code> フィールドのテキスト照合を有効にするには、フィールドスキーマの定義時に<code translate="no">enable_analyzer</code> と<code translate="no">enable_match</code> パラメータの両方を<code translate="no">True</code> に設定します。これにより、Milvusはテキストをトークン化し、指定されたフィールドに対して転置インデックスを作成し、高速で効率的なテキストマッチを可能にします。</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType​
​
schema = MilvusClient.create_schema(auto_id=<span class="hljs-literal">True</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)​
​
schema.add_field(​
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>, ​
    datatype=DataType.VARCHAR, ​
    max_length=<span class="hljs-number">1000</span>, ​
    enable_analyzer=<span class="hljs-literal">True</span>, <span class="hljs-comment"># Whether to enable text analysis for this field​</span>
    enable_match=<span class="hljs-literal">True</span> <span class="hljs-comment"># Whether to enable text match​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> CreateCollectionReq.CollectionSchema.builder()
        .enableDynamicField(<span class="hljs-literal">false</span>)
        .build();

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">1000</span>)
        .enableAnalyzer(<span class="hljs-literal">true</span>)
        .enableMatch(<span class="hljs-literal">true</span>)
        .build());

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> schema = [
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
                    &quot;enable_analyzer&quot;: true,
                    &quot;enable_match&quot;: true
                }
            },
            {
                &quot;fieldName&quot;: &quot;sparse&quot;,
                &quot;dataType&quot;: &quot;SparseFloatVector&quot;
            }
        ]
    }&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
<h3 id="Optional-Configure-an-analyzer​" class="common-anchor-header">オプション：アナライザーの設定</h3><p>テキスト・マッチングのパフォーマンスと精度は、選択したアナライザーに依存します。異なるアナライザは様々な言語やテキスト構造に合わせて調整されているため、適切なアナライザを選択することで、特定のユースケースの検索結果に大きな影響を与えることができます。</p>
<p>デフォルトでは、Milvusは<code translate="no">standard</code> アナライザーを使用します。このアナライザーは、空白と句読点に基づいてテキストをトークン化し、40文字以上のトークンを削除し、テキストを小文字に変換します。このデフォルト設定を適用するために追加のパラメータは必要ありません。詳細については、「<a href="/docs/ja/standard-analyzer.md">標準</a>」を参照してください。</p>
<p>別のアナライザが必要な場合は、<code translate="no">analyzer_params</code> パラメータを使用してアナライザを設定できます。例えば、英語のテキストを処理するために<code translate="no">english</code> アナライザを適用する場合。</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">analyzer_params={​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>​
}​
​
schema.add_field(​
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>, ​
    datatype=DataType.VARCHAR, ​
    max_length=<span class="hljs-number">200</span>, ​
    enable_analyzer=<span class="hljs-literal">True</span>，​
    analyzer_params=analyzer_params,​
    enable_match=<span class="hljs-literal">True</span>, ​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>, <span class="hljs-title class_">Object</span>&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>);
schema.<span class="hljs-title function_">addField</span>(<span class="hljs-title class_">AddFieldReq</span>.<span class="hljs-title function_">builder</span>()
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;text&quot;</span>)
        .<span class="hljs-title function_">dataType</span>(<span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>)
        .<span class="hljs-title function_">maxLength</span>(<span class="hljs-number">200</span>)
        .<span class="hljs-title function_">enableAnalyzer</span>(<span class="hljs-literal">true</span>)
        .<span class="hljs-title function_">analyzerParams</span>(analyzerParams)
        .<span class="hljs-title function_">enableMatch</span>(<span class="hljs-literal">true</span>)
        .<span class="hljs-title function_">build</span>());

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> schema = [
  {
    name: <span class="hljs-string">&quot;id&quot;</span>,
    data_type: DataType.Int64,
    is_primary_key: <span class="hljs-literal">true</span>,
  },
  {
    name: <span class="hljs-string">&quot;text&quot;</span>,
    data_type: <span class="hljs-string">&quot;VarChar&quot;</span>,
    enable_analyzer: <span class="hljs-literal">true</span>,
    enable_match: <span class="hljs-literal">true</span>,
    max_length: <span class="hljs-number">1000</span>,
    analyzer_params: { <span class="hljs-keyword">type</span>: <span class="hljs-string">&#x27;english&#x27;</span> },
  },
  {
    name: <span class="hljs-string">&quot;sparse&quot;</span>,
    data_type: DataType.SparseFloatVector,
  },
];

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
                    &quot;max_length&quot;: 200,
                    &quot;enable_analyzer&quot;: true,
                    &quot;enable_match&quot;: true,
                    &quot;analyzer_params&quot;: {&quot;type&quot;: &quot;english&quot;}
                }
            },
            {
                &quot;fieldName&quot;: &quot;my_vector&quot;,
                &quot;dataType&quot;: &quot;FloatVector&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;dim&quot;: &quot;5&quot;
                }
            }
        ]
    }&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
<p>Milvusは他にも様々な言語やシナリオに適したアナライザを提供しています。詳細については、「<a href="/docs/ja/analyzer-overview.md">概要</a>」を参照してください。</p>
<h2 id="Use-text-match" class="common-anchor-header">テキストマッチの使用<button data-href="#Use-text-match" class="anchor-icon" translate="no">
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
    </button></h2><p>コレクションスキーマでVARCHARフィールドのテキストマッチを有効にすると、<code translate="no">TEXT_MATCH</code> 式を使用してテキストマッチを実行できます。</p>
<h3 id="TEXTMATCH-expression-syntax​" class="common-anchor-header">TEXT_MATCH 式の構文</h3><p><code translate="no">TEXT_MATCH</code> 式を使用して、検索するフィールドと用語を指定します。その構文は以下のとおりです。</p>
<pre><code translate="no">TEXT_MATCH(field_name, text)​

<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p><code translate="no">field_name</code>:検索するVARCHARフィールドの名前。</p></li>
<li><p><code translate="no">text</code>:検索する条件。複数の用語は、言語や設定されている解析器に応じて、スペースやその他の適切な区切り文字で区切ることができます。</p></li>
</ul>
<p>デフォルトでは、<code translate="no">TEXT_MATCH</code> 、<strong>OR</strong>マッチング・ロジックを使用します。つまり、指定された用語のいずれかを含む文書を返します。たとえば、<code translate="no">text</code> フィールドに<code translate="no">machine</code> または<code translate="no">deep</code> という用語を含むドキュメントを検索するには、次の式を使用します。</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;machine deep&#x27;)&quot;</span>​
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-title class_">String</span> filter = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;machine deep&#x27;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;machine deep&#x27;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-keyword">export</span> filter=<span class="hljs-string">&quot;\&quot;TEXT_MATCH(text, &#x27;machine deep&#x27;)\&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>また、論理演算子を使用して複数の<code translate="no">TEXT_MATCH</code> 式を組み合わせ、<strong>AND</strong>マッチを実行することもできます。たとえば、<code translate="no">text</code> フィールドに<code translate="no">machine</code> と<code translate="no">deep</code> の両方を含む文書を検索するには、次の式を使用します。</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;machine&#x27;) and TEXT_MATCH(text, &#x27;deep&#x27;)&quot;</span>​
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-title class_">String</span> filter = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;machine&#x27;) and TEXT_MATCH(text, &#x27;deep&#x27;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;machine&#x27;) and TEXT_MATCH(text, &#x27;deep&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-keyword">export</span> filter=<span class="hljs-string">&quot;\&quot;TEXT_MATCH(text, &#x27;machine&#x27;) and TEXT_MATCH(text, &#x27;deep&#x27;)\&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Search-with-text-match​" class="common-anchor-header">テキストマッチによる検索</h3><p>テキスト・マッチをベクトル類似性検索と組み合わせて使用することで、検索範囲を狭め、検索パフォーマンスを向上させることができます。ベクトル類似検索の前にテキストマッチを使ってコレクションをフィルタリングすることで、検索が必要なドキュメントの数を減らすことができ、結果的にクエリー時間を短縮することができます。</p>
<p>この例では、<code translate="no">filter</code> 式は、指定された用語<code translate="no">keyword1</code> または<code translate="no">keyword2</code> に一致する文書のみを含むように検索結果をフィルタリングします。その後、ベクトル類似性検索は、このフィルタリングされた文書のサブセットに対して実行されます。</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match entities with `keyword1` or `keyword2`​</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;keyword1 keyword2&#x27;)&quot;</span>​
​
<span class="hljs-comment"># Assuming &#x27;embeddings&#x27; is the vector field and &#x27;text&#x27; is the VARCHAR field​</span>
result = MilvusClient.search(​
    collection_name=<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>, <span class="hljs-comment"># Your collection name​</span>
    anns_field=<span class="hljs-string">&quot;embeddings&quot;</span>, <span class="hljs-comment"># Vector field name​</span>
    data=[query_vector], <span class="hljs-comment"># Query vector​</span>
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,​
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},​
    limit=<span class="hljs-number">10</span>, <span class="hljs-comment"># Max. number of results to return​</span>
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>] <span class="hljs-comment"># Fields to return​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">String <span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;keyword1 keyword2&#x27;)&quot;</span>;

SearchResp searchResp = client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>)
        .annsField(<span class="hljs-string">&quot;embeddings&quot;</span>)
        .data(Collections.singletonList(queryVector)))
        .<span class="hljs-built_in">filter</span>(<span class="hljs-built_in">filter</span>)
        .topK(<span class="hljs-number">10</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Match entities with `keyword1` or `keyword2`</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;keyword1 keyword2&#x27;)&quot;</span>;

<span class="hljs-comment">// Assuming &#x27;embeddings&#x27; is the vector field and &#x27;text&#x27; is the VARCHAR field</span>
<span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.search(
    collection_name: <span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>, <span class="hljs-comment">// Your collection name</span>
    anns_field: <span class="hljs-string">&quot;embeddings&quot;</span>, <span class="hljs-comment">// Vector field name</span>
    data: [query_vector], <span class="hljs-comment">// Query vector</span>
    filter: filter,
    <span class="hljs-keyword">params</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>},
    limit: <span class="hljs-number">10</span>, <span class="hljs-comment">// Max. number of results to return</span>
    output_fields: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>] <span class="hljs-comment">//Fields to return</span>
);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> filter=<span class="hljs-string">&quot;\&quot;TEXT_MATCH(text, &#x27;keyword1 keyword2&#x27;)\&quot;&quot;</span>

<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;demo2&quot;,
    &quot;annsField&quot;: &quot;my_vector&quot;,
    &quot;data&quot;: [[0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104]],
    &quot;filter&quot;: &#x27;</span><span class="hljs-string">&quot;<span class="hljs-variable">$filter</span>&quot;</span><span class="hljs-string">&#x27;,
    &quot;searchParams&quot;: {
        &quot;params&quot;: {
            &quot;nprobe&quot;: 10
        }
    },
    &quot;limit&quot;: 3,
    &quot;outputFields&quot;: [&quot;text&quot;,&quot;id&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Query-with-text-match​" class="common-anchor-header">テキストマッチによるクエリー</h3><p>テキストマッチは、クエリー操作のスカラーフィルタリングにも使うことができる。<code translate="no">query()</code> メソッドの<code translate="no">expr</code> パラメータに<code translate="no">TEXT_MATCH</code> 式を指定することで、与えられた条件にマッチするドキュメントを取得することができます。</p>
<p>以下の例は、<code translate="no">text</code> フィールドが<code translate="no">keyword1</code> と<code translate="no">keyword2</code> の両方の用語を含むドキュメントを検索します。</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match entities with both `keyword1` and `keyword2`​</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;keyword1&#x27;) and TEXT_MATCH(text, &#x27;keyword2&#x27;)&quot;</span>​
​
result = MilvusClient.query(​
    collection_name=<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>,​
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>, ​
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">String <span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;keyword1&#x27;) and TEXT_MATCH(text, &#x27;keyword2&#x27;)&quot;</span>;

QueryResp queryResp = client.query(QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>)
        .<span class="hljs-built_in">filter</span>(<span class="hljs-built_in">filter</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>))
        .build()
);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Match entities with both `keyword1` and `keyword2`</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;keyword1&#x27;) and TEXT_MATCH(text, &#x27;keyword2&#x27;)&quot;</span>;

<span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>(
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>,
    <span class="hljs-attr">filter</span>: filter, 
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> filter=<span class="hljs-string">&quot;\&quot;TEXT_MATCH(text, &#x27;keyword1&#x27;) and TEXT_MATCH(text, &#x27;keyword2&#x27;)\&quot;&quot;</span>

<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;demo2&quot;,
    &quot;filter&quot;: &#x27;</span><span class="hljs-string">&quot;<span class="hljs-variable">$filter</span>&quot;</span><span class="hljs-string">&#x27;,
    &quot;outputFields&quot;: [&quot;id&quot;, &quot;text&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Considerations" class="common-anchor-header">注意点<button data-href="#Considerations" class="anchor-icon" translate="no">
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
<li><p>フィールドのテキスト・マッチを有効にすると、転置インデックスが作成され、 ストレージ・リソースが消費されます。この機能を有効にするかどうかは、テキストのサイズや一意なトークン、使用する解析器によって異なるので、ストレージへの影響を考慮してください。</p></li>
<li><p>スキーマでアナライザを定義すると、その設定はそのコレクションに対して永続的になります。別のアナライザの方がニーズに合っていると判断した場合は、既存のコレクションを削除して、必要なアナライザ設定で新しいコレクションを作成することを検討できます。</p></li>
</ul>
