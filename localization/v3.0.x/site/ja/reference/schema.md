---
id: schema.md
title: スキーマの解説
summary: >-
  スキーマは、コレクションのデータ構造を定義するものです。コレクションを作成する前に、そのスキーマの設計を策定する必要があります。このページでは、コレクションのスキーマについて理解を深め、自分でサンプルスキーマを設計できるよう支援します。
---
<h1 id="Schema-Explained" class="common-anchor-header">スキーマの解説<button data-href="#Schema-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>スキーマは、コレクションのデータ構造を定義するものです。コレクションを作成する前に、そのスキーマの設計を策定する必要があります。このページでは、コレクションのスキーマについて理解を深め、実際に例となるスキーマを自分で設計できるよう支援します。</p>
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
    </button></h2><p>Milvusにおいて、コレクションスキーマはリレーショナルデータベースのテーブルに相当し、Milvusがコレクション内のデータをどのように整理するかを定義します。</p>
<p>適切に設計されたスキーマは、データモデルを抽象化し、検索を通じてビジネス目標を達成できるかどうかを決定するため、不可欠です。さらに、コレクションに挿入されるデータの各行はスキーマに従わなければならないため、データの一貫性と長期的な品質を維持するのに役立ちます。 技術的な観点からは、適切に定義されたスキーマにより、カラムデータの保存が整理され、インデックス構造が簡潔になるため、検索パフォーマンスが向上します。</p>
<p>コレクションスキーマには、主キー、少なくとも1つのベクトルフィールド、および複数のスカラーフィールドが含まれます。次の図は、記事をスキーマフィールドのリストにマッピングする方法を示しています。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/schema-design-anatomy.png" alt="Schema Design Anatomy" class="doc-image" id="schema-design-anatomy" /> 
   <span>スキーマ設計の構造</span>
  
 </span></p>
<p>検索システムのデータモデル設計には、ビジネス要件の分析と、情報をスキーマで表現されたデータモデルへと抽象化することが含まれます。例えば、テキストの検索を行うには、リテラル文字列を「埋め込み」処理によってベクトルに変換し、ベクトル検索を可能にすることで「インデックス化」する必要があります。 この必須要件に加え、公開日時や著者などの他のプロパティを保存する必要がある場合もあります。このメタデータにより、フィルタリングを通じてセマンティック検索を絞り込み、特定の日付以降に公開されたテキストや特定の著者によるテキストのみを返すことが可能になります。 また、アプリケーションで検索結果を表示するために、これらのスカラー値を本文とともに取得することもできます。これらのテキストを整理するために、それぞれに一意の識別子（整数または文字列で表現される）を割り当てる必要があります。これらの要素は、高度な検索ロジックを実現するために不可欠です。</p>
<p>適切に設計されたスキーマの作成方法については、『<a href="/docs/ja/schema-hands-on.md">スキーマ設計の実践</a>』を参照してください。</p>
<h2 id="Create-Schema" class="common-anchor-header">スキーマの作成<button data-href="#Create-Schema" class="anchor-icon" translate="no">
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
    </button></h2><p>以下のコードスニペットは、スキーマの作成方法を示しています。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

schema = MilvusClient.create_schema()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> schema = []
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>

schema := entity.NewSchema()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
    &quot;fields&quot;: []
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Add-Primary-Field" class="common-anchor-header">プライマリフィールドの追加<button data-href="#Add-Primary-Field" class="anchor-icon" translate="no">
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
    </button></h2><p>コレクション内の主キーフィールドは、エンティティを一意に識別します。<strong>Int64</strong>または<strong>VARCHAR</strong>の値のみを受け付けます。以下のコードスニペットは、主キーフィールドを追加する方法を示しています。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;my_id&quot;</span>,
    datatype=DataType.INT64,
<span class="highlighted-comment-line">    is_primary=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">    auto_id=<span class="hljs-literal">False</span>,</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq; 

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;my_id&quot;</span>)
        .dataType(DataType.Int64)
<span class="highlighted-comment-line">        .isPrimaryKey(<span class="hljs-literal">true</span>)</span>
<span class="highlighted-comment-line">        .autoID(<span class="hljs-literal">false</span>)</span>
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_id&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
<span class="highlighted-comment-line">    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">autoID</span>: <span class="hljs-literal">false</span></span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">schema.WithField(entity.NewField().WithName(<span class="hljs-string">&quot;my_id&quot;</span>).
    WithDataType(entity.FieldTypeInt64).
<span class="highlighted-comment-line">    WithIsPrimaryKey(<span class="hljs-literal">true</span>).</span>
<span class="highlighted-comment-line">    WithIsAutoID(<span class="hljs-literal">false</span>),</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> primaryField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;my_id&quot;,
    &quot;dataType&quot;: &quot;Int64&quot;,
    &quot;isPrimary&quot;: true
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
    \&quot;autoID\&quot;: false,
    \&quot;fields\&quot;: [
        $primaryField
    ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>フィールドを追加する際、<code translate="no">is_primary</code> プロパティを<code translate="no">True</code> に設定することで、そのフィールドをプライマリフィールドとして明示的に指定できます。プライマリフィールドはデフォルト<strong>でInt64値</strong>を受け付けます。この場合、プライマリフィールドの値は<code translate="no">12345</code> のような整数である必要があります。プライマリフィールドで<strong>VARCHAR値</strong>を使用する場合は、<code translate="no">my_entity_1234</code> のような文字列である必要があります。</p>
<p>また、<code translate="no">autoId</code> プロパティを<code translate="no">True</code> に設定することで、データ挿入時にMilvusが自動的に主フィールドの値を割り当てるようにすることもできます。</p>
<div class="alert note">
<p>手動で主キーを設定するメリットがない限り、すべての場合において<code translate="no">autoId</code> を利用することをお勧めします。</p>
</div>
<p>詳細については、「<a href="/docs/ja/primary-field.md">主フィールドと AutoId</a>」を参照してください。</p>
<h2 id="Add-Vector-Fields" class="common-anchor-header">ベクトルフィールドの追加<button data-href="#Add-Vector-Fields" class="anchor-icon" translate="no">
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
    </button></h2><p>ベクトルフィールドは、さまざまなスパースおよびデンスのベクトル埋め込みを受け入れます。Milvus では、1 つのコレクションに 4 つのベクトルフィールドを追加できます。以下のコードスニペットは、ベクトルフィールドを追加する方法を示しています。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;my_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
<span class="highlighted-wrapper-line">    dim=<span class="hljs-number">5</span></span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;my_vector&quot;</span>)
        .dataType(DataType.FloatVector)
<span class="highlighted-wrapper-line">        .dimension(<span class="hljs-number">5</span>)</span>
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_vector&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span></span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">schema.WithField(entity.NewField().WithName(<span class="hljs-string">&quot;my_vector&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
<span class="highlighted-wrapper-line">    WithDim(<span class="hljs-number">5</span>),</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> vectorField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;my_vector&quot;,
    &quot;dataType&quot;: &quot;FloatVector&quot;,
    &quot;elementTypeParams&quot;: {
        &quot;dim&quot;: 5
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: false,
    \&quot;fields\&quot;: [
        <span class="hljs-variable">$primaryField</span>,
        <span class="hljs-variable">$vectorField</span>
    ]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>上記のコードスニペットにおける `<code translate="no">dim</code> ` パラメータは、ベクトルフィールドに格納されるベクトル埋め込みの次元数を示しています。値 `<code translate="no">FLOAT_VECTOR</code> ` は、ベクトルフィールドが 32 ビットの浮動小数点数のリストを保持することを示しており、これらは通常、対数関数の逆関数を表すために使用されます。これに加えて、Milvus は以下のタイプのベクトル埋め込みもサポートしています：</p>
<ul>
<li><p><code translate="no">FLOAT16_VECTOR</code></p>
<p>このタイプのベクトルフィールドは、16ビットの半精度浮動小数点数のリストを保持し、通常、メモリや帯域幅に制約のあるディープラーニングやGPUベースの計算シナリオに適用されます。</p></li>
<li><p><code translate="no">BFLOAT16_VECTOR</code></p>
<p>このタイプのベクトルフィールドは、16ビットの浮動小数点数のリストを保持します。精度は低下しますが、Float32と同じ指数範囲を持ちます。このタイプのデータは、精度に大きな影響を与えることなくメモリ使用量を削減できるため、ディープラーニングのシナリオで一般的に使用されます。</p></li>
<li><p><code translate="no">INT8_VECTOR</code></p>
<p>このタイプのベクトルフィールドは、8ビットの符号付き整数（int8）で構成されるベクトルを格納し、各成分の範囲は–128から127です。 ResNet や EfficientNet などの量子化ディープラーニングアーキテクチャ向けに最適化されており、精度の低下を最小限に抑えつつ、モデルサイズを大幅に縮小し、推論速度を向上させます。<strong>注</strong>：このベクトル型は HNSW インデックスでのみサポートされています。</p></li>
<li><p><code translate="no">BINARY_VECTOR</code></p>
<p>このタイプのベクトルフィールドは、0 と 1 のリストを保持します。これらは、画像処理や情報検索のシナリオにおいて、データを表現するためのコンパクトな特徴量として機能します。</p></li>
<li><p><code translate="no">SPARSE_FLOAT_VECTOR</code></p>
<p>このタイプのベクトルフィールドは、疎ベクトル埋め込みを表現するために、0 以外の数値とそのシーケンス番号のリストを保持します。</p></li>
</ul>
<h2 id="Add-Scalar-Fields" class="common-anchor-header">スカラーフィールドの追加<button data-href="#Add-Scalar-Fields" class="anchor-icon" translate="no">
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
    </button></h2><p>一般的なケースでは、スカラーフィールドを使用して Milvus に保存されたベクトル埋め込みのメタデータを格納し、メタデータフィルタリングを用いた ANN 検索を実行することで、検索結果の正確性を向上させることができます。Milvus は、<strong>VARCHAR</strong>、<strong>Boolean</strong>、<strong>Int</strong>、<strong>Float</strong>、<strong>Double</strong> を含む複数のスカラーフィールド型をサポートしています。</p>
<h3 id="Add-VARCHAR-Fields" class="common-anchor-header">VARCHARフィールドの追加<button data-href="#Add-VARCHAR-Fields" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvusでは、<code translate="no">VARCHAR</code> フィールドを使用して文字列を格納できます。<code translate="no">VARCHAR</code> フィールドの詳細については、「<a href="/docs/ja/string.md">VarCharフィールド</a>」を参照してください。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;my_varchar&quot;</span>,
    datatype=DataType.VARCHAR,
<span class="highlighted-wrapper-line">    max_length=<span class="hljs-number">512</span></span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;my_varchar&quot;</span>)
        .dataType(DataType.VarChar)
<span class="highlighted-wrapper-line">        .maxLength(<span class="hljs-number">512</span>)</span>
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_varchar&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span></span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">schema.WithField(entity.NewField().WithName(<span class="hljs-string">&quot;my_varchar&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithMaxLength(<span class="hljs-number">512</span>),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> varCharField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;my_varchar&quot;,
    &quot;dataType&quot;: &quot;VarChar&quot;,
    &quot;elementTypeParams&quot;: {
        &quot;max_length&quot;: 512
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: false,
    \&quot;fields\&quot;: [
        <span class="hljs-variable">$primaryField</span>,
        <span class="hljs-variable">$vectorField</span>,
        <span class="hljs-variable">$varCharField</span>
    ]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-Number-Fields" class="common-anchor-header">数値フィールドの追加<button data-href="#Add-Number-Fields" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvusがサポートする数値型は、<code translate="no">Int8</code> 、<code translate="no">Int16</code> 、<code translate="no">Int32</code> 、<code translate="no">Int64</code> 、<code translate="no">Float</code> 、および<code translate="no">Double</code> です。数値フィールドの詳細については、<a href="/docs/ja/number.md">「数値フィールド</a>」を参照してください。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;my_int64&quot;</span>,
    datatype=DataType.INT64,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;my_int64&quot;</span>)
        .dataType(DataType.Int64)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_int64&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">schema.WithField(entity.NewField().WithName(<span class="hljs-string">&quot;my_int64&quot;</span>).
    WithDataType(entity.FieldTypeInt64),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> int64Field=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;my_int64&quot;,
    &quot;dataType&quot;: &quot;Int64&quot;
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: false,
    \&quot;fields\&quot;: [
        <span class="hljs-variable">$primaryField</span>,
        <span class="hljs-variable">$vectorField</span>,
        <span class="hljs-variable">$varCharField</span>,
        <span class="hljs-variable">$int64Field</span>
    ]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-Boolean-Fields" class="common-anchor-header">ブール型フィールドの追加<button data-href="#Add-Boolean-Fields" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvusはブール型フィールドをサポートしています。以下のコードスニペットは、ブール型フィールドを追加する方法を示しています。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;my_bool&quot;</span>,
    datatype=DataType.BOOL,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;my_bool&quot;</span>)
        .dataType(DataType.Bool)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_bool&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Boolean</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">schema.WithField(entity.NewField().WithName(<span class="hljs-string">&quot;my_bool&quot;</span>).
    WithDataType(entity.FieldTypeBool),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> boolField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;my_bool&quot;,
    &quot;dataType&quot;: &quot;Boolean&quot;
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: false,
    \&quot;fields\&quot;: [
        <span class="hljs-variable">$primaryField</span>,
        <span class="hljs-variable">$vectorField</span>,
        <span class="hljs-variable">$varCharField</span>,
        <span class="hljs-variable">$int64Field</span>,
        <span class="hljs-variable">$boolField</span>
    ]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Add-Composite-Fields" class="common-anchor-header">複合フィールドの追加<button data-href="#Add-Composite-Fields" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus において、複合フィールドとは、JSON フィールドのキーや配列フィールドのインデックスなど、より小さなサブフィールドに分割できるフィールドのことです。</p>
<h3 id="Add-JSON-fields" class="common-anchor-header">JSONフィールドの追加<button data-href="#Add-JSON-fields" class="anchor-icon" translate="no">
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
    </button></h3><p>JSONフィールドには通常、半構造化されたJSONデータが格納されます。JSONフィールドの詳細については、「<a href="/docs/ja/json-field">JSONフィールド</a>」を参照してください。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;my_json&quot;</span>,
    datatype=DataType.JSON,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;my_json&quot;</span>)
        .dataType(DataType.JSON)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_json&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">JSON</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">schema.WithField(entity.NewField().WithName(<span class="hljs-string">&quot;my_json&quot;</span>).
    WithDataType(entity.FieldTypeJSON),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> jsonField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;my_json&quot;,
    &quot;dataType&quot;: &quot;JSON&quot;
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: false,
    \&quot;fields\&quot;: [
        <span class="hljs-variable">$primaryField</span>,
        <span class="hljs-variable">$vectorField</span>,
        <span class="hljs-variable">$varCharField</span>,
        <span class="hljs-variable">$int64Field</span>,
        <span class="hljs-variable">$boolField</span>,
        <span class="hljs-variable">$jsonField</span>
    ]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-Array-Fields" class="common-anchor-header">配列フィールドの追加<button data-href="#Add-Array-Fields" class="anchor-icon" translate="no">
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
    </button></h3><p>配列フィールドは、要素のリストを格納します。配列フィールド内のすべての要素のデータ型は同一である必要があります。配列フィールドの詳細については、「<a href="/docs/ja/array_data_type.md">配列フィールド</a>」を参照してください。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;my_array&quot;</span>,
    datatype=DataType.ARRAY,
    element_type=DataType.VARCHAR,
    max_capacity=<span class="hljs-number">5</span>,
    max_length=<span class="hljs-number">512</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;my_array&quot;</span>)
        .dataType(DataType.Array)
        .elementType(DataType.VarChar)
        .maxCapacity(<span class="hljs-number">5</span>)
        .maxLength(<span class="hljs-number">512</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_array&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Array</span>,
    <span class="hljs-attr">element_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
    <span class="hljs-attr">max_capacity</span>: <span class="hljs-number">5</span>,
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">schema.WithField(entity.NewField().WithName(<span class="hljs-string">&quot;my_array&quot;</span>).
    WithDataType(entity.FieldTypeArray).
    WithElementType(entity.FieldTypeInt64).
    WithMaxLength(<span class="hljs-number">512</span>).
    WithMaxCapacity(<span class="hljs-number">5</span>),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> arrayField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;my_array&quot;,
    &quot;dataType&quot;: &quot;Array&quot;,
    &quot;elementDataType&quot;: &quot;VarChar&quot;,
    &quot;elementTypeParams&quot;: {
        &quot;max_length&quot;: 512
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: false,
    \&quot;fields\&quot;: [
        <span class="hljs-variable">$primaryField</span>,
        <span class="hljs-variable">$vectorField</span>,
        <span class="hljs-variable">$varCharField</span>,
        <span class="hljs-variable">$int64Field</span>,
        <span class="hljs-variable">$boolField</span>,
        <span class="hljs-variable">$jsonField</span>,
        <span class="hljs-variable">$arrayField</span>
    ]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
