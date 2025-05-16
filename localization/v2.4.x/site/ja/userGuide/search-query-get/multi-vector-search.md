---
id: multi-vector-search.md
order: 2
summary: このガイドでは、Milvusでハイブリッド検索を実行し、結果の再順位を理解する方法を示します。
title: ハイブリッド検索
---
<h1 id="Hybrid-Search" class="common-anchor-header">ハイブリッド検索<button data-href="#Hybrid-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus2.4からマルチベクターサポートとハイブリッド検索フレームワークが導入された。異なる列のこれらのベクトルは、異なる埋め込みモデルに由来する、または異なる処理方法を経た、データの多様な側面を表しています。ハイブリッド検索の結果は、RRF（Reciprocal Rank Fusion）やWeighted Scoringなどのリランキング戦略を使って統合されます。再ランク付け戦略の詳細については、<a href="/docs/ja/v2.4.x/reranking.md">再ランク付けを</a>参照してください。</p>
<p>この機能は、写真、音声、指紋などの様々な属性に基づいて、ベクトル・ライブラリ内で最も類似した人物を特定するような、包括的な検索シナリオで特に役立ちます。</p>
<p>このチュートリアルでは、以下の方法を学びます：</p>
<ul>
<li><p>異なるベクトルフィールドの類似検索用に複数の<code translate="no">AnnSearchRequest</code> インスタンスを作成する；</p></li>
<li><p>複数の<code translate="no">AnnSearchRequest</code> インスタンスからの検索結果を結合し、再ランク付けするための再ランク付け戦略の設定；</p></li>
<li><p>ハイブリッド検索を実行する <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/hybrid_search.md"><code translate="no">hybrid_search()</code></a>メソッドを使用してハイブリッド検索を実行する。</p></li>
</ul>
<div class="alert note">
<p>このページのコードスニペットは<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Connections/connect.md">PyMilvus ORMモジュールを使って</a>Milvusとやりとりします。新しい<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">MilvusClient SDKを</a>使ったコードスニペットは近日公開予定です。</p>
</div>
<h2 id="Preparations" class="common-anchor-header">準備<button data-href="#Preparations" class="anchor-icon" translate="no">
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
    </button></h2><p>ハイブリッド検索を開始する前に、複数のベクトルフィールドを持つコレクションを持っていることを確認してください。現在、Milvusではコレクションあたりデフォルトで4つのベクターフィールドを導入していますが、<a href="https://milvus.io/docs/configure_proxy.md#proxymaxVectorFieldNum">proxy.maxVectorFieldNumの</a>設定を変更することで最大10まで拡張することができます。</p>
<p>以下は、<code translate="no">filmVector</code> と<code translate="no">posterVector</code> の2つのベクトルフィールドを持つ<code translate="no">test_collection</code> という名前のコレクションを作成し、ランダムエンティティを挿入する例です。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> connections, Collection, FieldSchema, CollectionSchema, DataType
<span class="hljs-keyword">import</span> random

<span class="hljs-comment"># Connect to Milvus</span>
connections.connect(
    host=<span class="hljs-string">&quot;127.0.0.1&quot;</span>, <span class="hljs-comment"># Replace with your Milvus server IP</span>
    port=<span class="hljs-string">&quot;19530&quot;</span>
)

<span class="hljs-comment"># Create schema</span>
fields = [
    FieldSchema(name=<span class="hljs-string">&quot;film_id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>),
    FieldSchema(name=<span class="hljs-string">&quot;filmVector&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>), <span class="hljs-comment"># Vector field for film vectors</span>
    FieldSchema(name=<span class="hljs-string">&quot;posterVector&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)] <span class="hljs-comment"># Vector field for poster vectors</span>

schema = CollectionSchema(fields=fields,enable_dynamic_field=<span class="hljs-literal">False</span>)

<span class="hljs-comment"># Create collection</span>
collection = Collection(name=<span class="hljs-string">&quot;test_collection&quot;</span>, schema=schema)

<span class="hljs-comment"># Create index for each vector field</span>
index_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;IVF_FLAT&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">128</span>},
}

collection.create_index(<span class="hljs-string">&quot;filmVector&quot;</span>, index_params)
collection.create_index(<span class="hljs-string">&quot;posterVector&quot;</span>, index_params)

<span class="hljs-comment"># Generate random entities to insert</span>
entities = []

<span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">1000</span>):
    <span class="hljs-comment"># generate random values for each field in the schema</span>
    film_id = random.randint(<span class="hljs-number">1</span>, <span class="hljs-number">1000</span>)
    film_vector = [ random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">5</span>) ]
    poster_vector = [ random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">5</span>) ]

    <span class="hljs-comment"># create a dictionary for each entity</span>
    entity = {
        <span class="hljs-string">&quot;film_id&quot;</span>: film_id,
        <span class="hljs-string">&quot;filmVector&quot;</span>: film_vector,
        <span class="hljs-string">&quot;posterVector&quot;</span>: poster_vector
    }

    <span class="hljs-comment"># add the entity to the list</span>
    entities.append(entity)
    
collection.insert(entities)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-1-Create-Multiple-AnnSearchRequest-Instances" class="common-anchor-header">ステップ 1: 複数の AnnSearchRequest インスタンスの作成<button data-href="#Step-1-Create-Multiple-AnnSearchRequest-Instances" class="anchor-icon" translate="no">
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
    </button></h2><p>ハイブリッド検索では、<code translate="no">hybrid_search()</code> API を使用して、1 回の呼び出しで複数の ANN 検索要求を実行する。各<code translate="no">AnnSearchRequest</code> は、特定のベクトル・フィールドに対する単一の検索要求を表す。</p>
<p>以下の例では、<code translate="no">AnnSearchRequest</code> インスタンスを 2 つ作成し、2 つのベクトルフィールドに対して個別の類似性検索を実行します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest

<span class="hljs-comment"># Create ANN search request 1 for filmVector</span>
query_filmVector = [[<span class="hljs-number">0.8896863042430693</span>, <span class="hljs-number">0.370613100114602</span>, <span class="hljs-number">0.23779315077113428</span>, <span class="hljs-number">0.38227915951132996</span>, <span class="hljs-number">0.5997064603128835</span>]]

search_param_1 = {
    <span class="hljs-string">&quot;data&quot;</span>: query_filmVector, <span class="hljs-comment"># Query vector</span>
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;filmVector&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># This parameter value must be identical to the one used in the collection schema</span>
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}
    },
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span> <span class="hljs-comment"># Number of search results to return in this AnnSearchRequest</span>
}
request_1 = AnnSearchRequest(**search_param_1)

<span class="hljs-comment"># Create ANN search request 2 for posterVector</span>
query_posterVector = [[<span class="hljs-number">0.02550758562349764</span>, <span class="hljs-number">0.006085637357292062</span>, <span class="hljs-number">0.5325251250159071</span>, <span class="hljs-number">0.7676432650114147</span>, <span class="hljs-number">0.5521074424751443</span>]]
search_param_2 = {
    <span class="hljs-string">&quot;data&quot;</span>: query_posterVector, <span class="hljs-comment"># Query vector</span>
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;posterVector&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># This parameter value must be identical to the one used in the collection schema</span>
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}
    },
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span> <span class="hljs-comment"># Number of search results to return in this AnnSearchRequest</span>
}
request_2 = AnnSearchRequest(**search_param_2)

<span class="hljs-comment"># Store these two requests as a list in `reqs`</span>
reqs = [request_1, request_2]
<button class="copy-code-btn"></button></code></pre>
<p>パラメータ</p>
<ul>
<li><p><code translate="no">AnnSearchRequest</code> <em>(オブジェクト</em>)</p>
<p>ANN 検索要求を表すクラス。各ハイブリッド検索は、一度に 1 から 1,024<code translate="no">ANNSearchRequest</code> オブジェクトを含むことができます。</p></li>
<li><p><code translate="no">data</code> <em>(list</em>)</p>
<p>単一の<code translate="no">AnnSearchRequest</code> で検索するクエリーベクター。現在、このパラメータは単一のクエリベクタのみを含むリスト、例えば<code translate="no">[[0.5791814851218929, 0.5792985702614121, 0.8480776460143558, 0.16098005945243, 0.2842979317256803]]</code> を受け付ける。 将来、このパラメータは複数のクエリベクタを受け付けるように拡張される予定である。</p></li>
<li><p><code translate="no">anns_field</code> <em>(文字列</em>)</p>
<p>単一の<code translate="no">AnnSearchRequest</code> で使用するベクトルフィールドの名前。</p></li>
<li><p><code translate="no">param</code> <em>(dict</em>)</p>
<p>単一の<code translate="no">AnnSearchRequest</code> に対する検索パラメータの辞書。これらの検索パラメータは、単一ベクトル検索のパラメータと同じです。詳細については、<a href="https://milvus.io/docs/single-vector-search.md#Search-parameters">検索パラメータ</a> を参照してください。</p></li>
<li><p><code translate="no">limit</code> <em>(int</em>)</p>
<p>一つの<code translate="no">ANNSearchRequest</code> に含める検索結果の最大数。</p>
<p>このパラメータは、個々の<code translate="no">ANNSearchRequest</code> 内で返す検索結果の数にのみ影響し、<code translate="no">hybrid_search</code> 呼び出しに対して返す最終結果を決定するものではない。ハイブリッド検索では、最終結果は、複数の<code translate="no">ANNSearchRequest</code> インスタンスからの結果を組み合わせ、再ランク付けすることによって決定される。</p></li>
</ul>
<h2 id="Step-2-Configure-a-Reranking-Strategy" class="common-anchor-header">ステップ2：再ランク付け戦略の設定<button data-href="#Step-2-Configure-a-Reranking-Strategy" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">AnnSearchRequest</code> 。インスタンスを作成したら、結果を結合して再ランク付けするための再ランク付け戦略を設定する。現在、<code translate="no">WeightedRanker</code> と<code translate="no">RRFRanker</code> の2つのオプションがある。再ランク付け戦略の詳細については、<a href="/docs/ja/v2.4.x/reranking.md">再ランク付けを</a>参照のこと。</p>
<ul>
<li><p>重み付きスコアリングを使用する</p>
<p><code translate="no">WeightedRanker</code> を使用して、各ベクトルフィールドの検索結果に指定した重みで重要度を割り当てます。あるベクター・フィールドを他のベクター・フィールドより優先させる場合、<code translate="no">WeightedRanker(value1, value2, ..., valueN)</code> を使用することで、検索結果の組み合わせにこれを反映させることができます。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> WeightedRanker
<span class="hljs-comment"># Use WeightedRanker to combine results with specified weights</span>
<span class="hljs-comment"># Assign weights of 0.8 to text search and 0.2 to image search</span>
rerank = WeightedRanker(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.2</span>)  
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">WeightedRanker</code> を使用する場合は、次の点に注意してください：</p>
<ul>
<li>各重み値は 0（最も重要でない）から 1（最も重要）まであり、最終的な集計スコアに影響します。</li>
<li><code translate="no">WeightedRanker</code> で提供されるウェイト値の総数は、作成した<code translate="no">AnnSearchRequest</code> インスタンスの数と同じでなければなりません。</li>
</ul></li>
<li><p>相互ランク融合（RFF）を使用する</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Alternatively, use RRFRanker for reciprocal rank fusion reranking</span>
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> RRFRanker

rerank = RRFRanker()
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Step-3-Perform-a-Hybrid-Search" class="common-anchor-header">ステップ3：ハイブリッド検索を実行する<button data-href="#Step-3-Perform-a-Hybrid-Search" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">AnnSearchRequest</code> インスタンスとリランキング戦略を設定したら、<code translate="no">hybrid_search()</code> メソッドを使用してハイブリッド検索を実行します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Before conducting hybrid search, load the collection into memory.</span>
collection.load()

res = collection.hybrid_search(
    reqs, <span class="hljs-comment"># List of AnnSearchRequests created in step 1</span>
    rerank, <span class="hljs-comment"># Reranking strategy specified in step 2</span>
    limit=<span class="hljs-number">2</span> <span class="hljs-comment"># Number of final search results to return</span>
)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<p>パラメータ</p>
<ul>
<li><p><code translate="no">reqs</code> <em>(リスト）</em></p>
<p>検索リクエストのリスト。各リクエストは<code translate="no">ANNSearchRequest</code> オブジェクトである。各リクエストは異なるベクトルフィールドと異なる検索パラメータのセットに対応することができる。</p></li>
<li><p><code translate="no">rerank</code> <em>(オブジェクト</em>)</p>
<p>ハイブリッド検索に使用するリランキング戦略。取り得る値：<code translate="no">WeightedRanker(value1, value2, ..., valueN)</code> と<code translate="no">RRFRanker()</code> 。</p>
<p>リランキング戦略の詳細については、<a href="/docs/ja/v2.4.x/reranking.md">リランキングを</a>参照のこと。</p></li>
<li><p><code translate="no">limit</code> <em>(int</em>)</p>
<p>ハイブリッド検索で返す最終結果の最大数。</p></li>
</ul>
<p>出力は以下のようになります：</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;[&#x27;id: 844, distance: 0.006047376897186041, entity: {}&#x27;, &#x27;id: 876, distance: 0.006422005593776703, entity: {}&#x27;]&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
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
<li><p>通常、各コレクションには最大4つのベクトル・フィールドがデフォルトで許容されます。しかし、<code translate="no">proxy.maxVectorFieldNum</code> の設定を調整して、コレクション内のベクターフィールドの最大数を拡張するオプションがあり、コレクションごとに最大10個のベクターフィールドが制限されます。詳細は<a href="https://milvus.io/docs/configure_proxy.md#Proxy-related-Configurations">プロキシ関連の設定を</a>参照。</p></li>
<li><p>コレクション内のベクトルフィールドに部分的にインデックスが付けられたり、ロードされたりすると、エラーになります。</p></li>
<li><p>現在のところ、ハイブリッド検索では、<code translate="no">AnnSearchRequest</code> 、1つのクエリ・ベクターのみを運ぶことができます。</p></li>
</ul>
<h2 id="FAQ" class="common-anchor-header">よくある質問<button data-href="#FAQ" class="anchor-icon" translate="no">
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
<li><p><strong>ハイブリッド検索はどのような場合に推奨されますか？</strong></p>
<p>ハイブリッド検索は、高い精度が要求される複雑な状況、特にエンティティが複数の多様なベクトルで表現できる場合に最適です。これは、文章などの同じデータが異なる埋め込みモデルで処理される場合や、マルチモーダル情報（個人の画像、指紋、声紋など）が様々なベクトル形式に変換される場合に当てはまります。これらのベクトルに重みを割り当てることで、それらの複合的な影響力により、検索結果の再現性を大幅に高め、有効性を向上させることができる。</p></li>
<li><p><strong>重み付きランカーはどのように異なるベクトルフィールド間の距離を正規化するのですか？</strong></p>
<p>重み付きランカーは、各フィールドに割り当てられた重みを使用して、ベクトルフィールド間の距離を正規化します。重みに従って各ベクトルフィールドの重要度を計算し、重みの大きいものを優先します。一貫性を確保するために、ANN検索リクエスト全体で同じメトリックタイプを使用することをお勧めします。この方法により、より重要であると判断されたベクトルが、全体的なランキングにより大きな影響を与えるようになります。</p></li>
<li><p><strong>Cohere Ranker や BGE Ranker のような代替ランカーを使用することはできますか？</strong></p>
<p>現在のところ、提供されているランカーのみがサポートされています。将来のアップデートに向けて、追加のランカーを含める計画が進行中です。</p></li>
<li><p><strong>複数のハイブリッド検索を同時に実行することは可能ですか？</strong></p>
<p>はい、複数のハイブリッド検索操作の同時実行はサポートされています。</p></li>
<li><p><strong>複数のAnnSearchRequestオブジェクトで同じベクトルフィールドを使用してハイブリッド検索を実行できますか？</strong></p>
<p>技術的には、ハイブリッド検索に複数のAnnSearchRequestオブジェクトで同じベクターフィールドを使用することは可能です。ハイブリッド検索のために複数のベクターフィールドを持つ必要はありません。</p></li>
</ul>
