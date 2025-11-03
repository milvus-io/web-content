---
id: roadmap.md
title: Milvus ロードマップ
related_key: Milvus roadmap
summary: Milvusは、AIアプリケーションを強化するために構築されたオープンソースのベクトルデータベースです。私たちの開発ロードマップは以下の通りです。
---
<h1 id="Milvus-Roadmap" class="common-anchor-header">Milvus ロードマップ<button data-href="#Milvus-Roadmap" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="🌌-Toward-the-Next-Gen-Multimodal-Database-and-Data-Lake" class="common-anchor-header">🌌 次世代のマルチモーダルデータベースとデータレイクに向けて<button data-href="#🌌-Toward-the-Next-Gen-Multimodal-Database-and-Data-Lake" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Milvus製品ロードマップ</strong></p>
<p>Milvusロードマップへようこそ！</p>
<p><strong>構造化データから非構造化データまで</strong>、<strong>リアルタイム検索からオフライン分析まで</strong>、<strong>シングルクラスタのパフォーマンスからグローバルデータレイクアーキテクチャまで</strong>、Milvusは次世代マルチモーダルデータベースという新たな時代に突入します。</p>
<p>このロードマップは、<strong>Milvus v2.6（進行中）</strong>、<strong>Milvus v3.0（2026年後半を目標）</strong>、<strong>Milvus v3.1（長期開発</strong>）の中核目標の概要と、<strong>Vector Lake（データレイク／Loon</strong>）の進化計画を示しています。</p>
<h2 id="🧩-Milvus-v26-In-Progress" class="common-anchor-header">🧩 Milvus v2.6 (進行中)<button data-href="#🧩-Milvus-v26-In-Progress" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>タイムライン2025年半ば～2025年末</strong></p>
<p>フォーカス<strong>データモデルのアップグレード</strong>、<strong>ストリーミングアーキテクチャのリファクタリング</strong>、<strong>ホット/コールドティアリング機能の構築</strong>、<strong>ベクターレイクプロトタイプ(v0.1)</strong>のローンチ。</p>
<h3 id="🎯-Key-Highlights" class="common-anchor-header">主なハイライト<button data-href="#🎯-Key-Highlights" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="🔹-Data-Model-Upgrade" class="common-anchor-header"><strong>データモデルのアップグレード</strong></h4><ul>
<li><p>マルチベクトル埋め込み構造をサポートする統一された<strong>Tensor / StructList</strong>データ型を導入し、<em>ColBERT</em>、<em>CoLQwen</em>、<em>ビデオ</em>、<em>マルチモーダルベクトルとの</em>互換性を実現。</p></li>
<li><p>ポイント、リージョン、空間インデックス（<em>libspatial</em>ベース）を含む<strong>Geo Data</strong>サポートを追加し、LBSやGISでのユースケースを拡大。</p></li>
<li><p><strong>Timestamp with Timezone</strong>データ型のサポート。</p></li>
</ul>
<h4 id="🔹-StreamNode-Architecture-Refactor" class="common-anchor-header">🔹 S<strong>treamNode アーキテクチャのリファクタリング</strong></h4><ul>
<li><p>ストリーミング・インジェスト・パイプラインを書き換えて、増分書き込みとリアルタイム計算を最適化。</p></li>
<li><p>同時実行のパフォーマンスと安定性を大幅に改善し、リアルタイムとオフラインの統合処理の基礎を築く。</p></li>
<li><p>新しいメッセージキュー・エンジンを導入：<strong>ウッドペッカー</strong></p></li>
</ul>
<h4 id="🔹-HotCold-Tiering--Storage-Architecture-StorageV2" class="common-anchor-header"><strong>ホット/コールド・ティアリングとストレージ・アーキテクチャ (StorageV2)</strong></h4><ul>
<li><p>デュアル・ストレージ形式をサポート：<strong>Parquet</strong>と<strong>Vortex の</strong> 2 つのストレージ形式をサポートし、同時実行性とメモリ効率を向上。</p></li>
<li><p>自動ホット/コールドデータ分離とインテリジェントなスケジューリングによる階層化ストレージの実装。</p></li>
</ul>
<h4 id="🔹-Vector-Lake-Prototype-v01" class="common-anchor-header"><strong>Vector Lakeプロトタイプ(v0.1)</strong></h4><ul>
<li><p>FFIを介して<strong>Spark</strong>/<strong>DuckDB</strong>/<strong>DataFusionと</strong>統合し、オフラインでのスキーマ進化とKNNクエリを実現。</p></li>
<li><p>マルチモーダルなデータ可視化とSpark ETLデモを提供し、データレイク・アーキテクチャの基礎を確立。</p></li>
</ul>
<h2 id="🌠-Milvus-v30-Targeted-for-Late-2026" class="common-anchor-header">↪Milvus v3.0 (2026年後半目標)<button data-href="#🌠-Milvus-v30-Targeted-for-Late-2026" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>タイムライン2025年後半～2026年前半</strong></p>
<p>フォーカス<strong>Vector Lake (v0.2)の</strong>リリースに伴い、<strong>検索エクスペリエンス</strong>、<strong>スキーマの柔軟性</strong>、<strong>非構造化データのサポートを</strong>包括的に強化。</p>
<h3 id="🎯-Key-Highlights" class="common-anchor-header">主なハイライト<button data-href="#🎯-Key-Highlights" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="🔹-Search-Experience-Overhaul" class="common-anchor-header">🔹<strong>検索エクスペリエンスのオーバーホール</strong></h4><ul>
<li><p>位置や否定例を含む検索をサポートする<strong>More Like This（MLT）</strong>類似検索を導入。</p></li>
<li><p><strong>ハイライトや</strong> <strong>ブーストなどの</strong>セマンティック検索機能を追加。</p></li>
<li><p><strong>カスタム辞書と</strong> <strong>類義語テーブルを</strong>サポートし、アナライザーレイヤーでの語彙的・意味的ルール定義を可能にします。</p></li>
<li><p>クエリーの<strong>集計</strong>機能を導入。</p></li>
</ul>
<h4 id="🔹-Multi-Tenancy--Resource-Management" class="common-anchor-header">🔹<strong>マルチテナントとリソース管理</strong></h4><ul>
<li><p>マルチテナントの削除、統計、ホット/コールド・ティアリングを可能にする。</p></li>
<li><p>リソースの分離とスケジューリング戦略を改善し、単一クラスタ内の数百万テーブルをサポート。</p></li>
</ul>
<h4 id="🔹-Schema--Primary-Key-Enhancements" class="common-anchor-header"><strong>スキーマと主キーの強化</strong></h4><ul>
<li><p><strong>グローバル・プライマリ・キー重複排除(Global PK Dedup)</strong>を実装し、データの一貫性と一意性を保証。</p></li>
<li><p><strong>柔軟なスキーマ管理</strong>（カラムの追加/削除、バックアップフィル）をサポート。</p></li>
<li><p>ベクトル・フィールドで<strong>NULL 値を</strong>許容。</p></li>
</ul>
<h4 id="🔹-Expanded-Unstructured-Data-Types-BLOB--Text" class="common-anchor-header">🔹<strong>拡張された非構造化データ型 (BLOB / テキスト)</strong></h4><ul>
<li><p><strong>BLOB型の</strong>導入。ファイル、画像、動画などのバイナリ・データのネイティブ・ストレージと参照を提供。</p></li>
<li><p><strong>TEXT タイプを</strong>導入し、フルテキストおよびコンテンツベースの検索機能を強化。</p></li>
</ul>
<h4 id="🔹-Enterprise-Grade-Capabilities" class="common-anchor-header">🔹<strong>エンタープライズグレードの機能</strong></h4><ul>
<li><p><strong>スナップショットベースのバックアップとリカバリを</strong>サポート</p></li>
<li><p><strong>エンドツーエンドのトレースと</strong> <strong>監査ロギングの</strong>提供</p></li>
<li><p>マルチクラスタ展開における<strong>アクティブスタンバイ高可用性（HA）の</strong>実装。</p></li>
</ul>
<h4 id="🔹-Vector-Lake-v02" class="common-anchor-header"><strong>ベクターレイク(v0.2</strong>)</h4><ul>
<li><p><strong>TEXT / BLOBストレージと</strong> <strong>複数バージョンのスナップショット管理を</strong>サポート。</p></li>
<li><p>オフラインでのインデックス作成、クラスタリング、重複排除、次元削減タスクにSparkを統合。</p></li>
<li><p><strong>ChatPDFコールドクエリとオフラインベンチマークデモを</strong>提供。</p></li>
</ul>
<h2 id="🪐-Milvus-v31-Long-Term-Vision" class="common-anchor-header">Milvus v3.1 (長期ビジョン)<button data-href="#🪐-Milvus-v31-Long-Term-Vision" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>スケジュール2026年半ば</strong></p>
<p>フォーカス<strong>ユーザー定義関数（UDF）</strong>、<strong>分散コンピューティングの統合</strong>、<strong>スカラークエリの最適化</strong>、<strong>ダイナミックシャーディング</strong>、<strong>Vector Lake（v1.0</strong>）の正式リリース。</p>
<h3 id="🎯-Key-Highlights" class="common-anchor-header">主なハイライト<button data-href="#🎯-Key-Highlights" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="🔹-UDF--Distributed-Computing-Ecosystem" class="common-anchor-header">🔹<strong>UDFと分散コンピューティングのエコシステム</strong></h4><ul>
<li><p><strong>ユーザー定義関数(UDF)の</strong>サポートにより、開発者は検索や計算のワークフローにカスタムロジックを組み込むことができる。</p></li>
<li><p><strong>Ray Dataset / Daftとの</strong>深い統合により、UDFの分散実行とマルチモーダルなデータ処理を実現。</p></li>
</ul>
<h4 id="🔹-Scalar-Query--Local-Format-Evolution" class="common-anchor-header"><strong>スカラークエリーとローカルフォーマットの進化</strong></h4><ul>
<li><p>スカラーフィールドのフィルタリングと集計のパフォーマンスを最適化。</p></li>
<li><p>式の評価とインデックスの高速実行を強化。</p></li>
<li><p>ローカルファイル形式の<strong>インプレース更新を</strong>サポート。</p></li>
</ul>
<h4 id="🔹-Advanced-Search-Capabilities" class="common-anchor-header">🔹<strong>高度な検索機能</strong></h4><ul>
<li><p>以下の機能を追加：<strong>RankBy</strong>、<strong>OrderBy</strong>、<strong>Facet</strong>、<strong>Fuzzy match</strong>クエリ。</p></li>
<li><p>テキスト検索の強化</p>
<ul>
<li><p><code translate="no">match_phrase_prefix</code></p></li>
<li><p><code translate="no">Completion Suggester</code></p></li>
<li><p><code translate="no">Term Suggester</code></p></li>
<li><p><code translate="no">Phrase Suggester</code></p></li>
</ul></li>
</ul>
<h4 id="🔹-Dynamic-Sharding--Scalability" class="common-anchor-header"><strong>動的シャーディングとスケーラビリティ</strong></h4><ul>
<li><p><strong>自動シャード分割と</strong> <strong>ロードバランシングによる</strong>シームレスな拡張。</p></li>
<li><p><strong>グローバルインデックスの構築を</strong>改善し、<strong>分散検索のパフォーマンスを</strong>確保します。</p></li>
</ul>
<h4 id="🔹-Vector-Lake-V10" class="common-anchor-header"><strong>ベクターレイク V1.0</strong></h4><ul>
<li><p><strong>Ray / Daft / PyTorchと</strong>深く統合し、分散UDFとコンテキストエンジニアリングのユースケースをサポート。</p></li>
<li><p><strong>RAG (Retrieval-Augmented Generation)の</strong> <strong>デモとIcebergテーブルからのインポートを</strong>提供。</p></li>
</ul>
<h2 id="🤝-Co-Building-the-Future-of-Milvus" class="common-anchor-header">🤝 Milvusの未来の共同構築<button data-href="#🤝-Co-Building-the-Future-of-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusはグローバルな開発者コミュニティによって運営されているオープンソースプロジェクトです。</p>
<p>次世代のマルチモーダルデータベースを形成するために、コミュニティメンバーの皆様のご参加をお待ちしております：</p>
<ul>
<li><p>💬<strong>フィードバックを共有</strong>する：新機能や最適化のアイデアを提案する</p></li>
<li><p>🐛<strong>問題を報告する</strong>：GitHub Issuesでバグを報告</p></li>
<li><p>🔧<strong>コードに貢献する</strong>：PRを提出し、コア機能の構築を手伝う</p>
<ul>
<li><p><strong>プルリクエスト</strong>：<a href="https://github.com/milvus-io/milvus/pulls">コードベースに</a>直接貢献しましょう。バグの修正、機能の追加、ドキュメントの改善など、あなたの貢献を歓迎します。</p></li>
<li><p><strong>開発ガイド</strong>：コード貢献に関するガイドラインは、<a href="https://github.com/milvus-io/milvus/blob/82915a9630ab0ff40d7891b97c367ede5726ff7c/CONTRIBUTING.md">コントリビューターガイドを</a>ご覧ください。</p></li>
</ul></li>
<li><p>ベストプラクティスやサクセスストーリーを共有<strong>しましょう</strong>。</p></li>
</ul>
<p>👉<strong>GitHub:</strong> <a href="https://github.com/milvus-io/milvus">milvus-io/milvus</a></p>
