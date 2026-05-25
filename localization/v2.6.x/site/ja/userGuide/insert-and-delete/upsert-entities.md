---
id: upsert-entities.md
title: アップサート・エンティティ
summary: upsert 操作は、コレクション内のエンティティを挿入または更新する便利な方法を提供します。
---
<h1 id="Upsert-Entities" class="common-anchor-header">アップサート・エンティティ<button data-href="#Upsert-Entities" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">upsert</code> 操作は、コレクション内のエンティティを挿入または更新する便利な方法を提供します。</p>
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
    </button></h2><p><code translate="no">upsert</code> を使用して、新しいエンティティを挿入するか、既存のエンティティを更新することができます。主キーが見つからない場合は、挿入操作が発生します。そうでない場合は、更新操作が実行されます。</p>
<p>Milvusのupsertは<strong>override</strong>または<strong>merge</strong>モードで動作します。</p>
<h3 id="Upsert-in-override-mode" class="common-anchor-header">オーバーライドモードでのupsert<button data-href="#Upsert-in-override-mode" class="anchor-icon" translate="no">
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
    </button></h3><p>オーバーライドモードで動作するupsertリクエストは、挿入と削除を組み合わせたものです。既存のエンティティの<code translate="no">upsert</code> リクエストを受信すると、Milvusはリクエスト ペイロードで運ばれたデータを挿入し、同時にデータで指定された元の主キーを持つ既存のエンティティを削除します。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/upsert-in-override-mode.png" alt="Upsert In Override Mode" class="doc-image" id="upsert-in-override-mode" />
   </span> <span class="img-wrapper"> <span>上書きモードでのアップサート</span> </span></p>
<p>ターゲット コレクションのプライマリ フィールドで<code translate="no">autoid</code> が有効になっている場合、Milvusはリクエスト ペイロードに含まれるデータの新しいプライマリ キーを生成してから挿入します。</p>
<p><code translate="no">nullable</code> が有効なフィールドについては、更新が不要な場合、<code translate="no">upsert</code> リクエストで省略することができます。</p>
<h3 id="Upsert-in-merge-mode--Milvus-v262+" class="common-anchor-header">マージモードでのアップサート<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v2.6.2+</span><button data-href="#Upsert-in-merge-mode--Milvus-v262+" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">partial_update</code> フラグを使用して、upsertリクエストをマージモードで動作させることもできます。これにより、更新が必要なフィールドのみをリクエストのペイロードに含めることができます。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/upsert-in-merge-mode.png" alt="Upsert In Merge Mode" class="doc-image" id="upsert-in-merge-mode" />
   </span> <span class="img-wrapper"> <span>マージモードでのupsert</span> </span></p>
<p>マージを実行するには、<code translate="no">upsert</code> リクエストで、主キーと更新するフィールドの新しい値とともに、<code translate="no">partial_update</code> を<code translate="no">True</code> に設定します。</p>
<p>このようなリクエストを受け取ると、milvusは強い一貫性を持つクエリを実行してエンティティを取得し、リクエストのデータに基づいてフィールド値を更新し、変更されたデータを挿入し、リクエストに含まれるオリジナルの主キーを持つ既存のエンティティを削除します。</p>
<p><code translate="no">ARRAY</code> フィールドについて、マージモードは<code translate="no">ARRAY_APPEND</code> と<code translate="no">ARRAY_REMOVE</code> の 2 つの演算子をサポートしています。これらの演算子を使用すると、エンティティに最初にクエリを実行して現在の値を取得しなくても、既存の<code translate="no">ARRAY</code> フィールドに要素を追加したり、既存の フィールドから一致する要素を削除したりできます。詳細については、<a href="/docs/ja/v2.6.x/upsert-entities.md#Upsert-ARRAY-fields-with-partial-update-operators">部分更新演算子による ARRAY フィールドの Upsert</a> を参照してください。</p>
<h3 id="Upsert-behaviors-special-notes" class="common-anchor-header">Upsert 動作: 特別な注意事項<button data-href="#Upsert-behaviors-special-notes" class="anchor-icon" translate="no">
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
    </button></h3><p>マージ機能を使用する前に考慮すべき特別な注意事項がいくつかあります。以下のケースは、<code translate="no">title</code> および<code translate="no">issue</code> という 2 つのスカラ・フィールドと、プライマリ・キー<code translate="no">id</code> および<code translate="no">vector</code> というベクトル・フィールドを持つコレクションがあると仮定します。</p>
<ul>
<li><p><code translate="no">nullable</code> <strong>が有効になって</strong><strong>いるフィールドをアップサートします</strong> <strong>。</strong></p>
<p><code translate="no">issue</code> フィールドは NULL にできるとします。これらのフィールドをアップサートする場合、以下の点に注意してください：</p>
<ul>
<li><p><code translate="no">upsert</code> 要求で<code translate="no">issue</code> フィールドを省略し、<code translate="no">partial_update</code> を無効にすると、<code translate="no">issue</code> フィールドは元の値を保持する代わりに、<code translate="no">null</code> に更新されます。</p></li>
<li><p><code translate="no">issue</code> フィールドの元の値を保持するには、<code translate="no">partial_update</code> を有効にして<code translate="no">issue</code> フィールドを省略するか、<code translate="no">upsert</code> リクエストに元の値の<code translate="no">issue</code> フィールドを含める必要があります。</p></li>
</ul></li>
<li><p><strong>動的フィールドのキーをアップサートする</strong>。</p>
<p>例のコレクションでダイナミック・キーを有効にし、エンティティのダイナミック・ フィールドのキーと値のペアが<code translate="no">{&quot;author&quot;: &quot;John&quot;, &quot;year&quot;: 2020, &quot;tags&quot;: [&quot;fiction&quot;]}</code> のようになっているとします。</p>
<p><code translate="no">author</code> 、<code translate="no">year</code> 、<code translate="no">tags</code> などのキーを持つエンティティをアップサートする場合、または他のキーを追加する場合は、以下の点に注意してください：</p>
<ul>
<li><p><code translate="no">partial_update</code> を無効にしてアップサートを行った場合、デフォルトの動作は<strong>オーバーライドに</strong>なります。これは、ダイナミック・フィールドの値が、要求に含まれるすべての非スキーマ定義 フィールドとその値によってオーバーライドされることを意味します。</p>
<p>例えば、要求に含まれるデータが<code translate="no">{&quot;author&quot;: &quot;Jane&quot;, &quot;genre&quot;: &quot;fantasy&quot;}</code> の場合、ターゲット・エンティティのダイナミック・フィールドのキーと値のペアはその値に更新されます。</p></li>
<li><p><code translate="no">partial_update</code> を有効にしてアップサートする場合、デフォルトの動作は<strong>マージ</strong>です。これは、ダイナミック・フィールドの値が、要求に含まれるすべての非スキーマ定義フィールドとその値にマージされることを意味します。</p>
<p>例えば、要求に含まれるデータが<code translate="no">{&quot;author&quot;: &quot;John&quot;, &quot;year&quot;: 2020, &quot;tags&quot;: [&quot;fiction&quot;]}</code> の場合、ターゲット・エンティティのダイナミック・フィールドのキーと値のペアは、アップサート後に<code translate="no">{&quot;author&quot;: &quot;John&quot;, &quot;year&quot;: 2020, &quot;tags&quot;: [&quot;fiction&quot;], &quot;genre&quot;: &quot;fantasy&quot;}</code> になります。</p></li>
</ul></li>
<li><p><strong>JSONフィールドのアップサート</strong></p>
<p>サンプル・コレクションに<code translate="no">extras</code> というスキーマ定義の JSON フィールドがあり、エンティティのこの JSON フィールドのキー・バリュー・ペアが<code translate="no">{&quot;author&quot;: &quot;John&quot;, &quot;year&quot;: 2020, &quot;tags&quot;: [&quot;fiction&quot;]}</code> と類似しているとします。</p>
<p>変更されたJSONデータでエンティティの<code translate="no">extras</code> フィールドをアップサートする場合、JSONフィールドは全体として扱われ、個々のキーを選択的に更新することはできないことに注意してください。言い換えると、JSON フィールドは<strong>マージ・</strong>モードでのアップサートに対応して<strong>いません</strong>。</p></li>
<li><p><code translate="no">ARRAY</code> <strong>。</strong></p>
<p>マージ・モードでは、<code translate="no">ARRAY</code> フィールドは<code translate="no">ARRAY_APPEND</code> および<code translate="no">ARRAY_REMOVE</code> 部分更新演算子をサポートしています。これらの演算子は、配列の値全体を置き換えることなく、既存の<code translate="no">ARRAY</code> フィールドに要素を追加したり、一致する要素を削除したりする場合に使用します。</p></li>
</ul>
<h3 id="Limits--Restrictions" class="common-anchor-header">制限と制約<button data-href="#Limits--Restrictions" class="anchor-icon" translate="no">
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
    </button></h3><p>上記の内容に基づいて、従うべき制限と制約がいくつかある：</p>
<ul>
<li><p><code translate="no">upsert</code> 要求には、必ず対象エンティティの主キーを含める必要があります。</p></li>
<li><p>ターゲット・コレクションがロードされ、クエリで使用可能になっている必要があります。</p></li>
<li><p>要求で指定されたすべてのフィールドがターゲット・コレクションのスキーマに存在すること。</p></li>
<li><p>要求で指定されたすべてのフィールドの値が、スキーマで定義されたデータ型に一致する必要があります。</p></li>
<li><p>関数を使用して他のフィールドから派生したフィールドについては、Milvusは再計算を可能にするため、アップサート中に派生フィールドを削除します。</p></li>
</ul>
<h2 id="Upsert-entities-in-a-collection" class="common-anchor-header">コレクション内のエンティティのアップサート<button data-href="#Upsert-entities-in-a-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>このセクションでは、<code translate="no">my_collection</code> という名前のコレクションにエンティティをアップサートします。このコレクションには、<code translate="no">id</code> 、<code translate="no">vector</code> 、<code translate="no">title</code> 、<code translate="no">issue</code> という2つのフィールドのみがあります。<code translate="no">id</code> フィールドはプライマリフィールドで、<code translate="no">title</code> と<code translate="no">issue</code> フィールドはスカラーフィールドである。</p>
<p>コレクションに3つのエンティティが存在する場合、upsertリクエストに含まれるエンティティによってオーバーライドされる。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

data=[
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">0</span>, 
        <span class="hljs-string">&quot;vector&quot;</span>: [-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>],
        <span class="hljs-string">&quot;title&quot;</span>: <span class="hljs-string">&quot;Artificial Intelligence in Real Life&quot;</span>, 
        <span class="hljs-string">&quot;issue&quot;</span>: <span class="hljs-string">&quot;vol.12&quot;</span>
    }, {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>, 
        <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.4762662251462588</span>, -<span class="hljs-number">0.6942502138717026</span>, -<span class="hljs-number">0.4490002642657902</span>, -<span class="hljs-number">0.628696575798281</span>, <span class="hljs-number">0.9660395877041965</span>], 
        <span class="hljs-string">&quot;title&quot;</span>: <span class="hljs-string">&quot;Hollow Man&quot;</span>, 
        <span class="hljs-string">&quot;issue&quot;</span>: <span class="hljs-string">&quot;vol.19&quot;</span>
    }, {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>, 
        <span class="hljs-string">&quot;vector&quot;</span>: [-<span class="hljs-number">0.8864122635045097</span>, <span class="hljs-number">0.9260170474445351</span>, <span class="hljs-number">0.801326976181461</span>, <span class="hljs-number">0.6383943392381306</span>, <span class="hljs-number">0.7563037341572827</span>], 
        <span class="hljs-string">&quot;title&quot;</span>: <span class="hljs-string">&quot;Treasure Hunt in Missouri&quot;</span>, 
        <span class="hljs-string">&quot;issue&quot;</span>: <span class="hljs-string">&quot;vol.12&quot;</span>
    }
]

res = client.upsert(
    collection_name=<span class="hljs-string">&#x27;my_collection&#x27;</span>,
    data=data
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment"># {&#x27;upsert_count&#x27;: 3}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;
<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.UpsertReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.UpsertResp;

<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build());

<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
List&lt;JsonObject&gt; data = Arrays.asList(
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 0, \&quot;vector\&quot;: [-0.619954382375778, 0.4479436794798608, -0.17493894838751745, -0.4248030059917294, -0.8648452746018911], \&quot;title\&quot;: \&quot;Artificial Intelligence in Real Life\&quot;, \&quot;issue\&quot;: \&quot;\vol.12\&quot;}&quot;</span>, JsonObject.class),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 1, \&quot;vector\&quot;: [0.4762662251462588, -0.6942502138717026, -0.4490002642657902, -0.628696575798281, 0.9660395877041965], \&quot;title\&quot;: \&quot;Hollow Man\&quot;, \&quot;issue\&quot;: \&quot;vol.19\&quot;}&quot;</span>, JsonObject.class),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 2, \&quot;vector\&quot;: [-0.8864122635045097, 0.9260170474445351, 0.801326976181461, 0.6383943392381306, 0.7563037341572827], \&quot;title\&quot;: \&quot;Treasure Hunt in Missouri\&quot;, \&quot;issue\&quot;: \&quot;vol.12\&quot;}&quot;</span>, JsonObject.class),
);

<span class="hljs-type">UpsertReq</span> <span class="hljs-variable">upsertReq</span> <span class="hljs-operator">=</span> UpsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(data)
        .build();

<span class="hljs-type">UpsertResp</span> <span class="hljs-variable">upsertResp</span> <span class="hljs-operator">=</span> client.upsert(upsertReq);
System.out.println(upsertResp);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">//</span>
<span class="hljs-comment">// UpsertResp(upsertCnt=3)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)

<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});

data = [
    {<span class="hljs-attr">id</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">vector</span>: [-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>], <span class="hljs-attr">title</span>: <span class="hljs-string">&quot;Artificial Intelligence in Real Life&quot;</span>, <span class="hljs-attr">issue</span>: <span class="hljs-string">&quot;vol.12&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.4762662251462588</span>, -<span class="hljs-number">0.6942502138717026</span>, -<span class="hljs-number">0.4490002642657902</span>, -<span class="hljs-number">0.628696575798281</span>, <span class="hljs-number">0.9660395877041965</span>], <span class="hljs-attr">title</span>: <span class="hljs-string">&quot;Hollow Man&quot;</span>, <span class="hljs-attr">issue</span>: <span class="hljs-string">&quot;vol.19&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">vector</span>: [-<span class="hljs-number">0.8864122635045097</span>, <span class="hljs-number">0.9260170474445351</span>, <span class="hljs-number">0.801326976181461</span>, <span class="hljs-number">0.6383943392381306</span>, <span class="hljs-number">0.7563037341572827</span>], <span class="hljs-attr">title</span>: <span class="hljs-string">&quot;Treasure Hunt in Missouri&quot;</span>, <span class="hljs-attr">issue</span>: <span class="hljs-string">&quot;vol.12&quot;</span>},
]

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">upsert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">data</span>: data,
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">upsert_cnt</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// 3</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/column&quot;</span>
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

titleColumn := column.NewColumnString(<span class="hljs-string">&quot;title&quot;</span>, []<span class="hljs-type">string</span>{
    <span class="hljs-string">&quot;Artificial Intelligence in Real Life&quot;</span>, <span class="hljs-string">&quot;Hollow Man&quot;</span>, <span class="hljs-string">&quot;Treasure Hunt in Missouri&quot;</span>, 
})

issueColumn := column.NewColumnString(<span class="hljs-string">&quot;issue&quot;</span>, []<span class="hljs-type">string</span>{
    <span class="hljs-string">&quot;vol.12&quot;</span>, <span class="hljs-string">&quot;vol.19&quot;</span>, <span class="hljs-string">&quot;vol.12&quot;</span>
})

_, err = client.Upsert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;my_collection&quot;</span>).
    WithInt64Column(<span class="hljs-string">&quot;id&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>, <span class="hljs-number">7</span>, <span class="hljs-number">8</span>, <span class="hljs-number">9</span>}).
    WithFloatVectorColumn(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-number">5</span>, [][]<span class="hljs-type">float32</span>{
        {<span class="hljs-number">0.3580376395471989</span>, <span class="hljs-number">-0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, <span class="hljs-number">-0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>},
        {<span class="hljs-number">0.19886812562848388</span>, <span class="hljs-number">0.06023560599112088</span>, <span class="hljs-number">0.6976963061752597</span>, <span class="hljs-number">0.2614474506242501</span>, <span class="hljs-number">0.838729485096104</span>},
        {<span class="hljs-number">0.43742130801983836</span>, <span class="hljs-number">-0.5597502546264526</span>, <span class="hljs-number">0.6457887650909682</span>, <span class="hljs-number">0.7894058910881185</span>, <span class="hljs-number">0.20785793220625592</span>},
    }).
    WithColumns(titleColumn, issueColumn),
)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle err</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/upsert&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;data&quot;: [
        {&quot;id&quot;: 0, &quot;vector&quot;: [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592], &quot;title&quot;: &quot;Artificial Intelligence in Real Life&quot;, &quot;issue&quot;: &quot;vol.12&quot;},
        {&quot;id&quot;: 1, &quot;vector&quot;: [0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104], &quot;title&quot;: &quot;Hollow Man&quot;, &quot;issue&quot;: &quot;vol.19&quot;},
        {&quot;id&quot;: 2, &quot;vector&quot;: [0.43742130801983836, -0.5597502546264526, 0.6457887650909682, 0.7894058910881185, 0.20785793220625592], &quot;title&quot;: &quot;Treasure Hunt in Missouri&quot;, &quot;issue&quot;: &quot;vol.12&quot;},
],
    &quot;collectionName&quot;: &quot;my_collection&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {</span>
<span class="hljs-comment">#         &quot;upsertCount&quot;: 3,</span>
<span class="hljs-comment">#         &quot;upsertIds&quot;: [</span>
<span class="hljs-comment">#             0,</span>
<span class="hljs-comment">#             1,</span>
<span class="hljs-comment">#             2,</span>
<span class="hljs-comment">#         ]</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Upsert-entities-in-a-partition" class="common-anchor-header">パーティション内のエンティティのアップサート<button data-href="#Upsert-entities-in-a-partition" class="anchor-icon" translate="no">
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
    </button></h2><p>指定したパーティションにエンティティをアップサートすることもできる。以下のコード・スニペットは、コレクションに<strong>PartitionAという</strong>パーティションがあると仮定しています。</p>
<p>パーティションに3つのエンティティが存在する場合、リクエストに含まれるエンティティで上書きされます。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">data=[
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">10</span>, 
        <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.06998888224297328</span>, <span class="hljs-number">0.8582816610326578</span>, -<span class="hljs-number">0.9657938677934292</span>, <span class="hljs-number">0.6527905683627726</span>, -<span class="hljs-number">0.8668460657158576</span>], 
        <span class="hljs-string">&quot;title&quot;</span>: <span class="hljs-string">&quot;Layour Design Reference&quot;</span>, 
        <span class="hljs-string">&quot;issue&quot;</span>: <span class="hljs-string">&quot;vol.34&quot;</span>
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">11</span>, 
        <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.6060703043917468</span>, -<span class="hljs-number">0.3765080534566074</span>, -<span class="hljs-number">0.7710758854987239</span>, <span class="hljs-number">0.36993888322346136</span>, <span class="hljs-number">0.5507513364206531</span>], 
        <span class="hljs-string">&quot;title&quot;</span>: <span class="hljs-string">&quot;Doraemon and His Friends&quot;</span>, 
        <span class="hljs-string">&quot;issue&quot;</span>: <span class="hljs-string">&quot;vol.2&quot;</span>
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">12</span>, 
        <span class="hljs-string">&quot;vector&quot;</span>: [-<span class="hljs-number">0.9041813104515337</span>, -<span class="hljs-number">0.9610546012461163</span>, <span class="hljs-number">0.20033003106083358</span>, <span class="hljs-number">0.11842506351635174</span>, <span class="hljs-number">0.8327356724591011</span>], 
        <span class="hljs-string">&quot;title&quot;</span>: <span class="hljs-string">&quot;Pikkachu and Pokemon&quot;</span>, 
        <span class="hljs-string">&quot;issue&quot;</span>: <span class="hljs-string">&quot;vol.12&quot;</span>
    },
]

res = client.upsert(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=data,
    partition_name=<span class="hljs-string">&quot;partitionA&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment"># {&#x27;upsert_count&#x27;: 3}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.UpsertReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.UpsertResp;

<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
List&lt;JsonObject&gt; data = Arrays.asList(
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 10, \&quot;vector\&quot;: [0.06998888224297328, 0.8582816610326578, -0.9657938677934292, 0.6527905683627726, -0.8668460657158576], \&quot;title\&quot;: \&quot;Layour Design Reference\&quot;, \&quot;issue\&quot;: \&quot;vol.34\&quot;}&quot;</span>, JsonObject.class),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 11, \&quot;vector\&quot;: [0.6060703043917468, -0.3765080534566074, -0.7710758854987239, 0.36993888322346136, 0.5507513364206531], \&quot;title\&quot;: \&quot;Doraemon and His Friends\&quot;, \&quot;issue\&quot;: \&quot;vol.2\&quot;}&quot;</span>, JsonObject.class),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 12, \&quot;vector\&quot;: [-0.9041813104515337, -0.9610546012461163, 0.20033003106083358, 0.11842506351635174, 0.8327356724591011], \&quot;title\&quot;: \&quot;Pikkachu and Pokemon\&quot;, \&quot;issue\&quot;: \&quot;vol.12\&quot;}&quot;</span>, JsonObject.class),
);

<span class="hljs-type">UpsertReq</span> <span class="hljs-variable">upsertReq</span> <span class="hljs-operator">=</span> UpsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .partitionName(<span class="hljs-string">&quot;partitionA&quot;</span>)
        .data(data)
        .build();

<span class="hljs-type">UpsertResp</span> <span class="hljs-variable">upsertResp</span> <span class="hljs-operator">=</span> client.upsert(upsertReq);
System.out.println(upsertResp);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">//</span>
<span class="hljs-comment">// UpsertResp(upsertCnt=3)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)

<span class="hljs-comment">// 6. Upsert data in partitions</span>
data = [
    {<span class="hljs-attr">id</span>: <span class="hljs-number">10</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.06998888224297328</span>, <span class="hljs-number">0.8582816610326578</span>, -<span class="hljs-number">0.9657938677934292</span>, <span class="hljs-number">0.6527905683627726</span>, -<span class="hljs-number">0.8668460657158576</span>], <span class="hljs-attr">title</span>: <span class="hljs-string">&quot;Layour Design Reference&quot;</span>, <span class="hljs-attr">issue</span>: <span class="hljs-string">&quot;vol.34&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">11</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.6060703043917468</span>, -<span class="hljs-number">0.3765080534566074</span>, -<span class="hljs-number">0.7710758854987239</span>, <span class="hljs-number">0.36993888322346136</span>, <span class="hljs-number">0.5507513364206531</span>], <span class="hljs-attr">title</span>: <span class="hljs-string">&quot;Doraemon and His Friends&quot;</span>, <span class="hljs-attr">issue</span>: <span class="hljs-string">&quot;vol.2&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">12</span>, <span class="hljs-attr">vector</span>: [-<span class="hljs-number">0.9041813104515337</span>, -<span class="hljs-number">0.9610546012461163</span>, <span class="hljs-number">0.20033003106083358</span>, <span class="hljs-number">0.11842506351635174</span>, <span class="hljs-number">0.8327356724591011</span>], <span class="hljs-attr">title</span>: <span class="hljs-string">&quot;Pikkachu and Pokemon&quot;</span>, <span class="hljs-attr">issue</span>: <span class="hljs-string">&quot;vol.12&quot;</span>},
]

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">upsert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">data</span>: data,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionA&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">upsert_cnt</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// 3</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">titleColumn = column.NewColumnString(<span class="hljs-string">&quot;title&quot;</span>, []<span class="hljs-type">string</span>{
    <span class="hljs-string">&quot;Layour Design Reference&quot;</span>, <span class="hljs-string">&quot;Doraemon and His Friends&quot;</span>, <span class="hljs-string">&quot;Pikkachu and Pokemon&quot;</span>, 
})
issueColumn = column.NewColumnString(<span class="hljs-string">&quot;issue&quot;</span>, []<span class="hljs-type">string</span>{
    <span class="hljs-string">&quot;vol.34&quot;</span>, <span class="hljs-string">&quot;vol.2&quot;</span>, <span class="hljs-string">&quot;vol.12&quot;</span>, 
})

_, err = client.Upsert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;my_collection&quot;</span>).
    WithPartition(<span class="hljs-string">&quot;partitionA&quot;</span>).
    WithInt64Column(<span class="hljs-string">&quot;id&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">10</span>, <span class="hljs-number">11</span>, <span class="hljs-number">12</span>, <span class="hljs-number">13</span>, <span class="hljs-number">14</span>, <span class="hljs-number">15</span>, <span class="hljs-number">16</span>, <span class="hljs-number">17</span>, <span class="hljs-number">18</span>, <span class="hljs-number">19</span>}).
    WithFloatVectorColumn(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-number">5</span>, [][]<span class="hljs-type">float32</span>{
        {<span class="hljs-number">0.3580376395471989</span>, <span class="hljs-number">-0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, <span class="hljs-number">-0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>},
        {<span class="hljs-number">0.19886812562848388</span>, <span class="hljs-number">0.06023560599112088</span>, <span class="hljs-number">0.6976963061752597</span>, <span class="hljs-number">0.2614474506242501</span>, <span class="hljs-number">0.838729485096104</span>},
        {<span class="hljs-number">0.43742130801983836</span>, <span class="hljs-number">-0.5597502546264526</span>, <span class="hljs-number">0.6457887650909682</span>, <span class="hljs-number">0.7894058910881185</span>, <span class="hljs-number">0.20785793220625592</span>},
    }).
    WithColumns(titleColumn, issueColumn),
)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle err</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/upsert&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;data&quot;: [
        {&quot;id&quot;: 10, &quot;vector&quot;: [0.06998888224297328, 0.8582816610326578, -0.9657938677934292, 0.6527905683627726, -0.8668460657158576], &quot;title&quot;: &quot;Layour Design Reference&quot;, &quot;issue&quot;: &quot;vol.34&quot;},
        {&quot;id&quot;: 11, &quot;vector&quot;: [0.6060703043917468, -0.3765080534566074, -0.7710758854987239, 0.36993888322346136, 0.5507513364206531], &quot;title&quot;: &quot;Doraemon and His Friends&quot;, &quot;issue&quot;: &quot;vol.2&quot;},
        {&quot;id&quot;: 12, &quot;vector&quot;: [-0.9041813104515337, -0.9610546012461163, 0.20033003106083358, 0.11842506351635174, 0.8327356724591011], &quot;title&quot;: &quot;Pikkachu and Pokemon&quot;, &quot;issue&quot;: &quot;vol.12&quot;},
    ],
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;partitionName&quot;: &quot;partitionA&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {</span>
<span class="hljs-comment">#         &quot;upsertCount&quot;: 3,</span>
<span class="hljs-comment">#         &quot;upsertIds&quot;: [</span>
<span class="hljs-comment">#             10,</span>
<span class="hljs-comment">#             11,</span>
<span class="hljs-comment">#             12,</span>
<span class="hljs-comment">#         ]</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Upsert-entities-in-merge-mode--Milvus-v262+" class="common-anchor-header">マージモードでのエンティティのアップサート<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v2.6.2+</span><button data-href="#Upsert-entities-in-merge-mode--Milvus-v262+" class="anchor-icon" translate="no">
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
    </button></h2><p>以下のコード例は、部分的な更新でエンティティをアップサートする方法を示している。更新が必要なフィールドとその新しい値のみを、明示的な部分更新フラグとともに指定します。</p>
<p>以下の例では、upsert 要求で指定されたエンティティの<code translate="no">issue</code> フィールドが、要求に含まれる値に更新されます。</p>
<div class="alert note">
<p>マージモードでupsertを実行する場合は、その要求に関係するエンティティが同じフィールドセットを持って いることを確認してください。次のコード・スニペットに示すように、upsert するエンティティが 2 つ以上あるとすると、エラーを防いでデータの整合性を維持するために、それらのエンティティに同じフィールドが含まれていることが重要です。</p>
</div>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">data=[
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;issue&quot;</span>: <span class="hljs-string">&quot;vol.14&quot;</span>
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>, 
        <span class="hljs-string">&quot;issue&quot;</span>: <span class="hljs-string">&quot;vol.7&quot;</span>
    }
]

res = client.upsert(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=data,
    partial_update=<span class="hljs-literal">True</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment"># {&#x27;upsert_count&#x27;: 2}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">JsonObject</span> <span class="hljs-variable">row1</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row1.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">1</span>);
row1.addProperty(<span class="hljs-string">&quot;issue&quot;</span>, <span class="hljs-string">&quot;vol.14&quot;</span>);

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row2</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row2.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">2</span>);
row2.addProperty(<span class="hljs-string">&quot;issue&quot;</span>, <span class="hljs-string">&quot;vol.7&quot;</span>);

<span class="hljs-type">UpsertReq</span> <span class="hljs-variable">upsertReq</span> <span class="hljs-operator">=</span> UpsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(Arrays.asList(row1, row2))
        .partialUpdate(<span class="hljs-literal">true</span>)
        .build();

<span class="hljs-type">UpsertResp</span> <span class="hljs-variable">upsertResp</span> <span class="hljs-operator">=</span> client.upsert(upsertReq);
System.out.println(upsertResp);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">//</span>
<span class="hljs-comment">// UpsertResp(upsertCnt=2)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">pkColumn := column.NewColumnInt64(<span class="hljs-string">&quot;id&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">1</span>, <span class="hljs-number">2</span>})
issueColumn = column.NewColumnString(<span class="hljs-string">&quot;issue&quot;</span>, []<span class="hljs-type">string</span>{
    <span class="hljs-string">&quot;vol.17&quot;</span>, <span class="hljs-string">&quot;vol.7&quot;</span>,
})

_, err = client.Upsert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;my_collection&quot;</span>).
    WithColumns(pkColumn, issueColumn).
    WithPartialUpdate(<span class="hljs-literal">true</span>),
)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle err</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> data=[
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;issue&quot;</span>: <span class="hljs-string">&quot;vol.14&quot;</span>
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>, 
        <span class="hljs-string">&quot;issue&quot;</span>: <span class="hljs-string">&quot;vol.7&quot;</span>
    }
];

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">upsert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    data,
    <span class="hljs-attr">partial_update</span>: <span class="hljs-literal">true</span>
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// 2</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

<span class="hljs-built_in">export</span> COLLECTION_NAME=<span class="hljs-string">&quot;my_collection&quot;</span>
<span class="hljs-built_in">export</span> UPSERT_DATA=<span class="hljs-string">&#x27;[
  {
    &quot;id&quot;: 1,
    &quot;issue&quot;: &quot;vol.14&quot;
  },
  {
    &quot;id&quot;: 2,
    &quot;issue&quot;: &quot;vol.7&quot;
  }
]&#x27;</span>

curl -X POST <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/entities/upsert&quot;</span> \
  -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  -H <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
  -H <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  -d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;<span class="hljs-variable">${COLLECTION_NAME}</span>\&quot;,
    \&quot;data\&quot;: <span class="hljs-variable">${UPSERT_DATA}</span>,
    \&quot;partialUpdate\&quot;: true
  }&quot;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {</span>
<span class="hljs-comment">#         &quot;upsertCount&quot;: 2,</span>
<span class="hljs-comment">#         &quot;upsertIds&quot;: [</span>
<span class="hljs-comment">#              3,</span>
<span class="hljs-comment">#             12,</span>
<span class="hljs-comment">#         ]</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Upsert-ARRAY-fields-with-partial-update-operators--Milvus-v2617+" class="common-anchor-header">部分更新演算子によるARRAYフィールドのアップサート<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v2.6.17+</span><button data-href="#Upsert-ARRAY-fields-with-partial-update-operators--Milvus-v2617+" class="anchor-icon" translate="no">
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
    </button></h2><p>partial-update演算子が導入される前は、<code translate="no">ARRAY</code> フィールドの一部を更新するには、クライアントサイドの読み取り-変更-書き込みのフローが必要でした：既存の配列にクエリを発行し、アプリケーションコードで変更し、完全な置換値をupsertします。部分更新オペレータを使用すると、追加または削除する要素のみを送信できるため、クライアント側のロジックが削減され、upsertの前に余分な読み取りを行う必要がなくなります。</p>
<p>主キー<code translate="no">1</code> を持つエンティティが既に<code translate="no">tags = [&quot;new&quot;, &quot;trial&quot;]</code> を持っているとします。部分更新演算子がない場合、<code translate="no">&quot;premium&quot;</code> を配列に追加するには、完全な置換配列をupsertする必要があります：</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.upsert(
    collection_name=<span class="hljs-string">&quot;users&quot;</span>,
<span class="highlighted-comment-line">    data=[{<span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;new&quot;</span>, <span class="hljs-string">&quot;trial&quot;</span>, <span class="hljs-string">&quot;premium&quot;</span>]}],</span>
<span class="highlighted-comment-line">    partial_update=<span class="hljs-literal">True</span>,</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">List&lt;JsonObject&gt; replacementData = Collections.singletonList(
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;pk\&quot;: 1, \&quot;tags\&quot;: [\&quot;new\&quot;, \&quot;trial\&quot;, \&quot;premium\&quot;]}&quot;</span>, JsonObject.class)
);

client.upsert(UpsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;users&quot;</span>)
<span class="highlighted-comment-line">        .partialUpdate(<span class="hljs-literal">true</span>)</span>
<span class="highlighted-comment-line">        .data(replacementData)</span>
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_APPEND</code> では、追加する要素のみを送信します：</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldOp

client.upsert(
    collection_name=<span class="hljs-string">&quot;users&quot;</span>,
<span class="highlighted-comment-line">    data=[{<span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;premium&quot;</span>]}],</span>
<span class="highlighted-comment-line">    field_ops={<span class="hljs-string">&quot;tags&quot;</span>: FieldOp.array_append()},</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">List&lt;JsonObject&gt; appendData = Collections.singletonList(
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;pk\&quot;: 1, \&quot;tags\&quot;: [\&quot;premium\&quot;]}&quot;</span>, JsonObject.class)
);

UpsertReq.<span class="hljs-type">FieldPartialUpdateOp</span> <span class="hljs-variable">appendTags</span> <span class="hljs-operator">=</span> UpsertReq.FieldPartialUpdateOp.builder()
        .fieldName(<span class="hljs-string">&quot;tags&quot;</span>)
        .opType(UpsertReq.FieldPartialUpdateOp.OpType.ARRAY_APPEND)
        .build();

client.upsert(UpsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;users&quot;</span>)
<span class="highlighted-comment-line">        .data(appendData)</span>
<span class="highlighted-comment-line">        .fieldOps(Collections.singletonList(appendTags))</span>
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><code translate="no">field_ops</code> 、いずれかの演算子を暗黙的にフィールドに付加することで、部分更新セマンティクスが有効になります。したがって、<code translate="no">field_ops</code> とともに<code translate="no">partial_update=True</code> を渡す必要は<strong>ありません</strong>。</p>
</div>
<h3 id="Limits" class="common-anchor-header">制限<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>ペイロード値は、ターゲット・フィールド（<code translate="no">ARRAY</code> ）の<code translate="no">element_type</code> と一致しなければならない。例えば、ターゲット・フィールドが<code translate="no">ARRAY&lt;VARCHAR&gt;</code> の場合、ペイロードには文字列値が含まれていなければならない。</li>
<li><code translate="no">ARRAY_APPEND</code> および<code translate="no">ARRAY_REMOVE</code> は、<code translate="no">element_type</code> が<code translate="no">BOOL</code>,<code translate="no">INT8</code>,<code translate="no">INT16</code>,<code translate="no">INT32</code>,<code translate="no">INT64</code>,<code translate="no">FLOAT</code>,<code translate="no">DOUBLE</code>, または<code translate="no">VARCHAR</code> である<code translate="no">ARRAY</code> フィールドをサポートしています。</li>
<li><code translate="no">ARRAY_APPEND</code> 、結果の配列長はフィールドの<code translate="no">max_capacity</code> を超えてはならない。</li>
<li>同じエンティティへの同時アップサートは、リクエスト間でアトミックではない。2つのリクエ ストが同時に同じ<code translate="no">ARRAY</code> フィールドを更新すると、後の書き込みが前の書き込みを上書きする可能 性がある。すべての同時変更を保持する必要がある場合は、アプリケーションレベルの調整を 使用すること。</li>
</ul>
<h3 id="Example" class="common-anchor-header">例<button data-href="#Example" class="anchor-icon" translate="no">
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
    </button></h3><p>以下の例では、主キー<code translate="no">pk</code> 、型<code translate="no">ARRAY&lt;VARCHAR&gt;</code> の<code translate="no">tags</code> フィールド、<code translate="no">embedding</code> ベクトルフィールドを持つ小さな<code translate="no">users</code> コレクションを使用する。まず、<code translate="no">tags</code> の初期値を持つ2つのエンティティを挿入し、<code translate="no">ARRAY_APPEND</code> と<code translate="no">ARRAY_REMOVE</code> を使用して、各演算子が格納された配列をどのように変更するかを示します。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, FieldOp, MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># 1. Create a collection with an ARRAY&lt;VARCHAR&gt; field</span>
schema = client.create_schema(enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;pk&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;embedding&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)
schema.add_field(
    <span class="hljs-string">&quot;tags&quot;</span>,
    DataType.ARRAY,
    element_type=DataType.VARCHAR,
    max_capacity=<span class="hljs-number">8</span>,
    max_length=<span class="hljs-number">32</span>,
)

index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>,
)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;users&quot;</span>,
    schema=schema,
    index_params=index_params
)

<span class="hljs-comment"># 2. Seed two entities</span>
client.insert(
    collection_name=<span class="hljs-string">&quot;users&quot;</span>,
    data=[
        {<span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>], <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;new&quot;</span>]},
        {<span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.6</span>, <span class="hljs-number">0.7</span>, <span class="hljs-number">0.8</span>, <span class="hljs-number">0.9</span>, <span class="hljs-number">1.0</span>], <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;new&quot;</span>, <span class="hljs-string">&quot;trial&quot;</span>]},
    ],
)

<span class="hljs-comment"># 3. Append tags without reading the existing ARRAY values</span>
client.upsert(
    collection_name=<span class="hljs-string">&quot;users&quot;</span>,
<span class="highlighted-comment-line">    data=[</span>
<span class="highlighted-comment-line">        {<span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;premium&quot;</span>, <span class="hljs-string">&quot;vip&quot;</span>]},</span>
<span class="highlighted-comment-line">        {<span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;premium&quot;</span>]},</span>
<span class="highlighted-comment-line">    ],</span>
<span class="highlighted-comment-line">    field_ops={<span class="hljs-string">&quot;tags&quot;</span>: FieldOp.array_append()},</span>
)

res = client.query(
    collection_name=<span class="hljs-string">&quot;users&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;pk in [1, 2]&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;pk&quot;</span>, <span class="hljs-string">&quot;tags&quot;</span>],
)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># data: [</span>
<span class="hljs-comment">#   &quot;{&#x27;pk&#x27;: 1, &#x27;tags&#x27;: [&#x27;new&#x27;, &#x27;premium&#x27;, &#x27;vip&#x27;]}&quot;,</span>
<span class="hljs-comment">#   &quot;{&#x27;pk&#x27;: 2, &#x27;tags&#x27;: [&#x27;new&#x27;, &#x27;trial&#x27;, &#x27;premium&#x27;]}&quot;</span>
<span class="hljs-comment"># ]</span>

<span class="hljs-comment"># 4. Remove matching tags without replacing the full ARRAY field</span>
client.upsert(
    collection_name=<span class="hljs-string">&quot;users&quot;</span>,
<span class="highlighted-comment-line">    data=[</span>
<span class="highlighted-comment-line">        {<span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;new&quot;</span>]},</span>
<span class="highlighted-comment-line">        {<span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;trial&quot;</span>]},</span>
<span class="highlighted-comment-line">    ],</span>
<span class="highlighted-comment-line">    field_ops={<span class="hljs-string">&quot;tags&quot;</span>: FieldOp.array_remove()},</span>
)

res = client.query(
    collection_name=<span class="hljs-string">&quot;users&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;pk in [1, 2]&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;pk&quot;</span>, <span class="hljs-string">&quot;tags&quot;</span>],
)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># data: [</span>
<span class="hljs-comment">#   &quot;{&#x27;pk&#x27;: 1, &#x27;tags&#x27;: [&#x27;premium&#x27;, &#x27;vip&#x27;]}&quot;,</span>
<span class="hljs-comment">#   &quot;{&#x27;pk&#x27;: 2, &#x27;tags&#x27;: [&#x27;new&#x27;, &#x27;premium&#x27;]}&quot;</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;
<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.ConsistencyLevel;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.UpsertReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.QueryResp;

<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.List;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build());
<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();

<span class="hljs-comment">// 1. Create a collection with an ARRAY&lt;VARCHAR&gt; field</span>
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> CreateCollectionReq.CollectionSchema.builder()
        .enableDynamicField(<span class="hljs-literal">false</span>)
        .build();

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;pk&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;embedding&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">5</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;tags&quot;</span>)
        .dataType(DataType.Array)
        .elementType(DataType.VarChar)
        .maxCapacity(<span class="hljs-number">8</span>)
        .maxLength(<span class="hljs-number">32</span>)
        .build());

List&lt;IndexParam&gt; indexParams = Collections.singletonList(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;embedding&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.L2)
        .build());

client.createCollection(CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;users&quot;</span>)
        .collectionSchema(schema)
        .indexParams(indexParams)
        .consistencyLevel(ConsistencyLevel.STRONG)
        .build());

<span class="hljs-comment">// 2. Seed two entities</span>
List&lt;JsonObject&gt; data = Arrays.asList(
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;pk\&quot;: 1, \&quot;embedding\&quot;: [0.1, 0.2, 0.3, 0.4, 0.5], \&quot;tags\&quot;: [\&quot;new\&quot;]}&quot;</span>, JsonObject.class),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;pk\&quot;: 2, \&quot;embedding\&quot;: [0.6, 0.7, 0.8, 0.9, 1.0], \&quot;tags\&quot;: [\&quot;new\&quot;, \&quot;trial\&quot;]}&quot;</span>, JsonObject.class)
);

client.insert(InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;users&quot;</span>)
        .data(data)
        .build());

<span class="hljs-comment">// 3. Append tags without reading the existing ARRAY values</span>
List&lt;JsonObject&gt; appendData = Arrays.asList(
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;pk\&quot;: 1, \&quot;tags\&quot;: [\&quot;premium\&quot;, \&quot;vip\&quot;]}&quot;</span>, JsonObject.class),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;pk\&quot;: 2, \&quot;tags\&quot;: [\&quot;premium\&quot;]}&quot;</span>, JsonObject.class)
);

UpsertReq.<span class="hljs-type">FieldPartialUpdateOp</span> <span class="hljs-variable">appendTags</span> <span class="hljs-operator">=</span> UpsertReq.FieldPartialUpdateOp.builder()
        .fieldName(<span class="hljs-string">&quot;tags&quot;</span>)
        .opType(UpsertReq.FieldPartialUpdateOp.OpType.ARRAY_APPEND)
        .build();

client.upsert(UpsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;users&quot;</span>)
<span class="highlighted-comment-line">        .data(appendData)</span>
<span class="highlighted-comment-line">        .fieldOps(Collections.singletonList(appendTags))</span>
        .build());

<span class="hljs-type">QueryResp</span> <span class="hljs-variable">res</span> <span class="hljs-operator">=</span> client.query(QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;users&quot;</span>)
        .filter(<span class="hljs-string">&quot;pk in [1, 2]&quot;</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;pk&quot;</span>, <span class="hljs-string">&quot;tags&quot;</span>))
        .consistencyLevel(ConsistencyLevel.STRONG)
        .build());
System.out.println(res);

<span class="hljs-comment">// Example output:</span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//   {&quot;pk&quot;: 1, &quot;tags&quot;: [&quot;new&quot;, &quot;premium&quot;, &quot;vip&quot;]},</span>
<span class="hljs-comment">//   {&quot;pk&quot;: 2, &quot;tags&quot;: [&quot;new&quot;, &quot;trial&quot;, &quot;premium&quot;]}</span>
<span class="hljs-comment">// ]</span>

<span class="hljs-comment">// 4. Remove matching tags without replacing the full ARRAY field</span>
List&lt;JsonObject&gt; removeData = Arrays.asList(
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;pk\&quot;: 1, \&quot;tags\&quot;: [\&quot;new\&quot;]}&quot;</span>, JsonObject.class),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;pk\&quot;: 2, \&quot;tags\&quot;: [\&quot;trial\&quot;]}&quot;</span>, JsonObject.class)
);

UpsertReq.<span class="hljs-type">FieldPartialUpdateOp</span> <span class="hljs-variable">removeTags</span> <span class="hljs-operator">=</span> UpsertReq.FieldPartialUpdateOp.builder()
        .fieldName(<span class="hljs-string">&quot;tags&quot;</span>)
        .opType(UpsertReq.FieldPartialUpdateOp.OpType.ARRAY_REMOVE)
        .build();

client.upsert(UpsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;users&quot;</span>)
<span class="highlighted-comment-line">        .data(removeData)</span>
<span class="highlighted-comment-line">        .fieldOps(Collections.singletonList(removeTags))</span>
        .build());

res = client.query(QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;users&quot;</span>)
        .filter(<span class="hljs-string">&quot;pk in [1, 2]&quot;</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;pk&quot;</span>, <span class="hljs-string">&quot;tags&quot;</span>))
        .consistencyLevel(ConsistencyLevel.STRONG)
        .build());
System.out.println(res);

<span class="hljs-comment">// Example output:</span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//   {&quot;pk&quot;: 1, &quot;tags&quot;: [&quot;premium&quot;, &quot;vip&quot;]},</span>
<span class="hljs-comment">//   {&quot;pk&quot;: 2, &quot;tags&quot;: [&quot;new&quot;, &quot;premium&quot;]}</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
