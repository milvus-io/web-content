---
id: basic-vector-search-with-structarray.md
title: StructArray を使用した基本的なベクトル検索
summary: >-
  このページでは、StructArrayフィールド内のベクトルサブフィールドに対してベクトル検索を実行できます。StructArrayでは、2つの基本的なベクトル検索モードがサポートされています。1つは、各エンティティに格納された埋め込みリストを評価する「EmbeddingList検索」、もう1つは、各Struct要素を個別に検索する「要素レベル検索」です。
---
<h1 id="Basic-Vector-Search-with-StructArray" class="common-anchor-header">StructArray を使用した基本的なベクトル検索<button data-href="#Basic-Vector-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>このページでは、StructArrayフィールド内のベクトルサブフィールドに対してベクトル検索を実行できます。StructArrayは、各エンティティに格納された埋め込みリストを評価する「EmbeddingList検索」と、各Struct要素を個別に検索する「要素レベル検索」という2つの基本的なベクトル検索モードをサポートしています。</p>
<p>このページでは、「<a href="/docs/ja/create-structarray-field.md">StructArrayフィールドの作成</a>」にある<code translate="no">tech_articles</code> コレクションを使用しています。このコレクションには、<code translate="no">chunks</code> という名前のStructArrayフィールドが含まれています。各チャンクには、テキスト、スカラーメタデータ、EmbeddingList検索用のインデックスを持つ<code translate="no">emb_list_vector</code> という名前のベクトルサブフィールド、および要素レベル検索用のインデックスを持つ<code translate="no">emb</code> という名前のベクトルサブフィールドが含まれています。</p>
<h2 id="Before-you-begin" class="common-anchor-header">開始する前に<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>コレクションのスキーマ、データ、およびインデックスがすでに準備されていることを確認してください。例のベクトルは4次元です。各検索例では、クライアントを初期化し、<code translate="no">tech_articles</code> の読み込みが完了するのを待ってから検索を行います。cURLを使用する場合は、<code translate="no">jq</code> をインストールして、読み込み状態のレスポンスを確認してください。</p>
<table>
<thead>
<tr><th>要件</th><th>準備場所</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">chunks</code> などの StructArray フィールドを作成します。</td><td><a href="/docs/ja/create-structarray-field.md">StructArrayフィールドの作成</a></td></tr>
<tr><td><code translate="no">chunks</code> フィールドにStructオブジェクトを含むエンティティを挿入します。</td><td><a href="/docs/ja/insert-data-into-structarray-fields.md">StructArrayフィールドへのデータの挿入</a></td></tr>
<tr><td>EmbeddingList検索用に、<code translate="no">chunks[emb_list_vector]</code> に<code translate="no">MAX_SIM*</code> インデックスを作成します。</td><td><a href="/docs/ja/index-structarray-fields.md">StructArrayフィールドのインデックス作成</a></td></tr>
<tr><td>要素レベルの検索用に、<code translate="no">chunks[emb]</code> に対して通常のベクトルメトリックインデックスを作成します。</td><td><a href="/docs/ja/index-structarray-fields.md">StructArrayフィールドのインデックス作成</a></td></tr>
</tbody>
</table>
<div class="alert note">
<p>警告</p>
<p>ベクトルフィールドまたはベクトルサブフィールドには、1 つのインデックスのみ指定できます。EmbeddingList 検索と要素レベルの検索の両方が必要な場合は、2 つの別々のベクトルサブフィールドを作成してください。このページでは、<code translate="no">chunks[emb_list_vector]</code> は EmbeddingList 検索用に、<code translate="no">chunks[emb]</code> は要素レベルの検索用にインデックスが作成されています。</p>
</div>
<h2 id="Choose-a-search-mode" class="common-anchor-header">検索モードの選択<button data-href="#Choose-a-search-mode" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>アスペクト</th><th>EmbeddingList検索</th><th>要素レベル検索</th></tr>
</thead>
<tbody>
<tr><td>対象サブフィールド</td><td><code translate="no">chunks[emb_list_vector]</code></td><td><code translate="no">chunks[emb]</code></td></tr>
<tr><td>クエリデータ</td><td>1つ以上のベクトルを含む埋め込みリスト。</td><td>通常のベクトル。</td></tr>
<tr><td>メトリックファミリー</td><td><code translate="no">MAX_SIM*</code>、例えば<code translate="no">MAX_SIM_COSINE</code> など。</td><td><code translate="no">COSINE</code> 、<code translate="no">IP</code> 、<code translate="no">L2</code> などの通常のベクトルメトリック。</td></tr>
<tr><td>1つのヒットが表すもの</td><td>StructArray ベクトルサブフィールドがクエリの埋め込みリストと類似している、一致したエンティティ。</td><td>StructArray フィールド内の、一致した Struct 要素。</td></tr>
<tr><td>結果の粒度</td><td>エンティティレベル。</td><td>Struct 要素レベル。</td></tr>
<tr><td>オフセット</td><td>該当なし。</td><td>返される際、一致した構造体要素の 0 を基点とする位置を識別します。</td></tr>
<tr><td>一般的な使用例</td><td>ColBERT、ColPali、およびその他の後期相互作用型検索パターン。</td><td>チャンクレベル、パッセージレベル、クリップレベル、パッチレベル、またはファクトレベルの検索。</td></tr>
</tbody>
</table>
<h2 id="Run-EmbeddingList-search" class="common-anchor-header">EmbeddingList 検索の実行<button data-href="#Run-EmbeddingList-search" class="anchor-icon" translate="no">
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
    </button></h2><p>クエリ自体に複数のベクトルが含まれており、対象の StructArray ベクトルサブフィールドが<code translate="no">MAX_SIM*</code> メトリックでインデックス付けされている場合は、EmbeddingList 検索を使用します。結果はエンティティレベルの一致となります。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">from</span> pymilvus.client.embedding_list <span class="hljs-keyword">import</span> EmbeddingList

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

client.load_collection(collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>)

query = EmbeddingList()
query.add([<span class="hljs-number">0.12</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.32</span>, <span class="hljs-number">0.44</span>])
query.add([<span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>, <span class="hljs-number">0.29</span>, <span class="hljs-number">0.36</span>])

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query],
    anns_field=<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
    limit=<span class="hljs-number">3</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
    ],
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(hit[<span class="hljs-string">&quot;doc_id&quot;</span>], hit[<span class="hljs-string">&quot;distance&quot;</span>], hit[<span class="hljs-string">&quot;entity&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.LoadCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddingList;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.List;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

client.loadCollection(LoadCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .build());

<span class="hljs-type">EmbeddingList</span> <span class="hljs-variable">query</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddingList</span>();
query.add(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(Arrays.asList(<span class="hljs-number">0.12f</span>, <span class="hljs-number">0.21f</span>, <span class="hljs-number">0.32f</span>, <span class="hljs-number">0.44f</span>)));
query.add(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(Arrays.asList(<span class="hljs-number">0.18f</span>, <span class="hljs-number">0.23f</span>, <span class="hljs-number">0.29f</span>, <span class="hljs-number">0.36f</span>)));

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .annsField(<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>)
        .data(Collections.singletonList(query))
        .limit(<span class="hljs-number">3</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>))
        .build());

<span class="hljs-keyword">for</span> (List&lt;SearchResp.SearchResult&gt; hits : resp.getSearchResults()) {
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult hit : hits) {
        System.out.println(hit.getId() + <span class="hljs-string">&quot; &quot;</span> + hit.getScore() + <span class="hljs-string">&quot; &quot;</span> + hit.getEntity());
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}

loadTask, err := cli.LoadCollection(ctx, milvusclient.NewLoadCollectionOption(<span class="hljs-string">&quot;tech_articles&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}
<span class="hljs-keyword">if</span> err := loadTask.Await(ctx); err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}

query := entity.FloatVectorArray{
    {<span class="hljs-number">0.12</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.32</span>, <span class="hljs-number">0.44</span>},
    {<span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>, <span class="hljs-number">0.29</span>, <span class="hljs-number">0.36</span>},
}

results, err := cli.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;tech_articles&quot;</span>,
    <span class="hljs-number">3</span>,
    []entity.Vector{query},
).WithANNSField(<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>).WithOutputFields(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}

<span class="hljs-keyword">for</span> _, result := <span class="hljs-keyword">range</span> results {
    <span class="hljs-keyword">for</span> i := <span class="hljs-number">0</span>; i &lt; result.ResultCount; i++ {
        id, err := result.IDs.Get(i)
        <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> { <span class="hljs-built_in">panic</span>(err) }
        fmt.Println(id, result.Scores[i])
        <span class="hljs-keyword">for</span> _, field := <span class="hljs-keyword">range</span> result.Fields {
            value, err := field.Get(i)
            <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> { <span class="hljs-built_in">panic</span>(err) }
            fmt.Println(field.Name(), value)
        }
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

client.<span class="hljs-title function_ invoke__">load_collection</span>(LoadCollectionRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
    .<span class="hljs-title function_ invoke__">sync</span>(<span class="hljs-literal">true</span>)
    .<span class="hljs-title function_ invoke__">build</span>()?).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">query</span> = EmbeddingList::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">vectors</span>(<span class="hljs-built_in">vec!</span>[
    <span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.12</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.32</span>, <span class="hljs-number">0.44</span>],
    <span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>, <span class="hljs-number">0.29</span>, <span class="hljs-number">0.36</span>],
]);

<span class="hljs-keyword">let</span> <span class="hljs-variable">response</span> = client
    .<span class="hljs-title function_ invoke__">search</span>(
        SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
            .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>)
            .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">EmbeddingLists</span>(<span class="hljs-built_in">vec!</span>[query]))
            .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>])
            .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">3</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">for</span> <span class="hljs-variable">result</span> <span class="hljs-keyword">in</span> response.<span class="hljs-title function_ invoke__">results</span>() {
    <span class="hljs-keyword">for</span> <span class="hljs-variable">row</span> <span class="hljs-keyword">in</span> result.<span class="hljs-title function_ invoke__">rows</span>()? {
        <span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, row.<span class="hljs-title function_ invoke__">to_entity_row</span>()?);
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;stdexcept&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(milvus::<span class="hljs-built_in">ConnectParam</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-built_in">WithToken</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    <span class="hljs-keyword">throw</span> std::<span class="hljs-built_in">runtime_error</span>(status.<span class="hljs-built_in">Message</span>());
}

status = client-&gt;<span class="hljs-built_in">LoadCollection</span>(milvus::<span class="hljs-built_in">LoadCollectionRequest</span>()
    .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>).<span class="hljs-built_in">WithSync</span>(<span class="hljs-literal">true</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) { <span class="hljs-keyword">throw</span> std::<span class="hljs-built_in">runtime_error</span>(status.<span class="hljs-built_in">Message</span>()); }

milvus::EmbeddingList query;
query.<span class="hljs-built_in">AddFloatVector</span>({<span class="hljs-number">0.12</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.32</span>, <span class="hljs-number">0.44</span>});
query.<span class="hljs-built_in">AddFloatVector</span>({<span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>, <span class="hljs-number">0.29</span>, <span class="hljs-number">0.36</span>});

<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">SearchRequest</span>()
                   .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
                   .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">3</span>)
                   .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>)
                   .<span class="hljs-built_in">AddEmbeddingList</span>(std::<span class="hljs-built_in">move</span>(query))
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;doc_id&quot;</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;title&quot;</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;category&quot;</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;chunks[text]&quot;</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;chunks[section]&quot;</span>);

milvus::SearchResponse response;
status = client-&gt;<span class="hljs-built_in">Search</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    <span class="hljs-keyword">throw</span> std::<span class="hljs-built_in">runtime_error</span>(status.<span class="hljs-built_in">Message</span>());
}

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">auto</span>&amp; result : response.<span class="hljs-built_in">Results</span>().<span class="hljs-built_in">Results</span>()) {
    milvus::EntityRows output_rows;
    status = result.<span class="hljs-built_in">OutputRows</span>(output_rows);
    <span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) { <span class="hljs-keyword">throw</span> std::<span class="hljs-built_in">runtime_error</span>(status.<span class="hljs-built_in">Message</span>()); }
    <span class="hljs-keyword">for</span> (<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span>&amp; row : output_rows) {
        std::cout &lt;&lt; row &lt;&lt; std::endl;
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
  <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;root:Milvus&quot;</span>,
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">loadCollection</span>({ <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span> });

<span class="hljs-keyword">const</span> query = [
  [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.32</span>, <span class="hljs-number">0.44</span>],
  [<span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>, <span class="hljs-number">0.29</span>, <span class="hljs-number">0.36</span>],
];

<span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
  <span class="hljs-attr">data</span>: query,
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
  <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,
  <span class="hljs-attr">output_fields</span>: [
    <span class="hljs-string">&quot;doc_id&quot;</span>,
    <span class="hljs-string">&quot;title&quot;</span>,
    <span class="hljs-string">&quot;category&quot;</span>,
    <span class="hljs-string">&quot;chunks[text]&quot;</span>,
    <span class="hljs-string">&quot;chunks[section]&quot;</span>,
  ],
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(results.<span class="hljs-property">results</span>, <span class="hljs-literal">null</span>, <span class="hljs-number">2</span>));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> System;
<span class="hljs-keyword">using</span> System.Linq;
<span class="hljs-keyword">using</span> System.Text.Json;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
});
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-keyword">await</span> client.LoadCollectionAsync(<span class="hljs-keyword">new</span> LoadCollectionReq
{
    CollectionName = <span class="hljs-string">&quot;tech_articles&quot;</span>,
    Sync = <span class="hljs-literal">true</span>
});

<span class="hljs-keyword">var</span> query = <span class="hljs-keyword">new</span> EmbeddingList();
query.Add(<span class="hljs-keyword">new</span> ReadOnlyMemory&lt;<span class="hljs-built_in">float</span>&gt;(<span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.12f</span>, <span class="hljs-number">0.21f</span>, <span class="hljs-number">0.32f</span>, <span class="hljs-number">0.44f</span> }));
query.Add(<span class="hljs-keyword">new</span> ReadOnlyMemory&lt;<span class="hljs-built_in">float</span>&gt;(<span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.18f</span>, <span class="hljs-number">0.23f</span>, <span class="hljs-number">0.29f</span>, <span class="hljs-number">0.36f</span> }));

SearchResp results = <span class="hljs-keyword">await</span> client.SearchAsync(<span class="hljs-keyword">new</span> SearchReq
{
    CollectionName = <span class="hljs-string">&quot;tech_articles&quot;</span>,
    VectorFieldName = <span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
    EmbeddingLists = <span class="hljs-keyword">new</span>[] { query },
    Limit = <span class="hljs-number">3</span>,
    Parameters = <span class="hljs-keyword">new</span> SearchParameters
    {
        OutputFields = { <span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span> }
    }
});
<span class="hljs-keyword">foreach</span> (<span class="hljs-keyword">var</span> result <span class="hljs-keyword">in</span> results.SingleResults!)
{
    <span class="hljs-keyword">for</span> (<span class="hljs-built_in">int</span> i = <span class="hljs-number">0</span>; i &lt; result.Scores.Count; i++)
        Console.WriteLine(JsonSerializer.Serialize(result.GetRow(i)));
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">set</span> -euo pipefail

<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --fail-with-body --silent --show-error --request POST \
  --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/load&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data-raw <span class="hljs-string">&#x27;{&quot;collectionName&quot;:&quot;tech_articles&quot;}&#x27;</span> | jq -e <span class="hljs-string">&#x27;.code == 0&#x27;</span> &gt;/dev/null

loaded=<span class="hljs-literal">false</span>
<span class="hljs-keyword">for</span> attempt <span class="hljs-keyword">in</span> $(<span class="hljs-built_in">seq</span> 1 60); <span class="hljs-keyword">do</span>
  state=$(curl --fail-with-body --silent --show-error --request POST \
    --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/get_load_state&quot;</span> \
    --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
    --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
    --data-raw <span class="hljs-string">&#x27;{&quot;collectionName&quot;:&quot;tech_articles&quot;}&#x27;</span> | jq -er <span class="hljs-string">&#x27;if .code == 0 then .data.loadState else error(&quot;load-state request failed&quot;) end&#x27;</span>)
  <span class="hljs-keyword">if</span> [ <span class="hljs-string">&quot;<span class="hljs-variable">$state</span>&quot;</span> = <span class="hljs-string">&quot;LoadStateLoaded&quot;</span> ]; <span class="hljs-keyword">then</span>
    loaded=<span class="hljs-literal">true</span>
    <span class="hljs-built_in">break</span>
  <span class="hljs-keyword">fi</span>
  <span class="hljs-built_in">sleep</span> 1
<span class="hljs-keyword">done</span>
[ <span class="hljs-string">&quot;<span class="hljs-variable">$loaded</span>&quot;</span> = <span class="hljs-literal">true</span> ] || { <span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;Collection did not finish loading&quot;</span> &gt;&amp;2; <span class="hljs-built_in">exit</span> 1; }

curl --request POST \
  --url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/entities/search&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data-raw <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tech_articles&quot;,
    &quot;data&quot;: [
      [
        [0.12, 0.21, 0.32, 0.44],
        [0.18, 0.23, 0.29, 0.36]
      ]
    ],
    &quot;annsField&quot;: &quot;chunks[emb_list_vector]&quot;,
    &quot;limit&quot;: 3,
    &quot;outputFields&quot;: [
      &quot;doc_id&quot;,
      &quot;title&quot;,
      &quot;category&quot;,
      &quot;chunks[text]&quot;,
      &quot;chunks[section]&quot;
    ]
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>この検索モードでは、<code translate="no">limit</code> によって各クエリに対して返されるエンティティの数が制御されます。出力にはStructArrayのサブフィールドが含まれる場合がありますが、ヒット自体は特定のStruct要素ではなく、一致した親エンティティを表します。</p>
<div class="alert note">
<p>ColBERTやColPaliスタイルの完全な解説については、「<a href="/docs/ja/search-with-embedding-lists.md">埋め込みリストを使用した検索」を</a>参照してください。このページでは、StructArrayの基本的な検索動作についてのみ説明します。</p>
</div>
<h2 id="Run-element-level-search" class="common-anchor-header">要素レベルの検索を実行する<button data-href="#Run-element-level-search" class="anchor-icon" translate="no">
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
    </button></h2><p>各Struct要素が個別にベクトル検索の対象となる場合は、要素レベルの検索を使用します。クエリは通常のベクトルであり、対象となるベクトルサブフィールドには通常のベクトルメトリックが適用されている必要があります。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

client.load_collection(collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>)

query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>]

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    limit=<span class="hljs-number">5</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
        <span class="hljs-string">&quot;chunks[page]&quot;</span>,
        <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
    ],
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(
            <span class="hljs-string">&quot;doc_id:&quot;</span>, hit[<span class="hljs-string">&quot;doc_id&quot;</span>],
            <span class="hljs-string">&quot;distance:&quot;</span>, hit[<span class="hljs-string">&quot;distance&quot;</span>],
            <span class="hljs-string">&quot;offset:&quot;</span>, hit.get(<span class="hljs-string">&quot;offset&quot;</span>),
            <span class="hljs-string">&quot;entity:&quot;</span>, hit[<span class="hljs-string">&quot;entity&quot;</span>],
        )
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.LoadCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.List;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

client.loadCollection(LoadCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .build());

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .annsField(<span class="hljs-string">&quot;chunks[emb]&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(Arrays.asList(<span class="hljs-number">0.19f</span>, <span class="hljs-number">0.24f</span>, <span class="hljs-number">0.30f</span>, <span class="hljs-number">0.37f</span>))))
        .limit(<span class="hljs-number">5</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[page]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>))
        .build());

<span class="hljs-keyword">for</span> (List&lt;SearchResp.SearchResult&gt; hits : resp.getSearchResults()) {
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult hit : hits) {
        System.out.println(<span class="hljs-string">&quot;doc_id: &quot;</span> + hit.getId()
                + <span class="hljs-string">&quot; distance: &quot;</span> + hit.getScore()
                + <span class="hljs-string">&quot; offset: &quot;</span> + hit.getElementOffset()
                + <span class="hljs-string">&quot; entity: &quot;</span> + hit.getEntity());
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}

loadTask, err := cli.LoadCollection(ctx, milvusclient.NewLoadCollectionOption(<span class="hljs-string">&quot;tech_articles&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}
<span class="hljs-keyword">if</span> err := loadTask.Await(ctx); err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}

<span class="hljs-comment">// Go client/v3.0.0 does not expose element offsets in ResultSet.</span>
results, err := cli.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;tech_articles&quot;</span>,
    <span class="hljs-number">5</span>,
    []entity.Vector{entity.FloatVector{<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>}},
).WithANNSField(<span class="hljs-string">&quot;chunks[emb]&quot;</span>).WithOutputFields(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[page]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}

<span class="hljs-keyword">for</span> _, result := <span class="hljs-keyword">range</span> results {
    <span class="hljs-keyword">for</span> i := <span class="hljs-number">0</span>; i &lt; result.ResultCount; i++ {
        id, err := result.IDs.Get(i)
        <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> { <span class="hljs-built_in">panic</span>(err) }
        fmt.Println(<span class="hljs-string">&quot;doc_id:&quot;</span>, id, <span class="hljs-string">&quot;distance:&quot;</span>, result.Scores[i])
        <span class="hljs-keyword">for</span> _, field := <span class="hljs-keyword">range</span> result.Fields {
            value, err := field.Get(i)
            <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> { <span class="hljs-built_in">panic</span>(err) }
            fmt.Println(field.Name(), value)
        }
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

client.<span class="hljs-title function_ invoke__">load_collection</span>(LoadCollectionRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
    .<span class="hljs-title function_ invoke__">sync</span>(<span class="hljs-literal">true</span>)
    .<span class="hljs-title function_ invoke__">build</span>()?).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">query_vector</span> = <span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>];

<span class="hljs-keyword">let</span> <span class="hljs-variable">response</span> = client
    .<span class="hljs-title function_ invoke__">search</span>(
        SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
            .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;chunks[emb]&quot;</span>)
            .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[query_vector]))
            .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[page]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>])
            .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">5</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">for</span> <span class="hljs-variable">result</span> <span class="hljs-keyword">in</span> response.<span class="hljs-title function_ invoke__">results</span>() {
    <span class="hljs-keyword">for</span> <span class="hljs-variable">row</span> <span class="hljs-keyword">in</span> result.<span class="hljs-title function_ invoke__">rows</span>()? {
        <span class="hljs-keyword">let</span> <span class="hljs-variable">entity</span> = row.<span class="hljs-title function_ invoke__">to_entity_row</span>()?;
        <span class="hljs-built_in">println!</span>(
            <span class="hljs-string">&quot;doc_id: {:?} distance: {:?} offset: {:?} entity: {:?}&quot;</span>,
            row.<span class="hljs-title function_ invoke__">get</span>(<span class="hljs-string">&quot;doc_id&quot;</span>)?, row.<span class="hljs-title function_ invoke__">get</span>(<span class="hljs-string">&quot;score&quot;</span>)?, row.<span class="hljs-title function_ invoke__">element_offset</span>(), entity
        );
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;stdexcept&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(milvus::<span class="hljs-built_in">ConnectParam</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-built_in">WithToken</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    <span class="hljs-keyword">throw</span> std::<span class="hljs-built_in">runtime_error</span>(status.<span class="hljs-built_in">Message</span>());
}

status = client-&gt;<span class="hljs-built_in">LoadCollection</span>(milvus::<span class="hljs-built_in">LoadCollectionRequest</span>()
    .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>).<span class="hljs-built_in">WithSync</span>(<span class="hljs-literal">true</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) { <span class="hljs-keyword">throw</span> std::<span class="hljs-built_in">runtime_error</span>(status.<span class="hljs-built_in">Message</span>()); }

<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">SearchRequest</span>()
                   .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
                   .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">5</span>)
                   .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;chunks[emb]&quot;</span>)
                   .<span class="hljs-built_in">WithFloatVectors</span>({{<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>}})
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;doc_id&quot;</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;title&quot;</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;chunks[text]&quot;</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;chunks[section]&quot;</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;chunks[page]&quot;</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;chunks[quality_score]&quot;</span>);

milvus::SearchResponse response;
status = client-&gt;<span class="hljs-built_in">Search</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    <span class="hljs-keyword">throw</span> std::<span class="hljs-built_in">runtime_error</span>(status.<span class="hljs-built_in">Message</span>());
}

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">auto</span>&amp; result : response.<span class="hljs-built_in">Results</span>().<span class="hljs-built_in">Results</span>()) {
    milvus::EntityRows output_rows;
    status = result.<span class="hljs-built_in">OutputRows</span>(output_rows);
    <span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) { <span class="hljs-keyword">throw</span> std::<span class="hljs-built_in">runtime_error</span>(status.<span class="hljs-built_in">Message</span>()); }
    <span class="hljs-keyword">for</span> (<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span>&amp; row : output_rows) {
        std::cout &lt;&lt; row &lt;&lt; std::endl;
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
  <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;root:Milvus&quot;</span>,
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">loadCollection</span>({ <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span> });

<span class="hljs-keyword">const</span> query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>];

<span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
  <span class="hljs-attr">data</span>: query_vector,
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;chunks[emb]&quot;</span>,
  <span class="hljs-attr">limit</span>: <span class="hljs-number">5</span>,
  <span class="hljs-attr">output_fields</span>: [
    <span class="hljs-string">&quot;doc_id&quot;</span>,
    <span class="hljs-string">&quot;title&quot;</span>,
    <span class="hljs-string">&quot;chunks[text]&quot;</span>,
    <span class="hljs-string">&quot;chunks[section]&quot;</span>,
    <span class="hljs-string">&quot;chunks[page]&quot;</span>,
    <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
  ],
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(results.<span class="hljs-property">results</span>, <span class="hljs-literal">null</span>, <span class="hljs-number">2</span>));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> System;
<span class="hljs-keyword">using</span> System.Linq;
<span class="hljs-keyword">using</span> System.Text.Json;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
});
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-keyword">await</span> client.LoadCollectionAsync(<span class="hljs-keyword">new</span> LoadCollectionReq
{
    CollectionName = <span class="hljs-string">&quot;tech_articles&quot;</span>,
    Sync = <span class="hljs-literal">true</span>
});

<span class="hljs-keyword">var</span> queryVector = <span class="hljs-keyword">new</span> ReadOnlyMemory&lt;<span class="hljs-built_in">float</span>&gt;(<span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.19f</span>, <span class="hljs-number">0.24f</span>, <span class="hljs-number">0.30f</span>, <span class="hljs-number">0.37f</span> });

SearchResp results = <span class="hljs-keyword">await</span> client.SearchAsync(<span class="hljs-keyword">new</span> SearchReq
{
    CollectionName = <span class="hljs-string">&quot;tech_articles&quot;</span>,
    VectorFieldName = <span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    Vectors = <span class="hljs-keyword">new</span>[] { queryVector },
    Limit = <span class="hljs-number">5</span>,
    Parameters = <span class="hljs-keyword">new</span> SearchParameters
    {
        OutputFields = { <span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;chunks[text]&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks[page]&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span> }
    }
});
<span class="hljs-keyword">foreach</span> (<span class="hljs-keyword">var</span> result <span class="hljs-keyword">in</span> results.SingleResults!)
{
    <span class="hljs-keyword">for</span> (<span class="hljs-built_in">int</span> i = <span class="hljs-number">0</span>; i &lt; result.Scores.Count; i++)
        Console.WriteLine(JsonSerializer.Serialize(result.GetRow(i)));
}
<span class="hljs-comment">// One query: ElementIndices aligns with its hit order.</span>
Console.WriteLine(JsonSerializer.Serialize(results.ElementIndices));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">set</span> -euo pipefail

<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --fail-with-body --silent --show-error --request POST \
  --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/load&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data-raw <span class="hljs-string">&#x27;{&quot;collectionName&quot;:&quot;tech_articles&quot;}&#x27;</span> | jq -e <span class="hljs-string">&#x27;.code == 0&#x27;</span> &gt;/dev/null

loaded=<span class="hljs-literal">false</span>
<span class="hljs-keyword">for</span> attempt <span class="hljs-keyword">in</span> $(<span class="hljs-built_in">seq</span> 1 60); <span class="hljs-keyword">do</span>
  state=$(curl --fail-with-body --silent --show-error --request POST \
    --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/get_load_state&quot;</span> \
    --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
    --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
    --data-raw <span class="hljs-string">&#x27;{&quot;collectionName&quot;:&quot;tech_articles&quot;}&#x27;</span> | jq -er <span class="hljs-string">&#x27;if .code == 0 then .data.loadState else error(&quot;load-state request failed&quot;) end&#x27;</span>)
  <span class="hljs-keyword">if</span> [ <span class="hljs-string">&quot;<span class="hljs-variable">$state</span>&quot;</span> = <span class="hljs-string">&quot;LoadStateLoaded&quot;</span> ]; <span class="hljs-keyword">then</span>
    loaded=<span class="hljs-literal">true</span>
    <span class="hljs-built_in">break</span>
  <span class="hljs-keyword">fi</span>
  <span class="hljs-built_in">sleep</span> 1
<span class="hljs-keyword">done</span>
[ <span class="hljs-string">&quot;<span class="hljs-variable">$loaded</span>&quot;</span> = <span class="hljs-literal">true</span> ] || { <span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;Collection did not finish loading&quot;</span> &gt;&amp;2; <span class="hljs-built_in">exit</span> 1; }

curl --request POST \
  --url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/entities/search&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data-raw <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tech_articles&quot;,
    &quot;data&quot;: [
      [0.19, 0.24, 0.30, 0.37]
    ],
    &quot;annsField&quot;: &quot;chunks[emb]&quot;,
    &quot;limit&quot;: 5,
    &quot;outputFields&quot;: [
      &quot;doc_id&quot;,
      &quot;title&quot;,
      &quot;chunks[text]&quot;,
      &quot;chunks[section]&quot;,
      &quot;chunks[page]&quot;,
      &quot;chunks[quality_score]&quot;
    ]
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>要素レベル検索では、各ヒットは一致した Struct 要素を表します。<code translate="no">offset</code> の値は、StructArray フィールド内におけるその要素の 0 を基点とする位置です。クエリに一致する Struct 要素が複数ある場合、同じエンティティが複数回出現することがあります。<code translate="no">limit</code> の値は、一意の親エンティティではなく、要素のヒットに対して適用されます。</p>
<h2 id="Interpret-results" class="common-anchor-header">結果の解釈<button data-href="#Interpret-results" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>結果項目</th><th>EmbeddingList検索</th><th>要素レベルの検索</th></tr>
</thead>
<tbody>
<tr><td>主キー（このスキーマでは `<code translate="no">doc_id</code> `）</td><td>一致したエンティティの主キー。</td><td>一致した Struct 要素を含むエンティティの主キー。</td></tr>
<tr><td><code translate="no">distance</code> またはスコア</td><td>クエリの埋め込みリストと保存された埋め込みリストとの間のスコアまたは距離。</td><td>クエリベクトルと一致した Struct 要素のベクトルとの間のスコアまたは距離。</td></tr>
<tr><td><code translate="no">offset</code></td><td>該当なし。</td><td>返される際の一致した Struct 要素の 0 を基点とする位置。</td></tr>
<tr><td>重複する主キー</td><td>結果はエンティティレベルであるため、単一のクエリでは発生しないことが予想されます。</td><td>同じエンティティ内の複数の Struct 要素が一致する可能性があるため、発生する可能性があります。</td></tr>
<tr><td>要求された StructArray 出力フィールド</td><td>一致したエンティティから返されます。</td><td>ターゲットAPIおよびSDKがサポートする要素レベルのヒットシェイプと共に返されます。</td></tr>
</tbody>
</table>
<p>Python のサンプルでは PyMilvus 3.0.2 を使用しており、スキーマ名<code translate="no">doc_id</code> によってプライマリキーにアクセスしています。結果のアクセサは SDK によって異なります。Go クライアント/v3.0.0 では、<code translate="no">ResultSet</code> で要素のオフセットを公開していません。その他のサンプルでは、SDK がサポートする結果インターフェースを通じてのみオフセットを表示しています。</p>
<h2 id="Common-mistakes" class="common-anchor-header">よくある間違い<button data-href="#Common-mistakes" class="anchor-icon" translate="no">
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
<li><p>必須のサブフィールドパス構文 `<code translate="no">chunks[emb]</code>` の代わりに `<code translate="no">chunks.emb</code> ` を使用してしまうこと。</p></li>
<li><p>通常のベクトルメトリックでインデックス付けされたベクトルサブフィールドに対して、EmbeddingList クエリを使用すること。</p></li>
<li><p><code translate="no">MAX_SIM*</code> メトリックでインデックス付けされたベクトルサブフィールドに対して、通常のベクトルクエリを使用すること。</p></li>
<li><p>要素レベルの検索（<code translate="no">limit</code> ）が、その数だけの一意な親エンティティを返すことを期待している。実際には、要素レベルのヒットが返されます。</p></li>
<li><p>EmbeddingList検索が特定の要素オフセットを1つ返すことを期待している。しかし、エンティティレベルの一致が返される。</p></li>
<li><p>1つのベクトルサブフィールドを両方の検索モードで再利用している。各ベクトルサブフィールドは1つのインデックスのみを受け入れるため、別々のベクトルサブフィールドを使用してください。</p></li>
</ul>
<h2 id="Next-steps" class="common-anchor-header">次の手順<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>スカラー条件による要素レベルの検索を制限するには、「<a href="/docs/ja/filtered-search-with-structarray.md">StructArray を使用したフィルタリング検索</a>」を参照してください。</p></li>
<li><p>スコアまたは距離の境界による検索については、「<a href="/docs/ja/range-search-with-structarray.md">StructArray を使用した範囲検索</a>」を参照してください。</p></li>
<li><p>要素レベルの検索後、親エンティティごとに最大1つの結果を返すには、「<a href="/docs/ja/grouping-search-with-structarray.md">StructArray を使用したグループ化検索</a>」を参照してください。</p></li>
<li><p>StructArray 検索を他のベクトル検索と組み合わせるには、「<a href="/docs/ja/hybrid-search-with-structarray.md">StructArray を使用したハイブリッド検索</a>」を参照してください。</p></li>
<li><p>サポートされているデータ型、メトリック、フィルター、およびバージョン固有の制限を確認するには、「<a href="/docs/ja/structarray-limits.md">StructArrayの制限</a>」を参照してください。</p></li>
</ol>
