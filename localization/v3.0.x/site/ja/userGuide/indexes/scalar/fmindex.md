---
id: fmindex.md
title: FMINDEX
summary: >-
  FMINDEX インデックスは、VARCHAR フィールド向けのバイト単位の完全部分文字列インデックスです。このインデックスは、アンカー付き LIKE
  クエリ（接頭辞、中接辞、接尾辞の一致）に対して、候補の再確認を行うことなく結果を返すため、長いテキストに対する部分文字列検索に最適です。
---
<h1 id="FMINDEX" class="common-anchor-header">FMINDEX<button data-href="#FMINDEX" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusの<code translate="no">FMINDEX</code> インデックスは、<code translate="no">VARCHAR</code> フィールド向けのバイト単位の完全一致部分文字列インデックスです。このインデックスは、接頭辞、中置、または接尾辞の一致を指定したアンカー付き<code translate="no">LIKE</code> クエリに応答し、候補の再確認を行うことなく完全一致の結果を返します。</p>
<p>次のような部分文字列フィルタを頻繁に実行する場合は、<code translate="no">FMINDEX</code> インデックスを使用してください。</p>
<ul>
<li><p><code translate="no">title LIKE &quot;vector%&quot;</code> (接頭辞)</p></li>
<li><p><code translate="no">title LIKE &quot;%database&quot;</code> (接尾辞)</p></li>
<li><p><code translate="no">title LIKE &quot;%vector database%&quot;</code> (中置 / 部分文字列)</p></li>
</ul>
<p>候補を絞り込んでから再チェックを行う「<code translate="no">NGRAM</code> 」とは異なり、「<code translate="no">FMINDEX</code> 」は、アンカー付きの前置、後置、および中置パターンをインデックスから直接解決できます。</p>
<h2 id="Supported-data-types" class="common-anchor-header">サポートされているデータ型<button data-href="#Supported-data-types" class="anchor-icon" translate="no">
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
<li><code translate="no">VARCHAR</code> フィールド。詳細については、「<a href="/docs/ja/string.md">文字列フィールド</a>」を参照してください。</li>
</ul>
<p><code translate="no">FMINDEX</code> は、<code translate="no">VARCHAR</code> フィールドでのみサポートされています。<code translate="no">JSON</code> フィールドや、<code translate="no">VARCHAR</code> にキャストされた<code translate="no">JSON</code> パスはサポートされていません。</p>
<h2 id="How-it-works" class="common-anchor-header">仕組み<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">FMINDEX</code> これはフルテキスト FM インデックスであり、連結されたフィールド値の Burrows-Wheeler 変換 (BWT) から構築された圧縮構造に、サンプリングされたサフィックス配列およびランククエリ用のウェーブレットツリーが組み合わさったものです。 このレイアウトは<em>逆方向検索</em>をサポートしています。パターンが指定されると、Milvus はそのパターンの最後の文字から最初の文字へと順にたどって、テキストにそのパターンが含まれるエンティティの正確な範囲を見つけ出します。</p>
<p>クエリ実行時、Milvus はこのインデックスを使用して以下の処理を行います。</p>
<ol>
<li><p><code translate="no">LIKE</code> パターンから抽出されたアンカー付きリテラルに対する<strong>一致箇所を特定します</strong>。</p></li>
<li><p>元の値を再確認することなく、接頭辞、接尾辞、および中置リテラルに対する<strong>正確なエンティティIDを返す</strong>。</p></li>
</ol>
<p>複数の非隣接リテラル（一般的な<code translate="no">LIKE</code> ）や複雑な正規表現を含むパターンの場合、<code translate="no">FMINDEX</code> は候補を生成し、Milvusはそれを元の値と照合して検証します。</p>
<h2 id="Create-an-FMINDEX-index" class="common-anchor-header">FMINDEXインデックスの作成<button data-href="#Create-an-FMINDEX-index" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">VARCHAR</code> フィールド上に<code translate="no">FMINDEX</code> インデックスを作成できます。両方のビルドパラメータはオプションです。設定しない場合は、サーバーのデフォルト値が使用されます。</p>
<table>
<thead>
<tr><th>パラメータ</th><th>説明</th><th>許容値</th><th>デフォルト</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">fm_sa_sample_rate</code></td><td>サフィックス配列のサンプリングレート。インデックスのサイズとロケート処理のレイテンシのバランスを調整します。カウントのみのクエリには影響しません。</td><td>4 から 256 までの整数</td><td>8</td></tr>
<tr><td><code translate="no">fm_block_bytes</code></td><td>ランクディレクトリのブロック単位（バイト単位）。ブロックを大きくすると、常駐ディレクトリのサイズが縮小します。</td><td>8、16、32、64、または128</td><td>64</td></tr>
</tbody>
</table>
<p>以下の例は、<code translate="no">VARCHAR</code> フィールドに対して<code translate="no">FMINDEX</code> インデックスを作成する方法を示しています:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Assume you have defined a VARCHAR field named &quot;text&quot; in your collection schema</span>

<span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add FMINDEX index on the &quot;text&quot; field</span>
<span class="highlighted-comment-line">index_params.add_index(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;text&quot;</span>,           <span class="hljs-comment"># Target VARCHAR field</span></span>
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;FMINDEX&quot;</span>,        <span class="hljs-comment"># Index type is FMINDEX</span></span>
<span class="highlighted-comment-line">    index_name=<span class="hljs-string">&quot;fmindex_index&quot;</span>,  <span class="hljs-comment"># Custom name for the index</span></span>
<span class="highlighted-comment-line">    fm_sa_sample_rate=<span class="hljs-number">8</span>,         <span class="hljs-comment"># Optional: suffix-array sampling rate (4-256, default 8)</span></span>
<span class="highlighted-comment-line">    fm_block_bytes=<span class="hljs-number">64</span>            <span class="hljs-comment"># Optional: block granularity in bytes (8/16/32/64/128, default 64)</span></span>
<span class="highlighted-comment-line">)</span>

<span class="hljs-comment"># Create the index on the collection</span>
client.create_index(
    collection_name=<span class="hljs-string">&quot;log_catalog&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

Map&lt;String, Object&gt; params = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
params.put(<span class="hljs-string">&quot;fm_sa_sample_rate&quot;</span>, <span class="hljs-string">&quot;8&quot;</span>);
params.put(<span class="hljs-string">&quot;fm_block_bytes&quot;</span>, <span class="hljs-string">&quot;64&quot;</span>);

client.createIndex(CreateIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;log_catalog&quot;</span>)
        .indexParams(Arrays.asList(
                IndexParam.builder().fieldName(<span class="hljs-string">&quot;text&quot;</span>).indexType(IndexParam.IndexType.FMINDEX)
                        .indexName(<span class="hljs-string">&quot;fmindex_index&quot;</span>)
                        .extraParams(params)
                        .build()))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;log&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
})

<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to connect to milvus server: &quot;</span>, err.Error())
}

idx := index.NewFMIndex().WithSaSampleRate(<span class="hljs-number">8</span>).WithBlockBytes(<span class="hljs-number">64</span>)

_, err = cli.CreateIndex(ctx, milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;log_catalog&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>, idx).WithIndexName(<span class="hljs-string">&quot;fmindex_index&quot;</span>))

<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to create index: &quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(milvus::<span class="hljs-built_in">ConnectParam</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>));

<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

<span class="hljs-function">milvus::IndexDesc <span class="hljs-title">fmindex_index</span><span class="hljs-params">(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;fmindex_index&quot;</span>, milvus::IndexType::FMINDEX)</span></span>;
fmindex_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;fm_sa_sample_rate&quot;</span>, <span class="hljs-string">&quot;8&quot;</span>);
fmindex_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;fm_block_bytes&quot;</span>, <span class="hljs-string">&quot;64&quot;</span>);

status = client-&gt;<span class="hljs-built_in">CreateIndex</span>(milvus::<span class="hljs-built_in">CreateIndexRequest</span>().<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;log_catalog&quot;</span>)
        .<span class="hljs-built_in">AddIndex</span>(fmindex_index));

<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;log_catalog&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;text&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;FMINDEX&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;fmindex_index&quot;</span>,
    <span class="hljs-attr">params</span>: { <span class="hljs-attr">fm_sa_sample_rate</span>: <span class="hljs-number">8</span>, <span class="hljs-attr">fm_block_bytes</span>: <span class="hljs-number">64</span> },
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/indexes/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;log_catalog&quot;,
    &quot;indexParams&quot;: [
        {
            &quot;fieldName&quot;: &quot;text&quot;,
            &quot;indexName&quot;: &quot;fmindex_index&quot;,
            &quot;params&quot;: {
                &quot;index_type&quot;: &quot;FMINDEX&quot;,
                &quot;fm_sa_sample_rate&quot;: 8,
                &quot;fm_block_bytes&quot;: 64
            }
        }
    ]
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {}</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Queries-accelerated-by-FMINDEX" class="common-anchor-header">FMINDEXによって高速化されるクエリ<button data-href="#Queries-accelerated-by-FMINDEX" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">FMINDEX</code> は、<code translate="no">VARCHAR</code> フィールドに対する以下のフィルタパターンを高速化します。アンカー付きの前置、後置、および中置リテラルはインデックスから正確に解決されます。一般的な<code translate="no">LIKE</code> および正規表現パターンは候補を生成し、Milvusはそれらを元の値と照合して検証します。</p>
<ul>
<li><p><strong>プレフィックスマッチ</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;vector%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>接尾辞一致</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%database&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>インフィックス／部分文字列一致</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%vector database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>一般的なLIKE（候補）</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;a%b_c&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>正規表現 (候補)</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text =~ &quot;error.*timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>フィルタ式の構文に関する詳細については、「<a href="/docs/ja/pattern-matching.md">パターンマッチング</a>」を参照してください。</p>
<h2 id="Drop-an-index" class="common-anchor-header">インデックスの削除<button data-href="#Drop-an-index" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">drop_index()</code> メソッドを使用して、コレクションから既存のインデックスを削除します。</p>
<div class="alert note">
<ul>
<li><p><strong>v2.6.3</strong>以前では、スカラーインデックスを削除する前にコレクションを解放する必要があります。</p></li>
<li><p><strong>v2.6.4以降</strong>では、スカラーインデックスが不要になった時点で、コレクションを解放することなく直接削除できます。</p></li>
</ul>
</div>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">client.drop_index(
    collection_name=<span class="hljs-string">&quot;log_catalog&quot;</span>,   <span class="hljs-comment"># Name of the collection</span>
    index_name=<span class="hljs-string">&quot;fmindex_index&quot;</span>       <span class="hljs-comment"># Name of the index to drop</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.DropIndexReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

client.dropIndex(DropIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;log_catalog&quot;</span>)
        .indexName(<span class="hljs-string">&quot;fmindex_index&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;log&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
})

<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to connect to milvus server: &quot;</span>, err.Error())
}

err = cli.DropIndex(ctx, milvusclient.NewDropIndexOption(<span class="hljs-string">&quot;log_catalog&quot;</span>, <span class="hljs-string">&quot;fmindex_index&quot;</span>))

<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to drop index: &quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(milvus::<span class="hljs-built_in">ConnectParam</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>));

<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

status = client-&gt;<span class="hljs-built_in">DropIndex</span>(milvus::<span class="hljs-built_in">DropIndexRequest</span>()
        .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;log_catalog&quot;</span>)
        .<span class="hljs-built_in">WithIndexName</span>(<span class="hljs-string">&quot;fmindex_index&quot;</span>));

<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;log_catalog&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;fmindex_index&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/indexes/drop&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;log_catalog&quot;,
    &quot;indexName&quot;: &quot;fmindex_index&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {}</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Usage-notes" class="common-anchor-header">使用上の注意<button data-href="#Usage-notes" class="anchor-icon" translate="no">
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
<li><p><strong>フィールド型：</strong> <code translate="no">VARCHAR</code> フィールドでのみ動作します。データ型に関する詳細については、「<a href="/docs/ja/string.md">文字列フィールド</a>」を参照してください。</p></li>
<li><p><strong>バージョンの互換性：</strong> <code translate="no">FMINDEX</code> には、スカラーインデックスエンジンバージョン5以降が必要です。</p></li>
<li><p><strong>SDKの対応状況：</strong>Rust v2 SDKには、現時点では<code translate="no">FMINDEX</code> インデックス型が含まれていません。</p></li>
<li><p><strong>完全一致：</strong>アンカー付きの前置、後置、および中置の<code translate="no">LIKE</code> リテラルは、候補の再確認を行わずに完全一致を返します。</p></li>
<li><p><strong>候補：</strong>一般的な<code translate="no">LIKE</code> および正規表現パターンでは、Milvusが元の値に対して検証を行う候補が生成される場合があります。パターンによるフィルタリング効果が乏しい場合や、解決に過度なコストがかかる場合、Milvusは代わりにフィールドをスキャンすることがあります。</p></li>
<li><p><strong>不変性：</strong> <code translate="no">fm_sa_sample_rate</code> および<code translate="no">fm_block_bytes</code> はその場で変更できません。これらを調整するには、インデックスを再構築してください。</p></li>
</ul>
<h2 id="Best-practices" class="common-anchor-header">ベストプラクティス<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
<li><p>長い `<code translate="no">VARCHAR</code> ` フィールドに対する完全な部分文字列検索には、`<code translate="no">FMINDEX</code> ` を使用してください。特に、`<code translate="no">NGRAM</code> ` による候補の再検証にコストがかかる場合はそうです。</p></li>
<li><p>ほとんどのワークロードでは、<code translate="no">fm_block_bytes</code> をデフォルト値の 64 に維持してください。メモリが逼迫している場合は、この値を上げて常駐ディレクトリを縮小してください。</p></li>
<li><p><code translate="no">fm_sa_sample_rate</code> を小さくすると、インデックスサイズが大きくなる代わりに locate のレイテンシが改善されます。クエリが主にカウントのみの場合、この値を大きくしてインデックスサイズを縮小してください。</p></li>
</ul>
