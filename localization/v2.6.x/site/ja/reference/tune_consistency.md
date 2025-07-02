---
id: tune_consistency.md
title: 一貫性レベル
summary: >-
  分散ベクトルデータベースとして、Milvusは各ノードまたはレプリカが読み書きの際に同じデータにアクセスできることを保証するために、複数の一貫性レベルを提供しています。現在サポートされている一貫性レベルには、Strong、Bounded、Eventually、Sessionがあり、Boundedはデフォルトで使用される一貫性レベルです。
---
<h1 id="Consistency-Level" class="common-anchor-header">一貫性レベル<button data-href="#Consistency-Level" class="anchor-icon" translate="no">
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
    </button></h1><p>分散ベクタデータベースとして、Milvusは各ノードやレプリカが読み書きの際に同じデータにアクセスできるように、複数の一貫性レベルを提供しています。現在サポートされている一貫性レベルには、<strong>Strong</strong>、<strong>Bounded</strong>、<strong>Eventually</strong>、<strong>Sessionが</strong>あり、<strong>Boundedは</strong>デフォルトの一貫性レベルです。</p>
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
    </button></h2><p>Milvusはストレージと計算を分離したシステムである。このシステムでは、<strong>DataNodesが</strong>データの永続化を担当し、最終的にMinIO/S3などの分散オブジェクトストレージに格納します。<strong>QueryNodeは</strong>検索などの計算タスクを処理する。これらのタスクは、<strong>バッチ</strong>データと<strong>ストリーミングデータの</strong>両方を処理する。簡単に言えば、バッチデータはオブジェクトストレージに既に格納されているデータとして理解でき、ストリーミングデータはオブジェクトストレージにまだ格納されていないデータを指す。ネットワーク遅延のため、QueryNodeは最新のストリーミング・データを保持していないことが多い。追加のセーフガードなしにストリーミングデータを直接検索すると、コミットされていない多くのデータポイントが失われ、検索結果の精度に影響を与える可能性があります。</p>
<p>Milvusコマーシャルエディションは、ストレージと計算を分離したシステムです。このシステムでは、DataNodesがデータの永続化を担当し、最終的にMinIO/S3などの分散オブジェクトストレージに格納します。QueryNodeは検索などの計算タスクを処理します。これらのタスクは、バッチデータとストリーミングデータの両方を処理する。簡単に言えば、バッチデータとはオブジェクトストレージに既に格納されているデータのことであり、ストリーミングデータとはオブジェクトストレージにまだ格納されていないデータのことである。ネットワークの待ち時間のため、QueryNode は最新のストリーミング・データを保持していないことが多い。追加のセーフガードなしにストリーミング・データを直接検索すると、コミットされていない多くのデータ・ポイントが失われ、検索結果の精度に影響する可能性があります。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/batch-data-and-streaming-data.png" alt="Batch Data And Streaming Data" class="doc-image" id="batch-data-and-streaming-data" />
   </span> <span class="img-wrapper"> <span>バッチ・データとストリーミング・データ</span> </span></p>
<p>上図に示すように、QueryNode は Search リクエストを受け取った後、ストリーミング・データとバッチ・データの両方を同時に受け取ることができる。しかし、ネットワークの遅延により、QueryNodeが取得したストリーミングデータは不完全な場合がある。</p>
<p>この問題に対処するため、Milvusはデータキュー内の各レコードにタイムスタンプを付与し、データキューに同期タイムスタンプを継続的に挿入します。同期タイムスタンプ(syncTs)を受信するたびに、QueryNodesはそれをServiceTimeとして設定し、QueryNodesはそのServiceTime以前のすべてのデータを見ることができるようになります。ServiceTimeに基づき、Milvusは保証タイムスタンプ（GuaranteeTs）を提供し、一貫性と可用性に関する様々なユーザー要件を満たすことができます。ユーザは検索リクエストにGuaranteeTsを指定することで、指定した時点より前のデータを検索スコープに含める必要性をQueryNodeに通知することができます。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/service-time-and-guarantee-time.png" alt="Service Time And Guarantee Time" class="doc-image" id="service-time-and-guarantee-time" />
   </span> <span class="img-wrapper"> <span>サービス時間と保証時間</span> </span></p>
<p>上図に示すように、GuaranteeTsがServiceTimeより小さい場合、指定された時点より前のすべてのデータがディスクに完全に書き込まれていることを意味し、QueryNodeは直ちに検索操作を実行することができる。GuaranteeTsがServiceTimeより大きい場合、QueryNodeはServiceTimeがGuaranteeTsを超えるまで待ってからSearchオペレーションを実行しなければならない。</p>
<p>ユーザは、クエリの精度とクエリの待ち時間をトレードオフする必要があります。ユーザが高い一貫性を要求し、クエリのレイテンシに敏感でない場合、GuaranteeTsを可能な限り大きな値に設定することができます。ユーザが検索結果を迅速に受信することを望み、クエリの精度に寛容である場合、GuaranteeTsを小さな値に設定することができます。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/consistency-level-illustrated.png" alt="Consistency Level Illustrated" class="doc-image" id="consistency-level-illustrated" />
   </span> <span class="img-wrapper"> <span>整合性レベル図解</span> </span></p>
<p>Milvusでは、異なるGuaranteeTsを持つ4種類の一貫性レベルを提供している。</p>
<ul>
<li><p><strong>強い</strong></p>
<p>最新のタイムスタンプがGuaranteeTsとして使用され、QueryNodeはServiceTimeがGuaranteeTsを満たすまで待ってからSearchリクエストを実行しなければならない。</p></li>
<li><p><strong>Eventual</strong></p>
<p>QueryNodeがすべてのバッチデータに対して即座にSearchリクエストを実行できるように一貫性チェックを避けるため、GuaranteeTsは1など極端に小さい値に設定される。</p></li>
<li><p><strong>制約付き冗長性（Bounded Staleness</strong></p>
<p>GuranteeTs を最新のタイムスタンプよりも早い時点に設定することで、QueryNode が一定のデータ損失を許容しながら検索を実行できるようにする。</p></li>
<li><p><strong>セッション</strong></p>
<p>QueryNodesがクライアントによって挿入された全てのデータに対して検索を実行できるように、クライアントがデータを挿入した最新のタイムポイントがGuaranteeTsとして使用される。</p></li>
</ul>
<p>milvusはデフォルトの一貫性レベルとしてBounded Stalenessを使用します。GuaranteeTs が指定されていない場合、最新の ServiceTime が GuaranteeTs として使用されます。</p>
<h2 id="Set-Consistency-Level" class="common-anchor-header">一貫性レベルの設定<button data-href="#Set-Consistency-Level" class="anchor-icon" translate="no">
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
    </button></h2><p>検索やクエリを実行するときだけでなく、コレクションを作成するときにも異なる一貫性レベルを設定できます。</p>
<h3 id="Set-Consistency-Level-upon-Creating-Collection" class="common-anchor-header">コレクション作成時の一貫性レベルの設定</h3><p>コレクションの作成時に、コレクション内の検索とクエリの一貫性レベルを設定できます。以下のコード例では、一貫性レベルを<strong>Strong</strong> に設定しています。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
<span class="highlighted-wrapper-line">    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">createCollectionReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .collectionSchema(schema)
<span class="highlighted-wrapper-line">        .consistencyLevel(ConsistencyLevel.STRONG)</span>
        .build();
client.createCollection(createCollectionReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;my_collection&quot;</span>, schema).
        WithConsistencyLevel(entity.ClStrong))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
        &quot;autoId&quot;: true,
        &quot;enabledDynamicField&quot;: false,
        &quot;fields&quot;: [
            {
                &quot;fieldName&quot;: &quot;id&quot;,
                &quot;dataType&quot;: &quot;Int64&quot;,
                &quot;isPrimary&quot;: true
            },
            {
                &quot;fieldName&quot;: &quot;vector&quot;,
                &quot;dataType&quot;: &quot;FloatVector&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;dim&quot;: &quot;5&quot;
                }
            },
            {
                &quot;fieldName&quot;: &quot;my_varchar&quot;,
                &quot;dataType&quot;: &quot;VarChar&quot;,
                &quot;isClusteringKey&quot;: true,
                &quot;elementTypeParams&quot;: {
                    &quot;max_length&quot;: 512
                }
            }
        ]
    }&#x27;</span>

<span class="hljs-built_in">export</span> params=<span class="hljs-string">&#x27;{
    &quot;consistencyLevel&quot;: &quot;Strong&quot;
}&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;params\&quot;: <span class="hljs-variable">$params</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">consistency_level</code> パラメータに指定できる値は、<code translate="no">Strong</code> 、<code translate="no">Bounded</code> 、<code translate="no">Eventually</code> 、および<code translate="no">Session</code> です。</p>
<h3 id="Set-Consistency-Level-in-Search" class="common-anchor-header">検索での一貫性レベルの設定</h3><p>特定の検索の一貫性レベルはいつでも変更できる。以下のコード例では、一貫性レベルを「<strong>Bounded</strong>」に戻しています。この変更は現在の検索リクエストにのみ適用される。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[query_vector],
    limit=<span class="hljs-number">3</span>,
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>}，
<span class="highlighted-comment-line">    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>,</span>
<span class="highlighted-wrapper-line">)</span>
<span class="highlighted-comment-line"></span><button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(Collections.singletonList(queryVector))
        .topK(<span class="hljs-number">3</span>)
        .searchParams(params)
        .consistencyLevel(ConsistencyLevel.BOUNDED)
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">3</span>,               <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.FloatVector(queryVector)},
).WithConsistencyLevel(entity.ClBounded).
    WithANNSField(<span class="hljs-string">&quot;vector&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;data&quot;: [
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]
    ],
    &quot;limit&quot;: 3,
    &quot;consistencyLevel&quot;: &quot;Bounded&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>このパラメータは、ハイブリッド検索と検索イテレータでも使用できます。<code translate="no">consistency_level</code> パラメータに指定できる値は<code translate="no">Strong</code>,<code translate="no">Bounded</code>,<code translate="no">Eventually</code>,<code translate="no">Session</code> です。</p>
<h3 id="Set-Consistency-Level-in-Query" class="common-anchor-header">クエリーの一貫性レベルの設定</h3><p>特定の検索の一貫性レベルはいつでも変更できます。以下のコード例では、一貫性レベルを<strong>Eventuallyに</strong>設定しています。この設定は、現在のクエリ・リクエストにのみ適用される。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;color like \&quot;red%\&quot;&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>],
    limit=<span class="hljs-number">3</span>，
<span class="highlighted-comment-line">    consistency_level=<span class="hljs-string">&quot;Eventually&quot;</span>,</span>
<span class="highlighted-wrapper-line">)</span>
<span class="highlighted-comment-line"></span><button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">QueryReq</span> <span class="hljs-variable">queryReq</span> <span class="hljs-operator">=</span> QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .filter(<span class="hljs-string">&quot;color like \&quot;red%\&quot;&quot;</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>))
        .limit(<span class="hljs-number">3</span>)
        .consistencyLevel(ConsistencyLevel.EVENTUALLY)
        .build();
        
 <span class="hljs-type">QueryResp</span> <span class="hljs-variable">getResp</span> <span class="hljs-operator">=</span> client.query(queryReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">resultSet, err := client.Query(ctx, milvusclient.NewQueryOption(<span class="hljs-string">&quot;my_collection&quot;</span>).
    WithFilter(<span class="hljs-string">&quot;color like \&quot;red%\&quot;&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>).
    WithLimit(<span class="hljs-number">3</span>).
    WithConsistencyLevel(entity.ClEventually))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;filter&quot;: &quot;color like \&quot;red_%\&quot;&quot;,
    &quot;consistencyLevel&quot;: &quot;Bounded&quot;,
    &quot;limit&quot;: 3
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>このパラメータは、クエリ・イテレータでも使用できます。<code translate="no">consistency_level</code> パラメータに指定できる値は、<code translate="no">Strong</code> 、<code translate="no">Bounded</code> 、<code translate="no">Eventually</code> 、および<code translate="no">Session</code> です。</p>
