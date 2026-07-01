---
id: roadmap.md
title: Milvusのロードマップ
related_key: Milvus roadmap
summary: Milvusは、AIアプリケーションを支えるために構築されたオープンソースのベクトルデータベースです。以下に、開発の指針となるロードマップをご紹介します。
---
<h1 id="Milvus-Roadmap" class="common-anchor-header">Milvusのロードマップ<button data-href="#Milvus-Roadmap" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="🌌-Toward-the-Next-Gen-Multimodal-Database-and-Data-Lake" class="common-anchor-header">🌌 次世代のマルチモーダル・データベースとデータレイクに向けて<button data-href="#🌌-Toward-the-Next-Gen-Multimodal-Database-and-Data-Lake" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Milvus 製品ロードマップ</strong></p>
<p>Milvusロードマップへようこそ！</p>
<p>私たちは、<strong>構造化データから非構造化データ</strong>、<strong>リアルタイム検索からオフライン分析</strong>、そして<strong>シングルクラスタのパフォーマンスからグローバルなデータレイクアーキテクチャに至るまでを</strong>網羅する、次世代マルチモーダルデータベースという新たな時代へとMilvusを導いています。</p>
<p>このロードマップでは、<strong>Milvus v2.6（開発中）</strong>、<strong>Milvus v3.0（2026年後半を目標）</strong>、<strong>Milvus v3.1（長期開発）</strong>の主要な目標に加え、<strong>Vector Lake（データレイク／Loon）</strong>の進化計画について概説します。</p>
<h2 id="🧩-Milvus-v26-In-Progress" class="common-anchor-header">🧩 Milvus v2.6（開発中）<button data-href="#🧩-Milvus-v26-In-Progress" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>スケジュール：2025年半ば～2025年末</strong></p>
<p>重点：<strong>データモデルのアップグレード</strong>、<strong>ストリーミングアーキテクチャのリファクタリング</strong>、<strong>ホット／コールド階層化機能の構築</strong>、<strong>およびVector Lakeプロトタイプ（v0.1）</strong>のリリース。</p>
<h3 id="🎯-Key-Highlights" class="common-anchor-header">🎯 主なハイライト<button data-href="#🎯-Key-Highlights" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="🔹-Data-Model-Upgrade" class="common-anchor-header">🔹<strong>データモデルのアップグレード</strong></h4><ul>
<li><p>マルチベクトル埋め込み構造をサポートする統一された<strong>Tensor / StructList</strong>データ型を導入し、<em>ColBERT</em>、<em>CoLQwen</em>、<em>動画</em>、および<em>マルチモーダルベクトルとの</em>互換性を実現します。</p></li>
<li><p>LBSおよびGISにおけるユースケースを拡大するため、ポイント、リージョン、空間インデックス（<em>libspatial</em>に基づく）を含む<strong>地理データの</strong>サポートを追加。</p></li>
<li><p><strong>タイムゾーン付きタイムスタンプ</strong>データ型のサポートを追加しました。</p></li>
</ul>
<h4 id="🔹-StreamNode-Architecture-Refactor" class="common-anchor-header">🔹<strong>StreamNodeアーキテクチャのリファクタリング</strong></h4><ul>
<li><p>ストリーミング取り込みパイプラインを書き直し、増分書き込みとリアルタイム計算を最適化しました。</p></li>
<li><p>並行処理のパフォーマンスと安定性を大幅に向上させ、リアルタイム処理とオフライン処理の統合に向けた基盤を築きました。</p></li>
<li><p>新しいメッセージキューエンジン「<strong>Woodpecker</strong>」を導入。</p></li>
</ul>
<h4 id="🔹-HotCold-Tiering--Storage-Architecture-StorageV2" class="common-anchor-header">🔹<strong>ホット／コールド階層化およびストレージアーキテクチャ（StorageV2）</strong></h4><ul>
<li><p><strong>Parquet</strong>と<strong>Vortex</strong> の 2 つのストレージ形式をサポートし、並行処理能力とメモリ効率を向上させる。</p></li>
<li><p>ホット／コールドデータの自動分離とインテリジェントなスケジューリングを備えた階層型ストレージを実装。</p></li>
</ul>
<h4 id="🔹-Vector-Lake-Prototype-v01" class="common-anchor-header">🔹<strong>Vector Lake プロトタイプ (v0.1)</strong></h4><ul>
<li><p>FFIを介して<strong>Spark</strong>/<strong>DuckDB</strong>/<strong>DataFusion</strong>と統合し、オフラインでのスキーマ進化およびKNNクエリを可能にします。</p></li>
<li><p>マルチモーダルデータの可視化とSpark ETLデモを提供し、データレイクアーキテクチャの基盤を確立します。</p></li>
</ul>
<h2 id="🌠-Milvus-v30-Targeted-for-Early-2026" class="common-anchor-header">🌠 Milvus v3.0（2026年初頭を予定）<button data-href="#🌠-Milvus-v30-Targeted-for-Early-2026" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>スケジュール：2025年末～2026年初頭</strong></p>
<p>重点：<strong>検索体験</strong>、<strong>スキーマの柔軟性</strong>、<strong>非構造化データのサポート</strong>に関する包括的な機能強化に加え、<strong>Vector Lake (v0.2)</strong> のリリース。</p>
<h3 id="🎯-Key-Highlights" class="common-anchor-header">🎯 主なハイライト<button data-href="#🎯-Key-Highlights" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="🔹-Search-Experience-Overhaul" class="common-anchor-header">🔹<strong>検索体験の全面刷新</strong></h4><ul>
<li><p>「<strong>More Like This（MLT）」</strong>類似検索を導入し、位置情報やネガティブ例を用いた検索に対応。</p></li>
<li><p><strong>ハイライト表示</strong>や<strong>ブースト</strong>などのセマンティック検索機能を追加。</p></li>
<li><p><strong>カスタム辞書</strong>および<strong>同義語テーブル</strong>をサポートし、アナライザー層での語彙的・意味的なルール定義を可能にしました。</p></li>
<li><p>クエリに対する<strong>集計</strong>機能を導入しました。</p></li>
</ul>
<h4 id="🔹-Multi-Tenancy--Resource-Management" class="common-anchor-header">🔹<strong>マルチテナント機能とリソース管理</strong></h4><ul>
<li><p>マルチテナント環境における削除、統計情報の取得、およびホット／コールド階層化を可能にする。</p></li>
<li><p>リソースの分離とスケジューリング戦略を改善し、単一のクラスターで数百万のテーブルをサポートできるようにします。</p></li>
</ul>
<h4 id="🔹-Schema--Primary-Key-Enhancements" class="common-anchor-header">🔹<strong>スキーマおよび主キーの機能強化</strong></h4><ul>
<li><p>データの整合性と一意性を保証するため、<strong>グローバル主キー重複排除（Global PK Dedup）</strong>を実装する。</p></li>
<li><p><strong>柔軟なスキーマ管理</strong>（列の追加・削除、バックアップの埋め込み）をサポートします。</p></li>
<li><p>ベクトルフィールドでの<strong>NULL 値を</strong>許可します。</p></li>
</ul>
<h4 id="🔹-Expanded-Unstructured-Data-Types-BLOB--Text" class="common-anchor-header">🔹<strong>非構造化データ型の拡張（BLOB / Text）</strong></h4><ul>
<li><p>ファイル、画像、動画などのバイナリデータに対して、ネイティブな保存および参照機能を提供する<strong>BLOB型</strong>を導入しました。</p></li>
<li><p><strong>TEXT 型</strong>を導入し、フルテキスト検索およびコンテンツベースの検索機能を強化します。</p></li>
</ul>
<h4 id="🔹-Enterprise-Grade-Capabilities" class="common-anchor-header">🔹<strong>エンタープライズグレードの機能</strong></h4><ul>
<li><p><strong>スナップショットベースのバックアップおよび復旧</strong>をサポートします。</p></li>
<li><p><strong>エンドツーエンドのトレース</strong>および<strong>監査ログ機能</strong>を提供します。</p></li>
<li><p>マルチクラスタ展開全体で、<strong>アクティブ・スタンバイ方式の高可用性（HA）</strong>を実装します。</p></li>
</ul>
<h4 id="🔹-Vector-Lake-v02" class="common-anchor-header">🔹<strong>Vector Lake (v0.2)</strong></h4><ul>
<li><p><strong>TEXT / BLOB ストレージ</strong>および<strong>マルチバージョンスナップショット管理</strong>をサポートします。</p></li>
<li><p>オフラインでのインデックス作成、クラスタリング、重複排除、次元削減タスクのためにSparkを統合。</p></li>
<li><p><strong>ChatPDFのコールドクエリおよびオフラインベンチマークのデモ</strong>を提供します。</p></li>
</ul>
<h2 id="🪐-Milvus-v31-Long-Term-Vision" class="common-anchor-header">🪐 Milvus v3.1（長期ビジョン）<button data-href="#🪐-Milvus-v31-Long-Term-Vision" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>スケジュール：2026年半ば</strong></p>
<p>重点：<strong>ユーザー定義関数（UDF）</strong>、<strong>分散コンピューティングの統合</strong>、<strong>スカラークエリの最適化</strong>、<strong>動的シャーディング</strong>、および<strong>Vector Lake（v1.0）</strong>の正式リリース。</p>
<h3 id="🎯-Key-Highlights" class="common-anchor-header">🎯 主なハイライト<button data-href="#🎯-Key-Highlights" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="🔹-UDF--Distributed-Computing-Ecosystem" class="common-anchor-header">🔹<strong>UDF および分散コンピューティングのエコシステム</strong></h4><ul>
<li><p><strong>ユーザー定義関数（UDF）</strong>をサポートし、開発者が検索および計算ワークフローにカスタムロジックを組み込めるようにします。</p></li>
<li><p><strong>Ray Dataset / Daft</strong>との緊密な連携により、分散UDF実行およびマルチモーダルデータ処理を実現。</p></li>
</ul>
<h4 id="🔹-Scalar-Query--Local-Format-Evolution" class="common-anchor-header">🔹<strong>スカラークエリとローカルフォーマットの進化</strong></h4><ul>
<li><p>スカラーフィールドのフィルタリングおよび集計パフォーマンスを最適化します。</p></li>
<li><p>式の評価およびインデックスによる高速化実行を強化します。</p></li>
<li><p>ローカルファイル形式に対する<strong>インプレース更新</strong>をサポートします。</p></li>
</ul>
<h4 id="🔹-Advanced-Search-Capabilities" class="common-anchor-header">🔹<strong>高度な検索機能</strong></h4><ul>
<li><p><strong>RankBy</strong>、<strong>OrderBy</strong>、<strong>Facet</strong>、および<strong>ファジーマッチクエリ</strong>といった機能を追加します。</p></li>
<li><p>以下の機能のサポートにより、テキスト検索機能を強化：</p>
<ul>
<li><p><code translate="no">match_phrase_prefix</code></p></li>
<li><p><code translate="no">Completion Suggester</code></p></li>
<li><p><code translate="no">Term Suggester</code></p></li>
<li><p><code translate="no">Phrase Suggester</code></p></li>
</ul></li>
</ul>
<h4 id="🔹-Dynamic-Sharding--Scalability" class="common-anchor-header">🔹<strong>動的なシャーディングとスケーラビリティ</strong></h4><ul>
<li><p>シームレスなスケーリングを実現するため、<strong>シャーディングの自動分割</strong>と<strong>負荷分散を</strong>有効にします。</p></li>
<li><p><strong>グローバルインデックスの構築</strong>を改善し、<strong>分散検索のパフォーマンス</strong>を確保します。</p></li>
</ul>
<h4 id="🔹-Vector-Lake-V10" class="common-anchor-header">🔹<strong>Vector Lake V1.0</strong></h4><ul>
<li><p><strong>Ray / Daft / PyTorch</strong>との深い統合により、分散UDFおよびコンテキストエンジニアリングのユースケースをサポートします。</p></li>
<li><p><strong>RAG（Retrieval-Augmented Generation）のデモ</strong>を提供し<strong>、Icebergテーブルからのインポートを可能にします</strong>。</p></li>
</ul>
<h2 id="🤝-Co-Building-the-Future-of-Milvus" class="common-anchor-header">🤝 Milvusの未来を共に築く<button data-href="#🤝-Co-Building-the-Future-of-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusは、世界中の開発者コミュニティによって推進されているオープンソースプロジェクトです。</p>
<p>次世代のマルチモーダルデータベースの構築に、コミュニティの皆さまの参加を心よりお待ちしております：</p>
<ul>
<li><p>💬<strong>フィードバックの共有</strong>：新機能や最適化のアイデアをご提案ください</p></li>
<li><p>🐛<strong>問題の報告</strong>：GitHub Issues を通じてバグを報告してください</p></li>
<li><p>🔧<strong>コードの貢献</strong>：プルリクエスト（PR）を送信し、コア機能の構築にご協力ください</p>
<ul>
<li><p><strong>プルリクエスト</strong>：<a href="https://github.com/milvus-io/milvus/pulls">コードベース</a>に直接貢献してください。バグの修正、機能の追加、ドキュメントの改善など、どのような貢献でも歓迎します。</p></li>
<li><p><strong>開発ガイド</strong>：コードへの貢献に関するガイドラインについては、「<a href="https://github.com/milvus-io/milvus/blob/82915a9630ab0ff40d7891b97c367ede5726ff7c/CONTRIBUTING.md">コントリビューターガイド</a>」をご確認ください。</p></li>
</ul></li>
<li><p>⭐<strong>情報を広める</strong>：ベストプラクティスや成功事例を共有してください</p></li>
</ul>
<p>👉<strong>GitHub:</strong> <a href="https://github.com/milvus-io/milvus">milvus-io/milvus</a></p>
