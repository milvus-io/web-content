---
id: manage-collections.md
title: コレクションの管理
---
<h1 id="Manage-Collections" class="common-anchor-header">コレクションの管理<button data-href="#Manage-Collections" class="anchor-icon" translate="no">
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
    </button></h1><p>このガイドでは、選択したSDKを使用して、コレクションの作成と管理について説明します。</p>
<h2 id="Before-you-start" class="common-anchor-header">始める前に<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
<li><p><a href="https://milvus.io/docs/install_standalone-docker.md">Milvusスタンドアロン</a>または<a href="https://milvus.io/docs/install_cluster-milvusoperator.md">Milvusクラスタを</a>インストールしている。</p></li>
<li><p>お好みのSDKをインストール済みであること。<a href="https://milvus.io/docs/install-pymilvus.md">Python</a>、<a href="https://milvus.io/docs/install-java.md">Java</a>、<a href="https://milvus.io/docs/install-go.md">Go</a>、<a href="https://milvus.io/docs/install-node.md">Node.jsを</a>含む様々な言語から選択できる。</p></li>
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
    </button></h2><p>Milvusでは、ベクトル埋め込みをコレクションに格納します。コレクション内のすべてのベクトル埋め込みは、同じ次元と類似度を測定するための距離メトリックを共有します。</p>
<p>Milvusのコレクションは動的フィールド（スキーマで定義されていないフィールド）と主キーの自動インクリメントをサポートしています。</p>
<p>様々な好みに対応するため、Milvusはコレクションの作成に2つの方法を提供しています。1つはクイックセットアップを提供し、もう1つはコレクションスキーマとインデックスパラメータの詳細なカスタマイズを可能にします。</p>
<p>さらに、必要に応じてコレクションを表示、ロード、リリース、ドロップすることができます。</p>
<h2 id="Create-Collection" class="common-anchor-header">コレクションの作成<button data-href="#Create-Collection" class="anchor-icon" translate="no">
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
    </button></h2><p>以下のいずれかの方法でコレクションを作成できます：</p>
<ul>
<li><p><strong>クイックセットアップ</strong></p>
<p>この方法では、名前を付けて、このコレクションに格納するベクトル埋込みの次元数を指定するだけで、コレクションを作成できます。詳細は、<a href="/docs/ja/v2.4.x/manage-collections.md">Quick setupを</a>参照。</p></li>
<li><p><strong>カスタマイズセットアップ</strong></p>
<p>In Milvusにコレクションのほとんどすべてを任せる代わりに、コレクションの<strong>スキーマと</strong> <strong>インデックスパラメータを</strong>自分で決めることができます。詳細は<a href="/docs/ja/v2.4.x/manage-collections.md">カスタマイズセットアップを</a>参照してください。</p></li>
</ul>
<h3 id="Quick-setup" class="common-anchor-header">クイックセットアップ</h3><p>AI業界における大きな飛躍を背景に、ほとんどの開発者はシンプルかつダイナミックなコレクションを必要としています。Milvusでは、3つの引数を指定するだけで、そのようなコレクションを素早くセットアップできます：</p>
<ul>
<li><p>作成するコレクションの名前、</p></li>
<li><p>挿入するベクトル埋め込み次元</p></li>
<li><p>ベクトル埋め込み間の類似度を測定するためのメトリックタイプ。</p></li>
</ul>
<div class="language-python">
<p>素早くセットアップするには <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md"><code translate="no">create_collection()</code></a>クラスの <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Client/MilvusClient.md"><code translate="no">MilvusClient</code></a>クラスのメソッドを使用して、指定された名前と次元を持つコレクションを作成します。</p>
</div>
<div class="language-java">
<p>素早くセットアップするには <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createCollection.md"><code translate="no">createCollection()</code></a>クラスの <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Client/MilvusClientV2.md"><code translate="no">MilvusClientV2</code></a>クラスのメソッドを使用して、指定された名前とディメンジョンを持つコレクションを作成します。</p>
</div>
<div class="language-javascript">
<p>クイック・セットアップには <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/createCollection.md"><code translate="no">createCollection()</code></a>メソッドを使用します。 <a href="https://milvus.io/api-reference/node/v2.4.x/Client/MilvusClient.md"><code translate="no">MilvusClient</code></a>クラスのメソッドを使用して、指定された名前とディメンジョンを持つコレクションを作成します。</p>
</div>
<div class="language-go">
<p>を使用します。 <a href="https://milvus.io/api-reference/go/v2.4.x/Collection/CreateCollection.md"><code translate="no">CreateCollection()</code></a>メソッドを使用して、<code translate="no">Client</code> インタフェースのインスタンスで <a href="https://milvus.io/api-reference/go/v2.4.x/Connections/NewClient.md"><code translate="no">NewClient()</code></a>メソッドを使用して、指定された名前とディメンジョンを持つコレクションを作成します。</p>
</div>
<div class="language-shell">
<p>を使用します。 <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Collection%20(v2)/Create.md"><code translate="no">POST /v2/vectordb/collections/create</code></a>API エンドポイントを使用して、指定された名前とディメンジョンを持つコレクションを作成します。</p>
</div>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># 1. Set up a Milvus client</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
)

<span class="hljs-comment"># 2. Create a collection in quick setup mode</span>
client.create_collection(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    dimension=<span class="hljs-number">5</span>
)

res = client.get_load_state(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: Loaded&gt;&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.GetLoadStateReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">String</span> <span class="hljs-variable">CLUSTER_ENDPOINT</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;

<span class="hljs-comment">// 1. Connect to Milvus server</span>
<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
    .uri(CLUSTER_ENDPOINT)
    .build();

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

<span class="hljs-comment">// 2. Create a collection in quick setup mode</span>
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">quickSetupReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .dimension(<span class="hljs-number">5</span>)
    .build();

client.createCollection(quickSetupReq);

<span class="hljs-comment">// Thread.sleep(5000);</span>

<span class="hljs-type">GetLoadStateReq</span> <span class="hljs-variable">quickSetupLoadStateReq</span> <span class="hljs-operator">=</span> GetLoadStateReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .build();

<span class="hljs-type">Boolean</span> <span class="hljs-variable">res</span> <span class="hljs-operator">=</span> client.getLoadState(quickSetupLoadStateReq);

System.out.println(res);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// true</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>

<span class="hljs-comment">// 1. Set up a Milvus Client</span>
client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address});

<span class="hljs-comment">// 2. Create a collection in quick setup mode</span>
<span class="hljs-keyword">let</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">dimension</span>: <span class="hljs-number">5</span>,
});  

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">state</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateLoaded</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-Go"><span class="hljs-keyword">import</span> (
  <span class="hljs-string">&quot;context&quot;</span>
  <span class="hljs-string">&quot;fmt&quot;</span>
  <span class="hljs-string">&quot;log&quot;</span>
  <span class="hljs-string">&quot;time&quot;</span>

  milvusClient <span class="hljs-string">&quot;github.com/milvus-io/milvus-sdk-go/v2/client&quot;</span> <span class="hljs-comment">// milvusClient is an alias for milvus client package</span>
  <span class="hljs-string">&quot;github.com/milvus-io/milvus-sdk-go/v2/entity&quot;</span>
)

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">main</span><span class="hljs-params">()</span></span> {
    ctx := context.Background()
    ctx, cancel := context.WithTimeout(ctx, <span class="hljs-number">2</span>*time.Second)
    <span class="hljs-keyword">defer</span> cancel()
    <span class="hljs-comment">// 1. Set up a Milvus client</span>
    client, err := milvusClient.NewClient(ctx, milvusClient.Config{
        Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
    })
    <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        log.Fatal(<span class="hljs-string">&quot;failed to connect to milvus:&quot;</span>, err.Error())
    }
    <span class="hljs-keyword">defer</span> client.Close()
    
    <span class="hljs-comment">// 2. Create a collection in quick setup mode</span>
    err = client.NewCollection(ctx, <span class="hljs-string">&quot;quick_setup&quot;</span>, <span class="hljs-number">5</span>)
    <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        log.Fatal(<span class="hljs-string">&quot;failed to create collection:&quot;</span>, err.Error())
    }
    
    stateLoad, err := client.GetLoadState(context.Background(), <span class="hljs-string">&quot;quick_setup&quot;</span>, []<span class="hljs-type">string</span>{})
    <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        log.Fatal(<span class="hljs-string">&quot;failed to get load state:&quot;</span>, err.Error())
    }
    fmt.Println(stateLoad)
    <span class="hljs-comment">// Output</span>
    <span class="hljs-comment">// 3</span>
    
    <span class="hljs-comment">// LoadStateNotExist -&gt; LoadState = 0</span>
    <span class="hljs-comment">// LoadStateNotLoad  -&gt; LoadState = 1</span>
    <span class="hljs-comment">// LoadStateLoading  -&gt; LoadState = 2</span>
    <span class="hljs-comment">// LoadStateLoaded   -&gt; LoadState = 3</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">export</span> MILVUS_URI=<span class="hljs-string">&quot;localhost:19530&quot;</span>

$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/collections/create&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
  &quot;collectionName&quot;: &quot;quick_setup&quot;,
  &quot;dimension&quot;: 5
}&#x27;</span>

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {},</span>
<span class="hljs-comment"># }</span>

$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/collections/get_load_state&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
  &quot;collectionName&quot;: &quot;quick_setup&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {</span>
<span class="hljs-comment">#         &quot;loadProgress&quot;: 100,</span>
<span class="hljs-comment">#         &quot;loadState&quot;: &quot;LoadStateLoaded&quot;</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<p>上記のコードで生成されたコレクションには、<code translate="no">id</code> (主キーとして) と<code translate="no">vector</code> (ベクトル・フィールドとして) の2つのフィールドのみが含まれ、<code translate="no">auto_id</code> と<code translate="no">enable_dynamic_field</code> の設定はデフォルトで有効になっています。</p>
<ul>
<li><p><code translate="no">auto_id</code></p>
<p>この設定を有効にすると、主キーが自動的にインクリメントされます。データ挿入時に主キーを手動で指定する必要はない。</p></li>
<li><p><code translate="no">enable_dynamic_field</code></p>
<p>この設定を有効にすると、挿入されるデータの<code translate="no">id</code> 、<code translate="no">vector</code> を除くすべてのフィールドがダイナミック・フィールドとして扱われる。これらの追加フィールドは、<code translate="no">$meta</code> という特別なフィールド内にキーと値のペアとして保存される。この機能により、データ挿入時に追加フィールドを含めることができる。</p></li>
</ul>
<p>提供されたコードから自動的にインデックス付けされ、ロードされたコレクションは、すぐにデータ挿入の準備ができます。</p>
<h3 id="Customized-setup" class="common-anchor-header">カスタマイズされたセットアップ</h3><p>Milvusにコレクションのほとんど全てを決定させる代わりに、あなた自身でコレクションの<strong>スキーマと</strong> <strong>インデックスパラメータを</strong>決定することができます。</p>
<h4 id="Step-1-Set-up-schema" class="common-anchor-header">ステップ1: スキーマの設定</h4><p>スキーマはコレクションの構造を定義します。スキーマ内では、<code translate="no">enable_dynamic_field</code> を有効または無効にし、定義済みフィールドを追加し、各フィールドに属性を設定するオプションがあります。スキーマの概念と使用可能なデータ型の詳細については、<a href="/docs/ja/v2.4.x/schema.md">スキーマの</a>説明を参照してください。</p>
<div class="language-python">
<p>スキーマを設定するには <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md"><code translate="no">create_schema()</code></a>を使用してスキーマ・オブジェクトを作成し <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/CollectionSchema/add_field.md"><code translate="no">add_field()</code></a>を使用してスキーマにフィールドを追加する。</p>
</div>
<div class="language-java">
<p>スキーマを設定するには <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createSchema.md"><code translate="no">createSchema()</code></a>を使ってスキーマ・オブジェクトを作成し <a href="https://milvus.io/api-reference/java/v2.4.x/v2/CollectionSchema/addField.md"><code translate="no">addField()</code></a>スキーマにフィールドを追加する。</p>
</div>
<div class="language-javascript">
<p>スキーマをセットアップするには <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/createCollection.md"><code translate="no">createCollection()</code></a>.</p>
</div>
</div>
<div class="language-go">
<p>スキーマを設定するには、<code translate="no">entity.NewSchema()</code> を使用してスキーマ・オブジェクトを作成し、<code translate="no">schema.WithField()</code> を使用してスキーマにフィールドを追加します。</p>
</div>
<div class="language-shell">
<p>スキーマを設定するには、APIエンドポイントのリファレンス・ページに表示されているスキーマ・フォーマットに従ったJSONオブジェクトを定義する必要があります。 <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Collection%20(v2)/Create.md"><code translate="no">POST /v2/vectordb/collections/create</code></a>APIエンドポイントのリファレンス・ページに表示されているスキーマ・フォーマットに従ったJSONオブジェクトを定義する必要がある。</p>
</div>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 3. Create a collection in customized setup mode</span>

<span class="hljs-comment"># 3.1. Create schema</span>
schema = MilvusClient.create_schema(
    auto_id=<span class="hljs-literal">False</span>,
    enable_dynamic_field=<span class="hljs-literal">True</span>,
)

<span class="hljs-comment"># 3.2. Add fields to schema</span>
schema.add_field(field_name=<span class="hljs-string">&quot;my_id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;my_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-comment">// 3. Create a collection in customized setup mode</span>

<span class="hljs-comment">// 3.1 Create schema</span>
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();

<span class="hljs-comment">// 3.2 Add fields to schema</span>
schema.addField(AddFieldReq.builder()
    .fieldName(<span class="hljs-string">&quot;my_id&quot;</span>)
    .dataType(DataType.Int64)
    .isPrimaryKey(<span class="hljs-literal">true</span>)
    .autoID(<span class="hljs-literal">false</span>)
    .build());

schema.addField(AddFieldReq.builder()
    .fieldName(<span class="hljs-string">&quot;my_vector&quot;</span>)
    .dataType(DataType.FloatVector)
    .dimension(<span class="hljs-number">5</span>)
    .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 3. Create a collection in customized setup mode</span>
<span class="hljs-comment">// 3.1 Define fields</span>
<span class="hljs-keyword">const</span> fields = [
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_id&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
        <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">auto_id</span>: <span class="hljs-literal">false</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_vector&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
        <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span>
    },
]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// 3. Create a collection in customized setup mode</span>

<span class="hljs-comment">// 3.1 Create schema</span>
schema := entity.NewSchema()

<span class="hljs-comment">// 3.2. Add fields to schema</span>
schema.WithField(
    entity.NewField().
        WithName(<span class="hljs-string">&quot;my_id&quot;</span>).
        WithDataType(entity.FieldTypeInt64).
        WithIsPrimaryKey(<span class="hljs-literal">false</span>).
        WithIsAutoID(<span class="hljs-literal">true</span>)).
    WithField(
        entity.NewField().
            WithName(<span class="hljs-string">&quot;my_vector&quot;</span>).
            WithDataType(entity.FieldTypeFloatVector).
            WithDim(<span class="hljs-number">5</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">export</span> fields=<span class="hljs-string">&#x27;[{ \
    &quot;fieldName&quot;: &quot;my_id&quot;, \
    &quot;dataType&quot;: &quot;Int64&quot;, \
    &quot;isPrimary&quot;: true \
}, \
{ \
    &quot;fieldName&quot;: &quot;my_vector&quot;, \
    &quot;dataType&quot;: &quot;FloatVector&quot;, \
    &quot;elementTypeParams&quot;: { \
        &quot;dim&quot;: 5 \
    } \
}]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<table class="language-python">
  <thead>
    <tr>
      <th>パラメータ</th>
      <th>説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">auto_id</code></td>
      <td><br/>これを<strong>Trueに</strong>設定すると、プライマリ・フィールドが自動的にインクリメントされる。この場合、エラーを避けるため、プライマリ・フィールドを挿入するデータに含めるべきではありません。自動生成されたIDは固定長で、変更することはできません。</td>
    </tr>
    <tr>
      <td><code translate="no">enable_dynamic_field</code></td>
      <td><br/>これを<strong>True</strong> に設定すると、Milvus は挿入されるデータから未定義のフィールドとその値を保存する<strong>$meta</strong>というフィールドを作成します。</td>
    </tr>
    <tr>
      <td><code translate="no">field_name</code></td>
      <td>フィールド名。</td>
    </tr>
    <tr>
      <td><code translate="no">datatype</code></td>
      <td>フィールドのデータ型。使用可能なデータ型のリストについては、<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/DataType.md">DataTypeを</a>参照してください。</td>
    </tr>
    <tr>
      <td><code translate="no">is_primary</code></td>
      <td><br/>各コレクションは、1 つのプライマリ・フィールドのみを持つ。プライマリ・フィールドは、<strong>DataType.INT64</strong>型または<strong>DataType.VARCHAR</strong>型のいずれかである必要があります。</td>
    </tr>
    <tr>
      <td><code translate="no">dim</code></td>
      <td><br/><strong>DataType.FLOAT_VECTOR</strong>、<strong>DataType.BINARY_VECTOR</strong>、<strong>DataType.FLOAT16_VECTOR</strong>、または<strong>DataType.BFLOAT16_VECTOR</strong>型のフィールドでは必須です。<strong>DataType.SPARSE_FLOAT_VECTORを</strong>使用する場合は、このパラメータを省略します。</td>
    </tr>
  </tbody>
</table>
<table class="language-java">
  <thead>
    <tr>
      <th>パラメータ</th>
      <th>説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">fieldName</code></td>
      <td>フィールド名。</td>
    </tr>
    <tr>
      <td><code translate="no">dataType</code></td>
      <td>フィールドのデータ型。使用可能なデータ型のリストについては、<a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/DataType.md">DataTypeを</a>参照してください。</td>
    </tr>
    <tr>
      <td><code translate="no">isPrimaryKey</code></td>
      <td><br/>各コレクションは、1 つのプライマリ・フィールドのみを持つ。プライマリ・フィールドは<strong>DataType.Int64</strong>型または<strong>DataType.VarChar</strong>型のいずれかでなければなりません。</td>
    </tr>
    <tr>
      <td><code translate="no">autoID</code></td>
      <td><br/>これを<strong>trueに</strong>設定すると、プライマリフィールドが自動的にインクリメントされます。この場合、プライマリ・フィールドはエラーを避けるために挿入するデータに含めるべきではありません。</td>
    </tr>
    <tr>
      <td><code translate="no">dimension</code></td>
      <td><br/><strong>DataType.FloatVector</strong>、<strong>DataType.BinaryVector</strong>、<strong>DataType.Float16Vector</strong>、<strong>DataType.BFloat16Vector</strong>型のフィールドでは必須。</td>
    </tr>
  </tbody>
</table>
<table class="language-javascript">
  <thead>
    <tr>
      <th>パラメータ</th>
      <th>説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">name</code></td>
      <td>フィールド名。</td>
    </tr>
    <tr>
      <td><code translate="no">data_type</code></td>
      <td>フィールドのデータ型。使用可能なすべてのデータ型の列挙については、<a href="https://milvus.io/api-reference/node/v2.4.x/Collections/DataType.md">DataTypeを</a>参照してください。</td>
    </tr>
    <tr>
      <td><code translate="no">is_primary_key</code></td>
      <td><br/>各コレクションは、1 つのプライマリ・フィールドのみを持つ。プライマリ・フィールドは、<strong>DataType.INT64</strong>型または<strong>DataType.VARCHAR</strong>型のいずれかでなければなりません。</td>
    </tr>
    <tr>
      <td><code translate="no">auto_id</code></td>
      <td><br/>デフォルト値は<strong>False</strong> です。<strong>True</strong>に設定すると、プライマリ・フィールドが自動的にインクリメントされます。カスタマイズしたスキーマでコレクションをセットアップする必要がある場合は、このパラメータをスキップします。</td>
    </tr>
    <tr>
      <td><code translate="no">dim</code></td>
      <td>ベクトル埋め込みを保持するコレクションフィールドの次元数。<br/>値は1以上の整数である必要があり、通常はベクトル埋め込みを生成するために使用するモデルによって決定される。</td>
    </tr>
  </tbody>
</table>
<table class="language-go">
  <thead>
    <tr>
      <th>パラメータ</th>
      <th>説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">WithName()</code></td>
      <td>フィールドの名前。</td>
    </tr>
    <tr>
      <td><code translate="no">WithDataType()</code></td>
      <td>フィールドのデータ型。</td>
    </tr>
    <tr>
      <td><code translate="no">WithIsPrimaryKey()</code></td>
      <td><br/>各コレクションは1つのプライマリフィールドのみを持つ。プライマリ・フィールドは、<strong>entity.FieldTypeInt64</strong>型または<strong>entity.FieldTypeVarChar</strong>型のいずれかである必要があります。</td>
    </tr>
    <tr>
      <td><code translate="no">WithIsAutoID()</code></td>
      <td><br/>デフォルト値は<strong>false</strong> です。これを<strong>true</strong>に設定すると、プライマリ・フィールドが自動的にインクリメントされます。カスタマイズしたスキーマでコレクションをセットアップする必要がある場合は、このパラメータをスキップします。</td>
    </tr>
    <tr>
      <td><code translate="no">WithDim()</code></td>
      <td>ベクトル埋め込みを保持するコレクションフィールドの次元数。<br/>この値は1以上の整数である必要があり、通常はベクトル埋め込みを生成するために使用するモデルによって決定される。</td>
    </tr>
  </tbody>
</table>
<table class="language-shell">
  <thead>
    <tr>
      <th>パラメータ</th>
      <th>説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">fieldName</code></td>
      <td>ターゲット・コレクションに作成するフィールドの名前。</td>
    </tr>
    <tr>
      <td><code translate="no">dataType</code></td>
      <td>フィールド値のデータ型。</td>
    </tr>
    <tr>
      <td><code translate="no">isPrimary</code></td>
      <td>現在のフィールドがプライマリ・フィールドかどうか。これを<code translate="no">True</code> に設定すると、現在のフィールドがプライマリ・フィールドになります。</td>
    </tr>
    <tr>
      <td><code translate="no">elementTypeParams</code></td>
      <td>追加フィールド・パラメータ。</td>
    </tr>
    <tr>
      <td><code translate="no">dim</code></td>
      <td>FloatVector または BinaryVector フィールドのオプション・パラメータで、ベクトル次元を決定します。</td>
    </tr>
  </tbody>
</table>
<h4 id="Step-2-Set-up-index-parameters" class="common-anchor-header">ステップ2：インデックスパラメータの設定</h4><p>インデックスパラメータは、Milvusがコレクション内でデータをどのように整理するかを決定します。<code translate="no">metric_type</code> と<code translate="no">index_type</code> を調整することで、特定のフィールドのインデックス作成プロセスを調整できます。ベクトル・フィールドでは、扱うベクトルのタイプに応じて、<code translate="no">metric_type</code> 、<code translate="no">COSINE</code> 、<code translate="no">L2</code> 、<code translate="no">IP</code> 、<code translate="no">HAMMING</code> 、<code translate="no">JACCARD</code> を柔軟に選択できます。詳細については、<a href="/docs/ja/v2.4.x/metric.md">類似度メトリクスを</a>参照してください。</p>
<div class="language-python">
<p>インデックス・パラメータを設定するには <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/prepare_index_params.md"><code translate="no">prepare_index_params()</code></a>を使用してインデックス・パラメータを準備し <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/add_index.md"><code translate="no">add_index()</code></a>を使用してインデックスを追加します。</p>
</div>
<div class="language-java">
<p>インデックス・パラメータを設定するには、<a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/IndexParam.md">IndexParam</a> を使用します。</p>
</div>
<div class="language-javascript">
<p>インデックス・パラメータを設定するには <a href="https://milvus.io/api-reference/node/v2.4.x/Management/createIndex.md"><code translate="no">createIndex()</code></a>.</p>
</div>
<div class="language-go">
<p>インデックス・パラメータを設定するには <a href="https://milvus.io/api-reference/go/v2.4.x/Index/CreateIndex.md"><code translate="no">CreateIndex()</code></a>.</p>
</div>
<div class="language-shell">
<p>インデックス・パラメータを設定するには、 APIエンドポイントのリファレンス・ページに表示されている インデックス・パラメータの書式に従ったJSONオブジェクトを定義する必要があります。 <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Collection%20(v2)/Create.md"><code translate="no">POST /v2/vectordb/collections/create</code></a>APIエンドポイント・リファレンス・ページに表示されているインデックス・パラメーター・フォーマットに従ったJSONオブジェクトを定義する必要があります。</p>
</div>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-meta"># 3.3. Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-meta"># 3.4. Add indexes</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;my_id&quot;</span>,
    index_type=<span class="hljs-string">&quot;STL_SORT&quot;</span>
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;my_vector&quot;</span>, 
    index_type=<span class="hljs-string">&quot;IVF_FLAT&quot;</span>,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,
    <span class="hljs-keyword">params</span>={ <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">128</span> }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;

<span class="hljs-comment">// 3.3 Prepare index parameters</span>
<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParamForIdField</span> <span class="hljs-operator">=</span> IndexParam.builder()
    .fieldName(<span class="hljs-string">&quot;my_id&quot;</span>)
    .indexType(IndexParam.IndexType.STL_SORT)
    .build();

<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParamForVectorField</span> <span class="hljs-operator">=</span> IndexParam.builder()
    .fieldName(<span class="hljs-string">&quot;my_vector&quot;</span>)
    .indexType(IndexParam.IndexType.IVF_FLAT)
    .metricType(IndexParam.MetricType.L2)
    .extraParams(Map.of(<span class="hljs-string">&quot;nlist&quot;</span>, <span class="hljs-number">1024</span>))
    .build();

List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexParams.add(indexParamForIdField);
indexParams.add(indexParamForVectorField);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 3.2 Prepare index parameters</span>
<span class="hljs-keyword">const</span> index_params = [{
    field_name: <span class="hljs-string">&quot;my_id&quot;</span>,
    index_type: <span class="hljs-string">&quot;STL_SORT&quot;</span>
},{
    field_name: <span class="hljs-string">&quot;my_vector&quot;</span>,
    index_type: <span class="hljs-string">&quot;IVF_FLAT&quot;</span>,
    metric_type: <span class="hljs-string">&quot;IP&quot;</span>,
    <span class="hljs-keyword">params</span>: { nlist: <span class="hljs-number">1024</span>}
}]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// 3.3 Prepare index parameters</span>
idxID := entity.NewScalarIndexWithType(entity.Sorted)

idxVector, err := entity.NewIndexIvfFlat(entity.IP, <span class="hljs-number">1024</span>)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
  log.Fatal(<span class="hljs-string">&quot;failed to new index:&quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">export</span> indexParams=<span class="hljs-string">&#x27;[{ \
    &quot;fieldName&quot;: &quot;my_id&quot;, \
    &quot;indexName&quot;: &quot;my_id&quot;, \
    &quot;params&quot;: { \
        &quot;index_type&quot;: &quot;SLT_SORT&quot; \
  } \
}, { \
    &quot;fieldName&quot;: &quot;my_vector&quot;, \
    &quot;metricType&quot;: &quot;COSINE&quot;, \
    &quot;indexName&quot;: &quot;my_vector&quot;, \
    &quot;params&quot;: { \
        &quot;index_type&quot;: &quot;IVF_FLAT&quot;, \
        &quot;nlist&quot;: 1024 \
  } \
}]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<table class="language-python">
  <thead>
    <tr>
      <th>パラメータ</th>
      <th>説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">field_name</code></td>
      <td>このオブジェクトが適用されるターゲット・ファイルの名前。</td>
    </tr>
    <tr>
      <td><code translate="no">index_type</code></td>
      <td>特定のフィールドにデータを配置するために使用されるアルゴリズムの名前。適用可能なアルゴリズムについては、<a href="https://milvus.io/docs/index.md">In-memory Index</a>および<a href="https://milvus.io/docs/disk_index.md">On-disk Index</a> を参照してください。</td>
    </tr>
    <tr>
      <td><code translate="no">metric_type</code></td>
      <td>ベクトル間の類似度を測定するために使用されるアルゴリズム。指定可能な値は<strong>IP</strong>、<strong>L2</strong>、<strong>COSINE</strong>、<strong>JACCARD</strong>、<strong>HAMMING</strong>。これは、指定されたフィールドがベクトル・フィールドである場合にのみ使用できる。詳しくは<a href="https://milvus.io/docs/index.md#Indexes-supported-in-Milvus">Milvusでサポートされているインデックスを</a>参照してください。</td>
    </tr>
    <tr>
      <td><code translate="no">params</code></td>
      <td>指定されたインデックス・タイプの微調整パラメータ。指定可能なキーと値の範囲の詳細については、<a href="https://milvus.io/docs/index.md">メモリ内インデックスを</a>参照してください。</td>
    </tr>
  </tbody>
</table>
<table class="language-java">
  <thead>
    <tr>
      <th>パラメータ</th>
      <th>説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">fieldName</code></td>
      <td>このIndexParamオブジェクトを適用する対象フィールドの名前。</td>
    </tr>
    <tr>
      <td><code translate="no">indexType</code></td>
      <td>特定のフィールドにデータを配置するために使用されるアルゴリズムの名前。適用可能なアルゴリズムについては、<a href="https://milvus.io/docs/index.md">In-memory Index</a>および<a href="https://milvus.io/docs/disk_index.md">On-disk Index</a> を参照してください。</td>
    </tr>
    <tr>
      <td><code translate="no">metricType</code></td>
      <td>インデックスに使用する距離メトリック。指定可能な値は<strong>IP</strong>、<strong>L2</strong>、<strong>COSINE</strong>、<strong>JACCARD</strong>、<strong>HAMMING</strong>。</td>
    </tr>
    <tr>
      <td><code translate="no">extraParams</code></td>
      <td>インデックスの追加パラメータ。詳細は<a href="https://milvus.io/docs/index.md">インメモリ・インデックスと</a> <a href="https://milvus.io/docs/disk_index.md">オンディスク・インデックスを</a>参照。</td>
    </tr>
  </tbody>
</table>
<table class="language-javascript">
  <thead>
    <tr>
      <th>パラメータ</th>
      <th>説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">field_name</code></td>
      <td>インデックスを作成する対象フィールドの名前。</td>
    </tr>
    <tr>
      <td><code translate="no">index_type</code></td>
      <td>特定のフィールドにデータを配置するために使用されるアルゴリズム名。適用可能なアルゴリズムについては、<a href="https://milvus.io/docs/index.md">インメモリ・インデックスと</a> <a href="https://milvus.io/docs/disk_index.md">オンディスク・インデックスを</a>参照のこと。</td>
    </tr>
    <tr>
      <td><code translate="no">metric_type</code></td>
      <td>ベクトル間の類似度を測定するために使用されるアルゴリズム。指定可能な値は<strong>IP</strong>、<strong>L2</strong>、<strong>COSINE</strong>、<strong>JACCARD</strong>、<strong>HAMMING</strong>。これは、指定されたフィールドがベクトル・フィールドである場合にのみ使用できる。詳しくは<a href="https://milvus.io/docs/index.md#Indexes-supported-in-Milvus">Milvusでサポートされているインデックスを</a>参照してください。</td>
    </tr>
    <tr>
      <td><code translate="no">params</code></td>
      <td>指定されたインデックス・タイプの微調整パラメータ。指定可能なキーと値の範囲の詳細については、<a href="https://milvus.io/docs/index.md">メモリ内インデックスを</a>参照してください。</td>
    </tr>
  </tbody>
</table>
<table class="language-go">
  <thead>
    <tr>
      <th>パラメータ</th>
      <th>説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">index_type</code></td>
      <td>特定のフィールドにデータを配置するために使用されるアルゴリズムの名前。適用可能なアルゴ リ ズ ム については、 「<a href="https://milvus.io/docs/index.md">イ ン メ モ リ ・ イ ンデ ッ ク ス</a>」 および 「<a href="https://milvus.io/docs/disk_index.md">オンデ ィ ス ク ・ イ ンデ ッ ク ス</a>」 を参照。</td>
    </tr>
    <tr>
      <td><code translate="no">metric_type</code></td>
      <td>ベクトル間の類似度の測定に使用されるアルゴリズム。指定可能な値は<strong>IP</strong>、<strong>L2</strong>、<strong>COSINE</strong>、<strong>JACCARD</strong>、<strong>HAMMING</strong>。これは、指定されたフィールドがベクトル・フィールドである場合にのみ使用できる。詳細については、<a href="https://milvus.io/docs/index.md#Indexes-supported-in-Milvus">Milvusでサポートされているインデックスを</a>参照してください。</td>
    </tr>
    <tr>
      <td><code translate="no">nlist</code></td>
      <td>クラスター単位数.クラスタ単位はMilvusのIVF(Inverted File)ベースのインデックスで使用されます。IVF_FLATの場合、インデックスはベクトルデータをクラスタ単位`nlist`に分割し、対象となる入力ベクトルと各クラスタの中心との距離を比較します1。1以上65536以下でなければならない。</td>
    </tr>
  </tbody>
</table>
<table class="language-shell">
  <thead>
    <tr>
      <th>パラメータ</th>
      <th>説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">fieldName</code></td>
      <td>インデックスを作成する対象フィールドの名前。</td>
    </tr>
    <tr>
      <td><code translate="no">indexName</code></td>
      <td>作成するインデックスの名前。既定値はターゲット・フィールド名。</td>
    </tr>
    <tr>
      <td><code translate="no">metricType</code></td>
      <td>ベクトル間の類似度の測定に使用するアルゴリズム。指定可能な値は<strong>IP</strong>、<strong>L2</strong>、<strong>COSINE</strong>、<strong>JACCARD</strong>、<strong>HAMMING</strong> です。これは、指定されたフィールドがベクトル・フィールドである場合にのみ使用できます。詳しくは<a href="https://milvus.io/docs/index.md#Indexes-supported-in-Milvus">Milvusでサポートされているインデックスを</a>参照してください。</td>
    </tr>
    <tr>
      <td><code translate="no">params</code></td>
      <td>インデックス・タイプと関連する設定。詳細は<a href="https://milvus.io/docs/index.md">インメモリインデックスを</a>参照。</td>
    </tr>
    <tr>
      <td><code translate="no">params.index_type</code></td>
      <td>作成するインデックスのタイプ。</td>
    </tr>
    <tr>
      <td><code translate="no">params.nlist</code></td>
      <td>クラスタ単位の数。これはIVF関連のインデックスタイプに適用されます。</td>
    </tr>
  </tbody>
</table>
<p>上のコード・スニペットは、ベクトル・フィールドとスカラー・フィールドそれぞれのインデックス・パラメータの設定方法を示しています。ベクトル・フィールドには、メトリック型とインデックス型の両方を設定します。スカラー・フィールドの場合は、インデックス・タイプのみを設定します。ベクトル・フィールドと、フィルタリングに頻繁に使用されるスカラー・フィールドには、インデックスを作成することを推奨する。</p>
<h4 id="Step-3-Create-the-collection" class="common-anchor-header">ステップ 3: コレクションの作成</h4><p>コレクションとインデックス・ファイルを別々に作成するか、作成時にインデックスを同時にロードしてコ レクションを作成するかを選択できます。</p>
<div class="language-python">
<p><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md">create_collection()</a>を使用して、指定されたスキーマおよびインデックス・パラメータでコレクションを作成し、<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/get_load_state.md">get_load_state()</a>でコレクションのロード状態を確認します。</p>
</div>
<div class="language-java">
<p><a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createCollection.md">createCollection() を</a>使用して、指定したスキーマおよびインデックス・パラメータを持つコレクションを作成し、<a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/getLoadState.md">getLoadState() を</a>使用してコレクションのロード状態を確認します。</p>
</div>
<div class="language-javascript">
<p><a href="https://milvus.io/api-reference/node/v2.4.x/Collections/createCollection.md">createCollection() を</a>使用して、指定されたスキーマおよびインデックス・パラメータを持つコレクションを作成し、<a href="https://milvus.io/api-reference/node/v2.4.x/Management/getLoadState.md">getLoadState() を</a>使用してコレクションのロード状態を確認します。</p>
</div>
<ul>
<li><p><strong>作成時にインデックスが同時にロードされたコレクションを作成します。</strong></p>
<p><div class="multipleCode">
<a href="#python">Python </a><a href="#java">Java</a><a href="#javascript">Node.js</a><a href="#shell">cURL</a></div></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 3.5. Create a collection with the index loaded simultaneously</span>
client.create_collection(
    collection_name=<span class="hljs-string">&quot;customized_setup_1&quot;</span>,
    schema=schema,
    index_params=index_params
)

time.sleep(<span class="hljs-number">5</span>)

res = client.get_load_state(
    collection_name=<span class="hljs-string">&quot;customized_setup_1&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: Loaded&gt;&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.GetLoadStateReq;

<span class="hljs-comment">// 3.4 Create a collection with schema and index parameters</span>
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">customizedSetupReq1</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_1&quot;</span>)
    .collectionSchema(schema)
    .indexParams(indexParams)
    .build();

client.createCollection(customizedSetupReq1);

<span class="hljs-comment">// Thread.sleep(5000);</span>

<span class="hljs-comment">// 3.5 Get load state of the collection</span>
<span class="hljs-type">GetLoadStateReq</span> <span class="hljs-variable">customSetupLoadStateReq1</span> <span class="hljs-operator">=</span> GetLoadStateReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_1&quot;</span>)
    .build();

res = client.getLoadState(customSetupLoadStateReq1);

System.out.println(res);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// true</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 3.3 Create a collection with fields and index parameters</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_1&quot;</span>,
    <span class="hljs-attr">fields</span>: fields,
    <span class="hljs-attr">index_params</span>: index_params,
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)  

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_1&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">state</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateLoaded</span>
<span class="hljs-comment">//   </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/collections/create&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;customized_setup_1&quot;,
    &quot;schema&quot;: {
        &quot;autoId&quot;: false,
        &quot;enabledDynamicField&quot;: false,
        &quot;fields&quot;: [
            {
                &quot;fieldName&quot;: &quot;my_id&quot;,
                &quot;dataType&quot;: &quot;Int64&quot;,
                &quot;isPrimary&quot;: true
            },
            {
                &quot;fieldName&quot;: &quot;my_vector&quot;,
                &quot;dataType&quot;: &quot;FloatVector&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;dim&quot;: &quot;5&quot;
                }
            }
        ]
    },
    &quot;indexParams&quot;: [
        {
            &quot;fieldName&quot;: &quot;my_vector&quot;,
            &quot;metricType&quot;: &quot;COSINE&quot;,
            &quot;indexName&quot;: &quot;my_vector&quot;,
            &quot;params&quot;: {
                &quot;index_type&quot;: &quot;IVF_FLAT&quot;,
                &quot;nlist&quot;: &quot;1024&quot;
            }
        },
        {
            &quot;fieldName&quot;: &quot;my_id&quot;,
            &quot;indexName&quot;: &quot;my_id&quot;,
            &quot;params&quot;: {
                &quot;index_type&quot;: &quot;STL_SORT&quot;
            }            
        }
    ]
}&#x27;</span>

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {},</span>
<span class="hljs-comment"># }</span>

$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/collections/get_load_state&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;customized_setup_1&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {</span>
<span class="hljs-comment">#         &quot;loadProgress&quot;: 100,</span>
<span class="hljs-comment">#         &quot;loadState&quot;: &quot;LoadStateLoaded&quot;</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<p>上記で作成されたコレクションは自動的にロードされます。コレクションのロードとリリースの詳細は、<a href="/docs/ja/v2.4.x/manage-collections.md#Load--Release-Collection">Load &amp; Release Collection</a> を参照してください。</p></li>
<li><p><strong>コレクションとインデックスファイルを別々に作成する。</strong></p>
<p><div class="multipleCode">
<a href="#python">Python </a><a href="#java">Java</a><a href="#javascript">Node.js</a><a href="#go">Go</a><a href="#shell">cURL</a></div></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 3.6. Create a collection and index it separately</span>
client.create_collection(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>,
    schema=schema,
)

res = client.get_load_state(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: NotLoad&gt;&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// 3.6 Create a collection and index it separately</span>
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">customizedSetupReq2</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_2&quot;</span>)
    .collectionSchema(schema)
    .build();

client.createCollection(customizedSetupReq2);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 3.4 Create a collection and index it seperately</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>,
    <span class="hljs-attr">fields</span>: fields,
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">state</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateNotLoad</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// 3.4 Create a collection and index it seperately</span>
schema.CollectionName = <span class="hljs-string">&quot;customized_setup_2&quot;</span>
client.CreateCollection(ctx, schema, entity.DefaultShardNumber)

stateLoad, err := client.GetLoadState(context.Background(), <span class="hljs-string">&quot;customized_setup_2&quot;</span>, []<span class="hljs-type">string</span>{})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to get load state:&quot;</span>, err.Error())
}
fmt.Println(stateLoad)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// 1</span>

<span class="hljs-comment">// LoadStateNotExist -&gt; LoadState = 0</span>
<span class="hljs-comment">// LoadStateNotLoad  -&gt; LoadState = 1</span>
<span class="hljs-comment">// LoadStateLoading  -&gt; LoadState = 2</span>
<span class="hljs-comment">// LoadStateLoaded   -&gt; LoadState = 3</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/collections/create&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;customized_setup_2&quot;,
    &quot;schema&quot;: {
        &quot;autoId&quot;: false,
        &quot;enabledDynamicField&quot;: false,
        &quot;fields&quot;: [
            {
                &quot;fieldName&quot;: &quot;my_id&quot;,
                &quot;dataType&quot;: &quot;Int64&quot;,
                &quot;isPrimary&quot;: true
            },
            {
                &quot;fieldName&quot;: &quot;my_vector&quot;,
                &quot;dataType&quot;: &quot;FloatVector&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;dim&quot;: &quot;5&quot;
                }
            }
        ]
        
    }
}&#x27;</span>

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {},</span>
<span class="hljs-comment"># }</span>

$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/collections/get_load_state&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;customized_setup_2&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {</span>
<span class="hljs-comment">#         &quot;loadState&quot;: &quot;LoadStateNotLoaded&quot;</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<p>上記で作成したコレクションは自動的にロードされません。以下のようにコレクションのインデックスを作成できます。別の方法でコレクションのインデックスを作成しても、コレクションは自動的にロード されません。詳細は、<a href="/docs/ja/v2.4.x/manage-collections.md#Load--Release-Collection">Load &amp; Release Collection</a> を参照してください。</p>
<p><table class="language-python">
<thead>
<tr>
<th>パラメータ</th>
<th>説明</th>
</tr>
</thead>
<tbody>
<tr>
<td><code translate="no">collection_name</code></td>
<td>コレクションの名前。</td>
</tr>
<tr>
<td><code translate="no">schema</code></td>
<td>このコレクションのスキーマ。<br/>これを<strong>None</strong>に設定すると、このコレクションはデフォルト設定で作成されます。<br/>カスタマイズしたスキーマでコレクションを設定するには、<strong>CollectionSchema</strong>オブジェクトを作成し、それをここで参照する必要があります。この場合、milvusはリクエストに含まれる他のスキーマ関連の設定をすべて無視します。</td>
</tr>
<tr>
<td><code translate="no">index_params</code></td>
<td>このコレクション内のベクトルフィールドのインデックスを構築するためのパラメータです。カスタマイズされたスキーマでコレクションを設定し、自動的にコレクションをメモリにロードするには、IndexParamsオブジェクトを作成し、ここで参照する必要があります。<br/>少なくとも、このコレクション内のベクトルフィールドのインデックスを追加する必要があります。インデックスパラメータを後で設定したい場合は、このパラメータを省略することもできます。</td>
</tr>
</tbody>
</table></p>
<p><table class="language-java">
<thead>
<tr>
<th>パラメータ</th>
<th>説明</th>
</tr>
</thead>
<tbody>
<tr>
<td><code translate="no">collectionName</code></td>
<td>コレクションの名前。</td>
</tr>
<tr>
<td><code translate="no">collectionSchema</code></td>
<td><br/>これを空にすると、このコレクションはデフォルト設定で作成されます。カスタマイズしたスキーマでコレクションをセットアップするには、<strong>CollectionSchema</strong>オブジェクトを作成し、ここでそれを参照する必要があります。</td>
</tr>
<tr>
<td><code translate="no">indexParams</code></td>
<td>このコレクション内のベクトル・フィールドにインデックスを構築するためのパラメータ。カスタマイズされたスキーマでコレクションをセットアップし、コレクションを自動的にメモリにロードするには、<a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/IndexParam.md">IndexParam</a>オブジェクトのリストで<a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/IndexParam.md">IndexParams</a>オブジェクトを作成し、ここでそれを参照します。</td>
</tr>
</tbody>
</table></p>
<p><table class="language-javascript">
<thead>
<tr>
<th>パラメータ</th>
<th>説明</th>
</tr>
</thead>
<tbody>
<tr>
<td><code translate="no">collection_name</code></td>
<td>コレクションの名前。</td>
</tr>
<tr>
<td><code translate="no">fields</code></td>
<td>コレクション内のフィールド。</td>
</tr>
<tr>
<td><code translate="no">index_params</code></td>
<td>作成するコレクションのインデックス・パラメータ。</td>
</tr>
</tbody>
</table></p>
<p><table class="language-go">
<thead>
<tr>
<th>パラメータ</th>
<th>説明</th>
</tr>
</thead>
<tbody>
<tr>
<td><code translate="no">schema.CollectionName</code></td>
<td>コレクションの名前。</td>
</tr>
<tr>
<td><code translate="no">schema</code></td>
<td>このコレクションのスキーマ。</td>
</tr>
<tr>
<td><code translate="no">index_params</code></td>
<td>作成するコレクションのインデックス・パラメータ。</td>
</tr>
</tbody>
</table></p>
<p><table class="language-shell">
<thead>
<tr>
<th>パラメータ</th>
<th>説明</th>
</tr>
</thead>
<tbody>
<tr>
<td><code translate="no">collectionName</code></td>
<td>コレクションの名前。</td>
</tr>
<tr>
<td><code translate="no">schema</code></td>
<td>スキーマは、対象コレクション内のデータを整理する役割を果たします。有効なスキーマは複数のフィールドを持つ必要があり、プライマリ・キー、ベクトル・フィールド、および複数のスカラー・フィールドを含む必要があります。</td>
</tr>
<tr>
<td><code translate="no">schema.autoID</code></td>
<td>主フィールドの自動インクリメントを許可するかどうか。これをTrueに設定すると、プライマリ・フィールドは自動的にインクリメントされます。この場合、エラーを避けるために、プライマリ・フィールドを挿入するデータに含めるべきではありません。is_primaryをTrueに設定したフィールドにこのパラメータを設定します。</td>
</tr>
<tr>
<td><code translate="no">schema.enableDynamicField</code></td>
<td>予約された$metaフィールドを使用して、スキーマで定義されていないフィールドをkey-valueペアで保持することを許可するかどうか。</td>
</tr>
<tr>
<td><code translate="no">fields</code></td>
<td>フィールド・オブジェクトのリスト。</td>
</tr>
<tr>
<td><code translate="no">fields.fieldName</code></td>
<td>ターゲット・コレクションに作成するフィールドの名前。</td>
</tr>
<tr>
<td><code translate="no">fields.dataType</code></td>
<td>フィールド値のデータ型。</td>
</tr>
<tr>
<td><code translate="no">fields.isPrimary</code></td>
<td>現在のフィールドがプライマリ・フィールドかどうか。True に設定すると、現在のフィールドがプライマリ・フィールドになります。</td>
</tr>
<tr>
<td><code translate="no">fields.elementTypeParams</code></td>
<td>追加のフィールド・パラメータ。</td>
</tr>
<tr>
<td><code translate="no">fields.elementTypeParams.dim</code></td>
<td>FloatVector または BinaryVector フィールドのオプション・パラメータで、ベクトル次元を決定します。</td>
</tr>
</tbody>
</table></p>
<p>上記で作成したコレクションは自動的にロードされません。以下のように、コレクションのインデックスを作成できます。別の方法でコレクションのインデックスを作成しても、コレクションは自動的にロード されません。詳細は、<a href="/docs/ja/v2.4.x/manage-collections.md">Load &amp; Release Collection</a> を参照。</p>
<p><div class="multipleCode">
<a href="#python">Python </a><a href="#java">Java</a><a href="#javascript">Node.js</a><a href="#go">Go</a><a href="#shell">cURL</a></div></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 3.6 Create index</span>
client.create_index(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>,
    index_params=index_params
)

res = client.get_load_state(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: NotLoad&gt;&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">CreateIndexReq</span>  <span class="hljs-variable">createIndexReq</span> <span class="hljs-operator">=</span> CreateIndexReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_2&quot;</span>)
    .indexParams(indexParams)
    .build();

client.createIndex(createIndexReq);

<span class="hljs-comment">// Thread.sleep(1000);</span>

<span class="hljs-comment">// 3.7 Get load state of the collection</span>
<span class="hljs-type">GetLoadStateReq</span> <span class="hljs-variable">customSetupLoadStateReq2</span> <span class="hljs-operator">=</span> GetLoadStateReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_2&quot;</span>)
    .build();

res = client.getLoadState(customSetupLoadStateReq2);

System.out.println(res);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// false</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 3.5 Create index</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;my_vector&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;IVF_FLAT&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;IP&quot;</span>,
    <span class="hljs-attr">params</span>: { <span class="hljs-attr">nlist</span>: <span class="hljs-number">1024</span>}
})

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">state</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateNotLoad</span>
<span class="hljs-comment">//</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// 3.5 Create index</span>
client.CreateIndex(ctx, <span class="hljs-string">&quot;customized_setup_2&quot;</span>, <span class="hljs-string">&quot;my_id&quot;</span>, idxID, <span class="hljs-literal">false</span>)
client.CreateIndex(ctx, <span class="hljs-string">&quot;customized_setup_2&quot;</span>, <span class="hljs-string">&quot;my_vector&quot;</span>, idxVector, <span class="hljs-literal">false</span>)

stateLoad, err = client.GetLoadState(context.Background(), <span class="hljs-string">&quot;customized_setup_2&quot;</span>, []<span class="hljs-type">string</span>{})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to get load state:&quot;</span>, err.Error())
}
fmt.Println(stateLoad)
<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// 1</span>

<span class="hljs-comment">// LoadStateNotExist -&gt; LoadState = 0</span>
<span class="hljs-comment">// LoadStateNotLoad  -&gt; LoadState = 1</span>
<span class="hljs-comment">// LoadStateLoading  -&gt; LoadState = 2</span>
<span class="hljs-comment">// LoadStateLoaded   -&gt; LoadState = 3</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/indexes/create&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;customized_setup_2&quot;,
    &quot;indexParams&quot;: [
        {
            &quot;metricType&quot;: &quot;L2&quot;,
            &quot;fieldName&quot;: &quot;my_vector&quot;,
            &quot;indexName&quot;: &quot;my_vector&quot;,
            &quot;indexConfig&quot;: {
                &quot;index_type&quot;: &quot;IVF_FLAT&quot;,
                &quot;nlist&quot;: &quot;1024&quot;
            }
        }
    ]
}&#x27;</span>

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {},</span>
<span class="hljs-comment"># }</span>

$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/collections/get_load_state&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;customized_setup_2&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {</span>
<span class="hljs-comment">#         &quot;loadState&quot;: &quot;LoadStateNotLoaded&quot;</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
  <table class="language-python">
  <thead>
    <tr>
      <th>パラメータ</th>
      <th>説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">collection_name</code></td>
      <td>コレクションの名前。</td>
    </tr>
    <tr>
      <td><code translate="no">index_params</code></td>
      <td><strong>IndexParam</strong>オブジェクトのリストを含む<strong>IndexParams</strong>オブジェクト。</td>
    </tr>
  </tbody>
</table>
</li>
</ul>
<table class="language-java">
  <thead>
    <tr>
      <th>パラメータ</th>
      <th>説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">collectionName</code></td>
      <td>コレクションの名前。</td>
    </tr>
    <tr>
      <td><code translate="no">indexParams</code></td>
      <td><strong>IndexParam</strong>オブジェクトのリスト。</td>
    </tr>
  </tbody>
</table>
<table class="language-javascript">
  <thead>
    <tr>
      <th>パラメータ</th>
      <th>説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">collection_name</code></td>
      <td>コレクションの名前。</td>
    </tr>
    <tr>
      <td><code translate="no">field_name</code></td>
      <td>インデックスを作成するフィールドの名前。</td>
    </tr>
    <tr>
      <td><code translate="no">index_type</code></td>
      <td>特定のフィールドにデータを配置するために使用するアルゴリズム名。適用可能なアルゴリズムについては、<a href="https://milvus.io/docs/index.md">In-memory Index</a>および<a href="https://milvus.io/docs/disk_index.md">On-disk Index</a> を参照してください。</td>
    </tr>
    <tr>
      <td><code translate="no">metric_type</code></td>
      <td>ベクトル間の類似度を測定するために使用されるアルゴリズム。指定可能な値は<strong>IP</strong>、<strong>L2</strong>、<strong>COSINE</strong>、<strong>JACCARD</strong>、<strong>HAMMING</strong>。これは、指定されたフィールドがベクトル・フィールドである場合にのみ使用できる。詳しくは<a href="https://milvus.io/docs/index.md#Indexes-supported-in-Milvus">Milvusでサポートされているインデックスを</a>参照してください。</td>
    </tr>
    <tr>
      <td><code translate="no">params</code></td>
      <td>指定されたインデックス・タイプの微調整パラメータ。指定可能なキーと値の範囲の詳細については、<a href="https://milvus.io/docs/index.md">メモリ内インデックスを</a>参照してください。</td>
    </tr>
  </tbody>
</table>
<table class="language-go">
  <thead>
    <tr>
      <th>パラメータ</th>
      <th>説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">collName</code></td>
      <td>コレクションの名前。</td>
    </tr>
    <tr>
      <td><code translate="no">fieldName</code></td>
      <td>インデックスを作成するフィールドの名前。</td>
    </tr>
    <tr>
      <td><code translate="no">idx</code></td>
      <td>特定のフィールドにデータを配置するために使用されるアルゴリズム名。適用可能なアルゴリズムについては、<a href="https://milvus.io/docs/index.md">In-memory Index</a>および<a href="https://milvus.io/docs/disk_index.md">On-disk Index</a> を参照してください。</td>
    </tr>
    <tr>
      <td><code translate="no">async</code></td>
      <td>この操作が非同期かどうか。</td>
    </tr>
    <tr>
      <td><code translate="no">opts</code></td>
      <td>指定したインデックス・タイプの微調整パラメータ。このリクエストには複数の `entity.IndexOption` を含めることができます。指定可能なキーと値の範囲の詳細については、<a href="https://milvus.io/docs/index.md">インメモリインデックスを</a>参照してください。</td>
    </tr>
  </tbody>
</table>
<table class="language-shell">
    <thead>
        <tr>
        <th>パラメータ</th>
        <th>説明</th>
        </tr>
    </thead>
    <tbody>
        <tr>
        <td><code translate="no">collectionName</code></td>
        <td>コレクションの名前。</td>
        </tr>
        <tr>
        <td><code translate="no">indexParams</code></td>
        <td>作成するコレクションのインデックスパラメータ。</td>
        </tr>
        <tr>
        <td><code translate="no">indexParams.metricType</code></td>
        <td>インデックスの構築に使用される類似度メトリックのタイプ。既定値は COSINE。</td>
        </tr>
        <tr>
        <td><code translate="no">indexParams.fieldName</code></td>
        <td>インデックスを作成する対象フィールドの名前。</td>
        </tr>
        <tr>
        <td><code translate="no">indexParams.indexName</code></td>
        <td>作成するインデックスの名前。値の既定値はターゲット・フィールド名です。</td>
        </tr>
        <tr>
        <td><code translate="no">indexParams.indexConfig.index_type</code></td>
        <td>作成するインデックスのタイプ。</td>
        </tr>
        <tr.>
        <td><code translate="no">indexParams.indexConfig.nlist</code></td>
        <td>クラスタ・ユニットの数。これはIVF関連のインデックス・タイプに適用されます。</td>
        </tr>
    </tbody>
</table>
<h2 id="View-Collections" class="common-anchor-header">コレクションの表示<button data-href="#View-Collections" class="anchor-icon" translate="no">
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
    </button></h2><div class="language-python">
<p>既存のコレクションの詳細を確認するには<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/describe_collection.md">describe_collection()</a> を使用します。</p>
</div>
<div class="language-java">
<p>既存のコレクションの詳細を確認するには<a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/describeCollection.md">describeCollection()</a> を使用します。</p>
</div>
<div class="language-javascript">
<p>既存のコレクションの詳細を確認するには<a href="https://milvus.io/api-reference/node/v2.4.x/Collections/describeCollection.md">describeCollection()</a> を使用します。</p>
</div>
<div class="language-go">
<p>既存のコレクションの詳細を確認するには、<a href="https://milvus.io/api-reference/go/v2.4.x/Collection/DescribeCollection.md">describeCollection()</a> を使用します。</p>
</div>
<div class="language-shell">
<p>コレクションの定義を表示するには <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Collection%20(v2)/Describe.md"><code translate="no">POST /v2/vectordb/collections/describe</code></a>および <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Collection%20(v2)/List.md"><code translate="no">POST /v2/vectordb/collections/list</code></a>API エンドポイントを使用します。</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 5. View Collections</span>
res = client.describe_collection(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;collection_name&quot;: &quot;customized_setup_2&quot;,</span>
<span class="hljs-comment">#     &quot;auto_id&quot;: false,</span>
<span class="hljs-comment">#     &quot;num_shards&quot;: 1,</span>
<span class="hljs-comment">#     &quot;description&quot;: &quot;&quot;,</span>
<span class="hljs-comment">#     &quot;fields&quot;: [</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;field_id&quot;: 100,</span>
<span class="hljs-comment">#             &quot;name&quot;: &quot;my_id&quot;,</span>
<span class="hljs-comment">#             &quot;description&quot;: &quot;&quot;,</span>
<span class="hljs-comment">#             &quot;type&quot;: 5,</span>
<span class="hljs-comment">#             &quot;params&quot;: {},</span>
<span class="hljs-comment">#             &quot;element_type&quot;: 0,</span>
<span class="hljs-comment">#             &quot;is_primary&quot;: true</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;field_id&quot;: 101,</span>
<span class="hljs-comment">#             &quot;name&quot;: &quot;my_vector&quot;,</span>
<span class="hljs-comment">#             &quot;description&quot;: &quot;&quot;,</span>
<span class="hljs-comment">#             &quot;type&quot;: 101,</span>
<span class="hljs-comment">#             &quot;params&quot;: {</span>
<span class="hljs-comment">#                 &quot;dim&quot;: 5</span>
<span class="hljs-comment">#             },</span>
<span class="hljs-comment">#             &quot;element_type&quot;: 0</span>
<span class="hljs-comment">#         }</span>
<span class="hljs-comment">#     ],</span>
<span class="hljs-comment">#     &quot;aliases&quot;: [],</span>
<span class="hljs-comment">#     &quot;collection_id&quot;: 448143479230158446,</span>
<span class="hljs-comment">#     &quot;consistency_level&quot;: 2,</span>
<span class="hljs-comment">#     &quot;properties&quot;: {},</span>
<span class="hljs-comment">#     &quot;num_partitions&quot;: 1,</span>
<span class="hljs-comment">#     &quot;enable_dynamic_field&quot;: true</span>
<span class="hljs-comment"># }</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">import io.milvus.v2.service.collection.request.DescribeCollectionReq;
import io.milvus.v2.service.collection.response.DescribeCollectionResp;

// 4. View collections
DescribeCollectionReq describeCollectionReq = DescribeCollectionReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_2&quot;</span>)
    .build();

DescribeCollectionResp describeCollectionRes = client.describeCollection(describeCollectionReq);

System.out.println(JSONObject.toJSON(describeCollectionRes));

// Output:
// {
//     <span class="hljs-string">&quot;createTime&quot;</span>: 449005822816026627,
//     <span class="hljs-string">&quot;collectionSchema&quot;</span>: {<span class="hljs-string">&quot;fieldSchemaList&quot;</span>: [
//         {
//             <span class="hljs-string">&quot;autoID&quot;</span>: <span class="hljs-literal">false</span>,
//             <span class="hljs-string">&quot;dataType&quot;</span>: <span class="hljs-string">&quot;Int64&quot;</span>,
//             <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;my_id&quot;</span>,
//             <span class="hljs-string">&quot;description&quot;</span>: <span class="hljs-string">&quot;&quot;</span>,
//             <span class="hljs-string">&quot;isPrimaryKey&quot;</span>: <span class="hljs-literal">true</span>,
//             <span class="hljs-string">&quot;maxLength&quot;</span>: 65535,
//             <span class="hljs-string">&quot;isPartitionKey&quot;</span>: <span class="hljs-literal">false</span>
//         },
//         {
//             <span class="hljs-string">&quot;autoID&quot;</span>: <span class="hljs-literal">false</span>,
//             <span class="hljs-string">&quot;dataType&quot;</span>: <span class="hljs-string">&quot;FloatVector&quot;</span>,
//             <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;my_vector&quot;</span>,
//             <span class="hljs-string">&quot;description&quot;</span>: <span class="hljs-string">&quot;&quot;</span>,
//             <span class="hljs-string">&quot;isPrimaryKey&quot;</span>: <span class="hljs-literal">false</span>,
//             <span class="hljs-string">&quot;dimension&quot;</span>: 5,
//             <span class="hljs-string">&quot;maxLength&quot;</span>: 65535,
//             <span class="hljs-string">&quot;isPartitionKey&quot;</span>: <span class="hljs-literal">false</span>
//         }
//     ]},
//     <span class="hljs-string">&quot;vectorFieldName&quot;</span>: [<span class="hljs-string">&quot;my_vector&quot;</span>],
//     <span class="hljs-string">&quot;autoID&quot;</span>: <span class="hljs-literal">false</span>,
//     <span class="hljs-string">&quot;fieldNames&quot;</span>: [
//         <span class="hljs-string">&quot;my_id&quot;</span>,
//         <span class="hljs-string">&quot;my_vector&quot;</span>
//     ],
//     <span class="hljs-string">&quot;description&quot;</span>: <span class="hljs-string">&quot;&quot;</span>,
//     <span class="hljs-string">&quot;numOfPartitions&quot;</span>: 1,
//     <span class="hljs-string">&quot;primaryFieldName&quot;</span>: <span class="hljs-string">&quot;my_id&quot;</span>,
//     <span class="hljs-string">&quot;enableDynamicField&quot;</span>: <span class="hljs-literal">true</span>,
//     <span class="hljs-string">&quot;collectionName&quot;</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>
// }
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 5. View Collections</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">describeCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// {</span>
<span class="hljs-comment">//   virtual_channel_names: [ &#x27;by-dev-rootcoord-dml_13_449007919953017716v0&#x27; ],</span>
<span class="hljs-comment">//   physical_channel_names: [ &#x27;by-dev-rootcoord-dml_13&#x27; ],</span>
<span class="hljs-comment">//   aliases: [],</span>
<span class="hljs-comment">//   start_positions: [],</span>
<span class="hljs-comment">//   properties: [],</span>
<span class="hljs-comment">//   status: {</span>
<span class="hljs-comment">//     extra_info: {},</span>
<span class="hljs-comment">//     error_code: &#x27;Success&#x27;,</span>
<span class="hljs-comment">//     reason: &#x27;&#x27;,</span>
<span class="hljs-comment">//     code: 0,</span>
<span class="hljs-comment">//     retriable: false,</span>
<span class="hljs-comment">//     detail: &#x27;&#x27;</span>
<span class="hljs-comment">//   },</span>
<span class="hljs-comment">//   schema: {</span>
<span class="hljs-comment">//     fields: [ [Object], [Object] ],</span>
<span class="hljs-comment">//     properties: [],</span>
<span class="hljs-comment">//     name: &#x27;customized_setup_2&#x27;,</span>
<span class="hljs-comment">//     description: &#x27;&#x27;,</span>
<span class="hljs-comment">//     autoID: false,</span>
<span class="hljs-comment">//     enable_dynamic_field: false</span>
<span class="hljs-comment">//   },</span>
<span class="hljs-comment">//   collectionID: &#x27;449007919953017716&#x27;,</span>
<span class="hljs-comment">//   created_timestamp: &#x27;449024569603784707&#x27;,</span>
<span class="hljs-comment">//   created_utc_timestamp: &#x27;1712892797866&#x27;,</span>
<span class="hljs-comment">//   shards_num: 1,</span>
<span class="hljs-comment">//   consistency_level: &#x27;Bounded&#x27;,</span>
<span class="hljs-comment">//   collection_name: &#x27;customized_setup_2&#x27;,</span>
<span class="hljs-comment">//   db_name: &#x27;default&#x27;,</span>
<span class="hljs-comment">//   num_partitions: &#x27;1&#x27;</span>
<span class="hljs-comment">// }</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-Go"><span class="hljs-comment">// 4. View collections</span>

res, err := client.DescribeCollection(ctx, <span class="hljs-string">&quot;customized_setup_2&quot;</span>)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to describe collection:&quot;</span>, err.Error())
}
fmt.Printf(<span class="hljs-string">&quot;ConsistencyLevel: %v\nID: %v\nLoaded: %v\nName: %v\nPhysicalChannels: %v\nProperties: %v\nSchemaField1: %v\nSchemaField2: %v\nShardNum: %v\nVirtualChannels: %v\nSchemaAutoID: %v\nSchemaCollectionName: %v\nSchemaDescription: %v&quot;</span>,
    res.ConsistencyLevel, res.ID, res.Loaded, res.Name, res.PhysicalChannels,
    res.Properties, res.Schema.Fields[<span class="hljs-number">0</span>], res.Schema.Fields[<span class="hljs-number">1</span>], res.ShardNum,
    res.VirtualChannels, res.Schema.AutoID, res.Schema.CollectionName, res.Schema.Description)

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// ConsistencyLevel: 2</span>
<span class="hljs-comment">// ID: 453858520413977280</span>
<span class="hljs-comment">// Loaded: false</span>
<span class="hljs-comment">// Name: customized_setup_2</span>
<span class="hljs-comment">// PhysicalChannels: [by-dev-rootcoord-dml_14]</span>
<span class="hljs-comment">// Properties: map[]</span>
<span class="hljs-comment">// SchemaField1: &amp;{100 my_id true false  int64 map[] map[] false false false undefined}</span>
<span class="hljs-comment">// SchemaField2: &amp;{101 my_vector false false  []float32 map[dim:5] map[] false false false undefined}</span>
<span class="hljs-comment">// ShardNum: 1</span>
<span class="hljs-comment">// VirtualChannels: [by-dev-rootcoord-dml_14_453858520413977280v0]</span>
<span class="hljs-comment">// SchemaAutoID: false</span>
<span class="hljs-comment">// SchemaCollectionName: customized_setup_2</span>
<span class="hljs-comment">// SchemaDescription: 2024/11/12 14:06:53 my_rag_collection</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/collections/describe&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;dbName&quot;: &quot;default&quot;,
    &quot;collectionName&quot;: &quot;test_collection&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {</span>
<span class="hljs-comment">#         &quot;aliases&quot;: [],</span>
<span class="hljs-comment">#         &quot;autoId&quot;: false,</span>
<span class="hljs-comment">#         &quot;collectionID&quot;: 448707763883002014,</span>
<span class="hljs-comment">#         &quot;collectionName&quot;: &quot;test_collection&quot;,</span>
<span class="hljs-comment">#         &quot;consistencyLevel&quot;: &quot;Bounded&quot;,</span>
<span class="hljs-comment">#         &quot;description&quot;: &quot;&quot;,</span>
<span class="hljs-comment">#         &quot;enableDynamicField&quot;: true,</span>
<span class="hljs-comment">#         &quot;fields&quot;: [</span>
<span class="hljs-comment">#             {</span>
<span class="hljs-comment">#                 &quot;autoId&quot;: false,</span>
<span class="hljs-comment">#                 &quot;description&quot;: &quot;&quot;,</span>
<span class="hljs-comment">#                 &quot;id&quot;: 100,</span>
<span class="hljs-comment">#                 &quot;name&quot;: &quot;id&quot;,</span>
<span class="hljs-comment">#                 &quot;partitionKey&quot;: false,</span>
<span class="hljs-comment">#                 &quot;primaryKey&quot;: true,</span>
<span class="hljs-comment">#                 &quot;type&quot;: &quot;Int64&quot;</span>
<span class="hljs-comment">#             },</span>
<span class="hljs-comment">#             {</span>
<span class="hljs-comment">#                 &quot;autoId&quot;: false,</span>
<span class="hljs-comment">#                 &quot;description&quot;: &quot;&quot;,</span>
<span class="hljs-comment">#                 &quot;id&quot;: 101,</span>
<span class="hljs-comment">#                 &quot;name&quot;: &quot;vector&quot;,</span>
<span class="hljs-comment">#                 &quot;params&quot;: [</span>
<span class="hljs-comment">#                     {</span>
<span class="hljs-comment">#                         &quot;key&quot;: &quot;dim&quot;,</span>
<span class="hljs-comment">#                         &quot;value&quot;: &quot;5&quot;</span>
<span class="hljs-comment">#                     }</span>
<span class="hljs-comment">#                 ],</span>
<span class="hljs-comment">#                 &quot;partitionKey&quot;: false,</span>
<span class="hljs-comment">#                 &quot;primaryKey&quot;: false,</span>
<span class="hljs-comment">#                 &quot;type&quot;: &quot;FloatVector&quot;</span>
<span class="hljs-comment">#             }</span>
<span class="hljs-comment">#         ],</span>
<span class="hljs-comment">#         &quot;indexes&quot;: [</span>
<span class="hljs-comment">#             {</span>
<span class="hljs-comment">#                 &quot;fieldName&quot;: &quot;vector&quot;,</span>
<span class="hljs-comment">#                 &quot;indexName&quot;: &quot;vector&quot;,</span>
<span class="hljs-comment">#                 &quot;metricType&quot;: &quot;COSINE&quot;</span>
<span class="hljs-comment">#             }</span>
<span class="hljs-comment">#         ],</span>
<span class="hljs-comment">#         &quot;load&quot;: &quot;LoadStateLoaded&quot;,</span>
<span class="hljs-comment">#         &quot;partitionsNum&quot;: 1,</span>
<span class="hljs-comment">#         &quot;properties&quot;: [],</span>
<span class="hljs-comment">#         &quot;shardsNum&quot;: 1</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<p>既存のコレクションをすべてリストアップするには、以下のようにする：</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 6. List all collection names</span>
res = client.list_collections()

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># [</span>
<span class="hljs-comment">#     &quot;customized_setup_2&quot;,</span>
<span class="hljs-comment">#     &quot;quick_setup&quot;,</span>
<span class="hljs-comment">#     &quot;customized_setup_1&quot;</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.response.ListCollectionsResp;

<span class="hljs-comment">// 5. List all collection names</span>
<span class="hljs-type">ListCollectionsResp</span> <span class="hljs-variable">listCollectionsRes</span> <span class="hljs-operator">=</span> client.listCollections();

System.out.println(listCollectionsRes.getCollectionNames());

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//     &quot;customized_setup_2&quot;,</span>
<span class="hljs-comment">//     &quot;quick_setup&quot;,</span>
<span class="hljs-comment">//     &quot;customized_setup_1&quot;</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 5. List all collection names</span>
<span class="hljs-type">ListCollectionsResp</span> <span class="hljs-variable">listCollectionsRes</span> <span class="hljs-operator">=</span> client.listCollections();

System.out.println(listCollectionsRes.getCollectionNames());

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//     &quot;customized_setup_1&quot;,</span>
<span class="hljs-comment">//     &quot;quick_setup&quot;,</span>
<span class="hljs-comment">//     &quot;customized_setup_2&quot;</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-Go"><span class="hljs-comment">// 5. List all collection names</span>
collections, err := client.ListCollections(ctx)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to list collection:&quot;</span>, err.Error())
}
<span class="hljs-keyword">for</span> _, c := <span class="hljs-keyword">range</span> collections {
    log.Println(c.Name)
}

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// customized_setup_2</span>
<span class="hljs-comment">// quick_setup</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/collections/list&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;dbName&quot;: &quot;default&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#   &quot;code&quot;: 0,</span>
<span class="hljs-comment">#   &quot;data&quot;: [</span>
<span class="hljs-comment">#     &quot;quick_setup&quot;,</span>
<span class="hljs-comment">#     &quot;customized_setup_1&quot;,</span>
<span class="hljs-comment">#     &quot;customized_setup_2&quot;</span>
<span class="hljs-comment">#   ]</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Load--Release-Collection" class="common-anchor-header">コレクションのロードとリリース<button data-href="#Load--Release-Collection" class="anchor-icon" translate="no">
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
    </button></h2><p>コレクションをロードする際、Milvusはコレクションのインデックスファイルをメモリにロードします。逆に、コレクションをリリースする際、Milvusはインデックスファイルをメモリからアンロードします。コレクションで検索を行う前に、コレクションがロードされていることを確認してください。</p>
<h3 id="Load-a-collection" class="common-anchor-header">コレクションのロード</h3><div class="language-python">
<p>コレクションをロードするには <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/load_collection.md"><code translate="no">load_collection()</code></a>メソッドを使用し、コレクション名を指定します。また、<code translate="no">replica_number</code> を設定して、コレクションのロード時にクエリノード上に作成するデータセグメントのメモリ内レプリカの数を決定することもできます。</p>
<ul>
<li>Milvus Standaloneの場合：<code translate="no">replica_number</code> の最大許容値は 1 です。</li>
<li>Milvus Cluster：最大値はMilvus構成で設定された<code translate="no">queryNode.replicas</code> を超えないようにしてください。詳細については、<a href="https://milvus.io/docs/configure_querynode.md#Query-Node-related-Configurations">クエリ・ノード関連設定を</a>参照してください。</li>
</ul>
</div>
<div class="language-java">
<p>コレクションをロードするには <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/loadCollection.md"><code translate="no">loadCollection()</code></a>メソッドを使用し、コレクション名を指定します。</p>
</div>
<div class="language-javascript">
<p>コレクションをロードするには <a href="https://milvus.io/api-reference/node/v2.4.x/Management/loadCollection.md"><code translate="no">loadCollection()</code></a>メソッドを使用します。</p>
</div>
<div class="language-go">
<p>コレクションをロードするには <a href="https://milvus.io/api-reference/go/v2.4.x/Collection/LoadCollection.md"><code translate="no">LoadCollection()</code></a>メソッドを使用します。</p>
</div>
<div class="language-shell">
<p>コレクションをロードするには <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Collection%20(v2)/Load.md"><code translate="no">POST /v2/vectordb/collections/load</code></a>および <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Collection%20(v2)/GetLoadState.md"><code translate="no">POST /v2/vectordb/collections/get_load_state</code></a>API エンドポイントを使用する。</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 7. Load the collection</span>
client.load_collection(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>,
    replica_number=<span class="hljs-number">1</span> <span class="hljs-comment"># Number of replicas to create on query nodes. Max value is 1 for Milvus Standalone, and no greater than `queryNode.replicas` for Milvus Cluster.</span>
)

res = client.get_load_state(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: Loaded&gt;&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.LoadCollectionReq;

<span class="hljs-comment">// 6. Load the collection</span>
<span class="hljs-type">LoadCollectionReq</span> <span class="hljs-variable">loadCollectionReq</span> <span class="hljs-operator">=</span> LoadCollectionReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_2&quot;</span>)
    .build();

client.loadCollection(loadCollectionReq);

<span class="hljs-comment">// Thread.sleep(5000);</span>

<span class="hljs-comment">// 7. Get load state of the collection</span>
<span class="hljs-type">GetLoadStateReq</span> <span class="hljs-variable">loadStateReq</span> <span class="hljs-operator">=</span> GetLoadStateReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_2&quot;</span>)
    .build();

res = client.getLoadState(loadStateReq);

System.out.println(res);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// true</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 7. Load the collection</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">loadCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>

<span class="hljs-keyword">await</span> <span class="hljs-title function_">sleep</span>(<span class="hljs-number">3000</span>)

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">state</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateLoaded</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// 6. Load the collection</span>

err = client.LoadCollection(ctx, <span class="hljs-string">&quot;customized_setup_2&quot;</span>, <span class="hljs-literal">false</span>)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to laod collection:&quot;</span>, err.Error())
}

<span class="hljs-comment">// 7. Get load state of the collection</span>
stateLoad, err := client.GetLoadState(context.Background(), <span class="hljs-string">&quot;customized_setup_2&quot;</span>, []<span class="hljs-type">string</span>{})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to get load state:&quot;</span>, err.Error())
}
fmt.Println(stateLoad)

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// 3</span>

<span class="hljs-comment">// LoadStateNotExist -&gt; LoadState = 0</span>
<span class="hljs-comment">// LoadStateNotLoad  -&gt; LoadState = 1</span>
<span class="hljs-comment">// LoadStateLoading  -&gt; LoadState = 2</span>
<span class="hljs-comment">// LoadStateLoaded   -&gt; LoadState = 3</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/collections/load&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;customized_setup_2&quot;
}&#x27;</span>

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {},</span>
<span class="hljs-comment"># }</span>

$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/collections/get_load_state&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
  &quot;collectionName&quot;: &quot;customized_setup_2&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {</span>
<span class="hljs-comment">#         &quot;loadProgress&quot;: 100,</span>
<span class="hljs-comment">#         &quot;loadState&quot;: &quot;LoadStateLoaded&quot;</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Load-a-collection-partially-Public-Preview" class="common-anchor-header">コレクションを部分的に読み込む（パブリックプレビュー）</h3><div class="alert note">
<p>この機能は現在パブリックプレビュー中です。APIと機能は将来変更される可能性があります。</p>
</div>
<p>ロード要求を受け取ると、Milvusはすべてのベクトルフィールドインデックスとすべてのスカラーフィールドデータをメモリにロードします。検索やクエリに関与しないフィールドがある場合、それらをロードから除外してメモリ使用量を削減し、検索パフォーマンスを向上させることができます。</p>
<div class="language-python">
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 7. Load the collection</span>
client.load_collection(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>,
    load_fields=[<span class="hljs-string">&quot;my_id&quot;</span>, <span class="hljs-string">&quot;my_vector&quot;</span>], <span class="hljs-comment"># Load only the specified fields</span>
    skip_load_dynamic_field=<span class="hljs-literal">True</span> <span class="hljs-comment"># Skip loading the dynamic field</span>
)

res = client.get_load_state(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: Loaded&gt;&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<p>検索やクエリでフィルタリング条件や出力フィールドとして使用できるのは、<code translate="no">load_fields</code> にリストされたフィールドだけであることに注意してください。リストには常に主キーを含める必要があります。ロードから除外されたフィールド名はフィルタリングや出力に使用できません。</p>
<p><code translate="no">skip_load_dynamic_field=True</code> 、ダイナミック・フィールドのロードをスキップすることができます。Milvusはダイナミックフィールドを1つのフィールドとして扱うため、ダイナミックフィールド内のすべてのキーが一緒に含まれたり除外されたりします。</p>
</div>
<h3 id="Release-a-collection" class="common-anchor-header">コレクションの解放</h3><div class="language-python">
<p>コレクションを解放するには <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/release_collection.md"><code translate="no">release_collection()</code></a>メソッドを使用します。</p>
</div>
<div class="language-java">
<p>コレクションを解放するには <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/releaseCollection.md"><code translate="no">releaseCollection()</code></a>メソッドを使用します。</p>
</div>
<div class="language-javascript">
<p>コレクションを解放するには <a href="https://milvus.io/api-reference/node/v2.4.x/Management/releaseCollection.md"><code translate="no">releaseCollection()</code></a>メソッドを使用します。</p>
</div>
<div class="language-go">
<p>コレクションを解放するには <a href="https://milvus.io/api-reference/go/v2.4.x/Collection/ReleaseCollection.md"><code translate="no">ReleaseCollection()</code></a>メソッドを使用します。</p>
</div>
<div class="language-shell">
<p>コレクションを解放するには <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Collection%20(v2)/Release.md"><code translate="no">POST /v2/vectordb/collections/release</code></a>および <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Collection%20(v2)/GetLoadState.md"><code translate="no">POST /v2/vectordb/collections/get_load_state</code></a>APIエンドポイントを使用する。</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 8. Release the collection</span>
client.release_collection(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>
)

res = client.get_load_state(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: NotLoad&gt;&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.ReleaseCollectionReq;

<span class="hljs-comment">// 8. Release the collection</span>
<span class="hljs-type">ReleaseCollectionReq</span> <span class="hljs-variable">releaseCollectionReq</span> <span class="hljs-operator">=</span> ReleaseCollectionReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_2&quot;</span>)
    .build();

client.releaseCollection(releaseCollectionReq);

<span class="hljs-comment">// Thread.sleep(1000);</span>

res = client.getLoadState(loadStateReq);

System.out.println(res);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// false</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 8. Release the collection</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">releaseCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">state</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateNotLoad</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// 8. Release the collection</span>
errRelease := client.ReleaseCollection(context.Background(), <span class="hljs-string">&quot;customized_setup_2&quot;</span>)
<span class="hljs-keyword">if</span> errRelease != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to release collection:&quot;</span>, errRelease.Error())
}
fmt.Println(errRelease)
stateLoad, err = client.GetLoadState(context.Background(), <span class="hljs-string">&quot;customized_setup_2&quot;</span>, []<span class="hljs-type">string</span>{})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to get load state:&quot;</span>, err.Error())
}
fmt.Println(stateLoad)

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// 1</span>

<span class="hljs-comment">// meaning not loaded</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/collections/release&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;customized_setup_2&quot;
}&#x27;</span>

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {},</span>
<span class="hljs-comment"># }</span>


$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/collections/get_load_state&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
  &quot;collectionName&quot;: &quot;customized_setup_2&quot;
}&#x27;</span>


<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {</span>
<span class="hljs-comment">#         &quot;loadState&quot;: &quot;LoadStateNotLoad&quot;</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-up-aliases" class="common-anchor-header">エイリアスの設定<button data-href="#Set-up-aliases" class="anchor-icon" translate="no">
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
    </button></h2><p>コレクションにエイリアスを割り当てて、特定のコンテキストでより意味のあるものにすることができます。コレクションには複数のエイリアスを割り当てることができますが、複数のコレクションでエイリアスを共有することはできません。</p>
<h3 id="Create-aliases" class="common-anchor-header">エイリアスの作成</h3><div class="language-python">
<p>エイリアスを作成するには <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_alias.md"><code translate="no">create_alias()</code></a>メソッドを使用して、コレクション名とエイリアスを指定します。</p>
</div>
<div class="language-java">
<p>エイリアスを作成するには <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createAlias.md"><code translate="no">createAlias()</code></a>メソッドを使用し、コレクション名とエイリアスを指定します。</p>
</div>
<div class="language-javascript">
<p>エイリアスを作成するには <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/createAlias.md"><code translate="no">createAlias()</code></a>メソッドを使用し、コレクション名とエイリアスを指定します。</p>
</div>
<div class="language-shell">
<p>コレクションのエイリアスを作成するには <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Alias%20(v2)/Create.md"><code translate="no">POST /v2/vectordb/aliases/create</code></a>API エンドポイントを使用します。</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 9.1. Create aliases</span>
client.create_alias(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>,
    <span class="hljs-built_in">alias</span>=<span class="hljs-string">&quot;bob&quot;</span>
)

client.create_alias(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>,
    <span class="hljs-built_in">alias</span>=<span class="hljs-string">&quot;alice&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.utility.request.CreateAliasReq;

<span class="hljs-comment">// 9. Manage aliases</span>

<span class="hljs-comment">// 9.1 Create alias</span>
<span class="hljs-type">CreateAliasReq</span> <span class="hljs-variable">createAliasReq</span> <span class="hljs-operator">=</span> CreateAliasReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_2&quot;</span>)
    .alias(<span class="hljs-string">&quot;bob&quot;</span>)
    .build();

client.createAlias(createAliasReq);

createAliasReq = CreateAliasReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_2&quot;</span>)
    .alias(<span class="hljs-string">&quot;alice&quot;</span>)
    .build();

client.createAlias(createAliasReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 9. Manage aliases</span>
<span class="hljs-comment">// 9.1 Create aliases</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createAlias</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>,
    <span class="hljs-attr">alias</span>: <span class="hljs-string">&quot;bob&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createAlias</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>,
    <span class="hljs-attr">alias</span>: <span class="hljs-string">&quot;alice&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/aliases/create&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;customized_setup_2&quot;,
    &quot;aliasName&quot;: &quot;bob&quot;
}&#x27;</span>

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {}</span>
<span class="hljs-comment"># }</span>

$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/aliases/create&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;customized_setup_2&quot;,
    &quot;aliasName&quot;: &quot;alice&quot;
}&#x27;</span>

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {}</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<table class="language-python">
  <thead>
    <tr>
      <th>パラメータ</th>
      <th>説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">collection_name</code></td>
      <td>エイリアスを作成するコレクションの名前。</td>
    </tr>
    <tr>
      <td><code translate="no">alias</code></td>
      <td>コレクションのエイリアス。この操作の前に、エイリアスが既に存在しないことを確認してください。存在する場合は例外が発生します。</td>
    </tr>
  </tbody>
</table>
<table class="language-java">
  <thead>
    <tr>
      <th>パラメータ</th>
      <th>説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">collectionName</code></td>
      <td>エイリアスを作成するコレクションの名前。</td>
    </tr>
    <tr>
      <td><code translate="no">alias</code></td>
      <td>コレクションのエイリアス。この操作の前に、エイリアスが既に存在しないことを確認してください。存在する場合は例外が発生します。</td>
    </tr>
  </tbody>
</table>
<table class="language-javascript">
  <thead>
    <tr>
      <th>パラメータ</th>
      <th>説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">collection_name</code></td>
      <td>エイリアスを作成するコレクションの名前。</td>
    </tr>
    <tr>
      <td><code translate="no">alias</code></td>
      <td>コレクションのエイリアス。この操作の前に、エイリアスが既に存在しないことを確認してください。存在する場合は例外が発生します。</td>
    </tr>
  </tbody>
</table>
<table class="language-shell">
  <thead>
    <tr>
      <th>パラメータ</th>
      <th>説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">collectionName</code></td>
      <td>エイリアスを作成するコレクションの名前。</td>
    </tr>
    <tr>
      <td><code translate="no">aliasName</code></td>
      <td>コレクションのエイリアス。この操作の前に、エイリアスが既に存在しないことを確認してください。存在する場合は例外が発生します。</td>
    </tr>
  </tbody>
</table>
<h3 id="List-aliases" class="common-anchor-header">エイリアスのリスト</h3><div class="language-python">
<p>エイリアスをリストするには <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/list_aliases.md"><code translate="no">list_aliases()</code></a>メソッドを使用します。</p>
</div>
<div class="language-java">
<p>エイリアスをリストするには <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/listAliases.md"><code translate="no">listAliases()</code></a>メソッドを使用します。</p>
</div>
<div class="language-javascript">
<p>エイリアスをリストするには <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/listAliases.md"><code translate="no">listAliases()</code></a>メソッドを使用します。</p>
</div>
<div class="language-shell">
<p>コレクションのエイリアスをリストするには <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Alias%20(v2)/List.md"><code translate="no">POST /v2/vectordb/aliases/list</code></a>API エンドポイントを使用します。</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 9.2. List aliases</span>
res = client.list_aliases(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;aliases&quot;: [</span>
<span class="hljs-comment">#         &quot;bob&quot;,</span>
<span class="hljs-comment">#         &quot;alice&quot;</span>
<span class="hljs-comment">#     ],</span>
<span class="hljs-comment">#     &quot;collection_name&quot;: &quot;customized_setup_2&quot;,</span>
<span class="hljs-comment">#     &quot;db_name&quot;: &quot;default&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.utility.request.ListAliasesReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.utility.response.ListAliasResp;

<span class="hljs-comment">// 9.2 List alises</span>
<span class="hljs-type">ListAliasesReq</span> <span class="hljs-variable">listAliasesReq</span> <span class="hljs-operator">=</span> ListAliasesReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_2&quot;</span>)
    .build();

<span class="hljs-type">ListAliasResp</span> <span class="hljs-variable">listAliasRes</span> <span class="hljs-operator">=</span> client.listAliases(listAliasesReq);

System.out.println(listAliasRes.getAlias());

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//     &quot;bob&quot;,</span>
<span class="hljs-comment">//     &quot;alice&quot;</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 9.2 List aliases</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">listAliases</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">aliases</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [ &#x27;bob&#x27;, &#x27;alice&#x27; ]</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/aliases/list&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;customized_setup_2&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: [</span>
<span class="hljs-comment">#         &quot;bob&quot;,</span>
<span class="hljs-comment">#         &quot;alice&quot;</span>
<span class="hljs-comment">#     ]</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Describe-aliases" class="common-anchor-header">エイリアスの記述</h3><div class="language-python">
<p>エイリアスを記述するには <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/describe_alias.md"><code translate="no">describe_alias()</code></a>メソッドを使います。</p>
</div>
<div class="language-java">
<p>エイリアスを記述するには <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/describeAlias.md"><code translate="no">describeAlias()</code></a>メソッドを使う。</p>
</div>
<div class="language-javascript">
<p>エイリアスを記述するには <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/describeAlias.md"><code translate="no">describeAlias()</code></a>メソッドを使用します。</p>
</div>
<div class="language-shell">
<p>コレクションのエイリアスを記述するには <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Alias%20(v2)/Describe.md"><code translate="no">POST /v2/vectordb/aliases/describe</code></a>API エンドポイントを使用します。</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 9.3. Describe aliases</span>
res = client.describe_alias(
    <span class="hljs-built_in">alias</span>=<span class="hljs-string">&quot;bob&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;alias&quot;: &quot;bob&quot;,</span>
<span class="hljs-comment">#     &quot;collection_name&quot;: &quot;customized_setup_2&quot;,</span>
<span class="hljs-comment">#     &quot;db_name&quot;: &quot;default&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">utility</span>.<span class="hljs-property">request</span>.<span class="hljs-property">DescribeAliasReq</span>;
<span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">utility</span>.<span class="hljs-property">response</span>.<span class="hljs-property">DescribeAliasResp</span>;

<span class="hljs-comment">// 9.3 Describe alias</span>
<span class="hljs-title class_">DescribeAliasReq</span> describeAliasReq = <span class="hljs-title class_">DescribeAliasReq</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">alias</span>(<span class="hljs-string">&quot;bob&quot;</span>)
    .<span class="hljs-title function_">build</span>();

<span class="hljs-title class_">DescribeAliasResp</span> describeAliasRes = client.<span class="hljs-title function_">describeAlias</span>(describeAliasReq);

<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(<span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>.<span class="hljs-title function_">toJSON</span>(describeAliasRes));

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// {</span>
<span class="hljs-comment">//     &quot;alias&quot;: &quot;bob&quot;,</span>
<span class="hljs-comment">//     &quot;collectionName&quot;: &quot;customized_setup_2&quot;</span>
<span class="hljs-comment">// }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 9.3 Describe aliases</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">describeAlias</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>,
    <span class="hljs-attr">alias</span>: <span class="hljs-string">&quot;bob&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// {</span>
<span class="hljs-comment">//   status: {</span>
<span class="hljs-comment">//     extra_info: {},</span>
<span class="hljs-comment">//     error_code: &#x27;Success&#x27;,</span>
<span class="hljs-comment">//     reason: &#x27;&#x27;,</span>
<span class="hljs-comment">//     code: 0,</span>
<span class="hljs-comment">//     retriable: false,</span>
<span class="hljs-comment">//     detail: &#x27;&#x27;</span>
<span class="hljs-comment">//   },</span>
<span class="hljs-comment">//   db_name: &#x27;default&#x27;,</span>
<span class="hljs-comment">//   alias: &#x27;bob&#x27;,</span>
<span class="hljs-comment">//   collection: &#x27;customized_setup_2&#x27;</span>
<span class="hljs-comment">// }</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/aliases/describe&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;aliasName&quot;: &quot;bob&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {</span>
<span class="hljs-comment">#         &quot;aliasName&quot;: &quot;bob&quot;,</span>
<span class="hljs-comment">#         &quot;collectionName&quot;: &quot;quick_setup&quot;,</span>
<span class="hljs-comment">#         &quot;dbName&quot;: &quot;default&quot;</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Reassign-aliases" class="common-anchor-header">エイリアスの再割り当て</h3><div class="language-python">
<p>エイリアスを他のコレクションに再割り当てするには <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/alter_alias.md"><code translate="no">alter_alias()</code></a>メソッドを使用して、コレクション名とエイリアスを指定します。</p>
</div>
<div class="language-java">
<p>エイリアスを他のコレクションに再割り当てするには <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/alterAlias.md"><code translate="no">alterAlias()</code></a>メソッドを使用して、コレクション名とエイリアスを指定します。</p>
</div>
<div class="language-javascript">
<p>エイリアスを他のコレクションに再割り当てするには <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/alterAlias.md"><code translate="no">alterAlias()</code></a>メソッドを使用して、コレクション名とエイリアスを指定します。</p>
</div>
<div class="language-shell">
<p>エイリアスを他のコレクションに再割り当てするには <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Alias%20(v2)/Alter.md"><code translate="no">POST /v2/vectordb/aliases/alter</code></a>APIエンドポイントを使用します。</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 9.4 Reassign aliases to other collections</span>
client.alter_alias(
    collection_name=<span class="hljs-string">&quot;customized_setup_1&quot;</span>,
    alias=<span class="hljs-string">&quot;alice&quot;</span>
)

res = client.list_aliases(
    collection_name=<span class="hljs-string">&quot;customized_setup_1&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;aliases&quot;: [</span>
<span class="hljs-comment">#         &quot;alice&quot;</span>
<span class="hljs-comment">#     ],</span>
<span class="hljs-comment">#     &quot;collection_name&quot;: &quot;customized_setup_1&quot;,</span>
<span class="hljs-comment">#     &quot;db_name&quot;: &quot;default&quot;</span>
<span class="hljs-comment"># }</span>

res = client.list_aliases(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;aliases&quot;: [</span>
<span class="hljs-comment">#         &quot;bob&quot;</span>
<span class="hljs-comment">#     ],</span>
<span class="hljs-comment">#     &quot;collection_name&quot;: &quot;customized_setup_2&quot;,</span>
<span class="hljs-comment">#     &quot;db_name&quot;: &quot;default&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.utility.request.AlterAliasReq;

<span class="hljs-comment">// 9.4 Reassign alias to other collections</span>
AlterAliasReq alterAliasReq = AlterAliasReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_1&quot;</span>)
    .alias(<span class="hljs-string">&quot;alice&quot;</span>)
    .build();

client.alterAlias(alterAliasReq);

listAliasesReq = ListAliasesReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_1&quot;</span>)
    .build();

listAliasRes = client.listAliases(listAliasesReq);

System.out.<span class="hljs-built_in">println</span>(listAliasRes.getAlias());

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [&quot;alice&quot;]</span>

listAliasesReq = ListAliasesReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_2&quot;</span>)
    .build();

listAliasRes = client.listAliases(listAliasesReq);

System.out.<span class="hljs-built_in">println</span>(listAliasRes.getAlias());

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [&quot;bob&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 9.4 Reassign aliases to other collections</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">alterAlias</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_1&quot;</span>,
    <span class="hljs-attr">alias</span>: <span class="hljs-string">&quot;alice&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">listAliases</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_1&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">aliases</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [ &#x27;alice&#x27; ]</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">listAliases</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">aliases</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [ &#x27;bob&#x27; ]</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/aliases/alter&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
     &quot;collectionName&quot;: &quot;customized_setup_1&quot;,
     &quot;aliasName&quot;: &quot;alice&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {}</span>
<span class="hljs-comment"># }</span>


$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/aliases/list&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;customized_setup_1&quot;
}&#x27;</span>


<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: [</span>
<span class="hljs-comment">#         &quot;alice&quot;</span>
<span class="hljs-comment">#     ]</span>
<span class="hljs-comment"># }</span>


$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/aliases/list&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;customized_setup_2&quot;
}&#x27;</span>


<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: [</span>
<span class="hljs-comment">#         &quot;bob&quot;</span>
<span class="hljs-comment">#     ]</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Drop-aliases" class="common-anchor-header">エイリアスの削除</h3><div class="language-python">
<p>エイリアスを削除するには <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/drop_alias.md"><code translate="no">drop_alias()</code></a>メソッドを使います。</p>
</div>
<div class="language-java">
<p>エイリアスを削除するには <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/dropAlias.md"><code translate="no">dropAlias()</code></a>メソッドを使う。</p>
</div>
<div class="language-javascript">
<p>エイリアスを削除するには <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/dropAlias.md"><code translate="no">dropAlias()</code></a>メソッドを使用します。</p>
</div>
<div class="language-shell">
<p>コレクションのエイリアスを削除するには <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Alias%20(v2)/Drop.md"><code translate="no">POST /v2/vectordb/aliases/drop</code></a>APIエンドポイントを使用します。</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 9.5 Drop aliases</span>
client.drop_alias(
    <span class="hljs-built_in">alias</span>=<span class="hljs-string">&quot;bob&quot;</span>
)

client.drop_alias(
    <span class="hljs-built_in">alias</span>=<span class="hljs-string">&quot;alice&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.utility.request.DropAliasReq;

<span class="hljs-comment">// 9.5 Drop alias</span>
<span class="hljs-type">DropAliasReq</span> <span class="hljs-variable">dropAliasReq</span> <span class="hljs-operator">=</span> DropAliasReq.builder()
    .alias(<span class="hljs-string">&quot;bob&quot;</span>)
    .build();

client.dropAlias(dropAliasReq);

dropAliasReq = DropAliasReq.builder()
    .alias(<span class="hljs-string">&quot;alice&quot;</span>)
    .build();

client.dropAlias(dropAliasReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 9.5 Drop aliases</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropAlias</span>({
    <span class="hljs-attr">alias</span>: <span class="hljs-string">&quot;bob&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropAlias</span>({
    <span class="hljs-attr">alias</span>: <span class="hljs-string">&quot;alice&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/aliases/drop&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;aliasName&quot;: &quot;bob&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {}</span>
<span class="hljs-comment"># }</span>


$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/aliases/drop&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;aliasName&quot;: &quot;alice&quot;
}&#x27;</span>


<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {}</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-Properties" class="common-anchor-header">プロパティの設定<button data-href="#Set-Properties" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">ttl.seconds</code> や<code translate="no">mmap.enabled</code> など、コレクションのプロパティを設定できます。詳細は<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/set_properties.md">set_properties()</a> を参照してください。</p>
<div class="alert note">
<p>このセクションのコードスニペットは<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Connections/connect.md">PyMilvus ORMモジュールを</a>使用してMilvusとやりとりします。新しい<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">MilvusClient SDKを</a>使用したコードスニペットは近日公開予定です。</p>
</div>
<h3 id="Set-TTL" class="common-anchor-header">TTLの設定</h3><p>コレクション内のデータのTTL(Time-To-Live)を設定します。これはデータが自動的に削除されるまでの保持期間を指定します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Collection, connections

<span class="hljs-comment"># Connect to Milvus server</span>
connections.connect(host=<span class="hljs-string">&quot;localhost&quot;</span>, port=<span class="hljs-string">&quot;19530&quot;</span>) <span class="hljs-comment"># Change to your Milvus server IP and port</span>

<span class="hljs-comment"># Get existing collection</span>
collection = Collection(<span class="hljs-string">&quot;quick_setup&quot;</span>)

<span class="hljs-comment"># Set the TTL for the data in the collection</span>
collection.set_properties(
    properties={
        <span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>: <span class="hljs-number">60</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Set-MMAP" class="common-anchor-header">MMAP の設定</h3><p>これは、クエリのパフォーマンスを向上させるために、データをメモリにマッピングするかどうかを決定します。詳細は、<a href="https://milvus.io/docs/mmap.md#Configure-memory-mapping">メモリ・マッピングの構成</a> を参照してください。</p>
<div class="alert note">
<p>MMAP プロパティを設定する前に、まずコレクションを解放します。そうしないと、エラーが発生します。</p>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Collection, connections

<span class="hljs-comment"># Connect to Milvus server</span>
connections.connect(host=<span class="hljs-string">&quot;localhost&quot;</span>, port=<span class="hljs-string">&quot;19530&quot;</span>) <span class="hljs-comment"># Change to your Milvus server IP and port</span>

<span class="hljs-comment"># Get existing collection</span>
collection = Collection(<span class="hljs-string">&quot;quick_setup&quot;</span>)

<span class="hljs-comment"># Before setting memory mapping property, we need to release the collection first.</span>
collection.release()

<span class="hljs-comment"># Set memory mapping property to True or Flase</span>
collection.set_properties(
    properties={
        <span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-literal">True</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Drop-a-Collection" class="common-anchor-header">コレクションを放棄する<button data-href="#Drop-a-Collection" class="anchor-icon" translate="no">
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
    </button></h2><p>コレクションが不要になった場合、コレクションを削除できます。</p>
<div class="language-python">
<p>コレクションを削除するには <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/drop_collection.md"><code translate="no">drop_collection()</code></a>メソッドを使用します。</p>
</div>
<div class="language-java">
<p>コレクションを削除するには <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/dropCollection.md"><code translate="no">dropCollection()</code></a>メソッドを使用します。</p>
</div>
<div class="language-javascript">
<p>コレクションを削除するには <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/dropCollection.md"><code translate="no">dropCollection()</code></a>メソッドを使用します。</p>
</div>
<div class="language-go">
<p>コレクションを削除するには <a href="https://milvus.io/api-reference/go/v2.4.x/Collection/DropCollection.md"><code translate="no">DropCollection()</code></a>メソッドを使用します。</p>
</div>
<div class="language-shell">
<p>コレクションを削除するには <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Collection%20(v2)/Drop.md"><code translate="no">POST /v2/vectordb/collections/drop</code></a>API エンドポイントを使用します。</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 10. Drop the collections</span>
client.drop_collection(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>
)

client.drop_collection(
    collection_name=<span class="hljs-string">&quot;customized_setup_1&quot;</span>
)

client.drop_collection(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.DropCollectionReq;

<span class="hljs-comment">// 10. Drop collections</span>

<span class="hljs-type">DropCollectionReq</span> <span class="hljs-variable">dropQuickSetupParam</span> <span class="hljs-operator">=</span> DropCollectionReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .build();

client.dropCollection(dropQuickSetupParam);

<span class="hljs-type">DropCollectionReq</span> <span class="hljs-variable">dropCustomizedSetupParam</span> <span class="hljs-operator">=</span> DropCollectionReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_1&quot;</span>)
    .build();

client.dropCollection(dropCustomizedSetupParam);

dropCustomizedSetupParam = DropCollectionReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_2&quot;</span>)
    .build();

client.dropCollection(dropCustomizedSetupParam);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 10. Drop the collection</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_1&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// 10. Drop collections</span>

err = client.<span class="hljs-title class_">DropCollection</span>(ctx, <span class="hljs-string">&quot;quick_setup&quot;</span>)
<span class="hljs-keyword">if</span> err != nil {
    log.<span class="hljs-title class_">Fatal</span>(<span class="hljs-string">&quot;failed to drop collection:&quot;</span>, err.<span class="hljs-title class_">Error</span>())
}
err = client.<span class="hljs-title class_">DropCollection</span>(ctx, <span class="hljs-string">&quot;customized_setup_2&quot;</span>)
<span class="hljs-keyword">if</span> err != nil {
    log.<span class="hljs-title class_">Fatal</span>(<span class="hljs-string">&quot;failed to drop collection:&quot;</span>, err.<span class="hljs-title class_">Error</span>())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/collections/drop&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;quick_setup&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {}</span>
<span class="hljs-comment"># }</span>


$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/collections/drop&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;customized_setup_1&quot;
}&#x27;</span>


<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {}</span>
<span class="hljs-comment"># }</span>


$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/collections/drop&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;customized_setup_2&quot;
}&#x27;</span>


<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {}</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
