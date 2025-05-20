---
id: clustering-compaction.md
title: クラスタリング・コンパクション
related_key: 'clustering, compaction'
summary: >-
  クラスタリング・コンパクションは、大規模なコレクションの検索パフォーマンスを向上させ、コストを削減するために設計されています。このガイドでは、クラスタリング・コンパクションと、この機能による検索パフォーマンスの向上について説明します。
---
<h1 id="Clustering-Compaction" class="common-anchor-header">クラスタリング・コンパクション<button data-href="#Clustering-Compaction" class="anchor-icon" translate="no">
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
    </button></h1><p>クラスタリング・コンパクションは、大規模なコレクションの検索パフォーマンスを向上させ、コストを削減するために設計されています。このガイドでは、クラスタリング・コンパクションと、この機能による検索パフォーマンスの向上について説明します。</p>
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
    </button></h2><p>Milvusは入力されたエンティティをコレクション内のセグメントに格納し、セグメントが一杯になるとそのセグメントを封印します。この場合、追加のエンティティを収容するために新しいセグメントが作成されます。その結果、エンティティはセグメント間で任意に分散される。この分散によって、Milvus は複数のセグメントを検索して、与えられたクエリベクトルに最も近いものを見つける必要がある。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/clustering-compaction.png" alt="Without clustering Compaction" class="doc-image" id="without-clustering-compaction" />
   </span> <span class="img-wrapper"> <span>クラスタリングなしの場合</span> </span></p>
<p>Milvus が特定のフィールドの値に基づいてエンティティをセグメント間に分散させることができれば、検索範囲をセグメント内に制限することができ、検索性能が向上します。</p>
<p><strong>クラスタリングコンパクションは</strong>Milvusの機能で、スカラーフィールドの値に基づいてコレクション内のセグメント間でエンティティを再分配します。この機能を有効にするには、まず<strong>クラスタリングキーとして</strong>スカラーフィールドを選択する必要があります。これにより、Milvusはクラスタリングキーの値が特定の範囲内にあるエンティティをセグメントに再分配することができます。クラスタリングコンパクションをトリガーすると、Milvusは<strong>PartitionStatsと</strong>呼ばれるグローバルインデックスを生成/更新し、セグメントとクラスタリングキー値のマッピング関係を記録します。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/clustering-compaction-2.png" alt="With Clustering Compaction" class="doc-image" id="with-clustering-compaction" />
   </span> <span class="img-wrapper"> <span>クラスタリングコンパクションの場合</span> </span></p>
<p><strong>PartitionStatsを</strong>参照することで、Milvusはクラスタリングキー値を持つ検索/クエリリクエストを受信した際に無関係なデータを削除し、その値にマッピングされるセグメント内で検索範囲を制限することができ、検索パフォーマンスを向上させることができます。性能向上の詳細については、ベンチマークテストを参照してください。</p>
<h2 id="Use-Clustering-Compaction" class="common-anchor-header">クラスタリング・コンパクションの使用<button data-href="#Use-Clustering-Compaction" class="anchor-icon" translate="no">
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
    </button></h2><p>MilvusのClustering Compaction機能は高度な設定が可能です。手動で起動させることも、Milvusが一定間隔で自動的に起動させるように設定することもできます。クラスタリングコンパクションを有効にするには、次のようにします：</p>
<h3 id="Global-Configuration" class="common-anchor-header">グローバル設定</h3><p>Milvusの設定ファイルを以下のように変更する必要があります。</p>
<pre><code translate="no" class="language-yaml">dataCoord:
  compaction:
    clustering:
      <span class="hljs-built_in">enable</span>: <span class="hljs-literal">true</span> 
      autoEnable: <span class="hljs-literal">false</span> 
      triggerInterval: 600 
      minInterval: 3600 
      maxInterval: 259200 
      newDataSizeThreshold: 512m 
      <span class="hljs-built_in">timeout</span>: 7200
     
queryNode:
  enableSegmentPrune: <span class="hljs-literal">true</span> 

datanode:
  clusteringCompaction:
    memoryBufferRatio: 0.1 
    workPoolSize: 8  
common:
  usePartitionKeyAsClusteringKey: <span class="hljs-literal">true</span> 
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p><code translate="no">dataCoord.compaction.clustering</code></p>
<table>
<thead>
<tr><th>設定項目</th><th>設定項目</th><th>デフォルト値</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">enable</code></td><td>クラスタリングコンパクションを有効にするかどうかを指定します。<br>クラスタリングキーを持つすべてのコレクションでこの機能を有効にする必要がある場合は、<code translate="no">true</code> に設定します。</td><td><code translate="no">false</code></td></tr>
<tr><td><code translate="no">autoEnable</code></td><td>自動的にトリガーされるコンパクションを有効にするかどうかを指定します。<br>これを<code translate="no">true</code> に設定すると、Milvusは指定された間隔でクラスタリングキーを持つコレクションを圧縮します。</td><td><code translate="no">false</code></td></tr>
<tr><td><code translate="no">triggerInterval</code></td><td>Milvusがクラスタリング圧縮を開始する間隔をミリ秒単位で指定します。<br>このパラメータは<code translate="no">autoEnable</code> が<code translate="no">true</code> に設定されている場合のみ有効です。</td><td>-</td></tr>
<tr><td><code translate="no">minInterval</code></td><td>最小間隔を秒単位で指定します。<br>このパラメータは<code translate="no">autoEnable</code> が<code translate="no">true</code> に設定されている場合のみ有効です。<br>triggerIntervalより大きい整数に設定することで、短時間に繰り返しコンパクションが行われるのを防ぐことができます。</td><td>-</td></tr>
<tr><td><code translate="no">maxInterval</code></td><td>最大間隔を秒単位で指定する。<br>このパラメータは、<code translate="no">autoEnable</code> が<code translate="no">true</code> に設定されている場合のみ有効です。<br>Milvusは、コレクションがこの値よりも長い期間クラスタリング圧縮されていないことを検出すると、強制的にクラスタリング圧縮を行います。</td><td>-</td></tr>
<tr><td><code translate="no">newDataSizeThreshold</code></td><td>クラスタリング圧縮をトリガする上限しきい値を指定します。<br>このパラメータは、<code translate="no">autoEnable</code> が<code translate="no">true</code> に設定されている場合にのみ有効です。<br>Milvusはコレクションのデータ量がこの値を超えたことを検出すると、クラスタリングコンパクションプロセスを開始します。</td><td>-</td></tr>
<tr><td><code translate="no">timeout</code></td><td>クラスタリングコンパクションのタイムアウト時間を指定します。<br>実行時間がこの値を超えると、クラスタリングコンパクションは失敗します。</td><td>-</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">queryNode</code></p>
<table>
<thead>
<tr><th>設定項目</th><th>説明</th><th>デフォルト値</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">enableSegmentPrune</code></td><td>Milvusが検索/クエリ要求を受信した際に、PartitionStatsを参照してデータをプルーンするかどうかを指定します。<br>これを<code translate="no">true</code> に設定すると、Milvus は検索/クエリ要求時にセグメントから無関係なデータを削除します。</td><td><code translate="no">false</code></td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">dataNode.clusteringCompaction</code></p>
<table>
<thead>
<tr><th>設定項目</th><th>設定項目</th><th>デフォルト値</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">memoryBufferRatio</code></td><td>クラスタリング圧縮タスクのメモリバッファ比率を指定します。 <br>Milvusは、データサイズがこの比率を使用して計算された割り当てバッファサイズを超えると、データをフラッシュします。</td><td>-</td></tr>
<tr><td><code translate="no">workPoolSize</code></td><td>クラスタリング・コンパクション・タスクのワーカープールサイズを指定します。</td><td>-</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">common</code></p>
<table>
<thead>
<tr><th>設定項目</th><th>設定項目</th><th>デフォルト値</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">usePartitionKeyAsClusteringKey</code></td><td>コレクション内のパーティション・キーをクラスタリング・キーとして使用するかどうかを指定します。<br>これを<code translate="no">true</code> に設定すると、パーティション・キーがクラスタリング・キーとして使用されます。<br>クラスタリング・キーを明示的に設定することで、コレクション内のこの設定を常に上書きできます。</td><td><code translate="no">false</code></td></tr>
</tbody>
</table>
</li>
</ul>
<p>上記の変更をMilvusクラスタに適用するには、<a href="/docs/ja/v2.4.x/configure-helm.md">Configure Milvus with Helm</a>および<a href="/docs/ja/v2.4.x/configure_operator.md">Configure Milvus with Milvus Operatorsの</a>手順に従ってください。</p>
<h3 id="Collection-Configuration" class="common-anchor-header">コレクションの構成</h3><p>特定のコレクションでクラスタリングコンパクトを行うには、コレクションからスカラフィールドをクラスタリングキーとして選択する必要があります。</p>
<pre><code translate="no" class="language-python">default_fields = [
    FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>),
    FieldSchema(name=<span class="hljs-string">&quot;key&quot;</span>, dtype=DataType.INT64, is_clustering_key=<span class="hljs-literal">True</span>),
    FieldSchema(name=<span class="hljs-string">&quot;var&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>, is_primary=<span class="hljs-literal">False</span>),
    FieldSchema(name=<span class="hljs-string">&quot;embeddings&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=dim)
]

default_schema = CollectionSchema(
    fields=default_fields, 
    description=<span class="hljs-string">&quot;test clustering-key collection&quot;</span>
)

coll1 = Collection(name=<span class="hljs-string">&quot;clustering_test&quot;</span>, schema=default_schema)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><code translate="no">Int8</code>,<code translate="no">Int16</code>,<code translate="no">Int32</code>,<code translate="no">Int64</code>,<code translate="no">Float</code>,<code translate="no">Double</code>, および<code translate="no">VarChar</code>.</p>
</div>
<h2 id="Trigger-Clustering-Compaction" class="common-anchor-header">クラスタリング・コンパクションのトリガ<button data-href="#Trigger-Clustering-Compaction" class="anchor-icon" translate="no">
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
    </button></h2><p>自動クラスタリングコンパクションを有効にしている場合、Milvusは指定された間隔で自動的にコンパクションをトリガします。または、次のように手動でコンパクションをトリガすることもできます：</p>
<pre><code translate="no" class="language-python">coll1.compact(is_clustering=<span class="hljs-literal">True</span>)
coll1.get_compaction_state(is_clustering=<span class="hljs-literal">True</span>)
coll1.wait_for_compaction_completed(is_clustering=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Benchmark-Test" class="common-anchor-header">ベンチマークテスト</h3><p>データ量とクエリパターンの組み合わせにより、クラスタリングコンパクションがもたらすパフォーマンスの向上が決まります。社内のベンチマーク・テストでは、クラスタリング・コンパクションによって1秒あたりのクエリ数（QPS）が最大25倍向上することが実証されています。</p>
<p>このベンチマークテストは、2,000万、768次元のLAIONデータセットから、キーフィールドをクラスタリングキーとして指定したエンティティを含むコレクションを対象としたものです。コレクション内でクラスタリング圧縮がトリガーされた後、CPU使用率が高水準に達するまで同時検索が送信される。</p>
<table>
  <thead>
    <tr>
      <th rowspan="2">検索フィルター</th>
      <th rowspan="2">プルーンの比率</th>
      <th colspan="5">待ち時間 (ms)</th>
      <th rowspan="2">QPS (reqs/s)</th>
    </tr>
    <tr>
      <th>平均</th>
      <th>最小</th>
      <th>最大</th>
      <th>中央値</th>
      <th>TP99</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>なし</td>
      <td>0%</td>
      <td>1685</td>
      <td>672</td>
      <td>2294</td>
      <td>1710</td>
      <td>2291</td>
      <td>17.75</td>
    </tr>
    <tr>
      <td>キー &gt; 200 および キー &lt; 800</td>
      <td>40.2%</td>
      <td>1045</td>
      <td>47</td>
      <td>1828</td>
      <td>1085</td>
      <td>1617</td>
      <td>28.38</td>
    </tr>
    <tr>
      <td>キー＞200かつキー＜600</td>
      <td>59.8%</td>
      <td>829</td>
      <td>45</td>
      <td>1483</td>
      <td>882</td>
      <td>1303</td>
      <td>35.78</td>
    </tr>
    <tr>
      <td>キー &gt; 200 かつ キー &lt; 400</td>
      <td>79.5%</td>
      <td>550</td>
      <td>100</td>
      <td>985</td>
      <td>584</td>
      <td>898</td>
      <td>54.00</td>
    </tr>
    <tr>
      <td>キー== 1000</td>
      <td>99%</td>
      <td>68</td>
      <td>24</td>
      <td>1273</td>
      <td>70</td>
      <td>246</td>
      <td>431.41</td>
    </tr>
  </tbody>
</table>
<p>検索フィルターで検索範囲を狭めると、プルーンの比率が高くなる。これは、検索プロセスでより多くのエンティティがスキップされることを意味します。最初の行と最後の行の統計値を比較すると、クラスタリング・コンパクションなしの検索では、コレクション全体をスキャンする必要があることがわかります。一方、特定のキーを使用してクラスタリング・コンパクションを行う検索では、最大25倍の改善が得られます。</p>
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
    </button></h2><p>クラスタリングコンパクションを効率的に使用するためのヒントをいくつか紹介します：</p>
<ul>
<li><p>データ・ボリュームの大きいコレクションでこれを有効にする。 コレクションのデータ・ボリュームが大きくなると、検索パフォーマンスが向上します。100万エンティティを超えるコレクションでは、この機能を有効にすることをお勧めします。</p></li>
<li><p>適切なクラスタリングキーを選択します。 フィルタリング条件として一般的に使用されるスカラーフィールドをクラスタリングキーとして使用できます。複数のテナントからのデータを保持するコレクションでは、あるテナントと別のテナントを区別するフィールドをクラスタリ ング・キーとして使用できます。</p></li>
<li><p>パーティションキーをクラスタリングキーとして使用する milvusインスタンスのすべてのコレクションでこの機能を有効にしたい場合、またはパーティションキーを持つ大規模なコレクションでパフォーマンスの問題にまだ直面している場合は、<code translate="no">common.usePartitionKeyAsClusteringKey</code> を true に設定できます。そうすることで、コレクション内のスカラーフィールドをパーティションキーとして選択した場合、クラスタリングキーとパーティションキーを持つことになります。</p>
<p>この設定は、別のスカラー・フィールドをクラスタリング・キーとして選択することを妨げるものではありません。明示的に指定されたクラスタリング・キーが常に優先されます。</p></li>
</ul>
