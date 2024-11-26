---
id: schema.md
title: スキーマの説明
summary: >-
  スキーマはコレクションのデータ構造を定義する。コレクションを作成する前に、スキーマの設計を行う必要があります。このページでは、コレクションのスキーマを理解し、自分でスキーマの例を設計するのに役立ちます。
---
<h1 id="Schema-Explained​" class="common-anchor-header">スキーマの説明<button data-href="#Schema-Explained​" class="anchor-icon" translate="no">
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
    </button></h1><p>スキーマはコレクションのデータ構造を定義する。コレクションを作成する前に、スキーマを設計する必要があります。このページでは、コレクションのスキーマを理解し、自分でスキーマの例を設計するのに役立ちます。</p>
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
    </button></h2><p>Zilliz Cloudでは、コレクションスキーマは、Zilliz Cloudがコレクション内のデータをどのように整理するかを定義するリレーショナルデータベースのテーブルを組み立てます。</p>
<p>よく設計されたスキーマは、データモデルを抽象化し、検索によってビジネス目標を達成できるかどうかを決定するため、不可欠です。さらに、コレクションに挿入されるすべてのデータ行はスキーマに従わなければならないため、データの一貫性と長期的な品質の維持に役立ちます。技術的な観点からは、よく定義されたスキーマは、よく整理されたカラム・データ・ストレージとすっきりしたインデックス構造につながり、検索パフォーマンスを向上させます。</p>
<p>コレクション・スキーマには、プライマリ・キー、最大4つのベクトル・フィールド、およびいくつかのスカラー・フィールドがあります。以下の図は、アーティクルをスキーマフィールドのリストにマッピングする方法を示しています。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/schema-explained.PNG" alt="Schema design" class="doc-image" id="schema-design" />
   </span> <span class="img-wrapper"> <span>スキーマの設計</span> </span></p>
<p>検索システムのデータモデル設計には、ビジネスニーズを分析し、情報をスキーマで表現されたデータモデルに抽象化することが含まれます。例えば、テキストの一部を検索するには、"埋め込み "によってリテラル文字列をベクトルに変換し、ベクトル検索を可能にすることによって、"インデックス化 "されなければならない。この必須要件以外にも、出版物のタイムスタンプや著者などのプロパティを格納することが必要な場合がある。このメタデータにより、フィルタリングによってセマンティック検索を絞り込むことができ、特定の日付以降に出版されたテキストや、特定の著者によるテキストだけを返すことができる。アプリケーションで検索結果をレンダリングするために、メインテキストと一緒にこれらのスカラーを取得することもできます。これらのテキスト片を整理するために、それぞれに整数または文字列で表される一意の識別子を割り当てる必要があります。これらの要素は洗練された検索ロジックを実現するために不可欠です。</p>
<p><a href="/docs/ja/schema-hands-on.md">スキーマ設計ハンズオンを</a>参照して、よく設計されたスキーマの作り方を把握してください。</p>
<h2 id="Create-Schema​" class="common-anchor-header">スキーマの作成<button data-href="#Create-Schema​" class="anchor-icon" translate="no">
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
    </button></h2><p>次のコード・スニペットは、スキーマの作成方法を示している。</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span>​
​
schema = <span class="hljs-title class_">MilvusClient</span>.<span class="hljs-title function_">create_schema</span>()​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;​
​
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> schema = []​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{​
    &quot;fields&quot;: []​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Add-Primary-Field​" class="common-anchor-header">プライマリ・フィールドの追加<button data-href="#Add-Primary-Field​" class="anchor-icon" translate="no">
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
    </button></h2><p>コレクションのプライマリ・フィールドは、エンティティを一意に識別する。<strong>Int64</strong>または<strong>VarChar</strong>値のみを受け入れます。以下のコード・スニペットは、プライマリ・フィールドを追加する方法を示しています。</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">schema.add_field(​
    field_name=<span class="hljs-string">&quot;my_id&quot;</span>,​
    datatype=DataType.INT64,​
    <span class="hljs-comment"># highlight-start​</span>
    is_primary=<span class="hljs-literal">True</span>,​
    auto_id=<span class="hljs-literal">False</span>,​
    <span class="hljs-comment"># highlight-end​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">common</span>.<span class="hljs-property">DataType</span>;​
<span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">collection</span>.<span class="hljs-property">request</span>.<span class="hljs-property">AddFieldReq</span>; ​
​
schema.<span class="hljs-title function_">addField</span>(<span class="hljs-title class_">AddFieldReq</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;my_id&quot;</span>)​
        .<span class="hljs-title function_">dataType</span>(<span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>)​
        <span class="hljs-comment">// highlight-start​</span>
        .<span class="hljs-title function_">isPrimaryKey</span>(<span class="hljs-literal">true</span>)​
        .<span class="hljs-title function_">autoID</span>(<span class="hljs-literal">false</span>)​
        <span class="hljs-comment">// highlight-end​</span>
        .<span class="hljs-title function_">build</span>());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_id&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,​
    <span class="hljs-comment">// highlight-start​</span>
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,​
    <span class="hljs-attr">autoID</span>: <span class="hljs-literal">false</span>​
    <span class="hljs-comment">// highlight-end​</span>
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> primaryField=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;my_id&quot;,​
    &quot;dataType&quot;: &quot;Int64&quot;,​
    &quot;isPrimary&quot;: true​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{​
    \&quot;autoID\&quot;: false,​
    \&quot;fields\&quot;: [​
        $primaryField​
    ]​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>フィールドを追加するとき、その<code translate="no">is_primary</code> プロパティを<code translate="no">True</code> に設定することで、フィールドを明示的にプライマリ・フィールドとして明確にすることができる。プライマリ・フィールドはデフォルトで<strong>Int64</strong>値を受け入れる。この場合、プライマリ・フィールドの値は<code translate="no">12345</code> と同様の整数でなければなりません。プライマリ・フィールドに<strong>VarChar</strong>値を使用する場合は、<code translate="no">my_entity_1234</code> と同様の文字列でなければなりません。</p>
<p>また、<code translate="no">autoId</code> プロパティを<code translate="no">True</code> に設定すると、データ挿入時に Zilliz Cloud が自動的にプライマリフィールドの値を割り当てるようになります。</p>
<p>詳しくは、<a href="/docs/ja/primary-field.md">プライマリフィールドとAutoIDを</a>参照してください。</p>
<h2 id="Add-Vector-Fields​" class="common-anchor-header">ベクターフィールドの追加<button data-href="#Add-Vector-Fields​" class="anchor-icon" translate="no">
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
    </button></h2><p>ベクトルフィールドは様々な疎密ベクトル埋め込みに対応しています。Zilliz Cloudでは、コレクションに4つのベクトルフィールドを追加できます。以下のコード・スニペットは、ベクトル・フィールドを追加する方法を示しています。</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">schema.add_field(​
    field_name=<span class="hljs-string">&quot;my_vector&quot;</span>,​
    datatype=DataType.FLOAT_VECTOR,​
    <span class="hljs-meta"># highlight-next-<span class="hljs-keyword">line</span>​</span>
    dim=<span class="hljs-number">5</span>​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.<span class="hljs-title function_">addField</span>(<span class="hljs-title class_">AddFieldReq</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;my_vector&quot;</span>)​
        .<span class="hljs-title function_">dataType</span>(<span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>)​
        <span class="hljs-comment">// highlight-next-line​</span>
        .<span class="hljs-title function_">dimension</span>(<span class="hljs-number">5</span>)​
        .<span class="hljs-title function_">build</span>());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_vector&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,​
    <span class="hljs-comment">// highlight-next-line​</span>
    <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span>​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> vectorField=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;my_vector&quot;,​
    &quot;dataType&quot;: &quot;FloatVector&quot;,​
    &quot;elementTypeParams&quot;: {​
        &quot;dim&quot;: 5​
    }​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{​
    \&quot;autoID\&quot;: false,​
    \&quot;fields\&quot;: [​
        <span class="hljs-variable">$primaryField</span>,​
        <span class="hljs-variable">$vectorField</span>​
    ]​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>上記のコード・スニペット内の<code translate="no">dim</code> パラメータは、ベクトル・フィールドに保持されるベクトル埋込みの次元数を示します。<code translate="no">FLOAT_VECTOR</code> の値は、ベクトル・フィールドが32ビット浮動小数点数のリストを保持することを示します。これは通常、反比例の表現に使用されます。これに加えて、Zilliz Cloudは以下のタイプのベクトル埋め込みもサポートしています。</p>
<ul>
<li><p><code translate="no">FLOAT16_VECTOR</code></p>
<p>このタイプのベクトル・フィールドは、16ビットの半精度浮動小数点数のリストを保持し、通常、メモリまたは帯域幅が制限された深層学習またはGPUベースのコンピューティング・シナリオに適用されます。</p></li>
<li><p><code translate="no">BFLOAT16_VECTOR</code></p>
<p>この型のベクトル・フィールドは、16ビット浮動小数点数のリストを保持し、精度は低下するが、指数範囲はFloat32と同じである。このタイプのデータは、精度に大きな影響を与えることなくメモリ使用量を削減できるため、ディープラーニングのシナリオでよく使用されます。</p></li>
<li><p><code translate="no">BINARY_VECTOR</code></p>
<p>このタイプのベクトル・フィールドは、0と1のリストを保持する。画像処理や情報検索シナリオでデータを表現するためのコンパクトな特徴として機能する。</p></li>
<li><p><code translate="no">SPARSE_FLOAT_VECTOR</code></p>
<p>この型のベクトル・フィールドは、非ゼロ数のリストとそのシーケンス番号を保持し、スパースなベクトル埋め込みを表現する。</p></li>
</ul>
<h2 id="Add-Scalar-Fields​" class="common-anchor-header">スカラーフィールドの追加<button data-href="#Add-Scalar-Fields​" class="anchor-icon" translate="no">
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
    </button></h2><p>一般的なケースでは、スカラーフィールドを使用してmilvusに格納されたベクトル埋め込みデータのメタデータを格納し、検索結果の正しさを向上させるためにメタデータフィルタリングによるANN検索を行うことができます。Zilliz Cloudは<strong>VarChar</strong>、<strong>Boolean</strong>、<strong>Int</strong>、Float、<strong>Double</strong>、<strong>Array</strong>、JSONなど複数のスカラーフィールドをサポートしています。</p>
<h3 id="Add-String-Fields​" class="common-anchor-header">文字列フィールドの追加</h3><p>Milvusでは、VarCharフィールドを使って文字列を格納することができます。VarCharフィールドの詳細については、<a href="/docs/ja/string.md">文字列フィールドを</a>参照してください。</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">schema.add_field(​
    field_name=<span class="hljs-string">&quot;my_varchar&quot;</span>,​
    datatype=DataType.VARCHAR,​
    <span class="hljs-meta"># highlight-next-<span class="hljs-keyword">line</span>​</span>
    max_length=<span class="hljs-number">512</span>​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.<span class="hljs-title function_">addField</span>(<span class="hljs-title class_">AddFieldReq</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;my_varchar&quot;</span>)​
        .<span class="hljs-title function_">dataType</span>(<span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>)​
        <span class="hljs-comment">// highlight-next-line​</span>
        .<span class="hljs-title function_">maxLength</span>(<span class="hljs-number">512</span>)​
        .<span class="hljs-title function_">build</span>());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_varchar&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,​
    <span class="hljs-comment">// highlight-next-line​</span>
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span>​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> varCharField=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;my_varchar&quot;,​
    &quot;dataType&quot;: &quot;VarChar&quot;,​
    &quot;elementTypeParams&quot;: {​
        &quot;max_length&quot;: 256​
    }​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{​
    \&quot;autoID\&quot;: false,​
    \&quot;fields\&quot;: [​
        <span class="hljs-variable">$primaryField</span>,​
        <span class="hljs-variable">$vectorField</span>,​
        <span class="hljs-variable">$varCharField</span>​
    ]​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-Number-Fields​" class="common-anchor-header">数値フィールドの追加</h3><p>Milvusがサポートする数値の種類は<code translate="no">Int8</code>,<code translate="no">Int16</code>,<code translate="no">Int32</code>,<code translate="no">Int64</code>,<code translate="no">Float</code>,<code translate="no">Double</code> です。数値フィールドの詳細については、<a href="/docs/ja/number.md">数値フィールドを</a>参照してください。</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">schema.<span class="hljs-title function_">add_field</span>(​
    field_name=<span class="hljs-string">&quot;my_int64&quot;</span>,​
    datatype=<span class="hljs-title class_">DataType</span>.<span class="hljs-property">INT64</span>,​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.<span class="hljs-title function_">addField</span>(<span class="hljs-title class_">AddFieldReq</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;my_int64&quot;</span>)​
        .<span class="hljs-title function_">dataType</span>(<span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>)​
        .<span class="hljs-title function_">build</span>());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_int64&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> int64Field=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;my_int64&quot;,​
    &quot;dataType&quot;: &quot;Int64&quot;​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{​
    \&quot;autoID\&quot;: false,​
    \&quot;fields\&quot;: [​
        <span class="hljs-variable">$primaryField</span>,​
        <span class="hljs-variable">$vectorField</span>,​
        <span class="hljs-variable">$varCharField</span>,​
        <span class="hljs-variable">$int64Field</span>​
    ]​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-Boolean-Fields​" class="common-anchor-header">ブール値フィールドの追加</h3><p>Milvusはブール型フィールドをサポートしています。以下のコード・スニペットは、ブーリアン・フィールドの追加方法を示しています。</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">schema.<span class="hljs-title function_">add_field</span>(​
    field_name=<span class="hljs-string">&quot;my_bool&quot;</span>,​
    datatype=<span class="hljs-title class_">DataType</span>.<span class="hljs-property">BOOL</span>,​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.<span class="hljs-title function_">addField</span>(<span class="hljs-title class_">AddFieldReq</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;my_bool&quot;</span>)​
        .<span class="hljs-title function_">dataType</span>(<span class="hljs-title class_">DataType</span>.<span class="hljs-property">Bool</span>)​
        .<span class="hljs-title function_">build</span>());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_bool&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Boolean</span>,​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> boolField=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;my_bool&quot;,​
    &quot;dataType&quot;: &quot;Boolean&quot;​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{​
    \&quot;autoID\&quot;: false,​
    \&quot;fields\&quot;: [​
        <span class="hljs-variable">$primaryField</span>,​
        <span class="hljs-variable">$vectorField</span>,​
        <span class="hljs-variable">$varCharField</span>,​
        <span class="hljs-variable">$int64Field</span>,​
        <span class="hljs-variable">$boolField</span>​
    ]​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-JSON-fields​" class="common-anchor-header">JSONフィールドの追加</h3><p>JSONフィールドは通常、半構造化JSONデータを格納します。JSONフィールドの詳細については、<a href="/docs/ja/use-json-field.md">JSONフィールドを</a>参照してください。</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">schema.<span class="hljs-title function_">add_field</span>(​
    field_name=<span class="hljs-string">&quot;my_json&quot;</span>,​
    datatype=<span class="hljs-title class_">DataType</span>.<span class="hljs-property">JSON</span>,​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.<span class="hljs-title function_">addField</span>(<span class="hljs-title class_">AddFieldReq</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;my_json&quot;</span>)​
        .<span class="hljs-title function_">dataType</span>(<span class="hljs-title class_">DataType</span>.<span class="hljs-property">JSON</span>)​
        .<span class="hljs-title function_">build</span>());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_json&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">JSON</span>,​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> jsonField=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;my_json&quot;,​
    &quot;dataType&quot;: &quot;JSON&quot;​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{​
    \&quot;autoID\&quot;: false,​
    \&quot;fields\&quot;: [​
        <span class="hljs-variable">$primaryField</span>,​
        <span class="hljs-variable">$vectorField</span>,​
        <span class="hljs-variable">$varCharField</span>,​
        <span class="hljs-variable">$int64Field</span>,​
        <span class="hljs-variable">$boolField</span>,​
        <span class="hljs-variable">$jsonField</span>​
    ]​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-Array-Fields​" class="common-anchor-header">配列フィールドの追加</h3><p>配列フィールドは要素のリストを格納します。配列フィールドのすべての要素のデータ型は同じでなければなりません。配列フィールドの詳細については、<a href="/docs/ja/array_data_field.md">配列フィールドを</a>参照してください。</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">schema.<span class="hljs-title function_">add_field</span>(​
    field_name=<span class="hljs-string">&quot;my_array&quot;</span>,​
    datatype=<span class="hljs-title class_">DataType</span>.<span class="hljs-property">ARRAY</span>,​
    element_type=<span class="hljs-title class_">DataType</span>.<span class="hljs-property">VARCHAR</span>,​
    max_capacity=<span class="hljs-number">5</span>,​
    max_length=<span class="hljs-number">512</span>,​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.<span class="hljs-title function_">addField</span>(<span class="hljs-title class_">AddFieldReq</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;my_array&quot;</span>)​
        .<span class="hljs-title function_">dataType</span>(<span class="hljs-title class_">DataType</span>.<span class="hljs-property">Array</span>)​
        .<span class="hljs-title function_">elementType</span>(<span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>)​
        .<span class="hljs-title function_">maxCapacity</span>(<span class="hljs-number">5</span>)​
        .<span class="hljs-title function_">maxLength</span>(<span class="hljs-number">512</span>)​
        .<span class="hljs-title function_">build</span>());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_array&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Array</span>,​
    <span class="hljs-attr">element_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,​
    <span class="hljs-attr">max_capacity</span>: <span class="hljs-number">5</span>,​
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span>​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> arrayField=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;my_array&quot;,​
    &quot;dataType&quot;: &quot;Array&quot;,​
    &quot;elementDataType&quot;: &quot;VarChar&quot;,​
    &quot;elementTypeParams&quot;: {​
        &quot;max_length&quot;: 512​
    }​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{​
    \&quot;autoID\&quot;: false,​
    \&quot;fields\&quot;: [​
        <span class="hljs-variable">$primaryField</span>,​
        <span class="hljs-variable">$vectorField</span>,​
        <span class="hljs-variable">$varCharField</span>,​
        <span class="hljs-variable">$int64Field</span>,​
        <span class="hljs-variable">$boolField</span>,​
        <span class="hljs-variable">$jsonField</span>,​
        <span class="hljs-variable">$arrayField</span>​
    ]​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<p></p>
