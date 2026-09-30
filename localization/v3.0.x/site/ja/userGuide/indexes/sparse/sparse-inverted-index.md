---
id: sparse-inverted-index.md
title: SPARSE_INVERTED_INDEX
summary: >-
  SPARSE_INVERTED_INDEX インデックスは、Milvus
  が疎ベクトルを効率的に格納・検索するために使用するインデックスタイプです。このインデックスタイプは、逆インデックスの原理を活用して、疎データ向けの非常に効率的な検索構造を構築します。
---
<h1 id="SPARSEINVERTEDINDEX" class="common-anchor-header">SPARSE_INVERTED_INDEX<button data-href="#SPARSEINVERTEDINDEX" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">SPARSE_INVERTED_INDEX</code> インデックスは、Milvusが疎ベクトルを効率的に格納および検索するために使用するインデックスタイプです。このインデックスは、疎ベクトルの非ゼロ次元から逆引き構造を構築します。このインデックスは、BM25フルテキスト検索や、内積に基づく疎埋め込み検索に使用できます。</p>
<p>スパースベクトルフィールド、メトリックタイプ、および全文検索の詳細については、「<a href="/docs/ja/sparse_vector.md">スパースベクトル</a>」、「<a href="/docs/ja/metric.md">メトリックタイプ</a>」、「<a href="/docs/ja/full-text-search.md">全文検索</a>」を参照してください。</p>
<h2 id="Build-index" class="common-anchor-header">インデックスの構築<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusでスパースベクトルフィールド上に<code translate="no">SPARSE_INVERTED_INDEX</code> インデックスを構築するには、<code translate="no">add_index()</code> メソッドを使用し、<code translate="no">index_type</code> 、<code translate="no">metric_type</code> 、およびindexパラメータを指定します。</p>
<p>BM25全文検索の場合は、BM25関数によって生成されたスパースベクトルフィールドに対してインデックスを構築します。<code translate="no">metric_type</code> を<code translate="no">BM25</code> に設定します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Prepare index building params</span>
index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;sparse&quot;</span>, <span class="hljs-comment"># Name of the sparse vector field to index</span>
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;sparse_bm25_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>, <span class="hljs-comment"># Metric type used for full text search</span>
    params={<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>},
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<p>スパース埋め込み検索の場合は、外部で生成されたスパースベクトルを格納するスパースベクトルフィールドに対してインデックスを構築します。<code translate="no">metric_type</code> を<code translate="no">IP</code> に設定します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare index building params</span>
index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>, <span class="hljs-comment"># Name of the sparse vector field to index</span>
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;sparse_ip_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;SINDI&quot;</span>},
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<p>上記の設定において：</p>
<ul>
<li><p><code translate="no">index_type</code>: 構築するインデックスのタイプ。この値を `<code translate="no">SPARSE_INVERTED_INDEX</code>` に設定します。</p></li>
<li><p><code translate="no">metric_type</code>: スパースベクトル間の類似度を計算するために使用されるメトリック。有効な値：</p>
<ul>
<li><p><code translate="no">BM25</code>: 全文検索にBM25関連性スコアリングを使用します。</p></li>
<li><p><code translate="no">IP</code> (内積): 内積を用いて疎ベクトルの類似度を測定します。</p></li>
</ul>
<p>詳細については、「<a href="/docs/ja/metric.md">メトリックタイプ</a>」および「<a href="/docs/ja/full-text-search.md">全文検索</a>」を参照してください。</p></li>
<li><p><code translate="no">params.inverted_index_algo</code>: インデックスの構築およびクエリ処理に使用されるアルゴリズム。有効な値:</p>
<ul>
<li><p><code translate="no">&quot;DAAT_MAXSCORE&quot;</code>: Document-at-a-Time MaxScore クエリ処理。これは `<code translate="no">BM25</code>` のデフォルト設定です。背景については、「<a href="https://dl.acm.org/doi/10.1016/0306-4573%2895%2900020-H">クエリ評価：戦略と最適化</a>」を参照してください。</p></li>
<li><p><code translate="no">&quot;DAAT_WAND&quot;</code>: Document-at-a-Time WAND クエリ処理。このアルゴリズムは、topK 値が小さい場合やクエリが短い場合に適しています。背景については、「<a href="https://dl.acm.org/doi/10.1145/956863.956944">2 段階検索プロセスによる効率的なクエリ評価</a>」を参照してください。</p></li>
<li><p><code translate="no">&quot;TAAT_NAIVE&quot;</code>: 基本的な「Term-at-a-Time」クエリ処理。このオプションは、ベースラインとして、または平均ドキュメント長などのコレクション全体の統計情報に合わせてスコアリングを動的に調整する必要がある場合に使用します。</p></li>
<li><p><code translate="no">&quot;BLOCK_MAX_MAXSCORE&quot;</code>: ブロックレベルの最大スコア・メタデータを用いた MaxScore クエリ処理。背景については、「<a href="https://dl.acm.org/doi/10.1145/2009916.2010048">Block-Max インデックスを用いた高速な Top-k ドキュメント検索</a>」を参照してください。</p></li>
<li><p><code translate="no">&quot;BLOCK_MAX_WAND&quot;</code>: ブロックレベルの最大スコア・メタデータを用いた WAND クエリ処理。背景については、「<a href="https://dl.acm.org/doi/10.1145/2009916.2010048">Block-Max インデックスを用いた高速な Top-k ドキュメント検索</a>」を参照してください。</p></li>
<li><p><code translate="no">&quot;SINDI&quot;</code>: 固定のドキュメントIDウィンドウに基づくスパース逆引きインデックスで、検索にSIMDアクセラレーションを採用しています。これは<code translate="no">IP</code> のデフォルト設定です。詳細については、<a href="https://arxiv.org/abs/2509.08395">SINDIの論文</a>を参照してください。</p></li>
</ul>
<p><code translate="no">inverted_index_algo</code> を指定しない場合、Milvusは<code translate="no">metric_type</code> に基づいてデフォルトのアルゴリズムを選択します：<code translate="no">BM25</code> の場合は<code translate="no">DAAT_MAXSCORE</code> 、<code translate="no">IP</code> の場合は<code translate="no">SINDI</code> です。</p>
<p><code translate="no">SPARSE_INVERTED_INDEX</code> インデックスで使用可能な構築パラメータの詳細については、「<a href="/docs/ja/sparse-inverted-index.md#Index-building-params">インデックス構築パラメータ</a>」を参照してください。</p></li>
</ul>
<p>インデックスパラメータの設定が完了したら、<code translate="no">create_index()</code> メソッドを直接使用するか、<code translate="no">create_collection</code> メソッドにインデックスパラメータを渡すことで、インデックスを作成できます。詳細については、「<a href="/docs/ja/create-collection.md">コレクションの作成</a>」を参照してください。</p>
<h2 id="Search-on-index" class="common-anchor-header">インデックスでの検索<button data-href="#Search-on-index" class="anchor-icon" translate="no">
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
    </button></h2><p>インデックスの構築とエンティティの挿入が完了すると、そのインデックスに対して類似度検索を実行できます。</p>
<p>BM25 フルテキスト検索の場合は、クエリとして生のテキストを使用します。Milvus は、BM25 関数を通じてクエリテキストをスパースベクトルに変換します。</p>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    data=[<span class="hljs-string">&quot;what is information retrieval?&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>],
    limit=<span class="hljs-number">3</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>スパース埋め込み検索の場合は、クエリベクトルとしてスパースベクトル辞書を使用します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare the query vector</span>
query_vector = [{<span class="hljs-number">1</span>: <span class="hljs-number">0.2</span>, <span class="hljs-number">50</span>: <span class="hljs-number">0.4</span>, <span class="hljs-number">1000</span>: <span class="hljs-number">0.7</span>}]

res = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    data=query_vector,
    limit=<span class="hljs-number">3</span>,
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>},
)
<button class="copy-code-btn"></button></code></pre>
<p>デフォルトでは、Milvus はそのインデックスに設定された検索アルゴリズムを使用します。</p>
<p><code translate="no">SPARSE_INVERTED_INDEX</code> インデックスで使用可能な検索パラメータの詳細については、「<a href="/docs/ja/sparse-inverted-index.md#Index-specific-search-params">インデックス固有の検索パラメータ</a>」を参照してください。</p>
<h2 id="Index-params" class="common-anchor-header">インデックスパラメータ<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>このセクションでは、インデックスの構築およびインデックスでの検索に使用されるパラメータの概要を説明します。</p>
<h3 id="Index-building-params" class="common-anchor-header">インデックス構築パラメータ<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>次の表は、<code translate="no">params</code> で<a href="/docs/ja/sparse-inverted-index.md#Build-index">インデックスを構築する</a>際に設定できるパラメータの一覧です。</p>
<table>
   <tr>
     <th><p>パラメータ</p></th>
     <th><p>説明</p></th>
     <th><p>値の範囲</p></th>
     <th><p>チューニングの推奨事項</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">inverted_index_algo</code></p></td>
     <td><p>インデックスの構築およびクエリ実行に使用されるアルゴリズム。インデックスがクエリをどのように処理するかを決定します。</p></td>
     <td><p><code translate="no">"DAAT_MAXSCORE"</code>,<code translate="no">"DAAT_WAND"</code>,<code translate="no">"TAAT_NAIVE"</code>,<code translate="no">"BLOCK_MAX_MAXSCORE"</code>,<code translate="no">"BLOCK_MAX_WAND"</code>,<code translate="no">"SINDI"</code></p><p>デフォルト値：<code translate="no">BM25</code> では<code translate="no">"DAAT_MAXSCORE"</code> 、<code translate="no">IP</code> では<code translate="no">"SINDI"</code> 。</p></td>
     <td><p>k値が高いBM25フルテキスト検索ワークロードや、検索語句が多いクエリには、<code translate="no">"DAAT_MAXSCORE"</code> を使用してください。</p><p>k 値が小さい BM25 ワークロードや、クエリが短い場合は、<code translate="no">"DAAT_WAND"</code> を使用してください。</p><p><code translate="no">"TAAT_NAIVE"</code> は、ベースラインとして、または平均ドキュメント長などのコレクション全体の統計情報に合わせてスコアを動的に調整する必要がある場合に使用します。</p><p>クエリのプルーニングにブロックレベルの最大スコアメタデータを使用する場合は、<code translate="no">"BLOCK_MAX_MAXSCORE"</code> または<code translate="no">"BLOCK_MAX_WAND"</code> を使用してください。</p><p>`<code translate="no">IP</code>` を使用したスパース埋め込み検索には、`<code translate="no">"SINDI"</code> ` を使用します。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">bm25_k1</code></p></td>
     <td><p>BM25 スコアリングにおける用語頻度の飽和度を制御します。このパラメータは、<code translate="no">metric_type</code> が<code translate="no">BM25</code> の場合にのみ適用されます。</p></td>
     <td><p>推奨範囲：[1.2, 2.0]</p><p>デフォルト値：1.2</p></td>
     <td><p>この値を大きくすると、文書ランキングにおいて用語頻度に重みが増します。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">bm25_b</code></p></td>
     <td><p>BM25 スコアリングにおける文書長の正規化の強度を制御します。このパラメータは、<code translate="no">metric_type</code> が<code translate="no">BM25</code> の場合にのみ適用されます。</p></td>
     <td><p>範囲：[0, 1]</p><p>デフォルト値：0.75</p></td>
     <td><p>より強い長さの正規化を適用するには、より大きな値を使用します。ランキングに対する文書長の影響を軽減するには、より小さな値を使用します。</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">インデックス固有の検索パラメータ<button data-href="#Index-specific-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>次の表は、<a href="/docs/ja/sparse-inverted-index.md#Search-on-index">インデックスでの検索時に</a> <code translate="no">search_params.params</code> で設定できるパラメータの一覧です。</p>
<table>
   <tr>
     <th><p>パラメータ</p></th>
     <th><p>説明</p></th>
     <th><p>値の範囲</p></th>
     <th><p>チューニングの推奨事項</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">drop_ratio_search</code></p></td>
     <td><p>検索時に無視する最小値の割合。ノイズの低減に役立ちます。</p></td>
     <td><p>範囲: [0.0, 1.0) （例: 0.2 に設定すると、値の最小の 20% が無視されます）</p></td>
     <td><p>クエリベクトルの疎度とノイズレベルに基づいて、このパラメータを調整してください。</p><p>このパラメータは、検索中に除外される絶対値の小さい値の割合を制御します。この値を大きくする（例：<code translate="no">0.2</code> ）と、ノイズを低減し、より重要な成分に検索を絞り込むことができるため、精度と効率が向上する可能性があります。ただし、より多くの値を除外すると、関連性のある可能性のある信号が除外され、リコール率が低下する恐れもあります。ワークロードに応じて、リコール率と精度のバランスが取れた値を選択してください。</p></td>
   </tr>
</table>
