---
id: sparse_vector.md
summary: Milvusでスパースベクトルを使用する方法を学びます。
title: スパース・ベクトル
---
<h1 id="Sparse-Vector" class="common-anchor-header">スパース・ベクトル<button data-href="#Sparse-Vector" class="anchor-icon" translate="no">
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
    </button></h1><p>スパース・ベクトルは、ほとんどの要素がゼロで、特定の単語の存在を示す非ゼロの要素が1つだけあるベクトル埋め込みを用いて、単語やフレーズを表現する。<a href="https://arxiv.org/abs/2109.10086">SPLADEv2の</a>ようなスパース・ベクトル・モデルは、領域外の知識検索、キーワード認識、解釈可能性において、密なモデルを凌駕する。スパースベクトルは情報検索、自然言語処理、推薦システムにおいて特に有用であり、想起のためのスパースベクトルとランキングのためのラージモデルを組み合わせることで、検索結果を大幅に改善することができる。</p>
<p>Milvusでは、スパースベクトルの使用はデンスベクトルと同様のワークフローに従う。スパースベクトル列を持つコレクションを作成し、データを挿入し、インデックスを作成し、類似検索とスカラークエリーを実行します。</p>
<p>このチュートリアルでは、以下の方法を学びます：</p>
<ul>
<li>疎なベクトルの埋め込みを準備する；</li>
<li>疎なベクトル・フィールドを持つコレクションを作成する；</li>
<li>疎なベクトル埋め込みを持つエンティティの挿入；</li>
<li>コレクションのインデックスを作成し、スパース・ベクトルで ANN 検索を実行する。</li>
</ul>
<p>スパースベクトルの動きを見るには、<a href="https://github.com/milvus-io/pymilvus/blob/master/examples/milvus_client/sparse.py">hello_sparse.pyを</a>参照してください。</p>
<div class="admonition note">
    <p><b>注釈</b></p>
        現在、スパースベクトルのサポートは2.4.0のベータ機能で、3.0.0で一般的に利用可能になる予定です。</div>
<h2 id="Prepare-sparse-vector-embeddings" class="common-anchor-header">スパースベクトルの埋め込みを準備する<button data-href="#Prepare-sparse-vector-embeddings" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusでスパースベクトルを使用するには、サポートされているいずれかのフォーマットでベクトルの埋め込みを準備します：</p>
<ul>
<li><p><strong>スパース行列</strong>：スパース行列:<a href="https://docs.scipy.org/doc/scipy/reference/sparse.html#module-scipy.sparse">scipy.sparse</a>クラスファミリーを利用してスパース埋め込みを表現します。この方法は大規模な高次元データを扱うのに効率的です。</p></li>
<li><p><strong>辞書のリスト</strong>：各スパース埋め込みを辞書として表現します。<code translate="no">{dimension_index: value, ...}</code> のような構造で，各キーと値のペアは次元インデックスとそれに対応する値を表します。</p>
<p>例</p>
<pre><code translate="no" class="language-python">{2: 0.33, 98: 0.72, ...}
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>タプルのイテーブルのリスト</strong>．辞書のリストと似ていますが、タプルの反復可能テーブル<code translate="no">[(dimension_index, value)]</code> を使用して、ゼロでない次元とその値のみを指定します。</p>
<p>例</p>
<pre><code translate="no" class="language-python">[(2, 0.33), (98, 0.72), ...]
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>以下の例では、10,000 個のエンティティ（それぞれ 10,000 次元、スパース密度 0.005）について、ランダムなスパース行列を生成して、スパース埋め込みを準備します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare entities with sparse vector representation</span>
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np
<span class="hljs-keyword">import</span> random

rng = np.random.default_rng()

num_entities, dim = <span class="hljs-number">10000</span>, <span class="hljs-number">10000</span>

<span class="hljs-comment"># Generate random sparse rows with an average of 25 non-zero elements per row</span>
entities = [
    {
        <span class="hljs-string">&quot;scalar_field&quot;</span>: rng.random(),
        <span class="hljs-comment"># To represent a single sparse vector row, you can use:</span>
        <span class="hljs-comment"># - Any of the scipy.sparse sparse matrices class family with shape[0] == 1</span>
        <span class="hljs-comment"># - Dict[int, float]</span>
        <span class="hljs-comment"># - Iterable[Tuple[int, float]]</span>
        <span class="hljs-string">&quot;sparse_vector&quot;</span>: {
            d: rng.random() <span class="hljs-keyword">for</span> d <span class="hljs-keyword">in</span> random.sample(<span class="hljs-built_in">range</span>(dim), random.randint(<span class="hljs-number">20</span>, <span class="hljs-number">30</span>))
        },
    }
    <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(num_entities)
]

<span class="hljs-comment"># print the first entity to check the representation</span>
<span class="hljs-built_in">print</span>(entities[<span class="hljs-number">0</span>])

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &#x27;scalar_field&#x27;: 0.520821523849214,</span>
<span class="hljs-comment">#     &#x27;sparse_vector&#x27;: {</span>
<span class="hljs-comment">#         5263: 0.2639375518635271,</span>
<span class="hljs-comment">#         3573: 0.34701499565746674,</span>
<span class="hljs-comment">#         9637: 0.30856525997853057,</span>
<span class="hljs-comment">#         4399: 0.19771651149001523,</span>
<span class="hljs-comment">#         6959: 0.31025067641541815,</span>
<span class="hljs-comment">#         1729: 0.8265339135915016,</span>
<span class="hljs-comment">#         1220: 0.15303302147479103,</span>
<span class="hljs-comment">#         7335: 0.9436728846033107,</span>
<span class="hljs-comment">#         6167: 0.19929870545596562,</span>
<span class="hljs-comment">#         5891: 0.8214617920371853,</span>
<span class="hljs-comment">#         2245: 0.7852255053773395,</span>
<span class="hljs-comment">#         2886: 0.8787982039149889,</span>
<span class="hljs-comment">#         8966: 0.9000606703940665,</span>
<span class="hljs-comment">#         4910: 0.3001170013981104,</span>
<span class="hljs-comment">#         17: 0.00875671667413136,</span>
<span class="hljs-comment">#         3279: 0.7003425473001098,</span>
<span class="hljs-comment">#         2622: 0.7571360018373428,</span>
<span class="hljs-comment">#         4962: 0.3901879090102064,</span>
<span class="hljs-comment">#         4698: 0.22589525720196246,</span>
<span class="hljs-comment">#         3290: 0.5510228492587324,</span>
<span class="hljs-comment">#         6185: 0.4508413201390492</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<div class="admonition note">
<p><b>注釈</b></p>
<p>ベクトルの次元は Python<code translate="no">int</code> または<code translate="no">numpy.integer</code> 型でなければならず、値は Python<code translate="no">float</code> または<code translate="no">numpy.floating</code> 型でなければなりません。</p>
</div>
<p>埋め込みを生成するには、PyMilvus ライブラリに組み込まれた<code translate="no">model</code> パッケージを使用することもできます。詳細については、<a href="/docs/ja/v2.4.x/embeddings.md">埋め込みを</a>参照してください。</p>
<h2 id="Create-a-collection-with-a-sparse-vector-field" class="common-anchor-header">疎なベクトル場を持つコレクションの作成<button data-href="#Create-a-collection-with-a-sparse-vector-field" class="anchor-icon" translate="no">
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
    </button></h2><p>スパースベクトルフィールドを持つコレクションを作成するには、スパースベクトルフィールドの<strong>データ型を</strong> <strong>DataType.SPARSE_FLOAT_VECTOR</strong> に設定します。密なベクトルとは異なり、疎なベクトルでは次元を指定する必要はありません。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># Create a MilvusClient instance</span>
client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Create a collection with a sparse vector field</span>
schema = client.create_schema(
    auto_id=<span class="hljs-literal">True</span>,
    enable_dynamic_fields=<span class="hljs-literal">True</span>,
)

schema.add_field(field_name=<span class="hljs-string">&quot;pk&quot;</span>, datatype=DataType.VARCHAR, is_primary=<span class="hljs-literal">True</span>, max_length=<span class="hljs-number">100</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;scalar_field&quot;</span>, datatype=DataType.DOUBLE)
<span class="hljs-comment"># For sparse vector, no need to specify dimension</span>
schema.add_field(field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR) <span class="hljs-comment"># set `datatype` to `SPARSE_FLOAT_VECTOR`</span>

client.create_collection(collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>, schema=schema)
<button class="copy-code-btn"></button></code></pre>
<p>一般的なコレクション・パラメータの詳細は、<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md">create_collection()</a> を参照してください<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md">。</a></p>
<h2 id="Insert-entities-with-sparse-vector-embeddings" class="common-anchor-header">疎ベクトル埋め込みを持つエンティティの挿入<button data-href="#Insert-entities-with-sparse-vector-embeddings" class="anchor-icon" translate="no">
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
    </button></h2><p>疎なベクトル埋め込みを持つエンティティを挿入するには、単にエンティティのリストを <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/insert.md"><code translate="no">insert()</code></a>メソッドに渡します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Insert entities</span>
client.insert(collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>, data=entities)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Index-the-collection" class="common-anchor-header">コレクションのインデックス作成<button data-href="#Index-the-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>類似検索の前に、コレクションのインデックスを作成します。インデックスのタイプとパラメータの詳細については、<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/add_index.md">add_index()</a>および<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/create_index.md">create_index()</a> を参照してください。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Index the collection</span>

<span class="hljs-comment"># Prepare index params</span>
index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    index_name=<span class="hljs-string">&quot;sparse_inverted_index&quot;</span>,
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>, <span class="hljs-comment"># the type of index to be created. set to `SPARSE_INVERTED_INDEX` or `SPARSE_WAND`.</span>
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-comment"># the metric type to be used for the index. Currently, only `IP` (Inner Product) is supported.</span>
    params={<span class="hljs-string">&quot;drop_ratio_build&quot;</span>: <span class="hljs-number">0.2</span>}, <span class="hljs-comment"># the ratio of small vector values to be dropped during indexing.</span>
)

<span class="hljs-comment"># Create index</span>
client.create_index(collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>, index_params=index_params)
<button class="copy-code-btn"></button></code></pre>
<p>疎なベクトルに対するインデックス作成では、以下の点に注意してください：</p>
<ul>
<li><p><code translate="no">index_type</code>:構築するインデックスの型。構築するインデックスの型：</p>
<ul>
<li><p><code translate="no">SPARSE_INVERTED_INDEX</code>:各次元を非ゼロ・ベクトルに対応付け、検索時に関連データへの直接アクセスを容易にする転置インデックス。疎であるが高次元のデータを持つデータセットに最適。</p></li>
<li><p><code translate="no">SPARSE_WAND</code>:Weak-AND（WAND）アルゴリズムを利用して、可能性の低い候補を素早く回避し、より高いランキングの可能性がある候補に評価を集中させる。次元を用語として、ベクトルを文書として扱い、大規模で疎なデータセットの検索を高速化。</p></li>
</ul></li>
<li><p><code translate="no">metric_type</code>:疎なベクトルに対しては、<code translate="no">IP</code> (Inner Product) 距離メトリックのみがサポートされる。</p></li>
<li><p><code translate="no">params.drop_ratio_build</code>:特にスパースベクトルに使用されるインデックスパラメータ。インデックス作成時に除外される小さなベクトル値の割合を制御します。このパラメータは、インデックスを作成する際に小さな値を無視することで、効率と精度のトレードオフを微調整することができます。例えば、<code translate="no">drop_ratio_build = 0.3</code> の場合、インデックス構築時にすべてのスパース・ベクトルからすべての値が集められ、ソートされる。これらの値のうち最小の30%はインデックスに含まれないため、検索時の計算負荷が軽減される。</p></li>
</ul>
<p>詳細については、<a href="/docs/ja/v2.4.x/index.md">インメモリ・インデックスを</a>参照のこと。</p>
<h2 id="Perform-ANN-search" class="common-anchor-header">ANN検索の実行<button data-href="#Perform-ANN-search" class="anchor-icon" translate="no">
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
    </button></h2><p>コレクションがインデックス化され、メモリにロードされたら <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/search.md"><code translate="no">search()</code></a>メソッドを使用して、クエリに基づいて関連文書を検索する。</p>
<pre><code translate="no" class="language-python"># Load the collection into memory
client.load_collection(collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>)

# Perform ANN search on sparse vectors

# <span class="hljs-keyword">for</span> demo purpose we search <span class="hljs-keyword">for</span> the last inserted vector
query_vector = entities[<span class="hljs-number">-1</span>][<span class="hljs-string">&quot;sparse_vector&quot;</span>]

search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;drop_ratio_search&quot;</span>: <span class="hljs-number">0.2</span>}, # the ratio of small vector values to be dropped during search.
}

search_res = client.search(
    collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>,
    data=[query_vector],
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;pk&quot;</span>, <span class="hljs-string">&quot;scalar_field&quot;</span>],
    search_params=search_params,
)

<span class="hljs-keyword">for</span> hits in search_res:
    <span class="hljs-keyword">for</span> hit in hits:
        <span class="hljs-built_in">print</span>(f<span class="hljs-string">&quot;hit: {hit}&quot;</span>)
        
# Output:
# hit: {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-string">&#x27;448458373272710786&#x27;</span>, <span class="hljs-string">&#x27;distance&#x27;</span>: <span class="hljs-number">7.220192909240723</span>, <span class="hljs-string">&#x27;entity&#x27;</span>: {<span class="hljs-string">&#x27;pk&#x27;</span>: <span class="hljs-string">&#x27;448458373272710786&#x27;</span>, <span class="hljs-string">&#x27;scalar_field&#x27;</span>: <span class="hljs-number">0.46767865218233806</span>}}
# hit: {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-string">&#x27;448458373272708317&#x27;</span>, <span class="hljs-string">&#x27;distance&#x27;</span>: <span class="hljs-number">1.2287548780441284</span>, <span class="hljs-string">&#x27;entity&#x27;</span>: {<span class="hljs-string">&#x27;pk&#x27;</span>: <span class="hljs-string">&#x27;448458373272708317&#x27;</span>, <span class="hljs-string">&#x27;scalar_field&#x27;</span>: <span class="hljs-number">0.7315987515699472</span>}}
# hit: {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-string">&#x27;448458373272702005&#x27;</span>, <span class="hljs-string">&#x27;distance&#x27;</span>: <span class="hljs-number">0.9848432540893555</span>, <span class="hljs-string">&#x27;entity&#x27;</span>: {<span class="hljs-string">&#x27;pk&#x27;</span>: <span class="hljs-string">&#x27;448458373272702005&#x27;</span>, <span class="hljs-string">&#x27;scalar_field&#x27;</span>: <span class="hljs-number">0.9871869181562156</span>}}
<button class="copy-code-btn"></button></code></pre>
<p>検索パラメータを設定する際には、以下の点に注意する：</p>
<ul>
<li><code translate="no">params.drop_ratio_search</code>:スパース・ベクトル専用の検索パラメータ。このオプションは、クエリベクトル中の最小値を無視する比率を指定することで、検索処理の微調整を可能にします。検索精度とパフォーマンスのバランスをとるのに役立ちます。<code translate="no">drop_ratio_search</code> に設定する値が小さければ小さいほど、これらの小さな値が最終的なスコアに与える影響は小さくなります。いくつかの小さな値を無視することで、精度への影響を最小限に抑えながら検索パフォーマンスを向上させることができます。</li>
</ul>
<h2 id="Perform-scalar-queries" class="common-anchor-header">スカラークエリーの実行<button data-href="#Perform-scalar-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>ANN検索に加えて、Milvusはスパースベクトルに対するスカラークエリもサポートしています。これらのクエリーでは、スパースベクターに関連付けられたスカラー値に基づいて文書を検索することができます。パラメータの詳細については<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/query.md">query()</a>を参照してください。</p>
<p><strong>scalar_field が</strong>3 より大きいエンティティをフィルタリングします：</p>
<pre><code translate="no" class="language-python"># Perform a query by specifying filter expr
filter_query_res = client.query(
    collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>,
    filter=<span class="hljs-string">&quot;scalar_field &gt; 0.999&quot;</span>,
)

<span class="hljs-built_in">print</span>(filter_query_res[:<span class="hljs-number">2</span>])

# Output:
# [{<span class="hljs-string">&#x27;pk&#x27;</span>: <span class="hljs-string">&#x27;448458373272701862&#x27;</span>, <span class="hljs-string">&#x27;scalar_field&#x27;</span>: <span class="hljs-number">0.9994093623822689</span>, <span class="hljs-string">&#x27;sparse_vector&#x27;</span>: {<span class="hljs-number">173</span>: <span class="hljs-number">0.35266244411468506</span>, <span class="hljs-number">400</span>: <span class="hljs-number">0.49995484948158264</span>, <span class="hljs-number">480</span>: <span class="hljs-number">0.8757831454277039</span>, <span class="hljs-number">661</span>: <span class="hljs-number">0.9931875467300415</span>, <span class="hljs-number">1040</span>: <span class="hljs-number">0.0965644046664238</span>, <span class="hljs-number">1728</span>: <span class="hljs-number">0.7478245496749878</span>, <span class="hljs-number">2365</span>: <span class="hljs-number">0.4351981580257416</span>, <span class="hljs-number">2923</span>: <span class="hljs-number">0.5505295395851135</span>, <span class="hljs-number">3181</span>: <span class="hljs-number">0.7396837472915649</span>, <span class="hljs-number">3848</span>: <span class="hljs-number">0.4428485333919525</span>, <span class="hljs-number">4701</span>: <span class="hljs-number">0.39119353890419006</span>, <span class="hljs-number">5199</span>: <span class="hljs-number">0.790219783782959</span>, <span class="hljs-number">5798</span>: <span class="hljs-number">0.9623121619224548</span>, <span class="hljs-number">6213</span>: <span class="hljs-number">0.453134149312973</span>, <span class="hljs-number">6341</span>: <span class="hljs-number">0.745091438293457</span>, <span class="hljs-number">6775</span>: <span class="hljs-number">0.27766478061676025</span>, <span class="hljs-number">6875</span>: <span class="hljs-number">0.017947908490896225</span>, <span class="hljs-number">8093</span>: <span class="hljs-number">0.11834774166345596</span>, <span class="hljs-number">8617</span>: <span class="hljs-number">0.2289179265499115</span>, <span class="hljs-number">8991</span>: <span class="hljs-number">0.36600416898727417</span>, <span class="hljs-number">9346</span>: <span class="hljs-number">0.5502803921699524</span>}}, {<span class="hljs-string">&#x27;pk&#x27;</span>: <span class="hljs-string">&#x27;448458373272702421&#x27;</span>, <span class="hljs-string">&#x27;scalar_field&#x27;</span>: <span class="hljs-number">0.9990218525410719</span>, <span class="hljs-string">&#x27;sparse_vector&#x27;</span>: {<span class="hljs-number">448</span>: <span class="hljs-number">0.587817907333374</span>, <span class="hljs-number">1866</span>: <span class="hljs-number">0.0994109958410263</span>, <span class="hljs-number">2438</span>: <span class="hljs-number">0.8672442436218262</span>, <span class="hljs-number">2533</span>: <span class="hljs-number">0.8063794374465942</span>, <span class="hljs-number">2595</span>: <span class="hljs-number">0.02122959867119789</span>, <span class="hljs-number">2828</span>: <span class="hljs-number">0.33827054500579834</span>, <span class="hljs-number">2871</span>: <span class="hljs-number">0.1984412521123886</span>, <span class="hljs-number">2938</span>: <span class="hljs-number">0.09674275666475296</span>, <span class="hljs-number">3154</span>: <span class="hljs-number">0.21552987396717072</span>, <span class="hljs-number">3662</span>: <span class="hljs-number">0.5236313343048096</span>, <span class="hljs-number">3711</span>: <span class="hljs-number">0.6463911533355713</span>, <span class="hljs-number">4029</span>: <span class="hljs-number">0.4041993021965027</span>, <span class="hljs-number">7143</span>: <span class="hljs-number">0.7370485663414001</span>, <span class="hljs-number">7589</span>: <span class="hljs-number">0.37588241696357727</span>, <span class="hljs-number">7776</span>: <span class="hljs-number">0.436136394739151</span>, <span class="hljs-number">7962</span>: <span class="hljs-number">0.06377989053726196</span>, <span class="hljs-number">8385</span>: <span class="hljs-number">0.5808192491531372</span>, <span class="hljs-number">8592</span>: <span class="hljs-number">0.8865005970001221</span>, <span class="hljs-number">8648</span>: <span class="hljs-number">0.05727503448724747</span>, <span class="hljs-number">9071</span>: <span class="hljs-number">0.9450633525848389</span>, <span class="hljs-number">9161</span>: <span class="hljs-number">0.146037295460701</span>, <span class="hljs-number">9358</span>: <span class="hljs-number">0.1903032660484314</span>, <span class="hljs-number">9679</span>: <span class="hljs-number">0.3146636486053467</span>, <span class="hljs-number">9974</span>: <span class="hljs-number">0.8561339378356934</span>, <span class="hljs-number">9991</span>: <span class="hljs-number">0.15841573476791382</span>}}]
<button class="copy-code-btn"></button></code></pre>
<p>主キーによるエンティティのフィルタリング：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># primary keys of entities that satisfy the filter</span>
pks = [ret[<span class="hljs-string">&quot;pk&quot;</span>] <span class="hljs-keyword">for</span> ret <span class="hljs-keyword">in</span> filter_query_res]

<span class="hljs-comment"># Perform a query by primary key</span>
pk_query_res = client.query(
    collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>, <span class="hljs-built_in">filter</span>=<span class="hljs-string">f&quot;pk == &#x27;<span class="hljs-subst">{pks[<span class="hljs-number">0</span>]}</span>&#x27;&quot;</span>
)

<span class="hljs-built_in">print</span>(pk_query_res)

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># [{&#x27;scalar_field&#x27;: 0.9994093623822689, &#x27;sparse_vector&#x27;: {173: 0.35266244411468506, 400: 0.49995484948158264, 480: 0.8757831454277039, 661: 0.9931875467300415, 1040: 0.0965644046664238, 1728: 0.7478245496749878, 2365: 0.4351981580257416, 2923: 0.5505295395851135, 3181: 0.7396837472915649, 3848: 0.4428485333919525, 4701: 0.39119353890419006, 5199: 0.790219783782959, 5798: 0.9623121619224548, 6213: 0.453134149312973, 6341: 0.745091438293457, 6775: 0.27766478061676025, 6875: 0.017947908490896225, 8093: 0.11834774166345596, 8617: 0.2289179265499115, 8991: 0.36600416898727417, 9346: 0.5502803921699524}, &#x27;pk&#x27;: &#x27;448458373272701862&#x27;}]</span>
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
    </button></h2><p>Milvus でスパースベクトルを使用する場合、以下の制限を考慮してください：</p>
<ul>
<li><p>現在のところ、スパースベクトルでは<strong>IP</strong>距離メトリックのみがサポートされています。</p></li>
<li><p>スパースベクタフィールドでは、<strong>SPARSE_INVERTED_INDEXと</strong> <strong>SPARSE_WAND</strong>インデックスタイプのみがサポートされています。</p></li>
<li><p>現在、<a href="https://milvus.io/docs/single-vector-search.md#Range-search">範囲検索</a>、<a href="https://milvus.io/docs/single-vector-search.md#Grouping-search">グループ化検索</a>、<a href="https://milvus.io/docs/with-iterators.md#Search-with-iterator">検索反復子は</a>スパース・ベクタではサポートされていません。</p></li>
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
<li><p><strong>スパース・ベクトルはどのような距離メトリックをサポートしていますか?</strong></p>
<p>スパース・ベクトルは高次元のため、L2距離や余弦距離は実用的ではありません。</p></li>
<li><p><strong>SPARSE_INVERTED_INDEXとSPARSE_WANDの違いと選択方法を教えてください。</strong></p>
<p><strong>SPARSE_INVERTED_INDEXは</strong>伝統的な転置インデックスですが、<strong>SPARSE_WANDは</strong> <a href="https://dl.acm.org/doi/10.1145/956863.956944">Weak-AND</a>アルゴリズムを使用し、検索中のフルIP距離評価の回数を減らします。<strong>SPARSE_WANDは</strong>一般的に高速ですが、ベクトル密度が高くなるにつれて性能が低下する可能性があります。どちらかを選択するには、特定のデータセットとユースケースに基づいた実験とベンチマークを実施してください。</p></li>
<li><p><strong>drop_ratio_buildとdrop_ratio_searchパラメータはどのように選択すればよいですか？</strong></p>
<p><strong>drop_ratio_buildと</strong> <strong>drop_ratio_searchの</strong>選択は、データの特性と、検索レイテンシー/スループットおよび精度に対する要件に依存します。</p></li>
<li><p><strong>スパース埋め込みでサポートされているデータ型は何ですか？</strong></p>
<p>次元部は符号なし32ビット整数、値部は非負の32ビット浮動小数点数です。</p></li>
<li><p><strong>スパース埋込みの次元は，uint32空間内の任意の離散値にできますか？</strong></p>
<p>はい，1つの例外があります．スパース埋め込みの次元は，<code translate="no">[0, maximum of uint32)</code> の範囲内の任意の値にすることができます． つまり，uint32の最大値を使うことはできません．</p></li>
<li><p><strong>成長しているセグメントの検索は、インデックスを使って行うのですか?</strong></p>
<p>成長中のセグメントを検索するには、セグメントインデックスと同じ型のインデックスを使用します。インデックスが作成される前の新しい成長中のセグメントについては、 総当たり検索を使用します。</p></li>
<li><p><strong>1つのコレクションに、疎なベクトルと密なベクトルの両方を持つことは可能ですか?</strong></p>
<p>はい、複数のベクトル型をサポートしているため、疎なベクトル列と密なベクトル列の両方を持つコレクションを作成し、それらに対してハイブリッド検索を実行することができます。</p></li>
<li><p><strong>スパース埋め込みを挿入または検索するための条件は何ですか？</strong></p>
<p>スパース埋め込みは少なくとも1つの非ゼロ値を持ち、ベクトルインデックスは非負でなければなりません。</p></li>
</ul>
