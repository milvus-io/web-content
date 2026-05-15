---
id: set-collection-ttl.md
title: コレクションTTLの設定
summary: Milvusで自動的に古いデータを失効させるために、コレクションレベルまたはエンティティレベルのTTLポリシーを設定します。
---
<h1 id="Set-Collection-TTL" class="common-anchor-header">コレクションTTLの設定<button data-href="#Set-Collection-TTL" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusは<strong>TTL（Time-to-Live）</strong>ポリシーにより、エンティティを自動的に失効させることができます。期限切れのエンティティはクエリや検索結果に直ちに表示されなくなり、次のコンパクションサイクル（通常は24時間以内）にストレージから物理的に削除されます。</p>
<p>TTLには2つのモードがあります：</p>
<ul>
<li><p><strong>コレクションレベルのTTL</strong>- すべてのエンティティで共有される1つの保持ウィンドウで、<code translate="no">collection.ttl.seconds</code> プロパティで設定します。</p></li>
<li><p><strong>エンティティレベルのTTL</strong>- 各エンティティは、<code translate="no">ttl_field</code> プロパティを通じてTTLフィールドとしてマークされた専用の<code translate="no">TIMESTAMPTZ</code> フィールドに、独自の絶対的な有効期限を保持します。</p></li>
</ul>
<div class="alert note">
<p>この機能は、管理されたコレクションにのみ適用されます。</p>
</div>
<h2 id="Limits" class="common-anchor-header">制限<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>2つのTTLモードは相互に排他的です。コレクションに<code translate="no">collection.ttl.seconds</code> と<code translate="no">ttl_field</code> の両方を同時に設定することはできません。切り替えるには、<a href="/docs/ja/set-collection-ttl.md#Migrate-between-the-two-modes">2つのモード間の移行を</a>参照してください。</p></li>
<li><p>コレクションレベルのTTLは、1つのウィンドウをコレクション全体に適用します。1つの行に異なる有効期間が必要な場合は、エンティティレベルTTLを使用します。</p></li>
<li><p>エンティティレベルTTLのフィールドは<code translate="no">TIMESTAMPTZ</code> でなければなりません。他のタイプは拒否される。</p></li>
<li><p>コレクションごとに1つのTTLフィールド。スキーマには複数の<code translate="no">TIMESTAMPTZ</code> フィールドを含めることができますが、<code translate="no">ttl_field</code> に名前を付けることができるのは 1 つだけです。</p></li>
<li><p><code translate="no">ttl_field</code> を削除しても、期限切れエンティティは復活しない。期限切れエンティティを復活させるには、<code translate="no">NULL</code> または将来の期限切れタイムスタンプでアップサートを行います。</p></li>
</ul>
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
    </button></h2><p><details></p>
<p><summary>拡張</summary></p>
<h3 id="When-to-use-TTL" class="common-anchor-header">TTLを使用する場合<button data-href="#When-to-use-TTL" class="anchor-icon" translate="no">
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
    </button></h3><p>TTLは、保持が<strong>ポリシー</strong>である場合に適したツールです。特定のエンティティが最終的に消滅することを事前に知っていて、cronジョブを記述しなくてもクラスタにそれを強制させたい場合です。</p>
<p>典型的なシナリオ</p>
<ul>
<li><p><strong>時間窓付きのデータセット。</strong>過去N日間のログ、メトリクス、イベント、短期間のフィーチャーキャッシュのみを保存する。</p></li>
<li><p><strong>マルチテナントのコレクション。</strong>同じコレクションでもテナントによって保持期間が異なります。</p></li>
<li><p><strong>レコード単位の保持ポリシー。</strong>IoTパイプライン、ドキュメントストア、またはMLOpsフィーチャーストアのドキュメントごとのライフタイム。</p></li>
<li><p><strong>ホットデータとコールドデータの混在。</strong>同じコレクション内で、寿命の短いエンティティと長期のエンティティを共存させる。</p></li>
<li><p><strong>コンプライアンス主導の期限切れ。</strong>GDPRスタイルのデータ最小化では、各レコードに独自の「削除期限」が設定されます。</p></li>
<li><p><strong>ビジネスタイムエクスペリエンス。</strong>エンティティは、ある絶対的な瞬間（キャンペーンの終了、セッションの期限切れ）までしか有効でないレコードを表します。</p></li>
</ul>
<div class="alert note">
<p>期限切れのエンティティは、検索結果やクエリ結果に表示されません。ただし、24時間以内に実行されるはずのデータ・コンパクションが行われるまでは、ストレージに残っている可能性があります。</p>
<p>Milvus設定ファイルの<code translate="no">dataCoord.compaction.expiry.tolerance</code> 設定項目を設定することで、いつデータコンパクションを開始するかを制御することができます。</p>
<p>この設定項目のデフォルトは<code translate="no">-1</code> で、既存のデータ圧縮間隔が適用されることを示しています。しかし、この値を<code translate="no">12</code> のような正の整数に変更すると、エンティティの有効期限が切れた後、指定した時間数後にデータ圧縮が開始されます。</p>
</div>
<h3 id="TTL-modes" class="common-anchor-header">TTLモード<button data-href="#TTL-modes" class="anchor-icon" translate="no">
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
    </button></h3><p>2つのモードは、異なる保持に関する質問に答えます：</p>
<ul>
<li><p><strong>コレクションレベルのTTLは</strong>、すべてのエンティティに単一の保持期間を適用します。各エンティティの有効期限は<code translate="no">insert_ts + ttl_seconds</code> です。</p></li>
<li><p><strong>Entity-level TTLでは</strong>、各エンティティは<code translate="no">TIMESTAMPTZ</code> フィールドに自身の絶対的な有効期限を保存する。そのフィールドの<code translate="no">NULL</code> は、そのエンティティの有効期限がないことを意味します。</p></li>
</ul>
<p>コレクションは一度に<strong>1つの</strong>モードを使用する。2つのモード間の移行を参照してください。</p>
<p>この表を使用してモードを選択してください：</p>
<table>
   <tr>
     <th><p><strong>もしあなたの状況が...</strong></p></th>
     <th><p><strong>使用</strong></p></th>
   </tr>
   <tr>
     <td><p>コレクション内のすべてのエンティティが同じ保持ウィンドウに従う必要があります。</p></td>
     <td><p>コレクションレベルのTTL</p></td>
   </tr>
   <tr>
     <td><p>保持は "挿入の瞬間からN秒保持"</p></td>
     <td><p>コレクションレベルのTTL</p></td>
   </tr>
   <tr>
     <td><p>同じコレクション内で異なるエンティティは異なるライフタイムが必要（テナントごと、ホット/コールド、ドキュメントごと）</p></td>
     <td><p>エンティティレベルのTTL</p></td>
   </tr>
   <tr>
     <td><p>保持は絶対壁時計時間（たとえば2027-01-01T00:00:00Z）。</p></td>
     <td><p>エンティティレベルのTTL</p></td>
   </tr>
   <tr>
     <td><p>保持は、挿入タイムスタンプではなく、ビジネス・タイムスタンプによって行われる。</p></td>
     <td><p>エンティティレベルのTTL</p></td>
   </tr>
   <tr>
     <td><p>挿入後にエンティティの有効期間を更新または延長したい場合</p></td>
     <td><p>エンティティレベルのTTL</p></td>
   </tr>
   <tr>
     <td><p>エンティティの中には期限切れにならないものもあれば、期限切れになるものもある</p></td>
     <td><p>エンティティレベルのTTL (不滅のものにはNULLを使用)</p></td>
   </tr>
</table>
<p></details></p>
<h2 id="Set-collection-level-TTL" class="common-anchor-header">コレクションレベルTTLの設定<button data-href="#Set-collection-level-TTL" class="anchor-icon" translate="no">
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
    </button></h2><p>コレクション内のすべてのエンティティが同じ保持ウィンドウに従う必要がある場合は、コレクションレベルのTTLを使用します。</p>
<h3 id="Enable-on-a-new-collection" class="common-anchor-header">新しいコレクションで有効にする<button data-href="#Enable-on-a-new-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>作成時に<code translate="no">properties</code> マップを通して<code translate="no">collection.ttl.seconds</code> (整数、秒単位) を渡す。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>)

index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>
)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
    index_params=index_params,
<span class="highlighted-comment-line">    properties={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>: <span class="hljs-number">1209600</span>  <span class="hljs-comment"># 14 days</span></span>
<span class="highlighted-comment-line">    },</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> CreateCollectionReq.CollectionSchema.builder().build();
schema.addField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;id&quot;</span>).dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>).autoID(<span class="hljs-literal">false</span>).build());
schema.addField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;vector&quot;</span>).dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">128</span>).build());

<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParam</span> <span class="hljs-operator">=</span> IndexParam.builder().fieldName(<span class="hljs-string">&quot;vector&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.COSINE).build();

<span class="highlighted-comment-line">Map&lt;String, String&gt; properties = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();</span>
<span class="highlighted-comment-line">properties.put(<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>, <span class="hljs-string">&quot;1209600&quot;</span>); <span class="hljs-comment">// 14 days</span></span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line">client.createCollection(CreateCollectionReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .collectionSchema(schema)</span>
<span class="highlighted-comment-line">        .indexParams(Collections.singletonList(indexParam))</span>
<span class="highlighted-comment-line">        .properties(properties)</span>
<span class="highlighted-comment-line">        .build());</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
  <span class="hljs-attr">fields</span>: [
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>, <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">autoID</span>: <span class="hljs-literal">false</span> },
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>, <span class="hljs-attr">dim</span>: <span class="hljs-number">128</span> },
  ],
  <span class="hljs-attr">index_params</span>: [
    { <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;COSINE&quot;</span> },
  ],
<span class="highlighted-comment-line">  <span class="hljs-attr">properties</span>: {</span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>: <span class="hljs-number">1209600</span>, <span class="hljs-comment">// 14 days</span></span>
<span class="highlighted-comment-line">  },</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;my_collection&quot;</span>, schema).
    WithProperty(common.CollectionTTLConfigKey, <span class="hljs-number">1209600</span>)) <span class="hljs-comment">//  TTL in seconds</span>
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> params=<span class="hljs-string">&#x27;{
    &quot;ttlSeconds&quot;: 1209600
}&#x27;</span>

<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;params\&quot;: <span class="hljs-variable">$params</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Enable-on-an-existing-collection" class="common-anchor-header">既存のコレクションで有効にする<button data-href="#Enable-on-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>すでに使用されているコレクションにTTLを適用するには、<code translate="no">properties</code> マップで<code translate="no">collection.ttl.seconds</code> を使用して<code translate="no">alter_collection_properties</code> を呼び出します。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Assumes &quot;my_collection&quot; was created earlier without TTL</span>
schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>)

index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>
)

<span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> client.has_collection(<span class="hljs-string">&quot;my_collection&quot;</span>):
    client.create_collection(
        collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
        schema=schema,
        index_params=index_params,
    )

<span class="highlighted-comment-line">client.alter_collection_properties(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    properties={<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>: <span class="hljs-number">1209600</span>},</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AlterCollectionPropertiesReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="hljs-comment">// Assumes &quot;my_collection&quot; was created earlier without TTL.</span>

<span class="highlighted-comment-line">Map&lt;String, String&gt; properties = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();</span>
<span class="highlighted-comment-line">properties.put(<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>, <span class="hljs-string">&quot;1209600&quot;</span>);</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line">client.alterCollectionProperties(AlterCollectionPropertiesReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .properties(properties)</span>
<span class="highlighted-comment-line">        .build());</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="hljs-comment">// Assumes &quot;my_collection&quot; was created earlier without TTL.</span>
<span class="highlighted-comment-line"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">alterCollectionProperties</span>({</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">properties</span>: { <span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>: <span class="hljs-number">1209600</span> },</span>
<span class="highlighted-comment-line">});</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.AlterCollectionProperties(ctx, milvusclient.NewAlterCollectionPropertiesOption(<span class="hljs-string">&quot;my_collection&quot;</span>).
    WithProperty(common.CollectionTTLConfigKey, <span class="hljs-number">60</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/alter_properties&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;properties\&quot;: {
        \&quot;collection.ttl.seconds\&quot;: 1209600
    }
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Drop-the-TTL-setting" class="common-anchor-header">TTL設定の削除<button data-href="#Drop-the-TTL-setting" class="anchor-icon" translate="no">
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
    </button></h3><p>コレクション内のデータを無期限に保持することを決定した場合、そのコレクションからTTL設定を削除するだけです。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.drop_collection_properties(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    property_keys=[<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>],</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.DropCollectionPropertiesReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="highlighted-comment-line">client.dropCollectionProperties(DropCollectionPropertiesReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .propertyKeys(Collections.singletonList(<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>))</span>
<span class="highlighted-comment-line">        .build());</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="highlighted-comment-line"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropCollectionProperties</span>({</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">properties</span>: [<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>],</span>
<span class="highlighted-comment-line">});</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.DropCollectionProperties(ctx, milvusclient.NewDropCollectionPropertiesOption(<span class="hljs-string">&quot;my_collection&quot;</span>, common.CollectionTTLConfigKey))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/drop_properties&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;propertyKeys\&quot;: [
        \&quot;collection.ttl.seconds\&quot;
    ]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-entity-level-TTL--Milvus-30x" class="common-anchor-header">エンティティレベルのTTL設定<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Set-entity-level-TTL--Milvus-30x" class="anchor-icon" translate="no">
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
    </button></h2><p>エンティティレベルのTTLは、各エンティティに絶対的な有効期限を持たせます。この時間は、スキーマで宣言した専用の<code translate="no">TIMESTAMPTZ</code> 列に格納され、<code translate="no">ttl_field</code> コレクションプロパティでその列を TTL フィールドとしてマークします。</p>
<h3 id="Enable-on-a-new-collection" class="common-anchor-header">新しいコレクションで有効にする<button data-href="#Enable-on-a-new-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>作成時にエンティティレベルのTTLを有効にするには、同じ<code translate="no">create_collection</code> 呼び出しで2つの追加が必要です。スキーマ内の<code translate="no">TIMESTAMPTZ</code> フィールドと、そのフィールドを指す<code translate="no">ttl_field</code> プロパティです。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

schema = client.create_schema(enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
<span class="highlighted-wrapper-line">schema.add_field(<span class="hljs-string">&quot;expire_at&quot;</span>, DataType.TIMESTAMPTZ, nullable=<span class="hljs-literal">True</span>)</span>
schema.add_field(<span class="hljs-string">&quot;vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>)

index_params = client.prepare_index_params()
index_params.add_index(field_name=<span class="hljs-string">&quot;vector&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
                       metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
    index_params=index_params,
<span class="highlighted-wrapper-line">    properties={<span class="hljs-string">&quot;ttl_field&quot;</span>: <span class="hljs-string">&quot;expire_at&quot;</span>},</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> CreateCollectionReq.CollectionSchema.builder().build();
schema.addField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;id&quot;</span>).dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>).autoID(<span class="hljs-literal">false</span>).build());
<span class="highlighted-wrapper-line">schema.addField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;expire_at&quot;</span>).dataType(DataType.Timestamptz)</span>
        .isNullable(<span class="hljs-literal">true</span>).build());
schema.addField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;vector&quot;</span>).dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">128</span>).build());

<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParam</span> <span class="hljs-operator">=</span> IndexParam.builder().fieldName(<span class="hljs-string">&quot;vector&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.COSINE).build();

<span class="highlighted-wrapper-line">Map&lt;String, String&gt; properties = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();</span>
<span class="highlighted-wrapper-line">properties.put(<span class="hljs-string">&quot;ttl_field&quot;</span>, <span class="hljs-string">&quot;expire_at&quot;</span>);</span>

client.createCollection(CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .collectionSchema(schema)
        .indexParams(Collections.singletonList(indexParam))
        .properties(properties)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
  <span class="hljs-attr">fields</span>: [
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>, <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">autoID</span>: <span class="hljs-literal">false</span> },
<span class="highlighted-wrapper-line">    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;expire_at&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Timestamptz</span>, <span class="hljs-attr">nullable</span>: <span class="hljs-literal">true</span> },</span>
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>, <span class="hljs-attr">dim</span>: <span class="hljs-number">128</span> },
  ],
  <span class="hljs-attr">index_params</span>: [
    { <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;COSINE&quot;</span> },
  ],
<span class="highlighted-wrapper-line">  <span class="hljs-attr">properties</span>: { <span class="hljs-attr">ttl_field</span>: <span class="hljs-string">&quot;expire_at&quot;</span> },</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>コレクションが存在したら、<a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>タイムスタンプ文字列を持つエンティティを挿入する。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Assumes &quot;my_collection&quot; was created earlier with `ttl_field`: &quot;expire_at&quot;</span>
<span class="highlighted-comment-line">rows = [</span>
<span class="highlighted-comment-line">    <span class="hljs-comment"># Never expires</span></span>
<span class="highlighted-comment-line">    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;expire_at&quot;</span>: <span class="hljs-literal">None</span>,</span>
<span class="highlighted-comment-line">     <span class="hljs-string">&quot;vector&quot;</span>: [random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">128</span>)]},</span>
<span class="highlighted-comment-line">    <span class="hljs-comment"># Expires at 2026-12-31 UTC midnight</span></span>
<span class="highlighted-comment-line">    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&quot;expire_at&quot;</span>: <span class="hljs-string">&quot;2026-12-31T00:00:00Z&quot;</span>,</span>
<span class="highlighted-comment-line">     <span class="hljs-string">&quot;vector&quot;</span>: [random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">128</span>)]},</span>
<span class="highlighted-comment-line">    <span class="hljs-comment"># Shanghai local time — normalized to UTC internally</span></span>
<span class="highlighted-comment-line">    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&quot;expire_at&quot;</span>: <span class="hljs-string">&quot;2027-01-01T00:00:00+08:00&quot;</span>,</span>
<span class="highlighted-comment-line">     <span class="hljs-string">&quot;vector&quot;</span>: [random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">128</span>)]},</span>
<span class="highlighted-comment-line">]</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line">client.insert(<span class="hljs-string">&quot;my_collection&quot;</span>, rows)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.List;
<span class="hljs-keyword">import</span> java.util.Random;

<span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonNull;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;

<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="hljs-comment">// Assumes &quot;my_collection&quot; was created earlier with `ttl_field`: &quot;expire_at&quot;.</span>
<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
<span class="hljs-type">Random</span> <span class="hljs-variable">rng</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Random</span>();

List&lt;Float&gt; vector = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
<span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> <span class="hljs-variable">i</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">128</span>; i++) vector.add(rng.nextFloat());

<span class="highlighted-comment-line">List&lt;JsonObject&gt; rows = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment">// Never expires</span></span>
<span class="highlighted-comment-line"><span class="hljs-type">JsonObject</span> <span class="hljs-variable">r1</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();</span>
<span class="highlighted-comment-line">r1.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">1</span>);</span>
<span class="highlighted-comment-line">r1.add(<span class="hljs-string">&quot;expire_at&quot;</span>, JsonNull.INSTANCE);</span>
<span class="highlighted-comment-line">r1.add(<span class="hljs-string">&quot;vector&quot;</span>, gson.toJsonTree(vector));</span>
<span class="highlighted-comment-line">rows.add(r1);</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment">// Expires at 2026-12-31 UTC midnight</span></span>
<span class="highlighted-comment-line"><span class="hljs-type">JsonObject</span> <span class="hljs-variable">r2</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();</span>
<span class="highlighted-comment-line">r2.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">2</span>);</span>
<span class="highlighted-comment-line">r2.addProperty(<span class="hljs-string">&quot;expire_at&quot;</span>, <span class="hljs-string">&quot;2026-12-31T00:00:00Z&quot;</span>);</span>
<span class="highlighted-comment-line">r2.add(<span class="hljs-string">&quot;vector&quot;</span>, gson.toJsonTree(vector));</span>
<span class="highlighted-comment-line">rows.add(r2);</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment">// Shanghai local time — normalized to UTC internally</span></span>
<span class="highlighted-comment-line"><span class="hljs-type">JsonObject</span> <span class="hljs-variable">r3</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();</span>
<span class="highlighted-comment-line">r3.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">3</span>);</span>
<span class="highlighted-comment-line">r3.addProperty(<span class="hljs-string">&quot;expire_at&quot;</span>, <span class="hljs-string">&quot;2027-01-01T00:00:00+08:00&quot;</span>);</span>
<span class="highlighted-comment-line">r3.add(<span class="hljs-string">&quot;vector&quot;</span>, gson.toJsonTree(vector));</span>
<span class="highlighted-comment-line">rows.add(r3);</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line">client.insert(InsertReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .data(rows)</span>
<span class="highlighted-comment-line">        .build());</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="hljs-keyword">const</span> vector = <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>({ <span class="hljs-attr">length</span>: <span class="hljs-number">128</span> }, <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>());

<span class="hljs-comment">// Assumes &quot;my_collection&quot; was created earlier with `ttl_field`: &quot;expire_at&quot;.</span>
<span class="highlighted-comment-line"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">data</span>: [</span>
<span class="highlighted-comment-line">    <span class="hljs-comment">// Never expires</span></span>
<span class="highlighted-comment-line">    { <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">expire_at</span>: <span class="hljs-literal">null</span>, vector },</span>
<span class="highlighted-comment-line">    <span class="hljs-comment">// Expires at 2026-12-31 UTC midnight</span></span>
<span class="highlighted-comment-line">    { <span class="hljs-attr">id</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">expire_at</span>: <span class="hljs-string">&quot;2026-12-31T00:00:00Z&quot;</span>, vector },</span>
<span class="highlighted-comment-line">    <span class="hljs-comment">// Shanghai local time — normalized to UTC internally</span></span>
<span class="highlighted-comment-line">    { <span class="hljs-attr">id</span>: <span class="hljs-number">3</span>, <span class="hljs-attr">expire_at</span>: <span class="hljs-string">&quot;2027-01-01T00:00:00+08:00&quot;</span>, vector },</span>
<span class="highlighted-comment-line">  ],</span>
<span class="highlighted-comment-line">});</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>すべてのクエリとベクトル検索で、サーバーはTTLフィルターを自動注入します：</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

client.load_collection(<span class="hljs-string">&quot;my_collection&quot;</span>)

<span class="highlighted-comment-line"><span class="hljs-comment"># Expired rows are filtered out automatically</span></span>
<span class="highlighted-comment-line">results = client.query(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;id &gt;= 0&quot;</span>,</span>
<span class="highlighted-comment-line">    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;expire_at&quot;</span>],</span>
<span class="highlighted-comment-line">    limit=<span class="hljs-number">10</span>,</span>
<span class="highlighted-comment-line">)</span>
<span class="highlighted-comment-line"><span class="hljs-built_in">print</span>(results)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Arrays;

<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.LoadCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.QueryResp;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

client.loadCollection(LoadCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .build());

<span class="highlighted-comment-line"><span class="hljs-comment">// Expired rows are filtered out automatically</span></span>
<span class="highlighted-comment-line"><span class="hljs-type">QueryResp</span> <span class="hljs-variable">results</span> <span class="hljs-operator">=</span> client.query(QueryReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .filter(<span class="hljs-string">&quot;id &gt;= 0&quot;</span>)</span>
<span class="highlighted-comment-line">        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;expire_at&quot;</span>))</span>
<span class="highlighted-comment-line">        .limit(<span class="hljs-number">10L</span>)</span>
<span class="highlighted-comment-line">        .build());</span>
<span class="highlighted-comment-line">System.out.println(results.getQueryResults());</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">loadCollection</span>({ <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span> });

<span class="highlighted-comment-line"><span class="hljs-comment">// Expired rows are filtered out automatically</span></span>
<span class="highlighted-comment-line"><span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">filter</span>: <span class="hljs-string">&quot;id &gt;= 0&quot;</span>,</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;expire_at&quot;</span>],</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,</span>
<span class="highlighted-comment-line">});</span>
<span class="highlighted-comment-line"><span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(results.<span class="hljs-property">data</span>);</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>同じ自動フィルターが<code translate="no">client.search()</code> にも適用される。</p>
<p>コンパクションによって物理的に削除される前にエンティティの有効期限を延長するには、有効期限タイムスタンプを遅くしてアップサートを行うか、<code translate="no">None</code> 。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.upsert(<span class="hljs-string">&quot;my_collection&quot;</span>, [</span>
<span class="highlighted-comment-line">    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,</span>
<span class="highlighted-comment-line">     <span class="hljs-string">&quot;vector&quot;</span>: [random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">128</span>)],</span>
<span class="highlighted-comment-line">     <span class="hljs-string">&quot;expire_at&quot;</span>: <span class="hljs-string">&quot;2028-01-01T00:00:00Z&quot;</span>},</span>
<span class="highlighted-comment-line">])</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.List;
<span class="hljs-keyword">import</span> java.util.Random;

<span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;

<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.UpsertReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
<span class="hljs-type">Random</span> <span class="hljs-variable">rng</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Random</span>();
List&lt;Float&gt; vector = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
<span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> <span class="hljs-variable">i</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">128</span>; i++) vector.add(rng.nextFloat());

<span class="highlighted-comment-line"><span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();</span>
<span class="highlighted-comment-line">row.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">2</span>);</span>
<span class="highlighted-comment-line">row.add(<span class="hljs-string">&quot;vector&quot;</span>, gson.toJsonTree(vector));</span>
<span class="highlighted-comment-line">row.addProperty(<span class="hljs-string">&quot;expire_at&quot;</span>, <span class="hljs-string">&quot;2028-01-01T00:00:00Z&quot;</span>);</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line">client.upsert(UpsertReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .data(Collections.singletonList(row))</span>
<span class="highlighted-comment-line">        .build());</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="hljs-keyword">const</span> vector = <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>({ <span class="hljs-attr">length</span>: <span class="hljs-number">128</span> }, <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>());

<span class="highlighted-comment-line"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">upsert</span>({</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">data</span>: [</span>
<span class="highlighted-comment-line">    { <span class="hljs-attr">id</span>: <span class="hljs-number">2</span>, vector, <span class="hljs-attr">expire_at</span>: <span class="hljs-string">&quot;2028-01-01T00:00:00Z&quot;</span> },</span>
<span class="highlighted-comment-line">  ],</span>
<span class="highlighted-comment-line">});</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Enable-on-an-existing-collection" class="common-anchor-header">既存のコレクションで有効にする<button data-href="#Enable-on-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>コレクションが既に存在し、<code translate="no">collection.ttl.seconds</code> が設定されていない場合、<code translate="no">add_collection_field</code> で<code translate="no">TIMESTAMPTZ</code> カラムを追加し、<code translate="no">alter_collection_properties</code> で TTL フィールドとしてマークします。オプションで、有効期限タイムスタンプを埋め戻すために過去の行をアップサートする - 埋め戻さない行は、<code translate="no">NULL</code> 、有効期限が切れることはない。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line"><span class="hljs-comment"># Step 1 — add a TIMESTAMPTZ column to the schema</span></span>
<span class="highlighted-comment-line">client.add_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;expire_at&quot;</span>,</span>
<span class="highlighted-comment-line">    data_type=DataType.TIMESTAMPTZ,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment"># Step 2 — mark the new column as the TTL field</span></span>
<span class="highlighted-comment-line">client.alter_collection_properties(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    properties={<span class="hljs-string">&quot;ttl_field&quot;</span>: <span class="hljs-string">&quot;expire_at&quot;</span>},</span>
<span class="highlighted-comment-line">)</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment"># Step 3 (optional) — backfill expiration timestamps for historical rows</span></span>
<span class="highlighted-comment-line">client.upsert(<span class="hljs-string">&quot;my_collection&quot;</span>, [</span>
<span class="highlighted-comment-line">    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,</span>
<span class="highlighted-comment-line">     <span class="hljs-string">&quot;vector&quot;</span>: [random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">128</span>)],</span>
<span class="highlighted-comment-line">     <span class="hljs-string">&quot;expire_at&quot;</span>: <span class="hljs-string">&quot;2026-12-31T00:00:00Z&quot;</span>},</span>
<span class="highlighted-comment-line">])</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.List;
<span class="hljs-keyword">import</span> java.util.Map;
<span class="hljs-keyword">import</span> java.util.Random;

<span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;

<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddCollectionFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AlterCollectionPropertiesReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.UpsertReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="highlighted-comment-line"><span class="hljs-comment">// Step 1 — add a TIMESTAMPTZ column to the schema</span></span>
<span class="highlighted-comment-line">client.addCollectionField(AddCollectionFieldReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .fieldName(<span class="hljs-string">&quot;expire_at&quot;</span>)</span>
<span class="highlighted-comment-line">        .dataType(DataType.Timestamptz)</span>
<span class="highlighted-comment-line">        .isNullable(<span class="hljs-literal">true</span>)</span>
<span class="highlighted-comment-line">        .build());</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment">// Step 2 — mark the new column as the TTL field</span></span>
<span class="highlighted-comment-line">Map&lt;String, String&gt; properties = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();</span>
<span class="highlighted-comment-line">properties.put(<span class="hljs-string">&quot;ttl_field&quot;</span>, <span class="hljs-string">&quot;expire_at&quot;</span>);</span>
<span class="highlighted-comment-line">client.alterCollectionProperties(AlterCollectionPropertiesReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .properties(properties)</span>
<span class="highlighted-comment-line">        .build());</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment">// Step 3 (optional) — backfill expiration timestamps for historical rows</span></span>
<span class="highlighted-comment-line"><span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();</span>
<span class="highlighted-comment-line"><span class="hljs-type">Random</span> <span class="hljs-variable">rng</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Random</span>();</span>
<span class="highlighted-comment-line">List&lt;Float&gt; vector = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();</span>
<span class="highlighted-comment-line"><span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> <span class="hljs-variable">i</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">128</span>; i++) vector.add(rng.nextFloat());</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();</span>
<span class="highlighted-comment-line">row.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">1</span>);</span>
<span class="highlighted-comment-line">row.add(<span class="hljs-string">&quot;vector&quot;</span>, gson.toJsonTree(vector));</span>
<span class="highlighted-comment-line">row.addProperty(<span class="hljs-string">&quot;expire_at&quot;</span>, <span class="hljs-string">&quot;2026-12-31T00:00:00Z&quot;</span>);</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line">client.upsert(UpsertReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .data(Collections.singletonList(row))</span>
<span class="highlighted-comment-line">        .build());</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="hljs-keyword">const</span> vector = <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>({ <span class="hljs-attr">length</span>: <span class="hljs-number">128</span> }, <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>());

<span class="highlighted-comment-line"><span class="hljs-comment">// Step 1 — add a TIMESTAMPTZ column to the schema</span></span>
<span class="highlighted-comment-line"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">addCollectionField</span>({</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">field</span>: { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;expire_at&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Timestamptz</span>, <span class="hljs-attr">nullable</span>: <span class="hljs-literal">true</span> },</span>
<span class="highlighted-comment-line">});</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment">// Step 2 — mark the new column as the TTL field</span></span>
<span class="highlighted-comment-line"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">alterCollectionProperties</span>({</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">properties</span>: { <span class="hljs-attr">ttl_field</span>: <span class="hljs-string">&quot;expire_at&quot;</span> },</span>
<span class="highlighted-comment-line">});</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment">// Step 3 (optional) — backfill expiration timestamps for historical rows</span></span>
<span class="highlighted-comment-line"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">upsert</span>({</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">data</span>: [</span>
<span class="highlighted-comment-line">    { <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, vector, <span class="hljs-attr">expire_at</span>: <span class="hljs-string">&quot;2026-12-31T00:00:00Z&quot;</span> },</span>
<span class="highlighted-comment-line">  ],</span>
<span class="highlighted-comment-line">});</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Drop-the-TTL-setting" class="common-anchor-header">TTL設定を削除<button data-href="#Drop-the-TTL-setting" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">property_keys</code> の<code translate="no">ttl_field</code> で<code translate="no">drop_collection_properties</code> を呼び出し、エンティティごとの有効期限を止める。<code translate="no">TIMESTAMPTZ</code> カラム自体はスキーマに残ります - 通常のフィールドとしてクエリできます。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.drop_collection_properties(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    property_keys=[<span class="hljs-string">&quot;ttl_field&quot;</span>],</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.DropCollectionPropertiesReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="highlighted-comment-line">client.dropCollectionProperties(DropCollectionPropertiesReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .propertyKeys(Collections.singletonList(<span class="hljs-string">&quot;ttl_field&quot;</span>))</span>
<span class="highlighted-comment-line">        .build());</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="highlighted-comment-line"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropCollectionProperties</span>({</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">properties</span>: [<span class="hljs-string">&quot;ttl_field&quot;</span>],</span>
<span class="highlighted-comment-line">});</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ttl_field</code> を削除すると、今後のクエリの自動フィルタが無効になりますが、すでに期限切れになったエンティティが再び自動的に表示されることはありません。<code translate="no">None</code> 同じロードセッション内で期限切れ行へのアクセスを回復する唯一の方法です。</p>
<h2 id="Migrate-between-the-two-modes" class="common-anchor-header">2つのモード間の移行<button data-href="#Migrate-between-the-two-modes" class="anchor-icon" translate="no">
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
    </button></h2><p>2つのTTLモードは互いに排他的であるため、切り替えは複数のステップで行います。</p>
<h3 id="Switch-from-collection-level-to-entity-level-TTL" class="common-anchor-header">コレクションレベルのTTLからエンティティレベルのTTLへの切り替え<button data-href="#Switch-from-collection-level-to-entity-level-TTL" class="anchor-icon" translate="no">
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
    </button></h3><p>コレクションが<code translate="no">collection.ttl.seconds</code> で作成され、エンティティごとの期限切れに切り替えたい場合は、以下の4つのステップに従います。ステップ1をスキップすると、<code translate="no">collection TTL is already set, cannot be set ttl field</code> でステップ3が失敗します。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Assumes &quot;my_collection&quot; already exists with `collection.ttl.seconds` set.</span>
<span class="highlighted-comment-line"><span class="hljs-comment"># Step 1 — disable collection-level TTL (mandatory; the two modes are mutually exclusive)</span></span>
<span class="highlighted-comment-line">client.drop_collection_properties(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    property_keys=[<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>],</span>
<span class="highlighted-comment-line">)</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment"># Step 2 — add a TIMESTAMPTZ column to the schema</span></span>
<span class="highlighted-comment-line">client.add_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;expire_at&quot;</span>,</span>
<span class="highlighted-comment-line">    data_type=DataType.TIMESTAMPTZ,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment"># Step 3 — set the ttl_field property on the column you just added</span></span>
<span class="highlighted-comment-line">client.alter_collection_properties(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    properties={<span class="hljs-string">&quot;ttl_field&quot;</span>: <span class="hljs-string">&quot;expire_at&quot;</span>},</span>
<span class="highlighted-comment-line">)</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment"># Step 4 (optional) — backfill expiration timestamps for historical entities</span></span>
<span class="highlighted-comment-line">client.upsert(<span class="hljs-string">&quot;my_collection&quot;</span>, [</span>
<span class="highlighted-comment-line">    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,</span>
<span class="highlighted-comment-line">     <span class="hljs-string">&quot;vector&quot;</span>: [random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">128</span>)],</span>
<span class="highlighted-comment-line">     <span class="hljs-string">&quot;expire_at&quot;</span>: <span class="hljs-string">&quot;2026-12-31T00:00:00Z&quot;</span>},</span>
<span class="highlighted-comment-line">])</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.List;
<span class="hljs-keyword">import</span> java.util.Map;
<span class="hljs-keyword">import</span> java.util.Random;

<span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;

<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddCollectionFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AlterCollectionPropertiesReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.DropCollectionPropertiesReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.UpsertReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="hljs-comment">// Assumes &quot;my_collection&quot; already exists with `collection.ttl.seconds` set.</span>
<span class="highlighted-comment-line"><span class="hljs-comment">// Step 1 — disable collection-level TTL (mandatory; the two modes are mutually exclusive)</span></span>
<span class="highlighted-comment-line">client.dropCollectionProperties(DropCollectionPropertiesReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .propertyKeys(Collections.singletonList(<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>))</span>
<span class="highlighted-comment-line">        .build());</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment">// Step 2 — add a TIMESTAMPTZ column to the schema</span></span>
<span class="highlighted-comment-line">client.addCollectionField(AddCollectionFieldReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .fieldName(<span class="hljs-string">&quot;expire_at&quot;</span>)</span>
<span class="highlighted-comment-line">        .dataType(DataType.Timestamptz)</span>
<span class="highlighted-comment-line">        .isNullable(<span class="hljs-literal">true</span>)</span>
<span class="highlighted-comment-line">        .build());</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment">// Step 3 — set the ttl_field property on the column you just added</span></span>
<span class="highlighted-comment-line">Map&lt;String, String&gt; ttlField = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();</span>
<span class="highlighted-comment-line">ttlField.put(<span class="hljs-string">&quot;ttl_field&quot;</span>, <span class="hljs-string">&quot;expire_at&quot;</span>);</span>
<span class="highlighted-comment-line">client.alterCollectionProperties(AlterCollectionPropertiesReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .properties(ttlField)</span>
<span class="highlighted-comment-line">        .build());</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment">// Step 4 (optional) — backfill expiration timestamps for historical entities</span></span>
<span class="highlighted-comment-line"><span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();</span>
<span class="highlighted-comment-line"><span class="hljs-type">Random</span> <span class="hljs-variable">rng</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Random</span>();</span>
<span class="highlighted-comment-line">List&lt;Float&gt; vector = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();</span>
<span class="highlighted-comment-line"><span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> <span class="hljs-variable">i</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">128</span>; i++) vector.add(rng.nextFloat());</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();</span>
<span class="highlighted-comment-line">row.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">1</span>);</span>
<span class="highlighted-comment-line">row.add(<span class="hljs-string">&quot;vector&quot;</span>, gson.toJsonTree(vector));</span>
<span class="highlighted-comment-line">row.addProperty(<span class="hljs-string">&quot;expire_at&quot;</span>, <span class="hljs-string">&quot;2026-12-31T00:00:00Z&quot;</span>);</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line">client.upsert(UpsertReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .data(Collections.singletonList(row))</span>
<span class="highlighted-comment-line">        .build());</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">expire_at</code> 。バックフィルを行わない履歴エンティティは、その列に<code translate="no">NULL</code> 。有限の寿命を持つべき行だけをバックフィルする。</p>
<h3 id="Switch-from-entity-level-to-collection-level-TTL" class="common-anchor-header">エンティティレベルのTTLからコレクションレベルのTTLへの切り替え<button data-href="#Switch-from-entity-level-to-collection-level-TTL" class="anchor-icon" translate="no">
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
    </button></h3><p>別の方向に進むには、<code translate="no">ttl_field</code> を削除し、<code translate="no">collection.ttl.seconds</code> を設定する：</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Assumes &quot;my_collection&quot; already exists with `ttl_field` set.</span>
<span class="highlighted-comment-line">client.drop_collection_properties(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    property_keys=[<span class="hljs-string">&quot;ttl_field&quot;</span>],</span>
<span class="highlighted-comment-line">)</span>
<span class="highlighted-comment-line">client.alter_collection_properties(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    properties={<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>: <span class="hljs-number">1209600</span>},  <span class="hljs-comment"># 14 days</span></span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AlterCollectionPropertiesReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.DropCollectionPropertiesReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="hljs-comment">// Assumes &quot;my_collection&quot; already exists with `ttl_field` set.</span>
<span class="highlighted-comment-line">client.dropCollectionProperties(DropCollectionPropertiesReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .propertyKeys(Collections.singletonList(<span class="hljs-string">&quot;ttl_field&quot;</span>))</span>
<span class="highlighted-comment-line">        .build());</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line">Map&lt;String, String&gt; properties = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();</span>
<span class="highlighted-comment-line">properties.put(<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>, <span class="hljs-string">&quot;1209600&quot;</span>); <span class="hljs-comment">// 14 days</span></span>
<span class="highlighted-comment-line">client.alterCollectionProperties(AlterCollectionPropertiesReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .properties(properties)</span>
<span class="highlighted-comment-line">        .build());</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="FAQs" class="common-anchor-header">よくある質問<button data-href="#FAQs" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="When-does-data-expire-due-to-TTL-settings" class="common-anchor-header">TTL設定によるデータの有効期限はいつですか？<button data-href="#When-does-data-expire-due-to-TTL-settings" class="anchor-icon" translate="no">
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
    </button></h3><p>現在のところ、データは挿入またはアップサートされた時点に基づいて失効します。期限切れのデータは検索結果に表示されません。詳しくは<a href="/docs/ja/set-collection-ttl.md#Dyq9dQUmwoAk9WxwEuEcSDkPnoc">例を</a>ご覧ください。</p>
<h3 id="When-will-the-expired-data-be-physically-deleted" class="common-anchor-header">期限切れのデータはいつ物理的に削除されますか？<button data-href="#When-will-the-expired-data-be-physically-deleted" class="anchor-icon" translate="no">
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
    </button></h3><p>有効期限が切れたデータは検索結果に表示されません。ただし、クラスタのコンパクション・ポリシーに従って、その後のシステム・コンパクションの後にのみ物理的に削除されます。</p>
