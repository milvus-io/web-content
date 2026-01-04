---
id: elasticsearch-queries-to-milvus.md
title: Elasticsearchクエリからmilvusへ
summary: >-
  Apache Lucene をベースに構築された Elasticsearch
  は、オープンソースの代表的な検索エンジンです。しかし、高い更新コスト、劣悪なリアルタイム性能、非効率的なシャード管理、非クラウドネイティブデザイン、過剰なリソース要求など、最新のAIアプリケーションにおける課題に直面しています。Milvusは、クラウドネイティブなベクトルデータベースとして、ストレージとコンピューティングの分離、高次元データの効率的なインデックス作成、最新のインフラとのシームレスな統合により、これらの問題を克服します。AIワークロードに優れたパフォーマンスとスケーラビリティを提供します。
---
<h1 id="Elasticsearch-Queries-to-Milvus" class="common-anchor-header">Elasticsearchクエリからmilvusへ<button data-href="#Elasticsearch-Queries-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>Apache Luceneをベースに構築されたElasticsearchは、オープンソースの代表的な検索エンジンです。しかし、高い更新コスト、劣悪なリアルタイム性能、非効率的なシャード管理、非クラウドネイティブ設計、過剰なリソース要求など、最新のAIアプリケーションでは課題に直面しています。Milvusは、クラウドネイティブなベクトルデータベースとして、ストレージとコンピューティングの分離、高次元データの効率的なインデックス作成、最新のインフラとのシームレスな統合により、これらの問題を克服します。AIワークロードに優れたパフォーマンスとスケーラビリティを提供する。</p>
<p>この記事では、ElasticsearchからMilvusへのコードベースの移行を促進することを目的とし、その間にクエリを変換する様々な例を提供します。</p>
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
    </button></h2><p>Elasticsearch では、クエリコンテキストでの操作は関連性スコアを生成するが、フィルタコンテキストでの操作は関連性スコアを生成しない。同様に、Milvusの検索は類似度スコアを生成しますが、フィルタのようなクエリは生成しません。ElasticsearchからMilvusにコードベースを移行する場合、Elasticsearchのクエリコンテキストで使用されているフィールドをベクターフィールドに変換し、類似度スコアを生成できるようにすることが重要です。</p>
<p>以下の表はElasticsearchのクエリパターンとMilvusでの対応するクエリパターンの概要です。</p>
<table>
   <tr>
     <th><p>Elasticsearch クエリ</p></th>
     <th><p>Milvusでの同等物</p></th>
     <th><p>備考</p></th>
   </tr>
   <tr>
     <td colspan="3"><p><strong>フルテキストクエリ</strong></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/v2.5.x/elasticsearch-queries-to-milvus.md#Match-query">マッチクエリ</a></p></td>
     <td><p>全文検索</p></td>
     <td><p>どちらも同様の機能を提供する。</p></td>
   </tr>
   <tr>
     <td colspan="3"><p><strong>用語レベルクエリ</strong></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/v2.5.x/elasticsearch-queries-to-milvus.md#IDs">ID</a></p></td>
     <td><p><code translate="no">in</code> 演算子</p></td>
     <td rowspan="6"><p>これらの Elasticsearch クエリがフィルタコンテキストで使用される場合、どちらも同じか類似の機能セットを提供します。</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/v2.5.x/elasticsearch-queries-to-milvus.md#Prefix-query">プレフィックスクエリ</a></p></td>
     <td><p><code translate="no">like</code> 演算子</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/v2.5.x/elasticsearch-queries-to-milvus.md#Range-query">範囲クエリ</a></p></td>
     <td><p><code translate="no">&gt;</code>,<code translate="no">&lt;</code>,<code translate="no">&gt;=</code>, のような比較演算子<code translate="no">&lt;=</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/v2.5.x/elasticsearch-queries-to-milvus.md#Term-query">タームクエリ</a></p></td>
     <td><p>のような比較演算子<code translate="no">==</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/v2.5.x/elasticsearch-queries-to-milvus.md#Terms-query">用語クエリ</a></p></td>
     <td><p><code translate="no">in</code> 演算子</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/v2.5.x/elasticsearch-queries-to-milvus.md#Wildcard-query">ワイルドカード・クエリー</a></p></td>
     <td><p><code translate="no">like</code> 演算子</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/v2.5.x/elasticsearch-queries-to-milvus.md#Boolean-query">ブール演算子</a></p></td>
     <td><p>などの論理演算子<code translate="no">AND</code></p></td>
     <td><p>どちらも、フィルタコンテキストで使用すると、同様の機能を提供します。</p></td>
   </tr>
   <tr>
     <td colspan="3"><p><strong>ベクトルクエリ</strong></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/v2.5.x/elasticsearch-queries-to-milvus.md#Knn-query">kNNクエリ</a></p></td>
     <td><p>検索</p></td>
     <td><p>Milvusはより高度なベクトル検索機能を提供します。</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/v2.5.x/elasticsearch-queries-to-milvus.md#Reciprocal-rank-fusion">逆ランクフュージョン</a></p></td>
     <td><p>ハイブリッド検索</p></td>
     <td><p>Milvusは複数の再ランク付け戦略をサポートします。</p></td>
   </tr>
</table>
<h2 id="Full-text-queries" class="common-anchor-header">フルテキストクエリ<button data-href="#Full-text-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>Elasticsearch では、フルテキストクエリによってメール本文のような分析されたテキストフィールドを検索することができます。クエリ文字列はインデックス作成時にフィールドに適用されたものと同じアナライザーを使って処理されます。</p>
<h3 id="Match-query" class="common-anchor-header">マッチクエリ<button data-href="#Match-query" class="anchor-icon" translate="no">
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
    </button></h3><p>Elasticsearch では、マッチクエリは指定されたテキスト、数値、日付、ブール値にマッチするドキュメントを返します。指定されたテキストはマッチする前に分析されます。</p>
<p>以下はマッチクエリを使った Elasticsearch 検索リクエストの例です。</p>
<pre><code translate="no" class="language-bash">resp = client.search(
    query={
        <span class="hljs-string">&quot;match&quot;</span>: {
            <span class="hljs-string">&quot;message&quot;</span>: {
                <span class="hljs-string">&quot;query&quot;</span>: <span class="hljs-string">&quot;this is a test&quot;</span>
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>milvusでは、全文検索機能により同様の機能を提供しています。上記のElasticsearchクエリをMilvusに変換すると以下のようになります：</p>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[<span class="hljs-string">&#x27;How is the weather in Jamaica?&#x27;</span>],
    anns_field=<span class="hljs-string">&quot;message_sparse&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;message&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>上記の例では、<code translate="no">message_sparse</code> は<code translate="no">message</code> という VarChar フィールドから派生したスパースベクトルフィールドです。Milvus は BM25 埋め込みモデルを使用して、<code translate="no">message</code> フィールドの値をスパースベクトル埋め込みに変換し、<code translate="no">message_sparse</code> フィールドに格納します。検索要求を受信すると、Milvusは同じBM25モデルを使用してプレーンテキストのクエリペイロードを埋め込み、スパースベクトル検索を実行し、<code translate="no">output_fields</code> パラメータで指定された<code translate="no">id</code> 、<code translate="no">message</code> フィールドを対応する類似度スコアとともに返します。</p>
<p>この機能を使用するには、<code translate="no">message</code> フィールドのアナライザを有効にし、そこから<code translate="no">message_sparse</code> フィールドを導出する関数を定義する必要があります。Milvusでアナライザーを有効にし、派生関数を作成する詳細な手順については、<a href="/docs/ja/v2.5.x/full-text-search.md">全文検索を</a>参照してください。</p>
<h2 id="Term-level-queries" class="common-anchor-header">タームレベルクエリ<button data-href="#Term-level-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>Elasticsearch では、日付範囲、IP アドレス、価格、商品 ID などの構造化データの正確な値に基づいてドキュメントを検索するために、用語レベルクエリが使用されます。このセクションでは、Elasticsearch のタームレベルクエリに相当する Milvus のクエリを紹介します。このセクションの全ての例は、Milvusの機能に合わせてフィルタコンテキスト内で動作するように調整されています。</p>
<h3 id="IDs" class="common-anchor-header">ID<button data-href="#IDs" class="anchor-icon" translate="no">
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
    </button></h3><p>Elasticsearchでは、以下のようにフィルタコンテキスト内でIDに基づいて文書を検索することができる：</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;ids&quot;</span>: {
                    <span class="hljs-string">&quot;values&quot;</span>: [
                        <span class="hljs-string">&quot;1&quot;</span>,
                        <span class="hljs-string">&quot;4&quot;</span>,
                        <span class="hljs-string">&quot;100&quot;</span>
                    ]
                }            
            }
        }
    },
)
<button class="copy-code-btn"></button></code></pre>
<p>Milvusでも以下のようにIDを元にエンティティを検索することができます：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Use the filter parameter</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;id in [1, 4, 100]&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>]
)

<span class="hljs-comment"># Use the ids parameter</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    ids=[<span class="hljs-number">1</span>, <span class="hljs-number">4</span>, <span class="hljs-number">100</span>],
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>Elasticsearch のサンプルは<a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-ids-query.html">こちらの</a>ページにあります。Milvusにおけるqueryとgetリクエスト、およびフィルタ式の詳細については、<a href="/docs/ja/v2.5.x/get-and-scalar-query.md">クエリと</a> <a href="/docs/ja/v2.5.x/filtering">フィルタリングを</a>参照してください。</p>
<h3 id="Prefix-query" class="common-anchor-header">プレフィックスクエリ<button data-href="#Prefix-query" class="anchor-icon" translate="no">
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
    </button></h3><p>Elasticsearch では、以下のようにフィルタコンテキストで指定したフィールドに特定の接頭辞を含む文書を検索することができます：</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                 <span class="hljs-string">&quot;prefix&quot;</span>: {
                    <span class="hljs-string">&quot;user&quot;</span>: {
                        <span class="hljs-string">&quot;value&quot;</span>: <span class="hljs-string">&quot;ki&quot;</span>
                    }
                }           
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>Milvus では、以下のように指定したプレフィックスで始まる値を持つエンティティを見つけることができます：</p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;user like &quot;ki%&quot;&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>Elasticsearch の例は<a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-prefix-query.html">この</a>ページにあります。Milvus の<code translate="no">like</code> 演算子の詳細については、<a href="/docs/ja/v2.5.x/basic-operators.md#Example-2-Using-LIKE-for-Pattern-Matching"> パターンマッチングのための</a><code translate="no">LIKE</code><a href="/docs/ja/v2.5.x/basic-operators.md#Example-2-Using-LIKE-for-Pattern-Matching"> の</a> <a href="/docs/ja/v2.5.x/basic-operators.md#Example-2-Using-LIKE-for-Pattern-Matching">使用 </a>を参照してください。</p>
<h3 id="Range-query" class="common-anchor-header">範囲指定クエリ<button data-href="#Range-query" class="anchor-icon" translate="no">
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
    </button></h3><p>Elasticsearchでは、以下のように指定した範囲内の用語を含む文書を検索することができます：</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;range&quot;</span>: {
                    <span class="hljs-string">&quot;age&quot;</span>: {
                        <span class="hljs-string">&quot;gte&quot;</span>: <span class="hljs-number">10</span>,
                        <span class="hljs-string">&quot;lte&quot;</span>: <span class="hljs-number">20</span>
                    }
                }           
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>Milvusでは、以下のように特定のフィールドの値が指定した範囲内にあるエンティティを見つけることができます：</p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;10 &lt;= age &lt;= 20&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>Elasticsearchの例は<a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-range-query.html">こちらの</a>ページにあります。Milvusの比較演算子については、<a href="/docs/ja/v2.5.x/basic-operators.md#Comparison-operators">比較演算子を</a>参照してください。</p>
<h3 id="Term-query" class="common-anchor-header">条件クエリ<button data-href="#Term-query" class="anchor-icon" translate="no">
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
    </button></h3><p>Elasticsearch では、以下のように指定したフィールドに<strong>正確な</strong>用語を含む文書を検索することができます：</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;term&quot;</span>: {
                    <span class="hljs-string">&quot;status&quot;</span>: {
                        <span class="hljs-string">&quot;value&quot;</span>: <span class="hljs-string">&quot;retired&quot;</span>
                    }
                }            
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>Milvusでは、以下のように指定されたフィールドの値が指定された用語と一致するエンティティを検索することができます：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># use ==</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;status==&quot;retired&quot;&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;status&quot;</span>]
)

<span class="hljs-comment"># use TEXT_MATCH</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;TEXT_MATCH(status, &quot;retired&quot;)&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;status&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>Elasticsearchのサンプルは<a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-term-query.html">こちらの</a>ページにあります。Milvusにおける比較演算子の詳細については、<a href="/docs/ja/v2.5.x/basic-operators.md#Comparison-operators">比較演算子を</a>参照してください。</p>
<h3 id="Terms-query" class="common-anchor-header">用語クエリ<button data-href="#Terms-query" class="anchor-icon" translate="no">
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
    </button></h3><p>Elasticsearchでは、以下のように指定したフィールドに1つ以上の<strong>正確な</strong>用語を含むドキュメントを検索することができます：</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;terms&quot;</span>: {
                    <span class="hljs-string">&quot;degree&quot;</span>: [
                        <span class="hljs-string">&quot;graduate&quot;</span>,
                        <span class="hljs-string">&quot;post-graduate&quot;</span>
                    ]
                }        
            }
        }
    }
)

<button class="copy-code-btn"></button></code></pre>
<p>Milvusにはこれと完全に等価なものはありません。しかし、以下のように指定したフィールドの値が指定した用語の一つであるエンティティを見つけることができます：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># use in</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;degree in [&quot;graduate&quot;, &quot;post-graduate&quot;]&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;degree&quot;</span>]
)

<span class="hljs-comment"># use TEXT_MATCH</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;TEXT_MATCH(degree, &quot;graduate post-graduate&quot;)&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;degree&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>Elasticsearchの例は<a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-terms-query.html">こちらの</a>ページにあります。Milvusの範囲演算子については<a href="/docs/ja/v2.5.x/basic-operators.md#Range-operators">範囲演算</a>子を参照してください。</p>
<h3 id="Wildcard-query" class="common-anchor-header">ワイルドカードクエリ<button data-href="#Wildcard-query" class="anchor-icon" translate="no">
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
    </button></h3><p>Elasticsearchでは、以下のようにワイルドカードパターンにマッチする用語を含む文書を検索することができます：</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;wildcard&quot;</span>: {
                    <span class="hljs-string">&quot;user&quot;</span>: {
                        <span class="hljs-string">&quot;value&quot;</span>: <span class="hljs-string">&quot;ki*y&quot;</span>
                    }
                }          
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>Milvusはフィルタリング条件にワイルドカードをサポートしていません。しかし、<code translate="no">like</code> 演算子を使うことで以下のように同様の効果を得ることができます：</p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;user like &quot;ki%&quot; AND user like &quot;%y&quot;&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>Elasticsearchのサンプルは<a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-wildcard-query.html">こちらの</a>ページにあります。Milvusの範囲演算子については<a href="/docs/ja/v2.5.x/basic-operators.md#Range-operators">範囲演算</a>子を参照してください。</p>
<h2 id="Boolean-query" class="common-anchor-header">ブール型クエリ<button data-href="#Boolean-query" class="anchor-icon" translate="no">
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
    </button></h2><p>Elasticsearch において、ブーリアン・クエリとは、他のクエリのブーリアン・コンビネーションにマッチするドキュメントにマッチするクエリです。</p>
<p>以下の例は、<a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html">このページの</a> Elasticsearch ドキュメントにある例を引用しています。このクエリは、名前に<code translate="no">kimchy</code> を含むユーザーを<code translate="no">production</code> タグで返します。</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;term&quot;</span>: {
                    <span class="hljs-string">&quot;user&quot;</span>: <span class="hljs-string">&quot;kimchy&quot;</span>
                }
            },
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;term&quot;</span>: {
                    <span class="hljs-string">&quot;tags&quot;</span>: <span class="hljs-string">&quot;production&quot;</span>
                }
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>Milvusでは、以下のように同様のことができます：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = 

res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;user like &quot;%kimchy%&quot; AND ARRAY_CONTAINS(tags, &quot;production&quot;)&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;tags&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>上記の例では、ターゲットコレクションに<strong>VarChar</strong>型の<code translate="no">user</code> フィールドと<strong>Array</strong>型の<code translate="no">tags</code> フィールドがあると仮定しています。このクエリは、<code translate="no">production</code> タグを持つ、名前に<code translate="no">kimchy</code> を持つユーザーを返します。</p>
<h2 id="Vector-queries" class="common-anchor-header">ベクタークエリ<button data-href="#Vector-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>Elasticsearch では、ベクタークエリとはベクターフィールドに特化したクエリで、セマンティック検索を効率的に行うことができます。</p>
<h3 id="Knn-query" class="common-anchor-header">Knn クエリ<button data-href="#Knn-query" class="anchor-icon" translate="no">
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
    </button></h3><p>Elasticsearch は近似 kNN クエリと厳密なブルートフォース kNN クエリの両方をサポートしています。どちらの方法でも、クエリベクトルに最も近い<em>k 個の</em>ベクトルを、類似度メトリックによって以下のように求めることができます：</p>
<pre><code translate="no" class="language-python">resp = client.search(
    index=<span class="hljs-string">&quot;my-image-index&quot;</span>,
    size=<span class="hljs-number">3</span>,
    query={
        <span class="hljs-string">&quot;knn&quot;</span>: {
            <span class="hljs-string">&quot;field&quot;</span>: <span class="hljs-string">&quot;image-vector&quot;</span>,
            <span class="hljs-string">&quot;query_vector&quot;</span>: [
                -<span class="hljs-number">5</span>,
                <span class="hljs-number">9</span>,
                -<span class="hljs-number">12</span>
            ],
            <span class="hljs-string">&quot;k&quot;</span>: <span class="hljs-number">10</span>
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>Milvusは特殊なベクトルデータベースとして、ベクトル検索を最適化するためにインデックスタイプを使用します。通常、高次元のベクトルデータに対しては近似最近傍（ANN）検索を優先する。FLATインデックスタイプによるブルートフォースkNN検索は正確な結果をもたらすが、時間とリソースを消費する。対照的に、AUTOINDEXや他のインデックスタイプを使用したANN検索は、スピードと精度のバランスをとり、kNNよりも大幅に高速でリソース効率に優れたパフォーマンスを提供する。</p>
<p>Mlivusで上記のベクトルクエリと似たような等価性は次のようになります：</p>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    anns_field=<span class="hljs-string">&quot;image-vector&quot;</span>
    data=[[-<span class="hljs-number">5</span>, <span class="hljs-number">9</span>, -<span class="hljs-number">12</span>]],
    limit=<span class="hljs-number">10</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Elasticsearch の例は<a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-knn-query.html">こちらの</a>ページにあります。MilvusにおけるANN検索の詳細については、<a href="/docs/ja/v2.5.x/single-vector-search.md">Basic ANN Searchを</a>参照してください。</p>
<h3 id="Reciprocal-Rank-Fusion" class="common-anchor-header">相互ランクフュージョン<button data-href="#Reciprocal-Rank-Fusion" class="anchor-icon" translate="no">
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
    </button></h3><p>Elasticsearch は異なる関連性指標を持つ複数の検索結果セットを1つのランク付けされた検索結果セットに統合する Reciprocal Rank Fusion (RRF) を提供しています。</p>
<p>以下の例では、従来の用語ベースの検索とk-nearest neighbors (kNN) ベクトル検索を組み合わせることで、検索の関連性を向上させています：</p>
<pre><code translate="no" class="language-python">client.search(
    index=<span class="hljs-string">&quot;my_index&quot;</span>,
    size=<span class="hljs-number">10</span>,
    query={
        <span class="hljs-string">&quot;retriever&quot;</span>: {
            <span class="hljs-string">&quot;rrf&quot;</span>: {
                <span class="hljs-string">&quot;retrievers&quot;</span>: [
                    {
                        <span class="hljs-string">&quot;standard&quot;</span>: {
                            <span class="hljs-string">&quot;query&quot;</span>: {
                                <span class="hljs-string">&quot;term&quot;</span>: {
                                    <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;shoes&quot;</span>
                                }
                            }
                        }
                    },
                    {
                        <span class="hljs-string">&quot;knn&quot;</span>: {
                            <span class="hljs-string">&quot;field&quot;</span>: <span class="hljs-string">&quot;vector&quot;</span>,
                            <span class="hljs-string">&quot;query_vector&quot;</span>: [<span class="hljs-number">1.25</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3.5</span>],  <span class="hljs-comment"># Example vector; replace with your actual query vector</span>
                            <span class="hljs-string">&quot;k&quot;</span>: <span class="hljs-number">50</span>,
                            <span class="hljs-string">&quot;num_candidates&quot;</span>: <span class="hljs-number">100</span>
                        }
                    }
                ],
                <span class="hljs-string">&quot;rank_window_size&quot;</span>: <span class="hljs-number">50</span>,
                <span class="hljs-string">&quot;rank_constant&quot;</span>: <span class="hljs-number">20</span>
            }
        }
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>この例では、RRFは2つの検索からの結果を組み合わせている：</p>
<ul>
<li><p><code translate="no">text</code> フィールドに<code translate="no">&quot;shoes&quot;</code> という用語を含む文書を検索する標準的な用語ベース検索。</p></li>
<li><p>提供されたクエリベクトルを使った、<code translate="no">vector</code> フィールドに対するkNN検索。</p></li>
</ul>
<p>各検索エンジンは最大50のトップマッチを提供し、それらはRRFによって再ランク付けされ、最終的にトップ10の結果が返される。</p>
<p>Milvusでは、複数のベクターフィールドの検索を組み合わせ、再ランク付け戦略を適用し、組み合わせたリストからトップKの結果を取得することで、同様のハイブリッド検索を実現することができます。MilvusはRRFと重み付きリランカー戦略の両方をサポートしています。詳細は<a href="/docs/ja/v2.5.x/reranking.md">リランキングを</a>参照。</p>
<p>以下は上記のElasticsearchの例をMilvusで非厳格に等価化したものです。</p>
<pre><code translate="no" class="language-python">search_params_dense = {
    <span class="hljs-string">&quot;data&quot;</span>: [[<span class="hljs-number">1.25</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3.5</span>]],
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;vector&quot;</span>,
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}, 
    },
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">100</span>
}

req_dense = ANNSearchRequest(**search_params_dense)

search_params_sparse = {
    <span class="hljs-string">&quot;data&quot;</span>: [<span class="hljs-string">&quot;shoes&quot;</span>],
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;text_sparse&quot;</span>,
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;BM25&quot;</span>,
    }
}

req_sparse = ANNSearchRequest(**search_params_sparse)

res = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    reqs=[req_dense, req_sparse],
    reranker=RRFRanker(),
    limit=<span class="hljs-number">10</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>この例では、Milvusにおけるハイブリッド検索を示します：</p>
<ol>
<li><p><strong>密なベクトル検索</strong>：<code translate="no">vector</code> のフィールドで近似最近傍（ANN）検索を行うために<code translate="no">nprobe</code> を 10 に設定した内積（IP）メトリックを使用する。</p></li>
<li><p><strong>疎ベクトル検索</strong>：<code translate="no">text_sparse</code> 、BM25類似度メトリックを用いる。</p></li>
</ol>
<p>これらの検索結果は別々に実行され、組み合わされ、RRF（Reciprocal Rank Fusion）ランカーを使用して再ランク付けされる。ハイブリッド検索は再ランク付けされたリストから上位10エンティティを返します。</p>
<p>Elasticsearch の RRF ランキングが標準的なテキストベースのクエリと kNN 検索の結果を結合するのとは異なり、Milvus はスパース検索とデンスベクトル検索の結果を結合し、マルチモーダルデータに最適化された独自のハイブリッド検索機能を提供します。</p>
<h2 id="Recap" class="common-anchor-header">まとめ<button data-href="#Recap" class="anchor-icon" translate="no">
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
    </button></h2><p>この記事では、タームレベルクエリ、ブーリアンクエリ、フルテキストクエリ、ベクトルクエリなど、典型的なElasticsearchクエリをMilvusクエリに変換する方法について説明しました。その他の Elasticsearch クエリの変換についてご質問がありましたら、お気軽にお問い合わせください。</p>
