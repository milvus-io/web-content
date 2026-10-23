---
id: roadmap.md
title: Milvusのロードマップ
related_key: Milvus roadmap
summary: Milvusの3.0および3.1リリースにおける、検索、分析、スキーマの進化、データレイクとの統合、およびパフォーマンスに関するロードマップをご覧ください。
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
    </button></h1><p>Milvus 3.0 では、マルチベクトル検索、SQL スタイルのクエリ、柔軟なスキーマ、およびデータレイクへのアクセスが統合されました。今後の段階では、この基盤を土台として、より豊富なクエリ、より広範なデータモデル、そしてパフォーマンスとスケーラビリティの向上を図っていきます。このロードマップでは、オープンソース版 Milvus におけるこれらの優先事項の概要を説明します。</p>
<p>Milvus 3.0 は<strong>v3.0.1</strong> から一般提供が開始されています。以下に挙げるリリース済み機能は<strong>v3.0.0</strong> で導入されたものです。プレビュー機能やオプトイン機能については、記載のある箇所で明記しています。<strong>3.0.x</strong>シリーズではこれらの機能が拡張され、<strong>3.1</strong> は<strong>2026 年 12 月を目標としています</strong>。計画されている機能や目標日は、開発の進捗に伴い変更される可能性があります。</p>
<h2 id="Search-and-retrieval" class="common-anchor-header">検索と検索結果の抽出<button data-href="#Search-and-retrieval" class="anchor-icon" translate="no">
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
    </button></h2><p>検索・抽出のロードマップは、テキストマッチングやマルチベクトル表現から、再ランク付けや検索結果のファセットに至るまで、Milvus内でより多くの関連性シグナルを統合することに重点を置いています。</p>
<p><strong>3.0で利用可能</strong></p>
<ul>
<li><strong>マルチベクトル検索：</strong>StructArray検索はMuveraおよびLemurをサポートしており、要素レベルのフィルタリングには<code translate="no">element_filter</code> が使用されます。マッチングポリシーには、<code translate="no">MATCH_ANY</code> 、<code translate="no">MATCH_ALL</code> 、<code translate="no">MATCH_LEAST</code> 、<code translate="no">MATCH_MOST</code> 、および<code translate="no">MATCH_EXACT</code> が含まれます。</li>
<li><strong>テキストのマッチングと類似性：</strong>カスタム辞書や同義語により、アプリケーションのニーズに合わせてテキスト検索を最適化できます。正規表現によるフィルタリングではパターンマッチングがサポートされ、MinHash による近似重複検出も可能です。</li>
<li><strong>再ランク付けと推論：</strong>Milvus 3.0 では、Hugging Face 推論プロバイダーとともに、Function Chain による再ランク付け機能の初期セットが導入されました。残りの Function Chain 機能は 3.0.x での実装が予定されています。</li>
<li><strong>検索集計：</strong>検索集計機能により、検索結果に対してファセットを適用できます。</li>
</ul>
<p><strong>3.0.xで予定されている機能</strong></p>
<p>3.0.xシリーズでは、ファジーマッチングとグローバル統計の追加、およびFunction Chainの完全なサポートが予定されています。</p>
<p><strong>3.1での予定</strong></p>
<p>計画には、Grep ベースの検索、近似最近傍（ANN）検索と ANN-フィルター融合によるフィルタリングのより緊密な統合、およびスパース検索の改善が含まれます。</p>
<h2 id="Analytics-and-SQL-style-querying" class="common-anchor-header">分析および SQL スタイルのクエリ<button data-href="#Analytics-and-SQL-style-querying" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusは、アプリケーションが検索と並行してデータのソートや集計を行えるよう、クエリエンジンを拡張しています。次の段階では、結合、マテリアライズドビュー、およびカスタム計算が追加される予定です。</p>
<p><strong>3.0で利用可能</strong></p>
<p>クエリおよび検索では、<code translate="no">ORDER BY</code> によるソートがサポートされています。クエリ集計機能には、グループ化された統計値を計算するための<code translate="no">GROUP BY</code> が追加されています。</p>
<p><strong>3.1で予定</strong></p>
<ul>
<li><strong>より高度なクエリ：</strong>セミ結合を皮切りに、結合機能およびマテリアライズド・ビュー・コレクションを導入します。</li>
<li><strong>データの更新と整合性：</strong>インプレース更新および取り込み時の主キーの重複排除をサポートします。</li>
<li><strong>クエリの反復処理と JSON セマンティクス：</strong>ステートフルなクエリイテレータ、JSON<code translate="no">GROUP BY</code> 、および SQL / JSON NULL セマンティクスが追加されます。</li>
<li><strong>カスタム計算：</strong>Python ユーザー定義関数 (UDF) をサポートします。</li>
</ul>
<h2 id="Flexible-schema-and-data-types" class="common-anchor-header">柔軟なスキーマとデータ型<button data-href="#Flexible-schema-and-data-types" class="anchor-icon" translate="no">
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
    </button></h2><p>スキーマに関する作業は、既存のコレクションの進化と、より幅広いデータの表現に重点を置いています。これには、フィールドの変更、マルチベクトル構造、長文、およびエンティティの有効期限が含まれます。</p>
<p><strong>バージョン 3.0 で利用可能</strong></p>
<ul>
<li><strong>オンラインでのスキーマ変更：</strong>既存のコレクションでは、ベクトルフィールドや<code translate="no">Array&lt;Struct&gt;</code> フィールドを含む、オンラインでのフィールド追加がサポートされています。フィールドの削除は<strong>プレビュー版</strong>で利用可能ですが、制限がある場合があります。</li>
<li><strong>既存データのバックフィル：</strong>外部バックフィルではSparkコネクタが使用されます。内部バックフィルでは、コレクションにBM25またはMinHash関数を適用し、既存データに対してその出力を計算します。</li>
<li><strong>テキストおよびマルチベクトルデータ：</strong> <code translate="no">TEXT</code> 型は長文テキストを格納し、StructArrayは<code translate="no">MAX_SIM</code> を介したレイトインタラクションによる取得をサポートします。<code translate="no">TEXT</code> には、オプトイン形式のStorage V3が必要です。</li>
<li><strong>NULL値と有効期限：</strong>ベクトルフィールドはNULL値を受け入れ、エンティティレベルの有効期限（TTL）によって有効期限が制御されます。</li>
</ul>
<p><strong>3.0.xで予定されている機能</strong></p>
<p>計画中のスキーマ機能強化では、型、NULL値、およびフィールドの追加・削除に対するStructArrayのサポートが拡張されます。また、分子式のサポートや、ベクトルフィールド向けの<code translate="no">IS NULL</code> ／<code translate="no">IS NOT NULL</code> フィルターも追加されます。</p>
<p><strong>3.1で予定されている機能</strong></p>
<p>次期データモデル拡張には、ネストされたJSONおよびStruct、複合主キー、ベクトルフィールドを含まないコレクション、およびStructList内のスパースベクトルが含まれます。</p>
<h2 id="Lake-integration-and-data-versioning" class="common-anchor-header">レイクとの統合およびデータバージョン管理<button data-href="#Lake-integration-and-data-versioning" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusは、レイクストレージおよびバッチ処理とのより緊密な統合を進めています。外部コレクションにより、データが格納されている場所から直接アクセスが可能になり、スナップショットはデータバージョン管理の基盤となります。</p>
<p><strong>3.0で利用可能</strong></p>
<ul>
<li><strong>外部データへのアクセス：</strong>External Collectionは、Lance、Parquet、およびIceberg形式のデータをサポートしています。</li>
<li><strong>スナップショットとバッチ統合：</strong>スナップショットはコレクションデータのバージョンをキャプチャし、Sparkコネクタはバッチワークフローをサポートします。</li>
<li><strong>ストレージ基盤：</strong>Storage V3（Loon）は、オプションでVortexおよびLanceをサポートします。デフォルトでは無効になっており、<code translate="no">common.storage.useLoonFFI</code> で有効化します。スナップショットと<code translate="no">TEXT</code> は、いずれもこれに依存しています。</li>
</ul>
<p><strong>3.0.xで予定されている機能</strong></p>
<p>計画中の機能強化により、Milvusの収集スナップショットを外部コレクションとして利用できるようになります。また、外部テーブルのサポートがJSONのシュレッディング、関数フィールドの追加、およびフィールドの削除にも拡張されます。</p>
<p><strong>3.1で予定されている機能</strong></p>
<p>S3ベースのスパースインデックスおよびスカラーインデックス、ならびにインポートによる削除機能の導入が計画されています。</p>
<h2 id="Performance-indexing-and-scale" class="common-anchor-header">パフォーマンス、インデックス作成、およびスケーラビリティ<button data-href="#Performance-indexing-and-scale" class="anchor-icon" translate="no">
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
    </button></h2><p>パフォーマンスのロードマップでは、検索インデックス、クエリ実行、クラスタの拡張について取り上げています。また、リカバリや、オブジェクトストレージからデータを読み込む必要があるクエリについても扱っています。</p>
<p><strong>3.0で利用可能</strong></p>
<ul>
<li><strong>スパースインデックス：</strong>スパースインデックスの全面刷新に伴い、SINDIが導入されます。</li>
<li><strong>インデックスの選択：</strong> <code translate="no">FAISS</code> のパススルーインデックスは、Faissインデックスファクトリ文字列を受け入れ、SVS、Panorama、PQ、IVFPQ、ScaNNなどのオプションが用意されています。また、リストの埋め込み（EmbList）にはDiskANNインデックスも利用可能です。</li>
<li><strong>コンパクション：</strong>Force Merge により、セグメントのマージを明示的に制御できます。</li>
</ul>
<p><strong>3.1で予定されている機能</strong></p>
<ul>
<li><strong>ストレージを意識したクエリ：</strong>Vortex への述語プッシュダウンを追加し、ページレベルのプルーニングやスキップインデックスを含めます。</li>
<li><strong>クラスタの拡張とテナント：</strong>シャードの分割、カスタムシャードキー、およびマルチテナントの最適化をサポートします。</li>
<li><strong>クエリ実行およびインデックス作成：</strong>QueryView を開発し、ワイドコレクションのサポート、ストリーム結果の削減、および複数のインデックスのサポートを改善します。</li>
<li><strong>書き込みの信頼性：</strong>冪等な書き込みをサポートします。</li>
<li><strong>オブジェクトストレージのキャッシュ：</strong>TalonをS3キャッシュとして使用し、障害復旧とコールドクエリのパフォーマンスを向上させます。</li>
</ul>
<h2 id="Beyond-31" class="common-anchor-header">3.1以降<button data-href="#Beyond-31" class="anchor-icon" translate="no">
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
    </button></h2><p>長期的な取り組みには、タイムトラベルやスナップショットのロールバックが含まれます。その範囲やリリース時期は未定です。</p>
<h2 id="Help-shape-the-roadmap" class="common-anchor-header">ロードマップの策定にご協力ください<button data-href="#Help-shape-the-roadmap" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://github.com/milvus-io/milvus/discussions">GitHub Discussions</a>で、アプリケーションにとって重要なワークロード、制約、機能リクエストを共有してください。バグ<a href="https://github.com/milvus-io/milvus/issues">はGitHub Issues</a>を通じて報告してください。</p>
<p>コードやドキュメントへの貢献をご希望の場合は、『<a href="https://github.com/milvus-io/milvus/blob/master/CONTRIBUTING.md">コントリビューターガイド</a>』から始めてください。</p>
