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
    </button></h1><h2 id="🌌-Toward-the-Next-Gen-Multimodal-Database-and-Vector-Lakebase" class="common-anchor-header">🌌 次世代マルチモーダルデータベースおよびベクトル・レイクベースに向けて<button data-href="#🌌-Toward-the-Next-Gen-Multimodal-Database-and-Vector-Lakebase" class="anchor-icon" translate="no">
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
<p>私たちは、Milvusを新たな時代――次世代マルチモーダルデータベース――へと導いています<strong>。</strong> <strong>その範囲は、構造化データから非構造化データ、リアルタイム検索からオフライン分析、そしてシングルクラスタのパフォーマンスからグローバルな</strong> <strong>Vector Lakebaseアーキテクチャ</strong> <strong>にまで及びます</strong> <strong>。</strong></p>
<p>このロードマップでは、<strong>Milvus v3.0（パブリックベータ）</strong> <strong>およびMilvus v3.1（長期開発）</strong>の中核となる目標と、<strong>Zilliz Vector Lakebaseの</strong>進化計画について概説します。</p>
<h2 id="🌠-Milvus-v30-Public-Beta" class="common-anchor-header">🌠 Milvus v3.0（パブリックベータ）<button data-href="#🌠-Milvus-v30-Public-Beta" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>パブリックベータ：2026年5月</strong></p>
<p>重点：エンジン内でのソート、集計、マルチベクトル検索を備えた<strong>セマンティックネイティブのクエリエンジンを</strong>構築し、<strong>Zilliz Vector Lakebaseのレイクネイティブ基盤</strong>を確立することで、データの移行なしに演算処理をデータに直接適用できるようにします。</p>
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
    </button></h3><h4 id="🔹-Schema--Data-Type-Evolution" class="common-anchor-header">🔹<strong>スキーマおよびデータ型の進化</strong></h4><ul>
<li>インデックスの再構築やサービスの中断なしに、実行時に `ALTER COLLECTION ADD COLUMN` および `DROP COLUMN` をサポート。</li>
<li>新しい列に対して、Sparkコネクタを介した外部バックフィルと、書き込み時に自動生成されるBM25スパースベクトルを用いた内部<strong>バックフィルの2つのパスを</strong>提供します。</li>
<li>BM25およびテキストマッチングをサポートし、ベクトルとともに元のテキストを格納する第一級データ型として<strong>TEXT</strong>を導入しました。</li>
</ul>
<h4 id="🔹-Query-Execution-Overhaul" class="common-anchor-header">🔹<strong>クエリ</strong> <strong>実行の全面刷新</strong></h4><ul>
<li>セグメントごとのソートとクエリノード間でのマージソートを用いて、<strong>ORDER BY を</strong>エンジン内に組み込みました。</li>
<li>カーネル内で計算されるSQLスタイル<strong>のクエリ</strong> <strong>集計</strong>（COUNT、SUM、AVG、MIN、MAXを伴うGROUP BY）を追加。</li>
<li>バケットごとの統計情報とサーバーサイドでのネストされたサブファセットを備えた、ANN結果に対する<strong>検索ファセット</strong>を導入します。</li>
<li>クラスタ側で登録された<strong>カスタム辞書</strong>および同義語テーブルをサポートし、CJKおよびドメイン固有のリコール率を向上させました。</li>
</ul>
<h4 id="🔹-Multi-Vector--Late-Interaction-Support" class="common-anchor-header">🔹<strong>マルチベクトルおよびレイトインタラクションのサポート</strong></h4><ul>
<li><strong>StructList</strong>を導入し、1つのエンティティを多数のベクトルを含む単一の行として表現できるようにし、MAX_SIMを介したネイティブなレイトインタラクション（ColBERT、ColPali）をサポートする。</li>
<li>StructListフィールドに対する<strong>要素レベルおよびエンティティレベルの検索</strong>をサポートし、エンティティレベルの結果に対して設定可能なマッチングポリシーを提供します。</li>
<li>3つの<strong>マルチベクトル検索戦略</strong>を追加：TokenANN（網羅的）、Muvera（投影ベース、学習不要）、Lemur（学習済み圧縮）。</li>
</ul>
<h4 id="🔹-Retrieval--Index-Overhaul" class="common-anchor-header">🔹<strong>検索およびインデックスの全面見直し</strong></h4><ul>
<li>ブロック圧縮、重み量子化、および永続化フォーマットを用いて、<strong>スパース逆インデックス</strong>を全面的に刷新しました。また、デフォルトのスパース逆インデックスアルゴリズムとして<strong>SINDI</strong>を導入しました。</li>
<li><strong>Faissファミリー全種</strong>（SVS、Panorama、PQ、IVFPQ、ScaNN）および近似重複<strong>検出用のMinHash DIDOを導入し</strong>、インデックスのカバレッジを拡大しました。</li>
<li>非同期埋め込みや欠落したモダリティに対応するため、<strong>NULL 許容のベクトルフィールド</strong>をサポートし、検索時に自動フィルタリングを行う。</li>
</ul>
<h4 id="🔹-Vector-Lakebase-Storage--Compute-Architecture" class="common-anchor-header">🔹<strong>Vector Lakebaseのストレージおよびコンピューティングアーキテクチャ</strong></h4><ul>
<li>S3 / GCS / Azure内のデータをその場でインデックス登録およびクエリ実行できる「<strong>External Collection</strong>」を導入し、Lance、Parquet、Iceberg、Vortexの各テーブル形式をサポートします。</li>
<li>オープンな列指向フォーマットである<strong>Vortexと</strong>、オブジェクトストレージからの効率的なポイント読み取りを実現する混合フォーマットストレージレイヤー<strong>であるLoon（Storage V3）</strong>を追加しました。</li>
<li>書き込み処理を継続しながらバッチ処理を行うため、MVCC スタイルの分離機能を備えた<strong>ポイント・イン・タイム・スナップショット</strong>をサポートします。</li>
<li><strong>Spark DataSource v2</strong>として統合され、Spark / Databricks / EMRパイプライン内でMilvusへの直接読み取りおよび書き込みが可能になります。</li>
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
    </button></h2><p><strong>スケジュール：2026年後半以降</strong></p>
<p>重点：<strong>ストレージインテリジェンス</strong>、<strong>書き込みパスの整合性</strong>、<strong>コンピュート機能の拡張性</strong>、および<strong>Vector Lakebase</strong> <strong>との相互運用性の</strong> <strong>拡大</strong>。</p>
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
    </button></h3><h4 id="🔹-Storage--Write-Path" class="common-anchor-header">🔹<strong>ストレージおよび書き込みパス</strong></h4><ul>
<li>ストレージ層において、ページインデックスおよびブルームフィルターによる剪定機能を備えた<strong>述語プッシュダウン</strong>を追加。</li>
<li>書き込み時の重複を防止するため、データ取り込み時に<strong>主キーに基づく重複排除</strong>を実装。</li>
</ul>
<h4 id="🔹-Compute--Elasticity" class="common-anchor-header">🔹<strong>演算および伸縮性</strong></h4><ul>
<li>データプレーン上のエンジン内でカスタムロジックを実行するための<strong>ユーザー定義関数（UDF）</strong>をサポートする。</li>
<li>データの増加に伴いシャードを再分割するための<strong>シャード分割を</strong>有効化し、カスタムシャードキーをサポートする。</li>
</ul>
<h4 id="🔹-Spark--Vector-Lakebase-Expansion" class="common-anchor-header">🔹<strong>Spark および</strong> <strong>Vector Lakebase</strong> <strong>の拡張</strong></h4><ul>
<li>Sparkコネクタを拡張し、<strong>ネイティブのバッチ演算子</strong>ライブラリを充実させます。</li>
<li>タイムトラベル、スキーマの進化、スナップショットのロールバックなどの<strong>テーブル形式</strong>機能を追加します。</li>
<li><strong>CDCで更新された外部インデックス</strong>、Apache Paimonのサポート、および追加のデータ形式により、Vector Lakebaseの相互運用性を拡大します。</li>
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
    </button></h2><p>Milvusは、世界中の開発者コミュニティによって推進されているオープンソースプロジェクトです。次世代のマルチモーダルデータベースの構築に、すべてのコミュニティメンバーの皆様のご協力をお願いいたします：</p>
<ul>
<li><p>💬<strong>フィードバックの共有</strong>：<a href="https://github.com/milvus-io/milvus/discussions">GitHub Discussions</a>で新機能や最適化のアイデアを提案してください。</p></li>
<li><p>🐛<strong>問題の報告</strong>：<a href="https://github.com/milvus-io/milvus/issues">GitHub Issues</a>を通じてバグを報告してください。</p></li>
<li><p>🔧<strong>コードの貢献</strong>：プルリクエスト（PR）を送信し、コア機能の構築にご協力ください。</p>
<ul>
<li><strong>プルリクエスト</strong>：<a href="https://github.com/milvus-io/milvus/pulls">コードベース</a>に直接貢献してください。バグの修正、機能の追加、ドキュメントの改善など、どのような貢献でも歓迎します。</li>
<li><strong>開発ガイド</strong>：コードへの貢献に関するガイドラインについては、<a href="https://github.com/milvus-io/milvus/blob/master/CONTRIBUTING.md">Contributor’s Guide</a>をご確認ください。</li>
</ul></li>
<li><p>🗣️<strong>会話に参加</strong>：<a href="https://milvus.io/discord">Discord</a>、<a href="https://meetings.hubspot.com/chloe-williams1/milvus-meeting">Milvus Office Hours</a>、または<a href="https://milvus.io/community">すべてのコミュニティチャンネル</a>で質問をしたり、メンテナーと交流したりしましょう。</p></li>
<li><p>⭐<strong>情報を広めましょう</strong>：ベストプラクティスや成功事例を共有し、<a href="https://twitter.com/milvusio">X</a>、<a href="https://www.linkedin.com/company/the-milvus-project/">LinkedIn</a>、<a href="https://www.youtube.com/c/MilvusVectorDatabase">YouTube</a>でMilvusをフォローしてください。</p></li>
</ul>
<p>👉<strong>GitHub:</strong> <a href="https://github.com/milvus-io/milvus">milvus-io/milvus</a></p>
