---
id: main_components.md
summary: Milvusスタンドアロンおよびクラスタの主要コンポーネントについて学びます。
title: 主要コンポーネント
---
<h1 id="Main-Components" class="common-anchor-header">主要コンポーネント<button data-href="#Main-Components" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusクラスタは、5つのコアコンポーネントと3つのサードパーティ依存コンポーネントで構成される。各コンポーネントは独立してKubernetes上にデプロイできる：</p>
<h2 id="Milvus-components" class="common-anchor-header">Milvusコンポーネント<button data-href="#Milvus-components" class="anchor-icon" translate="no">
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
<li>Coordinator: マスタースレーブモードを有効にして高可用性を提供することができる。</li>
<li>プロキシ: クラスタごとに1つ以上</li>
<li>ストリーミングノード：クラスタあたり1つ以上</li>
<li>クエリノード：クラスタあたり1つ以上</li>
<li>データノード：クラスタごとに1つ以上</li>
</ul>
<h2 id="Third-party-dependencies" class="common-anchor-header">サードパーティ依存<button data-href="#Third-party-dependencies" class="anchor-icon" translate="no">
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
<li><strong>メタストア：</strong>milvusの様々なコンポーネント（etcdなど）のメタデータを格納する。</li>
<li><strong>オブジェクトストレージ：</strong> インデックスファイルやバイナリログファイルなど、milvus内の大容量ファイルのデータ永続化を担う。</li>
<li><strong>WALストレージ：</strong>WALストレージ：Write-Ahead Log（WAL）サービスをmilvusに提供する。<ul>
<li>woodpeckerのゼロディスクモードでは、<strong>WALは</strong>オブジェクトストレージとメタストレージを他のデプロイメントなしで直接使用するため、サードパーティへの依存を減らすことができます。</li>
</ul></li>
</ul>
<h2 id="Milvus-deployment-modes" class="common-anchor-header">Milvusのデプロイモード<button data-href="#Milvus-deployment-modes" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusの実行には2つのモードがあります：</p>
<h3 id="Standalone" class="common-anchor-header">スタンドアロン</h3><p>Milvusの単一インスタンスで、すべてのコンポーネントを1つのプロセスで実行します。 小規模なデータセットや低負荷の作業に適しています。 また、スタンドアロンモードでは、woodpeckerやrocksmqのようなシンプルなWAL実装を選択することで、サードパーティのWAL Storageへの依存を排除することができます。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/standalone_architecture.png" alt="Standalone_architecture" class="doc-image" id="standalone_architecture" />
   </span> <span class="img-wrapper"> <span>スタンドアロン・アーキテクチャ</span> </span></p>
<p>現在、WALストレージバックエンドがクラスタモードをサポートしている場合でも、スタンドアロンMilvusインスタンスからMilvusクラスタへのオンラインアップグレードはできません。</p>
<h3 id="Cluster" class="common-anchor-header">クラスタ</h3><p>Milvusの分散展開モードで、各コンポーネントが独立して動作し、弾力的にスケールアウトすることができます。大規模なデータセットや高負荷なシナリオに適しています。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/distributed_architecture.png" alt="Distributed_architecture" class="doc-image" id="distributed_architecture" />
   </span> <span class="img-wrapper"> <span>分散アーキテクチャ</span> </span></p>
<h2 id="Whats-next" class="common-anchor-header">次のページ<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Milvusの仕組みと設計原理を理解するには、<a href="/docs/ja/four_layers.md">コンピューティング/ストレージ分散を</a>お読みください。</li>
</ul>
