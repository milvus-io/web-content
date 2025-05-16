---
id: architecture_overview.md
summary: Milvusは、類似検索と人工知能のために特別に構築された、高速で信頼性が高く、安定したベクトルデータベースを提供します。
title: Milvusアーキテクチャの概要
---
<h1 id="Milvus-Architecture-Overview" class="common-anchor-header">Milvusアーキテクチャの概要<button data-href="#Milvus-Architecture-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusは、Faiss、HNSW、DiskANN、SCANNなどの一般的なベクトル検索ライブラリの上に構築されており、数百万、数十億、あるいは数兆のベクトルを含む高密度ベクトルデータセットの類似検索のために設計されています。先に進む前に、埋め込み検索の<a href="/docs/ja/v2.4.x/glossary.md">基本原理を</a>よく理解してください。</p>
<p>Milvusはまた、データのシャーディング、ストリーミングデータの取り込み、動的スキーマ、ベクトルとスカラーデータを組み合わせた検索、マルチベクトルとハイブリッド検索、スパースベクトル、その他多くの高度な機能をサポートしています。このプラットフォームはオンデマンドでパフォーマンスを提供し、あらゆる埋め込み検索シナリオに合わせて最適化することができます。最適な可用性と弾力性のために、Kubernetesを使用してMilvusをデプロイすることをお勧めします。</p>
<p>Milvusは、ストレージとコンピューティングの分離とコンピューティングノードの水平スケーラビリティを特徴とする共有ストレージアーキテクチャを採用しています。データプレーンとコントロールプレーンの分離という原則に従い、Milvusはアクセスレイヤー、コーディネータサービス、ワーカーノード、ストレージという<a href="/docs/ja/v2.4.x/four_layers.md">4つのレイヤーで</a>構成されている。これらのレイヤーは、スケーリングやディザスタリカバリに関しては相互に独立している。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/milvus_architecture.png" alt="Architecture_diagram" class="doc-image" id="architecture_diagram" />
   </span> <span class="img-wrapper"> <span>アーキテクチャ図</span> </span></p>
<p>図によると、インターフェースは以下のカテゴリーに分類できる：</p>
<ul>
<li><strong>DDL / DCL:</strong>createCollection / createPartition / dropCollection / dropPartition / hasCollection / hasPartition</li>
<li><strong>DML / プロデュース：</strong>insert / delete / upsert</li>
<li><strong>DQL:</strong>検索 / クエリー</li>
</ul>
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
<li>Milvusにおける<a href="/docs/ja/v2.4.x/four_layers.md">計算/ストレージ分割について</a>もっと知る</li>
<li>Milvusの<a href="/docs/ja/v2.4.x/main_components.md">主要コンポーネントについて</a>学ぶ。</li>
</ul>
