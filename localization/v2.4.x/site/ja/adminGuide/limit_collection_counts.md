---
id: limit_collection_counts.md
title: コレクション数に制限を設ける
---
<h1 id="Limit-Collection-Counts" class="common-anchor-header">コレクション数の制限<button data-href="#Limit-Collection-Counts" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusインスタンスでは、最大65,536コレクションまで可能です。しかし、コレクション数が多すぎるとパフォーマンスに問題が生じる場合があります。そのため、Milvusインスタンスで作成されるコレクションの数を制限することをお勧めします。</p>
<p>このガイドでは、Milvusインスタンス内のコレクション数に制限を設定する方法を説明します。</p>
<p>設定はMilvusインスタンスのインストール方法によって異なります。</p>
<ul>
<li><p>Helm Chartsを使用してインストールしたMilvusインスタンスの場合</p>
<p><code translate="no">values.yaml</code> ファイルの<code translate="no">config</code> セクションに設定を追加します。詳細については、<a href="/docs/ja/v2.4.x/configure-helm.md">Helm Chartsを使用したMilvusの設定を</a>参照してください。</p></li>
<li><p>Docker Composeを使用してインストールしたMilvusインスタンスの場合</p>
<p>Milvusインスタンスの起動に使用した<code translate="no">milvus.yaml</code> ファイルに設定を追加します。詳細については、<a href="/docs/ja/v2.4.x/configure-docker.md">Docker Composeを使用したMilvusの設定を</a>参照してください。</p></li>
<li><p>Operatorを使用してインストールしたMilvusインスタンスの場合</p>
<p><code translate="no">Milvus</code> カスタムリソースの<code translate="no">spec.components</code> セクションに設定を追加します。詳細については、「<a href="/docs/ja/v2.4.x/configure_operator.md">Operatorを使用したMilvusの設定</a>」を参照してください。</p></li>
</ul>
<h2 id="Configuration-options" class="common-anchor-header">構成オプション<button data-href="#Configuration-options" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-yaml">rootCoord:
    maxGeneralCapacity: 65536
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">maxGeneralCapacity</code> パラメータは、現在のMilvusインスタンスが保持できるコレクションの最大数を設定します。デフォルト値は<code translate="no">65536</code> です。</p>
<h2 id="Calculating-the-number-of-collections" class="common-anchor-header">コレクション数の計算<button data-href="#Calculating-the-number-of-collections" class="anchor-icon" translate="no">
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
    </button></h2><p>コレクションでは、複数のシャードとパーティションを設定できます。シャードは、データの書き込み操作を複数のデータノードに分散するために使用される論理単位です。パーティションは、コレクションデータのサブセットのみをロードすることで、データ 検索の効率を向上させるために使用される論理単位です。現在のMilvusインスタンスのコレクション数を計算する場合、シャードとパーティションも数える必要があります。</p>
<p>例えば、すでに<strong>100</strong>コレクションを作成し、そのうちの<strong>60</strong>コレクションに<strong>2</strong>シャードと<strong>4</strong>パーティションがあり、残りの<strong>40</strong>コレクションに<strong>1</strong>シャードと<strong>12</strong>パーティションがあるとします。現在のコレクション数は次のように計算できます：</p>
<pre><code translate="no">60 (collections) x 2 (shards) x 4 (partitions) + 40 (collections) x 1 (shard) x 12 (partitions) = 960
<button class="copy-code-btn"></button></code></pre>
<p>上記の例では、デフォルトの制限のうち<strong>960を</strong>すでに使用しています。ここで、<strong>4つの</strong>シャードと<strong>20の</strong>パーティションで新しいコレクションを作成しようとすると、コレクションの合計数が最大容量を超えるため、次のようなエラープロンプトが表示されます：</p>
<pre><code translate="no" class="language-shell">failed checking constraint: sum_collections(parition*shard) exceeding the <span class="hljs-built_in">max</span> general capacity:
<button class="copy-code-btn"></button></code></pre>
<p>このエラーを回避するには、既存または新規コレクションのシャード数またはパーティション数を減らすか、一部のコレクションを削除するか、<code translate="no">maxGeneralCapacity</code> 値を増やします。</p>
