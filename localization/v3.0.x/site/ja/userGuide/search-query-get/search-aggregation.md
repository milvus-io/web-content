---
id: search-aggregation.md
title: 検索の集約Compatible with Milvus 3.0.x
summary: ベクトル検索の結果をバケットごとにグループ化し、バケットごとのメトリクスを算出し、バケットを並べ替えて、代表的なヒットを返す。
beta: Milvus 3.0.x
---
<h1 id="Search-Aggregation" class="common-anchor-header">検索の集約<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Search-Aggregation" class="anchor-icon" translate="no">
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
    </button></h1><p>買い物客が「日常のトレーニング用ブラックランニングシューズ」と検索した場合、近似最近傍法（ANN）検索はベクトルの類似度に基づいて商品をランク付けし、フラットなトップKリストを返します。結果は関連性が高いものの、重複しがちです。以下の例では、上位6件の結果のうち4件がブランドAの商品であるのに対し、ブランドBとブランドCはそれぞれ1件ずつしか表示されていません。</p>
<p>フラットなリストでは、バケット指向の要約を直接提供することはできません。アプリケーションでは、候補の保持数や平均価格によってブランドを比較したり、各ブランドから少数の代表的な商品を精査したり、結果を複数のバケットレベルに整理したりする必要がある場合があります。</p>
<p>検索集計機能は、選択されたスカラーフィールドに基づいて、保持されたANN候補をバケットに整理します。この例では、各ブランドが個別のバケットとなります。Milvusは、各バケットの統計値を計算し、バケットを順序付け、代表的な製品を関連付けることができます。アプリケーションは、<code translate="no">result.agg_buckets</code> を通じて、この「バケット優先」のレスポンスを利用します。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/search-aggregation-overview.png" alt="A flat running-shoe search result becomes a set of comparable brand buckets" class="doc-image" id="a-flat-running-shoe-search-result-becomes-a-set-of-comparable-brand-buckets" /> 
   <span>平坦なランニングシューズの検索結果は、比較可能なブランド・バケットのセットになります</span>
  
 </span></p>
<p>検索集計は、コレクション全体に対する厳密な集計を実行するものではありません。バケットの存在、件数、メトリクス、順序、および代表的なヒットは、ANNおよびグループ化ステージによって保持された候補に依存します。</p>
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
    </button></h2><p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/search-aggregation-bucketing.png" alt="ANN candidates grouped by bucket keys and returned with counts, metrics, and representative hits" class="doc-image" id="ann-candidates-grouped-by-bucket-keys-and-returned-with-counts,-metrics,-and-representative-hits" /> 
   <span>バケットキーごとにグループ化され、カウント、メトリクス、および代表的なヒットとともに返されるANN候補</span>
  
 </span></p>
<ol>
<li><p><strong>候補の取得。</strong>MilvusはANN検索を実行し、クエリベクトルに最も近いエンティティを検索します。その後、グループ化ステージでは、各完全複合キーに対して上限数の候補を保持します。このキーごとの候補予算は、集計ツリー内の任意の場所で<code translate="no">TopHits.size</code> の最大値、または<code translate="no">top_hits</code> が設定されていないレベルでは<code translate="no">1</code> となります。</p></li>
<li><p><strong>バケットの構築。</strong> <code translate="no">SearchAggregation.fields</code> がバケットキーを定義します。フィールド値の各一意の組み合わせが、個別のキーを生成します。図では、<code translate="no">fields=[&quot;brand&quot;]</code> により、<code translate="no">(Brand A)</code> 、<code translate="no">(Brand B)</code> 、および<code translate="no">(Brand C)</code> というバケットキーが生成されます。同じキーを持つ保持候補は同じバケットに属し、その<code translate="no">count</code> に寄与します。<code translate="no">SearchAggregation.size</code> は、Milvusが返すバケットの数を制限します。</p></li>
<li><p><strong>結果を計算して返します。</strong>返される各バケットには、そのキーと保持された候補の数が含まれます。Milvusは、設定されたメトリクスの計算、バケットの並べ替え、代表的なエンティティの返却、および子バケットの構築も行うことができます。<code translate="no">result.agg_buckets</code> 内の各<code translate="no">AggregationBucket</code> は、<code translate="no">key</code> 、<code translate="no">count</code> 、<code translate="no">metrics</code> 、<code translate="no">hits</code> 、および<code translate="no">sub_groups</code> を公開します。検索集計が有効になっている場合、通常の検索ヒットリストは空になります。</p></li>
</ol>
<p>図中では、<code translate="no">TopHits.size=4</code> がキーごとの候補予算として4を割り当てているため、保持されたブランドAの候補4つから<code translate="no">count: 4</code> が生成されます。図を簡潔にするため、完成したブランドAのカードには、返された代表的なヒット4件のうち2件のみが表示されています。</p>
<p><code translate="no">sub_aggregation</code> を使用すると、Milvusは各親バケット内で手順2と3を繰り返します。ANNのリコール率やキーごとの候補予算の変更により、バケット数、メトリクス、順序、ヒット、およびネストされた結果が変化する可能性があります。</p>
<h2 id="Limits" class="common-anchor-header">制限事項<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><p>検索集計を使用する前に、以下の制限事項に注意してください：</p>
<ul>
<li><p><strong>ネストされた集計：</strong>1つのリクエストには、1つのルート<code translate="no">SearchAggregation</code> と、最大3つのネストされた<code translate="no">sub_aggregation</code> レベルを含めることができ、合計で最大4レベルとなります。すべてのレベルを通じて、バケットキーの作成に使用できるフィールドは最大10個までです。</p></li>
<li><p><strong>バケットキーの作成に使用できるフィールド：</strong> <code translate="no">SearchAggregation.fields</code> は、Boolean、integer、<code translate="no">VARCHAR</code> 、および<code translate="no">TIMESTAMPTZ</code> フィールドをサポートしています。<code translate="no">FLOAT</code> 、<code translate="no">DOUBLE</code> 、<code translate="no">ARRAY</code> 、<code translate="no">JSON</code> 、<code translate="no">GEOMETRY</code> 、<code translate="no">TEXT</code> 、vector、およびdynamicフィールドはサポートしていません。</p></li>
<li><p><strong>メトリックフィールド：</strong> <code translate="no">count</code> は、<code translate="no">&quot;*&quot;</code> 、または<code translate="no">JSON</code> 以外の非動的フィールドを受け付け、フィールドが指定されている場合は<code translate="no">NULL</code> の値をスキップします。<code translate="no">sum</code> および<code translate="no">avg</code> は、整数および浮動小数点フィールドを受け付けます。<code translate="no">min</code> および<code translate="no">max</code> は、さらに文字列および<code translate="no">TIMESTAMPTZ</code> フィールドも受け付けます。</p></li>
<li><p><strong>トップヒットのソートフィールド：</strong> <code translate="no">TopHits.sort</code> は、比較可能なブール値、整数、浮動小数点数、文字列、および<code translate="no">TIMESTAMPTZ</code> フィールドに加え、<code translate="no">_score</code> を受け付けます。<code translate="no">ARRAY</code> 、<code translate="no">JSON</code> 、<code translate="no">GEOMETRY</code> 、ベクトル、または動的フィールドはサポートしていません。</p></li>
<li><p><strong>候補数（Candidate budget）：</strong>集計ツリー内のどこかで最大の<code translate="no">TopHits.size</code> は、完全複合キーごとに保持される候補数でもあります。どのレベルでも<code translate="no">top_hits</code> が設定されていない場合、Milvusはキーごとに1つの候補を保持します。バケット<code translate="no">count</code> およびメトリクスは、これらの保持された候補から計算されるため、<code translate="no">TopHits.size</code> を変更すると、これらも変更される可能性があります。</p></li>
<li><p><strong>Null許容バケットフィールド：</strong> <code translate="no">NULL</code> の値は、それ自体がバケットキーを形成します。Nullバケットを除外するには、検索リクエストに<code translate="no">brand is not null</code> などのフィルターを追加してください。</p></li>
<li><p><strong>重複するフィールド:</strong>同一のフィールドを複数の<code translate="no">SearchAggregation.fields</code> リストに含めることはできません。たとえば、ルート集計で<code translate="no">fields=[&quot;category&quot;]</code> を使用している場合、ネストされた<code translate="no">sub_aggregation</code> で<code translate="no">fields=[&quot;category&quot;]</code> を使用することはできません。</p></li>
<li><p><strong>サポートされていない組み合わせ：</strong>Search Aggregationは、ゼロ以外の<code translate="no">offset</code> 、Search Iterators、Hybrid Search、Highlighter、またはGrouping Searchと組み合わせることはできません。トップレベルの<code translate="no">offset</code> の値が<code translate="no">0</code> の場合、このパラメータを省略したのと同じ扱いとなります。REST v2の検索リクエストでは、<code translate="no">searchAggregation</code> と<code translate="no">ids</code> を同時に指定することはできません。</p></li>
<li><p><strong>返されるエントリ数：</strong>デフォルトでは、リクエストで算出される結果エントリの最大数が 10,000 を超える場合、Milvus は検索集計リクエストを拒否します。このしきい値は、<code translate="no">proxy.maxSearchAggregationResultEntries</code> で制御されます。このチェックを無効にするには、設定値を<code translate="no">0</code> または負の数に設定してください。</p>
<p>Milvus はこの最大値を次のように計算します：</p>
<p><code translate="no">number of query vectors × product of the effective search_size at every aggregation level × largest TopHits.size at any level</code></p>
<p>このサーバーサイドの計算において、各レベルにおける有効な<code translate="no">search_size</code> は、明示的に設定された<code translate="no">search_size</code> 、または<code translate="no">search_size</code> が省略されている場合はそのレベルの<code translate="no">size</code> となります。本ガイドで使用されるPyMilvus APIは現在<code translate="no">search_size</code> を公開していないため、PyMilvusリクエストではこの計算に各レベルの<code translate="no">size</code> を使用します。 どのレベルでも<code translate="no">TopHits</code> が設定されていない場合、最後の因子には<code translate="no">1</code> を使用します。たとえば、クエリベクトルが1つ、ルートバケットが10個、ルートバケットごとに子バケットが5個、子バケットごとにヒットが2つの場合、計算される最大値は次のようになります：</p>
<p><code translate="no">1 × 10 × 5 × 2 = 100</code></p></li>
</ul>
<h2 id="Use-Search-Aggregation" class="common-anchor-header">検索集計の使用<button data-href="#Use-Search-Aggregation" class="anchor-icon" translate="no">
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
    </button></h2><p>達成したい内容に基づいて例を選択してください：</p>
<table>
<thead>
<tr><th>次のページへ</th><th>説明</th><th>主な設定</th></tr>
</thead>
<tbody>
<tr><td><a href="#Compare-and-sort-buckets">バケットの比較と並べ替え</a></td><td>バケットごとの統計情報を計算してバケットを比較し、返されたバケットをメトリクス、カウント、またはキーで並べ替えます。</td><td><code translate="no">fields</code>,<code translate="no">size</code>,<code translate="no">metrics</code>,<code translate="no">order</code></td></tr>
<tr><td><a href="#Show-representative-results-from-each-bucket">各バケットから代表的な結果を表示</a></td><td>各バケットから限定された数のエンティティを取得し、それらのエンティティをスカラーフィールドまたはベクトルスコアごとに個別に並べ替えます。</td><td><code translate="no">top_hits</code>,<code translate="no">TopHits.size</code>,<code translate="no">TopHits.sort</code></td></tr>
<tr><td><a href="#Group-results-at-multiple-levels">結果を複数のレベルでグループ化する</a></td><td>結果を親バケットと子バケットのレベルに整理し、複数の次元を順次分析します。</td><td><code translate="no">sub_aggregation</code></td></tr>
</tbody>
</table>
<p>以下の例では、ブランド、カテゴリ、色、価格、評価のフィールドを持つ商品コレクションを使用しています。すべてのブランド名、商品名、価格、評価、および検索結果は、合成されたサンプルデータです。以下のセクションを展開して、コレクションを作成し、共有検索変数を定義してください。</p>
<p><details></p>
<p><summary>サンプルコレクションの設定</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient, SearchAggregation, TopHits

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

collection_name = <span class="hljs-string">&quot;product_search_aggregation&quot;</span>

<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;embedding&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)
schema.add_field(<span class="hljs-string">&quot;name&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">200</span>)
schema.add_field(<span class="hljs-string">&quot;brand&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">100</span>)
schema.add_field(<span class="hljs-string">&quot;category&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">100</span>)
schema.add_field(<span class="hljs-string">&quot;color&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">50</span>)
schema.add_field(<span class="hljs-string">&quot;price&quot;</span>, DataType.DOUBLE)
schema.add_field(<span class="hljs-string">&quot;rating&quot;</span>, DataType.DOUBLE)
schema.add_field(<span class="hljs-string">&quot;in_stock&quot;</span>, DataType.BOOL)

index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
)

client.create_collection(
    collection_name=collection_name,
    schema=schema,
    index_params=index_params,
    <span class="hljs-comment"># Make preceding writes visible to searches from this client.</span>
    consistency_level=<span class="hljs-string">&quot;Session&quot;</span>,
)

client.insert(
    collection_name=collection_name,
    data=[
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.42</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.66</span>, <span class="hljs-number">0.31</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner A1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">129.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.7</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.10</span>, <span class="hljs-number">0.39</span>, <span class="hljs-number">0.20</span>, <span class="hljs-number">0.61</span>, <span class="hljs-number">0.29</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Trail A2&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;blue&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">139.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.6</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.14</span>, <span class="hljs-number">0.44</span>, <span class="hljs-number">0.19</span>, <span class="hljs-number">0.68</span>, <span class="hljs-number">0.33</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner B1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand B&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;white&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">159.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.8</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">4</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.16</span>, <span class="hljs-number">0.41</span>, <span class="hljs-number">0.22</span>, <span class="hljs-number">0.62</span>, <span class="hljs-number">0.30</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner C1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand C&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">119.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.4</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">False</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">5</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.48</span>, <span class="hljs-number">0.20</span>, <span class="hljs-number">0.59</span>, <span class="hljs-number">0.15</span>, <span class="hljs-number">0.71</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Jacket A1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;jackets&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.5</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">6</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.45</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.55</span>, <span class="hljs-number">0.17</span>, <span class="hljs-number">0.69</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Jacket B1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand B&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;jackets&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;blue&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">89.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.3</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">7</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.09</span>, <span class="hljs-number">0.38</span>, <span class="hljs-number">0.17</span>, <span class="hljs-number">0.60</span>, <span class="hljs-number">0.27</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner A3&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">159.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.8</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">8</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.13</span>, <span class="hljs-number">0.43</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.65</span>, <span class="hljs-number">0.32</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner A4&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">149.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.9</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
    ],
)

client.load_collection(collection_name)

query_vector = [<span class="hljs-number">0.11</span>, <span class="hljs-number">0.40</span>, <span class="hljs-number">0.19</span>, <span class="hljs-number">0.64</span>, <span class="hljs-number">0.30</span>]
search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;COSINE&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {},
}
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>上記の設定では、ベクトルインデックスと検索パラメータの両方について、<code translate="no">COSINE</code> が構成されています。そのため、以降の例では、<code translate="no">{&quot;_score&quot;: &quot;desc&quot;}</code> を使用して、コサイン類似度の高いものを優先的に表示します。<code translate="no">L2</code> などの距離メトリックを使用する場合は、<code translate="no">{&quot;_score&quot;: &quot;asc&quot;}</code> を使用してください。</p>
<h3 id="Compare-and-sort-buckets" class="common-anchor-header">バケットの比較とソート<button data-href="#Compare-and-sort-buckets" class="anchor-icon" translate="no">
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
    </button></h3><p>このパターンは、計算された統計値を使用して取得されたエンティティのグループを比較し、バケットが返される順序を制御する必要がある場合に使用します。この例では、Milvusは取得された商品を<code translate="no">brand</code> でグループ化し、各ブランドバケットの価格メトリクスを計算し、平均価格に基づいてバケットを並べ替えます。</p>
<p>フィールド値ごとに1つ以上のエンティティを返すことで、結果の多様性を高めることのみを目的とする場合は、代わりに「<a href="/docs/ja/grouping-search.md">グループ化検索</a>」を使用してください。</p>
<p>以下の設定では、最大3つのブランド・バケットを作成し、各バケットのメトリクスを計算した上で、平均価格順にバケットを並べ替えます：</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
<span class="highlighted-comment-line">    <span class="hljs-comment"># Form one bucket for each distinct brand value.</span></span>
<span class="highlighted-comment-line">    fields=[<span class="hljs-string">&quot;brand&quot;</span>],</span>
<span class="highlighted-comment-line">    <span class="hljs-comment"># Return up to three buckets at this aggregation level.</span></span>
<span class="highlighted-comment-line">    size=<span class="hljs-number">3</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-comment"># Calculate named metrics for every selected bucket.</span></span>
<span class="highlighted-comment-line">    metrics={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;product_count&quot;</span>: {<span class="hljs-string">&quot;count&quot;</span>: <span class="hljs-string">&quot;*&quot;</span>},</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;avg_price&quot;</span>: {<span class="hljs-string">&quot;avg&quot;</span>: <span class="hljs-string">&quot;price&quot;</span>},</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;min_price&quot;</span>: {<span class="hljs-string">&quot;min&quot;</span>: <span class="hljs-string">&quot;price&quot;</span>},</span>
<span class="highlighted-comment-line">    },</span>
<span class="highlighted-comment-line">    <span class="hljs-comment"># Sort buckets by average price, highest first.</span></span>
<span class="highlighted-comment-line">    order=[</span>
<span class="highlighted-comment-line">        {<span class="hljs-string">&quot;avg_price&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>},</span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># If average prices are equal, sort by bucket key in ascending order.</span></span>
<span class="highlighted-comment-line">        {<span class="hljs-string">&quot;_key&quot;</span>: <span class="hljs-string">&quot;asc&quot;</span>},</span>
<span class="highlighted-comment-line">    ],</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">MilvusClient.search()</code> の<code translate="no">search_aggregation</code> パラメータにオブジェクトを渡します：</p>
<pre><code translate="no" class="language-python">result = client.search(
    collection_name=collection_name,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;embedding&quot;</span>,
    search_params=search_params,
    output_fields=[
        <span class="hljs-string">&quot;name&quot;</span>,
        <span class="hljs-string">&quot;brand&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;color&quot;</span>,
        <span class="hljs-string">&quot;price&quot;</span>,
        <span class="hljs-string">&quot;rating&quot;</span>,
        <span class="hljs-string">&quot;in_stock&quot;</span>,
    ],
<span class="highlighted-wrapper-line">    search_aggregation=aggregation,</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">search_aggregation</code> が設定されている場合、PyMilvusは<code translate="no">result[0]</code> に通常のエンティティヒットを返しません。代わりに、<code translate="no">result.agg_buckets[0]</code> からバケットのレスポンスを読み取ってください。<code translate="no">output_fields</code> パラメータは、返される各<code translate="no">AggregationHit.fields</code> マッピングにどのスカラーフィールドが表示されるかを制御します。Milvusは、<code translate="no">output_fields</code> にリストされていないメトリックソースフィールドやソートフィールドも引き続き使用できます。</p>
<p><details></p>
<p><summary>バケット出力の例を表示</summary></p>
<p>以下の出力は、上記のリクエストから取得され、可読性を高めるためにJSONとしてシリアライズされたものです。PyMilvusはJSONではなく、<code translate="no">AggregationBucket</code> オブジェクトを返します。<code translate="no">key</code> の値は、<code translate="no">fields</code> にフィールドが1つしか含まれていない場合でも、常にキーコンポーネントの順序付きリストとなります。これにより、複合キーのフィールド順序が保持されます。</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">[</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand B&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;product_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;avg_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">159.99</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;min_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">159.99</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand A&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;product_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;avg_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">129.99</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;min_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">129.99</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand C&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;product_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;avg_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">119.99</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;min_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">119.99</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">]</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>このガイドの単一のクエリベクトルについては、<code translate="no">result.agg_buckets[0]</code> から返された最上位のバケットを読み取ります。各バケットは、順序付きキーコンポーネント、保持された候補<code translate="no">count</code> 、計算された<code translate="no">metrics</code> 、代表値<code translate="no">hits</code> 、および<code translate="no">sub_groups</code> 内のネストされたバケットを公開しています。</p>
<p>設定は次のように読み取ります：</p>
<table>
<thead>
<tr><th>設定項目</th><th>制御対象</th><th>この例では</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">fields</code></td><td>Milvusによるバケットキーの生成方法</td><td><code translate="no">brand</code> の値が異なるものごとに、1つのバケットを作成します。</td></tr>
<tr><td><code translate="no">size</code></td><td>返されるバケットの最大数</td><td>最大3つのブランド・バケットを返します。</td></tr>
<tr><td><code translate="no">metrics</code></td><td>各バケットについて計算される統計情報</td><td>商品数、平均価格、最低価格を算出します。</td></tr>
<tr><td><code translate="no">order</code></td><td>Milvusによる返されるバケットのソート方法</td><td>平均価格でソートし、同値の場合はバケットキーを使用して順位を決定します。</td></tr>
</tbody>
</table>
<p><code translate="no">search_aggregation</code> が設定されている場合、Milvusは<code translate="no">limit</code> を無視します。トップレベルのバケット数を制御するには、ルート<code translate="no">SearchAggregation.size</code> の値を使用してください。</p>
<p>これらの設定により、Milvusは<code translate="no">avg_price</code> の降順で、ブランドB、ブランドA、ブランドCのバケットを返します。<code translate="no">_key</code> という基準は、バケットの平均価格が同じ場合にのみ適用されます。この構成では<code translate="no">top_hits</code> が定義されていないため、各バケットの<code translate="no">hits</code> リストは空であり、キーごとの候補予算は<code translate="no">1</code> となります。したがって、表示されるカウントとメトリクスは、ブランドごとに1つの保持候補を表しています。集計にキーごとのより広いメトリクスウィンドウが必要な場合は、<code translate="no">top_hits</code> を<code translate="no">TopHits.size</code> の値を大きくして構成してください。</p>
<p><details></p>
<p><summary>メトリクスと順序付けのルール</summary></p>
<p>各<code translate="no">SearchAggregation.metrics</code> エントリは、ユーザー定義のエイリアスを<code translate="no">{operation: source}</code> にマッピングします：</p>
<table>
<thead>
<tr><th>ソース</th><th>サポートされる操作</th><th>動作</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">JSON</code> 以外かつ動的フィールドではないフィールド</td><td><code translate="no">count</code></td><td>ソースフィールドが<code translate="no">NULL</code> ではない、保持された候補をカウントします。</td></tr>
<tr><td>整数型または浮動小数点型のフィールド</td><td><code translate="no">sum</code>、<code translate="no">avg</code> 、<code translate="no">min</code> 、<code translate="no">max</code></td><td>NULL ではない保持値に対して計算を行います。</td></tr>
<tr><td>文字列または<code translate="no">TIMESTAMPTZ</code> フィールド</td><td><code translate="no">min</code>、<code translate="no">max</code></td><td>NULL ではない保持値の最小値または最大値を選択します。</td></tr>
<tr><td><code translate="no">&quot;*&quot;</code></td><td><code translate="no">count</code></td><td>バケット内のすべての保持候補をカウントします。結果は<code translate="no">bucket.count</code> と一致します。</td></tr>
<tr><td><code translate="no">_score</code></td><td><code translate="no">sum</code>、<code translate="no">avg</code> 、<code translate="no">min</code> 、<code translate="no">max</code></td><td>保持された候補について、ANNの類似度または距離の値を集計します。</td></tr>
</tbody>
</table>
<p><code translate="no">SearchAggregation.order</code> 以下のキーを受け付けます：</p>
<table>
<thead>
<tr><th>順序キー</th><th>意味</th></tr>
</thead>
<tbody>
<tr><td>メトリックの別名</td><td><code translate="no">metrics</code> で同じ集計レベルで計算された値（例：<code translate="no">avg_price</code> ）に基づいてソートします。</td></tr>
<tr><td><code translate="no">_count</code></td><td>各バケットに保持されている候補の数に基づいてソートします。</td></tr>
<tr><td><code translate="no">_key</code></td><td><code translate="no">_key</code> という名前のコレクションフィールドではなく、バケットキーに基づいてソートします。</td></tr>
</tbody>
</table>
<p>各<code translate="no">order</code> エントリは、キーを<code translate="no">&quot;asc&quot;</code> または<code translate="no">&quot;desc&quot;</code> にマッピングします。Milvusは、最初のエントリから最後のエントリまで複数のエントリを評価します。<code translate="no">order</code> を省略した場合、Milvusは保持された候補セットからのバケット検出順序を維持します。</p>
<p>バケットをベクトル一致品質でソートするには、まず `<code translate="no">_score</code>` からバケットレベルのメトリックを計算し、そのメトリックエイリアスを `<code translate="no">order</code>` で使用します。各バケットには複数のエンティティスコアが含まれる可能性があるため、`<code translate="no">_score</code> ` をバケット順序のキーとして直接使用することはできません。たとえば、`<code translate="no">COSINE</code> ` または `<code translate="no">IP</code>` を使用する場合：</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
    fields=[<span class="hljs-string">&quot;brand&quot;</span>],
    size=<span class="hljs-number">3</span>,
    metrics={<span class="hljs-string">&quot;max_score&quot;</span>: {<span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-string">&quot;_score&quot;</span>}},
    order=[{<span class="hljs-string">&quot;max_score&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>}],
)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">L2</code> を使用し、<code translate="no">_score</code> の最小値を算出し、メトリックエイリアスを昇順でソートすることで、距離が最も小さいバケットが先頭にくるようにします。</p>
<p></details></p>
<p><details></p>
<p><summary>複合バケットキーの作成</summary></p>
<p>複合バケットキーを作成するには、同じリストに複数のフィールド名を指定します:</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
<span class="highlighted-comment-line">    <span class="hljs-comment"># Combine brand and color to form a composite bucket key.</span></span>
<span class="highlighted-comment-line">    fields=[<span class="hljs-string">&quot;brand&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>],</span>
    size=<span class="hljs-number">6</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>この設定により、<code translate="no">(Brand A, black)</code> 、<code translate="no">(Brand A, blue)</code> 、<code translate="no">(Brand B, white)</code> などのキーが生成されます。2つのエンティティが同じバケットを共有するのは、両方の値が一致する場合のみです。Milvusはリストの順序を保持するため、<code translate="no">brand</code> が最初のキー構成要素となり、<code translate="no">color</code> が2番目となります。<code translate="no">order</code> で<code translate="no">_key</code> が使用される場合、Milvusは複合キーの構成要素を同じ順序で比較します。複数の文字列は1つのフラットなリストで渡してください。ネストされたリストはサポートされていません。</p>
<p><code translate="no">size=6</code> は、この集計レベルで返される複合バケットの最大数です。サンプルデータには5つの異なるブランドと色の組み合わせが含まれているため、これら5つすべてが返される可能性があります。<a href="#Limits">返されるエントリの制限</a>において、このリクエストは<code translate="no">1 query vector × 6 buckets × 1 = 6</code> で設定された結果エントリを生成します。</p>
<p>1つの<code translate="no">SearchAggregation.fields</code> リスト内の複数のフィールドは、その集計レベルで複合バケットキーを作成します。親子バケット階層を作成するには、<a href="#Group-results-at-multiple-levels">ネストされた集計</a>を使用してください。</p>
<p></details></p>
<p>以下の例では、<code translate="no">aggregation</code> を再定義しています。更新されたオブジェクトを同じ<code translate="no">search_aggregation</code> パラメータに渡して、検索呼び出しを再実行してください。</p>
<h3 id="Show-representative-results-from-each-bucket" class="common-anchor-header">各バケットから代表的な結果を表示する<button data-href="#Show-representative-results-from-each-bucket" class="anchor-icon" translate="no">
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
    </button></h3><p>アプリケーションが各バケットから実際の製品を表示する必要がある場合は、代表的なエンティティを含めます。この例では、Milvus は各ブランドバケットから最大 2 つの製品を、評価順、次にベクトルスコア順で返します。</p>
<p><code translate="no">TopHits</code> を次のように設定します：</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
    fields=[<span class="hljs-string">&quot;brand&quot;</span>],
    size=<span class="hljs-number">3</span>,
<span class="highlighted-comment-line">    <span class="hljs-comment"># Return and sort representative entities for each selected bucket.</span></span>
<span class="highlighted-comment-line">    top_hits=TopHits(</span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># Return up to two entities per bucket.</span></span>
<span class="highlighted-comment-line">        size=<span class="hljs-number">2</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># Apply sort criteria in list order.</span></span>
<span class="highlighted-comment-line">        sort=[</span>
<span class="highlighted-comment-line">            {<span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>},</span>
<span class="highlighted-comment-line">            {<span class="hljs-string">&quot;_score&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>},</span>
<span class="highlighted-comment-line">        ],</span>
<span class="highlighted-comment-line">    ),</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><details></p>
<p><summary>代表的なヒットを含むバケットを表示する</summary></p>
<p>以下のブランドAのバケットは、上記のリクエストから取得され、可読性を高めるためにJSONとしてシリアライズされています。</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand A&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;pk&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.99976646900177</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;fields&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand A&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;running_shoes&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;black&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Runner A1&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">129.99</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;rating&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4.7</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;pk&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.9997048377990723</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;fields&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand A&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;running_shoes&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;blue&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Trail A2&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">139.99</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;rating&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4.6</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<table>
<thead>
<tr><th>パラメータ</th><th>目的</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">top_hits</code></td><td>オプション。この集計レベルにおける代表的なエンティティを設定します。省略された場合、<code translate="no">bucket.hits</code> は空となり、キーごとの候補予算はデフォルトで 1 になります。</td></tr>
<tr><td><code translate="no">TopHits.size</code></td><td>選択された各バケットから最大2つの代表的なエンティティを返し、集計ツリー全体に対してキーごとの候補予算を2に設定します。</td></tr>
<tr><td><code translate="no">TopHits.sort</code></td><td>各バケット内のエンティティを、指定された基準に従って並べ替えます。</td></tr>
</tbody>
</table>
<p>アプリケーションで代表エンティティが必要な場合や、カウントおよびメトリクスでキーごとの候補ウィンドウを広くする必要がある場合は、<code translate="no">top_hits</code> を設定してください。<code translate="no">TopHits.size</code> を大きくすると、候補予算と<a href="#Limits">Limits</a> での最大返却エントリ数の計算値の両方が増加します。</p>
<p><code translate="no">SearchAggregation.order</code> はバケットをソートし、<code translate="no">TopHits.sort</code> は各バケット内の保持されたエンティティをソートします。このソート順によって、<code translate="no">count</code> やメトリクスのために保持された候補が変更されることはありません。<code translate="no">TopHits.sort</code> は、サポートされている比較可能なスカラーフィールド名と、ANNの類似度または距離を表す組み込みの<code translate="no">_score</code> フィールドを受け入れます。Milvusは、<code translate="no">sort</code> のエントリを先頭から末尾へと評価します。 この例では、<code translate="no">rating</code> の値が高い順から低い順に製品を並べ替え、<code translate="no">_score</code> は2つの評価が等しい場合にのみ使用されます。設定で<code translate="no">COSINE</code> が使用されているため、降順の<code translate="no">_score</code> により、類似度の高い製品が最初に配置されます。</p>
<p><code translate="no">metrics</code> や<code translate="no">TopHits.sort</code> で使用されるフィールドは、<code translate="no">output_fields</code> に含まれている必要はありません。Milvus は内部的にそれらのフィールドを取得しますが、<code translate="no">output_fields</code> に明示的にリストされているフィールドのみが、返される各ヒットの<code translate="no">fields</code> マッピングに含まれます。主キーとベクトルスコアは、<code translate="no">AggregationHit.pk</code> および<code translate="no">AggregationHit.score</code> を通じて引き続き利用可能です。</p>
<p>返される各<code translate="no">AggregationHit</code> は、<code translate="no">pk</code> でプライマリキーを、<code translate="no">score</code> でベクトルスコアを、<code translate="no">fields</code> で要求された出力フィールドを公開します。</p>
<h3 id="Group-results-at-multiple-levels" class="common-anchor-header">複数のレベルで結果をグループ化する<button data-href="#Group-results-at-multiple-levels" class="anchor-icon" translate="no">
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
    </button></h3><p>あるレベル内のバケットを別のレベル内に配置する必要がある場合は、ネストされた集計を使用します。この例では、Milvusはまずカテゴリバケットを作成し、その後、各カテゴリ内にブランドバケットを作成します。</p>
<p>子集計には、その親バケットに割り当てられたエンティティのみが渡されます。<code translate="no">fields</code> は各集計レベルでのバケットキーを制御し、<code translate="no">sub_aggregation</code> は親子階層を作成します。</p>
<p>以下の設定では、キーが<code translate="no">(running_shoes)</code> であるカテゴリ・バケットが作成されます。その親バケット内で、子集計により、<code translate="no">(Brand A)</code> 、<code translate="no">(Brand B)</code> 、<code translate="no">(Brand C)</code> といったキーを持つ個別のブランド・バケットが作成されます。</p>
<pre><code translate="no" class="language-text">Parent bucket key:
(running_shoes)

Child bucket keys:
├── (Brand A)
├── (Brand B)
└── (Brand C)
<button class="copy-code-btn"></button></code></pre>
<p>各レベルでは、複数のフィールドを独立して使用できます。たとえば、子アグリゲーションで `<code translate="no">fields=[&quot;brand&quot;, &quot;color&quot;]</code> ` を使用すると、`<code translate="no">(Brand A, black)</code>` のような複合子キーが生成されます。</p>
<p>以下の設定により、この階層構造が実装されます：</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
    fields=[<span class="hljs-string">&quot;category&quot;</span>],
    size=<span class="hljs-number">2</span>,
    metrics={
        <span class="hljs-string">&quot;product_count&quot;</span>: {<span class="hljs-string">&quot;count&quot;</span>: <span class="hljs-string">&quot;*&quot;</span>},
        <span class="hljs-string">&quot;avg_price&quot;</span>: {<span class="hljs-string">&quot;avg&quot;</span>: <span class="hljs-string">&quot;price&quot;</span>},
    },
    order=[{<span class="hljs-string">&quot;product_count&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>}],
<span class="highlighted-comment-line">    <span class="hljs-comment"># For each category bucket, group only its entities by brand.</span></span>
<span class="highlighted-comment-line">    sub_aggregation=SearchAggregation(</span>
<span class="highlighted-comment-line">        fields=[<span class="hljs-string">&quot;brand&quot;</span>],</span>
<span class="highlighted-comment-line">        size=<span class="hljs-number">3</span>,</span>
<span class="highlighted-comment-line">        metrics={</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;brand_count&quot;</span>: {<span class="hljs-string">&quot;count&quot;</span>: <span class="hljs-string">&quot;*&quot;</span>},</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;avg_rating&quot;</span>: {<span class="hljs-string">&quot;avg&quot;</span>: <span class="hljs-string">&quot;rating&quot;</span>},</span>
<span class="highlighted-comment-line">        },</span>
<span class="highlighted-comment-line">        order=[{<span class="hljs-string">&quot;avg_rating&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>}],</span>
<span class="highlighted-comment-line">        top_hits=TopHits(</span>
<span class="highlighted-comment-line">            size=<span class="hljs-number">2</span>,</span>
<span class="highlighted-comment-line">            sort=[{<span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>}],</span>
<span class="highlighted-comment-line">        ),</span>
<span class="highlighted-comment-line">    ),</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><details></p>
<p><summary>ネストされたバケットの結果を表示する</summary></p>
<p>以下のシリアライズされた抜粋は、親バケット「<code translate="no">running_shoes</code> 」とその子バケット「Brand B」を示しています。簡潔にするため、「Brand A」および「Brand C」の子バケットは省略されています。</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">104</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;category&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;running_shoes&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;avg_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">137.49</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;product_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand B&quot;</span>
        <span class="hljs-punctuation">}</span>
      <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;avg_rating&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4.8</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;brand_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span>
      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;pk&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">3</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.9994542598724365</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;fields&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand B&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;running_shoes&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;white&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Runner B1&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">159.99</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;rating&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4.8</span>
          <span class="hljs-punctuation">}</span>
        <span class="hljs-punctuation">}</span>
      <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>表示された結果は、単一の複合バケットキー<code translate="no">(running_shoes, Brand B)</code> ではなく、バケットパス<code translate="no">(running_shoes) → (Brand B)</code> を表しています。</p>
<p>Milvusはまず、<code translate="no">product_count</code> の順に最大2つのカテゴリバケットを選択します。次に、選択された各カテゴリ内で<code translate="no">sub_aggregation</code> を個別に実行し、<code translate="no">avg_rating</code> の順に最大3つのブランドバケットを返します。</p>
<p>上記の出力において：</p>
<ul>
<li>ルート<code translate="no">running_shoes</code> バケットには、その子コンポジットキー全体にわたって4つの保持候補が含まれています。その<code translate="no">metrics</code> には、ルートレベルの<code translate="no">avg_price</code> および<code translate="no">product_count</code> の値が含まれています。</li>
<li>ルートバケットの<code translate="no">sub_groups</code> リストには、子ブランドバケットが含まれています。表示されているブランドBバケットには、1つの保持候補と、それ自体の<code translate="no">avg_rating</code> および<code translate="no">brand_count</code> 値が含まれています。</li>
<li>ルートバケットの<code translate="no">hits</code> リストが空なのは、ルート集計で<code translate="no">top_hits</code> が設定されていないためです。ブランドBの子バケットには代表的なヒットが含まれていますが、これは<code translate="no">sub_aggregation</code> で<code translate="no">top_hits</code> が設定されているためです。</li>
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
    </button></h2><h3 id="How-accurate-are-bucket-counts-and-metrics" class="common-anchor-header">バケットのカウント数やメトリクスの精度はどの程度ですか？<button data-href="#How-accurate-are-bucket-counts-and-metrics" class="anchor-icon" translate="no">
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
    </button></h3><p>検索集計は、保持された ANN 候補を要約するものです。コレクション全体の集計は実行されません。</p>
<p>候補の保持には 2 つの近似段階があります。ANN 検索では関連するコレクションエンティティが除外される可能性があり、グループ化段階では、各完全複合キーに対して最大で<code translate="no">TopHits.size</code> の候補が保持されます。<code translate="no">top_hits</code> が設定されているレベルがない場合、このキーごとの上限は 1 となります。</p>
<p>たとえば、あるコレクションにブランドAの製品が5,000件含まれており、その多くがベクトルクエリに関連していると仮定します。集計で<code translate="no">TopHits(size=4)</code> が使用されている場合、ブランドAのバケットは、完全な複合キーに対して最大4つの候補のみを保持できます。その<code translate="no">count</code> およびメトリクスは、保持されたそれらの候補を表しており、関連するすべてのブランドA製品や、コレクション内の5,000件のエンティティすべてを表しているわけではありません。</p>
<p>近似値が最も重要になるのは、<code translate="no">order</code> でメトリックエイリアスが使用される場合です。検索のリコール率の変化によりメトリックの値が変化し、その結果、<code translate="no">SearchAggregation.size</code> に収まるバケットが変わる可能性があります。ネストされた集計では、各子レベルが親バケット内で利用可能なエンティティに対して処理を行うため、この影響がさらに増幅される可能性があります。</p>
<p>一致するすべてのエンティティについて正確な統計情報を必要とする場合は、検索集計の代わりに「正確なクエリ集計」ワークフローを使用してください。</p>
<h3 id="How-does-Search-Aggregation-differ-from-Grouping-Search" class="common-anchor-header">検索集計とグループ化検索の違いは何ですか？<button data-href="#How-does-Search-Aggregation-differ-from-Grouping-Search" class="anchor-icon" translate="no">
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
    </button></h3><p>アプリケーションの主な結果の形状に基づいて選択してください：</p>
<table>
<thead>
<tr><th>主な要件</th><th>推奨</th><th>利用すべき結果</th></tr>
</thead>
<tbody>
<tr><td>グループ化フィールド内の重複値が少なく、標準的な順位付けされたエンティティリストを返す</td><td><a href="/docs/ja/grouping-search.md">グループ化検索</a></td><td>各クエリベクトルに対するフラットな検索ヒット</td></tr>
<tr><td>グループをバケットとして、キー、カウント、メトリクス、順序、代表的なヒット、または子バケットを用いて検査または比較する</td><td>検索集計</td><td><code translate="no">AggregationBucket</code> オブジェクト<code translate="no">result.agg_buckets</code></td></tr>
</tbody>
</table>
<p>検索集計で<code translate="no">top_hits</code> が設定されている場合でも、その主なレスポンスはバケットツリーのままです。アプリケーションがすでに通常の検索ヒットを処理しており、主に結果の多様性を求めている場合には、グループ化検索が有用です。</p>
<p>これらのAPIは相互に排他的です。同じリクエスト内で<code translate="no">search_aggregation</code> と<code translate="no">group_by_field</code> または<code translate="no">group_by_fields</code> を組み合わせて使用すると、PyMilvusは<code translate="no">ParamError</code> を発生させます。</p>
